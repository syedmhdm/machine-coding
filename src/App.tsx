import { useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./components/Timer";
import uparrow from "./icons/uparrow.svg";
import downarrow from "./icons/downarrow.svg";
import FetchCode from "./components/FetchCode";
import QuestionNumberButtons from "./components/QuestionNumberButtons";
import Question from "./components/Question";
import Output from "./components/Output";

function App() {
  const [selected, setSelected] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const questionPoints = appData.map((question) =>
    question.question.split(" . ")
  );

  function handleUpArrowClick() {
    setIsCodeVisible(true);
  }
  function handleQuestionSelection(index: number) {
    setSelected(index);
    setIsCodeVisible(false);
  }
  function handleDownArrowClick() {
    setIsCodeVisible(false);
  }

  return (
    <div className='flex h-screen bg-slate-600'>
      <QuestionNumberButtons
        appData={appData}
        handleQuestionSelection={handleQuestionSelection}
        selected={selected}
      />
      <div className='relative bg-slate-900 grow'>
        {!isCodeVisible ? (
          <div className='flex flex-col w-11/12 pt-10 m-auto'>
            <Question
              questionPoints={questionPoints[selected]}
              dataSet={appData[selected].dataSet}
            />
            <Output answer={appData[selected].answer} />
            <Timer
              id={appData[selected].id}
              allotedSeconds={appData[selected].allotedSeconds}
            />
            <div className='absolute inset-x-0 bottom-0 flex justify-center'>
              <img
                className='cursor-pointer'
                onClick={handleUpArrowClick}
                src={uparrow}
              />
            </div>
          </div>
        ) : (
          <>
            <div className='absolute inset-x-0 z-10 flex justify-center'>
              <div className='cursor-pointer' onClick={handleDownArrowClick}>
                <img src={downarrow} />
              </div>
            </div>
            <FetchCode
              id={appData[selected].id}
              completedOn={appData[selected].completedOn}
            />
          </>
        )}
        {/* {new Date().toUTCString()} */}
      </div>
    </div>
  );
}

export default App;

//
