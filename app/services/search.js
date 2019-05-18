import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import fetch from 'fetch';

function asyncFetch( ...args ) {
  return new Promise( (resolve) => {
    fetch( ...args ).then( (...response) => resolve( ...response ) );
  });
}

export default class SearchService extends Service {
  @tracked
  results = []

  @tracked
  lastSearch = ""

  @action
  async execute() {
    const search = this.lastSearch;

    if( search && search != "" ){
      console.log(`Searching for ${search}`);
      const url = new URL("/documents/search", window.location.href);
      url.searchParams.append("filter[_all]", search);
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
