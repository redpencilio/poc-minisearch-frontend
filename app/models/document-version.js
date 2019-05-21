import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default DS.Model.extend({
  versionNumber: DS.attr('string'),
  chosenFileName: DS.attr('string'),
  document: DS.belongsTo('document'),
  file: DS.belongsTo('file'),
  convertedFile: DS.belongsTo('file')
});

// export default class DocumentVersionModel extends Model {

// }
