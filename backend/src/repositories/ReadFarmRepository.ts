import { Repository } from "typeorm";
import { Farm } from "~/entities/Farm";
import IReadFarmRepository from "~/contracts/IReadFarmRepository";

export class ReadFarmRepository implements IReadFarmRepository {
  private repository: Repository<Farm>;

  constructor(repository: Repository<Farm>) {
    this.repository = repository;
  }

  async findAll(): Promise<Farm[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<Farm | null> {
    return await this.repository.findOneBy({ id });
  }

  async getTotalOfFarms(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder("farms")
      .select("COUNT(farms.id)", "total_farms")
      .getRawOne();

    return parseFloat(result.total_farms) || 0;
  }

  async getTotalArea(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder("farms")
      .select("SUM(farms.total_area)", "total_area")
      .getRawOne();

    return parseFloat(result.total_area) || 0;
  }

  async getPercentageByState(): Promise<any> {
    // Count the number of farms for each state
    const farmCountByState = await this.repository
      .createQueryBuilder("farms")
      .select("farms.state", "state")
      .addSelect("COUNT(farms.id)", "farm_count")
      .groupBy("farms.state")
      .getRawMany();

    // Count the overall number of farms
    const overallFarmCount = await this.repository
      .createQueryBuilder("farms")
      .select("COUNT(farms.id)", "total_farms")
      .getRawOne();

    // Calculate percentage for each state
    const percentages = farmCountByState.map((stateData) => {
      const percentage =
        (stateData.farm_count / overallFarmCount.total_farms) * 100;
      return {
        state: stateData.state,
        percentage: parseFloat(percentage.toFixed(2)), // Format to 2 decimal places
      };
    });

    return percentages;
  }

  async getPercentageByCropType(): Promise<any> {
    // Fetch total area for each type of crop
    const farmCountByCrop = await this.repository
      .createQueryBuilder("farms")
      .select("unnest(farms.crops)", "crop")
      .addSelect("COUNT(DISTINCT farms.id)", "farm_count")
      .groupBy("crop")
      .getRawMany();

    // Count the overall number of farms
    const overallFarmCount = await this.repository
      .createQueryBuilder("farms")
      .select("COUNT(DISTINCT farms.id)", "total_farms")
      .getRawOne();

    // Calculate percentage for each type of crop
    const percentages = farmCountByCrop.map((cropData) => {
      const percentage =
        (cropData.farm_count / overallFarmCount.total_farms) * 100;
      return {
        crop: cropData.crop,
        percentage: parseFloat(percentage.toFixed(2)), // Format to 2 decimal places
      };
    });

    return percentages;
  }

  async getPercentageByLandUse(): Promise<any> {
    // Fetch total cultivable area
    const totalCultivableArea = await this.repository
      .createQueryBuilder("farms")
      .select("SUM(farms.cultivable_area)", "total_cultivable_area")
      .getRawOne();

    // Fetch total vegetation area
    const totalVegetationArea = await this.repository
      .createQueryBuilder("farms")
      .select("SUM(farms.vegetation_area)", "total_vegetation_area")
      .getRawOne();

    // Calculate overall total area
    const overallTotalArea =
      parseFloat(totalCultivableArea.total_cultivable_area) +
      parseFloat(totalVegetationArea.total_vegetation_area);

    // Calculate percentage for each land use type
    const cultivablePercentage =
      (parseFloat(totalCultivableArea.total_cultivable_area) /
        overallTotalArea) *
      100;
    const vegetationPercentage =
      (parseFloat(totalVegetationArea.total_vegetation_area) /
        overallTotalArea) *
      100;

    // Return the results
    return [
      {
        land_type: "Área Cultivável",
        percentage: parseFloat(cultivablePercentage.toFixed(2)), // Format to 2 decimal places
      },
      {
        land_type: "Área de Vegetação",
        percentage: parseFloat(vegetationPercentage.toFixed(2)), // Format to 2 decimal places
      },
    ];
  }
}
