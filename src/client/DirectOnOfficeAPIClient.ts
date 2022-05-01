import { fetchActions } from "../controllers/api";
import { IAction, IActionParams, IActionId } from "../types";
import BaseOnOfficeAPIClient from "./BaseOnOfficeAPIClient";

export default class DirectOnOfficeAPIClient extends BaseOnOfficeAPIClient {
  baseURL: string;
  secret: string;
  constructor(token: string, secret: string, version?: string) {
    super(token);
    this.secret = secret;
    this.baseURL = DirectOnOfficeAPIClient.getAPIBaseURL(version);
  }

  protected fetchAction(
    actionId: IActionId,
    resourceType: string,
    indentifier: string,
    resourceId: string,
    parameters: IActionParams
  ) {
    return fetchActions(
      [
        {
          actionid: actionId,
          indentifier,
          parameters,
          resourceid: resourceId,
          resourcetype: resourceType,
        } as IAction,
      ],
      this.token,
      this.secret,
      this.baseURL,
      "json"
    );
  }

  public static getAPIBaseURL(version = "stable") {
    return `https://api.onoffice.de/api/${version}/api.php`;
  }
}
