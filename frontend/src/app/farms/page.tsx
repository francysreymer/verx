"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Menu from "@/components/menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, fetchFarms, deleteFarm } from "@/redux/store";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const { farms, error } = useSelector((state: RootState) => state.farms);

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteFarm(id));
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <Menu currentMenu="farms" />

      <Link href={`/farms/add`}>
        <button className="w-200 p-2 text-white border-gray-200 rounded-sm bg-blue-400 mt-4">
          Cadastrar Propriedade Rural
        </button>
      </Link>

      <table className="w-full border-collapse border border-slate-400">
        <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
          Propriedades Rurais
        </caption>

        <thead>
          <tr className="text-center">
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">CPF/CNPJ</th>
            <th className="border border-slate-300">Nome</th>
            <th className="border border-slate-300">Nome da Fazenda</th>
            <th className="border border-slate-300">Cidade</th>
            <th className="border border-slate-300">Estado</th>
            <th className="border border-slate-300">Área Total</th>
            <th className="border border-slate-300">Área Cultivável</th>
            <th className="border border-slate-300">Área de Vegetação</th>
            <th className="border border-slate-300">Culturas</th>
            <th className="border border-slate-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={11} className="text-center text-red-500">
                {error}
              </td>
            </tr>
          ) : farms.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            farms.map((farm) => (
              <tr key={farm.id} className="text-center">
                <td className="border border-slate-300">{farm.id}</td>
                <td className="border border-slate-300">{farm.document}</td>
                <td className="border border-slate-300">
                  {farm.producer_name}
                </td>
                <td className="border border-slate-300">{farm.farm_name}</td>
                <td className="border border-slate-300">{farm.city}</td>
                <td className="border border-slate-300">{farm.state}</td>
                <td className="border border-slate-300">{farm.total_area}</td>
                <td className="border border-slate-300">
                  {farm.cultivable_area}
                </td>
                <td className="border border-slate-300">
                  {farm.vegetation_area}
                </td>
                <td className="border border-slate-300">
                  {farm.crops.join(", ")}
                </td>
                <td className="border border-slate-300">
                  <Link href={`/farms/edit/${farm.id}`}>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-blue-400">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400"
                    onClick={() => handleDelete(farm.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
