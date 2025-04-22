interface CommentType {
  id: string | number;
  text: string;
  replies: CommentType[];
}

import React, { useState } from 'react';

interface CommentProps {
  comment: CommentType;
  onAddReply: (parentId: string | number, text: string) => void;
  onDelete: (id: string | number) => void;
  level: number;
}

const Comment: React.FC<CommentProps> = ({ comment, onAddReply, onDelete, level }) => {
  const [replyText, setReplyText] = useState('');

  const handleAddReply = () => {
    if (replyText.trim()) {
      onAddReply(comment.id, replyText);
      setReplyText('');
    }
  };

  return (
    <div style={{ marginLeft: `${level * 20}px`, marginBottom: '10px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
      <p>{comment.text}</p>
      <div>
        <textarea
          rows={2}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
        />
        <button onClick={handleAddReply}>Add Reply</button>
      </div>
      <button onClick={() => onDelete(comment.id)} style={{ color: 'red', marginLeft: '5px' }}>
        Delete
      </button>
      <div style={{ marginTop: '10px' }}>
        {comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            onAddReply={onAddReply}
            onDelete={onDelete}
            level={level + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default function Solution() {
  const [comments, setComments] = useState<CommentType[]>([
    // Optional initial comment
    // { id: Date.now(), text: 'Start commenting here!', replies: [] }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = (parentId: string | number | null, text: string) => {
    if (!text.trim()) return; // Prevent adding empty comments/replies

    const newComment: CommentType = {
      id: Date.now(), // Simple unique ID generation
      text,
      replies: [],
    };

    if (parentId === null) {
      // Add as a top-level comment
      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText(''); // Clear top-level input
    } else {
      // Add as a reply to a specific comment
      const addReplyRecursive = (commentsList: CommentType[]): CommentType[] => {
        return commentsList.map((comment) => {
          if (comment.id === parentId) {
            // Found the parent, add the reply
            return { ...comment, replies: [...comment.replies, newComment] };
          } else if (comment.replies.length > 0) {
            // Recursively search in replies
            return { ...comment, replies: addReplyRecursive(comment.replies) };
          }
          return comment; // No change
        });
      };
      setComments((prevComments) => addReplyRecursive(prevComments));
    }
  };

  const handleDeleteComment = (commentId: string | number) => {
    const deleteCommentRecursive = (commentsList: CommentType[]): CommentType[] => {
      return commentsList
        .filter((comment) => comment.id !== commentId) // Filter out the comment at the current level
        .map((comment) => {
          if (comment.replies.length > 0) {
            // Recursively process replies
            return { ...comment, replies: deleteCommentRecursive(comment.replies) };
          }
          return comment; // No change needed if no replies or comment not found here
        });
    };
    setComments((prevComments) => deleteCommentRecursive(prevComments));
  };

  return (
    <div>
      <h2>Comment Section</h2>
      <div>
        <textarea
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a new comment..."
          style={{ width: '90%', marginBottom: '5px' }}
        />
        <button onClick={() => handleAddComment(null, newCommentText)}>Add Comment</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onAddReply={handleAddComment} // Pass handleAddComment as onAddReply
            onDelete={handleDeleteComment}
            level={0} // Top-level comments are at level 0
          />
        ))}
      </div>
    </div>
  );
}
