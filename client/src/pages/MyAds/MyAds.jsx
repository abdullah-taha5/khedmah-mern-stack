import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";

function MyAds() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const [myAdsPhones, setMyAdsPhones] = useState([]);
  const [myAdsCars, setMyAdsCars] = useState([]);
  const [myAdsApartments, setMyAdsApartments] = useState([]);
  const [myAdsElectronics, setMyAdsElectronics] = useState([]);

  // get my ads (phones)
  const getMyAdsPhones = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/phones/myAds/${decoded.id}`
    );
    setMyAdsPhones(data);
  };

  const deleteProductPhone = async (id) => {
    await axios.delete(`http://localhost:5000/api/phones/${id}`);
  };
  // get my ads (Cars)
  const getMyAdsCars = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/cars/myAds/${decoded.id}`
    );
    setMyAdsCars(data);
  };
  const deleteProductCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`);
  };
  // get my ads (Apartments)
  const getMyAdsApartments = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/apartments/myAds/${decoded.id}`
    );
    setMyAdsApartments(data);
  };
  const deleteProductApartment = async (id) => {
    await axios.delete(`http://localhost:5000/api/apartments/${id}`);
  };
  // get my ads (Electronics)
  const getMyAdsElectronics = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/electronics/myAds/${decoded.id}`
    );
    setMyAdsElectronics(data);
  };
  const deleteProductElectronic = async (id) => {
    await axios.delete(`http://localhost:5000/api/electronics/${id}`);
  };

  useEffect(() => {
    getMyAdsPhones();
    getMyAdsCars();
    getMyAdsApartments();
    getMyAdsElectronics();
  }, [myAdsPhones, myAdsCars, myAdsApartments, myAdsElectronics]);

  return (
    <Fragment>
      <Navbar />
      <div className="container text-center my-5">
        {myAdsPhones.length ? (
          <h3>Mobile Phones, Tablets, & Accessories</h3>
        ) : (
          ""
        )}

        {myAdsPhones.length ? (
          <table className="table table-success table-striped my-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {myAdsPhones.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.imgUrl}`}
                      alt={item.title}
                      width="100px"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProductPhone(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
        {myAdsCars.length ? <h3>Cars</h3> : ""}

        {myAdsCars.length ? (
          <table className="table table-success table-striped my-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {myAdsCars.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.imgUrl}`}
                      alt={item.title}
                      width="100px"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProductCar(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
        {myAdsApartments.length ? <h3>Apartments</h3> : ""}

        {myAdsApartments.length ? (
          <table className="table table-success table-striped my-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {myAdsApartments.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.imgUrl}`}
                      alt={item.title}
                      width="100px"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProductApartment(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
        {myAdsElectronics.length ? <h3>Electronics & Home Appliances</h3> : ""}

        {myAdsElectronics.length ? (
          <table className="table table-success table-striped my-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {myAdsElectronics.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.imgUrl}`}
                      alt={item.title}
                      width="100px"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProductElectronic(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default MyAds;
