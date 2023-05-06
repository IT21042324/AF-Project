import {
  faDashboard,
  faBell,
  faUser,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function AdminSideMenu(props) {
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
            to={"/admin"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faDashboard} />
            &nbsp;&nbsp; Dashboard
          </Link>
        </div>

        <div className="li">
          <Link
            to={"/admin/productRequest"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp; Product Requests
          </Link>
        </div>
        <div className="li">
          <Link
            to={"/admin/addEvent"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;&nbsp; Add an event
          </Link>
        </div>
        <div className="li">
          <Link
            to={"/admin/editEvent"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            {" "}
            <FontAwesomeIcon icon={faEdit} /> &nbsp;&nbsp;
            <FontAwesomeIcon icon={faTrash} />
            &nbsp;&nbsp; Edit/Delete event
          </Link>
        </div>
      </div>
    </section>
  );
}
