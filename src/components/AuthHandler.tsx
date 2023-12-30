import { useState } from "react";
import { handleGoogleOAuthTokenRetrieval } from "../google_oauth/oauth";
import { Link, useSearchParams } from "react-router-dom";
import { Token } from "../google_oauth/interfaces";

const handleTokenRetrievalError = (error, setToken) => {
  console.error("An error occurred while sending POST request: ", error)
  const errorToken: Token = {
    access_token: error.message,
    scope: JSON.stringify(error.response.data),
    expires_in: 0,
    refresh_token: error.message,
    token_type: "Bearer"
  }
  setToken(errorToken)
}

const AuthHandler = ({ tokenState }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = tokenState;
  const [disabled, setDisabled] = useState(false);

  const retrieveToken = async () => {
    const state: string = nullableToString(searchParams.get("state"));
    const code: string = nullableToString(searchParams.get("code"));
    const scope: string = nullableToString(searchParams.get("scope"));

    handleGoogleOAuthTokenRetrieval(state, code, scope)
      .then(tokenResponse => {
        console.log(`Token response status ${tokenResponse.status}`);
        console.log(tokenResponse);
        const retrievedToken: Token = tokenResponse.data;

        setToken(retrievedToken);
        localStorage.setItem("token", JSON.stringify(retrievedToken));
        console.log("Set new access token");
        setDisabled(true);
      })
      .catch(error => handleTokenRetrievalError(error, setToken));

  }

  const nullableToString = (value: string | null) => {
    return value == null ? "" : value.toString();
  }

  return (
    <>
      <button onClick={retrieveToken} disabled={disabled}>Click for token retrieval</button>
      {disabled
        ? <div><Link to="/calendar/events">Show calendar events</Link></div>
        : <></>
      }
      <div>
        {JSON.stringify(token, undefined, 4)}
      </div>
    </>
  )
}

export default AuthHandler;