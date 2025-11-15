import { createId } from "@paralleldrive/cuid2";
import {
    AnyPgColumn,
    boolean,
    date,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", [
    "student",
    "responsible",
    "admin",
]);
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const teamStatusEnum = pgEnum("team_status", ["active", "inactive"]);
export const playerStatusEnum = pgEnum("player_status", [
    "active",
    "inactive",
    "pending",
    "rejected",
]);
export const gameStatusEnum = pgEnum("game_status", [
    "pending",
    "active",
    "inactive",
    "finished",
]);
const user = pgTable("user", {
    id: text("id").primaryKey(),
    courseId: text("course_id")
        .notNull()
        .references(() => courses.id),
    profilePicture: text("profile_picture"),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    ra: varchar({ length: 7 }).notNull(),
    userType: userTypeEnum(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    birthDate: date("birth_date"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date())
        .notNull(),
});

const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date())
        .notNull(),
});

const courses = pgTable("courses", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

const modalities = pgTable("modalities", {
    id: text().$defaultFn(() => createId()),
    name: text("name").notNull(),
    description: text("description").notNull(),
    gender: genderEnum("gender").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

const teams = pgTable("teams", {
    id: text().$defaultFn(() => createId()),
    modalityId: text("modality_id").references(() => modalities.id),
    responsibleId: text("responsible_id").references(() => user.id),
    teamPhoto: text("team_photo").notNull(),
    name: text("name").notNull(),
    status: teamStatusEnum("status").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

const players = pgTable("players", {
    id: text().$defaultFn(() => createId()),
    teamId: text("team_id").references(() => teams.id),
    userId: text("user_id").references(() => user.id),
    status: playerStatusEnum("status").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

const games = pgTable("games", {
    id: text().$defaultFn(() => createId()),
    modalityId: text("modality_id").references(() => modalities.id),
    nextGameId: text("next_game_id").references((): AnyPgColumn => games.id),
    team1Id: text("team1_id").references(() => teams.id),
    team2Id: text("team2_id").references(() => teams.id),
    team1Score: integer("team1_score").default(0).notNull(),
    team2Score: integer("team2_score").default(0).notNull(),
    idWinningTeam: text("id_winning_team").references(() => teams.id),
    locale: text().notNull(),
    status: gameStatusEnum("status").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
});

import { relations } from "drizzle-orm";

export const userRelations = relations(user, ({ one, many }) => ({
    course: one(courses, {
        fields: [user.courseId],
        references: [courses.id],
    }),
    sessions: many(session),
    accounts: many(account),
    teams: many(teams),
    players: many(players),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
    users: many(user),
}));

export const modalitiesRelations = relations(modalities, ({ many }) => ({
    teams: many(teams),
    games: many(games),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
    modality: one(modalities, {
        fields: [teams.modalityId],
        references: [modalities.id],
    }),
    responsible: one(user, {
        fields: [teams.responsibleId],
        references: [user.id],
    }),
    players: many(players),
    gamesAsTeam1: many(games, { relationName: "team1" }),
    gamesAsTeam2: many(games, { relationName: "team2" }),
    gamesWon: many(games, { relationName: "winningTeam" }),
}));

export const playersRelations = relations(players, ({ one }) => ({
    team: one(teams, {
        fields: [players.teamId],
        references: [teams.id],
    }),
    user: one(user, {
        fields: [players.userId],
        references: [user.id],
    }),
}));

export const gamesRelations = relations(games, ({ one }) => ({
    modality: one(modalities, {
        fields: [games.modalityId],
        references: [modalities.id],
    }),
    nextGame: one(games, {
        fields: [games.nextGameId],
        references: [games.id],
    }),
    team1: one(teams, {
        fields: [games.team1Id],
        references: [teams.id],
        relationName: "team1",
    }),
    team2: one(teams, {
        fields: [games.team2Id],
        references: [teams.id],
        relationName: "team2",
    }),
    winningTeam: one(teams, {
        fields: [games.idWinningTeam],
        references: [teams.id],
        relationName: "winningTeam",
    }),
}));

export const tables = {
    user,
    session,
    account,
    verification,
    courses,
    modalities,
    teams,
    players,
    games,
} as const;

export type Table = typeof tables;
