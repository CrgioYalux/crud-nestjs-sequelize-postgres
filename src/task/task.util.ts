import { FindOptions, Op, Sequelize } from 'sequelize';
import { FilterTaskDto } from './task.dto';

export const filterTaskSearch = (filter?: FilterTaskDto): FindOptions<any> | undefined => {
  if (filter) {
    const findOptions: FindOptions<any> = { };

    if (filter.authorID !== undefined) {
      findOptions.where = {
        ...findOptions.where,
        authorAuthorID: filter.authorID
      };
    }

    if (filter.taskID !== undefined) {
      findOptions.where = {
        ...findOptions.where,
        taskID: filter.taskID
      };
    }

    if (filter.public !== undefined) {
      findOptions.where = {
        ...findOptions.where,
        public: filter.public
      };
    }

    if (filter.archived !== undefined) {
      findOptions.where = {
        ...findOptions.where,
        archived: filter.archived
      };
    }

    if (filter.categories !== undefined) {
      findOptions.where = {
        ...findOptions.where,
        categories: {
          [Op.match]: Sequelize.fn('to_tsquery', filter.categories.join(' & '))
        }
      };
    }

    return findOptions;
  }
  return undefined;
};