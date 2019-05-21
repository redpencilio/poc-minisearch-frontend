import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import fetch from 'fetch';

function asyncFetch( ...args ) {
  return new Promise( (resolve) => {
    fetch( ...args ).then( (...response) => resolve( ...response ) );
  });
}

export default class GenDocFetcherService extends Service {
  @tracked
  htmlSnippet = '';

  @tracked
  docVersion = undefined;

  @action
  async execute() {

    if( docVersion && docVersion.convertedFile )
    {
      console.log(`Fetching converted file`);
      const url = new URL(`/files/${docVersion.convertedFile.id}/download`, window.location.href);
      htmlSnippet = await asyncFetch( url );
    } else {
      this.htmlSnippet = '';
    }    
  }

  @action
  async update( docVersion ) {
    this.docVersion = docVersion;
    await this.execute();
  }
}
