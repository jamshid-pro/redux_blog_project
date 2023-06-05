import React, { useEffect } from 'react'
import { Routes , Route } from 'react-router-dom'
import { ArticleDetail, Login, Main, Register } from './pages'
import { FromArticle, Navbar, EditArticle } from './components'
import { useDispatch } from 'react-redux'
import authService from './service/auth'
import { signUserSuccess } from './slice/auth'
import { getItem } from './helpers/persistance-storage'

const App = () => {
  const  dispatch = useDispatch()

  const getUser = async () => {
    try {
      const response = await authService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    const token = getItem('token')
    if(token) {
      getUser()
    }
  }, [])

  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='login' element={<Login/>} />
          <Route path='/article/:slug' element={<ArticleDetail />} />
          <Route path="/article-create" element={<FromArticle />} />
          <Route path="/article-edit/:slug" element={<EditArticle />} />
        </Routes>
      </div>
    </>
  )
}

export default App