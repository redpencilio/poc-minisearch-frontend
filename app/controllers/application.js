import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked
  searchResult = []

  lastSearch = undefined;

  @action
  async search( search ) {
    this.lastSearch = search;
    this.executeSearch();
  }

  @action
  async executeSearch() {
    const search = this.lastSearch;
    if( search && search != "" ) {
      console.log(`Searching for ${search}`);
      const url = new URL("/documents/search", window.location.href);
      url.searchParams.append("filter[_all]", search);
      fetch(url).then( async (response) => {
        const json = await response.json();
        this.searchResult = json.data;
      });
    }
  }
}
