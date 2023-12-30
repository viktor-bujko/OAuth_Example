export interface GoogleOAuthClientSecretSchema {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  javascript_origins: string[];
};

export interface Token {
  token_type: "Bearer",
  expires_in: number,
  access_token: string,
  scope: string,
  refresh_token: string
}

interface RequestParams {
  client_id: string,
  redirect_uri: string,
}

export interface OAuthAuthCodeRequestParams extends RequestParams {
  response_type: "code",
  scope: string | string[],
  state: string,
  code_challenge: string,
  code_challenge_method: "S256"
}

export interface OAuthTokenRequestParams extends RequestParams {
  grant_type: "authorization_code",
  client_secret: string,
  code: string,
  code_verifier: string
}

export interface GoogleOAuthAuthCodeRequestParams extends OAuthAuthCodeRequestParams { }
export interface GoogleOAuthTokenRequestParams extends OAuthTokenRequestParams { }

export interface OAuthRequestPreparator {
  auth_uri: string;
  token_uri: string;
  prepareAuthCodeRequestParameters: (challenge?: string) => OAuthAuthCodeRequestParams;
  prepareTokenRequestParameters: (code: string) => OAuthTokenRequestParams;
  getAuthCodeRequestForm: () => HTMLFormElement;
}
