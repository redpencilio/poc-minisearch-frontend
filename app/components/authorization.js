import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Object, {action} from '@ember/object';
import fetch from 'fetch';

export default class AuthorizationComponent extends Component {
  @service authorization;

  @alias( "authorization.roles" ) roles
  @alias( "authorization.activeRole" ) activeRole
  
  @action async setActiveRoleByName( name ) {
    const role = await this.authorization.setActiveRoleByName( name );
    if( this.args.onAuthorize ) {
      console.log("Got callback for authorize");
      this.args.onAuthorize( role );
    } else {
      console.log("There is no callback for authorize");
    }
  }
}
