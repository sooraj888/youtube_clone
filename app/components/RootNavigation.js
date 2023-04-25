import * as React from 'react';

export const navigationRef = React.createRef();

export const currentRoutName = React.useRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function getCurrentFocusedRouteName() {
  return currentRoutName.current;
}
