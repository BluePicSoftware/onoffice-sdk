import { hmac } from "../util/helpers";
import { IAction, IOFAPIResponse } from "../types";
import axios from "axios";

export function signAction(action: IAction, token: string, secret: string) {
  const { resourcetype, actionid } = action;

  //PHP timestamps are SECONDS since 01.01.1970
  const timestamp = Math.round(Date.now() / 1000);

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
      actions: actions.map((a) => signAction(a, token, secret)),
    },
  };

  const response = await axios.post(
    endpoint,
    payload,
    { responseType }
  );
  if (response.status != 200) {
    throw "API call failed with status: " + response.status;
  }
  return response.data as IOFAPIResponse;
}
