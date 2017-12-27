/*
 * @file: routes.js
 * @description: For defining and importing all screens/routes
 * @date: 14.12.2017
 * @author: Ankush Rishi
 * */


import Login from "../containers/user/login";
import Signup from "../containers/user/signup";
import Home from "../containers/home/home";
import Loader from "../components/common/Loader";
import ViewStylist from "../containers/booking/viewStylist";
// export list of routes.
export default routes = {
	Loader      : { screen: Loader },
	Home        : { screen: Home },
	Login       : { screen: Login },
	Signup      : { screen: Signup },
	ViewStylist : { screen: ViewStylist }
};