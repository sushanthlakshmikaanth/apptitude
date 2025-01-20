import React, { useState, useEffect } from 'react';
import { Brain, Clock, Lightbulb, ArrowRight, Trophy, Code2, Rocket, Timer, Flame, Medal, XCircle, CheckCircle2, Cpu, Code, Boxes } from 'lucide-react';
import { questions } from './questions';

// Simulated leaderboard data
const leaderboard = [
  { name: "Alex", score: 95, streak: 4 },
  { name: "Sarah", score: 90, streak: 3 },
  { name: "Mike", score: 85, streak: 2 },
];

const categories = [
  { name: 'Logical Thinking', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'DSA', icon: Boxes, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'JavaScript Concepts', icon: Code, color: 'text-green-600', bg: 'bg-green-100' },
];

function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintTimer, setHintTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredQuestions(questions.filter(q => q.category === selectedCategory));
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setFadeIn(true);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && started) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (hintTimer > 0) {
          setHintTimer((prev) => prev - 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver && started) {
      handleNextQuestion();
      setStreak(0);
    }
  }, [timeLeft, gameOver, started]);

  useEffect(() => {
    if (hintTimer === 0) {
      setShowHint(true);
    }
  }, [hintTimer]);

  const handleStart = () => {
    if (!selectedCategory) {
      alert('Please select a category first!');
      return;
    }
    setStarted(true);
    setFadeIn(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === filteredQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      setMistakes([...mistakes, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    setFadeIn(false);
    setShowExplanation(false);
    if (currentQuestion < filteredQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setTimeLeft(60);
        setHintTimer(30);
        setShowHint(false);
        setSelectedAnswer(null);
      }, 300);
    } else {
      setGameOver(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (timeLeft: number) => {
    if (timeLeft > 30) return 'bg-green-500';
    if (timeLeft > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-6">
              <Code2 className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Programming Aptitude Test</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Test your programming knowledge with our interactive quiz. Choose a category to begin!
            </p>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 ${
                      selectedCategory === category.name
                        ? 'ring-2 ring-indigo-500 shadow-md scale-105'
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className={`${category.bg} p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {questions.filter(q => q.category === category.name).length} Questions
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Timer className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold">60 Seconds</h3>
                <p className="text-sm text-gray-600">Per Question</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Lightbulb className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold">Hints Available</h3>
                <p className="text-sm text-gray-600">After 30 Seconds</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Brain className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold">{selectedCategory ? filteredQuestions.length : 'Select Category'}</h3>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
            </div>

            {/* Leaderboard Section */}
            <div className="w-full mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performers</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {leaderboard.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Medal className={`w-5 h-5 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-bronze-500'}`} />
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{entry.score}%</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-500">{entry.streak}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className={`group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 rounded-lg ${
                selectedCategory
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedCategory}
            >
              <span className="flex items-center gap-2">
                Start Test
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-500">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-yellow-100 rounded-full scale-150 blur-2xl opacity-50"></div>
              <Trophy className="w-20 h-20 text-yellow-500 relative" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Test Complete!</h2>
            <div className="w-full bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold text-indigo-600 mb-2">
                {Math.round((score / filteredQuestions.length) * 100)}%
              </p>
              <p className="text-gray-600">
                You scored {score} out of {filteredQuestions.length} questions correctly
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <p className="text-orange-500 font-semibold">Highest Streak: {streak}</p>
              </div>
            </div>

            {/* Mistakes Review */}
            {mistakes.length > 0 && (
              <div className="w-full bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Review Mistakes</h3>
                <div className="space-y-3">
                  {mistakes.map((questionIndex) => (
                    <div key={questionIndex} className="text-left">
                      <p className="text-sm text-gray-600">Question {questionIndex + 1}:</p>
                      <p className="text-sm font-medium">{filteredQuestions[questionIndex].question}</p>
                      <p className="text-sm text-green-600 mt-1">
                        Correct Answer: {filteredQuestions[questionIndex].correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setStarted(false);
                setCurrentQuestion(0);
                setScore(0);
                setGameOver(false);
                setTimeLeft(60);
                setHintTimer(30);
                setShowHint(false);
                setSelectedAnswer(null);
                setStreak(0);
                setMistakes([]);
                setSelectedCategory(null);
              }}
              className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full transform transition-all duration-300 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-200 ${getProgressColor(timeLeft)}`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Question</p>
              <p className="text-lg font-semibold">{currentQuestion + 1}/{filteredQuestions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-orange-500">{streak}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time Left</p>
                <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              filteredQuestions[currentQuestion].category === 'Logical Thinking'
                ? 'bg-purple-100 text-purple-700'
                : filteredQuestions[currentQuestion].category === 'DSA'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {filteredQuestions[currentQuestion].category}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{filteredQuestions[currentQuestion].question}</h2>
          {showHint && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4 transform animate-fade-in">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-700">{filteredQuestions[currentQuestion].hint}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {filteredQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                selectedAnswer === option
                  ? option === filteredQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
              } border ${
                selectedAnswer === option ? 'border-2' : 'border'
              } ${
                selectedAnswer === null ? 'hover:scale-[1.01] hover:shadow-sm' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {selectedAnswer === option && (
                  option === filteredQuestions[currentQuestion].correctAnswer
                    ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                    : <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-sm text-blue-700">{filteredQuestions[currentQuestion].explanation}</p>
          </div>
        )}

        {selectedAnswer && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="group inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Test'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;