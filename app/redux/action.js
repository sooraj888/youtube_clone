import {ADD, SAGALIST, SET_LIST_DATA} from './constants';

export function add(item) {
  return {type: ADD, payload: item};
}

export function getSagaList(item) {
  return {type: SAGALIST, payload: item};
}

export function setSagaListData(item) {
  return {type: SET_LIST_DATA, payload: item};
}
