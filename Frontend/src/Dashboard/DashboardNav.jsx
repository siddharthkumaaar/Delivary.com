import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Profile from "../LandingPage/Profile";
import LogReg from "../LandingPage/LogReg";

const Div = styled.div`
  background: #01579b;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  color: #01579b;
  font-weight: bolder;
  width: 400px;
`;

const Span = styled.span`
  margin-top: 0px;
`;

function DashboardNav() {
  const { login, place } = useSelector((state) => state.Auth);

  return (
    <Div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <img src="./logo.png" width="150px" alt="delivary.com" />
        </div>
        <div className="col-3">
          <Input className="bg-white mt-3" type="text" value={place} />
        </div>

        <div className="offset-1 col-1">{login ? <Profile /> : <LogReg />}</div>
        <div className=" offset-2 col-0.8 text-white mt-3">
          <i className="fas fa-tag fa-2x"></i>
        </div>
        <div className="ml-5 col text-white mt-3">
          <i className="fas fa-shopping-basket fa-2x"></i>
        </div>
      </div>
    </Div>
  );
}

export default DashboardNav;
