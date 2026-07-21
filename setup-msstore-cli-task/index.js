"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
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

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports2, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports2, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports2, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str, options) {
      if (!str)
        return [];
      options = options || {};
      var max = options.max == null ? Infinity : options.max;
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), max, true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, max, isTop) {
      var expansions = [];
      for (; ; ) {
        var m = balanced("{", "}", str);
        if (!m || /\$$/.test(m.pre)) return [str];
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,(?!,).*\}/)) {
            str = m.pre + "{" + m.body + escClose + m.post;
            isTop = true;
            continue;
          }
          return [str];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand(n[0], max, false).map(embrace);
            if (n.length === 1) {
              var post = m.post.length ? expand(m.post, max, false) : [""];
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var pre = m.pre;
        var post = m.post.length ? expand(m.post, max, false) : [""];
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y) && N.length < max; i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = concatMap(n, function(el) {
            return expand(el, max, false);
          });
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length && expansions.length < max; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
        return expansions;
      }
    }
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports2, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path2 = (function() {
      try {
        return require("path");
      } catch (e) {
      }
    })() || {
      sep: "/"
    };
    minimatch.sep = path2.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options) options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options) options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path2.sep !== "/") {
        pattern = pattern.split(path2.sep).join("/");
      }
      this.options = options;
      this.maxGlobstarRecursion = options.maxGlobstarRecursion !== void 0 ? options.maxGlobstarRecursion : 200;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug) this.debug = function debug2() {
        console.error.apply(console, arguments);
      };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate) return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset) this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "") return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self2 = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self2.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          /* istanbul ignore next */
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          // the various stateChar values
          // for the "extglob" stuff.
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1) c = "^";
              re += c;
              continue;
            }
            if (c === "*" && stateChar === "*") continue;
            self2.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext) clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          // these are mostly the same in regexp and glob
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false) return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate) re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined") partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment) return false;
      if (this.empty) return f === "";
      if (f === "/" && partial) return true;
      var options = this.options;
      if (path2.sep !== "/") {
        f = f.split(path2.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename) break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate) return true;
          return !this.negate;
        }
      }
      if (options.flipNegate) return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      if (pattern.indexOf(GLOBSTAR) !== -1) {
        return this._matchGlobstar(file, pattern, partial, 0, 0);
      }
      return this._matchOne(file, pattern, partial, 0, 0);
    };
    Minimatch.prototype._matchGlobstar = function(file, pattern, partial, fileIndex, patternIndex) {
      var i;
      var firstgs = -1;
      for (i = patternIndex; i < pattern.length; i++) {
        if (pattern[i] === GLOBSTAR) {
          firstgs = i;
          break;
        }
      }
      var lastgs = -1;
      for (i = pattern.length - 1; i >= 0; i--) {
        if (pattern[i] === GLOBSTAR) {
          lastgs = i;
          break;
        }
      }
      var head = pattern.slice(patternIndex, firstgs);
      var body = partial ? pattern.slice(firstgs + 1) : pattern.slice(firstgs + 1, lastgs);
      var tail = partial ? [] : pattern.slice(lastgs + 1);
      if (head.length) {
        var fileHead = file.slice(fileIndex, fileIndex + head.length);
        if (!this._matchOne(fileHead, head, partial, 0, 0)) {
          return false;
        }
        fileIndex += head.length;
      }
      var fileTailMatch = 0;
      if (tail.length) {
        if (tail.length + fileIndex > file.length) return false;
        var tailStart = file.length - tail.length;
        if (this._matchOne(file, tail, partial, tailStart, 0)) {
          fileTailMatch = tail.length;
        } else {
          if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
            return false;
          }
          tailStart--;
          if (!this._matchOne(file, tail, partial, tailStart, 0)) {
            return false;
          }
          fileTailMatch = tail.length + 1;
        }
      }
      if (!body.length) {
        var sawSome = !!fileTailMatch;
        for (i = fileIndex; i < file.length - fileTailMatch; i++) {
          var f = String(file[i]);
          sawSome = true;
          if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
            return false;
          }
        }
        return partial || sawSome;
      }
      var bodySegments = [[[], 0]];
      var currentBody = bodySegments[0];
      var nonGsParts = 0;
      var nonGsPartsSums = [0];
      for (var bi = 0; bi < body.length; bi++) {
        var b = body[bi];
        if (b === GLOBSTAR) {
          nonGsPartsSums.push(nonGsParts);
          currentBody = [[], 0];
          bodySegments.push(currentBody);
        } else {
          currentBody[0].push(b);
          nonGsParts++;
        }
      }
      var idx = bodySegments.length - 1;
      var fileLength = file.length - fileTailMatch;
      for (var si = 0; si < bodySegments.length; si++) {
        bodySegments[si][1] = fileLength - (nonGsPartsSums[idx--] + bodySegments[si][0].length);
      }
      return !!this._matchGlobStarBodySections(
        file,
        bodySegments,
        fileIndex,
        0,
        partial,
        0,
        !!fileTailMatch
      );
    };
    Minimatch.prototype._matchGlobStarBodySections = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
      var bs = bodySegments[bodyIndex];
      if (!bs) {
        for (var i = fileIndex; i < file.length; i++) {
          sawTail = true;
          var f = file[i];
          if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
            return false;
          }
        }
        return sawTail;
      }
      var body = bs[0];
      var after = bs[1];
      while (fileIndex <= after) {
        var m = this._matchOne(
          file.slice(0, fileIndex + body.length),
          body,
          partial,
          fileIndex,
          0
        );
        if (m && globStarDepth < this.maxGlobstarRecursion) {
          var sub = this._matchGlobStarBodySections(
            file,
            bodySegments,
            fileIndex + body.length,
            bodyIndex + 1,
            partial,
            globStarDepth + 1,
            sawTail
          );
          if (sub !== false) {
            return sub;
          }
        }
        var f = file[fileIndex];
        if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
          return false;
        }
        fileIndex++;
      }
      return partial || null;
    };
    Minimatch.prototype._matchOne = function(file, pattern, partial, fileIndex, patternIndex) {
      var fi, pi, fl, pl;
      for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false || p === GLOBSTAR) return false;
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit) return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/azure-pipelines-task-lib/taskcommand.js
var require_taskcommand = __commonJS({
  "node_modules/azure-pipelines-task-lib/taskcommand.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.commandFromString = exports2.TaskCommand = void 0;
    var CMD_PREFIX = "##vso[";
    var TaskCommand = (
      /** @class */
      (function() {
        function TaskCommand2(command, properties, message) {
          if (!command) {
            command = "missing.command";
          }
          this.command = command;
          this.properties = properties;
          this.message = message;
        }
        TaskCommand2.prototype.toString = function() {
          var cmdStr = CMD_PREFIX + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += " ";
            for (var key in this.properties) {
              if (this.properties.hasOwnProperty(key)) {
                var val = this.properties[key];
                if (val) {
                  cmdStr += key + "=" + escape2("" + (val || "")) + ";";
                }
              }
            }
          }
          cmdStr += "]";
          var message = "" + (this.message || "");
          cmdStr += escapedata(message);
          return cmdStr;
        };
        return TaskCommand2;
      })()
    );
    exports2.TaskCommand = TaskCommand;
    function commandFromString(commandLine) {
      var preLen = CMD_PREFIX.length;
      var lbPos = commandLine.indexOf("[");
      var rbPos = commandLine.indexOf("]");
      if (lbPos == -1 || rbPos == -1 || rbPos - lbPos < 3) {
        throw new Error("Invalid command brackets");
      }
      var cmdInfo = commandLine.substring(lbPos + 1, rbPos);
      var spaceIdx = cmdInfo.indexOf(" ");
      var command = cmdInfo;
      var properties = {};
      if (spaceIdx > 0) {
        command = cmdInfo.trim().substring(0, spaceIdx);
        var propSection = cmdInfo.trim().substring(spaceIdx + 1);
        var propLines = propSection.split(";");
        propLines.forEach(function(propLine) {
          propLine = propLine.trim();
          if (propLine.length > 0) {
            var eqIndex = propLine.indexOf("=");
            if (eqIndex == -1) {
              throw new Error("Invalid property: " + propLine);
            }
            var key = propLine.substring(0, eqIndex);
            var val = propLine.substring(eqIndex + 1);
            properties[key] = unescape2(val);
          }
        });
      }
      var msg = unescapedata(commandLine.substring(rbPos + 1));
      var cmd = new TaskCommand(command, properties, msg);
      return cmd;
    }
    exports2.commandFromString = commandFromString;
    function escapedata(s) {
      return s.replace(/%/g, "%AZP25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function unescapedata(s) {
      return s.replace(/%0D/g, "\r").replace(/%0A/g, "\n").replace(/%AZP25/g, "%");
    }
    function escape2(s) {
      return s.replace(/%/g, "%AZP25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/]/g, "%5D").replace(/;/g, "%3B");
    }
    function unescape2(s) {
      return s.replace(/%0D/g, "\r").replace(/%0A/g, "\n").replace(/%5D/g, "]").replace(/%3B/g, ";").replace(/%AZP25/g, "%");
    }
  }
});

// node_modules/azure-pipelines-task-lib/vault.js
var require_vault = __commonJS({
  "node_modules/azure-pipelines-task-lib/vault.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Vault = void 0;
    var fs3 = require("fs");
    var path2 = require("path");
    var crypto2 = require("crypto");
    var algorithm = "aes-256-ctr";
    var encryptEncoding = "hex";
    var unencryptedEncoding = "utf8";
    var Vault = (
      /** @class */
      (function() {
        function Vault2(keyPath) {
          this._keyFile = path2.join(keyPath, ".taskkey");
          this._store = {};
          this.genKey();
        }
        Vault2.prototype.initialize = function() {
        };
        Vault2.prototype.storeSecret = function(name, data) {
          if (!name || name.length == 0) {
            return false;
          }
          name = name.toLowerCase();
          if (!data || data.length == 0) {
            if (this._store.hasOwnProperty(name)) {
              delete this._store[name];
            }
            return false;
          }
          var key = this.getKey();
          var iv = crypto2.randomBytes(16);
          var cipher = crypto2.createCipheriv(algorithm, key, iv);
          var crypted = cipher.update(data, unencryptedEncoding, encryptEncoding);
          var cryptedFinal = cipher.final(encryptEncoding);
          this._store[name] = iv.toString(encryptEncoding) + crypted + cryptedFinal;
          return true;
        };
        Vault2.prototype.retrieveSecret = function(name) {
          var secret;
          name = (name || "").toLowerCase();
          if (this._store.hasOwnProperty(name)) {
            var key = this.getKey();
            var data = this._store[name];
            var ivDataBuffer = Buffer.from(data, encryptEncoding);
            var iv = ivDataBuffer.slice(0, 16);
            var encryptedText = ivDataBuffer.slice(16);
            var decipher = crypto2.createDecipheriv(algorithm, key, iv);
            var dec = decipher.update(encryptedText);
            var decFinal = decipher.final(unencryptedEncoding);
            secret = dec + decFinal;
          }
          return secret;
        };
        Vault2.prototype.getKey = function() {
          var key = fs3.readFileSync(this._keyFile).toString("utf8");
          return crypto2.createHash("sha256").update(key).digest();
        };
        Vault2.prototype.genKey = function() {
          fs3.writeFileSync(this._keyFile, crypto2.randomUUID(), { encoding: "utf8" });
        };
        return Vault2;
      })()
    );
    exports2.Vault = Vault;
  }
});

