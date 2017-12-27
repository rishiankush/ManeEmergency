/* *
 * @file: nav.js
 * @description: Navigation reducer to handle navigation.
 * @date: 19.12.2017
 * @author: Ankush Rishi
 * */
'use strict';
import Idx from "../../utilities/Idx";
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../config/navigator";
import { REHYDRATE } from "redux-persist/constants";
import { NEW_CONSUMER_USER, LOG_IN_SUCCESS, FB_LOG_IN_SUCCESS, FB_LOG_IN_FAIL, GET_DETAILS } from './user';

//Actions
const GOBACK            = "GOBACK";
const ResetNavigator    = "ResetNavigator";
const GOTO              = "GOTO";
const GOTO_AVAIL        = "GOTO_AVAIL";

// Action Creators
export const goBack = () => ({ type: GOBACK });
export const reset  = (data) => ({ type: ResetNavigator, data });
export const goTo   = (data) => ({ type: GOTO, data });
export const goToAvail = () => ({ type: GOTO_AVAIL });

const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
      }),
    ],
})); 

export default function reducer(state = initialState, action) {
    let firstState = "Home";
    // if(action.payload && action.payload.user && action.payload.user.userDetails){
    //     switch(parseInt(action.payload.user.userDetails.role)){
    //         case 0:
    //             firstState = "ConsumerDashboard" ;
    //             role = 0;
    //         break;
    //         case 1:
    //             firstState = "ChefDashboard" ;
    //             role = 1;
    //         break;
    //         case 2:
    //             firstState = "RegisterCreditDebitCards" ;
    //             role = 2;
    //         break;
    //     }
    // }

    switch (action.type) {
        case NEW_CONSUMER_USER:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Home" })],
                }),
                state
            );

    	case LOG_IN_SUCCESS:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Home" })],
                }),
                state
            );

        case FB_LOG_IN_SUCCESS:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Home" })],
                }),
                state
            );

        case FB_LOG_IN_FAIL:
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Signup",
                    params: action.data
                }),
                state
            );

        // case GO_TO_OTP:
        // return AppNavigator.router.getStateForAction(
        //     NavigationActions.navigate({
        //         routeName: "OTP",
        //         params:action.data
        //     }),
        //     state
        // );

        case GET_DETAILS:
        return AppNavigator.router.getStateForAction(
            NavigationActions.navigate({
                routeName: "Home",
            }),
            state
        );

        // case GOTO_AVAIL:
        // console.log("goToAvail")
        // return AppNavigator.router.getStateForAction(
        //     NavigationActions.navigate({
        //         routeName: "Availability",
        //     }),
        //     state
        // );

        case ResetNavigator:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Home" })],
                }),
                state
            );

        case GOBACK:
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );

        // case GOTO:
        // return AppNavigator.router.getStateForAction(
        //     NavigationActions.navigate({
        //         routeName: action.data.route,
        //         params: action.data.params || {},
        //     }),
        //     state
        // );

        // case LOG_OUT:
        //     return AppNavigator.router.getStateForAction(
        //         NavigationActions.reset({
        //           index: 0,
        //           actions: [NavigationActions.navigate({ routeName: "Welcome" })],
        //         }),
        //         state
        //     );

        case REHYDRATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: firstState })],
                }),
                state
            );

        default:
            return AppNavigator.router.getStateForAction(action, state);
    }
}
