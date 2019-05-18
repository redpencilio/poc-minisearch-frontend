import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  @action
  transitionToSearch( searchString ) {
    this.transitionToRoute( 'search', { queryParams: { q: searchString } } );
  }
}
