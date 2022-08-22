import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UnauthenticatedAuthorController, AuthenticatedAuthorController } from './author.controller';
import { AuthorService } from "./author.service";
import { authorProvider } from './author.provider';
import { AuthAuthorMiddleware } from "./author.middleware";

@Module({
	imports: [],
	controllers: [
		UnauthenticatedAuthorController,
		AuthenticatedAuthorController
	],
	providers: [
		AuthorService,
		...authorProvider
	],
})
export class AuthorModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthAuthorMiddleware)
			.forRoutes(AuthenticatedAuthorController);
	};
};