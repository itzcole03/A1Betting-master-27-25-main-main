import { JSDOM } from 'jsdom';

if (typeof window === 'undefined' || typeof document === 'undefined') {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  global.HTMLElement = dom.window.HTMLElement;
  global.Node = dom.window.Node;
  global.getComputedStyle = dom.window.getComputedStyle;
}
// Add any additional global mocks or env vars here if needed. 