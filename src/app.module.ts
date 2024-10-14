import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    UserModule,
    TodoModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        try {
          return {
            uri: 'mongodb+srv://admin:12345@cluster0.ul6st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
          };
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          throw new Error('Could not connect to MongoDB');
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
