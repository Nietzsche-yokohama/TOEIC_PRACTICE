import type { QuestionGroup } from '../types';

const BG = '#eef1f5';

const SVG_DESK = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="40" y="190" width="320" height="12" fill="#8b5e34"/>
  <rect x="60" y="202" width="14" height="40" fill="#6b4423"/>
  <rect x="326" y="202" width="14" height="40" fill="#6b4423"/>
  <rect x="180" y="150" width="90" height="42" rx="4" fill="#2b2f36"/>
  <rect x="186" y="156" width="78" height="30" fill="#4f9dff"/>
  <rect x="170" y="190" width="110" height="8" rx="3" fill="#1c1e22"/>
  <circle cx="150" cy="95" r="26" fill="#e8b98a"/>
  <path d="M124 90a26 26 0 0 1 52 0v-6h-52z" fill="#3d2b1f"/>
  <rect x="118" y="118" width="64" height="72" rx="18" fill="#4676c9"/>
  <rect x="300" y="160" width="30" height="12" rx="3" fill="#d7d9de"/>
</svg>`.trim();

const SVG_HANDSHAKE = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="210" width="400" height="50" fill="#d7dbe2"/>
  <circle cx="150" cy="100" r="24" fill="#e8b98a"/>
  <path d="M126 96a24 24 0 0 1 48 0v-5h-48z" fill="#2a2a2a"/>
  <rect x="120" y="122" width="60" height="90" rx="16" fill="#3f6fb0"/>
  <circle cx="250" cy="100" r="24" fill="#c98a55"/>
  <path d="M226 96a24 24 0 0 1 48 0v-5h-48z" fill="#1c1c1c"/>
  <rect x="220" y="122" width="60" height="90" rx="16" fill="#b0524a"/>
  <rect x="176" y="168" width="48" height="14" rx="7" fill="#e8b98a" transform="rotate(-6 176 168)"/>
</svg>`.trim();

const SVG_WAREHOUSE = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="220" width="400" height="40" fill="#c7cbd1"/>
  <rect x="60" y="150" width="46" height="46" fill="#c98f4a"/>
  <rect x="112" y="150" width="46" height="46" fill="#d1a35c"/>
  <rect x="60" y="100" width="46" height="46" fill="#d1a35c"/>
  <rect x="260" y="130" width="30" height="90" rx="4" fill="#5b6470"/>
  <circle cx="264" cy="222" r="10" fill="#2b2f36"/>
  <circle cx="286" cy="222" r="10" fill="#2b2f36"/>
  <rect x="230" y="110" width="34" height="34" fill="#c98f4a"/>
  <circle cx="210" cy="150" r="22" fill="#e8b98a"/>
  <path d="M188 146a22 22 0 0 1 44 0v-5h-44z" fill="#333"/>
  <rect x="182" y="170" width="56" height="70" rx="14" fill="#3f9d5c"/>
</svg>`.trim();

const SVG_STREET = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="150" width="400" height="70" fill="#5a5f66"/>
  <rect x="0" y="220" width="400" height="40" fill="#8ea06b"/>
  <rect x="0" y="180" width="400" height="6" fill="#f2d675" opacity="0.8"/>
  <g>
    <rect x="60" y="170" width="6" height="14" fill="#fff"/>
    <rect x="76" y="170" width="6" height="14" fill="#fff"/>
    <rect x="92" y="170" width="6" height="14" fill="#fff"/>
    <rect x="108" y="170" width="6" height="14" fill="#fff"/>
  </g>
  <rect x="20" y="130" width="60" height="26" rx="4" fill="#b0524a"/>
  <circle cx="34" cy="158" r="8" fill="#222"/>
  <circle cx="66" cy="158" r="8" fill="#222"/>
  <rect x="300" y="130" width="60" height="26" rx="4" fill="#3f6fb0"/>
  <circle cx="314" cy="158" r="8" fill="#222"/>
  <circle cx="346" cy="158" r="8" fill="#222"/>
  <circle cx="200" cy="145" r="16" fill="#e8b98a"/>
  <path d="M184 141a16 16 0 0 1 32 0v-4h-32z" fill="#222"/>
  <rect x="188" y="160" width="24" height="40" rx="10" fill="#e0a23c"/>
</svg>`.trim();

