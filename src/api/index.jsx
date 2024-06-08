import axios from "axios";

const API = axios.create({baseURL: "http://127.0.0.1:5000"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("Profile")).token
      }`;
    }
    return req;
  });

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const addContact = (id, contactData) => API.patch(`/contact/add/${id}`, contactData);
export const deleteContact = (id, contactData) => API.patch(`/contact/delete/${id}`, contactData);
export const editContact = (id, contactData) => API.patch(`/contact/edit/${id}`, contactData);