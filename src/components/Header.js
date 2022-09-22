import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <Link className="link" to="/Home">
        <div style={{ width: "260px" }}>
          <h3>Toll Management Application</h3>
        </div>
      </Link>
    </div>
  );
}

export default Header;