// node_modules/azure-pipelines-task-lib/node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/azure-pipelines-task-lib/node_modules/semver/semver.js"(exports2, module2) {
    exports2 = module2.exports = SemVer;
    var debug2;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports2.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    function makeSafeRe(value) {
      for (var i2 = 0; i2 < safeRegexReplacements.length; i2++) {
        var token = safeRegexReplacements[i2][0];
        var max = safeRegexReplacements[i2][1];
        value = value.split(token + "*").join(token + "{0," + max + "}").split(token + "+").join(token + "{1," + max + "}");
      }
      return value;
    }
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "\\d+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + LETTERDASHNUMBER + "*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = LETTERDASHNUMBER + "+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    safeRe[TILDETRIM] = new RegExp(makeSafeRe(src[TILDETRIM]), "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    safeRe[CARETTRIM] = new RegExp(makeSafeRe(src[CARETTRIM]), "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    safeRe[COMPARATORTRIM] = new RegExp(makeSafeRe(src[COMPARATORTRIM]), "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug2(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
        safeRe[i] = new RegExp(makeSafeRe(src[i]));
      }
    }
    var i;
    exports2.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? safeRe[LOOSE] : safeRe[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports2.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports2.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports2.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug2("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? safeRe[LOOSE] : safeRe[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug2("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug2("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports2.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports2.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports2.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports2.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports2.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports2.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports2.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports2.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports2.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports2.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports2.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.compare(a, b, loose);
      });
    }
    exports2.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.rcompare(a, b, loose);
      });
    }
    exports2.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports2.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports2.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports2.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports2.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports2.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports2.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports2.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug2("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports2.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + this.raw);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      var hr = loose ? safeRe[HYPHENRANGELOOSE] : safeRe[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug2("hyphen replace", range);
      range = range.replace(safeRe[COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range, safeRe[COMPARATORTRIM]);
      range = range.replace(safeRe[TILDETRIM], tildeTrimReplace);
      range = range.replace(safeRe[CARETTRIM], caretTrimReplace);
      var compRe = loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports2.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug2("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug2("caret", comp);
      comp = replaceTildes(comp, options);
      debug2("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug2("xrange", comp);
      comp = replaceStars(comp, options);
      debug2("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? safeRe[TILDELOOSE] : safeRe[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug2("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug2("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug2("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug2("caret", comp, options);
      var r = options.loose ? safeRe[CARETLOOSE] : safeRe[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug2("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug2("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug2("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug2("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug2("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? safeRe[XRANGELOOSE] : safeRe[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug2("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug2("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug2("replaceStars", comp, options);
      return comp.trim().replace(safeRe[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug2(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports2.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports2.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports2.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports2.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports2.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports2.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports2.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports2.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports2.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports2.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports2.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(safeRe[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/azure-pipelines-task-lib/internal.js
var require_internal = __commonJS({
  "node_modules/azure-pipelines-task-lib/internal.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isSigPipeError = exports2._exposeCertSettings = exports2._exposeProxySettings = exports2._normalizeSeparators = exports2._isRooted = exports2._getDirectoryName = exports2._ensureRooted = exports2._isUncPath = exports2._loadData = exports2._ensurePatternRooted = exports2._getFindInfoFromPattern = exports2._cloneMatchOptions = exports2._legacyFindFiles_convertPatternToRegExp = exports2._which = exports2._checkPath = exports2._exist = exports2._debug = exports2._error = exports2._warning = exports2._command = exports2._getVariableKey = exports2._getVariable = exports2._loc = exports2._setResourcePath = exports2._setErrStream = exports2._setStdStream = exports2._writeLine = exports2._truncateBeforeSensitiveKeyword = exports2._endsWith = exports2._startsWith = exports2.IssueAuditAction = exports2.IssueSource = exports2._vault = exports2._knownVariableMap = void 0;
    var fs3 = require("fs");
    var path2 = require("path");
    var os2 = require("os");
    var minimatch = require_minimatch();
    var util = require("util");
    var tcm = require_taskcommand();
    var vm = require_vault();
    var semver = require_semver();
    var crypto2 = require("crypto");
    exports2._knownVariableMap = {};
    var _commandCorrelationId;
    var IssueSource;
    (function(IssueSource2) {
      IssueSource2["CustomerScript"] = "CustomerScript";
      IssueSource2["TaskInternal"] = "TaskInternal";
    })(IssueSource = exports2.IssueSource || (exports2.IssueSource = {}));
    var IssueAuditAction;
    (function(IssueAuditAction2) {
      IssueAuditAction2[IssueAuditAction2["Unknown"] = 0] = "Unknown";
      IssueAuditAction2[IssueAuditAction2["ShellTasksValidation"] = 1] = "ShellTasksValidation";
    })(IssueAuditAction = exports2.IssueAuditAction || (exports2.IssueAuditAction = {}));
    if (semver.lt(process.versions.node, "4.2.0")) {
      _warning("Tasks require a new agent.  Upgrade your agent or node to 4.2.0 or later", IssueSource.TaskInternal);
    }
    function _startsWith(str, start) {
      return str.slice(0, start.length) == start;
    }
    exports2._startsWith = _startsWith;
    function _endsWith(str, end) {
      return str.slice(-end.length) == end;
    }
    exports2._endsWith = _endsWith;
    function _truncateBeforeSensitiveKeyword(str, sensitiveKeywordsPattern) {
      if (!str) {
        return str;
      }
      var index = str.search(sensitiveKeywordsPattern);
      if (index <= 0) {
        return str;
      }
      return "".concat(str.substring(0, index), "...");
    }
    exports2._truncateBeforeSensitiveKeyword = _truncateBeforeSensitiveKeyword;
    var _outStream = process.stdout;
    var _errStream = process.stderr;
    function _writeLine(str) {
      _outStream.write(str + os2.EOL);
    }
    exports2._writeLine = _writeLine;
    function _setStdStream(stdStream) {
      _outStream = stdStream;
    }
    exports2._setStdStream = _setStdStream;
    function _setErrStream(errStream) {
      _errStream = errStream;
    }
    exports2._setErrStream = _setErrStream;
    var _locStringCache = {};
    var _resourceFiles = {};
    var _libResourceFileLoaded = false;
    var _resourceCulture = "en-US";
    function _loadResJson(resjsonFile) {
      var resJson;
      if (_exist(resjsonFile)) {
        var resjsonContent = fs3.readFileSync(resjsonFile, "utf8").toString();
        if (resjsonContent.indexOf("\uFEFF") == 0) {
          resjsonContent = resjsonContent.slice(1);
        }
        try {
          resJson = JSON.parse(resjsonContent);
        } catch (err) {
          _debug("unable to parse resjson with err: " + err.message);
        }
      } else {
        _debug(".resjson file not found: " + resjsonFile);
      }
      return resJson;
    }
    function _loadLocStrings(resourceFile, culture) {
      var locStrings = {};
      if (_exist(resourceFile)) {
        var resourceJson = require(resourceFile);
        if (resourceJson && resourceJson.hasOwnProperty("messages")) {
          var locResourceJson;
          var localizedResourceFile = path2.join(path2.dirname(resourceFile), "Strings", "resources.resjson");
          var upperCulture = culture.toUpperCase();
          var cultures = [];
          try {
            cultures = fs3.readdirSync(localizedResourceFile);
          } catch (ex) {
          }
          for (var i = 0; i < cultures.length; i++) {
            if (cultures[i].toUpperCase() == upperCulture) {
              localizedResourceFile = path2.join(localizedResourceFile, cultures[i], "resources.resjson");
              if (_exist(localizedResourceFile)) {
                locResourceJson = _loadResJson(localizedResourceFile);
              }
              break;
            }
          }
          for (var key in resourceJson.messages) {
            if (locResourceJson && locResourceJson.hasOwnProperty("loc.messages." + key)) {
              locStrings[key] = locResourceJson["loc.messages." + key];
            } else {
              locStrings[key] = resourceJson.messages[key];
            }
          }
        }
      } else {
        _warning("LIB_ResourceFile does not exist", IssueSource.TaskInternal);
      }
      return locStrings;
    }
    function _setResourcePath(path3, ignoreWarnings) {
      if (ignoreWarnings === void 0) {
        ignoreWarnings = false;
      }
      if (process.env["TASKLIB_INPROC_UNITS"]) {
        _resourceFiles = {};
        _libResourceFileLoaded = false;
        _locStringCache = {};
        _resourceCulture = "en-US";
      }
      if (!_resourceFiles[path3]) {
        _checkPath(path3, "resource file path");
        _resourceFiles[path3] = path3;
        _debug("adding resource file: " + path3);
        _resourceCulture = _getVariable("system.culture") || _resourceCulture;
        var locStrs = _loadLocStrings(path3, _resourceCulture);
        for (var key in locStrs) {
          _locStringCache[key] = locStrs[key];
        }
      } else {
        if (ignoreWarnings) {
        } else {
          _warning(_loc("LIB_ResourceFileAlreadySet", path3), IssueSource.TaskInternal);
        }
      }
    }
    exports2._setResourcePath = _setResourcePath;
    function _loc(key) {
      var param = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        param[_i - 1] = arguments[_i];
      }
      if (!_libResourceFileLoaded) {
        var libResourceFile = path2.join(__dirname, "lib.json");
        var libLocStrs = _loadLocStrings(libResourceFile, _resourceCulture);
        for (var libKey in libLocStrs) {
          _locStringCache[libKey] = libLocStrs[libKey];
        }
        _libResourceFileLoaded = true;
      }
      var locString;
      ;
      if (_locStringCache.hasOwnProperty(key)) {
        locString = _locStringCache[key];
      } else {
        if (Object.keys(_resourceFiles).length <= 0) {
          _warning("Resource file haven't been set, can't find loc string for key: ".concat(key), IssueSource.TaskInternal);
        } else {
          _warning("Can't find loc string for key: ".concat(key));
        }
        locString = key;
      }
      if (param.length > 0) {
        return util.format.apply(this, [locString].concat(param));
      } else {
        return locString;
      }
    }
    exports2._loc = _loc;
    function _getVariable(name) {
      var varval;
      var info;
      var key = _getVariableKey(name);
      if (exports2._knownVariableMap.hasOwnProperty(key)) {
        info = exports2._knownVariableMap[key];
      }
      if (info && info.secret) {
        varval = exports2._vault.retrieveSecret("SECRET_" + key);
      } else {
        varval = process.env[key];
        if (!varval && name.toUpperCase() == "AGENT.JOBSTATUS") {
          varval = process.env["agent.jobstatus"];
        }
      }
      _debug(name + "=" + varval);
      return varval;
    }
    exports2._getVariable = _getVariable;
    function _getVariableKey(name) {
      if (!name) {
        throw new Error(_loc("LIB_ParameterIsRequired", "name"));
      }
      return name.replace(/\./g, "_").replace(/ /g, "_").toUpperCase();
    }
    exports2._getVariableKey = _getVariableKey;
    function _command(command, properties, message) {
      var taskCmd = new tcm.TaskCommand(command, properties, message);
      _writeLine(taskCmd.toString());
    }
    exports2._command = _command;
    function _warning(message, source, auditAction) {
      if (source === void 0) {
        source = IssueSource.TaskInternal;
      }
      _command("task.issue", {
        "type": "warning",
        "source": source,
        "correlationId": _commandCorrelationId,
        "auditAction": auditAction
      }, message);
    }
    exports2._warning = _warning;
    function _error(message, source, auditAction) {
      if (source === void 0) {
        source = IssueSource.TaskInternal;
      }
      _command("task.issue", {
        "type": "error",
        "source": source,
        "correlationId": _commandCorrelationId,
        "auditAction": auditAction
      }, message);
    }
    exports2._error = _error;
    var debugMode = ((_a = _getVariable("system.debug")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "true";
    var shouldCheckDebugMode = ((_b = _getVariable("DistributedTask.Tasks.Node.SkipDebugLogsWhenDebugModeOff")) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "true";
    function _debug(message) {
      if (!shouldCheckDebugMode || shouldCheckDebugMode && debugMode) {
        _command("task.debug", null, message);
      }
    }
    exports2._debug = _debug;
    function _exist(path3) {
      var exist = false;
      try {
        exist = !!(path3 && fs3.statSync(path3) != null);
      } catch (err) {
        if (err && err.code === "ENOENT") {
          exist = false;
        } else {
          throw err;
        }
      }
      return exist;
    }
    exports2._exist = _exist;
    function _checkPath(p, name) {
      _debug("check path : " + p);
      if (!_exist(p)) {
        throw new Error(_loc("LIB_PathNotFound", name, p));
      }
    }
    exports2._checkPath = _checkPath;
    function _which(tool, check) {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      if (check) {
        var result = _which(tool, false);
        if (result) {
          return result;
        } else {
          if (process.platform == "win32") {
            throw new Error(_loc("LIB_WhichNotFound_Win", tool));
          } else {
            throw new Error(_loc("LIB_WhichNotFound_Linux", tool));
          }
        }
      }
      _debug("which '".concat(tool, "'"));
      try {
        var extensions = [];
        if (process.platform == "win32" && process.env["PATHEXT"]) {
          for (var _i = 0, _a2 = process.env["PATHEXT"].split(path2.delimiter); _i < _a2.length; _i++) {
            var extension = _a2[_i];
            if (extension) {
              extensions.push(extension);
            }
          }
        }
        if (_isRooted(tool)) {
          var filePath = _tryGetExecutablePath(tool, extensions);
          if (filePath) {
            _debug("found: '".concat(filePath, "'"));
            return filePath;
          }
          _debug("not found");
          return "";
        }
        if (tool.indexOf("/") >= 0 || process.platform == "win32" && tool.indexOf("\\") >= 0) {
          _debug("not found");
          return "";
        }
        var directories = [];
        if (process.env["PATH"]) {
          for (var _b2 = 0, _c = process.env["PATH"].split(path2.delimiter); _b2 < _c.length; _b2++) {
            var p = _c[_b2];
            if (p) {
              directories.push(p);
            }
          }
        }
        for (var _d = 0, directories_1 = directories; _d < directories_1.length; _d++) {
          var directory = directories_1[_d];
          var filePath = _tryGetExecutablePath(directory + path2.sep + tool, extensions);
          if (filePath) {
            _debug("found: '".concat(filePath, "'"));
            return filePath;
          }
        }
        _debug("not found");
        return "";
      } catch (err) {
        throw new Error(_loc("LIB_OperationFailed", "which", err.message));
      }
    }
    exports2._which = _which;
    function _tryGetExecutablePath(filePath, extensions) {
      try {
        var stats = fs3.statSync(filePath);
        if (stats.isFile()) {
          if (process.platform == "win32") {
            var isExecutable = false;
            var fileName = path2.basename(filePath);
            var dotIndex = fileName.lastIndexOf(".");
            if (dotIndex >= 0) {
              var upperExt_1 = fileName.substr(dotIndex).toUpperCase();
              if (extensions.some(function(validExt) {
                return validExt.toUpperCase() == upperExt_1;
              })) {
                return filePath;
              }
            }
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
      } catch (err) {
        if (err.code != "ENOENT") {
          _debug("Unexpected error attempting to determine if executable file exists '".concat(filePath, "': ").concat(err));
        }
      }
      var originalFilePath = filePath;
      for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
        var extension = extensions_1[_i];
        var found = false;
        var filePath_1 = originalFilePath + extension;
        try {
          var stats = fs3.statSync(filePath_1);
          if (stats.isFile()) {
            if (process.platform == "win32") {
              try {
                var directory = path2.dirname(filePath_1);
                var upperName = path2.basename(filePath_1).toUpperCase();
                for (var _a2 = 0, _b2 = fs3.readdirSync(directory); _a2 < _b2.length; _a2++) {
                  var actualName = _b2[_a2];
                  if (upperName == actualName.toUpperCase()) {
                    filePath_1 = path2.join(directory, actualName);
                    break;
                  }
                }
              } catch (err) {
                _debug("Unexpected error attempting to determine the actual case of the file '".concat(filePath_1, "': ").concat(err));
              }
              return filePath_1;
            } else {
              if (isUnixExecutable(stats)) {
                return filePath_1;
              }
            }
          }
        } catch (err) {
          if (err.code != "ENOENT") {
            _debug("Unexpected error attempting to determine if executable file exists '".concat(filePath_1, "': ").concat(err));
          }
        }
      }
      return "";
    }
    function isUnixExecutable(stats) {
      return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
    }
    function _legacyFindFiles_convertPatternToRegExp(pattern) {
      pattern = (process.platform == "win32" ? pattern.replace(/\\/g, "/") : pattern).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/\\\/\\\*\\\*\\\//g, "((/.+/)|(/))").replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^/]*").replace(/\\\?/g, "[^/]");
      pattern = "^".concat(pattern, "$");
      var flags = process.platform == "win32" ? "i" : "";
      return new RegExp(pattern, flags);
    }
    exports2._legacyFindFiles_convertPatternToRegExp = _legacyFindFiles_convertPatternToRegExp;
    function _cloneMatchOptions(matchOptions) {
      return {
        debug: matchOptions.debug,
        nobrace: matchOptions.nobrace,
        noglobstar: matchOptions.noglobstar,
        dot: matchOptions.dot,
        noext: matchOptions.noext,
        nocase: matchOptions.nocase,
        nonull: matchOptions.nonull,
        matchBase: matchOptions.matchBase,
        nocomment: matchOptions.nocomment,
        nonegate: matchOptions.nonegate,
        flipNegate: matchOptions.flipNegate
      };
    }
    exports2._cloneMatchOptions = _cloneMatchOptions;
    function _getFindInfoFromPattern(defaultRoot, pattern, matchOptions) {
      if (!defaultRoot) {
        throw new Error("getFindRootFromPattern() parameter defaultRoot cannot be empty");
      }
      if (!pattern) {
        throw new Error("getFindRootFromPattern() parameter pattern cannot be empty");
      }
      if (!matchOptions.nobrace) {
        throw new Error("getFindRootFromPattern() expected matchOptions.nobrace to be true");
      }
      matchOptions = _cloneMatchOptions(matchOptions);
      matchOptions.nocase = false;
      if (matchOptions.matchBase && !_isRooted(pattern) && (process.platform == "win32" ? pattern.replace(/\\/g, "/") : pattern).indexOf("/") < 0) {
        return {
          adjustedPattern: pattern,
          findPath: defaultRoot,
          statOnly: false
        };
      }
      var minimatchObj = new minimatch.Minimatch(pattern, matchOptions);
      if (minimatchObj.set.length != 1) {
        throw new Error("getFindRootFromPattern() expected Minimatch(...).set.length to be 1. Actual: " + minimatchObj.set.length);
      }
      var literalSegments = [];
      for (var _i = 0, _a2 = minimatchObj.set[0]; _i < _a2.length; _i++) {
        var parsedSegment = _a2[_i];
        if (typeof parsedSegment == "string") {
          literalSegments.push(parsedSegment);
          continue;
        }
        break;
      }
      var joinedSegments = literalSegments.join("/");
      if (joinedSegments && process.platform == "win32" && _startsWith(pattern.replace(/\\/g, "/"), "//")) {
        joinedSegments = "/" + joinedSegments;
      }
      var findPath;
      if (_isRooted(pattern)) {
        findPath = joinedSegments;
      } else if (joinedSegments) {
        findPath = _ensureRooted(defaultRoot, joinedSegments);
      } else {
        findPath = defaultRoot;
      }
      if (findPath) {
        findPath = _getDirectoryName(_ensureRooted(findPath, "_"));
        findPath = _normalizeSeparators(findPath);
      }
      return {
        adjustedPattern: _ensurePatternRooted(defaultRoot, pattern),
        findPath,
        statOnly: literalSegments.length == minimatchObj.set[0].length
      };
    }
    exports2._getFindInfoFromPattern = _getFindInfoFromPattern;
    function _ensurePatternRooted(root, p) {
      if (!root) {
        throw new Error('ensurePatternRooted() parameter "root" cannot be empty');
      }
      if (!p) {
        throw new Error('ensurePatternRooted() parameter "p" cannot be empty');
      }
      if (_isRooted(p)) {
        return p;
      }
      root = _normalizeSeparators(root);
      root = (process.platform == "win32" ? root : root.replace(/\\/g, "\\\\")).replace(/(\[)(?=[^\/]+\])/g, "[[]").replace(/\?/g, "[?]").replace(/\*/g, "[*]").replace(/\+\(/g, "[+](").replace(/@\(/g, "[@](").replace(/!\(/g, "[!](");
      return _ensureRooted(root, p);
    }
    exports2._ensurePatternRooted = _ensurePatternRooted;
    function _loadData() {
      var keyPath = _getVariable("agent.TempDirectory") || _getVariable("agent.workFolder") || process.cwd();
      exports2._vault = new vm.Vault(keyPath);
      exports2._knownVariableMap = {};
      _debug("loading inputs and endpoints");
      var loaded = 0;
      for (var envvar in process.env) {
        if (_startsWith(envvar, "INPUT_") || _startsWith(envvar, "ENDPOINT_AUTH_") || _startsWith(envvar, "SECUREFILE_TICKET_") || _startsWith(envvar, "SECRET_") || _startsWith(envvar, "VSTS_TASKVARIABLE_")) {
          if (_startsWith(envvar, "SECRET_")) {
            var variableName = envvar.substring("SECRET_".length);
            if (variableName) {
              exports2._knownVariableMap[_getVariableKey(variableName)] = { name: variableName, secret: true };
            }
          }
          var value = process.env[envvar];
          if (value) {
            ++loaded;
            _debug("loading " + envvar);
            exports2._vault.storeSecret(envvar, value);
            delete process.env[envvar];
          }
        }
      }
      _debug("loaded " + loaded);
      var correlationId = process.env["COMMAND_CORRELATION_ID"];
      delete process.env["COMMAND_CORRELATION_ID"];
      _commandCorrelationId = correlationId ? String(correlationId) : "";
      var names;
      try {
        names = JSON.parse(process.env["VSTS_PUBLIC_VARIABLES"] || "[]");
      } catch (err) {
        throw new Error("Failed to parse VSTS_PUBLIC_VARIABLES as JSON. " + err);
      }
      names.forEach(function(name) {
        exports2._knownVariableMap[_getVariableKey(name)] = { name, secret: false };
      });
      delete process.env["VSTS_PUBLIC_VARIABLES"];
      try {
        names = JSON.parse(process.env["VSTS_SECRET_VARIABLES"] || "[]");
      } catch (err) {
        throw new Error("Failed to parse VSTS_SECRET_VARIABLES as JSON. " + err);
      }
      names.forEach(function(name) {
        exports2._knownVariableMap[_getVariableKey(name)] = { name, secret: true };
      });
      delete process.env["VSTS_SECRET_VARIABLES"];
      global["_vsts_task_lib_loaded"] = true;
    }
    exports2._loadData = _loadData;
    function _isUncPath(path3) {
      return /^\\\\[^\\]/.test(path3);
    }
    exports2._isUncPath = _isUncPath;
    function _ensureRooted(root, p) {
      if (!root) {
        throw new Error('ensureRooted() parameter "root" cannot be empty');
      }
      if (!p) {
        throw new Error('ensureRooted() parameter "p" cannot be empty');
      }
      if (_isRooted(p)) {
        return p;
      }
      if (process.platform == "win32" && root.match(/^[A-Z]:$/i)) {
        return root + p;
      }
      if (_endsWith(root, "/") || process.platform == "win32" && _endsWith(root, "\\")) {
      } else {
        root += path2.sep;
      }
      return root + p;
    }
    exports2._ensureRooted = _ensureRooted;
    function _getDirectoryName(p) {
      if (!p) {
        return "";
      }
      p = _normalizeSeparators(p);
      if (process.platform == "win32") {
        if (/^[A-Z]:\\?[^\\]+$/i.test(p)) {
          return p.charAt(2) == "\\" ? p.substring(0, 3) : p.substring(0, 2);
        } else if (/^[A-Z]:\\?$/i.test(p)) {
          return "";
        }
        var lastSlashIndex = p.lastIndexOf("\\");
        if (lastSlashIndex < 0) {
          return "";
        } else if (p == "\\") {
          return "";
        } else if (lastSlashIndex == 0) {
          return "\\";
        } else if (/^\\\\[^\\]+(\\[^\\]*)?$/.test(p)) {
          return "";
        }
        return p.substring(0, lastSlashIndex);
      }
      if (p.indexOf("/") < 0) {
        return "";
      } else if (p == "/") {
        return "";
      } else if (_endsWith(p, "/")) {
        return p.substring(0, p.length - 1);
      }
      return path2.dirname(p);
    }
    exports2._getDirectoryName = _getDirectoryName;
    function _isRooted(p) {
      p = _normalizeSeparators(p);
      if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
      }
      if (process.platform == "win32") {
        return _startsWith(p, "\\") || // e.g. \ or \hello or \\hello
        /^[A-Z]:/i.test(p);
      }
      return _startsWith(p, "/");
    }
    exports2._isRooted = _isRooted;
    function _normalizeSeparators(p) {
      p = p || "";
      if (process.platform == "win32") {
        p = p.replace(/\//g, "\\");
        var isUnc = /^\\\\+[^\\]/.test(p);
        return (isUnc ? "\\" : "") + p.replace(/\\\\+/g, "\\");
      }
      return p.replace(/\/\/+/g, "/");
    }
    exports2._normalizeSeparators = _normalizeSeparators;
    function _exposeProxySettings() {
      var proxyUrl = _getVariable("Agent.ProxyUrl");
      if (proxyUrl && proxyUrl.length > 0) {
        var proxyUsername = _getVariable("Agent.ProxyUsername");
        var proxyPassword = _getVariable("Agent.ProxyPassword");
        var proxyBypassHostsJson = _getVariable("Agent.ProxyBypassList");
        global["_vsts_task_lib_proxy_url"] = proxyUrl;
        global["_vsts_task_lib_proxy_username"] = proxyUsername;
        global["_vsts_task_lib_proxy_bypass"] = proxyBypassHostsJson;
        global["_vsts_task_lib_proxy_password"] = _exposeTaskLibSecret("proxy", proxyPassword || "");
        _debug("expose agent proxy configuration.");
        global["_vsts_task_lib_proxy"] = true;
      }
    }
    exports2._exposeProxySettings = _exposeProxySettings;
    function _exposeCertSettings() {
      var ca = _getVariable("Agent.CAInfo");
      if (ca) {
        global["_vsts_task_lib_cert_ca"] = ca;
      }
      var clientCert = _getVariable("Agent.ClientCert");
      if (clientCert) {
        var clientCertKey = _getVariable("Agent.ClientCertKey");
        var clientCertArchive = _getVariable("Agent.ClientCertArchive");
        var clientCertPassword = _getVariable("Agent.ClientCertPassword");
        global["_vsts_task_lib_cert_clientcert"] = clientCert;
        global["_vsts_task_lib_cert_key"] = clientCertKey;
        global["_vsts_task_lib_cert_archive"] = clientCertArchive;
        global["_vsts_task_lib_cert_passphrase"] = _exposeTaskLibSecret("cert", clientCertPassword || "");
      }
      if (ca || clientCert) {
        _debug("expose agent certificate configuration.");
        global["_vsts_task_lib_cert"] = true;
      }
      var skipCertValidation = _getVariable("Agent.SkipCertValidation") || "false";
      if (skipCertValidation) {
        global["_vsts_task_lib_skip_cert_validation"] = skipCertValidation.toUpperCase() === "TRUE";
      }
    }
    exports2._exposeCertSettings = _exposeCertSettings;
    function _exposeTaskLibSecret(keyFile, secret) {
      if (secret) {
        var encryptKey = crypto2.randomBytes(32);
        var iv = crypto2.randomBytes(16);
        var cipher = crypto2.createCipheriv("aes-256-ctr", encryptKey, iv);
        var encryptedContent = cipher.update(secret, "utf8", "hex");
        encryptedContent += cipher.final("hex");
        var storageFile = path2.join(_getVariable("Agent.TempDirectory") || _getVariable("agent.workFolder") || process.cwd(), keyFile);
        var keyAndIv = encryptKey.toString("base64") + ":" + iv.toString("base64");
        fs3.writeFileSync(storageFile, keyAndIv, { encoding: "utf8" });
        return Buffer.from(storageFile).toString("base64") + ":" + Buffer.from(encryptedContent).toString("base64");
      }
    }
    function isSigPipeError(e) {
      var _a2;
      if (!e || typeof e !== "object") {
        return false;
      }
      return e.code === "EPIPE" && ((_a2 = e.syscall) === null || _a2 === void 0 ? void 0 : _a2.toUpperCase()) === "WRITE";
    }
    exports2.isSigPipeError = isSigPipeError;
  }
});

// node_modules/q/q.js
var require_q = __commonJS({
  "node_modules/q/q.js"(exports2, module2) {
    (function(definition) {
      "use strict";
      if (typeof bootstrap === "function") {
        bootstrap("promise", definition);
      } else if (typeof exports2 === "object" && typeof module2 === "object") {
        module2.exports = definition();
      } else if (typeof define === "function" && define.amd) {
        define(definition);
      } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
          return;
        } else {
          ses.makeQ = definition;
        }
      } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        var global2 = typeof window !== "undefined" ? window : self;
        var previousQ = global2.Q;
        global2.Q = definition();
        global2.Q.noConflict = function() {
          global2.Q = previousQ;
          return this;
        };
      } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
      }
    })(function() {
      "use strict";
      var hasStacks = false;
      try {
        throw new Error();
      } catch (e) {
        hasStacks = !!e.stack;
      }
      var qStartingLine = captureLine();
      var qFileName;
      var noop = function() {
      };
      var nextTick = (function() {
        var head = { task: void 0, next: null };
        var tail = head;
        var flushing = false;
        var requestTick = void 0;
        var isNodeJS = false;
        var laterQueue = [];
        function flush() {
          var task, domain;
          while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;
            if (domain) {
              head.domain = void 0;
              domain.enter();
            }
            runSingle(task, domain);
          }
          while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
          }
          flushing = false;
        }
        function runSingle(task, domain) {
          try {
            task();
          } catch (e) {
            if (isNodeJS) {
              if (domain) {
                domain.exit();
              }
              setTimeout(flush, 0);
              if (domain) {
                domain.enter();
              }
              throw e;
            } else {
              setTimeout(function() {
                throw e;
              }, 0);
            }
          }
          if (domain) {
            domain.exit();
          }
        }
        nextTick = function(task) {
          tail = tail.next = {
            task,
            domain: isNodeJS && process.domain,
            next: null
          };
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
          isNodeJS = true;
          requestTick = function() {
            process.nextTick(flush);
          };
        } else if (typeof setImmediate === "function") {
          if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
          } else {
            requestTick = function() {
              setImmediate(flush);
            };
          }
        } else if (typeof MessageChannel !== "undefined") {
          var channel = new MessageChannel();
          channel.port1.onmessage = function() {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
          };
          var requestPortTick = function() {
            channel.port2.postMessage(0);
          };
          requestTick = function() {
            setTimeout(flush, 0);
            requestPortTick();
          };
        } else {
          requestTick = function() {
            setTimeout(flush, 0);
          };
        }
        nextTick.runAfter = function(task) {
          laterQueue.push(task);
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        return nextTick;
      })();
      var call = Function.call;
      function uncurryThis(f) {
        return function() {
          return call.apply(f, arguments);
        };
      }
      var array_slice = uncurryThis(Array.prototype.slice);
      var array_reduce = uncurryThis(
        Array.prototype.reduce || function(callback, basis) {
          var index = 0, length = this.length;
          if (arguments.length === 1) {
            do {
              if (index in this) {
                basis = this[index++];
                break;
              }
              if (++index >= length) {
                throw new TypeError();
              }
            } while (1);
          }
          for (; index < length; index++) {
            if (index in this) {
              basis = callback(basis, this[index], index);
            }
          }
          return basis;
        }
      );
      var array_indexOf = uncurryThis(
        Array.prototype.indexOf || function(value) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
              return i;
            }
          }
          return -1;
        }
      );
      var array_map = uncurryThis(
        Array.prototype.map || function(callback, thisp) {
          var self2 = this;
          var collect = [];
          array_reduce(self2, function(undefined2, value, index) {
            collect.push(callback.call(thisp, value, index, self2));
          }, void 0);
          return collect;
        }
      );
      var object_create = Object.create || function(prototype) {
        function Type() {
        }
        Type.prototype = prototype;
        return new Type();
      };
      var object_defineProperty = Object.defineProperty || function(obj, prop, descriptor) {
        obj[prop] = descriptor.value;
        return obj;
      };
      var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      var object_keys = Object.keys || function(object) {
        var keys = [];
        for (var key in object) {
          if (object_hasOwnProperty(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      var object_toString = uncurryThis(Object.prototype.toString);
      function isObject(value) {
        return value === Object(value);
      }
      function isStopIteration(exception) {
        return object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue;
      }
      var QReturnValue;
      if (typeof ReturnValue !== "undefined") {
        QReturnValue = ReturnValue;
      } else {
        QReturnValue = function(value) {
          this.value = value;
        };
      }
      var STACK_JUMP_SEPARATOR = "From previous event:";
      function makeStackTraceLong(error, promise2) {
        if (hasStacks && promise2.stack && typeof error === "object" && error !== null && error.stack) {
          var stacks = [];
          for (var p = promise2; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
              object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
              stacks.unshift(p.stack);
            }
          }
          stacks.unshift(error.stack);
          var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
          var stack = filterStackString(concatedStacks);
          object_defineProperty(error, "stack", { value: stack, configurable: true });
        }
      }
      function filterStackString(stackString) {
        var lines = stackString.split("\n");
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
          var line = lines[i];
          if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
          }
        }
        return desiredLines.join("\n");
      }
      function isNodeFrame(stackLine) {
        return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
      }
      function getFileNameAndLineNumber(stackLine) {
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
        }
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
          return [attempt2[1], Number(attempt2[2])];
        }
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          return [attempt3[1], Number(attempt3[2])];
        }
      }
      function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
          return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
      }
      function captureLine() {
        if (!hasStacks) {
          return;
        }
        try {
          throw new Error();
        } catch (e) {
          var lines = e.stack.split("\n");
          var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
          var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
          if (!fileNameAndLineNumber) {
            return;
          }
          qFileName = fileNameAndLineNumber[0];
          return fileNameAndLineNumber[1];
        }
      }
      function deprecate(callback, name, alternative) {
        return function() {
          if (typeof console !== "undefined" && typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
          }
          return callback.apply(callback, arguments);
        };
      }
      function Q(value) {
        if (value instanceof Promise2) {
          return value;
        }
        if (isPromiseAlike(value)) {
          return coerce(value);
        } else {
          return fulfill(value);
        }
      }
      Q.resolve = Q;
      Q.nextTick = nextTick;
      Q.longStackSupport = false;
      var longStackCounter = 1;
      if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
        Q.longStackSupport = true;
      }
      Q.defer = defer;
      function defer() {
        var messages = [], progressListeners = [], resolvedPromise;
        var deferred = object_create(defer.prototype);
        var promise2 = object_create(Promise2.prototype);
        promise2.promiseDispatch = function(resolve, op, operands) {
          var args = array_slice(arguments);
          if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) {
              progressListeners.push(operands[1]);
            }
          } else {
            Q.nextTick(function() {
              resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
          }
        };
        promise2.valueOf = function() {
          if (messages) {
            return promise2;
          }
          var nearerValue = nearer(resolvedPromise);
          if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue;
          }
          return nearerValue;
        };
        promise2.inspect = function() {
          if (!resolvedPromise) {
            return { state: "pending" };
          }
          return resolvedPromise.inspect();
        };
        if (Q.longStackSupport && hasStacks) {
          try {
            throw new Error();
          } catch (e) {
            promise2.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise2.stackCounter = longStackCounter++;
          }
        }
        function become(newPromise) {
          resolvedPromise = newPromise;
          if (Q.longStackSupport && hasStacks) {
            promise2.source = newPromise;
          }
          array_reduce(messages, function(undefined2, message) {
            Q.nextTick(function() {
              newPromise.promiseDispatch.apply(newPromise, message);
            });
          }, void 0);
          messages = void 0;
          progressListeners = void 0;
        }
        deferred.promise = promise2;
        deferred.resolve = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(Q(value));
        };
        deferred.fulfill = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(fulfill(value));
        };
        deferred.reject = function(reason) {
          if (resolvedPromise) {
            return;
          }
          become(reject(reason));
        };
        deferred.notify = function(progress2) {
          if (resolvedPromise) {
            return;
          }
          array_reduce(progressListeners, function(undefined2, progressListener) {
            Q.nextTick(function() {
              progressListener(progress2);
            });
          }, void 0);
        };
        return deferred;
      }
      defer.prototype.makeNodeResolver = function() {
        var self2 = this;
        return function(error, value) {
          if (error) {
            self2.reject(error);
          } else if (arguments.length > 2) {
            self2.resolve(array_slice(arguments, 1));
          } else {
            self2.resolve(value);
          }
        };
      };
      Q.Promise = promise;
      Q.promise = promise;
      function promise(resolver) {
        if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function.");
        }
        var deferred = defer();
        try {
          resolver(deferred.resolve, deferred.reject, deferred.notify);
        } catch (reason) {
          deferred.reject(reason);
        }
        return deferred.promise;
      }
      promise.race = race;
      promise.all = all;
      promise.reject = reject;
      promise.resolve = Q;
      Q.passByCopy = function(object) {
        return object;
      };
      Promise2.prototype.passByCopy = function() {
        return this;
      };
      Q.join = function(x, y) {
        return Q(x).join(y);
      };
      Promise2.prototype.join = function(that) {
        return Q([this, that]).spread(function(x, y) {
          if (x === y) {
            return x;
          } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
          }
        });
      };
      Q.race = race;
      function race(answerPs) {
        return promise(function(resolve, reject2) {
          for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject2);
          }
        });
      }
      Promise2.prototype.race = function() {
        return this.then(Q.race);
      };
      Q.makePromise = Promise2;
      function Promise2(descriptor, fallback, inspect) {
        if (fallback === void 0) {
          fallback = function(op) {
            return reject(new Error(
              "Promise does not support operation: " + op
            ));
          };
        }
        if (inspect === void 0) {
          inspect = function() {
            return { state: "unknown" };
          };
        }
        var promise2 = object_create(Promise2.prototype);
        promise2.promiseDispatch = function(resolve, op, args) {
          var result;
          try {
            if (descriptor[op]) {
              result = descriptor[op].apply(promise2, args);
            } else {
              result = fallback.call(promise2, op, args);
            }
          } catch (exception) {
            result = reject(exception);
          }
          if (resolve) {
            resolve(result);
          }
        };
        promise2.inspect = inspect;
        if (inspect) {
          var inspected = inspect();
          if (inspected.state === "rejected") {
            promise2.exception = inspected.reason;
          }
          promise2.valueOf = function() {
            var inspected2 = inspect();
            if (inspected2.state === "pending" || inspected2.state === "rejected") {
              return promise2;
            }
            return inspected2.value;
          };
        }
        return promise2;
      }
      Promise2.prototype.toString = function() {
        return "[object Promise]";
      };
      Promise2.prototype.then = function(fulfilled, rejected, progressed) {
        var self2 = this;
        var deferred = defer();
        var done = false;
        function _fulfilled(value) {
          try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
          } catch (exception) {
            return reject(exception);
          }
        }
        function _rejected(exception) {
          if (typeof rejected === "function") {
            makeStackTraceLong(exception, self2);
            try {
              return rejected(exception);
            } catch (newException) {
              return reject(newException);
            }
          }
          return reject(exception);
        }
        function _progressed(value) {
          return typeof progressed === "function" ? progressed(value) : value;
        }
        Q.nextTick(function() {
          self2.promiseDispatch(function(value) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_fulfilled(value));
          }, "when", [function(exception) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_rejected(exception));
          }]);
        });
        self2.promiseDispatch(void 0, "when", [void 0, function(value) {
          var newValue;
          var threw = false;
          try {
            newValue = _progressed(value);
          } catch (e) {
            threw = true;
            if (Q.onerror) {
              Q.onerror(e);
            } else {
              throw e;
            }
          }
          if (!threw) {
            deferred.notify(newValue);
          }
        }]);
        return deferred.promise;
      };
      Q.tap = function(promise2, callback) {
        return Q(promise2).tap(callback);
      };
      Promise2.prototype.tap = function(callback) {
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall(value).thenResolve(value);
        });
      };
      Q.when = when;
      function when(value, fulfilled, rejected, progressed) {
        return Q(value).then(fulfilled, rejected, progressed);
      }
      Promise2.prototype.thenResolve = function(value) {
        return this.then(function() {
          return value;
        });
      };
      Q.thenResolve = function(promise2, value) {
        return Q(promise2).thenResolve(value);
      };
      Promise2.prototype.thenReject = function(reason) {
        return this.then(function() {
          throw reason;
        });
      };
      Q.thenReject = function(promise2, reason) {
        return Q(promise2).thenReject(reason);
      };
      Q.nearer = nearer;
      function nearer(value) {
        if (isPromise(value)) {
          var inspected = value.inspect();
          if (inspected.state === "fulfilled") {
            return inspected.value;
          }
        }
        return value;
      }
      Q.isPromise = isPromise;
      function isPromise(object) {
        return object instanceof Promise2;
      }
      Q.isPromiseAlike = isPromiseAlike;
      function isPromiseAlike(object) {
        return isObject(object) && typeof object.then === "function";
      }
      Q.isPending = isPending;
      function isPending(object) {
        return isPromise(object) && object.inspect().state === "pending";
      }
      Promise2.prototype.isPending = function() {
        return this.inspect().state === "pending";
      };
      Q.isFulfilled = isFulfilled;
      function isFulfilled(object) {
        return !isPromise(object) || object.inspect().state === "fulfilled";
      }
      Promise2.prototype.isFulfilled = function() {
        return this.inspect().state === "fulfilled";
      };
      Q.isRejected = isRejected;
      function isRejected(object) {
        return isPromise(object) && object.inspect().state === "rejected";
      }
      Promise2.prototype.isRejected = function() {
        return this.inspect().state === "rejected";
      };
      var unhandledReasons = [];
      var unhandledRejections = [];
      var reportedUnhandledRejections = [];
      var trackUnhandledRejections = true;
      function resetUnhandledRejections() {
        unhandledReasons.length = 0;
        unhandledRejections.length = 0;
        if (!trackUnhandledRejections) {
          trackUnhandledRejections = true;
        }
      }
      function trackRejection(promise2, reason) {
        if (!trackUnhandledRejections) {
          return;
        }
        if (typeof process === "object" && typeof process.emit === "function") {
          Q.nextTick.runAfter(function() {
            if (array_indexOf(unhandledRejections, promise2) !== -1) {
              process.emit("unhandledRejection", reason, promise2);
              reportedUnhandledRejections.push(promise2);
            }
          });
        }
        unhandledRejections.push(promise2);
        if (reason && typeof reason.stack !== "undefined") {
          unhandledReasons.push(reason.stack);
        } else {
          unhandledReasons.push("(no stack) " + reason);
        }
      }
      function untrackRejection(promise2) {
        if (!trackUnhandledRejections) {
          return;
        }
        var at = array_indexOf(unhandledRejections, promise2);
        if (at !== -1) {
          if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function() {
              var atReport = array_indexOf(reportedUnhandledRejections, promise2);
              if (atReport !== -1) {
                process.emit("rejectionHandled", unhandledReasons[at], promise2);
                reportedUnhandledRejections.splice(atReport, 1);
              }
            });
          }
          unhandledRejections.splice(at, 1);
          unhandledReasons.splice(at, 1);
        }
      }
      Q.resetUnhandledRejections = resetUnhandledRejections;
      Q.getUnhandledReasons = function() {
        return unhandledReasons.slice();
      };
      Q.stopUnhandledRejectionTracking = function() {
        resetUnhandledRejections();
        trackUnhandledRejections = false;
      };
      resetUnhandledRejections();
      Q.reject = reject;
      function reject(reason) {
        var rejection = Promise2({
          "when": function(rejected) {
            if (rejected) {
              untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
          }
        }, function fallback() {
          return this;
        }, function inspect() {
          return { state: "rejected", reason };
        });
        trackRejection(rejection, reason);
        return rejection;
      }
      Q.fulfill = fulfill;
      function fulfill(value) {
        return Promise2({
          "when": function() {
            return value;
          },
          "get": function(name) {
            return value[name];
          },
          "set": function(name, rhs) {
            value[name] = rhs;
          },
          "delete": function(name) {
            delete value[name];
          },
          "post": function(name, args) {
            if (name === null || name === void 0) {
              return value.apply(void 0, args);
            } else {
              return value[name].apply(value, args);
            }
          },
          "apply": function(thisp, args) {
            return value.apply(thisp, args);
          },
          "keys": function() {
            return object_keys(value);
          }
        }, void 0, function inspect() {
          return { state: "fulfilled", value };
        });
      }
      function coerce(promise2) {
        var deferred = defer();
        Q.nextTick(function() {
          try {
            promise2.then(deferred.resolve, deferred.reject, deferred.notify);
          } catch (exception) {
            deferred.reject(exception);
          }
        });
        return deferred.promise;
      }
      Q.master = master;
      function master(object) {
        return Promise2({
          "isDef": function() {
          }
        }, function fallback(op, args) {
          return dispatch(object, op, args);
        }, function() {
          return Q(object).inspect();
        });
      }
      Q.spread = spread;
      function spread(value, fulfilled, rejected) {
        return Q(value).spread(fulfilled, rejected);
      }
      Promise2.prototype.spread = function(fulfilled, rejected) {
        return this.all().then(function(array) {
          return fulfilled.apply(void 0, array);
        }, rejected);
      };
      Q.async = async;
      function async(makeGenerator) {
        return function() {
          function continuer(verb, arg) {
            var result;
            if (typeof StopIteration === "undefined") {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                return reject(exception);
              }
              if (result.done) {
                return Q(result.value);
              } else {
                return when(result.value, callback, errback);
              }
            } else {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                if (isStopIteration(exception)) {
                  return Q(exception.value);
                } else {
                  return reject(exception);
                }
              }
              return when(result, callback, errback);
            }
          }
          var generator = makeGenerator.apply(this, arguments);
          var callback = continuer.bind(continuer, "next");
          var errback = continuer.bind(continuer, "throw");
          return callback();
        };
      }
      Q.spawn = spawn;
      function spawn(makeGenerator) {
        Q.done(Q.async(makeGenerator)());
      }
      Q["return"] = _return;
      function _return(value) {
        throw new QReturnValue(value);
      }
      Q.promised = promised;
      function promised(callback) {
        return function() {
          return spread([this, all(arguments)], function(self2, args) {
            return callback.apply(self2, args);
          });
        };
      }
      Q.dispatch = dispatch;
      function dispatch(object, op, args) {
        return Q(object).dispatch(op, args);
      }
      Promise2.prototype.dispatch = function(op, args) {
        var self2 = this;
        var deferred = defer();
        Q.nextTick(function() {
          self2.promiseDispatch(deferred.resolve, op, args);
        });
        return deferred.promise;
      };
      Q.get = function(object, key) {
        return Q(object).dispatch("get", [key]);
      };
      Promise2.prototype.get = function(key) {
        return this.dispatch("get", [key]);
      };
      Q.set = function(object, key, value) {
        return Q(object).dispatch("set", [key, value]);
      };
      Promise2.prototype.set = function(key, value) {
        return this.dispatch("set", [key, value]);
      };
      Q.del = // XXX legacy
      Q["delete"] = function(object, key) {
        return Q(object).dispatch("delete", [key]);
      };
      Promise2.prototype.del = // XXX legacy
      Promise2.prototype["delete"] = function(key) {
        return this.dispatch("delete", [key]);
      };
      Q.mapply = // XXX As proposed by "Redsandro"
      Q.post = function(object, name, args) {
        return Q(object).dispatch("post", [name, args]);
      };
      Promise2.prototype.mapply = // XXX As proposed by "Redsandro"
      Promise2.prototype.post = function(name, args) {
        return this.dispatch("post", [name, args]);
      };
      Q.send = // XXX Mark Miller's proposed parlance
      Q.mcall = // XXX As proposed by "Redsandro"
      Q.invoke = function(object, name) {
        return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
      };
      Promise2.prototype.send = // XXX Mark Miller's proposed parlance
      Promise2.prototype.mcall = // XXX As proposed by "Redsandro"
      Promise2.prototype.invoke = function(name) {
        return this.dispatch("post", [name, array_slice(arguments, 1)]);
      };
      Q.fapply = function(object, args) {
        return Q(object).dispatch("apply", [void 0, args]);
      };
      Promise2.prototype.fapply = function(args) {
        return this.dispatch("apply", [void 0, args]);
      };
      Q["try"] = Q.fcall = function(object) {
        return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
      };
      Promise2.prototype.fcall = function() {
        return this.dispatch("apply", [void 0, array_slice(arguments)]);
      };
      Q.fbind = function(object) {
        var promise2 = Q(object);
        var args = array_slice(arguments, 1);
        return function fbound() {
          return promise2.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
          ]);
        };
      };
      Promise2.prototype.fbind = function() {
        var promise2 = this;
        var args = array_slice(arguments);
        return function fbound() {
          return promise2.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
          ]);
        };
      };
      Q.keys = function(object) {
        return Q(object).dispatch("keys", []);
      };
      Promise2.prototype.keys = function() {
        return this.dispatch("keys", []);
      };
      Q.all = all;
      function all(promises) {
        return when(promises, function(promises2) {
          var pendingCount = 0;
          var deferred = defer();
          array_reduce(promises2, function(undefined2, promise2, index) {
            var snapshot;
            if (isPromise(promise2) && (snapshot = promise2.inspect()).state === "fulfilled") {
              promises2[index] = snapshot.value;
            } else {
              ++pendingCount;
              when(
                promise2,
                function(value) {
                  promises2[index] = value;
                  if (--pendingCount === 0) {
                    deferred.resolve(promises2);
                  }
                },
                deferred.reject,
                function(progress2) {
                  deferred.notify({ index, value: progress2 });
                }
              );
            }
          }, void 0);
          if (pendingCount === 0) {
            deferred.resolve(promises2);
          }
          return deferred.promise;
        });
      }
      Promise2.prototype.all = function() {
        return all(this);
      };
      Q.any = any;
      function any(promises) {
        if (promises.length === 0) {
          return Q.resolve();
        }
        var deferred = Q.defer();
        var pendingCount = 0;
        array_reduce(promises, function(prev, current, index) {
          var promise2 = promises[index];
          pendingCount++;
          when(promise2, onFulfilled, onRejected, onProgress);
          function onFulfilled(result) {
            deferred.resolve(result);
          }
          function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
              var rejection = err || new Error("" + err);
              rejection.message = "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: " + rejection.message;
              deferred.reject(rejection);
            }
          }
          function onProgress(progress2) {
            deferred.notify({
              index,
              value: progress2
            });
          }
        }, void 0);
        return deferred.promise;
      }
      Promise2.prototype.any = function() {
        return any(this);
      };
      Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
      function allResolved(promises) {
        return when(promises, function(promises2) {
          promises2 = array_map(promises2, Q);
          return when(all(array_map(promises2, function(promise2) {
            return when(promise2, noop, noop);
          })), function() {
            return promises2;
          });
        });
      }
      Promise2.prototype.allResolved = function() {
        return allResolved(this);
      };
      Q.allSettled = allSettled;
      function allSettled(promises) {
        return Q(promises).allSettled();
      }
      Promise2.prototype.allSettled = function() {
        return this.then(function(promises) {
          return all(array_map(promises, function(promise2) {
            promise2 = Q(promise2);
            function regardless() {
              return promise2.inspect();
            }
            return promise2.then(regardless, regardless);
          }));
        });
      };
      Q.fail = // XXX legacy
      Q["catch"] = function(object, rejected) {
        return Q(object).then(void 0, rejected);
      };
      Promise2.prototype.fail = // XXX legacy
      Promise2.prototype["catch"] = function(rejected) {
        return this.then(void 0, rejected);
      };
      Q.progress = progress;
      function progress(object, progressed) {
        return Q(object).then(void 0, void 0, progressed);
      }
      Promise2.prototype.progress = function(progressed) {
        return this.then(void 0, void 0, progressed);
      };
      Q.fin = // XXX legacy
      Q["finally"] = function(object, callback) {
        return Q(object)["finally"](callback);
      };
      Promise2.prototype.fin = // XXX legacy
      Promise2.prototype["finally"] = function(callback) {
        if (!callback || typeof callback.apply !== "function") {
          throw new Error("Q can't apply finally callback");
        }
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall().then(function() {
            return value;
          });
        }, function(reason) {
          return callback.fcall().then(function() {
            throw reason;
          });
        });
      };
      Q.done = function(object, fulfilled, rejected, progress2) {
        return Q(object).done(fulfilled, rejected, progress2);
      };
      Promise2.prototype.done = function(fulfilled, rejected, progress2) {
        var onUnhandledError = function(error) {
          Q.nextTick(function() {
            makeStackTraceLong(error, promise2);
            if (Q.onerror) {
              Q.onerror(error);
            } else {
              throw error;
            }
          });
        };
        var promise2 = fulfilled || rejected || progress2 ? this.then(fulfilled, rejected, progress2) : this;
        if (typeof process === "object" && process && process.domain) {
          onUnhandledError = process.domain.bind(onUnhandledError);
        }
        promise2.then(void 0, onUnhandledError);
      };
      Q.timeout = function(object, ms, error) {
        return Q(object).timeout(ms, error);
      };
      Promise2.prototype.timeout = function(ms, error) {
        var deferred = defer();
        var timeoutId = setTimeout(function() {
          if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
          }
          deferred.reject(error);
        }, ms);
        this.then(function(value) {
          clearTimeout(timeoutId);
          deferred.resolve(value);
        }, function(exception) {
          clearTimeout(timeoutId);
          deferred.reject(exception);
        }, deferred.notify);
        return deferred.promise;
      };
      Q.delay = function(object, timeout) {
        if (timeout === void 0) {
          timeout = object;
          object = void 0;
        }
        return Q(object).delay(timeout);
      };
      Promise2.prototype.delay = function(timeout) {
        return this.then(function(value) {
          var deferred = defer();
          setTimeout(function() {
            deferred.resolve(value);
          }, timeout);
          return deferred.promise;
        });
      };
      Q.nfapply = function(callback, args) {
        return Q(callback).nfapply(args);
      };
      Promise2.prototype.nfapply = function(args) {
        var deferred = defer();
        var nodeArgs = array_slice(args);
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfcall = function(callback) {
        var args = array_slice(arguments, 1);
        return Q(callback).nfapply(args);
      };
      Promise2.prototype.nfcall = function() {
        var nodeArgs = array_slice(arguments);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfbind = Q.denodeify = function(callback) {
        if (callback === void 0) {
          throw new Error("Q can't wrap an undefined function");
        }
        var baseArgs = array_slice(arguments, 1);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          Q(callback).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise2.prototype.nfbind = Promise2.prototype.denodeify = function() {
        var args = array_slice(arguments);
        args.unshift(this);
        return Q.denodeify.apply(void 0, args);
      };
      Q.nbind = function(callback, thisp) {
        var baseArgs = array_slice(arguments, 2);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          function bound() {
            return callback.apply(thisp, arguments);
          }
          Q(bound).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise2.prototype.nbind = function() {
        var args = array_slice(arguments, 0);
        args.unshift(this);
        return Q.nbind.apply(void 0, args);
      };
      Q.nmapply = // XXX As proposed by "Redsandro"
      Q.npost = function(object, name, args) {
        return Q(object).npost(name, args);
      };
      Promise2.prototype.nmapply = // XXX As proposed by "Redsandro"
      Promise2.prototype.npost = function(name, args) {
        var nodeArgs = array_slice(args || []);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nsend = // XXX Based on Mark Miller's proposed "send"
      Q.nmcall = // XXX Based on "Redsandro's" proposal
      Q.ninvoke = function(object, name) {
        var nodeArgs = array_slice(arguments, 2);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Promise2.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
      Promise2.prototype.nmcall = // XXX Based on "Redsandro's" proposal
      Promise2.prototype.ninvoke = function(name) {
        var nodeArgs = array_slice(arguments, 1);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nodeify = nodeify;
      function nodeify(object, nodeback) {
        return Q(object).nodeify(nodeback);
      }
      Promise2.prototype.nodeify = function(nodeback) {
        if (nodeback) {
          this.then(function(value) {
            Q.nextTick(function() {
              nodeback(null, value);
            });
          }, function(error) {
            Q.nextTick(function() {
              nodeback(error);
            });
          });
        } else {
          return this;
        }
      };
      Q.noConflict = function() {
        throw new Error("Q.noConflict only works when Q is used as a global");
      };
      var qEndingLine = captureLine();
      return Q;
    });
  }
});

// node_modules/azure-pipelines-task-lib/toolrunner.js
var require_toolrunner = __commonJS({
  "node_modules/azure-pipelines-task-lib/toolrunner.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ToolRunner = void 0;
    var Q = require_q();
    var os2 = require("os");
    var events = require("events");
    var child = require("child_process");
    var im = require_internal();
    var fs3 = require("fs");
    var ToolRunner = (
      /** @class */
      (function(_super) {
        __extends(ToolRunner2, _super);
        function ToolRunner2(toolPath) {
          var _this = _super.call(this) || this;
          _this.cmdSpecialChars = [" ", "	", "&", "(", ")", "[", "]", "{", "}", "^", "=", ";", "!", "'", "+", ",", "`", "~", "|", "<", ">", '"'];
          if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
          }
          _this.toolPath = im._which(toolPath, true);
          _this.args = [];
          _this._debug("toolRunner toolPath: " + toolPath);
          return _this;
        }
        ToolRunner2.prototype._debug = function(message) {
          this.emit("debug", message);
        };
        ToolRunner2.prototype._argStringToArray = function(argString) {
          var args = [];
          var inQuotes = false;
          var escaped = false;
          var lastCharWasSpace = true;
          var arg = "";
          var append = function(c2) {
            if (escaped) {
              if (c2 !== '"') {
                arg += "\\";
              } else {
                arg.slice(0, -1);
              }
            }
            arg += c2;
            escaped = false;
          };
          for (var i = 0; i < argString.length; i++) {
            var c = argString.charAt(i);
            if (c === " " && !inQuotes) {
              if (!lastCharWasSpace) {
                args.push(arg);
                arg = "";
              }
              lastCharWasSpace = true;
              continue;
            } else {
              lastCharWasSpace = false;
            }
            if (c === '"') {
              if (!escaped) {
                inQuotes = !inQuotes;
              } else {
                append(c);
              }
              continue;
            }
            if (c === "\\" && escaped) {
              append(c);
              continue;
            }
            if (c === "\\" && inQuotes) {
              escaped = true;
              continue;
            }
            append(c);
            lastCharWasSpace = false;
          }
          if (!lastCharWasSpace) {
            args.push(arg.trim());
          }
          return args;
        };
        ToolRunner2.prototype._getCommandString = function(options, noPrefix) {
          var _this = this;
          var toolPath = this._getSpawnFileName();
          var args = this._getSpawnArgs(options);
          var cmd = noPrefix ? "" : "[command]";
          var commandParts = [];
          if (process.platform == "win32") {
            if (this._isCmdFile()) {
              commandParts.push(toolPath);
              commandParts = commandParts.concat(args);
            } else if (options.windowsVerbatimArguments) {
              commandParts.push('"'.concat(toolPath, '"'));
              commandParts = commandParts.concat(args);
            } else if (options.shell) {
              commandParts.push(this._windowsQuoteCmdArg(toolPath));
              commandParts = commandParts.concat(args);
            } else {
              commandParts.push(this._windowsQuoteCmdArg(toolPath));
              commandParts = commandParts.concat(args.map(function(arg) {
                return _this._windowsQuoteCmdArg(arg);
              }));
            }
          } else {
            commandParts.push(toolPath);
            commandParts = commandParts.concat(args);
          }
          cmd += commandParts.join(" ");
          if (this.pipeOutputToTool) {
            cmd += " | " + this.pipeOutputToTool._getCommandString(
              options,
              /*noPrefix:*/
              true
            );
          }
          return cmd;
        };
        ToolRunner2.prototype._processLineBuffer = function(data, buffer, onLine) {
          var newBuffer = buffer + data.toString();
          try {
            var eolIndex = newBuffer.indexOf(os2.EOL);
            while (eolIndex > -1) {
              var line = newBuffer.substring(0, eolIndex);
              onLine(line);
              newBuffer = newBuffer.substring(eolIndex + os2.EOL.length);
              eolIndex = newBuffer.indexOf(os2.EOL);
            }
          } catch (err) {
            this._debug("error processing line");
          }
          return newBuffer;
        };
        ToolRunner2.prototype._wrapArg = function(arg, wrapChar) {
          if (!this._isWrapped(arg, wrapChar)) {
            return "".concat(wrapChar).concat(arg).concat(wrapChar);
          }
          return arg;
        };
        ToolRunner2.prototype._unwrapArg = function(arg, wrapChar) {
          if (this._isWrapped(arg, wrapChar)) {
            var pattern = new RegExp("(^\\\\?".concat(wrapChar, ")|(\\\\?").concat(wrapChar, "$)"), "g");
            return arg.trim().replace(pattern, "");
          }
          return arg;
        };
        ToolRunner2.prototype._isWrapped = function(arg, wrapChar) {
          var pattern = new RegExp("^\\\\?".concat(wrapChar, ".+\\\\?").concat(wrapChar, "$"));
          return pattern.test(arg.trim());
        };
        ToolRunner2.prototype._getSpawnFileName = function(options) {
          if (process.platform == "win32") {
            if (this._isCmdFile()) {
              return process.env["COMSPEC"] || "cmd.exe";
            }
          }
          if (options && options.shell) {
            return this._wrapArg(this.toolPath, '"');
          }
          return this.toolPath;
        };
        ToolRunner2.prototype._getSpawnArgs = function(options) {
          var _this = this;
          if (process.platform == "win32") {
            if (this._isCmdFile()) {
              var argline = '/D /S /C "'.concat(this._windowsQuoteCmdArg(this.toolPath));
              for (var i = 0; i < this.args.length; i++) {
                argline += " ";
                argline += options.windowsVerbatimArguments ? this.args[i] : this._windowsQuoteCmdArg(this.args[i]);
              }
              argline += '"';
              return [argline];
            }
            if (options.windowsVerbatimArguments) {
              var args_1 = this.args.slice(0);
              args_1.slice = function() {
                if (arguments.length != 1 || arguments[0] != 0) {
                  throw new Error("Unexpected arguments passed to args.slice when windowsVerbatimArguments flag is set.");
                }
                return args_1;
              };
              args_1.unshift = function() {
                if (arguments.length != 1) {
                  throw new Error("Unexpected arguments passed to args.unshift when windowsVerbatimArguments flag is set.");
                }
                return Array.prototype.unshift.call(args_1, '"'.concat(arguments[0], '"'));
              };
              return args_1;
            } else if (options.shell) {
              var args = [];
              for (var _i = 0, _a = this.args; _i < _a.length; _i++) {
                var arg = _a[_i];
                if (this._needQuotesForCmd(arg, "%")) {
                  args.push(this._wrapArg(arg, '"'));
                } else {
                  args.push(arg);
                }
              }
              return args;
            }
          } else if (options.shell) {
            return this.args.map(function(arg2) {
              if (_this._isWrapped(arg2, "'")) {
                return arg2;
              }
              arg2 = _this._unwrapArg(arg2, '"');
              arg2 = _this._escapeChar(arg2, '"');
              return _this._wrapArg(arg2, '"');
            });
          }
          return this.args;
        };
        ToolRunner2.prototype._escapeChar = function(arg, charToEscape) {
          var escChar = "\\";
          var output = "";
          var charIsEscaped = false;
          for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
            var char = arg_1[_i];
            if (char === charToEscape && !charIsEscaped) {
              output += escChar + char;
            } else {
              output += char;
            }
            charIsEscaped = char === escChar && !charIsEscaped;
          }
          return output;
        };
        ToolRunner2.prototype._isCmdFile = function() {
          var upperToolPath = this.toolPath.toUpperCase();
          return im._endsWith(upperToolPath, ".CMD") || im._endsWith(upperToolPath, ".BAT");
        };
        ToolRunner2.prototype._needQuotesForCmd = function(arg, additionalChars) {
          var specialChars = this.cmdSpecialChars;
          if (additionalChars) {
            specialChars = this.cmdSpecialChars.concat(additionalChars);
          }
          var _loop_1 = function(char2) {
            if (specialChars.some(function(x) {
              return x === char2;
            })) {
              return { value: true };
            }
          };
          for (var _i = 0, arg_2 = arg; _i < arg_2.length; _i++) {
            var char = arg_2[_i];
            var state_1 = _loop_1(char);
            if (typeof state_1 === "object")
              return state_1.value;
          }
          return false;
        };
        ToolRunner2.prototype._windowsQuoteCmdArg = function(arg) {
          if (!this._isCmdFile()) {
            return this._uv_quote_cmd_arg(arg);
          }
          if (!arg) {
            return '""';
          }
          var needsQuotes = this._needQuotesForCmd(arg);
          if (!needsQuotes) {
            return arg;
          }
          var reverse = '"';
          var quote_hit = true;
          for (var i = arg.length; i > 0; i--) {
            reverse += arg[i - 1];
            if (quote_hit && arg[i - 1] == "\\") {
              reverse += "\\";
            } else if (arg[i - 1] == '"') {
              quote_hit = true;
              reverse += '"';
            } else {
              quote_hit = false;
            }
          }
          reverse += '"';
          return reverse.split("").reverse().join("");
        };
        ToolRunner2.prototype._uv_quote_cmd_arg = function(arg) {
          if (!arg) {
            return '""';
          }
          if (arg.indexOf(" ") < 0 && arg.indexOf("	") < 0 && arg.indexOf('"') < 0) {
            return arg;
          }
          if (arg.indexOf('"') < 0 && arg.indexOf("\\") < 0) {
            return '"'.concat(arg, '"');
          }
          var reverse = '"';
          var quote_hit = true;
          for (var i = arg.length; i > 0; i--) {
            reverse += arg[i - 1];
            if (quote_hit && arg[i - 1] == "\\") {
              reverse += "\\";
            } else if (arg[i - 1] == '"') {
              quote_hit = true;
              reverse += "\\";
            } else {
              quote_hit = false;
            }
          }
          reverse += '"';
          return reverse.split("").reverse().join("");
        };
        ToolRunner2.prototype._cloneExecOptions = function(options) {
          options = options || {};
          var result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            shell: options.shell || false
          };
          result.outStream = options.outStream || process.stdout;
          result.errStream = options.errStream || process.stderr;
          return result;
        };
        ToolRunner2.prototype._getSpawnOptions = function(options) {
          options = options || {};
          var result = {};
          result.cwd = options.cwd;
          result.env = options.env;
          result.shell = options.shell;
          result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
          return result;
        };
        ToolRunner2.prototype._getSpawnSyncOptions = function(options) {
          var result = {};
          result.maxBuffer = 1024 * 1024 * 1024;
          result.cwd = options.cwd;
          result.env = options.env;
          result.shell = options.shell;
          result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
          return result;
        };
        ToolRunner2.prototype.execWithPipingAsync = function(pipeOutputToTool, options) {
          var _this = this;
          this._debug("exec tool: " + this.toolPath);
          this._debug("arguments:");
          this.args.forEach(function(arg) {
            _this._debug("   " + arg);
          });
          var success = true;
          var optionsNonNull = this._cloneExecOptions(options);
          if (!optionsNonNull.silent) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
          }
          var cp;
          var toolPath = pipeOutputToTool.toolPath;
          var toolPathFirst;
          var successFirst = true;
          var returnCodeFirst;
          var fileStream;
          var waitingEvents = 0;
          var returnCode = 0;
          var error;
          toolPathFirst = this.toolPath;
          waitingEvents++;
          var cpFirst = child.spawn(this._getSpawnFileName(optionsNonNull), this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(optionsNonNull));
          waitingEvents++;
          cp = child.spawn(pipeOutputToTool._getSpawnFileName(optionsNonNull), pipeOutputToTool._getSpawnArgs(optionsNonNull), pipeOutputToTool._getSpawnOptions(optionsNonNull));
          fileStream = this.pipeOutputToFile ? fs3.createWriteStream(this.pipeOutputToFile) : null;
          return new Promise(function(resolve, reject) {
            var _a, _b, _c, _d;
            if (fileStream) {
              waitingEvents++;
              fileStream.on("finish", function() {
                waitingEvents--;
                fileStream = null;
                if (waitingEvents == 0) {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(returnCode);
                  }
                }
              });
              fileStream.on("error", function(err) {
                waitingEvents--;
                _this._debug("Failed to pipe output of ".concat(toolPathFirst, " to file ").concat(_this.pipeOutputToFile, ". Error = ").concat(err));
                fileStream = null;
                if (waitingEvents == 0) {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(returnCode);
                  }
                }
              });
            }
            (_a = cpFirst.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function(data) {
              var _a2, _b2;
              try {
                if (fileStream) {
                  fileStream.write(data);
                }
                if (!((_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.destroyed)) {
                  (_b2 = cp.stdin) === null || _b2 === void 0 ? void 0 : _b2.write(data);
                }
              } catch (err) {
                _this._debug("Failed to pipe output of " + toolPathFirst + " to " + toolPath);
                _this._debug(toolPath + " might have exited due to errors prematurely. Verify the arguments passed are valid.");
              }
            });
            (_b = cpFirst.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function(data) {
              if (fileStream) {
                fileStream.write(data);
              }
              successFirst = !optionsNonNull.failOnStdErr;
              if (!optionsNonNull.silent) {
                var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                s.write(data);
              }
            });
            cpFirst.on("error", function(err) {
              var _a2;
              waitingEvents--;
              if (fileStream) {
                fileStream.end();
              }
              (_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.end();
              error = new Error(toolPathFirst + " failed. " + err.message);
              if (waitingEvents == 0) {
                reject(error);
              }
            });
            cpFirst.on("close", function(code, signal) {
              var _a2;
              waitingEvents--;
              if (code != 0 && !optionsNonNull.ignoreReturnCode) {
                successFirst = false;
                returnCodeFirst = code;
                returnCode = returnCodeFirst;
              }
              _this._debug("success of first tool:" + successFirst);
              if (fileStream) {
                fileStream.end();
              }
              (_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.end();
              if (waitingEvents == 0) {
                if (error) {
                  reject(error);
                } else {
                  resolve(returnCode);
                }
              }
            });
            var stdLineBuffer = "";
            (_c = cp.stdout) === null || _c === void 0 ? void 0 : _c.on("data", function(data) {
              _this.emit("stdout", data);
              if (!optionsNonNull.silent) {
                optionsNonNull.outStream.write(data);
              }
              stdLineBuffer = _this._processLineBuffer(data, stdLineBuffer, function(line) {
                _this.emit("stdline", line);
              });
            });
            var errLineBuffer = "";
            (_d = cp.stderr) === null || _d === void 0 ? void 0 : _d.on("data", function(data) {
              _this.emit("stderr", data);
              success = !optionsNonNull.failOnStdErr;
              if (!optionsNonNull.silent) {
                var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                s.write(data);
              }
              errLineBuffer = _this._processLineBuffer(data, errLineBuffer, function(line) {
                _this.emit("errline", line);
              });
            });
            cp.on("error", function(err) {
              waitingEvents--;
              error = new Error(toolPath + " failed. " + err.message);
              if (waitingEvents == 0) {
                reject(error);
              }
            });
            cp.on("close", function(code, signal) {
              waitingEvents--;
              _this._debug("rc:" + code);
              returnCode = code;
              if (stdLineBuffer.length > 0) {
                _this.emit("stdline", stdLineBuffer);
              }
              if (errLineBuffer.length > 0) {
                _this.emit("errline", errLineBuffer);
              }
              if (code != 0 && !optionsNonNull.ignoreReturnCode) {
                success = false;
              }
              _this._debug("success:" + success);
              if (!successFirst) {
                error = new Error(toolPathFirst + " failed with return code: " + returnCodeFirst);
              } else if (!success) {
                error = new Error(toolPath + " failed with return code: " + code);
              }
              if (waitingEvents == 0) {
                if (error) {
                  reject(error);
                } else {
                  resolve(returnCode);
                }
              }
            });
          });
        };
        ToolRunner2.prototype.execWithPiping = function(pipeOutputToTool, options) {
          var _this = this;
          var _a, _b, _c, _d;
          var defer = Q.defer();
          this._debug("exec tool: " + this.toolPath);
          this._debug("arguments:");
          this.args.forEach(function(arg) {
            _this._debug("   " + arg);
          });
          var success = true;
          var optionsNonNull = this._cloneExecOptions(options);
          if (!optionsNonNull.silent) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
          }
          var cp;
          var toolPath = pipeOutputToTool.toolPath;
          var toolPathFirst;
          var successFirst = true;
          var returnCodeFirst;
          var fileStream;
          var waitingEvents = 0;
          var returnCode = 0;
          var error;
          toolPathFirst = this.toolPath;
          waitingEvents++;
          var cpFirst = child.spawn(this._getSpawnFileName(optionsNonNull), this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(optionsNonNull));
          waitingEvents++;
          cp = child.spawn(pipeOutputToTool._getSpawnFileName(optionsNonNull), pipeOutputToTool._getSpawnArgs(optionsNonNull), pipeOutputToTool._getSpawnOptions(optionsNonNull));
          fileStream = this.pipeOutputToFile ? fs3.createWriteStream(this.pipeOutputToFile) : null;
          if (fileStream) {
            waitingEvents++;
            fileStream.on("finish", function() {
              waitingEvents--;
              fileStream = null;
              if (waitingEvents == 0) {
                if (error) {
                  defer.reject(error);
                } else {
                  defer.resolve(returnCode);
                }
              }
            });
            fileStream.on("error", function(err) {
              waitingEvents--;
              _this._debug("Failed to pipe output of ".concat(toolPathFirst, " to file ").concat(_this.pipeOutputToFile, ". Error = ").concat(err));
              fileStream = null;
              if (waitingEvents == 0) {
                if (error) {
                  defer.reject(error);
                } else {
                  defer.resolve(returnCode);
                }
              }
            });
          }
          (_a = cpFirst.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function(data) {
            var _a2;
            try {
              if (fileStream) {
                fileStream.write(data);
              }
              (_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.write(data);
            } catch (err) {
              _this._debug("Failed to pipe output of " + toolPathFirst + " to " + toolPath);
              _this._debug(toolPath + " might have exited due to errors prematurely. Verify the arguments passed are valid.");
            }
          });
          (_b = cpFirst.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function(data) {
            if (fileStream) {
              fileStream.write(data);
            }
            successFirst = !optionsNonNull.failOnStdErr;
            if (!optionsNonNull.silent) {
              var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
          });
          cpFirst.on("error", function(err) {
            var _a2;
            waitingEvents--;
            if (fileStream) {
              fileStream.end();
            }
            (_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.end();
            error = new Error(toolPathFirst + " failed. " + err.message);
            if (waitingEvents == 0) {
              defer.reject(error);
            }
          });
          cpFirst.on("close", function(code, signal) {
            var _a2;
            waitingEvents--;
            if (code != 0 && !optionsNonNull.ignoreReturnCode) {
              successFirst = false;
              returnCodeFirst = code;
              returnCode = returnCodeFirst;
            }
            _this._debug("success of first tool:" + successFirst);
            if (fileStream) {
              fileStream.end();
            }
            (_a2 = cp.stdin) === null || _a2 === void 0 ? void 0 : _a2.end();
            if (waitingEvents == 0) {
              if (error) {
                defer.reject(error);
              } else {
                defer.resolve(returnCode);
              }
            }
          });
          var stdLineBuffer = "";
          (_c = cp.stdout) === null || _c === void 0 ? void 0 : _c.on("data", function(data) {
            _this.emit("stdout", data);
            if (!optionsNonNull.silent) {
              optionsNonNull.outStream.write(data);
            }
            stdLineBuffer = _this._processLineBuffer(data, stdLineBuffer, function(line) {
              _this.emit("stdline", line);
            });
          });
          var errLineBuffer = "";
          (_d = cp.stderr) === null || _d === void 0 ? void 0 : _d.on("data", function(data) {
            _this.emit("stderr", data);
            success = !optionsNonNull.failOnStdErr;
            if (!optionsNonNull.silent) {
              var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
            errLineBuffer = _this._processLineBuffer(data, errLineBuffer, function(line) {
              _this.emit("errline", line);
            });
          });
          cp.on("error", function(err) {
            waitingEvents--;
            error = new Error(toolPath + " failed. " + err.message);
            if (waitingEvents == 0) {
              defer.reject(error);
            }
          });
          cp.on("close", function(code, signal) {
            waitingEvents--;
            _this._debug("rc:" + code);
            returnCode = code;
            if (stdLineBuffer.length > 0) {
              _this.emit("stdline", stdLineBuffer);
            }
            if (errLineBuffer.length > 0) {
              _this.emit("errline", errLineBuffer);
            }
            if (code != 0 && !optionsNonNull.ignoreReturnCode) {
              success = false;
            }
            _this._debug("success:" + success);
            if (!successFirst) {
              error = new Error(toolPathFirst + " failed with return code: " + returnCodeFirst);
            } else if (!success) {
              error = new Error(toolPath + " failed with return code: " + code);
            }
            if (waitingEvents == 0) {
              if (error) {
                defer.reject(error);
              } else {
                defer.resolve(returnCode);
              }
            }
          });
          return defer.promise;
        };
        ToolRunner2.prototype.arg = function(val) {
          if (!val) {
            return this;
          }
          if (val instanceof Array) {
            this._debug(this.toolPath + " arg: " + JSON.stringify(val));
            this.args = this.args.concat(val);
          } else if (typeof val === "string") {
            this._debug(this.toolPath + " arg: " + val);
            this.args = this.args.concat(val.trim());
          }
          return this;
        };
        ToolRunner2.prototype.line = function(val) {
          if (!val) {
            return this;
          }
          this._debug(this.toolPath + " arg: " + val);
          this.args = this.args.concat(this._argStringToArray(val));
          return this;
        };
        ToolRunner2.prototype.argIf = function(condition, val) {
          if (condition) {
            this.arg(val);
          }
          return this;
        };
        ToolRunner2.prototype.pipeExecOutputToTool = function(tool, file) {
          this.pipeOutputToTool = tool;
          this.pipeOutputToFile = file;
          return this;
        };
        ToolRunner2.prototype.execAsync = function(options) {
          var _this = this;
          var _a, _b, _c;
          if (this.pipeOutputToTool) {
            return this.execWithPipingAsync(this.pipeOutputToTool, options);
          }
          this._debug("exec tool: " + this.toolPath);
          this._debug("arguments:");
          this.args.forEach(function(arg) {
            _this._debug("   " + arg);
          });
          var optionsNonNull = this._cloneExecOptions(options);
          if (!optionsNonNull.silent) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
          }
          var state = new ExecState(optionsNonNull, this.toolPath);
          state.on("debug", function(message) {
            _this._debug(message);
          });
          var stdLineBuffer = "";
          var errLineBuffer = "";
          var emitDoneEvent = function(resolve, reject) {
            state.on("done", function(error, exitCode) {
              if (stdLineBuffer.length > 0) {
                _this.emit("stdline", stdLineBuffer);
              }
              if (errLineBuffer.length > 0) {
                _this.emit("errline", errLineBuffer);
              }
              if (cp) {
                cp.removeAllListeners();
              }
              if (error) {
                reject(error);
              } else {
                resolve(exitCode);
              }
            });
          };
          var cp;
          try {
            cp = child.spawn(this._getSpawnFileName(options), this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(options));
          } catch (error) {
            return new Promise(function(resolve, reject) {
              emitDoneEvent(resolve, reject);
              state.processError = error.message;
              state.processExited = true;
              state.processClosed = true;
              state.CheckComplete();
            });
          }
          this.childProcess = cp;
          (_a = cp.stdout) === null || _a === void 0 ? void 0 : _a.on("finish", function() {
            if (!optionsNonNull.silent) {
              optionsNonNull.outStream.write(os2.EOL);
            }
          });
          (_b = cp.stdout) === null || _b === void 0 ? void 0 : _b.on("data", function(data) {
            _this.emit("stdout", data);
            if (!optionsNonNull.silent) {
              optionsNonNull.outStream.write(data);
            }
            stdLineBuffer = _this._processLineBuffer(data, stdLineBuffer, function(line) {
              _this.emit("stdline", line);
            });
          });
          (_c = cp.stderr) === null || _c === void 0 ? void 0 : _c.on("data", function(data) {
            state.processStderr = true;
            _this.emit("stderr", data);
            if (!optionsNonNull.silent) {
              var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
            errLineBuffer = _this._processLineBuffer(data, errLineBuffer, function(line) {
              _this.emit("errline", line);
            });
          });
          cp.on("error", function(err) {
            state.processError = err.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
          });
          cp.on("exit", function(code, signal) {
            state.processExitCode = code;
            state.processExitSignal = signal;
            state.processExited = true;
            state.CheckComplete();
          });
          cp.on("close", function(code, signal) {
            state.processCloseCode = code;
            state.processCloseSignal = signal;
            state.processClosed = true;
            state.processExited = true;
            state.CheckComplete();
          });
          return new Promise(emitDoneEvent);
        };
        ToolRunner2.prototype.exec = function(options) {
          var _this = this;
          var _a, _b, _c;
          if (this.pipeOutputToTool) {
            return this.execWithPiping(this.pipeOutputToTool, options);
          }
          var defer = Q.defer();
          this._debug("exec tool: " + this.toolPath);
          this._debug("arguments:");
          this.args.forEach(function(arg) {
            _this._debug("   " + arg);
          });
          var optionsNonNull = this._cloneExecOptions(options);
          if (!optionsNonNull.silent) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
          }
          var state = new ExecState(optionsNonNull, this.toolPath);
          state.on("debug", function(message) {
            _this._debug(message);
          });
          var stdLineBuffer = "";
          var errLineBuffer = "";
          state.on("done", function(error, exitCode) {
            if (stdLineBuffer.length > 0) {
              _this.emit("stdline", stdLineBuffer);
            }
            if (errLineBuffer.length > 0) {
              _this.emit("errline", errLineBuffer);
            }
            if (cp) {
              cp.removeAllListeners();
            }
            if (error) {
              defer.reject(error);
            } else {
              defer.resolve(exitCode);
            }
          });
          var cp;
          try {
            cp = child.spawn(this._getSpawnFileName(options), this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(options));
          } catch (error) {
            state.processError = error.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
            return defer.promise;
          }
          this.childProcess = cp;
          (_a = cp.stdout) === null || _a === void 0 ? void 0 : _a.on("finish", function() {
            if (!optionsNonNull.silent) {
              optionsNonNull.outStream.write(os2.EOL);
            }
          });
          (_b = cp.stdout) === null || _b === void 0 ? void 0 : _b.on("data", function(data) {
            _this.emit("stdout", data);
            if (!optionsNonNull.silent) {
              optionsNonNull.outStream.write(data);
            }
            stdLineBuffer = _this._processLineBuffer(data, stdLineBuffer, function(line) {
              _this.emit("stdline", line);
            });
          });
          (_c = cp.stderr) === null || _c === void 0 ? void 0 : _c.on("data", function(data) {
            state.processStderr = true;
            _this.emit("stderr", data);
            if (!optionsNonNull.silent) {
              var s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
            errLineBuffer = _this._processLineBuffer(data, errLineBuffer, function(line) {
              _this.emit("errline", line);
            });
          });
          cp.on("error", function(err) {
            state.processError = err.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
          });
          cp.on("exit", function(code, signal) {
            state.processExitCode = code;
            state.processExitSignal = signal;
            state.processExited = true;
            state.CheckComplete();
          });
          cp.on("close", function(code, signal) {
            state.processCloseCode = code;
            state.processCloseSignal = signal;
            state.processClosed = true;
            state.processExited = true;
            state.CheckComplete();
          });
          return defer.promise;
        };
        ToolRunner2.prototype.execSync = function(options) {
          var _this = this;
          this._debug("exec tool: " + this.toolPath);
          this._debug("arguments:");
          this.args.forEach(function(arg) {
            _this._debug("   " + arg);
          });
          var success = true;
          options = this._cloneExecOptions(options);
          if (!options.silent) {
            options.outStream.write(this._getCommandString(options) + os2.EOL);
          }
          var r = child.spawnSync(this._getSpawnFileName(options), this._getSpawnArgs(options), this._getSpawnSyncOptions(options));
          if (!options.silent && r.stdout && r.stdout.length > 0) {
            options.outStream.write(r.stdout);
          }
          if (!options.silent && r.stderr && r.stderr.length > 0) {
            options.errStream.write(r.stderr);
          }
          var res = { code: r.status, error: r.error };
          res.stdout = r.stdout ? r.stdout.toString() : "";
          res.stderr = r.stderr ? r.stderr.toString() : "";
          return res;
        };
        ToolRunner2.prototype.killChildProcess = function(signal) {
          if (signal === void 0) {
            signal = "SIGTERM";
          }
          if (this.childProcess) {
            this._debug("[killChildProcess] Signal ".concat(signal, " received"));
            this.childProcess.kill(signal);
          }
        };
        return ToolRunner2;
      })(events.EventEmitter)
    );
    exports2.ToolRunner = ToolRunner;
    var ExecState = (
      /** @class */
      (function(_super) {
        __extends(ExecState2, _super);
        function ExecState2(options, toolPath) {
          var _this = _super.call(this) || this;
          _this.delay = 1e4;
          _this.timeout = null;
          if (!toolPath) {
            throw new Error("toolPath must not be empty");
          }
          _this.options = options;
          _this.toolPath = toolPath;
          var delay = process.env["TASKLIB_TEST_TOOLRUNNER_EXITDELAY"];
          if (delay) {
            _this.delay = parseInt(delay);
          }
          return _this;
        }
        ExecState2.prototype.CheckComplete = function() {
          if (this.done) {
            return;
          }
          if (this.processClosed) {
            this._setResult();
          } else if (this.processExited) {
            this.timeout = setTimeout(ExecState2.HandleTimeout, this.delay, this);
          }
        };
        ExecState2.prototype._debug = function(message) {
          this.emit("debug", message);
        };
        ExecState2.prototype._setResult = function() {
          var error;
          if (this.processExited) {
            this._debug("Process exited with code ".concat(this.processExitCode, " and signal ").concat(this.processExitSignal, " for tool '").concat(this.toolPath, "'"));
            if (this.processError) {
              error = new Error(im._loc("LIB_ProcessError", this.toolPath, this.processError));
            } else if (this.processExitCode != 0 && !this.options.ignoreReturnCode) {
              error = new Error(im._loc("LIB_ProcessExitCode", this.toolPath, this.processExitCode));
            } else if (this.processStderr && this.options.failOnStdErr) {
              error = new Error(im._loc("LIB_ProcessStderr", this.toolPath));
            }
          }
          if (this.processClosed) {
            this._debug("STDIO streams have closed and received exit code ".concat(this.processCloseCode, " and signal ").concat(this.processCloseSignal, " for tool '").concat(this.toolPath, "'"));
          }
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.done = true;
          this.emit("done", error, this.processExitCode);
        };
        ExecState2.HandleTimeout = function(state) {
          if (state.done) {
            return;
          }
          if (!state.processClosed && state.processExited) {
            console.log(im._loc("LIB_StdioNotClosed", state.delay / 1e3, state.toolPath));
            state._debug(im._loc("LIB_StdioNotClosed", state.delay / 1e3, state.toolPath));
          }
          state._setResult();
        };
        return ExecState2;
      })(events.EventEmitter)
    );
  }
});

// node_modules/azure-pipelines-task-lib/task.js
var require_task = __commonJS({
  "node_modules/azure-pipelines-task-lib/task.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getPlatform = exports2.osType = exports2.writeFile = exports2.exist = exports2.stats = exports2.debug = exports2.error = exports2.warning = exports2.command = exports2.setTaskVariable = exports2.getTaskVariable = exports2.getSecureFileTicket = exports2.getSecureFileName = exports2.getEndpointAuthorization = exports2.getEndpointAuthorizationParameterRequired = exports2.getEndpointAuthorizationParameter = exports2.getEndpointAuthorizationSchemeRequired = exports2.getEndpointAuthorizationScheme = exports2.getEndpointDataParameterRequired = exports2.getEndpointDataParameter = exports2.getEndpointUrlRequired = exports2.getEndpointUrl = exports2.getPathInputRequired = exports2.getPathInput = exports2.filePathSupplied = exports2.getDelimitedInput = exports2.getPipelineFeature = exports2.getBoolFeatureFlag = exports2.getBoolInput = exports2.getInputRequired = exports2.getInput = exports2.setSecret = exports2.setVariable = exports2.getVariables = exports2.assertAgent = exports2.getVariable = exports2.loc = exports2.setResourcePath = exports2.setSanitizedResult = exports2.setResult = exports2.setErrStream = exports2.setStdStream = exports2.AgentHostedMode = exports2.Platform = exports2.IssueSource = exports2.FieldType = exports2.ArtifactType = exports2.IssueType = exports2.TaskState = exports2.TaskResult = void 0;
    exports2.updateReleaseName = exports2.addBuildTag = exports2.updateBuildNumber = exports2.uploadBuildLog = exports2.associateArtifact = exports2.uploadArtifact = exports2.logIssue = exports2.logDetail = exports2.setProgress = exports2.setEndpoint = exports2.addAttachment = exports2.uploadSummary = exports2.prependPath = exports2.uploadFile = exports2.CodeCoverageEnabler = exports2.CodeCoveragePublisher = exports2.TestPublisher = exports2.getHttpCertConfiguration = exports2.getHttpProxyConfiguration = exports2.findMatch = exports2.filter = exports2.match = exports2.tool = exports2.execSync = exports2.exec = exports2.execAsync = exports2.rmRF = exports2.legacyFindFiles = exports2.find = exports2.retry = exports2.mv = exports2.cp = exports2.ls = exports2.which = exports2.resolve = exports2.mkdirP = exports2.popd = exports2.pushd = exports2.cd = exports2.checkPath = exports2.cwd = exports2.getSprint = exports2.getAgentMode = exports2.getNodeMajorVersion = void 0;
    var childProcess = require("child_process");
    var fs3 = require("fs");
    var path2 = require("path");
    var os2 = require("os");
    var minimatch = require_minimatch();
    var im = require_internal();
    var tcm = require_taskcommand();
    var trm = require_toolrunner();
    var semver = require_semver();
    var TaskResult2;
    (function(TaskResult3) {
      TaskResult3[TaskResult3["Succeeded"] = 0] = "Succeeded";
      TaskResult3[TaskResult3["SucceededWithIssues"] = 1] = "SucceededWithIssues";
      TaskResult3[TaskResult3["Failed"] = 2] = "Failed";
      TaskResult3[TaskResult3["Cancelled"] = 3] = "Cancelled";
      TaskResult3[TaskResult3["Skipped"] = 4] = "Skipped";
    })(TaskResult2 = exports2.TaskResult || (exports2.TaskResult = {}));
    var TaskState;
    (function(TaskState2) {
      TaskState2[TaskState2["Unknown"] = 0] = "Unknown";
      TaskState2[TaskState2["Initialized"] = 1] = "Initialized";
      TaskState2[TaskState2["InProgress"] = 2] = "InProgress";
      TaskState2[TaskState2["Completed"] = 3] = "Completed";
    })(TaskState = exports2.TaskState || (exports2.TaskState = {}));
    var IssueType;
    (function(IssueType2) {
      IssueType2[IssueType2["Error"] = 0] = "Error";
      IssueType2[IssueType2["Warning"] = 1] = "Warning";
    })(IssueType = exports2.IssueType || (exports2.IssueType = {}));
    var ArtifactType;
    (function(ArtifactType2) {
      ArtifactType2[ArtifactType2["Container"] = 0] = "Container";
      ArtifactType2[ArtifactType2["FilePath"] = 1] = "FilePath";
      ArtifactType2[ArtifactType2["VersionControl"] = 2] = "VersionControl";
      ArtifactType2[ArtifactType2["GitRef"] = 3] = "GitRef";
      ArtifactType2[ArtifactType2["TfvcLabel"] = 4] = "TfvcLabel";
    })(ArtifactType = exports2.ArtifactType || (exports2.ArtifactType = {}));
    var FieldType;
    (function(FieldType2) {
      FieldType2[FieldType2["AuthParameter"] = 0] = "AuthParameter";
      FieldType2[FieldType2["DataParameter"] = 1] = "DataParameter";
      FieldType2[FieldType2["Url"] = 2] = "Url";
    })(FieldType = exports2.FieldType || (exports2.FieldType = {}));
    exports2.IssueSource = im.IssueSource;
    var Platform;
    (function(Platform2) {
      Platform2[Platform2["Windows"] = 0] = "Windows";
      Platform2[Platform2["MacOS"] = 1] = "MacOS";
      Platform2[Platform2["Linux"] = 2] = "Linux";
    })(Platform = exports2.Platform || (exports2.Platform = {}));
    var AgentHostedMode;
    (function(AgentHostedMode2) {
      AgentHostedMode2[AgentHostedMode2["Unknown"] = 0] = "Unknown";
      AgentHostedMode2[AgentHostedMode2["SelfHosted"] = 1] = "SelfHosted";
      AgentHostedMode2[AgentHostedMode2["MsHosted"] = 2] = "MsHosted";
    })(AgentHostedMode = exports2.AgentHostedMode || (exports2.AgentHostedMode = {}));
    var SPRINT_ONE_START_UTC_MS = Date.UTC(2010, 7, 14, 0, 0, 0, 0);
    var DAYS_PER_WEEK = 7;
    var DAYS_PER_SPRINT = 21;
    var MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1e3;
    exports2.setStdStream = im._setStdStream;
    exports2.setErrStream = im._setErrStream;
    function setResult2(result, message, done) {
      (0, exports2.debug)("task result: " + TaskResult2[result]);
      if (result == TaskResult2.Failed && message) {
        (0, exports2.error)(message, exports2.IssueSource.TaskInternal);
      } else if (result == TaskResult2.SucceededWithIssues && message) {
        (0, exports2.warning)(message, exports2.IssueSource.TaskInternal);
      }
      var properties = { "result": TaskResult2[result] };
      if (done) {
        properties["done"] = "true";
      }
      (0, exports2.command)("task.complete", properties, message);
    }
    exports2.setResult = setResult2;
    function setSanitizedResult(result, message, done) {
      var pattern = /password|key|secret|bearer|authorization|token|pat/i;
      var sanitizedMessage = im._truncateBeforeSensitiveKeyword(message, pattern);
      setResult2(result, sanitizedMessage, done);
    }
    exports2.setSanitizedResult = setSanitizedResult;
    process.on("uncaughtException", function(err) {
      if (!im.isSigPipeError(err)) {
        setResult2(TaskResult2.Failed, (0, exports2.loc)("LIB_UnhandledEx", err.message));
        (0, exports2.error)(String(err.stack), im.IssueSource.TaskInternal);
      }
    });
    process.on("unhandledRejection", function(reason) {
      if (reason instanceof Error) {
        throw reason;
      } else {
        throw new Error(reason);
      }
    });
    exports2.setResourcePath = im._setResourcePath;
    exports2.loc = im._loc;
    exports2.getVariable = im._getVariable;
    function assertAgent(minimum) {
      if (semver.lt(minimum, "2.104.1")) {
        throw new Error("assertAgent() requires the parameter to be 2.104.1 or higher");
      }
      var agent = (0, exports2.getVariable)("Agent.Version");
      (0, exports2.debug)("Detected Agent.Version=" + (agent ? agent : "undefined"));
      if (agent && semver.lt(agent, minimum)) {
        throw new Error("Agent version ".concat(minimum, " or higher is required. Detected Agent version: ").concat(agent));
      }
    }
    exports2.assertAgent = assertAgent;
    function getVariables() {
      return Object.keys(im._knownVariableMap).map(function(key) {
        var info = im._knownVariableMap[key];
        return { name: info.name, value: (0, exports2.getVariable)(info.name), secret: info.secret };
      });
    }
    exports2.getVariables = getVariables;
    function setVariable(name, val, secret, isOutput) {
      if (secret === void 0) {
        secret = false;
      }
      if (isOutput === void 0) {
        isOutput = false;
      }
      var key = im._getVariableKey(name);
      if (im._knownVariableMap.hasOwnProperty(key)) {
        secret = secret || im._knownVariableMap[key].secret;
      }
      var varValue = val || "";
      (0, exports2.debug)("set " + name + "=" + (secret && varValue ? "********" : varValue));
      if (secret) {
        if (varValue && varValue.match(/\r|\n/) && "".concat(process.env["SYSTEM_UNSAFEALLOWMULTILINESECRET"]).toUpperCase() != "TRUE") {
          throw new Error((0, exports2.loc)("LIB_MultilineSecret"));
        }
        im._vault.storeSecret("SECRET_" + key, varValue);
        delete process.env[key];
      } else {
        process.env[key] = varValue;
      }
      im._knownVariableMap[key] = { name, secret };
      (0, exports2.command)("task.setvariable", { "variable": name || "", isOutput: (isOutput || false).toString(), "issecret": (secret || false).toString() }, varValue);
    }
    exports2.setVariable = setVariable;
    function setSecret(val) {
      if (val) {
        if (val.match(/\r|\n/) && "".concat(process.env["SYSTEM_UNSAFEALLOWMULTILINESECRET"]).toUpperCase() !== "TRUE") {
          throw new Error((0, exports2.loc)("LIB_MultilineSecret"));
        }
        (0, exports2.command)("task.setsecret", {}, val);
      }
    }
    exports2.setSecret = setSecret;
    function getInput2(name, required) {
      var inval = im._vault.retrieveSecret("INPUT_" + im._getVariableKey(name));
      if (required && !inval) {
        throw new Error((0, exports2.loc)("LIB_InputRequired", name));
      }
      (0, exports2.debug)(name + "=" + inval);
      return inval;
    }
    exports2.getInput = getInput2;
    function getInputRequired(name) {
      return getInput2(name, true);
    }
    exports2.getInputRequired = getInputRequired;
    function getBoolInput(name, required) {
      return (getInput2(name, required) || "").toUpperCase() == "TRUE";
    }
    exports2.getBoolInput = getBoolInput;
    function getBoolFeatureFlag(ffName, defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = false;
      }
      var ffValue = process.env[ffName];
      if (!ffValue) {
        (0, exports2.debug)("Feature flag ".concat(ffName, " not found. Returning ").concat(defaultValue, " as default."));
        return defaultValue;
      }
      (0, exports2.debug)("Feature flag ".concat(ffName, " = ").concat(ffValue));
      return ffValue.toLowerCase() === "true";
    }
    exports2.getBoolFeatureFlag = getBoolFeatureFlag;
    function getPipelineFeature(featureName) {
      var variableName = im._getVariableKey("DistributedTask.Tasks.".concat(featureName));
      var featureValue = process.env[variableName];
      if (!featureValue) {
        (0, exports2.debug)("Feature '".concat(featureName, "' not found. Returning false as default."));
        return false;
      }
      var boolValue = featureValue.toLowerCase() === "true";
      (0, exports2.debug)("Feature '".concat(featureName, "' = '").concat(featureValue, "'. Processed as '").concat(boolValue, "'."));
      return boolValue;
    }
    exports2.getPipelineFeature = getPipelineFeature;
    function getDelimitedInput(name, delim, required) {
      var inputVal = getInput2(name, required);
      if (!inputVal) {
        return [];
      }
      var result = [];
      inputVal.split(delim).forEach(function(x) {
        if (x) {
          result.push(x);
        }
      });
      return result;
    }
    exports2.getDelimitedInput = getDelimitedInput;
    function filePathSupplied(name) {
      var pathValue = this.resolve(this.getPathInput(name) || "");
      var repoRoot = this.resolve((0, exports2.getVariable)("build.sourcesDirectory") || (0, exports2.getVariable)("system.defaultWorkingDirectory") || "");
      var supplied = pathValue !== repoRoot;
      (0, exports2.debug)(name + "path supplied :" + supplied);
      return supplied;
    }
    exports2.filePathSupplied = filePathSupplied;
    function getPathInput(name, required, check) {
      var inval = getInput2(name, required);
      if (inval) {
        if (check) {
          (0, exports2.checkPath)(inval, name);
        }
      }
      return inval;
    }
    exports2.getPathInput = getPathInput;
    function getPathInputRequired(name, check) {
      return getPathInput(name, true, check);
    }
    exports2.getPathInputRequired = getPathInputRequired;
    function getEndpointUrl(id, optional) {
      var urlval = process.env["ENDPOINT_URL_" + id];
      if (!optional && !urlval) {
        throw new Error((0, exports2.loc)("LIB_EndpointNotExist", id));
      }
      (0, exports2.debug)(id + "=" + urlval);
      return urlval;
    }
    exports2.getEndpointUrl = getEndpointUrl;
    function getEndpointUrlRequired(id) {
      return getEndpointUrl(id, false);
    }
    exports2.getEndpointUrlRequired = getEndpointUrlRequired;
    function getEndpointDataParameter(id, key, optional) {
      var dataParamVal = process.env["ENDPOINT_DATA_" + id + "_" + key.toUpperCase()];
      if (!optional && !dataParamVal) {
        throw new Error((0, exports2.loc)("LIB_EndpointDataNotExist", id, key));
      }
      (0, exports2.debug)(id + " data " + key + " = " + dataParamVal);
      return dataParamVal;
    }
    exports2.getEndpointDataParameter = getEndpointDataParameter;
    function getEndpointDataParameterRequired(id, key) {
      return getEndpointDataParameter(id, key, false);
    }
    exports2.getEndpointDataParameterRequired = getEndpointDataParameterRequired;
    function getEndpointAuthorizationScheme(id, optional) {
      var authScheme = im._vault.retrieveSecret("ENDPOINT_AUTH_SCHEME_" + id);
      if (!optional && !authScheme) {
        throw new Error((0, exports2.loc)("LIB_EndpointAuthNotExist", id));
      }
      (0, exports2.debug)(id + " auth scheme = " + authScheme);
      return authScheme;
    }
    exports2.getEndpointAuthorizationScheme = getEndpointAuthorizationScheme;
    function getEndpointAuthorizationSchemeRequired(id) {
      return getEndpointAuthorizationScheme(id, false);
    }
    exports2.getEndpointAuthorizationSchemeRequired = getEndpointAuthorizationSchemeRequired;
    function getEndpointAuthorizationParameter(id, key, optional) {
      var authParam = im._vault.retrieveSecret("ENDPOINT_AUTH_PARAMETER_" + id + "_" + key.toUpperCase());
      if (!optional && !authParam) {
        throw new Error((0, exports2.loc)("LIB_EndpointAuthNotExist", id));
      }
      (0, exports2.debug)(id + " auth param " + key + " = " + authParam);
      return authParam;
    }
    exports2.getEndpointAuthorizationParameter = getEndpointAuthorizationParameter;
    function getEndpointAuthorizationParameterRequired(id, key) {
      return getEndpointAuthorizationParameter(id, key, false);
    }
    exports2.getEndpointAuthorizationParameterRequired = getEndpointAuthorizationParameterRequired;
    function getEndpointAuthorization(id, optional) {
      var aval = im._vault.retrieveSecret("ENDPOINT_AUTH_" + id);
      if (!optional && !aval) {
        setResult2(TaskResult2.Failed, (0, exports2.loc)("LIB_EndpointAuthNotExist", id));
      }
      (0, exports2.debug)(id + " exists " + !!aval);
      var auth;
      try {
        if (aval) {
          auth = JSON.parse(aval);
        }
      } catch (err) {
        throw new Error((0, exports2.loc)("LIB_InvalidEndpointAuth", aval));
      }
      return auth;
    }
    exports2.getEndpointAuthorization = getEndpointAuthorization;
    function getSecureFileName(id) {
      var name = process.env["SECUREFILE_NAME_" + id];
      (0, exports2.debug)("secure file name for id " + id + " = " + name);
      return name;
    }
    exports2.getSecureFileName = getSecureFileName;
    function getSecureFileTicket(id) {
      var ticket = im._vault.retrieveSecret("SECUREFILE_TICKET_" + id);
      (0, exports2.debug)("secure file ticket for id " + id + " = " + ticket);
      return ticket;
    }
    exports2.getSecureFileTicket = getSecureFileTicket;
    function getTaskVariable(name) {
      assertAgent("2.115.0");
      var inval = im._vault.retrieveSecret("VSTS_TASKVARIABLE_" + im._getVariableKey(name));
      if (inval) {
        inval = inval.trim();
      }
      (0, exports2.debug)("task variable: " + name + "=" + inval);
      return inval;
    }
    exports2.getTaskVariable = getTaskVariable;
    function setTaskVariable(name, val, secret) {
      if (secret === void 0) {
        secret = false;
      }
      assertAgent("2.115.0");
      var key = im._getVariableKey(name);
      var varValue = val || "";
      (0, exports2.debug)("set task variable: " + name + "=" + (secret && varValue ? "********" : varValue));
      im._vault.storeSecret("VSTS_TASKVARIABLE_" + key, varValue);
      delete process.env[key];
      (0, exports2.command)("task.settaskvariable", { "variable": name || "", "issecret": (secret || false).toString() }, varValue);
    }
    exports2.setTaskVariable = setTaskVariable;
    exports2.command = im._command;
    exports2.warning = im._warning;
    exports2.error = im._error;
    exports2.debug = im._debug;
    function stats(path3) {
      return fs3.statSync(path3);
    }
    exports2.stats = stats;
    exports2.exist = im._exist;
    function writeFile(file, data, options) {
      if (typeof options === "string") {
        fs3.writeFileSync(file, data, { encoding: options });
      } else {
        fs3.writeFileSync(file, data, options);
      }
    }
    exports2.writeFile = writeFile;
    function osType() {
      return os2.type();
    }
    exports2.osType = osType;
    function getPlatform() {
      switch (process.platform) {
        case "win32":
          return Platform.Windows;
        case "darwin":
          return Platform.MacOS;
        case "linux":
          return Platform.Linux;
        default:
          throw Error((0, exports2.loc)("LIB_PlatformNotSupported", process.platform));
      }
    }
    exports2.getPlatform = getPlatform;
    function getNodeMajorVersion() {
      var _a;
      var version = (_a = process === null || process === void 0 ? void 0 : process.versions) === null || _a === void 0 ? void 0 : _a.node;
      if (!version) {
        throw new Error((0, exports2.loc)("LIB_UndefinedNodeVersion"));
      }
      var parts = version.split(".").map(Number);
      if (parts.length < 1) {
        return NaN;
      }
      return parts[0];
    }
    exports2.getNodeMajorVersion = getNodeMajorVersion;
    function getAgentMode() {
      var agentCloudId = (0, exports2.getVariable)("Agent.CloudId");
      if (agentCloudId === void 0)
        return AgentHostedMode.Unknown;
      if (agentCloudId)
        return AgentHostedMode.MsHosted;
      return AgentHostedMode.SelfHosted;
    }
    exports2.getAgentMode = getAgentMode;
    function getSprint(date) {
      var targetDate = date || /* @__PURE__ */ new Date();
      var elapsedDays = Math.floor((targetDate.getTime() - SPRINT_ONE_START_UTC_MS) / MILLISECONDS_PER_DAY);
      var sprintIndex = Math.floor(elapsedDays / DAYS_PER_SPRINT);
      var dayWithinSprint = (elapsedDays % DAYS_PER_SPRINT + DAYS_PER_SPRINT) % DAYS_PER_SPRINT;
      return {
        sprint: sprintIndex + 1,
        week: Math.floor(dayWithinSprint / DAYS_PER_WEEK) + 1
      };
    }
    exports2.getSprint = getSprint;
    function cwd() {
      return process.cwd();
    }
    exports2.cwd = cwd;
    exports2.checkPath = im._checkPath;
    function cd(path3) {
      if (path3 === "-") {
        if (!process.env.OLDPWD) {
          throw new Error((0, exports2.loc)("LIB_NotFoundPreviousDirectory"));
        } else {
          path3 = process.env.OLDPWD;
        }
      }
      if (path3 === "~") {
        path3 = os2.homedir();
      }
      if (!fs3.existsSync(path3)) {
        throw new Error((0, exports2.loc)("LIB_PathNotFound", "cd", path3));
      }
      if (!fs3.statSync(path3).isDirectory()) {
        throw new Error((0, exports2.loc)("LIB_PathIsNotADirectory", path3));
      }
      try {
        var currentPath = process.cwd();
        process.chdir(path3);
        process.env.OLDPWD = currentPath;
      } catch (error) {
        (0, exports2.debug)((0, exports2.loc)("LIB_OperationFailed", "cd", error));
      }
    }
    exports2.cd = cd;
    var dirStack = [];
    function getActualStack() {
      return [process.cwd()].concat(dirStack);
    }
    function pushd(dir) {
      if (dir === void 0) {
        dir = "";
      }
      var dirs = getActualStack();
      var maybeIndex = parseInt(dir);
      if (dir === "+0") {
        return dirs;
      } else if (dir.length === 0) {
        if (dirs.length > 1) {
          dirs.splice.apply(dirs, __spreadArray([0, 0], dirs.splice(1, 1), false));
        } else {
          throw new Error((0, exports2.loc)("LIB_DirectoryStackEmpty"));
        }
      } else if (!isNaN(maybeIndex)) {
        if (maybeIndex < dirStack.length + 1) {
          maybeIndex = dir.charAt(0) === "-" ? maybeIndex - 1 : maybeIndex;
        }
        dirs.splice.apply(dirs, __spreadArray([0, dirs.length], dirs.slice(maybeIndex).concat(dirs.slice(0, maybeIndex)), false));
      } else {
        dirs.unshift(dir);
      }
      var _path = path2.resolve(dirs.shift());
      try {
        cd(_path);
      } catch (error) {
        if (!fs3.existsSync(_path)) {
          throw new Error((0, exports2.loc)("Not found", "pushd", _path));
        }
        throw error;
      }
      dirStack.splice.apply(dirStack, __spreadArray([0, dirStack.length], dirs, false));
      return getActualStack();
    }
    exports2.pushd = pushd;
    function popd(index) {
      if (index === void 0) {
        index = "";
      }
      if (dirStack.length === 0) {
        throw new Error((0, exports2.loc)("LIB_DirectoryStackEmpty"));
      }
      var maybeIndex = parseInt(index);
      if (isNaN(maybeIndex)) {
        maybeIndex = 0;
      } else if (maybeIndex < dirStack.length + 1) {
        maybeIndex = index.charAt(0) === "-" ? maybeIndex - 1 : maybeIndex;
      }
      if (maybeIndex > 0 || dirStack.length + maybeIndex === 0) {
        maybeIndex = maybeIndex > 0 ? maybeIndex - 1 : maybeIndex;
        dirStack.splice(maybeIndex, 1);
      } else {
        var _path = path2.resolve(dirStack.shift());
        cd(_path);
      }
      return getActualStack();
    }
    exports2.popd = popd;
    function mkdirP2(p) {
      if (!p) {
        throw new Error((0, exports2.loc)("LIB_ParameterIsRequired", "p"));
      }
      var stack = [];
      var testDir = p;
      while (true) {
        if (stack.length >= Number(process.env["TASKLIB_TEST_MKDIRP_FAILSAFE"] || 1e3)) {
          (0, exports2.debug)("loop is out of control");
          fs3.mkdirSync(p);
          return;
        }
        (0, exports2.debug)("testing directory '".concat(testDir, "'"));
        var stats_1 = void 0;
        try {
          stats_1 = fs3.statSync(testDir);
        } catch (err) {
          if (err.code == "ENOENT") {
            var parentDir = path2.dirname(testDir);
            if (testDir == parentDir) {
              throw new Error((0, exports2.loc)("LIB_MkdirFailedInvalidDriveRoot", p, testDir));
            }
            stack.push(testDir);
            testDir = parentDir;
            continue;
          } else if (err.code == "UNKNOWN") {
            throw new Error((0, exports2.loc)("LIB_MkdirFailedInvalidShare", p, testDir));
          } else {
            throw err;
          }
        }
        if (!stats_1.isDirectory()) {
          throw new Error((0, exports2.loc)("LIB_MkdirFailedFileExists", p, testDir));
        }
        break;
      }
      while (stack.length) {
        var dir = stack.pop();
        (0, exports2.debug)("mkdir '".concat(dir, "'"));
        try {
          fs3.mkdirSync(dir);
        } catch (err) {
          throw new Error((0, exports2.loc)("LIB_MkdirFailed", p, err.message));
        }
      }
    }
    exports2.mkdirP = mkdirP2;
    function resolve() {
      var pathSegments = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        pathSegments[_i] = arguments[_i];
      }
      var absolutePath = path2.resolve.apply(this, pathSegments);
      (0, exports2.debug)("Absolute path for pathSegments: " + pathSegments + " = " + absolutePath);
      return absolutePath;
    }
    exports2.resolve = resolve;
    exports2.which = im._which;
    function ls(optionsOrPaths) {
      var paths = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
      }
      var isRecursive = false;
      var includeHidden = false;
      if (typeof optionsOrPaths === "string" && optionsOrPaths.startsWith("-")) {
        var options = String(optionsOrPaths).toLowerCase();
        isRecursive = options.includes("r");
        includeHidden = options.includes("a");
      }
      if (Array.isArray(paths)) {
        paths = flattenArray(paths);
      }
      if (typeof optionsOrPaths !== "string" || !optionsOrPaths.startsWith("-")) {
        var pathsFromOptions = [];
        if (Array.isArray(optionsOrPaths)) {
          pathsFromOptions = optionsOrPaths;
        } else if (optionsOrPaths && typeof optionsOrPaths === "string") {
          pathsFromOptions = [optionsOrPaths];
        }
        if (paths === void 0 || paths.length === 0) {
          paths = pathsFromOptions;
        } else {
          paths.push.apply(paths, pathsFromOptions);
        }
      }
      if (paths.length === 0) {
        paths.push(path2.resolve("."));
      }
      var pathsCopy = __spreadArray([], paths, true);
      var preparedPaths = [];
      var fileEntries = [];
      try {
        var remainingPaths = [];
        while (paths.length > 0) {
          var pathEntry = resolve(paths.shift());
          if (pathEntry === null || pathEntry === void 0 ? void 0 : pathEntry.includes("*")) {
            remainingPaths.push(pathEntry);
            continue;
          }
          var stats_2 = fs3.lstatSync(pathEntry);
          if (stats_2.isFile()) {
            var fileName = path2.basename(pathEntry);
            fileEntries.push(fileName);
          } else {
            remainingPaths.push(pathEntry);
          }
        }
        paths.push.apply(paths, remainingPaths);
        var _loop_1 = function() {
          var pathEntry2 = resolve(paths.shift());
          if (pathEntry2 === null || pathEntry2 === void 0 ? void 0 : pathEntry2.includes("*")) {
            paths.push.apply(paths, findMatch(path2.dirname(pathEntry2), [path2.basename(pathEntry2)]));
            return "continue";
          }
          if (fs3.lstatSync(pathEntry2).isDirectory()) {
            preparedPaths.push.apply(preparedPaths, fs3.readdirSync(pathEntry2).map(function(file) {
              return path2.join(pathEntry2, file);
            }));
          } else {
            preparedPaths.push(pathEntry2);
          }
        };
        while (paths.length > 0) {
          _loop_1();
        }
        var entries = [];
        var _loop_2 = function() {
          var entry = preparedPaths.shift();
          var entrybasename = path2.basename(entry);
          if (entry === null || entry === void 0 ? void 0 : entry.includes("*")) {
            preparedPaths.push.apply(preparedPaths, findMatch(path2.dirname(entry), [entrybasename]));
            return "continue";
          }
          if (!includeHidden && entrybasename.startsWith(".") && entrybasename !== "." && entrybasename !== "..") {
            return "continue";
          }
          var baseDir = safeFind(pathsCopy, function(p) {
            return entry.startsWith(path2.resolve(p));
          }) || path2.resolve(".");
          if (fs3.lstatSync(entry).isDirectory() && isRecursive) {
            preparedPaths.push.apply(preparedPaths, fs3.readdirSync(entry).map(function(x) {
              return path2.join(entry, x);
            }));
            entries.push(path2.relative(baseDir, entry));
          } else {
            entries.push(path2.relative(baseDir, entry));
          }
        };
        while (preparedPaths.length > 0) {
          _loop_2();
        }
        var finalResults = __spreadArray(__spreadArray([], fileEntries, true), entries, true);
        return finalResults;
      } catch (error) {
        if (error.code === "ENOENT") {
          throw new Error((0, exports2.loc)("LIB_PathNotFound", "ls", error.message));
        } else {
          throw new Error((0, exports2.loc)("LIB_OperationFailed", "ls", error));
        }
      }
    }
    exports2.ls = ls;
    function flattenArray(arr) {
      return arr.reduce(function(flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
      }, []);
    }
    function cp(sourceOrOptions, destinationOrSource, optionsOrDestination, continueOnError, retryCount) {
      if (continueOnError === void 0) {
        continueOnError = false;
      }
      if (retryCount === void 0) {
        retryCount = 0;
      }
      retry(function() {
        var recursive = false;
        var force = true;
        var source = String(sourceOrOptions);
        var destination = destinationOrSource;
        var options = "";
        if (typeof sourceOrOptions === "string" && sourceOrOptions.startsWith("-")) {
          options = sourceOrOptions.toLowerCase();
          recursive = options.includes("r");
          force = !options.includes("n");
          source = destinationOrSource;
          destination = String(optionsOrDestination);
        } else if (typeof optionsOrDestination === "string" && optionsOrDestination && optionsOrDestination.startsWith("-")) {
          options = optionsOrDestination.toLowerCase();
          recursive = options.includes("r");
          force = !options.includes("n");
          source = String(sourceOrOptions);
          destination = destinationOrSource;
        }
        if (!fs3.existsSync(destination) && !force) {
          throw new Error((0, exports2.loc)("LIB_PathNotFound", "cp", destination));
        }
        var isPattern = /[*?{\[]/.test(source) || /[@+!]\(/.test(source);
        if (isPattern) {
          var defaultRoot = (0, exports2.getVariable)("system.defaultWorkingDirectory") || process.cwd();
          var matches = findMatch(defaultRoot, [source], void 0, { nonegate: true, nocomment: true });
          var resolvedMatches = matches.filter(function(src2) {
            return path2.resolve(src2) !== path2.resolve(source);
          });
          for (var _i = 0, resolvedMatches_1 = resolvedMatches; _i < resolvedMatches_1.length; _i++) {
            var src = resolvedMatches_1[_i];
            cp(src, destination, options, continueOnError, retryCount);
          }
          if (matches.length > 0 && resolvedMatches.length === matches.length) {
            return;
          }
          if (matches.length === 0) {
            (0, exports2.debug)("No matches found for the pattern: ".concat(source, ". Fallback to check for the literal path."));
          }
        }
        var lstatSource = fs3.lstatSync(source);
        if (!recursive && lstatSource.isDirectory()) {
          throw new Error((0, exports2.loc)("LIB_CopyDirectoryWithoutRecursiveOption", source));
        }
        if (!force && fs3.existsSync(destination)) {
          return;
        }
        try {
          if (fs3.existsSync(destination) && fs3.lstatSync(destination).isDirectory()) {
            destination = path2.join(destination, path2.basename(source));
          }
          copyWithPreservedSymlinks(source, destination, force);
        } catch (error) {
          throw new Error((0, exports2.loc)("LIB_OperationFailed", "cp", error));
        }
      }, [], { retryCount, continueOnError });
    }
    exports2.cp = cp;
    var copyWithPreservedSymlinks = function(source, destination, force) {
      var lstatSource = fs3.lstatSync(source);
      if (lstatSource.isSymbolicLink()) {
        var symlinkTarget = fs3.readlinkSync(source);
        if (force && fs3.existsSync(destination)) {
          var destStats = fs3.lstatSync(destination);
          if (destStats.isSymbolicLink()) {
            fs3.unlinkSync(destination);
          } else {
            fs3.rmSync(destination, { recursive: true, force: true });
          }
        }
        fs3.symlinkSync(symlinkTarget, destination);
      } else if (lstatSource.isFile()) {
        if (force) {
          fs3.copyFileSync(source, destination);
        } else {
          fs3.copyFileSync(source, destination, fs3.constants.COPYFILE_EXCL);
        }
      } else {
        var entries = fs3.readdirSync(source, { withFileTypes: true });
        if (!fs3.existsSync(destination)) {
          fs3.mkdirSync(destination, { recursive: true });
        }
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
          var entry = entries_1[_i];
          var srcPath = path2.join(source, entry.name);
          var destPath = path2.join(destination, entry.name);
          copyWithPreservedSymlinks(srcPath, destPath, force);
        }
      }
    };
    function mv(source, dest, options, continueOnError) {
      var force = false;
      if (options && typeof options === "string" && options.startsWith("-")) {
        var lowercasedOptions = String(options).toLowerCase();
        force = lowercasedOptions.includes("f") && !lowercasedOptions.includes("n");
      }
      var sourceExists = fs3.existsSync(source);
      var destExists = fs3.existsSync(dest);
      var sources = [];
      try {
        if (!sourceExists) {
          if (source.includes("*")) {
            sources.push.apply(sources, findMatch(path2.resolve(path2.dirname(source)), [path2.basename(source)]));
          } else {
            throw new Error((0, exports2.loc)("LIB_PathNotFound", "mv", source));
          }
        } else {
          sources.push(source);
        }
        if (destExists && !force) {
          throw new Error("File already exists at ".concat(dest));
        }
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
          var source_1 = sources_1[_i];
          fs3.renameSync(source_1, dest);
        }
      } catch (error) {
        (0, exports2.debug)("mv failed");
        var errMsg = (0, exports2.loc)("LIB_OperationFailed", "mv", error);
        (0, exports2.debug)(errMsg);
        if (!continueOnError) {
          throw new Error(errMsg);
        }
      }
    }
    exports2.mv = mv;
    function retry(func, args, retryOptions) {
      if (retryOptions === void 0) {
        retryOptions = { continueOnError: false, retryCount: 0 };
      }
      while (retryOptions.retryCount >= 0) {
        try {
          return func.apply(void 0, args);
        } catch (e) {
          if (retryOptions.retryCount <= 0) {
            if (retryOptions.continueOnError) {
              (0, exports2.warning)(e, exports2.IssueSource.TaskInternal);
              break;
            } else {
              throw e;
            }
          } else {
            (0, exports2.debug)('Attempt to execute function "'.concat(func === null || func === void 0 ? void 0 : func.name, '" failed, retries left: ').concat(retryOptions.retryCount));
            retryOptions.retryCount--;
          }
        }
      }
    }
    exports2.retry = retry;
    function _getStats(path3, followSymbolicLink, allowBrokenSymbolicLinks) {
      var stats2;
      if (followSymbolicLink) {
        try {
          stats2 = fs3.statSync(path3);
        } catch (err) {
          if (err.code == "ENOENT" && allowBrokenSymbolicLinks) {
            stats2 = fs3.lstatSync(path3);
            (0, exports2.debug)("  ".concat(path3, " (broken symlink)"));
          } else {
            throw err;
          }
        }
      } else {
        stats2 = fs3.lstatSync(path3);
      }
      return stats2;
    }
    function find(findPath, options) {
      if (!findPath) {
        (0, exports2.debug)("no path specified");
        return [];
      }
      findPath = path2.normalize(findPath);
      (0, exports2.debug)("findPath: '".concat(findPath, "'"));
      options = options || _getDefaultFindOptions();
      _debugFindOptions(options);
      try {
        fs3.lstatSync(findPath);
      } catch (err) {
        if (err.code == "ENOENT") {
          (0, exports2.debug)("0 results");
          return [];
        }
        throw err;
      }
      try {
        var result = [];
        var stack = [new _FindItem(findPath, 1)];
        var traversalChain = [];
        var _loop_3 = function() {
          var item = stack.pop();
          var stats_3 = void 0;
          try {
            var isPathToSearch = !result.length;
            var followSpecifiedSymbolicLink = options.followSpecifiedSymbolicLink && isPathToSearch;
            var followSymbolicLink = options.followSymbolicLinks || followSpecifiedSymbolicLink;
            stats_3 = _getStats(item.path, followSymbolicLink, options.allowBrokenSymbolicLinks);
          } catch (err) {
            if (err.code == "ENOENT" && options.skipMissingFiles) {
              (0, exports2.warning)('No such file or directory: "'.concat(item.path, '" - skipping.'), exports2.IssueSource.TaskInternal);
              return "continue";
            }
            throw err;
          }
          result.push(item.path);
          if (stats_3.isDirectory()) {
            (0, exports2.debug)("  ".concat(item.path, " (directory)"));
            if (options.followSymbolicLinks) {
              var realPath_1;
              if (im._isUncPath(item.path)) {
                realPath_1 = retry(fs3.realpathSync, [item.path], { continueOnError: false, retryCount: 5 });
              } else {
                realPath_1 = fs3.realpathSync(item.path);
              }
              while (traversalChain.length >= item.level) {
                traversalChain.pop();
              }
              if (traversalChain.some(function(x) {
                return x == realPath_1;
              })) {
                (0, exports2.debug)("    cycle detected");
                return "continue";
              }
              traversalChain.push(realPath_1);
            }
            var childLevel_1 = item.level + 1;
            var childItems = fs3.readdirSync(item.path).map(function(childName) {
              return new _FindItem(path2.join(item.path, childName), childLevel_1);
            });
            for (var i = childItems.length - 1; i >= 0; i--) {
              stack.push(childItems[i]);
            }
          } else {
            (0, exports2.debug)("  ".concat(item.path, " (file)"));
          }
        };
        while (stack.length) {
          _loop_3();
        }
        (0, exports2.debug)("".concat(result.length, " results"));
        return result;
      } catch (err) {
        throw new Error((0, exports2.loc)("LIB_OperationFailed", "find", err.message));
      }
    }
    exports2.find = find;
    var _FindItem = (
      /** @class */
      /* @__PURE__ */ (function() {
        function _FindItem2(path3, level) {
          this.path = path3;
          this.level = level;
        }
        return _FindItem2;
      })()
    );
    function _debugFindOptions(options) {
      (0, exports2.debug)("findOptions.allowBrokenSymbolicLinks: '".concat(options.allowBrokenSymbolicLinks, "'"));
      (0, exports2.debug)("findOptions.followSpecifiedSymbolicLink: '".concat(options.followSpecifiedSymbolicLink, "'"));
      (0, exports2.debug)("findOptions.followSymbolicLinks: '".concat(options.followSymbolicLinks, "'"));
      (0, exports2.debug)("findOptions.skipMissingFiles: '".concat(options.skipMissingFiles, "'"));
    }
    function _getDefaultFindOptions() {
      return {
        allowBrokenSymbolicLinks: false,
        followSpecifiedSymbolicLink: true,
        followSymbolicLinks: true,
        skipMissingFiles: false
      };
    }
    function legacyFindFiles(rootDirectory, pattern, includeFiles, includeDirectories) {
      if (!pattern) {
        throw new Error("pattern parameter cannot be empty");
      }
      (0, exports2.debug)("legacyFindFiles rootDirectory: '".concat(rootDirectory, "'"));
      (0, exports2.debug)("pattern: '".concat(pattern, "'"));
      (0, exports2.debug)("includeFiles: '".concat(includeFiles, "'"));
      (0, exports2.debug)("includeDirectories: '".concat(includeDirectories, "'"));
      if (!includeFiles && !includeDirectories) {
        includeFiles = true;
      }
      var includePatterns = [];
      var excludePatterns = [];
      pattern = pattern.replace(/;;/g, "\0");
      for (var _i = 0, _a = pattern.split(";"); _i < _a.length; _i++) {
        var pat = _a[_i];
        if (!pat) {
          continue;
        }
        pat = pat.replace(/\0/g, ";");
        var isIncludePattern = void 0;
        if (im._startsWith(pat, "+:")) {
          pat = pat.substring(2);
          isIncludePattern = true;
        } else if (im._startsWith(pat, "-:")) {
          pat = pat.substring(2);
          isIncludePattern = false;
        } else {
          isIncludePattern = true;
        }
        if (im._endsWith(pat, "/") || process.platform == "win32" && im._endsWith(pat, "\\")) {
          throw new Error((0, exports2.loc)("LIB_InvalidPattern", pat));
        }
        if (rootDirectory && !path2.isAbsolute(pat)) {
          pat = path2.join(rootDirectory, pat);
          if (im._endsWith(pat, "\\")) {
            pat = pat.substring(0, pat.length - 1);
          }
        }
        if (isIncludePattern) {
          includePatterns.push(pat);
        } else {
          excludePatterns.push(im._legacyFindFiles_convertPatternToRegExp(pat));
        }
      }
      var count = 0;
      var result = _legacyFindFiles_getMatchingItems(includePatterns, excludePatterns, !!includeFiles, !!includeDirectories);
      (0, exports2.debug)("all matches:");
      for (var _b = 0, result_1 = result; _b < result_1.length; _b++) {
        var resultItem = result_1[_b];
        (0, exports2.debug)(" " + resultItem);
      }
      (0, exports2.debug)("total matched: " + result.length);
      return result;
    }
    exports2.legacyFindFiles = legacyFindFiles;
    function _legacyFindFiles_getMatchingItems(includePatterns, excludePatterns, includeFiles, includeDirectories) {
      (0, exports2.debug)("getMatchingItems()");
      for (var _i = 0, includePatterns_1 = includePatterns; _i < includePatterns_1.length; _i++) {
        var pattern = includePatterns_1[_i];
        (0, exports2.debug)("includePattern: '".concat(pattern, "'"));
      }
      for (var _a = 0, excludePatterns_1 = excludePatterns; _a < excludePatterns_1.length; _a++) {
        var pattern = excludePatterns_1[_a];
        (0, exports2.debug)("excludePattern: ".concat(pattern));
      }
      (0, exports2.debug)("includeFiles: " + includeFiles);
      (0, exports2.debug)("includeDirectories: " + includeDirectories);
      var allFiles = {};
      var _loop_4 = function(pattern2) {
        var findPath = void 0;
        var starIndex = pattern2.indexOf("*");
        var questionIndex = pattern2.indexOf("?");
        if (starIndex < 0 && questionIndex < 0) {
          findPath = im._getDirectoryName(pattern2);
        } else {
          var index = Math.min(starIndex >= 0 ? starIndex : questionIndex, questionIndex >= 0 ? questionIndex : starIndex);
          findPath = im._getDirectoryName(pattern2.substring(0, index));
        }
        if (!findPath) {
          return "continue";
        }
        var patternRegex = im._legacyFindFiles_convertPatternToRegExp(pattern2);
        var items = find(findPath, { followSymbolicLinks: true }).filter(function(item) {
          if (includeFiles && includeDirectories) {
            return true;
          }
          var isDir = fs3.statSync(item).isDirectory();
          return includeFiles && !isDir || includeDirectories && isDir;
        }).forEach(function(item) {
          var normalizedPath = process.platform == "win32" ? item.replace(/\\/g, "/") : item;
          var alternatePath = "".concat(normalizedPath, "/");
          var isMatch = false;
          if (patternRegex.test(normalizedPath) || includeDirectories && patternRegex.test(alternatePath)) {
            isMatch = true;
            for (var _i2 = 0, excludePatterns_2 = excludePatterns; _i2 < excludePatterns_2.length; _i2++) {
              var regex = excludePatterns_2[_i2];
              if (regex.test(normalizedPath) || includeDirectories && regex.test(alternatePath)) {
                isMatch = false;
                break;
              }
            }
          }
          if (isMatch) {
            allFiles[item] = item;
          }
        });
      };
      for (var _b = 0, includePatterns_2 = includePatterns; _b < includePatterns_2.length; _b++) {
        var pattern = includePatterns_2[_b];
        _loop_4(pattern);
      }
      return Object.keys(allFiles).sort();
    }
    function rmRF2(inputPath) {
      (0, exports2.debug)("rm -rf " + inputPath);
      if (getPlatform() == Platform.Windows) {
        try {
          var lstats = fs3.lstatSync(inputPath);
          if (lstats.isDirectory() && !lstats.isSymbolicLink()) {
            (0, exports2.debug)("removing directory " + inputPath);
            childProcess.execFileSync("cmd.exe", ["/c", "rd", "/s", "/q", im._normalizeSeparators(inputPath)]);
          } else if (lstats.isSymbolicLink()) {
            (0, exports2.debug)("removing symbolic link " + inputPath);
            var realPath = fs3.readlinkSync(inputPath);
            if (fs3.existsSync(realPath)) {
              var stats_4 = fs3.statSync(realPath);
              if (stats_4.isDirectory()) {
                childProcess.execFileSync("cmd.exe", ["/c", "rd", "/s", "/q", im._normalizeSeparators(realPath)]);
                fs3.unlinkSync(inputPath);
              } else {
                fs3.unlinkSync(inputPath);
              }
            } else {
              (0, exports2.debug)("Symbolic link '".concat(inputPath, "' points to a non-existing target '").concat(realPath, "'. Removing the symbolic link."));
              fs3.unlinkSync(inputPath);
            }
          } else {
            (0, exports2.debug)("removing file " + inputPath);
            childProcess.execFileSync("cmd.exe", ["/c", "del", "/f", "/a", im._normalizeSeparators(inputPath)]);
          }
        } catch (err) {
          (0, exports2.debug)("Error: " + err.message);
          if (err.code != "ENOENT") {
            throw new Error((0, exports2.loc)("LIB_OperationFailed", "rmRF", err.message));
          }
        }
      } else {
        var lstats = void 0;
        try {
          if (inputPath.includes("*")) {
            var entries = findMatch(path2.dirname(inputPath), [path2.basename(inputPath)]);
            for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
              var entry = entries_2[_i];
              rmRF2(entry);
            }
          } else {
            lstats = fs3.lstatSync(inputPath);
            if (lstats.isDirectory() && !lstats.isSymbolicLink()) {
              (0, exports2.debug)("removing directory " + inputPath);
              fs3.rmSync(inputPath, { recursive: true, force: true });
            } else if (lstats.isSymbolicLink()) {
              (0, exports2.debug)("removing symbolic link " + inputPath);
              var realPath = fs3.readlinkSync(inputPath);
              if (fs3.existsSync(realPath)) {
                var stats_5 = fs3.statSync(realPath);
                if (stats_5.isDirectory()) {
                  fs3.rmSync(realPath, { recursive: true, force: true });
                  fs3.unlinkSync(inputPath);
                } else {
                  fs3.unlinkSync(inputPath);
                }
              } else {
                (0, exports2.debug)("Symbolic link '".concat(inputPath, "' points to a non-existing target '").concat(realPath, "'. Removing the symbolic link."));
                fs3.unlinkSync(inputPath);
              }
            } else {
              (0, exports2.debug)("removing file " + inputPath);
              fs3.unlinkSync(inputPath);
            }
          }
        } catch (err) {
          (0, exports2.debug)("Error: " + err.message);
          if (err.code != "ENOENT") {
            throw new Error((0, exports2.loc)("LIB_OperationFailed", "rmRF", err.message));
          }
        }
      }
    }
    exports2.rmRF = rmRF2;
    function execAsync(tool2, args, options) {
      var tr = this.tool(tool2);
      if (args) {
        if (args instanceof Array) {
          tr.arg(args);
        } else if (typeof args === "string") {
          tr.line(args);
        }
      }
      return tr.execAsync(options);
    }
    exports2.execAsync = execAsync;
    function exec2(tool2, args, options) {
      var tr = this.tool(tool2);
      if (args) {
        if (args instanceof Array) {
          tr.arg(args);
        } else if (typeof args === "string") {
          tr.line(args);
        }
      }
      return tr.exec(options);
    }
    exports2.exec = exec2;
    function execSync(tool2, args, options) {
      var tr = this.tool(tool2);
      if (args) {
        if (args instanceof Array) {
          tr.arg(args);
        } else if (typeof args === "string") {
          tr.line(args);
        }
      }
      return tr.execSync(options);
    }
    exports2.execSync = execSync;
    function tool(tool2) {
      var tr = new trm.ToolRunner(tool2);
      tr.on("debug", function(message) {
        (0, exports2.debug)(message);
      });
      return tr;
    }
    exports2.tool = tool;
    function match(list, patterns, patternRoot, options) {
      (0, exports2.debug)("patternRoot: '".concat(patternRoot, "'"));
      options = options || _getDefaultMatchOptions();
      _debugMatchOptions(options);
      if (typeof patterns == "string") {
        patterns = [patterns];
      }
      var map = {};
      var originalOptions = options;
      for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
        var pattern = patterns_1[_i];
        (0, exports2.debug)("pattern: '".concat(pattern, "'"));
        pattern = (pattern || "").trim();
        if (!pattern) {
          (0, exports2.debug)("skipping empty pattern");
          continue;
        }
        var options_1 = im._cloneMatchOptions(originalOptions);
        if (!options_1.nocomment && im._startsWith(pattern, "#")) {
          (0, exports2.debug)("skipping comment");
          continue;
        }
        options_1.nocomment = true;
        var negateCount = 0;
        if (!options_1.nonegate) {
          while (pattern.charAt(negateCount) == "!") {
            negateCount++;
          }
          pattern = pattern.substring(negateCount);
          if (negateCount) {
            (0, exports2.debug)("trimmed leading '!'. pattern: '".concat(pattern, "'"));
          }
        }
        var isIncludePattern = negateCount == 0 || negateCount % 2 == 0 && !options_1.flipNegate || negateCount % 2 == 1 && options_1.flipNegate;
        options_1.nonegate = true;
        options_1.flipNegate = false;
        var expanded = void 0;
        var preExpanded = pattern;
        if (options_1.nobrace) {
          expanded = [pattern];
        } else {
          (0, exports2.debug)("expanding braces");
          var convertedPattern = process.platform == "win32" ? pattern.replace(/\\/g, "/") : pattern;
          expanded = minimatch.braceExpand(convertedPattern);
        }
        options_1.nobrace = true;
        for (var _a = 0, expanded_1 = expanded; _a < expanded_1.length; _a++) {
          var pattern_1 = expanded_1[_a];
          if (expanded.length != 1 || pattern_1 != preExpanded) {
            (0, exports2.debug)("pattern: '".concat(pattern_1, "'"));
          }
          pattern_1 = (pattern_1 || "").trim();
          if (!pattern_1) {
            (0, exports2.debug)("skipping empty pattern");
            continue;
          }
          if (patternRoot && // patternRoot supplied
          !im._isRooted(pattern_1) && // AND pattern not rooted
          // AND matchBase:false or not basename only
          (!options_1.matchBase || (process.platform == "win32" ? pattern_1.replace(/\\/g, "/") : pattern_1).indexOf("/") >= 0)) {
            pattern_1 = im._ensureRooted(patternRoot, pattern_1);
            (0, exports2.debug)("rooted pattern: '".concat(pattern_1, "'"));
          }
          if (isIncludePattern) {
            (0, exports2.debug)("applying include pattern against original list");
            var matchResults = minimatch.match(list, pattern_1, options_1);
            (0, exports2.debug)(matchResults.length + " matches");
            for (var _b = 0, matchResults_1 = matchResults; _b < matchResults_1.length; _b++) {
              var matchResult = matchResults_1[_b];
              map[matchResult] = true;
            }
          } else {
            (0, exports2.debug)("applying exclude pattern against original list");
            var matchResults = minimatch.match(list, pattern_1, options_1);
            (0, exports2.debug)(matchResults.length + " matches");
            for (var _c = 0, matchResults_2 = matchResults; _c < matchResults_2.length; _c++) {
              var matchResult = matchResults_2[_c];
              delete map[matchResult];
            }
          }
        }
      }
      var result = list.filter(function(item) {
        return map.hasOwnProperty(item);
      });
      (0, exports2.debug)(result.length + " final results");
      return result;
    }
    exports2.match = match;
    function filter(pattern, options) {
      options = options || _getDefaultMatchOptions();
      return minimatch.filter(pattern, options);
    }
    exports2.filter = filter;
    function _debugMatchOptions(options) {
      (0, exports2.debug)("matchOptions.debug: '".concat(options.debug, "'"));
      (0, exports2.debug)("matchOptions.nobrace: '".concat(options.nobrace, "'"));
      (0, exports2.debug)("matchOptions.noglobstar: '".concat(options.noglobstar, "'"));
      (0, exports2.debug)("matchOptions.dot: '".concat(options.dot, "'"));
      (0, exports2.debug)("matchOptions.noext: '".concat(options.noext, "'"));
      (0, exports2.debug)("matchOptions.nocase: '".concat(options.nocase, "'"));
      (0, exports2.debug)("matchOptions.nonull: '".concat(options.nonull, "'"));
      (0, exports2.debug)("matchOptions.matchBase: '".concat(options.matchBase, "'"));
      (0, exports2.debug)("matchOptions.nocomment: '".concat(options.nocomment, "'"));
      (0, exports2.debug)("matchOptions.nonegate: '".concat(options.nonegate, "'"));
      (0, exports2.debug)("matchOptions.flipNegate: '".concat(options.flipNegate, "'"));
    }
    function _getDefaultMatchOptions() {
      return {
        debug: false,
        nobrace: true,
        noglobstar: false,
        dot: true,
        noext: false,
        nocase: process.platform == "win32",
        nonull: false,
        matchBase: false,
        nocomment: false,
        nonegate: false,
        flipNegate: false
      };
    }
    function findMatch(defaultRoot, patterns, findOptions, matchOptions) {
      defaultRoot = defaultRoot || this.getVariable("system.defaultWorkingDirectory") || process.cwd();
      (0, exports2.debug)("defaultRoot: '".concat(defaultRoot, "'"));
      patterns = patterns || [];
      patterns = typeof patterns == "string" ? [patterns] : patterns;
      findOptions = findOptions || _getDefaultFindOptions();
      _debugFindOptions(findOptions);
      matchOptions = matchOptions || _getDefaultMatchOptions();
      _debugMatchOptions(matchOptions);
      defaultRoot = im._normalizeSeparators(defaultRoot);
      var results = {};
      var originalMatchOptions = matchOptions;
      for (var _i = 0, _a = patterns || []; _i < _a.length; _i++) {
        var pattern = _a[_i];
        (0, exports2.debug)("pattern: '".concat(pattern, "'"));
        pattern = (pattern || "").trim();
        if (!pattern) {
          (0, exports2.debug)("skipping empty pattern");
          continue;
        }
        var matchOptions_1 = im._cloneMatchOptions(originalMatchOptions);
        if (!matchOptions_1.nocomment && im._startsWith(pattern, "#")) {
          (0, exports2.debug)("skipping comment");
          continue;
        }
        matchOptions_1.nocomment = true;
        var negateCount = 0;
        if (!matchOptions_1.nonegate) {
          while (pattern.charAt(negateCount) == "!") {
            negateCount++;
          }
          pattern = pattern.substring(negateCount);
          if (negateCount) {
            (0, exports2.debug)("trimmed leading '!'. pattern: '".concat(pattern, "'"));
          }
        }
        var isIncludePattern = negateCount == 0 || negateCount % 2 == 0 && !matchOptions_1.flipNegate || negateCount % 2 == 1 && matchOptions_1.flipNegate;
        matchOptions_1.nonegate = true;
        matchOptions_1.flipNegate = false;
        var expanded = void 0;
        var preExpanded = pattern;
        if (matchOptions_1.nobrace) {
          expanded = [pattern];
        } else {
          (0, exports2.debug)("expanding braces");
          var convertedPattern = process.platform == "win32" ? pattern.replace(/\\/g, "/") : pattern;
          expanded = minimatch.braceExpand(convertedPattern);
        }
        matchOptions_1.nobrace = true;
        for (var _b = 0, expanded_2 = expanded; _b < expanded_2.length; _b++) {
          var pattern_2 = expanded_2[_b];
          if (expanded.length != 1 || pattern_2 != preExpanded) {
            (0, exports2.debug)("pattern: '".concat(pattern_2, "'"));
          }
          pattern_2 = (pattern_2 || "").trim();
          if (!pattern_2) {
            (0, exports2.debug)("skipping empty pattern");
            continue;
          }
          if (isIncludePattern) {
            var findInfo = im._getFindInfoFromPattern(defaultRoot, pattern_2, matchOptions_1);
            var findPath = findInfo.findPath;
            (0, exports2.debug)("findPath: '".concat(findPath, "'"));
            if (!findPath) {
              (0, exports2.debug)("skipping empty path");
              continue;
            }
            (0, exports2.debug)("statOnly: '".concat(findInfo.statOnly, "'"));
            var findResults = [];
            if (findInfo.statOnly) {
              try {
                fs3.statSync(findPath);
                findResults.push(findPath);
              } catch (err) {
                if (err.code != "ENOENT") {
                  throw err;
                }
                (0, exports2.debug)("ENOENT");
              }
            } else {
              findResults = find(findPath, findOptions);
            }
            (0, exports2.debug)("found ".concat(findResults.length, " paths"));
            (0, exports2.debug)("applying include pattern");
            if (findInfo.adjustedPattern != pattern_2) {
              (0, exports2.debug)("adjustedPattern: '".concat(findInfo.adjustedPattern, "'"));
              pattern_2 = findInfo.adjustedPattern;
            }
            var matchResults = minimatch.match(findResults, pattern_2, matchOptions_1);
            (0, exports2.debug)(matchResults.length + " matches");
            for (var _c = 0, matchResults_3 = matchResults; _c < matchResults_3.length; _c++) {
              var matchResult = matchResults_3[_c];
              var key = process.platform == "win32" ? matchResult.toUpperCase() : matchResult;
              results[key] = matchResult;
            }
          } else {
            if (matchOptions_1.matchBase && !im._isRooted(pattern_2) && (process.platform == "win32" ? pattern_2.replace(/\\/g, "/") : pattern_2).indexOf("/") < 0) {
              (0, exports2.debug)("matchBase and basename only");
            } else {
              pattern_2 = im._ensurePatternRooted(defaultRoot, pattern_2);
              (0, exports2.debug)("after ensurePatternRooted, pattern: '".concat(pattern_2, "'"));
            }
            (0, exports2.debug)("applying exclude pattern");
            var matchResults = minimatch.match(Object.keys(results).map(function(key2) {
              return results[key2];
            }), pattern_2, matchOptions_1);
            (0, exports2.debug)(matchResults.length + " matches");
            for (var _d = 0, matchResults_4 = matchResults; _d < matchResults_4.length; _d++) {
              var matchResult = matchResults_4[_d];
              var key = process.platform == "win32" ? matchResult.toUpperCase() : matchResult;
              delete results[key];
            }
          }
        }
      }
      var finalResult = Object.keys(results).map(function(key2) {
        return results[key2];
      }).sort();
      (0, exports2.debug)(finalResult.length + " final results");
      return finalResult;
    }
    exports2.findMatch = findMatch;
    function getProxyFormattedUrl(proxyUrl, proxyUsername, proxyPassword) {
      var parsedUrl = new URL(proxyUrl);
      var proxyAddress = "".concat(parsedUrl.protocol, "//").concat(parsedUrl.host);
      if (proxyUsername) {
        proxyAddress = "".concat(parsedUrl.protocol, "//").concat(proxyUsername, ":").concat(proxyPassword, "@").concat(parsedUrl.host);
      }
      return proxyAddress;
    }
    function getHttpProxyConfiguration(requestUrl) {
      var proxyUrl = (0, exports2.getVariable)("Agent.ProxyUrl");
      if (proxyUrl && proxyUrl.length > 0) {
        var proxyUsername = (0, exports2.getVariable)("Agent.ProxyUsername");
        var proxyPassword = (0, exports2.getVariable)("Agent.ProxyPassword");
        var proxyBypassHosts = JSON.parse((0, exports2.getVariable)("Agent.ProxyBypassList") || "[]");
        var bypass_1 = false;
        if (requestUrl) {
          proxyBypassHosts.forEach(function(bypassHost) {
            if (new RegExp(bypassHost, "i").test(requestUrl)) {
              bypass_1 = true;
            }
          });
        }
        if (bypass_1) {
          return null;
        } else {
          var proxyAddress = getProxyFormattedUrl(proxyUrl, proxyUsername, proxyPassword);
          return {
            proxyUrl,
            proxyUsername,
            proxyPassword,
            proxyBypassHosts,
            proxyFormattedUrl: proxyAddress
          };
        }
      } else {
        return null;
      }
    }
    exports2.getHttpProxyConfiguration = getHttpProxyConfiguration;
    function getHttpCertConfiguration() {
      var ca = (0, exports2.getVariable)("Agent.CAInfo");
      var clientCert = (0, exports2.getVariable)("Agent.ClientCert");
      if (ca || clientCert) {
        var certConfig = {};
        certConfig.caFile = ca;
        certConfig.certFile = clientCert;
        if (clientCert) {
          var clientCertKey = (0, exports2.getVariable)("Agent.ClientCertKey");
          var clientCertArchive = (0, exports2.getVariable)("Agent.ClientCertArchive");
          var clientCertPassword = (0, exports2.getVariable)("Agent.ClientCertPassword");
          certConfig.keyFile = clientCertKey;
          certConfig.certArchiveFile = clientCertArchive;
          certConfig.passphrase = clientCertPassword;
        }
        return certConfig;
      } else {
        return null;
      }
    }
    exports2.getHttpCertConfiguration = getHttpCertConfiguration;
    var TestPublisher = (
      /** @class */
      (function() {
        function TestPublisher2(testRunner) {
          this.testRunner = testRunner;
        }
        TestPublisher2.prototype.publish = function(resultFiles, mergeResults, platform, config, runTitle, publishRunAttachments, testRunSystem) {
          testRunSystem = testRunSystem || "VSTSTask";
          var properties = {};
          properties["type"] = this.testRunner;
          if (mergeResults) {
            properties["mergeResults"] = mergeResults;
          }
          if (platform) {
            properties["platform"] = platform;
          }
          if (config) {
            properties["config"] = config;
          }
          if (runTitle) {
            properties["runTitle"] = runTitle;
          }
          if (publishRunAttachments) {
            properties["publishRunAttachments"] = publishRunAttachments;
          }
          if (resultFiles) {
            properties["resultFiles"] = Array.isArray(resultFiles) ? resultFiles.join() : resultFiles;
          }
          properties["testRunSystem"] = testRunSystem;
          (0, exports2.command)("results.publish", properties, "");
        };
        return TestPublisher2;
      })()
    );
    exports2.TestPublisher = TestPublisher;
    var CodeCoveragePublisher = (
      /** @class */
      (function() {
        function CodeCoveragePublisher2() {
        }
        CodeCoveragePublisher2.prototype.publish = function(codeCoverageTool, summaryFileLocation, reportDirectory, additionalCodeCoverageFiles) {
          var properties = {};
          if (codeCoverageTool) {
            properties["codecoveragetool"] = codeCoverageTool;
          }
          if (summaryFileLocation) {
            properties["summaryfile"] = summaryFileLocation;
          }
          if (reportDirectory) {
            properties["reportdirectory"] = reportDirectory;
          }
          if (additionalCodeCoverageFiles) {
            properties["additionalcodecoveragefiles"] = Array.isArray(additionalCodeCoverageFiles) ? additionalCodeCoverageFiles.join() : additionalCodeCoverageFiles;
          }
          (0, exports2.command)("codecoverage.publish", properties, "");
        };
        return CodeCoveragePublisher2;
      })()
    );
    exports2.CodeCoveragePublisher = CodeCoveragePublisher;
    var CodeCoverageEnabler = (
      /** @class */
      (function() {
        function CodeCoverageEnabler2(buildTool, ccTool) {
          this.buildTool = buildTool;
          this.ccTool = ccTool;
        }
        CodeCoverageEnabler2.prototype.enableCodeCoverage = function(buildProps) {
          buildProps["buildtool"] = this.buildTool;
          buildProps["codecoveragetool"] = this.ccTool;
          (0, exports2.command)("codecoverage.enable", buildProps, "");
        };
        return CodeCoverageEnabler2;
      })()
    );
    exports2.CodeCoverageEnabler = CodeCoverageEnabler;
    function uploadFile(path3) {
      (0, exports2.command)("task.uploadfile", null, path3);
    }
    exports2.uploadFile = uploadFile;
    function prependPath2(path3) {
      assertAgent("2.115.0");
      (0, exports2.command)("task.prependpath", null, path3);
    }
    exports2.prependPath = prependPath2;
    function uploadSummary(path3) {
      (0, exports2.command)("task.uploadsummary", null, path3);
    }
    exports2.uploadSummary = uploadSummary;
    function addAttachment(type, name, path3) {
      (0, exports2.command)("task.addattachment", { "type": type, "name": name }, path3);
    }
    exports2.addAttachment = addAttachment;
    function setEndpoint(id, field, key, value) {
      (0, exports2.command)("task.setendpoint", { "id": id, "field": FieldType[field].toLowerCase(), "key": key }, value);
    }
    exports2.setEndpoint = setEndpoint;
    function setProgress(percent, currentOperation) {
      (0, exports2.command)("task.setprogress", { "value": "".concat(percent) }, currentOperation);
    }
    exports2.setProgress = setProgress;
    function logDetail(id, message, parentId, recordType, recordName, order, startTime, finishTime, progress, state, result) {
      var properties = {
        "id": id,
        "parentid": parentId,
        "type": recordType,
        "name": recordName,
        "order": order ? order.toString() : void 0,
        "starttime": startTime,
        "finishtime": finishTime,
        "progress": progress ? progress.toString() : void 0,
        "state": state ? TaskState[state] : void 0,
        "result": result ? TaskResult2[result] : void 0
      };
      (0, exports2.command)("task.logdetail", properties, message);
    }
    exports2.logDetail = logDetail;
    function logIssue(type, message, sourcePath, lineNumber, columnNumber, errorCode) {
      var properties = {
        "type": IssueType[type].toLowerCase(),
        "code": errorCode,
        "sourcepath": sourcePath,
        "linenumber": lineNumber ? lineNumber.toString() : void 0,
        "columnnumber": columnNumber ? columnNumber.toString() : void 0
      };
      (0, exports2.command)("task.logissue", properties, message);
    }
    exports2.logIssue = logIssue;
    function uploadArtifact(containerFolder, path3, name) {
      (0, exports2.command)("artifact.upload", { "containerfolder": containerFolder, "artifactname": name }, path3);
    }
    exports2.uploadArtifact = uploadArtifact;
    function associateArtifact(name, path3, artifactType) {
      (0, exports2.command)("artifact.associate", { "type": ArtifactType[artifactType].toLowerCase(), "artifactname": name }, path3);
    }
    exports2.associateArtifact = associateArtifact;
    function uploadBuildLog(path3) {
      (0, exports2.command)("build.uploadlog", null, path3);
    }
    exports2.uploadBuildLog = uploadBuildLog;
    function updateBuildNumber(value) {
      (0, exports2.command)("build.updatebuildnumber", null, value);
    }
    exports2.updateBuildNumber = updateBuildNumber;
    function addBuildTag(value) {
      (0, exports2.command)("build.addbuildtag", null, value);
    }
    exports2.addBuildTag = addBuildTag;
    function updateReleaseName(name) {
      assertAgent("2.132.0");
      (0, exports2.command)("release.updatereleasename", null, name);
    }
    exports2.updateReleaseName = updateReleaseName;
    exports2.TaskCommand = tcm.TaskCommand;
    exports2.commandFromString = tcm.commandFromString;
    exports2.ToolRunner = trm.ToolRunner;
    if (semver.lt(process.versions.node, "4.2.0")) {
      (0, exports2.warning)("Tasks require a new agent.  Upgrade your agent or node to 4.2.0 or later", exports2.IssueSource.TaskInternal);
    }
    if (!global["_vsts_task_lib_loaded"]) {
      im._loadData();
      im._exposeProxySettings();
      im._exposeCertSettings();
    }
    function safeFind(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
          return arr[i];
        }
      }
      return void 0;
    }
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
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
    var utilInspect = require_util_inspect();
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
    module2.exports = function inspect_(obj, options, depth, seen) {
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
      function inspect(value, from, noIndent) {
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
        var keys = arrObjKeys(obj, inspect);
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
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
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
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
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
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
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
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
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
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "node_modules/side-channel-list/index.js"(exports2, module2) {
    "use strict";
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = function(list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */
            list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    };
    var listDelete = function(objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    };
    module2.exports = function getSideChannelList() {
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          var deletedNode = listDelete($o, key);
          if (deletedNode && $o && !$o.next) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function(key) {
          return listGet($o, key);
        },
        has: function(key) {
          return listHas($o, key);
        },
        set: function(key, value) {
          if (!$o) {
            $o = {
              next: void 0
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        }
      };
      return channel;
    };
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = /* @__PURE__ */ Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? (function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    })() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "node_modules/side-channel-map/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module2.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
    function getSideChannelMap() {
      var $m;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          if ($m) {
            var result = $mapDelete($m, key);
            if ($mapSize($m) === 0) {
              $m = void 0;
            }
            return result;
          }
          return false;
        },
        get: function(key) {
          if ($m) {
            return $mapGet($m, key);
          }
        },
        has: function(key) {
          if ($m) {
            return $mapHas($m, key);
          }
          return false;
        },
        set: function(key, value) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "node_modules/side-channel-weakmap/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module2.exports = $WeakMap ? (
      /** @type {Exclude<import('.'), false>} */
      function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapDelete($wm, key);
              }
            } else if (getSideChannelMap) {
              if ($m) {
                return $m["delete"](key);
              }
            }
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            }
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            }
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) {
                $m = getSideChannelMap();
              }
              $m.set(key, value);
            }
          }
        };
        return channel;
      }
    ) : getSideChannelMap;
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module2.exports = function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            var keyDesc = key && Object(key) === key ? "the given object key" : inspect(key);
            throw new $TypeError("Side channel does not contain " + keyDesc);
          }
        },
        "delete": function(key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function(key) {
          return $channelData && $channelData.get(key);
        },
        has: function(key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function(key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var getSideChannel = require_side_channel();
    var defineProperty = require_es_define_property();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var overflowChannel = getSideChannel();
    var markOverflow = function markOverflow2(obj, maxIndex) {
      overflowChannel.set(obj, maxIndex);
      return obj;
    };
    var isOverflow = function isOverflow2(obj) {
      return overflowChannel.has(obj);
    };
    var getMaxIndex = function getMaxIndex2(obj) {
      return overflowChannel.get(obj);
    };
    var setMaxIndex = function setMaxIndex2(obj, maxIndex) {
      overflowChannel.set(obj, maxIndex);
    };
    var hexTable = (function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array[array.length] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
      }
      return array;
    })();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted[compacted.length] = obj[j];
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? { __proto__: null } : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var setProperty = function setProperty2(obj, key, value) {
      if (key === "__proto__" && defineProperty) {
        defineProperty(obj, key, {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      } else {
        obj[key] = value;
      }
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object" && typeof source !== "function") {
        if (isArray(target)) {
          var nextIndex = target.length;
          if (options && typeof options.arrayLimit === "number" && nextIndex >= options.arrayLimit) {
            if (options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            return markOverflow(arrayToObject(target.concat(source), options), nextIndex);
          }
          target[nextIndex] = source;
        } else if (target && typeof target === "object") {
          if (isOverflow(target)) {
            var newIndex = getMaxIndex(target) + 1;
            target[newIndex] = source;
            setMaxIndex(target, newIndex);
          } else if (options && options.strictMerge) {
            return [target, source];
          } else if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        if (isOverflow(source)) {
          var sourceKeys = Object.keys(source);
          var result = options && options.plainObjects ? { __proto__: null, 0: target } : { 0: target };
          for (var m = 0; m < sourceKeys.length; m++) {
            var oldKey = parseInt(sourceKeys[m], 10);
            result[oldKey + 1] = source[sourceKeys[m]];
          }
          return markOverflow(result, getMaxIndex(source) + 1);
        }
        var combined = [target].concat(source);
        if (options && typeof options.arrayLimit === "number" && combined.length > options.arrayLimit) {
          if (options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          }
          return markOverflow(arrayToObject(combined, options), combined.length - 1);
        }
        return combined;
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target[target.length] = item;
            }
          } else {
            target[i] = item;
          }
        });
        if (options && typeof options.arrayLimit === "number" && target.length > options.arrayLimit) {
          if (options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          }
          return markOverflow(arrayToObject(target, options), target.length - 1);
        }
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          setProperty(acc, key, merge2(acc[key], value, options));
        } else {
          setProperty(acc, key, value);
        }
        if (isOverflow(source) && !isOverflow(acc)) {
          markOverflow(acc, getMaxIndex(source));
        }
        if (isOverflow(acc)) {
          var keyNum = parseInt(key, 10);
          if (String(keyNum) === key && keyNum >= 0 && keyNum > getMaxIndex(acc)) {
            setMaxIndex(acc, keyNum);
          }
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        setProperty(acc, key, source[key]);
        return acc;
      }, target);
    };
    var decode = function(str, defaultDecoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        if (j + limit < string.length) {
          var last = segment.charCodeAt(segment.length - 1);
          if (last >= 55296 && last <= 56319) {
            segment = segment.slice(0, -1);
            j -= 1;
          }
        }
        var arr = [];
        for (var i = 0; i < segment.length; ++i) {
          var c = segment.charCodeAt(i);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hexTable[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = getSideChannel();
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && !refs.has(val)) {
            queue[queue.length] = { obj, prop: key };
            refs.set(val, true);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b, arrayLimit, plainObjects, throwOnLimitExceeded) {
      if (isOverflow(a)) {
        if (throwOnLimitExceeded) {
          throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        var newIndex = getMaxIndex(a) + 1;
        a[newIndex] = b;
        setMaxIndex(a, newIndex);
        return a;
      }
      var result = [].concat(a, b);
      if (result.length > arrayLimit) {
        if (throwOnLimitExceeded) {
          throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        return markOverflow(arrayToObject(result, { plainObjects }), result.length - 1);
      }
      return result;
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped[mapped.length] = fn(val[i]);
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isOverflow,
      isRegExp,
      markOverflow,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      commaRoundTrip: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      filter: void 0,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return formatter(encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix);
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, function(v) {
            return v == null ? v : encoder(v);
          });
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
      if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (typeof key === "undefined" || key === null) {
          continue;
        }
        var value = obj[key];
        if (options.skipNulls && value === null) {
          continue;
        }
        pushToArray(keys, stringify(
          value,
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B" + options.delimiter;
        } else {
          prefix += "utf8=%E2%9C%93" + options.delimiter;
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictMerge: true,
      strictNullHandling: false,
      throwOnLimitExceeded: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options, currentArrayLength, isFlatArrayValue) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        if (isFlatArrayValue && options.throwOnLimitExceeded) {
          var commaCount = 0;
          var commaIndex = val.indexOf(",");
          while (commaIndex > -1) {
            commaCount += 1;
            if (commaCount >= options.arrayLimit) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            commaIndex = val.indexOf(",", commaIndex + 1);
          }
        }
        return val.split(",");
      }
      if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
        throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(
        options.delimiter,
        options.throwOnLimitExceeded && typeof limit !== "undefined" ? limit + 1 : limit
      );
      if (options.throwOnLimitExceeded && typeof limit !== "undefined" && parts.length > limit) {
        throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
      }
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key;
        var val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          if (key !== null) {
            val = utils.maybeMap(
              parseArrayValue(
                part.slice(pos + 1),
                options,
                isArray(obj[key]) ? obj[key].length : 0,
                part.indexOf("[]=") === -1
              ),
              function(encodedVal) {
                return options.decoder(encodedVal, defaults.decoder, charset, "value");
              }
            );
          }
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(String(val));
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (options.comma && isArray(val) && val.length > options.arrayLimit) {
          val = utils.combine([], val, options.arrayLimit, options.plainObjects, options.throwOnLimitExceeded);
        }
        if (key !== null) {
          var existing = has.call(obj, key);
          if (existing && (options.duplicates === "combine" || part.indexOf("[]=") > -1)) {
            obj[key] = utils.combine(
              obj[key],
              val,
              options.arrayLimit,
              options.plainObjects,
              options.throwOnLimitExceeded
            );
          } else if (!existing || options.duplicates === "last") {
            obj[key] = val;
          }
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var currentArrayLength = 0;
      if (chain.length > 0 && chain[chain.length - 1] === "[]") {
        var parentKey = chain.slice(0, -1).join("");
        currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
      }
      var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          if (utils.isOverflow(leaf)) {
            obj = leaf;
          } else {
            obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine(
              [],
              leaf,
              options.arrayLimit,
              options.plainObjects,
              options.throwOnLimitExceeded
            );
          }
        } else {
          obj = options.plainObjects ? { __proto__: null } : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          var isValidArrayIndex = !isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays;
          if (!options.parseArrays && decodedRoot === "") {
            obj = { 0: leaf };
          } else if (isValidArrayIndex && index < options.arrayLimit) {
            obj = [];
            obj[index] = leaf;
          } else if (isValidArrayIndex && options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          } else if (isValidArrayIndex) {
            obj[index] = leaf;
            utils.markOverflow(obj, index);
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var splitKeyIntoSegments = function splitKeyIntoSegments2(originalKey, options) {
      var key = options.allowDots ? originalKey.replace(/\.([^.[]+)/g, "[$1]") : originalKey;
      if (options.depth <= 0) {
        if (!options.plainObjects && has.call(Object.prototype, key)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        return [key];
      }
      var segments = [];
      var first = key.indexOf("[");
      var parent = first >= 0 ? key.slice(0, first) : key;
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        segments[segments.length] = parent;
      }
      var n = key.length;
      var open = first;
      var collected = 0;
      while (open >= 0 && collected < options.depth) {
        var level = 1;
        var i = open + 1;
        var close = -1;
        while (i < n && close < 0) {
          var cu = key.charCodeAt(i);
          if (cu === 91) {
            level += 1;
          } else if (cu === 93) {
            level -= 1;
            if (level === 0) {
              close = i;
            }
          }
          i += 1;
        }
        if (close < 0) {
          segments[segments.length] = "[" + key.slice(open) + "]";
          return segments;
        }
        var seg = key.slice(open, close + 1);
        var content = seg.slice(1, -1);
        if (!options.plainObjects && has.call(Object.prototype, content) && !options.allowPrototypes) {
          return;
        }
        segments[segments.length] = seg;
        collected += 1;
        open = key.indexOf("[", close + 1);
      }
      if (open >= 0) {
        if (options.strictDepth === true) {
          throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
        }
        segments[segments.length] = "[" + key.slice(open) + "]";
      }
      return segments;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var keys = splitKeyIntoSegments(givenKey, options);
      if (!keys) {
        return;
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
      if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
        throw new TypeError("The duplicates option must be either combine, first, or last");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
        strictMerge: typeof opts.strictMerge === "boolean" ? !!opts.strictMerge : defaults.strictMerge,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
        throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? { __proto__: null } : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? { __proto__: null } : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/typed-rest-client/Util.js
var require_Util = __commonJS({
  "node_modules/typed-rest-client/Util.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : new P(function(resolve2) {
            resolve2(result.value);
          }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var qs = require_lib();
    var url = require("url");
    var path2 = require("path");
    var zlib = require("zlib");
    function getUrl(resource, baseUrl, queryParams) {
      const pathApi = path2.posix || path2;
      let requestUrl = "";
      if (!baseUrl) {
        requestUrl = resource;
      } else if (!resource) {
        requestUrl = baseUrl;
      } else {
        const base = url.parse(baseUrl);
        const resultantUrl = url.parse(resource);
        resultantUrl.protocol = resultantUrl.protocol || base.protocol;
        resultantUrl.auth = resultantUrl.auth || base.auth;
        resultantUrl.host = resultantUrl.host || base.host;
        resultantUrl.pathname = pathApi.resolve(base.pathname, resultantUrl.pathname);
        if (!resultantUrl.pathname.endsWith("/") && resource.endsWith("/")) {
          resultantUrl.pathname += "/";
        }
        requestUrl = url.format(resultantUrl);
      }
      return queryParams ? getUrlWithParsedQueryParams(requestUrl, queryParams) : requestUrl;
    }
    exports2.getUrl = getUrl;
    function getUrlWithParsedQueryParams(requestUrl, queryParams) {
      const url2 = requestUrl.replace(/\?$/g, "");
      const parsedQueryParams = qs.stringify(queryParams.params, buildParamsStringifyOptions(queryParams));
      return `${url2}${parsedQueryParams}`;
    }
    function buildParamsStringifyOptions(queryParams) {
      let options = {
        addQueryPrefix: true,
        delimiter: (queryParams.options || {}).separator || "&",
        allowDots: (queryParams.options || {}).shouldAllowDots || false,
        arrayFormat: (queryParams.options || {}).arrayFormat || "repeat",
        encodeValuesOnly: (queryParams.options || {}).shouldOnlyEncodeValues || true
      };
      return options;
    }
    function decompressGzippedContent(buffer, charset) {
      return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
          zlib.gunzip(buffer, function(error, buffer2) {
            if (error) {
              reject(error);
            } else {
              resolve(buffer2.toString(charset || "utf-8"));
            }
          });
        }));
      });
    }
    exports2.decompressGzippedContent = decompressGzippedContent;
    function buildProxyBypassRegexFromEnv(bypass) {
      try {
        return new RegExp(bypass, "i");
      } catch (err) {
        if (err instanceof SyntaxError && (bypass || "").startsWith("*")) {
          let wildcardEscaped = bypass.replace("*", "(.*)");
          return new RegExp(wildcardEscaped, "i");
        }
        throw err;
      }
    }
    exports2.buildProxyBypassRegexFromEnv = buildProxyBypassRegexFromEnv;
    function obtainContentCharset(response) {
      const nodeSupportedEncodings = ["ascii", "utf8", "utf16le", "ucs2", "base64", "binary", "hex"];
      const contentType = response.message.headers["content-type"] || "";
      const matches = contentType.match(/charset=([^;,\r\n]+)/i);
      return matches && matches[1] && nodeSupportedEncodings.indexOf(matches[1]) != -1 ? matches[1] : "utf-8";
    }
    exports2.obtainContentCharset = obtainContentCharset;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug2("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug2(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug2("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        debug2("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug2(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug2;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports2.debug = debug2;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/typed-rest-client/HttpClient.js
var require_HttpClient = __commonJS({
  "node_modules/typed-rest-client/HttpClient.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : new P(function(resolve2) {
            resolve2(result.value);
          }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url = require("url");
    var http = require("http");
    var https = require("https");
    var util = require_Util();
    var fs3;
    var tunnel;
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
    var HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
    var HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
    var NetworkRetryErrors = ["ECONNRESET", "ENOTFOUND", "ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNREFUSED"];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
          const chunks = [];
          const encodingCharset = util.obtainContentCharset(this);
          const contentEncoding = this.message.headers["content-encoding"] || "";
          const isGzippedEncoded = new RegExp("(gzip$)|(gzip, *deflate)").test(contentEncoding);
          this.message.on("data", function(data) {
            const chunk = typeof data === "string" ? Buffer.from(data, encodingCharset) : data;
            chunks.push(chunk);
          }).on("end", function() {
            return __awaiter(this, void 0, void 0, function* () {
              const buffer = Buffer.concat(chunks);
              if (isGzippedEncoded) {
                const gunzippedBody = yield util.decompressGzippedContent(buffer, encodingCharset);
                resolve(gunzippedBody);
              } else {
                resolve(buffer.toString(encodingCharset));
              }
            });
          }).on("error", function(err) {
            reject(err);
          });
        }));
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = url.parse(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var EnvironmentVariables;
    (function(EnvironmentVariables2) {
      EnvironmentVariables2["HTTP_PROXY"] = "HTTP_PROXY";
      EnvironmentVariables2["HTTPS_PROXY"] = "HTTPS_PROXY";
      EnvironmentVariables2["NO_PROXY"] = "NO_PROXY";
    })(EnvironmentVariables || (EnvironmentVariables = {}));
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        let no_proxy = process.env[EnvironmentVariables.NO_PROXY];
        if (no_proxy) {
          this._httpProxyBypassHosts = [];
          no_proxy.split(",").forEach((bypass) => {
            this._httpProxyBypassHosts.push(util.buildProxyBypassRegexFromEnv(bypass));
          });
        }
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          this._httpProxy = requestOptions.proxy;
          if (requestOptions.proxy && requestOptions.proxy.proxyBypassHosts) {
            this._httpProxyBypassHosts = [];
            requestOptions.proxy.proxyBypassHosts.forEach((bypass) => {
              this._httpProxyBypassHosts.push(new RegExp(bypass, "i"));
            });
          }
          this._certConfig = requestOptions.cert;
          if (this._certConfig) {
            fs3 = require("fs");
            if (this._certConfig.caFile && fs3.existsSync(this._certConfig.caFile)) {
              this._ca = fs3.readFileSync(this._certConfig.caFile, "utf8");
            }
            if (this._certConfig.certFile && fs3.existsSync(this._certConfig.certFile)) {
              this._cert = fs3.readFileSync(this._certConfig.certFile, "utf8");
            }
            if (this._certConfig.keyFile && fs3.existsSync(this._certConfig.keyFile)) {
              this._key = fs3.readFileSync(this._certConfig.keyFile, "utf8");
            }
          }
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      /**
       * Makes a raw http request.
       * All other methods such as get, post, patch, and request ultimately call this.
       * Prefer get, del, post and patch
       */
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          let parsedUrl = url.parse(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          while (numTries < maxTries) {
            try {
              response = yield this.requestRaw(info, data);
            } catch (err) {
              numTries++;
              if (err && err.code && NetworkRetryErrors.indexOf(err.code) > -1 && numTries < maxTries) {
                yield this._performExponentialBackoff(numTries);
                continue;
              }
              throw err;
            }
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (let i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].canHandleAuthentication(response)) {
                  authenticationHandler = this.handlers[i];
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              let parsedRedirectUrl = url.parse(redirectUrl);
              if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          }
          return response;
        });
      }
      /**
       * Needs to be called if keepAlive is set to true in request options.
       */
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      /**
       * Raw request.
       * @param info
       * @param data
       */
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      /**
       * Raw request with callback.
       * @param info
       * @param data
       * @param onResult
       */
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === "string") {
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.destroy();
          }
          handleResult(new Error("Request timeout: " + info.options.path), null);
        });
        req.on("error", function(err) {
          handleResult(err, null);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.timeout = this.requestOptions && this.requestOptions.socketTimeout || this._socketTimeout;
        this._socketTimeout = info.options.timeout;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers && !this._isPresigned(url.format(requestUrl))) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _isPresigned(requestUrl) {
        if (this.requestOptions && this.requestOptions.presignedUrlPatterns) {
          const patterns = this.requestOptions.presignedUrlPatterns;
          for (let i = 0; i < patterns.length; i++) {
            if (requestUrl.match(patterns[i])) {
              return true;
            }
          }
        }
        return false;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxy = this._getProxy(parsedUrl);
        let useProxy = proxy.proxyUrl && proxy.proxyUrl.hostname && !this._isMatchInBypassProxyList(parsedUrl);
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: {
              proxyAuth: proxy.proxyAuth,
              host: proxy.proxyUrl.hostname,
              port: proxy.proxyUrl.port
            }
          };
          let tunnelAgent;
          const overHttps = proxy.proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
        }
        if (usingSsl && this._certConfig) {
          agent.options = Object.assign(agent.options || {}, { ca: this._ca, cert: this._cert, key: this._key, passphrase: this._certConfig.passphrase });
        }
        return agent;
      }
      _getProxy(parsedUrl) {
        let usingSsl = parsedUrl.protocol === "https:";
        let proxyConfig = this._httpProxy;
        let https_proxy = process.env[EnvironmentVariables.HTTPS_PROXY];
        let http_proxy = process.env[EnvironmentVariables.HTTP_PROXY];
        if (!proxyConfig) {
          if (https_proxy && usingSsl) {
            proxyConfig = {
              proxyUrl: https_proxy
            };
          } else if (http_proxy) {
            proxyConfig = {
              proxyUrl: http_proxy
            };
          }
        }
        let proxyUrl;
        let proxyAuth;
        if (proxyConfig) {
          if (proxyConfig.proxyUrl.length > 0) {
            proxyUrl = url.parse(proxyConfig.proxyUrl);
          }
          if (proxyConfig.proxyUsername || proxyConfig.proxyPassword) {
            proxyAuth = proxyConfig.proxyUsername + ":" + proxyConfig.proxyPassword;
          }
        }
        return { proxyUrl, proxyAuth };
      }
      _isMatchInBypassProxyList(parsedUrl) {
        if (!this._httpProxyBypassHosts) {
          return false;
        }
        let bypass = false;
        this._httpProxyBypassHosts.forEach((bypassHost) => {
          if (bypassHost.test(parsedUrl.href)) {
            bypass = true;
          }
        });
        return bypass;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
    };
    exports2.HttpClient = HttpClient;
  }
});

