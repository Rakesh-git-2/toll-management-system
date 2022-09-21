import React, { useEffect, useState } from "react";
import CtaButton from "../components/CTAbutton";
import { Link } from "react-router-dom";
import DisplayTable from "../components/Table";
import Modal from "../components/Modal";
import AddVehicleEntry from "../components/AddVehicle";
import AddTollEntry from "../components/AddToll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCheck } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [tolls, setTolls] = useState([]);
  const [selectedTolls, setSelectedTolls] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("toll")) {
      setTolls(JSON.parse(localStorage.getItem("toll")).map((x) => x.name));
    }
    if (localStorage.getItem("vehicle")) {
      setRecords(
        JSON.parse(localStorage.getItem("vehicle")).map((x) => {
          return {
            vehicleType: x.vehicleType,
            vehicleNumber: x.vehicleNumber,
            date: new Date(x.date).toLocaleString(),
            toll: x.toll,
            tariff: x.tariff,
          };
        })
      );
    }
  }, [refresh]);

  const tableData = {
    heading: [
      "VEHICLE TYPE",
      "VEHICLE NUMBER",
      "DATE/TIME",
      "TOLL NAME",
      "TARIFF",
    ],
    records: records
      .filter((x) =>
        x.vehicleNumber.toLowerCase().includes(search.toLowerCase())
      )
      .filter((y) =>
        selectedTolls.length ? selectedTolls.includes(y.toll) : true
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

  const [isFilteron, setFilterOn] = useState(false);

  return (
    <div className="blur" style={{ margin: "20px 20px" }}>
      <div className="flex between">
        <div className="flex between">
          <h3>Toll entries/Vehicle entries</h3>
          <div style={{ marginLeft: "40px" }} className="flex between">
            <FontAwesomeIcon
              onClick={() => setFilterOn(!isFilteron)}
              icon={faFilter}
              color={selectedTolls.length ? "#2e7ec9" : "#dce0e0"}
              size="xl"
              style={{ cursor: "pointer" }}
            />
            {isFilteron && (
              <div className="filterBox">
                {tolls.map((x) => (
                  <div
                    onClick={() =>
                      setSelectedTolls((selectedTolls) => {
                        if (selectedTolls.includes(x)) {
                          return selectedTolls.filter((item) => item != x);
                        } else return [...selectedTolls, x];
                      })
                    }
                    className="tollBox"
                  >
                    {x}
                    {selectedTolls.includes(x) && (
                      <FontAwesomeIcon
                        color="#2e7ec9"
                        style={{ position: "absolute", right: "20px" }}
                        icon={faCheck}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <input
              className="search"
              placeholder={`search a vehicle`}
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
          </div>
        </div>
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
          <Link to={"/list"}>
            <CtaButton text="View all tolls" style={{}} />
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

export default Home;
