import OnOfficeAPIClient from '../client';
import { inspect } from 'util';

const api = new OnOfficeAPIClient('TOKEN', 'SECRET');

(async () => {
  const res = await api.searchEstate({
    input: 'Aachen'
  });
  console.log(res);
})();