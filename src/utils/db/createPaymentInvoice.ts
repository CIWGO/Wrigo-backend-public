import InvoiceModel from "../../models/payment/paymentInvoice";

const createPaymentInvoice = async (invoiceId, createdDate, paymentMethod, paymentAmount, status) => {
	const paymentInvoice = new InvoiceModel({
		invoiceId,
		createdDate,
		paymentMethod,
		paymentAmount,
		status
	});
	return paymentInvoice;
};

export { createPaymentInvoice };