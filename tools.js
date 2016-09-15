const _ = require('lodash');

function cacheFunction(myFuncToCache, cacheDuration, hashFunction, context) {
  // we need to return a different throttled function for each different parameters so memoize it
  const memoizedFunction = _.memoize(function() {
    const myFuncToCacheArguments = arguments;
    const throttledFunc = _.throttle(myFuncToCache, cacheDuration, {trailing: false});
    return  () => throttledFunc.apply(null, myFuncToCacheArguments);
  }, hashFunction);

  return function applyMemoizedFunction() {
    // apply the throttled function
    return memoizedFunction.apply(context, arguments)();
  };
}

module.exports = {
  cacheFunction : cacheFunction
};