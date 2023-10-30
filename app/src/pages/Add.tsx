import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { addMovie } from "../services/api";
import { useState } from "react";
import { IShowError } from "../components/type";

function AddForm() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  async function handleAddMovie(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
     toggleModal();
    try {
      const moviePayload = {
        title: movie.title,
        year: movie.year,
      };
      const response = await addMovie(moviePayload);
      console.log(response);
      setShowModalMsg({
        action: "Sucessfully ",
        msg: "Added",
      });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding movie:", error);
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
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
          {showModal && (
            <dialog open>
              <article>
                <a
                  href="#close"
                  aria-label="Close"
                  className="close"
                  data-target="modal-example"
                  onClick={toggleModal}
                ></a>
                <h3>{showModalMsg.action}</h3>
                <p>{showModalMsg.msg}</p>
              </article>
            </dialog>
          )}
        </form>
      </Layout>
    </>
  );
}

export default AddForm;
