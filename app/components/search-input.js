import Component from '@glimmer/component';
import {action} from '@ember/object';

export default class SearchInputComponent extends Component {
  @action
  search(event) {
    event.preventDefault();
    if( typeof this.args.onSearch === "function" )
      this.args.onSearch( this.value );
    else
      console.log(`No search function: ${this.value}`);
  }
}