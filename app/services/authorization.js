import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import fetch from 'fetch';

class Role {
  @tracked name
  @tracked active
  @tracked group
  @tracked image

  constructor( {name, active, group, image} ) {
    this.name = name;
    this.active = active;
    this.group = group;
    this.image = image;
  }
}

export default class AuthorizationService extends Service {
  @tracked
  open = false

  @tracked
  roles = []

  constructor() {
    super(...arguments);

    this.roles = [
      new Role({
        name: "Mister mole",
        active: false,
        group: JSON.stringify([ { name: "clean", variables: [] }]),
        image: "https://vignette.wikia.nocookie.net/villains/images/7/78/Speckles.png/revision/latest?cb=20100904134839"
      }),
      new Role({
        name: "John Doe",
        active: false,
        // "[{\"variables\":[],\"name\":\"public\"},{\"variables\":[\"http://www.openlinksw.com/virtrdf-data-formats#default-iid\"],\"name\":\"read_documents\"},{\"variables\":[\"http://www.openlinksw.com/virtrdf-data-formats#default-iid\"],\"name\":\"write_documents\"},{\"variables\":[],\"name\":\"clean\"}]"
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "write_documents", variables: ["human"] }, { name: "read", variables: [] }, { name: "clean", variables: [] } ]),
        image: "https://sabotagetimes.com/.image/t_share/MTI5NDgzNzA0OTg4MDY5ODU4/godfather.png"
      }), // <!-- Can see like us -->
      new Role({
        name: "SuperMan",
        active: false,
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "read_documents", variables: ["superman"] }, { name: "write_documents", variables: ["superman"] }, { name: "read", variables: [] }, { name: "clean", variables: [] }]),
        image: "https://www.thewrap.com/wp-content/uploads/2016/03/BvS.jpg"
      }), // <!-- Can see like us + lazers! -->
      new Role({
        name: "Batman",
        active: false,
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "read_documents", variables: ["batman"] }, { name: "write_documents", variables: ["batman"] }, { name: "read", variables: [] }, { name: "clean", variables: [] }]),
        image: "https://www.neolaia.gr/wp-content/uploads/2018/10/reeves-the-batman-will-begin-an-arc.jpg"
      }),
      new Role({
        name: "Aquaman",
        active: false,
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "read_documents", variables: ["aquaman"] }, { name: "write_documents", variables: ["aquaman"] }, { name: "read", variables: [] }, { name: "clean", variables: [] }]),
        image: "https://static.posters.cz/image/750/poster/aquaman-pin-up-i65952.jpg"
      })// <!-- Can see the water  -->
    ];

    this.setActiveRole(this.roles[1]);
  }

  get activeRole() {
    return this.roles.find( (role) => role.active );
  }

  @action
  async setActiveRoleByName( roleName ) {
    for( const role of this.roles ) {
      if( role.name === roleName ) {
        const response = await this.setActiveRole( role );
        return response;
      }
    }
    return false;
  }

  @action
  async setActiveRole( role ) {
    this.roles.forEach( (scannedRole) => {
      scannedRole.active = scannedRole == role;
    } );

    await fetch( "/mockauth/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({body: role.group})
    } );

    this.roles.forEach( (scannedRole) => {
      scannedRole.active = scannedRole == role;
    } );

    return role;
  }
}

export { Role }
