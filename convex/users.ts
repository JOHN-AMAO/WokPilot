import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const createUser = mutation({
  args: {
    userId: v.string(),
    userType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not logged in");
    }
    const userId = identity.subject;
    const user = await ctx.db.insert("Users", {
      userId,
      userType: args.userType,
    });
    return user;
  },
});
