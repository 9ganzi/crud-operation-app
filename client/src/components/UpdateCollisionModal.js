import "../App.css";
import Card from "./Card";
import React, { useRef, useState, useContext } from "react";
import axios from "../apis/axios";
import classes from "./AddCollisionModal.module.css";
import { CollisionsContext } from "../context/CollisionsContext";

function UpdateCollisionModal(props) {
  const { updatingId } = useContext(CollisionsContext);
  const { collisions } = useContext(CollisionsContext);
  const { updateCollision } = useContext(CollisionsContext);
  const { updatingIndex } = useContext(CollisionsContext);
  const [crashDate, setCrashDate] = useState(
    collisions[updatingIndex].crash_date.substring(0, 10)
  );
  const [crashTime, setCrashTime] = useState(
    collisions[updatingIndex].crash_time
  );
  const [borough, setBorough] = useState(collisions[updatingIndex].borough);
  const [zipCode, setZipCode] = useState(collisions[updatingIndex].zip_code);
  const [latitude, setLatitude] = useState(collisions[updatingIndex].latitude);
  const [longitude, setLongitude] = useState(
    collisions[updatingIndex].longitude
  );
  const [onStreetName, setOnStreetName] = useState(
    collisions[updatingIndex].on_street_name
  );
  const [crossStreetName, setCrossStreetName] = useState(
    collisions[updatingIndex].cross_street_name
  );
  const [offStreetName, setOffStreetName] = useState(
    collisions[updatingIndex].off_street_name
  );
  const [numberOfPersonsInjured, setNumberOfPersonsInjured] = useState(
    collisions[updatingIndex].number_of_persons_injured
  );
  const [numberOfPersonsKilled, setNumberOfPersonsKilled] = useState(
    collisions[updatingIndex].number_of_persons_killed
  );
  const [contributingFactorVehicle1, setContributingFactorVehicle1] = useState(
    collisions[updatingIndex].contributing_factor_vehicle_1
  );
  const [contributingFactorVehicle2, setContributingFactorVehicle2] = useState(
    collisions[updatingIndex].contributing_factor_vehicle_2
  );
  const [contributingFactorVehicle3, setContributingFactorVehicle3] = useState(
    collisions[updatingIndex].contributing_factor_vehicle_3
  );
  const [contributingFactorVehicle4, setContributingFactorVehicle4] = useState(
    collisions[updatingIndex].contributing_factor_vehicle_4
  );
  const [contributingFactorVehicle5, setContributingFactorVehicle5] = useState(
    collisions[updatingIndex].contributing_factor_vehicle_5
  );
  const [vehicleTypeCode1, setVehicleTypeCode1] = useState(
    collisions[updatingIndex].vehicle_type_code_1
  );
  const [vehicleTypeCode2, setVehicleTypeCode2] = useState(
    collisions[updatingIndex].vehicle_type_code_2
  );
  const [vehicleTypeCode3, setVehicleTypeCode3] = useState(
    collisions[updatingIndex].vehicle_type_code_3
  );
  const [vehicleTypeCode4, setVehicleTypeCode4] = useState(
    collisions[updatingIndex].vehicle_type_code_4
  );
  const [vehicleTypeCode5, setVehicleTypeCode5] = useState(
    collisions[updatingIndex].vehicle_type_code_5
  );

  const update = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/v1/collisions/updateCollision", {
        crash_date: crashDate,
        crash_time: crashTime,
        borough: borough,
        zip_code: zipCode,
        latitude: latitude,
        longitude: longitude,
        on_street_name: onStreetName,
        cross_street_name: crossStreetName,
        off_street_name: offStreetName,
        number_of_persons_injured: numberOfPersonsInjured,
        number_of_persons_killed: numberOfPersonsKilled,
        contributing_factor_vehicle_1: contributingFactorVehicle1,
        contributing_factor_vehicle_2: contributingFactorVehicle2,
        contributing_factor_vehicle_3: contributingFactorVehicle3,
        contributing_factor_vehicle_4: contributingFactorVehicle4,
        contributing_factor_vehicle_5: contributingFactorVehicle5,
        vehicle_type_code_1: vehicleTypeCode1,
        vehicle_type_code_2: vehicleTypeCode2,
        vehicle_type_code_3: vehicleTypeCode3,
        vehicle_type_code_4: vehicleTypeCode4,
        vehicle_type_code_5: vehicleTypeCode5,
        updating_id: updatingId,
      });
      console.log(response.data[0]);
      updateCollision(response.data[0]);
      props.closeBackdrop();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card>
      <form className={`form ${classes.scrollable}`} onSubmit={update}>
        <div className="control">
          <label htmlFor="crash_date">Crash Date</label>
          <input
            type="date"
            required
            id="crash_date"
            min="1900-01-01"
            max="2999-12-31"
            value={crashDate}
            onChange={(e) => setCrashDate(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="crash_time">Crash Time</label>
          <input
            type="time"
            required
            id="crash_time"
            value={crashTime}
            onChange={(e) => setCrashTime(e.target.value)}
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
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
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
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
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
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="on_street_name">On Street Name</label>
          <input
            type="text"
            id="on_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={onStreetName}
            onChange={(e) => setOnStreetName(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="cross_street_name">Cross Street Name</label>
          <input
            type="text"
            id="cross_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={crossStreetName}
            onChange={(e) => setCrossStreetName(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="off_street_name">Off Street Name</label>
          <input
            type="text"
            id="off_street_name"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={offStreetName}
            onChange={(e) => setOffStreetName(e.target.value)}
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
            value={numberOfPersonsInjured}
            onChange={(e) => setNumberOfPersonsInjured(e.target.value)}
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
            value={numberOfPersonsKilled}
            onChange={(e) => setNumberOfPersonsKilled(e.target.value)}
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
            value={contributingFactorVehicle1}
            onChange={(e) => setContributingFactorVehicle1(e.target.value)}
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
            value={contributingFactorVehicle2}
            onChange={(e) => setContributingFactorVehicle2(e.target.value)}
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
            value={contributingFactorVehicle3}
            onChange={(e) => setContributingFactorVehicle3(e.target.value)}
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
            value={contributingFactorVehicle4}
            onChange={(e) => setContributingFactorVehicle4(e.target.value)}
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
            value={contributingFactorVehicle5}
            onChange={(e) => setContributingFactorVehicle5(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_1">Vehicle type Code 1</label>
          <input
            type="text"
            id="vehicle_type_code_1"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={vehicleTypeCode1}
            onChange={(e) => setVehicleTypeCode1(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_2">Vehicle type Code 2</label>
          <input
            type="text"
            id="vehicle_type_code_2"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={vehicleTypeCode2}
            onChange={(e) => setVehicleTypeCode2(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_3">Vehicle type Code 3</label>
          <input
            type="text"
            id="vehicle_type_code_3"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={vehicleTypeCode3}
            onChange={(e) => setVehicleTypeCode3(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_4">Vehicle type Code 4</label>
          <input
            type="text"
            id="vehicle_type_code_4"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={vehicleTypeCode4}
            onChange={(e) => setVehicleTypeCode4(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="vehicle_type_code_5">Vehicle type Code 5</label>
          <input
            type="text"
            id="vehicle_type_code_5"
            pattern="/^$/|^([0-9\s]*[a-zA-Z]){5,}[0-9\s]*$"
            title="Please include at least 5 characters without a special character."
            value={vehicleTypeCode5}
            onChange={(e) => setVehicleTypeCode5(e.target.value)}
          />
        </div>
        <div className="actions">
          <div className="col align-self-center">
            <button>Update Collision</button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default UpdateCollisionModal;
