import get from 'lodash.get';

export default function select(collection, pathOrFunction, defaultValue) {
  if (typeof pathOrFunction === 'string') return get(collection, pathOrFunction, defaultValue);
  if (typeof pathOrFunction === 'function') {
    const value = pathOrFunction(collection);
    return typeof value === 'undefined' ? defaultValue : value;
  }
  return defaultValue;
}
