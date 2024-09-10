import { Farm } from "~/entities/Farm";

export default interface IWriteFarmRepository {
  save(farm: Farm, id?: number): Promise<Farm>;
  delete(id: number): Promise<boolean>;
}
