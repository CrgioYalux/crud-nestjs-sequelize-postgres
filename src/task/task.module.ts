import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthenticatedTaskController, UnauthenticatedTaskController } from './task.controller';
import { TaskService } from "./task.service";
import { taskProvider } from './task.provider';
import { AuthAuthorMiddleware } from '../author/author.middleware';
import { authorProvider } from '../author/author.provider';

@Module({
    imports: [],
    controllers: [
        UnauthenticatedTaskController,
        AuthenticatedTaskController
    ],
    providers: [
        TaskService,
        ...authorProvider,
        ...taskProvider
    ],
})
export class TaskModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthAuthorMiddleware)
			.forRoutes(AuthenticatedTaskController);
	};
};