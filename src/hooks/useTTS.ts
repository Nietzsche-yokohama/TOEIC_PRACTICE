import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioLine } from '../types';
import { resumeAudioKeepAlive, startAudioKeepAlive } from '../utils/audio';

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const existing = speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    const handler = () => {
      resolve(speechSynthesis.getVoices());
      speechSynthesis.removeEventListener('voiceschanged', handler);
    };
    speechSynthesis.addEventListener('voiceschanged', handler);
    setTimeout(() => resolve(speechSynthesis.getVoices()), 1000);
  });
}

// ── 話者の性別を声に反映する ─────────────────────────────────────────────
// Part3/4 の設問は "What does the man ask...?" のように性別で話者を指すため、
// 男性役・女性役にランダムな声を割り当てると設問が解けなくなる。
// SpeechSynthesisVoice に性別の情報は無いので、よく使われる音声名から判定する。
// 「Google UK English Female」は "male" も含むので、必ず女性判定を先に行う。
const FEMALE_VOICE_HINTS = [
  'female', 'samantha', 'karen', 'moira', 'tessa', 'fiona', 'victoria', 'susan', 'allison', 'ava',
  'serena', 'kate', 'catherine', 'zira', 'aria', 'jenny', 'michelle', 'sonia', 'libby', 'nicky',
  'joanna', 'salli', 'kendra', 'emma', 'amy', 'nova', 'shelley',
];
const MALE_VOICE_HINTS = [
  'male', 'alex', 'daniel', 'fred', 'thomas', 'oliver', 'arthur', 'gordon', 'aaron', 'rishi',
  'david', 'mark', 'guy', 'ryan', 'brian', 'matthew', 'justin', 'joey', 'eric', 'roger', 'steffan',
  'george', 'james', 'reed', 'albert',
];

type Gender = 'male' | 'female';

function voiceGender(v: SpeechSynthesisVoice): Gender | undefined {
  const name = v.name.toLowerCase();
  if (FEMALE_VOICE_HINTS.some((h) => name.includes(h))) return 'female';
  if (MALE_VOICE_HINTS.some((h) => name.includes(h))) return 'male';
  return undefined;
}

interface VoiceChoice {
  voice?: SpeechSynthesisVoice;
  /** 性別の分かる声が端末に無いときは、声色で男女を区別する */
  pitch: number;
}

/** 米(en-US)・英(en-GB)ボイスをランダムに選ぶ。無ければ他のen-*音声にフォールバック。 */
function pickVoicePool(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (en.length === 0) return voices;
  const primaryLang = Math.random() < 0.5 ? 'en-us' : 'en-gb';
  const primary = en.filter((v) => v.lang.toLowerCase() === primaryLang);
  return primary.length > 0 ? primary : en;
}

const clampPitch = (p: number) => Math.min(1.8, Math.max(0.5, p));

/** 話者ごとに声を決める。gender 指定がある話者には、その性別の声を優先して割り当てる。 */
function assignVoices(lines: AudioLine[], voices: SpeechSynthesisVoice[]): Record<string, VoiceChoice> {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const all = en.length > 0 ? en : voices;
  const pool = pickVoicePool(voices);

  const speakers = Array.from(new Set(lines.map((l) => l.speaker)));
  const wanted: Record<string, Gender | undefined> = {};
  for (const line of lines) {
    if (line.gender && !wanted[line.speaker]) wanted[line.speaker] = line.gender;
  }

  const used = new Set<SpeechSynthesisVoice>();
  const chosen: Record<string, VoiceChoice> = {};

  speakers.forEach((sp, i) => {
    const want = wanted[sp];
    let voice: SpeechSynthesisVoice | undefined;
    let pitch = 1;

    if (want) {
      // 同じ言語の声を優先し、無ければ他のen-*からでも性別の合う声を探す
      voice =
        pool.find((v) => !used.has(v) && voiceGender(v) === want) ??
        all.find((v) => !used.has(v) && voiceGender(v) === want);
    }
    if (!voice) {
      voice = pool.find((v) => !used.has(v)) ?? pool[i % pool.length];
      // 性別が判定できる声が無かった場合でも、男女は聞き分けられるようにする
      if (want) pitch = want === 'female' ? 1.35 : 0.75;
    }
    if (voice) used.add(voice);
    chosen[sp] = { voice, pitch };
  });

  // 声もピッチも同じ話者が並ぶと会話として聞き分けられないので、ずらす
  const seen = new Set<string>();
  speakers.forEach((sp, i) => {
    const c = chosen[sp];
    let key = `${c.voice?.voiceURI ?? '-'}|${c.pitch}`;
    if (seen.has(key)) {
      c.pitch = clampPitch(c.pitch + (i % 2 === 0 ? 0.3 : -0.3));
      key = `${c.voice?.voiceURI ?? '-'}|${c.pitch}`;
    }
    seen.add(key);
  });

  return chosen;
}

