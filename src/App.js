import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './component/Registration';
import Home from './component/Home';
import Password from './password/Password';
import Forgotpass from './password/Forgotpass';
import Profile from './component/Profile';
import './assets/css/style.css';
import Subscription from './subscription/Subscription';
import Subscription2 from './subscription/Subscription2';
import Dashboard from './component/Dashboard';
import Appstripe from './stripe/App';
import Payment from './payment/Payment';
import Report1 from './report/Report1';
import About from './component/About';
import Report2 from './report/Report2';
import Report3 from './report/Report3';
import Checkout from './checkout/Checkout';
import ReactPayPal from './payment/ReactPayPal';
import CheckoutAlipay from './alipay/Checkout';
import Chat from './chat/Chat';
import FAQ from './chat/FAQ';
import Forgotpasslink from './password/Forgotpasslink';
import Imageupload from './component/Imageupload';
import Indexpage from './stripe/stripenew/StripeCheckoutComponent';
import StripePaymentSuccess from './stripe/stripenew/StripePaymentSuccess';
import StripePaymentCancel from './stripe/stripenew/StripePaymentCancle';
import { useTranslation } from "react-i18next";
import LanguageSelect from "./Language/languageSelect";
import { CartProvider } from "react-use-cart";
import Homecart from './report/dist/Home';
import Cart from './report/dist/Cart';
import Success from './payment/Success';

function App() {
  const userid = localStorage.getItem('USER_ID');
  const { t } = useTranslation();

  return (
    <div className="App">


      <CartProvider>
        <BrowserRouter>
          <Routes >

            {userid == "" || userid == null ? (<Route exact path="/" element={<Home />} />)
              : (<Route exact path="/" element={<Dashboard />} />)}

            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/forgot/:uniquekey" element={<Forgotpass />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/password/:id" element={<Password />} />
            <Route exact path="/subscription" element={<Subscription />} />
            <Route exact path="/subscription2" element={<Subscription2 />} />
            <Route exact path="/appstripe/:id" element={<Appstripe />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/report1" element={<Report1 />} />
            <Route exact path="/report2" element={<Report2 />} />
            <Route exact path="/report3" element={<Report3 />} />
            <Route exact path="/aboutus" element={<About />} />
            <Route exact path="/reactPayPal/:id" element={<ReactPayPal />} />
            <Route exact path="/checkout/:id" element={<Checkout />} />
            <Route exact path="/checkoutalipay" element={<CheckoutAlipay />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/FAQ" element={<FAQ />} />
            <Route exact path="/Forgotpasslink" element={<Forgotpasslink />} />
            <Route exact path="/Imageupload" element={<Imageupload />} />
            <Route exact path="/StripePaymentSuccess" element={<StripePaymentSuccess />} />
            <Route exact path="/StripePaymentCancel" element={<StripePaymentCancel />} />
            <Route exact path="/Homecart" element={<Homecart />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/success" element={<Success />} />
          </Routes >
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}


export default App;


