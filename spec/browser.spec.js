(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var gemoji, shortcode, shortcodes, names, unicode;

gemoji = require('gemoji');

names = gemoji.name;
shortcodes = gemoji.shortcode = {};

for (shortcode in names) {
    shortcodes[':' + shortcode + ':'] = names[shortcode];
}

function onchangeFactory(method) {
    return function () {
        var self = this,
            value = self.toString(),
            startNode, nodes, iterator, emoticon;

        if (value !== ':') {
            method(self, value);
            return;
        }

        startNode = self.prev;
        nodes = [];
        iterator = -1;

        while (startNode) {
            if (startNode.type === startNode.PUNCTUATION_NODE) {
                value = startNode.toString();

                if (value === ':') {
                    emoticon = nodes.reverse().join('');

                    if (gemoji.name[emoticon]) {
                        startNode.remove();

                        while (nodes[++iterator]) {
                            nodes[iterator].remove();
                        }

                        self.fromString(':' + emoticon + ':');
                    }

                    return;
                }

                // Many gemojis contain underscores, and two contain
                // dashes (`:e-mail:` and `:non-potable_water:`).
                if (value !== '_' && value !== '-') {
                    return;
                }
            }
            nodes.push(startNode);
            startNode = startNode.prev;
        }
    };
}

function encode(node, value) {
    value = gemoji.shortcode[value];

    if (value) {
        node.fromString(value);
    }
}

function decode(node, value) {
    value = gemoji.unicode[value];

    if (value) {
        node.fromString(':' + value + ':');
    }
}

function attachFactory(type) {
    return function (retext) {
        var TextOM = retext.parser.TextOM,
            onchange = onchangeFactory(
                type === 'encode' ? encode : decode
            );

        TextOM.PunctuationNode.on('changetext', onchange);
        TextOM.PunctuationNode.on('changeprev', onchange);
    };
}

function emoji(options) {
    if (arguments.length > 1) {
        throw new TypeError('Illegal invocation: smartypants was' +
            ' called by Retext, but should be called by the user');
    }

    if (!options || !('convert' in options)) {
        throw new TypeError('Illegal invocation: \'' + options +
            '\' is not a valid arguments for \'emoji\'');
    }

    var convert = options.convert;

    if (convert !== 'decode' && convert !== 'encode') {
        throw new TypeError('Illegal invocation: \'' + convert +
            '\' is not a valid option for `convert` in ' +
            '\'emoji\'');
    }

    function method () {}

    method.attach = attachFactory(convert);

    return method;
}

exports = module.exports = emoji;

},{"gemoji":7}],2:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":4}],3:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require("FWaASH"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"FWaASH":6,"inherits":5}],5:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],7:[function(require,module,exports){
'use strict';

var gemoji, namedGemoji, unicodeGemoji, shortcode, unicode, iterator;

module.exports.unicode = unicodeGemoji = {};
module.exports.name = namedGemoji = {};

