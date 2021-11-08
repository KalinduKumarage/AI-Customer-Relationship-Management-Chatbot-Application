function Register(props) {
  return (
    <div className="modalRegisterForm">
      <div className="cardOTP">
        <h1>
          <center>{props.card}</center>
        </h1>
        <br></br>
        <div>
          <center>
            <label className="lblForm">
              {props.label} <input type="text" className="dummy1" />
            </label>
            <br></br>
            <br></br>

            <button className="btn" onClick={props.onCancel}>
              {props.button}
            </button>
          </center>
        </div>
        {/*
            {RegisterModalOpen && <ModalRegister onCancel={closeModalRegister} onConfirm={closeModalRegister} />}   
             */}
      </div>
    </div>
  );
}

export default Register;
