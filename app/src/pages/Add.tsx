import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { addMovie } from "../services/api";
import { useState } from "react";

function AddForm() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
  });

  async function handleAddMovie(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const moviePayload = {
        title: movie.title,
        year: movie.year,
      };
      const response = await addMovie(moviePayload);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Errored");
      console.log(error);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
    console.log(movie);
  }

  return (
    <>
      <Layout title="addForm">
        <h1>AddForm</h1>
        <form onSubmit={(e) => handleAddMovie(e)}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>

          <label htmlFor="year">
            Year
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Year"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
          <button type="submit">add movie</button>
        </form>
      </Layout>
    </>
  );
}

export default AddForm;
