import {
  IAction,
  IActionId,
  IActionParams,
  IActionReadParams,
  IActionFilter
} from "./actions";

export { IAction, IActionId, IActionParams, IActionReadParams, IActionFilter };

export type IOFAPIResponse<TRecord> = {
  status: {
    code: number;
    errorcode: number;
  };
  response: {
    results: IOFActionResult<TRecord>[];
  };
};

export type IOFActionResult<TRecord> = {
  actionid: string;
  resourceid: string;
  resourcetype: string;
  identifier: string;
  data: {
    records: TRecord[];
  };
  status: {
    code: string;
    message: string;
  };
};

export type IRecord<Name, TRecord> = {
  id: number;
  type: Name;
  elements: TRecord[];
}

export type IEstateRecord = IRecord<'estate', { [k: string]: unknown; }>;

export type IParkingLot = {
  Count: string;
  Price: number;
  MarketingType: string;
}
export type IFileDescriptor = {
  estateid: string;
  type: string;
  url: string;
  title: string;
  text: string;
  originalname: string;
  modified: number;
  estateMainId: string;
}
export type IEstateFilesRecord = IRecord<'files', IFileDescriptor>;