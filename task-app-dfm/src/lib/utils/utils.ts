import { Task } from '../../models/task/task';

export class Utils {
  static taskType: string = 'dfm';

  static checkTaskType(task: Task): boolean {
    return task.taskType === this.taskType;
  }
}
