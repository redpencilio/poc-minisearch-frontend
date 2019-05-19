import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import {action} from '@ember/object';
import Search from 'minisearch/models/search';

export default class SearchInputComponent extends Component {
  @tracked
  searchType="fuzzy"

  @tracked
  titleSearch=""
  @tracked
  descriptionSearch=""
  @tracked
  attachmentSearch=""

  @action
  search(event) {
    event.preventDefault();
    this.doSearch();
  }

  @action
  updateSearchType(newType) {
    this.searchType = newType;
    this.doSearch();
  }

  doSearch() {
    const settings = new Search({
      title: this.titleSearch,
      description: this.descriptionSearch,
      attachment: this.attachmentSearch, 
      type: this.searchType
    });

    if( typeof this.args.onSearch === "function" )
      this.args.onSearch( settings );
    else
      console.log(`No search function: ${JSON.stringify( settings)}`);
  }
}
