import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import { restaurantDetail, deleteDish } from "../Auth/actions";

function OrderBag(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Auth.orders);
  // const getRest = useSelector((state) => state.Auth.restaurants);
  console.log(props);

  let sum = orders.reduce(function (tot, arr) {
    return tot + Number(arr.subTotal);
  }, Number(props.delivery_fee));

  const deleteItem = (dishId) => {
    dispatch(deleteDish(dishId));
  };

  const movingToCheckout = () => {
    let payload = {
      restaurantId: props.id,
      restaurant_Name: props.rest_name,
      delivery_fee: Number(props.delivery_fee),
    };
    dispatch(restaurantDetail(payload));
    history.push("/checkout");
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body mb-3">
            <h6 class="card-title">Order Information</h6>
            <div className="btn-group">
              <button className="btn btn-outline">Delivery</button>
              <button className="btn btn-outline">Pickup</button>
            </div>
            <div className="btn-group">
              <button className="btn btn-outline"> Today </button>
              <button className="btn btn-outline"> ASAP </button>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h4>Your Bag</h4>
              <i
                className="fa fa-shopping-basket fa-lg"
                style={{ color: "#1f5ea9" }}
              ></i>
              <span style={{ color: "#1f5ea9" }}> {props.rest_name} </span>
            </li>

            <li class="list-group-item" style={{ textAlign: "center" }}>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.dish_id} className="row">
                    <div className="col-lg-1">{order.qty}</div>
                    <div className="col-lg-6">
                      <p>{order.dish_name}</p>
                    </div>
                    <div className="col-lg-4">
                      <p>₹{order.subTotal}</p>
                      <span>
                        <i
                          style={{ color: "crimson" }}
                          class="fas fa-trash-alt"
                          role="button"
                          onClick={() => deleteItem(order.dish_id)}
                        ></i>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No item in your bag</p>
              )}

              <div className="row mt-5">
                <div className="col-lg-6 ml-auto">
                  <p>Delivery Fee</p>
                </div>
                <div className="col-lg-6 mr-auto">
                  {props.delivery_fee ? (
                    <p>{props.delivery_fee}</p>
                  ) : (
                    <p>Free</p>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-12">
                  {/* need to give button color as theme and onCLick to push restaurent_id as prop to checkout page*/}
                  <button
                    onClick={movingToCheckout}
                    className="btn btn-block"
                    style={{ backgroundColor: "#1f5ea9", color: "white" }}
                  >
                    Go to Checkout
                    <span style={{ backgroundColor: "blue", padding: 5 }}>
                      ₹{Number(sum).toFixed(2)}
                    </span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OrderBag;
