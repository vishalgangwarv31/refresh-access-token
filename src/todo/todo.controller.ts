import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController{
    
    constructor(private readonly todoService : TodoService,){}

    @Post('add')
    async addTodo(
        @Body('title') title : string,
        @Req() req:Request
    ){
        const ownerId = req['userId']
        const res = await this.todoService.addTodo( ownerId, title  );
        if(res) {
            return {message : "todo added"}
        } else {
            return { message : "error in add todo"}
        }
    }

    @Get('/all')
    async getTodo(
        @Req() req: Request
    ){
        const ownerId = req['userId']
        console.log(typeof(ownerId))
        const res = await this.todoService.getTodos(ownerId);
        return res;
    }

    @Put(':id')
    async updateTodo(
        @Param('id') todoId : string,
        @Body('completed') completed : boolean
    ){
        const updatedTodo = await this.todoService.updateTodo(  todoId , completed ) 
        return { message: 'Todo updated successfully', updatedTodo };    
    }

    @Delete(':id')
    async deleteTodo(
        @Param('id') todoId: string,
    ) {
        const deleted = await this.todoService.deleteTodo(todoId);
        return { message: deleted ? 'Todo deleted successfully' : 'Todo not found' };
    }

}