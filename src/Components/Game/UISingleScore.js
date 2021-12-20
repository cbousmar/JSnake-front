import Phaser from 'phaser';
import eventsCenter from './EventCenter';

export default class UISingleScore extends Phaser.Scene
{
	constructor()
	{
		super('ui-single-score');
		this.label = null;
	}

	create()
	{
		//Creating score's text to display
		this.label = this.add.text(this.scale.width * 0.5, 16, `Score : 0`, {
			fontSize: 16,
			color: '#665847',
			fontStyle: 'bold'
		}).setOrigin(0.5);
		//Listen to an event
		eventsCenter.on('update-score-single', this.updateScore, this);
		eventsCenter.on('game-over-score', this.gameOverDisplay, this);
		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-score-single', this.updateScore, this);
			eventsCenter.off('game-over-score', this.gameOverDisplay, this);
		});
	}

	updateScore(score)
	{
		this.label.text = `Score : ${score}`;		
	}

	gameOverDisplay()
	{
		this.label.setY(this.scale.height * 0.5);
		this.label.setFontSize(32);
	}
}