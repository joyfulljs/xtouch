const XTouch = require('../dist/index.c.js').default;
const $ = require('jquery');

const oldWinAddEvt = window.addEventListener;
const oldElAddEvt = HTMLElement.prototype.addEventListener;

beforeEach(() => {
  window.addEventListener = function (type, fn) {
    window.addEventListener = oldWinAddEvt;
    $(this).on(type, fn);
  }
  HTMLElement.prototype.addEventListener = function (type, fn) {
    HTMLElement.prototype.addEventListener = oldElAddEvt;
    $(this).on(type, fn);
  }
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

  $(div).trigger('touchstart');
  expect(onStart).toHaveBeenCalledTimes(1);
});

test('bind none-touch device correctly', () => {
  const div = document.createElement('div');

  const onStart = jest.fn();
  const onMove = jest.fn();
  const onEnd = jest.fn();
  const onCancel = jest.fn();

  XTouch(div, onStart, onMove, onEnd, onCancel);

  $(div).trigger('mousedown');
  expect(onStart).toHaveBeenCalledTimes(1);
});
