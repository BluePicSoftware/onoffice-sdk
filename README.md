## API Client


The easiest way to use the API is the `OnOfficeAPIClient` class which provides straight-forward methods such as `searchResource()`.

```typescript
import { OnOfficeAPIController } from 'onoffice';

const api = new OnOfficeAPIClient('TOKEN', 'SECRET');

const res = await api.searchResource({
  input: 'Aachen'
});
console.log(res);
```

### Native Methods 

```typescript
import { fetchActions, signAction } from 'onoffice';

// More native interaction with onoffice API but still handling signing the request

const res = await fetchActions([
  {
    {
      actionid: "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
      identifier: "",
      parameters: {
        input: "Aachen"
      },
      resourceid: "estate",
      resourcetype: "search"
    }
  }
], 'TOKEN', 'SECRET', 'https://api.onoffice.de/api/latest/api.php', 'json');

// Anyway, this would just sign an action object 
const signedAction = signAction({
  actionid: "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
  identifier: "",
  parameters: {
    input: "Aachen"
  },
  resourceid: "estate",
  resourcetype: "search"
}, 'TOKEN', 'SECRET');

```