import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Phones from "./pages/Phones/Phones";
import Favorites from "./pages/Favorites/Favorites";
import Product from "./pages/Product/Product";
import Cars from "./pages/Cars/Cars";
import Apartments from "./pages/Apartments/Apartments";
import Electronics from "./pages/Electronics/Electronics";
import MyAds from "./pages/MyAds/MyAds";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/myAds" element={<MyAds />} />
        <Route path="/ZGFzaGJvYXJk" element={<Dashboard />} />
        <Route path="/ZGFzaGJvYXJk/users" element={<Users />} />
        <Route path="/ZGFzaGJvYXJk/products" element={<Products />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/phones/:id" element={<Product />} />
        <Route path="/cars/:id" element={<Product />} />
        <Route path="/apartments/:id" element={<Product />} />
        <Route path="/electronics/:id" element={<Product />} />
        <Route
          path="/*"
          element={<h1 className="not-found">404 Not Fount</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
