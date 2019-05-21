import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  documentVersions: DS.hasMany('document-version')
});

// export default class DocumentModel extends Model {
//   @attr title;
//   @attr description;
//   @belongsTo file;
// }
