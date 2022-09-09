import { Task } from '@/interfaces/task.interface';
import TaskModel from '@/models/task.model';

class TaskService {
  public taskModel = TaskModel;
  
  public async AddTask(task: Task) {
    console.log({ taskModel: this.taskModel });
    return this.taskModel.create({ ...task });
  }
  public async listTasks() {
    return this.taskModel.find();
  }
}

export default TaskService