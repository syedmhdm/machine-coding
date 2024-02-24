import { useState } from "react";

function CommentComp({
  comment,
  comments,
  setComments,
  index,
}: {
  comment: string;
  comments: { comment: string; comments: [] }[];
  setComments: (newCommentArray: { comment: string; comments: [] }[]) => void;
  index: number;
}) {
  const [inputText, setInputText] = useState("");

  function handleAddComment() {
    console.log(comments);

    // const helper = comments ? [...comments] : [];
    // let objHelper = {
    //   comment: "",
    //   comments: [],
    // };
    // if (comments) {
    //   objHelper = { ...objHelper, comment: inputText };
    // }
    // if (comments[index]?.comments) {
    //   objHelper = { ...objHelper, comments: helper[index].comments };
    // }
    // setComments([...helper, { ...objHelper }]);
    // setComments([
    //   ...helper,
    //   {
    //     ...helper[index],
    //     comment: inputText,
    //     comments: helper[index]?.comments,
    //   },
    // ]);
  }

  return (
    <div>
      <p>{comment}</p>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleAddComment}>{`Comment on ${comment}`}</button>
      {comments.map((comment: { comment: string; comments: [] }, i) => (
        <CommentComp key={i} {...comment} setComments={setComments} index={i} />
      ))}
    </div>
  );
}

export default function Solution() {
  // const [comments, setComments] = useState<{ comment: string; comments: [] }[]>(
  //   [{ comment: "initial comment", comments: [] }]
  // );

  // function handleSetcomments(
  //   newCommentArray: { comment: string; comments: [] }[]
  // ) {
  //   setComments((prev) => [...prev, ...newCommentArray]);
  // }

  return (
    <div>
      {/* {comments.map((comment, idx) => (
        <CommentComp
          key={idx}
          {...comment}
          setComments={handleSetcomments}
          index={idx}
        />
      ))} */}
      Solution five
    </div>
  );
}
