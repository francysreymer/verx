import { Repository } from "typeorm";
import { Farm } from "~/entities/Farm";
import IWriteFarmRepository from "~/contracts/IWriteFarmRepository";
//import { AppDataSource } from "~/config/database";

export class WriteFarmRepository implements IWriteFarmRepository {
  private repository: Repository<Farm>;

  constructor(repository: Repository<Farm>) {
    this.repository = repository;
  }

  async save(farm: Farm, id?: number): Promise<Farm> {
    if (id) {
      await this.repository.update(id, farm);
      return farm;
    }

    return await this.repository.save(farm);
  }

  async delete(id: number): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
