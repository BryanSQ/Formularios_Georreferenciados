
export const Question = ({ id, children }) => {
  
  return (
    <div question_id={id || ""} className='container question-box'>
      { children }
    </div>
  );
};
