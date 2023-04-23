export const isNameValid = (name) => {
  const emailRegex = /^[A-Za-z]+$/;
  return emailRegex.test(name);
};

export const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  const passwordRegex = /^.{4,}$/;
  return passwordRegex.test(password);
};
