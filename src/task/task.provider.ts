import { AppConstant } from '../app.constant';
import { Task } from './task.model';

export const taskProvider = [
    {
        provide: AppConstant.TASK_REPOSITORY,
        useValue: Task
    }
];