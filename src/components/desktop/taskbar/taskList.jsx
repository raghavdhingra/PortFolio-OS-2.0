import React, { useState } from "react";
import { connect } from "react-redux";
import { updateActivityList } from "../../../actions/activityActions";
import DialogBox from "../dialogBox/dialogBox";
import "../../../assets/desktop/taskList.css";

const TaskList = ({ updateActivityList, activityList }) => {
  const [activityName, setActivityName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const showDialog = (name, isOpen) => {
    setActivityName(name);
    setDialogOpen(isOpen);
  };

  const toggleActivity = () => {
    let activityLeft = activityList.filter((ac) => ac.name !== activityName);
    updateActivityList(activityLeft);
    setDialogOpen(false);
  };

  return (
    <>
      <DialogBox
        onSuccess={toggleActivity}
        onCancel={() => showDialog("", false)}
        isOpen={dialogOpen}
        successText={"End Task"}
        heading={activityName}
        body={"You are closing the task! Are you sure?"}
      />
      <div className="task-list-container">
        <div className="heading centralise">Tasks</div>
        {activityList.map((activity, index) =>
          activity.isLoading ? (
            <div
              className="task-listing-activity centralise"
              title={activity.name}
              key={`activity-${index}`}
            >
              <div className="task-list-inner-grid">
                <svg height="20px" width="20px" className="loader-rotate">
                  <circle className="loader-sm" />
                </svg>
                <div className="centralise">{activity.name} &nbsp;</div>
                <div
                  className="centralise cursor-pointer"
                  onClick={() => showDialog(activity.name, true)}
                >
                  &times;
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  activityList: state.activityReducers.activityList,
});

export default connect(mapStateToProps, { updateActivityList })(TaskList);
