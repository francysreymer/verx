import { PercentageByCropType } from '@/common/PercentageByCropType';
import { PercentageByLandUse } from '@/common/PercentageByLandUse';
import { PercentageByState } from '@/common/PercentageByState';
import { Farm } from '@/entities/Farm';

export default interface IReadFarmRepository {
  findAll(): Promise<Farm[]>;
  findOneById(id: number): Promise<Farm | null>;
  getTotalOfFarms(): Promise<number>;
  getTotalArea(): Promise<number>;
  getPercentageByState(): Promise<PercentageByState[]>;
  getPercentageByCropType(): Promise<PercentageByCropType[]>;
  getPercentageByLandUse(): Promise<PercentageByLandUse[]>;
}
