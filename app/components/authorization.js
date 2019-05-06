import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Object, {action, set} from '@ember/object';
import fetch from 'fetch';

export default class AuthorizationComponent extends Component {
  @tracked
  open = false

  constructor() {
    super(...arguments);

    this.roles = [
      Object.create({ 
        name: "Mister mole",
        active: false,
        group: JSON.stringify([])
      }),
      Object.create({ 
        name: "John Doe",
        active: false,
        group: JSON.stringify([{ name: "documents", variables: ["human"] }])
      }), // <!-- Can see like us -->
      Object.create({ 
        name: "SuperMan",
        active: false,
        group: JSON.stringify([{ name: "documents", variables: ["human"] }, { name: "documents", variables: ["laser"] }])
      }), // <!-- Can see like us + lazers! -->
      Object.create({ 
        name: "Batman",
        active: false,
        group: JSON.stringify([{ name: "documents", variables: ["human"] }, { name: "documents", variables: ["radar"] }])
      }) // <!-- Can see with radar -->
    ];

    this.setActiveRole(this.roles[1]);
  }

  @action
  async setActiveRole( role ) {
    await fetch( "/mockauth/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: role.group
    } );

    this.roles.forEach( (scannedRole) => {
      set( scannedRole, "active", scannedRole == role );
    } );
  }
}
