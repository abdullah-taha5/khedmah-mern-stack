import React, { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function Electronics() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [price, setPrice] = useState(null);
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const inputImgRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/electronics");
      setProducts(data);
    };
    getData();
  }, [products]);

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imgUrl);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("showData", false);
    formData.append("createdBy", decoded.name);
    formData.append("user_id", decoded.id);
    await axios.post("http://localhost:5000/api/electronics", formData);
    setTitle(null);
    setDesc(null);
    inputImgRef.current.value = "";
    setPrice(null);
    setLocation(null);
    setPhone(null);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mx-auto">
        <div className="input-group mb-4">
          <input
            type="text"
            placeholder="Search By Title"
            className="form-control"
            onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
            value={search || ""}
          />
        </div>
        <button
          type="button"
          className="btn btn-warning fs-5 px-4 mx-auto"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Sell
        </button>
      </div>
      {/*Products*/}
      <div className="container my-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {!search
            ? products.map((item, i) =>
                item.status ? (
                  <div className="col" key={i}>
                    <Link to={`${item._id}`}>
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
              )
            : products
                .filter((product) => product.title.includes(search))
                .map((item, i) =>
                  item.status ? (
                    <div className="col" key={i}>
                      <Link to={`${item._id}`}>
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
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog" onSubmit={sendData}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                POST YOUR AD
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  Ad title
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value.toLowerCase())}
                  value={title || ""}
                  required
                />
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  Description
                </span>
                <textarea
                  className="form-control"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc || ""}
                  rows="4"
                  cols="50"
                  required
                ></textarea>
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  EGP
                </span>
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price || ""}
                  required
                />
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  Your Ad's Location
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location || ""}
                  required
                />
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  +20
                </span>
                <input
                  type="number"
                  placeholder="Mobile Phone Number"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone || ""}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  onChange={(e) => setImgUrl(e.target.files[0])}
                  ref={inputImgRef}
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={sendData}
              >
                Post Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Electronics;
