var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// (disabled):node_modules/object-inspect/util.inspect
var require_util = __commonJS({
  "(disabled):node_modules/object-inspect/util.inspect"() {
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module3) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module3.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect2(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect2);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect2);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect2);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect2(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect2(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect2(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect2(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect2);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect2) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect2(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect2(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/@midnight-ntwrk/compact-runtime/dist/error.js
var import_object_inspect = __toESM(require_object_inspect(), 1);
var CompactError = class extends Error {
  constructor(msg) {
    super(msg);
    this.name = "CompactError";
  }
};
function assert(b, s) {
  if (!b) {
    const msg = `failed assert: ${s}`;
    throw new CompactError(msg);
  }
}
function typeError(who, what, where, type, x) {
  const msg = `type error: ${who} ${what} at ${where}; expected value of type ${type} but received ${(0, import_object_inspect.default)(x)}`;
  throw new CompactError(msg);
}

// wasm-module:/Users/david/repos/dex-arb-starter/challenges/midnight-secret-pond/node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm
var midnight_onchain_runtime_wasm_bg_exports = {};
__export(midnight_onchain_runtime_wasm_bg_exports, {
  __externref_drop_slice: () => __externref_drop_slice,
  __externref_table_alloc: () => __externref_table_alloc,
  __externref_table_dealloc: () => __externref_table_dealloc,
  __wbg_chargedstate_free: () => __wbg_chargedstate_free,
  __wbg_contractmaintenanceauthority_free: () => __wbg_contractmaintenanceauthority_free,
  __wbg_contractoperation_free: () => __wbg_contractoperation_free,
  __wbg_contractstate_free: () => __wbg_contractstate_free,
  __wbg_costmodel_free: () => __wbg_costmodel_free,
  __wbg_intounderlyingbytesource_free: () => __wbg_intounderlyingbytesource_free,
  __wbg_intounderlyingsink_free: () => __wbg_intounderlyingsink_free,
  __wbg_intounderlyingsource_free: () => __wbg_intounderlyingsource_free,
  __wbg_querycontext_free: () => __wbg_querycontext_free,
  __wbg_queryresults_free: () => __wbg_queryresults_free,
  __wbg_stateboundedmerkletree_free: () => __wbg_stateboundedmerkletree_free,
  __wbg_statemap_free: () => __wbg_statemap_free,
  __wbg_statevalue_free: () => __wbg_statevalue_free,
  __wbg_vmresults_free: () => __wbg_vmresults_free,
  __wbg_vmstack_free: () => __wbg_vmstack_free,
  __wbindgen_exn_store: () => __wbindgen_exn_store,
  __wbindgen_export_2: () => __wbindgen_export_2,
  __wbindgen_export_5: () => __wbindgen_export_5,
  __wbindgen_free: () => __wbindgen_free,
  __wbindgen_malloc: () => __wbindgen_malloc,
  __wbindgen_realloc: () => __wbindgen_realloc,
  __wbindgen_start: () => __wbindgen_start,
  bigIntModFr: () => bigIntModFr,
  bigIntToValue: () => bigIntToValue2,
  chargedstate_new: () => chargedstate_new,
  chargedstate_state: () => chargedstate_state,
  chargedstate_toString: () => chargedstate_toString,
  closure690_externref_shim: () => closure690_externref_shim,
  closure730_externref_shim: () => closure730_externref_shim,
  communicationCommitment: () => communicationCommitment,
  communicationCommitmentRandomness: () => communicationCommitmentRandomness,
  contractmaintenanceauthority_committee: () => contractmaintenanceauthority_committee,
  contractmaintenanceauthority_counter: () => contractmaintenanceauthority_counter,
  contractmaintenanceauthority_deserialize: () => contractmaintenanceauthority_deserialize,
  contractmaintenanceauthority_new: () => contractmaintenanceauthority_new,
  contractmaintenanceauthority_serialize: () => contractmaintenanceauthority_serialize,
  contractmaintenanceauthority_threshold: () => contractmaintenanceauthority_threshold,
  contractmaintenanceauthority_toString: () => contractmaintenanceauthority_toString,
  contractoperation_deserialize: () => contractoperation_deserialize,
  contractoperation_new: () => contractoperation_new,
  contractoperation_serialize: () => contractoperation_serialize,
  contractoperation_set_verifier_key: () => contractoperation_set_verifier_key,
  contractoperation_toString: () => contractoperation_toString,
  contractoperation_verifier_key: () => contractoperation_verifier_key,
  contractstate_balance: () => contractstate_balance,
  contractstate_data: () => contractstate_data,
  contractstate_deserialize: () => contractstate_deserialize,
  contractstate_maintenance_authority: () => contractstate_maintenance_authority,
  contractstate_new: () => contractstate_new,
  contractstate_operation: () => contractstate_operation,
  contractstate_operations: () => contractstate_operations,
  contractstate_query: () => contractstate_query,
  contractstate_serialize: () => contractstate_serialize,
  contractstate_setOperation: () => contractstate_setOperation,
  contractstate_set_balance: () => contractstate_set_balance,
  contractstate_set_data: () => contractstate_set_data,
  contractstate_set_maintenance_authority: () => contractstate_set_maintenance_authority,
  contractstate_toString: () => contractstate_toString,
  costmodel_initialCostModel: () => costmodel_initialCostModel,
  costmodel_new: () => costmodel_new,
  costmodel_toString: () => costmodel_toString,
  decodeCoinPublicKey: () => decodeCoinPublicKey,
  decodeContractAddress: () => decodeContractAddress,
  decodeQualifiedShieldedCoinInfo: () => decodeQualifiedShieldedCoinInfo,
  decodeRawTokenType: () => decodeRawTokenType,
  decodeShieldedCoinInfo: () => decodeShieldedCoinInfo,
  decodeUserAddress: () => decodeUserAddress,
  degradeToTransient: () => degradeToTransient,
  dummyContractAddress: () => dummyContractAddress2,
  dummyUserAddress: () => dummyUserAddress,
  ecAdd: () => ecAdd,
  ecMul: () => ecMul,
  ecMulGenerator: () => ecMulGenerator,
  encodeCoinPublicKey: () => encodeCoinPublicKey2,
  encodeContractAddress: () => encodeContractAddress2,
  encodeQualifiedShieldedCoinInfo: () => encodeQualifiedShieldedCoinInfo2,
  encodeRawTokenType: () => encodeRawTokenType,
  encodeShieldedCoinInfo: () => encodeShieldedCoinInfo2,
  encodeUserAddress: () => encodeUserAddress,
  entryPointHash: () => entryPointHash,
  hashToCurve: () => hashToCurve,
  instance: () => instance,
  intounderlyingbytesource_autoAllocateChunkSize: () => intounderlyingbytesource_autoAllocateChunkSize,
  intounderlyingbytesource_cancel: () => intounderlyingbytesource_cancel,
  intounderlyingbytesource_pull: () => intounderlyingbytesource_pull,
  intounderlyingbytesource_start: () => intounderlyingbytesource_start,
  intounderlyingbytesource_type: () => intounderlyingbytesource_type,
  intounderlyingsink_abort: () => intounderlyingsink_abort,
  intounderlyingsink_close: () => intounderlyingsink_close,
  intounderlyingsink_write: () => intounderlyingsink_write,
  intounderlyingsource_cancel: () => intounderlyingsource_cancel,
  intounderlyingsource_pull: () => intounderlyingsource_pull,
  leafHash: () => leafHash,
  maxAlignedSize: () => maxAlignedSize,
  maxField: () => maxField2,
  memory: () => memory,
  module: () => module2,
  persistentCommit: () => persistentCommit,
  persistentHash: () => persistentHash2,
  proofDataIntoSerializedPreimage: () => proofDataIntoSerializedPreimage,
  querycontext_address: () => querycontext_address,
  querycontext_block: () => querycontext_block,
  querycontext_com_indices: () => querycontext_com_indices,
  querycontext_effects: () => querycontext_effects,
  querycontext_insertCommitment: () => querycontext_insertCommitment,
  querycontext_new: () => querycontext_new,
  querycontext_qualify: () => querycontext_qualify,
  querycontext_query: () => querycontext_query,
  querycontext_runTranscript: () => querycontext_runTranscript,
  querycontext_set_block: () => querycontext_set_block,
  querycontext_set_effects: () => querycontext_set_effects,
  querycontext_state: () => querycontext_state,
  querycontext_toString: () => querycontext_toString,
  querycontext_toVmStack: () => querycontext_toVmStack,
  queryresults_context: () => queryresults_context,
  queryresults_events: () => queryresults_events,
  queryresults_gas_cost: () => queryresults_gas_cost,
  queryresults_new: () => queryresults_new,
  queryresults_toString: () => queryresults_toString,
  rawTokenType: () => rawTokenType,
  runProgram: () => runProgram,
  runtimeCoinCommitment: () => runtimeCoinCommitment,
  runtimeCoinNullifier: () => runtimeCoinNullifier,
  sampleContractAddress: () => sampleContractAddress2,
  sampleRawTokenType: () => sampleRawTokenType,
  sampleSigningKey: () => sampleSigningKey,
  sampleUserAddress: () => sampleUserAddress,
  signData: () => signData,
  signatureVerifyingKey: () => signatureVerifyingKey,
  signingKeyFromBip340: () => signingKeyFromBip340,
  stateboundedmerkletree_blank: () => stateboundedmerkletree_blank,
  stateboundedmerkletree_collapse: () => stateboundedmerkletree_collapse,
  stateboundedmerkletree_findPathForLeaf: () => stateboundedmerkletree_findPathForLeaf,
  stateboundedmerkletree_height: () => stateboundedmerkletree_height,
  stateboundedmerkletree_pathForLeaf: () => stateboundedmerkletree_pathForLeaf,
  stateboundedmerkletree_rehash: () => stateboundedmerkletree_rehash,
  stateboundedmerkletree_root: () => stateboundedmerkletree_root,
  stateboundedmerkletree_toString: () => stateboundedmerkletree_toString,
  stateboundedmerkletree_update: () => stateboundedmerkletree_update,
  statemap_get: () => statemap_get,
  statemap_insert: () => statemap_insert,
  statemap_keys: () => statemap_keys,
  statemap_new: () => statemap_new,
  statemap_remove: () => statemap_remove,
  statemap_toString: () => statemap_toString,
  statevalue_arrayPush: () => statevalue_arrayPush,
  statevalue_asArray: () => statevalue_asArray,
  statevalue_asBoundedMerkleTree: () => statevalue_asBoundedMerkleTree,
  statevalue_asCell: () => statevalue_asCell,
  statevalue_asMap: () => statevalue_asMap,
  statevalue_decode: () => statevalue_decode,
  statevalue_encode: () => statevalue_encode,
  statevalue_logSize: () => statevalue_logSize,
  statevalue_new: () => statevalue_new,
  statevalue_newArray: () => statevalue_newArray,
  statevalue_newBoundedMerkleTree: () => statevalue_newBoundedMerkleTree,
  statevalue_newCell: () => statevalue_newCell,
  statevalue_newMap: () => statevalue_newMap,
  statevalue_newNull: () => statevalue_newNull,
  statevalue_toString: () => statevalue_toString,
  statevalue_type: () => statevalue_type,
  transientCommit: () => transientCommit,
  transientHash: () => transientHash,
  upgradeFromTransient: () => upgradeFromTransient,
  valueToBigInt: () => valueToBigInt2,
  verifySignature: () => verifySignature,
  vmresults_events: () => vmresults_events,
  vmresults_gas_cost: () => vmresults_gas_cost,
  vmresults_new: () => vmresults_new,
  vmresults_stack: () => vmresults_stack,
  vmresults_toString: () => vmresults_toString,
  vmstack_get: () => vmstack_get,
  vmstack_isStrong: () => vmstack_isStrong,
  vmstack_length: () => vmstack_length,
  vmstack_new: () => vmstack_new,
  vmstack_push: () => vmstack_push,
  vmstack_removeLast: () => vmstack_removeLast,
  vmstack_toString: () => vmstack_toString
});

// wasm-deferred:/Users/david/repos/dex-arb-starter/challenges/midnight-secret-pond/node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm
var midnight_onchain_runtime_wasm_bg_default = "./midnight-runtime.wasm";

// node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.js
var wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry(
  (state) => {
    wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
  }
);
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_2.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
function dummyContractAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.dummyContractAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function bigIntToValue(x) {
  const ret = wasm.bigIntToValue(x);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function maxField() {
  const ret = wasm.maxField();
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function sampleContractAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.sampleContractAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function persistentHash(align, val) {
  const ret = wasm.persistentHash(align, val);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function valueToBigInt(x) {
  const ret = wasm.valueToBigInt(x);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeContractAddress(addr) {
  const ptr0 = passStringToWasm0(addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeContractAddress(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeCoinPublicKey(pk) {
  const ptr0 = passStringToWasm0(pk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeCoinPublicKey(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeShieldedCoinInfo(coin) {
  const ret = wasm.encodeShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeQualifiedShieldedCoinInfo(coin) {
  const ret = wasm.encodeQualifiedShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function _assertClass(instance2, klass) {
  if (!(instance2 instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function __wbg_adapter_14(arg0, arg1, arg2) {
  wasm.closure690_externref_shim(arg0, arg1, arg2);
}
function __wbg_adapter_258(arg0, arg1, arg2, arg3) {
  wasm.closure730_externref_shim(arg0, arg1, arg2, arg3);
}
var __wbindgen_enum_ReadableStreamType = ["bytes"];
var ChargedStateFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_chargedstate_free(ptr >>> 0, 1));
var ChargedState = class _ChargedState {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ChargedState.prototype);
    obj.__wbg_ptr = ptr;
    ChargedStateFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ChargedStateFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_chargedstate_free(ptr, 0);
  }
  /**
   * @param {StateValue} state
   */
  constructor(state) {
    _assertClass(state, StateValue);
    const ret = wasm.chargedstate_new(state.__wbg_ptr);
    this.__wbg_ptr = ret >>> 0;
    ChargedStateFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {StateValue}
   */
  get state() {
    const ret = wasm.chargedstate_state(this.__wbg_ptr);
    return StateValue.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.chargedstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ChargedState.prototype[Symbol.dispose] = ChargedState.prototype.free;
var ContractMaintenanceAuthorityFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractmaintenanceauthority_free(ptr >>> 0, 1));
var ContractMaintenanceAuthority = class _ContractMaintenanceAuthority {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractMaintenanceAuthority.prototype);
    obj.__wbg_ptr = ptr;
    ContractMaintenanceAuthorityFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractMaintenanceAuthorityFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractmaintenanceauthority_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractMaintenanceAuthority}
   */
  static deserialize(raw) {
    const ret = wasm.contractmaintenanceauthority_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractMaintenanceAuthority.__wrap(ret[0]);
  }
  /**
   * @param {Array<any>} committee
   * @param {number} threshold
   * @param {bigint | null} [counter]
   */
  constructor(committee, threshold, counter) {
    const ret = wasm.contractmaintenanceauthority_new(committee, threshold, isLikeNone(counter) ? 0 : addToExternrefTable0(counter));
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    ContractMaintenanceAuthorityFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {bigint}
   */
  get counter() {
    const ret = wasm.contractmaintenanceauthority_counter(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {Array<any>}
   */
  get committee() {
    const ret = wasm.contractmaintenanceauthority_committee(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractmaintenanceauthority_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {number}
   */
  get threshold() {
    const ret = wasm.contractmaintenanceauthority_threshold(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractmaintenanceauthority_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractMaintenanceAuthority.prototype[Symbol.dispose] = ContractMaintenanceAuthority.prototype.free;
var ContractOperationFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractoperation_free(ptr >>> 0, 1));
var ContractOperation = class _ContractOperation {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractOperation.prototype);
    obj.__wbg_ptr = ptr;
    ContractOperationFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractOperationFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractoperation_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractOperation}
   */
  static deserialize(raw) {
    const ret = wasm.contractoperation_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractOperation.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  get verifierKey() {
    const ret = wasm.contractoperation_verifier_key(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {Uint8Array} key
   */
  set verifierKey(key) {
    const ret = wasm.contractoperation_set_verifier_key(this.__wbg_ptr, key);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  constructor() {
    const ret = wasm.contractoperation_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    ContractOperationFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractoperation_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractoperation_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractOperation.prototype[Symbol.dispose] = ContractOperation.prototype.free;
var ContractStateFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractstate_free(ptr >>> 0, 1));
var ContractState = class _ContractState {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractState.prototype);
    obj.__wbg_ptr = ptr;
    ContractStateFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractStateFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractstate_free(ptr, 0);
  }
  /**
   * @returns {any[]}
   */
  operations() {
    const ret = wasm.contractstate_operations(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractState}
   */
  static deserialize(raw) {
    const ret = wasm.contractstate_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractState.__wrap(ret[0]);
  }
  /**
   * @param {Map<any, any>} value_map
   */
  set balance(value_map) {
    const ret = wasm.contractstate_set_balance(this.__wbg_ptr, value_map);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {any} operation
   * @param {ContractOperation} value
   */
  setOperation(operation, value) {
    _assertClass(value, ContractOperation);
    const ret = wasm.contractstate_setOperation(this.__wbg_ptr, operation, value.__wbg_ptr);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @returns {ContractMaintenanceAuthority}
   */
  get maintenanceAuthority() {
    const ret = wasm.contractstate_maintenance_authority(this.__wbg_ptr);
    return ContractMaintenanceAuthority.__wrap(ret);
  }
  /**
   * @param {ContractMaintenanceAuthority} authority
   */
  set maintenanceAuthority(authority) {
    _assertClass(authority, ContractMaintenanceAuthority);
    wasm.contractstate_set_maintenance_authority(this.__wbg_ptr, authority.__wbg_ptr);
  }
  constructor() {
    const ret = wasm.contractstate_new();
    this.__wbg_ptr = ret >>> 0;
    ContractStateFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {ChargedState}
   */
  get data() {
    const ret = wasm.contractstate_data(this.__wbg_ptr);
    return ChargedState.__wrap(ret);
  }
  /**
   * @param {any} query
   * @param {CostModel} cost_model
   * @returns {any}
   */
  query(query, cost_model) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.contractstate_query(this.__wbg_ptr, query, cost_model.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {Map<any, any>}
   */
  get balance() {
    const ret = wasm.contractstate_balance(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {ChargedState} data
   */
  set data(data) {
    _assertClass(data, ChargedState);
    wasm.contractstate_set_data(this.__wbg_ptr, data.__wbg_ptr);
  }
  /**
   * @param {any} operation
   * @returns {ContractOperation | undefined}
   */
  operation(operation) {
    const ret = wasm.contractstate_operation(this.__wbg_ptr, operation);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : ContractOperation.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractstate_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractState.prototype[Symbol.dispose] = ContractState.prototype.free;
var CostModelFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_costmodel_free(ptr >>> 0, 1));
var CostModel = class _CostModel {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CostModel.prototype);
    obj.__wbg_ptr = ptr;
    CostModelFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CostModelFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_costmodel_free(ptr, 0);
  }
  /**
   * @returns {CostModel}
   */
  static initialCostModel() {
    const ret = wasm.costmodel_initialCostModel();
    return _CostModel.__wrap(ret);
  }
  constructor() {
    const ret = wasm.costmodel_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    CostModelFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.costmodel_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) CostModel.prototype[Symbol.dispose] = CostModel.prototype.free;
var IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
var IntoUnderlyingByteSource = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
    return __wbindgen_enum_ReadableStreamType[ret];
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
};
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
var IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
var IntoUnderlyingSink = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, reason);
    return ret;
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return ret;
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
    return ret;
  }
};
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
var IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
var IntoUnderlyingSource = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
};
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
var QueryContextFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_querycontext_free(ptr >>> 0, 1));
var QueryContext = class _QueryContext {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_QueryContext.prototype);
    obj.__wbg_ptr = ptr;
    QueryContextFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryContextFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querycontext_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get comIndices() {
    const ret = wasm.querycontext_com_indices(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} effects
   */
  set effects(effects) {
    const ret = wasm.querycontext_set_effects(this.__wbg_ptr, effects);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @returns {VmStack}
   */
  toVmStack() {
    const ret = wasm.querycontext_toVmStack(this.__wbg_ptr);
    return VmStack.__wrap(ret);
  }
  /**
   * @param {any} transcript
   * @param {CostModel} cost_model
   * @returns {QueryContext}
   */
  runTranscript(transcript, cost_model) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.querycontext_runTranscript(this.__wbg_ptr, transcript, cost_model.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _QueryContext.__wrap(ret[0]);
  }
  /**
   * @param {string} comm
   * @param {bigint} index
   * @returns {QueryContext}
   */
  insertCommitment(comm, index) {
    const ptr0 = passStringToWasm0(comm, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.querycontext_insertCommitment(this.__wbg_ptr, ptr0, len0, index);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _QueryContext.__wrap(ret[0]);
  }
  /**
   * @param {ChargedState} state
   * @param {string} address
   */
  constructor(state, address) {
    _assertClass(state, ChargedState);
    const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.querycontext_new(state.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    QueryContextFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  get block() {
    const ret = wasm.querycontext_block(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} ops
   * @param {CostModel} cost_model
   * @param {any} gas_limit
   * @returns {QueryResults}
   */
  query(ops, cost_model, gas_limit) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.querycontext_query(this.__wbg_ptr, ops, cost_model.__wbg_ptr, gas_limit);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return QueryResults.__wrap(ret[0]);
  }
  /**
   * @returns {ChargedState}
   */
  get state() {
    const ret = wasm.querycontext_state(this.__wbg_ptr);
    return ChargedState.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  get address() {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.querycontext_address(this.__wbg_ptr);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get effects() {
    const ret = wasm.querycontext_effects(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} coin
   * @returns {any}
   */
  qualify(coin) {
    const ret = wasm.querycontext_qualify(this.__wbg_ptr, coin);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} block
   */
  set block(block) {
    const ret = wasm.querycontext_set_block(this.__wbg_ptr, block);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.querycontext_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) QueryContext.prototype[Symbol.dispose] = QueryContext.prototype.free;
var QueryResultsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_queryresults_free(ptr >>> 0, 1));
var QueryResults = class _QueryResults {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_QueryResults.prototype);
    obj.__wbg_ptr = ptr;
    QueryResultsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryResultsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_queryresults_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.queryresults_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    QueryResultsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  get events() {
    const ret = wasm.queryresults_events(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {QueryContext}
   */
  get context() {
    const ret = wasm.queryresults_context(this.__wbg_ptr);
    return QueryContext.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  get gasCost() {
    const ret = wasm.queryresults_gas_cost(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.queryresults_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) QueryResults.prototype[Symbol.dispose] = QueryResults.prototype.free;
var StateBoundedMerkleTreeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_stateboundedmerkletree_free(ptr >>> 0, 1));
var StateBoundedMerkleTree = class _StateBoundedMerkleTree {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateBoundedMerkleTree.prototype);
    obj.__wbg_ptr = ptr;
    StateBoundedMerkleTreeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateBoundedMerkleTreeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_stateboundedmerkletree_free(ptr, 0);
  }
  /**
   * @param {bigint} index
   * @param {any} leaf
   * @returns {any}
   */
  pathForLeaf(index, leaf) {
    const ret = wasm.stateboundedmerkletree_pathForLeaf(this.__wbg_ptr, index, leaf);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} leaf
   * @returns {any}
   */
  findPathForLeaf(leaf) {
    const ret = wasm.stateboundedmerkletree_findPathForLeaf(this.__wbg_ptr, leaf);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  root() {
    const ret = wasm.stateboundedmerkletree_root(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {number} height
   */
  constructor(height) {
    const ret = wasm.stateboundedmerkletree_blank(height);
    this.__wbg_ptr = ret >>> 0;
    StateBoundedMerkleTreeFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {number}
   */
  get height() {
    const ret = wasm.stateboundedmerkletree_height(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {StateBoundedMerkleTree}
   */
  rehash() {
    const ret = wasm.stateboundedmerkletree_rehash(this.__wbg_ptr);
    return _StateBoundedMerkleTree.__wrap(ret);
  }
  /**
   * @param {bigint} index
   * @param {any} leaf
   * @returns {StateBoundedMerkleTree}
   */
  update(index, leaf) {
    const ret = wasm.stateboundedmerkletree_update(this.__wbg_ptr, index, leaf);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateBoundedMerkleTree.__wrap(ret[0]);
  }
  /**
   * @param {bigint} start
   * @param {bigint} end
   * @returns {StateBoundedMerkleTree}
   */
  collapse(start, end) {
    const ret = wasm.stateboundedmerkletree_collapse(this.__wbg_ptr, start, end);
    return _StateBoundedMerkleTree.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.stateboundedmerkletree_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateBoundedMerkleTree.prototype[Symbol.dispose] = StateBoundedMerkleTree.prototype.free;
var StateMapFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_statemap_free(ptr >>> 0, 1));
var StateMap = class _StateMap {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateMap.prototype);
    obj.__wbg_ptr = ptr;
    StateMapFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateMapFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_statemap_free(ptr, 0);
  }
  /**
   * @param {any} key
   * @returns {StateValue | undefined}
   */
  get(key) {
    const ret = wasm.statemap_get(this.__wbg_ptr, key);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateValue.__wrap(ret[0]);
  }
  constructor() {
    const ret = wasm.statemap_new();
    this.__wbg_ptr = ret >>> 0;
    StateMapFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any[]}
   */
  keys() {
    const ret = wasm.statemap_keys(this.__wbg_ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {any} key
   * @param {StateValue} value
   * @returns {StateMap}
   */
  insert(key, value) {
    _assertClass(value, StateValue);
    const ret = wasm.statemap_insert(this.__wbg_ptr, key, value.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateMap.__wrap(ret[0]);
  }
  /**
   * @param {any} key
   * @returns {StateMap}
   */
  remove(key) {
    const ret = wasm.statemap_remove(this.__wbg_ptr, key);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateMap.__wrap(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statemap_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateMap.prototype[Symbol.dispose] = StateMap.prototype.free;
var StateValueFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_statevalue_free(ptr >>> 0, 1));
var StateValue = class _StateValue {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateValue.prototype);
    obj.__wbg_ptr = ptr;
    StateValueFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateValueFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_statevalue_free(ptr, 0);
  }
  /**
   * @param {StateValue} value
   * @returns {StateValue}
   */
  arrayPush(value) {
    _assertClass(value, _StateValue);
    const ret = wasm.statevalue_arrayPush(this.__wbg_ptr, value.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {StateBoundedMerkleTree | undefined}
   */
  asBoundedMerkleTree() {
    const ret = wasm.statevalue_asBoundedMerkleTree(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateBoundedMerkleTree.__wrap(ret[0]);
  }
  /**
   * @param {StateBoundedMerkleTree} tree
   * @returns {StateValue}
   */
  static newBoundedMerkleTree(tree) {
    _assertClass(tree, StateBoundedMerkleTree);
    const ret = wasm.statevalue_newBoundedMerkleTree(tree.__wbg_ptr);
    return _StateValue.__wrap(ret);
  }
  constructor() {
    const ret = wasm.statevalue_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    StateValueFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string}
   */
  type() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statevalue_type(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {StateMap | undefined}
   */
  asMap() {
    const ret = wasm.statevalue_asMap(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateMap.__wrap(ret[0]);
  }
  /**
   * @param {any} value
   * @returns {StateValue}
   */
  static decode(value) {
    const ret = wasm.statevalue_decode(value);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  encode() {
    const ret = wasm.statevalue_encode(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  asCell() {
    const ret = wasm.statevalue_asCell(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {StateMap} map
   * @returns {StateValue}
   */
  static newMap(map) {
    _assertClass(map, StateMap);
    const ret = wasm.statevalue_newMap(map.__wbg_ptr);
    return _StateValue.__wrap(ret);
  }
  /**
   * @returns {any[] | undefined}
   */
  asArray() {
    const ret = wasm.statevalue_asArray(this.__wbg_ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    let v1;
    if (ret[0] !== 0) {
      v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
      wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    }
    return v1;
  }
  /**
   * @returns {number}
   */
  logSize() {
    const ret = wasm.statevalue_logSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {any} value
   * @returns {StateValue}
   */
  static newCell(value) {
    const ret = wasm.statevalue_newCell(value);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {StateValue}
   */
  static newNull() {
    const ret = wasm.statevalue_newNull();
    return _StateValue.__wrap(ret);
  }
  /**
   * @returns {StateValue}
   */
  static newArray() {
    const ret = wasm.statevalue_newArray();
    return _StateValue.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statevalue_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateValue.prototype[Symbol.dispose] = StateValue.prototype.free;
var VmResultsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_vmresults_free(ptr >>> 0, 1));
var VmResults = class _VmResults {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_VmResults.prototype);
    obj.__wbg_ptr = ptr;
    VmResultsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    VmResultsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_vmresults_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.vmresults_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {VmStack}
   */
  get stack() {
    const ret = wasm.vmresults_stack(this.__wbg_ptr);
    return VmStack.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  get events() {
    const ret = wasm.vmresults_events(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  get gasCost() {
    const ret = wasm.vmresults_gas_cost(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.vmresults_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) VmResults.prototype[Symbol.dispose] = VmResults.prototype.free;
var VmStackFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_vmstack_free(ptr >>> 0, 1));
var VmStack = class _VmStack {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_VmStack.prototype);
    obj.__wbg_ptr = ptr;
    VmStackFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    VmStackFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_vmstack_free(ptr, 0);
  }
  removeLast() {
    wasm.vmstack_removeLast(this.__wbg_ptr);
  }
  /**
   * @param {number} idx
   * @returns {StateValue | undefined}
   */
  get(idx) {
    const ret = wasm.vmstack_get(this.__wbg_ptr, idx);
    return ret === 0 ? void 0 : StateValue.__wrap(ret);
  }
  constructor() {
    const ret = wasm.vmstack_new();
    this.__wbg_ptr = ret >>> 0;
    VmStackFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {StateValue} value
   * @param {boolean} is_strong
   */
  push(value, is_strong) {
    _assertClass(value, StateValue);
    wasm.vmstack_push(this.__wbg_ptr, value.__wbg_ptr, is_strong);
  }
  /**
   * @returns {number}
   */
  length() {
    const ret = wasm.vmstack_length(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} idx
   * @returns {boolean | undefined}
   */
  isStrong(idx) {
    const ret = wasm.vmstack_isStrong(this.__wbg_ptr, idx);
    return ret === 16777215 ? void 0 : ret !== 0;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.vmstack_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) VmStack.prototype[Symbol.dispose] = VmStack.prototype.free;
function __wbg_BigInt_40a77d45cca49470() {
  return handleError(function(arg0) {
    const ret = BigInt(arg0);
    return ret;
  }, arguments);
}
function __wbg_BigInt_6adbfd8eb0f7ec07(arg0) {
  const ret = BigInt(arg0);
  return ret;
}
function __wbg_Error_e17e777aac105295(arg0, arg1) {
  const ret = Error(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_Number_998bea33bd87c3e0(arg0) {
  const ret = Number(arg0);
  return ret;
}
function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
  const ret = String(arg1);
  const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_buffer_8d40b1d762fb3c66(arg0) {
  const ret = arg0.buffer;
  return ret;
}
function __wbg_byobRequest_2c036bceca1e6037(arg0) {
  const ret = arg0.byobRequest;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_byteLength_331a6b5545834024(arg0) {
  const ret = arg0.byteLength;
  return ret;
}
function __wbg_byteOffset_49a5b5608000358b(arg0) {
  const ret = arg0.byteOffset;
  return ret;
}
function __wbg_call_13410aac570ffff7() {
  return handleError(function(arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
  }, arguments);
}
function __wbg_call_a5400b25a865cfd8() {
  return handleError(function(arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
  }, arguments);
}
function __wbg_close_cccada6053ee3a65() {
  return handleError(function(arg0) {
    arg0.close();
  }, arguments);
}
function __wbg_close_d71a78219dc23e91() {
  return handleError(function(arg0) {
    arg0.close();
  }, arguments);
}
function __wbg_contractstate_new(arg0) {
  const ret = ContractState.__wrap(arg0);
  return ret;
}
function __wbg_crypto_86f2631e91b51511(arg0) {
  const ret = arg0.crypto;
  return ret;
}
function __wbg_done_75ed0ee6dd243d9d(arg0) {
  const ret = arg0.done;
  return ret;
}
function __wbg_enqueue_452bc2343d1c2ff9() {
  return handleError(function(arg0, arg1) {
    arg0.enqueue(arg1);
  }, arguments);
}
function __wbg_entries_2be2f15bd5554996(arg0) {
  const ret = Object.entries(arg0);
  return ret;
}
function __wbg_from_88bc52ce20ba6318(arg0) {
  const ret = Array.from(arg0);
  return ret;
}
function __wbg_getRandomValues_b3f15fcbfabb0f8b() {
  return handleError(function(arg0, arg1) {
    arg0.getRandomValues(arg1);
  }, arguments);
}
function __wbg_get_0da715ceaecea5c8(arg0, arg1) {
  const ret = arg0[arg1 >>> 0];
  return ret;
}
function __wbg_get_458e874b43b18b25() {
  return handleError(function(arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
  }, arguments);
}
function __wbg_get_5ee3191755594360(arg0, arg1) {
  const ret = arg0.get(arg1);
  return ret;
}
function __wbg_getwithrefkey_1dc361bd10053bfe(arg0, arg1) {
  const ret = arg0[arg1];
  return ret;
}
function __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd(arg0) {
  let result;
  try {
    result = arg0 instanceof ArrayBuffer;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_instanceof_Map_ebb01a5b6b5ffd0b(arg0) {
  let result;
  try {
    result = arg0 instanceof Map;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_instanceof_Uint8Array_9a8378d955933db7(arg0) {
  let result;
  try {
    result = arg0 instanceof Uint8Array;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_isArray_030cce220591fb41(arg0) {
  const ret = Array.isArray(arg0);
  return ret;
}
function __wbg_isSafeInteger_1c0d1af5542e102a(arg0) {
  const ret = Number.isSafeInteger(arg0);
  return ret;
}
function __wbg_iterator_f370b34483c71a1c() {
  const ret = Symbol.iterator;
  return ret;
}
function __wbg_keys_822161a7faf55538(arg0) {
  const ret = arg0.keys();
  return ret;
}
function __wbg_length_186546c51cd61acd(arg0) {
  const ret = arg0.length;
  return ret;
}
function __wbg_length_6bb7e81f9d7713e4(arg0) {
  const ret = arg0.length;
  return ret;
}
function __wbg_msCrypto_d562bbe83e0d4b91(arg0) {
  const ret = arg0.msCrypto;
  return ret;
}
function __wbg_new_19c25a3f2fa63a02() {
  const ret = new Object();
  return ret;
}
function __wbg_new_1f3a344cf3123716() {
  const ret = new Array();
  return ret;
}
function __wbg_new_2e3c58a15f39f5f9(arg0, arg1) {
  try {
    var state0 = { a: arg0, b: arg1 };
    var cb0 = (arg02, arg12) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_258(a, state0.b, arg02, arg12);
      } finally {
        state0.a = a;
      }
    };
    const ret = new Promise(cb0);
    return ret;
  } finally {
    state0.a = state0.b = 0;
  }
}
function __wbg_new_2ff1f68f3676ea53() {
  const ret = /* @__PURE__ */ new Map();
  return ret;
}
function __wbg_new_638ebfaedbf32a5e(arg0) {
  const ret = new Uint8Array(arg0);
  return ret;
}
function __wbg_new_da9dc54c5db29dfa(arg0, arg1) {
  const ret = new Error(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newfromslice_074c56947bd43469(arg0, arg1) {
  const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newnoargs_254190557c45b4ec(arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45(arg0, arg1, arg2) {
  const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
  return ret;
}
function __wbg_newwithlength_a167dcc7aaa3ba77(arg0) {
  const ret = new Uint8Array(arg0 >>> 0);
  return ret;
}
function __wbg_next_5b3530e612fde77d(arg0) {
  const ret = arg0.next;
  return ret;
}
function __wbg_next_692e82279131b03c() {
  return handleError(function(arg0) {
    const ret = arg0.next();
    return ret;
  }, arguments);
}
function __wbg_node_e1f24f89a7336c2e(arg0) {
  const ret = arg0.node;
  return ret;
}
function __wbg_process_3975fd6c72f520aa(arg0) {
  const ret = arg0.process;
  return ret;
}
function __wbg_prototypesetcall_3d4a26c1ed734349(arg0, arg1, arg2) {
  Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
}
function __wbg_push_330b2eb93e4e1212(arg0, arg1) {
  const ret = arg0.push(arg1);
  return ret;
}
function __wbg_queueMicrotask_25d0739ac89e8c88(arg0) {
  queueMicrotask(arg0);
}
function __wbg_queueMicrotask_4488407636f5bf24(arg0) {
  const ret = arg0.queueMicrotask;
  return ret;
}
function __wbg_randomFillSync_f8c153b79f285817() {
  return handleError(function(arg0, arg1) {
    arg0.randomFillSync(arg1);
  }, arguments);
}
function __wbg_require_b74f47fc2d022fd6() {
  return handleError(function() {
    const ret = module.require;
    return ret;
  }, arguments);
}
function __wbg_resolve_4055c623acdd6a1b(arg0) {
  const ret = Promise.resolve(arg0);
  return ret;
}
function __wbg_respond_6c2c4e20ef85138e() {
  return handleError(function(arg0, arg1) {
    arg0.respond(arg1 >>> 0);
  }, arguments);
}
function __wbg_set_1353b2a5e96bc48c(arg0, arg1, arg2) {
  arg0.set(getArrayU8FromWasm0(arg1, arg2));
}
function __wbg_set_3f1d0b984ed272ed(arg0, arg1, arg2) {
  arg0[arg1] = arg2;
}
function __wbg_set_90f6c0f7bd8c0415(arg0, arg1, arg2) {
  arg0[arg1 >>> 0] = arg2;
}
function __wbg_set_b7f1cf4fae26fe2a(arg0, arg1, arg2) {
  const ret = arg0.set(arg1, arg2);
  return ret;
}
function __wbg_statevalue_new(arg0) {
  const ret = StateValue.__wrap(arg0);
  return ret;
}
function __wbg_static_accessor_GLOBAL_8921f820c2ce3f12() {
  const ret = typeof global === "undefined" ? null : global;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184() {
  const ret = typeof globalThis === "undefined" ? null : globalThis;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_SELF_995b214ae681ff99() {
  const ret = typeof self === "undefined" ? null : self;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_WINDOW_cde3890479c675ea() {
  const ret = typeof window === "undefined" ? null : window;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_subarray_70fd07feefe14294(arg0, arg1, arg2) {
  const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
  return ret;
}
function __wbg_then_e22500defe16819f(arg0, arg1) {
  const ret = arg0.then(arg1);
  return ret;
}
function __wbg_toString_7268338f40012a03() {
  return handleError(function(arg0, arg1) {
    const ret = arg0.toString(arg1);
    return ret;
  }, arguments);
}
function __wbg_toString_d8f537919ef401d6(arg0) {
  const ret = arg0.toString();
  return ret;
}
function __wbg_value_dd9372230531eade(arg0) {
  const ret = arg0.value;
  return ret;
}
function __wbg_versions_4e31226f5e8dc909(arg0) {
  const ret = arg0.versions;
  return ret;
}
function __wbg_view_91cc97d57ab30530(arg0) {
  const ret = arg0.view;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1(arg0, arg1) {
  const v = arg1;
  const ret = typeof v === "bigint" ? v : void 0;
  getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
function __wbg_wbindgenbooleanget_3fe6f642c7d97746(arg0) {
  const v = arg0;
  const ret = typeof v === "boolean" ? v : void 0;
  return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
}
function __wbg_wbindgencbdrop_eb10308566512b88(arg0) {
  const obj = arg0.original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  const ret = false;
  return ret;
}
function __wbg_wbindgendebugstring_99ef257a3ddda34d(arg0, arg1) {
  const ret = debugString(arg1);
  const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_wbindgenin_d7a1ee10933d2d55(arg0, arg1) {
  const ret = arg0 in arg1;
  return ret;
}
function __wbg_wbindgenisbigint_ecb90cc08a5a9154(arg0) {
  const ret = typeof arg0 === "bigint";
  return ret;
}
function __wbg_wbindgenisfunction_8cee7dce3725ae74(arg0) {
  const ret = typeof arg0 === "function";
  return ret;
}
function __wbg_wbindgenisnull_f3037694abe4d97a(arg0) {
  const ret = arg0 === null;
  return ret;
}
function __wbg_wbindgenisobject_307a53c6bd97fbf8(arg0) {
  const val = arg0;
  const ret = typeof val === "object" && val !== null;
  return ret;
}
function __wbg_wbindgenisstring_d4fa939789f003b0(arg0) {
  const ret = typeof arg0 === "string";
  return ret;
}
function __wbg_wbindgenisundefined_c4b71d073b92f3c5(arg0) {
  const ret = arg0 === void 0;
  return ret;
}
function __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58(arg0, arg1) {
  const ret = arg0 === arg1;
  return ret;
}
function __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1(arg0, arg1) {
  const ret = arg0 == arg1;
  return ret;
}
function __wbg_wbindgennumberget_f74b4c7525ac05cb(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "number" ? obj : void 0;
  getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
function __wbg_wbindgenshr_7d2aae6044c0dab1(arg0, arg1) {
  const ret = arg0 >> arg1;
  return ret;
}
function __wbg_wbindgenstringget_0f16a6ddddef376f(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "string" ? obj : void 0;
  var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_wbindgenthrow_451ec1a8469d7eb6(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
function __wbindgen_cast_2241b6af4c4b2941(arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return ret;
}
function __wbindgen_cast_4625c577ab2ec9ee(arg0) {
  const ret = BigInt.asUintN(64, arg0);
  return ret;
}
function __wbindgen_cast_9ae0607507abb057(arg0) {
  const ret = arg0;
  return ret;
}
function __wbindgen_cast_9f23747c70687cbf(arg0, arg1) {
  const ret = makeMutClosure(arg0, arg1, 689, __wbg_adapter_14);
  return ret;
}
function __wbindgen_cast_cb9088102bce6b30(arg0, arg1) {
  const ret = getArrayU8FromWasm0(arg0, arg1);
  return ret;
}
function __wbindgen_cast_d6cd19b81560fd6e(arg0) {
  const ret = arg0;
  return ret;
}
function __wbindgen_cast_e7b45dd881f38ce3(arg0, arg1) {
  const ret = BigInt.asUintN(64, arg0) | BigInt.asUintN(64, arg1) << BigInt(64);
  return ret;
}
function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_2;
  const offset = table.grow(4);
  table.set(0, void 0);
  table.set(offset + 0, void 0);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
  ;
}

// wasm-module:/Users/david/repos/dex-arb-starter/challenges/midnight-secret-pond/node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm
var imports = {
  ["./midnight_onchain_runtime_wasm_bg.js"]: {
    __wbg_statevalue_new,
    __wbg_contractstate_new,
    __wbg_getwithrefkey_1dc361bd10053bfe,
    __wbg_set_3f1d0b984ed272ed,
    __wbg_String_8f0eb39a4a4c2f66,
    __wbg_queueMicrotask_25d0739ac89e8c88,
    __wbg_queueMicrotask_4488407636f5bf24,
    __wbg_respond_6c2c4e20ef85138e,
    __wbg_view_91cc97d57ab30530,
    __wbg_byobRequest_2c036bceca1e6037,
    __wbg_close_cccada6053ee3a65,
    __wbg_enqueue_452bc2343d1c2ff9,
    __wbg_close_d71a78219dc23e91,
    __wbg_crypto_86f2631e91b51511,
    __wbg_process_3975fd6c72f520aa,
    __wbg_versions_4e31226f5e8dc909,
    __wbg_node_e1f24f89a7336c2e,
    __wbg_require_b74f47fc2d022fd6,
    __wbg_msCrypto_d562bbe83e0d4b91,
    __wbg_getRandomValues_b3f15fcbfabb0f8b,
    __wbg_randomFillSync_f8c153b79f285817,
    __wbg_byteLength_331a6b5545834024,
    __wbg_byteOffset_49a5b5608000358b,
    __wbg_newfromslice_074c56947bd43469,
    __wbg_newwithlength_a167dcc7aaa3ba77,
    __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45,
    __wbg_new_638ebfaedbf32a5e,
    __wbg_buffer_8d40b1d762fb3c66,
    __wbg_length_6bb7e81f9d7713e4,
    __wbg_prototypesetcall_3d4a26c1ed734349,
    __wbg_subarray_70fd07feefe14294,
    __wbg_set_1353b2a5e96bc48c,
    __wbg_BigInt_40a77d45cca49470,
    __wbg_done_75ed0ee6dd243d9d,
    __wbg_value_dd9372230531eade,
    __wbg_instanceof_Map_ebb01a5b6b5ffd0b,
    __wbg_instanceof_Uint8Array_9a8378d955933db7,
    __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd,
    __wbg_BigInt_6adbfd8eb0f7ec07,
    __wbg_get_5ee3191755594360,
    __wbg_new_2ff1f68f3676ea53,
    __wbg_set_b7f1cf4fae26fe2a,
    __wbg_keys_822161a7faf55538,
    __wbg_get_0da715ceaecea5c8,
    __wbg_new_1f3a344cf3123716,
    __wbg_set_90f6c0f7bd8c0415,
    __wbg_from_88bc52ce20ba6318,
    __wbg_push_330b2eb93e4e1212,
    __wbg_length_186546c51cd61acd,
    __wbg_isArray_030cce220591fb41,
    __wbg_new_da9dc54c5db29dfa,
    __wbg_toString_d8f537919ef401d6,
    __wbg_toString_7268338f40012a03,
    __wbg_isSafeInteger_1c0d1af5542e102a,
    __wbg_new_19c25a3f2fa63a02,
    __wbg_entries_2be2f15bd5554996,
    __wbg_iterator_f370b34483c71a1c,
    __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184,
    __wbg_static_accessor_SELF_995b214ae681ff99,
    __wbg_static_accessor_GLOBAL_8921f820c2ce3f12,
    __wbg_static_accessor_WINDOW_cde3890479c675ea,
    __wbg_new_2e3c58a15f39f5f9,
    __wbg_then_e22500defe16819f,
    __wbg_resolve_4055c623acdd6a1b,
    __wbg_get_458e874b43b18b25,
    __wbg_newnoargs_254190557c45b4ec,
    __wbg_call_13410aac570ffff7,
    __wbg_call_a5400b25a865cfd8,
    __wbg_next_5b3530e612fde77d,
    __wbg_next_692e82279131b03c,
    __wbg_wbindgenin_d7a1ee10933d2d55,
    __wbg_wbindgenshr_7d2aae6044c0dab1,
    __wbg_wbindgenthrow_451ec1a8469d7eb6,
    __wbg_wbindgencbdrop_eb10308566512b88,
    __wbg_wbindgenisnull_f3037694abe4d97a,
    __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58,
    __wbg_Number_998bea33bd87c3e0,
    __wbg_Error_e17e777aac105295,
    __wbg_wbindgenisbigint_ecb90cc08a5a9154,
    __wbg_wbindgenisobject_307a53c6bd97fbf8,
    __wbg_wbindgenisstring_d4fa939789f003b0,
    __wbg_wbindgennumberget_f74b4c7525ac05cb,
    __wbg_wbindgenstringget_0f16a6ddddef376f,
    __wbg_wbindgenbooleanget_3fe6f642c7d97746,
    __wbg_wbindgenisfunction_8cee7dce3725ae74,
    __wbg_wbindgenisundefined_c4b71d073b92f3c5,
    __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1,
    __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1,
    __wbg_wbindgendebugstring_99ef257a3ddda34d,
    __wbindgen_init_externref_table,
    __wbindgen_cast_e7b45dd881f38ce3,
    __wbindgen_cast_2241b6af4c4b2941,
    __wbindgen_cast_9ae0607507abb057,
    __wbindgen_cast_4625c577ab2ec9ee,
    __wbindgen_cast_9f23747c70687cbf,
    __wbindgen_cast_cb9088102bce6b30,
    __wbindgen_cast_d6cd19b81560fd6e
  }
};
async function loadWasm(module3, imports2) {
  if (typeof module3 === "string") {
    if (module3.startsWith("./")) {
      module3 = new URL(module3, import.meta.url).href;
    }
    const moduleRequest = await fetch(module3);
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(moduleRequest, imports2);
      } catch (e) {
        if (moduleRequest.headers.get("Content-Type") != "application/wasm") {
          console.warn(e);
        } else {
          throw e;
        }
      }
    }
    module3 = await moduleRequest.arrayBuffer();
  }
  return await WebAssembly.instantiate(module3, imports2);
}
var { instance, module: module2 } = await loadWasm(midnight_onchain_runtime_wasm_bg_default, imports);
var memory = instance.exports.memory;
var __wbg_chargedstate_free = instance.exports.__wbg_chargedstate_free;
var __wbg_contractmaintenanceauthority_free = instance.exports.__wbg_contractmaintenanceauthority_free;
var __wbg_contractoperation_free = instance.exports.__wbg_contractoperation_free;
var __wbg_contractstate_free = instance.exports.__wbg_contractstate_free;
var __wbg_costmodel_free = instance.exports.__wbg_costmodel_free;
var __wbg_querycontext_free = instance.exports.__wbg_querycontext_free;
var __wbg_queryresults_free = instance.exports.__wbg_queryresults_free;
var __wbg_stateboundedmerkletree_free = instance.exports.__wbg_stateboundedmerkletree_free;
var __wbg_statemap_free = instance.exports.__wbg_statemap_free;
var __wbg_statevalue_free = instance.exports.__wbg_statevalue_free;
var __wbg_vmresults_free = instance.exports.__wbg_vmresults_free;
var __wbg_vmstack_free = instance.exports.__wbg_vmstack_free;
var bigIntModFr = instance.exports.bigIntModFr;
var bigIntToValue2 = instance.exports.bigIntToValue;
var chargedstate_new = instance.exports.chargedstate_new;
var chargedstate_state = instance.exports.chargedstate_state;
var chargedstate_toString = instance.exports.chargedstate_toString;
var communicationCommitment = instance.exports.communicationCommitment;
var communicationCommitmentRandomness = instance.exports.communicationCommitmentRandomness;
var contractmaintenanceauthority_committee = instance.exports.contractmaintenanceauthority_committee;
var contractmaintenanceauthority_counter = instance.exports.contractmaintenanceauthority_counter;
var contractmaintenanceauthority_deserialize = instance.exports.contractmaintenanceauthority_deserialize;
var contractmaintenanceauthority_new = instance.exports.contractmaintenanceauthority_new;
var contractmaintenanceauthority_serialize = instance.exports.contractmaintenanceauthority_serialize;
var contractmaintenanceauthority_threshold = instance.exports.contractmaintenanceauthority_threshold;
var contractmaintenanceauthority_toString = instance.exports.contractmaintenanceauthority_toString;
var contractoperation_deserialize = instance.exports.contractoperation_deserialize;
var contractoperation_new = instance.exports.contractoperation_new;
var contractoperation_serialize = instance.exports.contractoperation_serialize;
var contractoperation_set_verifier_key = instance.exports.contractoperation_set_verifier_key;
var contractoperation_toString = instance.exports.contractoperation_toString;
var contractoperation_verifier_key = instance.exports.contractoperation_verifier_key;
var contractstate_balance = instance.exports.contractstate_balance;
var contractstate_data = instance.exports.contractstate_data;
var contractstate_deserialize = instance.exports.contractstate_deserialize;
var contractstate_maintenance_authority = instance.exports.contractstate_maintenance_authority;
var contractstate_new = instance.exports.contractstate_new;
var contractstate_operation = instance.exports.contractstate_operation;
var contractstate_operations = instance.exports.contractstate_operations;
var contractstate_query = instance.exports.contractstate_query;
var contractstate_serialize = instance.exports.contractstate_serialize;
var contractstate_setOperation = instance.exports.contractstate_setOperation;
var contractstate_set_balance = instance.exports.contractstate_set_balance;
var contractstate_set_data = instance.exports.contractstate_set_data;
var contractstate_set_maintenance_authority = instance.exports.contractstate_set_maintenance_authority;
var contractstate_toString = instance.exports.contractstate_toString;
var costmodel_initialCostModel = instance.exports.costmodel_initialCostModel;
var costmodel_new = instance.exports.costmodel_new;
var costmodel_toString = instance.exports.costmodel_toString;
var decodeCoinPublicKey = instance.exports.decodeCoinPublicKey;
var decodeContractAddress = instance.exports.decodeContractAddress;
var decodeQualifiedShieldedCoinInfo = instance.exports.decodeQualifiedShieldedCoinInfo;
var decodeRawTokenType = instance.exports.decodeRawTokenType;
var decodeShieldedCoinInfo = instance.exports.decodeShieldedCoinInfo;
var decodeUserAddress = instance.exports.decodeUserAddress;
var degradeToTransient = instance.exports.degradeToTransient;
var dummyContractAddress2 = instance.exports.dummyContractAddress;
var dummyUserAddress = instance.exports.dummyUserAddress;
var ecAdd = instance.exports.ecAdd;
var ecMul = instance.exports.ecMul;
var ecMulGenerator = instance.exports.ecMulGenerator;
var encodeCoinPublicKey2 = instance.exports.encodeCoinPublicKey;
var encodeContractAddress2 = instance.exports.encodeContractAddress;
var encodeQualifiedShieldedCoinInfo2 = instance.exports.encodeQualifiedShieldedCoinInfo;
var encodeRawTokenType = instance.exports.encodeRawTokenType;
var encodeShieldedCoinInfo2 = instance.exports.encodeShieldedCoinInfo;
var encodeUserAddress = instance.exports.encodeUserAddress;
var entryPointHash = instance.exports.entryPointHash;
var hashToCurve = instance.exports.hashToCurve;
var leafHash = instance.exports.leafHash;
var maxAlignedSize = instance.exports.maxAlignedSize;
var maxField2 = instance.exports.maxField;
var persistentCommit = instance.exports.persistentCommit;
var persistentHash2 = instance.exports.persistentHash;
var proofDataIntoSerializedPreimage = instance.exports.proofDataIntoSerializedPreimage;
var querycontext_address = instance.exports.querycontext_address;
var querycontext_block = instance.exports.querycontext_block;
var querycontext_com_indices = instance.exports.querycontext_com_indices;
var querycontext_effects = instance.exports.querycontext_effects;
var querycontext_insertCommitment = instance.exports.querycontext_insertCommitment;
var querycontext_new = instance.exports.querycontext_new;
var querycontext_qualify = instance.exports.querycontext_qualify;
var querycontext_query = instance.exports.querycontext_query;
var querycontext_runTranscript = instance.exports.querycontext_runTranscript;
var querycontext_set_block = instance.exports.querycontext_set_block;
var querycontext_set_effects = instance.exports.querycontext_set_effects;
var querycontext_state = instance.exports.querycontext_state;
var querycontext_toString = instance.exports.querycontext_toString;
var querycontext_toVmStack = instance.exports.querycontext_toVmStack;
var queryresults_context = instance.exports.queryresults_context;
var queryresults_events = instance.exports.queryresults_events;
var queryresults_gas_cost = instance.exports.queryresults_gas_cost;
var queryresults_new = instance.exports.queryresults_new;
var queryresults_toString = instance.exports.queryresults_toString;
var rawTokenType = instance.exports.rawTokenType;
var runProgram = instance.exports.runProgram;
var runtimeCoinCommitment = instance.exports.runtimeCoinCommitment;
var runtimeCoinNullifier = instance.exports.runtimeCoinNullifier;
var sampleContractAddress2 = instance.exports.sampleContractAddress;
var sampleRawTokenType = instance.exports.sampleRawTokenType;
var sampleSigningKey = instance.exports.sampleSigningKey;
var sampleUserAddress = instance.exports.sampleUserAddress;
var signData = instance.exports.signData;
var signatureVerifyingKey = instance.exports.signatureVerifyingKey;
var signingKeyFromBip340 = instance.exports.signingKeyFromBip340;
var stateboundedmerkletree_blank = instance.exports.stateboundedmerkletree_blank;
var stateboundedmerkletree_collapse = instance.exports.stateboundedmerkletree_collapse;
var stateboundedmerkletree_findPathForLeaf = instance.exports.stateboundedmerkletree_findPathForLeaf;
var stateboundedmerkletree_height = instance.exports.stateboundedmerkletree_height;
var stateboundedmerkletree_pathForLeaf = instance.exports.stateboundedmerkletree_pathForLeaf;
var stateboundedmerkletree_rehash = instance.exports.stateboundedmerkletree_rehash;
var stateboundedmerkletree_root = instance.exports.stateboundedmerkletree_root;
var stateboundedmerkletree_toString = instance.exports.stateboundedmerkletree_toString;
var stateboundedmerkletree_update = instance.exports.stateboundedmerkletree_update;
var statemap_get = instance.exports.statemap_get;
var statemap_insert = instance.exports.statemap_insert;
var statemap_keys = instance.exports.statemap_keys;
var statemap_new = instance.exports.statemap_new;
var statemap_remove = instance.exports.statemap_remove;
var statemap_toString = instance.exports.statemap_toString;
var statevalue_arrayPush = instance.exports.statevalue_arrayPush;
var statevalue_asArray = instance.exports.statevalue_asArray;
var statevalue_asBoundedMerkleTree = instance.exports.statevalue_asBoundedMerkleTree;
var statevalue_asCell = instance.exports.statevalue_asCell;
var statevalue_asMap = instance.exports.statevalue_asMap;
var statevalue_decode = instance.exports.statevalue_decode;
var statevalue_encode = instance.exports.statevalue_encode;
var statevalue_logSize = instance.exports.statevalue_logSize;
var statevalue_new = instance.exports.statevalue_new;
var statevalue_newArray = instance.exports.statevalue_newArray;
var statevalue_newBoundedMerkleTree = instance.exports.statevalue_newBoundedMerkleTree;
var statevalue_newCell = instance.exports.statevalue_newCell;
var statevalue_newMap = instance.exports.statevalue_newMap;
var statevalue_newNull = instance.exports.statevalue_newNull;
var statevalue_toString = instance.exports.statevalue_toString;
var statevalue_type = instance.exports.statevalue_type;
var transientCommit = instance.exports.transientCommit;
var transientHash = instance.exports.transientHash;
var upgradeFromTransient = instance.exports.upgradeFromTransient;
var valueToBigInt2 = instance.exports.valueToBigInt;
var verifySignature = instance.exports.verifySignature;
var vmresults_events = instance.exports.vmresults_events;
var vmresults_gas_cost = instance.exports.vmresults_gas_cost;
var vmresults_new = instance.exports.vmresults_new;
var vmresults_stack = instance.exports.vmresults_stack;
var vmresults_toString = instance.exports.vmresults_toString;
var vmstack_get = instance.exports.vmstack_get;
var vmstack_isStrong = instance.exports.vmstack_isStrong;
var vmstack_length = instance.exports.vmstack_length;
var vmstack_new = instance.exports.vmstack_new;
var vmstack_push = instance.exports.vmstack_push;
var vmstack_removeLast = instance.exports.vmstack_removeLast;
var vmstack_toString = instance.exports.vmstack_toString;
var __wbg_intounderlyingbytesource_free = instance.exports.__wbg_intounderlyingbytesource_free;
var __wbg_intounderlyingsink_free = instance.exports.__wbg_intounderlyingsink_free;
var __wbg_intounderlyingsource_free = instance.exports.__wbg_intounderlyingsource_free;
var intounderlyingbytesource_autoAllocateChunkSize = instance.exports.intounderlyingbytesource_autoAllocateChunkSize;
var intounderlyingbytesource_cancel = instance.exports.intounderlyingbytesource_cancel;
var intounderlyingbytesource_pull = instance.exports.intounderlyingbytesource_pull;
var intounderlyingbytesource_start = instance.exports.intounderlyingbytesource_start;
var intounderlyingbytesource_type = instance.exports.intounderlyingbytesource_type;
var intounderlyingsink_abort = instance.exports.intounderlyingsink_abort;
var intounderlyingsink_close = instance.exports.intounderlyingsink_close;
var intounderlyingsink_write = instance.exports.intounderlyingsink_write;
var intounderlyingsource_cancel = instance.exports.intounderlyingsource_cancel;
var intounderlyingsource_pull = instance.exports.intounderlyingsource_pull;
var __wbindgen_exn_store = instance.exports.__wbindgen_exn_store;
var __externref_table_alloc = instance.exports.__externref_table_alloc;
var __wbindgen_export_2 = instance.exports.__wbindgen_export_2;
var __wbindgen_malloc = instance.exports.__wbindgen_malloc;
var __wbindgen_realloc = instance.exports.__wbindgen_realloc;
var __wbindgen_export_5 = instance.exports.__wbindgen_export_5;
var __externref_table_dealloc = instance.exports.__externref_table_dealloc;
var __wbindgen_free = instance.exports.__wbindgen_free;
var __externref_drop_slice = instance.exports.__externref_drop_slice;
var closure690_externref_shim = instance.exports.closure690_externref_shim;
var closure730_externref_shim = instance.exports.closure730_externref_shim;
var __wbindgen_start = instance.exports.__wbindgen_start;

// node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm.js
__wbg_set_wasm(midnight_onchain_runtime_wasm_bg_exports);
__wbindgen_start();

// node_modules/@midnight-ntwrk/compact-runtime/dist/constants.js
var MAX_FIELD = maxField();
var DUMMY_ADDRESS = dummyContractAddress();

// node_modules/@midnight-ntwrk/compact-runtime/dist/version.js
var versionString = "0.16.0";
var checkRuntimeVersion = (expectedRuntimeVersionString) => {
  const expectedRuntimeVersion = expectedRuntimeVersionString.split("-")[0].split(".").map(Number);
  const actualRuntimeVersion = versionString.split("-")[0].split(".").map(Number);
  if (expectedRuntimeVersion[0] !== actualRuntimeVersion[0] || actualRuntimeVersion[0] === 0 && expectedRuntimeVersion[1] !== actualRuntimeVersion[1] || expectedRuntimeVersion[1] > actualRuntimeVersion[1] || expectedRuntimeVersion[1] === actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]) {
    throw new CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${versionString}`);
  }
  const MAX_FIELD2 = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (MAX_FIELD2 !== MAX_FIELD) {
    throw new CompactError(`Maximum field mismatch: compiled code uses ${MAX_FIELD2}, runtime uses ${MAX_FIELD}`);
  }
};

// node_modules/@midnight-ntwrk/compact-runtime/dist/compact-types.js
var CompactTypeField = {
  alignment() {
    return [{ tag: "atom", value: { tag: "field" } }];
  },
  fromValue(value) {
    const val = value.shift();
    if (val == void 0) {
      throw new CompactError("expected Field");
    } else {
      return valueToBigInt([val]);
    }
  },
  toValue(value) {
    return bigIntToValue(value);
  }
};
var CompactTypeUnsignedInteger = class {
  maxValue;
  length;
  constructor(maxValue, length) {
    this.maxValue = maxValue;
    this.length = length;
  }
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: this.length } }];
  }
  fromValue(value) {
    const val = value.shift();
    if (val == void 0) {
      throw new CompactError(`expected UnsignedInteger[<=${this.maxValue}]`);
    } else {
      let res = 0n;
      for (let i = 0; i < val.length; i++) {
        res += (1n << 8n * BigInt(i)) * BigInt(val[i]);
      }
      if (res > this.maxValue) {
        throw new CompactError(`expected UnsignedInteger[<=${this.maxValue}]`);
      }
      return res;
    }
  }
  toValue(value) {
    return CompactTypeField.toValue(value);
  }
};
var CompactTypeVector = class {
  length;
  type;
  constructor(length, type) {
    this.length = length;
    this.type = type;
  }
  alignment() {
    const inner = this.type.alignment();
    let res = [];
    for (let i = 0; i < this.length; i++) {
      res = res.concat(inner);
    }
    return res;
  }
  fromValue(value) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      res.push(this.type.fromValue(value));
    }
    return res;
  }
  toValue(value) {
    if (value.length != this.length) {
      throw new CompactError(`expected ${this.length}-element array`);
    }
    let res = [];
    for (let i = 0; i < this.length; i++) {
      res = res.concat(this.type.toValue(value[i]));
    }
    return res;
  }
};
var CompactTypeBoolean = {
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: 1 } }];
  },
  fromValue(value) {
    const val = value.shift();
    if (val == void 0 || val.length > 1 || val.length == 1 && val[0] != 1) {
      throw new CompactError("expected Boolean");
    }
    return val.length == 1;
  },
  toValue(value) {
    if (value) {
      return [new Uint8Array([1])];
    } else {
      return [new Uint8Array(0)];
    }
  }
};
var CompactTypeBytes = class {
  length;
  constructor(length) {
    this.length = length;
  }
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: this.length } }];
  }
  fromValue(value) {
    const val = value.shift();
    if (val == void 0 || val.length > this.length) {
      throw new CompactError(`expected Bytes[${this.length}]`);
    }
    if (val.length == this.length) {
      return val;
    }
    const res = new Uint8Array(this.length);
    res.set(val, 0);
    return res;
  }
  toValue(value) {
    let end = value.length;
    while (end > 0 && value[end - 1] == 0) {
      end -= 1;
    }
    return [value.slice(0, end)];
  }
};
var Bytes32Descriptor = new CompactTypeBytes(32);
var MaxUint8Descriptor = new CompactTypeUnsignedInteger(18446744073709551615n, 8);

// node_modules/@midnight-ntwrk/compact-runtime/dist/built-ins.js
var FIELD_MODULUS = MAX_FIELD + 1n;
function persistentHash3(rtType, value) {
  const wrapped = persistentHash(rtType.alignment(), rtType.toValue(value))[0];
  const res = new Uint8Array(32);
  res.set(wrapped, 0);
  return res;
}

// node_modules/@midnight-ntwrk/compact-runtime/dist/casts.js
function convertFieldToBytes(n, x, src) {
  const x_0 = x;
  const a = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = Number(x & 0xffn);
    x = x / 0x100n;
    if (x == 0n)
      return a;
  }
  const msg = `range error at ${src}: Field or Uint value ${x_0} does not fit into ${n} bytes`;
  throw new CompactError(msg);
}

// node_modules/@midnight-ntwrk/compact-runtime/dist/zswap.js
var emptyZswapLocalState = (coinPublicKey) => ({
  coinPublicKey: typeof coinPublicKey === "string" ? { bytes: encodeCoinPublicKey(coinPublicKey) } : coinPublicKey,
  currentIndex: 0n,
  inputs: [],
  outputs: []
});
var encodeRecipient = ({ is_left, left, right }) => ({
  is_left,
  left: { bytes: encodeCoinPublicKey(left) },
  right: { bytes: encodeContractAddress(right) }
});
var encodeZswapLocalState = (state) => ({
  coinPublicKey: { bytes: encodeCoinPublicKey(state.coinPublicKey) },
  currentIndex: state.currentIndex,
  inputs: state.inputs.map(encodeQualifiedShieldedCoinInfo),
  outputs: state.outputs.map(({ coinInfo, recipient }) => ({
    coinInfo: encodeShieldedCoinInfo(coinInfo),
    recipient: encodeRecipient(recipient)
  }))
});

// node_modules/@midnight-ntwrk/compact-runtime/dist/constructor-context.js
var createConstructorContext = (initialPrivateState, coinPublicKey) => ({
  initialPrivateState,
  initialZswapLocalState: emptyZswapLocalState(coinPublicKey)
});

// node_modules/@midnight-ntwrk/compact-runtime/dist/circuit-context.js
var coerceToChargedState = (contractState) => {
  let state;
  if (contractState instanceof ChargedState) {
    state = contractState;
  } else if (contractState instanceof ContractState) {
    state = contractState.data;
  } else if (contractState instanceof StateValue) {
    state = new ChargedState(contractState);
  } else {
    throw new CompactError(`'contractState' parameter ${contractState} has unexpected type`);
  }
  return state;
};
var createInitialQueryContext = (contractState, contractAddress, time) => {
  const initialQueryContext = new QueryContext(coerceToChargedState(contractState), contractAddress);
  const balance = contractState instanceof ContractState ? contractState.balance : /* @__PURE__ */ new Map();
  initialQueryContext.block = {
    ...initialQueryContext.block,
    balance,
    ownAddress: contractAddress,
    secondsSinceEpoch: BigInt(time ?? Math.floor(Date.now() / 1e3))
  };
  return initialQueryContext;
};
var isZswapLocalState = (value) => {
  return typeof value === "object" && value !== null && "coinPublicKey" in value && typeof value.coinPublicKey === "string" && "currentIndex" in value && "inputs" in value && "outputs" in value;
};
var isEncodedZswapLocalState = (value) => {
  return typeof value === "object" && value !== null && "coinPublicKey" in value && typeof value.coinPublicKey === "object" && value.coinPublicKey !== null && "bytes" in value.coinPublicKey && "currentIndex" in value && "inputs" in value && "outputs" in value;
};
var createCircuitContext = (contractAddress, coinPublicKeyOrZswapState, contractState, privateState2, gasLimit, costModel, time) => {
  const initialQueryContext = createInitialQueryContext(contractState, contractAddress, time);
  let zswapLocalState;
  if (isZswapLocalState(coinPublicKeyOrZswapState)) {
    zswapLocalState = encodeZswapLocalState(coinPublicKeyOrZswapState);
  } else if (isEncodedZswapLocalState(coinPublicKeyOrZswapState)) {
    zswapLocalState = coinPublicKeyOrZswapState;
  } else {
    zswapLocalState = emptyZswapLocalState(coinPublicKeyOrZswapState);
  }
  return {
    currentPrivateState: privateState2,
    currentZswapLocalState: zswapLocalState,
    currentQueryContext: initialQueryContext,
    costModel: costModel ?? CostModel.initialCostModel(),
    gasLimit
  };
};
var emptyRunningCost = () => ({
  readTime: 0n,
  computeTime: 0n,
  bytesWritten: 0n,
  bytesDeleted: 0n
});
var queryLedgerState = (circuitContext, partialProofData, program) => {
  try {
    const res = circuitContext.currentQueryContext.query(program, circuitContext.costModel, circuitContext.gasLimit);
    circuitContext.currentQueryContext = res.context;
    circuitContext["gasCost"] = res.gasCost;
    const reads = res.events.filter((e) => e.tag === "read");
    let i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(program.map((op) => typeof op === "object" && "popeq" in op ? {
      popeq: {
        ...op.popeq,
        result: reads[i++].content
      }
    } : op));
    if (res.events.length === 1) {
      const event = res.events[0];
      if (event.tag === "read") {
        return event.content;
      }
    }
    return res.events;
  } catch (err) {
    if (err instanceof Error) {
      throw new CompactError(err.toString());
    }
    throw err;
  }
};

// node_modules/@midnight-ntwrk/compact-runtime/dist/witness.js
function createWitnessContext(ledger2, privateState2, contractAddress) {
  return {
    ledger: ledger2,
    privateState: privateState2,
    contractAddress
  };
}

// contract/src/managed/contract/index.js
checkRuntimeVersion("0.16.0");
var _descriptor_0 = new CompactTypeBytes(32);
var _descriptor_1 = new CompactTypeUnsignedInteger(18446744073709551615n, 8);
var _descriptor_2 = new CompactTypeUnsignedInteger(65535n, 2);
var _descriptor_3 = new CompactTypeVector(5, _descriptor_0);
var _descriptor_4 = CompactTypeBoolean;
var _Either_0 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
};
var _descriptor_5 = new _Either_0();
var _descriptor_6 = new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);
var _ContractAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_7 = new _ContractAddress_0();
var _descriptor_8 = new CompactTypeUnsignedInteger(255n, 1);
var Contract = class {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof witnesses_0 !== "object") {
      throw new CompactError("first (witnesses) argument to Contract constructor is not an object");
    }
    if (typeof witnesses_0.privateRouteHash !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named privateRouteHash");
    }
    if (typeof witnesses_0.privateNetBps !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named privateNetBps");
    }
    if (typeof witnesses_0.privateBridgeSeconds !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named privateBridgeSeconds");
    }
    if (typeof witnesses_0.privateLiquidityUsd !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named privateLiquidityUsd");
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      proveOpportunity: (...args_1) => {
        if (args_1.length !== 1) {
          throw new CompactError(`proveOpportunity: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          typeError(
            "proveOpportunity",
            "argument 1 (as invoked from Typescript)",
            "secret-pond.compact line 22 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        const context = { ...contextOrig_0, gasCost: emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveOpportunity_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      opportunityCommitment(context, ...args_1) {
        return { result: pureCircuits.opportunityCommitment(...args_1), context };
      }
    };
    this.impureCircuits = { proveOpportunity: this.circuits.proveOpportunity };
    this.provableCircuits = {
      proveOpportunity: this.circuits.proveOpportunity
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof constructorContext_0 !== "object") {
      throw new CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!("initialPrivateState" in constructorContext_0)) {
      throw new CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!("initialZswapLocalState" in constructorContext_0)) {
      throw new CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof constructorContext_0.initialZswapLocalState !== "object") {
      throw new CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new ContractState();
    let stateValue_0 = StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    state_0.data = new ChargedState(stateValue_0);
    state_0.setOperation("proveOpportunity", new ContractOperation());
    const context = createCircuitContext(dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: void 0,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(0n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(0n),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(1n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(new Uint8Array(32)),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(2n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(0n),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(3n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(0n),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(4n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(0n),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    const tmp_0 = 25n;
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(2n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(tmp_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    const tmp_1 = 1200n;
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(3n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(tmp_1),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    const tmp_2 = 10000n;
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(4n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(tmp_2),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    state_0.data = new ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    };
  }
  _persistentHash_0(value_0) {
    const result_0 = persistentHash3(_descriptor_3, value_0);
    return result_0;
  }
  _privateRouteHash_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateRouteHash(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      typeError(
        "privateRouteHash",
        "return value",
        "secret-pond.compact line 17 char 1",
        "Bytes<32>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _privateNetBps_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateNetBps(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof result_0 === "bigint" && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      typeError(
        "privateNetBps",
        "return value",
        "secret-pond.compact line 18 char 1",
        "Uint<0..18446744073709551616>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _privateBridgeSeconds_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateBridgeSeconds(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof result_0 === "bigint" && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      typeError(
        "privateBridgeSeconds",
        "return value",
        "secret-pond.compact line 19 char 1",
        "Uint<0..18446744073709551616>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _privateLiquidityUsd_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.privateLiquidityUsd(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof result_0 === "bigint" && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      typeError(
        "privateLiquidityUsd",
        "return value",
        "secret-pond.compact line 20 char 1",
        "Uint<0..18446744073709551616>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _proveOpportunity_0(context, partialProofData) {
    const routeHash_0 = this._privateRouteHash_0(context, partialProofData);
    const netBps_0 = this._privateNetBps_0(context, partialProofData);
    const bridgeSeconds_0 = this._privateBridgeSeconds_0(
      context,
      partialProofData
    );
    const liquidityUsd_0 = this._privateLiquidityUsd_0(context, partialProofData);
    assert(
      netBps_0 >= _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(2n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      "Net return is below policy"
    );
    assert(
      bridgeSeconds_0 <= _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(3n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      "Bridge is too slow"
    );
    assert(
      liquidityUsd_0 >= _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(4n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      "Liquidity is below policy"
    );
    const commitment_0 = this._opportunityCommitment_0(
      routeHash_0,
      netBps_0,
      bridgeSeconds_0,
      liquidityUsd_0
    );
    assert(
      !this._equal_0(
        commitment_0,
        _descriptor_0.fromValue(queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_8.toValue(1n),
                    alignment: _descriptor_8.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value)
      ),
      "Opportunity proof was already published"
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_8.toValue(1n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(commitment_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    const tmp_0 = 1n;
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(valueToBigInt(
          {
            value: _descriptor_2.toValue(tmp_0),
            alignment: _descriptor_2.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return commitment_0;
  }
  _opportunityCommitment_0(routeHash_0, netBps_0, bridgeSeconds_0, liquidityUsd_0) {
    return this._persistentHash_0([
      new Uint8Array([115, 101, 99, 114, 101, 116, 45, 112, 111, 110, 100, 58, 118, 49, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      routeHash_0,
      convertFieldToBytes(
        32,
        netBps_0,
        "secret-pond.compact line 48 char 5"
      ),
      convertFieldToBytes(
        32,
        bridgeSeconds_0,
        "secret-pond.compact line 49 char 5"
      ),
      convertFieldToBytes(
        32,
        liquidityUsd_0,
        "secret-pond.compact line 50 char 5"
      )
    ]);
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
};
function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof StateValue ? new ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new QueryContext(chargedState, dummyContractAddress()),
    costModel: CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: void 0,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get acceptedProofs() {
      return _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(0n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    get lastCommitment() {
      return _descriptor_0.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(1n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get minNetBps() {
      return _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(2n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get maxBridgeSeconds() {
      return _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(3n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get minLiquidityUsd() {
      return _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_8.toValue(4n),
                  alignment: _descriptor_8.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    }
  };
}
var _emptyContext = {
  currentQueryContext: new QueryContext(new ContractState().data, dummyContractAddress())
};
var _dummyContract = new Contract({
  privateRouteHash: (...args) => void 0,
  privateNetBps: (...args) => void 0,
  privateBridgeSeconds: (...args) => void 0,
  privateLiquidityUsd: (...args) => void 0
});
var pureCircuits = {
  opportunityCommitment: (...args_0) => {
    if (args_0.length !== 4) {
      throw new CompactError(`opportunityCommitment: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const routeHash_0 = args_0[0];
    const netBps_0 = args_0[1];
    const bridgeSeconds_0 = args_0[2];
    const liquidityUsd_0 = args_0[3];
    if (!(routeHash_0.buffer instanceof ArrayBuffer && routeHash_0.BYTES_PER_ELEMENT === 1 && routeHash_0.length === 32)) {
      typeError(
        "opportunityCommitment",
        "argument 1",
        "secret-pond.compact line 39 char 1",
        "Bytes<32>",
        routeHash_0
      );
    }
    if (!(typeof netBps_0 === "bigint" && netBps_0 >= 0n && netBps_0 <= 18446744073709551615n)) {
      typeError(
        "opportunityCommitment",
        "argument 2",
        "secret-pond.compact line 39 char 1",
        "Uint<0..18446744073709551616>",
        netBps_0
      );
    }
    if (!(typeof bridgeSeconds_0 === "bigint" && bridgeSeconds_0 >= 0n && bridgeSeconds_0 <= 18446744073709551615n)) {
      typeError(
        "opportunityCommitment",
        "argument 3",
        "secret-pond.compact line 39 char 1",
        "Uint<0..18446744073709551616>",
        bridgeSeconds_0
      );
    }
    if (!(typeof liquidityUsd_0 === "bigint" && liquidityUsd_0 >= 0n && liquidityUsd_0 <= 18446744073709551615n)) {
      typeError(
        "opportunityCommitment",
        "argument 4",
        "secret-pond.compact line 39 char 1",
        "Uint<0..18446744073709551616>",
        liquidityUsd_0
      );
    }
    return _dummyContract._opportunityCommitment_0(
      routeHash_0,
      netBps_0,
      bridgeSeconds_0,
      liquidityUsd_0
    );
  }
};

// web/proof-client.js
var UINT64_MAX = 18446744073709551615n;
function uint64(value, name) {
  const parsed = BigInt(value);
  if (parsed < 0n || parsed > UINT64_MAX) throw new RangeError(`${name} must fit Uint<64>`);
  return parsed;
}
async function privateState(input) {
  if (!input.secretRoute || typeof input.secretRoute !== "string") throw new TypeError("secretRoute is required");
  const encoded = new TextEncoder().encode(input.secretRoute);
  const routeHash = new Uint8Array(await crypto.subtle.digest("SHA-256", encoded));
  return {
    routeHash,
    netBps: uint64(input.netBps, "netBps"),
    bridgeSeconds: uint64(input.bridgeSeconds, "bridgeSeconds"),
    liquidityUsd: uint64(input.liquidityUsd, "liquidityUsd")
  };
}
var witnesses = {
  privateRouteHash: ({ privateState: state }) => [state, state.routeHash],
  privateNetBps: ({ privateState: state }) => [state, state.netBps],
  privateBridgeSeconds: ({ privateState: state }) => [state, state.bridgeSeconds],
  privateLiquidityUsd: ({ privateState: state }) => [state, state.liquidityUsd]
};
function hex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
var BrowserCompactSession = class _BrowserCompactSession {
  static async create() {
    const session = new _BrowserCompactSession();
    session.contract = new Contract(witnesses);
    session.address = sampleContractAddress();
    const initial = await session.contract.initialState(createConstructorContext(
      await privateState({ secretRoute: "constructor-only", netBps: 0, bridgeSeconds: 0, liquidityUsd: 0 }),
      "00".repeat(32)
    ));
    session.contractState = initial.currentContractState;
    session.zswapState = initial.currentZswapLocalState;
    return session;
  }
  async prove(input) {
    const state = await privateState(input);
    const context = createCircuitContext(this.address, this.zswapState, this.contractState, state);
    const result = await this.contract.impureCircuits.proveOpportunity(context);
    this.contractState = result.context.currentQueryContext.state;
    this.zswapState = result.context.currentZswapLocalState;
    const current = ledger(this.contractState);
    return {
      accepted: true,
      acceptedProofs: Number(current.acceptedProofs),
      commitment: hex(result.result ?? current.lastCommitment),
      publicPolicy: {
        minimumNetBps: Number(current.minNetBps),
        maximumBridgeSeconds: Number(current.maxBridgeSeconds),
        minimumLiquidityUsd: Number(current.minLiquidityUsd)
      },
      privateFieldsDisclosed: [],
      execution: { engine: "generated-compact-contract-browser", circuit: "proveOpportunity" },
      compiler: { toolchain: "0.31.1", language: "0.23.0", runtime: "0.16.0" }
    };
  }
};
export {
  BrowserCompactSession
};
