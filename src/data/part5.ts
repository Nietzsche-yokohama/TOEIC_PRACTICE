import type { QuestionGroup } from '../types';

interface P5Def {
  id: string;
  sentence: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  translation: string;
  explanation: string;
}

const defs: P5Def[] = [
  {
    id: 'p5-1',
    sentence: 'The marketing team ___ a new campaign next month.',
    options: ['launch', 'launched', 'will launch', 'launching'],
    correctIndex: 2,
    translation: 'マーケティングチームは来月、新しいキャンペーンを開始する予定です。',
    explanation:
      '"next month"という未来を示す語句があるため、未来形 will launch が適切。launch は主語 The marketing team（単数扱い）と一致せず、launched は過去形で "next month" と矛盾、launching は助動詞がなく述語動詞になれない。',
  },
  {
    id: 'p5-2',
    sentence: 'Please make sure all documents are submitted ___ the deadline.',
    options: ['before', 'during', 'among', 'between'],
    correctIndex: 0,
    translation: 'すべての書類は締め切り前に提出されるようにしてください。',
    explanation: '「締め切り前に」の意味には before が適切。during/among/betweenは文意に合わない。',
  },
  {
    id: 'p5-3',
    sentence: 'The new employee handbook is ___ than the previous one.',
    options: ['clear', 'clearly', 'clearer', 'clearest'],
    correctIndex: 2,
    translation: '新しい従業員ハンドブックは以前のものより分かりやすいです。',
    explanation: '直後に than があるため比較級 clearer が適切。',
  },
  {
    id: 'p5-4',
    sentence: '___ the heavy rain, the outdoor event was held as scheduled.',
    options: ['Because', 'Despite', 'Although', 'Since'],
    correctIndex: 1,
    translation: '大雨にもかかわらず、屋外イベントは予定通り開催されました。',
    explanation: '後ろに名詞句 "the heavy rain" が続くため、前置詞的に使える Despite が適切。Although/Becauseは節（S+V）を取る接続詞のため不可。',
  },
  {
    id: 'p5-5',
    sentence: 'Employees who arrive late ___ required to notify their supervisor.',
    options: ['is', 'are', 'was', 'being'],
    correctIndex: 1,
    translation: '遅刻する従業員は上司に連絡することが求められます。',
    explanation: '主語 Employees は複数形なので、be動詞は are が適切。',
  },
  {
    id: 'p5-6',
    sentence: "The company's profits have increased steadily ___ the past three years.",
    options: ['since', 'for', 'at', 'on'],
    correctIndex: 1,
    translation: 'その会社の利益は過去3年間、着実に増加しています。',
    explanation:
      '現在完了形とともに「期間の長さ」を表すには for。since は "since 2020" のように起点（時の一点）を示す語で、"the past three years" のような期間の長さには使えない。',
  },
  {
    id: 'p5-7',
    sentence: 'Please turn off all electronic devices ___ boarding the aircraft.',
    options: ['prior to', 'since', 'between', 'among'],
    correctIndex: 0,
    translation: '航空機に搭乗する前に、すべての電子機器の電源をお切りください。',
    explanation: 'prior to は「〜の前に」という意味の前置詞句で、後ろに動名詞 boarding を続けられる。',
  },
  {
    id: 'p5-8',
    sentence: 'The report ___ by the finance department will be reviewed tomorrow.',
    options: ['prepare', 'prepared', 'preparing', 'to prepare'],
    correctIndex: 1,
    translation: '財務部によって作成されたレポートは明日レビューされます。',
    explanation: '過去分詞 prepared が report を後置修飾し、「財務部によって作成された報告書」という受動の意味を表す。',
  },
  {
    id: 'p5-9',
    sentence: 'Mr. Kim is responsible ___ managing the customer service team.',
    options: ['of', 'for', 'with', 'to'],
    correctIndex: 1,
    translation: 'キムさんはカスタマーサービスチームの管理を担当しています。',
    explanation: 'be responsible for ~ で「〜の責任を負う」という定型表現。',
  },
  {
    id: 'p5-10',
    sentence: 'The workshop was ___ informative that many attendees asked for a follow-up session.',
    options: ['so', 'such', 'too', 'very'],
    correctIndex: 0,
    translation: 'その研修は非常に有益だったので、多くの参加者がフォローアップセッションを希望しました。',
    explanation: '"so + 形容詞 + that S V" で「とても〜なので…」という構文。such の場合は such + a/an + 形容詞 + 名詞 の語順になる。',
  },
  {
    id: 'p5-11',
    sentence: 'Neither the manager nor the assistants ___ available for the call this afternoon.',
    options: ['is', 'was', 'are', 'has been'],
    correctIndex: 2,
    translation: 'マネージャーもアシスタントたちも今日の午後の電話には対応できません。',
    explanation: '"neither A nor B" の動詞はBに一致させる。the assistants は複数形なので are が適切。',
  },
  {
    id: 'p5-12',
    sentence: 'The product launch has been postponed ___ further notice.',
    options: ['until', 'by', 'at', 'in'],
    correctIndex: 0,
    translation: '製品発売は追って通知があるまで延期されました。',
    explanation: '"until further notice"（追って通知があるまで）は定型表現。',
  },
];

export const part5Groups: QuestionGroup[] = defs.map((d) => ({
  id: d.id,
  part: 5,
  items: [
    {
      id: `${d.id}-q`,
      prompt: d.sentence,
      options: d.options,
      correctIndex: d.correctIndex,
      translation: d.translation,
      explanation: d.explanation,
    },
  ],
}));
