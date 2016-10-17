define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('game/game',['exports', './states/Boot', './states/Preload', './states/Main'], function (exports, _Boot, _Preload, _Main) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.game = undefined;

  var _Boot2 = _interopRequireDefault(_Boot);

  var _Preload2 = _interopRequireDefault(_Preload);

  var _Main2 = _interopRequireDefault(_Main);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var game = exports.game = function (_Phaser$Game) {
    _inherits(game, _Phaser$Game);

    function game() {
      _classCallCheck(this, game);

      var _this = _possibleConstructorReturn(this, _Phaser$Game.call(this, 500, 500, Phaser.AUTO, "game-container"));

      _this.state.add('Boot', _Boot2.default, false);
      _this.state.add('Preload', _Preload2.default, false);
      _this.state.add('Main', _Main2.default, false);

      _this.state.start('Boot');
      console.log('game loaded');
      return _this;
    }

    return game;
  }(Phaser.Game);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('game/hud/hud',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var hud = exports.hud = function hud() {
    _classCallCheck(this, hud);

    console.log('hud loaded');
  };
});
define('game/states/Boot',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Boot = function (_Phaser$State) {
		_inherits(Boot, _Phaser$State);

		function Boot() {
			_classCallCheck(this, Boot);

			return _possibleConstructorReturn(this, _Phaser$State.apply(this, arguments));
		}

		Boot.prototype.create = function create() {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.state.start("Preload");
		};

		return Boot;
	}(Phaser.State);

	exports.default = Boot;
});
define('game/states/Main',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Main = function (_Phaser$State) {
        _inherits(Main, _Phaser$State);

        function Main() {
            _classCallCheck(this, Main);

            return _possibleConstructorReturn(this, _Phaser$State.apply(this, arguments));
        }

        Main.prototype.create = function create() {
            var link = this.game.add.sprite(10, 10, 'link');

            link.animations.add('walk', ['link', 'link1']);

            link.animations.play('walk', 1, true);
        };

        Main.prototype.update = function update() {};

        return Main;
    }(Phaser.State);

    exports.default = Main;
});
define('game/states/Preload',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Preload = function (_Phaser$State) {
    _inherits(Preload, _Phaser$State);

    function Preload() {
      _classCallCheck(this, Preload);

      return _possibleConstructorReturn(this, _Phaser$State.apply(this, arguments));
    }

    Preload.prototype.preload = function preload() {
      this.load.atlas('link', 'scripts/resources/sprites/link.png', 'scripts/resources/sprites/link.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    };

    Preload.prototype.create = function create() {
      this.game.state.start("Main");
    };

    return Preload;
  }(Phaser.State);

  exports.default = Preload;
});
define('game/world/world',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var world = exports.world = function world() {
    _classCallCheck(this, world);

    console.log('world loaded');
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./app.css\"></require>\r\n  <require from=\"./game/game\"></require>\r\n  <game></game>\r\n</template>\r\n"; });
define('text!game/game.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./game.css\"></require>\r\n  <require from=\"./hud/hud\"></require>\r\n  <require from=\"./world/world\"></require>\r\n\r\n  <hud></hud>\r\n  <world id=\"game-container\"></world>\r\n</template>\r\n"; });
define('text!game/hud/hud.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./hud.css\"></require>\r\n        Hud\r\n</template>\r\n"; });
define('text!game/world/world.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./world.css\"></require>\r\n</template>\r\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body, html {\n  height: 100%; }\n\nbody {\n  background-color: #000; }\n\n/*! normalize-scss | MIT/GPLv2 License | bit.ly/normalize-scss */\n/**\r\n * 1. Change the default font family in all browsers (opinionated).\r\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\r\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\r\n * Remove the margin in all browsers (opinionated).\r\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\r\n   ========================================================================== */\n/**\r\n * Add the correct display in IE <10.\r\n * Add the correct display in Edge, IE, and Firefox for `details` or `summary`.\r\n * Add the correct display in IE for `main`.\r\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\n/**\r\n * Add the correct display in IE <10.\r\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\n/**\r\n * Add the correct display and remove excess height in iOS 4-7.\r\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\r\n * Add the correct display in IE <11, Safari <8, and Firefox <22.\r\n * 1. Add the correct display in IE.\r\n */\ntemplate,\n[hidden] {\n  display: none; }\n\n/* Links\r\n   ========================================================================== */\n/**\r\n * 1. Remove the gray background on active links in IE 10.\r\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\r\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\r\n * Remove the outline on focused links when they are also active or hovered\r\n * in all browsers (opinionated).\r\n */\na:active,\na:hover {\n  outline-width: 0; }\n\n/* Text-level semantics\r\n   ========================================================================== */\n/**\r\n * 1. Remove the bottom border in Firefox <40.\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\r\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\r\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\npre,\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\r\n * Add the correct font style in Android <4.4.\r\n */\ndfn {\n  font-style: italic; }\n\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\nh1 {\n  font-size: 2em;\n  /* Set 1 unit of vertical rhythm on the top and bottom margins. */\n  margin: 0.75em 0; }\n\n/**\r\n * Add the correct background and color in IE <10.\r\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\r\n * Add the correct font size in all browsers.\r\n */\nsmall {\n  font-size: 80%; }\n\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\r\n   ========================================================================== */\n/**\r\n * Remove the border on images inside links in IE <11.\r\n */\nimg {\n  border-style: none; }\n\n/**\r\n * Hide the overflow in IE.\r\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\r\n   ========================================================================== */\n/**\r\n * Add the correct margin in IE 8.\r\n */\nfigure {\n  margin: 1.5em 40px; }\n\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/* Forms\r\n   ========================================================================== */\n/**\r\n * Known issues:\r\n * - By default, Chrome on OS X and Safari on OS X allow very limited styling of\r\n *   select, unless a border property is set. The default font weight on\r\n *   optgroup elements cannot safely be changed in Chrome on OSX and Safari on\r\n *   OS X.\r\n * - It is recommended that you do not style checkbox and radio inputs as\r\n *   Firefox's implementation does not respect box-sizing, padding, or width.\r\n * - Certain font size values applied to number inputs cause the cursor style of\r\n *   the decrement button to change from default to text.\r\n * - The search input is not fully stylable by default. In Chrome and Safari on\r\n *   OSX/iOS you can't control font, padding, border, or background. In Chrome\r\n *   and Safari on Windows you can't control border properly. It will apply\r\n *   border-width but will only show a border color (which cannot be controlled)\r\n *   for the outer 1px of that border. Applying -webkit-appearance: textfield\r\n *   addresses these issues without removing the benefits of search inputs (e.g.\r\n *   showing past searches). Safari (but not Chrome) will clip the cancel button\r\n *   on when it has padding (and textfield appearance).\r\n */\n/**\r\n * 1. Change font properties to `inherit` in all browsers (opinionated).\r\n * 2. Remove the margin in Firefox and Safari.\r\n * 3. Address `font-family` inconsistency between `textarea` and other form in IE 7\r\n * 4. Improve appearance and consistency with IE 6/7.\r\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\r\n * Show the overflow in IE.\r\n */\nbutton {\n  overflow: visible; }\n\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\r\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\r\n *    controls in Android 4.\r\n * 2. Correct the inability to style clickable types in iOS and Safari.\r\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  /**\r\n   * Remove the inner border and padding in Firefox.\r\n   */\n  /**\r\n   * Restore the focus styles unset by the previous rule.\r\n   */ }\n  button::-moz-focus-inner,\n  [type=\"button\"]::-moz-focus-inner,\n  [type=\"reset\"]::-moz-focus-inner,\n  [type=\"submit\"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0; }\n  button:-moz-focusring,\n  [type=\"button\"]:-moz-focusring,\n  [type=\"reset\"]:-moz-focusring,\n  [type=\"submit\"]:-moz-focusring {\n    outline: 1px dotted ButtonText; }\n\n/**\r\n * Show the overflow in Edge.\r\n */\ninput {\n  overflow: visible; }\n\n/**\r\n * 1. Add the correct box sizing in IE <11.\r\n * 2. Remove the padding in IE <11.\r\n * 3. Remove excess padding in IE 7.\r\n *    Known issue: excess padding remains in IE 6.\r\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n  /**\r\n   * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\r\n   */ }\n  [type=\"search\"]::-webkit-search-cancel-button, [type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none; }\n\n/**\r\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\r\n */\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/**\r\n * Change the border, margin, and padding in all browsers (opinionated).\r\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n * 4. Correct alignment displayed oddly in IE 6/7.\r\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  white-space: normal;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  padding: 0;\n  /* 3 */ }\n\n/**\r\n * Restore the font weight unset by a previous rule.\r\n */\noptgroup {\n  font-weight: bold; }\n\n/**\r\n * Remove the default vertical scrollbar in IE.\r\n */\ntextarea {\n  overflow: auto; }\n"; });
define('text!game/game.css', ['module'], function(module) { module.exports = "game {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n"; });
define('text!game/hud/hud.css', ['module'], function(module) { module.exports = "@font-face {\n  font-family: \"zelda\";\n  src: url(\"scripts/resources/fonts/retganon.woff2\"); }\n\nhud {\n  color: white;\n  font-family: zelda;\n  height: 100px;\n  flex: 0 1 auto; }\n"; });
define('text!game/world/world.css', ['module'], function(module) { module.exports = "world {\n  flex: 1;\n  color: white; }\n"; });
//# sourceMappingURL=app-bundle.js.map