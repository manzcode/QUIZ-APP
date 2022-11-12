import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const initialState = {
    collapsed: true,
    expanded: false,
    show: false,
  };
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    setState((p) => ({
      collapsed: !p.collapsed,
      expanded: !p.expanded,
      show: !p.show,
    }));
  };

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
      aria-label="Third navbar example"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3 px-3" to="/">
          CHINGU TRIVIA
        </NavLink>
        <button
          className={`navbar-toggler ${state.collapsed ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded={`${!state.expanded ? false : true}`}
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navbar-collapse collapse ${
            state.show ? "show" : "flex-grow-0 fs-4 me-4"
          }`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? `nav-link active` : `nav-link`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
