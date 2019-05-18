import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | documents/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:documents/new');
    assert.ok(route);
  });
});
