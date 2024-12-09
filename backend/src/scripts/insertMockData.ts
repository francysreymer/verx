import { DeepPartial } from 'typeorm';

import { db } from '@/config/db';
import { Farm } from '@/entities/Farm';
import { CropType } from '@/entities/Farm'; // Adjust the import path as necessary

export async function insertMockData() {
  const farmRepository = db.getRepository(Farm);

  const mockFarms: DeepPartial<Farm>[] = [
    {
      document: '123',
      producer_name: 'João',
      farm_name: 'Fazenda A',
      city: 'Cidade A',
      state: 'Estado A',
      total_area: 100,
      cultivable_area: 80,
      vegetation_area: 20,
      crops: [CropType.Soja, CropType.Milho],
    },
    {
      document: '456',
      producer_name: 'Maria',
      farm_name: 'Fazenda B',
      city: 'Cidade B',
      state: 'Estado B',
      total_area: 200,
      cultivable_area: 150,
      vegetation_area: 50,
      crops: [CropType.Cafe, CropType.Algodao],
    },
  ];

  for (const farmData of mockFarms) {
    const farm = farmRepository.create(farmData);
    await farmRepository.save(farm);
  }

  console.log('Mock data inserted successfully');
}
