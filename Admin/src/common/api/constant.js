import axios from 'axios';
export const ADDFAQ = "Faq/addfaq";
export const GETFAQ = "Faq/getallfaqdata";
export const UPDATEFAQ = "Faq/updatefaq";
export const SINGLEDATA = "Faq/getsingledata";
export const ADDREPORT = "report/addreport";
export const GETREPORT = "report/getallreportdata";
export const UPDATEREPORT = "report/getsingledata";
export const UPDATEDATA = "report/updatereport";
export const DELETEREPORT = "report/deletereport";


export const USERSINGLE = "users/getsingledata";
export const USERUPDATE = "users/updatestatus";
export const GETALLUSER = "users/getall";

export const CHAT = "chat/addchat";
export const SHOW = "chat/getsingledata";
export const SHOWCOUNT = "chat/showcount";
export const UPDATECOUNT = "chat/updateCount";
export const PROFILE = "admin_profile/profile_detail";
export const UPDATEPROFILE = "admin_profile/update_profile_detail";
export const RESETPASSWORD = "admin_login/resetPassword";




export const API_URL = process.env.REACT_APP_API_URL;
export const CHAT_URL = process.env.REACT_APP_CHAT_URL
