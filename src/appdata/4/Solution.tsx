import { useState } from "react";

const questions = [
  {
    id: 1,
    score: 13,
    ques: "quetion 1",
    options: ["q1 opt1", "q1 opt2", "q1 opt3"],
  },
  {
    id: 2,
    score: 23,
    ques: "quetion 2",
    options: ["q2 opt1", "q2 opt2", "q2 opt3"],
  },
  {
    id: 3,
    score: 31,
    ques: "quetion 3",
    options: ["q3 opt1", "q3 opt2", "q3 opt3"],
  },
  {
    id: 4,
    score: 32,
    ques: "quetion 4",
    options: ["q4 opt1", "q4 opt2", "q4 opt3"],
  },
];

export default function Solution() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  function handleOptionSelect(score: number) {
    setQuestionIndex((idx) => idx + 1);
    setScore((prevScore) => prevScore + score);
  }

  const showScore = questionIndex === questions.length;
  return (
    <div>
      {showScore ? (
        <div>
          <h3>Score:</h3>
          {score}
        </div>
      ) : (
        <>
          <h3 className='underline'>Question:</h3>
          <p>{questions[questionIndex].ques}</p>
          <h4 className='underline'>Options:</h4>
          {questions[questionIndex].options.map((option) => (
            <p
              onClick={() => handleOptionSelect(questions[questionIndex].score)}
              className='mb-1 cursor-pointer bg-slate-300'
              key={option}
            >
              {option}
            </p>
          ))}
        </>
      )}
    </div>
  );
}
