import { AppConstant } from '../app.constant';
import { Inject, Injectable } from '@nestjs/common';
import { Error } from 'sequelize';
import { Author } from './author.model';
import { hashPassword } from './author.util';
import { CreateAuthorDto, UpdateAuthorDto, type GettableAuthorFieldsDto } from './author.dto';
import { attributes } from './author.attributes';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(AppConstant.AUTHOR_REPOSITORY)
    private authorRepository: typeof Author 
  ) {};

  async findAll(): Promise<Author[]> {
    return this.authorRepository.findAll<Author>({ attributes });
  };

  async findOne(authorID: number): Promise<Author | null> {
    return this.authorRepository.findOne<Author>({
      where: {
        authorID
      },
      attributes 
    }); 
  };

  async create(createAuthorDto: CreateAuthorDto): Promise<GettableAuthorFieldsDto> {
    return new Promise((resolve, reject) => {
      hashPassword(createAuthorDto.password, 32)
        .then(({ hash, salt }) => {
          this.authorRepository.create<Author>({
            firstName: createAuthorDto.firstName,
            lastName: createAuthorDto.lastName,
            userName: createAuthorDto.userName,
            password: hash,
            salt
          })
            .then((created) => {
              resolve({
                authorID: created.authorID,
                firstName: created.firstName,
                lastName: created.lastName,
                userName: created.userName,
                createdAt: created.createdAt,
                updatedAt: created.updatedAt
              });
            })
            .catch((error: Error) => {
              if (error.name === 'SequelizeUniqueConstraintError') {
                reject('username already taken');
              } else reject(error.name)
            })
        })
        .catch(reject)
    });
  };

  async destroy(authorID: number): Promise<number> {
    return this.authorRepository.destroy<Author>({
      where: {
        authorID
      }
    });
  };

  async update(authorID: number, updateAuthorDto: UpdateAuthorDto): Promise<Author | null> {
    return new Promise((resolve, reject) => {
      this.authorRepository.findOne<Author>({
        where: {
          authorID
        },
        attributes
      })
        .then(async (existant) => {
          if (existant) {
            existant.firstName = updateAuthorDto.firstName ?? existant.firstName;
            existant.lastName = updateAuthorDto.lastName ?? existant.lastName;
            existant.userName = updateAuthorDto.newUserName ?? existant.userName;
            if (updateAuthorDto.newPassword) {
              await hashPassword(updateAuthorDto.newPassword, 32)
                .then(({ hash, salt }) => {
                  existant.password = hash;
                  existant.salt = salt;
                })
                .catch(reject)
            }
            existant.save()
              .then(resolve)
              .catch((error: Error) => {
                reject(error.name);
              });
          } else resolve(null);
        })
        .catch((error: Error) => {
          reject(error.name);
        })
    });
  };
};