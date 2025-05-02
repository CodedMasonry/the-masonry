// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
	boolean,
	char,
	integer,
	pgTableCreator,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const states = createTable("states", {
	abbreviation: char("abbreviation", { length: 2 }).primaryKey(),
	name: varchar("name", { length: 32 }).unique().notNull(),
});

export const colleges = createTable(
	"colleges",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
		name: varchar("name", { length: 128 }).notNull(),
		domain: varchar("domain", { length: 32 }).notNull(),
		isIvory: boolean("is_ivory").notNull(),
		numEmails: integer("num_emails").notNull(),
		stateAbbr: char("state_abbr", { length: 2 })
			.notNull()
			.references(() => states.abbreviation, { onDelete: "cascade" }),
	},
	(table) => {
		return {
			idxCollegesDomain: uniqueIndex("idx_colleges_domain").on(table.domain),
		};
	},
);
