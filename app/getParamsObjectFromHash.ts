export function getParamsObjectFromHash() {
  const hash = window.location.hash ? window.location.hash.split('#') : [];
  let toBeReturned = {};
  if (hash.length && hash[1].split('&').length) {
    toBeReturned = hash[1].split('&').reduce((acc, x) => {
      const hello = x.split('=');
      if (hello.length === 2)
        acc[hello[0]] = hello[1];
      return acc;
    }, {});
  }
  return Object.keys(toBeReturned).length ? toBeReturned : null;
}
