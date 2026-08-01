import type { QuestionGroup } from '../types';

export const part6Groups: QuestionGroup[] = [
  {
    id: 'p6-1',
    part: 6,
    passageTitle: 'Subject: Office Renovation Schedule',
    passage: [
      {
        body:
          'Dear Team,\n\nWe would like to inform you that the office renovation project will begin on March 3 and is expected to (1) for approximately three weeks. During this time, the west wing will be closed, and employees who normally work there will be (2) to temporary desks on the second floor.\n\nWe understand this may cause some inconvenience, and we appreciate your patience. (3), please note that the elevator will be out of service during the first week of construction.\n\nIf you have any questions about the renovation, (4) contact the facilities team at extension 305.\n\nThank you,\nFacilities Management',
      },
    ],
    items: [
      {
        id: 'p6-1-b1',
        prompt: '空欄 (1) に入る最も適切な語句を選びなさい。',
        options: ['last', 'lasts', 'lasting', 'to last'],
        correctIndex: 0,
        translation: '"is expected to last" で「〜続く見込みである」。to不定詞の後は動詞の原形。',
        explanation: 'be expected to + 動詞原形 の形。',
      },
      {
        id: 'p6-1-b2',
        prompt: '空欄 (2) に入る最も適切な語句を選びなさい。',
        options: ['relocate', 'relocated', 'relocating', 'relocation'],
        correctIndex: 1,
        translation: '"will be relocated to" で「〜に移される（受動態）」。',
        explanation: 'will be + 過去分詞 の受動態の形。',
      },
      {
        id: 'p6-1-b3',
        prompt: '空欄 (3) に入る最も適切な語句を選びなさい。',
        options: ['However', 'Therefore', 'Additionally', 'For example'],
        correctIndex: 2,
        translation: '前文の内容に情報を追加する文脈のため Additionally（さらに）が適切。',
        explanation: '逆接(However)でも結果(Therefore)でも例示(For example)でもなく、追加情報を示す語が適切。',
      },
      {
        id: 'p6-1-b4',
        prompt: '空欄 (4) に入る最も適切な語句を選びなさい。',
        options: ['please', 'pleasing', 'pleased', 'pleasure'],
        correctIndex: 0,
        translation: '"please contact" で「どうぞご連絡ください」という依頼表現。',
        explanation: '命令文の前に置く please が適切。',
      },
    ],
  },
  {
    id: 'p6-2',
    part: 6,
    passageTitle: 'Dear Member,',
    passage: [
      {
        body:
          'Dear Member,\n\nThank you for being a valued member of FitZone Gym. We are writing to remind you that your annual membership is (1) to expire on April 15. To continue enjoying full access to our facilities, please renew your membership before this date.\n\nMembers who renew online will receive a ten percent (2) on the annual fee. Simply log in to your account and click "Renew Now."\n\n(3) you have any trouble accessing your account, our support team is available by phone or email.\n\nWe look forward to (4) you continue your fitness journey with us.\n\nSincerely,\nFitZone Membership Team',
      },
    ],
    items: [
      {
        id: 'p6-2-b1',
        prompt: '空欄 (1) に入る最も適切な語句を選びなさい。',
        options: ['scheduled', 'schedule', 'schedules', 'scheduling'],
        correctIndex: 0,
        translation: '"is scheduled to expire" で「失効する予定である」。',
        explanation: 'be scheduled to + 動詞原形 の受動態の形。',
      },
      {
        id: 'p6-2-b2',
        prompt: '空欄 (2) に入る最も適切な語句を選びなさい。',
        options: ['discount', 'discounts', 'discounted', 'discounting'],
        correctIndex: 0,
        translation: '"a ten percent discount" で「10%の割引」という名詞。',
        explanation: 'a ten percent の後には名詞 discount が続く。',
      },
      {
        id: 'p6-2-b3',
        prompt: '空欄 (3) に入る最も適切な語句を選びなさい。',
        options: ['If', 'Because', 'Unless', 'Although'],
        correctIndex: 0,
        translation: '「もし何か問題があれば」という条件を表す If が適切。',
        explanation: '後続で「サポートチームが対応可能」と述べており、条件節としてIfが自然。',
      },
      {
        id: 'p6-2-b4',
        prompt: '空欄 (4) に入る最も適切な語句を選びなさい。',
        options: ['helping', 'helped', 'help', 'helps'],
        correctIndex: 0,
        translation: '"look forward to helping" で「〜の手助けをすることを楽しみにしている」。',
        explanation: 'look forward to の後は動名詞（-ing形）が続く。',
      },
    ],
  },
  {
    id: 'p6-3',
    part: 6,
    passageTitle: 'Re: Parking Policy Update',
    passage: [
      {
        body:
          "To: All Staff\nFrom: Administration Office\nRe: Parking Policy Update\n\nStarting next Monday, all employees will be (1) to display a valid parking permit on their vehicle's dashboard. Permits can be obtained free of charge at the security office on the first floor.\n\nEmployees who fail to display a permit may (2) a warning notice or, in repeated cases, have their vehicle towed. We recommend picking up your permit as (3) as possible to avoid any inconvenience.\n\nVisitors should continue to use the designated visitor spaces near the main entrance. (4), we ask that staff avoid parking in these spaces at all times.\n\nThank you for your cooperation.",
      },
    ],
    items: [
      {
        id: 'p6-3-b1',
        prompt: '空欄 (1) に入る最も適切な語句を選びなさい。',
        options: ['require', 'required', 'requiring', 'requires'],
        correctIndex: 1,
        translation: '"will be required to display" で「表示することが義務付けられる」。',
        explanation: 'will be + 過去分詞 の受動態の形。',
      },
      {
        id: 'p6-3-b2',
        prompt: '空欄 (2) に入る最も適切な語句を選びなさい。',
        options: ['receive', 'receiving', 'received', 'receives'],
        correctIndex: 0,
        translation: '"may receive a warning notice" で「警告を受け取る可能性がある」。',
        explanation: '助動詞 may の後は動詞の原形。',
      },
      {
        id: 'p6-3-b3',
        prompt: '空欄 (3) に入る最も適切な語句を選びなさい。',
        options: ['soon', 'sooner', 'soonest', 'so'],
        correctIndex: 0,
        translation: '"as soon as possible"（できるだけ早く）は定型表現。',
        explanation: 'as ~ as possible の形には原級 soon が入る。',
      },
      {
        id: 'p6-3-b4',
        prompt: '空欄 (4) に入る最も適切な語句を選びなさい。',
        options: ['Additionally', 'However', 'Therefore', 'For instance'],
        correctIndex: 0,
        translation: '来客用スペースの説明に続き、社員への追加の注意事項を述べているため Additionally が適切。',
        explanation: '前文とは逆接でも例示でもなく、情報を追加している文脈。',
      },
    ],
  },
];
