// From: https://github.com/sindresorhus/bind-methods
// For some reason, installing and importing the package did not work
export default function bindMethods(object, context) {
  context = context || object;

  for (const [key, value] of Object.entries(object)) {
    if (typeof value === "function") {
      object[key] = value.bind(context);
    }
  }

  return object;
}
