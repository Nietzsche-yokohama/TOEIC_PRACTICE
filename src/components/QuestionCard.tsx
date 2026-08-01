import { useEffect, useState } from 'react';
import type { AudioLine, QuestionGroup, QuestionItem } from '../types';
import type { UseTTS } from '../hooks/useTTS';

const LETTERS = ['A', 'B', 'C', 'D'];

interface QuestionCardProps {
  group: QuestionGroup;
  item: QuestionItem;
  isFirstInGroup: boolean;
  tts: UseTTS;
  onAnswered: (selectedIndex: number, correct: boolean) => void;
}

export default function QuestionCard({ group, item, isFirstInGroup, tts, onAnswered }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    tts.stop();
  }, [item.id]);

  const hideOptionText = !!group.spokenOptions && !answered;
  const hidePromptText = !!group.spokenPrompt && !answered;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onAnswered(i, i === item.correctIndex);
  }

  function playNarration() {
    const lines: AudioLine[] = [];
    if (group.spokenPrompt && item.prompt) lines.push({ speaker: 'A', text: item.prompt });
    if (group.spokenOptions) item.options.forEach((o) => lines.push({ speaker: 'A', text: o }));
    tts.play(lines);
  }

  function playScript() {
    if (group.audioScript) tts.play(group.audioScript);
  }

  return (
    <div className="card">
      {group.photo && (
        <div className="illustration" style={{ marginBottom: 16 }}>
          <img src={group.photo.src} alt="" loading="eager" />
          {group.photo.credit && <div className="photo-credit">{group.photo.credit}</div>}
        </div>
      )}

      {group.passageTitle && group.part !== 1 && (
        <p className="passage-heading" style={{ marginBottom: 4 }}>
          {group.passageTitle}
        </p>
      )}
      {group.passage &&
        group.passage.map((p, i) => (
          <div className="passage" key={i}>
            {p.heading && <div className="passage-heading">{p.heading}</div>}
            {p.body}
          </div>
        ))}

      {group.audioScript && isFirstInGroup && (
        <button className="audio-btn" onClick={playScript} disabled={tts.speaking}>
          <span className="icon">{tts.speaking ? '⏸' : '🎧'}</span>
          {tts.speaking ? '再生中…' : '会話・トークを聞く'}
        </button>
      )}
      {group.audioScript && !isFirstInGroup && (
        <button className="audio-btn" onClick={playScript} disabled={tts.speaking}>
          <span className="icon">🔁</span>
          {tts.speaking ? '再生中…' : 'もう一度聞く'}
        </button>
      )}

      {(group.spokenPrompt || group.spokenOptions) && (
        <button className="audio-btn" onClick={playNarration} disabled={tts.speaking}>
          <span className="icon">{tts.speaking ? '⏸' : '🎧'}</span>
          {tts.speaking ? '再生中…' : group.part === 1 ? '4つの説明文を聞く' : '質問と応答を聞く'}
        </button>
      )}

      {!hidePromptText && item.prompt && <p className="prompt">{item.prompt}</p>}
      {hidePromptText && <p className="prompt" style={{ color: 'var(--text-dim)' }}>音声をよく聞いて、応答を選んでください。</p>}

      <div className="options">
        {item.options.map((opt, i) => {
          let cls = 'option-btn';
          if (answered) {
            if (i === item.correctIndex) cls += ' correct';
            else if (i === selected) cls += ' incorrect';
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              <span className="letter">{LETTERS[i]}</span>
              <span>{hideOptionText ? '（音声を聞いて選択）' : opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`feedback ${selected === item.correctIndex ? 'correct' : 'incorrect'}`}>
          <div className={`feedback-title ${selected === item.correctIndex ? 'correct' : 'incorrect'}`}>
            {selected === item.correctIndex ? '✓ 正解' : '✗ 不正解'}
          </div>
          <div className="feedback-translation">{item.translation}</div>
          <div className="feedback-explanation">{item.explanation}</div>
        </div>
      )}
    </div>
  );
}
