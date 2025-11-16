import { eq } from "drizzle-orm";
import { db } from "../../db";
import { tables, UserTypeEnum } from "../../db/schema";
import { UserModel } from "./model";
import {status} from "elysia"

export abstract class UserService {
    static async findAll(
        page = 1,
        perPage = 10,
        userType?: UserTypeEnum[number],
    ): Promise<UserModel.UserResponse[]> {
        if (userType) {
            return db
                .select()
                .from(tables.user)
                .where(eq(tables.user.userType, userType))
                .limit(perPage)
                .offset((page - 1) * perPage);
        }
        return await db
            .select()
            .from(tables.user)
            .limit(perPage)
            .offset((page - 1) * perPage);
    }

    static async findById(id: string): Promise<UserModel.UserResponse | null> {
        const user = await db.query.user.findFirst({
            where: eq(tables.user.id, id),
        });

        return user ?? null;
    }
    
}
