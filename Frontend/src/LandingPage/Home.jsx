import React, { useState } from "react";
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
  Image,
  Form,
} from "react-bootstrap";
import styled from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoordinatesByCity,
  showCurrentLocationSuccess,
  showCurrentLocationFailure,
  fetchRestaurants,
} from "../Auth/actions";
import styles, { createGlobalStyle } from "styled-components";
// import NavBarTest from './NavBarTest'

const Input = styles.input`
  border:0;
  width:300px;
  height:30px;
  position:absolute;
  down:20px;
  left:35px;
`;

function Home() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const suggestions = useSelector((state) => state.Auth.suggestions);

  const handleAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
    dispatch(getCoordinatesByCity(e.target.value));
  };

  const getAddress = (place) => {
    setAddress(place);
  };

  const success = (pos) => {
    console.log(pos);
    dispatch(showCurrentLocationSuccess(pos.coords));
  };

  const error = (err) => {
    console.log(err);
    dispatch(showCurrentLocationFailure(err));
  };

  const getCurrentLocation = () => {
    console.log("request");
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const getRestaurants = () => {
    dispatch(fetchRestaurants(address));
  };

  return (
    <>
      <NavBar />
      {/* <NavBarTest /> */}
      <Container fluid>
        <Row className={styled.bgimage}>
          <Row style={{ textAlign: "center" }} lg={3} md={3} sm={1} xs={1}>
            <Col></Col>
            <Col>
              <Card
                style={{
                  width: "36rem",
                  height: "20rem",
                  marginTop: "8rem",
                  marginLeft: "6rem",
                  backgroundColor: "#f2f3f4",
                  border: "none",
                  position: "relative",
                  boxShadow: "none",
                }}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <Image
                        className={styled.logoimg}
                        src="./logo2.png"
                        alt="delivery"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={styled.roundBox}>
                        <i
                          className={classnames(
                            "fa fa-utensils fa-lg",
                            styled.searcboxicon
                          )}
                        ></i>
                      </div>
                      <div className={styled.roundBox}>
                        <i
                          className={classnames(
                            "fas fa-glass-martini fa-lg",
                            styled.searcboxicon
                          )}
                        ></i>
                      </div>
                      <div className={styled.roundBox}>
                        <i
                          className={classnames(
                            "fas fa-shopping-basket fa-lg",
                            styled.searcboxicon
                          )}
                        ></i>
                      </div>
                      <div className={styled.roundBox}>
                        <i
                          className={classnames(
                            "fas fa-shopping-cart fa-lg",
                            styled.searcboxicon
                          )}
                        ></i>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={styled.info}>
                        <p>See who delivers in your neighborhood</p>
                      </div>
                    </Col>
                  </Row>
                  <Row className={styled.searchDiv}>
                    {/* <Col lg={8} className={styled.inpDiv}> */}
                    <div className={styled.inpDiv}>
                      <i
                        className={classnames(
                          "fas fa-location-arrow",
                          styled.locationArrow
                        )}
                      ></i>
                      {/* <FontAwesomeIcon
                        icon="location-arrow"
                        className={styled.locationArrow}
                      /> */}
                      <Input
                        type="text"
                        onChange={handleAddress}
                        value={address}
                        placeholder="Street Address, City, State"
                      />

                      <div style={{ background: "white", padding: "2%" }}>
                        {suggestions &&
                          suggestions.map((item) => (
                            <div
                              key={item.place_name}
                              onClick={() => getAddress(item.place_name)}
                            >
                              {item.place_name}
                            </div>
                          ))}
                      </div>
                      {/* </Form.Group>
                      </Form> */}
                    </div>

                    <button className={styled.btn} onClick={getRestaurants}>
                      Search
                    </button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Row>
      </Container>
      <Container>
        <Row style={{ textAlign: "center", margin: 50 }}>
          <Col>
            <h4>Why order with delivery.com</h4>
          </Col>
        </Row>
        <Row
          lg={3}
          sm={2}
          xs={1}
          style={{ textAlign: "center" }}
          // className="wow animated fadeInDownBig slow"
        >
          <Col>
            <img
              src="img1.png"
              alt="img1"
              style={{ height: 150, width: 150 }}
            />
            <div>
              <img src="Shadow.png" alt="shadow" style={{ width: 100 }} />
            </div>
            <h5>Find Favorites and Discover New Ones</h5>
            <p>
              Browse thousands of restaurants and stores to get the best of your
              neighborhood delivered.
            </p>
          </Col>
          <Col>
            <img
              src="img2.png"
              alt="img2"
              style={{ height: 150, width: 150 }}
            />
            <div>
              <img src="Shadow.png" alt="shadow" style={{ width: 100 }} />
            </div>
            <h5>Free, Easy, and Essential</h5>
            <p>
              It's free to order, so save time tackling your to-do list at home,
              at work, or on the go.
            </p>
          </Col>
          <Col>
            <img
              src="img3.png"
              alt="img3"
              style={{ height: 150, width: 150 }}
            />
            <div>
              <img src="Shadow.png" alt="shadow" style={{ width: 100 }} />
            </div>
            <h5>Earn Points and Get Rewards</h5>
            <p>
              Score Delivery Points with every purchase and cash them in for
              gift cards and other rewards.
            </p>
          </Col>
        </Row>
      </Container>
      <Container style={{ background: "#f8f8f8" }} fluid>
        <Row style={{ textAlign: "center", margin: 50 }}>
          <Col style={{ marginTop: 50 }}>
            <h4>Get to know us</h4>
          </Col>
        </Row>
        <Row>
          <Container>
            <Row style={{ backgroundColor: "white" }}>
              <Col>
                <img
                  style={{ height: 300, borderRadius: "0% 50% 50% 0%" }}
                  src="pic1.jpg"
                  alt="pic1"
                />
              </Col>
              <Col>
                <div style={{ margin: 50 }}>
                  <h4>For Local Businesses</h4>
                  <p>
                    Find out how to start growing your business with online
                    ordering.
                  </p>
                  <Button variant="outline-primary">Learn More</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Container style={{ marginBottom: 20 }}>
            <Row>
              <Col lg={6}>
                <Row
                  style={{
                    backgroundColor: "white",
                    marginRight: 2,
                    height: "auto",
                  }}
                >
                  <Col>
                    <div style={{ margin: 50 }}>
                      <h5>About Us</h5>
                      <p>We’re a fun bunch. Drop in and get to know us!</p>
                      <Button variant="outline-primary">Learn More</Button>
                    </div>
                  </Col>
                  <Col>
                    <img
                      style={{ height: "10rem" }}
                      src="pic2.jpg"
                      alt="pic2"
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row
                  style={{
                    backgroundColor: "white",
                    marginLeft: 2,
                    height: "auto",
                  }}
                >
                  <Col>
                    <div style={{ margin: 50 }}>
                      <h5>Delivery Points</h5>
                      <p>No one else dishes out such great rewards!</p>
                      <Button variant="outline-primary">Learn More</Button>
                    </div>
                  </Col>
                  <Col>
                    <img
                      style={{ height: "10rem" }}
                      src="pic3.jpg"
                      alt="pic3"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container style={{ backgroundColor: "white" }}>
        <Row style={{ position: "relative" }}>
          <Col lg={6} xs={12} sm={12}>
            <img
              style={{ height: 200, marginTop: 100, marginBottom: -70 }}
              src="bottomImage3.png"
              alt="b3"
            />
            <img
              style={{ height: 200, marginBottom: -70 }}
              src="bottomImage2.png"
              alt="b2"
            />
            <img style={{ height: 200 }} src="bottomImage1.png" alt="b1" />
          </Col>
          <Col lg={6} xs={12} sm={12}>
            <Row style={{ marginTop: 150 }}>
              <h3>Tap into the neighborhood.</h3>
              <p>
                Download the delivery.com app today <br></br> so you can order
                anytime, anywhere.
              </p>
              <div>
                <img style={{ width: 140 }} src="app.png" alt="appStore" />
                <img style={{ width: 180 }} src="play.png" alt="playStore" />
              </div>
              <InputGroup>
                <Row>
                  <Col>
                    <FormControl placeholder="Mobile Number" />
                  </Col>
                  <Col>
                    <Button varient="primary">Send Link</Button>
                  </Col>
                </Row>
              </InputGroup>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
