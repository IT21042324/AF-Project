import {
  faDashboard,
  faBell,
  faUser,
  faPlus,
  faEdit,
  faTrash,
  faGift,
  faBox,
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
            to={"/admin/products"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faBox} />
            &nbsp;&nbsp; Products
          </Link>
        </div>

        <div className="li">
          <details>
            <summary
              style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
            >
              <FontAwesomeIcon icon={faBell} />
              &nbsp;&nbsp; Request Notifications
            </summary>
            <ul style={{ listStyleType: "none", paddingLeft: 20 }}>
              <li>
                <Link
                  to={"/admin/userRequest"}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    lineHeight: 2,
                    display: "block",
                    padding: "0.5em 1em",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#eee")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                >
                  <FontAwesomeIcon icon={faUser} />
                  &nbsp;&nbsp; User Requests
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/productRequest"}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    lineHeight: 2,
                    display: "block",
                    padding: "0.5em 1em",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#eee")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                >
                  <FontAwesomeIcon icon={faGift} />
                  &nbsp;&nbsp; Product Requests
                </Link>
              </li>
            </ul>
          </details>
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

        <div className="li">
          <Link
            to={"/PlaceRoutesAdmin/adminPlace"}
            style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
          >
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp; Tourist Places
          </Link>
        </div>
      </div>
    </section>
  );
}
