import { useEffect, useState } from "react";
import play from "./play.svg";
import reset from "./reset.svg";
import pause from "./pause.svg";

export default function Timer({ id, allotedSeconds }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handlePausePlay() {
    setIsRunning((prev) => !prev);
  }
  function handleReset() {
    setIsRunning(false);
    setMinutes(allotedSeconds / 60);
    setSeconds(0);
  }

  useEffect(
    function () {
      setIsRunning(false);
      setMinutes(allotedSeconds / 60);
      setSeconds(0);
    },
    [allotedSeconds, id] // if 2 questions had same allotedSeconds then react will think that props did not change, id is in dependency because it is unique
  );

  useEffect(
    function () {
      if (!isRunning) return;
      if (minutes === 0 && seconds === 0) return;
      const interval = setInterval(function () {
        setSeconds((prevSecs) => (prevSecs === 0 ? 59 : prevSecs - 1));
        if (seconds === 0) setMinutes((prevMins) => prevMins - 1);
      }, 1000);
      return () => clearInterval(interval);
    },
    [isRunning, minutes, seconds]
  );

  const displayMinutes =
    String(minutes).length === 1 ? `0${String(minutes)}` : String(minutes);
  const displaySeconds =
    String(seconds).length === 1 ? `0${String(seconds)}` : String(seconds);

  return (
    <div className='absolute flex gap-10 bg-red-500o bottom-10'>
      <p className='text-2xl w-28'>
        {displayMinutes}:{displaySeconds}
      </p>
      <button onClick={handlePausePlay}>
        <img src={isRunning ? pause : play} />
      </button>
      <button onClick={handleReset}>
        <img src={reset} />
      </button>
    </div>
  );
}
