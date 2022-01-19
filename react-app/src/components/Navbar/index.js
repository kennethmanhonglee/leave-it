import { NavLink, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";

const NavBar = () => {
  // below block is to allow different navbar styling on splash page and other pages
  const { pathname } = useLocation();
  let navbar_background =
    pathname === "/"
      ? null
      : {
          backgroundColor: "rgb(255, 140, 29)",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
        };
  return (
    <nav className={styles.nav} style={navbar_background}>
      <ul>
        <div className={styles.home_links}>
          <li>
            <NavLink to="/home" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" exact={true} activeClassName="active">
              About
            </NavLink>
          </li>
        </div>
        <div className={styles.login_buttons}>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
