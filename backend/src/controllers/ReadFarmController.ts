import { Request, Response } from "express";
import { AppDataSource } from "@/config/database";
import { ReadFarmService } from "@/services/ReadFarmService";
import { ReadFarmRepository } from "@/repositories/ReadFarmRepository";
import { Farm } from "@/entities/Farm";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

// Instanciando o repositório e o serviço manualmente
export const farmRepository = AppDataSource.getRepository(Farm);
const readFarmRepository = new ReadFarmRepository(farmRepository);
const readFarmService = new ReadFarmService(readFarmRepository);

export class ReadFarmController {
  async getFarms(req: Request, res: Response): Promise<Response> {
    try {
      const farms = await readFarmService.getFarms();
      return res.status(StatusCodes.OK).json(farms);
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getFarmById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = await readFarmService.getFarmById(Number(id));
      return res.status(StatusCodes.OK).json(farm);
    } catch (error: Error | any) {
      if (error instanceof createError.HttpError) {
        return res.status(error.status).json({ message: error.message });
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async getFarmDashboards(req: Request, res: Response): Promise<Response> {
    try {
      const totals = await readFarmService.getFarmDashboards();
      return res.status(StatusCodes.OK).json(totals);
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
