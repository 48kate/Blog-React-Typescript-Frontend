import { useEffect, useState, ChangeEvent } from "react";
import ArticleModel from "../../models/ArticleModel";
import ArticleService from "../Services/ArticleService";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchArticle } from "./SearchArticle";

export const SearchArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [isloading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState("");
  const [categorySelection, setCategorySelection] =
    useState("Article category");

  const handleArticles = (response: any) => {
    setArticles(response.data);
    setIsloading(false);
    console.log(response.data);
  };

  const handleError = (e: Error) => {
    console.log(e);
    setHttpError(e.message);
  };

  const find = (event?: any, category?: string) => {
    if (typeof category == "undefined") {
      category = categorySelection;
    }
    if (
      searchTitle != "" &&
      ["All", "Article category"].indexOf(category) == -1
    ) {
      ArticleService.findByTitleAndCategory(searchTitle, category)
        .then(handleArticles)
        .catch(handleError);
    } else if (searchTitle != "") {
      ArticleService.findByTitle(searchTitle)
        .then(handleArticles)
        .catch(handleError);
    } else if (["All", "Article category"].indexOf(category) == -1) {
      ArticleService.findByCategory(category)
        .then(handleArticles)
        .catch(handleError);
    } else {
      ArticleService.getAll().then(handleArticles).catch(handleError);
    }
  };

  useEffect(() => {
    find();
  }, []);

  if (isloading) {
    return <SpinnerLoading />;
  }

  if (httpError != "") {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = event.target.value;
    setSearchTitle(searchTitle);
  };

  const categoryField = (value: string) => {
    setCategorySelection(value);
    find(null, value);
  };

  let body;
  if (articles.length > 0) {
    console.log(articles.length);
    body = (
      <>
        <div className="mt-3">
          <h5>Number of results: ({articles.length})</h5>
        </div>
        {articles.map((article) => (
          <SearchArticle article={article} key={article.id} />
        ))}
      </>
    );
  } else {
    console.log(articles.length);
    body = (
      <div className="m-5">
        <h3>По вашему "{searchTitle}" запросу ничего не найдено</h3>
        <a
          type="button"
          className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
          href="/articles"
        >
          Explore articles
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
                  aria-aria-labelledby="Search"
                  value={searchTitle}
                  onChange={onChangeSearch}
                />
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={find}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <div className="dropdown-item">All</div>
                  </li>
                  <li onClick={() => categoryField("Science")}>
                    <div className="dropdown-item">Science</div>
                  </li>
                  <li onClick={() => categoryField("History")}>
                    <div className="dropdown-item">History</div>
                  </li>
                  <li onClick={() => categoryField("Games")}>
                    <div className="dropdown-item">Games</div>
                  </li>
                  <li onClick={() => categoryField("Fashion")}>
                    <div className="dropdown-item">Fashion</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {body}
        </div>
      </div>
    </div>
  );
};
