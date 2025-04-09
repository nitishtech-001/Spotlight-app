import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import {Webhook} from "svix";
import {api} from "./_generated/api";

const http = httpRouter();

http.route({
	path : "/clerk-webhook",
	method : "POST",
	handler : httpAction(async (ctx,req)=>{
		const webhooksecret = process.env.CLERK_WEBHOOK_SECRET;
		if(!webhooksecret){
			console.error("Missing clerk webhook secret key");
			return new Response("Missing CLERK_WEBHOOK_SECRET environmental variable",{status : 404});
		}

		// check headers
		const svix_id = req.headers.get("svix-id");
		const svix_signature = req.headers.get("svix-signature");
		const svix_timestamp = req.headers.get("svix-timestamp");

		if(!svix_id || !svix_signature || !svix_timestamp){
			console.log(svix_id)
			console.log(svix_signature)
			console.log(svix_timestamp)  // this is showing null value why
			return new Response("Error occured - no svix headres!",{
				status : 400
			});	
		}

		const payload = await req.json();
		const body = JSON.stringify(payload);

		const wh = new Webhook(webhooksecret);

		let evt : any;
		try{
			evt = wh.verify(body,{
				"svix-id" : svix_id,
				"svix-signature" : svix_signature,
				"svix-timestamp" : svix_timestamp
			}) as any;
		}catch(error){
			console.error("Error Verifying webhook : ",error);
			return new Response("Error occured",{status : 400});
		}

		const eventType = evt.type;
		if(eventType === "user.created"){
			const {id, email_addresses,first_name, last_name, image_url} = evt.data;

			const email = email_addresses[0].email_address;
			const name = `${first_name || ""} ${last_name || ""}`.trim();

			try{
				await ctx.runMutation(api.users.createUser,{
					email,
					fullname : name,
					avatar : image_url,
					clerkId : id,
					username : email.split("@")[0],
				})
			}catch(error){
				console.error("Error creating user : ",error);
				return new Response("Error creating user",{
					status : 500,
				})
			}

			return new Response("Webhook processed succesfully",{status : 200});

		}
		return new Response("EventType not Handled",{status : 404});

	})
})

export default http;

