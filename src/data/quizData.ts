export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Finance & Wealth",
    question: "What is the 'Rule of 72' primarily used for in personal finance?",
    options: [
      "Calculating retirement age",
      "Estimating the years needed to double an investment",
      "Determining maximum mortgage borrowing capacity",
      "Computing annual capital gains tax rates",
    ],
    correctIndex: 1,
    explanation: "The Rule of 72 is a quick mental math shortcut: divide 72 by the annual interest rate to determine approximately how many years it will take for your investment to double.",
  },
  {
    id: 2,
    category: "Tech & Computing",
    question: "Which data structure uses the 'Last In, First Out' (LIFO) order?",
    options: ["Queue", "Stack", "Linked List", "Binary Search Tree"],
    correctIndex: 1,
    explanation: "A Stack operates on a Last In, First Out (LIFO) model, much like a stack of cafeteria trays or the browser's undo/redo history.",
  },
  {
    id: 3,
    category: "Science & Nature",
    question: "What phenomenon explains why time moves slower near massive gravitational objects?",
    options: [
      "Gravitational Time Dilation",
      "Quantum Superposition",
      "Hawking Radiation",
      "Wave-Particle Duality",
    ],
    correctIndex: 0,
    explanation: "According to Einstein's General Theory of Relativity, strong gravitational fields slow down the passage of time relative to an observer in weaker gravity.",
  },
  {
    id: 4,
    category: "Finance & Markets",
    question: "What does the term 'Dollar-Cost Averaging' (DCA) mean?",
    options: [
      "Exchanging US Dollars for foreign currencies evenly",
      "Investing a fixed dollar amount at regular intervals regardless of asset price",
      "Borrowing dollars against collateral at average interest",
      "Selling all assets when the dollar index hits an all-time high",
    ],
    correctIndex: 1,
    explanation: "Dollar-Cost Averaging (DCA) reduces the impact of volatility by consistently purchasing assets at periodic intervals over time, lowering the average cost per unit.",
  },
  {
    id: 5,
    category: "Web & AI",
    question: "In web architecture, what HTTP status code indicates 'Too Many Requests' (Rate Limiting)?",
    options: ["403 Forbidden", "404 Not Found", "429 Too Many Requests", "503 Service Unavailable"],
    correctIndex: 2,
    explanation: "HTTP 429 Too Many Requests informs the client that they have exceeded their rate limits within a given timeframe.",
  },
];