// node_modules/azure-pipelines-tool-lib/node_modules/semver/semver.js
var require_semver2 = __commonJS({
  "node_modules/azure-pipelines-tool-lib/node_modules/semver/semver.js"(exports2, module2) {
    exports2 = module2.exports = SemVer;
    var debug2;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports2.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    function makeSafeRe(value) {
      for (var i2 = 0; i2 < safeRegexReplacements.length; i2++) {
        var token = safeRegexReplacements[i2][0];
        var max = safeRegexReplacements[i2][1];
        value = value.split(token + "*").join(token + "{0," + max + "}").split(token + "+").join(token + "{1," + max + "}");
      }
      return value;
    }
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "\\d+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + LETTERDASHNUMBER + "*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = LETTERDASHNUMBER + "+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    safeRe[TILDETRIM] = new RegExp(makeSafeRe(src[TILDETRIM]), "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    safeRe[CARETTRIM] = new RegExp(makeSafeRe(src[CARETTRIM]), "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    safeRe[COMPARATORTRIM] = new RegExp(makeSafeRe(src[COMPARATORTRIM]), "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug2(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
        safeRe[i] = new RegExp(makeSafeRe(src[i]));
      }
    }
    var i;
    exports2.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? safeRe[LOOSE] : safeRe[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports2.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports2.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports2.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug2("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? safeRe[LOOSE] : safeRe[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug2("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug2("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports2.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports2.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports2.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports2.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports2.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports2.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports2.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports2.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports2.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports2.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports2.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.compare(a, b, loose);
      });
    }
    exports2.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports2.rcompare(a, b, loose);
      });
    }
    exports2.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports2.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports2.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports2.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports2.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports2.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports2.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports2.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug2("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports2.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + this.raw);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      var hr = loose ? safeRe[HYPHENRANGELOOSE] : safeRe[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug2("hyphen replace", range);
      range = range.replace(safeRe[COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range, safeRe[COMPARATORTRIM]);
      range = range.replace(safeRe[TILDETRIM], tildeTrimReplace);
      range = range.replace(safeRe[CARETTRIM], caretTrimReplace);
      var compRe = loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports2.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug2("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug2("caret", comp);
      comp = replaceTildes(comp, options);
      debug2("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug2("xrange", comp);
      comp = replaceStars(comp, options);
      debug2("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? safeRe[TILDELOOSE] : safeRe[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug2("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug2("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug2("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug2("caret", comp, options);
      var r = options.loose ? safeRe[CARETLOOSE] : safeRe[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug2("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug2("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug2("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug2("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug2("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? safeRe[XRANGELOOSE] : safeRe[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug2("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug2("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug2("replaceStars", comp, options);
      return comp.trim().replace(safeRe[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug2(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports2.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports2.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports2.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports2.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports2.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports2.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports2.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports2.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports2.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports2.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports2.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(safeRe[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/semver-compare/index.js
var require_semver_compare = __commonJS({
  "node_modules/semver-compare/index.js"(exports2, module2) {
    module2.exports = function cmp(a, b) {
      var pa = a.split(".");
      var pb = b.split(".");
      for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
      }
      return 0;
    };
  }
});

// node_modules/uuid/lib/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/lib/rng.js"(exports2, module2) {
    var crypto2 = require("crypto");
    module2.exports = function nodeRNG() {
      return crypto2.randomBytes(16);
    };
  }
});

// node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "node_modules/uuid/lib/bytesToUuid.js"(exports2, module2) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module2.exports = bytesToUuid;
  }
});

// node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/v4.js"(exports2, module2) {
    var rng = require_rng();
    var bytesToUuid = require_bytesToUuid();
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module2.exports = v4;
  }
});

// node_modules/azure-pipelines-tool-lib/package.json
var require_package = __commonJS({
  "node_modules/azure-pipelines-tool-lib/package.json"(exports2, module2) {
    module2.exports = {
      name: "azure-pipelines-tool-lib",
      version: "2.0.12",
      description: "Azure Pipelines Tool Installer Lib for CI/CD Tasks",
      main: "tool.js",
      scripts: {
        build: "node make.js build",
        test: "nyc --reporter=cobertura --reporter=html node make.js test",
        sample: "node make.js sample",
        units: "node make.js units"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/microsoft/azure-pipelines-tool-lib.git"
      },
      keywords: [
        "VSTS"
      ],
      author: "Microsoft",
      license: "MIT",
      bugs: {
        url: "https://github.com/microsoft/azure-pipelines-tool-lib/issues"
      },
      homepage: "https://github.com/microsoft/azure-pipelines-tool-lib#readme",
      dependencies: {
        "@types/semver": "^5.3.0",
        "@types/uuid": "^3.4.5",
        "azure-pipelines-task-lib": "^5.2.7",
        semver: "^5.7.0",
        "semver-compare": "^1.0.0",
        "typed-rest-client": "^1.8.6",
        uuid: "^3.3.2"
      },
      devDependencies: {
        "@types/mocha": "^5.2.7",
        "@types/node": "^16.11.39",
        "@types/shelljs": "^0.8.4",
        "@types/xml2js": "^0.4.5",
        mocha: "^6.2.3",
        nock: "13.0.4",
        shelljs: "^0.8.5",
        typescript: "^4.0.5",
        xml2js: "^0.4.23",
        nyc: "^17.0.0"
      }
    };
  }
});

// node_modules/azure-pipelines-tool-lib/lib.json
var require_lib2 = __commonJS({
  "node_modules/azure-pipelines-tool-lib/lib.json"(exports2, module2) {
    module2.exports = {
      messages: {
        TOOL_LIB_CachingTool: "Caching tool: %s %s %s",
        "_TOOL_LIB_CachingTool.comment": "This informational log message indicates that a tool, that was just downloaded, is being copied into the cache directory. %s %s %s represent the tool name, version information, and processor architecture.",
        TOOL_LIB_Downloading: "Downloading: %s",
        "_TOOL_LIB_Downloading.comment": "This information log message indicates that a file is being downloaded. %s represents the URL being downloaded.",
        TOOL_LIB_ExtractingArchive: "Extracting archive",
        "_TOOL_LIB_ExtractingArchive.comment": "This informational log message indicates that an archive file is being extracted. For example, a .zip file, .7z file, or .tar.gz file.",
        TOOL_LIB_FoundInCache: "Found tool in cache: %s %s %s",
        "_TOOL_LIB_FoundInCache.comment": "This informational log message indicates that the request tool is already cached, and does not need to be downloaded again. %s %s %s represent the tool name, version information, and processor architecture.",
        TOOL_LIB_PrependPath: "Prepending PATH environment variable with directory: %s",
        "_TOOL_LIB_PrependPath.comment": "This informational log message indicates that a directory is being prepended to the front of the PATH environment variable. The directories specified by the PATH environment variable are used to resolve the location of command line tools."
      }
    };
  }
});

// node_modules/azure-pipelines-tool-lib/tool.js
var require_tool = __commonJS({
  "node_modules/azure-pipelines-tool-lib/tool.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scrape = exports2.extractZip = exports2.extractTar = exports2.extract7z = exports2.cacheFile = exports2.cacheDir = exports2.downloadToolWithRetries = exports2.downloadTool = exports2.findLocalToolVersions = exports2.findLocalTool = exports2.evaluateVersions = exports2.cleanVersion = exports2.isExplicitVersion = exports2.prependPath = exports2.debug = void 0;
    var httpm = require_HttpClient();
    var path2 = require("path");
    var os2 = require("os");
    var process2 = require("process");
    var fs3 = require("fs");
    var semver = require_semver2();
    var util = require("util");
    var tl = require_task();
    var cmp = require_semver_compare();
    var uuidV4 = require_v4();
    var pkg = require_package();
    var libJson = require_lib2();
    var englishMessages = libJson.messages || {};
    var userAgent = "vsts-task-installer/" + pkg.version;
    var requestOptions = {
      // ignoreSslError: true,
      proxy: tl.getHttpProxyConfiguration(),
      cert: tl.getHttpCertConfiguration(),
      allowRedirects: true,
      allowRetries: true,
      maxRetries: 2
    };
    var localizationEnabled = false;
    try {
      const libJsonPath = path2.join(__dirname, "lib.json");
      if (tl.exist(libJsonPath)) {
        tl.setResourcePath(libJsonPath);
        localizationEnabled = true;
      } else {
        tl.debug("lib.json not found at expected path - using English fallback messages");
      }
    } catch (err) {
      tl.debug("Could not set resource path for lib.json: " + err + " - using English fallback messages");
    }
    function loc(key, ...params) {
      if (!localizationEnabled) {
        let template = englishMessages[key] || key;
        if (params.length > 0) {
          return util.format(template, ...params);
        }
        return template;
      }
      return tl.loc(key, ...params);
    }
    function debug2(message) {
      tl.debug(message);
    }
    exports2.debug = debug2;
    function prependPath2(toolPath) {
      tl.assertAgent("2.115.0");
      if (!toolPath) {
        throw new Error("Parameter toolPath must not be null or empty");
      } else if (!tl.exist(toolPath) || !tl.stats(toolPath).isDirectory()) {
        throw new Error("Directory does not exist: " + toolPath);
      }
      console.log(loc("TOOL_LIB_PrependPath", toolPath));
      let newPath = toolPath + path2.delimiter + process2.env["PATH"];
      tl.debug("new Path: " + newPath);
      process2.env["PATH"] = newPath;
      console.log("##vso[task.prependpath]" + toolPath);
    }
    exports2.prependPath = prependPath2;
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function isExplicitVersion(versionSpec) {
      let c = semver.clean(versionSpec);
      tl.debug("isExplicit: " + c);
      let valid = semver.valid(c) != null;
      tl.debug("explicit? " + valid);
      return valid;
    }
    exports2.isExplicitVersion = isExplicitVersion;
    function cleanVersion(version) {
      tl.debug("cleaning: " + version);
      return semver.clean(version);
    }
    exports2.cleanVersion = cleanVersion;
    function evaluateVersions(versions, versionSpec) {
      let version;
      tl.debug("evaluating " + versions.length + " versions");
      versions = versions.sort(cmp);
      for (let i = versions.length - 1; i >= 0; i--) {
        let potential = versions[i];
        let satisfied = semver.satisfies(potential, versionSpec);
        if (satisfied) {
          version = potential;
          break;
        }
      }
      if (version) {
        tl.debug("matched: " + version);
      } else {
        tl.debug("match not found");
      }
      return version;
    }
    exports2.evaluateVersions = evaluateVersions;
    function findLocalTool(toolName, versionSpec, arch) {
      if (!toolName) {
        throw new Error("toolName parameter is required");
      }
      if (!versionSpec) {
        throw new Error("versionSpec parameter is required");
      }
      arch = arch || os2.arch();
      if (!isExplicitVersion(versionSpec)) {
        let localVersions = findLocalToolVersions(toolName, arch);
        let match = evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
      }
      let toolPath;
      if (versionSpec) {
        versionSpec = semver.clean(versionSpec);
        let cacheRoot = _getCacheRoot();
        let cachePath = path2.join(cacheRoot, toolName, versionSpec, arch);
        tl.debug("checking cache: " + cachePath);
        if (tl.exist(cachePath) && tl.exist(`${cachePath}.complete`)) {
          console.log(loc("TOOL_LIB_FoundInCache", toolName, versionSpec, arch));
          toolPath = cachePath;
        } else {
          tl.debug("not found");
        }
      }
      return toolPath;
    }
    exports2.findLocalTool = findLocalTool;
    function findLocalToolVersions(toolName, arch) {
      let versions = [];
      arch = arch || os2.arch();
      let toolPath = path2.join(_getCacheRoot(), toolName);
      if (tl.exist(toolPath)) {
        let children = tl.ls("", [toolPath]);
        children.forEach((child) => {
          if (isExplicitVersion(child)) {
            let fullPath = path2.join(toolPath, child, arch);
            if (tl.exist(fullPath) && tl.exist(`${fullPath}.complete`)) {
              versions.push(child);
            }
          }
        });
      }
      return versions;
    }
    exports2.findLocalToolVersions = findLocalToolVersions;
    function downloadTool2(url, fileName, handlers, additionalHeaders) {
      return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
          try {
            handlers = handlers || null;
            let http = new httpm.HttpClient(userAgent, handlers, requestOptions);
            tl.debug(fileName);
            fileName = fileName || uuidV4();
            var destPath;
            if (path2.isAbsolute(fileName)) {
              destPath = fileName;
            } else {
              destPath = path2.join(_getAgentTemp(), fileName);
            }
            tl.mkdirP(path2.dirname(destPath));
            console.log(loc("TOOL_LIB_Downloading", url.replace(/sig=[^&]*/, "sig=-REDACTED-")));
            tl.debug("destination " + destPath);
            if (fs3.existsSync(destPath)) {
              throw new Error("Destination file path already exists");
            }
            tl.debug("downloading");
            let response = yield http.get(url, additionalHeaders);
            if (response.message.statusCode != 200) {
              let err = new Error("Unexpected HTTP response: " + response.message.statusCode);
              err["httpStatusCode"] = response.message.statusCode;
              tl.debug(`Failed to download "${fileName}" from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
              throw err;
            }
            let downloadedContentLength = _getContentLengthOfDownloadedFile(response);
            if (!isNaN(downloadedContentLength)) {
              tl.debug(`Content-Length of downloaded file: ${downloadedContentLength}`);
            } else {
              tl.debug(`Content-Length header missing`);
            }
            tl.debug("creating stream");
            const file = fs3.createWriteStream(destPath);
            file.on("open", (fd) => __awaiter(this, void 0, void 0, function* () {
              tl.debug("file write stream opened. fd: " + fd);
              const messageStream = response.message;
              if (messageStream.aborted || messageStream.destroyed) {
                file.end();
                reject(new Error("Incoming message read stream was Aborted or Destroyed before download was complete"));
                return;
              }
              tl.debug("subscribing to message read stream events...");
              try {
                messageStream.on("error", (err) => {
                  file.end();
                  reject(err);
                }).on("aborted", () => {
                  file.end();
                  reject(new Error("Aborted"));
                }).pipe(file);
              } catch (err) {
                reject(err);
              }
              tl.debug("successfully subscribed to message read stream events");
            })).on("close", () => {
              tl.debug("download complete");
              let fileSizeInBytes;
              try {
                fileSizeInBytes = _getFileSizeOnDisk(destPath);
              } catch (err) {
                fileSizeInBytes = NaN;
                tl.warning(`Unable to check file size of ${destPath} due to error: ${err.Message}`);
              }
              if (!isNaN(fileSizeInBytes)) {
                tl.debug(`Downloaded file size: ${fileSizeInBytes} bytes`);
              } else {
                tl.debug(`File size on disk was not found`);
              }
              if (!isNaN(downloadedContentLength) && !isNaN(fileSizeInBytes) && fileSizeInBytes !== downloadedContentLength) {
                tl.warning(`Content-Length (${downloadedContentLength} bytes) did not match downloaded file size (${fileSizeInBytes} bytes).`);
              }
              resolve(destPath);
            }).on("error", (err) => {
              file.end();
              reject(err);
            });
          } catch (error) {
            reject(error);
          }
        }));
      });
    }
    exports2.downloadTool = downloadTool2;
    function downloadToolWithRetries(url, fileName, handlers, additionalHeaders, maxAttempts = 3, retryInterval = 500) {
      return __awaiter(this, void 0, void 0, function* () {
        let attempt = 1;
        let destinationPath = "";
        while (attempt <= maxAttempts && destinationPath == "") {
          try {
            destinationPath = yield downloadTool2(url, fileName, handlers, additionalHeaders);
          } catch (err) {
            if (attempt === maxAttempts)
              throw err;
            const attemptInterval = attempt * retryInterval;
            tl.debug(`Attempt ${attempt} failed. Retrying after ${attemptInterval} ms`);
            yield delay(attemptInterval);
            attempt++;
          }
        }
        return destinationPath;
      });
    }
    exports2.downloadToolWithRetries = downloadToolWithRetries;
    function _getContentLengthOfDownloadedFile(response) {
      let contentLengthHeader = response.message.headers["content-length"];
      let parsedContentLength = parseInt(contentLengthHeader);
      return parsedContentLength;
    }
    function _getFileSizeOnDisk(filePath) {
      let fileStats = fs3.statSync(filePath);
      let fileSizeInBytes = fileStats.size;
      return fileSizeInBytes;
    }
    function _createToolPath(tool, version, arch) {
      let folderPath = path2.join(_getCacheRoot(), tool, semver.clean(version), arch);
      tl.debug("destination " + folderPath);
      let markerPath = `${folderPath}.complete`;
      tl.rmRF(folderPath);
      tl.rmRF(markerPath);
      tl.mkdirP(folderPath);
      return folderPath;
    }
    function _completeToolPath(tool, version, arch) {
      let folderPath = path2.join(_getCacheRoot(), tool, semver.clean(version), arch);
      let markerPath = `${folderPath}.complete`;
      tl.writeFile(markerPath, "");
      tl.debug("finished caching tool");
    }
    function cacheDir(sourceDir, tool, version, arch) {
      return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version);
        arch = arch || os2.arch();
        console.log(loc("TOOL_LIB_CachingTool", tool, version, arch));
        tl.debug("source dir: " + sourceDir);
        if (!tl.stats(sourceDir).isDirectory()) {
          throw new Error("sourceDir is not a directory");
        }
        let destPath = _createToolPath(tool, version, arch);
        for (let itemName of fs3.readdirSync(sourceDir)) {
          let s = path2.join(sourceDir, itemName);
          tl.cp(s, destPath + "/", "-r");
        }
        _completeToolPath(tool, version, arch);
        return destPath;
      });
    }
    exports2.cacheDir = cacheDir;
    function cacheFile(sourceFile, targetFile, tool, version, arch) {
      return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version);
        arch = arch || os2.arch();
        console.log(loc("TOOL_LIB_CachingTool", tool, version, arch));
        tl.debug("source file:" + sourceFile);
        if (!tl.stats(sourceFile).isFile()) {
          throw new Error("sourceFile is not a file");
        }
        let destFolder = _createToolPath(tool, version, arch);
        let destPath = path2.join(destFolder, targetFile);
        tl.debug("destination file" + destPath);
        tl.cp(sourceFile, destPath);
        _completeToolPath(tool, version, arch);
        return destFolder;
      });
    }
    exports2.cacheFile = cacheFile;
    function extract7z(file, dest, _7zPath, overwriteDest) {
      return __awaiter(this, void 0, void 0, function* () {
        if (process2.platform != "win32") {
          throw new Error("extract7z() not supported on current OS");
        }
        if (!file) {
          throw new Error("parameter 'file' is required");
        }
        console.log(loc("TOOL_LIB_ExtractingArchive"));
        dest = _createExtractFolder(dest);
        let originalCwd = process2.cwd();
        try {
          process2.chdir(dest);
          if (_7zPath) {
            const _7z = tl.tool(_7zPath);
            if (overwriteDest) {
              _7z.arg("-aoa");
            }
            _7z.arg("x").arg("-bb1").arg("-bd").arg("-sccUTF-8").arg(file);
            yield _7z.exec();
          } else {
            let escapedScript = path2.join(__dirname, "Invoke-7zdec.ps1").replace(/'/g, "''").replace(/"|\n|\r/g, "");
            let escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            let escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            const overrideDestDirectory = overwriteDest ? 1 : 0;
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}' -OverrideDestDirectory ${overrideDestDirectory}`;
            let powershellPath = tl.which("powershell", true);
            let powershell = tl.tool(powershellPath).line("-NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command").arg(command);
            powershell.on("stdout", (buffer) => {
              process2.stdout.write(buffer);
            });
            powershell.on("stderr", (buffer) => {
              process2.stderr.write(buffer);
            });
            yield powershell.exec({ silent: true });
          }
        } finally {
          process2.chdir(originalCwd);
        }
        return dest;
      });
    }
    exports2.extract7z = extract7z;
    function extractTar2(file, destination) {
      return __awaiter(this, void 0, void 0, function* () {
        console.log(loc("TOOL_LIB_ExtractingArchive"));
        let dest = _createExtractFolder(destination);
        let tr = tl.tool("tar");
        tr.arg(["xC", dest, "-f", file]);
        yield tr.exec();
        return dest;
      });
    }
    exports2.extractTar = extractTar2;
    function extractZip2(file, destination) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
          throw new Error("parameter 'file' is required");
        }
        console.log(loc("TOOL_LIB_ExtractingArchive"));
        let dest = _createExtractFolder(destination);
        if (process2.platform == "win32") {
          let escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
          let escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
          let command = `$ErrorActionPreference = 'Stop' ; try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ; [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}')`;
          let chcpPath = path2.join(process2.env.windir, "system32", "chcp.com");
          yield tl.exec(chcpPath, "65001");
          let powershell = tl.tool("powershell").line("-NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command").arg(command);
          yield powershell.exec();
        } else {
          let unzip = tl.tool("unzip").arg(file);
          yield unzip.exec({ cwd: dest });
        }
        return dest;
      });
    }
    exports2.extractZip = extractZip2;
    function _createExtractFolder(dest) {
      if (!dest) {
        dest = path2.join(_getAgentTemp(), uuidV4());
      }
      tl.mkdirP(dest);
      return dest;
    }
    function scrape(url, regex, handlers) {
      return __awaiter(this, void 0, void 0, function* () {
        handlers = handlers || null;
        let http = new httpm.HttpClient(userAgent, handlers, requestOptions);
        let output = yield (yield http.get(url)).readBody();
        let matches = output.match(regex);
        let seen = {};
        let versions = [];
        for (let i = 0; i < matches.length; i++) {
          let ver = semver.clean(matches[i]);
          if (!seen.hasOwnProperty(ver)) {
            seen[ver] = true;
            versions.push(ver);
          }
        }
        return versions;
      });
    }
    exports2.scrape = scrape;
    function _getCacheRoot() {
      tl.assertAgent("2.115.0");
      let cacheRoot = tl.getVariable("Agent.ToolsDirectory");
      if (!cacheRoot) {
        throw new Error("Agent.ToolsDirectory is not set");
      }
      return cacheRoot;
    }
    function _getAgentTemp() {
      tl.assertAgent("2.115.0");
      let tempDirectory = tl.getVariable("Agent.TempDirectory");
      if (!tempDirectory) {
        throw new Error("Agent.TempDirectory is not set");
      }
      return tempDirectory;
    }
  }
});

