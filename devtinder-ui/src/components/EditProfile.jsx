import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        photoURL,
        gender,
        about,
        age,
      };
      console.log("profileData", profileData);
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        profileData,
        {
          withCredentials: true,
        }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      setError(error.response?.data || "Failed to save profile");
      console.error("Error saving profile:", error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">PhotoURL</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="mt-3">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs mt-3"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
            </div>
            {error && (
              <div className="alert alert-error shadow-lg mt-3">
                <div>
                  <span>{error}</span>
                </div>
              </div>
            )}
            {showToast && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>Profile Saved Successfully</span>
                </div>
              </div>
            )}
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, about, gender, age, photoURL }}
        comingFromProfile={true}
      />
    </div>
  );
};

export default EditProfile;
