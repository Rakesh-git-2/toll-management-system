import React, { useEffect, useState } from "react";
import CtaButton from "../components/CTAbutton";
import { Link } from "react-router-dom";
import DisplayTable from "../components/Table";
import Modal from "../components/Modal";
import AddVehicleEntry from "../components/AddVehicle";
import AddTollEntry from "../components/AddToll";

const List = () => {
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("toll")) {
      setRecords(
        JSON.parse(localStorage.getItem("toll")).map((x) => {
          return {
            name: x.name,
            car: x.l1s + "/" + x.l1r,
            lcv: x.l2s + "/" + x.l2r,
            truck: x.l3s + "/" + x.l3r,
            heavy: x.l4s + "/" + x.l4r,
          };
        })
      );
    }
  }, [refresh]);

  const tableData = {
    heading: ["TOLL NAME", "CAR/JEEP/VAN", "LCV", "TRUCK/BUS", "HEAVY VEHICLE"],
    records: records.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const [tollStatus, setTollStatus] = useState({
    status: "CLOSED",
    added: false,
  });

  const [vehicleStatus, setVehicleStatus] = useState({
    status: "CLOSED",
    added: false,
  });

  return (
    <div className="blur" style={{ margin: "20px 20px" }}>
      <div className="flex between">
        <h3>Tollgate list</h3>
        <input
          className="search"
          placeholder={`search a toll`}
          type="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <div className="flex between" style={{ minWidth: "500px" }}>
          <CtaButton
            text="Add vehicle entry"
            style={{}}
            onClick={() =>
              setVehicleStatus({ ...tollStatus, status: "ACTIVE" })
            }
          />
          <CtaButton
            text="Add new tolls"
            onClick={() => setTollStatus({ ...tollStatus, status: "ACTIVE" })}
            style={{}}
          />
          <Link to={"/"}>
            <CtaButton text="Back to vehicle logs" style={{}} />
          </Link>
        </div>
      </div>
      <DisplayTable data={tableData} />
      {tollStatus.status === "ACTIVE" && (
        <Modal
          setActive={setTollStatus}
          child={
            <AddTollEntry
              tollModalStatus={tollStatus}
              setTollModalStatus={setTollStatus}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
      )}

      {vehicleStatus.status == "ACTIVE" && (
        <Modal
          setActive={setVehicleStatus}
          child={
            <AddVehicleEntry
              vehicleStatus={vehicleStatus}
              setVehicleStatus={setVehicleStatus}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
      )}
    </div>
  );
};

export default List;
