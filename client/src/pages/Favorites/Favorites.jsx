import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function Favorites() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [favProducts, setFavProducts] = useState([]);

  const getFavProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/favorites/${decoded.id}`
    );
    setFavProducts(data);
  };

  useEffect(() => {
    getFavProducts();
  }, [favProducts]);
  const deleteFavProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/favorites/${id}`);
  };
  return (
    <Fragment>
      <Navbar />
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {favProducts.map((item, i) => (
            <div className="col" key={i}>
              <div className="card h-100">
                <span
                  role="button"
                  className="fs-5 bg-danger text-light px-1 fw-bold"
                  style={{
                    position: "absolute",
                    right: "-8px",
                    top: "-13px",
                    borderRadius: "50%",
                  }}
                  onClick={() => deleteFavProduct(item._id)}
                >
                  X
                </span>
                <Link to={item.productUrl}>
                  <div className="card-body">
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      alt=""
                      style={{ width: "100%", height: "180px" }}
                    />
                    <h5 className="card-title">{item.title}</h5>
                    <h5 className="card-title">EGP {item.price}</h5>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Favorites;
