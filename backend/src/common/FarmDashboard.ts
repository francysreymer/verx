import { PercentageByCropType } from '@/common/PercentageByCropType';
import { PercentageByLandUse } from '@/common/PercentageByLandUse';
import { PercentageByState } from '@/common/PercentageByState';

export type FarmDashboard = {
  totalOfFarms: number;
  totalArea: number;
  percentageByState: PercentageByState[];
  percentageByCropType: PercentageByCropType[];
  percentageByLandUse: PercentageByLandUse[];
};
