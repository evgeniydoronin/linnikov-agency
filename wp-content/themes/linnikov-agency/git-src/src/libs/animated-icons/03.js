(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
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



(lib.Анимация35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(8,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-8,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-1,18,2);


(lib.Анимация33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(8,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-8,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-1,18,2);


(lib.Анимация29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(8,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-8,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-1,18,2);


(lib.Анимация28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(12,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-12,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-0.9,26,1.9);


(lib.Анимация21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(12,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-12,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-0.9,26,1.9);


(lib.Анимация20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(12,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-12,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-0.9,26,1.9);


(lib.Анимация13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(12,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-12,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-0.9,26,1.9);


(lib.Анимация12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(14,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-14,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-1,30,2);


(lib.Анимация10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-16,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(16,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-1,34,2);


(lib.Анимация9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-16,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(16,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-1,34,2);


(lib.Анимация8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-1,14,2);


(lib.Анимация6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape.setTransform(9,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_1.setTransform(-9,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-1,22,2);


(lib.Анимация4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-12,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(12,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-1,26,2);


(lib.Анимация3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-12,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(12,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-1,26,2);


// stage content:
(lib._03 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(128));

	// verh
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(7.05,23);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(39.05,23);

	this.instance = new lib.Анимация9("synched",0);
	this.instance.setTransform(23.05,23);
	this.instance._off = true;

	this.instance_1 = new lib.Анимация10("synched",0);
	this.instance_1.setTransform(23.05,23.05);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},14).to({state:[{t:this.instance}]},30).to({state:[{t:this.instance_1}]},6).to({state:[]},1).to({state:[{t:this.instance_1}]},65).to({state:[{t:this.instance}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(44).to({_off:false},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:23},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:23},8).wait(4));

	// Слой_9
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_2.setTransform(37.05,21);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_3.setTransform(9.05,21);

	this.instance_2 = new lib.Анимация19("synched",0);
	this.instance_2.setTransform(23.05,21);
	this.instance_2._off = true;

	this.instance_3 = new lib.Анимация20("synched",0);
	this.instance_3.setTransform(23.05,25);
	this.instance_3._off = true;

	this.instance_4 = new lib.Анимация11("synched",0);
	this.instance_4.setTransform(23.05,21);
	this.instance_4._off = true;

	this.instance_5 = new lib.Анимация12("synched",0);
	this.instance_5.setTransform(23.05,23.05);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},14).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_4}]},18).to({state:[{t:this.instance_5}]},6).to({state:[]},1).to({state:[{t:this.instance_5}]},65).to({state:[{t:this.instance_4}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(15).to({_off:false},0).to({_off:true,y:25},4).wait(3).to({_off:false,y:21},4).to({_off:true},18).wait(84));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:21},4).wait(102));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(44).to({_off:false},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:21},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:21},8).wait(4));

	// Слой_8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_4.setTransform(35.05,18.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_5.setTransform(11.05,18.975);

	this.instance_6 = new lib.Анимация21("synched",0);
	this.instance_6.setTransform(23.05,18.95);
	this.instance_6._off = true;

	this.instance_7 = new lib.Анимация22("synched",0);
	this.instance_7.setTransform(23.05,27);
	this.instance_7._off = true;

	this.instance_8 = new lib.Анимация13("synched",0);
	this.instance_8.setTransform(23.05,18.95);
	this.instance_8._off = true;

	this.instance_9 = new lib.Анимация14("synched",0);
	this.instance_9.setTransform(23.05,23);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},14).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_8}]},18).to({state:[{t:this.instance_9}]},6).to({state:[]},1).to({state:[{t:this.instance_9}]},65).to({state:[{t:this.instance_8}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(15).to({_off:false},0).to({_off:true,y:27},4).wait(3).to({_off:false,y:18.95},4).to({_off:true},18).wait(84));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:18.95},4).wait(102));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(44).to({_off:false},0).to({_off:true,y:23},6).wait(66).to({_off:false,y:18.95},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:18.95},8).wait(4));

	// Слой_7
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_6.setTransform(32.05,17);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAKIAAgTIAnAAIAAATg");
	this.shape_7.setTransform(14.05,17);

	this.instance_10 = new lib.Анимация23("synched",0);
	this.instance_10.setTransform(23.05,17);
	this.instance_10._off = true;

	this.instance_11 = new lib.Анимация24("synched",0);
	this.instance_11.setTransform(23.05,29);
	this.instance_11._off = true;

	this.instance_12 = new lib.Анимация15("synched",0);
	this.instance_12.setTransform(23.05,17);
	this.instance_12._off = true;

	this.instance_13 = new lib.Анимация16("synched",0);
	this.instance_13.setTransform(23.05,23.05);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).to({state:[{t:this.shape_7},{t:this.shape_6}]},14).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},4).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_10}]},4).to({state:[{t:this.instance_12}]},18).to({state:[{t:this.instance_13}]},6).to({state:[]},1).to({state:[{t:this.instance_13}]},65).to({state:[{t:this.instance_12}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(15).to({_off:false},0).to({_off:true,y:29},4).wait(3).to({_off:false,y:17},4).to({_off:true},18).wait(84));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:17},4).wait(102));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(44).to({_off:false},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:17},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:17},8).wait(4));

	// Слой_6
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhFAKIAAgTICLAAIAAATg");
	this.shape_8.setTransform(23.05,15);

	this.instance_14 = new lib.Анимация25("synched",0);
	this.instance_14.setTransform(23.05,15);
	this.instance_14._off = true;

	this.instance_15 = new lib.Анимация26("synched",0);
	this.instance_15.setTransform(23.05,31);
	this.instance_15._off = true;

	this.instance_16 = new lib.Анимация17("synched",0);
	this.instance_16.setTransform(23.05,15);
	this.instance_16._off = true;

	this.instance_17 = new lib.Анимация18("synched",0);
	this.instance_17.setTransform(23.05,23.05);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8}]}).to({state:[{t:this.shape_8}]},14).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},4).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_14}]},4).to({state:[{t:this.instance_16}]},18).to({state:[{t:this.instance_17}]},6).to({state:[]},1).to({state:[{t:this.instance_17}]},65).to({state:[{t:this.instance_16}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(15).to({_off:false},0).to({_off:true,y:31},4).wait(3).to({_off:false,y:15},4).to({_off:true},18).wait(84));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:15},4).wait(102));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(44).to({_off:false},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:15},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:15},8).wait(4));

	// Слой_11
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_9.setTransform(37.05,15.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_10.setTransform(9.05,15.05);

	this.instance_18 = new lib.Анимация27("synched",0);
	this.instance_18.setTransform(23.05,15.05);
	this.instance_18._off = true;

	this.instance_19 = new lib.Анимация28("synched",0);
	this.instance_19.setTransform(23.05,29);
	this.instance_19._off = true;

	this.instance_20 = new lib.Анимация33("synched",0);
	this.instance_20.setTransform(23.05,15.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9}]}).to({state:[{t:this.shape_10},{t:this.shape_9}]},14).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_19}]},3).to({state:[{t:this.instance_20}]},4).to({state:[{t:this.instance_18}]},18).to({state:[{t:this.instance_19}]},6).to({state:[]},1).to({state:[{t:this.instance_19}]},65).to({state:[{t:this.instance_18}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(15).to({_off:false},0).to({_off:true,y:29},4).wait(25).to({_off:false,y:15.05},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:15.05},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:15.05},4).wait(18).to({_off:false,y:23.05},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:15.05},8).wait(4));

	// Слой_10
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_11.setTransform(31.05,11.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_12.setTransform(15.05,11.05);

	this.instance_21 = new lib.Анимация29("synched",0);
	this.instance_21.setTransform(23.05,11.05);
	this.instance_21._off = true;

	this.instance_22 = new lib.Анимация30("synched",0);
	this.instance_22.setTransform(23.05,33);
	this.instance_22._off = true;

	this.instance_23 = new lib.Анимация34("synched",0);
	this.instance_23.setTransform(23.05,11.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11}]}).to({state:[{t:this.shape_12},{t:this.shape_11}]},14).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},4).to({state:[{t:this.instance_22}]},3).to({state:[{t:this.instance_23}]},4).to({state:[{t:this.instance_21}]},18).to({state:[{t:this.instance_22}]},6).to({state:[]},1).to({state:[{t:this.instance_22}]},65).to({state:[{t:this.instance_21}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(15).to({_off:false},0).to({_off:true,y:33},4).wait(25).to({_off:false,y:11.05},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:11.05},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:11.05},4).wait(18).to({_off:false,y:23.05},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:11.05},8).wait(4));

	// resnicy
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_13.setTransform(23.05,23.05);
	this.shape_13._off = true;

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgrAKIAAgTIBXAAIAAATg");
	this.shape_14.setTransform(10.475,23.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhIAKIAAgTICRAAIAAATg");
	this.shape_15.setTransform(13.35,23.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AhgAKIAAgTIDBAAIAAATg");
	this.shape_16.setTransform(15.8,23.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ah0AKIAAgTIDpAAIAAATg");
	this.shape_17.setTransform(17.775,23.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AiDAKIAAgTIEHAAIAAATg");
	this.shape_18.setTransform(19.35,23.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AiQAKIAAgTIEhAAIAAATg");
	this.shape_19.setTransform(20.575,23.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AiZAKIAAgTIEzAAIAAATg");
	this.shape_20.setTransform(21.5,23.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AigAKIAAgTIFBAAIAAATg");
	this.shape_21.setTransform(22.175,23.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AikAKIAAgTIFJAAIAAATg");
	this.shape_22.setTransform(22.6,23.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AinAKIAAgTIFPAAIAAATg");
	this.shape_23.setTransform(22.875,23.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AioAKIAAgTIFRAAIAAATg");
	this.shape_24.setTransform(23.025,23.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AipAKIAAgTIFTAAIAAATg");
	this.shape_25.setTransform(23.075,23.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AifAKIAAgTIE/AAIAAATg");
	this.shape_26.setTransform(23.075,23.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AiUAKIAAgTIEqAAIAAATg");
	this.shape_27.setTransform(23.1,23.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AiKAKIAAgTIEVAAIAAATg");
	this.shape_28.setTransform(23.075,23.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AiAAKIAAgTIEBAAIAAATg");
	this.shape_29.setTransform(23.075,23.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AiIAKIAAgTIERAAIAAATg");
	this.shape_30.setTransform(23.075,23.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AiQAKIAAgTIEgAAIAAATg");
	this.shape_31.setTransform(23.1,23.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AiXAKIAAgTIEvAAIAAATg");
	this.shape_32.setTransform(23.075,23.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},58).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_26}]},1).to({state:[]},1).wait(11));
	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(58).to({_off:false},0).wait(1).to({x:20.3},0).wait(1).to({x:17.55},0).wait(1).to({x:14.8},0).wait(1).to({x:12.1},0).wait(1).to({x:9.35},0).wait(1).to({x:6.6},0).wait(1).to({x:3.85},0).wait(1).to({x:1.1},0).wait(1).to({y:15.7},0).wait(1).to({y:8.35},0).wait(1).to({y:1},0).wait(1).to({x:8.45},0).wait(1).to({x:15.8},0).wait(1).to({x:23.15},0).wait(1).to({x:30.45},0).wait(1).to({x:37.8},0).wait(1).to({x:45.15},0).wait(1).to({y:8.35},0).wait(1).to({x:45.1,y:15.65},0).wait(1).to({y:23},0).wait(1).to({y:30.35},0).wait(1).to({x:45.05,y:37.65},0).wait(1).to({y:45},0).wait(1).to({x:37.7},0).wait(1).to({x:30.35},0).wait(1).to({x:23.05},0).wait(1).to({x:15.7},0).wait(1).to({x:8.35},0).wait(1).to({x:1},0).wait(1).to({x:1.05,y:35.5},0).wait(1).to({y:29.3},0).wait(1).to({x:1.1,y:25.95},0).wait(1).to({y:24.25},0).wait(1).to({y:23.45},0).wait(1).to({y:23.05},0).wait(1).to({x:5.55},0).wait(1).to({x:7.05},0).to({_off:true},1).wait(32));

	// resnicy
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_33.setTransform(23.05,9.05);

	this.instance_24 = new lib.Анимация31("synched",0);
	this.instance_24.setTransform(23.05,9.05);
	this.instance_24._off = true;

	this.instance_25 = new lib.Анимация32("synched",0);
	this.instance_25.setTransform(23.05,35);
	this.instance_25._off = true;

	this.instance_26 = new lib.Анимация35("synched",0);
	this.instance_26.setTransform(23.05,9.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33}]}).to({state:[{t:this.shape_33}]},14).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_25}]},3).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_24}]},18).to({state:[{t:this.instance_25}]},6).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},7).to({state:[]},1).to({state:[{t:this.instance_25}]},57).to({state:[{t:this.instance_24}]},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(15).to({_off:false},0).to({_off:true,y:35},4).wait(25).to({_off:false,y:9.05},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:9.05},8).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(15).to({_off:false},4).wait(3).to({startPosition:0},0).to({_off:true,y:9.05},4).wait(18).to({_off:false,y:23.05},6).wait(1).to({regX:0.1,regY:0.1,scaleX:16.985,x:24.75,y:23.15},0).to({regX:0,regY:0,scaleX:1,x:23.05,y:23.05},7,cjs.Ease.none).to({_off:true},1).wait(57).to({_off:false},0).to({_off:true,y:9.05},8).wait(4));

	// zrachok
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_34.setTransform(23.05,23.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgSATIAAgkIAkAAIAAAkg");
	this.shape_35.setTransform(23.1,23.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgaAbIAAg1IA1AAIAAA1g");
	this.shape_36.setTransform(23.075,23.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgdAeIAAg7IA7AAIAAA7g");
	this.shape_37.setTransform(23.075,23.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgfAgIAAg/IA/AAIAAA/g");
	this.shape_38.setTransform(23.075,23.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgiAjIAAhFIBFAAIAABFg");
	this.shape_39.setTransform(23.05,23.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AglAmIAAhLIBLAAIAABLg");
	this.shape_40.setTransform(23.05,23.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgKALIAAgVIAUAAIAAAVg");
	this.shape_41.setTransform(23.1,23.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgLAMIAAgXIAXAAIAAAXg");
	this.shape_42.setTransform(23.1,23.05);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgNAOIAAgbIAbAAIAAAbg");
	this.shape_43.setTransform(23.075,23.05);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRASIAAgiIAiAAIAAAig");
	this.shape_44.setTransform(23.1,23.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVAVIAAgqIArAAIAAAqg");
	this.shape_45.setTransform(23.075,23.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AggAhIAAhBIBBAAIAABBg");
	this.shape_46.setTransform(23.05,23.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34}]}).to({state:[{t:this.shape_34}]},14).to({state:[{t:this.shape_34}]},2).to({state:[]},1).to({state:[{t:this.shape_34}]},7).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_34}]},13).to({state:[{t:this.shape_34}]},3).to({state:[]},1).to({state:[{t:this.shape_34}]},68).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_34}]},3).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_34).wait(16).to({_off:true},1).wait(7).to({_off:false,scaleX:0.25,scaleY:0.25,x:23.0988,y:23.0346},0).to({_off:true},1).wait(6).to({_off:false,scaleX:1,scaleY:1,x:23.05,y:23.05},0).wait(16).to({_off:true},1).wait(68).to({_off:false,scaleX:0.25,scaleY:0.25,x:23.0988,y:23.0346},0).to({_off:true},1).wait(7).to({_off:false,scaleX:1,scaleY:1,x:23.05,y:23.05},0).wait(4));

	// Слой_4
	this.instance_27 = new lib.Анимация3("synched",0);
	this.instance_27.setTransform(23.05,27);

	this.instance_28 = new lib.Анимация4("synched",0);
	this.instance_28.setTransform(23.05,23.05);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(14).to({startPosition:0},0).wait(30).to({startPosition:0},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:27},8).wait(3).to({startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:27},8).wait(4));

	// Слой_5
	this.instance_29 = new lib.Анимация5("synched",0);
	this.instance_29.setTransform(23.05,29);

	this.instance_30 = new lib.Анимация6("synched",0);
	this.instance_30.setTransform(23.05,23.05);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(14).to({startPosition:0},0).wait(30).to({startPosition:0},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:29},8).wait(3).to({startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:29},8).wait(4));

	// niz
	this.instance_31 = new lib.Анимация7("synched",0);
	this.instance_31.setTransform(23.05,31);

	this.instance_32 = new lib.Анимация8("synched",0);
	this.instance_32.setTransform(23.05,23.05);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(14).to({startPosition:0},0).wait(30).to({startPosition:0},0).to({_off:true,y:23.05},6).wait(66).to({_off:false,y:31},8).wait(3).to({startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(44).to({_off:false},6).to({_off:true},1).wait(65).to({_off:false},0).to({_off:true,y:31},8).wait(4));

	// ck
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_47.setTransform(13.05,31);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_48.setTransform(9.05,29);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_49.setTransform(7.05,27);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_50.setTransform(3.05,23);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_51.setTransform(5.05,21);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_52.setTransform(7.05,19);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_53.setTransform(9.05,17);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_54.setTransform(13.05,15);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FF0000").s().p("AgJARIAAgiIATAAIAAAig");
	this.shape_55.setTransform(16.05,23.75);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF0000").s().p("AgJAZIAAgxIATAAIAAAxg");
	this.shape_56.setTransform(16.05,23.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FF0000").s().p("AgJAgIAAg/IATAAIAAA/g");
	this.shape_57.setTransform(16.05,23.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},14).to({state:[]},1).to({state:[{t:this.shape_47}]},12).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_47}]},13).to({state:[{t:this.shape_47}]},3).to({state:[]},1).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},76).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_47).wait(14).to({_off:true},1).wait(12).to({_off:false,x:16.05,y:23.95},0).to({_off:true},1).wait(3).to({_off:false,scaleY:4,y:23.05},0).wait(16).to({_off:true},1).wait(76).to({_off:false,scaleY:1,x:13.05,y:31},0).to({_off:true},2).wait(2));

	// cb
	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_58.setTransform(31.05,31);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_59.setTransform(35.05,29);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_60.setTransform(37.05,27);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_61.setTransform(41.05,23);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_62.setTransform(39.05,21);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_63.setTransform(37.05,19);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_64.setTransform(35.05,17);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_65.setTransform(31.05,15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#02FFFF").s().p("AgJARIAAgiIATAAIAAAig");
	this.shape_66.setTransform(28.05,24.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#02FFFF").s().p("AgJAZIAAgxIATAAIAAAxg");
	this.shape_67.setTransform(28.05,24.05);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#02FFFF").s().p("AgJAhIAAhAIATAAIAABAg");
	this.shape_68.setTransform(28.05,23.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]},14).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]},1).to({state:[]},1).to({state:[{t:this.shape_58}]},11).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_58}]},13).to({state:[{t:this.shape_58}]},3).to({state:[]},1).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]},76).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_58).wait(15).to({_off:true},1).wait(11).to({_off:false,x:28.05,y:25.05},0).to({_off:true},1).wait(3).to({_off:false,scaleY:4,y:23.05},0).wait(16).to({_off:true},1).wait(76).to({_off:false,scaleY:1,x:31.05,y:31},0).to({_off:true},2).wait(2));

	// cy
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_69.setTransform(15.05,31);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_70.setTransform(11.05,29);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_71.setTransform(9.05,27);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_72.setTransform(5.05,23);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_73.setTransform(7.05,21);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_74.setTransform(9.05,19);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_75.setTransform(11.05,17);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_76.setTransform(15.05,15);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFF05").s().p("AgJASIAAgjIATAAIAAAjg");
	this.shape_77.setTransform(18.05,22.1);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFF05").s().p("AgJAZIAAgxIATAAIAAAxg");
	this.shape_78.setTransform(18.05,22.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFF05").s().p("AgJAhIAAhAIATAAIAABAg");
	this.shape_79.setTransform(18.05,22.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]}).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]},14).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]},1).to({state:[]},1).to({state:[{t:this.shape_69}]},11).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_69}]},13).to({state:[{t:this.shape_69}]},3).to({state:[]},1).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]},76).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_69).wait(15).to({_off:true},1).wait(11).to({_off:false,x:18.05,y:21.8},0).to({_off:true},1).wait(3).to({_off:false,scaleY:4,y:23.05},0).wait(16).to({_off:true},1).wait(76).to({_off:false,scaleY:1,x:15.05,y:31},0).to({_off:true},2).wait(2));

	// cdb
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_80.setTransform(33.05,31);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_81.setTransform(37.05,29);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_82.setTransform(39.05,27);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_83.setTransform(43.05,23);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_84.setTransform(41.05,21);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_85.setTransform(39.05,19);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_86.setTransform(37.05,17);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_87.setTransform(33.05,15);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#0000FE").s().p("AgJARIAAgiIATAAIAAAig");
	this.shape_88.setTransform(30.05,21.5);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#0000FE").s().p("AgJAZIAAgxIATAAIAAAxg");
	this.shape_89.setTransform(30.05,22);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#0000FE").s().p("AgJAhIAAhBIATAAIAABBg");
	this.shape_90.setTransform(30.05,22.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80}]}).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80}]},14).to({state:[]},1).to({state:[{t:this.shape_80}]},12).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},13).to({state:[{t:this.shape_80}]},3).to({state:[]},1).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80}]},76).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_80).wait(14).to({_off:true},1).wait(12).to({_off:false,x:30.05,y:20.95},0).to({_off:true},1).wait(3).to({_off:false,scaleY:4,y:23.05},0).wait(16).to({_off:true},1).wait(76).to({_off:false,scaleY:1,x:33.05,y:31},0).to({_off:true},2).wait(2));

	// ramka
	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIATAAIAAAegACBDmIAAgUIAkAAIAAAUgAA4DmIAAgUIAkAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAlAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjlDmIAAgeIAUAAIAAAKIALAAIAAAUgADSCkIAAgkIATAAIAAAkgAjlCkIAAgkIAUAAIAAAkgADSBbIAAgkIATAAIAAAkgAjlBbIAAgkIAUAAIAAAkgADSATIAAgkIATAAIAAAkgAjlATIAAgkIAUAAIAAAkgADSg1IAAgkIATAAIAAAkgAjlg1IAAgkIAUAAIAAAkgADSh+IAAgkIATAAIAAAkgAjlh+IAAgkIAUAAIAAAkgADSjHIAAgKIgJAAIAAgUIAcAAIAAAegAjljHIAAgeIAfAAIAAAUIgLAAIAAAKgACBjRIAAgUIAkAAIAAAUgAA4jRIAAgUIAkAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAlAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_91.setTransform(23.05,22.975);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIAUAAIAAAbgAB9DmIAAgUIAlAAIAAAUgAA1DmIAAgUIAkAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAlAAIAAAUgAikDmIAAgUIAkAAIAAAUgAjkDmIAAghIAUAAIAAANIAHAAIAAAUgADSCnIAAgkIAUAAIAAAkgAjkChIAAgkIAUAAIAAAkgADSBeIAAgkIAUAAIAAAkgAjkBYIAAgkIAUAAIAAAkgADSAWIAAgkIAUAAIAAAkgAjkAQIAAgkIAUAAIAAAkgADSgyIAAgkIAUAAIAAAkgAjkg4IAAgkIAUAAIAAAkgADSh7IAAgkIAUAAIAAAkgAjkiBIAAgkIAUAAIAAAkgADSjEIAAgNIgGAAIAAgUIAaAAIAAAhgAjkjKIAAgbIAhAAIAAAUIgNAAIAAAHgACEjRIAAgUIAkAAIAAAUgAA7jRIAAgUIAkAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAifjRIAAgUIAlAAIAAAUg");
	this.shape_92.setTransform(23.05,22.975);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("ADDDmIAAgUIAPAAIAAgEIAUAAIAAAYgAB7DmIAAgUIAkAAIAAAUgAAyDmIAAgUIAkAAIAAAUgAgWDmIAAgUIAjAAIAAAUgAhfDmIAAgUIAkAAIAAAUgAioDmIAAgUIAlAAIAAAUgAjkDmIAAgkIAUAAIAAAQIAEAAIAAAUgADSCqIAAgkIAUAAIAAAkgAjkCeIAAgkIAUAAIAAAkgADSBhIAAgkIAUAAIAAAkgAjkBVIAAgkIAUAAIAAAkgADSAZIAAgkIAUAAIAAAkgAjkANIAAgkIAUAAIAAAkgADSgvIAAgkIAUAAIAAAkgAjkg7IAAgkIAUAAIAAAkgADSh4IAAgkIAUAAIAAAkgAjkiEIAAgkIAUAAIAAAkgADSjBIAAgQIgDAAIAAgUIAXAAIAAAkgAjkjNIAAgYIAkAAIAAAUIgQAAIAAAEgACHjRIAAgUIAjAAIAAAUgAA+jRIAAgUIAkAAIAAAUgAgKjRIAAgUIAjAAIAAAUgAhTjRIAAgUIAlAAIAAAUgAibjRIAAgUIAkAAIAAAUg");
	this.shape_93.setTransform(23.05,22.975);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAgBIAUAAIAAAVgAB3DmIAAgUIAkAAIAAAUgAAuDmIAAgUIAlAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAkAAIAAAUgAirDmIAAgUIAlAAIAAAUgAjkDkIAAglIAUAAIAAAlgADSCtIAAgkIAUAAIAAAkgAjkCbIAAgkIAUAAIAAAkgADSBkIAAgkIAUAAIAAAkgAjkBSIAAgkIAUAAIAAAkgADSAcIAAgkIAUAAIAAAkgAjkAKIAAgkIAUAAIAAAkgADSgsIAAgkIAUAAIAAAkgAjkg+IAAgkIAUAAIAAAkgADSh1IAAgkIAUAAIAAAkgAjkiHIAAgkIAUAAIAAAkgADSi+IAAgkIAUAAIAAAkgACJjRIAAgUIAkAAIAAAUgABAjRIAAgUIAkAAIAAAUgAgIjRIAAgUIAjAAIAAAUgAhRjRIAAgUIAlAAIAAAUgAiZjRIAAgUIAlAAIAAAUgAjhjRIAAgUIAkAAIAAAUg");
	this.shape_94.setTransform(23.05,22.975);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAkAAIAAAUgAB1DmIAAgUIAjAAIAAAUgAAsDmIAAgUIAkAAIAAAUgAgcDmIAAgUIAjAAIAAAUgAhlDmIAAgUIAlAAIAAAUgAitDmIAAgUIAkAAIAAAUgAjkDhIAAglIAUAAIAAAlgADSCwIAAglIAUAAIAAAlgAjkCYIAAgkIAUAAIAAAkgADSBnIAAgkIAUAAIAAAkgAjkBPIAAgkIAUAAIAAAkgADSAeIAAgjIAUAAIAAAjgAjkAHIAAgkIAUAAIAAAkgADSgqIAAgkIAUAAIAAAkgAjkhBIAAgkIAUAAIAAAkgADShyIAAglIAUAAIAAAlgAjkiKIAAgkIAUAAIAAAkgADSi7IAAglIAUAAIAAAlgACMjRIAAgUIAkAAIAAAUgABDjRIAAgUIAlAAIAAAUgAgFjRIAAgUIAjAAIAAAUgAhOjRIAAgUIAlAAIAAAUgAiWjRIAAgUIAkAAIAAAUgAjfjRIAAgUIAkAAIAAAUg");
	this.shape_95.setTransform(23.05,22.975);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AC7DmIAAgUIAkAAIAAAUgAByDmIAAgUIAkAAIAAAUgAApDmIAAgUIAlAAIAAAUgAgeDmIAAgUIAjAAIAAAUgAhoDmIAAgUIAlAAIAAAUgAiwDmIAAgUIAkAAIAAAUgAjkDeIAAglIAUAAIAAAlgADSCzIAAglIAUAAIAAAlgAjkCVIAAgkIAUAAIAAAkgADSBqIAAgkIAUAAIAAAkgAjkBMIAAgkIAUAAIAAAkgADSAhIAAgjIAUAAIAAAjgAjkAEIAAgkIAUAAIAAAkgADSgnIAAgkIAUAAIAAAkgAjkhEIAAgkIAUAAIAAAkgADShvIAAglIAUAAIAAAlgAjkiNIAAgkIAUAAIAAAkgADSi4IAAglIAUAAIAAAlgACPjRIAAgUIAkAAIAAAUgABGjRIAAgUIAlAAIAAAUgAgBjRIAAgUIAjAAIAAAUgAhKjRIAAgUIAkAAIAAAUgAiTjRIAAgUIAlAAIAAAUgAjbjRIAAgUIAkAAIAAAUg");
	this.shape_96.setTransform(23.05,22.975);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAlAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAkAAIAAAUgAgiDmIAAgUIAjAAIAAAUgAhrDmIAAgUIAlAAIAAAUgAizDmIAAgUIAkAAIAAAUgAjkDbIAAglIAUAAIAAAlgADSC2IAAglIAUAAIAAAlgAjkCSIAAgkIAUAAIAAAkgADSBtIAAgkIAUAAIAAAkgAjkBJIAAgkIAUAAIAAAkgADSAkIAAgkIAUAAIAAAkIAAAAgAjkABIAAgkIAUAAIAAAkgADSgkIAAgkIAUAAIAAAkgAjkhHIAAgkIAUAAIAAAkgADShsIAAglIAUAAIAAAlgAjkiQIAAgkIAUAAIAAAkgADSi1IAAglIAUAAIAAAlgACSjRIAAgUIAkAAIAAAUgABJjRIAAgUIAkAAIAAAUgAAAjRIAAgUIAkAAIAAAUgAhIjRIAAgUIAlAAIAAAUgAiQjRIAAgUIAkAAIAAAUgAjYjRIAAgUIAkAAIAAAUg");
	this.shape_97.setTransform(23.05,22.975);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AC0DmIAAgUIAlAAIAAAUgABsDmIAAgUIAkAAIAAAUgAAjDmIAAgUIAlAAIAAAUgAgkDmIAAgUIAkAAIAAAUgAhtDmIAAgUIAkAAIAAAUgAi2DmIAAgUIAlAAIAAAUgAjkDYIAAgkIAUAAIAAAkgADSC5IAAglIAUAAIAAAlgAjkCQIAAglIAUAAIAAAlgADSBwIAAgkIAUAAIAAAkgAjkBHIAAgkIAUAAIAAAkgADSAnIAAgkIAUAAIAAAhIAAADgAjkgBIAAgkIAUAAIAAAkgADSghIAAgkIAUAAIAAAkgAjkhKIAAgkIAUAAIAAAkgADShpIAAglIAUAAIAAAlgAjkiSIAAglIAUAAIAAAlgADSiyIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUgABMjRIAAgUIAlAAIAAAUgAADjRIAAgUIAkAAIAAAUgAhFjRIAAgUIAlAAIAAAUgAiNjRIAAgUIAkAAIAAAUgAjWjRIAAgUIAkAAIAAAUg");
	this.shape_98.setTransform(23.05,22.975);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("ACyDmIAAgUIAkAAIAAAUgABpDmIAAgUIAkAAIAAAUgAAgDmIAAgUIAlAAIAAAUgAgnDmIAAgUIAkAAIAAAUgAhxDmIAAgUIAlAAIAAAUgAi5DmIAAgUIAkAAIAAAUgAjkDVIAAgkIAUAAIAAAkgADSC8IAAglIAUAAIAAAlgAjkCNIAAglIAUAAIAAAlgADSBzIAAgkIAUAAIAAAkgAjkBEIAAgkIAUAAIAAAkgADSAqIAAgkIAUAAIAAAeIAAAGgAjkgEIAAgkIAUAAIAAAkgADSgeIAAgkIAUAAIAAAkgAjkhNIAAgkIAUAAIAAAkgADShmIAAglIAUAAIAAAlgAjkiVIAAglIAUAAIAAAlgADSivIAAglIAUAAIAAAlgACYjRIAAgUIAkAAIAAAUgABPjRIAAgUIAkAAIAAAUgAAGjRIAAgUIAkAAIAAAUgAhCjRIAAgUIAlAAIAAAUgAiKjRIAAgUIAkAAIAAAUgAjTjRIAAgUIAkAAIAAAUg");
	this.shape_99.setTransform(23.05,22.975);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("ACuDmIAAgUIAlAAIAAAUgABmDmIAAgUIAkAAIAAAUgAAdDmIAAgUIAkAAIAAAUgAgrDmIAAgUIAkAAIAAAUgAh0DmIAAgUIAlAAIAAAUgAi8DmIAAgUIAkAAIAAAUgAjkDSIAAgkIAUAAIAAAkgADSC/IAAglIAUAAIAAAlgAjkCKIAAglIAUAAIAAAlgADSB2IAAgkIAUAAIAAAkgAjkBBIAAgkIAUAAIAAAkgADSAtIAAgkIAUAAIAAAbIAAAJgAjkgHIAAgkIAUAAIAAAkgADSgbIAAgkIAUAAIAAAkgAjkhQIAAgkIAUAAIAAAkgADShjIAAglIAUAAIAAAlgAjkiYIAAglIAUAAIAAAlgADSisIAAglIAUAAIAAAlgACajRIAAgUIAkAAIAAAUgABRjRIAAgUIAlAAIAAAUgAAJjRIAAgUIAkAAIAAAUgAg/jRIAAgUIAkAAIAAAUgAiHjRIAAgUIAkAAIAAAUgAjQjRIAAgUIAkAAIAAAUg");
	this.shape_100.setTransform(23.05,22.975);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("ACrDmIAAgUIAlAAIAAAUgABjDmIAAgUIAkAAIAAAUgAAaDmIAAgUIAkAAIAAAUgAgtDmIAAgUIAkAAIAAAUgAh2DmIAAgUIAkAAIAAAUgAi/DmIAAgUIAlAAIAAAUgAjkDPIAAgkIAUAAIAAAkgADSDBIAAgkIAUAAIAAAkgAjkCHIAAglIAUAAIAAAlgADSB4IAAgkIAUAAIAAAkgAjkA+IAAgkIAUAAIAAAkgADSAwIAAglIAUAAIAAAZIAAAMgAjkgKIAAgkIAUAAIAAAkgADSgYIAAgkIAUAAIAAAkgAjkhTIAAgkIAUAAIAAAkgADShhIAAgkIAUAAIAAAkgAjkibIAAglIAUAAIAAAlgADSiqIAAgkIAUAAIAAAkgACejRIAAgUIAkAAIAAAUgABUjRIAAgUIAlAAIAAAUgAAMjRIAAgUIAkAAIAAAUgAg8jRIAAgUIAkAAIAAAUgAiFjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAkAAIAAAUg");
	this.shape_101.setTransform(23.05,22.975);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("ACpDmIAAgUIAkAAIAAAUgABgDmIAAgUIAkAAIAAAUgAAXDmIAAgUIAlAAIAAAUgAgwDmIAAgUIAkAAIAAAUgAh6DmIAAgUIAlAAIAAAUgAjCDmIAAgUIAkAAIAAAUgAjkDMIAAgkIAUAAIAAAkgADSDEIAAgkIAUAAIAAAkgAjkCEIAAglIAUAAIAAAlgADSB7IAAgkIAUAAIAAAkgAjkA7IAAgkIAUAAIAAAkgADSAzIAAglIAUAAIAAAWIAAAPgAjkgNIAAgkIAUAAIAAAkgADSgVIAAgkIAUAAIAAAkgAjkhWIAAgkIAUAAIAAAkgADSheIAAgkIAUAAIAAAkgAjkieIAAglIAUAAIAAAlgADSinIAAgkIAUAAIAAAkgAChjRIAAgUIAkAAIAAAUgABYjRIAAgUIAkAAIAAAUgAAPjRIAAgUIAkAAIAAAUgAg5jRIAAgUIAlAAIAAAUgAiBjRIAAgUIAkAAIAAAUgAjKjRIAAgUIAkAAIAAAUg");
	this.shape_102.setTransform(23.05,22.975);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AClDmIAAgUIAlAAIAAAUgABdDmIAAgUIAkAAIAAAUgAAUDmIAAgUIAkAAIAAAUgAg0DmIAAgUIAkAAIAAAUgAh9DmIAAgUIAlAAIAAAUgAjFDmIAAgUIAkAAIAAAUgAjkDJIAAgkIAUAAIAAAkgADSDHIAAgkIAUAAIAAAkgAjkCBIAAglIAUAAIAAAlgADSB+IAAgkIAUAAIAAAkgAjkA4IAAgkIAUAAIAAAkgADSA2IAAglIAUAAIAAATIAAASgAjkgQIAAgkIAUAAIAAAkgADSgSIAAgkIAUAAIAAAkgAjkhZIAAgkIAUAAIAAAkgADShbIAAgkIAUAAIAAAkgAjkihIAAglIAUAAIAAAlgADSikIAAgkIAUAAIAAAkgACjjRIAAgUIAkAAIAAAUgABajRIAAgUIAlAAIAAAUgAASjRIAAgUIAkAAIAAAUgAg2jRIAAgUIAkAAIAAAUgAh+jRIAAgUIAkAAIAAAUgAjHjRIAAgUIAkAAIAAAUg");
	this.shape_103.setTransform(23.05,22.975);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("ACjDmIAAgUIAkAAIAAAUgABaDmIAAgUIAkAAIAAAUgAARDmIAAgUIAlAAIAAAUgAg2DmIAAgUIAkAAIAAAUgAh/DmIAAgUIAlAAIAAAUgAjHDmIAAgUIAkAAIAAAUgADSDKIAAgkIAUAAIAAAkgAjkDGIAAgkIAUAAIAAAkgADSCBIAAgkIAUAAIAAAkgAjkB+IAAglIAUAAIAAAlgADSA5IAAglIAUAAIAAAQIAAAVgAjkA1IAAgkIAUAAIAAAkgADSgPIAAgkIAUAAIAAAkgAjkgTIAAgkIAUAAIAAAkgADShYIAAgkIAUAAIAAAkgAjkhcIAAgkIAUAAIAAAkgADSihIAAgkIAUAAIAAAkgAjkikIAAglIAUAAIAAAlgACmjRIAAgUIAkAAIAAAUgABdjRIAAgUIAkAAIAAAUgAAUjRIAAgUIAkAAIAAAUgAg0jRIAAgUIAlAAIAAAUgAh8jRIAAgUIAkAAIAAAUgAjFjRIAAgUIAkAAIAAAUg");
	this.shape_104.setTransform(23.05,22.975);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("ACgDmIAAgUIAkAAIAAAUgABXDmIAAgUIAkAAIAAAUgAAODmIAAgUIAlAAIAAAUgAg5DmIAAgUIAkAAIAAAUgAiCDmIAAgUIAkAAIAAAUgAjKDmIAAgUIAkAAIAAAUgADSDNIAAgkIATAAIAAAkgAjlDDIAAgkIAUAAIAAAkgADSCEIAAgkIATAAIAAAkgAjlB7IAAglIAUAAIAAAlgADSA8IAAglIATAAIAAANIAAAYgAjlAyIAAgkIAUAAIAAAkgADSgMIAAgkIATAAIAAAkgAjlgWIAAgkIAUAAIAAAkgADShVIAAgkIATAAIAAAkgAjlhfIAAgkIAUAAIAAAkgADSieIAAgkIATAAIAAAkgAjlinIAAglIAUAAIAAAlgACpjRIAAgUIAkAAIAAAUgABgjRIAAgUIAkAAIAAAUgAAXjRIAAgUIAkAAIAAAUgAgxjRIAAgUIAlAAIAAAUgAh5jRIAAgUIAkAAIAAAUgAjCjRIAAgUIAkAAIAAAUg");
	this.shape_105.setTransform(23.05,22.975);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("ACdDmIAAgUIAlAAIAAAUgABUDmIAAgUIAkAAIAAAUgAALDmIAAgUIAlAAIAAAUgAg8DmIAAgUIAkAAIAAAUgAiFDmIAAgUIAkAAIAAAUgAjODmIAAgUIAlAAIAAAUgADSDQIAAgkIAUAAIAAAkgAjkDAIAAgkIAUAAIAAAkgADSCHIAAgkIAUAAIAAAkgAjkB4IAAglIAUAAIAAAlgADSA/IAAglIAUAAIAAAKIAAAbgAjkAvIAAgkIAUAAIAAAkgADSgJIAAgkIAUAAIAAAkgAjkgZIAAgkIAUAAIAAAkgADShSIAAgkIAUAAIAAAkgAjkhiIAAgkIAUAAIAAAkgADSibIAAgkIAUAAIAAAkgAjkiqIAAglIAUAAIAAAlgACsjRIAAgUIAkAAIAAAUgABjjRIAAgUIAkAAIAAAUgAAajRIAAgUIAkAAIAAAUgAgtjRIAAgUIAkAAIAAAUgAh2jRIAAgUIAlAAIAAAUgAi+jRIAAgUIAkAAIAAAUg");
	this.shape_106.setTransform(23.05,22.975);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("ACaDmIAAgUIAkAAIAAAUgABRDmIAAgUIAkAAIAAAUgAAIDmIAAgUIAlAAIAAAUgAg/DmIAAgUIAkAAIAAAUgAiIDmIAAgUIAlAAIAAAUgAjQDmIAAgUIAkAAIAAAUgADSDTIAAglIAUAAIAAAlgAjkC9IAAgkIAUAAIAAAkgADSCKIAAgkIAUAAIAAAkgAjkB1IAAglIAUAAIAAAlgADSBBIAAgkIAUAAIAAAHIAAAdgAjkAsIAAgkIAUAAIAAAkgADSgHIAAgkIAUAAIAAAkgAjkgcIAAgkIAUAAIAAAkgADShPIAAglIAUAAIAAAlgAjkhlIAAgkIAUAAIAAAkgADSiYIAAglIAUAAIAAAlgAjkitIAAglIAUAAIAAAlgACvjRIAAgUIAkAAIAAAUgABmjRIAAgUIAkAAIAAAUgAAdjRIAAgUIAkAAIAAAUgAgrjRIAAgUIAlAAIAAAUgAhzjRIAAgUIAkAAIAAAUgAi8jRIAAgUIAkAAIAAAUg");
	this.shape_107.setTransform(23.05,22.975);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("ACXDmIAAgUIAlAAIAAAUgABPDmIAAgUIAkAAIAAAUgAAGDmIAAgUIAkAAIAAAUgAhCDmIAAgUIAkAAIAAAUgAiLDmIAAgUIAlAAIAAAUgAjUDmIAAgUIAlAAIAAAUgADSDWIAAglIAUAAIAAAlgAjkC6IAAgkIAUAAIAAAkgADSCNIAAgkIAUAAIAAAkgAjkByIAAglIAUAAIAAAlgADSBEIAAgkIAUAAIAAAEIAAAggAjkApIAAgkIAUAAIAAAkgADSgEIAAgkIAUAAIAAAkgAjkgfIAAgkIAUAAIAAAkgADShMIAAglIAUAAIAAAlgAjkhoIAAgkIAUAAIAAAkgADSiVIAAglIAUAAIAAAlgAjkiwIAAglIAUAAIAAAlgACyjRIAAgUIAkAAIAAAUgABpjRIAAgUIAlAAIAAAUgAAhjRIAAgUIAkAAIAAAUgAgnjRIAAgUIAkAAIAAAUgAhwjRIAAgUIAlAAIAAAUgAi5jRIAAgUIAkAAIAAAUg");
	this.shape_108.setTransform(23.05,22.975);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("ACUDmIAAgUIAlAAIAAAUgABLDmIAAgUIAkAAIAAAUgAACDmIAAgUIAlAAIAAAUgAhFDmIAAgUIAkAAIAAAUgAiODmIAAgUIAkAAIAAAUgAjXDmIAAgUIAlAAIAAAUgADSDZIAAglIAUAAIAAAlgAjkC3IAAgkIAUAAIAAAkgADSCQIAAgkIAUAAIAAAkgAjkBvIAAglIAUAAIAAAlgADSBHIAAgkIAUAAIAAABIAAAjgAjkAmIAAgkIAUAAIAAAkgADSgBIAAgkIAUAAIAAAkgAjkgiIAAgkIAUAAIAAAkgADShJIAAglIAUAAIAAAlgAjkhrIAAgkIAUAAIAAAkgADSiSIAAglIAUAAIAAAlgAjkizIAAglIAUAAIAAAlgAC0jRIAAgUIAkAAIAAAUgABrjRIAAgUIAlAAIAAAUgAAjjRIAAgUIAkAAIAAAUgAgljRIAAgUIAlAAIAAAUgAhtjRIAAgUIAkAAIAAAUgAi2jRIAAgUIAkAAIAAAUg");
	this.shape_109.setTransform(23.05,22.975);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIAkAAIAAAUgABIDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAlAAIAAAUgAjZDmIAAgUIAkAAIAAAUgADSDcIAAglIAUAAIAAAlgAjkC1IAAglIAUAAIAAAlgADSCTIAAgkIAUAAIAAAkgAjkBsIAAgkIAUAAIAAAkgADSBKIAAgkIAUAAIAAAkgAjkAjIAAgjIAUAAIAAAjgADSABIAAgjIAUAAIAAAjgAjkgkIAAglIAUAAIAAAlgADShGIAAglIAUAAIAAAlgAjkhtIAAgkIAUAAIAAAkgADSiPIAAglIAUAAIAAAlgAjki2IAAgkIAUAAIAAAkgAC3jRIAAgUIAkAAIAAAUgABujRIAAgUIAlAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAjAAIAAAUgAhrjRIAAgUIAlAAIAAAUgAizjRIAAgUIAkAAIAAAUg");
	this.shape_110.setTransform(23.05,22.975);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("ACODmIAAgUIAlAAIAAAUgABGDmIAAgUIAkAAIAAAUgAgCDmIAAgUIAjAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAlAAIAAAUgAjdDmIAAgUIAlAAIAAAUgADSDfIAAglIAUAAIAAAlgAjkCyIAAglIAUAAIAAAlgADSCWIAAgkIAUAAIAAAkgAjkBpIAAgkIAUAAIAAAkgADSBNIAAgkIAUAAIAAAkgAjkAgIAAgjIAUAAIAAAjgADSAEIAAgjIAUAAIAAAjgAjkgnIAAglIAUAAIAAAlgADShDIAAglIAUAAIAAAlgAjkhwIAAgkIAUAAIAAAkgADSiMIAAglIAUAAIAAAlgAjki5IAAgkIAUAAIAAAkgAC7jRIAAgUIAkAAIAAAUgAByjRIAAgUIAkAAIAAAUgAApjRIAAgUIAkAAIAAAUgAgfjRIAAgUIAkAAIAAAUgAhojRIAAgUIAlAAIAAAUgAiwjRIAAgUIAkAAIAAAUg");
	this.shape_111.setTransform(23.05,22.975);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("ACMDmIAAgUIAkAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAjAAIAAAUgAhODmIAAgUIAkAAIAAAUgAiXDmIAAgUIAlAAIAAAUgAjfDmIAAgUIAkAAIAAAUgADSDiIAAglIAUAAIAAAlgAjkCvIAAglIAUAAIAAAlgADSCZIAAgkIAUAAIAAAkgAjkBmIAAgkIAUAAIAAAkgADSBQIAAgkIAUAAIAAAkgAjkAdIAAgjIAUAAIAAAjgADSAHIAAgjIAUAAIAAAjgAjkgqIAAglIAUAAIAAAlgADShAIAAglIAUAAIAAAlgAjkhzIAAgkIAUAAIAAAkgADSiJIAAglIAUAAIAAAlgAjki8IAAgkIAUAAIAAAkgAC9jRIAAgUIAkAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAkAAIAAAUgAhkjRIAAgUIAkAAIAAAUgAitjRIAAgUIAkAAIAAAUg");
	this.shape_112.setTransform(23.05,22.975);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("ACIDmIAAgUIAlAAIAAAUgABADmIAAgUIAkAAIAAAUgAgIDmIAAgUIAjAAIAAAUgAhRDmIAAgUIAkAAIAAAUgAiZDmIAAgUIAkAAIAAAUgAjiDmIAAgUIAlAAIAAAUgADSDkIAAgkIAUAAIAAAkgAjkCsIAAglIAUAAIAAAlgADSCbIAAgkIAUAAIAAAkgAjkBjIAAgkIAUAAIAAAkgADSBTIAAglIAUAAIAAAlgAjkAaIAAgjIAUAAIAAAjgADSAKIAAgjIAUAAIAAAjgAjkgtIAAglIAUAAIAAAlgADSg+IAAgkIAUAAIAAAkgAjkh2IAAgkIAUAAIAAAkgADSiHIAAgkIAUAAIAAAkgAjki/IAAgkIAUAAIAAAkgADAjRIAAgUIAkAAIAAAUgAB3jRIAAgUIAlAAIAAAUgAAvjRIAAgUIAkAAIAAAUgAgZjRIAAgUIAjAAIAAAUgAhijRIAAgUIAlAAIAAAUgAiqjRIAAgUIAkAAIAAAUg");
	this.shape_113.setTransform(23.05,22.975);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIAUAAIAAAjgACGDmIAAgUIAkAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAkAAIAAAUgAhTDmIAAgUIAkAAIAAAUgAicDmIAAgUIAkAAIAAAUgAjkDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjkCpIAAglIAUAAIAAAlgADSCeIAAgkIAUAAIAAAkgAjkBgIAAgkIAUAAIAAAkgADSBWIAAglIAUAAIAAAlgAjkAXIAAgjIAUAAIAAAjgADSANIAAgjIAUAAIAAAjgAjkgwIAAglIAUAAIAAAlgADSg7IAAgkIAUAAIAAAkgAjkh5IAAgkIAUAAIAAAkgADSiEIAAgkIAUAAIAAAkgAjkjCIAAgjIAYAAIAAAUIgEAAIAAAPgADSjNIAAgEIgPAAIAAgUIAjAAIAAAYgAB6jRIAAgUIAlAAIAAAUgAAyjRIAAgUIAkAAIAAAUgAgXjRIAAgUIAkAAIAAAUgAhfjRIAAgUIAkAAIAAAUgAiojRIAAgUIAkAAIAAAUg");
	this.shape_114.setTransform(23.05,22.975);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("ADMDmIAAgUIAGAAIAAgMIAUAAIAAAggACDDmIAAgUIAkAAIAAAUgAA6DmIAAgUIAkAAIAAAUgAgODmIAAgUIAjAAIAAAUgAhXDmIAAgUIAkAAIAAAUgAigDmIAAgUIAlAAIAAAUgAjkDmIAAgcIAUAAIAAAIIAMAAIAAAUgAjkCmIAAglIAUAAIAAAlgADSChIAAgkIAUAAIAAAkgAjkBdIAAgkIAUAAIAAAkgADSBZIAAglIAUAAIAAAlgAjkAUIAAgjIAUAAIAAAjgADSAQIAAgjIAUAAIAAAjgAjkgzIAAglIAUAAIAAAlgADSg4IAAgkIAUAAIAAAkgAjkh8IAAgkIAUAAIAAAkgADSiBIAAgkIAUAAIAAAkgAjkjFIAAggIAbAAIAAAUIgHAAIAAAMgADSjKIAAgHIgMAAIAAgUIAgAAIAAAbgAB9jRIAAgUIAlAAIAAAUgAA1jRIAAgUIAkAAIAAAUgAgTjRIAAgUIAjAAIAAAUgAhcjRIAAgUIAlAAIAAAUgAikjRIAAgUIAkAAIAAAUg");
	this.shape_115.setTransform(23.05,22.975);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIAUAAIAAAegACADmIAAgUIAkAAIAAAUgAA3DmIAAgUIAlAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAkAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjkDmIAAgeIAUAAIAAAKIAKAAIAAAUgADSCkIAAgkIAUAAIAAAkgAjkCkIAAgkIAUAAIAAAkgADSBbIAAgkIAUAAIAAAkgAjkBbIAAgkIAUAAIAAAkgADSATIAAgkIAUAAIAAAkgAjkATIAAgkIAUAAIAAAkgADSg1IAAgkIAUAAIAAAkgAjkg1IAAgkIAUAAIAAAkgADSh+IAAgkIAUAAIAAAkgAjkh+IAAgkIAUAAIAAAkgADSjHIAAgKIgJAAIAAgUIAdAAIAAAegAjkjHIAAgeIAeAAIAAAUIgKAAIAAAKgACAjRIAAgUIAkAAIAAAUgAA3jRIAAgUIAlAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAkAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_116.setTransform(23.05,22.975);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("ACgDmIAAgUIAlAAIAAAUgABYDmIAAgUIAkAAIAAAUgAAPDmIAAgUIAkAAIAAAUgAg5DmIAAgUIAkAAIAAAUgAiCDmIAAgUIAlAAIAAAUgAjLDmIAAgUIAlAAIAAAUgADSDNIAAgkIAUAAIAAAkgAjkDDIAAgkIAUAAIAAAkgADSCEIAAgkIAUAAIAAAkgAjkB7IAAglIAUAAIAAAlgADSA8IAAglIAUAAIAAANIAAAYgAjkAyIAAgkIAUAAIAAAkgADSgMIAAgkIAUAAIAAAkgAjkgWIAAgkIAUAAIAAAkgADShVIAAgkIAUAAIAAAkgAjkhfIAAgkIAUAAIAAAkgADSieIAAgkIAUAAIAAAkgAjkinIAAglIAUAAIAAAlgACpjRIAAgUIAkAAIAAAUgABgjRIAAgUIAlAAIAAAUgAAYjRIAAgUIAkAAIAAAUgAgwjRIAAgUIAkAAIAAAUgAh5jRIAAgUIAlAAIAAAUgAjCjRIAAgUIAkAAIAAAUg");
	this.shape_117.setTransform(23.05,22.975);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIAlAAIAAAUgABJDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAkAAIAAAUgAjaDmIAAgUIAlAAIAAAUgADSDcIAAglIATAAIAAAlgAjlC1IAAglIAUAAIAAAlgADSCTIAAgkIATAAIAAAkgAjlBsIAAgkIAUAAIAAAkgADSBKIAAgkIATAAIAAAkgAjlAjIAAgjIAUAAIAAAjgADSABIAAgjIATAAIAAAjgAjlgkIAAglIAUAAIAAAlgADShGIAAglIATAAIAAAlgAjlhtIAAgkIAUAAIAAAkgADSiPIAAglIATAAIAAAlgAjli2IAAgkIAUAAIAAAkgAC3jRIAAgUIAlAAIAAAUgABvjRIAAgUIAkAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAkAAIAAAUgAhqjRIAAgUIAkAAIAAAUgAizjRIAAgUIAkAAIAAAUg");
	this.shape_118.setTransform(23.05,22.975);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIATAAIAAAjgACFDmIAAgUIAlAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAjAAIAAAUgAhUDmIAAgUIAkAAIAAAUgAidDmIAAgUIAlAAIAAAUgAjlDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjlCpIAAglIAUAAIAAAlgADSCeIAAgkIATAAIAAAkgAjlBgIAAgkIAUAAIAAAkgADSBWIAAglIATAAIAAAlgAjlAXIAAgjIAUAAIAAAjgADSANIAAgjIATAAIAAAjgAjlgwIAAglIAUAAIAAAlgADSg7IAAgkIATAAIAAAkgAjlh5IAAgkIAUAAIAAAkgADSiEIAAgkIATAAIAAAkgAjljCIAAgjIAZAAIAAAUIgFAAIAAAPgADSjNIAAgEIgPAAIAAgUIAiAAIAAAYgAB6jRIAAgUIAkAAIAAAUgAAxjRIAAgUIAkAAIAAAUgAgXjRIAAgUIAkAAIAAAUgAhfjRIAAgUIAlAAIAAAUgAinjRIAAgUIAkAAIAAAUg");
	this.shape_119.setTransform(23.05,22.975);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIATAAIAAAHIgTAAIAAAUgAB+DmIAAgUIAkAAIAAAUgAA0DmIAAgUIAlAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAkAAIAAAUgAilDmIAAgUIAlAAIAAAUgAjSDmIAAgWIgTAAIAAgLIAUAAIAAANIAIAAIAAAUgADSCnIAAgkIATAAIAAAkgAjlChIAAgkIAUAAIAAAkgADSBeIAAgkIATAAIAAAkgAjlBYIAAgkIAUAAIAAAkgADSAWIAAgkIATAAIAAAkgAjlAQIAAgkIAUAAIAAAkgADSgyIAAgkIATAAIAAAkgAjlg4IAAgkIAUAAIAAAkgADSh7IAAgkIATAAIAAAkgAjliBIAAgkIAUAAIAAAkgADSjEIAAgMIATAAIAAAMgAjljKIAAgHIAUAAIAAAHgADMjRIAAgUIAGAAIAAAUgACDjRIAAgUIAkAAIAAAUgAA6jRIAAgUIAlAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAiejRIAAgUIAkAAIAAAUgAjNjRIAAgUIAKAAIAAAUg");
	this.shape_120.setTransform(23.05,22.975);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AB6DmIAAgUIAkAAIAAAUgAAxDmIAAgUIAlAAIAAAUgAgWDmIAAgUIAjAAIAAAUgAhfDmIAAgUIAlAAIAAAUgAinDmIAAgUIAkAAIAAAUgADSCqIAAgkIATAAIAAAkgAjlCeIAAgkIAUAAIAAAkgADSBhIAAgkIATAAIAAAkgAjlBVIAAgkIAUAAIAAAkgADSAZIAAgkIATAAIAAAkgAjlANIAAgkIAUAAIAAAkgADSgvIAAgkIATAAIAAAkgAjlg7IAAgkIAUAAIAAAkgADSh4IAAgkIATAAIAAAkgAjliEIAAgkIAUAAIAAAkgACHjRIAAgUIAkAAIAAAUgAA9jRIAAgUIAlAAIAAAUgAgKjRIAAgUIAjAAIAAAUgAhTjRIAAgUIAkAAIAAAUgAicjRIAAgUIAlAAIAAAUg");
	this.shape_121.setTransform(23.05,22.975);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AB4DmIAAgUIAGAAIAAAUgAAvDmIAAgUIAkAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAlAAIAAAUgAiqDmIAAgUIAkAAIAAAUgADSCtIAAgkIATAAIAAAkgAjlB9IAAgGIAUAAIAAAGgADSBkIAAgkIATAAIAAAkgAjlBSIAAgkIAUAAIAAAkgADSAcIAAgkIATAAIAAAkgAjlAKIAAgkIAUAAIAAAkgADSgsIAAgkIATAAIAAAkgAjlg+IAAgkIAUAAIAAAkgADSh1IAAgHIATAAIAAAHgAjliHIAAgkIAUAAIAAAkgACJjRIAAgUIAkAAIAAAUgABAjRIAAgUIAlAAIAAAUgAgHjRIAAgUIAjAAIAAAUgAhQjRIAAgUIAkAAIAAAUgAh6jRIAAgUIAGAAIAAAUg");
	this.shape_122.setTransform(23.05,22.975);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AArDmIAAgUIAlAAIAAAUgAgcDmIAAgUIAjAAIAAAUgAhlDmIAAgUIAkAAIAAAUgAiuDmIAAgUIAlAAIAAAUgADSCwIAAglIATAAIAAAlgADSBnIAAgkIATAAIAAAkgAjlBPIAAgkIAUAAIAAAkgADSAeIAAgjIATAAIAAAjgAjlAHIAAgkIAUAAIAAAkgADSgqIAAgkIATAAIAAAkgAjlhBIAAgkIAUAAIAAAkgAjliKIAAgkIAUAAIAAAkgACMjRIAAgUIAkAAIAAAUgABDjRIAAgUIAkAAIAAAUgAgFjRIAAgUIAkAAIAAAUgAhNjRIAAgUIAkAAIAAAUg");
	this.shape_123.setTransform(23.05,22.975);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgfDmIAAgUIAjAAIAAAUgAhoDmIAAgUIAlAAIAAAUgAiwDmIAAgUIAkAAIAAAUgADSCzIAAglIATAAIAAAlgADSBqIAAgkIATAAIAAAkgADSAhIAAgjIATAAIAAAjgAjlAEIAAgkIAUAAIAAAkgAjlhEIAAgkIAUAAIAAAkgAjliNIAAgkIAUAAIAAAkgACPjRIAAgUIAkAAIAAAUgABGjRIAAgUIAkAAIAAAUgAgCjRIAAgUIAjAAIAAAUg");
	this.shape_124.setTransform(23.05,22.975);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AghDmIAAgUIAhAAIAAAUgAhqDmIAAgUIAkAAIAAAUgAizDmIAAgUIAlAAIAAAUgADSC2IAAglIATAAIAAAlgADSBtIAAgkIATAAIAAAkgADSAkIAAgjIATAAIAAAjIAAAAgAjlAAIAAgjIAUAAIAAAjgAjlhHIAAgkIAUAAIAAAkgAjliQIAAgkIAUAAIAAAkgACSjRIAAgUIAkAAIAAAUgABJjRIAAgUIAlAAIAAAUgAACjRIAAgUIAjAAIAAAUg");
	this.shape_125.setTransform(23.05,22.975);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AhuDmIAAgUIAlAAIAAAUgAi2DmIAAgUIAkAAIAAAUgADSC5IAAglIATAAIAAAlgADSBwIAAgkIATAAIAAAkgAjlhKIAAgkIAUAAIAAAkgAjliSIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUgABMjRIAAgUIAkAAIAAAUg");
	this.shape_126.setTransform(23.05,22.975);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AhuDmIAAgUIAbAAIAAAUgAi2DmIAAgUIAkAAIAAAUgADSC5IAAglIATAAIAAAlgADSBwIAAgcIATAAIAAAcgAjlhTIAAgbIAUAAIAAAbgAjliSIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUgABVjRIAAgUIAbAAIAAAUg");
	this.shape_127.setTransform(23.05,22.975);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("Ai2DmIAAgUIAkAAIAAAUgADSC5IAAglIATAAIAAAlgAjliSIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUg");
	this.shape_128.setTransform(23.05,22.975);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("Ai2DmIAAgUIAPAAIAAAUgADSC5IAAgRIATAAIAAARgAjlimIAAgRIAUAAIAAARgACnjRIAAgUIASAAIAAAUg");
	this.shape_129.setTransform(23.05,22.975);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgJASIAAgjIATAAIAAAjg");
	this.shape_130.setTransform(1.1,18.875);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgJA3IAAglIATAAIAAAlgAgJgRIAAgkIATAAIAAAkg");
	this.shape_131.setTransform(1.1,14.95);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgJBuIAAgDIATAAIAAADgAgJBHIAAglIATAAIAAAlgAgJgBIAAgkIATAAIAAAkgAgJhKIAAgjIATAAIAAABIAAAAIAAAig");
	this.shape_132.setTransform(1.1,13.025);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgnB4IAAgGIAUAAIAAAGgAgnBOIAAglIAUAAIAAAlgAgnAFIAAgjIAUAAIAAAjgAgnhDIAAgkIAUAAIAAAkgAAEhjIAAgUIAkAAIAAAUg");
	this.shape_133.setTransform(4.1,12.025);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AhNB4IAAgJIAUAAIAAAJgAhNBLIAAglIAUAAIAAAlgAhNACIAAgjIAUAAIAAAjgAhNhGIAAgkIAUAAIAAAkgAAphjIAAgUIAlAAIAAAUgAgehjIAAgUIAjAAIAAAUg");
	this.shape_134.setTransform(7.875,12.025);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AhyB4IAAgLIAUAAIAAALgAhyBIIAAgkIAUAAIAAAkgAhyAAIAAgkIAUAAIAAAkgAhyhIIAAglIAUAAIAAAlgABQhjIAAgUIAjAAIAAAUgAAHhjIAAgUIAlAAIAAAUgAhAhjIAAgUIAkAAIAAAUg");
	this.shape_135.setTransform(11.575,12.025);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AiVB4IAAgOIAUAAIAAAOgAiVBFIAAgkIAUAAIAAAkgAiVgDIAAgkIAUAAIAAAkgAiVhLIAAglIAUAAIAAAlgAB5hjIAAgUIAcAAIAAAUgAAwhjIAAgUIAkAAIAAAUgAgYhjIAAgUIAkAAIAAAUgAhghjIAAgUIAkAAIAAAUg");
	this.shape_136.setTransform(15.05,12.025);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("Ai4B4IAAgRIAUAAIAAARgAi4BCIAAgkIAUAAIAAAkgAi4gGIAAgkIAUAAIAAAkgAi4hOIAAglIAUAAIAAAlgACihjIAAgUIAWAAIAAAUgABZhjIAAgUIAkAAIAAAUgAAQhjIAAgUIAkAAIAAAUgAg4hjIAAgUIAlAAIAAAUgAiAhjIAAgUIAkAAIAAAUg");
	this.shape_137.setTransform(18.55,12.025);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AjbB4IAAgUIAUAAIAAAUgAjbA/IAAgkIAUAAIAAAkgAjbgJIAAgkIAUAAIAAAkgAjbhRIAAglIAUAAIAAAlgADKhjIAAgUIASAAIAAAUgACChjIAAgUIAkAAIAAAUgAA5hjIAAgUIAkAAIAAAUgAgPhjIAAgUIAkAAIAAAUgAhXhjIAAgUIAkAAIAAAUgAighjIAAgUIAkAAIAAAUg");
	this.shape_138.setTransform(22.05,12.025);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AjlB4IAAgXIAUAAIAAAXgAjlA8IAAgkIAUAAIAAAkgAjlgMIAAgkIAUAAIAAAkgADSgdIAAgeIATAAIAAAegAjlhUIAAgjIAZAAIAAAUIgFAAIAAAPgADShfIAAgEIgPAAIAAgUIAiAAIAAAYgAB6hjIAAgUIAkAAIAAAUgAAxhjIAAgUIAkAAIAAAUgAgXhjIAAgUIAkAAIAAAUgAhfhjIAAgUIAlAAIAAAUgAinhjIAAgUIAkAAIAAAUg");
	this.shape_139.setTransform(23.05,12.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AjlB4IAAgaIAUAAIAAAagAjlA5IAAgkIAUAAIAAAkgADSAoIAAgYIATAAIAAAYgAjlgPIAAgkIAUAAIAAAkgADSgTIAAglIATAAIAAAlgAjlhXIAAggIAcAAIAAAUIgIAAIAAAMgADShcIAAgHIgMAAIAAgUIAfAAIAAAbgAB9hjIAAgUIAlAAIAAAUgAA0hjIAAgUIAkAAIAAAUgAgUhjIAAgUIAkAAIAAAUgAhchjIAAgUIAkAAIAAAUgAilhjIAAgUIAkAAIAAAUg");
	this.shape_140.setTransform(23.05,12.025);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AjlB4IAAgcIAUAAIAAAcgADSBuIAAgSIATAAIAAASgADSA3IAAgkIATAAIAAAkgAjlA3IAAgkIAUAAIAAAkgADSgQIAAglIATAAIAAAlgAjlgQIAAglIAUAAIAAAlgADShZIAAgKIgJAAIAAgUIAcAAIAAAegAjlhZIAAgeIAfAAIAAAUIgLAAIAAAKgACBhjIAAgUIAkAAIAAAUgAA4hjIAAgUIAkAAIAAAUgAgQhjIAAgUIAjAAIAAAUgAhZhjIAAgUIAlAAIAAAUgAihhjIAAgUIAkAAIAAAUg");
	this.shape_141.setTransform(23.05,12.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("ADSCWIAAgMIATAAIAAAMgADSBlIAAgkIATAAIAAAkgAjlBaIAAgfIAUAAIAAAfgADSAcIAAgjIATAAIAAAjgAjlAXIAAgjIAUAAIAAAjgADSgrIAAglIATAAIAAAlgAjlgxIAAgkIAUAAIAAAkgADSh0IAAgNIgGAAIAAgUIAZAAIAAAhgAjlh6IAAgbIAiAAIAAAUIgOAAIAAAHgACDiBIAAgUIAkAAIAAAUgAA6iBIAAgUIAlAAIAAAUgAgNiBIAAgUIAjAAIAAAUgAhWiBIAAgUIAkAAIAAAUgAieiBIAAgUIAkAAIAAAUg");
	this.shape_142.setTransform(23.05,15);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("ADSC5IAAgGIATAAIAAAGgADSCOIAAgkIATAAIAAAkgADSBGIAAglIATAAIAAAlgAjlA3IAAgiIAUAAIAAAigADSgCIAAgkIATAAIAAAkgAjlgPIAAgkIAUAAIAAAkgADShLIAAgkIATAAIAAAkgAjlhXIAAglIAUAAIAAAlgADSiUIAAgQIgDAAIAAgUIAWAAIAAAkgAjligIAAgYIAlAAIAAAUIgRAAIAAAEgACHikIAAgUIAkAAIAAAUgAA9ikIAAgUIAlAAIAAAUgAgKikIAAgUIAjAAIAAAUgAhTikIAAgUIAkAAIAAAUgAicikIAAgUIAlAAIAAAUg");
	this.shape_143.setTransform(23.05,18.5);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("ADSDKIAAglIATAAIAAAlgADSCBIAAgkIATAAIAAAkgADSA4IAAgkIATAAIAAAkgAjlAmIAAgkIAUAAIAAAkgADSgQIAAgkIATAAIAAAkgAjlgiIAAgkIAUAAIAAAkgADShZIAAgkIATAAIAAAkgAjlhrIAAgkIAUAAIAAAkgADSiiIAAgkIATAAIAAAkgACJi1IAAgUIAkAAIAAAUgABAi1IAAgUIAlAAIAAAUgAgHi1IAAgUIAjAAIAAAUgAhQi1IAAgUIAkAAIAAAUgAiZi1IAAgUIAlAAIAAAUgAjii1IAAgUIAkAAIAAAUg");
	this.shape_144.setTransform(23.05,20.15);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAlAAIAAAUgACMDmIAAgUIANAAIAAAUgADSCwIAAglIATAAIAAAlgADSBnIAAgkIATAAIAAAkgADSAeIAAgjIATAAIAAAjgAjlAHIAAgkIAUAAIAAAkgADSgqIAAgkIATAAIAAAkgAjlhBIAAgkIAUAAIAAAkgADShyIAAglIATAAIAAAlgAjliKIAAgkIAUAAIAAAkgADSi7IAAglIATAAIAAAlgACMjRIAAgUIAkAAIAAAUgABDjRIAAgUIAkAAIAAAUgAgFjRIAAgUIAkAAIAAAUgAhNjRIAAgUIAkAAIAAAUgAiWjRIAAgUIAlAAIAAAUgAjejRIAAgUIAkAAIAAAUg");
	this.shape_145.setTransform(23.05,22.975);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AC6DmIAAgUIAlAAIAAAUgAByDmIAAgUIAkAAIAAAUgABGDmIAAgUIAHAAIAAAUgADSCzIAAglIATAAIAAAlgADSBqIAAgkIATAAIAAAkgADSAhIAAgjIATAAIAAAjgAjlAEIAAgkIAUAAIAAAkgADSgnIAAgkIATAAIAAAkgAjlhEIAAgkIAUAAIAAAkgADShvIAAglIATAAIAAAlgAjliNIAAgkIAUAAIAAAkgADSi4IAAglIATAAIAAAlgACPjRIAAgUIAkAAIAAAUgABGjRIAAgUIAkAAIAAAUgAgCjRIAAgUIAjAAIAAAUgAhLjRIAAgUIAlAAIAAAUgAiTjRIAAgUIAkAAIAAAUgAjcjRIAAgUIAkAAIAAAUg");
	this.shape_146.setTransform(23.05,22.975);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAlAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAlAAIAAAUgADSC2IAAglIATAAIAAAlgADSBtIAAgkIATAAIAAAkgADSAkIAAgkIATAAIAAAkIAAAAgAjlABIAAgkIAUAAIAAAkgADSgkIAAgkIATAAIAAAkgAjlhHIAAgkIAUAAIAAAkgADShsIAAglIATAAIAAAlgAjliQIAAgkIAUAAIAAAkgADSi1IAAglIATAAIAAAlgACSjRIAAgUIAkAAIAAAUgABJjRIAAgUIAlAAIAAAUgAABjRIAAgUIAkAAIAAAUgAhHjRIAAgUIAkAAIAAAUgAiQjRIAAgUIAlAAIAAAUgAjZjRIAAgUIAkAAIAAAUg");
	this.shape_147.setTransform(23.05,22.975);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AC1DmIAAgUIAkAAIAAAUgABsDmIAAgUIAkAAIAAAUgAAjDmIAAgUIAlAAIAAAUgAglDmIAAgUIAkAAIAAAUgADSC5IAAglIATAAIAAAlgADSBwIAAgkIATAAIAAAkgADSAnIAAgkIATAAIAAAhIAAADgAjlgBIAAgkIAUAAIAAAkgADSghIAAgkIATAAIAAAkgAjlhKIAAgkIAUAAIAAAkgADShpIAAglIATAAIAAAlgAjliSIAAglIAUAAIAAAlgADSiyIAAglIATAAIAAAlgACVjRIAAgUIAkAAIAAAUgABMjRIAAgUIAkAAIAAAUgAADjRIAAgUIAkAAIAAAUgAhEjRIAAgUIAkAAIAAAUgAiNjRIAAgUIAlAAIAAAUgAjVjRIAAgUIAkAAIAAAUg");
	this.shape_148.setTransform(23.05,22.975);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("ACxDmIAAgUIAlAAIAAAUgABpDmIAAgUIAkAAIAAAUgAAgDmIAAgUIAkAAIAAAUgAgoDmIAAgUIAkAAIAAAUgAhxDmIAAgUIAlAAIAAAUgADSC8IAAglIATAAIAAAlgADSBzIAAgkIATAAIAAAkgADSAqIAAgkIATAAIAAAeIAAAGgAjlgEIAAgkIAUAAIAAAkgADSgeIAAgkIATAAIAAAkgAjlhNIAAgkIAUAAIAAAkgADShmIAAglIATAAIAAAlgAjliVIAAglIAUAAIAAAlgADSivIAAglIATAAIAAAlgACXjRIAAgUIAkAAIAAAUgABOjRIAAgUIAlAAIAAAUgAAGjRIAAgUIAkAAIAAAUgAhCjRIAAgUIAkAAIAAAUgAiLjRIAAgUIAlAAIAAAUgAjTjRIAAgUIAkAAIAAAUg");
	this.shape_149.setTransform(23.05,22.975);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("ACvDmIAAgUIAkAAIAAAUgABmDmIAAgUIAkAAIAAAUgAAdDmIAAgUIAlAAIAAAUgAgqDmIAAgUIAkAAIAAAUgAhzDmIAAgUIAkAAIAAAUgAi8DmIAAgUIAlAAIAAAUgADSC/IAAglIATAAIAAAlgADSB2IAAgkIATAAIAAAkgADSAtIAAgkIATAAIAAAbIAAAJgAjlgHIAAgkIAUAAIAAAkgADSgbIAAgkIATAAIAAAkgAjlhQIAAgkIAUAAIAAAkgADShjIAAglIATAAIAAAlgAjliYIAAglIAUAAIAAAlgADSisIAAglIATAAIAAAlgACbjRIAAgUIAkAAIAAAUgABSjRIAAgUIAkAAIAAAUgAAJjRIAAgUIAkAAIAAAUgAg/jRIAAgUIAlAAIAAAUgAiIjRIAAgUIAlAAIAAAUgAjQjRIAAgUIAkAAIAAAUg");
	this.shape_150.setTransform(23.05,22.975);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("ACsDmIAAgUIAkAAIAAAUgABjDmIAAgUIAkAAIAAAUgAAaDmIAAgUIAlAAIAAAUgAguDmIAAgUIAkAAIAAAUgAh3DmIAAgUIAlAAIAAAUgAi/DmIAAgUIAkAAIAAAUgAjlDPIAAgkIAUAAIAAAkgADSDBIAAgkIATAAIAAAkgADSB4IAAgkIATAAIAAAkgADSAwIAAglIATAAIAAAZIAAAMgAjlgKIAAgkIAUAAIAAAkgADSgYIAAgkIATAAIAAAkgAjlhTIAAgkIAUAAIAAAkgADShhIAAgkIATAAIAAAkgAjlibIAAglIAUAAIAAAlgADSiqIAAgkIATAAIAAAkgACdjRIAAgUIAkAAIAAAUgABVjRIAAgUIAkAAIAAAUgAAMjRIAAgUIAkAAIAAAUgAg8jRIAAgUIAlAAIAAAUgAiEjRIAAgUIAkAAIAAAUgAjNjRIAAgUIAkAAIAAAUg");
	this.shape_151.setTransform(23.05,22.975);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("ACoDmIAAgUIAlAAIAAAUgABgDmIAAgUIAkAAIAAAUgAAXDmIAAgUIAkAAIAAAUgAgxDmIAAgUIAkAAIAAAUgAh5DmIAAgUIAkAAIAAAUgAjCDmIAAgUIAkAAIAAAUgAjlDMIAAgkIAUAAIAAAkgADSDEIAAgkIATAAIAAAkgAjlCEIAAglIAUAAIAAAlgADSB7IAAgkIATAAIAAAkgADSAzIAAglIATAAIAAAWIAAAPgAjlgNIAAgkIAUAAIAAAkgADSgVIAAgkIATAAIAAAkgAjlhWIAAgkIAUAAIAAAkgADSheIAAgkIATAAIAAAkgAjlieIAAglIAUAAIAAAlgADSinIAAgkIATAAIAAAkgACgjRIAAgUIAkAAIAAAUgABXjRIAAgUIAlAAIAAAUgAAPjRIAAgUIAkAAIAAAUgAg5jRIAAgUIAkAAIAAAUgAiCjRIAAgUIAlAAIAAAUgAjKjRIAAgUIAkAAIAAAUg");
	this.shape_152.setTransform(23.05,22.975);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AClDmIAAgUIAlAAIAAAUgABdDmIAAgUIAkAAIAAAUgAAUDmIAAgUIAlAAIAAAUgAgzDmIAAgUIAkAAIAAAUgAh8DmIAAgUIAkAAIAAAUgAjFDmIAAgUIAlAAIAAAUgAjlDJIAAgkIAUAAIAAAkgADSDHIAAgkIATAAIAAAkgAjlCBIAAglIAUAAIAAAlgADSB+IAAgkIATAAIAAAkgAjlA4IAAgWIAUAAIAAAWgADSA2IAAglIATAAIAAATIAAASgAjlgQIAAgkIAUAAIAAAkgADSgSIAAgkIATAAIAAAkgAjlhZIAAgkIAUAAIAAAkgADShbIAAgkIATAAIAAAkgAjlihIAAglIAUAAIAAAlgADSikIAAgkIATAAIAAAkgACkjRIAAgUIAkAAIAAAUgABbjRIAAgUIAkAAIAAAUgAASjRIAAgUIAkAAIAAAUgAg2jRIAAgUIAlAAIAAAUgAh/jRIAAgUIAlAAIAAAUgAjHjRIAAgUIAkAAIAAAUg");
	this.shape_153.setTransform(23.05,22.975);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("ACjDmIAAgUIAlAAIAAAUgABbDmIAAgUIAkAAIAAAUgAASDmIAAgUIAkAAIAAAUgAg2DmIAAgUIAkAAIAAAUgAh/DmIAAgUIAkAAIAAAUgAjIDmIAAgUIAlAAIAAAUgADSDKIAAgkIATAAIAAAkgAjlDGIAAgkIAUAAIAAAkgADSCBIAAgkIATAAIAAAkgAjlB+IAAglIAUAAIAAAlgADSA5IAAglIATAAIAAAQIAAAVgAjlA1IAAgkIAUAAIAAAkgADSgPIAAgkIATAAIAAAkgAjlgTIAAgkIAUAAIAAAkgADShYIAAgkIATAAIAAAkgAjlhcIAAgkIAUAAIAAAkgADSihIAAgkIATAAIAAAkgAjlikIAAglIAUAAIAAAlgACmjRIAAgUIAkAAIAAAUgABdjRIAAgUIAlAAIAAAUgAAVjRIAAgUIAkAAIAAAUgAgzjRIAAgUIAkAAIAAAUgAh8jRIAAgUIAlAAIAAAUgAjEjRIAAgUIAkAAIAAAUg");
	this.shape_154.setTransform(23.05,22.975);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("ACdDmIAAgUIAkAAIAAAUgABVDmIAAgUIAjAAIAAAUgAAMDmIAAgUIAkAAIAAAUgAg8DmIAAgUIAkAAIAAAUgAiFDmIAAgUIAlAAIAAAUgAjNDmIAAgUIAkAAIAAAUgADSDQIAAgkIATAAIAAAkgAjlDAIAAgkIAUAAIAAAkgADSCHIAAgkIATAAIAAAkgAjlB4IAAglIAUAAIAAAlgADSA/IAAglIATAAIAAAKIAAAbgAjlAvIAAgkIAUAAIAAAkgADSgJIAAgkIATAAIAAAkgAjlgZIAAgkIAUAAIAAAkgADShSIAAgkIATAAIAAAkgAjlhiIAAgkIAUAAIAAAkgADSibIAAgkIATAAIAAAkgAjliqIAAglIAUAAIAAAlgACsjRIAAgUIAkAAIAAAUgABjjRIAAgUIAlAAIAAAUgAAbjRIAAgUIAkAAIAAAUgAgujRIAAgUIAlAAIAAAUgAh2jRIAAgUIAkAAIAAAUgAi/jRIAAgUIAkAAIAAAUg");
	this.shape_155.setTransform(23.05,22.975);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("ACaDmIAAgUIAlAAIAAAUgABSDmIAAgUIAkAAIAAAUgAAJDmIAAgUIAkAAIAAAUgAg/DmIAAgUIAkAAIAAAUgAiIDmIAAgUIAkAAIAAAUgAjRDmIAAgUIAlAAIAAAUgADSDTIAAglIATAAIAAAlgAjlC9IAAgkIAUAAIAAAkgADSCKIAAgkIATAAIAAAkgAjlB1IAAglIAUAAIAAAlgADSBBIAAgkIATAAIAAAHIAAAdgAjlAsIAAgkIAUAAIAAAkgADSgHIAAgkIATAAIAAAkgAjlgcIAAgkIAUAAIAAAkgADShPIAAglIATAAIAAAlgAjlhlIAAgkIAUAAIAAAkgADSiYIAAglIATAAIAAAlgAjlitIAAglIAUAAIAAAlgACvjRIAAgUIAkAAIAAAUgABmjRIAAgUIAkAAIAAAUgAAejRIAAgUIAkAAIAAAUgAgqjRIAAgUIAkAAIAAAUgAhzjRIAAgUIAlAAIAAAUgAi7jRIAAgUIAkAAIAAAUg");
	this.shape_156.setTransform(23.05,22.975);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAgBIATAAIAAAVgAB4DmIAAgUIAkAAIAAAUgAAvDmIAAgUIAkAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAlAAIAAAUgAiqDmIAAgUIAkAAIAAAUgAjlDkIAAglIAUAAIAAAlgADSCtIAAgkIATAAIAAAkgAjlCbIAAgkIAUAAIAAAkgADSBkIAAgkIATAAIAAAkgAjlBSIAAgkIAUAAIAAAkgADSAcIAAgkIATAAIAAAkgAjlAKIAAgkIAUAAIAAAkgADSgsIAAgkIATAAIAAAkgAjlg+IAAgkIAUAAIAAAkgADSh1IAAgkIATAAIAAAkgAjliHIAAgkIAUAAIAAAkgADSi+IAAgkIATAAIAAAkgACJjRIAAgUIAkAAIAAAUgABAjRIAAgUIAlAAIAAAUgAgHjRIAAgUIAjAAIAAAUgAhQjRIAAgUIAkAAIAAAUgAiZjRIAAgUIAlAAIAAAUgAjijRIAAgUIAkAAIAAAUg");
	this.shape_157.setTransform(23.05,22.975);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AClDmIAAgUIAlAAIAAAUgABdDmIAAgUIAkAAIAAAUgAAUDmIAAgUIAlAAIAAAUgAgzDmIAAgUIAkAAIAAAUgAh8DmIAAgUIAkAAIAAAUgAjFDmIAAgUIAlAAIAAAUgAjlDJIAAgkIAUAAIAAAkgADSDHIAAgkIATAAIAAAkgAjlCBIAAglIAUAAIAAAlgADSB+IAAgkIATAAIAAAkgAjlA4IAAgkIAUAAIAAAkgADSA2IAAglIATAAIAAATIAAASgAjlgQIAAgkIAUAAIAAAkgADSgSIAAgkIATAAIAAAkgAjlhZIAAgkIAUAAIAAAkgADShbIAAgkIATAAIAAAkgAjlihIAAglIAUAAIAAAlgADSikIAAgkIATAAIAAAkgACkjRIAAgUIAkAAIAAAUgABbjRIAAgUIAkAAIAAAUgAASjRIAAgUIAkAAIAAAUgAg2jRIAAgUIAlAAIAAAUgAh/jRIAAgUIAlAAIAAAUgAjHjRIAAgUIAkAAIAAAUg");
	this.shape_158.setTransform(23.05,22.975);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("ACLDmIAAgUIAlAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAkAAIAAAUgAhNDmIAAgUIAkAAIAAAUgAiWDmIAAgUIAkAAIAAAUgAjfDmIAAgUIAlAAIAAAUgADSDiIAAglIATAAIAAAlgAjlCvIAAglIAUAAIAAAlgADSCZIAAgkIATAAIAAAkgAjlBmIAAgkIAUAAIAAAkgADSBQIAAgkIATAAIAAAkgAjlAdIAAgjIAUAAIAAAjgADSAHIAAgjIATAAIAAAjgAjlgqIAAglIAUAAIAAAlgADShAIAAglIATAAIAAAlgAjlhzIAAgkIAUAAIAAAkgADSiJIAAglIATAAIAAAlgAjli8IAAgkIAUAAIAAAkgAC+jRIAAgUIAkAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAjAAIAAAUgAhljRIAAgUIAlAAIAAAUgAitjRIAAgUIAkAAIAAAUg");
	this.shape_159.setTransform(23.05,22.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_91}]}).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[]},1).to({state:[{t:this.shape_130}]},6).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_115}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(23,23,23.200000000000003,23);
// library properties:
lib.properties = {
	id: '03',
	width: 46,
	height: 46,
	fps: 25,
	color: "#000000",
	opacity: 0.00,
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
an.compositions['03'] = {
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