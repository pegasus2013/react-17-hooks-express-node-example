const regExp = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
);

const validateMessage = (message) => {
  if (message.length < 30) return false;
  return true;
};

const validateEmail = (email) => regExp.test(email);

export default {
  validateMessage,
  validateEmail,
};
