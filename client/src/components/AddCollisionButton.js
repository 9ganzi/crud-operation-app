import "../App.css";
import { useState, Fragment } from "react";
import AddCollisionModal from "./AddCollisionModal";
import Backdrop from "./Backdrop";

function AddCollision() {
  const [addCollisionModalIsOpen, setAddCollisionModalIsOpen] = useState(false);

  function addHandler() {
    setAddCollisionModalIsOpen(true);
  }

  function cancelHandler() {
    setAddCollisionModalIsOpen(false);
  }

  return (
    <Fragment>
      <div className="actions">
        <button className="mb-3" onClick={addHandler}>
          Add Collision
        </button>
      </div>
      {addCollisionModalIsOpen && (
        <Fragment>
          <AddCollisionModal closeBackdrop={cancelHandler}></AddCollisionModal>
          <Backdrop onCancel={cancelHandler}></Backdrop>
        </Fragment>
      )}
    </Fragment>
  );
}

export default AddCollision;
