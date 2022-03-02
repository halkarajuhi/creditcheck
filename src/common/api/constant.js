import axios from 'axios';
export const INSERTDATA = "registration/insertdata";
export const SIGNUP = "registration/createdata";
export const SIGNOUT = "auth/signout";
export const FORGETPASSWORD = "login/forgotPassword";

export const PASSWORD = "login/updatePassword/";

export const GET_PROFILE = "auth/getprofile";
export const LOGIN = "sendEmail/login";
export const GUESTLOGIN = "login/guestlogin";
export const EMAILSEND = "sendEmail/emailsend";
export const GETDATA = "stripepay/getData";
export const USER_SUBSCRIPTION = "stripepay/usersubscripton/";
export const PAY = "stripepay/edit/";
export const SUBSCRIPTION = "registration/subscriptiondata";
export const UPDATE_SUBSCRIPTION = "registration/update_subscriptiondata";
export const UPDATE_STATUS = "registration/update_status";
export const SUBSCRIPTION_TYPE = "registration/subscription_type";
export const SECRET = "alipaydocs/secret";
export const CONFIRMPASSEMAIL = "sendEmail/confirm_pass_emailsend/";
export const PROFILE = "profile/profile_detail";
export const UPDATEPROFILE = "profile/update_profile_detail";
export const RESETPASSWORD = "login/resetPassword";
export const ABOUTUS = "aboutus/getsingledata";
export const GETFAQ = "Faq/getalldata";
export const QUESTION = "Faq/getallfaqdata";
export const CHAT = "chat/addchat";
export const SHOW = "chat/getsingledata";
export const SHOWCOUNT = "chat/showcount";
export const UPDATECOUNT = "chat/updateCount";
export const ORDER = "stripetrial/order_detail";
export const ITEM_DETAIL = "stripetrial/item_detail";



export const API_URL = process.env.REACT_APP_API_URL;


export const CHAT_URL = process.env.REACT_APP_CHAT_URL
