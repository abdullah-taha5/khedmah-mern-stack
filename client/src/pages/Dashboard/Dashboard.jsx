import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";
import axios from "axios";

function Dashboard() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="card text-white bg-dark my-5">
              <div className="card-header">Users</div>
              <div className="card-body">
                <Link to="users">
                  <button type="button" className="btn btn-danger float-end">
                    See
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card text-white bg-danger my-5">
              <div className="card-header">Products</div>
              <div className="card-body">
                <Link to="products">
                  <button type="button" className="btn btn-dark float-end">
                    See
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
