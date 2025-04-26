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

const getAllDecks = () => {
    return http.get("/decks");
};

const create = (data) => {
    return http.post("/decks", data);
};

export default {
    getAllDecks,
    create,
};