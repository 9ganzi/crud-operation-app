import { useState, createContext } from "react";

export const CollisionsContext = createContext();

export const CollisionsContextProvider = (props) => {
  const [collisions, setCollisions] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const updatingIndex = collisions.findIndex(
    (collision) => collision.collision_id === updatingId
  );

  const addCollisions = (collision) => {
    setCollisions([...collisions, collision]);
  };

  const updateCollision = (updatedCollision) => {
    collisions[updatingIndex] = updatedCollision;
  };

  return (
    <CollisionsContext.Provider
      value={{
        collisions,
        setCollisions,
        addCollisions,
        updateCollision,
        updatingId,
        setUpdatingId,
        updatingIndex,
      }}
    >
      {/* = collisions: collisions, setCollisions: setCollisions */}
      {props.children}
    </CollisionsContext.Provider>
  );
};
