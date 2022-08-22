import { Controller, HttpCode, Get, Param, Post, Body, Res, Put } from '@nestjs/common';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';
import { Response } from 'express';

@Controller('api/task')
export class AuthenticatedTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('author/:authorID')
  @HttpCode(200)
  findAllFromAuthor(
    @Param('authorID') authorID: number,
    @Body() filterTaskDto?: FilterTaskDto
  ) {
    return this.taskService.findAllFromAuthor({...filterTaskDto, authorID});
  }

  @Get(':taskID/author/:authorID')
  @HttpCode(200)
  findOneFromAuthor(
    @Param('authorID') authorID: number,
    @Param('taskID') taskID: number,
    @Res() res: Response,
    @Body() filterTaskDto?: FilterTaskDto
  ) {
    this.taskService.findOneFromAuthor({...filterTaskDto, authorID, taskID})
      .then((found) => {
        res.status(found ? 302 : 404).json({found}).end();
      })
      .catch((error) => {
        res.status(500).json({message: error}).end();
      })
  };

  @Post('author/:authorID')
  create(
    @Param('authorID') authorID: number,
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: Response
  ) {
    if (
      createTaskDto.title !== undefined
    ) {
      return this.taskService.create(authorID, createTaskDto)
        .then((created) => {
          res.status(201).json({created}).end();
        })
        .catch((error) => {
          res.status(500).json({message: error}).end();
        })
    }
    res.status(400).json({message: 'there is empty required fields'}).end();
  };

  @Put(':taskID/author/:authorID')
  update(
    @Param('authorID') authorID: number,
    @Param('taskID') taskID: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response
  ) {
    if (
      updateTaskDto.title !== undefined
      || updateTaskDto.archived !== undefined
      || updateTaskDto.public !== undefined
      || updateTaskDto.categories !== undefined
    ) {
      return this.taskService.update(authorID, taskID, updateTaskDto)
        .then((updated) => {
          res.status(updated ? 200 : 404).json({updated}).end();
        })
        .catch((error) => {
          res.status(500).json({message: error}).end();
        })
     }
    res.status(400).json({message: 'there is no data to update'}).end();
  };

}

@Controller('api/task')
export class UnauthenticatedTaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  @HttpCode(200)
  findAllPublic(
    @Body() filterTaskDto?: FilterTaskDto
  ) {
    return this.taskService.findAllPublic(filterTaskDto);
  };

  @Get(':taskID')
  findOnePublic(
    @Param('taskID') taskID: number,
    @Res() res: Response,
    @Body() filterTaskDto?: FilterTaskDto
  ) {
    this.taskService.findOnePublic({...filterTaskDto, taskID})
    .then((found) => {
      res.status(found ? 302 : 404).json({found}).end();
    })
    .catch((error) => {
      res.status(500).json({message: error}).end();
    })
  };

}
