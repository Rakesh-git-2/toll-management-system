import Dropdown from "./Dropdown";
import "./AddVehicle.css";
import CtaButton from "./CTAbutton";
import { useContext, useState } from "react";

const AddTollEntry = ({
  tollModalStatus,
  setTollModalStatus,
  setRefresh,
  refresh,
}) => {
  const [tollDetails, setTollDetails] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(tollDetails).filter((x) => x.length == 0).length > 0 ||
      Object.values(tollDetails).length < 9
    ) {
      setError("One or more fields are empty");
    } else {
      if (localStorage.getItem("toll")) {
        const tolls = JSON.parse(localStorage.getItem("toll"));
        tolls.push(tollDetails);
        localStorage.setItem("toll", JSON.stringify(tolls));
      } else {
        const tolls = [tollDetails];
        localStorage.setItem("toll", JSON.stringify(tolls));
      }
      setRefresh(!refresh);
      setTollModalStatus((s) => {
        return { ...s, added: true };
      });
    }
  };
  if (tollModalStatus.added) {
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
        Toll added Successfully!
      </div>
    );
  }
  return (
    <div>
      <h3 className="center">Add new toll</h3>
      <form>
        <label>Enter toll name*</label>
        <input
          type="text"
          onChange={(e) =>
            setTollDetails((s) => ({ ...tollDetails, name: e.target.value }))
          }
        ></input>
        <label>Vehicle Fare details*</label>
        <div className="flex between top-spaced">
          <div style={{ width: "30%" }}>Car/Jeep/Van</div>
          <input
            style={{ width: "30%" }}
            placeholder="single journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l1s: e.target.value,
              })
            }
          ></input>
          <input
            style={{ width: "30%" }}
            placeholder="return journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l1r: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="flex between top-spaced">
          <div style={{ width: "30%" }}>LCV</div>
          <input
            style={{ width: "30%" }}
            placeholder="single journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l2s: e.target.value,
              })
            }
          ></input>
          <input
            style={{ width: "30%" }}
            placeholder="return journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l2r: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="flex between top-spaced">
          <div style={{ width: "30%" }}>Truck/Bus</div>
          <input
            style={{ width: "30%" }}
            placeholder="single journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l3s: e.target.value,
              })
            }
          ></input>
          <input
            style={{ width: "30%" }}
            placeholder="return journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l3r: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="flex between top-spaced">
          <div style={{ width: "30%" }}>Heavy Vehicle</div>
          <input
            style={{ width: "30%" }}
            placeholder="single journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l4s: e.target.value,
              })
            }
          ></input>
          <input
            style={{ width: "30%" }}
            placeholder="return journey"
            type="text"
            onChange={(e) =>
              setTollDetails({
                ...tollDetails,
                l4r: e.target.value,
              })
            }
          ></input>
        </div>
        {
          <div className="error" style={{ paddingTop: "10px" }}>
            {error}
          </div>
        }
        <div className="center buttonHolder">
          <CtaButton
            text={"Add Details"}
            style={{ width: "100%", height: "40px" }}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddTollEntry;
