import "../App.css";
import Card from "./Card";
import React, { useRef, Fragment, useState } from "react";

function Modal(props) {
  let msg;
  const nameInputRef = useRef();
  const badgeNumInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/collisions/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: nameInputRef.current.value,
          badge_number: badgeNumInputRef.current.value,
          username: usernameInputRef.current.value,
          password: passwordInputRef.current.value,
        }),
      });
      const signupStatus = await response.json();
      if (signupStatus) {
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
      const response = await fetch("/api/v1/collisions/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: usernameInputRef.current.value,
          password: passwordInputRef.current.value,
        }),
      }).then((res) => res.json());
      if (response.message) {
        setIsInvalid(true);
      } else {
        props.setLoginStatus(true);
        props.closeBackdrop();
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
