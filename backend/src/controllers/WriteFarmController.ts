import { Request, Response } from "express";
import { AppDataSource } from "~/config/database";
import { WriteFarmService } from "~/services/WriteFarmService";
import { ReadFarmService } from "~/services/ReadFarmService";
import { WriteFarmRepository } from "~/repositories/WriteFarmRepository";
import { ReadFarmRepository } from "~/repositories/ReadFarmRepository";
import { Farm } from "~/entities/Farm";
import { farmSchema } from "~/schemas/farmSchema";
import { StatusCodes } from "http-status-codes";

// Instanciando o repositório e o serviço manualmente
export const farmRepository = AppDataSource.getRepository(Farm);
const writeFarmRepository = new WriteFarmRepository(farmRepository);
const readFarmRepository = new ReadFarmRepository(farmRepository);
const writeFarmService = new WriteFarmService(writeFarmRepository);
const readFarmService = new ReadFarmService(readFarmRepository);

export class WriteFarmController {
  async createFarm(req: Request, res: Response): Promise<Response> {
    try {
      const farm = req.body;

      const { error } = farmSchema.validate(farm);
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const created = await writeFarmService.createFarm(farm);
      return res.status(StatusCodes.CREATED).json(created);
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async updateFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = req.body;

      const findFarm = await readFarmService.getFarmById(Number(id));
      if (!findFarm) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Farm not found" });
      }

      const { error } = farmSchema.validate(farm);
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const updated = await writeFarmService.updateFarm(farm, Number(id));
      return res.status(StatusCodes.OK).json(updated);
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async deleteFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const farm = await readFarmService.getFarmById(Number(id));
      if (!farm) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Farm not found" });
      }

      const deleted = await writeFarmService.deleteFarm(Number(id));
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
