import { Task } from '@/interfaces/task.interface';
import TaskService from '@/services/task.service';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

const taskService = new TaskService();

const taskController = {
  async addTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task: Task = req.body;
      const createdTask = await taskService.AddTask(task);
      res.status(200).json(_.omit(createdTask.toJSON(), '_id'));
    } catch (err) {
      next(err);
    }
  },
  async listTasks(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(this);
      const tasks = (await taskService.listTasks()).map((e) =>
        _.omit(e.toJSON(), '_id')
      );
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  },
};

export default taskController;
