import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";

const rootReducer = combineReducers({
  reducer: reducer,
});

const configStore = () => {
  return createStore(rootReducer);
};

export default configStore;

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// redux store brings actions and reducers together and holds application state
