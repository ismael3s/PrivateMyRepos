import axios from "axios";
import gitCredentials from "../config/gitCredentials.js";

const gitAxios = axios.create({
    baseURL: "https://api.github.com",
    auth: gitCredentials.auth,
    params: {
        "per_page": 100,
    }
})

export { gitAxios }