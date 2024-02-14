import downarrow from "./downarrow.svg";

export default function FetchCode({ setIsCodeVisible, completedOn, id }) {
  function handleDownArrowClick() {
    setIsCodeVisible(false);
  }

  return (
    <div>
      <div className='absolute inset-x-0 flex justify-center'>
        <div className='cursor-pointer' onClick={handleDownArrowClick}>
          <img src={downarrow} />
        </div>
      </div>
      {completedOn !== null ? (
        <div className='absolute flex flex-col gap-1 text-xs right-1 top-1 text-slate-400'>
          <p>Completed On: {completedOn}</p>
          <a
            href={`https://github.com/syedmhdm/machine-coding/blob/main/src/appdata/${id}/Solution.tsx`}
            target='_blank'
            className='self-end text-xs text-slate-400 hover:underline '
          >
            file link
          </a>
        </div>
      ) : null}
    </div>
  );
}

// import { useEffect, useState } from "react";

// export default function One() {
//   const [code, setCode] = useState("");

//   useEffect(function () {
//     async function getCode() {
//       const resp = await fetch(
//         "https://api.github.com/repos/syedmhdm/machine-coding/contents/src/App.tsx"
//       );
//       const data = await resp.json();
//       setCode(atob(data.content));
//     }
//     // getCode();
//   }, []);

//   return (
//     <code>
//       <pre className='overflow-y-scroll text-sm whitespace-break-spaces max-h-96'>
//         {code}
//       </pre>
//       "one"
//     </code>
//   );
// }
