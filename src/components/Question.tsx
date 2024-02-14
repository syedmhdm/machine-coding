import { useEffect, useState } from "react";

export default function Question({ questionPoints, dataSet }) {
  const [copied, setCopied] = useState(false);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(dataSet));
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
    <>
      <div>
        {questionPoints.map((point, i) => (
          <div className='pb-3' key={i}>
            <p className='flex gap-2'>
              <span>{i + 1}.</span> <span>{point} </span>
            </p>
          </div>
        ))}
      </div>
      {dataSet !== null ? (
        <div className='flex gap-1'>
          <div className='whitespace-nowrap'>Data Set:</div>
          <div className='relative p-3 text-xs rounded-lg border-[1px] bg-slate-950 border-slate-400 w-[50%]'>
            {JSON.stringify(dataSet)}
            <button
              className='absolute top-0 right-1'
              onClick={handleCopyToClipboard}
            >
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
