import OnOfficeAPIClient from '../client';
import { inspect } from 'util';

const api = new OnOfficeAPIClient('TOKEN', 'SECRET');

(async () => {
  const res = await api.searchResource({
    input: 'Aachen'
  });
  console.log(inspect(res, false, Infinity));
})();