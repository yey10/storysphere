import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUserSubscriptions, createSubscription } from "../api/subscriptionsService";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) =>{
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);


    const fetchSubscriptions = useCallback(async (forceReload = false) => {
        if (!forceReload && hasFetched) return;
        setIsLoading(true);
        try {
            const data = await getUserSubscriptions();
            setSubscriptions(data);
        } catch (error) {
            console.error("Error al obtener suscripciones:", error);
        } finally {
            setIsLoading(false);
            setHasFetched(true);
        }
    }, [hasFetched]);

    useEffect(() => {
            fetchSubscriptions(); 
    }, [fetchSubscriptions]);

    const addSubscription = async (data) => {
        try {
            const response = await createSubscription(data);
            if (response.subscription) {
                setSubscriptions((prev) => [...prev, response.subscription]);
            }
        } catch (error) {
            console.error("Error al crear la suscripción:", error);
        }
    };

    return (
        <SubscriptionContext.Provider value={{
            subscriptions,
            isLoading,
            fetchSubscriptions,
            addSubscription
        }}>
            {children}
        </SubscriptionContext.Provider>
    );

}

export const useSubscription = () => useContext(SubscriptionContext);
