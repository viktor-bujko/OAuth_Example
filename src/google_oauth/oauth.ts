import data from "../../client_secret_oAuth.json"
import rndstring, { GenerateOptions } from "randomstring";

interface GoogleOAuthClientSecretSchema {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  javascript_origins: string[];
};

interface GoogleOAuthAuthorisationBegin {
  response_type: "code",
  client_id: string,
  redirect_uri: string,
  scope: string,
  state: string
}

function prepareAuthorisationBeginRequest(): GoogleOAuthAuthorisationBegin {

  const clientSecret: GoogleOAuthClientSecretSchema = data.web;
  const scope: string = "calendars.events.readonly";
  const stateValue = rndstring.generate({
    length: 20,
    readable: false,
    charset: "hex"
  } as GenerateOptions);

  return {
    response_type: "code",
    client_id: clientSecret.client_id,
    state: stateValue,
    scope: scope,
    redirect_uri: ""
  } as GoogleOAuthAuthorisationBegin;
}


export function handleGoogleOAuthSignIn() {

  const authorisationBeginRequest = prepareAuthorisationBeginRequest();

}

