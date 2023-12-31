import axios, { AxiosResponse } from "axios";
import GoogleOAuthRequestPreparator from "./GoogleOAuthRequestPreparator";
import { Token, OAuthRequestPreparator } from "./interfaces";
import { buildUrlFromParameters } from "../utils/urlBuilder";

function buildTokenRequestUrl(preparator: OAuthRequestPreparator, code: string, state: string): string {
  const parameters = preparator.prepareTokenRequestParameters(code);
  const finalTokenUrl: string = buildUrlFromParameters(preparator.token_uri, parameters, "Token");

  return finalTokenUrl;
}

export async function handleGoogleOAuthSignIn() {

  const authCodeRequestPreparator: OAuthRequestPreparator = new GoogleOAuthRequestPreparator();
  const form = authCodeRequestPreparator.getAuthCodeRequestForm();

  document.body.appendChild(form);
  form.submit();
}

export async function handleGoogleOAuthTokenRetrieval(state: string, code: string, scope: string): Promise<AxiosResponse<Token, any>> {
  const authCodeRequestPreparator: OAuthRequestPreparator = new GoogleOAuthRequestPreparator();

  const localState: string = localStorage.getItem("localState") ?? "";
  if (localState !== "" && localState !== state) {
    throw new Error("States do not match");
  }

  const tokenUrl = buildTokenRequestUrl(authCodeRequestPreparator, code, state);

  return axios.post(tokenUrl);
}