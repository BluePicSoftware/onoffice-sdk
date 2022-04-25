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
    message: string;
    errorcode: number;
  };
  response: any;
};
export type IOFActionResult = any;
export interface IOFAPIResponseActions extends IOFAPIResponse {
  response: {
    results: IOFActionResult[];
  };
}
