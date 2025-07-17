import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(addFeed(data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed && feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <p className="text-center">No users found in the feed.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="font-bold text-2xl text-center my-4">Your Feed</div>
      <div className="flex justify-center my-10">
        <div>
          {feed && feed.length > 0 ? (
            <UserCard user={feed[0]} comingFromProfile={false}></UserCard>
          ) : (
            <p className="text-center">Loading feed...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
