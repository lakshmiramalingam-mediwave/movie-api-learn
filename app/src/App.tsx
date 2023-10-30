import { lazy, Suspense, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
const AddForm = lazy(() => import("./pages/Add"));
const EditForm = lazy(() => import("./pages/Edit"));
import "@picocss/pico";
import { IMovie } from "./components/type";
import "./App.css";
function Loading() {
  return <p>Loading ...</p>;
}
function App() {
  const [movie, setMovie] = useState<IMovie>({
    id: 0,
    title: "",
    year: 0,
  });
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home handleEdit={(m) => setMovie(m)} />} />
          <Route path="/new" element={<AddForm />} />
          <Route path="/edit/:id" element={<EditForm movie={movie} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
