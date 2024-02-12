const express = require("express");
const { getPosts, addPosts, updatePost, deletePost, updateLikes } = require("../query/consultas.js");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const results = await getPosts();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
});

router.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  // Check if the necessary parameters are provided and are not empty strings
  if (![titulo, url, descripcion].every(param => typeof param === 'string' && param.trim().length > 0)) {
    return res.status(422).json({ message: "Debe ingresar los parametros" });
  }

  try {
    await addPosts(titulo, url, descripcion);
    res.status(201).json({ message: "Datos agregados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar los datos" });
  }
});

router.put("/posts/:id", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  const { id } = req.params;

  // Validate the types of the parameters
  if (
    [titulo, img, descripcion].some(param => param != null && (typeof param !== 'string' || param.trim().length === 0)) ||
    (likes != null && typeof likes !== 'number')
  ) {
    return res.status(422).json({ message: "Debe ingresar los parametros correctamente" });
  }
  
  try {
    // Check if the post exists before updating it
    const post = await getPosts(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // await updatePost(id, titulo, img, descripcion, likes);
    await updateLikes(id, likes);
    res.status(200).json({ message: "Datos actualizados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar los datos" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the post exists before deleting it
    const post = await getPosts(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    await deletePost(id);
    res.status(200).json({ message: "Post eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el post" });
  }
});


module.exports = router;