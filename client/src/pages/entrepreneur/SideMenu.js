import {
  faDashboard,
  faBell,
  faUser,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
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
          <details>
            <summary
              style={{ textDecoration: "none", color: "gray", lineHeight: 2 }}
            >
              <FontAwesomeIcon icon={faBell} />
              &nbsp;&nbsp; Notifications
            </summary>
            <ul style={{ listStyleType: "none", paddingLeft: 20 }}>
              <li>
                <Link
                  to={"/entrepreneurship/notifications"}
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
                  &nbsp;&nbsp; Product Requests
                </Link>
              </li>
              <li>
                <Link
                  to={"/entrepreneurship/messages"}
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
                  &nbsp;&nbsp; Discussions
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
