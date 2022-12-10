import React from 'react';
import ManagePost from './ManagePost';

function ManagePostList({ posts }) {
  return (
    <div>
      {posts.map(
        (
          { content, post_id: postId, name: userName, image_id: imageId },
          idx
        ) => (
          <ManagePost
            key={postId}
            userName={userName}
            content={content}
            postId={postId}
            imageId={imageId}
            sx={{
              borderBottom: idx === posts.length - 1 ? undefined : 0,
            }}
          />
        )
      )}
    </div>
  );
}

export default ManagePostList;
