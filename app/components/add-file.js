import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class AddFileComponent extends Component {
  @service store

  @tracked
  uploadedFile = undefined

  @tracked
  title = ""
  @tracked
  description = ""

  @action
  async save(event) {
    event.preventDefault();
    let { uploadedFile, description, title } = this;

    const document = this.store.createRecord('document');
    document.setProperties( {
      title, description, file: uploadedFile
    });
    await document.save();
    this.uploadedFile = undefined;
    this.title = undefined;
    this.description = undefined;

    if( typeof this.args.onCreate === 'function' )
      this.args.onCreate();
  }

  @action
  async uploadFile(file) {
    // try {
    const response = await file.upload("/upload", {'Content-Type': 'multipart/form-data'});
    this.uploadedFile = await this.store.findRecord('file', response.body.data.id);
  }
}
