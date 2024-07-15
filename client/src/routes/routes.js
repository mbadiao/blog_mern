const baseUrl = process.env.REACT_APP_BASE_URL;
const userProfile = `${baseUrl}/profile`;
const login = `${baseUrl}/login`;
const register = `${baseUrl}/register`;
const logout = `${baseUrl}/logout`;
const post = `${baseUrl}/post`;
const posts = `${baseUrl}/post`;
const onepost = `${baseUrl}/post/`;
const deletePostRoute = `${baseUrl}/post/`;
const updatepost = `${baseUrl}/post/`;
export {
  userProfile,
  login,
  register,
  logout,
  post,
  posts,
  onepost,
  deletePostRoute,
  updatepost,
};
