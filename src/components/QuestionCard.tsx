import { useEffect, useState, type ReactNode } from 'react';
import type { AudioLine, Part, QuestionGroup, QuestionItem } from '../types';
import type { UseTTS } from '../hooks/useTTS';

const LETTERS = ['A', 'B', 'C', 'D'];

/** 1つの音声・文書に複数の設問がぶら下がるパートで、そのまとまりをどう呼ぶか */
const SET_LABEL: Partial<Record<Part, string>> = {
  3: '会話',
  4: 'トーク',
  6: '文書',
  7: '文書',
};

interface QuestionCardProps {
  group: QuestionGroup;
  item: QuestionItem;
  isFirstInGroup: boolean;
  indexInGroup: number;
  groupNumber: number;
  groupCount: number;
  itemsInGroup: number;
  /**
   * 経過時間の表示。長い文書を下までスクロールすると画面上部のヘッダーは
   * 見えなくなるので、選択肢のすぐ上に置いて解答時に必ず目に入るようにする。
   */
  timer?: ReactNode;
  tts: UseTTS;
  onAnswered: (selectedIndex: number, correct: boolean) => void;
}

export default function QuestionCard({
  group,
  item,
  isFirstInGroup,
  indexInGroup,
  groupNumber,
  groupCount,
  itemsInGroup,
  timer,
  tts,
  onAnswered,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    tts.stop();
  }, [item.id]);

  const hideOptionText = !!group.spokenOptions && !answered;
  const hidePromptText = !!group.spokenPrompt && !answered;
  const setLabel = SET_LABEL[group.part];
  // 設問が1問だけのパート(1・2・5)ではセット表示は不要
  const showSetHeader = !!setLabel && itemsInGroup > 1;

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

  /** 再生中は一時停止／停止を出す。再生していないときだけ再生ボタンを出す。 */
  function audioButton(onPlay: () => void, label: string, icon: string) {
    if (tts.speaking) {
      return (
        <div className="audio-controls">
          <button className="audio-btn" onClick={tts.paused ? tts.resume : tts.pause}>
            <span className="icon">{tts.paused ? '▶️' : '⏸'}</span>
            {tts.paused ? '再開' : '一時停止'}
          </button>
          <button className="audio-btn" onClick={tts.stop}>
            <span className="icon">⏹</span>
            停止
          </button>
        </div>
      );
    }
    return (
      <button className="audio-btn" onClick={onPlay}>
        <span className="icon">{icon}</span>
        {label}
      </button>
    );
  }

  return (
    <div className="card">
      {showSetHeader && (
        <div className="set-header">
          <span className="set-badge">
            {setLabel} {groupNumber} / {groupCount}
          </span>
          <span className="set-count">
            設問 {indexInGroup + 1} / {itemsInGroup}
          </span>
        </div>
      )}

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

      {group.audioScript &&
        audioButton(
          playScript,
          isFirstInGroup
            ? `${setLabel ?? '音声'}を聞く`
            : `${setLabel ?? '音声'} ${groupNumber} をもう一度聞く`,
          isFirstInGroup ? '🎧' : '🔁',
        )}

      {(group.spokenPrompt || group.spokenOptions) &&
        audioButton(playNarration, group.part === 1 ? '4つの説明文を聞く' : '質問と応答を聞く', '🎧')}

      {!hidePromptText && item.prompt && <p className="prompt">{item.prompt}</p>}
      {hidePromptText && <p className="prompt" style={{ color: 'var(--text-dim)' }}>音声をよく聞いて、応答を選んでください。</p>}

      {timer && <div className="question-timer">{timer}</div>}

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
