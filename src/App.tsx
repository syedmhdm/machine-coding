import { useEffect, useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./components/Timer";
import uparrow from "./icons/uparrow.svg";
import downarrow from "./icons/downarrow.svg";
import FetchCode from "./components/FetchCode";
import QuestionNumberButtons from "./components/QuestionNumberButtons";
import Question from "./components/Question";
import Output from "./components/Output";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

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
    controls.start("hidden");
    setSelected(index);
    setIsCodeVisible(false);
    controls.start("visible");
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
  const wrapperVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", delay: 0.1 },
    },
    exit: {
      x: "-100vh",
      transition: { ease: "easeInOut" },
    },
  };
  const controls = useAnimationControls();

  return (
    <div className='flex h-screen bg-slate-600'>
      <QuestionNumberButtons
        appData={appData}
        handleQuestionSelection={handleQuestionSelection}
        selected={selected}
      />
      {/* <AnimatePresence mode='wait' initial={false}> */}
      <div className='relative bg-slate-900 grow'>
        <AnimatePresence mode='wait' initial={false}>
          {!isCodeVisible ? (
            <motion.div
              key='0'
              initial='hidden'
              variants={wrapperVariants}
              animate={controls}
              exit={"exit"}
              // initial={{ opacity: 1, y: -500 }}
              // animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 1, y: -500 }}
              // transition={{ duration: 0.4 }}
              className='flex flex-col w-11/12 pt-10 m-auto'
            >
              <Question
                questionPoints={questionPoints[selected]}
                dataSet={appData[selected].dataSet}
              />
              <Output answer={appData[selected].answer} />
            </motion.div>
          ) : (
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
              <FetchCode {...codes[selected]} />
            </motion.div>
          )}
          {!isCodeVisible && (
            <motion.div
              key='1'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* </AnimatePresence> */}
      {/* {new Date().toUTCString()} */}
    </div>
  );
}

export default App;

//
