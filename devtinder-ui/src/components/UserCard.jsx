import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeItemFromFeed } from "../utils/feedSlice";
const UserCard = ({ user, comingFromProfile = false }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoURL, about, age, gender } = user || {};
  const handleSendRequest = async (status, toUserId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/requests/send/" + status + "/" + toUserId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeItemFromFeed(toUserId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <div className="card bg-base-400 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div>
          {about ||
            "This user has not provided any information about themselves."}
        </div>
        <div>
          <span className="font-bold">Age:</span> {age || "Not specified"}
        </div>
        <div>
          <span className="font-bold">Gender:</span>
          {gender || "Not specified"}
        </div>
        {!comingFromProfile && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
