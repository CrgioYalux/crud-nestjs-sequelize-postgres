import { FindAttributeOptions } from "sequelize/types";

export const attributes: FindAttributeOptions = [
    ['pk_task_id','taskID'],
    'title',
    'archived',
    'public',
    'categories',
    ['created_at', 'createdAt'],
    ['updated_at', 'updatedAt']
];