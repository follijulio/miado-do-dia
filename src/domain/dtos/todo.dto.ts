import { Model } from "../model";

interface Todo extends Model {
  title: string;
  description?: string;
  deadline?: Date;
  creation: Date;
  finished: boolean;
}

export default Todo;
