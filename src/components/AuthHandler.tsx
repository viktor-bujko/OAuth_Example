import { useEffect, useState } from "react";
import { handleGoogleOAuthTokenRetrieval } from "../google_oauth/oauth";
import { Link, useSearchParams } from "react-router-dom";
import { Token } from "../google_oauth/interfaces";

const AuthHandler = ({ tokenState }) => {

  // useEffect(() => {
  //   const fx = async () => {
  //     const state: string = nullableToString(searchParams.get("state"));
  //     const code: string = nullableToString(searchParams.get("code"));
  //     const scope: string = nullableToString(searchParams.get("scope"));
  //     //const token = await handleGoogleOAuthTokenRetrieval(state, code, scope);
  //     //setToken(token);
  //   }
  //   fx();
  // }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = tokenState;
  const [disabled, setDisabled] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");

  const click = async () => {
    const state: string = nullableToString(searchParams.get("state"));
    const code: string = nullableToString(searchParams.get("code"));
    const scope: string = nullableToString(searchParams.get("scope"));

    handleGoogleOAuthTokenRetrieval(state, code, scope)
    .then(tokenResponse => {
      console.log(`Token response status ${tokenResponse.status}`);
      console.log(tokenResponse);
      const retrievedToken: Token = tokenResponse.data;
      
      setToken(retrievedToken);
      setDisabled(true);

      setProgressMsg("Writing accesstoken to file");
    })
    .catch(error => {
      console.error("An error occurred while sending POST request: ", error)
      const errorToken: Token = {
        access_token: error.message,
        scope: JSON.stringify(error.response.data),
        expires_in: 0,
        refresh_token: error.message,
        token_type: "Bearer"
      }
      setToken(errorToken)
    });
      
  }

  const nullableToString = (value: string | null) => {
    return value == null ? "" : value.toString();
  }

  return (
    <>
      <div>Authenticating ...</div>
      <button onClick={click} disabled={disabled}>Click me</button>
      {disabled 
        ? <div><Link to="/calendar/events">Show calendar events</Link></div>
        : <></>
      }
      <div>
        {JSON.stringify(token, undefined, 4)}
      </div>
      <div>{progressMsg}</div>
    </>
  )
}

export default AuthHandler;