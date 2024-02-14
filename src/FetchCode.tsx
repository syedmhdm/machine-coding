import downarrow from "./downarrow.svg";

export default function FetchCode({ setIsCodeVisible, completedOn, id }) {
  function handleDownArrowClick() {
    setIsCodeVisible(false);
  }

  return (
    <div className=''>
      <div className='absolute inset-x-0 flex justify-center'>
        <div className='cursor-pointer' onClick={handleDownArrowClick}>
          <img src={downarrow} />
        </div>
      </div>
      <div>Folder: {id}</div>
      {completedOn !== null ? (
        <div className='absolute text-xs right-1 top-1 text-slate-400'>
          Completed on: {completedOn}
        </div>
      ) : null}
    </div>
  );
}
