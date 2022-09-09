import { Task } from '../interfaces/task.interface';
import TaskModel from '../models/task.model';
import agenda from '../schedulers/agenda.scheduler';

class TaskService {
  public taskModel = TaskModel;
  constructor() {
    agenda.define('removeTask', async (job: any) => {
      // console.log(job.attr.data)
      // console.log(job.attrs.data.id)
      this.removeTaskById(job.attrs.data.id);
    });
  }

  public async AddTask(task: Task) {
    const createdTask = this.taskModel.create({ ...task }).then((res) => {
      agenda.schedule(
        new Date(new Date().getTime() + task.duration),
        'removeTask',
        {
          id: res._id,
        }
      );
      return res;
    });

    return createdTask;
  }
  public async listTasks() {
    return this.taskModel.find();
  }

  public async removeTaskById(id: string) {
    this.taskModel.find({ _id: id }).remove().exec();
  }
}

export default TaskService;
