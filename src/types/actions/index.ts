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
export type TActionDoId = "urn:onoffice-de-ns:smart:2.5:smartml:action:do";
export type IActionFilter = {
  [k: string]: {
    op: ">" | "<" | "=";
    val: number;
  }[];
};

export type IImageSize = 'original';
export type ILangCode = 'ENG' | 'GER';

export interface IActionReadParams {
  data?: string[];
  filter?: IActionFilter;
  listlimit?: number;
  sortby?: {
    [k: string]: string;
  };
}
export interface IActionRead extends IActionGeneric {
  actionid: TActionReadId;
  parameters: IActionReadParams;
}

export interface IActionGetParams {
  input?: string;
  estateids?:  number[];
  categories?:  string[];
  size?: IImageSize;
  language?: ILangCode;
}
export interface IActionGet extends IActionGeneric {
  actionid: TActionGetId;
  parameters: IActionGetParams;
}

export interface IActionDo extends IActionGeneric {
  actionid: TActionDoId;
}
export interface IActionDoParams {
  parameterCacheId?: string;
  isRegularCustomer?: number;
}

export type IAction = IActionRead | IActionGet;
export type IActionId = TActionReadId | TActionGetId | TActionDoId;
export type IActionParams = IActionReadParams | IActionGetParams | IActionDoParams;
