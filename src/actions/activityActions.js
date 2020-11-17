import * as actions from "./types";

export const updateActivityList = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: actions.ACTIVITY_STATUS,
      payload: {
        activityList: payload,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
