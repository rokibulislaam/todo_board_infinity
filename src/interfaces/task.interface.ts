import mongoose from "mongoose";

export interface Task {
  taskName: string;
  taskDesc: string;
  creator: string;
  duration: number;
  status: "completed" | "expired"
}


export interface TaskDocument extends Task, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}