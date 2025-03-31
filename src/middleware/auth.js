const adminAuth = (req, res, next) => {
  console.log("This is the admin middleware");
  const token = "xyz";
  const isAdminAuth = () => {
    if (token === "xyz") {
      return true;
    }
  };
  if (isAdminAuth()) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const userAuth = (req, res, next) => {
  console.log("This is the user  middleware");
  const token = "xyz";
  const isAdminAuth = () => {
    if (token === "xyz") {
      return true;
    }
  };
  if (isAdminAuth()) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
module.exports = { adminAuth, userAuth };
