import axios from "axios";

// const API = axios.create({ baseURL: "http://127.0.0.1:4253" });https://dobby-ads-server.onrender.com
const API = axios.create({ baseURL: "https://dobby-ads-server.onrender.com" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("Profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("Profile")).token
//     }`;
//   }
//   return req;
// });

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const addFolder = (folderData) => API.post("/folder/add", folderData);
export const getFolder = (folderData) => API.post("/folder/get", folderData);
export const addImage = (imageData) => API.post("/folder/addImage", imageData);
