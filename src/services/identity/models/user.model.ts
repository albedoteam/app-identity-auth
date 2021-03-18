import { ProviderEnum } from "src/services/models/provider.enum";

export class UserModel {
    id!: string;
    accountId!: string;
    userTypeId!: string;
    username!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    active!: boolean;
    customProfileFields!: { [key: string]: string };
    groups!: [string];
    provider!: ProviderEnum;
    usernameAtProvider!: string;
    providerId!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;
    deletedAt!: Date;
}