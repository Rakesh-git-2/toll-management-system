import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ReactDom from "react-dom";

function Modal({ setActive, child }) {
  return ReactDom.createPortal(
    <div className="modalContainer">
      <div className="modal">
        <FontAwesomeIcon
          onClick={() =>
            setActive((s) => {
              return { ...s, status: "CLOSED", added: false };
            })
          }
          className="close"
          icon={faClose}
        />
        {child}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
