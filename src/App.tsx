import { useState } from "react";
import { appData } from "./appdata/AppData";
import Timer from "./Timer";
import uparrow from "./uparrow.svg";
import downarrow from "./downarrow.svg";

function App() {
  const [selected, setSelected] = useState(0);

  const questionPoints = appData.map((question) =>
    question.question.split(" . ")
  );

  return (
    <div className='flex h-screen bg-slate-600'>
      <div className='flex flex-col gap-5 p-5 bg-slate-800'>
        {appData.map((el, i) => (
          <div
            key={el.id}
            onClick={() => setSelected(i)}
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
          <div className=' pt-7'>
            <div className='pb-2'>Output:</div>
            <div className='text-slate-950'>{appData[selected].answer}</div>
            {/* <FetchCode completedOn={appData[selected].completedOn} /> */}
            <Timer
              id={appData[selected].id}
              allotedSeconds={appData[selected].allotedSeconds}
            />
            <div className='absolute inset-x-0 bottom-0 flex justify-center'>
              <div className='cursor-pointer'>
                <img src={uparrow} />
                {/* <img src={downarrow} /> */}
              </div>
            </div>
          </div>
          {/* {new Date().toUTCString()} */}
        </div>
      </div>
    </div>
  );
}

export default App;

//
