
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
  args: { 
	username : v.string(),
	fullname : v.string(),
	email : v.string(),
	bio : v.optional(v.string()),
	avatar : v.string(),
	clerkId : v.string(),
   },
  handler: async (ctx, args) => {

	// checking that user already in our database or not
	const existingUser = await ctx.db.query("users").withIndex("by_clerk_id",q => q.eq("clerkId",args.clerkId)).first();

	if(existingUser){
		return ;
	}
    const newTaskId = await ctx.db.insert("users", { 
		username : args.username,
		fullname : args.fullname,
		email : args.email,
		bio : args.bio,
		avatar : args.avatar,
		followers : 0,
		following : 0,
		posts : 0,
		clerkId : args.clerkId,
	 });
    return newTaskId;
  },
});