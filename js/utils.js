// utils.js — small helpers exported for reuse
export function $ (sel) { return document.querySelector(sel); }
export function $all (sel) { return Array.from(document.querySelectorAll(sel)); }
export function on(el, ev, fn) { el && el.addEventListener(ev, fn); }
export function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
export function debounce(fn, ms = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function setGlobal(name, fn) {
  if (typeof window !== 'undefined') {
    window[name] = fn;
  }
}
