import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import fetch from 'fetch';

function asyncFetch( ...args ) {
  return new Promise( (resolve) => {
    fetch( ...args ).then( (...response) => resolve( ...response ) );
  });
}

export default class DocumentCardComponent extends Component {
  @tracked
  showPreview = false

  @tracked
  htmlSnippet = '';

  @action
  async togglePreview(){
    this.showPreview = ! this.showPreview;
    if( this.showPreview ){
      this.execute();
    }
  }

  @action
  async execute() {
    if( this.htmlSnippet != '' ) {
      if( this.args.documentVersion && this.args.documentVersion.convertedFile )
      {
        console.log(`Fetching converted file`);
        const url = new URL(`/files/${this.args.documentVersion.convertedFile.id}/download`, window.location.href);
        this.htmlSnippet = await asyncFetch( url );
      } else {
        this.htmlSnippet = '';
      }
    }
  }
}
