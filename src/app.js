import instantsearch from 'instantsearch.js';
import { searchBox, hits, pagination, index } from 'instantsearch.js/es/widgets';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'yMFItSjur2ltKLHgGooKRUjdU9twHhI8', // Reemplaza con tu API Key de Typesense
    nodes: [
      {
        host: 'localhost', // Reemplaza con tu host de Typesense
        port: 8108, // Reemplaza con tu puerto de Typesense
        protocol: 'http', // Reemplaza con tu protocolo de Typesense
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name', // Reemplaza con los campos por los que deseas buscar
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  indexName: 'dishes_view', // Reemplaza con el nombre de tu índice
  searchClient,
});

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Search for products',
  }),
  hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <strong>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</strong>
          <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
        </div>
      `,
    },
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();