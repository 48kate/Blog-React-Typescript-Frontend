import IArticleData from "../../models/IArticleData";
import http from "../../http-common";
import authHeader from './AuthHeader';

const baseUrl = "http://localhost:8080";

const getAll = () => {
  return http.get<Array<IArticleData>>(baseUrl + "/articles");
};

const getById = (id: any) => {
  return http.get<IArticleData>(baseUrl + `/articles/${id}`);
};

const create = (data: IArticleData) => {
  return http.post<IArticleData>(baseUrl + "/add", data, {headers: authHeader()});
};

const update = (id: any, data: IArticleData) => {
  return http.put<any>(baseUrl + `/edit/${id}`, data, {headers: authHeader()});
};

const remove = (id: any) => {
  return http.delete<any>(baseUrl + `/delete/${id}`, {headers: authHeader()});
};

const findByTitle = (title: string) => {
  return http.get<Array<IArticleData>>(baseUrl + `/articles?title=${title}`);
};

const findByAuthor = (author: string) => {
  return http.get<Array<IArticleData>>(baseUrl + `/articles?author=${author}`);
};

const findByCategory = (category: string) => {
  return http.get<Array<IArticleData>>(baseUrl + `/articles?category=${category}`);
};

const findByTitleAndCategory = (title:string, category: string) => {
  return http.get<Array<IArticleData>>(baseUrl + `/articles?title=${title}&category=${category}`);
};

const ArticleService = {
  getAll,
  getById,
  create,
  update,
  remove,
  findByTitle,
  findByAuthor,
  findByCategory,
  findByTitleAndCategory
};

export default ArticleService;
