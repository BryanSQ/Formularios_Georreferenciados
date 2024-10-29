import "./ResultTable.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetchData from "../../../hooks/useFetchData";
import API_URL from "../../../config";

import { removeSubmission } from "../../../services/formServices";

export const ResultTable = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${API_URL}/forms/results/map/${id}`);

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (data && data.results) {
      setSubmissions(data.results);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deleteSubmission = async (submission_id) => {   
    setSubmissions(submissions.filter(submission => submission.submission_id !== submission_id));
    await removeSubmission(submission_id)
  }

  return (
    data && (
      <section className="main-section">
        <div className="results">
          <div className="container form-info">
            <h1>{data.form.name}</h1>
            <p>{data.form.description}</p>
            <a href={`${API_URL}/forms/results/csv/${id}`} download>
              Descargar CSV
            </a>
          </div>

          {submissions.map(({ submission_id, fields }) => {
            return (
              <div key={submission_id} className="container result-container">
                {fields.map(({ field_id, field_name, answer }) => {
                  return (
                    <div key={field_id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <h2 style={{ borderBottom: '1px solid var(--gray)' }}>
                        {field_name}
                      </h2>
                      <p>
                        {answer}
                      </p>
                    </div>
                  );
                })}
                <button style={{ alignSelf: 'flex-end' }} className="delete-button" onClick={() => deleteSubmission(submission_id)}>
                  Eliminar respuesta
                </button>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
};