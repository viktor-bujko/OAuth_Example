import axios, { AxiosResponse } from "axios";
import GoogleOAuthRequestPreparator from "./GoogleOAuthRequestPreparator";
import GoogleCodeVerifierChallengeGenerator from "./GoogleCodeVerifierChallengeGenerator";
import { Token, OAuthRequestPreparator, PkceVerifier } from "./interfaces";
import { buildUrlFromParameters } from "../utils/urlBuilder";

function buildAuthCodeRequestUrl(verifier: PkceVerifier, preparator: OAuthRequestPreparator): string {

  const parameters = preparator.prepareAuthCodeRequestParameters(verifier.challenge);
  const finalAuthorisationUrl: string = buildUrlFromParameters(preparator.auth_uri, parameters, "Authorisation");
  
  return finalAuthorisationUrl;
}

function buildTokenRequestUrl(verifier: PkceVerifier, preparator: OAuthRequestPreparator, code: string, state: string): string {
  const parameters = preparator.prepareTokenRequestParameters(code, verifier.verifier);
  const finalTokenUrl: string = buildUrlFromParameters(preparator.token_uri, parameters, "Token");

  return finalTokenUrl;
}

function getAuthCodeResponseCode(response: AxiosResponse<any, any>): string {

  console.log("Auth response: ", response);

  if (response.status !== 200) {
    const msg = `Authorisation code request failed. Status: ${response.status}; ${response.statusText}`;
    console.error(msg);
    throw Error(msg);
  }

  return "";
}

function retrieveToken(response: AxiosResponse<any, any>): Token {

  console.log("Token response: ", response);
  if (response.status !== 200) {
    const msg = `Token request failed. Status: ${response.status}; ${response.statusText} ${response.data}`;
    console.error(msg);
    throw Error(msg);
  }

  return response.data as Token;
}

export async function handleGoogleOAuthSignIn() {

  const authCodeRequestPreparator: OAuthRequestPreparator = new GoogleOAuthRequestPreparator();
  const codeVerifierGenerator = new GoogleCodeVerifierChallengeGenerator();

  const verifier = codeVerifierGenerator.generateCodeVerifierAndChallenge();

  //const authUrl = //buildAuthCodeRequestUrl(verifier, authCodeRequestPreparator);
  const form = authCodeRequestPreparator.mockup();
  document.body.appendChild(form);
  form.submit();
  // const authResponse = await axios.post(authUrl, {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*"
  //   }
  // });

  // const code: string = getAuthCodeResponseCode(authResponse);

  // const tokenUrl = buildTokenRequestUrl(verifier, authCodeRequestPreparator, code);
  // const tokenResponse = await axios.post(tokenUrl);

  // const token = retrieveToken(tokenResponse);
  // console.log("Token: ", token);
}

export async function handleGoogleOAuthTokenRetrieval(state: string, code: string, scope: string): Promise<AxiosResponse<Token, any>> {
  const authCodeRequestPreparator: OAuthRequestPreparator = new GoogleOAuthRequestPreparator();
  const codeVerifierGenerator = new GoogleCodeVerifierChallengeGenerator();

  const verifier = codeVerifierGenerator.generateCodeVerifierAndChallenge();
  
  const tokenUrl = buildTokenRequestUrl(verifier, authCodeRequestPreparator, code, state /**TODO */);

  return axios.post(tokenUrl);
}