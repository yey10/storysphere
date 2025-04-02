import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUserSubscriptions, createSubscription } from "../api/subscriptionsService";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) =>{
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);


    const fetchSubscriptions = useCallback(async (forceReload = false) => {
        if (!forceReload && subscriptions.length > 0) return;
        setIsLoading(true);
        try {
            const data = await getUserSubscriptions();
            setSubscriptions(data);
        } catch (error) {
            console.error("Error al obtener suscripciones:", error);
        } finally {
            setIsLoading(false);
        }
    }, [subscriptions]);

    useEffect(() => {
        if (!hasFetched) {
            setHasFetched(true);
            fetchSubscriptions();
        }
    }, [hasFetched, fetchSubscriptions]);

    const addSubscription = async (data) => {
        try {
            const newSubscription = await createSubscription(data);
            setSubscriptions((prev) => [...prev, newSubscription]);
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
