import "../App.css";
import Card from "./Card";
import React, { useRef, Fragment, useState, useContext } from "react";
import axios from "../apis/axios";
import classes from "./AddCollisionModal.module.css";
import { CollisionsContext } from "../context/CollisionsContext";

function AddCollisionModal(props) {
  const { addCollisions } = useContext(CollisionsContext);
  const crash_date_input_ref = useRef();
  const crash_time_input_ref = useRef();
  // const borough_input_ref = useRef();
  const [borough, setBorough] = useState("");
  const zip_code_input_ref = useRef();
  const latitude_input_ref = useRef();
  const longitude_input_ref = useRef();
  const on_street_name_input_ref = useRef();
  const cross_street_name_input_ref = useRef();
  const off_street_name_input_ref = useRef();
  const number_of_persons_injured_input_ref = useRef();
  const number_of_persons_killed_input_ref = useRef();
  const contributing_factor_vehicle_1_input_ref = useRef();
  const contributing_factor_vehicle_2_input_ref = useRef();
  const contributing_factor_vehicle_3_input_ref = useRef();
  const contributing_factor_vehicle_4_input_ref = useRef();
  const contributing_factor_vehicle_5_input_ref = useRef();
  const vehicle_type_code_1_input_ref = useRef();
  const vehicle_type_code_2_input_ref = useRef();
  const vehicle_type_code_3_input_ref = useRef();
  const vehicle_type_code_4_input_ref = useRef();
  const vehicle_type_code_5_input_ref = useRef();

  const addCollision = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/addCollision", {
        crash_date: crash_date_input_ref.current.value,
        crash_time: crash_time_input_ref.current.value,
        borough: borough,
        zip_code: zip_code_input_ref.current.value,
        latitude: latitude_input_ref.current.value,
        longitude: longitude_input_ref.current.value,
        on_street_name: on_street_name_input_ref.current.value,
        cross_street_name: cross_street_name_input_ref.current.value,
        off_street_name: off_street_name_input_ref.current.value,
        number_of_persons_injured:
          number_of_persons_injured_input_ref.current.value,
        number_of_persons_killed:
          number_of_persons_killed_input_ref.current.value,
        contributing_factor_vehicle_1:
          contributing_factor_vehicle_1_input_ref.current.value,
        contributing_factor_vehicle_2:
          contributing_factor_vehicle_2_input_ref.current.value,
        contributing_factor_vehicle_3:
          contributing_factor_vehicle_3_input_ref.current.value,
        contributing_factor_vehicle_4:
          contributing_factor_vehicle_4_input_ref.current.value,
        contributing_factor_vehicle_5:
          contributing_factor_vehicle_5_input_ref.current.value,
        vehicle_type_code_1: vehicle_type_code_1_input_ref.current.value,
        vehicle_type_code_2: vehicle_type_code_2_input_ref.current.value,
        vehicle_type_code_3: vehicle_type_code_3_input_ref.current.value,
        vehicle_type_code_4: vehicle_type_code_4_input_ref.current.value,
        vehicle_type_code_5: vehicle_type_code_5_input_ref.current.value,
      });
      console.log(response);
      addCollisions(response.data[0]);
      props.closeBackdrop();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <form className={`form ${classes.scrollable}`} onSubmit={addCollision}>
        <div className="control">
          <label htmlFor="crash_date">Crash Date</label>
          <input
            type="date"
            required
            id="crash_date"
            min="1900-01-01"
            max="2999-12-31"
            ref={crash_date_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="crash_time">Crash Time</label>
          <input
            type="time"
            required
            id="crash_time"
            ref={crash_time_input_ref}
          />
        </div>
        <div className="control">
          <select
            value={borough}
            required
            onChange={(e) => setBorough(e.target.value)}
            className="custom-select my-1 mr-sm-2"
          >
            <option value="" disabled>
              BOROUGH
            </option>
            <option value="BROOKLYN">BROOKLYN</option>
            <option value="MANHATTAN">MANHATTAN</option>
            <option value="BRONX">BRONX</option>
            <option value="QUEENS">QUEENS</option>
            <option value="STATEN ISLAND">STATEN ISLAND</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="zip_code">Zip Code</label>
          <input
            type="number"
            required
            id="zip_code"
            min="10001"
            max="14975"
            ref={zip_code_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            required
            min="40"
            max="40.999999"
            step="0.000001"
            id="latitude"
            ref={latitude_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            required
            min="-74.999999"
            max="-73"
            step="0.000001"
            id="longitude"
            ref={longitude_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="on_street_name">On Street Name</label>
          <input
            type="text"
            id="on_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={on_street_name_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="cross_street_name">Cross Street Name</label>
          <input
            type="text"
            id="cross_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={cross_street_name_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="off_street_name">Off Street Name</label>
          <input
            type="text"
            id="off_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={off_street_name_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="number_of_persons_injured">
            Number of Persons Injured
          </label>
          <input
            type="number"
            min="0"
            required
            id="number_of_persons_injured"
            ref={number_of_persons_injured_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="number_of_persons_killed">
            Number of Persons Killed
          </label>
          <input
            type="number"
            min="0"
            required
            id="number_of_persons_killed"
            ref={number_of_persons_killed_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="contributing_factor_vehicle_1">
            Contributing Factor Vehicle 1
          </label>
          <input
            type="text"
            id="contributing_factor_vehicle_1"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={contributing_factor_vehicle_1_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="contributing_factor_vehicle_2">
            Contributing Factor Vehicle 2
          </label>
          <input
            type="text"
            id="contributing_factor_vehicle_2"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={contributing_factor_vehicle_2_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="contributing_factor_vehicle_3">
            Contributing Factor Vehicle 3
          </label>
          <input
            type="text"
            id="contributing_factor_vehicle_3"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={contributing_factor_vehicle_3_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="contributing_factor_vehicle_4">
            Contributing Factor Vehicle 4
          </label>
          <input
            type="text"
            id="contributing_factor_vehicle_4"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={contributing_factor_vehicle_4_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="contributing_factor_vehicle_5">
            Contributing Factor Vehicle 5
          </label>
          <input
            type="text"
            id="contributing_factor_vehicle_5"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={contributing_factor_vehicle_5_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_1">Vehicle type Code 1</label>
          <input
            type="text"
            id="vehicle_type_code_1"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={vehicle_type_code_1_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_2">Vehicle type Code 2</label>
          <input
            type="text"
            id="vehicle_type_code_2"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={vehicle_type_code_2_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_3">Vehicle type Code 3</label>
          <input
            type="text"
            id="vehicle_type_code_3"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={vehicle_type_code_3_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_4">Vehicle type Code 4</label>
          <input
            type="text"
            id="vehicle_type_code_4"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={vehicle_type_code_4_input_ref}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_5">Vehicle type Code 5</label>
          <input
            type="text"
            id="vehicle_type_code_5"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            ref={vehicle_type_code_5_input_ref}
          />
        </div>
        <div className="actions">
          <Fragment>
            <div className="col align-self-center">
              <button>Add Collision</button>
            </div>
          </Fragment>
        </div>
      </form>
    </Card>
  );
}

export default AddCollisionModal;
