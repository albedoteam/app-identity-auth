export class PasswordRecoveryModel {
    id!: string;
    accountId!: string;
    userId!: string;
    validationToken!: string;
    expiresAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;
    isDeleted!: boolean;
    deletedAt!: Date;
}