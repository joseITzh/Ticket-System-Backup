import { useContext, useEffect, useState } from "react";
import { AccountContext } from './Account';

const Status = () => {
    const [status, setStatus] = useState(false);
    const {getSession, logout} = useState(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log("Session: ", session);
                setStatus(true);
            })
    }, []);
    return <div>{status ? (<button>Logout</button>) : "Please login"}</div>
};
export default Status;