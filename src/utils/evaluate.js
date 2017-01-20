export default function evaluate(stringOrFunction, ...args) {
  return typeof stringOrFunction === 'function' ? stringOrFunction(...args) : stringOrFunction;
}
