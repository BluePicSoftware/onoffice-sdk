import {
  IAction,
  IActionId,
  IActionParams,
  IActionReadParams,
} from "./actions";

export { IAction, IActionId, IActionParams, IActionReadParams };

export type IOFAPIResponse = {
  status: {
    code: number;
    errorcode: number;
  };
  response: IOFActionResult;
};

export type IOFActionResult = {
  actionid: string;
  resourceid: string;
  resourcetype: string;
  identifier: string;
  status: {
    code: string;
    message: string;
  }
};