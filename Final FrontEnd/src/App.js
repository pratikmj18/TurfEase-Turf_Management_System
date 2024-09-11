import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import VerifyBooking from "./BookingComponent/VerifyBooking";
import ViewAllBooking from "./BookingComponent/ViewAllBooking";
import ViewMyBooking from "./BookingComponent/ViewMyBooking";
import AddGroundForm from "./GroundComponent/AddGroundForm";
import Ground from "./GroundComponent/Ground";
import ViewAllGround from "./GroundComponent/ViewAllGround";
import ViewAllTurf from "./GroundComponent/ViewAllTurf";
import Header from "./NavbarComponent/Header";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import HomePage from "./page/Home";
import Home from "./page/HomePage";
import AddReview from "./ReviewComponent/AddReview";
import MyWallet from "./UserComponent/MyWallet";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import ViewAllCustomer from "./UserComponent/ViewAllCusomer";

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      {!isHome && <Header />}
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/hotel/location" element={<HomePage />} />

        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />

        <Route path="user/hotel/register" element={<UserRegister />} />
        <Route path="user/customer/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />

        <Route path="admin/ground/add" element={<AddGroundForm />} />
        <Route path="book/ground/add" element={<AddGroundForm />} />
        <Route path="user/customer/all" element={<ViewAllCustomer />} />

        <Route path="/book/ground/:groundId" element={<Ground />} />
        <Route path="user/ground/bookings" element={<ViewMyBooking />} />
        <Route path="user/ground/booking/all" element={<ViewAllBooking />} />
        <Route
          path="/user/admin/verify/booking/:bookingId"
          element={<VerifyBooking />}
        />
        <Route path="/customer/wallet" element={<MyWallet />} />
        <Route path="/ground/review/add" element={<AddReview />} />
        <Route path="/admin/ground/all" element={<ViewAllGround />} />
        <Route path="/turf/all" element={<ViewAllTurf />} />
      </Routes>
    </div>
  );
}

export default App;
