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
  const onCancel = jest.fn();

  XTouch(div, onStart, onMove, onEnd, onCancel);

  $(div).trigger('touchstart')
    .trigger('touchcancel');
  $(window).trigger('touchmove')
    .trigger('touchend');
  expect(onStart).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
  expect(onEnd).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test('bind none-touch device correctly', () => {
  const div = document.createElement('div');

  const onStart = jest.fn();
  const onMove = jest.fn();
  const onEnd = jest.fn();
  const onCancel = jest.fn();

  XTouch(div, onStart, onMove, onEnd, onCancel);

  $(div).trigger('mousedown');
  $(window).trigger('mousemove')
    .trigger('mouseup');
  expect(onStart).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
  expect(onMove).toHaveBeenCalledTimes(1);
});
