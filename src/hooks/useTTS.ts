import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioLine } from '../types';

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

export interface UseTTS {
  supported: boolean;
  speaking: boolean;
  play: (lines: AudioLine[], rate?: number) => Promise<void>;
  stop: () => void;
}

export function useTTS(): UseTTS {
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [speaking, setSpeaking] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!supported) return;
    loadVoices().then((v) => {
      voicesRef.current = v;
    });
  }, [supported]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (supported) speechSynthesis.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    if (supported) speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const play = useCallback(
    async (lines: AudioLine[], rate = 0.95) => {
      if (!supported || lines.length === 0) return;
      speechSynthesis.cancel();
      cancelledRef.current = false;
      setSpeaking(true);

      const pool = pickVoicePool(voicesRef.current);
      const speakers = Array.from(new Set(lines.map((l) => l.speaker)));
      const speakerVoice: Record<string, SpeechSynthesisVoice | undefined> = {};
      speakers.forEach((sp, i) => {
        speakerVoice[sp] = pool[i % pool.length];
      });

      for (const line of lines) {
        if (cancelledRef.current) break;
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
          speechSynthesis.speak(utter);
        });
      }
      setSpeaking(false);
    },
    [supported],
  );

  return { supported, speaking, play, stop };
}
