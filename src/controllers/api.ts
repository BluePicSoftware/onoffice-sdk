import { hmac } from "../util/helpers";
import { IAction, IOFAPIResponseActions } from "../types";
import axios, { AxiosResponse } from "axios";

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

  try {
    const { data }: AxiosResponse<IOFAPIResponseActions> = await axios.post(
      endpoint,
      payload,
      { responseType }
    );
    const { status, response } = data;

    if (status.code >= 300) {
      return {
        error: {
          code: status.errorcode,
          message: status.message,
        },
        result: null,
      };
    } else {
      return {
        error: null,
        result: response.results.map(({ data }) => data),
      };
    }
  } catch (err) {
    return {
      error: {
        code: 1,
        message: "error with request",
      },
      result: null,
    };
  }
}
