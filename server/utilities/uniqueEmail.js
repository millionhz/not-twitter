const { connection } = require("./database");

const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

const uniqueEmail = async (email, user_id, is_admin) => {
  let query, values;
  // if the request is from a user
  if (is_admin === 0) {
    query = `SELECT user_id FROM user WHERE email=$1 AND user_id!=$2`;
    values = [email, user_id];
    let result = await executeQuery(query, values);
    if (result.rowCount > 0) {
      return false;
    } else {
      query = "SELECT user_id FROM users WHERE email=$1 AND is_admin=0";
      values = [email];
      result = await executeQuery(query, values);
      if (result.rowCount > 0) {
        return false;
      } else {
        query = "SELECT user_id FROM users WHERE email=$1 AND is_admin=1";
        values = [email];
        result = await executeQuery(query, values);
        if (result.rowCount > 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
  // if the request is from an admin
  else if (is_admin === 1) {
    query = `SELECT user_id FROM users WHERE email=$1 AND user_id!=$2 AND is_admin=1`;
    values = [email, user_id];
    result = await executeQuery(query, values);
    if (result.rowCount > 0) {
      return false;
    } else {
      query = `SELECT user_id FROM users WHERE email=$1 AND is_admin=0`;
      values = [email];
      let result = await executeQuery(query, values);
      if (result.rowCount > 0) {
        return false;
      } else {
        query = `SELECT user_id FROM users FROM email=$1 AND is_admin=0`;
        values = [email];
        result = await executeQuery(query, values);
        if (result.rowCount > 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
};

module.exports = uniqueEmail;
