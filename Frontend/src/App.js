import React from "react";
import "./App.css";
import Home from "./LandingPage/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard/Dashboard";
import { Route } from "react-router-dom";
import Office from "./LandingPage/Office";
import Checkout from "./Checkout/Checkout";
import Menu from "./Menu/Menu";
import Orders from "./Orders/Orders";
import UserProfile from "./Profile/UserProfile";
import OrderSuccess from "./Orders/OrderSuccess";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/office" component={Office} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/dashboard/:id" component={Menu} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/orderSuccess" component={OrderSuccess} />
    </div>
  );
}

export default App;
