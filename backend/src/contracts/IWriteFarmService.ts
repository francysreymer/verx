import { Farm } from "~/entities/Farm";

export default interface IWriteFarmService {
  createFarm(farm: Farm): Promise<Farm>;
  updateFarm(farm: Farm, id: number): Promise<Farm>;
  deleteFarm(id: number): Promise<boolean>;
}
