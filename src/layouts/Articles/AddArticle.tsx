import React, { useState, ChangeEvent } from "react";
import IArticleData from "../../models/IArticleData";
import ArticleService from "../Services/ArticleService";

export const AddArticle = () => {
    const initialArticleState = {
      title: "",
      author: "",
      full_text: "",
      category: "",
      img: ""
    };

    const [article, setArticle] = useState<IArticleData>(initialArticleState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setArticle({...article, [name]: value});
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      console.log(name);
      console.log(value);
      setArticle({...article, [name]: value});
    };

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setArticle({...article, [name]: value});
    };


    const saveArticle = async () => {
      article.category = article.category == "" ? "Science" : article.category;
      var data = {
        id: article.id,
        title: article.title,
        author: article.author,
        full_text: article.full_text,
        category: article.category,
        img: article.img
      };
      ArticleService.create(data)
        .then((response: any) => {
          setArticle({
            id: response.data.id,
            title: response.data.title,
            author: response.data.author,
            full_text: response.data.full_text,
            category: response.data.category,
            img: response.data.img
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

      const newArticle = () => {
        setArticle(initialArticleState);
        setSubmitted(false);
      };
  

    return(
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newArticle}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="container mt-5 mb-5">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={article.title}
                placeholder="Введите название статьи"
                onChange={handleChange}
                name="title"
              />

              <label htmlFor="author">Author:</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={article.author}
                placeholder="Введите имя автора статьи" 
                onChange={handleChange}
                name="author"
              />

              <label htmlFor="text">Text:</label>
              <textarea
                className="form-control"
                id="text"
                required
                value={article.full_text}
                placeholder="Введите полный текст статьи"
                onChange={handleTextAreaChange}
                name="full_text"
              />
              <div>
              <label className="mt-1" htmlFor="category">Select category:</label>
              </div>
              <div>
              <select 
                className="mt-1"
                id="category" 
                name="category" 
                value={article.category} 
                onChange={handleSelectChange}
              >
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Games">Games</option>
                <option value="Fashion">Fashion</option>
              </select>
              </div>
              <label htmlFor="title">Upload image:</label>
              <input
                type="text"
                className="form-control"
                id="img"
                required
                value={article.img}
                placeholder="Введите ссылку на картинку"
                onChange={handleChange}
                name="img"
              />
              <div className="mt-4">
            <button onClick={saveArticle} className='btn main-color text-white'>
              Submit
            </button>
            </div>
          </div>
          </div>
        )}
      </div>
    );
  };