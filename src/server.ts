import { App } from './app';
import TasksRoute from '@routes/task.route';
const app = new App([new TasksRoute()]);
app.startServer();