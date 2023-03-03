import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Services/AuthService";
import IUser from "../../models/IUser";
import { logRoles } from "@testing-library/react";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser | null
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: null
    };
  }

// gets current User from Local Storage and show user information (with token) 

  componentDidMount() {
    AuthService.getCurrentUser().then(currentUser => {
      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser?.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser?.id}
            </p>
            <p>
              <strong>First Name:</strong>{" "}
              {currentUser?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {currentUser?.lastName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser?.username}
            </p>
          </div> : null}
      </div>
    );
  }
}