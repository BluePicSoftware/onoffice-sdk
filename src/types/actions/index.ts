export interface IActionGeneric {
  indentifier: string;
  resourceid: string;
  resourcetype: string;
  timestamp?: number;
  hmac_version?: 2;
  hmac?: string;
}

export type TActionReadId = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
export type TActionGetId = "urn:onoffice-de-ns:smart:2.5:smartml:action:get";

export interface IActionReadParams {
  data: string[];
  filter: {
    [k: string]: {
      op: ">" | "<" | "=";
      val: number;
    }[];
  };
  listlimit: number;
  sortby: {
    [k: string]: string;
  };
}
export interface IActionRead extends IActionGeneric {
  actionid: TActionReadId;
  parameters: IActionReadParams;
}

export interface IActionGetParams {
  input: string;
}
export interface IActionGet extends IActionGeneric {
  actionid: TActionGetId;
  parameters: IActionGetParams;
}

export type IAction = IActionRead | IActionGet;
export type IActionId = TActionReadId | TActionGetId;
export type IActionParams = IActionReadParams | IActionGetParams;
