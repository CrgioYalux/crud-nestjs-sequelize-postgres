export class CreateAuthorDto {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
};

export class UpdateAuthorDto {
    firstName?: string;
    lastName?: string;
    newUserName?: string;
    newPassword?: string;
};

export class AuthAuthorDto {
    userName: string;
    password: string;
};

export interface GettableAuthorFieldsDto {
    authorID: number;
    userName: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
};