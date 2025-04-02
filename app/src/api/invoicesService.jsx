import axios from './api.js';

export const getInvoiceById = async (invoice) => {
    try {
        const response = await axios.get(`/invoices/${invoice}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getUserInvoices = async () => {
    try {
        const response = await axios.get("/invoices");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createInvoice = async (data) =>{
    try {
        const response = await axios.post('/invoices', data)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

//descargar factura en pdf
export const downloadInvoicePDF = async (invoice) => {
    try {
        const response = await axios.get(`/invoices/${invoice}/pdf`, {
            responseType: "blob",
        });

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = `factura_${invoice}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateInvoiceStatus = async (invoiceId, data) => {
    try {
        const response = await axios.patch(`/invoices/${invoiceId}/status`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};