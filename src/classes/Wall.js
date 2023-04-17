import * as PIXI from 'pixi.js'
import WallImage from '../images/brickWall.png'

class Wall {
  constructor(app) {
    const wallTexture = PIXI.Texture.from(WallImage)
    let wallTop = new PIXI.Sprite(wallTexture)
    let wallMiddle = new PIXI.Sprite(wallTexture)
    let wallBottom = new PIXI.Sprite(wallTexture)

    this.app = app
    this.container = new PIXI.Container()
    this.speed = 2

    this.container.addChild(wallBottom, wallMiddle, wallTop)
    wallTop.position.set(0, 0)
    wallMiddle.position.set(0, 70)
    wallBottom.position.set(0, 140)
    this.container.y = window.innerHeight - 210
    this.container.x = window.innerWidth / 2

    app.stage.addChild(this.container)

    app.ticker.add(() => {
      this.onTick()
    })
  }

  getBounds() {
    return this.container.getBounds()
  }

  onTick() {
    this.container.x -= this.speed
  }
}

export default Wall