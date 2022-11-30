const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getCurrentTime = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const insertUser = async (email, password, name) => {
  const hash = bcrypt.hashSync(password, 10);
  const createdTime = getCurrentTime();
  const sql =
    'INSERT INTO users (email, hash, name, created_time) VALUES (?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(sql, [email, hash, name, createdTime], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;

  return new Promise((resolve, reject) => {
    connection.query(sql, [email], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getUserById = (id) => {
  const sql = `SELECT * FROM users WHERE user_id = ?`;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (res.length === 0) {
          resolve(null);
        }

        resolve(res[0]);
      }
    });
  });
};

const authenticate = async (email, password) => {
  const response = await getUserByEmail(email);

  if (response.length === 0) {
    return null;
  }

  const user = response[0];

  const passwordMatched = await bcrypt.compare(password, user.hash);
  if (passwordMatched) {
    return user;
  }

  return null;
};

const query = (sql, params) =>
  new Promise((resolve, reject) => {
    connection.query(sql, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const insertLike = (postId, userId) => {
  const createdTime = getCurrentTime();
  const sql = `INSERT INTO likes (post_id, user_id, created_time) VALUES (?, ?, ?)`;

  return query(sql, [postId, userId, createdTime]);
};

const getLikesById = (postId) => {
  const sql = `SELECT * FROM likes WHERE post_id = ?`;

  return query(sql, [postId]);
};

const insertPost = (postContent, userId) => {
  const createdTime = getCurrentTime();
  const sql = `INSERT INTO posts (created_time, updated_time, content, user_id) VALUES (?, ?, ?, ?)`;

  return query(sql, [createdTime, createdTime, postContent, userId]);
};

const insertComment = (postId, content, userId) => {
  const createdTime = getCurrentTime();
  const sql = `INSERT INTO comments (post_id, content, user_id, created_time) VALUES (?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    connection.query(
      sql,
      [postId, content, userId, createdTime],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const insertFollow = (userId, myUserId) => {
  const createdTime = getCurrentTime();
  const sql = `INSERT INTO follows (followed_id, follower_id, created_time) VALUES (?, ?, ?);`;

  return query(sql, [userId, myUserId, createdTime]);
};

const deleteFollow = (userId, myUserId) => {
  const sql = `DELETE FROM follows WHERE followed_id = ? and follower_id = ?;`;

  return query(sql, [userId, myUserId]);
};

const toggleFollow = (userId, myUserId) =>
  new Promise((resolve, reject) => {
    insertFollow(userId, myUserId)
      .then(resolve)
      .catch((err) => {
        if (err.errno !== 1062) {
          reject(err);
          return;
        }

        deleteFollow(userId, myUserId).then(resolve).catch(reject);
      });
  });

const getCommentsById = (postId) => {
  const sql = `SELECT comment_id, content, comments.created_time, name FROM (SELECT * FROM comments WHERE post_id = ? AND is_deleted = 0) as comments INNER JOIN users ON comments.user_id = users.user_id;`;

  return new Promise((resolve, reject) => {
    connection.query(sql, [postId], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getPosts = (params = {}) => {
  const sql = `
  SELECT
    users.name,
    posts.post_id,
    posts.user_id,
    posts.content,
    posts.created_time,
    IFNULL(likes, 0) AS likes
  FROM
    (
      SELECT
        *
      FROM
        posts
      WHERE
        is_deleted = 0 ${params.postId ? 'AND post_id = ?' : ''} ${
    params.userId ? 'AND user_id = ?' : ''
  }
    ) as posts
    INNER JOIN users ON posts.user_id = users.user_id
    LEFT JOIN (
      SELECT
        post_id,
        COUNT(*) as likes
      from
        likes
      GROUP BY
        post_id
    ) as likes ON posts.post_id = likes.post_id
  ORDER BY
    created_time DESC;
  `;

  return query(sql, [params.postId, params.userId].filter(Boolean));
};

const getPostById = (postId) =>
  getPosts({ postId }).then((posts) => (posts.length === 0 ? null : posts[0]));

const getPostsByUserId = (userId) => getPosts({ userId });

const deleteLike = (postId, userId) => {
  const sql = `DELETE FROM likes WHERE post_id = ? and user_id = ?;`;

  return query(sql, [postId, userId]);
};

const toggleLike = (postId, userId) =>
  new Promise((resolve, reject) => {
    insertLike(postId, userId)
      .then(resolve)
      .catch((err) => {
        if (err.errno !== 1062) {
          reject(err);
          return;
        }

        deleteLike(postId, userId).then(resolve).catch(reject);
      });
  });

const isLikedByUser = (postId, userId) => {
  const sql = `SELECT * FROM likes WHERE post_id = ? AND user_id = ?;`;

  return query(sql, [postId, userId]).then((data) => Boolean(data.length));
};

const searchPost = (word) => {
  const sql = `SELECT name, post_id, content FROM (SELECT * FROM posts WHERE is_reported = 0 AND is_deleted=0 AND content LIKE ?) as posts INNER JOIN users WHERE users.user_id = posts.user_id;`;
  return query(sql, [`%${word}%`]);
};

const searchName = (name) => {
  const sql = `SELECT user_id ,name, profile_img_id from users where name like ? and is_activated = 1;`;
  return query(sql, [`%${name}%`]);
};

const updatePassword = async (userId, password) => {
  const hash = bcrypt.hashSync(password, 10);
  const sql = `UPDATE users SET hash = ? WHERE user_id = ?`;

  return query(sql, [hash, userId]);
};

const updateName = (userId, name) => {
  const sql = `Update users set name = ? where user_id= ?;`;
  return query(sql, [`'${name}'`, userId]);
};

const updateBio = (userId, newBio) => {
  const sql = `Update users set bio = ? where user_id= ?;`;
  return query(sql, [`'${newBio}'`, userId]);
};

const getUserDataById = (userId, myUserId) => {
  const sql = `SELECT * FROM (SELECT user_id, name, bio FROM users WHERE user_id = ? AND is_activated = 1) as t1 JOIN (SELECT COUNT(followed_id) AS is_following FROM follows WHERE followed_id = ? AND follower_id = ?) AS t2;`;

  return query(sql, [userId, userId, myUserId]).then((data) =>
    data.length === 0 ? null : data[0]
  );
};

const deletePost = (postId, userId) => {
  const sql = `UPDATE posts SET is_deleted = 1 WHERE post_id = ? AND user_id = ?;`;

  return query(sql, [postId, userId]);
};

const reportPost = (postId) => {
  const sql = `UPDATE posts SET is_reported = 1 WHERE post_id = ?;`;

  return query(sql, [postId]);
};

module.exports = {
  connection,
  insertUser,
  getUserByEmail,
  authenticate,
  getUserById,
  getLikesById,
  insertPost,
  insertComment,
  getCommentsById,
  getPosts,
  getPostById,
  getPostsByUserId,
  toggleLike,
  isLikedByUser,
  searchPost,
  searchName,
  updatePassword,
  updateName,
  updateBio,
  getUserDataById,
  toggleFollow,
  deletePost,
  reportPost,
};
