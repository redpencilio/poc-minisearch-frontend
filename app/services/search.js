import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import fetch from 'fetch';
import Search from 'minisearch/models/search';

function asyncFetch( ...args ) {
  return new Promise( (resolve) => {
    fetch( ...args ).then( (...response) => resolve( ...response ) );
  });
}

export default class SearchService extends Service {
  @tracked
  results = []

  @tracked
  lastSearch = new Search()

  @action
  async execute() {
    const search = this.lastSearch;

    if( search &&
        ( search.title || search.description || search.attachment ) )
    {
      console.log(`Searching for ${JSON.stringify(search)}`);
      const url = new URL("/documents/search", window.location.href);
      if( search.title )
        url.searchParams.append(`filter[:${search.type}:title]`, search.title);
      if( search.description )
        url.searchParams.append(`filter[:${search.type}:description]`, search.description);
      if( search.attachment )
        url.searchParams.append(`filter[:${search.type}:data]`, search.attachment);
      const response = await asyncFetch( url );
      const json = await response.json();
      this.lastSearch = search;
      this.results = json.data;
    } else {
      this.results = [];
    }    
  }

  @action
  async update( search ) {
    this.lastSearch = search;
    await this.execute();
  }
}
