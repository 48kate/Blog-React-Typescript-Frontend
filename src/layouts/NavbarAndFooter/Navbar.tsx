import { Component } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import IUser from "../../models/IUser";
import eventBus from "../components/EventBus";
import { Homepage } from "../Homepage/Homepage";
import AuthService from "../Services/AuthService";

type Props = {};

type State = {
  showAdminBoard: boolean,
  currentUser: IUser | null
}

export class Navbar extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: null,
    };
  }

  componentDidMount() {
    AuthService.getCurrentUser().then(user => {
      if (user) {
        user = user as IUser;
        this.setState({
          currentUser: user,
          showAdminBoard: user?.roles?.includes("ROLE_ADMIN") ?? false,
        });
      }
    });

    eventBus.on("logout", () => {
    this.logOut();
    });
  }

  componentWillUnmount() {
    eventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: null,
    });
  }
  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
        <div className='container-fluid'>
          <button className='navbar-toggler' type='button'
            data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown' aria-expanded='false'
            aria-label='Toggle Navigation'>
            <span className='navbar0toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <div>
              <ul className='navbar-nav'>
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link text-white">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/add"} className="nav-link text-white">
                      Add article
                    </Link>
                </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link text-white">
                    Admin Board
                  </Link>
                </li>
              )}
              </ul>
            </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item m-1">
                <Link to={"/profile"} className="nav-link text-white">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item m-1">
                <a href="/auth/login" className="nav-link text-white" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item m-1">
                <Link  type='button' className='btn btn-outline-light' to={"/auth/login"} >
                  Login
                </Link>
              </li>
              <li className="nav-item m-1">
                <Link  type='button' className='btn btn-outline-light' to={"/auth/register"}>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          </div>
      </div>
    </nav>
    );
    }
}