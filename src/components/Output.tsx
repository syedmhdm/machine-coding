import { ReactNode } from "react";

export default function Output({ answer }: { answer: ReactNode }) {
  return (
    <>
      <div className='pb-2 pt-7'>Output:</div>
      <div className='p-5 rounded-lg bg-slate-400 text-slate-950 w-[80%]'>
        {answer}
      </div>
    </>
  );
}
