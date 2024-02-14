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
  console.log("id", id, completedOn);

  return (
    <div>
      <code className='relative block p-5 pr-0 mb-0  m-10 rounded-lg bg-slate-950 border-slate-400 border-[1px] w-[80%]'>
        <pre className='overflow-y-scroll text-sm whitespace-break-spaces max-h-[500px]'>
          {code}
        </pre>
        <CopyButton data={code} />
        <a
          href={`https://github.com/syedmhdm/machine-coding/blob/main/src/appdata/${id}/Solution.tsx`}
          target='_blank'
          className='absolute bottom-0 text-xs right-1 text-slate-400 hover:underline'
        >
          file link
        </a>
      </code>
      {completedOn !== "" ? (
        <div className='absolute justify-between text-xs right-1 top-1 text-slate-400'>
          <p>{completedOn}</p>
        </div>
      ) : null}
    </div>
  );
}
