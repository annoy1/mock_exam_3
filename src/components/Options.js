// import React from 'react';

// const Options = ({ options, selectedOption, handleAnswer }) => {
//   return (
//     <div className="options">
//       {options.map((option) => (
//         <button

//           key={option}
//           className={`option-button ${selectedOption === option ? 'selected' : ''}`}
//           onClick={() => handleAnswer(option)}
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Options;

import React from "react";

const Options = ({ options, selectedOption, handleAnswer }) => {
  return (
    <div className="options">
      {options.map((option) => (
        <div key={option} className="option">
          <input
            type="checkbox"
            checked={selectedOption === option}
            onChange={() => handleAnswer(option)}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Options;
