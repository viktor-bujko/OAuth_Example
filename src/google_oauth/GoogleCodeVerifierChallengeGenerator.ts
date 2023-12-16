import { encode } from 'js-base64';
import { SHA256 } from "crypto-ts";
import rndstring, { GenerateOptions } from "randomstring";
import { PkceCodeChallengeGenerator, PkceVerifier } from "./interfaces";

export default class GoogleCodeVerifierChallengeGenerator implements PkceCodeChallengeGenerator {

  generateCodeVerifierAndChallenge(): PkceVerifier {
    const codeVerifier = rndstring.generate({
      length: 100,
      readable: false,
      charset: "alphanumeric"
    } as GenerateOptions);

    const encodedVerifier = encode(codeVerifier);

    console.log(`Verifier: ${codeVerifier}`);
    console.log(`base64 encoded verifier: ${encodedVerifier}`)

    const hashedEncoded = encode(SHA256(codeVerifier));
    console.log(`Hashed encoded: ${hashedEncoded}`);

    return {
      verifier: encodedVerifier,
      challenge: codeVerifier //hashedEncoded
    } as PkceVerifier;
  }

}

