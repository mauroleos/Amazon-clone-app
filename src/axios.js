import axios from "axios";

const instance = axios.create({
    //The API (cloud function) URL
    baseURL: "https://us-central1-clone-e30b3.cloudfunctions.net/api"
    // "http://localhost:5001/clone-e30b3/us-central1/api" 
});

export default instance; 