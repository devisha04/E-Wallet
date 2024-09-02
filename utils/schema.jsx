import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"; // Added 'integer'

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull()
});

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id), // 'integer' is now imported
    createdAt: varchar('createdAt').notNull(),
});
