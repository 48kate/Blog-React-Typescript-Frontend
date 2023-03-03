import axios from "axios";
import authHeader from './AuthHeader';
import IUser from "../../models/IUser";

const baseUrl = "http://localhost:8080/";

//service uses Axios for HTTP requests and Local Storage for user information & JWT 

class AuthService {
    //POST {username, password} & save JWT to Local Storage
    login(username: string, password: string) {
        return axios
        .post(baseUrl + "auth/login", {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                this.setToken(response.data.token);
            }
            return response.data
        });
    }
    //remove JWT from Local Storage
    logout() {
        localStorage.removeItem("token");
    }
    //POST {}
    register(firstname: string, lastname: string, username: string, password: string) {
        return axios.post(baseUrl + "auth/register", {
            firstname,
            lastname,
            username,
            password
        });
    }
    //get stored user information (including JWT)
    async getCurrentUser(): Promise<IUser | null> {
        if (this.getToken()) {
            let user: IUser | null = null;
            await axios
                .get(baseUrl + "profile", { headers: authHeader() }).then(response => {
                    user = response.data;
                });
            return user;
        }

        return null;
    }

    getToken() {
        return localStorage.getItem("token")
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }
}

export default new AuthService();