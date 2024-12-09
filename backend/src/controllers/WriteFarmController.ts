import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleHttpError } from '@/common/handleHttpError';
import { db } from '@/config/db';
import { Farm } from '@/entities/Farm';
import { ReadFarmRepository } from '@/repositories/ReadFarmRepository';
import { WriteFarmRepository } from '@/repositories/WriteFarmRepository';
import { farmSchema } from '@/schemas/farmSchema';
import { WriteFarmService } from '@/services/WriteFarmService';

// Instanciando o repositório e o serviço manualmente
export const farmRepository = db.getRepository(Farm);
const writeFarmRepository = new WriteFarmRepository(farmRepository);
const readFarmRepository = new ReadFarmRepository(farmRepository);
const writeFarmService = new WriteFarmService(
  writeFarmRepository,
  readFarmRepository,
);

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
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }

  async updateFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = req.body;

      const { error } = farmSchema.validate(farm);
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const updated = await writeFarmService.updateFarm(farm, Number(id));
      return res.status(StatusCodes.OK).json(updated);
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }

  async deleteFarm(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await writeFarmService.deleteFarm(Number(id));
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }
}
