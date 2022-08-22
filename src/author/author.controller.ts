import { Controller, Param, HttpCode, Body, Get, Post, Res, Delete, Put } from '@nestjs/common';
import { Response } from 'express';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('api/author')
export class AuthenticatedAuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Put(':authorID')
  update(
    @Param('authorID') authorID: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Res() res: Response
  ) {
    if (
      updateAuthorDto.firstName !== undefined
      || updateAuthorDto.lastName !== undefined
      || updateAuthorDto.newUserName !== undefined
      || updateAuthorDto.newPassword !== undefined
    ) {
      return this.authorService.update(authorID, updateAuthorDto)
        .then((updated) => {
          res.status(updated ? 200 : 404).json({updated}).end();
        })
        .catch((error) => {
          res.status(500).json({message: error}).end();
        })
    }
    res.status(400).json({message: 'there is no data to update'}).end();
  }

  @Delete(':authorID')
  destroy(
    @Param('authorID') authorID: number,
    @Res() res: Response
  ) {
    return this.authorService.destroy(authorID)
      .then((deleted) => {
        res.status(deleted ? 200 : 404).end();
      })
      .catch((error) => {
        res.status(500).json({message: error}).end();
      })
  }
};

@Controller('api/author')
export class UnauthenticatedAuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('')
  @HttpCode(200)
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':authorID')
  findOne(
    @Param('authorID') authorID: number,
    @Res() res: Response
  ) {
    this.authorService.findOne(authorID)
    .then((found) => {
      res.status(found ? 302 : 404).json({found}).end();
    })
    .catch((error) => {
      res.status(500).json({message: error}).end();
    })
  }

  @Post('')
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @Res() res: Response
  ) {
    if (
      createAuthorDto.firstName !== undefined
      && createAuthorDto.lastName !== undefined
      && createAuthorDto.userName !== undefined
      && createAuthorDto.password !== undefined
    ) {
      return this.authorService.create(createAuthorDto)
        .then((created) => {
          res.status(201).json({created}).end();
        })
        .catch((error) => {
          res.status(500).json({message: error}).end();
        })
    }
    res.status(400).json({message: 'there is empty required fields'}).end();
  }
}
