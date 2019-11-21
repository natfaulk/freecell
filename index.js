;(() => {
  let d

  let game = null
  let selectedCard = null
  let selectOffset = {x:0, y:0}
  
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


    game = new Game(d)
  }
  
  let windowResize = () => {
    let rect = d.c.parentNode.getBoundingClientRect()
    d.setCanvasSize(rect.width, rect.height)
  }
  
  let draw = () => {
    d.background('black')
    d.fill('white')

    if (game !== null) {
      game.draw(d)
    }

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
    if (game !== null) {
      let card = game.getCard(e.clientX, e.clientY)

      if (card !== null) {
        selectedCard = card
        selectOffset.x = e.clientX - card.pos.x
        selectOffset.y = e.clientY - card.pos.y
      }
    }
  }
  
  let touchdownHandler = e => {
    console.log('touch down')
  }
  
  let mouseupHandler = e => {
    console.log('mouse up / touch up')
    game.moveCard(selectedCard, game.getStackFromMouse(e.clientX, e.clientY))
    selectedCard = null
  }
  
  let mousemoveHandler = (e) => {
    // console.log('mouse move')
    if (selectedCard !== null) {
      selectedCard.pos.x = e.clientX - selectOffset.x
      selectedCard.pos.y = e.clientY - selectOffset.y
    }

    // if (game !== null) {
    //   console.log(game.getStackFromMouse(e.clientX, e.clientY))
    // }
  }
  
  let touchmoveHandler = (e) => {
    console.log('touch move')
  }
  
  setup()
  // setInterval(tick, 1000 / 60)

  window.requestAnimationFrame(draw)
})()

