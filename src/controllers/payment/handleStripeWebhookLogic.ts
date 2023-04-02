/*
	if succeeded:
		1. get uid, customer id and subscription id
		2. use uid to find/create payment history
		3. paymentInvoice: create payment invoice with incoming stripe data
		4. paymentHistory: update/create payment history, add invoice into array
		5. userAccount: set user isSubscribe to TRUE
		6. send successful email

	if failed:
		1. get uid
		2. use uid to get payment history
		3. paymentInvoice: create invoice
		4. paymentHistory: customer id and subscription if set to null, add invoice
		5. userAccount: set user isSubscribe to FALSE
		6. send unsuccessful email
*/