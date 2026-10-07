const invoiceApi = {};

invoiceApi.createInvoiceEndpoint = "invoices";
invoiceApi.listInvoicesEndpoint = "invoices";
invoiceApi.getInvoiceEndpoint = (invoiceId) => `invoices/${invoiceId}`;

module.exports = invoiceApi;
