(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};var root;var stage;
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.wave21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5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");
	this.shape.setTransform(-2658.9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5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");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave21, new cjs.Rectangle(-3988.3,-10.8,5317.8,21.700000000000003), null);


(lib.wave11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5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");
	this.shape.setTransform(-2658.9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5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");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave11, new cjs.Rectangle(-3988.3,-10.8,5317.8,21.700000000000003), null);


(lib.wave1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wave1, new cjs.Rectangle(-1329.4,-10.8,2658.9,21.700000000000003), null);


(lib.pyramid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AGLHEIAAAAIsVAAIgFAAIAAAAIgnAAIAAgiQABjIgBjIQAAgQALgKIF3l5IADgDIA9g/QGOGpATATQAKAKAAAPIgCGygAloGRILpAAIl1rpgAlzATQgFAEAAAHIAAEjIErpTgAGQE/IAAkiQAAgHgEgEIiGiGIgCAAIABgBIieiegAiiEbICuldICvFdgADch1ICQCPQACABAAAEIAACOgAlPAfQAAgEACgBIA6g6IACgCIAAAAIBThTIiREig");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pyramid, new cjs.Rectangle(-43.9,-45.2,87.9,90.5), null);


(lib.a_up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.a_up, new cjs.Rectangle(-217.4,-147.1,434.8,294.29999999999995), null);


(lib.a_down = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmmNlIoUlbIow0SInUkaQilsvgbh6IgBgMIABgPMBD7AAAIABAKQADAFgCAMQgBAIgGAVQgWBVmrMPImnL+Im3EOInARJImMPcg");
	this.shape.setTransform(0.015,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.a_down, new cjs.Rectangle(-217.5,-202.3,435.1,404.6), null);


// stage content:
(lib._14 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(100));

	// pyramid
	this.instance = new lib.pyramid();
	this.instance.setTransform(1450.95,244.25,0.1307,0.1307);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(65).to({_off:false},0).wait(1).to({scaleX:0.3482,scaleY:0.3482,x:1450.9843,y:244.2733},0).wait(1).to({scaleX:0.642,scaleY:0.642,x:1451.0305,y:244.3047},0).wait(1).to({scaleX:0.8723,scaleY:0.8723,x:1451.0668,y:244.3294},0).wait(1).to({scaleX:1.0263,scaleY:1.0263,x:1451.091,y:244.3459},0).wait(1).to({scaleX:1.1218,scaleY:1.1218,x:1451.05,y:244.3},0).wait(1).to({scaleX:1.0507,scaleY:1.0507,x:1450.9624,y:244.2416},0).wait(1).to({scaleX:1.0119,scaleY:1.0119,x:1450.9147,y:244.2098},0).wait(1).to({scaleX:1,scaleY:1,x:1450.95,y:244.25},0).wait(27));

	// mask_f
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-11.6,144.6,-12,17.6).s().p("AgTSNQgfgfAAgrIAAjzIkzhGQgggHgXgZQgWgagEghIgfkrIh5hXQgegVgLgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArABAeAgQAeAggBArQgBArggAeQggAegrgBQnkgOi4FuQg7B2gUCQQgKBGABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMATACAXIAdEQIE6BHQAjAIAXAdQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape.setTransform(1406.6673,286.0425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],10.3,140,-49.4,36.5).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_1.setTransform(1406.6726,286.0429);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-0.6,162.1,-98.2,106).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_2.setTransform(1406.6726,286.0429);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-40.1,147.5,-113.3,81.1).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_3.setTransform(1406.6726,286.0429);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-129.6,105.9,-137.7,15.5).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_4.setTransform(1406.6726,286.0429);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-82.4,93.5,-99,1.2).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_5.setTransform(1406.6726,286.0429);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-35.2,81.1,-60.4,-13.1).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_6.setTransform(1406.6726,286.0429);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-138.7,172.4,-200.4,111).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_7.setTransform(1406.6726,286.0429);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-58.6,27.9,-58.7,-40.6).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_8.setTransform(1406.6726,286.0429);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-55.4,-20.7,-34.7,-77.7).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_9.setTransform(1406.6726,286.0429);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-52.2,-69.4,-10.7,-114.9).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_10.setTransform(1406.6726,286.0429);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-48.9,-118.1,13.4,-152).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_11.setTransform(1406.6726,286.0429);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-45.7,-166.8,37.4,-189.2).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_12.setTransform(1406.6726,286.0429);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-39.7,-282,64.9,-293.3).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_13.setTransform(1406.6726,286.0429);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-14.8,-395.9,111.2,-396.1).s().p("AgTSNQgfgfAAgrIAAjzIkzhGQgggHgXgZQgWgagEghIgfkrIh5hXQgegVgLgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArABAeAgQAeAggBArQgBArggAeQggAegrgBQnkgOi4FuQg7B2gUCQQgKBGABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMATACAXIAdEQIE6BHQAjAIAXAdQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_14.setTransform(1406.6673,286.0425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},47).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[]},1).wait(38));

	// mask_f___копия
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-60.7,-172.8,30.5,-148.1).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_15.setTransform(1496.7232,302.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-48.8,-136.9,27.8,-101).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_16.setTransform(1496.7232,302.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-38,-104.1,25.3,-58).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_17.setTransform(1496.7232,302.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-28.3,-74.5,23,-19.1).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_18.setTransform(1496.7232,302.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-19.6,-48,21,15.7).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_19.setTransform(1496.7232,302.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-11.9,-24.6,19.1,46.4).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_20.setTransform(1496.7232,302.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-5.2,-4.4,17.6,73).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_21.setTransform(1496.7232,302.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],0.4,12.8,16.3,95.6).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_22.setTransform(1496.7232,302.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],5.1,26.9,15.2,114).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_23.setTransform(1496.7232,302.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],8.7,37.8,14.4,128.3).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_24.setTransform(1496.7232,302.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],11.2,45.6,13.7,138.6).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_25.setTransform(1496.7232,302.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],12.8,50.3,13.4,144.7).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_26.setTransform(1496.7232,302.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],13.3,51.8,13.3,146.8).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_27.setTransform(1496.7232,302.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},62).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[]},1).wait(25));

	// mask_f___копия
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(21,1,1).p("AlPznQAIABAIAAQAZADAYAEQDjAmCZCTQCwCpAoELQAmEAhkDwQhpD6jWB/IgBPx");
	this.shape_28.setTransform(1500.0732,303.075);
	this.shape_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(47).to({_off:false},0).to({_off:true},15).wait(38));

	// face
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AGtRcIAAqIQAAgUAKgRQAJgQARgKQDQh5BZjOQA5iEAAiRQAAi9gkiFQgUhJglhEQhLiLiGhKQimhekAAAQjdAAifBeQieBdhcC6Qg7B4gaCTQgNBJgBAyQAAAOgFAMIihGgIBxBFQAQAJAJARQAKAPAAATIAJEoIFfBDQAaAGARATQAQAUAAAbIAAEwIiSAAIAAjzIldhEQgZgFgRgTQgQgUgBgZIgKk7IiDhQQgXgOgIgZQgJgZAKgYICynOQAEhNAShYQAeiSA8h8QBejCCfhyQDQiXEuAAQESAAC/BgQC/BgBnC/QBICEAZCuQAOBfAACEQAACohACaQhhDvjlCTIAAJfg");
	this.shape_29.setTransform(1443.1493,281.05);
	this.shape_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_29).wait(47).to({_off:false},0).wait(53));

	// wave_white (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_24 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_25 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_26 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_27 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_28 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_29 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_30 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_31 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_32 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_33 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_34 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_35 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_36 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_37 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_38 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_39 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_40 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_41 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_42 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_43 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_44 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_45 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAHgMQAjhCBFiGIDYmVIFqqrIFugqQBvkzA5iQIBJi9IHGhCIG1tvIIJSBIGSC7ICfGeQARAuAoB3IBnAcQByAgA1ANQA4AOAtA6ICaDKQBaB2A8BWQBlCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImtA8IiPF6QgbBIhbCsIljApQiXE4hHCGIkmIyIOjinQCbgcTmjtIh+o4Qj4AThqALIjwAbIifAQQCHhCCUg3QCLgyEhhyIjyzFg");
	var mask_graphics_46 = new cjs.Graphics().p("EBZwBCHIoVlbIov0TInUkZQilswgbh6IgBgLIACgZQgBgHAGgMQAkhCBFiFIDYmWIFqqqIFugqQBvkzA5iQIBJi9IHGhDIG2tuIIISAIGTC7ICfGeQARAuAnB3IBoAdQByAfA1AOQA4AOAsA5ICaDKQBaB3A8BWQBmCQBLBdQBiB8A6BOQAPAVgCAFIABARQADAGgCALQgBAJgFAUQgXBVmrMPImnL+Im2EOInBRLImLPbgEBaygIzImtA7IiPF8QgbBHhbCrIljAqQiXE4hHCFIkmIzIOiinQCcgcTmjtIh+o5Qj3AThrAMIjwAbIigAPQCIhBCUg3QCLgzEihwIjyzGg");
	var mask_graphics_47 = new cjs.Graphics().p("EBZwBBxIoVlbIov0UInUkYQilswgbh6IgBgMIACgYQgBgHAGgMQAkhCBFiGIDYmVIFqqqIFugqQBvkzA5iQIBJi9IHGhDIG2tuIIISAIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA4AOAsA6ICaDKQBaB3A8BVQBmCRBLBdQBiB7A6BOQAPAWgCAFIABARQADAGgCALQgBAJgFAUQgXBVmrMPImnL9Im2EPInBRLImLPbgEBaygJKImtA8IiPF7QgbBIhbCrIljAqQiXE4hHCFIkmIzIOiioQCcgcTmjsIh+o5Qj3AThrAMIjwAbIigAPQCIhCCUg3QCLgyEihxIjyzGg");
	var mask_graphics_48 = new cjs.Graphics().p("EBZwBBhIoVlbIov0UInUkZQilsvgbh6IgBgMIACgZQgBgGAGgMQAkhCBFiGIDYmVIFqqqIFugqQBvk0A5iQIBJi9IHGhCIG2tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA4AOAsA6ICaDKQBaB2A8BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABARQADAFgCAMQgBAIgFAVQgXBVmrMPImnL9Im2EPInBRKImLPcgEBaygJaImtA8IiPF7QgbBIhbCrIljApQiXE4hHCGIkmIyIOiinQCcgcTmjtIh+o4Qj3AThrALIjwAbIigAQQCIhCCUg3QCLgyEihxIjyzGg");
	var mask_graphics_49 = new cjs.Graphics().p("EBZwBBdIoVlaIov0UInUkZQilswgbh5IgBgMIACgZQgBgGAGgMQAkhCBFiGIDYmVIFqqqIFugrQBvkzA5iQIBJi9IHGhDIG2tuIIISBIGTC7ICfGeQARAtAnB3IBoAdQByAfA1AOQA4AOAsA5ICaDLQBaB2A8BWQBmCQBLBeQBiB7A6BOQAPAVgCAFIABARQADAGgCAMQgBAIgFAUQgXBVmrMQImnL9Im2EPInBRKImLPbgEBaygJdImtA7IiPF8QgbBHhbCrIljAqQiXE4hHCFIkmIzIOiinQCcgcTmjtIh+o4Qj3AShrAMIjwAbIigAQQCIhCCUg3QCLgzEihwIjyzGg");
	var mask_graphics_50 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_51 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_52 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_53 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_54 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_55 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_56 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_57 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_58 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_59 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_60 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_61 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_62 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_63 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_64 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_65 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_66 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_67 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_68 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_69 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_70 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_71 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_72 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_73 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_74 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_75 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_76 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_77 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_78 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_79 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_80 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_81 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_82 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_83 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_84 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_85 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_86 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_87 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_88 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_89 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_90 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_91 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_92 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_93 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_94 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_95 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_96 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_97 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_98 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_99 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_graphics_24,x:1450.8,y:813.175}).wait(1).to({graphics:mask_graphics_25,x:1450.8,y:812.225}).wait(1).to({graphics:mask_graphics_26,x:1450.8,y:809.375}).wait(1).to({graphics:mask_graphics_27,x:1450.8,y:804.625}).wait(1).to({graphics:mask_graphics_28,x:1450.8,y:798.025}).wait(1).to({graphics:mask_graphics_29,x:1450.8,y:789.475}).wait(1).to({graphics:mask_graphics_30,x:1450.8,y:779.025}).wait(1).to({graphics:mask_graphics_31,x:1450.8,y:766.725}).wait(1).to({graphics:mask_graphics_32,x:1450.8,y:752.475}).wait(1).to({graphics:mask_graphics_33,x:1450.8,y:736.375}).wait(1).to({graphics:mask_graphics_34,x:1450.8,y:718.325}).wait(1).to({graphics:mask_graphics_35,x:1450.8,y:698.425}).wait(1).to({graphics:mask_graphics_36,x:1450.8,y:676.625}).wait(1).to({graphics:mask_graphics_37,x:1450.8,y:653.375}).wait(1).to({graphics:mask_graphics_38,x:1450.8,y:631.575}).wait(1).to({graphics:mask_graphics_39,x:1450.8,y:611.675}).wait(1).to({graphics:mask_graphics_40,x:1450.8,y:593.625}).wait(1).to({graphics:mask_graphics_41,x:1450.8,y:577.525}).wait(1).to({graphics:mask_graphics_42,x:1450.8,y:563.275}).wait(1).to({graphics:mask_graphics_43,x:1450.8,y:550.975}).wait(1).to({graphics:mask_graphics_44,x:1450.8,y:540.525}).wait(1).to({graphics:mask_graphics_45,x:1450.8,y:532.025}).wait(1).to({graphics:mask_graphics_46,x:834.215,y:538.525}).wait(1).to({graphics:mask_graphics_47,x:834.215,y:536.3}).wait(1).to({graphics:mask_graphics_48,x:834.215,y:534.675}).wait(1).to({graphics:mask_graphics_49,x:834.215,y:534.35}).wait(1).to({graphics:mask_graphics_50,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_51,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_52,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_53,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_54,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_55,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_56,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_57,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_58,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_59,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_60,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_61,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_62,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_63,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_64,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_65,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_66,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_67,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_68,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_69,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_70,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_71,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_72,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_73,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_74,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_75,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_76,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_77,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_78,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_79,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_80,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_81,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_82,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_83,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_84,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_85,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_86,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_87,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_88,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_89,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_90,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_91,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_92,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_93,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_94,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_95,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_96,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_97,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_98,x:1450.865,y:719.225}).wait(1).to({graphics:mask_graphics_99,x:1450.865,y:719.225}).wait(1));

	// wave_2
	this.instance_1 = new lib.wave21();
	this.instance_1.setTransform(1556.5,667.1);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24).to({_off:false},0).to({x:4215.4},25).to({_off:true},1).wait(24).to({_off:false,x:1556.5},0).to({x:4215.4},25,cjs.Ease.none).wait(1));

	// wave_2_1
	this.instance_2 = new lib.wave21();
	this.instance_2.setTransform(1556.5,667.1);
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({x:4215.4},25,cjs.Ease.none).to({_off:true},1).wait(25));

	// mask_UP (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_24 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_25 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_26 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_27 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_28 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_29 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_30 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_31 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_32 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_33 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_34 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_35 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_36 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_37 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_38 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_39 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_40 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_41 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_42 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_43 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_44 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_45 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_46 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_47 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_48 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_49 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_50 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_51 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_52 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_53 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_54 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_55 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_56 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_57 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_58 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_59 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_60 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_61 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_62 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_63 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_64 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_65 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_66 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_67 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_68 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_69 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_70 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_71 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_72 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_73 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");
	var mask_1_graphics_74 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIATAZQAPAWgDAGIACAHg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_1_graphics_24,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_25,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_26,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_27,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_28,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_29,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_30,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_31,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_32,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_33,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_34,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_35,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_36,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_37,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_38,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_39,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_40,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_41,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_42,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_43,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_44,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_45,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_46,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_47,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_48,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_49,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_50,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_51,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_52,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_53,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_54,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_55,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_56,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_57,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_58,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_59,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_60,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_61,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_62,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_63,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_64,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_65,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_66,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_67,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_68,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_69,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_70,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_71,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_72,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_73,x:1450.85,y:515.7}).wait(1).to({graphics:mask_1_graphics_74,x:1450.85,y:515.7}).wait(26));

	// aisberg_UP
	this.instance_3 = new lib.a_up("synched",0);
	this.instance_3.setTransform(1450.8,813.15);
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({y:516.8,mode:"independent"},25,cjs.Ease.quadInOut).wait(51));

	// mask_DOWN (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_24 = new cjs.Graphics().p("EA+MBUuMAAAhBJMBD/AAAIAWAAMAAABBJgEA+MATlIABgPMBD8AAAIAAAJIACAGg");
	var mask_2_graphics_25 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_26 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_27 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_28 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_29 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_30 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_31 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_32 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_33 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_34 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_35 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_36 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_37 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_38 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_39 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_40 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_41 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_42 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_43 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_44 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_45 = new cjs.Graphics().p("EgiKAgsMAAAhBIMBD/AAAIAVAAMAAABBIgEgiKggcIABgPMBD7AAAIABAKIACAFg");
	var mask_2_graphics_46 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_47 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_48 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_49 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_50 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_51 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_52 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_53 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_54 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_55 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_56 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_57 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_58 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_59 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_60 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_61 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_62 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_63 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_64 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_65 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_66 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_67 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_68 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_69 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_70 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_71 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_72 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_73 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");
	var mask_2_graphics_74 = new cjs.Graphics().p("EgiKAhMMAAAhCHMBD/AAAIAVAAMAAABCHgEgiKgg7IABgQMBD7AAAIABAKIACAGg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_2_graphics_24,x:835.3,y:542.168}).wait(1).to({graphics:mask_2_graphics_25,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_26,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_27,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_28,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_29,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_30,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_31,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_32,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_33,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_34,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_35,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_36,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_37,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_38,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_39,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_40,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_41,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_42,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_43,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_44,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_45,x:1451.95,y:875.125}).wait(1).to({graphics:mask_2_graphics_46,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_47,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_48,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_49,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_50,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_51,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_52,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_53,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_54,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_55,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_56,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_57,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_58,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_59,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_60,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_61,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_62,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_63,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_64,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_65,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_66,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_67,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_68,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_69,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_70,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_71,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_72,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_73,x:1451.95,y:875.175}).wait(1).to({graphics:mask_2_graphics_74,x:1451.95,y:875.175}).wait(26));

	// aisberg_DOWN
	this.instance_4 = new lib.a_down();
	this.instance_4.setTransform(1450.85,458.3);
	this.instance_4._off = true;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(24).to({_off:false},0).to({y:866.3},25,cjs.Ease.quadInOut).wait(51));

	// wave_blk (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_0 = new cjs.Graphics().p("AjbXzMAAAgvlIG2AAMAABAvlg");
	var mask_3_graphics_1 = new cjs.Graphics().p("AkIXzMAAAgvlIIRAAMAAAAvlg");
	var mask_3_graphics_2 = new cjs.Graphics().p("AmQXzMAAAgvlIMhAAMAABAvlg");
	var mask_3_graphics_3 = new cjs.Graphics().p("ApzXzMAAAgvlITnAAMAAAAvlg");
	var mask_3_graphics_4 = new cjs.Graphics().p("AuxXzMAAAgvlIdjAAMAAAAvlg");
	var mask_3_graphics_5 = new cjs.Graphics().p("A1KXzMAAAgvlMAqUAAAMAABAvlg");
	var mask_3_graphics_6 = new cjs.Graphics().p("A89XzMAAAgvlMA57AAAMAAAAvlg");
	var mask_3_graphics_7 = new cjs.Graphics().p("EgmLAXzMAAAgvlMBMXAAAMAAAAvlg");
	var mask_3_graphics_8 = new cjs.Graphics().p("Egw0AXzMAAAgvlMBhpAAAMAAAAvlg");
	var mask_3_graphics_9 = new cjs.Graphics().p("Eg84AXzMAAAgvlMB5xAAAMAAAAvlg");
	var mask_3_graphics_10 = new cjs.Graphics().p("EhKWAXzMAAAgvlMCUtAAAMAAAAvlg");
	var mask_3_graphics_11 = new cjs.Graphics().p("EhZPAXzMAAAgvlMCyfAAAMAAAAvlg");
	var mask_3_graphics_12 = new cjs.Graphics().p("EhpkAXzMAAAgvlMDTIAAAMAABAvlg");
	var mask_3_graphics_13 = new cjs.Graphics().p("Eh53AXzMAAAgvlMDzvAAAMAAAAvlg");
	var mask_3_graphics_14 = new cjs.Graphics().p("EiIxAXzMAAAgvlMERjAAAMAAAAvlg");
	var mask_3_graphics_15 = new cjs.Graphics().p("EiWPAXzMAAAgvlMEsfAAAMAABAvlg");
	var mask_3_graphics_16 = new cjs.Graphics().p("EiiTAXzMAAAgvlMFEnAAAMAAAAvlg");
	var mask_3_graphics_17 = new cjs.Graphics().p("Eis8AXzMAAAgvlMFZ5AAAMAAAAvlg");
	var mask_3_graphics_18 = new cjs.Graphics().p("Ei2KAXzMAAAgvlMFsVAAAMAAAAvlg");
	var mask_3_graphics_19 = new cjs.Graphics().p("Ei99AXzMAAAgvlMF78AAAMAAAAvlg");
	var mask_3_graphics_20 = new cjs.Graphics().p("EjEWAXzMAAAgvlMGItAAAMAAAAvlg");
	var mask_3_graphics_21 = new cjs.Graphics().p("EjJUAXzMAAAgvlMGSpAAAMAAAAvlg");
	var mask_3_graphics_22 = new cjs.Graphics().p("EjM2AXzMAAAgvlMGZtAAAMAAAAvlg");
	var mask_3_graphics_23 = new cjs.Graphics().p("EjO/AXzMAAAgvlMGd/AAAMAAAAvlg");
	var mask_3_graphics_24 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_25 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_26 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_27 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_28 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_29 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_30 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_31 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_32 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_33 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_34 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_35 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_36 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_37 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_38 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_39 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_40 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_41 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_42 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_43 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_44 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_45 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_46 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_47 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_48 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_49 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_50 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_51 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_52 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_53 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_54 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_55 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_56 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_57 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_58 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_59 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_60 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_61 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_62 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_63 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_64 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_65 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_66 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_67 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_68 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_69 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_70 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_71 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_72 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_73 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_74 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_75 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_76 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_77 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_78 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_79 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_80 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_81 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_82 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_83 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_84 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_85 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_86 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_87 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_88 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_89 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_90 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_91 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_92 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_93 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_94 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_95 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_96 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_97 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_98 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");
	var mask_3_graphics_99 = new cjs.Graphics().p("EjPsAXzMAAAgvlMGfZAAAMAAAAvlg");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:mask_3_graphics_0,x:249.0375,y:668.425}).wait(1).to({graphics:mask_3_graphics_1,x:253.575,y:668.425}).wait(1).to({graphics:mask_3_graphics_2,x:267.2,y:668.425}).wait(1).to({graphics:mask_3_graphics_3,x:289.9,y:668.425}).wait(1).to({graphics:mask_3_graphics_4,x:321.65,y:668.425}).wait(1).to({graphics:mask_3_graphics_5,x:362.525,y:668.425}).wait(1).to({graphics:mask_3_graphics_6,x:412.475,y:668.425}).wait(1).to({graphics:mask_3_graphics_7,x:471.475,y:668.425}).wait(1).to({graphics:mask_3_graphics_8,x:539.55,y:668.425}).wait(1).to({graphics:mask_3_graphics_9,x:616.725,y:668.425}).wait(1).to({graphics:mask_3_graphics_10,x:702.975,y:668.425}).wait(1).to({graphics:mask_3_graphics_11,x:798.3,y:668.425}).wait(1).to({graphics:mask_3_graphics_12,x:902.725,y:668.425}).wait(1).to({graphics:mask_3_graphics_13,x:1007.1,y:668.425}).wait(1).to({graphics:mask_3_graphics_14,x:1102.425,y:668.425}).wait(1).to({graphics:mask_3_graphics_15,x:1188.7,y:668.425}).wait(1).to({graphics:mask_3_graphics_16,x:1265.85,y:668.425}).wait(1).to({graphics:mask_3_graphics_17,x:1333.925,y:668.425}).wait(1).to({graphics:mask_3_graphics_18,x:1392.95,y:668.425}).wait(1).to({graphics:mask_3_graphics_19,x:1442.9,y:668.425}).wait(1).to({graphics:mask_3_graphics_20,x:1483.75,y:668.425}).wait(1).to({graphics:mask_3_graphics_21,x:1515.525,y:668.425}).wait(1).to({graphics:mask_3_graphics_22,x:1538.2,y:668.425}).wait(1).to({graphics:mask_3_graphics_23,x:1551.825,y:668.425}).wait(1).to({graphics:mask_3_graphics_24,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_25,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_26,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_27,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_28,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_29,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_30,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_31,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_32,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_33,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_34,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_35,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_36,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_37,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_38,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_39,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_40,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_41,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_42,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_43,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_44,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_45,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_46,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_47,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_48,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_49,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_50,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_51,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_52,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_53,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_54,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_55,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_56,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_57,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_58,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_59,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_60,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_61,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_62,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_63,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_64,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_65,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_66,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_67,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_68,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_69,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_70,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_71,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_72,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_73,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_74,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_75,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_76,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_77,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_78,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_79,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_80,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_81,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_82,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_83,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_84,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_85,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_86,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_87,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_88,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_89,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_90,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_91,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_92,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_93,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_94,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_95,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_96,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_97,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_98,x:1556.375,y:668.425}).wait(1).to({graphics:mask_3_graphics_99,x:1556.375,y:668.425}).wait(1));

	// WAVE_1
	this.instance_5 = new lib.wave1();
	this.instance_5.setTransform(1556.5,667.1);

	this.instance_6 = new lib.wave11();
	this.instance_6.setTransform(1556.5,667.1);
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_5,this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},23).to({state:[{t:this.instance_6}]},25).to({state:[]},1).to({state:[{t:this.instance_6}]},24).to({state:[{t:this.instance_6}]},25).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(24).to({_off:false},0).to({x:4215.4},25).to({_off:true},1).wait(24).to({_off:false,x:1556.5},0).to({x:4215.4},25,cjs.Ease.none).wait(1));

	// WAVE_1_1
	this.instance_7 = new lib.wave11();
	this.instance_7.setTransform(1556.5,667.1);
	this.instance_7._off = true;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(49).to({_off:false},0).to({x:4215.4},25,cjs.Ease.none).to({_off:true},1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,2885.7,1068.6);
// library properties:
lib.properties = {
	id: '14',
	width: 3112,
	height: 1280,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['14'] = {
	setRoot: function(next) { root = next; },
	setStage: function(next) { stage = next; },
	getStage: function() { return root.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;