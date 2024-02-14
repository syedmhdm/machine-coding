import { createContext, useContext, useEffect, useState } from "react";
import { appData } from "../appdata/AppData";

const QuestionsContext = createContext({});

function QuestionsContextProvider({ children }) {
  const [selected, setSelected] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [code, setCode] = useState("");
  const id = appData[selected].id;

  function handleQuestionSelection(index: number) {
    setSelected(index);
    setIsCodeVisible(false);
  }

  useEffect(
    function () {
      async function getCode() {
        const resp = await fetch(
          `https://api.github.com/repos/syedmhdm/machine-coding/contents/src/appdata/${id}/Solution.tsx`
        );
        const data = await resp.json();
        setCode(atob(data.content));
      }
      getCode();
    },
    [id]
  );
  return (
    <QuestionsContext.Provider
      value={{
        code,
        id,
        selected,
        handleQuestionSelection,
        isCodeVisible,
        setIsCodeVisible,
        appData,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestionsContext() {
  const context = useContext(QuestionsContext);
  if (QuestionsContext === undefined)
    throw new Error(
      "Can not access Questions Context outside of QuestionsContextProvider"
    );

  return context;
}

export { QuestionsContextProvider, useQuestionsContext };
