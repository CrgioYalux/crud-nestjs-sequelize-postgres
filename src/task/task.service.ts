import { AppConstant } from '../app.constant';
import { attributes } from './task.attributes';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { includeInTask } from 'src/author/author.attributes';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto, type GettableTaskFieldsDto } from './task.dto';
import { filterTaskSearch } from './task.util';

@Injectable()
export class TaskService {
  constructor(
    @Inject(AppConstant.TASK_REPOSITORY)
    private taskRepository: typeof Task
  ) {};


  async findAllPublic(filterTaskDto?: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.findAll<Task>({
      ...filterTaskSearch(filterTaskDto),
      attributes,
      include: includeInTask
    });
  };

  async findOnePublic(filterTaskDto: FilterTaskDto): Promise<Task | null> {
    return this.taskRepository.findOne<Task>({
      ...filterTaskSearch(filterTaskDto),
      attributes,
      include: includeInTask
    });
  };

  async findAllFromAuthor(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.findAll({
      ...filterTaskSearch(filterTaskDto),
      attributes,
      include: includeInTask
    });
  };

  async findOneFromAuthor(filterTaskDto: FilterTaskDto): Promise<Task | null> {
    return this.taskRepository.findOne({
    ...filterTaskSearch(filterTaskDto),
      attributes,
      include: includeInTask
    });
  };

  async create(authorID: number, createTaskDto: CreateTaskDto): Promise<GettableTaskFieldsDto> {
    return new Promise((resolve, reject) => {
      this.taskRepository.create(
        {
          ...createTaskDto,
           authorAuthorID: authorID
        },
        {
          include: includeInTask,
        }
       )
        .then((created) => {
          resolve({
            taskID: created.taskID,
            title: created.title,
            archived: created.archived,
            public: created.public,
            categories: created.categories,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
            authorID: created.authorAuthorID
          });
        })
        .catch((error: Error) => {
          reject(error.name)
        })
    });
  };

  async destroy(authorID: number, taskID: number): Promise<number> {
    return this.taskRepository.destroy<Task>({
      where: {
        taskID,
        authorAuthorID: authorID
      }
    });
  };

  async destroyAllFromAuthor(authorID: number): Promise<number> {
    return this.taskRepository.destroy<Task>({
      where: {
        authorAuthorID: authorID
      }
    });
  };

  async update(authorID: number, taskID: number, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return new Promise((resolve, reject) => {
      this.taskRepository.findOne<Task>({
        where: {
          taskID,
          authorAuthorID: authorID
        },
        attributes,
        include: includeInTask
      })
        .then((existant) => {
          if (existant) {
            existant.title = updateTaskDto.title ?? existant.title;
            existant.archived = updateTaskDto.archived ?? existant.archived;
            existant.public = updateTaskDto.public ?? existant.public;
            existant.categories = [...updateTaskDto.categories ?? existant.categories];
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
