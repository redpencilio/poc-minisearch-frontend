import { tracked } from '@glimmer/tracking';

export default class Search {
  @tracked
  title = ""

  @tracked
  description = ""

  @tracked
  attachment = ""

  @tracked
  type = "fuzzy"

  constructor( properties = {} ){
    Object.assign( this, properties );
    // if( title ) this.title = title;
    // if( description ) this.description = description;
    // if( attachment ) this.attachment = attachment;
    // if( type ) this.type = type;
  }
}