// ── 出だしの音欠け対策: cancel() の直後に喋らせない ──────────────────────
// cancel() は音声エンジンをリセットするため、直後の speak() は頭が欠ける。
// 何も鳴っていないときは cancel を呼ばず、呼んだときだけ落ち着くまで待つ。
const CANCEL_SETTLE_MS = 250;
// Bluetooth リンクを張った直後は数百ms 音が出ないため、最初の発話だけ少し待つ。
const KEEP_ALIVE_WARMUP_MS = 180;

let lastCancelAt = 0;

/** 実際に鳴っているときだけ cancel する（無駄な cancel が次の発話の頭を削るのを防ぐ） */
function cancelSpeech(): void {
  const synth = window.speechSynthesis;
  if (!synth) return;
  if (synth.speaking || synth.pending) {
    synth.cancel();
    lastCancelAt = Date.now();
  }
}

/** 直近の cancel から落ち着くまでの残り時間 */
function settleDelayMs(): number {
  const elapsed = Date.now() - lastCancelAt;
  return elapsed >= CANCEL_SETTLE_MS ? 0 : CANCEL_SETTLE_MS - elapsed;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface UseTTS {
  supported: boolean;
  speaking: boolean;
  paused: boolean;
  play: (lines: AudioLine[], rate?: number) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export function useTTS(): UseTTS {
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const cancelledRef = useRef(false);
  const pausedRef = useRef(false);
  // 連続で再生を押されたとき、古い再生ループが speaking を落とさないようにする印
  const playTokenRef = useRef(0);

  useEffect(() => {
    if (!supported) return;
    loadVoices().then((v) => {
      voicesRef.current = v;
    });
  }, [supported]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      playTokenRef.current += 1;
      if (supported) cancelSpeech();
    };
  }, [supported]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    playTokenRef.current += 1;
    if (supported) {
      cancelSpeech();
      // 一時停止したまま cancel すると、次の発話がpause状態のまま鳴らない環境がある。
      // キューを空にしてから resume() して pause 状態を解除しておく。
      if (pausedRef.current) speechSynthesis.resume();
    }
    pausedRef.current = false;
    setPaused(false);
    setSpeaking(false);
  }, [supported]);

  const pause = useCallback(() => {
    // iOS Safari など pause() が効かない環境もあるため、その場合は「停止」を使ってもらう
    if (!supported || !speechSynthesis.speaking) return;
    pausedRef.current = true;
    setPaused(true);
    speechSynthesis.pause();
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    pausedRef.current = false;
    setPaused(false);
    resumeAudioKeepAlive();
    speechSynthesis.resume();
  }, [supported]);

  const play = useCallback(
    async (lines: AudioLine[], rate = 0.95) => {
      if (!supported || lines.length === 0) return;

      const token = ++playTokenRef.current;
      const alive = () => !cancelledRef.current && token === playTokenRef.current;

      cancelSpeech();
      cancelledRef.current = false;
      pausedRef.current = false;
      setPaused(false);
      setSpeaking(true);

      // 再生ボタン（ユーザー操作）から呼ばれるので、ここで音声リンクを起こしてよい
      const justStarted = startAudioKeepAlive();
      resumeAudioKeepAlive();

      // 初回はボイス一覧が未読込のことがある。無音の声で喋らせないよう待つ。
      if (voicesRef.current.length === 0) {
        voicesRef.current = await loadVoices();
        if (!alive()) return;
      }

      const wait = Math.max(settleDelayMs(), justStarted ? KEEP_ALIVE_WARMUP_MS : 0);
      if (wait > 0) {
        await delay(wait);
        if (!alive()) return;
      }

      const speakerVoice = assignVoices(lines, voicesRef.current);

      for (const line of lines) {
        // 一時停止中は次の発話に進まない（発話中の一時停止は speechSynthesis.pause() が担う）
        while (pausedRef.current && alive()) await delay(120);
        if (!alive()) break;
        await new Promise<void>((resolve) => {
          const utter = new SpeechSynthesisUtterance(line.text);
          const choice = speakerVoice[line.speaker];
          if (choice?.voice) {
            utter.voice = choice.voice;
            utter.lang = choice.voice.lang;
          } else {
            utter.lang = 'en-US';
          }
          utter.pitch = choice?.pitch ?? 1;
          utter.rate = rate;
          utter.onend = () => resolve();
          utter.onerror = () => resolve();
          speechSynthesis.resume(); // Chromeがpause状態のまま固まる既知問題への保険
          speechSynthesis.speak(utter);
        });
      }

      if (token === playTokenRef.current) {
        setSpeaking(false);
        setPaused(false);
        pausedRef.current = false;
      }
    },
    [supported],
  );

  return { supported, speaking, paused, play, pause, resume, stop };
}