const SVG_CAFE = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="230" width="400" height="30" fill="#cdbfa4"/>
  <circle cx="120" cy="180" r="46" fill="none" stroke="#8b5e34" stroke-width="10"/>
  <rect x="112" y="220" width="16" height="20" fill="#8b5e34"/>
  <circle cx="90" cy="150" r="18" fill="#e8b98a"/>
  <rect x="76" y="168" width="28" height="42" rx="10" fill="#4f9dff"/>
  <circle cx="152" cy="150" r="18" fill="#c98a55"/>
  <rect x="138" y="168" width="28" height="42" rx="10" fill="#b0524a"/>
  <rect x="108" y="172" width="24" height="14" rx="3" fill="#fff"/>
  <circle cx="290" cy="140" r="16" fill="#e8b98a"/>
  <rect x="278" y="156" width="24" height="50" rx="10" fill="#2b2f36"/>
  <rect x="300" y="170" width="26" height="10" rx="3" fill="#f2f2f2"/>
</svg>`.trim();

const SVG_LIBRARY = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="30" y="20" width="340" height="180" fill="#8b5e34"/>
  <g fill="#e0a23c">
    <rect x="40" y="30" width="14" height="60"/>
    <rect x="58" y="30" width="14" height="60"/>
    <rect x="76" y="30" width="14" height="60"/>
    <rect x="94" y="30" width="14" height="60"/>
    <rect x="112" y="30" width="14" height="60"/>
    <rect x="40" y="100" width="14" height="60"/>
    <rect x="58" y="100" width="14" height="60"/>
    <rect x="94" y="100" width="14" height="60"/>
    <rect x="112" y="100" width="14" height="60"/>
  </g>
  <circle cx="230" cy="90" r="20" fill="#c98a55"/>
  <rect x="216" y="108" width="28" height="70" rx="10" fill="#7a5ba6"/>
  <rect x="76" y="60" width="18" height="26" fill="#d94f4f"/>
  <rect x="0" y="200" width="400" height="60" fill="#d7dbe2"/>
</svg>`.trim();

const SVG_PARK = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="200" width="400" height="60" fill="#8ea06b"/>
  <circle cx="80" cy="90" r="40" fill="#5f9e5f"/>
  <rect x="74" y="120" width="12" height="40" fill="#6b4423"/>
  <circle cx="320" cy="80" r="34" fill="#5f9e5f"/>
  <rect x="314" y="106" width="12" height="40" fill="#6b4423"/>
  <rect x="160" y="190" width="120" height="10" fill="#7a5537"/>
  <rect x="168" y="200" width="10" height="24" fill="#5c3f27"/>
  <rect x="264" y="200" width="10" height="24" fill="#5c3f27"/>
  <circle cx="210" cy="150" r="18" fill="#e8b98a"/>
  <rect x="196" y="168" width="28" height="30" rx="8" fill="#3f9d5c"/>
  <rect x="196" y="196" width="12" height="30" fill="#2b2f36"/>
  <rect x="212" y="196" width="12" height="30" fill="#2b2f36"/>
  <rect x="226" y="150" width="20" height="14" rx="2" fill="#f2f2f2"/>
</svg>`.trim();

const SVG_MEETING = `
<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="${BG}"/>
  <rect x="0" y="30" width="140" height="90" fill="#fff" stroke="#c7cbd1" stroke-width="4"/>
  <rect x="14" y="44" width="90" height="8" fill="#4f9dff"/>
  <rect x="14" y="60" width="70" height="8" fill="#9fb8d9"/>
  <rect x="60" y="200" width="280" height="14" fill="#8b5e34"/>
  <circle cx="200" cy="90" r="20" fill="#c98a55"/>
  <rect x="186" y="110" width="28" height="60" rx="10" fill="#d94f4f"/>
  <circle cx="250" cy="150" r="16" fill="#e8b98a"/>
  <rect x="238" y="166" width="24" height="34" rx="8" fill="#3f6fb0"/>
  <circle cx="150" cy="150" r="16" fill="#e8b98a"/>
  <rect x="138" y="166" width="24" height="34" rx="8" fill="#7a5ba6"/>
  <circle cx="300" cy="150" r="16" fill="#c98a55"/>
  <rect x="288" y="166" width="24" height="34" rx="8" fill="#3f9d5c"/>
