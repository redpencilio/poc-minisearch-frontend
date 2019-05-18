import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service search

  @action async doSearch( searchString ) {
    this.search.update( searchString );
    this.transitionToRoute( 'search' );
  }
}
