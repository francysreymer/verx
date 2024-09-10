import { Farm } from "~/entities/Farm";

export default interface IReadFarmService {
  getFarms(): Promise<Farm[]>;
  getFarmById(id: number): Promise<Farm | null>;
  getFarmDashboards(): Promise<any>;
}
