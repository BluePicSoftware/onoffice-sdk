import { IAction, IActionParams, IActionId, IOFAPIResponse } from "../types";
import BaseOnOfficeAPIClient from "./BaseOnOfficeAPIClient";
import axios from "axios";

export default class ProxyOnOfficeAPIClient extends BaseOnOfficeAPIClient {
  proxyBaseURL: string;
  constructor(token: string, proxyBaseURL: string) {
    super(token);
    this.proxyBaseURL = proxyBaseURL;
  }

  protected fetchAction(
    actionId: IActionId,
    resourceType: string,
    indentifier: string,
    resourceId: string,
    parameters: IActionParams
  ) {
    return new Promise<IOFAPIResponse>(async (resolve, reject) => {
      try {
        const response = await axios.post(this.proxyBaseURL + "/onoffice/proxy/" + this.token, 
          {
            actionid: actionId,
            indentifier,
            parameters,
            resourceid: resourceId,
            resourcetype: resourceType,
          } as IAction
        );
        if(response.status != 200) {
          return reject('API call failed with status: ' + response.status);
        }
        resolve(response.data);
      }
      catch(err) {
        return reject(err);
      }
    });
  }
}
