/** @jest-environment jsdom */
const { setCookie, getCookie } = require('./cookies.js');

beforeEach(() => {
  // Clear existing cookies
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
  });
});

describe('cookie utilities', () => {
  test('setCookie updates document.cookie', () => {
    setCookie('testName', 'testValue', 1);
    expect(document.cookie).toContain('testName=testValue');
  });

  test('getCookie retrieves the correct value', () => {
    setCookie('user', 'Jane Doe', 1);
    expect(getCookie('user')).toBe('Jane Doe');
  });

  test('supports special characters in values', () => {
    const specialValue = 'value with spaces & =equals';
    setCookie('special', specialValue, 1);
    expect(getCookie('special')).toBe(specialValue);
  });

  test('returns empty string for expired cookies', () => {
    setCookie('expired', 'gone', -1);
    expect(getCookie('expired')).toBe('');
    expect(document.cookie).not.toContain('expired=');
  });
});

