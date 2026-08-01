import type { QuestionGroup } from '../types';

export const part3Groups: QuestionGroup[] = [
  {
    id: 'p3-1',
    part: 3,
    audioScript: [
      { speaker: 'A', text: 'Hi Tom, did the shipment of office chairs arrive today?' },
      {
        speaker: 'B',
        text: "No, actually. I just got a call from the supplier. They said there's a delay because of a warehouse issue.",
      },
      {
        speaker: 'A',
        text: "That's a problem. We have new employees starting Monday and they'll need somewhere to sit.",
      },
      {
        speaker: 'B',
        text: 'I know. I already asked if they could expedite part of the order. They said they can send twenty chairs by Friday.',
      },
      {
        speaker: 'A',
        text: 'Okay, that should be enough to get us through the weekend. Can you email me the updated delivery schedule?',
      },
      { speaker: 'B', text: "Sure, I'll send it right after this call." },
    ],
    items: [
      {
        id: 'p3-1-q1',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'A delayed delivery of office chairs',
          'A canceled meeting',
          "A new employee's schedule",
          'A software problem',
        ],
        correctIndex: 0,
        translation: '正解: 「オフィスチェアの配送遅延」について話している。',
        explanation: '会話冒頭でチェアの配送が届いたか尋ね、以降ずっと配送遅延について話している。',
      },
      {
        id: 'p3-1-q2',
        prompt: 'Why was the shipment delayed?',
        options: ['Bad weather', "A warehouse issue at the supplier's", 'A billing error', 'A staffing shortage'],
        correctIndex: 1,
        translation: '正解: 「サプライヤー側の倉庫の問題」。',
        explanation: '男性が"there\'s a delay because of a warehouse issue"と述べている。',
      },
      {
        id: 'p3-1-q3',
        prompt: 'What will the man most likely do next?',
        options: ['Call the supplier again', 'Order more chairs', 'Send an email with the delivery schedule', 'Visit the warehouse'],
        correctIndex: 2,
        translation: '正解: 「配送スケジュールをメールで送る」。',
        explanation: '女性の依頼に対し男性が"I\'ll send it right after this call."と応じている。',
      },
    ],
  },
  {
    id: 'p3-2',
    part: 3,
    audioScript: [
      { speaker: 'A', text: "Hi, this is Mark from the IT department. I heard you're having trouble with the projector in Meeting Room A." },
      {
        speaker: 'B',
        text: "Yes, thanks for calling back. It won't turn on, and we have a client presentation in about an hour.",
      },
      {
        speaker: 'A',
        text: 'I can come take a look right now. In the meantime, would you like to switch to Meeting Room C? It has a similar setup.',
      },
      { speaker: 'B', text: 'That would be great. Could you also bring an extra HDMI cable, just in case?' },
      { speaker: 'A', text: "Sure, no problem. I'll head over in a few minutes." },
      { speaker: 'B', text: 'Thank you so much. I really appreciate it.' },
    ],
    items: [
      {
        id: 'p3-2-q1',
        prompt: "What is the woman's problem?",
        options: [
          'She lost her presentation file',
          "The projector won't turn on",
          'The room is already booked',
          'Her client canceled the meeting',
        ],
        correctIndex: 1,
        translation: '正解: 「プロジェクターの電源が入らない」。',
        explanation: '女性が"It won\'t turn on"とプロジェクターの不具合を説明している。',
      },
      {
        id: 'p3-2-q2',
        prompt: 'What does the man suggest?',
        options: ['Rescheduling the presentation', 'Using a different meeting room', 'Buying a new projector', 'Calling the client'],
        correctIndex: 1,
        translation: '正解: 「別の会議室を使うこと」。',
        explanation: '男性が"would you like to switch to Meeting Room C?"と別室を提案している。',
      },
      {
        id: 'p3-2-q3',
        prompt: 'What does the woman ask the man to bring?',
        options: ['A new projector', 'A laptop charger', 'An HDMI cable', 'Presentation handouts'],
        correctIndex: 2,
        translation: '正解: 「HDMIケーブル」。',
        explanation: '女性が"Could you also bring an extra HDMI cable"と依頼している。',
      },
    ],
  },
  {
    id: 'p3-3',
    part: 3,
    audioScript: [
      {
        speaker: 'A',
        text: 'Hi James, I just checked our flight to the Chicago conference, and it looks like it has been delayed by two hours.',
      },
      { speaker: 'B', text: 'Oh no, that means we might miss the shuttle bus to the hotel. What time does the new flight land?' },
      {
        speaker: 'A',
        text: 'Around nine PM instead of seven. I already looked into a later shuttle, but the last one leaves at eight thirty.',
      },
      { speaker: 'B', text: 'In that case, maybe we should just take a taxi from the airport instead.' },
      { speaker: 'A', text: "That's probably easier. I'll book one in advance so we don't have to wait when we land." },
      { speaker: 'B', text: 'Sounds good. Thanks for taking care of that.' },
    ],
    items: [
      {
        id: 'p3-3-q1',
        prompt: 'What is the problem?',
        options: ['Their flight has been delayed', 'The conference has been canceled', 'They lost their hotel reservation', 'Their tickets were for the wrong date'],
        correctIndex: 0,
        translation: '正解: 「フライトが遅延した」。',
        explanation: '女性が"it looks like it has been delayed by two hours"と述べている。',
      },
      {
        id: 'p3-3-q2',
        prompt: 'What will they probably miss?',
        options: ['The conference registration', 'The shuttle bus to the hotel', 'Their connecting flight', 'The welcome dinner'],
        correctIndex: 1,
        translation: '正解: 「ホテル行きのシャトルバス」。',
        explanation: '男性が"we might miss the shuttle bus to the hotel"と懸念している。',
      },
      {
        id: 'p3-3-q3',
        prompt: 'What does the woman offer to do?',
        options: ['Change their flight', 'Call the hotel', 'Book a taxi in advance', 'Cancel the trip'],
        correctIndex: 2,
        translation: '正解: 「タクシーを事前に予約する」。',
        explanation: '女性が"I\'ll book one in advance"とタクシーの事前予約を申し出ている。',
      },
    ],
  },
];
