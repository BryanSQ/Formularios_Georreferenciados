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

  let results = [
    {
      name: "Nombre",
      type: "1",
      answers: [
        "Juan",
        "Pedro",
        "Maria"
      ]
    }, 
    {
      name: "Apellido",
      type: "1",
      answers: [
        "Perez",
        "Gomez",
        "Lopez"
      ]
    }, 
    {
      name: "Es usted una persona casada?",
      type: "4",
      answers: [
        {
          option: "Si",
          count: 2
        },
        {
          option: "No",
          count: 1
        }
      ]
    }, 
    {
      name: "Cuales comidas hizo hoy?",
      type: "3",
      answers: [
        {
          option: "Desayuno",
          count: 3
        },
        {
          option: "Almuerzo",
          count: 2
        },
        {
          option: "Cena",
          count: 1
        }
      ]
    }, 
    {
      name: "Ubicacion en donde vive",
      type: "5", 
      answers: [
        {
          lat: 40.7128,
          lon: 74.0060
        },
        {
          lat: 34.0522,
          lon: 118.2437
        },
        {
          lat: 41.8781,
          lon: 87.6298
        }
      ]
    }
  ]

  console.log(results)

  return (
    <div className="main_container">
      <h1>{data.form.name}</h1>
      <p>{data.form.description}</p>
      {data.answers.map((answer, index) => (
        <div className="result_table">
          <Table key={index} name={answer.name} type={answer.type.id} answers={answer.answers} />
        </div>
      ))}
    </div>
  )
}

export default ResultTable