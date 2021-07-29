import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

function goBack() {
  navigationRef.current?.goBack();
}

// function popToTop() {
//   navigationRef.current?.popToTop();
// }

export default {
  navigate,
  goBack,
  toggleDrawer,
  // popToTop,
};