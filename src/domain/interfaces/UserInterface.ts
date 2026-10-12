import type { UserAttributes } from "../entities/User";

export type UserInput = Omit<UserAttributes, "id">;

export type UserUpdateInput = Partial<Omit<UserAttributes, "id">>;
