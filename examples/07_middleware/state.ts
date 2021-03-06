import { applyMiddleware, combineReducers } from 'redux';

import { ApplyMiddleware, createStore, Dispatch } from '../../src/index';

const initialState = {
  counter: 0,
  person: {
    age: 0,
    firstName: '',
    lastName: '',
  },
};

type State = typeof initialState;

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setFirstName', firstName: string }
  | { type: 'setLastName', lastName: string }
  | { type: 'setAge', age: number };

const counterReducer = (state = initialState.counter, action: Action) => {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    default: return state;
  }
};

const personReducer = (state = initialState.person, action: Action) => {
  switch (action.type) {
    case 'setFirstName': return {
      ...state,
      firstName: action.firstName,
    };
    case 'setLastName': return {
      ...state,
      lastName: action.lastName,
    };
    case 'setAge': return {
      ...state,
      age: action.age,
    };
    default: return state;
  }
};

const reducer = combineReducers({
  counter: counterReducer,
  person: personReducer,
});

const logger = ({ getState }: { getState: () => State }) =>
  (next: Dispatch<Action>) => (action: Action) => {
    // tslint:disable no-console
    console.log('will dispatch', action);
    const returnValue = next(action);
    console.log('state after dispatch', getState());
    // tslint:enable no-console
    return returnValue;
  };

export const { dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  (applyMiddleware as unknown as ApplyMiddleware<State, Action>)(logger),
);
