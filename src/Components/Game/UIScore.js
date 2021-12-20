import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';

export default class UIScore extends Phaser.Scene
{
	constructor()
	{
		super('ui-score');
		this.label = null;
	}

	create()
	{
		//Creating score's text to display
		this.label = this.add.text(this.scale.width * 0.5, 16, `Player 1: 0 \nPlayer 2: 0`, {
			fontSize: 16,
			color: '#665847',
			fontStyle: 'bold'
		}).setOrigin(0.5);
		//Listen to an event
		eventsCenter.on('update-score', this.updateScore, this);
		eventsCenter.on('game-over', this.gameOverDisplay, this);
		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-score', this.updateScore, this);
		});
	}

	updateScore(score1, score2)
	{
		this.label.text = `Player 1: ${score1} \nPlayer 2: ${score2}`;		
	}

	gameOverDisplay()
	{
		this.label.setY(this.scale.height * 0.5);
		this.label.setFontSize(32);
	}
}