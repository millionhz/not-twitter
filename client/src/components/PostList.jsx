import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div>
      {posts.map(
        ({ name, post_id: postId, content, image_id: imageId }, idx) => (
          <Post
            name={name}
            content={content}
            key={postId}
            id={postId}
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

export default PostList;
