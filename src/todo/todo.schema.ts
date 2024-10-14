import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>

@Schema()
export class Todo{
    @Prop({required : true})
    title: string

    @Prop({required: true})
    completed: boolean

    @Prop({type:Types.ObjectId, ref:'User', required:true})
    owner: Types.ObjectId
}

export const TodoSchema = SchemaFactory.createForClass(Todo)