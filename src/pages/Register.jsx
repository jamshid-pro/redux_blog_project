import {useState, useEffect} from 'react'
import { Input } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {signUserFailure, signUserStart, signUserSuccess} from '../slice/auth'
import authService from '../service/auth'
import ValidateError from '../components/ValidateError'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isLoading, loggedIn} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerHandle = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {username, email, password }
    try {
      const response = await authService.userRegister(user)
      navigate('/')
      dispatch(signUserSuccess())
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
    <main className="form-signin form-main px-3 text-center mx-auto">
      <form className='w-100'>
        <i className="bi bi-browser-edge fs-1 text-light me-1"></i>
        <h1 className="h3 mb-3 fw-normal text-light">Register</h1>
        <ValidateError/>

       <Input type='text' label='username' state={username} setState={setUsername} />
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
        <button disabled={isLoading} onClick={registerHandle} className="btn btn-primary w-100 py-2" type="submit">
          {isLoading? "loading...": 'Register'}
        </button>
      </form>
    </main>
  )
}

export default Register