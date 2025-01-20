interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  category: 'Logical Thinking' | 'DSA' | 'JavaScript Concepts';
}

export const questions: Question[] = [
  // Logical Thinking Questions
  {
    question: "If a program takes 2 seconds to run with input size 1, and follows O(n²) complexity, approximately how long will it take with input size 5?",
    options: ["10 seconds", "25 seconds", "50 seconds", "100 seconds"],
    correctAnswer: "50 seconds",
    hint: "Remember how quadratic complexity scales with input size.",
    explanation: "With O(n²), when input size increases by 5x, time increases by 5² = 25x. So 2 seconds * 25 = 50 seconds.",
    category: "Logical Thinking"
  },
  {
    question: "What will be the output of: console.log(typeof typeof 1)?",
    options: ["number", "string", "undefined", "NaN"],
    correctAnswer: "string",
    hint: "The typeof operator always returns a string representation of the type.",
    explanation: "The first typeof returns 'number', then typeof 'number' returns 'string' because typeof always returns a string.",
    category: "Logical Thinking"
  },
  {
    question: "If a = b and b = c, which statement might NOT be true?",
    options: ["a = c", "a and c are equal", "a, b, and c are identical", "a and c have the same value in memory"],
    correctAnswer: "a and c have the same value in memory",
    hint: "Think about reference vs value equality in programming.",
    explanation: "While a, b, and c might be equal in value, they could be stored in different memory locations, especially with objects or arrays.",
    category: "Logical Thinking"
  },

  // DSA Questions
  {
    question: "What is the time complexity of Array.prototype.indexOf()?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    hint: "Consider how many elements the method needs to check in the worst case.",
    explanation: "indexOf needs to potentially check every element in the array until it finds a match, making it linear time complexity O(n).",
    category: "DSA"
  },
  {
    question: "In a binary search tree, which traversal would print the nodes in sorted order?",
    options: ["Preorder", "Inorder", "Postorder", "Level Order"],
    correctAnswer: "Inorder",
    hint: "Think about when the node value is processed in relation to its children.",
    explanation: "Inorder traversal (left-root-right) in a BST visits nodes in ascending order, making it print values in sorted order.",
    category: "DSA"
  },
  {
    question: "What is the space complexity of creating a matrix of size n×n?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(2n)"],
    correctAnswer: "O(n²)",
    hint: "Consider how many total elements are stored in an n×n matrix.",
    explanation: "An n×n matrix has n rows and n columns, resulting in n * n = n² elements total, hence O(n²) space complexity.",
    category: "DSA"
  },

  // JavaScript Concepts
  {
    question: "Which statement about promises is false?",
    options: [
      "Promises can be chained",
      "Promises can only be resolved once",
      "Promises can be used with async/await",
      "Promises always execute synchronously"
    ],
    correctAnswer: "Promises always execute synchronously",
    hint: "Think about the event loop and how promises handle asynchronous operations.",
    explanation: "Promises are designed for asynchronous operations. While the Promise constructor executes synchronously, the Promise itself handles asynchronous operations.",
    category: "JavaScript Concepts"
  },
  {
    question: "What is the result of: [1, 2, 3].map(num => num + 2).filter(num => num > 4)?",
    options: ["[5]", "[3, 4, 5]", "[4, 5]", "[]"],
    correctAnswer: "[5]",
    hint: "Break it down: first map adds 2 to each number, then filter keeps only numbers greater than 4.",
    explanation: "First, map creates [3, 4, 5], then filter keeps only numbers greater than 4, resulting in [5].",
    category: "JavaScript Concepts"
  },
  {
    question: "Which of these is not a valid way to declare a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "const myFunc = function() {}",
      "const myFunc = () => {}",
      "function = myFunc() {}"
    ],
    correctAnswer: "function = myFunc() {}",
    hint: "Think about the syntax rules for function declarations in JavaScript.",
    explanation: "The syntax 'function = myFunc() {}' is invalid. Functions can be declared using the function keyword, function expressions, or arrow functions.",
    category: "JavaScript Concepts"
  }
];