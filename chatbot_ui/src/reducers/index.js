import { combineReducers } from "redux";
import appointments from "./appointments";
import doctors from "./doctors";
import hospitals from "./hospitals";
import specialties from "./specialties";
import ProfileModule from "./ProfileModule";
import ConsultModule from "./ConsultModule";
import OrderModule from "./OrderModule";
import users from "./users";
import prescriptions from "./prescriptions";

export default combineReducers({
  appointments,
  doctors,
  hospitals,
  specialties,
  ProfileModule,
  ConsultModule,
  OrderModule,
  users,
  prescriptions,
}); //same name given to useSelector state
