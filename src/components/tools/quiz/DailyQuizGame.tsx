"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  BrainCircuit, 
  Timer, 
  Flame, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/data/quizData";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

interface DailyQuizGameProps {
  onCompleteQuiz?: () => void;
}

export default function DailyQuizGame({ onCompleteQuiz }: DailyQuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  useEffect(() => {
    if (isAnswered || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, isFinished]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setSelectedOption(-1); // timed out
    setStreak(0);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 100 + streak * 20);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }
      if (onCompleteQuiz) {
        onCompleteQuiz();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setTimeLeft(20);
  };

  return (
    <div id="trivia" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Daily Brain IQ &amp; Trivia Arena
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Test your knowledge across finance, technology, science, and AI. Keep your daily streak alive!
          </p>
        </div>

        {/* Live HUD */}
        {!isFinished && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{streak} Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              <Trophy className="w-4 h-4 text-indigo-500" />
              <span>{score} Pts</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Game Screen */}
      {!isFinished ? (
        <div className="mt-6 space-y-6">
          {/* Progress & Timer Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length} • {currentQuestion.category}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
              <Timer className="w-4 h-4 text-indigo-500" />
              <span>{timeLeft}s</span>
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
            />
          </div>

          {/* Question Text */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;
              let btnClass = "border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/60";

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold";
                } else if (isSelected) {
                  btnClass = "border-rose-500 bg-rose-50/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300";
                } else {
                  btnClass = "opacity-50 border-slate-200 dark:border-slate-800";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group ${btnClass}`}
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 animate-fadeIn space-y-3">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-indigo-600 dark:text-indigo-400">Explanation: </strong>
                {currentQuestion.explanation}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <span>
                    {currentIndex + 1 === QUIZ_QUESTIONS.length ? "Finish & View Score" : "Next Question"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="mt-8 text-center space-y-6 animate-fadeIn">
          <div className="inline-flex h-20 w-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-indigo-600 items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Challenge Completed!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Outstanding Performance!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
              You scored <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{score} Points</strong>. Keep returning daily to strengthen your analytical cognitive index.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>

          {/* Ad Banner on Completion Screen (High CTR zone) */}
          <AdBanner
            slotId={ADSENSE_CONFIG.slots.toolResultBanner}
            format="leaderboard"
            className="pt-4"
            customMockTitle="Master AI & Machine Learning in 90 Days - Free Tech Bootcamp"
            customMockCta="Enroll for Free"
          />
        </div>
      )}
    </div>
  );
}
