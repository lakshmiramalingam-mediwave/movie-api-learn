import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/api";
import Layout from "../components/Layout";
import { IMovie, IShowError } from "../components/type";

import "@picocss/pico";
import LoadingIcon from "../components/Loading/LoadingIcon";

interface IHome {
  handleEdit: (movie: IMovie) => void;
}
const Home: React.FC<IHome> = ({ handleEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);
  async function handleDelete(id: number) {
    setLoadingId(id);
    setIsLoading(true);
    try {
      await deleteMovie(id);
      setShowModalMsg({
        action: "Sucessfully Deleted",
        msg: "deleted",
      });
      // setRefresh(true);

      setRefresh((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      toggleModal();
      setIsLoading(false);
    }
  }
  return (
    <>
      <Layout title="Home">
        <h1>Home</h1>
        <div className="container">
          <Link to="/new" role="button" className="secondary">
            +
          </Link>
          <button
            disabled={isLoading}
            onClick={() => setRefresh((prev) => !prev)}
          >
            {isLoading ? <LoadingIcon /> : <>refresh list</>}
          </button>

          <div className="grid">
            {movies.map((m) => (
              <article key={m.id}>
                <h1>{m.title}</h1>
                <h3>{m.year}</h3>

                <div className="grid">
                  <Link to={`/edit/${m.id}`}>
                    <button onClick={() => handleEdit(m)}>Edit</button>
                  </Link>
                  {/* <button onClick={() => handleDelete(m.id)}>
                      {" "}
                      {isLoading ? <LoadingIcon /> : <>delete</>}delete
                    </button> */} 
                  <button
                    disabled={isLoading}
                    onClick={() => handleDelete(m.id)}
                  >
                    {loadingId === m.id ? <LoadingIcon /> : <>Delete</>}
                  </button>
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
              </article>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
