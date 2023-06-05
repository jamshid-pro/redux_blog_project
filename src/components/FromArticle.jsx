import React, { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import "./style.css"
import articleService from "../service/article";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article";

const FromArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formSubmit = async (e) => {
    e.preventDefault()
    const article = {title, description, body}
    dispatch(postArticleStart())
    try {
      await articleService.postArticle(article)
      dispatch(postArticleSuccess())
      navigate("/")
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={formSubmit} className="form-main mx-auto mt-5 d-flex flex-column gap-3">
        <i className="bi bi-browser-edge fs-1 text-light mx-auto"></i>
        <h1 className="text-light text-center">Create Article</h1>
        <Input label="title" state={title} setState={setTitle}  />
        <TextArea label="description" state={description} setState={setDescription} />
        <TextArea label="body" state={body} setState={setBody} />
        <button className="btn btn-primary btn-block" type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FromArticle;
