import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await fetch(
        BASE_URL + "/feed",
        {},
        {
          withCredentials: true,
        }
      );
      const data = await response.json();
      dispatch(addFeed(data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed);

  return (
    <div className="flex justify-center my-10">
      <div>
        {feed && feed.length > 0 ? (
          <UserCard user={feed[0]}></UserCard>
        ) : (
          <p className="text-center">Loading feed...</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
