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

const getDeckNameFromId = (deck_id) => {
    return http.get(`/decks/name/${deck_id}`);
};

const getUserDecks = (user_id) => {
    return http.get(`/decks/${user_id}`);
};

const getAllDecks = () => {
    return http.get("/decks");
};

const create = (data) => {
    return http.post("/decks", data);
};

const remove = (id, data) => {
    return http.delete(`/decks/${id}`, data);
};

export default {
    getAllDecks,
    create,
    getUserDecks,
    remove,
    getDeckNameFromId,
};