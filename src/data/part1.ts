import type { QuestionGroup } from '../types';

export const part1Groups: QuestionGroup[] = [
  {
    id: 'p1-1',
    part: 1,
    photo: { src: '/images/part1/desk.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-1-q',
        prompt: '',
        options: [
          'He is typing on a laptop computer.',
          'He is talking on the phone.',
          'He is reading a newspaper at his desk.',
          'He is standing beside the desk.',
        ],
        correctIndex: 0,
        translation: '正解: 「彼はノートパソコンでタイピングしている」。男性はデスクに座り、ノートパソコンを操作している。',
        explanation: '(B)は電話の描写だが、男性は電話で話していない。(C)は新聞ではなくパソコンを操作している。(D)は座っているのに「立っている」としており不一致。',
      },
    ],
  },
  {
    id: 'p1-2',
    part: 1,
    photo: { src: '/images/part1/handshake.jpg', credit: 'Photo: Homedust (CC BY 2.0)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-2-q',
        prompt: '',
        options: [
          'They are signing a contract.',
          'They are shaking hands.',
          'They are looking at a computer screen.',
          'They are carrying boxes into the room.',
        ],
        correctIndex: 1,
        translation: '正解: 「彼らは握手をしている」。机の上のノートパソコンや書類越しに二人が手を握り合っている。',
        explanation: '(A)契約書らしき書類は見えるが、今まさに署名している様子ではない。(C)画面を見てはいない。(D)箱を運ぶ描写はない。',
      },
    ],
  },
  {
    id: 'p1-3',
    part: 1,
    photo: { src: '/images/part1/warehouse.jpg', credit: 'Photo: USDA (Public Domain)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-3-q',
        prompt: '',
        options: [
          'The boxes have been wrapped in plastic and stacked on pallets.',
          'A worker is carrying a box on his shoulder.',
          'The warehouse shelves are completely empty.',
          'Boxes are being unloaded onto the floor.',
        ],
        correctIndex: 0,
        translation: '正解: 「箱はラップで包まれ、パレットに積み上げられている」。倉庫内に梱包済みの荷物が整然と並んでいる状態を描写。',
        explanation: 'TOEIC Part1では「すでに完了した状態」を現在完了の受動態で描写する選択肢が頻出。(B)人物が箱を担いでいる描写はない。(C)棚は箱で埋まっており空ではない。(D)床に降ろされている最中ではない。',
      },
    ],
  },
  {
    id: 'p1-4',
    part: 1,
    photo: { src: '/images/part1/street.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-4-q',
        prompt: '',
        options: [
          'Two men are standing on the street corner.',
          'The street has been closed to traffic.',
          'A cyclist is riding in the bike lane.',
          'Workers are repairing the road.',
        ],
        correctIndex: 0,
        translation: '正解: 「二人の男性が街角に立っている」。通りの角に男性二人が立ち、車道には車が走っている。',
        explanation: '(B)車が走行しており通行止めではない。(C)自転車に乗る人物は見えない。(D)道路工事の様子はない。',
      },
    ],
  },
  {
    id: 'p1-5',
    part: 1,
    photo: { src: '/images/part1/cafe.jpg', credit: 'Photo: Steve Parker (CC BY 2.0)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-5-q',
        prompt: '',
        options: [
          'A waiter is carrying plates of food.',
          'The waiter is washing dishes in the kitchen.',
          'The restaurant is completely empty.',
          'The tables have not been set yet.',
        ],
        correctIndex: 0,
        translation: '正解: 「ウェイターが料理の皿を運んでいる」。エプロン姿の男性が笑顔で皿を運んでいる。',
        explanation: '(B)皿を洗っている描写ではなく運んでいる最中。(C)背後に他の客の姿があり空ではない。(D)皿にはすでに料理が盛られている。',
      },
    ],
  },
  {
    id: 'p1-6',
    part: 1,
    photo: { src: '/images/part1/library.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-6-q',
        prompt: '',
        options: [
          'A book is being taken off the shelf.',
          'She is putting a book back on the shelf.',
          'The bookshelf is completely empty.',
          'She is reading a book at a table.',
        ],
        correctIndex: 0,
        translation: '正解: 「本が棚から取り出されている」。手が棚の本をつかみ、引き出そうとしている。',
        explanation: '(B)戻す動作ではなく取り出す動作。逆方向の動作を描写する定番の誤答パターン。(C)棚には本がぎっしり並んでいる。(D)机で読書はしていない。',
      },
    ],
  },
  {
    id: 'p1-7',
    part: 1,
    photo: { src: '/images/part1/park.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-7-q',
        prompt: '',
        options: [
          'A man is watering the plants in the park.',
          'A man is jogging along the path.',
          'A man is sitting on a bench.',
          'The bench is unoccupied.',
        ],
        correctIndex: 2,
        translation: '正解: 「男性はベンチに座っている」。公園のベンチに人物が腰掛けている場面。',
        explanation: '(A)水やりの描写はない。(B)ジョギングはしていない、座っている。(D)ベンチには人が座っており「無人」ではない。',
      },
    ],
  },
  {
    id: 'p1-8',
    part: 1,
    photo: { src: '/images/part1/meeting.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-8-q',
        prompt: '',
        options: [
          'The employees are eating lunch together.',
          'Chairs have been stacked against the wall.',
          'A presentation is being given to the group.',
          'A man is writing on the whiteboard.',
        ],
        correctIndex: 2,
        translation: '正解: 「グループにプレゼンテーションが行われている」。教壇に立つ女性が着席した聴衆に向かって話している。',
        explanation: '(A)食事の描写はない。(B)椅子は着席用に並んでおり積まれていない。(D)話しているのは女性で、黒板は何も書かれていない。',
      },
    ],
  },
  {
    id: 'p1-9',
    part: 1,
    photo: { src: '/images/part1/kitchen.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-9-q',
        prompt: '',
        options: [
          'A woman is stirring food in a pot.',
          'A woman is washing vegetables in the sink.',
          'The stove has been turned off.',
          'A woman is setting the table.',
        ],
        correctIndex: 0,
        translation: '正解: 「女性は鍋の中の料理をかき混ぜている」。大きな鍋に木べらを入れてかき混ぜている場面。',
        explanation: '(B)シンクで洗っている描写はない。(C)コンロは使用中で火が入っている。(D)食卓を準備している様子ではない。',
      },
    ],
  },
  {
    id: 'p1-10',
    part: 1,
    photo: { src: '/images/part1/grocery.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-10-q',
        prompt: '',
        options: [
          'A girl is holding a piece of broccoli.',
          'The shelves have been left empty.',
          'A woman is paying at the checkout counter.',
          'The vegetables are being loaded onto a truck.',
        ],
        correctIndex: 0,
        translation: '正解: 「女の子はブロッコリーを手に持っている」。母親と娘が青果コーナーで野菜を見ている場面。',
        explanation: '(B)棚には野菜が豊富に並んでいる。(C)レジでの会計場面ではない。(D)トラックへの積み込みは描かれていない。',
      },
    ],
  },
  {
    id: 'p1-11',
    part: 1,
    photo: { src: '/images/part1/station.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-11-q',
        prompt: '',
        options: [
          'A group of people is standing near the railing.',
          'The platform is completely empty.',
          'Passengers are boarding a train.',
          'A man is sitting on a bench.',
        ],
        correctIndex: 0,
        translation: '正解: 「人々の一団が柵の近くに立っている」。駅のプラットフォームらしき場所に複数人が立っている。',
        explanation: '(B)複数の人が写っており無人ではない。(C)電車への乗車場面は写っていない。(D)ベンチに座る人物はいない。',
      },
    ],
  },
  {
    id: 'p1-12',
    part: 1,
    photo: { src: '/images/part1/classroom.jpg', credit: 'Photo: flickingerbrad (CC BY 2.0)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-12-q',
        prompt: '',
        options: [
          'A teacher is standing at the front of the classroom.',
          'The students have left the classroom.',
          'The desks have been stacked against the wall.',
          'A teacher is handing out exams.',
        ],
        correctIndex: 0,
        translation: '正解: 「教師は教室の前方に立っている」。黒板の前に立つ教師と、着席して勉強する生徒たちの様子。',
        explanation: '(B)生徒たちは席に着いている。(C)机は通常通り並んでいる。(D)試験用紙を配る描写はない。',
      },
    ],
  },
  {
    id: 'p1-13',
    part: 1,
    photo: { src: '/images/part1/bicycle.jpg', credit: 'Photo: Go-tea 郭天 (CC BY 2.0)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-13-q',
        prompt: '',
        options: [
          'A man is riding a bicycle.',
          'The bicycles have been chained to a fence.',
          'A man is repairing a bicycle tire.',
          'A man is walking his bicycle.',
        ],
        correctIndex: 0,
        translation: '正解: 「男性は自転車に乗っている」。手前の男性が自転車を漕いで走っている場面。',
        explanation: '(B)背後の自転車は壁に立てかけてあり、鎖でつながれてはいない。(C)修理している様子はない。(D)乗車中であり、押して歩いてはいない。',
      },
    ],
  },
  {
    id: 'p1-14',
    part: 1,
    photo: { src: '/images/part1/construction.jpg', credit: 'Photo: billjacobus1 (CC BY 2.0)' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-14-q',
        prompt: '',
        options: [
          'A crane hook is being lowered to the workers.',
          'The workers are sitting on the ground.',
          'A ladder is leaning against the wall.',
          'The construction site has been abandoned.',
        ],
        correctIndex: 0,
        translation: '正解: 「クレーンのフックが作業員のところへ下ろされている」。鉄筋の上に立つ作業員たちの頭上にクレーンのフックが下りてきている。',
        explanation: '(B)作業員は立って作業しており座っていない。(C)はしごは見当たらない。(D)作業員がいて活動中であり放置されていない。',
      },
    ],
  },
  {
    id: 'p1-15',
    part: 1,
    photo: { src: '/images/part1/market.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-15-q',
        prompt: '',
        options: [
          'A woman is looking at vegetables displayed at a market.',
          'The market stall has been closed for the day.',
          'A woman is paying with a credit card.',
          'The baskets on the table are empty.',
        ],
        correctIndex: 0,
        translation: '正解: 「女性は市場に並ぶ野菜を眺めている」。屋外マーケットの野菜スタンドの前に女性が立っている。',
        explanation: '(B)野菜が並び営業中である。(C)支払いの場面ではない。(D)かごには野菜がたっぷり入っている。',
      },
    ],
  },
  {
    id: 'p1-16',
    part: 1,
    photo: { src: '/images/part1/delivery.jpg' },
    spokenOptions: true,
    items: [
      {
        id: 'p1-16-q',
        prompt: '',
        options: [
          'A man is folding a cardboard box.',
          'A man is loading boxes onto a truck.',
          'The boxes have been left on the floor.',
          'A man is stacking chairs in the corner.',
        ],
        correctIndex: 0,
        translation: '正解: 「男性は段ボール箱を組み立てている」。ベルトコンベアの脇で男性が箱を扱っている場面。',
        explanation: '(B)トラックへの積み込みは描かれていない。(C)箱はコンベア上にあり床にはない。(D)椅子は登場しない。',
      },
    ],
  },
];
