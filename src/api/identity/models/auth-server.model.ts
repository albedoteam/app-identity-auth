import { ProviderEnum } from "src/api/base/provider.enum";

export class AuthServerModel {
    id!: string;
    accountId!: string;
    name!: string;
    audience!: string;
    description!: string;
    issuer!: string;
    authUrl!: string;
    accessTokenUrl!: string;
    clientId!: string;
    basicScopes!: [string];
    active!: true;
    provider!: ProviderEnum;
    providerId!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: true;
    deletedAt!: Date;
}