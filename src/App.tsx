import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import './app.css'
//components
import QustionCard from "./components/QuestionCard";

//types
import { QuestionsState, Difficulty } from "./API";

export type AnswersObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswersObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    number+1===TOTAL_QUESTIONS?setGameOver(true):setNumber(number+1)
  };
  return (
    <div className="wrapper">
      <h1>React Quiz</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <input
          type="button"
          className="start"
          value="Start"
          onClick={startQuiz}
        />
      ) : null}

      {!gameOver && <p className="score">Score: {score} </p>}
      {loading && <p className="loading">Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QustionCard
          answers={questions[number].answers}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callBack={checkAnswer}
        />
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <input
            type="button"
            className="next"
            value="Next Question"
            onClick={nextQuestion}
          />
        )}
    </div>
  );
}

export default App;
