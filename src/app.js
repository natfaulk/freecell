import Mindrawing from 'mindrawingjs'
import {Game} from './game'

let game = null
let d

const newGame = () => {
  game = new Game(d)
  const seedDiv = document.getElementById('seed')
  seedDiv.innerHTML = `Seed: ${game.seed}`
}

const undo = () => {
  game.undo()
}

const toScaled = _val => Math.round(_val * window.devicePixelRatio)

const main = () => {
  console.log(window.devicePixelRatio)

  let selectedCard = null
  let lastTouchPos = null
  const selectOffset = {x: 0, y: 0}
  
  const setup = () => {
    d = new Mindrawing()
    d.setup('myCanvas')
    windowResize()

    // d.c.addEventListener('click', mouseclickHandler, false)
    d.c.addEventListener('mousedown', mousedownHandler, false)
    d.c.addEventListener('mouseup', mouseupHandler, false)
    d.c.addEventListener('mousemove', mousemoveHandler, false)
    d.c.addEventListener('touchstart', touchdownHandler, false)
    d.c.addEventListener('touchend', touchupHandler, false)
    d.c.addEventListener('touchmove', touchmoveHandler, false)

    document.getElementById('newgame').addEventListener('click', newGame)
    document.getElementById('undo').addEventListener('click', undo)

    newGame()
  }
  
  const windowResize = () => {
    const rect = d.c.parentNode.getBoundingClientRect()
    d.setCanvasSize(rect.width * window.devicePixelRatio, rect.height * window.devicePixelRatio)
  }
  
  const draw = () => {
    d.background('black')
    d.fill('white')

    if (game !== null) {
      game.draw(d)

      const timeDiv = document.getElementById('time')
      timeDiv.innerHTML = `Time: ${Math.floor((Date.now() - game.starttime) / 1000)}`
    }

    window.requestAnimationFrame(draw)
  }
  
  // window.onresize = function(event) {
  //   windowResize()
  //   draw()
  // }
  
  // const tick = () => {
  //   draw()
  // }
  
  // const mouseclickHandler = e => {
  //   console.log('mouse click')
  // }
  
  const mousedownHandler = e => {
    console.log('MD', e.clientX, e.clientY)
    if (game !== null) {
      const card = game.getCard(e.clientX, e.clientY)
      
      if (card !== null) {
        selectedCard = card
        selectOffset.x = e.clientX - card.pos.x
        selectOffset.y = e.clientY - card.pos.y
      }
    }
  }
  
  const mouseupHandler = e => {
    if (selectedCard !== null) {
      console.log('mouse up')
      game.moveCard(selectedCard, game.getStackFromMouse(e.clientX, e.clientY))
      selectedCard = null
      
      const movesDiv = document.getElementById('moves')
      movesDiv.innerHTML = `Moves: ${game.moves}`
    }
  }
  
  const mousemoveHandler = (e) => {
    console.log('mouse move', e.clientX, e.clientY)
    if (selectedCard !== null) {
      selectedCard.pos.x = e.clientX - selectOffset.x
      selectedCard.pos.y = e.clientY - selectOffset.y
    }

    // if (game !== null) {
    //   console.log(game.getStackFromMouse(e.clientX, e.clientY))
    // }
  }
  
  const touchdownHandler = e => {
    console.log('touch down')
    lastTouchPos = {clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY)}
    mousedownHandler(lastTouchPos)
    e.preventDefault()
  }
  
  const touchmoveHandler = e => {
    console.log('touch move', e.touches)
    lastTouchPos = {clientX: toScaled(e.touches[0].clientX), clientY: toScaled(e.touches[0].clientY)}
    mousemoveHandler(lastTouchPos)
    e.preventDefault()
  }

  const touchupHandler = e => {
    mouseupHandler(lastTouchPos)
    e.preventDefault()
  }
  
  setup()
  // setInterval(tick, 1000 / 60)

  window.requestAnimationFrame(draw)
}

main()
