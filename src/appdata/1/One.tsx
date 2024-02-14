import { useEffect, useState } from "react";

export default function One() {
  const [code, setCode] = useState("");

  useEffect(function () {
    async function getCode() {
      const resp = await fetch(
        "https://api.github.com/repos/syedmhdm/machine-coding/contents/src/App.tsx"
      );
      const data = await resp.json();
      setCode(atob(data.content));
    }
    // getCode();
  }, []);

  return (
    <code>
      <pre className='overflow-y-scroll text-sm whitespace-break-spaces max-h-96'>
        {code}
      </pre>
      "one"
    </code>
  );
}
