import { int } from 'drizzle-orm/mysql-core';
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const run = pgTable('run', {
  code: serial('code').primaryKey(),
  name: varchar('name', {
    length: 128,
  }).notNull(),
  whyBlood: varchar('why_blood', {
    length: 1024,
  }).notNull(),
  whyKnife: varchar('why_knife', {
    length: 1024,
  }).notNull(),
  whatYouDone: varchar('what_you_done', {
    length: 1024,
  }).notNull(),
  hadKilled: boolean('had_killed').notNull(),
  beenKilled: boolean('been_killed'),
  link: integer('link').references((): AnyPgColumn => link.id),
});

export const link = pgTable('link', {
  id: serial('id').primaryKey(),
  judge: integer('judge').references((): AnyPgColumn => run.code),
  accused: integer('accused').references((): AnyPgColumn => run.code),
});
