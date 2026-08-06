const authApi = {};

authApi.registerEndpoint = "users/register";
authApi.loginEndpoint = "users/login";
authApi.meEndpoint = "users/me";

authApi.registerHeader = {
  accept: "application/json",
  "Content-Type": "application/json",
};

authApi.loginHeader = {
  accept: "application/json",
  "Content-Type": "application/json",
};

authApi.buildLoginBody = (email, password) => ({
  email,
  password,
});

module.exports = authApi;
