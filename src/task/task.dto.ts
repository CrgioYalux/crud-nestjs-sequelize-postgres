export class CreateTaskDto {
    title: string;
    archived?: boolean;
    public?: boolean;
    categories?: string[];
};

export class UpdateTaskDto {
    title?: string;
    archived?: boolean;
    public?: boolean;
    categories?: string[];
};

export class FilterTaskDto {
    taskID?: number;
    authorID?: number;
    categories?: string[];
    archived?: boolean;
    public?: boolean;
};

export interface GettableTaskFieldsDto {
    taskID: number;
    title: string;
    archived: boolean;
    public: boolean;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
    authorID: number;
};
