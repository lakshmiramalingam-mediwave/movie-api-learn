import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IMovie } from "../components/types";
import Layout from "../components/layout";
import { updateMovie } from "../services/api";

interface IEditForm {
  movie: IMovie;
}
const EditForm: React.FC<IEditForm> = ({ movie }) => {
  const { id } = useParams();
  const [editValue, setEditValue] = useState({
    title: movie.title,
    year: movie.year,
  });

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  }
  async function handleEditMovie() {
    try {
      const response = await updateMovie(editValue, movie.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Layout title={`EditMovie${movie.title}`}>
        <main className="container">
          <form>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                value={editValue.title}
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
                value={editValue.year}
                placeholder="Year"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <div className="grid">
              <Link to="/">
                <button onClick={() => handleEditMovie()}>add</button>
              </Link>
              <Link to="/">
                <button>Cancel</button>
              </Link>
            </div>
          </form>
        </main>
      </Layout>
    </>
  );
};

export default EditForm;
