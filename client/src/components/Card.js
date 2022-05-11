import classes from "./Card.module.css";

function Card(props) {
  // children holds the content, which is passed between the opening and closing component text.
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
