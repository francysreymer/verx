import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleHttpError } from '@/common/handleHttpError';
import { db } from '@/config/db';
import { Farm } from '@/entities/Farm';
import { ReadFarmRepository } from '@/repositories/ReadFarmRepository';
import { ReadFarmService } from '@/services/ReadFarmService';

// Instanciando o repositório e o serviço manualmente
export const farmRepository = db.getRepository(Farm);
const readFarmRepository = new ReadFarmRepository(farmRepository);
const readFarmService = new ReadFarmService(readFarmRepository);

export class ReadFarmController {
  async getFarms(req: Request, res: Response): Promise<Response> {
    try {
      const farms = await readFarmService.getFarms();
      return res.status(StatusCodes.OK).json(farms);
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }

  async getFarmById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const farm = await readFarmService.getFarmById(Number(id));
      return res.status(StatusCodes.OK).json(farm);
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }

  async getFarmDashboards(req: Request, res: Response): Promise<Response> {
    try {
      const totals = await readFarmService.getFarmDashboards();
      return res.status(StatusCodes.OK).json(totals);
    } catch (error: unknown) {
      return handleHttpError(res, error);
    }
  }
}
