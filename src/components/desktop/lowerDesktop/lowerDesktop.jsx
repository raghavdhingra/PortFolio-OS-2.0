import React from "react";
import { connect } from "react-redux";
import { dropDownToggle } from "../../../actions/desktopActions";
import NavItem from "./navItem";
import DesktopWorkingArea from "../desktopWorkingArea/desktopWorkingArea";
import TERMINAL from "../../../assets/icons/terminal.png";
import BROWSER from "../../../assets/icons/browser.svg";
import SETTING from "../../../assets/icons/setting.svg";
import CAMERA from "../../../assets/icons/camera.png";
import "../../../assets/desktop/lowerDesktop.css";

const LowerDesktop = ({ dropDownOpen, dropDownToggle }) => {
  const closeDropDown = () => (dropDownOpen ? dropDownToggle(false) : null);

  const navList = [
    { name: "Terminal", image: TERMINAL, width: "40px", click: () => null },
    { name: "Browser", image: BROWSER, width: "50px", click: () => null },
    { name: "Camera", image: CAMERA, width: "40px", click: () => null },
    { name: "Settings", image: SETTING, width: "50px", click: () => null },
  ];
  return (
    <div className="lower-desktop-grid" onClick={closeDropDown}>
      <div className="left-navigation-bar">
        <div>
          {navList.map((nav, index) => (
            <NavItem key={`nav-list-${index}`} clickTask={nav.click}>
              <img
                src={nav.image}
                className="nav-item-image"
                width={nav.width}
                alt={nav.name}
              />
            </NavItem>
          ))}
        </div>
        <div>
          <NavItem>
            <svg height="50px" width="50px" className="start-icon-container">
              <circle cx="25px" cy="25px" className="start-icon-svg" />
            </svg>
          </NavItem>
        </div>
      </div>
      <DesktopWorkingArea />
    </div>
  );
};

const mapStateToProps = (state) => ({
  dropDownOpen: state.desktopReducers.dropDownOpen,
});
export default connect(mapStateToProps, { dropDownToggle })(LowerDesktop);
