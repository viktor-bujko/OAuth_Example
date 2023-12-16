export function buildUrlFromParameters(baseUrl: string, parameters, debugKey: string = "") {
  const urlParams: string = Object
    .keys(parameters)
    .map(key => {
      const param = `${key}=${parameters[key]}`;
      console.log(` ${debugKey} URL parameter: `, param);
      return param;
    })
    .join("&");

  console.log(`${debugKey} Params array: ${urlParams}`);
  const finalUrl: string = [baseUrl, urlParams].join("?");
  console.log(`${debugKey} URL: `, finalUrl);

  return finalUrl;
}