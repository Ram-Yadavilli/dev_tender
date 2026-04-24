const validator = require("validator");

const signupValidation = (data) => {
  const { firstName, lastName, emailId, password, age, gender } = data;

  if (!firstName) {
    throw new Error("firstName are required");
  }
  if (!lastName) {
    throw new Error(" lastName are required");
  }
  if (!emailId) {
    throw new Error(" emailId are required");
  }
  if (!password) {
    throw new Error(" password are required");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error(" Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(" Password should be strong");
  }
  if (!age) {
    throw new Error(" age are required");
  }
  if (age < 18 || age === undefined || isNaN(age)) {
    throw new Error(" age should be greater than 18");
  }
  if (!gender) {
    throw new Error(" gender are required");
  }
};

module.exports = { signupValidation };
