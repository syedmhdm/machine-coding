import { useEffect, useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./Timer";
import uparrow from "./uparrow.svg";
import FetchCode from "./FetchCode";

function App() {
  const [selected, setSelected] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(appData[selected].dataSet));
    setCopied(true);
  }

  useEffect(
    function () {
      if (!copied) return;
      const timeOut = setTimeout(function () {
        setCopied(false);
      }, 2000);
      return () => {
        return clearTimeout(timeOut);
      };
    },
    [copied]
  );

  return (
    <div className='flex h-screen bg-slate-600'>
      <div className='flex flex-col gap-5 p-5 bg-slate-800'>
        {appData.map((el, i) => (
          <div
            key={el.id}
            onClick={() => handleQuestionSelection(i)}
            className={`flex items-center justify-center w-10 h-10 text-center rounded-full  bg-slate-700 ${
              i === selected
                ? "cursor-default ring-[3px] ring-slate-400"
                : "cursor-pointer"
            }`}
          >
            {el.id}
          </div>
        ))}
      </div>
      <div className='relative bg-slate-900 grow'>
        {isCodeVisible ? (
          <FetchCode
            id={appData[selected].id}
            completedOn={appData[selected].completedOn}
            setIsCodeVisible={setIsCodeVisible}
          />
        ) : (
          <div className='flex flex-col w-11/12 pt-10 m-auto'>
            <div>
              {questionPoints[selected].map((point, i) => (
                <div className='pb-3' key={i}>
                  <p className='flex gap-2'>
                    <span>{i + 1}.</span> <span>{point} </span>
                  </p>
                </div>
              ))}
            </div>
            {appData[selected].dataSet !== null ? (
              <div className='flex gap-1'>
                <div className='whitespace-nowrap'>Data Set:</div>
                <div className='relative p-3 text-xs rounded-lg border-[1px] bg-slate-950 border-slate-400 w-[50%]'>
                  {JSON.stringify(appData[selected].dataSet)}
                  <button
                    className='absolute top-0 right-1'
                    onClick={handleCopyToClipboard}
                  >
                    {copied ? "copied" : "copy"}
                  </button>
                </div>
              </div>
            ) : null}
            <div className=' pt-7'>
              <div className='pb-2'>Output:</div>
              <div className='p-5 rounded-lg bg-slate-400 text-slate-950 w-[80%]'>
                {appData[selected].answer}
              </div>

              <Timer
                id={appData[selected].id}
                allotedSeconds={appData[selected].allotedSeconds}
              />
              <div className='absolute inset-x-0 bottom-0 flex justify-center'>
                <div className='cursor-pointer' onClick={handleUpArrowClick}>
                  <img src={uparrow} />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {new Date().toUTCString()} */}
      </div>
    </div>
  );
}

export default App;

//
