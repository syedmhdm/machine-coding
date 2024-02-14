import { useEffect, useState } from "react";

export default function CopyButton({ data }) {
  const [copied, setCopied] = useState(false);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(data.toString());
    setCopied(true);
  }

  useEffect(
    function () {
      if (!copied) return;
      const timeOut = setTimeout(function () {
        setCopied(false);
      }, 2000);
      return () => {
        return clearTimeout(timeOut);
      };
    },
    [copied]
  );

  return (
    <button
      className='absolute top-0 text-xs right-1'
      onClick={handleCopyToClipboard}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}
