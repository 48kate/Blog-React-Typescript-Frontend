import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ArticleModel from "../../models/ArticleModel";
import ArticleService from "../Services/ArticleService";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const ArticlePage = () => {
  const [article, setArticle] = useState<ArticleModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const articleId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchArticle = async () => {
      const baseUrl: string = `http://localhost:8080/articles/${articleId}`;

      const response = await fetch(baseUrl); //fetching all of ours data from server

      if (!response.ok) {
        throw new Error("Something went wrong"); //check to make sure the response is ok
      }

      const responseJson = await response.json(); //turn the response data into JSON

      const loadedArticle: ArticleModel = {
        //push all new data in new variable
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        full_text: responseJson.full_text,
        category: responseJson.category,
        img: responseJson.img,
      };

      setArticle(loadedArticle);
      setIsLoading(false);
    };
    fetchArticle().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const deleteArticle = () => {
    ArticleService.remove(article?.id)
      .then((response: any) => {
        setSubmitted(true);
        console.log(response.data);

      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
    {submitted ? (
      <div>
        <h4>You deleted successfully!</h4>
        <a href="/articles">
        <button className="btn btn-success">
          Articles
        </button>
        </a>
      </div>
    ) : (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-4">
            {article?.img ? (
              <img src={article?.img} width="449" height="349" alt="article" />
            ) : (
              <img
                src={require("./../../Images/PublicImages/image-6.jpg")}
                width="449"
                height="349"
                alt="article"
              />
            )}
          </div>
          <div className="col-4 col-md-6 container">
            <div className="ml-2">
              <h2>{article?.title}</h2>
              <h5 className="text-primary">{article?.author}</h5>
              <p className="lead">{article?.full_text}</p>
            </div>
            <button
              type="submit"
              className="btn main-color btn-lg text-white"
              onClick={deleteArticle}
            >
              Delete
            </button>
          </div>
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {article?.img ? (
            <img src={article?.img} width="449" height="349" alt="article" />
          ) : (
            <img
              src={require("./../../Images/PublicImages/image-6.jpg")}
              width="449"
              height="349"
              alt="article"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{article?.title}</h2>
            <h5 className="text-primary">{article?.author}</h5>
            <p className="lead"> {article?.full_text}</p>
          </div>
          <button
            type="submit"
            className="btn main-color btn-lg text-white"
            onClick={deleteArticle}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    </div>
    )}
    </div>
  );
};
