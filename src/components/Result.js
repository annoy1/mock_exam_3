// import React, { useState } from "react";

// const Result = ({
//   score,
//   totalQuestions,
//   answers,
//   questions,
//   handleRestart
// }) => {
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   const calculatePercentage = () => {
//     return (score / totalQuestions) * 100;
//   };

//   const getCorrectCount = () => {
//     let count = 0;
//     answers.forEach((answer, index) => {
//       if (answer === questions[index].correctAnswer) {
//         count++;
//       }
//     });
//     return count;
//   };

//   const getIncorrectCount = () => {
//     let count = 0;
//     answers.forEach((answer, index) => {
//       if (answer !== "" && answer !== questions[index].correctAnswer) {
//         count++;
//       }
//     });
//     return count;
//   };

//   const getUnansweredCount = () => {
//     let count = 0;
//     answers.forEach((answer) => {
//       if (answer === "") {
//         count++;
//       }
//     });
//     return count;
//   };
import React, { useState } from "react";

const Result = ({
  score,
  totalQuestions,
  answers,
  questions,
  handleRestart
}) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter questions based on the selected status
  const filteredQuestions = questions.filter((question, index) => {
    if (selectedStatus === "correct") {
      return answers[index] === question.correctAnswer;
    } else if (selectedStatus === "incorrect") {
      return answers[index] !== question.correctAnswer && answers[index] !== "";
    } else if (selectedStatus === "unattempted") {
      return answers[index] === "";
    }
    return true;
  });

  // Handle dropdown menu change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Calculate the number of correct, incorrect, and unanswered questions
  const correctCount = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  const incorrectCount = answers.filter(
    (answer, index) =>
      answer !== questions[index].correctAnswer && answer !== ""
  ).length;
  const unansweredCount = answers.filter((answer) => answer === "").length;

  return (
    <div className="result-page">
      <h2>Quiz Result</h2>
      <div className="score">
        Score: {score}/{totalQuestions}
      </div>

      {/* Boxes for total correct, incorrect, and unanswered questions */}
      <div className="status-boxes">
        <div className="status-box correct-box">
          <span>{correctCount}</span>
          <span>Correct</span>
        </div>
        <div className="status-box incorrect-box">
          <span>{incorrectCount}</span>
          <span>Incorrect</span>
        </div>
        <div className="status-box unanswered-box">
          <span>{unansweredCount}</span>
          <span>Unanswered</span>
        </div>
      </div>

      {/* Dropdown menu for filtering questions */}
      <label htmlFor="status">Filter Questions:</label>
      <select id="status" value={selectedStatus} onChange={handleStatusChange}>
        <option value="all">All Questions</option>
        <option value="correct">Correct</option>
        <option value="incorrect">Incorrect</option>
        <option value="unattempted">Unattempted</option>
      </select>

      {/* Display filtered questions */}
      {filteredQuestions.map((question, index) => (
        <div key={index} className="question">
          <h3>{question.questionText}</h3>
          <p>Explanation: {question.explanation}</p>
        </div>
      ))}

      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
};

export default Result;

// import React, { useState } from 'react';

// const Result = ({ score, totalQuestions, answers, questions, handleRestart }) => {
//   const [selectedStatus, setSelectedStatus] = useState('all');

//   // Filter questions based on the selected status
//   const filteredQuestions = questions.filter((question, index) => {
//     if (selectedStatus === 'correct') {
//       return answers[index] === question.correctAnswer;
//     } else if (selectedStatus === 'incorrect') {
//       return answers[index] !== question.correctAnswer && answers[index] !== '';
//     } else if (selectedStatus === 'unattempted') {
//       return answers[index] === '';
//     }
//     return true;
//   });

//   // Handle dropdown menu change
//   const handleStatusChange = (event) => {
//     setSelectedStatus(event.target.value);
//   };

//   return (
//     <div className="result-page">
//       <h2>Quiz Result</h2>
//       <div className="score">Score: {score}/{totalQuestions}</div>

//       {/* Dropdown menu for filtering questions */}
//       <label htmlFor="status">Filter Questions:</label>
//       <select id="status" value={selectedStatus} onChange={handleStatusChange}>
//         <option value="all">All Questions</option>
//         <option value="correct">Correct</option>
//         <option value="incorrect">Incorrect</option>
//         <option value="unattempted">Unattempted</option>
//       </select>

//       {/* Display filtered questions */}
//       {filteredQuestions.map((question, index) => (
//         <div key={index} className="question">
//           <h3>{question.questionText}</h3>
//           <p>Explanation: {question.explanation}</p>
//         </div>
//       ))}

//       <button onClick={handleRestart}>Restart Quiz</button>
//     </div>
//   );
// };

// export default Result;

//   return (
//     <div className="result">
//       <h2>Exam Result</h2>
//       <p>
//         You scored {score} out of {totalQuestions}.
//       </p>
//       <p>Percentage: {calculatePercentage()}%</p>
//       <div className="question-palette">
//         <div className="palette-box correct">
//           <span className="box-label">Correct</span>
//           <span className="box-value">{getCorrectCount()}</span>
//         </div>
//         <div className="palette-box incorrect">
//           <span className="box-label">Incorrect</span>
//           <span className="box-value">{getIncorrectCount()}</span>
//         </div>
//         <div className="palette-box unanswered">
//           <span className="box-label">Unanswered</span>
//           <span className="box-value">{getUnansweredCount()}</span>
//         </div>
//       </div>
//       <h3>Question Palette</h3>
//       <ul className="answers-list">
//         {questions.map((question, index) => (
//           <li
//             key={index}
//             className={`answer ${
//               answers[index] === question.correctAnswer
//                 ? "correct"
//                 : "incorrect"
//             }`}
//           >
//             <button
//               className={`question-number ${
//                 selectedQuestion === index ? "selected" : ""
//               }`}
//               onClick={() => setSelectedQuestion(index)}
//             >
//               {index + 1}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {selectedQuestion !== null && (
//         <div className="question-details">
//           <p>{questions[selectedQuestion].questionText}</p>
//           {answers[selectedQuestion] !== "" && (
//             <p>
//               Your Answer: <span>{answers[selectedQuestion]}</span>
//             </p>
//           )}
//           <p>
//             Correct Answer:{" "}
//             <span>{questions[selectedQuestion].correctAnswer}</span>
//           </p>
//           {questions[selectedQuestion].explanation && showExplanation && (
//             <p className="explanation">
//               Explanation: {questions[selectedQuestion].explanation}
//             </p>
//           )}
//         </div>
//       )}
//       <button className="restart-button" onClick={handleRestart}>
//         Restart Exam
//       </button>
//       <button
//         className="explanation-button"
//         onClick={() => setShowExplanation(!showExplanation)}
//       >
//         {showExplanation ? "Hide Explanation" : "Show Explanation"}
//       </button>
//     </div>
//   );
// };

// export default Result;
