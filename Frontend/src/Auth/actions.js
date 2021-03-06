import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  HANDLE_CONTENT,
  GET_COORDINATES_CITY_REQUEST,
  GET_COORDINATES_CITY_SUCCESS,
  GET_COORDINATES_CITY_FAILURE,
  CURRENT_LOCATION_SUCCESS,
  CURRENT_LOCATION_FAILURE,
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  LOGOUT,
  CHANGE_PAGE,
  PUSH_ORDER,
  GET_PLACE_NAME,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  GET_USER_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  ORDERS_FAILURE,
  RESTAURENT_DETAIL,
  BILL_AMOUNT,
  DELETE_DISH,
  DELIVER_TO,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  MAKE_PAYMENT_FALSE,
} from "./actionTypes";
import { accessToken } from "../accessToken";
import axios from "axios";

// fetching coordinates from search query

export const getCoordinatesCityRequest = () => ({
  type: GET_COORDINATES_CITY_REQUEST,
});

export const getCoordinatesCitySuccess = (payload) => ({
  type: GET_COORDINATES_CITY_SUCCESS,
  payload,
});

export const getCoordinatesCityFailure = (payload) => ({
  type: GET_COORDINATES_CITY_FAILURE,
  payload,
});

export const getCoordinatesByCity = (payload) => (dispatch) => {
  dispatch(getCoordinatesCityRequest());
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${payload}.json?country=in&access_token=${accessToken}`
    )
    .then((res) => {
      dispatch(getCoordinatesCitySuccess(res.data.features));
    })
    .catch((err) => dispatch(getCoordinatesCityFailure(err)));
};

// get current location

export const getPlaceName = (payload) => ({
  type: GET_PLACE_NAME,
  payload,
});

export const currLocationReqSuccess = (payload) => ({
  type: CURRENT_LOCATION_SUCCESS,
  payload,
});

export const currLocationSuccess = (payload) => (dispatch) => {
  dispatch(currLocationReqSuccess(payload));
  // console.log(payload);
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${payload.longitude},${payload.latitude}.json?access_token=${accessToken}`
    )
    .then((res) => dispatch(getPlaceName(res.data.features[0].place_name)))
    .catch((err) => dispatch(showCurrentLocationFailure(err)));
};

// fetch restaurants api

export const fetchRestaurantsRequest = () => ({
  type: FETCH_RESTAURANTS_REQUEST,
});

export const fetchRestaurantsSuccess = (payload) => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  payload,
});

export const fetchRestaurantsFailure = (payload) => ({
  type: FETCH_RESTAURANTS_FAILURE,
  payload,
});

export const fetchRestaurants = (payload) => (dispatch) => {
  let payloadLatLon;
  dispatch(fetchRestaurantsRequest());
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${payload}.json?country=in&access_token=${accessToken}`
    )
    .then(
      (res) =>
        // (payloadLatLon = {
        //   latitude: Number(res.data.features[0].center[1]).toFixed(6),
        //   longitude: Number(res.data.features[0].center[0]).toFixed(6),
        // }),
        (payloadLatLon = {
          latitude: 17,
          longitude: 81,
        }),
      axios
        .post(
          "http://localhost:5000/Restaurants?star=2&deliveryFee=20&deliveryTime=20&cuisine=&page=1&limit=5",
          payloadLatLon
        )
        .then((res) => {
          console.log(res.data);
          dispatch(fetchRestaurantsSuccess(res.data));
        })
    )
    .catch((err) => dispatch(fetchRestaurantsFailure(err)));
};

export const fetchNextPageRestaurants = (payload) => (dispatch) => {
  let payloadLatLon = {
    latitude: payload.latitude,
    longitude: payload.longitude,
  };
  console.log(payload);
  axios
    .post(
      `http://localhost:5000/Restaurants?star=${payload.star}&deliveryFee=${payload.deliveryFee}&deliveryTime=${payload.deliveryTime}&cuisine=${payload.cuisine}&page=${payload.page}&limit=5`,
      payloadLatLon
    )
    .then((res) => dispatch(fetchRestaurantsSuccess(res.data)))
    .catch((err) => dispatch(fetchRestaurantsFailure(err)));
};

// post the lat and lon to backend//
export const showCurrentLocationSuccess = (payload) => async (dispatch) => {
  let payloadLatLon = {
    latitude: 12.839223,
    longitude: 77.659293,
  };
  // let payloadLatLon = {
  //   latitude: Number(payload.latitude).toFixed(6),
  //   longitude: Number(payload.longitude).toFixed(6),
  // };
  // console.log(payloadLatLon);
  await dispatch(currLocationSuccess(payloadLatLon));
  // console.log("before rest");

  await axios
    .post(
      "http://localhost:5000/Restaurants?star=0&deliveryFee=All&deliveryTime=All&page=1&limit=5",
      payloadLatLon
    )
    .then((res) => {
      // console.log(res.data);
      dispatch(fetchRestaurantsSuccess(res.data));
    })
    .catch((err) => dispatch(fetchRestaurantsFailure(err)));
  // console.log("after rest");
};

export const showCurrentLocationFailure = (payload) => ({
  type: CURRENT_LOCATION_FAILURE,
  payload,
});

