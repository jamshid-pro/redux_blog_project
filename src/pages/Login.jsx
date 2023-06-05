import {useEffect, useState} from "react";
import { Input } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { signUserSuccess, signUserFailure, signUserStart } from "../slice/auth";
import authService from "../service/auth";
import ValidateError from "../components/ValidateError";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, loggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loginHandle = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {email, password }
    try {
      const response = await authService.userLogin(user)
      dispatch(signUserSuccess(response.user))
      navigate("/")
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }    
  }

  useEffect(() => {
    if(loggedIn) {
      navigate("/")
    }
  },[loggedIn])

  return (
    <main className="form-signin form-main px-3 text-center m-auto">
      <form>
        <i className="bi bi-browser-edge fs-1 text-light me-1"></i>
        <h1 className="h3 mb-3 fw-normal text-light">Login</h1>
        <ValidateError/>

        <Input type='email' label='email' state={email} setState={setEmail} />
        <Input type='password' label='password' state={password} setState={setPassword} />

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label text-light" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button disabled={isLoading} onClick={loginHandle} className="btn btn-primary w-100 py-2" type="submit">
          {isLoading? "loading...": 'Login'}
        </button>
      </form>
    </main>
  );
};

export default Login;
