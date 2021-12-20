import Phaser from 'phaser';
import Transition from '../../assets/sounds/transition.mp3'
import { KEY_TRANSITION } from '../../constant';

export default class Start extends Phaser.Scene
{
  constructor() {
    super("game-start");
    this.transition = undefined;
  }


  /**
   * Load assets for the scene
   */
   preload()
   {
     this.load.audio(KEY_TRANSITION, Transition);

   }


  create()
  {
    //Sound for the transition
    this.transition = this.sound.add(KEY_TRANSITION,
      {
        mute: false,
        volume: 1,
        rate: 2,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
    );
    const button = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'START',
      {
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    button.setInteractive();
    button.on('pointerover', () => { button.setFontSize(48); });
    button.on('pointerout', () => { button.setFontSize(32); });
    button.on('pointerdown', () => {
      this.transition.play();
      this.scene.start('game-scene');
    });
  }
}
