import * as PIXI from 'pixi.js'
import BackgroundImage from './images/bg1.png'
import WallImage from './images/brickWall.png'
import Player from './classes/Player'

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


const wallContainer = new PIXI.Container()
const wallTexture = PIXI.Texture.from(WallImage)
let wallTop = new PIXI.Sprite(wallTexture)
let wallMiddle = new PIXI.Sprite(wallTexture)
let wallBottom = new PIXI.Sprite(wallTexture)

wallContainer.addChild(wallBottom, wallMiddle, wallTop)
wallTop.position.set(0, 0)
wallMiddle.position.set(0, 70)
wallBottom.position.set(0, 140)
wallContainer.y = window.innerHeight - 210
wallContainer.x = window.innerWidth / 2

app.stage.addChild(bg)
app.stage.addChild(wallContainer)
let player = new Player(app)

let elapsed = 0.0


app.ticker.add((delta) => {
  elapsed += delta
  bg.tilePosition.x -= speed
  wallContainer.x -= speed

  let playerBounds = player.getBounds()
  let wallBounds = wallContainer.getBounds()

  if ( playerBounds.x + playerBounds.width > wallBounds.x &&
       playerBounds.x < wallBounds.x + wallBounds.width &&
       playerBounds.y + playerBounds.height > wallBounds.y &&
       playerBounds.y < wallBounds.y + wallBounds.height ) {
    console.log('Aww too bad!')
    app.ticker.stop()
  }
})

