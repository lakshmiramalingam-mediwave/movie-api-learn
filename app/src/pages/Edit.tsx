import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IMovie, IShowError } from "../components/type";
import Layout from "../components/Layout";
import { updateMovie } from "../services/api";
import { useNavigate } from "react-router-dom";

interface IEditForm {
  movie: IMovie;
}
const EditForm: React.FC<IEditForm> = ({ movie }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editValue, setEditValue] = useState({
    title: movie.title,
    year: movie.year,
  });
  const [showModal, setShowModal] = useState(false);

  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  }
  async function handleEditMovie(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleModal();
    try {
      const response = await updateMovie(editValue, movie.id);
      console.log(response);
      setShowModalMsg({
        action: " sucessfully ",
        msg: "edited",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <Layout title={`EditMovie${movie.title}`}>
        <main className="container">
          <form onSubmit={(e) => handleSubmit(e)}>
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
              <button onClick={(e) => handleEditMovie(e)}>Update</button>
              {/*  cancel button in add movie */}
              <Link to="/">
                <button>Cancel</button>
              </Link>
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
            </div>
          </form>
        </main>
      </Layout>
    </>
  );
};

export default EditForm;
