const UserCard = ({ user }) => {
  console.log(user);

  const { firstName, lastName, photoURL, about } = user || {};
  return (
    <div className="card bg-base-400 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {about ||
            "This user has not provided any information about themselves."}
        </p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
