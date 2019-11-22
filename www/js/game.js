class Game {
  constructor(_d, _seed) {
    this.cards = []
    this.moves = 0
    this.undos = 0
    this.starttime = Date.now()
    this.undoStack = []

    this.d = _d

    if (typeof(_seed) === 'number') this.seed = _seed
    else this.seed = Math.floor(Math.random() * 32000) + 1 // use floor + 1 not ceil in case a 0

    this.stacks = {
      opencells: new Array(4).fill(null),
      foundations: [[],[],[],[]],
      table: [[],[],[],[],[],[],[],[]]
      // this causes the tables to all be same table. BAD. 
      // table: new Array(8).fill([])
    }

    for (let i = 1; i <= 13; i++) {
      this.cards.push(new Card('CLUBS', i, {x:_d.width * Math.random(), y:_d.height * Math.random()}))
      this.cards.push(new Card('DIAMONDS', i, {x:_d.width * Math.random(), y:_d.height * Math.random()}))
      this.cards.push(new Card('HEARTS', i, {x:_d.width * Math.random(), y:_d.height * Math.random()}))
      this.cards.push(new Card('SPADES', i, {x:_d.width * Math.random(), y:_d.height * Math.random()}))
    }

    let tempcards = [...this.cards]
    let count = 0;
    let lcg = new Lcg(this.seed)
    while (tempcards.length > 0) {
      let i = lcg.getNext() % tempcards.length
      let last = tempcards[tempcards.length - 1]
      tempcards[tempcards.length - 1] = tempcards[i]
      tempcards[i] = last
      
      this.stacks.table[count].push(tempcards.pop())
      count++
      if (count >= 8) count = 0
    }

    this.alignCards()
  }

  draw(_d) {
    for (let i = 0; i < 8; i++) {
      _d.stroke('white')
      _d.fill('black')
      _d.rect(_d.width * (i + 1) / 9, 50, CARD_WIDTH, CARD_HEIGHT)
      _d.rect(_d.width * (i + 1) / 9, 200, CARD_WIDTH, CARD_HEIGHT)
    }

    this.cards.forEach(_card => {
      _card.draw(_d)
    })
  }

  getCard(_x, _y) {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      if (
        _x >= this.cards[i].pos.x
        && _x <= this.cards[i].pos.x + this.cards[i].dims.x
        && _y >= this.cards[i].pos.y
        && _y <= this.cards[i].pos.y + this.cards[i].dims.y
      ) {
        this.cards.push(this.cards.splice(i, 1)[0]) // move card to end of array so drawn on top
        
        return this.cards[this.cards.length - 1]
      }
    }

    return null
  }

  alignCards() {
    this.stacks.table.forEach((_stack, _count) => {
      _stack.forEach((_card, _cardCount) => {
        _card.pos.x = this.d.width * (_count + 1) / 9
        _card.pos.y = 200 + _cardCount * 40
        _card.zindex = _cardCount
      })
    })

    this.stacks.foundations.forEach((_stack, _count) => {
      _stack.forEach((_card, _cardCount) => {
        _card.pos.x = this.d.width * (_count + 1) / 9
        _card.pos.y = 50
        _card.zindex = _cardCount
      })
    })

    this.stacks.opencells.forEach((_opencell, _count) => {
      if (_opencell !== null) {
        _opencell.pos.x = this.d.width * (_count + 1 + 4) / 9
        _opencell.pos.y = 50
        _opencell.zindex = 0
      }
    })

    this.sortCardZindex()
  }

  sortCardZindex() {
    this.cards.sort((a, b) => a.zindex - b.zindex)
  }

  findInStacks(_card) {
    for (let i = 0; i < this.stacks.table.length; i++) {
      for (let j = 0; j < this.stacks.table[i].length; j++) {
        if (_card === this.stacks.table[i][j]) {
          if (j === this.stacks.table[i].length - 1) return i
          else return -1
        }
      }
    }

    for (let i = 0; i < this.stacks.opencells.length; i++) {
      if (_card === this.stacks.opencells[i]) return i + 12
    }

    return -1
  }

  moveCard(_card, _dest) {
    let col = this.findInStacks(_card)

    console.log(col)

    let validMove = true
    if (_dest === -1) validMove = false
    else if (col === -1) validMove = false
    else if (col === _dest) validMove = false
    else if (!this.checkValidDest(_card, _dest)) validMove = false
    
    if (validMove) {
      // do this first as col is modified later
      this.undoStack.push({card:_card, from: col, to: _dest})
      this.moves++

      if (col < 8) {
        if (_dest < 8) this.stacks.table[_dest].push(this.stacks.table[col].pop())
        else if(_dest < 12) this.stacks.foundations[_dest - 8].push(this.stacks.table[col].pop())
        else if(_dest < 16) this.stacks.opencells[_dest - 12] = this.stacks.table[col].pop()
      } else {
        col -= 12 // if undo saving done after here will cause problems
        if (_dest < 8) {
          this.stacks.table[_dest].push(this.stacks.opencells[col])
          this.stacks.opencells[col] = null
        } else if(_dest < 12) {
          this.stacks.foundations[_dest - 8].push(this.stacks.opencells[col])
          this.stacks.opencells[col] = null
        }
        else if(_dest < 16) {
          this.stacks.opencells[_dest - 12] = this.stacks.opencells[col]
          this.stacks.opencells[col] = null
        }
      }

    }

    this.alignCards()
  }

  undo() {
    if (this.undoStack.length > 0) {
      let action = this.undoStack.pop()
      
      // Note: to and from reversed as undoing
      if (action.from < 8) {
        if (action.to < 8) {
          this.stacks.table[action.from].push(this.stacks.table[action.to].pop())
        } else if (action.to < 12) {
          this.stacks.table[action.from].push(this.stacks.foundations[action.to - 8].pop())          
        } else {
          this.stacks.table[action.from].push(this.stacks.opencells[action.to - 12])
          this.stacks.opencells[action.to - 12] = null
        }
      } else if (action.from < 12) {
        if (action.to < 8) {
          this.stacks.opencells[action.from - 8].push(this.stacks.table[action.to].pop())
        } else if (action.to < 12) {
          this.stacks.opencells[action.from - 8].push(this.stacks.foundations[action.to - 8].pop())          
        } else {
          this.stacks.opencells[action.from - 8].push(this.stacks.opencells[action.to - 12])
          this.stacks.opencells[action.to - 12] = null
        }
      } else {
        if (action.to < 8) {
          this.stacks.opencells[action.from - 12] = this.stacks.table[action.to].pop()
        } else if (action.to < 12) {
          this.stacks.opencells[action.from - 12] = this.stacks.foundations[action.to - 8].pop()
        } else {
          this.stacks.opencells[action.from - 12] = this.stacks.opencells[action.to - 12]
          this.stacks.opencells[action.to - 12] = null
        }
      }

      this.moves++
      this.undos++
      this.alignCards()
    }
  }

  checkValidDest(_card, _dest) {
    let out = false

    if (_dest < 8) {
      if (this.stacks.table[_dest].length === 0) out = true
      else {
        let lastcard = this.stacks.table[_dest].slice(-1)[0]
        if (lastcard.color !== _card.color && (lastcard.num - 1) === _card.num) out = true
      }
    } else if (_dest < 12) {
      if (this.stacks.foundations[_dest - 8].length === 0) {
        if (_card.num === 1) out = true
      } else {
        let lastcard = this.stacks.foundations[_dest - 8].slice(-1)[0]
        if (lastcard.suit === _card.suit && (lastcard.num + 1) === _card.num) out = true
      }
    } else if (_dest < 16) {
      if (this.stacks.opencells[_dest - 12] === null) out = true
    }

    return out
  }

  getStackFromMouse(_x, _y) {
    let index = Math.floor(_x * 9 / this.d.width) - 1
    let out = -1
    if (_x - this.d.width * (index + 1) / 9 <= CARD_WIDTH) out = index
    if (out !== -1 && _y < 200) out += 8
    return out
  }

}