gemoji = (
    'sunny|\u2600|' +
    'umbrella|\u2614|' +
    'cloud|\u2601|' +
    'snowflake|\u2744|' +
    'snowman|\u26C4|' +
    'zap|\u26A1|' +
    'cyclone|\uD83C\uDF00|' +
    'foggy|\uD83C\uDF01|' +
    'ocean|\uD83C\uDF0A|' +
    'cat|\uD83D\uDC31|' +
    'dog|\uD83D\uDC36|' +
    'mouse|\uD83D\uDC2D|' +
    'hamster|\uD83D\uDC39|' +
    'rabbit|\uD83D\uDC30|' +
    'wolf|\uD83D\uDC3A|' +
    'frog|\uD83D\uDC38|' +
    'tiger|\uD83D\uDC2F|' +
    'koala|\uD83D\uDC28|' +
    'bear|\uD83D\uDC3B|' +
    'pig|\uD83D\uDC37|' +
    'pig_nose|\uD83D\uDC3D|' +
    'cow|\uD83D\uDC2E|' +
    'boar|\uD83D\uDC17|' +
    'monkey_face|\uD83D\uDC35|' +
    'monkey|\uD83D\uDC12|' +
    'horse|\uD83D\uDC34|' +
    'racehorse|\uD83D\uDC0E|' +
    'camel|\uD83D\uDC2B|' +
    'sheep|\uD83D\uDC11|' +
    'elephant|\uD83D\uDC18|' +
    'panda_face|\uD83D\uDC3C|' +
    'snake|\uD83D\uDC0D|' +
    'bird|\uD83D\uDC26|' +
    'baby_chick|\uD83D\uDC24|' +
    'hatched_chick|\uD83D\uDC25|' +
    'hatching_chick|\uD83D\uDC23|' +
    'chicken|\uD83D\uDC14|' +
    'penguin|\uD83D\uDC27|' +
    'turtle|\uD83D\uDC22|' +
    'bug|\uD83D\uDC1B|' +
    'honeybee|\uD83D\uDC1D|' +
    'ant|\uD83D\uDC1C|' +
    'beetle|\uD83D\uDC1E|' +
    'snail|\uD83D\uDC0C|' +
    'octopus|\uD83D\uDC19|' +
    'tropical_fish|\uD83D\uDC20|' +
    'fish|\uD83D\uDC1F|' +
    'whale|\uD83D\uDC33|' +
    'whale2|\uD83D\uDC0B|' +
    'dolphin|\uD83D\uDC2C|' +
    'cow2|\uD83D\uDC04|' +
    'ram|\uD83D\uDC0F|' +
    'rat|\uD83D\uDC00|' +
    'water_buffalo|\uD83D\uDC03|' +
    'tiger2|\uD83D\uDC05|' +
    'rabbit2|\uD83D\uDC07|' +
    'dragon|\uD83D\uDC09|' +
    'goat|\uD83D\uDC10|' +
    'rooster|\uD83D\uDC13|' +
    'dog2|\uD83D\uDC15|' +
    'pig2|\uD83D\uDC16|' +
    'mouse2|\uD83D\uDC01|' +
    'ox|\uD83D\uDC02|' +
    'dragon_face|\uD83D\uDC32|' +
    'blowfish|\uD83D\uDC21|' +
    'crocodile|\uD83D\uDC0A|' +
    'dromedary_camel|\uD83D\uDC2A|' +
    'leopard|\uD83D\uDC06|' +
    'cat2|\uD83D\uDC08|' +
    'poodle|\uD83D\uDC29|' +
    'paw_prints|\uD83D\uDC3E|' +
    'bouquet|\uD83D\uDC90|' +
    'cherry_blossom|\uD83C\uDF38|' +
    'tulip|\uD83C\uDF37|' +
    'four_leaf_clover|\uD83C\uDF40|' +
    'rose|\uD83C\uDF39|' +
    'sunflower|\uD83C\uDF3B|' +
    'hibiscus|\uD83C\uDF3A|' +
    'maple_leaf|\uD83C\uDF41|' +
    'leaves|\uD83C\uDF43|' +
    'fallen_leaf|\uD83C\uDF42|' +
    'herb|\uD83C\uDF3F|' +
    'mushroom|\uD83C\uDF44|' +
    'cactus|\uD83C\uDF35|' +
    'palm_tree|\uD83C\uDF34|' +
    'evergreen_tree|\uD83C\uDF32|' +
    'deciduous_tree|\uD83C\uDF33|' +
    'chestnut|\uD83C\uDF30|' +
    'seedling|\uD83C\uDF31|' +
    'blossom|\uD83C\uDF3C|' +
    'ear_of_rice|\uD83C\uDF3E|' +
    'shell|\uD83D\uDC1A|' +
    'globe_with_meridians|\uD83C\uDF10|' +
    'sun_with_face|\uD83C\uDF1E|' +
    'full_moon_with_face|\uD83C\uDF1D|' +
    'new_moon_with_face|\uD83C\uDF1A|' +
    'new_moon|\uD83C\uDF11|' +
    'waxing_crescent_moon|\uD83C\uDF12|' +
    'first_quarter_moon|\uD83C\uDF13|' +
    'waxing_gibbous_moon|\uD83C\uDF14|' +
    'full_moon|\uD83C\uDF15|' +
    'waning_gibbous_moon|\uD83C\uDF16|' +
    'last_quarter_moon|\uD83C\uDF17|' +
    'waning_crescent_moon|\uD83C\uDF18|' +
    'last_quarter_moon_with_face|\uD83C\uDF1C|' +
    'first_quarter_moon_with_face|\uD83C\uDF1B|' +
    'moon|\uD83C\uDF19|' +
    'earth_africa|\uD83C\uDF0D|' +
    'earth_americas|\uD83C\uDF0E|' +
    'earth_asia|\uD83C\uDF0F|' +
    'volcano|\uD83C\uDF0B|' +
    'milky_way|\uD83C\uDF0C|' +
    'partly_sunny|\u26C5|' +
    'bamboo|\uD83C\uDF8D|' +
    'gift_heart|\uD83D\uDC9D|' +
    'dolls|\uD83C\uDF8E|' +
    'gift_heart|\uD83D\uDC9D|' +
    'school_satchel|\uD83C\uDF92|' +
    'mortar_board|\uD83C\uDF93|' +
    'flags|\uD83C\uDF8F|' +
    'fireworks|\uD83C\uDF86|' +
    'sparkler|\uD83C\uDF87|' +
    'wind_chime|\uD83C\uDF90|' +
    'rice_scene|\uD83C\uDF91|' +
    'jack_o_lantern|\uD83C\uDF83|' +
    'ghost|\uD83D\uDC7B|' +
    'santa|\uD83C\uDF85|' +
    '8ball|\uD83C\uDFB1|' +
    'alarm_clock|\u23F0|' +
    'apple|\uD83C\uDF4E|' +
    'art|\uD83C\uDFA8|' +
    'baby_bottle|\uD83C\uDF7C|' +
    'balloon|\uD83C\uDF88|' +
    'banana|\uD83C\uDF4C|' +
    'bar_chart|\uD83D\uDCCA|' +
    'baseball|\u26BE|' +
    'basketball|\uD83C\uDFC0|' +
    'bath|\uD83D\uDEC0|' +
    'bathtub|\uD83D\uDEC1|' +
    'battery|\uD83D\uDD0B|' +
    'beer|\uD83C\uDF7A|' +
    'beers|\uD83C\uDF7B|' +
    'bell|\uD83D\uDD14|' +
    'bento|\uD83C\uDF71|' +
    'bicyclist|\uD83D\uDEB4|' +
    'bikini|\uD83D\uDC59|' +
    'birthday|\uD83C\uDF82|' +
    'black_joker|\uD83C\uDCCF|' +
    'black_nib|\u2712|' +
    'blue_book|\uD83D\uDCD8|' +
    'bomb|\uD83D\uDCA3|' +
    'bookmark|\uD83D\uDD16|' +
    'bookmark_tabs|\uD83D\uDCD1|' +
    'books|\uD83D\uDCDA|' +
    'boot|\uD83D\uDC62|' +
    'bowling|\uD83C\uDFB3|' +
    'bread|\uD83C\uDF5E|' +
    'briefcase|\uD83D\uDCBC|' +
    'bulb|\uD83D\uDCA1|' +
    'cake|\uD83C\uDF70|' +
    'calendar|\uD83D\uDCC6|' +
    'calling|\uD83D\uDCF2|' +
    'camera|\uD83D\uDCF7|' +
    'candy|\uD83C\uDF6C|' +
    'card_index|\uD83D\uDCC7|' +
    'cd|\uD83D\uDCBF|' +
    'chart_with_downwards_trend|\uD83D\uDCC9|' +
    'chart_with_upwards_trend|\uD83D\uDCC8|' +
    'cherries|\uD83C\uDF52|' +
    'chocolate_bar|\uD83C\uDF6B|' +
    'christmas_tree|\uD83C\uDF84|' +
    'clapper|\uD83C\uDFAC|' +
    'clipboard|\uD83D\uDCCB|' +
    'closed_book|\uD83D\uDCD5|' +
    'closed_lock_with_key|\uD83D\uDD10|' +
    'closed_umbrella|\uD83C\uDF02|' +
    'clubs|\u2663|' +
    'cocktail|\uD83C\uDF78|' +
    'coffee|\u2615|' +
    'computer|\uD83D\uDCBB|' +
    'confetti_ball|\uD83C\uDF8A|' +
    'cookie|\uD83C\uDF6A|' +
    'corn|\uD83C\uDF3D|' +
    'credit_card|\uD83D\uDCB3|' +
    'crown|\uD83D\uDC51|' +
    'crystal_ball|\uD83D\uDD2E|' +
    'curry|\uD83C\uDF5B|' +
    'custard|\uD83C\uDF6E|' +
    'dango|\uD83C\uDF61|' +
    'dart|\uD83C\uDFAF|' +
    'date|\uD83D\uDCC5|' +
    'diamonds|\u2666|' +
    'dollar|\uD83D\uDCB5|' +
    'door|\uD83D\uDEAA|' +
    'doughnut|\uD83C\uDF69|' +
    'dress|\uD83D\uDC57|' +
    'dvd|\uD83D\uDCC0|' +
    'e-mail|\uD83D\uDCE7|' +
    'egg|\uD83C\uDF73|' +
    'eggplant|\uD83C\uDF46|' +
    'electric_plug|\uD83D\uDD0C|' +
    'email|\u2709|' +
    'euro|\uD83D\uDCB6|' +
    'eyeglasses|\uD83D\uDC53|' +
    'fax|\uD83D\uDCE0|' +
    'file_folder|\uD83D\uDCC1|' +
    'fish_cake|\uD83C\uDF65|' +
    'fishing_pole_and_fish|\uD83C\uDFA3|' +
    'flashlight|\uD83D\uDD26|' +
    'floppy_disk|\uD83D\uDCBE|' +
    'flower_playing_cards|\uD83C\uDFB4|' +
    'football|\uD83C\uDFC8|' +
    'fork_and_knife|\uD83C\uDF74|' +
    'fried_shrimp|\uD83C\uDF64|' +
    'fries|\uD83C\uDF5F|' +
    'game_die|\uD83C\uDFB2|' +
    'gem|\uD83D\uDC8E|' +
    'gift|\uD83C\uDF81|' +
    'golf|\u26F3|' +
    'grapes|\uD83C\uDF47|' +
    'green_apple|\uD83C\uDF4F|' +
    'green_book|\uD83D\uDCD7|' +
    'guitar|\uD83C\uDFB8|' +
    'gun|\uD83D\uDD2B|' +
    'hamburger|\uD83C\uDF54|' +
    'hammer|\uD83D\uDD28|' +
    'handbag|\uD83D\uDC5C|' +
    'headphones|\uD83C\uDFA7|' +
    'hearts|\u2665|' +
    'high_brightness|\uD83D\uDD06|' +
    'high_heel|\uD83D\uDC60|' +
    'hocho|\uD83D\uDD2A|' +
    'honey_pot|\uD83C\uDF6F|' +
    'horse_racing|\uD83C\uDFC7|' +
    'hourglass|\u231B|' +
    'hourglass_flowing_sand|\u23F3|' +
    'ice_cream|\uD83C\uDF68|' +
    'icecream|\uD83C\uDF66|' +
    'inbox_tray|\uD83D\uDCE5|' +
    'incoming_envelope|\uD83D\uDCE8|' +
    'information_source|\u2139\uFE0F|' +
    'iphone|\uD83D\uDCF1|' +
    'jeans|\uD83D\uDC56|' +
    'key|\uD83D\uDD11|' +
    'kimono|\uD83D\uDC58|' +
    'ledger|\uD83D\uDCD2|' +
    'lemon|\uD83C\uDF4B|' +
    'lipstick|\uD83D\uDC84|' +
    'lock|\uD83D\uDD12|' +
    'lock_with_ink_pen|\uD83D\uDD0F|' +
    'lollipop|\uD83C\uDF6D|' +
    'loop|\u27BF|' +
    'loudspeaker|\uD83D\uDCE2|' +
    'low_brightness|\uD83D\uDD05|' +
    'm|\u24C2\uFE0F|' +
    'mag|\uD83D\uDD0D|' +
    'mag_right|\uD83D\uDD0E|' +
    'mahjong|\uD83C\uDC04|' +
    'mailbox|\uD83D\uDCEB|' +
    'mailbox_closed|\uD83D\uDCEA|' +
    'mailbox_with_mail|\uD83D\uDCEC|' +
    'mailbox_with_no_mail|\uD83D\uDCED|' +
    'mans_shoe|\uD83D\uDC5E|' +
    'meat_on_bone|\uD83C\uDF56|' +
    'mega|\uD83D\uDCE3|' +
    'melon|\uD83C\uDF48|' +
    'memo|\uD83D\uDCDD|' +
    'microphone|\uD83C\uDFA4|' +
    'microscope|\uD83D\uDD2C|' +
    'minidisc|\uD83D\uDCBD|' +
    'money_with_wings|\uD83D\uDCB8|' +
    'moneybag|\uD83D\uDCB0|' +
    'mountain_bicyclist|\uD83D\uDEB5|' +
    'movie_camera|\uD83C\uDFA5|' +
    'musical_keyboard|\uD83C\uDFB9|' +
    'musical_score|\uD83C\uDFBC|' +
    'mute|\uD83D\uDD07|' +
    'name_badge|\uD83D\uDCDB|' +
    'necktie|\uD83D\uDC54|' +
    'newspaper|\uD83D\uDCF0|' +
    'no_bell|\uD83D\uDD15|' +
    'notebook|\uD83D\uDCD3|' +
    'notebook_with_decorative_cover|\uD83D\uDCD4|' +
    'nut_and_bolt|\uD83D\uDD29|' +
    'oden|\uD83C\uDF62|' +
    'open_file_folder|\uD83D\uDCC2|' +
    'orange_book|\uD83D\uDCD9|' +
    'outbox_tray|\uD83D\uDCE4|' +
    'page_facing_up|\uD83D\uDCC4|' +
    'page_with_curl|\uD83D\uDCC3|' +
    'pager|\uD83D\uDCDF|' +
    'paperclip|\uD83D\uDCCE|' +
    'peach|\uD83C\uDF51|' +
    'pear|\uD83C\uDF50|' +
    'pencil2|\u270F|' +
    'phone|\u260E|' +
    'pill|\uD83D\uDC8A|' +
    'pineapple|\uD83C\uDF4D|' +
    'pizza|\uD83C\uDF55|' +
    'postal_horn|\uD83D\uDCEF|' +
    'postbox|\uD83D\uDCEE|' +
    'pouch|\uD83D\uDC5D|' +
    'poultry_leg|\uD83C\uDF57|' +
    'pound|\uD83D\uDCB7|' +
    'purse|\uD83D\uDC5B|' +
    'pushpin|\uD83D\uDCCC|' +
    'radio|\uD83D\uDCFB|' +
    'ramen|\uD83C\uDF5C|' +
    'ribbon|\uD83C\uDF80|' +
    'rice|\uD83C\uDF5A|' +
    'rice_ball|\uD83C\uDF59|' +
    'rice_cracker|\uD83C\uDF58|' +
    'ring|\uD83D\uDC8D|' +
    'rugby_football|\uD83C\uDFC9|' +
    'running_shirt_with_sash|\uD83C\uDFBD|' +
    'sake|\uD83C\uDF76|' +
    'sandal|\uD83D\uDC61|' +
    'satellite|\uD83D\uDCE1|' +
    'saxophone|\uD83C\uDFB7|' +
    'scissors|\u2702|' +
    'scroll|\uD83D\uDCDC|' +
    'seat|\uD83D\uDCBA|' +
    'shaved_ice|\uD83C\uDF67|' +
    'shirt|\uD83D\uDC55|' +
    'shower|\uD83D\uDEBF|' +
    'ski|\uD83C\uDFBF|' +
    'smoking|\uD83D\uDEAC|' +
    'snowboarder|\uD83C\uDFC2|' +
    'soccer|\u26BD|' +
    'sound|\uD83D\uDD09|' +
    'space_invader|\uD83D\uDC7E|' +
    'spades|\u2660|' +
    'spaghetti|\uD83C\uDF5D|' +
    'speaker|\uD83D\uDD0A|' +
    'stew|\uD83C\uDF72|' +
    'straight_ruler|\uD83D\uDCCF|' +
    'strawberry|\uD83C\uDF53|' +
    'surfer|\uD83C\uDFC4|' +
    'sushi|\uD83C\uDF63|' +
    'sweet_potato|\uD83C\uDF60|' +
    'swimmer|\uD83C\uDFCA|' +
    'syringe|\uD83D\uDC89|' +
    'tada|\uD83C\uDF89|' +
    'tanabata_tree|\uD83C\uDF8B|' +
    'tangerine|\uD83C\uDF4A|' +
    'tea|\uD83C\uDF75|' +
    'telephone_receiver|\uD83D\uDCDE|' +
    'telescope|\uD83D\uDD2D|' +
    'tennis|\uD83C\uDFBE|' +
    'toilet|\uD83D\uDEBD|' +
    'tomato|\uD83C\uDF45|' +
    'tophat|\uD83C\uDFA9|' +
    'triangular_ruler|\uD83D\uDCD0|' +
    'trophy|\uD83C\uDFC6|' +
    'tropical_drink|\uD83C\uDF79|' +
    'trumpet|\uD83C\uDFBA|' +
    'tv|\uD83D\uDCFA|' +
    'unlock|\uD83D\uDD13|' +
    'vhs|\uD83D\uDCFC|' +
    'video_camera|\uD83D\uDCF9|' +
    'video_game|\uD83C\uDFAE|' +
    'violin|\uD83C\uDFBB|' +
    'watch|\u231A|' +
    'watermelon|\uD83C\uDF49|' +
    'wine_glass|\uD83C\uDF77|' +
    'womans_clothes|\uD83D\uDC5A|' +
    'womans_hat|\uD83D\uDC52|' +
    'wrench|\uD83D\uDD27|' +
    'yen|\uD83D\uDCB4|' +
    'smile|\uD83D\uDE04|' +
    'laughing|\uD83D\uDE06|' +
    'blush|\uD83D\uDE0A|' +
    'smiley|\uD83D\uDE03|' +
    'relaxed|\u263A|' +
    'smirk|\uD83D\uDE0F|' +
    'heart_eyes|\uD83D\uDE0D|' +
    'kissing_heart|\uD83D\uDE18|' +
    'kissing_closed_eyes|\uD83D\uDE1A|' +
    'flushed|\uD83D\uDE33|' +
    'relieved|\uD83D\uDE25|' +
    'satisfied|\uD83D\uDE0C|' +
    'grin|\uD83D\uDE01|' +
    'wink|\uD83D\uDE09|' +
    'stuck_out_tongue_winking_eye|\uD83D\uDE1C|' +
    'stuck_out_tongue_closed_eyes|\uD83D\uDE1D|' +
    'grinning|\uD83D\uDE00|' +
    'kissing|\uD83D\uDE17|' +
    'kissing_smiling_eyes|\uD83D\uDE19|' +
    'stuck_out_tongue|\uD83D\uDE1B|' +
    'sleeping|\uD83D\uDE34|' +
    'worried|\uD83D\uDE1F|' +
    'frowning|\uD83D\uDE26|' +
    'anguished|\uD83D\uDE27|' +
    'open_mouth|\uD83D\uDE2E|' +
    'grimacing|\uD83D\uDE2C|' +
    'confused|\uD83D\uDE15|' +
    'hushed|\uD83D\uDE2F|' +
    'expressionless|\uD83D\uDE11|' +
    'unamused|\uD83D\uDE12|' +
    'sweat_smile|\uD83D\uDE05|' +
    'sweat|\uD83D\uDE13|' +
    'weary|\uD83D\uDE29|' +
    'pensive|\uD83D\uDE14|' +
    'disappointed|\uD83D\uDE1E|' +
    'confounded|\uD83D\uDE16|' +
    'fearful|\uD83D\uDE28|' +
    'cold_sweat|\uD83D\uDE30|' +
    'persevere|\uD83D\uDE23|' +
    'cry|\uD83D\uDE22|' +
    'sob|\uD83D\uDE2D|' +
    'joy|\uD83D\uDE02|' +
    'astonished|\uD83D\uDE32|' +
    'scream|\uD83D\uDE31|' +
    'tired_face|\uD83D\uDE2B|' +
    'angry|\uD83D\uDE20|' +
    'rage|\uD83D\uDE21|' +
    'triumph|\uD83D\uDE24|' +
    'sleepy|\uD83D\uDE2A|' +
    'yum|\uD83D\uDE0B|' +
    'mask|\uD83D\uDE37|' +
    'sunglasses|\uD83D\uDE0E|' +
    'dizzy_face|\uD83D\uDE35|' +
    'imp|\uD83D\uDC7F|' +
    'smiling_imp|\uD83D\uDE08|' +
    'neutral_face|\uD83D\uDE10|' +
    'no_mouth|\uD83D\uDE36|' +
    'innocent|\uD83D\uDE07|' +
    'alien|\uD83D\uDC7D|' +
    'yellow_heart|\uD83D\uDC9B|' +
    'blue_heart|\uD83D\uDC99|' +
    'purple_heart|\uD83D\uDC9C|' +
    'heart|\u2764|' +
    'green_heart|\uD83D\uDC9A|' +
    'broken_heart|\uD83D\uDC94|' +
    'heartbeat|\uD83D\uDC93|' +
    'heartpulse|\uD83D\uDC97|' +
    'two_hearts|\uD83D\uDC95|' +
    'revolving_hearts|\uD83D\uDC9E|' +
    'cupid|\uD83D\uDC98|' +
    'sparkling_heart|\uD83D\uDC96|' +
    'sparkles|\u2728|' +
    'star|\u2B50|' +
    'star2|\uD83C\uDF1F|' +
    'dizzy|\uD83D\uDCAB|' +
    'boom|\uD83D\uDCA5|' +
    'anger|\uD83D\uDCA2|' +
    'exclamation|\u2757|' +
    'question|\u2753|' +
    'grey_exclamation|\u2755|' +
    'grey_question|\u2754|' +
    'zzz|\uD83D\uDCA4|' +
    'dash|\uD83D\uDCA8|' +
    'sweat_drops|\uD83D\uDCA6|' +
    'notes|\uD83C\uDFB6|' +
    'musical_note|\uD83C\uDFB5|' +
    'fire|\uD83D\uDD25|' +
    'poop|\uD83D\uDCA9|' +
    'thumbsup|\uD83D\uDC4D|' +
    'thumbsdown|\uD83D\uDC4E|' +
    'ok_hand|\uD83D\uDC4C|' +
    'punch|\uD83D\uDC4A|' +
    'fist|\u270A|' +
    'v|\u270C|' +
    'wave|\uD83D\uDC4B|' +
    'hand|\u270B|' +
    'open_hands|\uD83D\uDC50|' +
    'point_up|\u261D|' +
    'point_down|\uD83D\uDC47|' +
    'point_left|\uD83D\uDC48|' +
    'point_right|\uD83D\uDC49|' +
    'raised_hands|\uD83D\uDE4C|' +
    'pray|\uD83D\uDE4F|' +
    'point_up_2|\uD83D\uDC46|' +
    'clap|\uD83D\uDC4F|' +
    'muscle|\uD83D\uDCAA|' +
    'walking|\uD83D\uDEB6|' +
    'runner|\uD83C\uDFC3|' +
    'couple|\uD83D\uDC6B|' +
    'family|\uD83D\uDC6A|' +
    'two_men_holding_hands|\uD83D\uDC6C|' +
    'two_women_holding_hands|\uD83D\uDC6D|' +
    'dancer|\uD83D\uDC83|' +
    'dancers|\uD83D\uDC6F|' +
    'ok_woman|\uD83D\uDE46|' +
    'no_good|\uD83D\uDE45|' +
    'information_desk_person|\uD83D\uDC81|' +
    'raised_hand|\uD83D\uDE4B|' +
    'bride_with_veil|\uD83D\uDC70|' +
    'person_with_pouting_face|\uD83D\uDE4E|' +
    'person_frowning|\uD83D\uDE4D|' +
    'bow|\uD83D\uDE47|' +
    'couplekiss|\uD83D\uDC8F|' +
    'couple_with_heart|\uD83D\uDC91|' +
    'massage|\uD83D\uDC86|' +
    'haircut|\uD83D\uDC87|' +
    'nail_care|\uD83D\uDC85|' +
    'boy|\uD83D\uDC66|' +
    'girl|\uD83D\uDC67|' +
    'woman|\uD83D\uDC69|' +
    'man|\uD83D\uDC68|' +
    'baby|\uD83D\uDC76|' +
    'older_woman|\uD83D\uDC75|' +
    'older_man|\uD83D\uDC74|' +
    'person_with_blond_hair|\uD83D\uDC71|' +
    'man_with_gua_pi_mao|\uD83D\uDC72|' +
    'man_with_turban|\uD83D\uDC73|' +
    'construction_worker|\uD83D\uDC77|' +
    'cop|\uD83D\uDC6E|' +
    'angel|\uD83D\uDC7C|' +
    'princess|\uD83D\uDC78|' +
    'smiley_cat|\uD83D\uDE3A|' +
    'smile_cat|\uD83D\uDE38|' +
    'heart_eyes_cat|\uD83D\uDE3B|' +
    'kissing_cat|\uD83D\uDE3D|' +
    'smirk_cat|\uD83D\uDE3C|' +
    'scream_cat|\uD83D\uDE40|' +
    'crying_cat_face|\uD83D\uDE3F|' +
    'joy_cat|\uD83D\uDE39|' +
    'pouting_cat|\uD83D\uDE3E|' +
    'japanese_ogre|\uD83D\uDC79|' +
    'japanese_goblin|\uD83D\uDC7A|' +
    'see_no_evil|\uD83D\uDE48|' +
    'hear_no_evil|\uD83D\uDE49|' +
    'speak_no_evil|\uD83D\uDE4A|' +
    'guardsman|\uD83D\uDC82|' +
    'skull|\uD83D\uDC80|' +
    'feet|\uD83D\uDC63|' +
    'lips|\uD83D\uDC44|' +
    'kiss|\uD83D\uDC8B|' +
    'droplet|\uD83D\uDCA7|' +
    'ear|\uD83D\uDC42|' +
    'eyes|\uD83D\uDC40|' +
    'nose|\uD83D\uDC43|' +
    'tongue|\uD83D\uDC45|' +
    'love_letter|\uD83D\uDC8C|' +
    'bust_in_silhouette|\uD83D\uDC64|' +
    'busts_in_silhouette|\uD83D\uDC65|' +
    'speech_balloon|\uD83D\uDCAC|' +
    'thought_balloon|\uD83D\uDCAD|' +
    'aerial_tramway|\uD83D\uDEA1|' +
    'airplane|\u2708|' +
    'ambulance|\uD83D\uDE91|' +
    'anchor|\u2693|' +
    'articulated_lorry|\uD83D\uDE9B|' +
    'atm|\uD83C\uDFE7|' +
    'bank|\uD83C\uDFE6|' +
    'barber|\uD83D\uDC88|' +
    'beginner|\uD83D\uDD30|' +
    'bike|\uD83D\uDEB2|' +
    'blue_car|\uD83D\uDE99|' +
    'boat|\u26F5|' +
    'bridge_at_night|\uD83C\uDF09|' +
    'bullettrain_front|\uD83D\uDE85|' +
    'bullettrain_side|\uD83D\uDE84|' +
    'bus|\uD83D\uDE8C|' +
    'busstop|\uD83D\uDE8F|' +
    'car|\uD83D\uDE97|' +
    'carousel_horse|\uD83C\uDFA0|' +
    'checkered_flag|\uD83C\uDFC1|' +
    'church|\u26EA|' +
    'circus_tent|\uD83C\uDFAA|' +
    'city_sunrise|\uD83C\uDF07|' +
    'city_sunset|\uD83C\uDF06|' +
    'construction|\uD83D\uDEA7|' +
    'convenience_store|\uD83C\uDFEA|' +
    'crossed_flags|\uD83C\uDF8C|' +
    'department_store|\uD83C\uDFEC|' +
    'european_castle|\uD83C\uDFF0|' +
    'european_post_office|\uD83C\uDFE4|' +
    'factory|\uD83C\uDFED|' +
    'ferris_wheel|\uD83C\uDFA1|' +
    'fire_engine|\uD83D\uDE92|' +
    'fountain|\u26F2|' +
    'fuelpump|\u26FD|' +
    'helicopter|\uD83D\uDE81|' +
    'hospital|\uD83C\uDFE5|' +
    'hotel|\uD83C\uDFE8|' +
    'hotsprings|\u2668|' +
    'house|\uD83C\uDFE0|' +
    'house_with_garden|\uD83C\uDFE1|' +
    'japan|\uD83D\uDDFE|' +
    'japanese_castle|\uD83C\uDFEF|' +
    'light_rail|\uD83D\uDE88|' +
    'love_hotel|\uD83C\uDFE9|' +
    'minibus|\uD83D\uDE90|' +
    'monorail|\uD83D\uDE9D|' +
    'mount_fuji|\uD83D\uDDFB|' +
    'mountain_cableway|\uD83D\uDEA0|' +
    'mountain_railway|\uD83D\uDE9E|' +
    'moyai|\uD83D\uDDFF|' +
    'office|\uD83C\uDFE2|' +
    'oncoming_automobile|\uD83D\uDE98|' +
    'oncoming_bus|\uD83D\uDE8D|' +
    'oncoming_police_car|\uD83D\uDE94|' +
    'oncoming_taxi|\uD83D\uDE96|' +
    'performing_arts|\uD83C\uDFAD|' +
    'police_car|\uD83D\uDE93|' +
    'post_office|\uD83C\uDFE3|' +
    'railway_car|\uD83D\uDE83|' +
    'rainbow|\uD83C\uDF08|' +
    'rocket|\uD83D\uDE80|' +
    'roller_coaster|\uD83C\uDFA2|' +
    'rotating_light|\uD83D\uDEA8|' +
    'round_pushpin|\uD83D\uDCCD|' +
    'rowboat|\uD83D\uDEA3|' +
    'school|\uD83C\uDFEB|' +
    'ship|\uD83D\uDEA2|' +
    'slot_machine|\uD83C\uDFB0|' +
    'speedboat|\uD83D\uDEA4|' +
    'stars|\uD83C\uDF03|' +
    'station|\uD83D\uDE89|' +
    'statue_of_liberty|\uD83D\uDDFD|' +
    'steam_locomotive|\uD83D\uDE82|' +
    'sunrise|\uD83C\uDF05|' +
    'sunrise_over_mountains|\uD83C\uDF04|' +
    'suspension_railway|\uD83D\uDE9F|' +
    'taxi|\uD83D\uDE95|' +
    'tent|\u26FA|' +
    'ticket|\uD83C\uDFAB|' +
    'tokyo_tower|\uD83D\uDDFC|' +
    'tractor|\uD83D\uDE9C|' +
    'traffic_light|\uD83D\uDEA5|' +
    'train2|\uD83D\uDE86|' +
    'tram|\uD83D\uDE8A|' +
    'triangular_flag_on_post|\uD83D\uDEA9|' +
    'trolleybus|\uD83D\uDE8E|' +
    'truck|\uD83D\uDE9A|' +
    'vertical_traffic_light|\uD83D\uDEA6|' +
    'warning|\u26A0|' +
    'wedding|\uD83D\uDC92|' +
    'jp|\uD83C\uDDEF\uD83C\uDDF5|' +
    'kr|\uD83C\uDDF0\uD83C\uDDF7|' +
    'cn|\uD83C\uDDE8\uD83C\uDDF3|' +
    'us|\uD83C\uDDFA\uD83C\uDDF8|' +
    'fr|\uD83C\uDDEB\uD83C\uDDF7|' +
    'es|\uD83C\uDDEA\uD83C\uDDF8|' +
    'it|\uD83C\uDDEE\uD83C\uDDF9|' +
    'ru|\uD83C\uDDF7\uD83C\uDDFA|' +
    'gb|\uD83C\uDDEC\uD83C\uDDE7|' +
    'de|\uD83C\uDDE9\uD83C\uDDEA|' +
    '100|\uD83D\uDCAF|' +
    '1234|\uD83D\uDD22|' +
    'a|\uD83C\uDD70|' +
    'ab|\uD83C\uDD8E|' +
    'abc|\uD83D\uDD24|' +
    'abcd|\uD83D\uDD21|' +
    'accept|\uD83C\uDE51|' +
    'aquarius|\u2652|' +
    'aries|\u2648|' +
    'arrow_backward|\u25C0|' +
    'arrow_double_down|\u23EC|' +
    'arrow_double_up|\u23EB|' +
    'arrow_down|\u2B07|' +
    'arrow_down_small|\uD83D\uDD3D|' +
    'arrow_forward|\u25B6|' +
    'arrow_heading_down|\u2935|' +
    'arrow_heading_up|\u2934|' +
    'arrow_left|\u2B05|' +
    'arrow_lower_left|\u2199|' +
    'arrow_lower_right|\u2198|' +
    'arrow_right|\u27A1|' +
    'arrow_right_hook|\u21AA|' +
    'arrow_up|\u2B06|' +
    'arrow_up_down|\u2195|' +
    'arrow_up_small|\uD83D\uDD3C|' +
    'arrow_upper_left|\u2196|' +
    'arrow_upper_right|\u2197|' +
    'arrows_clockwise|\uD83D\uDD03|' +
    'arrows_counterclockwise|\uD83D\uDD04|' +
    'b|\uD83C\uDD71|' +
    'baby_symbol|\uD83D\uDEBC|' +
    'baggage_claim|\uD83D\uDEC4|' +
    'ballot_box_with_check|\u2611|' +
    'bangbang|\u203C|' +
    'black_circle|\u26AB|' +
    'black_square_button|\uD83D\uDD32|' +
    'cancer|\u264B|' +
    'capital_abcd|\uD83D\uDD20|' +
    'capricorn|\u2651|' +
    'chart|\uD83D\uDCB9|' +
    'children_crossing|\uD83D\uDEB8|' +
    'cinema|\uD83C\uDFA6|' +
    'cl|\uD83C\uDD91|' +
    'clock1|\uD83D\uDD50|' +
    'clock10|\uD83D\uDD59|' +
    'clock1030|\uD83D\uDD65|' +
    'clock11|\uD83D\uDD5A|' +
    'clock1130|\uD83D\uDD66|' +
    'clock12|\uD83D\uDD5B|' +
    'clock1230|\uD83D\uDD67|' +
    'clock130|\uD83D\uDD5C|' +
    'clock2|\uD83D\uDD51|' +
    'clock230|\uD83D\uDD5D|' +
    'clock3|\uD83D\uDD52|' +
    'clock330|\uD83D\uDD5E|' +
    'clock4|\uD83D\uDD53|' +
    'clock430|\uD83D\uDD5F|' +
    'clock5|\uD83D\uDD54|' +
    'clock530|\uD83D\uDD60|' +
    'clock6|\uD83D\uDD55|' +
    'clock630|\uD83D\uDD61|' +
    'clock7|\uD83D\uDD56|' +
    'clock730|\uD83D\uDD62|' +
    'clock8|\uD83D\uDD57|' +
    'clock830|\uD83D\uDD63|' +
    'clock9|\uD83D\uDD58|' +
    'clock930|\uD83D\uDD64|' +
    'congratulations|\u3297|' +
    'cool|\uD83C\uDD92|' +
    'copyright|\u00A9|' +
    'curly_loop|\u27B0|' +
    'currency_exchange|\uD83D\uDCB1|' +
    'customs|\uD83D\uDEC3|' +
    'diamond_shape_with_a_dot_inside|\uD83D\uDCA0|' +
    'do_not_litter|\uD83D\uDEAF|' +
    'eight|\u0038\uFE0F\u20E3|' +
    'eight_pointed_black_star|\u2734|' +
    'eight_spoked_asterisk|\u2733|' +
    'end|\uD83D\uDD1A|' +
    'fast_forward|\u23E9|' +
    'five|\u0035\uFE0F\u20E3|' +
    'four|\u0034\uFE0F\u20E3|' +
    'free|\uD83C\uDD93|' +
    'gemini|\u264A|' +
    'hash|\u0023\uFE0F\u20E3|' +
    'heart_decoration|\uD83D\uDC9F|' +
    'heavy_check_mark|\u2714|' +
    'heavy_division_sign|\u2797|' +
    'heavy_dollar_sign|\uD83D\uDCB2|' +
    'heavy_minus_sign|\u2796|' +
    'heavy_multiplication_x|\u2716|' +
    'heavy_plus_sign|\u2795|' +
    'id|\uD83C\uDD94|' +
    'ideograph_advantage|\uD83C\uDE50|' +
    'interrobang|\u2049|' +
    'keycap_ten|\uD83D\uDD1F|' +
    'koko|\uD83C\uDE01|' +
    'large_blue_circle|\uD83D\uDD35|' +
    'large_blue_diamond|\uD83D\uDD37|' +
    'large_orange_diamond|\uD83D\uDD36|' +
    'left_luggage|\uD83D\uDEC5|' +
    'left_right_arrow|\u2194|' +
    'leftwards_arrow_with_hook|\u21A9|' +
    'leo|\u264C|' +
    'libra|\u264E|' +
    'link|\uD83D\uDD17|' +
    'mens|\uD83D\uDEB9|' +
    'metro|\uD83D\uDE87|' +
    'mobile_phone_off|\uD83D\uDCF4|' +
    'negative_squared_cross_mark|\u274E|' +
    'new|\uD83C\uDD95|' +
    'ng|\uD83C\uDD96|' +
    'nine|\u0039\uFE0F\u20E3|' +
    'no_bicycles|\uD83D\uDEB3|' +
    'no_entry|\u26D4|' +
    'no_entry_sign|\uD83D\uDEAB|' +
    'no_mobile_phones|\uD83D\uDCF5|' +
    'no_pedestrians|\uD83D\uDEB7|' +
    'no_smoking|\uD83D\uDEAD|' +
    'non-potable_water|\uD83D\uDEB1|' +
    'o|\u2B55|' +
    'o2|\uD83C\uDD7E|' +
    'ok|\uD83C\uDD97|' +
    'on|\uD83D\uDD1B|' +
    'one|\u0031\uFE0F\u20E3|' +
    'ophiuchus|\u26CE|' +
    'parking|\uD83C\uDD7F|' +
    'part_alternation_mark|\u303D|' +
    'passport_control|\uD83D\uDEC2|' +
    'pisces|\u2653|' +
    'potable_water|\uD83D\uDEB0|' +
    'put_litter_in_its_place|\uD83D\uDEAE|' +
    'radio_button|\uD83D\uDD18|' +
    'recycle|\u267B|' +
    'red_circle|\uD83D\uDD34|' +
    'registered|\u00AE|' +
    'repeat|\uD83D\uDD01|' +
    'repeat_one|\uD83D\uDD02|' +
    'restroom|\uD83D\uDEBB|' +
    'rewind|\u23EA|' +
    'sa|\uD83C\uDE02|' +
    'sagittarius|\u2650|' +
    'scorpius|\u264F|' +
    'secret|\u3299|' +
    'seven|\u0037\uFE0F\u20E3|' +
    'signal_strength|\uD83D\uDCF6|' +
    'six|\u0036\uFE0F\u20E3|' +
    'six_pointed_star|\uD83D\uDD2F|' +
    'small_blue_diamond|\uD83D\uDD39|' +
    'small_orange_diamond|\uD83D\uDD38|' +
    'small_red_triangle|\uD83D\uDD3A|' +
    'small_red_triangle_down|\uD83D\uDD3B|' +
    'soon|\uD83D\uDD1C|' +
    'sos|\uD83C\uDD98|' +
    'symbols|\uD83D\uDD23|' +
    'taurus|\u2649|' +
    'three|\u0033\uFE0F\u20E3|' +
    'tm|\u2122|' +
    'top|\uD83D\uDD1D|' +
    'trident|\uD83D\uDD31|' +
    'twisted_rightwards_arrows|\uD83D\uDD00|' +
    'two|\u0032\uFE0F\u20E3|' +
    'u5272|\uD83C\uDE39|' +
    'u5408|\uD83C\uDE34|' +
    'u55b6|\uD83C\uDE3A|' +
    'u6307|\uD83C\uDE2F|' +
    'u6708|\uD83C\uDE37|' +
    'u6709|\uD83C\uDE36|' +
    'u6e80|\uD83C\uDE35|' +
    'u7121|\uD83C\uDE1A|' +
    'u7533|\uD83C\uDE38|' +
    'u7981|\uD83C\uDE32|' +
    'u7a7a|\uD83C\uDE33|' +
    'underage|\uD83D\uDD1E|' +
    'up|\uD83C\uDD99|' +
    'vibration_mode|\uD83D\uDCF3|' +
    'virgo|\u264D|' +
    'vs|\uD83C\uDD9A|' +
    'wavy_dash|\u3030|' +
    'wc|\uD83D\uDEBE|' +
    'wheelchair|\u267F|' +
    'white_check_mark|\u2705|' +
    'white_circle|\u26AA|' +
    'white_flower|\uD83D\uDCAE|' +
    'white_square_button|\uD83D\uDD33|' +
    'womens|\uD83D\uDEBA|' +
    'x|\u274C|' +
    'zero|\u0030\uFE0F\u20E3'
).split('|');

