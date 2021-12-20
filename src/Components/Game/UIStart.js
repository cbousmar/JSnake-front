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
  
    //Defining the center of the screen
    const centerX = this.scale.width * 0.5;
    const centerY = this.scale.height * 0.5;
    
    //Button to launch the game scene
    const buttonStart = this.add.text(centerX, centerY - 100, 'START',
      {
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    buttonStart.setInteractive();
    buttonStart.on('pointerover', () => { buttonStart.setFontSize(48); });
    buttonStart.on('pointerout', () => { buttonStart.setFontSize(32); });
    buttonStart.on('pointerdown', () => {
      this.transition.play();
      this.scene.start('game-scene');
    });
    
    //Button to launch option' scene
    const buttonOption = this.add.text(centerX, centerY + 100, 'OPTION',
      {
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    buttonOption.setInteractive();
    buttonOption.on('pointerover', () => { buttonOption.setFontSize(48); });
    buttonOption.on('pointerout', () => { buttonOption.setFontSize(32); });
    buttonOption.on('pointerdown', () => {
      this.transition.play();
      this.scene.start('ui-option');
    });
  }
}
