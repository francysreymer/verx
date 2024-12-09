import createError from 'http-errors';

import { FarmDashboard } from '@/common/FarmDashboard';
import IReadFarmRepository from '@/contracts/IReadFarmRepository';
import IReadFarmService from '@/contracts/IReadFarmService';
import { Farm } from '@/entities/Farm';

export class ReadFarmService implements IReadFarmService {
  private readFarmRepository: IReadFarmRepository;

  constructor(readFarmRepository: IReadFarmRepository) {
    this.readFarmRepository = readFarmRepository;
  }

  async getFarms(): Promise<Farm[]> {
    return await this.readFarmRepository.findAll();
  }

  async getFarmById(id: number): Promise<Farm | null> {
    const farm = await this.readFarmRepository.findOneById(id);
    if (!farm) {
      throw new createError.NotFound('Farm not found');
    }

    return farm;
  }

  async getFarmDashboards(): Promise<FarmDashboard> {
    const [
      totalOfFarms,
      totalArea,
      percentageByState,
      percentageByCropType,
      percentageByLandUse,
    ] = await Promise.all([
      this.readFarmRepository.getTotalOfFarms(),
      this.readFarmRepository.getTotalArea(),
      this.readFarmRepository.getPercentageByState(),
      this.readFarmRepository.getPercentageByCropType(),
      this.readFarmRepository.getPercentageByLandUse(),
    ]);

    return {
      totalOfFarms,
      totalArea,
      percentageByState,
      percentageByCropType,
      percentageByLandUse,
    };
  }
}
