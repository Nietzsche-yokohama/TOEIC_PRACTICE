import type { QuestionGroup } from '../types';

export const part4Groups: QuestionGroup[] = [
  {
    id: 'p4-1',
    part: 4,
    audioScript: [
      {
        speaker: 'A',
        text: "Attention shoppers. We'd like to remind you that our store will be closing early today at six PM for building maintenance. All departments, including the pharmacy, will close at that time. If you're currently shopping, please make your way to the checkout counters within the next thirty minutes. We apologize for any inconvenience and look forward to seeing you tomorrow, when we'll resume our regular hours of nine AM to nine PM. Thank you for shopping with us.",
      },
    ],
    items: [
      {
        id: 'p4-1-q1',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To advertise a sale',
          'To inform customers of an early closing time',
          'To announce a new store location',
          'To introduce a new department',
        ],
        correctIndex: 1,
        translation: '正解: 「早期閉店を知らせるため」。',
        explanation: '冒頭で"our store will be closing early today at six PM"と述べている。',
      },
      {
        id: 'p4-1-q2',
        prompt: 'Why is the store closing early?',
        options: ['For a holiday', 'For building maintenance', 'Due to a staff shortage', 'Due to bad weather'],
        correctIndex: 1,
        translation: '正解: 「建物のメンテナンスのため」。',
        explanation: '"for building maintenance"と理由が明示されている。',
      },
      {
        id: 'p4-1-q3',
        prompt: 'What should shoppers do?',
        options: [
          'Go to the checkout within thirty minutes',
          'Come back tomorrow morning',
          'Visit the pharmacy first',
          'Wait outside the store',
        ],
        correctIndex: 0,
        translation: '正解: 「30分以内にレジへ向かう」。',
        explanation: '"please make your way to the checkout counters within the next thirty minutes"と案内している。',
      },
    ],
  },
  {
    id: 'p4-2',
    part: 4,
    audioScript: [
      {
        speaker: 'A',
        text: 'May I have your attention, please. This is a boarding announcement for flight four eighty-two to Vancouver. We are now inviting passengers seated in rows one through fifteen, as well as those traveling with small children, to begin boarding at gate twelve. Please have your boarding pass and identification ready for the gate agent. All other passengers will be invited to board shortly. We appreciate your patience and thank you for choosing SkyPacific Airlines.',
      },
    ],
    items: [
      {
        id: 'p4-2-q1',
        prompt: 'What is being announced?',
        options: ['A flight delay', 'The boarding of a flight', 'A gate change', 'A baggage claim update'],
        correctIndex: 1,
        translation: '正解: 「搭乗案内」。',
        explanation: '"This is a boarding announcement for flight four eighty-two"と搭乗案内であることが分かる。',
      },
      {
        id: 'p4-2-q2',
        prompt: 'Who is invited to board first?',
        options: [
          'Passengers in rows one through fifteen',
          'Business class passengers only',
          'Passengers with pets',
          'Passengers who checked in late',
        ],
        correctIndex: 0,
        translation: '正解: 「1〜15列の乗客」。',
        explanation: '"passengers seated in rows one through fifteen...to begin boarding"と案内されている。',
      },
      {
        id: 'p4-2-q3',
        prompt: 'What should passengers have ready?',
        options: ['A printed itinerary', 'Their boarding pass and identification', 'Payment for extra baggage', 'A customs form'],
        correctIndex: 1,
        translation: '正解: 「搭乗券と身分証明書」。',
        explanation: '"Please have your boarding pass and identification ready"と指示されている。',
      },
    ],
  },
  {
    id: 'p4-3',
    part: 4,
    audioScript: [
      {
        speaker: 'A',
        gender: 'female',
        text: "Hi, this is Rachel from Bright Path Consulting returning your call about the workshop schedule. I checked with our trainers, and we can move the session from Tuesday to Thursday afternoon if that works better for your team. Could you give me a call back by the end of the day to confirm? Also, I'll need the final number of participants so we can prepare enough materials. You can reach me at extension two-two-one. Thanks, and I look forward to hearing from you.",
      },
    ],
    items: [
      {
        id: 'p4-3-q1',
        prompt: 'Why is Rachel calling?',
        options: [
          'To cancel a workshop',
          'To follow up about rescheduling a workshop',
          'To request payment',
          'To confirm a job offer',
        ],
        correctIndex: 1,
        translation: '正解: 「研修日程の変更について折り返し連絡している」。',
        explanation: '"returning your call about the workshop schedule"、日程変更の提案をしている。',
      },
      {
        id: 'p4-3-q2',
        prompt: 'What does Rachel need from the listener?',
        options: ['A signed contract', 'The number of participants', 'A list of trainers', 'The workshop location'],
        correctIndex: 1,
        translation: '正解: 「参加人数」。',
        explanation: '"I\'ll need the final number of participants"と述べている。',
      },
      {
        id: 'p4-3-q3',
        prompt: 'What does Rachel ask the listener to do?',
        options: ['Email her the details', 'Call her back by the end of the day', 'Visit her office', 'Send a confirmation letter'],
        correctIndex: 1,
        translation: '正解: 「今日中に折り返し電話する」。',
        explanation: '"Could you give me a call back by the end of the day to confirm?"と依頼している。',
      },
    ],
  },
];
