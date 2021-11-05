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

  // src/app.js
  var import_mindrawingjs = __toModule(require_mindrawing_min());

  // src/cards.js
  var CARD_DIMS = { x: 10, y: 10, fontsize: 20 };
  var CARD_X_MARGIN = 5;
  var updateCardDims = (_d) => {
    CARD_DIMS.x = (_d.width - CARD_X_MARGIN) / 8 - CARD_X_MARGIN;
    CARD_DIMS.y = CARD_DIMS.x * 1.4;
    CARD_DIMS.fontsize = Math.round(CARD_DIMS.x * 0.3);
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
      _d.rect(this.pos.x, this.pos.y, CARD_DIMS.x, CARD_DIMS.y);
      _d.fill(this.color);
      _d.textSize(CARD_DIMS.fontsize);
      _d.text(`${numToSymbol(this.num)} ${suitToSymbol(this.suit)}`, this.pos.x + 10, this.pos.y + Math.ceil(CARD_DIMS.fontsize * 1.2));
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
      let tempcards = [...this.cards];
      let count = 0;
      let lcg = new Lcg(this.seed);
      while (tempcards.length > 0) {
        let i = lcg.getNext() % tempcards.length;
        let last = tempcards[tempcards.length - 1];
        tempcards[tempcards.length - 1] = tempcards[i];
        tempcards[i] = last;
        this.stacks.table[count].push(tempcards.pop());
        count++;
        if (count >= 8)
          count = 0;
      }
      updateCardDims(_d);
      this.alignCards();
    }
    draw(_d) {
      updateCardDims(_d);
      for (let i = 0; i < 8; i++) {
        _d.stroke("white");
        _d.fill("black");
        _d.rect(CARD_X_MARGIN + i * (CARD_DIMS.x + CARD_X_MARGIN), 200, CARD_DIMS.x, CARD_DIMS.y);
        _d.rect(CARD_X_MARGIN + i * (CARD_DIMS.x + CARD_X_MARGIN), 200 + 1.5 * CARD_DIMS.y, CARD_DIMS.x, CARD_DIMS.y);
      }
      this.cards.forEach((_card) => {
        _card.draw(_d);
      });
    }
    getCard(_x, _y) {
      for (let i = this.cards.length - 1; i >= 0; i--) {
        if (_x >= this.cards[i].pos.x && _x <= this.cards[i].pos.x + CARD_DIMS.x && _y >= this.cards[i].pos.y && _y <= this.cards[i].pos.y + CARD_DIMS.y) {
          this.cards.push(this.cards.splice(i, 1)[0]);
          return this.cards[this.cards.length - 1];
        }
      }
      return null;
    }
    alignCards() {
      this.stacks.table.forEach((_stack, _count) => {
        _stack.forEach((_card, _cardCount) => {
          _card.pos.x = CARD_X_MARGIN + _count * (CARD_DIMS.x + CARD_X_MARGIN);
          _card.pos.y = 200 + 1.5 * CARD_DIMS.y + 0.3 * CARD_DIMS.y * _cardCount;
          _card.zindex = _cardCount;
        });
      });
      this.stacks.foundations.forEach((_stack, _count) => {
        _stack.forEach((_card, _cardCount) => {
          _card.pos.x = CARD_X_MARGIN + _count * (CARD_DIMS.x + CARD_X_MARGIN);
          _card.pos.y = 200;
          _card.zindex = _cardCount;
        });
      });
      this.stacks.opencells.forEach((_opencell, _count) => {
        if (_opencell !== null) {
          _opencell.pos.x = CARD_X_MARGIN + (_count + 4) * (CARD_DIMS.x + CARD_X_MARGIN);
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
        let action = this.undoStack.pop();
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
          let lastcard = this.stacks.table[_dest].slice(-1)[0];
          if (lastcard.color !== _card.color && lastcard.num - 1 === _card.num)
            out = true;
        }
      } else if (_dest < 12) {
        if (this.stacks.foundations[_dest - 8].length === 0) {
          if (_card.num === 1)
            out = true;
        } else {
          let lastcard = this.stacks.foundations[_dest - 8].slice(-1)[0];
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
      let index = Math.floor((_x - CARD_X_MARGIN) / CARD_DIMS.x);
      let out = -1;
      if (_x - CARD_DIMS.x * index <= CARD_DIMS.x)
        out = index;
      if (out !== -1 && _y < 200 + CARD_DIMS.y * 1.5)
        out += 8;
      return out;
    }
  };

  // src/app.js
  var game = null;
  var d;
  var newGame = () => {
    game = new Game(d);
    let seedDiv = document.getElementById("seed");
    seedDiv.innerHTML = `Seed: ${game.seed}`;
  };
  var undo = () => {
    game.undo();
  };
  var toScaled = (_val) => Math.round(_val * window.devicePixelRatio);
  var main = () => {
    console.log(window.devicePixelRatio);
    let selectedCard = null;
    let selectOffset = { x: 0, y: 0 };
    let lastTouchPos = null;
    let setup = () => {
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
    let windowResize = () => {
      let rect = d.c.parentNode.getBoundingClientRect();
      d.setCanvasSize(rect.width * window.devicePixelRatio, rect.height * window.devicePixelRatio);
    };
    let draw = () => {
      d.background("black");
      d.fill("white");
      if (game !== null) {
        game.draw(d);
        let timeDiv = document.getElementById("time");
        timeDiv.innerHTML = `Time: ${Math.floor((Date.now() - game.starttime) / 1e3)}`;
      }
      window.requestAnimationFrame(draw);
    };
    let tick = () => {
      draw();
    };
    let mouseclickHandler = (e) => {
      console.log("mouse click");
    };
    let mousedownHandler = (e) => {
      console.log("MD", e.clientX, e.clientY);
      if (game !== null) {
        let card = game.getCard(e.clientX, e.clientY);
        if (card !== null) {
          selectedCard = card;
          selectOffset.x = e.clientX - card.pos.x;
          selectOffset.y = e.clientY - card.pos.y;
        }
      }
    };
    let mouseupHandler = (e) => {
      if (selectedCard !== null) {
        console.log("mouse up");
        game.moveCard(selectedCard, game.getStackFromMouse(e.clientX, e.clientY));
        selectedCard = null;
        let movesDiv = document.getElementById("moves");
        movesDiv.innerHTML = `Moves: ${game.moves}`;
      }
    };
    let mousemoveHandler = (e) => {
      console.log("mouse move", e.clientX, e.clientY);
      if (selectedCard !== null) {
        selectedCard.pos.x = e.clientX - selectOffset.x;
        selectedCard.pos.y = e.clientY - selectOffset.y;
      }
    };
    let touchdownHandler = (e) => {
      console.log("touch down");
      lastTouchPos = { clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY) };
      mousedownHandler(lastTouchPos);
      e.preventDefault();
    };
    let touchmoveHandler = (e) => {
      console.log("touch move", e.touches);
      lastTouchPos = { clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY) };
      mousemoveHandler(lastTouchPos);
      e.preventDefault();
    };
    let touchupHandler = (e) => {
      mouseupHandler(lastTouchPos);
      e.preventDefault();
    };
    setup();
    window.requestAnimationFrame(draw);
  };
  main();
})();
//# sourceMappingURL=main.js.map
