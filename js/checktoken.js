
(async () => {
  const token = await localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (token && user) {
    return;
  } else {
    return (window.location = "/login");
  }
})();
const Logout = async () => {
  await localStorage.setItem("token", "");
  return (window.location = await "/");
}