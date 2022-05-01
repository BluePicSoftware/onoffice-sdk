import { IActionParams, IActionId, IActionReadParams, IOFAPIResponse } from "../types";
import { IActionGetParams } from "../types/actions";

export default abstract class OnOfficeAPIClient {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
  
  protected abstract fetchAction(
    actionId: IActionId,
    resourceType: string,
    indentifier: string,
    resourceId: string,
    parameters: IActionParams
  ): Promise<IOFAPIResponse>

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
  unlockProvider(parameterCacheId: string, isRegularCustomer = 0) {
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
}
