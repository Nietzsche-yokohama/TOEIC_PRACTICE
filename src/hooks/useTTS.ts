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

/** 米(en-US)・英(en-GB)ボイスをランダムに選ぶ。無ければ他のen-*音声にフォールバック。 */
function pickVoicePool(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (en.length === 0) return voices;
  const primaryLang = Math.random() < 0.5 ? 'en-us' : 'en-gb';
  const primary = en.filter((v) => v.lang.toLowerCase() === primaryLang);
  return primary.length > 0 ? primary : en;
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

      const pool = pickVoicePool(voicesRef.current);
      const speakers = Array.from(new Set(lines.map((l) => l.speaker)));
      const speakerVoice: Record<string, SpeechSynthesisVoice | undefined> = {};
      speakers.forEach((sp, i) => {
        speakerVoice[sp] = pool[i % pool.length];
      });

      for (const line of lines) {
        // 一時停止中は次の発話に進まない（発話中の一時停止は speechSynthesis.pause() が担う）
        while (pausedRef.current && alive()) await delay(120);
        if (!alive()) break;
        await new Promise<void>((resolve) => {
          const utter = new SpeechSynthesisUtterance(line.text);
          const voice = speakerVoice[line.speaker];
          if (voice) {
            utter.voice = voice;
            utter.lang = voice.lang;
          } else {
            utter.lang = 'en-US';
          }
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
