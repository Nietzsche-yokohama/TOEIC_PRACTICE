import type { QuestionGroup } from '../types';

// 選択肢は出題時にシャッフルされるため、解説では (A)(B) のような記号ではなく
// 選択肢の英文そのものを引用して説明する。
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
        explanation:
          '「He is talking on the phone.」→ 電話で話している様子はない。「He is reading a newspaper at his desk.」→ 新聞ではなくノートパソコンを操作している。「He is standing beside the desk.」→ 椅子に座っており立ってはいない。',
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
        explanation:
          '「They are signing a contract.」→ 契約書らしき書類とペンは写っているが、ペン先を紙に当てて署名している人はいない。「They are looking at a computer screen.」→ 画面を見ている人物はいない。「They are carrying boxes into the room.」→ 箱は写っていない。',
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
          'The warehouse floor has been cleared.',
          'Boxes are being unloaded onto the floor.',
        ],
        correctIndex: 0,
        translation: '正解: 「箱はラップで包まれ、パレットに積み上げられている」。倉庫内に梱包済みの荷物が整然と並んでいる状態を描写。',
        explanation:
          'TOEIC Part1では「すでに完了した状態」を現在完了の受動態で描写する選択肢が頻出。「A worker is carrying a box on his shoulder.」→ 箱を担いでいる人物はいない。「The warehouse floor has been cleared.」→ 床にはパレットが所狭しと並んでいる。「Boxes are being unloaded onto the floor.」→ 荷降ろしの最中ではない。',
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
          'Workers are repairing the road.',
          'The shops along the street have been boarded up.',
        ],
        correctIndex: 0,
        translation: '正解: 「二人の男性が街角に立っている」。通りの角に男性二人が立ち、車道には車が走っている。',
        explanation:
          '「The street has been closed to traffic.」→ 車が何台も走行しており通行止めではない。「Workers are repairing the road.」→ 道路工事の様子はない。「The shops along the street have been boarded up.」→ 角の店はショーウィンドウが明るく灯り営業している。',
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
          'The dining room is completely empty.',
          'The plates on the table are empty.',
        ],
        correctIndex: 0,
        translation: '正解: 「ウェイターが料理の皿を運んでいる」。エプロン姿の男性が笑顔で皿を運んでいる。',
        explanation:
          '「The waiter is washing dishes in the kitchen.」→ 皿を洗ってはおらず、運んでいる最中。「The dining room is completely empty.」→ 背後に客の姿があり空ではない。「The plates on the table are empty.」→ 皿にはオリーブなどの料理が盛られている。',
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
          'A woman is holding a book in front of a bookshelf.',
          'The bookshelf has been emptied.',
          'She is reading a book at a table.',
          'Books are being packed into a box.',
        ],
        correctIndex: 0,
        translation: '正解: 「女性は本棚の前で本を手に持っている」。棚に手を伸ばし、一冊の本を持っている場面。',
        explanation:
          '静止画では「棚から取り出している」のか「棚に戻している」のかを判別できないため、動作の向きに依存しない描写が正解になる。「The bookshelf has been emptied.」→ 棚には本がぎっしり並んでいる。「She is reading a book at a table.」→ 机で読書はしていない。「Books are being packed into a box.」→ 箱詰めの様子はない。',
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
          'All of the benches are unoccupied.',
        ],
        correctIndex: 2,
        translation: '正解: 「男性はベンチに座っている」。公園のベンチに人物が腰掛けている場面。',
        explanation:
          '「A man is watering the plants in the park.」→ 水やりの描写はない。「A man is jogging along the path.」→ 走ってはおらず座っている。「All of the benches are unoccupied.」→ 空のベンチもあるが、男性が座っているベンチがあるため「すべて空」は誤り。',
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
          'Someone is writing on the blackboard.',
        ],
        correctIndex: 2,
        translation: '正解: 「グループにプレゼンテーションが行われている」。演台に立つ女性が着席した聴衆に向かって話している。',
        explanation:
          '「The employees are eating lunch together.」→ 食事の描写はない。「Chairs have been stacked against the wall.」→ 椅子は着席用に並んでおり積まれていない。「Someone is writing on the blackboard.」→ 黒板には何も書かれておらず、板書している人もいない。',
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
          'The pot has been left empty.',
          'A woman is setting the table.',
        ],
        correctIndex: 0,
        translation: '正解: 「女性は鍋の中の料理をかき混ぜている」。大きな鍋に木べらを入れてかき混ぜている場面。',
        explanation:
          '「A woman is washing vegetables in the sink.」→ シンクで洗っている描写はない。「The pot has been left empty.」→ 鍋にはトマトやインゲンの入った料理が入っている。「A woman is setting the table.」→ 食卓を準備している様子ではない。',
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
        explanation:
          '「The shelves have been left empty.」→ 棚には野菜が豊富に並んでいる。「A woman is paying at the checkout counter.」→ レジでの会計場面ではない。「The vegetables are being loaded onto a truck.」→ トラックへの積み込みは写っていない。',
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
          'A group of people is standing near a railing.',
          'The platform is completely empty.',
          'Passengers are boarding a train.',
          'A man is sitting on a bench.',
        ],
        correctIndex: 0,
        translation: '正解: 「人々の一団が柵の近くに立っている」。ガラス張りの建物の前、低い柵の向こうに複数人が立っている。',
        explanation:
          '「The platform is completely empty.」→ 複数の人が写っており無人ではない。「Passengers are boarding a train.」→ 列車は写っておらず乗車場面ではない。「A man is sitting on a bench.」→ ベンチも座っている人物も写っていない。',
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
        explanation:
          '「The students have left the classroom.」→ 生徒たちは席に着いている。「The desks have been stacked against the wall.」→ 机は通常通り並んでいる。「A teacher is handing out exams.」→ 試験用紙を配る描写はない。',
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
          'The bicycles have been loaded into a truck.',
          'A man is repairing a bicycle tire.',
          'A man is pushing a cart down the street.',
        ],
        correctIndex: 0,
        translation: '正解: 「男性は自転車に乗っている」。手前の男性が自転車を漕いで通りを走っている場面。',
        explanation:
          '「The bicycles have been loaded into a truck.」→ 他の自転車は建物の前に停めてあり、トラックは写っていない。「A man is repairing a bicycle tire.」→ 修理している様子はない。「A man is pushing a cart down the street.」→ カートを押している人物はいない。',
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
          'A crane hook is hanging above the workers.',
          'The workers are sitting on the ground.',
          'A ladder is leaning against the wall.',
          'The construction site has been abandoned.',
        ],
        correctIndex: 0,
        translation: '正解: 「クレーンのフックが作業員の頭上に吊り下がっている」。鉄筋の上に立つ作業員たちの上にクレーンのフックが下りてきている。',
        explanation:
          '静止画では「下ろしている(being lowered)」のか「巻き上げている」のかは判別できないため、状態を述べる hanging が正解になる。「The workers are sitting on the ground.」→ 作業員は立って作業している。「A ladder is leaning against the wall.」→ はしごは写っていない。「The construction site has been abandoned.」→ 作業員が作業中であり放置されていない。',
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
          'A vendor is weighing vegetables on a scale.',
        ],
        correctIndex: 0,
        translation: '正解: 「女性は市場に並ぶ野菜を眺めている」。屋外マーケットの野菜スタンドの前に女性が立っている。',
        explanation:
          '「The market stall has been closed for the day.」→ 野菜が並び営業中である。「A woman is paying with a credit card.」→ 支払いの場面ではない。「A vendor is weighing vegetables on a scale.」→ はかりも売り手の計量作業も写っていない。',
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
          'A man is holding a cardboard box with both hands.',
          'A man is loading boxes onto a truck.',
          'The boxes have been left on the floor.',
          'A man is stacking chairs in the corner.',
        ],
        correctIndex: 0,
        translation: '正解: 「男性は両手で段ボール箱を持っている」。ベルトコンベアの脇で男性が箱を手に持っている場面。',
        explanation:
          '「A man is loading boxes onto a truck.」→ トラックは写っていない。「The boxes have been left on the floor.」→ 箱はコンベアの上にあり床には置かれていない。「A man is stacking chairs in the corner.」→ 椅子は写っていない。',
      },
    ],
  },
];
