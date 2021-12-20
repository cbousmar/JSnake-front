import Phaser from 'phaser';
import endGameSoundAsset from '../../assets/sounds/end_game_long.mp3'
import Transition from '../../assets/sounds/transition.mp3'
import { KEY_END_SOUND, KEY_TRANSITION } from '../../constant';


export default class GameOver extends Phaser.Scene
{
  constructor() {
    super("game-over");
    this.endGameSound = undefined;
    this.transition = undefined;
  }


  /**
   * Load assets for the scene
   */
  preload()
  {
    this.load.audio(KEY_TRANSITION, Transition);
    this.load.audio(KEY_END_SOUND, endGameSoundAsset);
  }


  create(tabScore)
  {
    //Sound for the game's end
    this.endSound = this.sound.add(KEY_END_SOUND,
      {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
    );
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
    this.endSound.play();
    if (tabScore[0] == -1) tabScore[0] = 0;
    if (tabScore[1] == -1) tabScore[1] = 0;
    var centerX = this.scale.width * 0.5;
    var centerY = this.scale.height * 0.5;
    this.add.text(centerX, centerY - 100, 'GAME OVER',
      {
        fontSize: '52px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    //Displayscore
    if(tabScore[1] == null)
    {
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 16, `Score : ${tabScore[0]}`, {
        fontSize: 32,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    else
    {
      //Display the winner
      if (tabScore[2] == 0)
      {
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 32, `Both of you lost`, {
          fontSize: 32,
          color: '#665847',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }
      else
      {
        this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 32, `Player ${tabScore[2]} won !!`, {
          fontSize: 32,
          color: '#665847',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }
      //Display scores
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 + 16, `Player 1 : ${tabScore[0]}`, {
        fontSize: 16,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 + 32, `Player 2 : ${tabScore[1]}`, {
        fontSize: 16,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    //Button to restart the game
    const button = this.add.text(centerX, centerY + 100, 'Restart',
      {
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    button.setInteractive();
    button.on('pointerover', () => { button.setFontSize(48);});
    button.on('pointerout', () => { button.setFontSize(32);});
    button.on('pointerdown', () => {
      this.transition.play();
      this.endSound.stop();
      this.scene.stop('ui-score');
      this.scene.start('game-scene');
    });
  }
}
