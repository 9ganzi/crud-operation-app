import "../App.css";
import Card from "./Card";
import React, { useRef, Fragment, useState } from "react";
import axios from "../apis/axios";

function Modal(props) {
  const nameInputRef = useRef();
  const badgeNumInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/collisions/signup", {
        name: nameInputRef.current.value,
        badge_number: badgeNumInputRef.current.value,
        username: usernameInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      if (response.data) {
        props.closeBackdrop();
      } else {
        setIsInvalid(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/collisions/login", {
        username: usernameInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      if (response.data) {
        // login success
        console.log("login success");
        props.setLoginStatus(true);
        props.closeBackdrop();
      } else {
        // login fail
        console.log("login fail");
        setIsInvalid(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      {/* onSubmit prop is needed to listen to the submission */}

      <form className="form" onSubmit={props.isSignup ? signup : login}>
        {props.isSignup && (
          <Fragment>
            <div className="control">
              <label htmlFor="name">Name</label>
              <input type="text" required id="name" ref={nameInputRef} />
            </div>
            <div className="control">
              <label htmlFor="badgeNum">Badge Number</label>
              <input
                type="number"
                required
                id="badgeNum"
                ref={badgeNumInputRef}
              />
            </div>
          </Fragment>
        )}
        <div className="control">
          <label htmlFor="id">Username</label>
          <input type="text" required id="id" ref={usernameInputRef} />
        </div>
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className="actions">
          {props.isSignup ? (
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <button>Sign Up</button>
              </div>
              {isInvalid ? (
                <div className="text-danger col align-middle">
                  Username Exist!
                </div>
              ) : (
                <div className="col"></div>
              )}
            </div>
          ) : (
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <button>Log In</button>
              </div>
              {isInvalid ? (
                <div className="text-danger col">
                  Invalid username or password!
                </div>
              ) : (
                <div className="col"></div>
              )}
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}

export default Modal;
