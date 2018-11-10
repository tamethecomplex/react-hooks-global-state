import { createStore } from "../../src/index";
import produce from "immer";
import { combineReducers, compose } from "redux";

type Action =
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

// new reducer (using immer)
// const personReducer = (state = initialState.person, action: Action) => {
//   return produce(state, draft => {
//     switch (action.type) {
//       case "setFirstName":
//         draft.firstName = action.firstName;
//         break;
//       case "setLastName":
//         draft.lastName = action.lastName;
//         break;
//       case "setAge":
//         draft.age = action.age;
//         break;
//     }
//   });
// };

// after mod
export const { dispatch, useGlobalState } = createStore(
  (state, action: Action) => {
    return produce(state, draft => {
      switch (action.type) {
        case "increment":
          draft.counter++;
          break;
        case "decrement":
          draft.counter--;
          break;
        case "setFirstName":
          draft.person.firstName = action.firstName;
          break;
        case "setLastName":
          draft.person.lastName = action.lastName;
          break;
        case "setAge":
          draft.person.age = action.age;
      }
    });
  },
  {
    counter: 0,
    person: {
      age: 0,
      firstName: "",
      lastName: ""
    }
  }
);

// before mod
// export const { dispatch, useGlobalState } = createStore(
//   (state, action: Action) => {
//     switch (action.type) {
//       case 'increment': return {
//         ...state,
//         counter: state.counter + 1,
//       };
//       case 'decrement': return {
//         ...state,
//         counter: state.counter - 1,
//       };
//       case 'setFirstName': return {
//         ...state,
//         person: {
//           ...state.person,
//           firstName: action.firstName,
//         },
//       };
//       case 'setLastName': return {
//         ...state,
//         person: {
//           ...state.person,
//           lastName: action.lastName,
//         },
//       };
//       case 'setAge': return {
//         ...state,
//         person: {
//           ...state.person,
//           age: action.age,
//         },
//       };
//       default: return state;
//     }
//   },
//   {
//     counter: 0,
//     person: {
//       age: 0,
//       firstName: '',
//       lastName: '',
//     },
//   },
// );
