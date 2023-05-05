import { faDashboard, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function SideMenu(props) {
  return (
    <section
      className="sideList"
      style={{ float: "left", textAlign: "initial" }}
    >
      <div className="logo">
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: 50,
            paddingTop: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Heavenly
        </Link>
      </div>
      <div className="items">
        <div className="li">
          <Link
            to={"/entrepreneurship"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faDashboard} />
            &nbsp;&nbsp; Dashboard
          </Link>
        </div>

        <div className="li">
          <Link
            to={"/entrepreneurship/profile"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp; Profile
          </Link>
        </div>

        <div className="li">
          <Link
            to={"/entrepreneurship/notifications"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faBell} />
            &nbsp;&nbsp; Notifications
          </Link>
        </div>
      </div>
    </section>
  );
}
