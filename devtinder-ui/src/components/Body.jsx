import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { setUser, clearUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
    } catch (error) {
      navigate("/login");
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
