import { t } from "elysia";
import { tables } from "../../db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export namespace UserModel {
    const _createUser = createInsertSchema(tables.user, {
        email: t.String({ format: "email" }),
    });

    const _userResponse = createSelectSchema(tables.user);

    export const createUserBody = t.Omit(_createUser, [
        "id",
        "createdAt",
        "updatedAt",
    ]);

    export const userResponse = t.Omit(_userResponse, ["password"]);

    export type UserResponse = typeof userResponse.static;
    export type UserRequest = typeof createUserBody.static;
}
