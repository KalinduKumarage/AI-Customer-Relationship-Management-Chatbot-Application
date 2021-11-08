

function ModalRegister(props){


    return (
    <div className='modal'>
      <p>Do you want to confirm phone number</p>
      <button className='btn btn--alt' onClick={props.onCancel}>Cancel</button>
      <button className='btn' onClick={props.onConfirm}>Confirm</button>

    </div>
  );
}

export default ModalRegister;
