import { Farm } from "~/entities/Farm";
import IWriteFarmRepository from "~/contracts/IWriteFarmRepository";
import IWriteFarmService from "~/contracts/IWriteFarmService";

export class WriteFarmService implements IWriteFarmService {
  private writeFarmRepository: IWriteFarmRepository;

  constructor(writeFarmRepository: IWriteFarmRepository) {
    this.writeFarmRepository = writeFarmRepository;
  }

  async createFarm(farm: Farm): Promise<Farm> {
    return await this.writeFarmRepository.save(farm);
  }

  async updateFarm(farm: Farm, id: number): Promise<Farm> {
    return await this.writeFarmRepository.save(farm, id);
  }

  async deleteFarm(id: number): Promise<boolean> {
    return await this.writeFarmRepository.delete(id);
  }
}
