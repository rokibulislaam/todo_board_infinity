import { Task, TaskDocument } from '../interfaces/task.interface';
import mongoose, { Schema } from 'mongoose';

const taskSchema: Schema = new Schema(
  {
    taskName: String,
    creator: String,
    taskDesc: String,
    duration: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel;
