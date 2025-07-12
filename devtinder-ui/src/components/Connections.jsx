import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addConnections } from "../utils/connectionsSlice";
import { useSelector } from "react-redux";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections.connections);
  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <p className="text-center">No connections found.</p>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      {connections.map((item) => {
        const { firstName, lastName, about, photoURL, skills, age, gender } =
          item;
        return (
          <div
            key={item._id}
            className="m-4 p-4 rounded-lg bg-base-300 flex mx-auto w-1/2"
          >
            <div>
              <figure>
                <img
                  src={photoURL}
                  alt="User"
                  className="w-24 h-24 rounded-lg"
                />
              </figure>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
