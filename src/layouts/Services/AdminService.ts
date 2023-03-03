import IUser from "../../models/IUser";
import authHeader from "./AuthHeader";
import http from "../../http-common";

const baseUrl = "http://localhost:8080";

const getAll = () => {
  return http.get<Array<IUser>>(baseUrl + "/admin");
};

const remove = (id: any) => {
  return http.delete<any>(baseUrl + `/admin/${id}`, { headers: authHeader() });
};

const AdminService = {
  getAll,
  remove,
};

export default AdminService;
