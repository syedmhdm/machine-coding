import CopyButton from "./CopyButton";

export default function FetchCode({
  id,
  code,
  completedOn,
}: {
  id: number;
  code: string;
  completedOn: string;
}) {
  return (
    <div>
      <code className='relative block p-5 m-10 rounded-lg bg-slate-950 border-slate-400 border-[1px] w-[80%]'>
        <pre className='overflow-y-scroll text-sm whitespace-break-spaces max-h-[500px]'>
          {code}
        </pre>
        <CopyButton data={code} />
      </code>
      {completedOn !== "" ? (
        <div className='absolute inset-x-0 flex justify-between gap-1 text-xs right-1 top-1 text-slate-400'>
          <a
            href={`https://github.com/syedmhdm/machine-coding/blob/main/src/appdata/${id}/Solution.tsx`}
            target='_blank'
            className='z-20 self-end text-xs text-slate-400 hover:underline'
          >
            file link
          </a>
          <p>Completed On: {completedOn}</p>
        </div>
      ) : null}
    </div>
  );
}
