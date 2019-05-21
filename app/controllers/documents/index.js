import { action } from '@ember/object';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class IndexController extends Controller {
  @computed('document.documentVersions.[]')
  get documentVersion() {
    return this.document && this.documentVersion && this.documentVersion[0];
  }
}


