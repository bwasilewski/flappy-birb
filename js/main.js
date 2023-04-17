const gravity = 0.25
const speed = 2
const jumpVelocity = -10
const bgTexture = PIXI.Texture.from('images/bg1.png')

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2f9d8c,
})

document.body.appendChild(app.view)

let bg = new PIXI.TilingSprite(bgTexture, window.innerWidth, 300)
bg.x = 0
bg.y = 0

let player = new PIXI.Sprite.from('images/flying/frame-1.png')
player.scale.set(0.075)
player.x = 100
player.y = 100
player.vx = 0
player.vy = 0

const wallContainer = new PIXI.Container()
const wallTexture = PIXI.Texture.from('images/brickWall.png')
let wallTop = new PIXI.Sprite(wallTexture)
let wallMiddle = new PIXI.Sprite(wallTexture)
let wallBottom = new PIXI.Sprite(wallTexture)

wallContainer.addChild(wallBottom, wallMiddle, wallTop)
wallTop.position.set(0, 0)
wallMiddle.position.set(0, 70)
wallBottom.position.set(0, 140)
wallContainer.y = window.innerHeight - 210
wallContainer.x = window.innerWidth - 200

app.stage.addChild(bg)
app.stage.addChild(wallContainer)
app.stage.addChild(player)

let elapsed = 0.0

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    player.vy = jumpVelocity
  }
})

app.ticker.add((delta) => {
  elapsed += delta
  player.vy += gravity
  player.y += player.vy
  bg.tilePosition.x -= speed
  wallContainer.x -= speed

  let playerBounds = player.getBounds()
  let wallBounds = wallContainer.getBounds()

  if ( player.y >= app.renderer.height - player.height ) {
    console.log('Aww too bad!')
    app.ticker.stop()
  }

  if ( playerBounds.x + playerBounds.width > wallBounds.x &&
       playerBounds.x < wallBounds.x + wallBounds.width &&
       playerBounds.y + playerBounds.height > wallBounds.y &&
       playerBounds.y < wallBounds.y + wallBounds.height ) {
    console.log('Aww too bad!')
    app.ticker.stop()
  }
})

