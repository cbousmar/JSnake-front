import Phaser, {Geom} from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import Snake from './Snake';
//import assets
import eatSoundAsset from '../../assets/sounds/apple_crunch1.mp3';
import gridAsset from '../../assets/img/Grid32_1024x768.png'
import appleAsset from '../../assets/img/RedApple.png';
import magentaSnakeAsset from '../../assets/img/GreenSnake32.png';
import { SQUARE_SIZE, GRID_KEY, KEY_EAT_SOUND } from '../../constant';
import { getSessionObject, setSessionObject } from "../../utils/session";

//Constants for DRY principle
const APPLE_KEY = 'apple', SNAKE_KEY = 'snake';


class SingleGame extends Phaser.Scene
{
  constructor()
  {
    super('game-scene');
    this.apple = undefined;
    this.snake = undefined;
    this.direction = null;
    this.nextDirection = null;
    this.keyFrameValue = 0;
    this.score = null;
    this.controls = undefined;
    this.speed = null;
    this.eatSound = undefined;
  };


  /**
   * Load assets for the scene
   */
  preload()
  {
    this.load.audio(KEY_EAT_SOUND, eatSoundAsset);
    this.load.image(GRID_KEY, gridAsset);
    this.load.image(APPLE_KEY, appleAsset);
    this.load.spritesheet(SNAKE_KEY,
      magentaSnakeAsset,
      {frameWidth: SQUARE_SIZE, frameHeight: SQUARE_SIZE});
  };


  /**
   * Create the scene
   */
  create()
  {
    //Sound while eating
    this.eatSound = this.sound.add(KEY_EAT_SOUND,
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
    //Score player' score
    this.score = 0;
    //Velocity of the snakes
    this.speed = 3;
    //Set direction
    this.direction = 'right';
    this.nextDirection = null;
    //Creating the grid
    this.add.image(SQUARE_SIZE * 16, SQUARE_SIZE * 12, GRID_KEY);
    //Creating food
    this.apple = this.createFood();
    this.apple.setScale(0.99,0.99);
    //Creating the snakes
    this.snake = this.createSnake((5 * SQUARE_SIZE), (7 * SQUARE_SIZE), 'right', SNAKE_KEY);
    //UIScene for scores
    this.scene.run('ui-single-score');
    //Enabling keyboard inputs
    this.controls = this.input.keyboard.createCursorKeys();
  };


  /**
   * Update the scene every SQUARE_SIZE frames. Refresh rate = 60 FPS. Check for new direction or collision.
   */
  update()
  {
    //Update the key frame value
    this.keyFrameValue++;
    //Changing the speed depending on the score
    if (this.score > 15)
    {
      this.speed = Math.floor(this.score / 5);
    }
    //Registering new movement
    if (this.direction != 'down' && this.controls.up.isDown)
    {
      this.nextDirection = 'up';
    }
    else if (this.direction != 'up' && this.controls.down.isDown)
    {
      this.nextDirection = 'down';
    }
    else if (this.direction != 'left' && this.controls.right.isDown)
    {
      this.nextDirection = 'right';
    }
    else if (this.direction != 'right' && this.controls.left.isDown)
    {
      this.nextDirection = 'left';
    }
    //Check if the snake reach a new square. If yes, allows it to change direction
    //If a new direction has been chosen from the keyboard, make it the direction of the snake now.
    if (this.keyFrameValue % Math.floor(SQUARE_SIZE / this.speed) === 0) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      if (this.nextDirection != null)
      {
        //Update the direction of the snake
        this.direction = this.nextDirection;
        this.nextDirection = null;
      }
      //Collision with an apple
      if (Geom.Intersects.RectangleToRectangle(this.snake.getBody().getAt(0).getBounds(), this.apple.getBounds()))
      {
        this.eatFood();
      }
      //Moving the snake
      else
      {
        this.snake.move(this.direction);
      }
      //collision with a wall
      if(this.snake.getBody().getAt(0).x <= -32 || this.snake.getBody().getAt(0).x >= 544 ||
        this.snake.getBody().getAt(0).y <= -32 || this.snake.getBody().getAt(0).y >= 480)
      {
        this.shutdown();
      }
      //collision with itself
      if(this.snake.eatItself()) this.shutdown();
    }
  };


  /**
   * Shutting down the scene
   */
  shutdown()
  {
    this.eatSound.stop();
    this.callBackend(this.score);
    //Closing gamescene and open GameOver scene
    this.scene.stop('ui-single-score');
    if (this.score == 0) this.score = -1; //To display score properly
    this.scene.start('game-over', [this.score, null, null]);
  };

  /**
   * Create and return a snake
   * @param {number} X coordinate of the position on the grid
   * @param {number} Y coordinate of the position on the grid
   * @param {string} direction it's orientation 
   * @param {sprite} asset sprite to use
   * @returns snake object
   */
  createSnake(X, Y, direction, asset)
  {
    return new Snake(this, asset, X, Y, direction);
  };


  //Creating food for snakes
  createFood()
  {
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 17) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 15) * SQUARE_SIZE;
    //Genereting apple
    var newApple = this.physics.add.image(randomX + (SQUARE_SIZE / 2), randomY + (SQUARE_SIZE / 2), APPLE_KEY);
    newApple.enableBody = true;
    return newApple;
  };


  eatFood()
  {
    this.eatSound.play();
    //Updating score
    this.score++;
    //The snake grow up
    this.snake.growUp(this.direction);
    eventsCenter.emit('update-score-single', this.score);
    do
    {
      var isOccupied = false;
      //Random placement of the apple
      var randomX = Math.floor(Math.random() * 17) * SQUARE_SIZE;
      var randomY = Math.floor(Math.random() * 15) * SQUARE_SIZE;
      //Check if the RANDOM coordinates are in the snake or not
      var checkSnake = this.snake.getBody();
      for(let i = 0; i < checkSnake.length; i++)
      {
        if(randomX === checkSnake.getAt(i).x && randomY === checkSnake.getAt(i).y)
        {
          isOccupied = true;
          break;
        }
      }
    } while (isOccupied)
    this.apple.setPosition(randomX + (SQUARE_SIZE / 2),randomY + (SQUARE_SIZE / 2));
  }


  callBackend(score)
  {
    let user = getSessionObject("user1");
    if(user){
      if (score > user.bestScoreSingle){
        changeScore(score);
      }
    }
    
    async function changeScore(score){
      //update the user bestscore
      try {
        const options = {
          method: "PUT", 
          body: JSON.stringify({
            bestScoreSingle: score,
          }), 
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`/api/auths/user/${user.id}`, options); // fetch return a promise => we wait for the response
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
      }catch (error) {
        console.error("error: ", error);
      }
      
      user.bestScoreSingle = score;
      setSessionObject("user1",user);
      //update the bestscoreSingle
      try {
        const options = {
          method: "POST", 
          body: JSON.stringify({
            score: score,
            username: user.username1,
          }), 
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`/api/single/bestscoressingle`, options); // fetch return a promise => we wait for the response
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
      } catch (error) {
        console.error("LoginPage::error: ", error);

      }
    }
  }
}
export default SingleGame;