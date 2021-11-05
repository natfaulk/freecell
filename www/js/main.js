let game = null
let d

let newGame = () => {
  game = new Game(d)
  let seedDiv = document.getElementById('seed')
  seedDiv.innerHTML = `Seed: ${game.seed}`
}

let undo = () => {
  game.undo()
}

let toScaled = _val => Math.round(_val * window.devicePixelRatio)

let main = () => {
  console.log(window.devicePixelRatio)

  let selectedCard = null
  let selectOffset = {x:0, y:0}
  let lastTouchPos = null
  
  let setup = () => {
    d = new Mindrawingjs()
    d.setup('myCanvas')
    windowResize()

    // d.c.addEventListener('click', mouseclickHandler, false)
    d.c.addEventListener('mousedown', mousedownHandler, false)
    d.c.addEventListener('mouseup', mouseupHandler, false)
    d.c.addEventListener('mousemove', mousemoveHandler, false)
    d.c.addEventListener('touchstart', touchdownHandler, false)
    d.c.addEventListener('touchend', touchupHandler, false)
    d.c.addEventListener('touchmove', touchmoveHandler, false)

    document.getElementById("newgame").addEventListener('click', newGame)
    document.getElementById("undo").addEventListener('click', undo)

    newGame()
  }
  
  let windowResize = () => {
    let rect = d.c.parentNode.getBoundingClientRect()
    d.setCanvasSize(rect.width * window.devicePixelRatio, rect.height * window.devicePixelRatio)
  }
  
  let draw = () => {
    d.background('black')
    d.fill('white')

    if (game !== null) {
      game.draw(d)

      let timeDiv = document.getElementById('time')
      timeDiv.innerHTML = `Time: ${Math.floor((Date.now() - game.starttime) / 1000)}`
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
    console.log('MD', e.clientX, e.clientY)
    if (game !== null) {
      let card = game.getCard(e.clientX, e.clientY)
      
      if (card !== null) {
        selectedCard = card
        selectOffset.x = e.clientX - card.pos.x
        selectOffset.y = e.clientY - card.pos.y
      }
    }
  }
  
  let mouseupHandler = e => {
    if (selectedCard !== null) {
      console.log('mouse up')
      game.moveCard(selectedCard, game.getStackFromMouse(e.clientX, e.clientY))
      selectedCard = null
      
      let movesDiv = document.getElementById('moves')
      movesDiv.innerHTML = `Moves: ${game.moves}`
    }
  }
  
  let mousemoveHandler = (e) => {
    console.log('mouse move', e.clientX, e.clientY)
    if (selectedCard !== null) {
      selectedCard.pos.x = e.clientX - selectOffset.x
      selectedCard.pos.y = e.clientY - selectOffset.y
    }

    // if (game !== null) {
    //   console.log(game.getStackFromMouse(e.clientX, e.clientY))
    // }
  }
  
  let touchdownHandler = e => {
    console.log('touch down')
    lastTouchPos = {clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY)}
    mousedownHandler(lastTouchPos)
    e.preventDefault()
  }
  
  let touchmoveHandler = e => {
    console.log('touch move', e.touches)
    lastTouchPos = {clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY)}
    mousemoveHandler(lastTouchPos)
    e.preventDefault()
  }

  let touchupHandler = e => {
    mouseupHandler(lastTouchPos)
    e.preventDefault()
  }
  
  setup()
  // setInterval(tick, 1000 / 60)

  window.requestAnimationFrame(draw)
}

main()
