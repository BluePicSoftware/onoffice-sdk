import { fetchActions } from "../controllers/api";
import { IAction, IActionParams, IActionId, IActionReadParams } from "../types";
import { IActionGetParams } from "../types/actions";

export default class OnOfficeAPIClient {
  baseURL: string;
  token: string;
  secret: string;
  constructor(token: string, secret: string, version?: string) {
    this.token = token;
    this.secret = secret;
    this.baseURL = OnOfficeAPIClient.getAPIBaseURL(version);
  }
  private fetchAction(
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
  readResource(type: string, parameters: IActionReadParams) {
    return this.fetchAction(
      "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
      type,
      "",
      "",
      parameters
    );
  }
  searchResource(type: string, parameters: IActionGetParams) {
    return this.fetchAction(
      "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
      "search",
      "",
      type,
      parameters
    );
  }
  searchEstate(parameters: IActionGetParams) {
    return this.searchResource("estate", parameters);
  }
  unlockProvider(parameterCacheId: string, isRegularCustomer: number = 0) {
    return this.fetchAction(
      "urn:onoffice-de-ns:smart:2.5:smartml:action:do",
      "unlockProvider",
      "",
      "",
      {
        parameterCacheId,
        isRegularCustomer
      }
    )
  }
  static getAPIBaseURL(version = "stable") {
    return `https://api.onoffice.de/api/${version}/api.php`;
  }
}
