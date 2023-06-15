import React, { useState, useEffect } from "react";
import questionsData from "./components/questionsData";
import Question from "./components/Question";
import Options from "./components/Options";
import Result from "./components/Result";
import "./styles.css";

const MockExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState(Array(questionsData.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (currentQuestion >= 0 && currentQuestion < questionsData.length) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setShowResult(true);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  const handleStartExam = () => {
    setCurrentQuestion(0);
  };

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleFinishExam = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(-1);
    setAnswers(Array(questionsData.length).fill(""));
    setShowResult(false);
    setTimeRemaining(600);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questionsData[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <div className="mock-exam">
      {showResult ? (
        <>
          <Result
            score={score}
            totalQuestions={questionsData.length}
            answers={answers}
            questions={questionsData}
            handleRestart={handleRestart}
          />
        </>
      ) : (
        <>
          {currentQuestion === -1 ? (
            <div className="start-page">
              <h2>Welcome to the Mock Exam</h2>
              <button className="start-button" onClick={handleStartExam}>
                Start Test
              </button>
            </div>
          ) : (
            <div className="question-page">
              <h2>Question {currentQuestion + 1}</h2>
              <Question
                questionText={questionsData[currentQuestion].questionText}
              />
              <Options
                options={questionsData[currentQuestion].options}
                selectedOption={answers[currentQuestion]}
                handleAnswer={handleAnswer}
              />
              <div className="timer">
                Time Remaining: {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
              <div className="button-container">
                <button
                  className="previous-button"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  ←Previous
                </button>
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questionsData.length - 1}
                >
                  Next→
                </button>
                {currentQuestion === questionsData.length - 1 && (
                  <button className="submit-button" onClick={handleFinishExam}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MockExam;
