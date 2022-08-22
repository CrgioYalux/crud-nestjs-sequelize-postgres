import { AppConstant } from '../app.constant';
import { Author } from './author.model';

export const authorProvider = [
    {
        provide: AppConstant.AUTHOR_REPOSITORY,
        useValue: Author 
    }
];