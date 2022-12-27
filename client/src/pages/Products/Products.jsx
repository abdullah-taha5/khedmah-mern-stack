import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

function Products() {
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
  const approveProductPhone = async (id) => {
    await axios.patch(`http://localhost:5000/api/phones/${id}`, {status: true});
  }
  const disApproveProductPhone = async (id) => {
    await axios.delete(`http://localhost:5000/api/phones/${id}`);
  }
  const approveProductCar = async (id) => {
    await axios.patch(`http://localhost:5000/api/cars/${id}`, {status: true});
  }
  const disApproveProductCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`);
  }
  const approveProductApartment = async (id) => {
    await axios.patch(`http://localhost:5000/api/apartments/${id}`, {status: true});
  }
  const disApproveProductApartment = async (id) => {
    await axios.delete(`http://localhost:5000/api/apartments/${id}`);
  }
  const approveProductElectronic = async (id) => {
    await axios.patch(`http://localhost:5000/api/electronics/${id}`, {status: true});
  }
  const disApproveProductElectronic = async (id) => {
    await axios.delete(`http://localhost:5000/api/electronics/${id}`);
  }
  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {phones.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img
                    src={`http://localhost:5000/${item.imgUrl}`}
                    alt={item.title}
                    width="80px"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => approveProductPhone(item._id)}>
                  Approve
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => disApproveProductPhone(item._id)}>
            Disapprove
                  </button>
                </td>
              </tr>
            ))}
            {cars.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img
                    src={`http://localhost:5000/${item.imgUrl}`}
                    alt={item.title}
                    width="80px"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => approveProductCar(item._id)}>
                  Approve
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => disApproveProductCar(item._id)}>
            Disapprove
                  </button>
                </td>
              </tr>
            ))}
            {apartments.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img
                    src={`http://localhost:5000/${item.imgUrl}`}
                    alt={item.title}
                    width="80px"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => approveProductApartment(item._id)}>
                  Approve
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => disApproveProductApartment(item._id)}>
            Disapprove
                  </button>
                </td>
              </tr>
            ))}
            {electronics.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img
                    src={`http://localhost:5000/${item.imgUrl}`}
                    alt={item.title}
                    width="80px"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => approveProductElectronic(item._id)}>
                  Approve
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => disApproveProductElectronic(item._id)}>
            Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default Products;
