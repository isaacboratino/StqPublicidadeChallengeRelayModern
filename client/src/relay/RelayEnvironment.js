import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime';

  import {GlobalVariablesConfig} from '../configs/GlobalVariablesConfig';  
  
  function fetchQuery(operation, variables, cacheConfig, uploadables) {
    return fetch(GlobalVariablesConfig.urlServerGraphQL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json();
    });
  }
  
  const network = Network.create(fetchQuery);
  
  const source = new RecordSource();
  const store = new Store(source);
  
  const RelayEnvironment = new Environment({
    network,
    store,
  });
  
  export default RelayEnvironment;