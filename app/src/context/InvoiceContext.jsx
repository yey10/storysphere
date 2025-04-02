import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getInvoiceById, getUserInvoices, createInvoice, downloadInvoicePDF, updateInvoiceStatus  } from "../api/invoicesService";

const InvoiceContext = createContext();

export const InvoiceProvider = ({children}) => {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchInvoices = useCallback(async (forceReload = false) => {
        if (!forceReload && invoices.length > 0) return;
        setIsLoading(true);
        try {
            const data = await getUserInvoices();
            setInvoices(data);
        } catch (error) {
            console.error("Error al obtener facturas:", error);
        } finally {
            setIsLoading(false);
        }
    }, [invoices]);

    useEffect(() => {
        if (!hasFetched) {
            setHasFetched(true);
            fetchInvoices();
        }
    }, [hasFetched, fetchInvoices]);

    const addInvoice = async (data) => {
        try {
            const newInvoice = await createInvoice(data);
            setInvoices((prev) => [...prev, newInvoice]);
        } catch (error) {
            console.error("Error al crear la factura:", error);
        }
    };

    const fetchInvoiceById = async (invoiceId) => {
        try {
            return await getInvoiceById(invoiceId);
        } catch (error) {
            console.error("Error al obtener la factura:", error);
            throw error;
        }
    };

    const downloadInvoice = async (invoiceId) => {
        try {
            await downloadInvoicePDF(invoiceId);
        } catch (error) {
            console.error("Error al descargar la factura:", error);
        }
    };

    const updateInvoice = async (invoiceId, statusData) => {
        try {
            const updatedInvoice = await updateInvoiceStatus(invoiceId, statusData);
            setInvoices((prev) =>
                prev.map((invoice) =>
                    invoice.id_invoice === invoiceId ? { ...invoice, ...updatedInvoice } : invoice
                )
            );
        } catch (error) {
            console.error("Error al actualizar la factura:", error);
            throw error;
        }
    };

    return (
        <InvoiceContext.Provider value={{
            invoices,
            isLoading,
            fetchInvoices,
            addInvoice,
            fetchInvoiceById,
            downloadInvoice,
            updateInvoice
        }}>
            {children}
        </InvoiceContext.Provider>
    );
}

export const useInvoice = () => useContext(InvoiceContext);
