import * as PIXI from 'pixi.js';
import PlayerImage from '../images/frame-1.png'

class Player {
  constructor(app) {
    this.app = app
    this.score = 0;
    this.gravity = .5
    this.jumpVelocity = -10
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite = PIXI.Sprite.from(PlayerImage)
    this.sprite.scale.set(0.075)
    this.sprite.x = 100
    this.sprite.y = 100
    this.sprite.vx = 0
    this.sprite.vy = 0

    app.stage.addChild(this.sprite)

    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.sprite.vy = this.jumpVelocity
      }
    })

    app.ticker.add(() => {
      this.onTick()
    })
  }

  getBounds() {
    return this.sprite.getBounds()
  }

  getSprite() {
    return this.sprite
  }

  hasCollided(objectBounds) {
    let playerBounds = this.sprite.getBounds()

    if ( playerBounds.x + playerBounds.width > objectBounds.x &&
         playerBounds.x < objectBounds.x + objectBounds.width &&
         playerBounds.y + playerBounds.height > objectBounds.y &&
         playerBounds.y < objectBounds.y + objectBounds.height ) {
      return true
    }

    return false
  }
  
  onTick() {
    this.sprite.vy += this.gravity
    this.sprite.y += this.sprite.vy

    if ( this.sprite.y >= this.app.renderer.height - this.sprite.height ) {
      console.log('Aww too bad!')
      this.app.ticker.stop()
    }
  }
}

export default Player