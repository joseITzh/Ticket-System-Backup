import { CognitoUserPool } from "amazon-cognito-identity-js";

// Create object to hold pool data.

const poolData = {
    UserPoolId: "",
    ClientId: ""
}

export default new CognitoUserPool(poolData) //Why "new"?