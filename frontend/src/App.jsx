import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };


  // const getPosts = async () => {
  //   const response = await axios.get(urlBaseServer + "/posts");
  //   console.log(response.data); // Log the response to check its structure
  
  //   if (Array.isArray(response.data)) {
  //     setPosts([...response.data]);
  //   } else {
  //     console.error('Expected an array but received:', response.data);
  //   }
  // };

  const agregarPost = async () => {
    // Check if all fields are filled
    if (!titulo || !imgSrc || !descripcion) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const post = { titulo, url: imgSrc, descripcion };
    try {
      await axios.post(urlBaseServer + "/posts", post);
      alert('Posteo realizado con éxito.');
      getPosts();
    } catch (error) {
      console.error(`Error in agregarPost: ${error.message}`);
    }
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id, isLiked) => {
    try {
      const data = { likes: isLiked };
      console.log('Sending data:', data);
      await axios.put(urlBaseServer + `/posts/${id}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getPosts();
    } catch (error) {
      console.error('Error in like:', error);
    }
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;