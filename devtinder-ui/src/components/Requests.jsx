import axios from "axios";
import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRequests } from "../utils/requestsSlice";
import { BASE_URL } from "../utils/constants";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(setRequests(response.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      {requests.map((item) => {
        const { firstName, lastName, about, photoURL, skills, age, gender } =
          item?.fromUserId;
        return (
          <div
            key={item._id}
            className="m-4 p-4 rounded-lg bg-base-300 flex justify-between items-center mx-auto w-2/3"
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
            <div>
              <button className="btn btn-primary mx-2">Accept</button>
              <button className="btn btn-secondary mx-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
