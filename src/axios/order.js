import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-44eed.firebaseio.com/"
});

export default instance;