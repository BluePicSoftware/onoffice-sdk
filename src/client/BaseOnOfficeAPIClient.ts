import { IActionParams, IActionId, IActionReadParams, IOFAPIResponse, IActionFilter, IEstateRecord, IEstateFilesRecord, IFileDescriptor } from "../types";
import { IActionGetParams } from "../types/actions";
import { ALL_ESTATE_FIELDS } from '../models';

export default abstract class OnOfficeAPIClient {
  
  protected abstract fetchAction<TRecord>(
    actionId: IActionId,
    resourceType: string,
    indentifier: string,
    resourceId: string,
    parameters: IActionParams
  ): Promise<IOFAPIResponse<TRecord>> 

  getEstates(filter: IActionFilter = {}, data: string[] = ALL_ESTATE_FIELDS) {
    return this.readResource<IEstateRecord>('estate', {
      data,
      filter
    });
  }
  getEstate(id: number, data: string[] = ALL_ESTATE_FIELDS) {
    return this.readResource<IEstateRecord>('estate', {
      data
    }, id).then(res => res[0]);
  }
  getEstateImages(id: number) {
    return this.getResource<IEstateFilesRecord>('estatepictures', {
      estateids: [id],
      categories: ['Foto'],
      size: 'original',
      language: 'GER'
    }).then(records => new Array<IFileDescriptor>().concat(...records.map(({ elements }) => elements)));
  }
  getResource<TRecord>(type: string, parameters: IActionGetParams) {
    return this.fetchAction<TRecord>(
      'urn:onoffice-de-ns:smart:2.5:smartml:action:get',
      type,
      '',
      '',
      parameters
    ).then(res => OnOfficeAPIClient.reduceActionsResponse<TRecord>(res)).then(results => results[0].data.records);
  }
  readResource<TRecord>(type: string, parameters: IActionReadParams, id: string | number = '') {
    return this.fetchAction<TRecord>(
      'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
      type,
      '',
      String(id),
      parameters
    ).then(res => OnOfficeAPIClient.reduceActionsResponse<TRecord>(res)).then(results => results[0].data.records);
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
  static reduceActionsResponse<TRecord>(res: IOFAPIResponse<TRecord>) {
    return res.response.results;
  }
}
