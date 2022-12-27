import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import userProfile from "../../assets/imgs/user-profile.png";
import jwt_decode from "jwt-decode";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";

function Product() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [product, setProduct] = useState([]);
  const [toggleFav, setToggleFav] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api${window.location.pathname}`
      );
      setProduct(data);
    };
    getProduct();
  }, []);
  const addFavProduct = async (user_id, imageUrl, title, price) => {
    const favProduct = {
      user_id,
      imageUrl: `http://localhost:5000/${imageUrl}`,
      productUrl: window.location.pathname,
      title,
      price,
    };
    await axios.post("http://localhost:5000/api/favorites", favProduct);
    setToggleFav(true);
  };
  return (
    <Fragment>
      <Navbar />

      <div className="container">
        <h5 className="mt-4">{product.title}</h5>
        <div className="parent-product">
          <div className="child-product">
            <img
              src={`http://localhost:5000/${product.imgUrl}`}
              className="card-img-top"
              alt=""
            />
          </div>
          <div className="child-product">
            <div className="details-product">
              <div>
                <h3 className="fw-bolder">EGP {product.price}</h3>
                {toggleFav ? (
                  <i
                    className="fas fa-heart float-end clearfix fs-5"
                    style={{ cursor: "no-drop" }}
                    role="button"
                  ></i>
                ) : (
                  <i
                    className="far fa-heart float-end clearfix fs-5"
                    role="button"
                    onClick={() =>
                      addFavProduct(
                        decoded.id,
                        product.imgUrl,
                        product.title,
                        product.price
                      )
                    }
                  ></i>
                )}

                <span className="text-muted clearfix">
                  <i className="fas fa-map-marker-alt"></i> {product.location}
                </span>
                <span className="text-muted float-end">
                  {moment(product.createdAt).fromNow()}
                </span>
              </div>
              <div>
                <h4>Seller Description</h4>
                <h6 className="my-4">
                  <img
                    src={userProfile}
                    alt="profilePicture"
                    style={{ width: "40px", height: "40px" }}
                    className="mx-2"
                  />{" "}
                  {product.createdBy}
                </h6>
                <h6 className="text-center">
                  <i className="fas fa-phone"></i> {product.phone}
                </h6>
              </div>
              <div>
                <h4>Description</h4>
                <p className="card-text">{product.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
