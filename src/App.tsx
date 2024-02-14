import { useEffect, useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./components/Timer";
import uparrow from "./icons/uparrow.svg";
import downarrow from "./icons/downarrow.svg";
import FetchCode from "./components/FetchCode";
import QuestionNumberButtons from "./components/QuestionNumberButtons";
import Question from "./components/Question";
import Output from "./components/Output";

function App() {
  const [selected, setSelected] = useState<number>(0);
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [codes, setCodes] = useState<
    { id: number; code: string; completedOn: string }[]
  >([]);

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

  useEffect(
    function () {
      if (codes[selected]) return;

      async function getCode() {
        const resp = await fetch(
          `https://api.github.com/repos/syedmhdm/machine-coding/contents/src/appdata/${appData[selected].id}/Solution.tsx`
        );
        const data = await resp.json();
        setCodes((prev) => {
          prev[selected] = {
            id: appData[selected].id,
            code: atob(data.content),
            completedOn: appData[selected].completedOn,
          };
          return prev;
        });
      }
      getCode();
    },
    [codes, selected]
  );

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
            <FetchCode {...codes[selected]} />
          </>
        )}
        {/* {new Date().toUTCString()} */}
      </div>
    </div>
  );
}

export default App;

//
