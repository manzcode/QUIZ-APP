import { Routes, Route, NavLink } from "react-router-dom";
import Quiz from "./components/Quiz";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route
          path="*"
          element={
            <div className="container text-center fs-3">
              <figure className="p-3 mb-0">
                <blockquote className="blockquote">
                  <p>there is nothing here!</p>
                </blockquote>
                <figcaption className="blockquote-footer mb-0 text-muted">
                  No Route matched.
                  <cite title="Source Title">404</cite>
                </figcaption>
              </figure>
              <NavLink className={`btn btn-primary`} to="/">
                back home
              </NavLink>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
