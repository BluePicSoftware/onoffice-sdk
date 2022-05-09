import { hmac } from "../util/helpers";
import { IAction, IOFAPIResponse } from "../types";
import axios from "axios";

export function signAction(action: IAction, token: string, secret: string) {
  const { resourcetype, actionid } = action;

  const timestamp = Date.now();

  const actionStr = [timestamp, token, resourcetype, actionid].join("");

  const hmacSign = hmac(actionStr, secret);

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
  const payload = {
    token,
    request: {
      actions: actions.map((action) => signAction(action, token, secret)),
    },
  };
  console.log(JSON.stringify(payload));
  const response = await axios.post(
    endpoint,
    payload,
    { responseType }
  );
  console.log(":::RESPONSE:::")
  console.log(JSON.stringify(response));
  if (response.status != 200) {
    throw "API call failed with status: " + response.status;
  }
  return response.data as IOFAPIResponse;
}
