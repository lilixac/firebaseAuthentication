import React, { Component, Suspense } from "react";

import { Route, Switch } from "react-router-dom";

import { auth, getUserProfileData } from "./firebase/firebase.utils";

import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import Header from "./components/header/header.component";

import Blog from "./blog/container/blog/blog.component";
import BlogDetail from "./blog/component/blogdetail/blogdetail.component";
const AddBlog = React.lazy(() =>
  import("./blog/component/addblog/addblog.component")
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await getUserProfileData(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(this.state.currentUser);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:id" component={BlogDetail} />
          <Route
            exact
            path="blog/new"
            render={() => (
              <Suspense fallback=<div>Loading...</div>>
                <AddBlog />
              </Suspense>
            )}
          />
          <Route render={() => <h3> 404 Not Found</h3>} />
        </Switch>
      </div>
    );
  }
}

export default App;