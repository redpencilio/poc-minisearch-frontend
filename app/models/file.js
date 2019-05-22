import DS from 'ember-data';
const { Model, attr } = DS;

export default DS.Model.extend({
  filename: DS.attr(),
  format: DS.attr(),
  size: DS.attr(),
  extension: DS.attr(),
  // created: DS.attr('datetime')
});

// export default class FileModel extends Model {
//   @attr filename;
//   @attr format;
//   @attr size;
//   @attr extension;
//   @attr('datetime') created;
// }
