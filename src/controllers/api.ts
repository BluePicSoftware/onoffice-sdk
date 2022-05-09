import { hmac } from "../util/helpers";
import { IAction, IOFAPIResponse } from "../types";
import axios from "axios";

export function signAction(action: IAction, token: string, secret: string) {
  const { resourcetype, actionid } = action;

  const timestamp = Date.now();

  const actionStr = [timestamp, token, resourcetype, actionid].join("");
  console.log(actionStr);
  const hmacSign = hmac(actionStr, secret);
  console.log("signed:");
  console.log(hmacSign);

  return {
    ...action,
    timestamp,
    hmac_version: 2,
    hmac: hmacSign,
  };
}

export async function fetchActions(
  actions: IAction[],
  token: string,
  secret: string,
  endpoint: string,
  responseType:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "stream"
    | "text" = "json"
) {
  const signedActions = [];
  for(const action of actions) {
    const signedAction = signAction(action, token, secret);
    signedActions.push(signedAction); 
  }
  const payload = {
    token,
    request: {
      actions: signedActions,
    },
  };
  console.log(JSON.stringify(payload));
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      endpoint,
      payload,
      { responseType }
    );
    console.log(":::RESPONSE:::")
    console.log(response);
    console.log(JSON.stringify(response));
    console.log(":::END:::")
    if (response.status != 200) {
      throw "API call failed with status: " + response.status;
    }
    return response.data as IOFAPIResponse;
  }
  catch(err) {
    console.log("error");
    console.log(JSON.stringify(err));
    throw err;
  }
}
