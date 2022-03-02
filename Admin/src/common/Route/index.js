export const TOKEN_KEY = 'token';
export const USER_ID = 'userid';
export const FIRSTNAME = 'firstname';
export const LASTNAME = 'lastname';

export const USER_EMAIL = 'email';
export const USER_PHONE = 'mobileno';

export const loginnew = ( accessToken, id,email, mobileno , firstname,lastname) => {
    console.log(localStorage.getItem(TOKEN_KEY));
    localStorage.setItem('TOKEN_KEY', accessToken);
   localStorage.setItem('userid', id);
   localStorage.setItem('USER_EMAIL', email);
   localStorage.setItem('USER_PHONE', mobileno);  
   localStorage.setItem('FIRSTNAME', firstname); 
   localStorage.setItem('LASTNAME', lastname);   
   localStorage.setItem("tabid", 0);

 }

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_PHONE);   
    localStorage.removeItem(FIRSTNAME);    
    localStorage.removeItem(LASTNAME);     
}

// export const isLogin = () => {
//     if (localStorage.getItem(TOKEN_KEY)) {
//         return true;
//     }
//     if (localStorage.getItem(USER_NAME)) {
//         return true;
//     }
//     if (localStorage.getItem(USER_EMAIL)) {
//         return true;
//     }
//     if (localStorage.getItem(USER_PHONE)) {
//         return true;
//     }
//     return false;
// }