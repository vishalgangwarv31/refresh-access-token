import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from './todo.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoService{  
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>){}

    async addTodo(ownerId: string,title : string) : Promise<TodoDocument>{
        const newTodo = new this.todoModel({
            title,
            completed: false,
            owner : new Types.ObjectId(ownerId)
        });
        return await newTodo.save();
    }

    async getTodos(ownerId : string):Promise<TodoDocument[]> {
        const ownerIdObjectId = new Types.ObjectId(ownerId);
        return await this.todoModel.find({owner: ownerIdObjectId}).exec();
    }

    async updateTodo(todoId: string, completed : boolean):Promise<TodoDocument | null>{
        const temp = new Types.ObjectId(todoId);
        
        const currTodo = await this.todoModel.findOneAndUpdate(
            { _id: temp  },
            { $set: { completed: completed } },
            { new: true }  
        ).exec();

        return currTodo
    }

    async deleteTodo(todoId: string): Promise<boolean> { 
        const res = await this.todoModel.deleteOne({_id:new Types.ObjectId(todoId) }).exec();
        return res.deletedCount > 0;
    }
    
}