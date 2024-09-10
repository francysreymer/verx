"use client";
import React, { useState } from "react";
import { FormData, FarmFormProps } from "@/components/form/types";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const FarmForm: React.FC<FarmFormProps> = ({
  handleSubmit,
  initialFormData,
}) => {
  const [formData, setFormData] = useState({
    document: initialFormData?.document || "",
    producer_name: initialFormData?.producer_name || "",
    farm_name: initialFormData?.farm_name || "",
    city: initialFormData?.city || "",
    state: initialFormData?.state || "",
    total_area: initialFormData?.total_area || 0,
    cultivable_area: initialFormData?.cultivable_area || 0,
    vegetation_area: initialFormData?.vegetation_area || 0,
    crops: [...(initialFormData?.crops || [])],
  });
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLSelectElement) {
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData({
        ...formData,
        [name]: selectedValues,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      document,
      producer_name,
      farm_name,
      city,
      state,
      total_area,
      cultivable_area,
      vegetation_area,
      crops,
    } = formData;

    const cultivableArea = Number(cultivable_area);
    const vegetationArea = Number(vegetation_area);
    const totalArea = Number(total_area);

    if (
      document === "" ||
      producer_name === "" ||
      farm_name === "" ||
      city === "" ||
      state === "" ||
      crops.length === 0
    ) {
      setError("Todos os campos com * são obrigatórios.");
      return;
    }

    if (documentType === "cpf" && !cpf.isValid(document)) {
      setError("CPF inválido");
      return;
    }

    if (documentType === "cnpj" && !cnpj.isValid(document)) {
      setError("CNPJ inválido");
      return;
    }

    if (cultivableArea + vegetationArea > totalArea) {
      setError(
        "Área cultivável e de vegetação não pode ser maior que a área total"
      );
      return;
    }

    // Prepare formData for submission
    const formDataToSubmit: FormData = {
      document,
      producer_name,
      farm_name,
      city,
      state,
      total_area: totalArea || 0,
      cultivable_area: cultivableArea || 0,
      vegetation_area: vegetationArea || 0,
      crops,
    };

    handleSubmit(formDataToSubmit);
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
        Formulário da Propriedade Rural
      </span>
      {error && <p className="text-red-500">Erro: {error}</p>}{" "}
      <form className="w-full" onSubmit={onSubmit}>
        <div className="w-full py-2">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cpf"
              name="documentType"
              value="cpf"
              checked={documentType === "cpf"}
              onChange={setDocumentType.bind(null, "cpf")}
              className="mr-2"
            />
            <label htmlFor="cpf" className="mr-4">
              CPF
            </label>
            <input
              type="radio"
              id="cnpj"
              name="documentType"
              value="cnpj"
              checked={documentType === "cnpj"}
              onChange={setDocumentType.bind(null, "cnpj")}
              className="mr-2"
            />
            <label htmlFor="cnpj">CNPJ</label>
          </div>
          <input
            placeholder={documentType === "cpf" ? "CPF *" : "CNPJ *"}
            type="text"
            name="document"
            id="document"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.document}
          />
        </div>
        <div className="w-full py-2">
          <label
            htmlFor="producer_name"
            className="text-sm font-bold py-2 block"
          >
            Nome do Produtor *
          </label>
          <input
            type="text"
            name="producer_name"
            id="producer_name"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.producer_name}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="farm_name" className="text-sm font-bold py-2 block">
            Nome da Fazenda *
          </label>
          <input
            type="text"
            name="farm_name"
            id="farm_name"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.farm_name}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="city" className="text-sm font-bold py-2 block">
            Cidade *
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.city}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="state" className="text-sm font-bold py-2 block">
            Estado *
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.state}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="total_area" className="text-sm font-bold py-2 block">
            Área Total *
          </label>
          <input
            type="number"
            name="total_area"
            id="total_area"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.total_area}
          />
        </div>
        <div className="w-full py-2">
          <label
            htmlFor="cultivable_area"
            className="text-sm font-bold py-2 block"
          >
            Área Cultivável
          </label>
          <input
            type="number"
            name="cultivable_area"
            id="cultivable_area"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.cultivable_area}
          />
        </div>
        <div className="w-full py-2">
          <label
            htmlFor="vegetation_area"
            className="text-sm font-bold py-2 block"
          >
            Área de Vegetação
          </label>
          <input
            type="number"
            name="vegetation_area"
            id="vegetation_area"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={handleChange}
            value={formData.vegetation_area}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="crops" className="text-sm font-bold py-2 block">
            Tipos de Plantação *
          </label>
          <select
            name="crops"
            id="crops"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            multiple
            onChange={handleChange}
            value={formData.crops}
          >
            <option value="Soja">Soja</option>
            <option value="Milho">Milho</option>
            <option value="Algodão">Algodão</option>
            <option value="Café">Café</option>
            <option value="Cana de Açúcar">Cana de Açúcar</option>
          </select>
        </div>
        <div className="w-full py-2">
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
