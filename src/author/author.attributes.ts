import { FindAttributeOptions, Includeable } from "sequelize/types";
import { Author } from './author.model';

export const attributes: FindAttributeOptions = [
  ['pk_author_id','authorID'],
  ['user_name','userName'],
  ['first_name','firstName'],
  ['last_name','lastName'],
  ['created_at','createdAt'],
  ['updated_at','updatedAt']
];

export const attibutesInTask: FindAttributeOptions = [
  ['user_name','userName'],
  ['first_name','firstName'],
  ['last_name','lastName'],
];

export const includeInTask: Includeable =  {
  model: Author,
  as: 'author',
  attributes: attibutesInTask
};