import Joi from "joi";
import { CropType } from "~/entities/Farm";

export const farmSchema = Joi.object({
  document: Joi.string().max(18).required(),
  producer_name: Joi.string().required(),
  farm_name: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  total_area: Joi.number().required(),
  cultivable_area: Joi.number().optional(),
  vegetation_area: Joi.number().optional(),
  crops: Joi.array()
    .items(Joi.string().valid(...Object.values(CropType)))
    .required(),
});