// src/azure-devops-task.ts
var taskLib = __toESM(require_task());
var toolLib = __toESM(require_tool());

// src/msstoreconfigurator.ts
var path = __toESM(require("path"));
var os = __toESM(require("os"));
var crypto = __toESM(require("crypto"));
var fs = __toESM(require("fs"));
function getConfig(version) {
  return new MSStoreCLIConfigurator(version || "latest");
}
var MSStoreCLIConfigurator = class {
  constructor(version) {
    this.version = version;
  }
  async configure(pipeline) {
    this.validate();
    let platform;
    let extension;
    if (process.platform === "win32") {
      platform = "win";
      extension = ".zip";
    } else if (process.platform === "darwin") {
      platform = "osx";
      extension = ".tar.gz";
    } else if (process.platform === "linux") {
      platform = "linux";
      extension = ".tar.gz";
    } else {
      throw new Error(`Unsupported platform: ${process.platform}`);
    }
    let versionString;
    if (this.version === "latest") {
      versionString = `latest/download`;
    } else {
      versionString = `download/${this.version}`;
    }
    const downloadURL = `https://github.com/microsoft/msstore-cli/releases/${versionString}/MSStoreCLI-${platform}-${process.arch}${extension}`;
    pipeline.debug(`Downloading tool from ${downloadURL}`);
    const randomDir = crypto.randomUUID();
    const tempDir = path.join(os.tmpdir(), "tmp", "runner", randomDir);
    pipeline.debug(`Creating tempdir ${tempDir}`);
    await pipeline.mkdirP(tempDir);
    const downloadPath = await pipeline.downloadTool(downloadURL);
    let name;
    if (process.platform === "win32") {
      name = "msstore.exe";
    } else {
      name = "msstore";
    }
    const archivePath = extension === ".tar.gz" ? await pipeline.extractTar(downloadPath, tempDir) : await pipeline.extractZip(downloadPath, tempDir);
    await this.moveToPath(archivePath, name, pipeline);
    return pipeline.rmRF(tempDir);
  }
  async moveToPath(downloadPath, name, pipeline) {
    const toolPath = binPath();
    await pipeline.mkdirP(toolPath);
    const dest = path.join(toolPath, name);
    if (!fs.existsSync(dest)) {
      pipeline.moveSync(downloadPath, toolPath);
    }
    if (process.platform !== "win32") {
      await pipeline.exec("chmod", ["+x", dest]);
    }
    pipeline.addPath(toolPath);
  }
  validate() {
    if (process.platform !== "win32" && process.platform !== "darwin" && process.platform !== "linux") {
      throw new Error(`Unsupported platform: ${process.platform}`);
    }
  }
};
function binPath() {
  let baseLocation;
  if (process.platform === "win32") {
    baseLocation = process.env["USERPROFILE"] || "C:\\";
  } else {
    if (process.platform === "darwin") {
      baseLocation = "/Users";
    } else {
      baseLocation = "/home";
    }
  }
  return path.join(baseLocation, os.userInfo().username, "msstorecli");
}

// src/azure-devops-task.ts
var fs2 = __toESM(require("fs"));
var Version = "version";
var AzurePipeline = class {
  debug(message) {
    taskLib.debug(message);
  }
  addPath(p) {
    taskLib.prependPath(p);
  }
  async mkdirP(p) {
    taskLib.mkdirP(p);
  }
  async downloadTool(url) {
    return toolLib.downloadTool(url);
  }
  async extractTar(archivePath, dest) {
    return toolLib.extractTar(archivePath, dest);
  }
  async extractZip(archivePath, dest) {
    return toolLib.extractZip(archivePath, dest);
  }
  async rmRF(p) {
    taskLib.rmRF(p);
  }
  async exec(command, args) {
    return taskLib.exec(command, args);
  }
  moveSync(downloadPath, toolPath) {
    this.rmRF(toolPath);
    fs2.renameSync(downloadPath, toolPath);
  }
};
async function run() {
  try {
    await getConfig(taskLib.getInput(Version) || "latest").configure(new AzurePipeline());
  } catch (err) {
    if (err instanceof Error)
      taskLib.setResult(taskLib.TaskResult.Failed, err.message);
  }
}
run();
