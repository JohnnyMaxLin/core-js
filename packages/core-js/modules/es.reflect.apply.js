var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var nativeApply = (require('../internals/global').Reflect || {}).apply;
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !require('../internals/fails')(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply
require('../internals/export')({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction(target);
    anObject(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});
