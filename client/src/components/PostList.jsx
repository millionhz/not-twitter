import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  console.log(posts);
  return (
    <div>
      {posts.map(
        ({ name, post_id: postId, content, image_path: imagePath }, idx) => (
          <Post
            name={name}
            content={content}
            key={postId}
            id={postId}
            image={imagePath}
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
