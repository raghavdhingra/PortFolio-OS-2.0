import React from "react";
import DropDownCaret from "../../../assets/icons/dropdown.svg";
import Brightness from "../../../assets/icons/brightness.svg";
import { changeBrightness } from "../../../actions/desktopActions";
import { connect } from "react-redux";
import "../../../assets/desktop/dropdown.css";

const DropDown = ({
  isOnline,
  networkType,
  battery,
  changeBrightness,
  brightness,
}) => {
  return (
    <div className="drop-down-container">
      <div className="drop-drop-caret-pointed-container">
        <img
          src={DropDownCaret}
          className="drop-drop-caret-pointed"
          width="20px"
          alt="drop down"
        />
      </div>
      <div className="drop-down-inner-container">
        <div className="drop-down-items no-cursor">
          <div className="drop-down-grid">
            <img src={Brightness} alt="brightness" width="17px" />
            <div className="centralise">
              <input
                type="range"
                min="40"
                max="100"
                className="brightness-scroll-line"
                value={brightness * 100}
                onChange={(e) => changeBrightness(e.target.value / 100)}
              ></input>
            </div>
          </div>
        </div>
        <div className="dropdown-hr"></div>
        <div className="drop-down-items">
          <div
            className="network-dot"
            style={{ backgroundColor: `${isOnline ? "green" : "red"}` }}
          ></div>
          {isOnline ? `Connected (${networkType})` : "Not Connected"}
        </div>
        <div className="drop-down-items">
          <div
            className="network-dot"
            style={{ backgroundColor: `${battery.charging ? "green" : "red"}` }}
          ></div>
          Battery: {parseInt(battery.level * 100)}% (
          {battery.charging ? "Charging" : "Not charging"})
        </div>
        <div className="dropdown-hr"></div>
        <div className="drop-down-items">Log out</div>
        <div className="drop-down-items">Power off</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brightness: state.desktopReducers.brightness,
  battery: state.desktopReducers.battery,
  isOnline: state.desktopReducers.isOnline,
  networkType: state.desktopReducers.networkType,
});

export default connect(mapStateToProps, { changeBrightness })(DropDown);
