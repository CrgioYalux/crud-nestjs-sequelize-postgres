import { AppConstant } from '../app.constant';
import { Injectable, Inject, NestMiddleware, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthAuthorDto } from './author.dto';
import { Author } from './author.model';
import { verifyHashedPassword } from './author.util';

@Injectable()
export class AuthAuthorMiddleware implements NestMiddleware {
  constructor(
    @Inject(AppConstant.AUTHOR_REPOSITORY)
    private authorRepository: typeof Author 
  ) {};
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const { userName, password } = req.body as AuthAuthorDto;
    const authorID = Number(req.params.authorID) as number;

    this.authorRepository.findOne<Author>({
      where: { userName, authorID }
    })
    .then((found) => {
      if (found) {
        const verify = password + found.salt;
        return verifyHashedPassword(found.password, verify)
        .then((verified) => {
          if (verified) return next();
          res.status(400).json({ message: 'incorrect userName or password' }).end();
        })
      }
      res.status(404).json({ message: 'no author found' }).end();
    })
    .catch(() => {
      res.status(500).json({ message: 'unable to authenticate' }).end();
    })
  };
};