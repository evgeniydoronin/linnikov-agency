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
	this.shape.graphics.f("#000000").s().p("EDFJABdQgtgJhCgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg8AVQhCAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhBgYQg9gVgkgIQg8gMhOAAQhOAAg9AMQgkAIg7AVQhCAYguAJQhJAQhcAAQhdAAhKgQQgsgJhCgYQg8gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAQhcAAhKgQQgtgJhBgYQg8gVglgIQg8gMhOAAQhOAAg9AMQgkAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYIg6gTQhOgWhjAAQhOAAg8AMQglAIg8AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhcAAIgBAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg8AMQgkAIg8AVQhCAYgtAJQhJAQhdAAIAAAAQhcAAhKgQQgtgJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhCAYgsAJQhKAQhdAAQhcAAhKgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhOAAg9AMQgkAIg8AVQhBAYgtAJQhLAQhcAAQhcAAhKgQQgtgJhCgYIg5gTQhOgWhjAAIgpABQhDADg5APQgeAIgoAOIgSAGQg5AVgvAIQhFANhVABQhcAAhLgQQgsgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhbAAhKgQQgugJhCgYQg8gVgjgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhDAYgsAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg7AVQhDAYgsAJQhLAQhcAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg9gMhOAAQhOAAg8AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhdAAhJgQQgtgJhCgYQg8gVgkgIQg9gMhNAAQhPAAg8AMQgkAIg8AVQhBAYguAJQhJAQhdAAQhcAAhKgQQgtgJhCgYQg7gVglgIQg8gMhOAAQhOAAg8AMQglAIg8AVQhCAYgsAJQhKAQhdAAQhcAAhJgQQgugJhBgYQg8gVgkgIQg8gMhPAAQhNAAg9AMQgkAIg9AVQhBAYgtAJQhKAQhcAAQhcAAhKgQQgtgJhCgYQg8gVgkgIQg8gMhOAAIAAh+QBbAABLAPQAqAKBFAXQA6AVAlAIQA9ANBOAAQBPAAA7gNQAlgIA8gVQBDgXArgKQBLgPBbAAQBcAABLAPQArAKBDAXQA7AVAlAIQA8ANBOAAQBPAAA8gNQAlgIA7gVQBFgXAqgKQBKgPBcAAQBbAABLAPQArAKBEAXQA6AVAmAIQA8ANBOAAQBPAAA7gNQAmgIA7gVQBDgXArgKQBLgPBcAAQBbAABKAPQArAKBEAXQA7AVAlAIQA9ANBOAAQBOAAA9gNQAkgIA8gVQBDgXArgKQBLgPBbAAIAAAAQBcAABLAPQArAKBDAXQA7AVAlAIQA8ANBOAAQBPAAA8gNQAlgIA7gVQBFgXAqgKQBKgPBcAAQBbAABLAPQArAKBEAXQA7AVAkAIQA9ANBOAAQBPAAA7gNQAmgIA7gVQBEgXAqgKQBLgPBcAAQBbAABKAPQArAKBEAXQA8AVAlAIQA7ANBPAAQBOAAA9gNQAkgIA7gVQBEgXArgKQBLgPBbAAQBcAABLAPQApAKBFAXQA7AVAlAIQA8ANBOAAQBPAAA7gNQAmgIA7gVQBDgXArgKQBKgPBdAAQBbAABKAPQArAKBEAXQA7AVAlAIQA8ANBPAAQBAAAA0gJQAngHAtgOIAigMQBEgXArgKQBLgPBbAAQBcAABKAPQArAKBDAXQApAOAXAHQAmAKAnAFQAqAGA0AAQBPAAA8gNQAlgIA7gVQBDgXAsgKQBKgPBcAAQBbAABLAPQArAKBEAXQA7AVAkAIQA8ANBPAAQBPAAA7gNQAlgIA8gVQBDgXArgKQBKgPBcAAIABAAQBbAABKAPQArAKBEAXQA7AVAlAIQA8ANBOAAQBPAAA8gNQAlgIA7gVQBEgXArgKQBKgPBcAAQBcAABKAPQArAKBEAXQA6AVAmAIQA8ANBOAAQBOAAA9gNQAlgIA7gVQBQgcA2gJQBAgLBOAAQBbAABLAPQAqAKBFAXQA7AVAkAIQA9ANBOAAQBPAAA7gNQAlgIA8gVQBDgXArgKQBKgPBcAAIAmABQBMACBAAPQAnAJA8AVQA7AVAlAIQA8ANBOAAQBPAAA8gNQAlgIA7gVQBEgXArgKQBKgPBcAAQBbAABLAPQArAKBEAXQA7AVAlAIQA8ANBPAAQBOAAA7gNQAmgIA6gVQBEgXArgKQBLgPBcAAIAAAAQBbAABLAPQAqAKBEAXQA7AVAlAIQA9ANBOAAQBPAAA8gNQAkgIA8gVQBDgXArgKQBLgPBbAAQBcAABLAPQAqAKBEAXQAnAOAZAHQBJAUBhABQBPAAA8gNQAlgIA7gVQBFgXAqgKQBKgPBcAAQBbAABLAPQArAKBEAXQA6AVAlAIQA9ANBOAAQBPAAA7gNQAmgIA7gVQBDgXArgKQBLgPBcAAQBbAABLAPQAqAKBEAXQA7AVAlAIQA9ANBOAAQBOAAA9gNQAkgIA7gVQBEgXArgKQBLgPBbAAIAAAAQBcAABLAPQApAKBFAXQA7AVAlAIQA8ANBOAAQBPAAA8gNQAlgIA7gVQBDgXArgKQBLgPBcAAQBbAABLAPQArAKBEAXQA6AVAlAIQA8ANBPAAQBPAAA7gNQAlgIA8gVQBEgXAqgKQBLgPBcAAQBbAABKAPQArAKBEAXQA7AVAlAIQA8ANBPAAQBOAAA9gNQAkgIA7gVQBEgXArgKQBLgPBbAAQBcAABLAPQApAKBFAXQA7AVAlAIQA8ANBPAAQBOAAA8gNQAlgIA7gVQBEgXArgKQBKgPBcAAQBbAABLAPQArAKBEAXQA6AVAlAIQA8ANBPAAQBPAAA7gNQAmgIA7gVQBDgXAsgKQBKgPBbAAQBcAABLAPQAqAKBEAXQA8AVAkAIQA8ANBPAAQBPAAA7gNQAlgIA7gVQBFgXArgKQBJgPBcAAIAAB+QhNAAg9AMQglAIg7AVQhCAYgtAJQhKAQhcAAQhcAAhKgQg");
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
(lib._15 = function(mode,startPosition,loop) {
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
	this.instance.setTransform(785.45,244.25,0.1307,0.1307);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(65).to({_off:false},0).wait(1).to({scaleX:0.3482,scaleY:0.3482,x:785.4843,y:244.2733},0).wait(1).to({scaleX:0.642,scaleY:0.642,x:785.5305,y:244.3047},0).wait(1).to({scaleX:0.8723,scaleY:0.8723,x:785.5668,y:244.3294},0).wait(1).to({scaleX:1.0263,scaleY:1.0263,x:785.5911,y:244.3459},0).wait(1).to({scaleX:1.1218,scaleY:1.1218,x:785.55,y:244.3},0).wait(1).to({scaleX:1.0507,scaleY:1.0507,x:785.4624,y:244.2416},0).wait(1).to({scaleX:1.0119,scaleY:1.0119,x:785.4147,y:244.2098},0).wait(1).to({scaleX:1,scaleY:1,x:785.45,y:244.25},0).wait(27));

	// mask_f
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-11.6,144.6,-12,17.6).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape.setTransform(741.1726,286.0429);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],10.3,140,-49.4,36.5).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_1.setTransform(741.1726,286.0429);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-0.6,162.1,-98.2,106).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_2.setTransform(741.1726,286.0429);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-40.1,147.5,-113.3,81.1).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_3.setTransform(741.1726,286.0429);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-129.6,105.9,-137.7,15.5).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_4.setTransform(741.1726,286.0429);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-82.4,93.5,-99,1.2).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_5.setTransform(741.1726,286.0429);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-35.2,81.1,-60.4,-13.1).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_6.setTransform(741.1726,286.0429);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-138.7,172.4,-200.4,111).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_7.setTransform(741.1726,286.0429);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-58.6,27.9,-58.7,-40.6).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_8.setTransform(741.1726,286.0429);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-55.4,-20.7,-34.7,-77.7).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_9.setTransform(741.1726,286.0429);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-52.2,-69.4,-10.7,-114.9).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_10.setTransform(741.1726,286.0429);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-48.9,-118.1,13.4,-152).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_11.setTransform(741.1726,286.0429);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-45.7,-166.8,37.4,-189.2).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_12.setTransform(741.1726,286.0429);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-39.7,-282,64.9,-293.3).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_13.setTransform(741.1726,286.0429);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-14.8,-395.9,111.2,-396.1).s().p("AgTSNQgfgfAAgrIAAjyIkzhGQgggIgXgZQgWgagEghIgfkrIh5hWQgfgWgKgjQgKgkAPgiIC8m9QAAg3ALhKQAZizBJiTQDrnnJ0ASQArACAeAfQAeAggBArQgCAsgfAeQggAdgrgBQnkgOi4FuQg7B2gUCRQgKBFABAvQAAAXgIAVIikGEIBcBBQASANALAUQAMAUACAWIAdEQIE6BIQAjAIAXAcQAXAdAAAlIAAFGQAAArgeAfQgfAfgsAAQgrAAgegfg");
	this.shape_14.setTransform(741.1726,286.0429);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},47).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[]},1).wait(38));

	// mask_f___копия
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-60.7,-172.8,30.5,-148.1).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_15.setTransform(831.2232,302.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-48.8,-136.9,27.8,-101).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_16.setTransform(831.2232,302.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-38,-104.1,25.3,-58).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_17.setTransform(831.2232,302.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-28.3,-74.5,23,-19.1).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_18.setTransform(831.2232,302.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-19.6,-48,21,15.7).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_19.setTransform(831.2232,302.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-11.9,-24.6,19.1,46.4).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_20.setTransform(831.2232,302.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],-5.2,-4.4,17.6,73).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_21.setTransform(831.2232,302.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],0.4,12.8,16.3,95.6).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_22.setTransform(831.2232,302.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],5.1,26.9,15.2,114).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_23.setTransform(831.2232,302.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],8.7,37.8,14.4,128.3).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_24.setTransform(831.2232,302.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],11.2,45.6,13.7,138.6).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_25.setTransform(831.2232,302.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],12.8,50.3,13.4,144.7).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_26.setTransform(831.2232,302.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().ls(["rgba(255,255,255,0)","#FFFFFF"],[0.471,0.478],13.3,51.8,13.3,146.8).ss(21,1,1).p("AlxzpQE9AJDDC8QCwCpAoELQAmEAhkDwQhoD6jXB/IgBPx");
	this.shape_27.setTransform(831.2232,302.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},62).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[]},1).wait(25));

	// mask_f___копия
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(21,1,1).p("AlPznQAIABAIABQAZACAYAEQDjAmCZCTQCwCpAoELQAmEAhkDwQhpD6jWB/IgBPx");
	this.shape_28.setTransform(834.5732,303.075);
	this.shape_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(47).to({_off:false},0).to({_off:true},15).wait(38));

	// face
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AGtRcIAAqIQAAgUAKgRQAKgQAQgKQDQh5BZjOQA5iEAAiRQAAi9gkiFQgVhJgkhEQhLiLiGhKQimhekAAAQjdAAifBeQieBdhcC6Qg7B4gaCTQgNBJgBAyQAAAOgFAMIihGgIBxBFQAQAJAJARQAKAPAAATIAJEoIFfBDQAaAGARATQAQAUAAAbIAAEwIiSAAIAAjzIldhEQgZgFgRgTQgQgUgBgZIgKk7IiDhQQgXgOgIgZQgJgZAKgYICynOQAEhNAShYQAeiSA8h8QBejCCfhyQDQiXEuAAQESAAC/BgQC/BgBnC/QBICEAZCuQAOBfAACEQAACohACaQhhDvjlCTIAAJfg");
	this.shape_29.setTransform(777.6493,281.05);
	this.shape_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_29).wait(47).to({_off:false},0).wait(53));

	// wave_white (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_24 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_25 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_26 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_27 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_28 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_29 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_30 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_31 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_32 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_33 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_34 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_35 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_36 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_37 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_38 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_39 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_40 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_41 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_42 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_43 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_44 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_45 = new cjs.Graphics().p("Egh9AXAIABgKQgBgGAGgMQAlhCBFiGIDYmVIFpqrIFvgqQBvkzA4iQIBJi9IHHhCIG0tvIIISBIGTC7ICfGeQARAuAnB3IBoAcQByAgA1ANQA5AOArA6ICaDKQBbB2A7BWQBmCQBLBeQBiB7A6BOQAPAVgCAGIABAHgAljmvImsA8IiQF6QgbBIhbCsIljApQiXE4hGCGIknIyIOiinQCcgcTljtIh+o4Qj2AThqALIjxAbIigAQQCIhCCVg3QCKgyEihyIjyzFg");
	var mask_graphics_46 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_47 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_48 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_graphics_49 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
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

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_graphics_24,x:785.3,y:813.175}).wait(1).to({graphics:mask_graphics_25,x:785.3,y:812.225}).wait(1).to({graphics:mask_graphics_26,x:785.3,y:809.375}).wait(1).to({graphics:mask_graphics_27,x:785.3,y:804.625}).wait(1).to({graphics:mask_graphics_28,x:785.3,y:798.025}).wait(1).to({graphics:mask_graphics_29,x:785.3,y:789.475}).wait(1).to({graphics:mask_graphics_30,x:785.3,y:779.025}).wait(1).to({graphics:mask_graphics_31,x:785.3,y:766.725}).wait(1).to({graphics:mask_graphics_32,x:785.3,y:752.475}).wait(1).to({graphics:mask_graphics_33,x:785.3,y:736.375}).wait(1).to({graphics:mask_graphics_34,x:785.3,y:718.325}).wait(1).to({graphics:mask_graphics_35,x:785.3,y:698.425}).wait(1).to({graphics:mask_graphics_36,x:785.3,y:676.625}).wait(1).to({graphics:mask_graphics_37,x:785.3,y:653.375}).wait(1).to({graphics:mask_graphics_38,x:785.3,y:631.575}).wait(1).to({graphics:mask_graphics_39,x:785.3,y:611.675}).wait(1).to({graphics:mask_graphics_40,x:785.3,y:593.625}).wait(1).to({graphics:mask_graphics_41,x:785.3,y:577.525}).wait(1).to({graphics:mask_graphics_42,x:785.3,y:563.275}).wait(1).to({graphics:mask_graphics_43,x:785.3,y:550.975}).wait(1).to({graphics:mask_graphics_44,x:785.3,y:540.525}).wait(1).to({graphics:mask_graphics_45,x:785.3,y:532.025}).wait(1).to({graphics:mask_graphics_46,x:785.365,y:727.575}).wait(1).to({graphics:mask_graphics_47,x:785.365,y:723.125}).wait(1).to({graphics:mask_graphics_48,x:785.365,y:719.875}).wait(1).to({graphics:mask_graphics_49,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_50,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_51,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_52,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_53,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_54,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_55,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_56,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_57,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_58,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_59,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_60,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_61,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_62,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_63,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_64,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_65,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_66,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_67,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_68,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_69,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_70,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_71,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_72,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_73,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_74,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_75,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_76,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_77,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_78,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_79,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_80,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_81,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_82,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_83,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_84,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_85,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_86,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_87,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_88,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_89,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_90,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_91,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_92,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_93,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_94,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_95,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_96,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_97,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_98,x:785.365,y:719.225}).wait(1).to({graphics:mask_graphics_99,x:785.365,y:719.225}).wait(1));

	// wave_2
	this.instance_1 = new lib.wave21();
	this.instance_1.setTransform(891,667.1);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24).to({_off:false},0).to({x:3549.9},25).to({_off:true},1).wait(24).to({_off:false,x:891},0).to({x:3549.9},25,cjs.Ease.none).wait(1));

	// wave_2_1
	this.instance_2 = new lib.wave21();
	this.instance_2.setTransform(891,667.1);
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({x:3549.9},25,cjs.Ease.none).to({_off:true},1).wait(25));

	// mask_UP (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_24 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_25 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_26 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_27 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_28 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_29 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_30 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_31 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_32 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_33 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_34 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_35 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_36 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_37 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_38 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_39 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_40 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_41 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_42 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_43 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_44 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_45 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_46 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_47 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_48 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_49 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_50 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_51 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_52 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_53 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_54 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_55 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_56 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_57 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_58 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_59 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_60 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_61 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_62 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_63 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_64 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_65 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_66 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_67 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_68 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_69 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_70 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_71 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_72 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_73 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");
	var mask_1_graphics_74 = new cjs.Graphics().p("EgjcAXrIABgKIAAgEMAAAgvHMBGXAAAMAAAAuZIAAAyMhGXAAAMBGXAAAIAAgyIASAZQAQAWgCAGIABAHg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_1_graphics_24,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_25,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_26,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_27,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_28,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_29,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_30,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_31,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_32,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_33,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_34,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_35,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_36,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_37,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_38,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_39,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_40,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_41,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_42,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_43,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_44,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_45,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_46,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_47,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_48,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_49,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_50,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_51,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_52,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_53,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_54,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_55,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_56,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_57,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_58,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_59,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_60,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_61,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_62,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_63,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_64,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_65,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_66,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_67,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_68,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_69,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_70,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_71,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_72,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_73,x:785.35,y:515.7}).wait(1).to({graphics:mask_1_graphics_74,x:785.35,y:515.7}).wait(26));

	// aisberg_UP
	this.instance_3 = new lib.a_up("synched",0);
	this.instance_3.setTransform(785.3,813.15);
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({y:516.8,mode:"independent"},25,cjs.Ease.quadInOut).wait(51));

	// mask_DOWN (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_24 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_25 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_26 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_27 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_28 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_29 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_30 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_31 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_32 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_33 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_34 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_35 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_36 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_37 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_38 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_39 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_40 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_41 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_42 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_43 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_44 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_45 = new cjs.Graphics().p("EgiJAgsMAAAhBIMBD9AAAIAXAAMAAABBIgEAh0ggcgEgiJggcIAAgPMBD7AAAIABAKIABAFg");
	var mask_2_graphics_46 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_47 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_48 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_49 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_50 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_51 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_52 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_53 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_54 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_55 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_56 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_57 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_58 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_59 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_60 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_61 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_62 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_63 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_64 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_65 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_66 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_67 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_68 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_69 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_70 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_71 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_72 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_73 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");
	var mask_2_graphics_74 = new cjs.Graphics().p("EgiJAhMMAAAhCHMBD9AAAIAXAAMAAABCHgEgiJgg7IAAgQMBD7AAAIABAKIABAGg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_2_graphics_24,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_25,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_26,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_27,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_28,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_29,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_30,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_31,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_32,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_33,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_34,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_35,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_36,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_37,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_38,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_39,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_40,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_41,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_42,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_43,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_44,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_45,x:786.45,y:875.125}).wait(1).to({graphics:mask_2_graphics_46,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_47,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_48,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_49,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_50,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_51,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_52,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_53,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_54,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_55,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_56,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_57,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_58,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_59,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_60,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_61,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_62,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_63,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_64,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_65,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_66,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_67,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_68,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_69,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_70,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_71,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_72,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_73,x:786.45,y:875.175}).wait(1).to({graphics:mask_2_graphics_74,x:786.45,y:875.175}).wait(26));

	// aisberg_DOWN
	this.instance_4 = new lib.a_down();
	this.instance_4.setTransform(785.35,458.3);
	this.instance_4._off = true;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(24).to({_off:false},0).to({y:866.3},25,cjs.Ease.quadInOut).wait(51));

	// wave_blk (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_0 = new cjs.Graphics().p("EgAdAklIgmlbIgo0UIgikZIgNuoIAAgMIAAgZIABgSIAHjIIAPmVIAaqrIAagqIAMnEIAGi9IAfhCIAftvIAlSBIAcC7IAMGfIAEClIAIAcIALAtQAFAOADA6IAKDKIALDMIANDuIALDJIAAAbIABARIAAARIgBAdQgBBVgfMOIgeL9IgfEPMgA8AgmgEgAZgmWIgeA8IgKF7IgID0IgaApIgQG+IgUIyIBBinIBkkJIgJo4QgSATgGALIgSAbIgLAQQAKhCAKg3IAeikIgRzGg");
	var mask_3_graphics_1 = new cjs.Graphics().p("EgAeAkkIgmlaIgr0UIgjkZIgDjBIgLrnIAAgMIAAgPIAAgKIAAgSIAAgEIABgOIAHi2IAAgBIAPlyIABgiIAbqrIAagrIAFibIAJknIAChiIADhbIAhhEIAgttIAnR/IAdC7IANGfIAECkIAIAdIALAtQADAJADAcIACAiIAGBqIAEBWIABALIAHCHIAFBEIACAfQAFB2AFBSIAAAHIAMDHIAAACIABAbIAAARIAAARIAAAdIgECjIgIDZIgBAaIAAAOIgBAPIgBAXIgQGZIgQFpIgRGVIgfEPMgBAAgmgEgAZgmWIggA7IgKF8IgJDzIgbAqIgQG9IgWIzIBFinIBokJIgJo4QgSASgIAMIgSAbIgLAQQAJhCALg3IAgikIgSzGg");
	var mask_3_graphics_2 = new cjs.Graphics().p("EgAgAklIgrlaIgx0VIglkXIgGjCIgNrpIAAgLIAAgPIAAgKIABgTIAAgDIABgPIAIi2IAAgBIAQlyIACgjIAfqqIAbgpIAHibIAJkoIADhhIAEhdIAfhCIAptrIAtR5IAeC8IARGdIAEClIAIAcIAMAtQACAKADAbIACAjIAGBqIAHBWIABAKIAJCGIAEBEIADAfQAFB1AHBTIAAAHIANDHIAAACIABAbIABARIAAARIAAAdQAAAhgECCIgFDZIgBAZIgCAPIgBAOIgBAYQgFCqgNDvIgRFqIgTGVIggEPIgUG+Ig5ZpgEgAbgmWIgkA7IgMF8IgKDzIgeApIgSG+IgZIyIBOimQANgcBpjuIgLo4QgVATgIAMIgVAbIgMAPQALhCAMg2IAjikIgUzGg");
	var mask_3_graphics_3 = new cjs.Graphics().p("EgAkAkkIgwlYIgMjAIgyxWIgpkWIgJjAIgQrsIgBgMIAAgOIAAgLIABgTIAAgDIABgPIAKi2IAAAAIAUlzIACgjIAnqqIAbgpIAKiYIAMkpIAEhhIADhdIAfhBIACgCIAaloIAan/IA2RyIAgC7IAXGaIAHCmIAHAdIAMAtQADAJADAcIACAjIAHBqIAIBVIABAJIALCFIAGBEIADAfQAHB0AIBTIAAAIIAQDGIAAADIABAaIABASIAAARIAAAcQACAigDCBQAABZgDCAIgBAZIAAAPIgBAOIgCAYQgFCogQDzQgKCzgLC3IgXGVIgjEPIgbG8IhGZtgEgAegmXIgrA7IgPF8QgCBHgJCsIgkApIgWG+IgeIyIBdimICNkKIgNo4QgZATgJAMIgZAbIgPAPQANhCAPg2IAqikIgYzGg");
	var mask_3_graphics_4 = new cjs.Graphics().p("EgAsAkkIg3lWIgQi+Ig+xaIgvkVIgPi+IgUrwIAAgLIgBgPIAAgKIABgTIAAgDIABgPIAMi3IAAgBIAal0IACgiIAopUIAJhVIAcgpQAHhQAIhFIAOkqIAFhhIAFhdIAghEIAmlgIAgoAIBERlIAhC7IAdE/IAEBYIAICmIAIAdIAMAuQADAJADAcIADAjIAHBqQAGAmAFAuIABAJQAJBIAGA7IAIBDIADAeQAIB0AKBVIABAHIATDGIAAADIABAbIABARIABARIABAdQADAigCCAQADBZgCB/QABANgBANIgBAOIgBAPIgBAXQgGCmgVD2QgMC0gOC4IgcGWIgnEQIglG4IhXZzgEgAkgmZIg1A8IgRF7IgPD0IgsApQgSE4gJCGIgkIyIByinICskJIgPo4QgeATgNALIgdAbIgTAQQAQhCASg3QAQgyAkhyIgezGg");
	var mask_3_graphics_5 = new cjs.Graphics().p("EgA3AkjIhBlSIgXi9IhOxeIg2kSIgVi8Igar1IAAgMIAAgPIgBgKIAAAAIABgTIAAgDIABgPIAQi3IAAgBIAfl1IADgjIAypVIANhTIAdgoQAKhNAKhDQALjBAIhrIAGhiIAGhdIAfhCIABgCIAzlXIApoCIAVDpIBANtIAkC7IAoE6IAGBZQAEAyAFB1IAIAdIANAtQADAKADAcIADAjIAJBrQAHAlAGAsIACAKQANBGAHA5IAJBDIAFAeQAJByANBWIABAHIAXDHIAAADIACAbIACARIABARIABAdQAFAkAAB9QAGBaAAB+IABAaIgBAOIgBAPIgBAXQgHCjgbD7QgOC0gSC5IgkGXIgqERIg0GzIhtZ7gEgAugmaIhBA7IgWF8QgEBHgOCsIg2AqQgXE4gLCFIgsIzICNinIDVkJIgTo5QgmATgPAMIglAbIgYAPQAVhBAWg3QAVgzArhxIgkzGg");
	var mask_3_graphics_6 = new cjs.Graphics().p("EAAFAz/IhPv5IhIkyIgfi6IhhxlIgHgoIg5jmIgdi6QgaqJgGhyIgBgMIAAgPIAAgKIAAAAIABgTIAAgDIABgPQAGhCANh2IAAgBQANh/Abj4IADgiIA+pXIARhRIAegmQAOhLAOhAQAOjCAJhsIAIhiIAHheIAfhDIABgBIBElMIAzoEIAbDTIBQNwIAeCeIAJAeIA2EzIAHBaQAFA0AHBzIAIAeIANAuQADAKAEAbIADAkIAKBrIASBQIABAJQARBEAJA4IAMBBIAFAfQAMBvARBZIAAAHIAdDGIAAADIADAbIACARIACARIACAdQAHAmACB7QAJBcADB7QACAOgBAMIgBAOIAAAPIgCAYQgHCegjECQgSCzgWC7IgsGZIgwERIgDAgIhBGOIiIaEgEgA7gmcIhRA7IgaF8QgFBHgRCsIhDAqIgpG9Ig4IzICuinQAegcDqjtIgYo5QguATgTAMIgtAbIgeAPQAZhBAcg3QAZgzA2hxIgtzGg");
	var mask_3_graphics_7 = new cjs.Graphics().p("EAAFA0FIhhwAIhWktIgni4Ih4xrIgHgpIhEjiQgThfgThXQghqOgHh1IgBgMIAAgPIgBgKIABgTIAAgEIACgPIAXi5IAAAAIAxl5IAEgiIBNpaIAVhNIAggkQAShIATg+QARjBALhuIAJhjIAJheIAghEIABgCIBXk9IBAoHIAhC4IBiN1IAhCfIAKAdIBGEsIAJBaQAHA2AIBzIAJAdIANAvQADALAEAbIAEAjIAMBtQALAjALApIACAJQAVBCALA2IAQBBIAGAeQANBtAWBbIABAHIAiDGIAAADIAEAbIACARIADARQACAKABATQAJApAFB3QAOBeAGB5QACANgBAMIAAAOIgBAQIgCAYQgHCZgsEJQgWCzgcC9Ig2GbIg6EyIhUGIIioaOgEgBLgmeIhiA7IghF8QgGBHgVCsIhRApQgjE4gQCGIhDIyIDVimQAjgcEfjuIgdo4Qg4ATgYAMIg3AbIglAPQAfhCAig2QAggzBChxIg4zGg");
	var mask_3_graphics_8 = new cjs.Graphics().p("EAAGA0MIh3wJIhlkoIgxi0IiSxyIgJgpIhPjeQgZhdgYhWQgoqTgKh4IAAgNIgBgOIAAgKIAAgBIABgTIAAgDQAAgHACgJIAci5IAAgBQATiAAoj6IAFgjIBepcIAbhJIAhgjQAYhEAXg6QAVjDANhvIAMhkIALhfIAfhEIACgCIBukuIBNoJIApCYIB3N7IAkCgIAMAcIBZElIAKBaQAJA5AKBxIAJAdIANAwQAEALAEAbIAFAjIANBuQAOAiANAoIADAIQAbBAANAzQALAfAJAgIAHAeQAPBrAbBeIABAGIAqDHIAAADIAFAbIADARQACAGABALQACAKACATQANArAHB0QAUBfAJB2QADAPgBALIgBAPIAAAPIgCAYQgICUg3ERQgaCzgiDAIhCGcIhCEzIhqGBIjOaagEgBcgmhIh3A7IgoF8QgHBHgaCsIhiAqQgqE4gUCFIhRIzIECinQArgcFbjtIgjo5QhEATgdAMIhDAbIgsAPQAlhBAqg3QAmgzBQhxIhDzGg");
	var mask_3_graphics_9 = new cjs.Graphics().p("EAAGA0UIiOwSIh3kiIg8iwIixx8IgJgpIhcjZQgfhbgfhTQgxqZgLh9IgBgMIgBgPIAAgKIAAAAIABgTIAAgEQAAgHACgJIAji6IAAgBQAXiAAwj8IAGgjIBwpgIAhhEIAkggQAdhAAdg3QAZjEAQhxIAOhkIANhgIAghGIABgBICJkcIBcoNIAxB1ICQOCIAoChIAOAbIBtEbIANBcQAKA7AMBvIAJAeIAPAwQAEAMAEAaIAGAlIAPBuQARAgAQAmIADAJQAhA9AQAwQANAdALAgIAJAeQASBoAhBhIABAHIAxDGIABADIAGAbIADARIAEASQADAKADASQAQAuAKBwQAaBhANB0QADAOgBALIAAAPIAAAQIgDAYQgICOhDEaQgfCygpDEIhQGeIhKE0IiEF4Ij3apgEgBwgmkIiPA7IgvF8QgJBHgeCsIh3AqQgyE4gXCFIhiIzIE1inQA0gcGgjtIgqo5QhSATgiAMIhRAbIg0APQAshBAyg3QAugzBfhxIhQzGg");
	var mask_3_graphics_10 = new cjs.Graphics().p("EAAHA0dIipwdIiKkbIhKisIjRyFIgLgqIhrjTQgmhYgmhSQg5qggOiAIgBgNIgBgPIgBgKIAAAAIACgTIAAgEQgBgHADgJIApi7IAAgBIBUl/IAHgjICGpjIAog/IAmgeQAkg7AjgzQAdjGAUhyQAJg1AHgwIAQhhIAfhHIACgBIClkIIBuoQIA7BNICrOJIAsCiICUErIAQBdQAMA+APBtIAJAfIAPAwQAFANAEAaIAGAkIASBwQAUAfAUAkIADAHQAoA7AUAsQAPAcANAgIAKAeQAVBkAnBlIACAGIA6DHIABADIAHAbIAFARIAEASQAEAKADASQAUAyAOBqQAhBkAQBwQAFAQgBAKIAAAPQABAHgBAJIgDAZQgJCFhREmQgkCygyDGIheGgIhUE3IigFuIkma4gEgCGgmoIipA8Ig4F7QgLBIgkCsIiMApQg7E4gcCGIh0IyIFuinQA+gcHsjtIgxo4QhhATgpALIhfAbIg/AQQA1hCA7g3QA2gyByhyIhfzGg");
	var mask_3_graphics_11 = new cjs.Graphics().p("EAAIA0mIjHwnIigkUIhXioIkCy6Ih9jMQgthWgthQQhEqngQiFIgCgNIgBgPIAAgKIAAAAIABgUIAAgDQAAgHADgKIAwi8IAAgBQAgiCBDj/IAIgjICdpoIAwg5IApgcQAqg1AqgvQAjjGAXh1IAThmIAThiIAfhIIACgBIDFjzICBoTIBGAhIDJORIAwCkICxEeIASBeQAPBBAQBsIAKAfIAQAxQAFAOAFAZIAHAlIAVBxQAXAdAXAhIAFAHQAvA3AXApQASAaAPAgIAMAeQAZBhAuBoIACAHIBEDGIABADQAFATADAIIAGARIAFASQAFALAEASQAYA1ASBlQAoBnAVBsQAGAQgBAKIAAAPQABAHgBAJQgBAKgDAPQgJB+hgEyQgrCwg6DLIhuGiIhfE5Ii/FkIlbbJgEgCfgmsIjGA8IhCF7QgMBIgqCsIikApQhGE4ggCGIiIIyIGtinQBIgcJCjtIg6o4QhyATgxALIhvAbIhJAQQA+hCBFg3QBAgyCFhyIhwzGg");
	var mask_3_graphics_12 = new cjs.Graphics().p("EgDfAj9Ii3kLIhoijIkrzGIiPjGQg1hSg2hOQhPqvgTiKIgBgOIgCgOIAAgKIAAgBIABgTIAAgEQAAgHADgKIA4i+IAAgBQAmiCBNkBIAKgkIC3prIA4g0IAsgYQAygwAxgqQApjIAah3IAXhnIAVhjIAghJIACgBIDojaICWoYIBSgPIDqOZIA0CmIDQERIAVBeQASBFATBqIAKAfIAQAyQAGAPAFAYIAIAmIAYBzQAbAaAbAfIAFAHQA4AzAaAlQAWAYARAgQAIAOAGAQQAdBdA2BsIACAGIBODHIACADQAFASAFAJIAGARIAHASQAFAMAFARQAdA5AWBgQAwBpAbBoQAHARgCAJIABAPQABAHgBAJIgEAaQgLB1hwE/QgxCwhEDPIiBGlIhqE7IjhFXImUbdIgsANgEgC6gmvIjmA7IhMF8QgPBHgxCsIi+AqQhRE4glCFIieIzIHyinQBUgcKejtIhDo5QiEATg5AMIiBAbIhVAPQBJhBBPg3QBKgzCbhxIiCzGg");
	var mask_3_graphics_13 = new cjs.Graphics().p("EgD/AkEIjPkEIh3idIlUzTIihi/Qg+hPg+hMQhaq3gWiOIgCgPIgCgNIAAgLIAAgBIABgUIAAgDQAAgGAEgLIA/i/IAAgBICEmHIALgkIDQpvIBBgtIAugXQA6gpA6glQAtjKAfh5IAZhoIAZhkIAghLIACgBIELjCICrocIBdg/IEMOjIA4CmIDvEEIAYBgQAUBIAWBnIALAgIARAzQAGAPAFAZIAKAmIAaB0QAfAZAfAcIAGAFQBAAwAeAiQAZAVAUAgQAIAOAIAQQAgBZA+BxIACAGQA2B1AjBRIACAEQAGAQAGALIAHARIAIASQAGAMAFAQQAiA9AbBbQA4BsAfBjQAIASgBAIIABARQABAFgBALIgFAaQgLBriAFMQg4CwhODTIiTGoIh2E9IkDFMInNbvIgzAtgEgDVgmrIkFA7IhYF8QgQBHg4CsIjYAqQhcE4grCFIi0IzII3inQBfgcL8jtIhNo4QiWAShAAMIiTAbIhhAQQBShCBbg3QBUgzCwhxIiTzGg");
	var mask_3_graphics_14 = new cjs.Graphics().p("EgEcAkKIjlj8IiFiZIl6zeIiyi4QhFhNhGhJQhlq/gYiUIgCgOIgCgOIAAgKIAAgBIABgUIAAgEQAAgGAEgLIBHjBIAAgBQAwiDBikGIANgjIDnp0IBJgoIAxgTQBAgkBBghQAzjLAih7IAchpIAbhlIAghNIACAAIEsisIC9ogIBphrIEpOqIA8CpIEMD3IAaBgQAXBMAYBmIALAgIASAzIANAoIAKAnIAdB1QAjAXAiAaIAHAFQBHAtAiAeQAbATAXAgIARAeQAkBVBFB0IADAHQA7B0AoBSIABAEQAHAQAGALIAIARIAJASQAHAMAGARQAnBAAeBVQA/BvAlBgQAJASgCAIIABAQQACAGgCAKIgEAbQgNBjiPFZQg+CvhWDXIijGqIiCE+IkiFCIoBcBIg4BJgEgDugmnIkiA7IhiF8QgSBHg+CsIjwAqQhmE4gwCFIjIIzIJ3inQBpgcNRjtIhVo5QioAThHAMIijAbIhsAPQBchBBkg3QBegzDEhxIikzGg");
	var mask_3_graphics_15 = new cjs.Graphics().p("EgE2AkOImKmJImdzoIjBizQhMhKhMhIQhurFgbiYIgCgOIgCgOIgBgLIAAAAIABgVIAAgDQAAgHAFgLIBNjCIAAgBICfmLIAOgkID9p3IBQgjIAzgRQBHgfBGgdQA4jMAlh9IAfhqIAehmIAghNIACgBIFIiYIDPojIBziTIFEOyIBACqIElDrIAdBiQAaBPAaBjIALAhIASA0QAHARAGAXIAMAnIAfB3QAmAVAmAYIAHAEQBOAqAlAbQAeARAZAhQAKANAJAQQAmBSBLB4IAEAGQBAB0AsBSIACAEIAOAbIAJARIAJASQAIANAHAQQAqBEAiBQQBGBxAoBdQALATgCAHIABAQQACAGgCALIgFAbQgNBbidFkQhDCuheDbIiyGsIiMFBIk+E3IowcRIg9BkgEgEEgmkIk9A7IhqF8QgUBHhDCsIkGAqQhwE4g0CFIjaIzIKwinQBzgcOejtIheo5Qi2AThOAMIiyAbIh2APQBlhBBtg3QBngzDVhxIizzGg");
	var mask_3_graphics_16 = new cjs.Graphics().p("EgFNAkUImomAIm7zyIjPitQhShJhShFQh3rLgcicIgDgOIgCgPIgBgKIAAgBIACgUIAAgEQgBgHAFgLIBTjCIAAgBICsmOIAPgkIEPp6ICMgtQBMgbBMgZQA8jOAoh/IAhhqIAhhnIAfhPIADAAIFiiGIDeonIB7i1IFdO4IBECrIE8DhIAfBjQAbBRAcBiIAMAhIATA0QAHASAGAXIANAnIAhB4QApAUApAWIAIAEQBTAnAoAYQAgAQAbAhQALANAKAPQAoBQBSB6IAEAGQBEB1AvBSIACAEIAQAbIAJARIAKASQAJAOAHAPQAuBGAlBNQBMBzAsBaQALASgBAIIABAQQACAGgCAKQgBAKgEASQgOBVipFuQhICthlDdIlULxIlYEvIpZceIhDB8gEgEYgmhIlUA7IhyF8QgWBHhICsIkaAqQh3E4g4CFIjqIzILiinQB8gcPijtIhko4QjEAShUAMIi+AbIh/AQQBshCB1g3QBugzDmhxIjAzGg");
	var mask_3_graphics_17 = new cjs.Graphics().p("EgFiAkXInBl3InXz5IjaipIiviKQh+rQgeigIgDgPIgDgNIAAgLIAAgBIABgUIAAgEQAAgGAFgMIBYjDIAAgBQA8iGB6kKIAQgkIEgp9ICTgnICjgtQA/jPAriAIAjhrIAihnIAghQIADgBIF4h2IDsopICDjWIFzO+IBGCtIFQDYIAhBjQAdBUAeBgIAMAiIATA1IAPAoIAMAoIAkB5IBWAmIAJAEQBZAlAqAVQAiAPAdAgQALAOALAQQArBMBWB9IAEAGQBJB0AyBTIACAEIAQAbIAKARIAMASIARAdQAwBJAoBJQBSB1AvBXQAMATgCAHIABARQADAFgCALQgBAJgFATQgOBPi0F2QhNCthrDhIlnLzIluEnIp/crIhGCQgEgEqgmeIlpA7Ih4F8QgXBHhNCsIkrAqQh/E4g7CFIj4IzIMPinQCEgcQejtIhqo5QjQAThZAMIjKAbIiGAPQByhBB9g3QB0gzD0hxIjMzGg");
	var mask_3_graphics_18 = new cjs.Graphics().p("EgF0AkbInXlvInu0BIjlilIi5iHQiErVgfiiIgDgPIgDgOIgBgKIAAgBIACgVIAAgDQgBgHAGgLIBdjFIAAgBIC+mRIARgkIEvp/ICZgjICrgnQBDjPAtiCIAkhrIBEi5IADAAIGNhpID4osICJjwIHORwIFiDQIAiBkQAfBWAfBfIAMAhIAUA2IAPApIANAoIAlB6IBbAkIAJADQBeAjAtATQAjANAeAhQAMAOALAPQAtBKBbCAIAFAGQBMBzA0BTIADAFIARAbIAKARIAMASIASAcQAzBMArBFQBWB4AyBUQAMAUgBAGIABARQACAFgCALQAAAKgFATQgPBJi9F+QhRCthwDjIl4L2ImCEhImMQ5IkTL8IhKCigEgE5gmcIl7A7Ih/F8QgYBHhQCsIk6AqQiFE4g/CFIkEIzIM3inQCJgcRUjtIhvo4QjbAShdAMIjVAbIiNAQQB4hCCDg3QB7gzD/hxIjWzGg");
	var mask_3_graphics_19 = new cjs.Graphics().p("EgGDAkeInqlqIoC0GIjtihIjBiFQiKrZghikIgDgPIgDgOIAAgLIAAAAIABgVIAAgEQAAgHAGgLQAhhCA/iDIAAgBIDHmTIARgkIE7qBICegeICzgiQBGjQAuiDIAmhsIBGi6IGghdIECouICPkHIHgR1IFwDKIAkBkQAgBYAhBeIAMAhIAUA3IAPAoIAOApIAnB6IBfAiIAJADQBhAhAvARQAlANAfAgQAMANAMAQQAvBIBeCCIAFAGQBQBzA1BUIADAEIASAbIALARIAMASIATAdIBiCQQBaB4A0BTQAOAUgCAGIABARQADAFgCAMQgBAIgFAUQgPBFjFGFQhUCsh1DlImHL4ImREbImcQ/IkeMAIhNCwgEgFGgmaImKA7IiEF8QgZBHhTCsIlHAqQiLE4hACFIkPIzINXinQCQgcSAjtIh0o5QjjAThiAMIjdAbIiSAPQB8hBCJg3QB/gzEKhxIjezGg");
	var mask_3_graphics_20 = new cjs.Graphics().p("EgGQAkgIn5lkIoS0LIj1ifIjHiDQiOrbgiinIgDgPIgDgOIgBgKIAAgBIACgVIAAgEQgBgGAGgMIBkjGIAAgBIDNmTIASgkIFEqEICjgaIC5geQBIjQAwiEIAnhsIBHi7IADAAIGrhUIEKowICUkaIHuR5IF9DFIAlBkQAhBaAhBdIANAiIAUA2IAQApIAOApIAoB7IBiAfIAJAEICVAvQAmALAgAhQANANAMAQQAxBGBhCEIAFAGQBSBzA3BTIADAEIATAcIALARIANASIATAdIBmCPQBdB5A2BRQAOAVgCAGIABARQADAFgCAMQgBAIgFAUQgPBCjMGKQhWCrh5DnImSL6ImfEXImpRDIkoMCIhPC+gEgFRgmZImWA8IiIF7QgaBIhWCsIlRApQiPE4hDCGIkXIyINyinQCUgcSljtIh4o4QjqAThlALIjkAbIiXAQQCAhCCNg3QCEgyEShyIjlzGg");
	var mask_3_graphics_21 = new cjs.Graphics().p("EgGZAkiIoFlgIog0OIj5ieIjNiAQiRrfgjioIgDgPIgDgOIgBgLIAAgBIACgUIAAgEQgBgHAGgMIBmjGIAAgBIDSmUIASgkIFNqEICmgYIC+gbQBJjRAxiFIAohrIBIi9IADAAIG2hLIEQoyICXkpIH6R9IGHDAIAmBlIBDC3IANAiIAVA3IAQAoIAOAqIApB7IBkAeIAKADICYAtQAnALAhAgQANAOANAPQAxBFBkCGIAFAFQBUB0A5BTIADAEIATAcIALARIANASIAUAcQA5BRAwA+QBfB6A4BQQAOAVgCAFIABARQADAGgCALIgGAdQgQBAjQGNQhZCrh7DoImcL8ImpETImzRGIkuMFIhSDHgEgFZgmXImgA7IiLF8QgbBHhYCsIlZApQiSE4hFCGIkeIyIOIimQCXgcTBjuIh7o4QjvAThnAMIjqAbIibAPQCEhCCQg2QCHgzEZhxIjrzGg");
	var mask_3_graphics_22 = new cjs.Graphics().p("EgGgAkkIoNldIop0SIj+icIjQh/QiTrhgkioIgDgQIgDgOIgBgKIAAgBIACgVIAAgEQgBgHAGgMQAkhBBEiFIAAgBIDVmVIATgkIFSqFICpgWIDBgYQBKjSAyiFIAphsIBJi9IADAAIG9hGIGvtlIICR+IGNC+IAmBlIBFC3IANAiIAVA3IAQApIAPAoIApB8IBmAeIAKADICbArQAoAKAhAhQAOANAMAQQAyBEBmCGIAFAGQBVByA6BVIADADIATAcIAMARIANASIAVAdQA6BRAwA+QBhB6A5BPQAOAVgBAFIABARQADAGgCALQgBAJgFAUQgQA+jUGRQhaCqh+DpImiL9ImwEQIm7RJImGPVgEgFfgmWImnA7IiNF8QgbBHhaCsIleApQiVE4hGCGIkiIyIOWimQCagcTVjuIh9o4QjzAThpAMIjtAbIieAPQCGhCCSg2QCJgzEehxIjvzGg");
	var mask_3_graphics_23 = new cjs.Graphics().p("EgGkAkkIoTlbIou0TIkAibIjSh+QiVrigkiqIgDgPIgDgNIgBgLIAAgBIACgVIAAgEQgBgGAGgMIBpjHIAAgBIDXmVIATgkIFVqGICrgVIDDgXQBLjRAyiGIAqhsIBIi9IADAAIHChEIGztsIIHSAIGRC8IAnBkIBGC4IANAiIAVA3IAQAqIAPAoIApB8IBoAdIAKADICcAqQAoAKAiAhQAOANAMAQICaDKIAFAGQBWByA6BVIADADIAUAcIAMARIANATIAUAcQA7BSAxA8QBiB8A6BNQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgQA8jVGTQhcCrh/DpImlL9Im1EPIm/RKImLPagEgFigmWImrA7IiQF8QgaBHhbCsIliAqQiWE4hHCFIklIzIOfinQCcgcThjtIh+o4Qj2AShqAMIjwAbIifAQQCIhCCUg3QCKgzEghxIjxzGg");
	var mask_3_graphics_24 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_25 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_26 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_27 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_28 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_29 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_30 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_31 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_32 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_33 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_34 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_35 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_36 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_37 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_38 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_39 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_40 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_41 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_42 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_43 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_44 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_45 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_46 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_47 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_48 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");
	var mask_3_graphics_49 = new cjs.Graphics().p("EgGmAklIoUlbIow0UInUkZQilsugbh6IgBgMIACgZQgBgGAHgMQAkhCBFiGIDYmVIFpqrIFvgqQBvk0A4iQIBJi9IHHhCIG0tvIIJSBIGSC7ICfGfQARAuAoB3IBnAcQByAgA1ANQA5AOAsA6ICaDKQBaB2A8BWQBlCQBLBeQBjB7A6BOQAOAVgCAGIACARQADAFgCAMQgBAIgGAVQgWBVmrMOImnL9Im3EPInARKImMPcgEgFkgmWImsA8IiQF7QgbBIhbCsIljApQiXE4hGCGIknIyIOjinQCcgcTljtIh+o4Qj3AThqALIjxAbIifAQQCHhCCVg3QCKgyEihyIjyzGg");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:mask_3_graphics_0,x:591.15,y:719.225}).wait(1).to({graphics:mask_3_graphics_1,x:591.75,y:719.25}).wait(1).to({graphics:mask_3_graphics_2,x:593.65,y:719.3}).wait(1).to({graphics:mask_3_graphics_3,x:596.775,y:719.4}).wait(1).to({graphics:mask_3_graphics_4,x:601.2781,y:719.525}).wait(1).to({graphics:mask_3_graphics_5,x:607.3333,y:719.675}).wait(1).to({graphics:mask_3_graphics_6,x:614.7813,y:719.875}).wait(1).to({graphics:mask_3_graphics_7,x:623.5667,y:720.1}).wait(1).to({graphics:mask_3_graphics_8,x:633.7125,y:720.375}).wait(1).to({graphics:mask_3_graphics_9,x:645.2111,y:720.675}).wait(1).to({graphics:mask_3_graphics_10,x:658.0583,y:721.025}).wait(1).to({graphics:mask_3_graphics_11,x:672.275,y:721.425}).wait(1).to({graphics:mask_3_graphics_12,x:687.875,y:721.775}).wait(1).to({graphics:mask_3_graphics_13,x:703.4375,y:721.35}).wait(1).to({graphics:mask_3_graphics_14,x:717.6571,y:720.975}).wait(1).to({graphics:mask_3_graphics_15,x:730.5071,y:720.675}).wait(1).to({graphics:mask_3_graphics_16,x:742.0321,y:720.35}).wait(1).to({graphics:mask_3_graphics_17,x:752.1944,y:720.075}).wait(1).to({graphics:mask_3_graphics_18,x:760.9944,y:719.85}).wait(1).to({graphics:mask_3_graphics_19,x:768.4444,y:719.675}).wait(1).to({graphics:mask_3_graphics_20,x:774.54,y:719.525}).wait(1).to({graphics:mask_3_graphics_21,x:779.265,y:719.4}).wait(1).to({graphics:mask_3_graphics_22,x:782.64,y:719.3}).wait(1).to({graphics:mask_3_graphics_23,x:784.69,y:719.25}).wait(1).to({graphics:mask_3_graphics_24,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_25,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_26,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_27,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_28,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_29,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_30,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_31,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_32,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_33,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_34,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_35,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_36,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_37,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_38,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_39,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_40,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_41,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_42,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_43,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_44,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_45,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_46,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_47,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_48,x:785.365,y:719.225}).wait(1).to({graphics:mask_3_graphics_49,x:785.365,y:719.225}).wait(51));

	// WAVE_1
	this.instance_5 = new lib.wave1();
	this.instance_5.setTransform(891,667.1);

	this.instance_6 = new lib.wave11();
	this.instance_6.setTransform(891,667.1);
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_5,this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},23).to({state:[{t:this.instance_6}]},25).to({state:[]},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(24).to({_off:false},0).to({x:3549.9},25).to({_off:true},1).wait(50));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1003,1068.6);
// library properties:
lib.properties = {
	id: '15',
	width: 1600,
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
an.compositions['15'] = {
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