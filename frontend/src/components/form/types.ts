export type FormData = {
  document: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  cultivable_area?: number;
  vegetation_area?: number;
  crops: string[];
};

export type FarmFormProps = {
  handleSubmit: (formData: FormData) => void;
  initialFormData?: FormData;
};
