import { encode } from 'js-base64';
import rndstring, { GenerateOptions } from "randomstring";
import {
  GoogleOAuthClientSecretSchema,
  GoogleOAuthAuthCodeRequestParams,
  GoogleOAuthTokenRequestParams,
  OAuthRequestPreparator
} from "./interfaces";
import secret from "../data/client_secret.json";
import clientData from "../data/client_data.json";


class GoogleOAuthRequestPreparator implements OAuthRequestPreparator {

  auth_uri: string;
  token_uri: string;

  constructor() {
    this.auth_uri = secret.web.auth_uri;
    this.token_uri = secret.web.token_uri;
  }

  getAuthCodeRequestForm = () => {
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', this.auth_uri);

    const scope: string[] = ["https://www.googleapis.com/auth/calendar.events.readonly"];

    const stateValue = rndstring.generate({
      length: 100,
      readable: false,
      charset: "alphanumeric"
    } as GenerateOptions);

    // saving generated state for comparison
    localStorage.setItem("localState", stateValue);
    
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: secret.web.client_id,
      redirect_uri: clientData.redirect_uri_auth,
      response_type: "code",
      scope: scope,
      include_granted_scopes: true,
      state: stateValue
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    return form;
  }

  prepareAuthCodeRequestParameters(challenge?: string): GoogleOAuthAuthCodeRequestParams {

    const clientSecret: GoogleOAuthClientSecretSchema = secret.web;
    const scope: string[] = ["https://www.googleapis.com/auth/calendar.events.readonly"];

    const stateValue = rndstring.generate({
      length: 100,
      readable: false,
      charset: "alphanumeric"
    } as GenerateOptions);

    challenge = (challenge === null || challenge === undefined)
      ? encode(stateValue)
      : challenge;

    return {
      response_type: "code",
      client_id: clientSecret.client_id,
      redirect_uri: clientData.redirect_uri_auth,
      scope: scope,
      state: stateValue,
      code_challenge: challenge,
      code_challenge_method: "S256"
    } as GoogleOAuthAuthCodeRequestParams;
  };

  prepareTokenRequestParameters(code: string): GoogleOAuthTokenRequestParams {

    return {
      client_id: secret.web.client_id,
      client_secret: secret.web.client_secret,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: clientData.redirect_uri_token,
      //code_verifier: verifier
    } as GoogleOAuthTokenRequestParams;
  }

}

export default GoogleOAuthRequestPreparator;