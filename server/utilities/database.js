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

const insertUser = async (
  email,
  password,
  name = 'John Doe',
  dob = '1990-01-01'
) => {
  const hash = bcrypt.hashSync(password, 10);
  const createdTime = getCurrentTime();
  const sql =
    'INSERT INTO users (email, hash, name, dob, created_time) VALUES (?, ?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(sql, [email, hash, name, dob, createdTime], (err, res) => {
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

const getPosts = (params = {}) => {
  const sql = `
  SELECT
    users.user_id,
    users.name,
    posts.post_id,
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

const getPostById = (postId) => {
  const post = getPosts({ postId });

  return post.length === 0 ? null : post[0];
};

const getPostsByUserId = (userId) => getPosts({ userId });

module.exports = {
  connection,
  insertUser,
  getUserByEmail,
  authenticate,
  getUserById,
  insertLike,
  getLikesById,
  insertPost,
  getPosts,
  getPostById,
  getPostsByUserId,
};
