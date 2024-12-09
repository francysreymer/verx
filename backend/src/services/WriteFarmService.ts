import createError from 'http-errors';

import IReadFarmRepository from '@/contracts/IReadFarmRepository';
import IWriteFarmRepository from '@/contracts/IWriteFarmRepository';
import IWriteFarmService from '@/contracts/IWriteFarmService';
import { Farm } from '@/entities/Farm';

export class WriteFarmService implements IWriteFarmService {
  private writeFarmRepository: IWriteFarmRepository;
  private readFarmRepository: IReadFarmRepository;

  constructor(
    writeFarmRepository: IWriteFarmRepository,
    readFarmRepository: IReadFarmRepository,
  ) {
    this.writeFarmRepository = writeFarmRepository;
    this.readFarmRepository = readFarmRepository;
  }

  async createFarm(farm: Farm): Promise<Farm> {
    return await this.writeFarmRepository.save(farm);
  }

  async updateFarm(farm: Farm, id: number): Promise<Farm> {
    const findFarm = await this.readFarmRepository.findOneById(id);
    if (!findFarm) {
      throw new createError.NotFound('Farm not found');
    }

    return await this.writeFarmRepository.save(farm, id);
  }

  async deleteFarm(id: number): Promise<boolean> {
    const findFarm = await this.readFarmRepository.findOneById(id);
    console.log('findFarm: ', findFarm);
    if (!findFarm) {
      throw new createError.NotFound('Farm not found');
    }

    return await this.writeFarmRepository.delete(id);
  }
}
