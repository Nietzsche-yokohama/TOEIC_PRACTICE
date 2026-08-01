import { LISTENING_PARTS, READING_PARTS, type PartStats, type Part } from '../types';

export interface SectionEstimate {
  attempted: number;
  correct: number;
  accuracy: number; // 0..1
  estimatedScore: number; // 5..495 (5刻み)
}

export interface ScoreEstimate {
  listening: SectionEstimate;
  reading: SectionEstimate;
  total: number;
}

/**
 * 正答率をTOEICの素点換算スコア(5〜495)に単純マッピングする簡易推定。
 * 公式のリスニング/リーディング換算表は非公開かつ回によって変動するため、
 * ここでは「正答率に比例した目安」として扱う（実際のスコアを保証するものではない）。
 */
function accuracyToScaledScore(accuracy: number): number {
  const raw = 5 + accuracy * 490;
  const rounded = Math.round(raw / 5) * 5;
  return Math.min(495, Math.max(5, rounded));
}

function sectionEstimate(statsByPart: Record<Part, PartStats>, parts: Part[]): SectionEstimate {
  const attempted = parts.reduce((s, p) => s + statsByPart[p].attempted, 0);
  const correct = parts.reduce((s, p) => s + statsByPart[p].correct, 0);
  const accuracy = attempted > 0 ? correct / attempted : 0;
  return { attempted, correct, accuracy, estimatedScore: attempted > 0 ? accuracyToScaledScore(accuracy) : 0 };
}

export function estimateScore(statsByPart: Record<Part, PartStats>): ScoreEstimate {
  const listening = sectionEstimate(statsByPart, LISTENING_PARTS);
  const reading = sectionEstimate(statsByPart, READING_PARTS);
  return { listening, reading, total: listening.estimatedScore + reading.estimatedScore };
}

export function partAccuracy(stats: PartStats): number {
  return stats.attempted > 0 ? stats.correct / stats.attempted : 0;
}
