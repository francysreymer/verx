import { Farm } from "~/entities/Farm";
import IReadFarmRepository from "~/contracts/IReadFarmRepository";
import IReadFarmService from "~/contracts/IReadFarmService";

export class ReadFarmService implements IReadFarmService {
  private readFarmRepository: IReadFarmRepository;

  constructor(readFarmRepository: IReadFarmRepository) {
    this.readFarmRepository = readFarmRepository;
  }

  async getFarms(): Promise<Farm[]> {
    return await this.readFarmRepository.findAll();
  }

  async getFarmById(id: number): Promise<Farm | null> {
    return await this.readFarmRepository.findOneById(id);
  }

  async getFarmDashboards(): Promise<any> {
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
