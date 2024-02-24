import { useEffect, useState } from "react";

export default function Solution() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    function () {
      if (!isRunning) return;
      if (mins === 0 && secs === 0) return;
      const interval = setInterval(function () {
        setSecs((prevSecs) => {
          if (prevSecs > 0) return prevSecs - 1;
          if (prevSecs === 0 && mins > 0) return 59;
          return 0;
        });
        setMins((prevMins) => {
          // if(secs === 0 && prevMins === 0) return 0
          if (secs === 0) return prevMins - 1;
          return prevMins;
        });
      }, 1000);
      return () => clearInterval(interval);
    },
    [isRunning, mins, secs]
  );

  function handleMinutesChange(e: React.FormEvent<HTMLInputElement>) {
    setMinutes(Number(e.currentTarget.value));
  }
  function handleSecondsChange(e: React.FormEvent<HTMLInputElement>) {
    setSeconds(Number(e.currentTarget.value));
  }
  function handleStartClick() {
    if (mins !== 0 && secs !== 0) return;

    if (seconds > 60) {
      setSecs(seconds % 60);
      setMins(minutes + Math.floor(seconds / 60));
    } else {
      setSecs(seconds);
      setMins(minutes);
    }

    setSeconds(0);
    setMinutes(0);
    setIsRunning(true);
  }

  function handlePlayPauseClick() {
    setIsRunning((prev) => !prev);
  }
  function handleResetClick() {
    setSeconds(0);
    setMinutes(0);
    setSecs(0);
    setMins(0);
    setIsRunning(false);
  }

  const displayTimer = `${
    String(mins).length === 1
      ? `0${mins}`
      : `${String(mins).length === 0 ? "00" : mins}`
  }:${
    String(secs).length === 1
      ? `0${secs}`
      : `${String(secs).length === 0 ? "00" : secs}`
  }  `;

  return (
    <>
      <div className='flex gap-1'>
        <input
          placeholder='minutes'
          type='number'
          value={minutes}
          onChange={handleMinutesChange}
        />
        <input
          placeholder='seconds'
          type='number'
          value={seconds}
          onChange={handleSecondsChange}
        />
      </div>
      <br />
      <div className='flex gap-1'>
        <button className='bg-slate-300' onClick={handleStartClick}>
          Start
        </button>
        <button className='bg-slate-300' onClick={handlePlayPauseClick}>
          Play/Pause
        </button>
        <button className='bg-slate-300' onClick={handleResetClick}>
          Reset
        </button>
      </div>
      <br />
      <div className='inline-block border-2 bg-slate-300 border-slate-600'>
        {displayTimer}
      </div>
    </>
  );
}