// change content

export const handleContent = (payload) => ({
  type: HANDLE_CONTENT,
  payload,
});

// register a new user

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserFailure = (payload) => ({
  type: REGISTER_USER_FAILURE,
  payload,
});

export const registerUser = (payload) => (dispatch) => {
  console.log(payload);
  dispatch(registerUserRequest());
  axios
    .post("http://localhost:5000/signup", payload)
    .then((res) => dispatch(registerUserSuccess(res.data)))
    .catch((err) => dispatch(registerUserFailure(err)));
};

// login a user

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailure = (payload) => ({
  type: LOGIN_USER_FAILURE,
  payload,
});

export const loginUser = (payload) => (dispatch) => {
  dispatch(loginUserRequest());
  axios
    .post("http://localhost:5000/login", payload)
    .then((res) => dispatch(loginUserSuccess(res.data)))
    .catch((err) => dispatch(loginUserFailure(err)));
};

// login with google success

export const googleLoginSuccess = (payload) => (dispatch) => {
  let payloadData = {
    first_name: payload.givenName,
    last_name: payload.familyName,
    email: payload.email,
    password: `${payload.givenName}1234`,
  };
  console.log(payloadData);
  axios
    .post("http://localhost:5000/signup", payloadData)
    .then((res) => dispatch(loginUserSuccess(res.data)))
    .catch((err) => dispatch(loginUserFailure(err)));
};

// login with fb success

export const fbLoginSuccess = (payload) => (dispatch) => {
  let payloadData = {
    first_name: payload.name,
    last_name: payload.name,
    email: payload.email,
    password: `${payload.name}1234`,
  };
  axios
    .post("http://localhost:5000/signup", payloadData)
    .then((res) => dispatch(loginUserSuccess(res.data)))
    .catch((err) => dispatch(loginUserFailure(err)));
};

// logout

export const logoutUser = () => ({
  type: LOGOUT,
});

// change page

export const changePage = (payload) => ({
  type: CHANGE_PAGE,
  payload,
});

// payment

export const paymentSuccess = () => ({
  type: PAYMENT_SUCCESS,
});

export const paymentFailure = () => ({
  type: PAYMENT_FAILURE,
});

export const razorPayment = (payload) => async (dispatch) => {
  console.log("razoraction");
  const response = await axios.get(
    `http://localhost:5000/order?amount=${payload.amount}`
  );
  const { data } = response;
  const options = {
    name: payload.name,
    description: "Dude, let’s give some food.",
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `http://localhost:5000/capture/${paymentId}?amount=${payload.amount}`;
        const capturedResponse = await axios.post(url);
        const successObj = JSON.parse(capturedResponse.data);
        const captured = successObj.captured;
        if (captured) dispatch(paymentSuccess());
      } catch (error) {
        dispatch(paymentFailure());
      }
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

//Push dish
export const pushOrder = (payload) => ({
  type: PUSH_ORDER,
  payload,
});

// post individual orders

export const postOrdersSuccess = (payload) => ({
  type: GET_USER_ORDERS,
  payload,
});

export const ordersFailure = (payload) => ({
  type: ORDERS_FAILURE,
  payload,
});

export const postOrders = (payload) => (dispatch) => {
  let orderPayload = {
    orders: payload,
  };
  console.log(orderPayload);
  axios
    .post("http://localhost:5000/order", orderPayload)
    .then((res) => {
      dispatch(postOrdersSuccess(res));
      dispatch(getAllOrders(payload.user_id));
    })
    .catch((err) => dispatch(ordersFailure(err)));
};

// get all orders of that user

export const getOrdersSuccess = (payload) => ({
  type: GET_ORDERS_SUCCESS,
  payload,
});

export const getOrdersFailure = (payload) => ({
  type: GET_ORDERS_FAILURE,
  payload,
});

export const getAllOrders = (payload) => (dispatch) => {
  axios
    .get(`http://localhost:5000/getOrders/${payload}`)
    .then((res) => dispatch(getOrdersSuccess(res.data)))
    .catch((err) => dispatch(getOrdersFailure(err)));
};

// Restaurent detail

export const restaurantDetail = (payload) => ({
  type: RESTAURENT_DETAIL,
  payload,
});

// total Order Amount

export const billAmount = (payload) => ({
  type: BILL_AMOUNT,
  payload,
});

// Deleting dish from order bag

export const deleteDish = (payload) => ({
  type: DELETE_DISH,
  payload,
});

//delivery address

export const deliverTo = (payload) => ({
  type: DELIVER_TO,
  payload,
});

// edit user

export const editUserRequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = (payload) => ({
  type: EDIT_USER_SUCCESS,
  payload,
});

export const editUserFailure = (payload) => ({
  type: EDIT_USER_FAILURE,
  payload,
});

export const editUser = (payload) => (dispatch) => {
  dispatch(editUserRequest());
  axios
    .post(`http://localhost:5000/editUser/${payload._id}`, payload)
    .then((res) => dispatch(editUserSuccess(res.data)))
    .catch((err) => dispatch(editUserFailure(err)));
};

// make payment false

export const makePaymentFalse = () => ({
  type: MAKE_PAYMENT_FALSE,
});
