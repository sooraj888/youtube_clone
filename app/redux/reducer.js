import {Alert} from 'react-native';

const {ADD, SAGALIST, SET_LIST_DATA} = require('./constants');

const initialState = 0;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return parseInt(state) + parseInt(action.payload);

    case SAGALIST:
      return 101;
    case SET_LIST_DATA:
      return action.payload;
    default:
      return state;
  }
};
