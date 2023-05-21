const ASKING_QUESTION_MESSAGE = [
  `As I'm still in the learning process, would you kindly assist me by answering my question? Please respond with a "yes" if you are willing to help.`,
  `Please bear with me as I am still learning. If you're willing to help, kindly let me know by answering my question with a "yes".`,
  `I am still not well trained, if you may you can help me by answering my questions. If you would help, please respond with a 'yes'.`,
  `Given that I am still learning, could you please aid me by responding to my question? If you're happy to help, please indicate by replying with a 'yes'.`,
  `As I continue to learn, I would greatly appreciate your assistance in answering my question. If you are able to help, please respond with a 'yes'.`,
  `My learning is ongoing, and I would appreciate your help with my question. If you're willing to lend a hand, please let me know by responding with a 'yes'.`,
  `I'm still in the process of learning, and I would greatly appreciate it if you could answer my question to assist me. Please let me know if you're willing to help by responding with a 'yes'.`,
  `As I am currently in the learning phase, I kindly request your assistance in answering my question. If you're willing to help, please indicate so by responding with a 'yes'.`,
  `Since I'm still developing my knowledge, could you please provide some guidance by answering my question? If you're able to help, please let me know by responding with a 'yes'.`,
  `Given that I am still acquiring knowledge, I would be grateful if you could answer my question to aid me. If you're willing to help, please indicate so by responding with a 'yes'.`,
];
const THANKS_YOU_MESSAGE = [
  `I'm grateful for the help you've provided me. Thank you. If you're open to providing more assistance, please let me know by answering with a 'yes'`,
  `Thank you for your efforts in helping me. I appreciate it. If you're willing to offer more assistance, please indicate by answering with a 'yes'`,
  `I'm thankful for the assistance you've provided me. If you're able to offer more help, please let me know by responding with a 'yes'`,
  `Your help has made a significant difference, and I am grateful. Thank you. If you can offer any more help, please let me know by responding with a 'yes',`,
  `Your help has been fantastic, and I appreciate it. Thank you. If you're able to offer any more assistance, please indicate by answering with a 'yes'.`,
];

const REJECT_QUESTIONS_MESSAGE = [
  `It's okay, no problem. Thank you for taking the time to consider my request.`,
  `That's fine, no worries. Thank you for considering my request.`,
  `Not a problem, I appreciate you taking the time to consider my request. Thank you.`,
  `That's okay, I understand. Thank you for taking my request into account.`,
  `Okay, no worries. Thank you for taking the time to consider my request.`,
  `It's not an issue, and I'm grateful for your willingness to help me up until this point.`,
  `That's fine, and I appreciate how you've been willing to help me so far.`,
  `It's not an inconvenience, and I appreciate the effort you've put in to assist me thus far.`,
];

const RANDOM_RESPONSE_RETRIEVER = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
export {
  ASKING_QUESTION_MESSAGE,
  THANKS_YOU_MESSAGE,
  REJECT_QUESTIONS_MESSAGE,
  RANDOM_RESPONSE_RETRIEVER,
};
