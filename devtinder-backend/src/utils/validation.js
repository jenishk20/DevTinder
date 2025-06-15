const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name length should be between 4 and 50 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateProfileEditData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "age",
    "gender",
    "photoURL",
  ];
  const isUpdateAllowed = Object.keys(req?.body).every((key) =>
    allowedFields.includes(key)
  );
  return isUpdateAllowed;
};

module.exports = { validateSignupData, validateProfileEditData };
