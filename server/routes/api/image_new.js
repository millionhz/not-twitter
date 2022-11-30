// create a query to insert an image
const storeImage_J = (post_id, image_content) => {
    const modifiedTime = getCurrentTime();
    const sql = `INSERT INTO images (binary, created_time) VALUES (?, ?)`
  
    return query(sql, [image_content, modifiedTime]).then(()=> {
      const id_query = `SELECT image_id FROM images where image_id = (SELECT LAST_INSERT_ID());`
      var id = query(id_query)
      id = id["image_id"]
  
      // update image table now
      const posts_table = `UPDATE posts SET (image_id = ?) WHERE post_id = ?;`
      return query(posts_table, [id, post_id])
  
    })
  };

  // routes
  router.get('/:postId/image_J', (req, res, next) => {
    const { image } = req.params;
    const { postId } = req.params;
  
    storeImage_J(postId, image)
      .then(() => {
  
        res.sendStatus(200);
      })
      .catch((err) => {
  
        res.status(500).json({ message: err.message });
        next(err);
      });
  });