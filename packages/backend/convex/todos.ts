import { v } from "convex/values";
import { userQuery, userMutation } from "./functions";

export const getAll = userQuery({
	handler: async (ctx) => {
		return await ctx.db.query("todos").withIndex("by_user", (q) => q.eq("userId", ctx.user?.id!)).collect();
	},
});

export const create = userMutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const newTodoId = await ctx.db.insert("todos", {
			userId: args.userId!,
			text: args.text,
			completed: false,
		});
		return await ctx.db.get(newTodoId);
	},
});

export const toggle = userMutation({
	args: {
		id: v.id("todos"),
		completed: v.boolean(),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { completed: args.completed, userId: args.userId! });
		return { success: true };
	},
});

export const deleteTodo = userMutation({
	args: {
		id: v.id("todos"),
	},
	handler: async (ctx, args) => {
		const existingTodo = await ctx.db.get(args.id);
		if (!existingTodo) {
			throw new Error("Todo not found");
		}
		if (existingTodo.userId !== args.userId!) {
			throw new Error("Unauthorized");
		}
		await ctx.db.delete(args.id);
		return { success: true };
	},
});
