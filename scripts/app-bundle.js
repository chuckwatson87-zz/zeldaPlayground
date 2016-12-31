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
define('engine/engine',['exports', 'engine/components/sprites/sprite'], function (exports, _sprite) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _sprite2 = _interopRequireDefault(_sprite);

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

  var engine = function () {
    function engine() {
      var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, engine);

      this.context = canvas != null ? canvas.getContext('2d') : null;
      this.spritesCollection = [];
    }

    engine.prototype.addContext = function addContext(canvas) {
      this.context = canvas.getContext('2d');
    };

    engine.prototype.addSprite = function addSprite(spriteName, imagePath, atlasPath) {
      var addedSprite = _sprite2.default.create(this.context, spriteName, imagePath, atlasPath);
      this.spritesCollection.push(addedSprite);
      return addedSprite;
    };

    return engine;
  }();

  exports.default = engine;
});
define('game/game',['exports', 'engine/engine'], function (exports, _engine) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.game = undefined;

  var _engine2 = _interopRequireDefault(_engine);

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

  var game = exports.game = function game() {
    _classCallCheck(this, game);

    console.log('game loaded');
  };
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
define('game/world/world',['exports', './player/player', 'engine/engine'], function (exports, _player, _engine) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.world = undefined;

  var _player2 = _interopRequireDefault(_player);

  var _engine2 = _interopRequireDefault(_engine);

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

  var world = exports.world = function () {
    function world() {
      _classCallCheck(this, world);
    }

    world.prototype.bind = function bind() {};

    world.prototype.attached = function attached() {};

    world.prototype.initializePlayer = function initializePlayer(player) {
      return player.init('scripts/resources/sprites/link/sprites.png');
    };

    return world;
  }();
});
define('engine/components/sprites/sprite',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var sprite = {
    create: function create(context, name, imagePath, atlas) {
      var s = {
        context: context,
        name: name,
        imagePath: imagePath,
        atlas: atlas
      };
      s.animations = {};

      s.loadSprite = function (renderOnLoad, x, y, renderFrame) {
        return new Promise(function (resolve, reject) {
          s.image = new Image();
          s.image.src = s.imagePath;
          var render = renderOnLoad ? renderOnLoad : false;
          s.image.onload = function () {
            if (render) {
              s.render(x, y, renderFrame);
            }
            resolve(true);
          };
          s.image.onerror = function () {
            reject("Error loadingImage");
          };
        });
      };

      s.render = function (x, y, frameName) {
        var frame = frameName ? s.atlas.frames[frameName].frame : s.atlas.frames[Object.keys(s.atlas.frames)[0]].frame;
        s.context.drawImage(s.image, frame.x, frame.y, frame.w, frame.h, x, y, frame.w, frame.h);
      };

      s.addAnimations = function (animationName, frames, defaultFps) {
        s.animations[animationName] = {
          frames: frames,
          fps: defaultFps ? defaultFps : 60,
          running: false
        };

        var currentAnimation = s.animations[animationName];
        currentAnimation.run = function () {
          currentAnimation.running = true;
        };

        currentAnimation.stop = function () {
          currentAnimation.running = false;
        };
      };

      return s;
    }
  };

  exports.default = sprite;
});
define('game/world/player/player',['exports', './sprites', 'engine/components/sprites/sprite'], function (exports, _sprites, _sprite) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _sprite2 = _interopRequireDefault(_sprite);

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

  var player = function () {
    function player(engine) {
      _classCallCheck(this, player);

      this.engine = engine;
      this.spriteAtlas = _sprites.spriteAtlas;
    }

    player.prototype.init = function init(spritePath) {
      var sprite = this.engine.addSprite('link', spritePath, this.spriteAtlas);
      return this.loadSprite(sprite);
    };

    player.prototype.loadSprite = function loadSprite(sprite) {
      return sprite.loadSprite(true, 25, 25, 'link_05');
    };

    return player;
  }();

  exports.default = player;
});
define('game/world/player/sprites',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var spriteAtlas = exports.spriteAtlas = {
		"frames": {
			"link_01": {
				"frame": { "x": 0, "y": 33, "w": 15, "h": 16 },
				"spriteSourceSize": { "x": 0, "y": 0, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			},
			"link_02": {
				"frame": { "x": 32, "y": 33, "w": 15, "h": 16 },
				"spriteSourceSize": { "x": 2, "y": 0, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			},
			"link_03": {
				"frame": { "x": 48, "y": 17, "w": 12, "h": 16 },
				"spriteSourceSize": { "x": 6, "y": 0, "w": 27, "h": 28 },
				"sourceSize": { "w": 27, "h": 28 }
			},
			"link_04": {
				"frame": { "x": 33, "y": 16, "w": 14, "h": 15 },
				"spriteSourceSize": { "x": 8, "y": 0, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			},
			"link_05": {
				"frame": { "x": 48, "y": 0, "w": 13, "h": 16 },
				"spriteSourceSize": { "x": 1, "y": 2, "w": 28, "h": 27 },
				"sourceSize": { "w": 28, "h": 27 }
			},
			"link_06": {
				"frame": { "x": 33, "y": 0, "w": 14, "h": 15 },
				"spriteSourceSize": { "x": 3, "y": 2, "w": 28, "h": 27 },
				"sourceSize": { "w": 28, "h": 27 }
			},
			"link_07": {
				"frame": { "x": 48, "y": 34, "w": 12, "h": 16 },
				"spriteSourceSize": { "x": 6, "y": 2, "w": 27, "h": 27 },
				"sourceSize": { "w": 27, "h": 27 }
			},
			"link_08": {
				"frame": { "x": 17, "y": 16, "w": 15, "h": 16 },
				"spriteSourceSize": { "x": 7, "y": 2, "w": 28, "h": 27 },
				"sourceSize": { "w": 28, "h": 27 }
			},
			"link_09": {
				"frame": { "x": 0, "y": 0, "w": 16, "h": 15 },
				"spriteSourceSize": { "x": 0, "y": 5, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			},
			"link_10": {
				"frame": { "x": 17, "y": 0, "w": 15, "h": 15 },
				"spriteSourceSize": { "x": 2, "y": 5, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			},
			"link_11": {
				"frame": { "x": 0, "y": 16, "w": 16, "h": 16 },
				"spriteSourceSize": { "x": 4, "y": 5, "w": 27, "h": 28 },
				"sourceSize": { "w": 27, "h": 28 }
			},
			"link_12": {
				"frame": { "x": 16, "y": 33, "w": 15, "h": 15 },
				"spriteSourceSize": { "x": 7, "y": 5, "w": 28, "h": 28 },
				"sourceSize": { "w": 28, "h": 28 }
			}

		},
		"meta": {
			"image": "sprites",
			"size": { "w": 62, "h": 51 },
			"scale": "1"
		}
	};
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <require from=\"./game/game\"></require>\n  <game></game>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body, html {\n  height: 100%; }\n\nbody {\n  background-color: #000; }\n"; });
define('text!game/game.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./game.css\"></require>\n  <require from=\"./hud/hud\"></require>\n  <require from=\"./world/world\"></require>\n\n  <hud></hud>\n  <world></world>\n</template>\n"; });
define('text!game/game.css', ['module'], function(module) { module.exports = "game {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n"; });
define('text!game/hud/hud.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./hud.css\"></require>\n        Hud\n</template>\n"; });
define('text!game/hud/hud.css', ['module'], function(module) { module.exports = "@font-face {\n  font-family: \"zelda\";\n  src: url(\"scripts/resources/fonts/retganon.woff2\"); }\n\nhud {\n  color: white;\n  font-family: zelda;\n  height: 100px;\n  flex: 0 1 auto; }\n"; });
define('text!game/world/world.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./world.css\"></require>\n  <canvas height=\"300\" width=\"300\" ref=\"mainWorld\"></canvas>\n</template>\n"; });
define('text!game/world/world.css', ['module'], function(module) { module.exports = "world {\n  flex: 1;\n  color: white; }\n  world canvas {\n    background-color: white; }\n"; });
//# sourceMappingURL=app-bundle.js.map