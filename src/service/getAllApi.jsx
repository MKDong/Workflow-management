import api from "../ulti/axiosCustom";

// baseURL: 'https://backoffice.nodemy.vn/'

function getPopulate() {
    return api.get("api/tasks?populate=*");
}

function getAllListask(query) {
    return api.get(query);
}
function getMeToken(token) {
    return api.get("api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
function postAddValue(data, token) {
    return api.post("api/tasks", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

function getTaskById(id) {
    return api.get(`api/tasks/${id}`);
}

function getValueSearch(title) {
    return api.get(`api/tasks?populate=*&filters[title][$contains]=${title}`);
}

function deleteTask(id, token) {
    return api.delete(`api/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

function putTask(id, data, token) {
    return api.put(`api/tasks/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,   
        },
    });
   
}
function changeChecked (id,check,token) {
    return api.put(`api/tasks/${id}`,{data : {complete:check}},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}

export { getPopulate, getAllListask, postAddValue, getValueSearch, getMeToken, deleteTask, getTaskById, putTask, changeChecked };