iterator = -1;

while (gemoji[++iterator]) {
    shortcode = gemoji[iterator];
    unicode = gemoji[++iterator];
    namedGemoji[shortcode] = unicode;
    unicodeGemoji[unicode] = shortcode;
}

},{}],8:[function(require,module,exports){
'use strict';

exports = module.exports = function () {};

/* istanbul ignore if: User forgot a polyfill much? */
if (!JSON) {
    throw new Error('Missing JSON object for reparser');
}

/**
 * `fromJSON` converts a given (stringified?) JSON AST into a node.
 *
 * @param {Object} TextOM - The TextOM to get nodes from.
 * @param {Object|String} ast - The AST to convert.
 * @return {Object} - The parsed node.
 * @global
 * @private
 */
function fromJSON(TextOM, ast) {
    var iterator = -1,
        children, node;

    if (ast instanceof String) {
        ast = ast.toString();
    }

    if (typeof ast === 'string') {
        ast = JSON.parse(ast);
    } else if ({}.toString.call(ast) !== '[object Object]') {
        throw new TypeError('Illegal invocation: \'' + ast +
            '\' is not a valid argument for \'fromAST\'');
    }

    if (!('type' in ast && ('value' in ast || 'children' in ast))) {
        throw new TypeError('Illegal invocation: \'' + ast +
            '\' is not a valid argument for \'fromAST\' (it\'s ' +
            'missing the `type`, and either `value` or `children` ' +
            'attributes)');
    }

    node = new TextOM[ast.type]();

    if ('children' in ast) {
        iterator = -1;
        children = ast.children;

        while (children[++iterator]) {
            node.append(fromJSON(TextOM, children[iterator]));
        }
    } else {
        node.fromString(ast.value);
    }

    return node;
}

/**
 * `fromAST` converts a given (stringified?) AST into a node.
 *
 * @param {Object|String} ast - The AST to convert.
 * @return {Object} - The parsed node.
 * @global
 * @private
 */
function fromAST(ast) {
    return this.parse(fromJSON(this.parser.TextOM, ast));
}

/**
 * `toJSON` converts the given node to a JSON object.
 *
 * @return {Object} - A simple object containing the nodes type, and
 *                    either a children attribute containing an array
 *                    the result of `toJSON` on each child, or a value
 *                    attribute containing the nodes internal value.
 * @global
 * @private
 */
function toJSON() {
    var self = this,
        ast, result, item;

    if (!self || !self.TextOM) {
        throw new TypeError('Illegal invocation: \'' + self +
            '\' is not a valid argument for \'toJSON\'');
    }

    ast = {
        'type' : self.TextOM.types[self.type]
    };

    if (!('length' in self)) {
        ast.value = self.toString();
    } else {
        result = [];
        item = self.head;

        while (item) {
            result.push(item.toJSON());
            item = item.next;
        }

        ast.children = result;
    }

    return ast;
}

/**
 * `toAST` converts the operated on node into an stringified JSON object.
 *
 * @param {?(String|Number)} delimiter - When given, pretty prints the
 *                                       stringified object—indenting
 *                                       each level either with the given
 *                                       string or with the given number
 *                                       of spaces.
 * @return {String} - The `JSON.stringify`d result of the simple object
 *                    representation of the operated on node.
 * @global
 * @private
 */
function toAST(delimiter) {
    return JSON.stringify(this, null, delimiter);
}

function attach(retext) {
    var parser = retext.parser,
        nodePrototype = parser.TextOM.Node.prototype;

    /**
     * `toAST` converts the operated on node into an stringified JSON object.
     *
     * @param {?(String|Number)} delimiter - When given, pretty prints the
     *                                       stringified object—indenting
     *                                       each level either with the given
     *                                       string or with the given number
     *                                       of spaces.
     * @return {String} - The `JSON.stringify`d result of the simple object
     *                    representation of the operated on node.
     * @api public
     * @memberof Node.prototype
     */
    nodePrototype.toAST = toAST;

    /**
     * `toAST` converts the operated on node into an JSON object.
     *
     * @return {Object} - A JSON representation without all the cyclical
     *                    TextOM things.
     * @api public
     * @memberof Node.prototype
     */
    nodePrototype.toJSON = toJSON;

    /**
     * Expose `fromAST`.
     *
     * @param {Object|String} ast - The AST to convert.
     * @return {Object} - A TextOM object model.
     * @api public
     * @memberof retext
     */
    retext.fromAST = fromAST;
}

/**
 * Expose `attach`.
 * @memberof exports
 */
exports.attach = attach;

/**
 * Expose `toJSON`.
 * @memberof exports
 */
exports.toJSON = toJSON;

/**
 * Expose `toAST`.
 * @memberof exports
 */
exports.toAST = toAST;

},{}],9:[function(require,module,exports){
'use strict';

var retextRange = require('retext-range');

exports = module.exports = function () {};

/**
 * `insert` inserts the given source after (when given), the `item`, and
 * otherwise as the first item of the given parent. Tries to be smart
 * about which nodes to add (i.e., nodes of the same or without
 * hierarchy).
 *
 * @param {Object} parent - The node to insert into.
 * @param {Object?} item - The node to insert after.
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first inserted node, and endContainer set to to
 *                   the last inserted node.
 * @api private
 */
function insert(parent, item, source) {
    var hierarchy, child, range, children, iterator;

    if (!parent || !parent.TextOM ||
        !(parent instanceof parent.TextOM.Parent ||
        parent instanceof parent.TextOM.Element)) {
            throw new TypeError('Type Error');
    }

    hierarchy = parent.hierarchy + 1;
    child = parent.parser(source);

    if (!child.length) {
        throw new TypeError('Illegal invocation: \'' + source +
            '\' is not a valid argument for \'insert\'');
    }

    while (child.hierarchy < hierarchy) {
        /* WhiteSpace, and the like, or multiple children. */
        if (child.length > 1) {
            if (!('hierarchy' in child.head) ||
                child.head.hierarchy === hierarchy) {
                    children = [].slice.call(child);
                    break;
            } else {
                throw new TypeError('Illegal invocation: Can\'t ' +
                    'insert from multiple parents');
            }
        } else {
            child = child.head;
        }
    }

    if (!children) {
        children = [child];
    }

    range = new parent.TextOM.Range();
    range.setStart(children[0]);
    range.setEnd(children[children.length - 1]);

    iterator = children.length;

    while (children[--iterator]) {
        (item ? item.after : parent.prepend).call(
            item || parent, children[iterator]
        );
    }

    return range;
}

/**
 * `remove` calls `remove` on each item in `items`.
 *
 * @param {Node|Node[]} items - The nodes to remove.
 * @api private
 */
function remove(items) {
    var iterator;

    if (!items || !('length' in items) ||
        !('TextOM' in items || items instanceof Array)) {
            throw new TypeError('Type Error');
    }

    items = [].slice.call(items);
    iterator = items.length;

    while (items[--iterator]) {
        items[iterator].remove();
    }
}

/**
 * `prependContent` inserts the parsed `source` at the start of the
 * operated on node.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first prepended node, and endContainer set to to
 *                   the last prepended node.
 * @global
 * @private
 */
function prependContent(source) {
    return insert(this, null, source);
}

/**
 * `appendContent` inserts the parsed `source` at the end of the operated
 * on node.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first appended node, and endContainer set to to the
 *                   last appended node.
 * @global
 * @private
 */
function appendContent(source) {
    return insert(this, this && (this.tail || this.head), source);
}

/**
 * `removeContent` removes the content of the operated on node.
 *
 * @global
 * @private
 */
function removeContent() {
    remove(this);
}

/**
 * `replaceContent` inserts the parsed `source` at the end of the operated
 * on node, and removes its previous children.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first appended node, and endContainer set to to the
 *                   last appended node.
 * @global
 * @private
 */
function replaceContent(source) {
    var self = this,
        items, result;

    if (!self || !self.TextOM || !(self instanceof self.TextOM.Parent ||
        self instanceof self.TextOM.Element)) {
            throw new TypeError('Type Error');
    }

    items = [].slice.call(self);

    if (self.parser(source).length) {
        result = insert(self, null, source);
    }

    remove(items);

    return result;
}

function attach(retext) {
    var TextOM = retext.parser.TextOM,
        elementPrototype = TextOM.Element.prototype,
        parentPrototype = TextOM.Parent.prototype;

    /* Use retext-range */
    retext.use(retextRange);

    /**
     * `prependContent` inserts the parsed `source` at the start of the
     * operated on parent.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first prepended node, and endContainer set to to
     *                   the last prepended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    elementPrototype.prependContent = parentPrototype.prependContent =
        prependContent;

    /**
     * `appendContent` inserts the parsed `source` at the end of the operated
     * on parent.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first appended node, and endContainer set to to the
     *                   last appended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    elementPrototype.appendContent = parentPrototype.appendContent =
        appendContent;

    /**
     * `removeContent` removes the content of the operated on parent.
     *
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    elementPrototype.removeContent = parentPrototype.removeContent =
        removeContent;

    /**
     * `replaceContent` inserts the parsed `source` at the end of the operated
     * on parent, and removes its previous children.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first appended node, and endContainer set to to the
     *                   last appended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    elementPrototype.replaceContent = parentPrototype.replaceContent =
        replaceContent;
}

/**
 * Expose `attach`.
 * @memberof exports
 */
exports.attach = attach;

/**
 * Expose `prependContent`.
 * @memberof exports
 */
exports.prependContent = prependContent;

/**
 * Expose `appendContent`.
 * @memberof exports
 */
exports.appendContent = appendContent;

/**
 * Expose `removeContent`.
 * @memberof exports
 */
exports.removeContent = removeContent;

/**
 * Expose `replaceContent`.
 * @memberof exports
 */
exports.replaceContent = replaceContent;

},{"retext-range":10}],10:[function(require,module,exports){
'use strict';

exports = module.exports = function () {};

var arraySlice = Array.prototype.slice;

function findAncestors(node) {
    var result = [];

    while (node) {
        if (!node.parent) {
            return result;
        }

        result.push(node);

        node = node.parent;
    }
}

function findRoot(node) {
    var result = findAncestors(node);

    return result[result.length - 1].parent;
}

function findNextAncestor(node) {
    while (node) {
        if ((node = node.parent) && node.next) {
            return node.next;
        }
    }

    return null;
}

function attach(retext) {
    var rangePrototype;

    /**
     * Expose Range.
     */
    function Range() {}

    rangePrototype = Range.prototype;

    /**
     * The starting node of a range, null otherwise.
     *
     * @api public
     * @type {?Node}
     * @readonly
     */
    rangePrototype.startContainer = null;

    /**
     * The starting offset of a range `null` when not existing.
     *
     * @api public
     * @type {?number}
     * @readonly
     */
    rangePrototype.startOffset = null;

    /**
     * The ending node of a range, null otherwise.
     *
     * @api public
     * @type {?Node}
     * @readonly
     */
    rangePrototype.endContainer = null;

    /**
     * The ending offset of a range, `null` when not existing.
     *
     * @api public
     * @type {?number}
     * @readonly
     */
    rangePrototype.endOffset = null;

    /**
     * Set the start container and offset of a range.
     *
     * @param {Node} startContainer - the start container to start the range
     *                                at.
     * @param {?number} offset - (integer) the start offset of the container
     *                           to start the range at;
     * @api public
     */
    rangePrototype.setStart = function (startContainer, offset) {
        if (!startContainer) {
            throw new TypeError('\'' + startContainer + ' is not a valid ' +
                'argument for \'Range.prototype.setStart\'');
        }

        var self = this,
            endContainer = self.endContainer,
            endOffset = self.endOffset,
            offsetIsDefault = false,
            wouldBeValid = false,
            endAncestors, node;

        if (offset === null || offset === undefined || offset !== offset) {
            offset = 0;
            offsetIsDefault = true;
        } else if (typeof offset !== 'number' || offset < 0) {
            throw new TypeError('\'' + offset + ' is not a valid argument ' +
                'for \'Range.prototype.setStart\'');
        }

        if (!endContainer) {
            wouldBeValid = true;
        } else {
            if (findRoot(endContainer) !== findRoot(startContainer)) {
                throw new Error('WrongRootError: The given startContainer ' +
                    'is in the wrong document.');
            }

            /* When startContainer is also the endContainer; */
            if (endContainer === startContainer) {
                wouldBeValid = endOffset >= offset;
            } else {
                endAncestors = findAncestors(endContainer);
                node = startContainer;

                while (node) {
                    if (node === endContainer) {
                        wouldBeValid = true;
                        break;
                    }

                    if (endAncestors.indexOf(node) === -1) {
                        node = node.next || findNextAncestor(node);
                    } else {
                        node = node.head;
                    }
                }
            }
        }

        if (wouldBeValid) {
            self.startContainer = startContainer;
            self.startOffset = offset;
        } else {
            self.endContainer = startContainer;
            self.endOffset = offsetIsDefault ? Infinity : offset;
            self.startContainer = endContainer;
            self.startOffset = endOffset;
        }
    };

    /**
     * Set the end container and offset of a range.
     *
     * @param {Node} endContainer - the end container to start the range at.
     * @param {?number} offset - (integer) the end offset of the container to
     *                           end the range at;
     * @api public
     */
    rangePrototype.setEnd = function (endContainer, offset) {
        if (!endContainer) {
            throw new TypeError('\'' + endContainer + ' is not a valid ' +
                'argument for \'Range.prototype.setEnd\'');
        }

        var self = this,
            startContainer = self.startContainer,
            startOffset = self.startOffset,
            offsetIsDefault = false,
            wouldBeValid = false,
            endAncestors, node;

        if (offset === null || offset === undefined || offset !== offset) {
            offset = Infinity;
            offsetIsDefault = true;
        } else if (typeof offset !== 'number' || offset < 0) {
            throw new TypeError('\'' + offset + ' is not a valid argument ' +
                'for \'Range.prototype.setEnd\'');
        }

        if (!startContainer) {
            wouldBeValid = true;
        } else {
            if (findRoot(startContainer) !== findRoot(endContainer)) {
                throw new Error('WrongRootError: The given endContainer ' +
                    'is in the wrong document.');
            }

            /* When endContainer is also the startContainer; */
            if (startContainer === endContainer) {
                wouldBeValid = startOffset <= offset;
            } else {
                endAncestors = findAncestors(endContainer);
                node = startContainer;

                while (node) {
                    if (node === endContainer) {
                        wouldBeValid = true;
                        break;
                    }

                    if (endAncestors.indexOf(node) === -1) {
                        node = node.next || findNextAncestor(node);
                    } else {
                        node = node.head;
                    }
                }
            }
        }

        if (wouldBeValid) {
            self.endContainer = endContainer;
            self.endOffset = offset;
        } else {
            self.startContainer = endContainer;
            self.startOffset = offsetIsDefault ? 0 : offset;
            self.endContainer = startContainer;
            self.endOffset = startOffset;
        }
    };

    /**
     * Return the result of calling `toString` on each of Text node inside
     * `range`, substringing when necessary;
     *
     * @return {String}
     * @api public
     */
    rangePrototype.toString = function () {
        var content = this.getContent(),
            startOffset = this.startOffset,
            endOffset = this.endOffset,
            startContainer = this.startContainer,
            endContainer = this.endContainer,
            startIsText, index;

        if (content.length === 0) {
            return '';
        }

        startIsText = !('length' in startContainer);

        if (startContainer === endContainer && startIsText) {
            return startContainer.toString().slice(startOffset, endOffset);
        }

        if (startIsText) {
            content[0] = content[0].toString().slice(startOffset);
        }

        if (!('length' in endContainer)) {
            index = content.length - 1;
            content[index] = content[index].toString().slice(0, endOffset);
        }

        return content.join('');
    };

    /**
     * Removes all nodes completely covered by `range` and removes the parts
     * covered by `range` in partial covered nodes.
     *
     * @return {Node[]} content - The removed nodes.
     * @api public
     */
    rangePrototype.removeContent = function () {
        var content = this.getContent(),
            startOffset = this.startOffset,
            endOffset = this.endOffset,
            startContainer = this.startContainer,
            endContainer = this.endContainer,
            iterator = -1,
            startIsText, startValue, middle;

        if (content.length === 0) {
            return content;
        }

        startIsText = !('length' in startContainer);
        startValue = startContainer.toString();

        if (startContainer === endContainer && startIsText) {
            if (startOffset === endOffset) {
                return [];
            }

            if (startOffset === 0 && endOffset >= startValue.length) {
                startContainer.remove();
                return content;
            }

            if (startOffset !== 0) {
                startContainer.split(startOffset);
                endOffset -= startOffset;
            }

            if (endOffset < startValue.length) {
                middle = startContainer.split(endOffset);
            }

            startContainer = middle || startContainer;
            startContainer.remove();

            return [startContainer];
        }

        if (startIsText && startOffset > 0) {
            startContainer.split(startOffset);
            content[0] = startContainer;
        }

        if (!('length' in endContainer) &&
            endOffset < endContainer.toString().length) {
                content[content.length - 1] = endContainer.split(endOffset);
        }

        while (content[++iterator]) {
            content[iterator].remove();
        }

        return content;
    };

    /**
     * Return the nodes in a range as an array. If a nodes parent is
     * completely encapsulated by the range, returns that parent. Ignores
     * startOffset (i.e., treats as `0`) when startContainer is a text node.
     * Ignores endOffset (i.e., treats as `Infinity`) when endContainer is a
     * text node.
     *
     * @return {Node[]} content - The nodes completely encapsulated by
     *                            the range.
     * @api public
     */
    rangePrototype.getContent = function () {
        var content = [],
            self = this,
            startContainer = self.startContainer,
            startOffset = self.startOffset,
            endContainer = self.endContainer,
            endOffset = self.endOffset,
            endAncestors, node;

        /*
         * Return an empty array when either:
         * - startContainer or endContainer are not set;
         * - startContainer or endContainer are not attached;
         * - startContainer does not share a root with endContainer.
         */
        if (!startContainer || !endContainer || !startContainer.parent ||
            !endContainer.parent || findRoot(startContainer) !==
            findRoot(endContainer)) {
                return content;
        }

        /* If startContainer equals endContainer... */
        if (startContainer === endContainer) {
            /* Return an array containing startContainer when startContainer
             * either:
             * - does not accept children;
             * - starts and ends so range contains all its children.
             */
            if (!('length' in startContainer) ||
                (startOffset === 0 && endOffset >= startContainer.length)) {
                    return [startContainer];
            }

            /* Return an array containing the children of startContainer
             * between startOffset and endOffset. */
            return arraySlice.call(startContainer, startOffset, endOffset);
        }

        /* If startOffset isn't `0` and startContainer accepts children... */
        if (startOffset && ('length' in startContainer)) {
            /* If a child exists at startOffset, let startContainer be that
             * child. */
            if (startOffset in startContainer) {
                startContainer = startContainer[startOffset];
            /* Otherwise, let startContainer be a following node of
             * startContainer. */
            } else {
                startContainer = startContainer.next || findNextAncestor(
                    startContainer
                );
            }
        }

        /* If the whole endNode is in the range... */
        if (endOffset >= endContainer.length) {
            /* While endContainer is the last child of its parent... */
            while (endContainer.parent.tail === endContainer) {
                /* Let endContainer be its parent. */
                endContainer = endContainer.parent;

                /* Break when the new endContainer has no parent. */
                if (!endContainer.parent) {
                    break;
                }
            }
        }

        /* Find all ancestors of endContainer. */
        endAncestors = findAncestors(endContainer);

        /* While node is truthy... */
        node = startContainer;

        while (node) {
            /* If node equals endContainer... */
            if (node === endContainer) {
                /* Add endContainer to content, if either:
                 * - endContainer does not accept children;
                 * - ends so range contains all its children.
                 */
                if (!('length' in endContainer) ||
                    endOffset >= endContainer.length) {
                        content.push(node);
                /* Add the children of endContainer to content from its start
                 * until its endOffset. */
                } else {
                    content = content.concat(
                        arraySlice.call(endContainer, 0, endOffset)
                    );
                }

                /* Stop iterating. */
                break;
            }

            /* If node is not an ancestor of endContainer... */
            if (endAncestors.indexOf(node) === -1) {
                /* Add node to content */
                content.push(node);

                /* Let the next node to iterate over be either its next
                 * sibling, or a following ancestor. */
                node = node.next || findNextAncestor(node);
            /* Otherwise, let the next node to iterate over be either its
             * first child, its next sibling, or a following ancestor. */
            } else {
                /* Note that a `head` always exists on a parent of
                 * `endContainer`, thus we do not check for `next`, or a next
                 * ancestor. */
                node = node.head;
            }
        }

        /* Return content. */
        return content;
    };

    retext.parser.TextOM.Range = Range;
}

/**
 * Expose `attach`.
 * @memberof exports
 */
exports.attach = attach;

},{}],11:[function(require,module,exports){
'use strict';

function useImmediately(rootNode, use) {
    return function (plugin) {
        var self = this,
            length = self.plugins.length;

        use.apply(self, arguments);

        if (length !== self.plugins.length) {
            plugin(rootNode, self);
        }

        return self;
    };
}

/**
 * Define `Retext`. Exported above, and used to instantiate a new
 * `Retext`.
 *
 * @param {(Object|String)?} parser - the parser, or its name, to use.
 *                                    Defaults to "parse-english".
 * @api public
 * @constructor
 */
function Retext(parser) {
    var self = this;

    if (!parser) {
        parser = 'parse-english';
    }

    if (typeof parser === 'string') {
        /* istanbul ignore else: TODO / TOSPEC */
        /* Load the parser for vendors without dynamic-require's */
        if (parser === 'parse-english') {
            parser = require('parse-english');
        } else {
            parser = require(parser);
        }

        parser = parser();
    }

    self.parser = parser;
    self.plugins = [];
}

/**
 * `Retext#use` takes a plugin—a humble function—and when the parse
 * method of the Retext instance is called, the plugin will be called
 * with the parsed tree, and the retext instance as arguments.
 *
 * Note that, during the parsing stage, when the `use` method is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {Function} plugin - the plugin to call when parsing.
 * @param {Function?} plugin.attach - called only once with a Retext
 *                                    instance. If you're planning on
 *                                    modifying TextOM or a parser, do it
 *                                    in this method.
 * @return this
 * @api public
 */
Retext.prototype.use = function (plugin) {
    if (typeof plugin !== 'function') {
        throw new TypeError('Illegal invocation: \'' + plugin +
            '\' is not a valid argument for \'Retext.prototype.use\'');
    }

    var self = this,
        plugins = self.plugins;

    if (plugins.indexOf(plugin) === -1) {
        if (plugin.attach) {
            plugin.attach(self);
        }

        plugins.push(plugin);
    }

    return self;
};

/**
 * `Retext#parse` takes a source to be given (and parsed) by the parser.
 * Then, `parse` iterates over all plugins, and allows them to modify the
 * TextOM tree created by the parser.
 *
 * Note that, during the parsing stage, when the `use` plugin is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {(String|Node)?} source - The source to convert.
 * @return {Node} - A RootNode containing the tokenised source.
 * @api public
 */
Retext.prototype.parse = function (source) {
    var self = this,
        parser = self.parser,
        plugins = self.plugins.concat(),
        iterator = -1,
        use = self.use,
        rootNode = parser(source);

    self.use = useImmediately(rootNode, use);

    while (plugins[++iterator]) {
        plugins[iterator](rootNode, this);
    }

    self.use = use;

    return rootNode;
};

/**
 * Expose `Retext`. Used to instantiate a new Retext object.
 */
exports = module.exports = Retext;

},{"parse-english":12}],12:[function(require,module,exports){
'use strict';

var textom, GROUP_NUMERICAL, GROUP_ALPHABETIC, GROUP_WHITE_SPACE,
    GROUP_COMBINING_DIACRITICAL_MARK, GROUP_TERMINAL_MARKER,
    GROUP_CLOSING_PUNCTUATION, GROUP_FINAL_PUNCTUATION,
    EXPRESSION_WORD_CONTRACTION, EXPRESSION_WORD_MULTIPUNCTUATION,
    EXPRESSION_WORD_DIGIT_LETTER, EXPRESSION_MULTILINEBREAK, STRING_PIPE,
    EXPRESSION_ABBREVIATION_PREFIX, EXPRESSION_WORD_CHARACTER,
    EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE,
    EXPRESSION_ABBREVIATION_AFFIX, EXPRESSION_INITIALISM,
    EXPRESSION_FULL_STOP, EXPRESSION_SENTENCE_END, EXPRESSION_WORD_COMBINING,
    EXPRESSION_SENTENCE_SPACE, EXPRESSION_WHITE_SPACE, EXPRESSION_ORDINAL,
    GROUP_COMBINING_NONSPACING_MARK, constructors;

/**
 * Module dependencies.
 */
textom = require('textom');

/**
 * Expose `expand`. Expands a list of Unicode code points and ranges to
 * be usable in a regex character class.
 *
 * “Borrowed” from XRegexp.
 *
 * @param {String} value
 * @return {String}
 * @api private
 */
function expand(value) {
    return value.replace(/\w{4}/g, '\\u$&');
}

/**
 * Expose `GROUP_NUMERICAL`. Unicode Number Range (Nd, Nl, and No).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_NUMERICAL = expand(
    /*
     * Nd: Number, Decimal Digit
     */
    '0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F' +
    '09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF' +
    '20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F33' +
    '1040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-1819' +
    '1946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C49' +
    '1C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-' +
    '24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9' +
    'A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19' +

    /*
     * Nl: Number, Letter
     */
    '16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF' +

    /*
     * No: Number, Other
     */
    '00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D75' +
    '0F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F' +
    '21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA830-A835'
);

/**
 * Expose `GROUP_ALPHABETIC`. Unicode Alphabetic Range: Contains
 * Lu (Letter, uppercase), Ll (Letter, lowercase), and Lo (Letter, other).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_ALPHABETIC = expand('0041-005A0061-007A00AA00B500BA00C0-00D6' +
    '00D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377' +
    '037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-0527' +
    '0531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA' +
    '05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E8' +
    '06ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-' +
    '0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B' +
    '093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C' +
    '098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC' +
    '09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-' +
    '0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A51' +
    '0A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-' +
    '0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-' +
    '0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B44' +
    '0B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E' +
    '-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-' +
    '0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C28' +
    '0C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-' +
    '0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC4' +
    '0CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C' +
    '0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D63' +
    '0D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD4' +
    '0DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E88' +
    '0E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-' +
    '0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-' +
    '0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E' +
    '109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258' +
    '125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-' +
    '12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F4' +
    '1401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-1713' +
    '1720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D' +
    '717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-' +
    '196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00' +
    '-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-' +
    '1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F15' +
    '1F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB4' +
    '1FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-' +
    '1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D2124' +
    '21262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-' +
    '24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D' +
    '2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-' +
    '2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031' +
    '-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-' +
    '318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-' +
    'A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71F' +
    'A722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80A' +
    'A80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-' +
    'A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-' +
    'AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-' +
    'AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-' +
    'FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40' +
    'FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74' +
    'FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7' +
    'FFDA-FFDC'
);

/**
 * Expose `GROUP_WHITE_SPACE`. Unicode White Space Range.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_WHITE_SPACE = expand(
    '0009-000D0020008500A01680180E2000-200A20282029202F205F3000'
);

/**
 * Expose `GROUP_COMBINING_DIACRITICAL_MARK`. Unicode Combining
 * Diacritical Marks, and Combining Diacritical Marks for Symbols, Blocks.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_DIACRITICAL_MARK = expand('20D0-20FF0300-036F');

/**
 * Expose `GROUP_COMBINING_NONSPACING_MARK`. Unicode Mark, Nonspacing,
 * Block.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_NONSPACING_MARK = expand('0300-036F0483-04870591-05BD' +
    '05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E4' +
    '06E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-0823' +
    '0825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D' +
    '0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A42' +
    '0A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD' +
    '0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C40' +
    '0C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41' +
    '-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-' +
    '0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F86' +
    '0F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E1058' +
    '1059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-' +
    '1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D' +
    '18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A62' +
    '1A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B80' +
    '1B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C36' +
    '1C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC' +
    '20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67D' +
    'A69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951' +
    'A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0' +
    'AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0F' +
    'FE20-FE26'
);

/**
 * Expose `GROUP_TERMINAL_MARKER`. Interrobang, question-, and
 * exclamation mark
 *
 * @global
 * @private
 * @constant
 */
GROUP_TERMINAL_MARKER = '\\u203D\\?\\!';

/**
 * Expose `GROUP_CLOSING_PUNCTUATION`. Unicode
 * Pe (Punctuation, Close) category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_CLOSING_PUNCTUATION = expand('0029005D007D0F3B0F3D169C2046' +
    '207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF' +
    '298429862988298A298C298E2990299229942996299829D929DB29FD2E232E25' +
    '2E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36' +
    'FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63'
);

/**
 * Expose `GROUP_FINAL_PUNCTUATION`. Unicode
 * Pf (Punctuation, Final) category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_FINAL_PUNCTUATION = expand(
    '00BB2019201D203A2E032E052E0A2E0D2E1D2E21'
);

/**
 * `EXPRESSION_WORD_CONTRACTION` caches contractions consisting of two
 * parts.
 *
 * Sources:
 * - http://en.wikipedia.org/wiki/Relaxed_pronunciation#English
 * - http://en.wikipedia.org/wiki/Contraction_(grammar)#English
 * - http://en.wikipedia.org/wiki/English_auxiliaries_and_contractions
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_CONTRACTION = [
    /* e.g., (I)('(ll)), the(y)('(re)) */
    /([\s\S])(['’](ll|re|ve|s|m|d|em))\b/ig,
    /* e.g., c(a)(n't) */
    /([\s\S])(n['’]t)\b/ig,
    /* e.g., (o')(c)lock, (y')(a)ll */
    /\b([oy]['’])([\s\S])\b/ig,
    /* ('T)(w)as */
    /(['’]t)([\s\S])/ig,
    /\b(can)(not)\b/ig,
    /\b(d)(['’]ye)\b/ig,
    /\b(gim)(me)\b/ig,
    /\b(lem)(me)\b/ig,
    /\b(could|must|should|would|kind|sort|ought)(a)\b/ig,
    /\b(wan|gon)(na)\b/ig,
    /\b(don|got|get)(cha)\b/ig,
    /\b(out|lot|haf|got)(ta)\b/ig
];

/**
 * `EXPRESSION_WORD_MULTIPUNCTUATION` matches either an astral plane
 * character, or streaks of the same punctuation character.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_MULTIPUNCTUATION = new RegExp(
    '([\\uD800-\\uDBFF][\\uDC00-\\uDFFF])+|[\\s\\S][' +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK +
    ']{2,}|([^' + GROUP_NUMERICAL + GROUP_ALPHABETIC + '])\\2*', 'g'
);

/**
 * `EXPRESSION_WORD_COMBINING` matches multiple combining mark
 * characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_COMBINING = new RegExp(
    '^([' +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK +
    '])+$'
);

/**
 * `EXPRESSION_WORD_DIGIT_LETTER` matches one or more digits followed by
 * one or more letters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_DIGIT_LETTER = new RegExp('([' + GROUP_NUMERICAL +
    ']+)([' + GROUP_ALPHABETIC + ']+)', 'g'
);

/**
 * `EXPRESSION_ORDINAL` matches an ordinal suffix: `th`, `st`, `nd`,
 * or `rd`.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ORDINAL = /^(th|st|nd|rd)$/i;

/**
 * `EXPRESSION_MULTILINEBREAK` finds between-paragraph white space. Also
 * matches initial and final white space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_MULTILINEBREAK = new RegExp(
    '(\\r?\\n|\\r)+$|^(\\r?\\n|\\r)+|(\\r?\\n|\\r){2,}', 'g'
);

/**
 * `STRING_PIPE` holds a pipe (`|`) character.
 *
 * @global
 * @private
 * @constant
 */
STRING_PIPE = '|';

/**
 * `EXPRESSION_ABBREVIATION_PREFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A “word” boundry,
 * followed by a case-insensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '\\b(' + [
    /* *Alphabet*: Both upper- and lowercase. */
    'a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z',

    /*
     * Common Latin Abbreviations:
     * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
     * Where only the abbreviations written without joining full stops,
     * but with a final full stop, were extracted.
     *
     * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
     * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
     * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
     * sic erat scriptum, (et) sequentia, statim, videlicet.
     */
    'c?ca|cap|cf|cp|cwt|ead|al|etc|fl|ff|ibid|id|nem|con|op|cit|cent',
    'pro|tem|sic|seq|stat|viz',

    /*
     * Business Abbreviations:
     * Incorporation, Limited company.
     */
    'inc|ltd',

    /*
     * English unit abbreviations:
     * Note that *Metric abbreviations* do not use full stops.
     *
     * barrel, cubic, dozen, fluid ounce, foot, gallon, grain, gross,
     * inch, karat / knot, pound, mile, ounce, pint, quart, square,
     * tablespoon, teaspoon, yard.
     */
    'bbls?|cu|dozfl|oz|ft|gal|gr|gro|in|kt|lb|mi|oz|pt|qt|sq|tbsp|tsp|yd',

    /*
     * Abbreviations of time references:
     *
     * seconds, minutes, hours, Monday, Tuesday, *, Wednesday,
     * Thursday, *, Friday, Saturday, Sunday, January, Februari, March,
     * April, June, July, August, September, *, October, November,
     * December.
     */
    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar',
    'apr|jun|jul|aug|sep|sept|oct|nov|dec'
    ].join(STRING_PIPE) + ')\\.',
'gi');

/**
 * `EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE` holds a blacklist of full
 * stop characters that should not be treated as terminal sentence
 * markers:
 *
 * A “word” boundry,
 * followed by a case-sensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE = new RegExp(
    '\\b(' + [
    /* Decimals */
    '0|1|2|3|4|5|6|7|8|9',

    /* Social:
     * Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
     * Misters, Mesdames, Junior, Senior, *.
     */
    'Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr',

    /*
     * Rank and academic:
     * Doctor, Magister, Attorney, Profesor, Honourable, Reverend,
     * Father, Monsignor, Sister, Brother, Saint, President,
     * Superintendent, Representative, Senator.
     */
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen',

    /* Rank and military:
     * Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier,
     * General, Commander, Colonel, Captain, Lieutenant, Major,
     * Sergeant, Petty Officer, Warrant Officer, Purple Heart.
     */
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph',

    /*
     * Common geographical abbreviations:
     * Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
     * County, Park, Square, Drive, Port or Point, Street or State, Fort,
     * Peninsula, Territory, Highway, Freeway, Parkway.
     */
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St',
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy',

    /*
     * American state abbreviations:
     * Alabama, Arizona, Arkansas, California, *, Colorado, *,
     * Connecticut, Delaware, Florida, Georgia,Idaho, *, Illinois,
     * Indiana, Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland,
     * Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,
     * Nebraska, *, Nevada, Mexico, Dakota, Oklahoma, *, Oregon,
     * Pennsylvania, *, *, Tennessee, Texas, Utah, Vermont, Virginia,
     * Washington, Wisconsin, *, Wyoming.
     */
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind',
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb',
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va',
    'Wash|Wis|Wisc|Wyo',

    /*
     * Canadian province abbreviations:
     * Alberta, Manitoba, Ontario, Québec, *, Saskatchewan,
     * Yukon Territory.
     */
    'Alta|Man|Ont|Qué|Que|Sask|Yuk',

    /*
     * English county abbreviations
     * Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire,
     * Cheshire, Cornwall, Cumberland, Derbyshire, *, Devon, Dorset,
     * Durham, Gloucestershire, Hampshire, Herefordshire, *,
     * Hertfordshire, Huntingdonshire, Lancashire, Leicestershire,
     * Lincolnshire, Middlesex, *, *, Norfolk, Northamptonshire,
     * Northumberland, *, Nottinghamshire, Oxfordshire, Rutland,
     * Shropshire, Somerset, Staffordshire, *, Suffolk, Surrey,
     * Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
     * Worcestershire, Yorkshire.
     */
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|Glos',
    'Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf',
    'Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|Staffs',
    'Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks'

    ].join(STRING_PIPE) + ')\\.',
'g');

/**
 * `EXPRESSION_ABBREVIATION_AFFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A full stop,
 * followed by a case-sensitive abbreviation,
 * followed by “word” boundry.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_AFFIX = new RegExp(
    '\\.(' + [
    /*
     * Generic Top-level Domains:
     * Air transport industry, Asia-Pacific, business use, Catalan,
     * commercial organizations, cooperatives,
     * U.S. post-secondary educational establishments,
     * U.S. government entities, informational sites,
     * international organizations, employment-related,
     * U.S. military, mobile devices, museums, families and individuals,
     * network infrastructures, organizations, postal services,
     * professions, telephone network, travel, pornography.
     */
    'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi',
    'museum|name|net|org|post|pro|tel|travel|xxx',

    /* Decimals */
    '0|1|2|3|4|5|6|7|8|9'
    ].join(STRING_PIPE) + ')\\b',
'g');

/**
 * `EXPRESSION_INITIALISM` finds initialisms, an abbreviation from
 * initials, with full stops after each initial.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_INITIALISM = new RegExp(
    '([' + GROUP_ALPHABETIC + ']+\\.){2,}', 'g'
);

/**
 * `EXPRESSION_FULL_STOP` finds full stop characters, globally.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_FULL_STOP = /\./g;

/**
 * `EXPRESSION_WORD_CHARACTER` finds a word character.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_CHARACTER = new RegExp('[' + GROUP_ALPHABETIC + ']');

/**
 * `EXPRESSION_SENTENCE_END` finds probable sentence ends.
 *
 * A probable sentence end:
 * A terminal marker (`?`, `!`, or `.`),
 * followed by an optional closing punctuation (e.g., `)` or `”`),
 * followed by an optional comma, full stop, or number,
 * optionally followed by one or more spaces and a letter.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_SENTENCE_END = new RegExp(
    '(\\.|[' + GROUP_TERMINAL_MARKER + ']+)' +
    '([' + GROUP_CLOSING_PUNCTUATION + GROUP_FINAL_PUNCTUATION + '])?' +
    '([,\\.' + GROUP_NUMERICAL + '])?' +
    '(\\ +[\\.' + GROUP_ALPHABETIC + '])?',
'g');

/**
 * `EXPRESSION_SENTENCE_SPACE` matches optional white space at the start
 * of a string, followed by any other characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_SENTENCE_SPACE = new RegExp(
    '^([' + GROUP_WHITE_SPACE + ']+)?([\\s\\S]+)$'
);

/**
 * `EXPRESSION_WHITE_SPACE` matches a string containing ONLY white space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WHITE_SPACE = new RegExp(
    '^[' + GROUP_WHITE_SPACE + ']+$'
);

/**
 * `BREAKPOINT_SORT` sorts breakpoints (an array of integers): Small to
 * large.
 *
 * @global
 * @private
 * @constant
 */
function BREAKPOINT_SORT(a, b) {
    return a - b;
}

/*eslint-disable no-cond-assign */

/**
 * `tokenizeSentence` tokenizes a sentence into `WordNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @param {SentenceNode} sentence - The SentenceNode to append to.
 * @param {String} value - The words, punctuation, and white space to
 *                         parse.
 * @return {SentenceNode} - The given SentenceNode.
 * @global
 * @private
 */
function tokenizeSentence(sentence, value) {
    var tokenBreakPoints = [],
        tokens = [],
        iterator = -1,
        length = EXPRESSION_WORD_CONTRACTION.length,
        expression, pointer, match, token, start, end;

    EXPRESSION_WORD_DIGIT_LETTER.lastIndex =
        EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

    /* Insert word-like break points. */

    /* Break between contractions consisting of two parts. */
    while (++iterator < length) {
        expression = EXPRESSION_WORD_CONTRACTION[iterator];
        expression.lastIndex = 0;

        while (match = expression.exec(value)) {
            tokenBreakPoints.push(match.index + match[1].length);
        }
    }

    /*
     * Break on general punctuation (One or more of the same
     * non-letter or non-number character.
     */
    while (match = EXPRESSION_WORD_MULTIPUNCTUATION.exec(value)) {
        if (EXPRESSION_WORD_COMBINING.test(match[0])) {
            continue;
        }

        pointer = match.index;
        tokenBreakPoints.push(pointer);
        tokenBreakPoints.push(pointer + match[0].length);
    }

    /* Break on one or more digits followed by one or more letters. */
    while (match = EXPRESSION_WORD_DIGIT_LETTER.exec(value)) {
        if (!EXPRESSION_ORDINAL.test(match[2])) {
            tokenBreakPoints.push(match.index + match[1].length);
        }
    }

    tokenBreakPoints.sort(BREAKPOINT_SORT);

    iterator = -1;
    length = tokenBreakPoints.length + 1;
    start = 0;

    while (++iterator < length) {
        end = tokenBreakPoints[iterator];

        /* Skip if the previous end is the same. */
        if (end === 0 || start === end) {
            continue;
        }

        tokens.push(value.slice(start, end || value.length));

        start = end;
    }

    /* Iterate over the non-empty tokens, detect type of token. */
    iterator = -1;
    EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

    while (token = tokens[++iterator]) {
        EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

        /*
         * Append a new item (glue or box) to the list, and pass it the
         * string value and the item its in.
         */
        if (EXPRESSION_WHITE_SPACE.test(token)) {
            sentence.append(new sentence.TextOM.WhiteSpaceNode(token));
        } else if (
            (match = EXPRESSION_WORD_MULTIPUNCTUATION.exec(token)) &&
            !EXPRESSION_WORD_COMBINING.test(match[0])
        ) {
            sentence.append(new sentence.TextOM.PunctuationNode(token));
        } else {
            sentence.append(new sentence.TextOM.WordNode(token));
        }
    }

    return sentence;
}

/**
 * `tokenizeParagraph` tokenizes a paragraph into `SentenceNode`s and
 * `WhiteSpaceNode`s.
 *
 * @param {ParagraphNode} paragraph - The ParagraphNode to append to.
 * @param {String} value - The sentences and white space to parse.
 * @return {ParagraphNode} - The given ParagraphNode.
 * @global
 * @private
 */
function tokenizeParagraph(paragraph, value) {
    var sentences = [],
        sentenceBreakPoints = [],
        sentenceNoBreakPoints = [],
        iterator = -1,
        start, sentence, match, submatch, pointer, $0, $4, length, end;

    EXPRESSION_INITIALISM.lastIndex = EXPRESSION_SENTENCE_END.lastIndex =
        EXPRESSION_ABBREVIATION_PREFIX.lastIndex =
        EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE.lastIndex =
        EXPRESSION_ABBREVIATION_AFFIX.lastIndex = 0;

    /* Two or more occurrences of a letter followed by a full stop. */
    while (submatch = EXPRESSION_INITIALISM.exec(value)) {
        pointer = submatch.index;
        $0 = submatch[0];
        EXPRESSION_FULL_STOP.lastIndex = 0;

        while (match = EXPRESSION_FULL_STOP.exec($0)) {
            sentenceNoBreakPoints.push(pointer + match.index);
        }
    }

    /* A space followd by a common abbr., followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX.exec(value)) {
        sentenceNoBreakPoints.push(match.index + match[1].length);
    }

    /* A common abbreviation, followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE.exec(value)) {
        sentenceNoBreakPoints.push(match.index + match[1].length);
    }

    /* A full stop, followed by a common abbreviation. */
    while (match = EXPRESSION_ABBREVIATION_AFFIX.exec(value)) {
        sentenceNoBreakPoints.push(match.index);
    }

    /*
     * A probable sentence end: A terminal marker (`?`, `!`, or `.`),
     * followed by an optional closing punctuation (e.g., `)` or `”`),
     * followed by an optional comma or full stop, followed by an optional
     * comma or dot, optionally followed by one or more spaces and a
     * letter.
     */
    while (match = EXPRESSION_SENTENCE_END.exec(value)) {
        pointer = match.index;
        $4 = match[4];

        if (sentenceNoBreakPoints.indexOf(pointer) === -1) {
            /*
             * If three was set, the delimiter is followed by a comma
             * character, or a number, thus it's probably not a terminal
             * marker.
             */
            if (match[3]) {
                continue;
            }

            /*
             * If four was set, the delimiter is followed by a space and a
             * letter. If that letter is lowercase, its probably not a
             * terminal marker.
             */
            if ($4 && $4.toString() === $4.toLowerCase()) {
                continue;
            }

            pointer += match[1].length;

            if (match[2]) {
                pointer += match[2].length;
            }

            sentenceBreakPoints.push(pointer);
        }
    }

    sentenceBreakPoints.sort(BREAKPOINT_SORT);
    length = sentenceBreakPoints.length + 1;
    start = 0;

    while (++iterator < length) {
        end = sentenceBreakPoints[iterator];

        sentence = value.slice(start, end || value.length);

        if (EXPRESSION_WORD_CHARACTER.test(sentence)) {
            sentences.push(sentence);
        } else if (sentences.length) {
            sentences[sentences.length - 1] += sentence;
        } else if (iterator === length - 1) {
            sentences.push(sentence);
        } else {
            end -= sentence.length;
        }

        start = end;
    }

    iterator = -1;

    while (sentence = sentences[++iterator]) {
        EXPRESSION_SENTENCE_SPACE.lastIndex = 0;
        sentence = EXPRESSION_SENTENCE_SPACE.exec(sentence);

        if (sentence[1]) {
            paragraph.append(
                new paragraph.TextOM.WhiteSpaceNode(sentence[1])
            );
        }

        tokenizeSentence(paragraph.append(
            new paragraph.TextOM.SentenceNode()), sentence[2]
        );
    }

    return paragraph;
}

/**
 * `tokenizeRoot` tokenizes a document into `ParagraphNode`s and
 * `WhiteSpaceNode`s.
 *
 * @param {RootNode} root - The RootNode to append to.
 * @param {String} value - The paragraphs and white space to parse.
 * @return {RootNode} - The given RootNode.
 * @global
 * @private
 */
function tokenizeRoot(root, value) {
    var iterator = -1,
        start = 0,
        breakpoints = [],
        match, breakpoint,
        paragraph, whiteSpace;

    EXPRESSION_MULTILINEBREAK.lastIndex = 0;

    while (match = EXPRESSION_MULTILINEBREAK.exec(value)) {
        breakpoints.push([match.index, match.index + match[0].length]);
    }

    breakpoints.push([value.length, value.length]);

    while (breakpoint = breakpoints[++iterator]) {
        if (paragraph = value.slice(start, breakpoint[0])) {
            tokenizeParagraph(
                root.append(new root.TextOM.ParagraphNode()), paragraph
            );
        }

        if (whiteSpace = value.slice(breakpoint[0], breakpoint[1])) {
            root.append(new root.TextOM.WhiteSpaceNode(whiteSpace));
        }

        start = breakpoint[1];
    }

    return root;
}

/*eslint-enable no-cond-assign */

/**
 * Expose `parseEnglishConstructor`. Used to construct a new parser.
 */
function parseEnglishConstructor() {
    var TextOM = textom(),
        types = TextOM.types = [],
        key, Constructor, prototype;

    for (key in TextOM) {
        /* istanbul ignore else */
        if (TextOM.hasOwnProperty(key)) {
            Constructor = TextOM[key];
            prototype = Constructor && Constructor.prototype;

            if (prototype && 'type' in prototype) {
                types[prototype.type] = key;
            }
        }
    }

    /**
     * `parser` parsed a given english (or latin) document into root,
     * paragraphs, sentences, words, punctuation, and white space “nodes”.
     * For more information about nodes see TextOM.
     *
     * @param {(String|Node)?} source - The source to convert.
     * @return {Node} - A RootNode containing the tokenised source.
     * @api public
     */
    function parser(source) {
        if (source === null || source === undefined) {
            source = '';
        } else if (source instanceof TextOM.Node ||
            source instanceof String) {
                source = source.toString();
        }

        if (typeof source !== 'string') {
            throw new TypeError('Illegal invocation: \'' + source +
                '\' is not a valid argument for \'ParseEnglish\'');
        }

        return tokenizeRoot(new TextOM.RootNode(), source);
    }

    /**
     * Expose `TextOM`.
     *
     * @api public
     * @memberof parser
     * @constructor
     */
    parser.TextOM = TextOM;

    /**
     * Expose `parser` on every node.
     *
     * @api public
     * @memberof TextOM.Node.prototype
     */
    TextOM.Node.prototype.parser = parser;

    return parser;
}

module.exports = parseEnglishConstructor;

},{"textom":13}],13:[function(require,module,exports){
'use strict';

/**
 * Utilities.
 */
var arrayPrototype = Array.prototype,
    arrayUnshift = arrayPrototype.unshift,
    arrayPush = arrayPrototype.push,
    arraySlice = arrayPrototype.slice,
    arrayIndexOf = arrayPrototype.indexOf,
    arraySplice = arrayPrototype.splice;

/* istanbul ignore if: User forgot a polyfill much? */
if (!arrayIndexOf) {
    throw new Error('Missing Array#indexOf() method for TextOM');
}

function fire(context, callbacks, args) {
    var iterator = -1;

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks = callbacks.concat();

    while (callbacks[++iterator]) {
        callbacks[iterator].apply(context, args);
    }

    return;
}

function trigger(context, name) {
    var args = arraySlice.call(arguments, 2),
        callbacks;

    while (context) {
        callbacks = context.callbacks;
        if (callbacks) {
            fire(context, callbacks[name], args);
        }

        callbacks = context.constructor.callbacks;
        if (callbacks) {
            fire(context, callbacks[name], args);
        }

        context = context.parent;
    }
}

function emit(context, name) {
    var args = arraySlice.call(arguments, 2),
        constructors = context.constructor.constructors,
        iterator = -1,
        callbacks = context.callbacks;

    if (callbacks) {
        fire(context, callbacks[name], args);
    }

    /* istanbul ignore if: Wrong-usage */
    if (!constructors) {
        return;
    }

    while (constructors[++iterator]) {
        callbacks = constructors[iterator].callbacks;

        if (callbacks) {
            fire(context, callbacks[name], args);
        }
    }
}

/**
 * Inserts the given `child` after (when given), the `item`, and otherwise as
 * the first item of the given parents.
 *
 * @param {Object} parent
 * @param {Object} item
 * @param {Object} child
 * @api private
 */
function insert(parent, item, child) {
    var next;

    if (!parent) {
        throw new TypeError('Illegal invocation: \'' + parent +
            ' is not a valid argument for \'insert\'');
    }

    if (!child) {
        throw new TypeError('\'' + child +
            ' is not a valid argument for \'insert\'');
    }

    if ('hierarchy' in child && 'hierarchy' in parent) {
        if (parent.hierarchy + 1 !== child.hierarchy) {
            throw new Error('HierarchyError: The operation would ' +
                'yield an incorrect node tree');
        }
    }

    if (typeof child.remove !== 'function') {
        throw new Error('The operated on node did not have a ' +
            '`remove` method');
    }

    /* Insert after... */
    if (item) {
        /* istanbul ignore if: Wrong-usage */
        if (item.parent !== parent) {
            throw new Error('The operated on node (the "pointer") ' +
                'was detached from the parent');
        }

        /* istanbul ignore if: Wrong-usage */
        if (arrayIndexOf.call(parent, item) === -1) {
            throw new Error('The operated on node (the "pointer") ' +
                'was attached to its parent, but the parent has no ' +
                'indice corresponding to the item');
        }
    }

    /* Detach the child. */
    child.remove();

    /* Set the child's parent to items parent. */
    child.parent = parent;

    if (item) {
        next = item.next;

        /* If item has a next node... */
        if (next) {
            /* ...link the child's next node, to items next node. */
            child.next = next;

            /* ...link the next nodes previous node, to the child. */
            next.prev = child;
        }

        /* Set the child's previous node to item. */
        child.prev = item;

        /* Set the next node of item to the child. */
        item.next = child;

        /* If the parent has no last node or if item is the parent last node,
         * link the parents last node to the child. */
        if (item === parent.tail || !parent.tail) {
            parent.tail = child;
            arrayPush.call(parent, child);
        /* Else, insert the child into the parent after the items index. */
        } else {
            arraySplice.call(
                parent, arrayIndexOf.call(parent, item) + 1, 0, child
            );
        }
    /* If parent has a first node... */
    } else if (parent.head) {
        next = parent.head;

        /* Set the child's next node to head. */
        child.next = next;

        /* Set the previous node of head to the child. */
        next.prev = child;

        /* Set the parents heads to the child. */
        parent.head = child;

        /* If the the parent has no last node, link the parents last node to
         * head. */
        if (!parent.tail) {
            parent.tail = next;
        }

        arrayUnshift.call(parent, child);
    /* Prepend. There is no `head` (or `tail`) node yet. */
    } else {
        /* Set parent's first node to the prependee and return the child. */
        parent.head = child;
        parent[0] = child;
        parent.length = 1;
    }

    next = child.next;

    emit(child, 'insert');

    if (item) {
        emit(item, 'changenext', child, next);
        emit(child, 'changeprev', item, null);
    }

    if (next) {
        emit(next, 'changeprev', child, item);
        emit(child, 'changenext', next, null);
    }

    trigger(parent, 'insertinside', child);

    return child;
}

/**
 * Detach a node from its (when applicable) parent, links its (when
 * existing) previous and next items to each other.
 *
 * @param {Object} node
 * @api private
 */
function remove(node) {
    /* istanbul ignore if: Wrong-usage */
    if (!node) {
        return false;
    }

    /* Cache self, the parent list, and the previous and next items. */
    var parent = node.parent,
        prev = node.prev,
        next = node.next,
        indice;

    /* If the item is already detached, return node. */
    if (!parent) {
        return node;
    }

    /* If node is the last item in the parent, link the parents last
     * item to the previous item. */
    if (parent.tail === node) {
        parent.tail = prev;
    }

    /* If node is the first item in the parent, link the parents first
     * item to the next item. */
    if (parent.head === node) {
        parent.head = next;
    }

    /* If both the last and first items in the parent are the same,
     * remove the link to the last item. */
    if (parent.tail === parent.head) {
        parent.tail = null;
    }

    /* If a previous item exists, link its next item to nodes next
     * item. */
    if (prev) {
        prev.next = next;
    }

    /* If a next item exists, link its previous item to nodes previous
     * item. */
    if (next) {
        next.prev = prev;
    }

    /* istanbul ignore else: Wrong-usage */
    if ((indice = arrayIndexOf.call(parent, node)) !== -1) {
        arraySplice.call(parent, indice, 1);
    }

    /* Remove links from node to both the next and previous items,
     * and to the parent. */
    node.prev = node.next = node.parent = null;

    emit(node, 'remove', parent);

    if (next) {
        emit(next, 'changeprev', prev || null, node);
        emit(node, 'changenext', null, next);
    }

    if (prev) {
        emit(node, 'changeprev', null, prev);
        emit(prev, 'changenext', next || null, node);
    }

    trigger(parent, 'removeinside', node, parent);

    /* Return node. */
    return node;
}

function listen(name, callback) {
    var self = this,
        callbacks;

    if (typeof name !== 'string') {
        if (name === null || name === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + name +
            ' is not a valid argument for \'listen\'');
    }

    if (typeof callback !== 'function') {
        if (callback === null || callback === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + callback +
            ' is not a valid argument for \'listen\'');
    }

    callbacks = self.callbacks || (self.callbacks = {});
    callbacks = callbacks[name] || (callbacks[name] = []);
    callbacks.unshift(callback);

    return self;
}

function ignore(name, callback) {
    var self = this,
        callbacks, indice;

    if ((name === null || name === undefined) &&
        (callback === null || callback === undefined)) {
        self.callbacks = {};
        return self;
    }

    if (typeof name !== 'string') {
        if (name === null || name === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + name +
            ' is not a valid argument for \'listen\'');
    }

    if (!(callbacks = self.callbacks)) {
        return self;
    }

    if (!(callbacks = callbacks[name])) {
        return self;
    }

    if (typeof callback !== 'function') {
        if (callback === null || callback === undefined) {
            callbacks.length = 0;
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + callback +
            ' is not a valid argument for \'listen\'');
    }

    if ((indice = callbacks.indexOf(callback)) !== -1) {
        callbacks.splice(indice, 1);
    }

    return self;
}

function TextOMConstructor() {
    /**
     * Expose `Node`. Initialises a new `Node` object.
     *
     * @api public
     * @constructor
     */
    function Node() {
        if (!this.data) {
            /** @member {Object} */
            this.data = {};
        }
    }

    var prototype = Node.prototype;

    prototype.on = Node.on = listen;

    prototype.off = Node.off = ignore;

    /**
     * Inherit the contexts' (Super) prototype into a given Constructor. E.g.,
     * Node is implemented by Parent, Parent is implemented by RootNode, &c.
     *
     * @param {function} Constructor
     * @api public
     */
    Node.isImplementedBy = function (Constructor) {
        var self = this,
            constructors = self.constructors || [self],
            constructorPrototype, key, newPrototype;

        constructors = [Constructor].concat(constructors);

        constructorPrototype = Constructor.prototype;

        function AltConstructor () {}
        AltConstructor.prototype = self.prototype;
        newPrototype = new AltConstructor();

        for (key in constructorPrototype) {
            newPrototype[key] = constructorPrototype[key];
        }

        if (constructorPrototype.toString !== {}.toString) {
            newPrototype.toString = constructorPrototype.toString;
        }

        for (key in self) {
            /* istanbul ignore else */
            if (self.hasOwnProperty(key)) {
                Constructor[key] = self[key];
            }
        }

        newPrototype.constructor = Constructor;
        Constructor.constructors = constructors;
        Constructor.prototype = newPrototype;
    };

    /**
     * Expose Parent. Constructs a new Parent node;
     *
     * @api public
     * @constructor
     */
    function Parent() {
        Node.apply(this, arguments);
    }

    prototype = Parent.prototype;

    /**
     * The first child of a parent, null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.head = null;

    /**
     * The last child of a parent (unless the last child is also the first
     * child), null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.tail = null;

    /**
     * The number of children in a parent.
     *
     * @api public
     * @type {number}
     * @readonly
     */
    prototype.length = 0;

    /**
     * Insert a child at the beginning of the list (like Array#unshift).
     *
     * @param {Child} child - the child to insert as the (new) FIRST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.prepend = function (child) {
        return insert(this, null, child);
    };

    /**
     * Insert a child at the end of the list (like Array#push).
     *
     * @param {Child} child - the child to insert as the (new) LAST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.append = function (child) {
        return insert(this, this.tail || this.head, child);
    };

    /**
     * Return a child at given position in parent, and null otherwise. (like
     * NodeList#item).
     *
     * @param {?number} [index=0] - the position to find a child at.
     * @return {Child?} - the found child, or null.
     * @api public
     */
    prototype.item = function (index) {
        if (index === null || index === undefined) {
            index = 0;
        } else if (typeof index !== 'number' || index !== index) {
            throw new TypeError('\'' + index + ' is not a valid argument ' +
                'for \'Parent.prototype.item\'');
        }

        return this[index] || null;
    };

    /**
     * Split the Parent into two, dividing the children from 0–position (NOT
     * including the character at `position`), and position–length (including
     * the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Parent} - the prepended parent.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            clone, cloneNode, iterator;

        if (position === null || position === undefined ||
            position !== position || position === -Infinity) {
                position = 0;
        } else if (position === Infinity) {
            position = self.length;
        } else if (typeof position !== 'number') {
            throw new TypeError('\'' + position + ' is not a valid ' +
                'argument for \'Parent.prototype.split\'');
        } else if (position < 0) {
            position = Math.abs((self.length + position) % self.length);
        }

        /* This throws if we're not attached, thus preventing appending. */
        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        clone = arraySlice.call(self);
        iterator = -1;

        while (++iterator < position && clone[iterator]) {
            cloneNode.append(clone[iterator]);
        }

        return cloneNode;
    };

    /**
     * Return the result of calling `toString` on each of `Parent`s children.
     *
     * NOTE The `toString` method is intentionally generic; It can be
     * transferred to other kinds of (linked-list-like) objects for use as a
     * method.
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        var value, node;

        value = '';
        node = this.head;

        while (node) {
            value += node;
            node = node.next;
        }

        return value;
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Parent);

    /**
     * Expose Child. Constructs a new Child node;
     *
     * @api public
     * @constructor
     */
    function Child() {
        Node.apply(this, arguments);
    }

    prototype = Child.prototype;

    /**
     * The parent node, null otherwise (when the child is detached).
     *
     * @api public
     * @type {?Parent}
     * @readonly
     */
    prototype.parent = null;

    /**
     * The next node, null otherwise (when `child` is the parents last child
     * or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.next = null;

    /**
     * The previous node, null otherwise (when `child` is the parents first
     * child or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.prev = null;

    /**
     * Insert a given child before the operated on child in the parent.
     *
     * @param {Child} child - the child to insert before the operated on
     *                        child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.before = function (child) {
        return insert(this.parent, this.prev, child);
    };

    /**
     * Insert a given child after the operated on child in the parent.
     *
     * @param {Child} child - the child to insert after the operated on child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.after = function (child) {
        return insert(this.parent, this, child);
    };

    /**
     * Remove the operated on child, and insert a given child at its previous
     * position in the parent.
     *
     * @param {Child} child - the child to replace the operated on child with.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.replace = function (child) {
        var result = insert(this.parent, this, child);

        remove(this);

        return result;
    };

    /**
     * Remove the operated on child.
     *
     * @return {Child} - the operated on child.
     * @api public
     */
    prototype.remove = function () {
        return remove(this);
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Child);

    /**
     * Expose Element. Constructs a new Element node;
     *
     * @api public
     * @constructor
     */
    function Element() {
        Parent.apply(this, arguments);
        Child.apply(this, arguments);
    }

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Parent.isImplementedBy(Element);
    Child.isImplementedBy(Element);

    /* Add Parent as a constructor (which it is) */
    Element.constructors.splice(2, 0, Parent);

    /**
     * Expose Text. Constructs a new Text node;
     *
     * @api public
     * @constructor
     */
    function Text(value) {
        Child.apply(this, arguments);

        this.fromString(value);
    }

    prototype = Text.prototype;

    /**
     * The internal value.
     *
     * @api private
     */
    prototype.internalValue = '';

    /**
     * Return the internal value of a Text;
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        return this.internalValue;
    };

    /**
     * (Re)sets and returns the internal value of a Text with the stringified
     * version of the given value.
     *
     * @param {?String} [value=''] - the value to set
     * @return {String}
     * @api public
     */
    prototype.fromString = function (value) {
        var self = this,
            previousValue = self.toString(),
            parent;

        if (value === null || value === undefined) {
            value = '';
        } else {
            value = value.toString();
        }

        if (value !== previousValue) {
            self.internalValue = value;

            emit(self, 'changetext', value, previousValue);

            parent = self.parent;
            if (parent) {
                trigger(
                    parent, 'changetextinside', self, value, previousValue
                );
            }
        }

        return value;
    };

    /**
     * Split the Text into two, dividing the internal value from 0–position
     * (NOT including the character at `position`), and position–length
     * (including the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Child} - the prepended child.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            value = self.internalValue,
            cloneNode;

        if (position === null ||
            position === undefined ||
            position !== position ||
            position === -Infinity) {
                position = 0;
        } else if (position === Infinity) {
            position = value.length;
        } else if (typeof position !== 'number') {
            throw new TypeError('\'' + position + ' is not a valid ' +
                'argument for \'Text.prototype.split\'');
        } else if (position < 0) {
            position = Math.abs((value.length + position) % value.length);
        }

        /* This throws if we're not attached, thus preventing substringing. */
        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        self.fromString(value.slice(position));
        cloneNode.fromString(value.slice(0, position));

        return cloneNode;
    };

    /**
     * Inherit from `Child.prototype`.
     */
    Child.isImplementedBy(Text);

    /**
     * Expose RootNode. Constructs a new RootNode (inheriting from Parent);
     *
     * @api public
     * @constructor
     */
    function RootNode() {
        Parent.apply(this, arguments);
    }

    /**
     * The type of an instance of RootNode.
     *
     * @api public
     * @readonly
     * @static
     */
    RootNode.prototype.type = 1;
    RootNode.prototype.hierarchy = 1;

    /**
     * Inherit from `Parent.prototype`.
     */
    Parent.isImplementedBy(RootNode);

    /**
     * Expose ParagraphNode. Constructs a new ParagraphNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function ParagraphNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of ParagraphNode.
     *
     * @api public
     * @readonly
     * @static
     */
    ParagraphNode.prototype.type = 2;
    ParagraphNode.prototype.hierarchy = 2;

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Element.isImplementedBy(ParagraphNode);

    /**
     * Expose SentenceNode. Constructs a new SentenceNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function SentenceNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of SentenceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SentenceNode.prototype.type = 3;
    SentenceNode.prototype.hierarchy = 3;

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Element.isImplementedBy(SentenceNode);

    /**
     * Expose WordNode.
     */
    function WordNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of WordNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WordNode.prototype.type = 4;
    WordNode.prototype.hierarchy = 4;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(WordNode);

    /**
     * Expose WhiteSpaceNode.
     */
    function WhiteSpaceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of WhiteSpaceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WhiteSpaceNode.prototype.type = 5;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(WhiteSpaceNode);

    /**
     * Expose PunctuationNode.
     */
    function PunctuationNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of PunctuationNode.
     *
     * @api public
     * @readonly
     * @static
     */
    PunctuationNode.prototype.type = 6;
    PunctuationNode.prototype.hierarchy = 4;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(PunctuationNode);

    /**
     * Expose SourceNode.
     */
    function SourceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of SourceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SourceNode.prototype.type = 7;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(SourceNode);

    var nodePrototype = Node.prototype,
        TextOM;

    /**
     * Define the `TextOM` object.
     * Expose `TextOM` on every instance of Node.
     *
     * @api public
     */
    nodePrototype.TextOM = TextOM = {};

    /**
     * Export all node types to `TextOM` and `Node#`.
     */
    TextOM.ROOT_NODE = nodePrototype.ROOT_NODE =
        RootNode.prototype.type;
    TextOM.PARAGRAPH_NODE = nodePrototype.PARAGRAPH_NODE =
        ParagraphNode.prototype.type;
    TextOM.SENTENCE_NODE = nodePrototype.SENTENCE_NODE =
        SentenceNode.prototype.type;
    TextOM.WORD_NODE = nodePrototype.WORD_NODE = WordNode.prototype.type;
    TextOM.PUNCTUATION_NODE = nodePrototype.PUNCTUATION_NODE =
        PunctuationNode.prototype.type;
    TextOM.WHITE_SPACE_NODE = nodePrototype.WHITE_SPACE_NODE =
        WhiteSpaceNode.prototype.type;
    TextOM.SOURCE_NODE = nodePrototype.SOURCE_NODE =
        SourceNode.prototype.type;

    /**
     * Export all `Node`s to `TextOM`.
     */
    TextOM.Node = Node;
    TextOM.Parent = Parent;
    TextOM.Child = Child;
    TextOM.Element = Element;
    TextOM.Text = Text;
    TextOM.RootNode = RootNode;
    TextOM.ParagraphNode = ParagraphNode;
    TextOM.SentenceNode = SentenceNode;
    TextOM.WordNode = WordNode;
    TextOM.PunctuationNode = PunctuationNode;
    TextOM.WhiteSpaceNode = WhiteSpaceNode;
    TextOM.SourceNode = SourceNode;

    /**
     * Expose `TextOM`. Used to instantiate a new `RootNode`.
     */
    return TextOM;
}

module.exports = TextOMConstructor;

},{}],14:[function(require,module,exports){
'use strict';

var emoji, gemoji, Retext, AST, content, assert, fs, baseSentence,
    fullStop, encodeRetext, decodeRetext, names, name, unicode, unsupported,
    iterator;

emoji = require('..');
gemoji = require('gemoji');
AST = require('retext-ast');
content = require('retext-content');
Retext = require('retext');
assert = require('assert');

baseSentence = 'Lack of cross-device emoji support makes me ';
fullStop = '.';

encodeRetext = new Retext()
    .use(AST)
    .use(content)
    .use(emoji({
        'convert' : 'encode'
    }));

decodeRetext = new Retext()
    .use(AST)
    .use(content)
    .use(emoji({
        'convert' : 'decode'
    }));

describe('emoji()', function () {
    it('should be of type `function`', function () {
        assert(typeof emoji === 'function');
    });

    it('should throw when invoked by Retext, rather than the user',
        function () {
            var throwingRetext = new Retext().use(emoji);

            assert.throws(function () {
                assert(throwingRetext.parse());
            }, /Illegal invocation/);
        }
    );

    it('should throw when options or no options.convert are omitted',
        function () {
            assert.throws(function () {
                assert(new Retext().use(emoji()));
            }, /'undefined'/);

            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'test' : 'encode'
                })));
            }, /'\[object Object\]'/);
        }
    );

    it('should throw when `convert` is given, but the value is neither ' +
        '`"encode"` nor `"decode"`', function () {
            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'convert' : false
                })));
            }, /'false'/);
        }
    );

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation node',
        function () {
            var tree = decodeRetext.parse('This makes me feel :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation ' +
        'node, when inserted after the initial parse', function () {
            var tree = decodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent(':sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should NOT classify invalid gemoji-like sequences as gemojis ' +
        '(e.g., `:trololol:`) as a single punctuation node', function () {
            var tree = decodeRetext.parse('This makes me feel :trololol:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trololol'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));

            tree = decodeRetext.parse('Hello Mr. Smith:\n');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hello'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Mr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Smith'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemojis (e.g., `:sob:`) to their ' +
        'unicode equivalent, when `convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDE2D'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemojis (e.g., `:sob:`) to their ' +
        'unicode equivalent, when inserted after the initial parse and ' +
        '`convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent(':sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDE2D'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel \uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when inserted after the initial parse ' +
        'and `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent('\uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

names = gemoji.name;

// Delete unsupported gemoji.
unsupported = ['m', 'information_source'];
iterator = -1;

while (unsupported[++iterator]) {
    delete names[unsupported[iterator]];
}

for (name in names) {
    unicode = names[name];
    name = ':' + name + ':';

    describe('emoji `' + unicode + '`', function () {
        it('should decode the emoticon (from `' + unicode + '` to `' +
            name + '`)', function () {
                var source = baseSentence + unicode + fullStop,
                    tree = decodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + name + fullStop);
                assert(emoji.toString() === name);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );

        it('should encode the emoticon (from `' + name + '` to `' + unicode +
            '`)', function () {
                var source = baseSentence + name + fullStop,
                    tree = encodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + unicode + fullStop);
                assert(emoji.toString() === unicode);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );
    });
}

},{"..":1,"assert":2,"gemoji":7,"retext":11,"retext-ast":8,"retext-content":9}]},{},[14])