import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";


const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Message", icon: "chat", path: "/message" }
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)} header-nav`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons"
                style={{color:"#00f3ed"}}>{link.icon}</span>
            </Link>
          </li>
        ))}


        <li className="nav-item dropdown" style={{opacity:1 , cursor:'pointer'}}>
          <span
            className="nav-link position-relative" href="/#" id="navbarDropdown"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <span className="material-icons"
            style={{color:notify.data.length > 0 ? '#00f3ed' : '#808080B3' }}>
              notifications
            </span>
            <span className="notify_length">{notify.data.length === 0 ? '' : notify.data.length}</span>

          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NotifyModal />
          </div>

        </li>



        <li className="nav-item dropdown" style={{opacity:1}}>
          <span
            className="nav-link dropdown-toggle"
            href="/#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} 
              size="medium-avatar" 
              style={{marginRight:'10px'}}
            />
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>
            <Link className="dropdown-item" to={`/settings`}>
              Settings
            </Link>
            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Light Mode" : "Dark Mode"}
            </label>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/" onClick={handleClick}>
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
