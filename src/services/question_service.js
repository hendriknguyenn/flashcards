import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getDeckQuestions = (deck_id) => {
    return http.get(`/questions/${deck_id}`);
};

export default {
    getDeckQuestions,
}