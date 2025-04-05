import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import LarsTerms from "./pages/terms";
import ForgotPassword from "./pages/forgotpassword";
import BIUBusinessHub from "./pages/second";
import AddEvent from "./pages/event";
import ViewEvent from "./pages/dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import Verified from "./pages/succesfulverify";
import ViewAdvert from "./pages/advert";
import Businesses from "./pages/businesses";
import TopEvents from "./pages/topevent";
import Individuals from "./pages/individuals";
import ForgotEmail from "./pages/ForgotEmail";
import ChangePassword from "./pages/changepassword";
import ValidateEmail from "./pages/ValidateEmail";
import TokenUsedPage from "./pages/tokenused";
import TokenExpired from "./pages/TokenExpiredPage";
import NotVerified from "./pages/notverified";
import StudentBusinesses from "./pages/students";
import BusinessDetail from "./pages/BusinessDetail";
// import categories from "./components/categoriesmock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/terms" element={<LarsTerms />} />
        <Route path="/verify/email/:email" element={<VerifyEmail />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/notverified" element={<NotVerified />} />
        <Route path="/reset">
          <Route index element={<ForgotPassword />} />
          <Route path="email/:email" element={<ForgotEmail />} />
          <Route path="reset/:email/:token" element={<ChangePassword />} />
        </Route>
        <Route path="/verify/token/:email/:token" element={<ValidateEmail />} />
        <Route path="/tokenexpired" element={<TokenExpired />} />
        <Route path="/tokenused" element={<TokenUsedPage />} />
        <Route path="/start" element={<BIUBusinessHub />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/dashboard" element={<ViewEvent />} />
        <Route path="/advert" element={<ViewAdvert />} />
       <Routes>
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/business/:categoryName/:businessId" element={<BusinessDetail />} />
        {/* <Route path="/category/:categoryName" element={<categories />} /> */}
      </Routes>
        <Route path="/topevent" element={<TopEvents />} />
        <Route path="/individual" element={<Individuals />} />
        <Route path="/student" element={<StudentBusinesses />} />
      </Routes>
    </Router>
  );
}

export default App;
