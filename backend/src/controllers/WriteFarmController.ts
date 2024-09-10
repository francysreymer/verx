import { Request, Response } from "express";
import { AppDataSource } from "~/config/database";
import { WriteFarmService } from "~/services/WriteFarmService";
import { ReadFarmService } from "~/services/ReadFarmService";
import { WriteFarmRepository } from "~/repositories/WriteFarmRepository";
import { ReadFarmRepository } from "~/repositories/ReadFarmRepository";
import { Farm } from "~/entities/Farm";
import { farmSchema } from "~/schemas/farmSchema";

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
        return res.status(400).json({ message: error.details[0].message });
      }

      const created = await writeFarmService.createFarm(farm);
      return res.status(201).json(created);
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = req.body;

      const findFarm = await readFarmService.getFarmById(Number(id));
      if (!findFarm) {
        return res.status(404).json({ message: "Farm not found" });
      }

      const { error } = farmSchema.validate(farm);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updated = await writeFarmService.updateFarm(farm, Number(id));
      return res.status(200).json(updated);
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const farm = await readFarmService.getFarmById(Number(id));
      if (!farm) {
        return res.status(404).json({ message: "Farm not found" });
      }

      const deleted = await writeFarmService.deleteFarm(Number(id));
      return res.status(204).send();
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
