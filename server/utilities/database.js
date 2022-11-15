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

module.exports = {
  connection,
  insertUser,
  getUserByEmail,
  authenticate,
  getUserById,
};
