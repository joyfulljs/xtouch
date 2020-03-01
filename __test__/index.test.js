const XTouch = require('../dist/index.c.js').default;
const $ = require('jquery');
const jestUtils = require('@joyfulljs/jest-utils');

jestUtils.mockEventBinding();

beforeEach(() => {
  delete window.ontouchstart;
});

test('bind touch device correctly', () => {
  const div = document.createElement('div');
  window.ontouchstart = undefined;

  const onStart = jest.fn();
  const onMove = jest.fn();
  const onEnd = jest.fn();

  XTouch(div, { onStart, onMove, onEnd });

  $(div).trigger('touchstart');
  $(window).trigger('touchmove')
    .trigger('touchend');
  expect(onStart).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
  expect(onEnd).toHaveBeenCalledTimes(1);
});

test('bind mouse device correctly', () => {
  const div = document.createElement('div');

  const onStart = jest.fn();
  const onMove = jest.fn();
  const onEnd = jest.fn();
  const onCancel = jest.fn();

  XTouch(div, { onStart, onMove, onEnd });

  $(div).trigger('mousedown');
  $(window).trigger('mousemove')
    .trigger('mouseup');
  expect(onStart).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
});