</svg>`.trim();

export const part1Groups: QuestionGroup[] = [
  {
    id: 'p1-1',
    part: 1,
    svg: SVG_DESK,
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
        translation: '正解: 「彼はノートパソコンでタイピングしている」。男性はデスクに座り、ノートパソコンに向かっている。',
        explanation: '(B)は電話の描写だが、男性は電話で話していない。(C)は新聞ではなくパソコンを見ている。(D)は座っているのに「立っている」としており不一致。',
      },
    ],
  },
  {
    id: 'p1-2',
    part: 1,
    svg: SVG_HANDSHAKE,
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
        translation: '正解: 「彼らは握手をしている」。二人が向かい合って手を握り合っている場面。',
        explanation: '(A)契約書を書いている様子は描かれていない。(C)画面は登場しない。(D)箱を運ぶ描写はない。',
      },
    ],
  },
  {
    id: 'p1-3',
    part: 1,
    svg: SVG_WAREHOUSE,
    spokenOptions: true,
    items: [
      {
        id: 'p1-3-q',
        prompt: '',
        options: [
          'Boxes have already been stacked on the shelves.',
          'A worker is loading a truck.',
          'A worker is pushing a cart down the aisle.',
          'Some boxes have fallen onto the floor.',
        ],
        correctIndex: 0,
        translation: '正解: 「箱はすでに棚に積まれている」。棚に箱が積まれた状態（結果の状態）を描写する定番パターン。',
        explanation: 'TOEIC Part1では「すでに完了した状態」を現在完了形で描写する選択肢が頻出。(B)トラックは登場しない。(C)カートを押している最中ではない。(D)箱は落ちていない。',
      },
    ],
  },
  {
    id: 'p1-4',
    part: 1,
    svg: SVG_STREET,
    spokenOptions: true,
    items: [
      {
        id: 'p1-4-q',
        prompt: '',
        options: [
          'A pedestrian is crossing the street.',
          'Cars are stopped at a traffic light.',
          'A cyclist is riding along the sidewalk.',
          'Workers are repairing the road.',
        ],
        correctIndex: 0,
        translation: '正解: 「歩行者が道路を横断している」。横断歩道を歩いて渡る人物が描かれている。',
        explanation: '(B)信号での停車は描写されていない。(C)自転車は登場しない。(D)道路工事の様子はない。',
      },
    ],
  },
  {
    id: 'p1-5',
    part: 1,
    svg: SVG_CAFE,
    spokenOptions: true,
    items: [
      {
        id: 'p1-5-q',
        prompt: '',
        options: [
          'The outdoor tables are all empty.',
          'A server is bringing food to the table.',
          'The customers are washing the dishes.',
          'Some chairs are stacked in the corner.',
        ],
        correctIndex: 1,
        translation: '正解: 「店員がテーブルに料理を運んでいる」。カフェのテーブルで接客している様子。',
        explanation: '(A)テーブルには客が座っており「空」ではない。(C)客が皿を洗うことは通常ない不自然な描写。(D)椅子が積まれている描写はない。',
      },
    ],
  },
  {
    id: 'p1-6',
    part: 1,
    svg: SVG_LIBRARY,
    spokenOptions: true,
    items: [
      {
        id: 'p1-6-q',
        prompt: '',
        options: [
          'She is reaching for a book on a high shelf.',
          'She is reading a book at a desk.',
          'Books have been scattered on the floor.',
          'She is arranging chairs in a row.',
        ],
        correctIndex: 0,
        translation: '正解: 「彼女は高い棚の本に手を伸ばしている」。書架の前に立ち本を取ろうとしている場面。',
        explanation: '(B)机で読書はしていない。(C)本は棚にあり床に散乱していない。(D)椅子を並べる描写はない。',
      },
    ],
  },
  {
    id: 'p1-7',
    part: 1,
    svg: SVG_PARK,
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
        translation: '正解: 「男性はベンチに座っている」。公園のベンチに人物が座っている場面。',
        explanation: '(A)水やりの描写はない。(B)ジョギングはしていない、座っている。(D)ベンチには人が座っており「無人」ではない。',
      },
    ],
  },
  {
    id: 'p1-8',
    part: 1,
    svg: SVG_MEETING,
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
        translation: '正解: 「グループにプレゼンテーションが行われている」。スクリーンを使った説明の場面。',
        explanation: '(A)食事の描写はない。(B)椅子はテーブルの周りにあり積まれていない。(D)説明しているのは男性ではなく、ホワイトボードでもなくスクリーン。主語の不一致に注意。',
      },
    ],
  },
];
