;(() => {
  let d

  let cards = []
  let selectedCard = null
  let selectOffset = {x:0, y:0}

  Window.cards = cards
  
  let setup = () => {
    d = new Mindrawingjs()
    d.setup('myCanvas')
    windowResize()

    // d.c.addEventListener('click', mouseclickHandler, false)
    d.c.addEventListener('mousedown', mousedownHandler, false)
    d.c.addEventListener('mouseup', mouseupHandler, false)
    d.c.addEventListener('mousemove', mousemoveHandler, false)
    d.c.addEventListener('touchstart', touchdownHandler, false)
    d.c.addEventListener('touchend', mouseupHandler, false)
    d.c.addEventListener('touchmove', touchmoveHandler, false)


    for (let i = 1; i <= 13; i++) {
      cards.push(new Card('HEARTS', i, {x:d.width * Math.random(), y:d.height * Math.random()}))
      cards.push(new Card('DIAMONDS', i, {x:d.width * Math.random(), y:d.height * Math.random()}))
      cards.push(new Card('SPADES', i, {x:d.width * Math.random(), y:d.height * Math.random()}))
      cards.push(new Card('CLUBS', i, {x:d.width * Math.random(), y:d.height * Math.random()}))
    }
  }
  
  let windowResize = () => {
    let rect = d.c.parentNode.getBoundingClientRect()
    d.setCanvasSize(rect.width, rect.height)
  }
  
  let draw = () => {
    d.background('black')
    d.fill('white')

    cards.forEach(_card => {
      _card.draw(d)
    })

    window.requestAnimationFrame(draw)
  }
  
  // window.onresize = function(event) {
  //   windowResize()
  //   draw()
  // }
  
  let tick = () => {
    draw()
  }
  
  let mouseclickHandler = e => {
    console.log('mouse click')
  }
  
  let mousedownHandler = e => {
    // console.log('mouse down', e)
    for (let i = cards.length - 1; i >= 0; i--) {
      if (
        e.clientX >= cards[i].pos.x
        && e.clientX <= cards[i].pos.x + cards[i].dims.x
        && e.clientY >= cards[i].pos.y
        && e.clientY <= cards[i].pos.y + cards[i].dims.y
      ) {
        selectedCard = cards[i]
        selectOffset.x = e.clientX - cards[i].pos.x
        selectOffset.y = e.clientY - cards[i].pos.y
        cards.push(cards.splice(i, 1)[0]) // move card to end of array so drawn on top
        break
      }
    }
  }
  
  let touchdownHandler = e => {
    console.log('touch down')
  }
  
  let mouseupHandler = e => {
    console.log('mouse up / touch up')
    selectedCard = null
  }
  
  let mousemoveHandler = (e) => {
    // console.log('mouse move')
    if (selectedCard !== null) {
      selectedCard.pos.x = e.clientX - selectOffset.x
      selectedCard.pos.y = e.clientY - selectOffset.y
    }
  }
  
  let touchmoveHandler = (e) => {
    console.log('touch move')
  }
  
  setup()
  // setInterval(tick, 1000 / 60)

  window.requestAnimationFrame(draw)
})()

