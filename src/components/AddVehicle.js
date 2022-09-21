import Dropdown from "./Dropdown";
import "./AddVehicle.css";
import CtaButton from "./CTAbutton";
import { useEffect, useState } from "react";

const AddVehicleEntry = ({
  vehicleStatus,
  setVehicleStatus,
  refresh,
  setRefresh,
}) => {
  const [entries, setEntries] = useState({});
  const [toll, setToll] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [error, setError] = useState("");
  const date = new Date();
  useEffect(
    () =>
      setEntries({
        ...entries,
        vehicleType,
        toll,
        date: date.toLocaleString(),
      }),
    [toll, vehicleType]
  );
  let tollList = [];
  if (localStorage.getItem("toll")) {
    tollList = [...JSON.parse(localStorage.getItem("toll")).map((x) => x.name)];
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    setEntries({ ...entries, toll, vehicleType, date: date.getTime() });
    if (
      Object.values(entries).filter((x) => x && x !== "Select an option")
        .length == 5
    ) {
      if (localStorage.getItem("vehicle")) {
        const vehicles = JSON.parse(localStorage.getItem("vehicle"));
        vehicles.push(entries);
        localStorage.setItem("vehicle", JSON.stringify(vehicles));
      } else {
        const vehicles = [entries];
        localStorage.setItem("vehicle", JSON.stringify(vehicles));
      }
      setVehicleStatus((s) => {
        return { ...s, added: true };
      });
      setRefresh(!refresh);
    } else {
      setError("One or more fields are empty");
    }
  };
  if (vehicleStatus.added) {
    return (
      <div
        style={{
          top: "50%",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "18px",
          color: "green",
          background: "#a2f2aa",
          padding: "20px",
        }}
      >
        Vehicle entry added Successfully!
      </div>
    );
  }
  if (!tollList.length) {
    return (
      <div
        className="center"
        style={{
          top: "50%",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "18px",
          background: "#dce0e0",
          padding: "20px",
        }}
      >
        <p style={{ marginTop: "0" }}>No Tolls found </p>Please add toll
        information and comeback!
      </div>
    );
  }
  return (
    <div>
      <h3 className="center">Add a new entry</h3>
      <form>
        <label>select toll name*</label>
        <Dropdown options={tollList} cb={setToll} />
        <label>select vehicle type*</label>
        <Dropdown
          cb={setVehicleType}
          options={["Car/Jeep/Van", "LCV", "Bus/Truck", "Heavy vehicles"]}
        />
        <label>Vehicle number*</label>
        <input
          type="text"
          onChange={(e) =>
            setEntries({ ...entries, vehicleNumber: e.target.value })
          }
        ></input>
        <label>Tariff*</label>
        <input
          onChange={(e) => setEntries({ ...entries, tariff: e.target.value })}
          type="number"
        ></input>
        {
          <div className="error" style={{ paddingTop: "10px" }}>
            {error}
          </div>
        }
        <div className="center buttonHolder">
          <CtaButton
            text={"Add Entry"}
            style={{ width: "100%", height: "40px" }}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddVehicleEntry;
