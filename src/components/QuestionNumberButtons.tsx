export default function QuestionNumberButtons({
  appData,
  selected,
  handleQuestionSelection,
}) {
  return (
    <div className='flex flex-col gap-5 p-5 bg-slate-800'>
      {appData.map((el, i) => (
        <div
          key={el.id}
          onClick={() => handleQuestionSelection(i)}
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
  );
}
