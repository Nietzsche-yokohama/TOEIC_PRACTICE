import type { Part, QuestionGroup } from '../types';
import { part1Groups } from './part1';
import { part2Groups } from './part2';
import { part3Groups } from './part3';
import { part4Groups } from './part4';
import { part5Groups } from './part5';
import { part6Groups } from './part6';
import { part7Groups } from './part7';

export const ALL_GROUPS: QuestionGroup[] = [
  ...part1Groups,
  ...part2Groups,
  ...part3Groups,
  ...part4Groups,
  ...part5Groups,
  ...part6Groups,
  ...part7Groups,
];

export function groupsForPart(part: Part): QuestionGroup[] {
  return ALL_GROUPS.filter((g) => g.part === part);
}

export function itemCountForPart(part: Part): number {
  return groupsForPart(part).reduce((sum, g) => sum + g.items.length, 0);
}

export function findItem(itemId: string): { group: QuestionGroup; item: QuestionGroup['items'][number] } | undefined {
  for (const g of ALL_GROUPS) {
    const item = g.items.find((it) => it.id === itemId);
    if (item) return { group: g, item };
  }
  return undefined;
}
