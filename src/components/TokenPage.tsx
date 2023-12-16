import { useState } from "react";
import { Token } from "../google_oauth/interfaces";

const TokenPage = () => {

  const [token, setToken] = useState({} as Token);

  return (
    <>
      {JSON.stringify(token)}
    </>
  )
}

export default TokenPage;