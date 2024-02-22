import { useEffect, useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./components/Timer";
import uparrow from "./icons/uparrow.svg";
import downarrow from "./icons/downarrow.svg";
import FetchCode from "./components/FetchCode";
import QuestionNumberButtons from "./components/QuestionNumberButtons";
import Question from "./components/Question";
import Output from "./components/Output";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [selected, setSelected] = useState<number>(0);
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [quesChange, setQuesChange] = useState<number>(0);
  const [codes, setCodes] = useState<{ code: string }[]>([]);

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
      const timeout = setTimeout(function () {
        setQuesChange(selected);
      }, 300);

      return () => clearTimeout(timeout);
    },
    [selected]
  );

  useEffect(
    function () {
      if (codes[selected]) return;

      async function getCode() {
        try {
          const resp = await fetch(
            `https://api.github.com/repos/syedmhdm/machine-coding/contents/src/appdata/${appData[selected].id}/Solution.tsx`
          );
          if (!resp.ok) throw new Error("Api limit exceeded");
          const data = await resp.json();
          setCodes((prev) => {
            prev[selected] = {
              code: atob(data.content),
            };
            return prev;
          });
        } catch (e) {
          console.error(e);
        }
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
        <AnimatePresence mode='wait' initial={false}>
          {!isCodeVisible && (
            <motion.div
              key='0'
              initial={{
                opacity: 1,
                y: -500,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 1,
                y: -500,
              }}
              transition={{ duration: 0.4 }}
              className='flex flex-col w-11/12 pt-10 m-auto'
            >
              <AnimatePresence mode='wait' initial={false}>
                {quesChange === selected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Question
                      questionPoints={questionPoints[selected]}
                      dataSet={appData[selected].dataSet}
                    />
                    <Output answer={appData[selected].answer} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {isCodeVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='inset-x-0 z-10 flex justify-center '>
                <div className='cursor-pointer' onClick={handleDownArrowClick}>
                  <img src={downarrow} />
                </div>
              </div>
              <FetchCode
                id={appData[selected].id}
                {...codes[selected]}
                completedOn={appData[selected].completedOn}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode='wait' initial={false}>
          {!isCodeVisible && (
            <motion.div
              key='1'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode='wait' initial={false}>
                {quesChange === selected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Timer
                      id={appData[selected].id}
                      allotedSeconds={appData[selected].allotedSeconds}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className='absolute inset-x-0 bottom-0 flex justify-center'>
                <img
                  className='cursor-pointer'
                  onClick={handleUpArrowClick}
                  src={uparrow}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* {new Date().toDateString()} */}
      </div>
    </div>
  );
}

export default App;
