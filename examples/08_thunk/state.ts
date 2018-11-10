import { applyMiddleware, combineReducers, compose } from "redux";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import produce from "immer";

import { reduxDevToolsExt } from "../../src/devtools";
import { ApplyMiddleware, createStore, Middleware } from "../../src/index";

const initialState = {
  counter: 0,
  person: {
    age: 0,
    firstName: "",
    lastName: ""
  }
};

type State = typeof initialState;

export type Action =
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    }
  | {
      type: "setFirstName";
      firstName: string;
    }
  | {
      type: "setLastName";
      lastName: string;
    }
  | {
      type: "setAge";
      age: number;
    };

const counterReducer = (state = initialState.counter, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

// immer example
// const byId = (state, action) =>
//     produce(state, draft => {
//         switch (action.type) {
//             case RECEIVE_PRODUCTS:
//                 action.products.forEach(product => {
//                     draft[product.id] = product
//                 })
//         }
//     })

// new reducer (using immer)
const personReducer = (state = initialState.person, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "setFirstName":
        draft.firstName = action.firstName;
        break;
      case "setLastName":
        draft.lastName = action.lastName;
        break;
      case "setAge":
        draft.age = action.age;
        break;
    }
  });
};

// original reducer (no immer)
// const personReducer = (state = initialState.person, action: Action) => {
//   switch (action.type) {
//     case 'setFirstName': return {
//       ...state,
//       firstName: action.firstName,
//     };
//     case 'setLastName': return {
//       ...state,
//       lastName: action.lastName,
//     };
//     case 'setAge': return {
//       ...state,
//       age: action.age,
//     };
//     default: return state;
//   }
// };

const reducer = combineReducers({
  counter: counterReducer,
  person: personReducer
});

export const { dispatch, useGlobalState } = createStore<State, Action>(
  reducer,
  initialState,
  compose(
    ((applyMiddleware as unknown) as ApplyMiddleware<State, Action>)(
      (reduxThunk as unknown) as Middleware<State, Action>,
      reduxLogger as Middleware<State, Action>
    ),
    reduxDevToolsExt()
  )
);
