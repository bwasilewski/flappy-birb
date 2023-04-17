import * as PIXI from 'pixi.js'
import BackgroundImage from './images/bg1.png'
import Player from './classes/Player'
import Wall from './classes/Wall'

const speed = 2
const bgTexture = PIXI.Texture.from(BackgroundImage)

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2f9d8c,
})

document.body.appendChild(app.view)

let bg = new PIXI.TilingSprite(bgTexture, window.innerWidth, 300)
bg.x = 0
bg.y = 0


app.stage.addChild(bg)
let wall = new Wall(app)
let player = new Player(app)

let elapsed = 0.0


app.ticker.add((delta) => {
  elapsed += delta
  bg.tilePosition.x -= speed

  let playerBounds = player.getBounds()
  let wallBounds = wall.getBounds()

  if ( playerBounds.x + playerBounds.width > wallBounds.x &&
       playerBounds.x < wallBounds.x + wallBounds.width &&
       playerBounds.y + playerBounds.height > wallBounds.y &&
       playerBounds.y < wallBounds.y + wallBounds.height ) {
    console.log('Aww too bad!')
    app.ticker.stop()
  }
})

