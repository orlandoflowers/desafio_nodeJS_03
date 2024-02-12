const pool = require("../config/db");

const getPosts = async () => {
  try {
    const query = `SELECT * FROM posts`;
    const { rows } = await pool.query(query);
    
    if (rows.length === 0) {
      return null;
    }

    return rows;
    
  } catch (err) {
    console.error(`Error in getPosts: ${err.message}`);
    throw new Error('Failed to get posts');
  }
};

const addPosts = async (titulo, img, descripcion, likes) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, likes]
    );
    return rows;
  } catch (err) {
    console.error(`Error in addPosts: ${err.message}`);
    throw new Error('Failed to add post');
  }
};

const updatePost = async (id, titulo, img, descripcion, likes) => {
  try {
    const { rowCount } = await pool.query(
      "UPDATE posts SET titulo = $1, img = $2",
      [titulo, img, descripcion, likes, id]
    );

    if (rowCount === 0) {
      throw new Error('No post found to update');
    }
  } catch (err) {
    console.error(`Error in updatePost: ${err.message}`);
    throw err;
  }
};

const updateLikes = async (id, likes) => {
  try {
    const { rowCount } = await pool.query(
      "UPDATE posts SET likes = $1 WHERE id = $2",
      [likes, id]
    );

    if (rowCount === 0) {
      throw new Error('No post found to update');
    }
  } catch (err) {
    console.error(`Error in updateLikes: ${err.message}`);
    throw err;
  }
};

const deletePost = async (id) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      throw new Error('Nothing to delete');
    }
  } catch (err) {
    console.error(`Error in deletePost: ${err.message}`);
    throw err;
  }
};


module.exports = {
  getPosts,
  addPosts,
  updatePost,
  deletePost,
  updateLikes
};