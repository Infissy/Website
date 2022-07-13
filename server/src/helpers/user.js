'use strict';
//Helper needed for this? 
module.exports = { 
    dataToUserInfo: (info) => {
        console.log(info);
        return{email: info.email,
    password: info.password, 
    username: info.username}}


};