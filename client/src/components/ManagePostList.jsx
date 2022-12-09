import React from 'react';
import ManagePost from './ManagePost';

function ManagePostList({ posts }) {
  return (
    <div>
      {posts.map(
        ({ content, post_id: postId, name: userName, image_id: imageId }) => (
          <ManagePost
            key={postId}
            userName={userName}
            content={content}
            postId={postId}
            imageId={imageId}
          />
        )
      )}
    </div>
  );
}

export default ManagePostList;
