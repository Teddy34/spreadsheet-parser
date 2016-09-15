const _ = require('lodash');

function cacheFunction(myFuncToCache, cacheDuration, hashFunction, context) {
  // we need to return a different throttled function for each different parameters so memoize it
  var memoizedFunction = _.memoize(() => {
    const myFuncToCacheArguments = arguments;
    const throttledFunc = _.throttle(myFuncToCache, cacheDuration, {trailing: false});
    return () => {return throttledFunc.apply(null, myFuncToCacheArguments);};
  }, hashFunction);

  return () => {
    // apply the throttled function
    return memoizedFunction.apply(context, arguments)();
  };
}

module.export = {
  cacheFunction : cacheFunction
}