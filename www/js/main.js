(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/mindrawingjs/build/mindrawing.min.js
  var require_mindrawing_min = __commonJS({
    "node_modules/mindrawingjs/build/mindrawing.min.js"(exports, module) {
      Mindrawingjs = function() {
      }, Mindrawingjs.prototype.setup = function(t, i, e) {
        this.c = typeof t == "string" ? document.getElementById(t) : t, this.ctx = this.c.getContext("2d"), arguments.length == 3 && (this.c.width = i, this.c.height = e), this.width = this.c.width, this.height = this.c.height;
      }, Mindrawingjs.prototype.setCanvasSize = function(t, i) {
        this.c.width = t, this.c.height = i, this.width = this.c.width, this.height = this.c.height;
      }, Mindrawingjs.prototype.background = function(t) {
        this.ctx.fillStyle = t, this.ctx.fillRect(0, 0, this.width, this.height);
      }, Mindrawingjs.prototype.line = function(t, i, e, n) {
        this.ctx.lineWidth == 1 && (t += 0.5, i += 0.5, e += 0.5, n += 0.5), this.ctx.beginPath(), this.ctx.moveTo(t, i), this.ctx.lineTo(e, n), this.ctx.stroke();
      }, Mindrawingjs.prototype.bezier = function(t, i, e, n, s, h, o, c) {
        this.ctx.beginPath(), this.ctx.moveTo(t, i), this.ctx.bezierCurveTo(s, h, o, c, e, n), this.ctx.stroke();
      }, Mindrawingjs.prototype.stroke = function(t) {
        this.ctx.strokeStyle = t;
      }, Mindrawingjs.prototype.strokeWeight = function(t) {
        this.ctx.lineWidth = t;
      }, Mindrawingjs.prototype.fill = function(t) {
        this.ctx.fillStyle = t;
      }, Mindrawingjs.prototype.rect = function(t, i, e, n) {
        this.ctx.beginPath(), this.ctx.rect(t, i, e, n), this.ctx.fill(), this.ctx.lineWidth && this.ctx.stroke();
      }, Mindrawingjs.prototype.rotatedRect = function(t, i, e, n, s, h, o) {
        h === void 0 && (h = 0), o === void 0 && (o = 0), this.ctx.save(), this.ctx.translate(t, i), this.ctx.rotate(s), this.rect(-h, -o, e, n), this.ctx.restore();
      }, Mindrawingjs.prototype.text = function(t, i, e) {
        this.ctx.fillText(t, i, e);
      }, Mindrawingjs.prototype.textSize = function(t) {
        this.ctx.font = t + "px Arial";
      }, Mindrawingjs.prototype.ellipse = function(t, i, e, n) {
        arguments.length == 3 && (n = e), this.ctx.beginPath(), this.ctx.ellipse(t, i, e / 2, n / 2, 0, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.lineWidth && this.ctx.stroke();
      }, Mindrawingjs.prototype.getCtx = function() {
        return this.ctx;
      }, typeof module != "undefined" && module.exports && (module.exports = Mindrawingjs);
    }
  });

  // node_modules/@natfaulk/supersimplelogger/src/index.js
  var require_src = __commonJS({
    "node_modules/@natfaulk/supersimplelogger/src/index.js"(exports, module) {
      var makeLogger2 = (_prefix) => {
        let p = "";
        if (typeof process !== "undefined" && process.env.SSLOGGER_PROCESS_PREFIX !== void 0) {
          p = `[${process.env.SSLOGGER_PROCESS_PREFIX}] `;
        }
        if (_prefix !== void 0)
          p += `[${_prefix}] `;
        if (p === "")
          return console.log;
        return (...args) => {
          if (typeof args[0] === "string")
            args[0] = p + " " + args[0];
          else
            args.unshift(p);
          console.log.apply(console, args);
        };
      };
      if (typeof module !== "undefined" && module.exports) {
        module.exports = makeLogger2;
      } else
        window.makeLogger = makeLogger2;
    }
  });

  // src/app.js
  var import_mindrawingjs = __toModule(require_mindrawing_min());

  // src/cards.js
  var CardDims = class {
    constructor() {
      this.x = 10;
      this.y = 10;
      this.xMargin = 5;
    }
    update(_d) {
      this.x = (_d.width - this.xMargin) / 8 - this.xMargin;
      this.y = this.x * 1.4;
      this.fontsize = Math.round(this.x * 0.3);
    }
  };
  var cardDims = new CardDims();
  var getCardDims = () => {
    return cardDims;
  };
  var Card = class {
    constructor(_suit, _num, _pos) {
      if (!validateSuit(_suit)) {
        console.log("invalid card suit");
        _suit = "NONE";
      }
      if (!validateNum(_num)) {
        _num = 0;
      }
      this.suit = _suit;
      if (this.suit == "CLUBS" || this.suit == "SPADES")
        this.color = "black";
      else
        this.color = "red";
      this.num = _num;
      if (_pos === void 0)
        this.pos = { x: 0, y: 0 };
      else
        this.pos = _pos;
      this.zindex = 0;
    }
    draw(_d) {
      _d.fill("white");
      _d.stroke("black");
      _d.strokeWeight(2);
      _d.rect(this.pos.x, this.pos.y, cardDims.x, cardDims.y);
      _d.fill(this.color);
      _d.textSize(cardDims.fontsize);
      _d.text(`${numToSymbol(this.num)} ${suitToSymbol(this.suit)}`, this.pos.x + 10, this.pos.y + Math.ceil(cardDims.fontsize * 1.2));
    }
  };
  var validateSuit = (_suit) => {
    if (_suit === "CLUBS")
      return true;
    if (_suit === "HEARTS")
      return true;
    if (_suit === "DIAMONDS")
      return true;
    if (_suit === "SPADES")
      return true;
    return false;
  };
  var validateNum = (_num) => {
    if (typeof _num === "number") {
      if (_num < 1)
        return false;
      if (_num > 13)
        return false;
      return true;
    }
    if (typeof _num === "string") {
      if (_num === "J" || _num === "j" || _num === "Q" || _num === "q" || _num === "K" || _num === "k" || _num === "A" || _num === "a")
        return true;
      return false;
    }
    return false;
  };
  var numToSymbol = (_num) => {
    if (typeof _num === "number") {
      if (_num === 0)
        return "X";
      if (_num === 1)
        return "A";
      if (_num === 11)
        return "J";
      if (_num === 12)
        return "Q";
      if (_num === 13)
        return "K";
      return _num;
    }
    if (typeof _num === "string") {
      return _num.toUpperCase();
    }
    return "X";
  };
  var suitToSymbol = (_suit) => {
    if (_suit === "CLUBS")
      return "\u2663\uFE0F";
    if (_suit === "HEARTS")
      return "\u2665\uFE0F";
    if (_suit === "DIAMONDS")
      return "\u2666\uFE0F";
    if (_suit === "SPADES")
      return "\u2660\uFE0F";
    return "X";
  };

  // src/lcg.js
  var Lcg = class {
    constructor(_seed) {
      this.state = _seed;
    }
    getNext() {
      this.state = (214013 * this.state + 2531011) % 2147483648;
      return this.state >> 16;
    }
  };

  // src/game.js
  var Game = class {
    constructor(_d, _seed) {
      this.cards = [];
      this.moves = 0;
      this.undos = 0;
      this.starttime = Date.now();
      this.undoStack = [];
      this.cardDims = getCardDims();
      this.d = _d;
      if (typeof _seed === "number")
        this.seed = _seed;
      else
        this.seed = Math.floor(Math.random() * 32e3) + 1;
      this.stacks = {
        opencells: new Array(4).fill(null),
        foundations: [[], [], [], []],
        table: [[], [], [], [], [], [], [], []]
      };
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new Card("CLUBS", i, { x: _d.width * Math.random(), y: _d.height * Math.random() }));
        this.cards.push(new Card("DIAMONDS", i, { x: _d.width * Math.random(), y: _d.height * Math.random() }));
        this.cards.push(new Card("HEARTS", i, { x: _d.width * Math.random(), y: _d.height * Math.random() }));
        this.cards.push(new Card("SPADES", i, { x: _d.width * Math.random(), y: _d.height * Math.random() }));
      }
      const tempcards = [...this.cards];
      let count = 0;
      const lcg = new Lcg(this.seed);
      while (tempcards.length > 0) {
        const i = lcg.getNext() % tempcards.length;
        const last = tempcards[tempcards.length - 1];
        tempcards[tempcards.length - 1] = tempcards[i];
        tempcards[i] = last;
        this.stacks.table[count].push(tempcards.pop());
        count++;
        if (count >= 8)
          count = 0;
      }
      this.cardDims.update(_d);
      this.alignCards();
    }
    draw(_d) {
      this.cardDims.update(_d);
      for (let i = 0; i < 8; i++) {
        _d.stroke("white");
        _d.fill("black");
        _d.rect(this.cardDims.xMargin + i * (this.cardDims.x + this.cardDims.xMargin), 200, this.cardDims.x, this.cardDims.y);
        _d.rect(this.cardDims.xMargin + i * (this.cardDims.x + this.cardDims.xMargin), 200 + 1.5 * this.cardDims.y, this.cardDims.x, this.cardDims.y);
      }
      this.cards.forEach((_card) => {
        _card.draw(_d);
      });
    }
    getCard(_x, _y) {
      for (let i = this.cards.length - 1; i >= 0; i--) {
        if (_x >= this.cards[i].pos.x && _x <= this.cards[i].pos.x + this.cardDims.x && _y >= this.cards[i].pos.y && _y <= this.cards[i].pos.y + this.cardDims.y) {
          this.cards.push(this.cards.splice(i, 1)[0]);
          return this.cards[this.cards.length - 1];
        }
      }
      return null;
    }
    alignCards() {
      this.stacks.table.forEach((_stack, _count) => {
        _stack.forEach((_card, _cardCount) => {
          _card.pos.x = this.cardDims.xMargin + _count * (this.cardDims.x + this.cardDims.xMargin);
          _card.pos.y = 200 + 1.5 * this.cardDims.y + 0.3 * this.cardDims.y * _cardCount;
          _card.zindex = _cardCount;
        });
      });
      this.stacks.foundations.forEach((_stack, _count) => {
        _stack.forEach((_card, _cardCount) => {
          _card.pos.x = this.cardDims.xMargin + _count * (this.cardDims.x + this.cardDims.xMargin);
          _card.pos.y = 200;
          _card.zindex = _cardCount;
        });
      });
      this.stacks.opencells.forEach((_opencell, _count) => {
        if (_opencell !== null) {
          _opencell.pos.x = this.cardDims.xMargin + (_count + 4) * (this.cardDims.x + this.cardDims.xMargin);
          _opencell.pos.y = 200;
          _opencell.zindex = 0;
        }
      });
      this.sortCardZindex();
    }
    sortCardZindex() {
      this.cards.sort((a, b) => a.zindex - b.zindex);
    }
    findInStacks(_card) {
      for (let i = 0; i < this.stacks.table.length; i++) {
        for (let j = 0; j < this.stacks.table[i].length; j++) {
          if (_card === this.stacks.table[i][j]) {
            if (j === this.stacks.table[i].length - 1)
              return i;
            else
              return -1;
          }
        }
      }
      for (let i = 0; i < this.stacks.opencells.length; i++) {
        if (_card === this.stacks.opencells[i])
          return i + 12;
      }
      return -1;
    }
    moveCard(_card, _dest) {
      let col = this.findInStacks(_card);
      console.log(col);
      let validMove = true;
      if (_dest === -1)
        validMove = false;
      else if (col === -1)
        validMove = false;
      else if (col === _dest)
        validMove = false;
      else if (!this.checkValidDest(_card, _dest))
        validMove = false;
      if (validMove) {
        this.undoStack.push({ card: _card, from: col, to: _dest });
        this.moves++;
        if (col < 8) {
          if (_dest < 8)
            this.stacks.table[_dest].push(this.stacks.table[col].pop());
          else if (_dest < 12)
            this.stacks.foundations[_dest - 8].push(this.stacks.table[col].pop());
          else if (_dest < 16)
            this.stacks.opencells[_dest - 12] = this.stacks.table[col].pop();
        } else {
          col -= 12;
          if (_dest < 8) {
            this.stacks.table[_dest].push(this.stacks.opencells[col]);
            this.stacks.opencells[col] = null;
          } else if (_dest < 12) {
            this.stacks.foundations[_dest - 8].push(this.stacks.opencells[col]);
            this.stacks.opencells[col] = null;
          } else if (_dest < 16) {
            this.stacks.opencells[_dest - 12] = this.stacks.opencells[col];
            this.stacks.opencells[col] = null;
          }
        }
      }
      this.alignCards();
    }
    undo() {
      if (this.undoStack.length > 0) {
        const action = this.undoStack.pop();
        if (action.from < 8) {
          if (action.to < 8) {
            this.stacks.table[action.from].push(this.stacks.table[action.to].pop());
          } else if (action.to < 12) {
            this.stacks.table[action.from].push(this.stacks.foundations[action.to - 8].pop());
          } else {
            this.stacks.table[action.from].push(this.stacks.opencells[action.to - 12]);
            this.stacks.opencells[action.to - 12] = null;
          }
        } else if (action.from < 12) {
          if (action.to < 8) {
            this.stacks.opencells[action.from - 8].push(this.stacks.table[action.to].pop());
          } else if (action.to < 12) {
            this.stacks.opencells[action.from - 8].push(this.stacks.foundations[action.to - 8].pop());
          } else {
            this.stacks.opencells[action.from - 8].push(this.stacks.opencells[action.to - 12]);
            this.stacks.opencells[action.to - 12] = null;
          }
        } else {
          if (action.to < 8) {
            this.stacks.opencells[action.from - 12] = this.stacks.table[action.to].pop();
          } else if (action.to < 12) {
            this.stacks.opencells[action.from - 12] = this.stacks.foundations[action.to - 8].pop();
          } else {
            this.stacks.opencells[action.from - 12] = this.stacks.opencells[action.to - 12];
            this.stacks.opencells[action.to - 12] = null;
          }
        }
        this.moves++;
        this.undos++;
        this.alignCards();
      }
    }
    checkValidDest(_card, _dest) {
      let out = false;
      if (_dest < 8) {
        if (this.stacks.table[_dest].length === 0)
          out = true;
        else {
          const lastcard = this.stacks.table[_dest].slice(-1)[0];
          if (lastcard.color !== _card.color && lastcard.num - 1 === _card.num)
            out = true;
        }
      } else if (_dest < 12) {
        if (this.stacks.foundations[_dest - 8].length === 0) {
          if (_card.num === 1)
            out = true;
        } else {
          const lastcard = this.stacks.foundations[_dest - 8].slice(-1)[0];
          if (lastcard.suit === _card.suit && lastcard.num + 1 === _card.num)
            out = true;
        }
      } else if (_dest < 16) {
        if (this.stacks.opencells[_dest - 12] === null)
          out = true;
      }
      return out;
    }
    getStackFromMouse(_x, _y) {
      const index = Math.floor((_x - this.cardDims.xMargin) / this.cardDims.x);
      let out = -1;
      if (_x - this.cardDims.x * index <= this.cardDims.x)
        out = index;
      if (out !== -1 && _y < 200 + this.cardDims.y * 1.5)
        out += 8;
      return out;
    }
  };

  // src/app.js
  var import_supersimplelogger = __toModule(require_src());
  var lg = (0, import_supersimplelogger.default)("App");
  var game = null;
  var d;
  var newGame = () => {
    game = new Game(d);
    const seedDiv = document.getElementById("seed");
    seedDiv.innerHTML = `Seed: ${game.seed}`;
  };
  var undo = () => {
    game.undo();
  };
  var toScaled = (_val) => Math.round(_val * window.devicePixelRatio);
  var main = () => {
    lg(`Device pixel ratio is: ${window.devicePixelRatio}`);
    let selectedCard = null;
    let lastTouchPos = null;
    const setup = () => {
      d = new import_mindrawingjs.default();
      d.setup("myCanvas");
      windowResize();
      d.c.addEventListener("mousedown", mousedownHandler, false);
      d.c.addEventListener("mouseup", mouseupHandler, false);
      d.c.addEventListener("mousemove", mousemoveHandler, false);
      d.c.addEventListener("touchstart", touchdownHandler, false);
      d.c.addEventListener("touchend", touchupHandler, false);
      d.c.addEventListener("touchmove", touchmoveHandler, false);
      document.getElementById("newgame").addEventListener("click", newGame);
      document.getElementById("undo").addEventListener("click", undo);
      newGame();
    };
    const windowResize = () => {
      const rect = d.c.parentNode.getBoundingClientRect();
      d.setCanvasSize(rect.width * window.devicePixelRatio, rect.height * window.devicePixelRatio);
    };
    const draw = () => {
      d.background("black");
      d.fill("white");
      if (game !== null) {
        game.draw(d);
        const timeDiv = document.getElementById("time");
        timeDiv.innerHTML = `Time: ${Math.floor((Date.now() - game.starttime) / 1e3)}`;
      }
      window.requestAnimationFrame(draw);
    };
    const mousedownHandler = (e) => {
      const xpos = toScaled(e.clientX);
      const ypos = toScaled(e.clientY);
      lg("MD", xpos, ypos);
      if (game !== null) {
        const card = game.getCard(xpos, ypos);
        if (card !== null) {
          selectedCard = card;
        }
      }
    };
    const mouseupHandler = (e) => {
      const xpos = toScaled(e.clientX);
      const ypos = toScaled(e.clientY);
      if (selectedCard !== null) {
        console.log("mouse up");
        game.moveCard(selectedCard, game.getStackFromMouse(xpos, ypos));
        selectedCard = null;
        const movesDiv = document.getElementById("moves");
        movesDiv.innerHTML = `Moves: ${game.moves}`;
      }
    };
    const mousemoveHandler = (e) => {
      const xpos = toScaled(e.clientX);
      const ypos = toScaled(e.clientY);
      const cardDims2 = getCardDims();
      if (selectedCard !== null) {
        selectedCard.pos.x = xpos - cardDims2.x / 2;
        selectedCard.pos.y = ypos - cardDims2.y / 2;
      }
    };
    const touchdownHandler = (e) => {
      console.log("touch down");
      lastTouchPos = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      mousedownHandler(lastTouchPos);
      e.preventDefault();
    };
    const touchmoveHandler = (e) => {
      console.log("touch move", e.touches);
      lastTouchPos = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      mousemoveHandler(lastTouchPos);
      e.preventDefault();
    };
    const touchupHandler = (e) => {
      mouseupHandler(lastTouchPos);
      e.preventDefault();
    };
    setup();
    window.requestAnimationFrame(draw);
  };
  main();
})();
//# sourceMappingURL=main.js.map
