import classes from "./Header.module.css";
import "../App.css";

function Header(props) {
  return (
    <div className={classes.container}>
      {props.loginStatus ? (
        <div className="actions">
          <button className={classes.btn} onClick={props.logoutHandler}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="actions">
          <button className={classes.btn} onClick={props.loginHandler}>
            Log In
          </button>
          <button className={classes.btn} onClick={props.signupHandler}>
            Sign Up
          </button>
        </div>
      )}
      <div className={classes.center}>
        <h3>NYC Vehicle Collison Reports</h3>
      </div>
    </div>
  );
}

export default Header;
