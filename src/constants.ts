import type { Part } from './types';

export interface PartMeta {
  part: Part;
  name: string;
  nameJa: string;
  section: 'listening' | 'reading';
  description: string;
  /** 1問あたりの目安時間（秒）。本番相当のペース感覚をつかむための目安であり、強制的な締切ではない。 */
  targetSeconds: number;
}

export const PART_META: Record<Part, PartMeta> = {
  1: {
    part: 1,
    name: 'Part 1: Photographs',
    nameJa: '写真描写問題',
    section: 'listening',
    description: '写真を最もよく描写している説明文を、読み上げられる4つの中から選ぶ',
    targetSeconds: 8,
  },
  2: {
    part: 2,
    name: 'Part 2: Question-Response',
    nameJa: '応答問題',
    section: 'listening',
    description: '読み上げられる質問に対して、最も適切な応答を3つの中から選ぶ',
    targetSeconds: 5,
  },
  3: {
    part: 3,
    name: 'Part 3: Conversations',
    nameJa: '会話問題',
    section: 'listening',
    description: '2〜3人の短い会話を聞き、設問に答える（1会話につき3問）',
    targetSeconds: 8,
  },
  4: {
    part: 4,
    name: 'Part 4: Talks',
    nameJa: '説明文問題',
    section: 'listening',
    description: 'アナウンスや案内などの短いトークを聞き、設問に答える（1トークにつき3問）',
    targetSeconds: 8,
  },
  5: {
    part: 5,
    name: 'Part 5: Incomplete Sentences',
    nameJa: '短文穴埋め問題',
    section: 'reading',
    description: '文中の空欄に入る最も適切な語句を選ぶ',
    targetSeconds: 20,
  },
  6: {
    part: 6,
    name: 'Part 6: Text Completion',
    nameJa: '長文穴埋め問題',
    section: 'reading',
    description: '文書内の複数の空欄に入る最も適切な語句を選ぶ',
    targetSeconds: 45,
  },
  7: {
    part: 7,
    name: 'Part 7: Reading Comprehension',
    nameJa: '読解問題',
    section: 'reading',
    description: '1つまたは複数の文書を読み、設問に答える',
    targetSeconds: 60,
  },
};

export const ALL_PARTS: Part[] = [1, 2, 3, 4, 5, 6, 7];
