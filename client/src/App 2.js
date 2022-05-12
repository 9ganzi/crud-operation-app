import React, { useState, Fragment } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import Header from "./components/Header";
import CollisionRecords from "./components/CollisionRecords";
import { CollisionsContextProvider } from "./context/CollisionsContext";
import AddCollision from "./components/AddCollisionButton";

function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  function loginHandler() {
    setLoginModalIsOpen(true);
  }

  function logoutHandler() {
    setLoginStatus(false);
  }

  function signupHandler() {
    setSignupModalIsOpen(true);
  }

  function closeLoginModalHandler() {
    setLoginModalIsOpen(false);
  }

  function closeSignupModalHandler() {
    setSignupModalIsOpen(false);
  }

  return (
    <CollisionsContextProvider>
      <div className="App">
        <Header
          loginHandler={loginHandler}
          signupHandler={signupHandler}
          logoutHandler={logoutHandler}
          loginStatus={loginStatus}
        />
        <CollisionRecords loginStatus={loginStatus} />
        {loginStatus && <AddCollision />}
        {loginModalIsOpen && (
          <Fragment>
            <Modal
              isSignup={false}
              closeBackdrop={closeLoginModalHandler}
              setLoginStatus={setLoginStatus}
            />
            <Backdrop onCancel={closeLoginModalHandler} />
          </Fragment>
        )}
        {signupModalIsOpen && (
          <Fragment>
            <Modal isSignup={true} closeBackdrop={closeSignupModalHandler} />
            <Backdrop onCancel={closeSignupModalHandler} />
          </Fragment>
        )}
      </div>
    </CollisionsContextProvider>
  );
}

export default App;
