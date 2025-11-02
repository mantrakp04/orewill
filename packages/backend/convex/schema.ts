import { defineSchema } from "convex/server";
import { Infer, v } from "convex/values";
import { Table } from "convex-helpers/server";

export const Todos = Table("todos", {
	userId: v.string(),
	text: v.string(),
	completed: v.boolean(),
});
export type TTodos = Infer<typeof Todos.doc>;

export default defineSchema({
	todos: Todos.table
		.index("by_user", ["userId"])
});
