import React from "react";
import DashboardNav from "../Dashboard/DashboardNav";
import MenuDisplay from "./MenuDisplay";
import StoreDetailHeader from "./StoreDetailHeader";
import SubMenu from "./SubMenu";
import OrderBag from "./OrderBag"

function Menu() {
  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{backgroundColor:"#eeeeee"}}>
          <DashboardNav />
          <SubMenu />
          <StoreDetailHeader />
            <div className="col-lg-8">
              <MenuDisplay />
            </div>
            <div className="col-lg-4">
              <OrderBag />
            </div>
        </div>
      </div>
    </>
  )
}

export default Menu;
