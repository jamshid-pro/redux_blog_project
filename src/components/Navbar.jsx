import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../helpers/persistance-storage";
import { logoutUser } from "../slice/auth";


const Navbar = () => {
  const {loggedIn, user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutUser())
    removeItem('token')
    navigate('/login')
  }


  return (
    <nav className="navbar navbar-expand-lg sticky-top z-2 p-3">
      <div className="container d-flex align-items-center">
        <NavLink className="navbar-brand" to="/">
          <i className="bi bi-browser-edge fs-3 text-light me-1"></i>
          <span className="fs-3 fw-bold text-light">Blog</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasLightNavbar"
          aria-controls="offcanvasLightNavbar"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list text-light border border-light fs-4 py-0 px-2"></i>
        </button>

        <div
          className="offcanvas offcanvas-end bg-blue text-light"
          tabIndex={-1}
          id="offcanvasLightNavbar"
          aria-labelledby="offcanvasLightNavbarLabel"
        >
          <div className="offcanvas-header text-light">
            <h5 className="offcanvas-title" id="offcanvasLightNavbarLabel">
              {user?.username}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body fs-5">
            <ul className="navbar-nav justify-content-end gap-3 flex-grow-1 pe-3">
              {loggedIn ? 
              (
                <>
                  <p className="me-3 mt-1 my-0 d-none d-lg-block">@{user.username}</p>
                  <button onClick={() => navigate("/article-create")} className="btn btn-outline-warning my-0">Create Article</button>
                  <button className="btn btn-outline-danger my-0" onClick={logoutHandler}>Logout</button>
                </>
              ) : (
                <>
                <NavLink
                  className="me-2 m-0 py-2 text-decoration-none text-light me-3"
                  to="/login"
                >
                  Login
                </NavLink>

                <NavLink
                  className="me-3 py-2 text-light text-decoration-none"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
