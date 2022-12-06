import React, { useEffect, useState } from 'react';
import { getCommentByPostId } from '../api/backend';
import Comment from './Comment';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentByPostId(postId).then(({ data }) => {
      setComments(data);
    });
  }, [postId]);

  return (
    <div>
      {comments.map(
        ({ content: commentContent, comment_id: id, name: userName }, idx) => (
          <Comment
            content={commentContent}
            name={userName}
            key={id}
            sx={{
              borderBottom: idx === comments.length - 1 ? undefined : 0,
            }}
          />
        )
      )}
    </div>
  );
}

export default CommentList;
