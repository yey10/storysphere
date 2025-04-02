import axios from './api.js';

//suscripciones

export const getUserSubscriptions = async () => {
    try {
        const response = await axios.get("/subscriptions");
        return response.data.subscriptions;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const createSubscription = async (data) =>{
    try {
        const response = await axios.post("/subscriptions", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

