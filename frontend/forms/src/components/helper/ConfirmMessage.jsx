import "./ConfirmMessage.css";

export const ConfirmMessage = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className='confirm-message'>
        <p>{message}</p>
        <div className='modal-buttons'>
          <button className='cancel' onClick={onCancel}>Cancelar</button>
          <button className='confirm' onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>

  );
};
