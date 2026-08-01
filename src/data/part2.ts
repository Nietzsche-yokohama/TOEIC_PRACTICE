import type { QuestionGroup } from '../types';

interface P2Def {
  id: string;
  question: string;
  qJa: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
}

const defs: P2Def[] = [
  {
    id: 'p2-1',
    question: 'When does the new store open?',
    qJa: '新しい店舗はいつオープンしますか？',
    options: ['Next Monday.', 'At the mall downtown.', 'I bought it yesterday.'],
    correctIndex: 0,
    explanation: 'When(いつ)への応答は時を答える(A)。(B)は場所、(C)は無関係な過去の話で不一致。',
  },
  {
    id: 'p2-2',
    question: "Who's in charge of the marketing budget?",
    qJa: 'マーケティング予算の担当は誰ですか？',
    options: ['Ms. Tanaka is.', 'About five thousand dollars.', 'Sometime next week.'],
    correctIndex: 0,
    explanation: 'Who(誰)への応答は人物を答える(A)。(B)は金額、(C)は時期でWho-questionと噛み合わない。',
  },
  {
    id: 'p2-3',
    question: 'Could you send me the report by Friday?',
    qJa: '金曜日までにレポートを送ってもらえますか？',
    options: ['Sure, no problem.', "It's on the second floor.", 'I already read it.'],
    correctIndex: 0,
    explanation: '依頼表現(Could you ~?)には快諾/拒否で応じるのが自然。(A)が快諾の応答。(B)(C)は依頼と無関係。',
  },
  {
    id: 'p2-4',
    question: "Where's the nearest train station?",
    qJa: '一番近い駅はどこですか？',
    options: ['Just around the corner.', 'It leaves at nine.', 'Two tickets, please.'],
    correctIndex: 0,
    explanation: 'Where(どこ)への応答は場所を答える(A)。(B)は出発時刻、(C)は切符の注文で不一致。',
  },
  {
    id: 'p2-5',
    question: 'Why was the meeting postponed?',
    qJa: 'なぜ会議は延期されたのですか？',
    options: ['Because the client canceled.', 'In conference room B.', 'For about an hour.'],
    correctIndex: 0,
    explanation: 'Why(なぜ)への応答は理由を答える(A)。(B)は場所、(C)は所要時間で理由になっていない。',
  },
  {
    id: 'p2-6',
    question: 'Would you like coffee or tea?',
    qJa: 'コーヒーと紅茶どちらになさいますか？',
    options: ['Tea would be great, thanks.', 'Yes, I would.', "It's in the kitchen."],
    correctIndex: 0,
    explanation: '選択疑問文(A or B)には具体的にどちらかを答えるのが自然。(B)のようにYes/Noで答えるのは典型的な誤答パターン。',
  },
  {
    id: 'p2-7',
    question: "Isn't the deadline next Wednesday?",
    qJa: '締め切りは来週の水曜日ではありませんでしたか？',
    options: ["Yes, that's correct.", "I'll email you the file.", 'About three pages.'],
    correctIndex: 0,
    explanation: '否定疑問文にも通常の事実で答える。(A)は「その通り」と肯定して事実確認に応じている。(B)(C)は質問の内容とかみ合わない。',
  },
  {
    id: 'p2-8',
    question: 'Have you finished the quarterly report yet?',
    qJa: '四半期レポートはもう終わりましたか？',
    options: ["Not yet, I'm still working on it.", "It's due next quarter.", 'I printed ten copies.'],
    correctIndex: 0,
    explanation: '完了を尋ねる質問には進捗状況で答えるのが自然な(A)。(B)(C)は聞かれていない情報。',
  },
  {
    id: 'p2-9',
    question: 'How was your business trip to Osaka?',
    qJa: '大阪への出張はどうでしたか？',
    options: ['It went really well.', 'By bullet train.', 'For three days.'],
    correctIndex: 0,
    explanation: '感想を尋ねるHowには様子・感想で答える(A)。(B)は手段、(C)は期間を答えており質問の意図とズレる。',
  },
  {
    id: 'p2-10',
    question: 'Do you know where I can park my car?',
    qJa: '車をどこに停められるか知っていますか？',
    options: ["There's a lot behind the building.", 'It costs ten dollars an hour.', 'I parked it yesterday.'],
    correctIndex: 0,
    explanation: '駐車場所を尋ねる質問には場所で答える(A)。(B)は料金、(C)は時制も内容もかみ合わない誤答。',
  },
];

export const part2Groups: QuestionGroup[] = defs.map((d) => ({
  id: d.id,
  part: 2,
  spokenPrompt: true,
  spokenOptions: true,
  items: [
    {
      id: `${d.id}-q`,
      prompt: d.question,
      options: d.options,
      correctIndex: d.correctIndex,
      translation: `Q: ${d.qJa}\n正解: 「${d.options[d.correctIndex]}」`,
      explanation: d.explanation,
    },
  ],
}));
