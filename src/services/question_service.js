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

const updateQuestion = (question_id, data) => {
    return http.put(`/questions/${question_id}`, data)
}

export default {
    getDeckQuestions,
    addQuestion,
    deleteQuestion,
    updateQuestion,
}