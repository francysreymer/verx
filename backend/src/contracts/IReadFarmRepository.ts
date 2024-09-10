import { Farm } from "~/entities/Farm";

export default interface IReadFarmRepository {
  findAll(): Promise<Farm[]>;
  findOneById(id: number): Promise<Farm | null>;
  getTotalOfFarms(): Promise<number>;
  getTotalArea(): Promise<number>;
  getPercentageByState(): Promise<any>;
  getPercentageByCropType(): Promise<any>;
  getPercentageByLandUse(): Promise<any>;
}
