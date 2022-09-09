import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import taskController from '@/controllers/task.controller';

class TasksRoute implements Routes {
  public path = '/';
  public router: Router = Router();

  constructor() {
    this.router.post(`${this.path}add`, taskController.addTask);
    this.router.get(`${this.path}list`, taskController.listTasks);
  }
}

export default TasksRoute;
