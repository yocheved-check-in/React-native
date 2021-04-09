import React, { Component } from "react";
import { createStore } from "redux";

const initState = {
  roomServiceData: [],

  roomServiceCart: [],

  roomServiceCount: 0,

  spaData: [],

  spaCart: [],

  spaCount: 0,

  itemScreenOption: {},

  houseKeepingData: [],

  houseKeepingCart: [],

  spaList: [],

  chatMessagesList: [],

  user: [],
};

const reducer = (state = initState, action: { type: any, payload: any }) => {
  switch (action.type) {
    
    case "INIT_USER":
      return { ...state, user: action.payload };

    case "INIT_ROOM_DATA":
      return { ...state, roomServiceData: action.payload };

    case "INIT_SPA_DATA":
      return { ...state, spaData: action.payload };

    case "INIT_HOUSE_DATA":
      return { ...state, houseKeepingData: action.payload };

    case "ADD_TO_ROOM_CART":
      return { ...state, roomServiceCart: action.payload };

    case "DELETE_ROOM_CART":
      return { ...state, roomServiceCart: [], roomServiceCount: 0 };

    case "ADD_TO_ROOM_BADGE":
      return { ...state, roomServiceCount: state.roomServiceCount + 1 };

    case "ADD_TO_SPA_BADGE":
      return { ...state, spaCount: state.spaCount + 1 };

    case "SET_OPTIONS":
      return { ...state, itemScreenOption: action.payload };

    case "ADD_TO_HOUSE_CART":
      return { ...state, houseKeepingCart: action.payload };

    case "DELETE_ROOM_CART":
      return { ...state, houseKeepingCart: [] };

    case "SET_SPA_LIST":
      return { ...state, spaList: [...action.payload] };

    case "ADD_TO_SPA_CART":
      return { ...state, spaCart: action.payload };

    case "DELETE_SPA_CART":
      return { ...state, spaCart: [], spaCount: 0 };

    case "ADD_TO_CHAT_MESSAGES": {
      console.log("action.payload " + JSON.stringify(action.payload));
      return {
        ...state,
        chatMessagesList: state.chatMessagesList.concat(
          action.payload.reverse()
        ),
      };
    }

    default:
      return state;
  }
};

export default reducer;
