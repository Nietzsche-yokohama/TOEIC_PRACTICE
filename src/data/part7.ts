import type { QuestionGroup } from '../types';

export const part7Groups: QuestionGroup[] = [
  {
    id: 'p7-1',
    part: 7,
    passageTitle: 'Job Opening: Marketing Coordinator',
    passage: [
      {
        body:
          'Bright Horizon Media is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have at least two years of experience in digital marketing and strong writing skills. Responsibilities include managing social media accounts, coordinating with the design team on promotional materials, and analyzing campaign performance.\n\nThis is a full-time position based in our downtown office, with the option to work remotely on Fridays. Interested applicants should send a resume and cover letter to careers@brighthorizon.com by August 20. Only candidates selected for an interview will be contacted.',
      },
    ],
    items: [
      {
        id: 'p7-1-q1',
        prompt: 'What is one requirement for the position?',
        options: [
          'A graduate degree',
          'At least two years of digital marketing experience',
          'Fluency in a second language',
          'Prior management experience',
        ],
        correctIndex: 1,
        translation: '正解: 「デジタルマーケティングの経験2年以上」。',
        explanation: '"at least two years of experience in digital marketing" と明記されている。',
      },
      {
        id: 'p7-1-q2',
        prompt: "What is included among the coordinator's responsibilities?",
        options: ['Hiring new staff', 'Managing social media accounts', 'Setting the marketing budget', 'Designing the company logo'],
        correctIndex: 1,
        translation: '正解: 「SNSアカウントの管理」。',
        explanation: '"Responsibilities include managing social media accounts" と記載されている。',
      },
      {
        id: 'p7-1-q3',
        prompt: 'How should applicants apply?',
        options: [
          'By submitting an online form',
          'By calling the office',
          'By sending a resume and cover letter to an email address',
          'By visiting in person',
        ],
        correctIndex: 2,
        translation: '正解: 「履歴書とカバーレターをメールで送る」。',
        explanation: '"should send a resume and cover letter to careers@brighthorizon.com" と案内されている。',
      },
    ],
  },
  {
    id: 'p7-2',
    part: 7,
    passageTitle: 'Reservation Confirmation - Bella Vista Restaurant',
    passage: [
      {
        body:
          'Dear Ms. Alvarez,\n\nThank you for booking a table at Bella Vista Restaurant. This email confirms your reservation for four guests on Saturday, June 14, at 7:00 PM.\n\nPlease note that we hold reservations for fifteen minutes past the scheduled time. If you expect to arrive later, kindly call us at 555-0199 so we can keep your table.\n\nWe also offer a private dining room for parties of eight or more; please let us know in advance if you would like to switch to a larger group. We look forward to welcoming you.\n\nBella Vista Restaurant',
      },
    ],
    items: [
      {
        id: 'p7-2-q1',
        prompt: 'What is the purpose of the email?',
        options: ['To confirm a restaurant reservation', 'To advertise a new menu', 'To request payment in advance', 'To cancel a reservation'],
        correctIndex: 0,
        translation: '正解: 「レストランの予約を確認するため」。',
        explanation: '"This email confirms your reservation" と冒頭に明記されている。',
      },
      {
        id: 'p7-2-q2',
        prompt: 'What should Ms. Alvarez do if she will arrive late?',
        options: ['Cancel the reservation', 'Call the restaurant', 'Arrive the next day', 'Email the manager'],
        correctIndex: 1,
        translation: '正解: 「レストランに電話する」。',
        explanation: '"If you expect to arrive later, kindly call us at 555-0199" と案内されている。',
      },
      {
        id: 'p7-2-q3',
        prompt: 'According to the email, when is the reservation held?',
        options: [
          'For fifteen minutes past the scheduled time',
          'For one hour',
          'Until the next morning',
          'Only if payment is made in advance',
        ],
        correctIndex: 0,
        translation: '正解: 「予定時刻から15分間」。',
        explanation: '"we hold reservations for fifteen minutes past the scheduled time" と記載されている。',
      },
    ],
  },
  {
    id: 'p7-3',
    part: 7,
    passageTitle: 'Order #58231 - Missing Item (Email Chain)',
    passage: [
      {
        heading: 'From: Daniel Reyes / To: Customer Service, Orbit Office Supplies / Subject: Order #58231 - Missing Item / Date: May 5',
        body:
          "Hello,\n\nI received my order (#58231) yesterday, but one item was missing — the box of blue ink cartridges I ordered. The rest of the order, including the printer paper and staplers, arrived in good condition.\n\nCould you please let me know if the cartridges will be shipped separately, or if I should place a new order? I need them for a client presentation this Friday.\n\nThank you,\nDaniel Reyes",
      },
      {
        heading: 'From: Customer Service, Orbit Office Supplies / To: Daniel Reyes / Subject: RE: Order #58231 - Missing Item / Date: May 6',
        body:
          'Dear Mr. Reyes,\n\nThank you for letting us know, and we apologize for the inconvenience. We checked our records and found that the ink cartridges were mistakenly left out of your shipment.\n\nWe have shipped the missing item today using express delivery at no extra charge, and it should arrive by Thursday, well before your presentation. As an apology, we have also applied a fifteen percent discount code, SORRY15, to your account for your next order.\n\nPlease let us know if you have any other questions.\n\nBest regards,\nCustomer Service Team\nOrbit Office Supplies',
      },
    ],
    items: [
      {
        id: 'p7-3-q1',
        prompt: 'Why did Daniel Reyes write to customer service?',
        options: ['An item was missing from his order', 'He wants to return an item', 'He received the wrong order', 'He was charged twice'],
        correctIndex: 0,
        translation: '正解: 「注文の商品が1点足りなかったため」。',
        explanation: '1通目のメールで"one item was missing"と述べている。',
      },
      {
        id: 'p7-3-q2',
        prompt: 'What was missing from the order?',
        options: ['Printer paper', 'Staplers', 'Ink cartridges', 'A printer'],
        correctIndex: 2,
        translation: '正解: 「インクカートリッジ」。',
        explanation: '"the box of blue ink cartridges I ordered" が届いていないと書かれている。',
      },
      {
        id: 'p7-3-q3',
        prompt: 'What did Orbit Office Supplies do to make up for the mistake?',
        options: [
          'Refunded the full order',
          'Shipped the item by express delivery and gave a discount code',
          'Canceled the order',
          'Sent a replacement printer',
        ],
        correctIndex: 1,
        translation: '正解: 「速達で無料発送し、割引コードを提供した」。',
        explanation: '2通目の返信メールで"shipped the missing item today using express delivery at no extra charge"、"applied a fifteen percent discount code"と説明している。2通の文書を照合して答える設問。',
      },
    ],
  },
];
