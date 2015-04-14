'use strict';

var test = require('cached-tape');
var SingleStat = require('../../grafana/panels/singlestat');

var simpleSingleStat = require('../fixtures/simple_singlestat.js');
var overrideSingleStat = require('../fixtures/override_singlestat.js');

test('simple SingleStat Panel', function t(assert) {
  var graph = new SingleStat();
  graph.state.id = simpleSingleStat.id;

  assert.deepEqual(graph.generate(), simpleSingleStat);
  assert.end();
});

test('Single Stat panel with overriden information', function t(assert) {
	var graph = new SingleStat({
		span: 4,
		title: 'custom title'
	});
	graph.state.id = overrideSingleStat.id;

	assert.deepEqual(graph.generate(), overrideSingleStat);
	assert.end();
});

test('add graph to row and dashboard when passed', function t(assert){
	var calledAddPanel = 0;
	var calledAddRow = 0;

	new SingleStat({
		row: {
			addPanel: function addPanel() {
				calledAddPanel += 1;
			}
		},

		dashboard: {
			addRow: function addRow() {
				calledAddRow += 1;
			}
		}
	});

	assert.deepEqual(calledAddRow, 1);
	assert.deepEqual(calledAddPanel, 1);
	assert.end();
});
