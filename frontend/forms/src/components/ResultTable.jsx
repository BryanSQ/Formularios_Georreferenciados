import { useState, useEffect } from "react";
import Table from "./Table"
import "./styles/ResultTable.css"
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";

import API_URL from "../config";

const ResultTable = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${API_URL}/forms/${id}/answers`);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main_container">
      <h1>{data.form.name}</h1>
      <p>{data.form.description}</p>
      <div>
        <h3>Descarga de los resultados</h3>
        <a href={`${API_URL}/forms/results/csv/${id}`} download>
          Descargar CSV
        </a>
      </div>
      {data.answers.map((answer, index) => (
        <div key={index} className="result_table">
          <Table name={answer.name} type={answer.type.id} answers={answer.answers} />
        </div>
      ))}
    </div>
  )
}

export default ResultTable