import React, { useEffect } from "react";
import ChatWidget from "./components/ChatWidget";
import { useState } from "react";
import Backdrop from "./components/Backdrop";
import DoctorListModal from "./components/DoctorListModal";
import DoctorSpecialtyModal from "./components/DoctorSpecialtyModal";
import Appointment from "./components/Appointment";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyFormModal from "./components/MyFormModal";
import AddNP from "./components/AddNewProfile";
import { useDispatch } from "react-redux";
import { getProfile } from "./actions/ProfileModule";
import CH from "./components/RetrieveHistory/ConsultationHistory";
import OH from "./components/RetrieveHistory/OrderHistory";
import PH from "./components/RetrieveHistory/PaymentHistory";
import MapModal from "./components/MapModal";
import Map from "./components/Maps/Map";
import FormModal from "./components/FormModal";
import UserLocation from "./components/UserLocation";

//import { getPlacesData } from "./api/api";
import RegisterForm from "./components/RegisterForm";
import Register from "./components/Register";
import HospitalModal from "./components/HospitalModal";

function App() {
  const [openDoctorList, setOpenDoctorList] = useState(false); //keep false to work with bot
  const [openDoctorNameList, setOpenDoctorNameList] = useState(false);
  const [openAppointment, setOpenAppointment] = useState(true);
  const [openHospital, setOpenHospital] = useState(false);
  const [userProfileIsOpen, setuserProfileIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [RegisterFormModalOpen, setRegisterFormModalOpen] = useState(false);
  const [RegisterCardOpen, setRegisterCardOpen] = useState(false);
  const [LocationModelIsOpen, setLocationModelIsOpen] = useState(false);
  const [currentID, setID] = useState(null);

  ////////////////////////////// ORDER PRESCRIPTION //////////////////////////////////
  function openModalHandler() {
    setModalIsOpen(true);
  }

  function openLocationHandler() {
    setLocationModelIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function closeLocationHandler() {
    setLocationModelIsOpen(false);
  }

  function orderPrescription() {
    openModalHandler();
    console.log("clicked Order Prescription!");
  }

  function locationSharing() {
    openLocationHandler();
    console.log("clicked Location sharing");
  }

  ////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////User Profile///////////////////////////////

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  function closeUserProfileHandler() {
    setuserProfileIsOpen(false);
  }

  function openUserProfileHandler() {
    setuserProfileIsOpen(true);
  }

  function UserProfile() {
    openUserProfileHandler();
    console.log("clicked user profile!");
  }

  ///////////////////////////////  Doctor Appointment  //////////////////////////////////////
  //For Doctor Specialty
  function openDoctorListHandler() {
    setOpenDoctorList(true);
  }

  function doctorSpecialty() {
    openDoctorListHandler();
  }

  function closeDoctorListHandler() {
    setOpenDoctorList(false);
  }

  //For Doctor name
  function openDoctorNameListHandler() {
    setOpenDoctorNameList(true);
  }

  function doctorAppointmentByName() {
    openDoctorNameListHandler();
  }

  function closeDoctorNameListHandler() {
    setOpenDoctorNameList(false);
  }

  //For Hospital
  function openHospitalListHandler() {
    setOpenHospital(true);
  }

  function hospitalHandler() {
    openHospitalListHandler();
  }

  function closeHospitalHandler() {
    setOpenHospital(false);
  }

  //For Appointment
  function openAppointmentHandler() {
    setOpenAppointment(true);
  }

  function appointmentHandler() {
    openAppointmentHandler();
  }

  function closeAppointmentHandler() {
    setOpenAppointment(false);
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////  Access Control  //////////////////////////////////////
  // access control
  function closeRegsterCard() {
    setRegisterCardOpen(false);
  }

  function openRegisterCard() {
    setRegisterCardOpen(true);
  }

  function newRegister() {
    closeRegsterCard();
    setRegisterFormModalOpen(true);
  }

  function closeFormModalRegister() {
    setRegisterFormModalOpen(false);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  //Hospital Finder

  function closeMapModalHandler() {
    setMapModalIsOpen(false);
  }

  function openMapModalHandler() {
    setMapModalIsOpen(true);
  }

  function MapRender() {
    openMapModalHandler();
    console.log("clicked MapModal!");
  }

  ////////////////////////////////////////////////////
  setInterval(function () {
    var list = document.getElementsByClassName("rw-reply");

    if (list.length) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].innerText === "Channel by Specialty 🩺") {
          list[i].addEventListener("click", doctorSpecialty);
        }
        if (list[i].innerText === "Channel by Name 👨🏻‍⚕️") {
          list[i].addEventListener("click", doctorAppointmentByName);
        }
        if (list[i].innerText === "Channel by Hospital 🏥") {
          list[i].addEventListener("click", hospitalHandler);
        }
        if (list[i].innerText === "User Profile 👤") {
          list[i].addEventListener("click", UserProfile);
        }
        if (list[i].innerText === "Fill in a Form") {
          list[i].addEventListener("click", orderPrescription);
        }
        if (list[i].innerText === "Share your location 📍") {
          list[i].addEventListener("click", locationSharing);
        }
        if (list[i].innerText === "Enter Phone Number 👨‍⚕️") {
          list[i].addEventListener("click", openRegisterCard);
        }
        if (list[i].innerText === "Hospital Finder 🏥") {
          list[i].addEventListener("click", MapRender);
        }
        if (list[i].innerText === "View nearby Hospitals") {
          list[i].addEventListener("click", MapRender);
        }
        if (list[i].innerText === "Sign up") {
          list[i].addEventListener("click", newRegister);
        }
      }
    }
  }, 10);

  return (
    <div>
      <div>
        <ChatWidget />
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            {openDoctorNameList && <DoctorListModal />}
            {openDoctorNameList && (
              <Backdrop onCancel={closeDoctorNameListHandler} />
            )}
            {userProfileIsOpen && (
              <MyFormModal currentID={currentID} setID={setID} />
            )}
            {userProfileIsOpen && (
              <Backdrop onCancel={closeUserProfileHandler} />
            )}
          </Route>

          <Route exact path="/profile">
            <div className="mymodal">
              <AddNP setID={setID} />
            </div>
          </Route>

          <Route exact path="/consultation">
            <div className="mymodal">
              <CH setID={setID} />
            </div>
          </Route>

          <Route exact path="/order">
            <div className="mymodal">
              <OH setID={setID} />
            </div>
          </Route>

          <Route exact path="/payment">
            <div className="mymodal">
              <PH setID={setID} />
            </div>
          </Route>

          <Route exact path="/appointment">
            {openAppointment && <Appointment />}
            {openAppointment && <Backdrop onCancel={closeAppointmentHandler} />}
          </Route>
        </Switch>
      </Router>
      {modalIsOpen && (
        <FormModal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}

      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      {LocationModelIsOpen && <UserLocation />}
      {LocationModelIsOpen && <Backdrop onCancel={closeLocationHandler} />}

      {openDoctorList && <DoctorSpecialtyModal />}
      {openDoctorList && <Backdrop onCancel={closeDoctorListHandler} />}
      {openHospital && <HospitalModal />}
      {openHospital && <Backdrop onCancel={closeHospitalHandler} />}

      {mapModalIsOpen && ( <Map/>)}
          {mapModalIsOpen && <Backdrop onCancel={closeMapModalHandler} />}

      {RegisterCardOpen && (
        <Register
          card="Registration"
          label="Phone Number"
          button="Verify"
          onCancel={newRegister}
        />
      )}
      {RegisterCardOpen && <Backdrop onCancel={closeFormModalRegister} />}
      {RegisterFormModalOpen && (
        <RegisterForm
          onCancel={closeFormModalRegister}
          onConfirm={closeFormModalRegister}
        />
      )}
      {RegisterFormModalOpen && <Backdrop onCancel={closeFormModalRegister} />}
    </div>
  );
}
export default App;
