import { Request, Response } from "express";
import { AppDataSource } from "~/config/database";
import { ReadFarmService } from "~/services/ReadFarmService";
import { ReadFarmRepository } from "~/repositories/ReadFarmRepository";
import { Farm } from "~/entities/Farm";

// Instanciando o repositório e o serviço manualmente
export const farmRepository = AppDataSource.getRepository(Farm);
const readFarmRepository = new ReadFarmRepository(farmRepository);
const readFarmService = new ReadFarmService(readFarmRepository);

export class ReadFarmController {
  async getFarms(req: Request, res: Response): Promise<Response> {
    try {
      const farms = await readFarmService.getFarms();
      return res.status(200).json(farms);
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getFarmById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = await readFarmService.getFarmById(Number(id));
      if (!farm) {
        return res.status(404).json({ message: "Farm not found" });
      }

      return res.status(200).json(farm);
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getFarmDashboards(req: Request, res: Response): Promise<Response> {
    try {
      const totals = await readFarmService.getFarmDashboards();
      return res.status(200).json(totals);
    } catch (error: Error | any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
