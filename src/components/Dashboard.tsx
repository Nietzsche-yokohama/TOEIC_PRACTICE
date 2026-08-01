import type { Part, UserState } from '../types';
import { ALL_PARTS, PART_META } from '../constants';
import { estimateScore, partAccuracy } from '../utils/scoring';
import { itemCountForPart } from '../data';

interface DashboardProps {
  state: UserState;
  onSelectPart: (part: Part) => void;
}

export default function Dashboard({ state, onSelectPart }: DashboardProps) {
  const score = estimateScore(state.statsByPart);
  const totalAttempted = ALL_PARTS.reduce((s, p) => s + state.statsByPart[p].attempted, 0);

  return (
    <>
      <div className="card">
        <p className="section-title">推定スコア(目安)</p>
        {totalAttempted === 0 ? (
          <p className="empty-note" style={{ padding: '4px 0' }}>
            ドリルを1つ解くと、推定スコアが表示されます。
          </p>
        ) : (
          <>
            <div className="score-hero">
              <span className="value">{score.total}</span>
              <span className="max">/ 990</span>
            </div>
            <div className="score-sub">
              <span>
                Listening <b>{score.listening.estimatedScore || '-'}</b>
              </span>
              <span>
                Reading <b>{score.reading.estimatedScore || '-'}</b>
              </span>
            </div>
          </>
        )}
      </div>

      <div>
        <p className="section-title">Listening</p>
        <div className="part-grid">
          {ALL_PARTS.filter((p) => PART_META[p].section === 'listening').map((p) => (
            <PartCard key={p} part={p} stats={state.statsByPart[p]} onSelect={onSelectPart} />
          ))}
        </div>
      </div>

      <div>
        <p className="section-title">Reading</p>
        <div className="part-grid">
          {ALL_PARTS.filter((p) => PART_META[p].section === 'reading').map((p) => (
            <PartCard key={p} part={p} stats={state.statsByPart[p]} onSelect={onSelectPart} />
          ))}
        </div>
      </div>
    </>
  );
}

function PartCard({
  part,
  stats,
  onSelect,
}: {
  part: Part;
  stats: UserState['statsByPart'][Part];
  onSelect: (part: Part) => void;
}) {
  const meta = PART_META[part];
  const acc = partAccuracy(stats);
  const total = itemCountForPart(part);
  return (
    <button className="part-card" onClick={() => onSelect(part)}>
      <span className={`badge ${meta.section}`}>{meta.section === 'listening' ? 'L' : 'R'}{part}</span>
      <span className="info">
        <span className="name">{meta.nameJa}</span>
        <span className="desc">{meta.description}</span>
        {stats.attempted > 0 && (
          <span className="stat">
            正答率 {Math.round(acc * 100)}%（{stats.correct}/{stats.attempted}） ・ 問題数 {total}
          </span>
        )}
        {stats.attempted === 0 && <span className="stat">問題数 {total} ・ 未挑戦</span>}
      </span>
      <span className="chevron">›</span>
    </button>
  );
}
