export type Part = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const LISTENING_PARTS: Part[] = [1, 2, 3, 4];
export const READING_PARTS: Part[] = [5, 6, 7];

export interface AudioLine {
  speaker: 'A' | 'B' | 'C';
  text: string;
}

export interface PassageText {
  heading?: string;
  body: string;
}

export interface QuestionItem {
  id: string;
  /** 設問文。Part1/2は空文字（写真/応答選択のため設問文なし）。 */
  prompt: string;
  options: string[];
  correctIndex: number;
  /** 正解の根拠となる訳・ポイント */
  translation: string;
  explanation: string;
}

export interface QuestionGroup {
  id: string;
  part: Part;
  /** Part1: 写真代わりのイラスト(inline SVG) */
  svg?: string;
  /** Part2: 質問文を読み上げる */
  spokenPrompt?: boolean;
  /** Part1/2: 選択肢自体を読み上げる（文字は正解後まで隠す） */
  spokenOptions?: boolean;
  /** Part3/4: 読み上げる会話・トーク本文 */
  audioScript?: AudioLine[];
  /** Part6/7: 読む文章（Part3/4では正解後にスクリプトとして表示） */
  passage?: PassageText[];
  passageTitle?: string;
  items: QuestionItem[];
}

export interface AttemptRecord {
  itemId: string;
  groupId: string;
  part: Part;
  correct: boolean;
  selectedIndex: number;
  answeredAt: number;
}

export interface PartStats {
  attempted: number;
  correct: number;
}

export interface UserState {
  version: 1;
  updatedAt: number;
  history: AttemptRecord[];
  statsByPart: Record<Part, PartStats>;
  settings: {
    voicePreference: 'random-us-uk' | 'us-only';
  };
}

export function createInitialState(): UserState {
  return {
    version: 1,
    updatedAt: 0,
    history: [],
    statsByPart: {
      1: { attempted: 0, correct: 0 },
      2: { attempted: 0, correct: 0 },
      3: { attempted: 0, correct: 0 },
      4: { attempted: 0, correct: 0 },
      5: { attempted: 0, correct: 0 },
      6: { attempted: 0, correct: 0 },
      7: { attempted: 0, correct: 0 },
    },
    settings: {
      voicePreference: 'random-us-uk',
    },
  };
}
