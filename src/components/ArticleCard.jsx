import {useSelector } from "react-redux"
import articleService from "../service/article"
import { useNavigate } from "react-router-dom"


const ArticleCard = ({val, idx, getArticles}) => {
    const navigate = useNavigate()
    const {loggedIn,user} = useSelector(state => state.auth)

    const deleteArticle = async (slug) => {
        try {
            await articleService.deleteArticle(slug)
            getArticles()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="bg-light col-12 col-md-12 col-lg-8 offset-0 offset-lg-2 p-3" key={val.slug}>
              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="item-image">
                  <img src={`https://picsum.photos/400?random=${idx}`} className='border w-100 h-100 object-cover ' alt="" />
                </div>
                <div className="d-flex flex-grow-1 flex-column justify-content-between">
                  <p className="card-text">{val.title}</p>
                  <p className="card-text">{val.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" onClick={() => navigate(`/article/${val.slug}`)} className="btn btn-sm btn-outline-primary">View</button>
                      {loggedIn && user.username === val.author.username && (
                        <>
                          <button type="button" onClick={() => navigate(`/article-edit/${val.slug}`)}  className="btn btn-sm btn-outline-warning">Edit</button>
                          <button type="button" onClick={() => deleteArticle(val.slug)} className="btn btn-sm btn-outline-danger">Delete</button>
                        </>
                      )}
                    </div>
                    <small className="text-body-secondary text-capitalize">{val.author.username}</small>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default ArticleCard