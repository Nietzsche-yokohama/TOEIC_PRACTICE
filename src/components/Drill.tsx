import { useMemo, useState } from 'react';
import type { AttemptRecord, Part } from '../types';
import { PART_META } from '../constants';
import { buildSession } from '../utils/session';
import { useTTS } from '../hooks/useTTS';
import QuestionCard from './QuestionCard';
import Timer from './Timer';

interface DrillProps {
  part: Part;
  onExit: () => void;
  onFinish: (results: Omit<AttemptRecord, 'answeredAt'>[]) => void;
}

export default function Drill({ part, onExit, onFinish }: DrillProps) {
  const session = useMemo(() => buildSession(part, 8), [part]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Omit<AttemptRecord, 'answeredAt'>[]>([]);
  const tts = useTTS();

  const meta = PART_META[part];
  const current = session[index];
  const answeredCurrent = results.some((r) => r.itemId === current?.item.id);
  const isLast = index === session.length - 1;

  if (session.length === 0) {
    return (
      <div className="card">
        <p className="empty-note">このパートの問題がまだありません。</p>
        <button className="btn btn-secondary btn-block" onClick={onExit}>
          戻る
        </button>
      </div>
    );
  }

  function handleAnswered(selectedIndex: number, correct: boolean) {
    setResults((prev) => [
      ...prev,
      { itemId: current.item.id, groupId: current.group.id, part, selectedIndex, correct },
    ]);
  }

  function handleNext() {
    tts.stop();
    if (isLast) {
      onFinish(results);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <>
      <div className="drill-header">
        <button className="btn btn-secondary" onClick={() => { tts.stop(); onExit(); }}>
          ← 中断
        </button>
        <Timer targetSeconds={meta.targetSeconds} resetKey={current.item.id} />
      </div>
      <div>
        <div className="drill-progress" style={{ marginBottom: 6 }}>
          {meta.nameJa} ・ {index + 1} / {session.length}
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((index + (answeredCurrent ? 1 : 0)) / session.length) * 100}%` }} />
        </div>
      </div>

      <QuestionCard
        group={current.group}
        item={current.item}
        isFirstInGroup={current.isFirstInGroup}
        tts={tts}
        onAnswered={handleAnswered}
      />

      {answeredCurrent && (
        <button className="btn btn-primary btn-block" onClick={handleNext}>
          {isLast ? '結果を見る' : '次の問題へ →'}
        </button>
      )}
    </>
  );
}
