import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { updateActivityList } from "../../../actions/activityActions";
import "../../../assets/desktop/explorer.css";

const Explorer = ({ activity, activityList, updateActivityList }) => {
  const [top, setTop] = useState("34px");
  const [left, setLeft] = useState("60px");
  const [height, setHeight] = useState("600px");
  const [width, setWidth] = useState("300px");

  const explorerRef = useRef(null);
  const elementToDrag = useRef(null);

  function dragElement() {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (explorerRef.current)
      explorerRef.current.addEventListener("mousedown", () => {
        dragMouseDown();
      });
    else
      elementToDrag.current.addEventListener("mousedown", () => {
        dragMouseDown();
      });
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      let elementHeight = elementToDrag.current.offsetHeight;
      let elementWidth = elementToDrag.current.offsetHeight;
      let elementTopOffset = elementToDrag.current.offsetTop;
      let elementLeftOffset = elementToDrag.current.offsetLeft;
      let topVal = elementTopOffset - pos2;
      let leftVal = elementLeftOffset - pos1;

      // Condition For Keeping Explorer in Window
      if (topVal < 34) topVal = 34;
      if (leftVal < 60) leftVal = 60;

      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      let bottomVal = windowHeight - (elementTopOffset + elementHeight);
      if (bottomVal < 0) topVal = windowHeight - elementHeight;

      let rightVal = windowWidth - (elementLeftOffset + elementWidth);
      if (rightVal < 0) leftVal = windowWidth - elementWidth;

      setTop(topVal + "px");
      setLeft(leftVal + "px");
    }
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  useEffect(() => {
    if (window.innerWidth > 800) {
      setWidth("500px");
      setHeight("500px");
    }
    dragElement();
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="explorer-container"
      style={{
        top: top,
        left: left,
        height: height,
        width: width,
      }}
      ref={elementToDrag}
    >
      <div className="explorer-header">
        <div className="explorer-header-heading" ref={explorerRef}>
          {activity.header}
        </div>
        <div className="explorer-header-btn-container">
          <div className="explorer-close-btn">-</div>
          <div className="explorer-close-btn">
            <svg height="16px" width="16px">
              <rect
                x="5px"
                y="5px"
                height="6px"
                width="6px"
                fill="#0000"
                strokeWidth="1.5px"
                stroke="#fff"
              ></rect>
            </svg>
          </div>
          <div className="explorer-close-btn explorer-close-color">&times;</div>
        </div>
      </div>
      <div className="explorer-body">Body</div>
      <div className="explorer-footer">Footer</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activityList,
});

export default connect(mapStateToProps, { updateActivityList })(Explorer);
