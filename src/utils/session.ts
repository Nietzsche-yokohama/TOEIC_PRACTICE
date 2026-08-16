import type { Part, QuestionGroup, QuestionItem } from '../types';
import { groupsForPart } from '../data';

export interface SessionItemRef {
  group: QuestionGroup;
  item: QuestionItem;
  indexInGroup: number;
  isFirstInGroup: boolean;
  /** このセッション内で何番目の会話・トーク・文書か（1始まり） */
  groupNumber: number;
  /** セッションに含まれる会話・トーク・文書の総数 */
  groupCount: number;
  /** その会話・トーク・文書に紐づく設問数 */
  itemsInGroup: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 選択肢を出題ごとにシャッフルする。
 * 問題バンクは正解を先頭に置いて書かれているため、そのまま出すと正解が(A)に偏る。
 * 解説は選択肢の英文を引用する形式で書かれているので、順番が変わっても内容は崩れない。
 */
function shuffleOptions(item: QuestionItem): QuestionItem {
  const order = shuffle(item.options.map((_, i) => i));
  return {
    ...item,
    options: order.map((i) => item.options[i]),
    correctIndex: order.indexOf(item.correctIndex),
  };
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
  selected.forEach((g, gi) => {
    g.items.forEach((item, i) => {
      refs.push({
        group: g,
        item: shuffleOptions(item),
        indexInGroup: i,
        isFirstInGroup: i === 0,
        groupNumber: gi + 1,
        groupCount: selected.length,
        itemsInGroup: g.items.length,
      });
    });
  });
  return refs;
}
