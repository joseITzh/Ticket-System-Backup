// We are going to use this file to verify sessions while the user is logged in.
import { createContext } from "react";
import Pool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const Account = (props) => {

    // Returns information if the user is logged in.
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if(user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject()
            }
        });
    };


    const authenticate = async (Username, Password) => {

        return await new Promise((resolve, reject) => {
            // Create new user. Accepts one argument which is an object and that object has two keys.

            const user = new CognitoUser(Username, Pool);

            const authDetails = new AuthenticationDetails({ // This function accepts an object with two keys.
                Username: email,
                Password: password,
            });

            // The next step is to athenticate the user using the username and password that were prompted.

            user.authenticateUser(authDetails, { // Second parameter is an object.

                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                },
            }); 
        });
};
const logout = () => {
    const user = Pool.getCurrentUser();
    if(user) {
        user.signOut();
    };
};

    return (
        <AccountContext.Provider value={{ authenticate, getSession}}>
            {props.children}
        </AccountContext.Provider>
    );
    };

export default {Account, AccountContext};