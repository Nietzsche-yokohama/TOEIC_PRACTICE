import type { Part, QuestionGroup, QuestionItem } from '../types';
import { groupsForPart } from '../data';

export interface SessionItemRef {
  group: QuestionGroup;
  item: QuestionItem;
  indexInGroup: number;
  isFirstInGroup: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 指定パートから、目安問題数に収まるようにグループ単位でセッションを組む。 */
export function buildSession(part: Part, targetItems = 8): SessionItemRef[] {
  const groups = shuffle(groupsForPart(part));
  const selected: QuestionGroup[] = [];
  let count = 0;
  for (const g of groups) {
    if (count >= targetItems && selected.length > 0) break;
    selected.push(g);
    count += g.items.length;
  }
  const refs: SessionItemRef[] = [];
  for (const g of selected) {
    g.items.forEach((item, i) => {
      refs.push({ group: g, item, indexInGroup: i, isFirstInGroup: i === 0 });
    });
  }
  return refs;
}
