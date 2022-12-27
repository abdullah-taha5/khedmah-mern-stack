import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import jwt_decode from "jwt-decode";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";

import moment from "moment";
import axios from "axios";

function Home() {
  const [phones, setPhones] = useState([]);
  const [cars, setCars] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [electronics, setElectronics] = useState([]);
  useEffect(() => {
    const getPhones = async () => {
      const { data } = await axios.get("http://localhost:5000/api/phones");
      setPhones(data);
    };
    const getCars = async () => {
      const { data } = await axios.get("http://localhost:5000/api/cars");
      setCars(data);
    };
    const getApartments = async () => {
      const { data } = await axios.get("http://localhost:5000/api/apartments");
      setApartments(data);
    };
    const getElectronics = async () => {
      const { data } = await axios.get("http://localhost:5000/api/electronics");
      setElectronics(data);
    };
    getPhones();
    getCars();
    getApartments();
    getElectronics();
  }, [phones, cars, apartments, electronics]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Navbar />
      {phones.length ? (
        <div className="container my-5">
          <h4 className="my-4">
            New recommendations for phones, tablets, & accessories{" "}
          </h4>
          <Slider {...settings}>
            {phones.map((item, i) =>
              item.status ? (
                <div className="col" key={i}>
                  <Link to={`/phones/${item._id}`}>
                    <div
                      className="card h-100"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                    >
                      <img
                        src={`http://localhost:5000/${item.imgUrl}`}
                        className="card-img-top"
                        alt=""
                        style={{ width: "100%", height: "180px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h5 className="card-title">EGP {item.price}</h5>
                        <span className="text-muted">{item.location}</span>
                        <h6 className="my-3">
                          <i className="fas fa-phone"></i> {item.phone}
                        </h6>
                      </div>
                      <div className="card-footer">
                        <small
                          className="text-muted"
                          title={new Date(item.createdAt).toLocaleString()}
                        >
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                false
              )
            )}
          </Slider>
        </div>
      ) : (
        ""
      )}
      {cars.length ? (
        <div className="container my-5">
          <h4 className="my-4"> New recommendations for cars </h4>
          <Slider {...settings}>
            {cars.map((item, i) =>
              item.status ? (
                <div className="col" key={i}>
                  <Link to={`/cars/${item._id}`}>
                    <div
                      className="card h-100"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                    >
                      <img
                        src={`http://localhost:5000/${item.imgUrl}`}
                        className="card-img-top"
                        alt=""
                        style={{ width: "100%", height: "180px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h5 className="card-title">EGP {item.price}</h5>
                        <span className="text-muted">{item.location}</span>
                        <h6 className="my-3">
                          <i className="fas fa-phone"></i> {item.phone}
                        </h6>
                      </div>
                      <div className="card-footer">
                        <small
                          className="text-muted"
                          title={new Date(item.createdAt).toLocaleString()}
                        >
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                false
              )
            )}
          </Slider>
        </div>
      ) : (
        ""
      )}
      {apartments.length ? (
        <div className="container my-5">
          <h4 className="my-4"> New recommendations for apartments </h4>
          <Slider {...settings}>
            {apartments.map((item, i) =>
              item.status ? (
                <div className="col" key={i}>
                  <Link to={`/apartments/${item._id}`}>
                    <div
                      className="card h-100"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                    >
                      <img
                        src={`http://localhost:5000/${item.imgUrl}`}
                        className="card-img-top"
                        alt=""
                        style={{ width: "100%", height: "180px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h5 className="card-title">EGP {item.price}</h5>
                        <span className="text-muted">{item.location}</span>
                        <h6 className="my-3">
                          <i className="fas fa-phone"></i> {item.phone}
                        </h6>
                      </div>
                      <div className="card-footer">
                        <small
                          className="text-muted"
                          title={new Date(item.createdAt).toLocaleString()}
                        >
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                false
              )
            )}
          </Slider>
        </div>
      ) : (
        ""
      )}
      {electronics.length ? (
        <div className="container my-5">
          <h4 className="my-4"> New recommendations electronics </h4>
          <Slider {...settings}>
            {electronics.map((item, i) =>
              item.status ? (
                <div className="col" key={i}>
                  <Link to={`/electronics/${item._id}`}>
                    <div
                      className="card h-100"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                    >
                      <img
                        src={`http://localhost:5000/${item.imgUrl}`}
                        className="card-img-top"
                        alt=""
                        style={{ width: "100%", height: "180px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h5 className="card-title">EGP {item.price}</h5>
                        <span className="text-muted">{item.location}</span>
                        <h6 className="my-3">
                          <i className="fas fa-phone"></i> {item.phone}
                        </h6>
                      </div>
                      <div className="card-footer">
                        <small
                          className="text-muted"
                          title={new Date(item.createdAt).toLocaleString()}
                        >
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                false
              )
            )}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Home;
