class Card {
  constructor(_suit, _num, _pos) {
    if (!validateSuit(_suit)) {
      console.log('invalid card suit')
      _suit = 'NONE'
    }

    if (!validateNum(_num)) {
      _num = 0
    }

    this.suit = _suit
    if (this.suit == 'CLUBS' || this.suit == 'SPADES') this.color = 'black'
    else this.color = 'red'

    this.num = _num
    if (_pos === undefined) this.pos = {x: 0, y: 0}
    else this.pos = _pos

    this.dims = {x:70, y:100}
    this.zindex = 0
  }

  draw(_d) {
    _d.fill('white')
    _d.stroke('black')
    _d.strokeWeight(2)
    _d.rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y)

    _d.fill(this.color)
    _d.textSize(20)
    _d.text(`${numToSymbol(this.num)} ${suitToSymbol(this.suit)}`, this.pos.x + 10, this.pos.y + 25)
  }
}

let validateSuit = _suit => {
  if (_suit === 'CLUBS') return true
  if (_suit === 'HEARTS') return true
  if (_suit === 'DIAMONDS') return true
  if (_suit === 'SPADES') return true

  return false
}

let validateNum = _num => {
  if (typeof(_num) === 'number') {
    if (_num < 1) return false
    if (_num > 13) return false
    return true
  }
  
  if(typeof(_num) === 'string') {
    if (
      _num === 'J' || 
      _num === 'j' || 
      _num === 'Q' || 
      _num === 'q' || 
      _num === 'K' || 
      _num === 'k' ||
      _num === 'A' ||
      _num === 'a'
      ) return true
    return false
  }
  
  return false
}

let numToSymbol = _num => {
  if (typeof(_num) === 'number') {
    if (_num === 0) return 'X'
    if (_num === 1) return 'A'
    if (_num === 11) return 'J'
    if (_num === 12) return 'Q'
    if (_num === 13) return 'K'
    return _num
  }
  
  if (typeof(_num) === 'string') {
    return _num.toUpperCase()
  }

  return 'X'
}

let suitToSymbol = _suit => {
  if (_suit === 'CLUBS') return '♣️'
  if (_suit === 'HEARTS') return '♥️'
  if (_suit === 'DIAMONDS') return '♦️'
  if (_suit === 'SPADES') return '♠️'

  return 'X'
}
