import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./CollisionRecords.module.css";
import axios from "../apis/axios";
import { CollisionsContext } from "../context/CollisionsContext";
import UpdateCollisionModal from "./UpdateCollisionModal";
import Backdrop from "./Backdrop";

const CollisionRecords = (props) => {
  const { collisions, setCollisions } = useContext(CollisionsContext);
  const [updateCollisionModalIsOpen, setUpdateCollisionModalIsOpen] =
    useState(false);
  const { updateCollision } = useContext(CollisionsContext);
  const { setUpdatingId } = useContext(CollisionsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/collisions");
        setCollisions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/collisions/delete/${id}`);
      setCollisions(
        collisions.filter((collision) => {
          return collision.collision_id !== id;
        })
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  async function openUpdateModal(id) {
    setUpdatingId(id);
    setUpdateCollisionModalIsOpen(true);
  }

  function closeUpdateModal() {
    setUpdateCollisionModalIsOpen(false);
  }

  return (
    <Fragment>
      <div className={`list-group ${classes.container}`}>
        <table className="table table-hover table-dark table-responsive rounded">
          <thead>
            <tr className="bg-info">
              <th className="align-middle" scope="col">
                Crash Date
              </th>
              <th className="align-middle" scope="col">
                Crash Time
              </th>
              <th className="align-middle" scope="col">
                Borough
              </th>
              <th className="align-middle" scope="col">
                Zip Code
              </th>
              <th className="align-middle" scope="col">
                Latitude
              </th>
              <th className="align-middle" scope="col">
                Longitude
              </th>
              <th className="align-middle" scope="col">
                On Street Name
              </th>
              <th className="align-middle" scope="col">
                Cross Street Name
              </th>
              <th className="align-middle" scope="col">
                Off Street Name
              </th>
              <th className="align-middle" scope="col">
                # of Persons Injured
              </th>
              <th className="align-middle" scope="col">
                # of Persons Killed
              </th>
              <th className="align-middle" scope="col">
                Contributing Factor Vehicle 1
              </th>
              <th className="align-middle" scope="col">
                Contributing Factor Vehicle 2
              </th>
              <th className="align-middle" scope="col">
                Contributing Factor Vehicle 3
              </th>
              <th className="align-middle" scope="col">
                Contributing Factor Vehicle 4
              </th>
              <th className="align-middle" scope="col">
                Contributing Factor Vehicle 5
              </th>
              <th className="align-middle" scope="col">
                Collision Id
              </th>
              <th className="align-middle" scope="col">
                Vehicle Type Code 1
              </th>
              <th className="align-middle" scope="col">
                Vehicle Type Code 2
              </th>
              <th className="align-middle" scope="col">
                Vehicle Type Code 3
              </th>
              <th className="align-middle" scope="col">
                Vehicle Type Code 4
              </th>
              <th className="align-middle" scope="col">
                Vehicle Type Code 5
              </th>
              {props.loginStatus && (
                <th className="align-middle" scope="col">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {collisions &&
              collisions.map((collisions) => {
                return (
                  <tr key={collisions.collision_id}>
                    <td className="align-middle">
                      {collisions.crash_date.substring(0, 10)}
                    </td>
                    <td className="align-middle">{collisions.crash_time}</td>
                    <td className="align-middle">{collisions.borough}</td>
                    <td className="align-middle">{collisions.zip_code}</td>
                    <td className="align-middle">{collisions.latitude}</td>
                    <td className="align-middle">{collisions.longitude}</td>
                    <td className="align-middle">
                      {collisions.on_street_name}
                    </td>
                    <td className="align-middle">
                      {collisions.cross_street_name}
                    </td>
                    <td className="align-middle">
                      {collisions.off_street_name}
                    </td>
                    <td className="align-middle">
                      {collisions.number_of_persons_injured}
                    </td>
                    <td className="align-middle">
                      {collisions.number_of_persons_killed}
                    </td>
                    <td className="align-middle">
                      {collisions.contributing_factor_vehicle_1}
                    </td>
                    <td className="align-middle">
                      {collisions.contributing_factor_vehicle_2}
                    </td>
                    <td className="align-middle">
                      {collisions.contributing_factor_vehicle_3}
                    </td>
                    <td className="align-middle">
                      {collisions.contributing_factor_vehicle_4}
                    </td>
                    <td className="align-middle">
                      {collisions.contributing_factor_vehicle_5}
                    </td>
                    <td className="align-middle">{collisions.collision_id}</td>
                    <td className="align-middle">
                      {collisions.vehicle_type_code_1}
                    </td>
                    <td className="align-middle">
                      {collisions.vehicle_type_code_2}
                    </td>
                    <td className="align-middle">
                      {collisions.vehicle_type_code_3}
                    </td>
                    <td className="align-middle">
                      {collisions.vehicle_type_code_4}
                    </td>
                    <td className="align-middle">
                      {collisions.vehicle_type_code_5}
                    </td>
                    {props.loginStatus && (
                      <td className="align-middle">
                        <button
                          onClick={() =>
                            openUpdateModal(collisions.collision_id)
                          }
                          className={`btn btn-light mt-1 mb-1`}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteHandler(collisions.collision_id)}
                          className={`btn btn-danger mt-1 mb-1`}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {updateCollisionModalIsOpen && (
        <Fragment>
          <UpdateCollisionModal
            closeBackdrop={closeUpdateModal}
          ></UpdateCollisionModal>
          <Backdrop onCancel={closeUpdateModal}></Backdrop>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CollisionRecords;
