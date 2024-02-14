import CopyButton from "./CopyButton";

export default function Question({
  questionPoints,
  dataSet,
}: {
  questionPoints: string[];
  dataSet: object | null;
}) {
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
            <CopyButton data={JSON.stringify(dataSet)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
