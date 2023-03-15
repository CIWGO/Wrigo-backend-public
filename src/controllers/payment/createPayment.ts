// import { Request, Response } from "express";
import { Request,Response } from "express";
import { Stripe } from "stripe";
// import { userAccount} from "../../models/index";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// const storeItems: Map<number, { priceInCents: number, name: string }> = new Map([
// 	[1, { priceInCents: 10000, name: "Learn React Today" }],
// 	[2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);
// interface Item {
//   id: string;
//   quantity: number;
// }

// interface PaymentRequestBody {
//   items: Item[];
// }
// < PaymentRequestBody>
const priceInCents = 10000;
const createPayment = async (req: Request, res: Response) => {
  
	try {
		const { items } = req.body;
		const { id, quantity } = items[0];
		console.log(items);
		console.log(quantity);

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: id,
						},
						unit_amount: priceInCents * quantity,
					},
					quantity: 1,
				},
			],
			success_url: "http://localhost:3000/user/success/success",
			cancel_url: "http://localhost:3000/user/success/cancel",
		});
		res.status(200).json({ url: session.url });
	} catch (error) {
		console.error(error);
		res.status(500).send("???");
	}
	// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	// 	apiVersion: "2022-11-15",
	// });
	// try {
	// 	console.log("hii");
	// 	console.log(process.env.STRIPE_SECRET_KEY);
	// 	const session = await stripe.checkout.sessions.create({
	// 		payment_method_types: ["card"],
	// 		line_items: [
	// 			{
	// 				price_data: {
	// 					currency: "usd",
	// 					product_data: {
	// 						name: "T-shirt",
	// 					},
	// 					unit_amount: 9,
	// 				},
	// 				quantity: 1,
	// 			},
	// 		],
	// 		mode: "payment",
	// 		success_url: "http://localhost:3000/user/success",
	// 		cancel_url: "http://localhost:3000/user/cancel",
	// 	});

	// 	res.json(session);
	// } catch (err) {
	// 	console.error(err);
	// 	res.status(500).json({ error: "Something went wrong" });
	// }
};

export default createPayment;
