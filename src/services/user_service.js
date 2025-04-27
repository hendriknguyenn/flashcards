/**
 * Using Axios to send HTTP requests to Node API server
 *  TODO: switch to fetch
 */

import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getUser = (username) => {
    return http.get(`/users/${username}`);
};

const getAllUsers = () => {
    return http.get("/users");
};

const create = (data) => {
    return http.post("/users", data);
};

export default {
    getUser,
    getAllUsers,
    create,
};