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

const addQuestion = (data) => {
    return http.post("/questions", data);
}

const deleteQuestion = (question_id) => {
    return http.delete(`/questions/${question_id}`)
}

export default {
    getDeckQuestions,
    addQuestion,
    deleteQuestion,
}