import { useEffect, useState } from "react";
import { handleGoogleOAuthTokenRetrieval } from "../google_oauth/oauth";
import { useSearchParams } from "react-router-dom";
import { Token } from "../google_oauth/interfaces";

const AuthHandler = () => {

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

  const click = async () => {
    const state: string = nullableToString(searchParams.get("state"));
    const code: string = nullableToString(searchParams.get("code"));
    const scope: string = nullableToString(searchParams.get("scope"));
    const token = await handleGoogleOAuthTokenRetrieval(state, code, scope);

    setToken(token);
  }

  const nullableToString = (value: string | null) => {
    return value == null ? "" : value.toString();
  }

  const [searchParams, _] = useSearchParams();
  const [token, setToken] = useState({} as Token);

  return (
    <>
      <div>Hello from Auth page</div>
      <button onClick={click}>Click me</button>
      <button onClick={() => setToken(token)}>Set token</button>
      <div>
        {JSON.stringify(token)}
      </div>
      {/* <div>
        {Object.keys(token).map(key => 
          <>
            <p>{key}</p>
            <p>{token[key]}</p>
          </>)}
      </div> */}
    </>
  )
}

export default AuthHandler;