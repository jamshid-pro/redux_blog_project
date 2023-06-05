import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import articleService from '../service/article'
import article, { getArticleFailure, getArticleStart, getArticleSuccess } from '../slice/article'
import ArticleCard from '../components/ArticleCard'


const Main = () => {
  const {articles} = useSelector(state => state.article)
  const dispatch = useDispatch()
 


  const getArticles = async () => {
    dispatch(getArticleStart())
    try {
        const response = await articleService.getArticles()
        dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      dispatch(getArticleFailure(error))
    }
  }

  

  useEffect(() => {
    getArticles()
  }, [])
  

  return (
    <>
      <div className='banner'>
          <h1 className='banner__title text-center'>Lorem, ipsum dolor.</h1>
      </div>
      <div className="container mt-5 ">
        <div className="row g-4 px-3">
          {articles?.length < 5 ? <div className='container'><Loader/> <Loader/> <Loader/></div> : ''}
          {articles && articles.map((val, idx) => (
            <ArticleCard key={val.slug} val={val} idx={idx} getArticles={getArticles}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main