import "./ResultTable.css"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetchData from "../../../hooks/useFetchData";

import Table from "./Table"

import API_URL from "../../../config";

export const ResultTable = () => {
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
    <section className="main-section">

      <div className="results">
        <div className="container form-info">
          <h1>{data.form.name}</h1>
          <p>{data.form.description}</p>
          <a href={`${API_URL}/forms/results/csv/${id}`} download>
            Descargar CSV
          </a>
        </div>

        {data.answers.map((answer, index) => (
          <div key={index} className="result-container">
            <Table name={answer.name} type={answer.type.id} answers={answer.answers} />
          </div>
        ))}
      </div>
    </section>
  )
};