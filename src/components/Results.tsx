import type { AttemptRecord, Part } from '../types';
import { PART_META } from '../constants';
import { findItem } from '../data';

interface ResultsProps {
  part: Part;
  results: Omit<AttemptRecord, 'answeredAt'>[];
  onHome: () => void;
  onRetry: () => void;
}

export default function Results({ part, results, onHome, onRetry }: ResultsProps) {
  const meta = PART_META[part];
  const correct = results.filter((r) => r.correct).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <>
      <div className="card">
        <p className="section-title">{meta.nameJa} ・ 結果</p>
        <div className="result-summary">
          <div className="big">
            {correct} / {total}
          </div>
          <div style={{ color: 'var(--text-dim)', marginTop: 4 }}>正答率 {pct}%</div>
        </div>
      </div>

      <div className="card">
        <p className="section-title">問題ごとの振り返り</p>
        <div className="result-list">
          {results.map((r, i) => {
            const found = findItem(r.itemId);
            const label = found?.item.prompt || found?.item.options[found.item.correctIndex] || r.itemId;
            return (
              <div className="result-row" key={r.itemId}>
                <span className={`mark ${r.correct ? 'correct' : 'incorrect'}`}>{r.correct ? '✓' : '✗'}</span>
                <span className="text">
                  {i + 1}. {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer-nav">
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onHome}>
          ホームへ
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onRetry}>
          もう一度
        </button>
      </div>
    </>
  );
}
