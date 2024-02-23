import { useState } from "react";

const winningIndices = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Solution() {
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [xIndices, setXIndices] = useState<number[]>([]);
  const [oIndices, setOIndices] = useState<number[]>([]);

  function getRandomExclude(exclude: number[]): number {
    const helper = Math.floor(Math.random() * 9);
    return exclude.includes(helper) ? getRandomExclude(exclude) : helper;
  }

  function handleSelectBox(boxIndex: number) {
    if (selectedBlocks.length + 1 === 9) {
      setXIndices((prevXIndices) => [...prevXIndices, boxIndex]);
      setSelectedBlocks((prevBoxIndices) => [...prevBoxIndices, boxIndex]);
      return;
    }
    const botIndex = getRandomExclude([...selectedBlocks, boxIndex]);
    if (selectedBlocks.includes(boxIndex) || selectedBlocks.includes(botIndex))
      return;
    setXIndices((prevXIndices) => [...prevXIndices, boxIndex]);
    setSelectedBlocks((prevBoxIndices) => [
      ...prevBoxIndices,
      boxIndex,
      botIndex,
    ]);
    setOIndices((prevOIndices) => [...prevOIndices, botIndex]);
  }

  const isTie = selectedBlocks.length === 9;

  let xWon = false;
  let oWon = false;
  if (
    winningIndices.some((el) => {
      return el.every((ele) => xIndices.includes(ele));
    })
  ) {
    xWon = true;
  } else if (
    winningIndices.some((el) => {
      return el.every((ele) => oIndices.includes(ele));
    })
  ) {
    oWon = xWon === false && isTie === false;
  }

  return (
    <div>
      <h3>X and O:</h3>
      <div className='grid grid-cols-3 gap-1 '>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={
              !xWon && !oWon && !isTie ? () => handleSelectBox(i) : () => {}
            }
            className={` ${
              selectedBlocks.includes(i)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } bg-slate-300`}
          >
            {xIndices.includes(i) ? "X" : oIndices.includes(i) ? "O" : "_"}
          </div>
        ))}
        {xWon && "X won"}
        {oWon && "O won"}
        {isTie && !xWon && !oWon && "Match Tied"}
      </div>
    </div>
  );
}
