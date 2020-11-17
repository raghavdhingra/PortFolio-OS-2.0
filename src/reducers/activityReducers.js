import * as actions from "../actions/types";

const initialState = {
  activityList: [
    {
      name: "Activity 1",
      isLoading: true,
      date: new Date(),
      isExplorerOpened: false,
      isMinimised: false,
      child: null,
      header: "Head 1",
      footer: "",
    },
    {
      name: "Activity 2",
      isLoading: true,
      date: new Date(),
      isExplorerOpened: false,
      isMinimised: false,
      child: null,
      header: "Head 2",
      footer: "",
    },
  ],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ACTIVITY_STATUS: {
      let { activityList } = payload;
      return { ...state, activityList };
    }
    default:
      return state;
  }
}
