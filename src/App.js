import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import WorkOrderForm from "./component/WorkOrderForm";
import WorkOrders from "./component/WorkOrders";
import WorkOrderDetails from "./component/WorkOrderDetails";
import FeatherIcon from "feather-icons-react";

function App() {
  return (
    <Fragment>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">
          Offline Store Online Sync
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        /> */}
        {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="/">
              Sign out
            </a>
          </li>
        </ul> */}
      </nav>
      <div className="container-fluid">
        <div className="row scratchHeight">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse"
          >
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link active text-light font-weight-bold"
                    href="/"
                  >
                    <FeatherIcon icon="home" className="mx-3" />
                    {/* <span data-feather="home"></span> */}
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-light font-weight-bold"
                    href="/addworkorder"
                  >
                    <FeatherIcon icon="file" className="mx-3" />
                    {/* <span data-feather="file"></span> */}
                    New Work Order
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-light font-weight-bold"
                    href="/workorders"
                  >
                    <FeatherIcon icon="layers" className="mx-3" />
                    {/* <span data-feather="shopping-cart"></span> */}
                    Work Order List
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light"
          >
            <Switch>
              <Route path="/workOrders/:id" component={WorkOrderDetails} />
              <Route path="/addworkorder" component={WorkOrderForm} />
              <Route path="/workorders" component={WorkOrders} />
            </Switch>
          </main>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
