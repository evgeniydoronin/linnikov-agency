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


(lib.flower = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-10,-8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(10,-8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_2.setTransform(-0.025,6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_3.setTransform(5.95,-4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_4.setTransform(-6.05,-2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_5.setTransform(5.95,0);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_6.setTransform(3.975,8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_7.setTransform(5.95,-2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_8.setTransform(-2.05,-6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_9.setTransform(7.95,-4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_10.setTransform(-0.05,-6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_11.setTransform(-8.025,-2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_12.setTransform(3.95,-6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_13.setTransform(-8.025,-4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_14.setTransform(-8.025,-6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_15.setTransform(-4.025,-6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_16.setTransform(1.95,-6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_17.setTransform(5.95,8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_18.setTransform(3.95,10);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_19.setTransform(7.975,-6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_20.setTransform(1.95,10);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_21.setTransform(1.95,-8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_22.setTransform(-0.025,10);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_23.setTransform(-0.025,8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_24.setTransform(-2.025,-8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_25.setTransform(-0.025,-10);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_26.setTransform(-0.05,-8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_27.setTransform(7.95,-2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_28.setTransform(-4.05,-4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_29.setTransform(-0.05,0);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_30.setTransform(-2.05,-4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_31.setTransform(-6.05,-4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_32.setTransform(-0.05,-4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_33.setTransform(-4.05,-2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_34.setTransform(-6.025,0);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_35.setTransform(-4.025,2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_36.setTransform(-4.05,0);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_37.setTransform(-2.05,-2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_38.setTransform(-2.05,0);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_39.setTransform(-0.05,-2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_40.setTransform(1.95,0);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_41.setTransform(1.95,-2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_42.setTransform(1.95,-4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_43.setTransform(1.95,2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_44.setTransform(-2.05,2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_45.setTransform(-0.05,2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_46.setTransform(3.95,-4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_47.setTransform(-0.025,4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_48.setTransform(3.95,0);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_49.setTransform(3.95,2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_50.setTransform(3.95,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower, new cjs.Rectangle(-11,-11,22,22), null);


(lib.Анимация61 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация60 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация59 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация58 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация57 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация56 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация55 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация54 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация53 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация52 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация51 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация50 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,2);


(lib.Анимация49 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACqC+IAAlnIlnAAIAAgUIF7AAIAAF7g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация48 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACqC+IAAlnIlnAAIAAgUIF7AAIAAF7g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация47 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACqC+IAAlnIlnAAIAAgUIF7AAIAAF7g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация46 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACqC+IAAlnIlnAAIAAgUIF7AAIAAF7g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai9C+IAAl7IF7AAIAAF7gAipCqIFTAAIAAlTIlTAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai9C+IAAl7IF7AAIAAF7gAipCqIFTAAIAAlTIlTAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai9C+IAAl7IF7AAIAAF7gAipCqIFTAAIAAlTIlTAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


(lib.Анимация38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai9C+IAAl7IF7AAIAAF7gAipCqIFTAAIAAlTIlTAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-19,38,38);


// stage content:
(lib._08 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(100));

	// kw_3
	this.instance = new lib.Анимация49("synched",0);
	this.instance.setTransform(27,23,1,1,0,180,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(21).to({_off:false},0).to({y:27},5).to({_off:true},1).wait(4).to({_off:false,skewX:270,skewY:90,x:23,y:26.95},0).to({x:19},4).to({_off:true},1).wait(64));

	// kw_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACqC+IAAlnIlnAAIAAgUIF7AAIAAF7g");
	this.shape.setTransform(27,18.95);

	this.instance_1 = new lib.Анимация48("synched",0);
	this.instance_1.setTransform(27,18.95);
	this.instance_1._off = true;

	this.instance_2 = new lib.Анимация49("synched",0);
	this.instance_2.setTransform(27,23);

	this.instance_3 = new lib.Анимация47("synched",0);
	this.instance_3.setTransform(19,27.05,1,1,180);
	this.instance_3._off = true;

	this.instance_4 = new lib.Анимация46("synched",0);
	this.instance_4.setTransform(23,23,1,1,180);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1}]},16).to({state:[{t:this.instance_2,p:{rotation:0,x:27,y:23}}]},5).to({state:[]},1).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2,p:{rotation:90,x:23,y:26.95}}]},4).to({state:[]},1).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},7).to({state:[]},1).to({state:[{t:this.instance_4}]},47).to({state:[{t:this.instance_3}]},6).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16).to({_off:false},0).to({_off:true,y:23},5).wait(6).to({_off:false,rotation:90,y:27},0).to({_off:true,x:23,y:26.95},4).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(35).to({_off:false},0).to({_off:true,x:23,y:23},7).wait(48).to({_off:false,rotation:0,x:27,y:18.95},6).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(35).to({_off:false},7).to({_off:true},1).wait(47).to({_off:false,rotation:0},0).to({_off:true,x:27,y:18.95},6).wait(4));

	// o6
	this.instance_5 = new lib.Анимация50("synched",0);
	this.instance_5.setTransform(43.05,38.95);

	this.instance_6 = new lib.Анимация51("synched",0);
	this.instance_6.setTransform(41,41);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(16).to({startPosition:0},0).to({y:40.6},4).to({_off:true,x:41,y:41},1).wait(5).to({_off:false,rotation:90,x:7,y:43.05},1).to({x:5.4,y:43},3).to({_off:true,x:5,y:40.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(20).to({_off:false},1).to({startPosition:0},5).to({_off:true,rotation:90,x:7,y:43.05},1).wait(3).to({_off:false,x:5,y:40.95},1).to({startPosition:0},4).to({_off:true},1).wait(64));

	// o5
	this.instance_7 = new lib.Анимация52("synched",0);
	this.instance_7.setTransform(41.05,40.95);

	this.instance_8 = new lib.Анимация53("synched",0);
	this.instance_8.setTransform(39,41);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(16).to({startPosition:0},0).to({y:41},4).to({_off:true,x:39},1).wait(5).to({_off:false,rotation:90,x:5,y:41.05},1).to({y:41},3).to({_off:true,y:38.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(20).to({_off:false},1).to({y:39},5).to({_off:true,rotation:90,x:5,y:41.05},1).wait(3).to({_off:false,y:38.95},1).to({x:7},4).to({_off:true},1).wait(64));

	// o4
	this.instance_9 = new lib.Анимация54("synched",0);
	this.instance_9.setTransform(41.05,4.95);

	this.instance_10 = new lib.Анимация55("synched",0);
	this.instance_10.setTransform(43,5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(16).to({startPosition:0},0).to({y:5},4).to({_off:true,x:43},1).wait(5).to({_off:false,rotation:90,x:41,y:41.05},1).to({y:41},3).to({_off:true,y:42.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(20).to({_off:false},1).to({y:6.95},5).to({_off:true,rotation:90,x:41,y:41.05},1).wait(3).to({_off:false,y:42.95},1).to({x:39.05},4).to({_off:true},1).wait(64));

	// o3
	this.instance_11 = new lib.Анимация56("synched",0);
	this.instance_11.setTransform(39.05,6.95);

	this.instance_12 = new lib.Анимация57("synched",0);
	this.instance_12.setTransform(41,5);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(16).to({startPosition:0},0).to({y:5.4},4).to({_off:true,x:41,y:5},1).wait(5).to({_off:false,rotation:90,x:39,y:39.05},1).to({x:40.6,y:39},3).to({_off:true,x:41,y:40.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(20).to({_off:false},1).to({startPosition:0},5).to({_off:true,rotation:90,x:39,y:39.05},1).wait(3).to({_off:false,x:41,y:40.95},1).to({startPosition:0},4).to({_off:true},1).wait(64));

	// o2
	this.instance_13 = new lib.Анимация58("synched",0);
	this.instance_13.setTransform(7.05,2.95);

	this.instance_14 = new lib.Анимация59("synched",0);
	this.instance_14.setTransform(7,41);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(16).to({startPosition:0},0).to({y:4.6},4).to({_off:true,x:7,y:41},1).wait(5).to({_off:false,rotation:90,x:43,y:7.05},1).to({x:41.4,y:7},3).to({_off:true,x:5,y:6.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(20).to({_off:false},1).to({y:43},5).to({_off:true,rotation:90,x:43,y:7.05},1).wait(3).to({_off:false,x:5,y:6.95},1).to({x:3},4).to({_off:true},1).wait(64));

	// o1
	this.instance_15 = new lib.Анимация60("synched",0);
	this.instance_15.setTransform(5.05,4.95);

	this.instance_16 = new lib.Анимация61("synched",0);
	this.instance_16.setTransform(5,41);
	this.instance_16._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(41.05,40.95,1,1,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_2.setTransform(39.05,42.95,1,1,180);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_3.setTransform(7.05,38.95,1,1,180);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_4.setTransform(5.05,40.95,1,1,180);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_5.setTransform(5.05,4.95,1,1,180);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_6.setTransform(3.05,6.95,1,1,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).to({state:[{t:this.instance_15}]},16).to({state:[{t:this.instance_15}]},4).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},5).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},4).to({state:[{t:this.shape_6,p:{rotation:180,x:3.05,y:6.95}},{t:this.shape_5,p:{rotation:180,x:5.05,y:4.95}},{t:this.shape_4,p:{rotation:180,x:5.05,y:40.95}},{t:this.shape_3,p:{rotation:180,x:7.05,y:38.95}},{t:this.shape_2,p:{rotation:180,x:39.05,y:42.95}},{t:this.shape_1,p:{x:41.05,rotation:180,y:40.95}}]},1).to({state:[{t:this.shape_3,p:{rotation:0,x:41.05,y:40.95}},{t:this.shape_2,p:{rotation:0,x:5.05,y:4.95}},{t:this.shape_1,p:{x:5.05,rotation:180,y:40.95}}]},3).to({state:[]},2).to({state:[{t:this.shape_3,p:{rotation:0,x:41.05,y:40.95}},{t:this.shape_2,p:{rotation:0,x:41.05,y:4.95}},{t:this.shape_1,p:{x:5.05,rotation:0,y:4.95}}]},51).to({state:[{t:this.shape_6,p:{rotation:0,x:43.05,y:38.95}},{t:this.shape_5,p:{rotation:0,x:41.05,y:40.95}},{t:this.shape_4,p:{rotation:0,x:41.05,y:4.95}},{t:this.shape_3,p:{rotation:0,x:39.05,y:6.95}},{t:this.shape_2,p:{rotation:0,x:7.05,y:2.95}},{t:this.shape_1,p:{x:5.05,rotation:0,y:4.95}}]},1).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(16).to({startPosition:0},0).to({y:5},4).to({_off:true,x:5,y:41},1).wait(5).to({_off:false,rotation:90,x:41,y:5.05},1).to({y:5},3).to({_off:true,x:5,y:4.95},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(20).to({_off:false},1).to({startPosition:0},5).to({_off:true,rotation:90,x:41,y:5.05},1).wait(3).to({_off:false,x:5,y:4.95},1).to({startPosition:0},4).to({_off:true,rotation:180,x:41.05,y:40.95},1).wait(64));

	// flower
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_7.setTransform(9.05,18.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_8.setTransform(29.05,18.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_9.setTransform(19.025,32.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_10.setTransform(25,22.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_11.setTransform(13,24.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_12.setTransform(25,26.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_13.setTransform(23.025,34.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_14.setTransform(25,24.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_15.setTransform(17,20.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_16.setTransform(27,22.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_17.setTransform(19,20.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_18.setTransform(11.025,24.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_19.setTransform(23,20.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_20.setTransform(11.025,22.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_21.setTransform(11.025,20.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_22.setTransform(15.025,20.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_23.setTransform(21,20.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_24.setTransform(25,34.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_25.setTransform(23,36.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_26.setTransform(27.025,20.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_27.setTransform(21,36.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_28.setTransform(21,18.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_29.setTransform(19.025,36.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_30.setTransform(19.025,34.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_31.setTransform(17.025,18.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_32.setTransform(19.025,16.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_33.setTransform(19,18.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_34.setTransform(27,24.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_35.setTransform(15,22.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_36.setTransform(19,26.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_37.setTransform(17,22.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_38.setTransform(13,22.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_39.setTransform(19,22.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_40.setTransform(15,24.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_41.setTransform(13.025,26.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_42.setTransform(15.025,28.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_43.setTransform(15,26.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_44.setTransform(17,24.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_45.setTransform(17,26.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_46.setTransform(19,24.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_47.setTransform(21,26.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_48.setTransform(21,24.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_49.setTransform(21,22.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_50.setTransform(21,28.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_51.setTransform(17,28.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_52.setTransform(19,28.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_53.setTransform(23,22.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_54.setTransform(19.025,30.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_55.setTransform(23,26.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_56.setTransform(23,28.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_57.setTransform(23,24.95);

	this.instance_17 = new lib.flower();
	this.instance_17.setTransform(19.05,26.95);
	this.instance_17._off = true;

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgUAVIAAgpIApAAIAAApg");
	this.shape_58.setTransform(23,23);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgfAgIAAg/IA/AAIAAA/g");
	this.shape_59.setTransform(23.05,23);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgqArIAAhVIBVAAIAABVg");
	this.shape_60.setTransform(23.05,23);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("Ag1A2IAAhrIBrAAIAABrg");
	this.shape_61.setTransform(23.05,23.05);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AhABBIAAiBICBAAIAACBg");
	this.shape_62.setTransform(23.05,23.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhLBMIAAiXICXAAIAACXg");
	this.shape_63.setTransform(23.1,23.05);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AhBBCIAAiDICDAAIAACDg");
	this.shape_64.setTransform(23.075,23.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgvAvIAAhdIBfAAIAABdg");
	this.shape_65.setTransform(23.05,23.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AggAhIAAhBIBBAAIAABBg");
	this.shape_66.setTransform(23.025,23.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgVAXIAAgsIAsAAIAAAsg");
	this.shape_67.setTransform(23,23);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgPAQIAAgfIAfAAIAAAfg");
	this.shape_68.setTransform(23,23);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgKALIAAgVIAVAAIAAAVg");
	this.shape_69.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_57,p:{x:23,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_56,p:{x:23,y:28.95,scaleX:1,scaleY:1}},{t:this.shape_55,p:{x:23,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_54,p:{x:19.025,y:30.95,scaleX:1,scaleY:1}},{t:this.shape_53,p:{x:23,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:19,y:28.95,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:17,y:28.95,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:21,y:28.95,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:21,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:21,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:21,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:19,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:17,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:17,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:15,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:15.025,y:28.95,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:13.025,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:15,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:19,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:13,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:17,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:19,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:15,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:27,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:19,y:18.95,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:19.025,y:16.95,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:17.025,y:18.95,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:19.025,y:34.95,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:19.025,y:36.95,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:21,y:18.95,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:21,y:36.95,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:27.025,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:23,y:36.95,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:25,y:34.95,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:21,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:15.025,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:11.025,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:11.025,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:23,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:11.025,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:19,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:27,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:17,y:20.95,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:25,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:23.025,y:34.95,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:25,y:26.95,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:13,y:24.95,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:25,y:22.95,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:19.025,y:32.95,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:29.05,y:18.95,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:9.05,y:18.95,scaleX:1,scaleY:1}}]}).to({state:[{t:this.instance_17}]},16).to({state:[{t:this.instance_17}]},5).to({state:[{t:this.instance_17}]},6).to({state:[{t:this.instance_17}]},4).to({state:[{t:this.instance_17}]},4).to({state:[{t:this.instance_17}]},7).to({state:[{t:this.shape_57,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_56,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_55,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_54,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_53,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.975,y:13,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:30.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:26.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:28.95,y:31,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:14.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:26.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.975,y:29,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:33,y:15,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:13,y:15,scaleX:1,scaleY:1}}]},3).to({state:[{t:this.shape_53,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:30.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:26.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:14.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:26.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_49,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_46,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_43,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_39,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_35,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_29,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_23,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_19,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_11,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_57,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_56,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_55,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_54,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_53,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:23,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_57,p:{x:23.0368,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_56,p:{x:23.0368,y:23.0652,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_55,p:{x:23.0368,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_54,p:{x:23.0609,y:23.0688,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_53,p:{x:23.0368,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_52,p:{x:23.0296,y:23.0652,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_51,p:{x:23.026,y:23.0652,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_50,p:{x:23.0332,y:23.0652,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_49,p:{x:23.0332,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_48,p:{x:23.0332,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_47,p:{x:23.0332,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_46,p:{x:23.0296,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_45,p:{x:23.026,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_44,p:{x:23.026,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_43,p:{x:23.0224,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_42,p:{x:23.0537,y:23.0652,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_41,p:{x:23.0501,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_40,p:{x:23.0224,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_39,p:{x:23.0296,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_38,p:{x:23.0188,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_37,p:{x:23.026,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_36,p:{x:23.0296,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_35,p:{x:23.0224,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_34,p:{x:22.994,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_33,p:{x:23.0296,y:23.0472,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_32,p:{x:23.0609,y:23.0436,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_31,p:{x:23.0573,y:23.0472,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_30,p:{x:23.0609,y:23.076,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_29,p:{x:23.0609,y:23.0796,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_28,p:{x:23.0332,y:23.0472,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_27,p:{x:23.0332,y:23.0796,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_26,p:{x:23.0253,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_25,p:{x:23.0368,y:23.0796,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_24,p:{x:23.0404,y:23.076,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_23,p:{x:23.0332,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_22,p:{x:23.0537,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_21,p:{x:23.0465,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_20,p:{x:23.0465,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_19,p:{x:23.0368,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_18,p:{x:23.0465,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_17,p:{x:23.0296,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_16,p:{x:22.994,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_15,p:{x:23.026,y:23.0508,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_14,p:{x:23.0404,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_13,p:{x:23.0681,y:23.076,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_12,p:{x:23.0404,y:23.0616,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_11,p:{x:23.0188,y:23.058,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_10,p:{x:23.0404,y:23.0544,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_9,p:{x:23.0609,y:23.0724,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_8,p:{x:23.0102,y:23.0472,scaleX:1.2518,scaleY:1.2518}},{t:this.shape_7,p:{x:23.0837,y:23.0744,scaleX:8.7,scaleY:8.7}}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_57,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_56,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_55,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_54,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_53,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:23.025,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:23,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:23,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_11,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_19,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_23,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.95,y:23,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_29,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_35,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_39,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_43,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_46,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_49,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_53,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:30.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:26.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:14.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:26.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:22.975,y:29,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_57,p:{x:26.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_56,p:{x:26.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_55,p:{x:26.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_54,p:{x:22.975,y:27,scaleX:1,scaleY:1}},{t:this.shape_53,p:{x:26.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_52,p:{x:22.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_51,p:{x:20.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_50,p:{x:24.95,y:25,scaleX:1,scaleY:1}},{t:this.shape_49,p:{x:24.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_48,p:{x:24.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_47,p:{x:24.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_46,p:{x:22.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_45,p:{x:20.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_44,p:{x:20.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_43,p:{x:18.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_42,p:{x:18.975,y:25,scaleX:1,scaleY:1}},{t:this.shape_41,p:{x:16.975,y:23,scaleX:1,scaleY:1}},{t:this.shape_40,p:{x:18.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_39,p:{x:22.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_38,p:{x:16.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_37,p:{x:20.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_36,p:{x:22.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_35,p:{x:18.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_34,p:{x:30.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_33,p:{x:22.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_32,p:{x:22.975,y:13,scaleX:1,scaleY:1}},{t:this.shape_31,p:{x:20.975,y:15,scaleX:1,scaleY:1}},{t:this.shape_30,p:{x:22.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_29,p:{x:22.975,y:33,scaleX:1,scaleY:1}},{t:this.shape_28,p:{x:24.95,y:15,scaleX:1,scaleY:1}},{t:this.shape_27,p:{x:24.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_26,p:{x:30.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_25,p:{x:26.95,y:33,scaleX:1,scaleY:1}},{t:this.shape_24,p:{x:28.95,y:31,scaleX:1,scaleY:1}},{t:this.shape_23,p:{x:24.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_22,p:{x:18.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_21,p:{x:14.975,y:17,scaleX:1,scaleY:1}},{t:this.shape_20,p:{x:14.975,y:19,scaleX:1,scaleY:1}},{t:this.shape_19,p:{x:26.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_18,p:{x:14.975,y:21,scaleX:1,scaleY:1}},{t:this.shape_17,p:{x:22.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_16,p:{x:30.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_15,p:{x:20.95,y:17,scaleX:1,scaleY:1}},{t:this.shape_14,p:{x:28.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_13,p:{x:26.975,y:31,scaleX:1,scaleY:1}},{t:this.shape_12,p:{x:28.95,y:23,scaleX:1,scaleY:1}},{t:this.shape_11,p:{x:16.95,y:21,scaleX:1,scaleY:1}},{t:this.shape_10,p:{x:28.95,y:19,scaleX:1,scaleY:1}},{t:this.shape_9,p:{x:22.975,y:29,scaleX:1,scaleY:1}},{t:this.shape_8,p:{x:33,y:15,scaleX:1,scaleY:1}},{t:this.shape_7,p:{x:13,y:15,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_17}]},8).to({state:[{t:this.instance_17}]},6).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(16).to({_off:false},0).to({x:19,y:22.95},5).to({y:18.95},6).to({x:23.05},4).to({x:27.05},4).to({x:23,y:23},7,cjs.Ease.none).to({_off:true},3).wait(45).to({_off:false},0).to({x:19.05,y:26.95},6).wait(4));

	// kw
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("Ai9C+IAAl7IF7AAIAAF7gAipCqIFTAAIAAlTIlTAAg");
	this.shape_70.setTransform(19,26.95);

	this.instance_18 = new lib.Анимация38("synched",0);
	this.instance_18.setTransform(19,26.95);
	this.instance_18._off = true;

	this.instance_19 = new lib.Анимация39("synched",0);
	this.instance_19.setTransform(19,19);
	this.instance_19._off = true;

	this.instance_20 = new lib.Анимация40("synched",0);
	this.instance_20.setTransform(27,19);
	this.instance_20._off = true;

	this.instance_21 = new lib.Анимация41("synched",0);
	this.instance_21.setTransform(23,23);
	this.instance_21._off = true;

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AiuCvIAAldIFdAAIAAFdgAiaCbIE1AAIAAk1Ik1AAg");
	this.shape_71.setTransform(23.025,23.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AigChIAAlBIFBAAIAAFBgAiMCNIEZAAIAAkZIkZAAg");
	this.shape_72.setTransform(23.025,23);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AiRCSIAAkjIEjAAIAAEjgAh9B+ID7AAIAAj7Ij7AAg");
	this.shape_73.setTransform(23.05,23.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AiCCDIAAkFIEFAAIAAEFgAhuBvIDdAAIAAjdIjdAAg");
	this.shape_74.setTransform(23.05,23.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AhzB1IAAjoIDnAAIAADogAhfBgIC/AAIAAi/Ii/AAg");
	this.shape_75.setTransform(23.075,23.05);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AhlBmIAAjLIDLAAIAADLgAhRBSICjAAIAAijIijAAg");
	this.shape_76.setTransform(23.075,23.025);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AhWBXIAAitICtAAIAACtgAhCBDICFAAIAAiFIiFAAg");
	this.shape_77.setTransform(23.1,23.05);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AiKCKIAAkUIEUAAIAAEUgAh2B3IDtAAIAAjtIjtAAg");
	this.shape_78.setTransform(23.05,23.05);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AiWCXIAAktIEtAAIAAEtgAiCCDIEFAAIAAkFIkFAAg");
	this.shape_79.setTransform(23.025,23.025);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AihCiIAAlDIFDAAIAAFDgAiNCOIEbAAIAAkbIkbAAg");
	this.shape_80.setTransform(23.025,23.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AipCqIAAlTIFTAAIAAFTgAiVCWIErAAIAAkrIkrAAg");
	this.shape_81.setTransform(23.025,23.025);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AiwCxIAAlhIFhAAIAAFhgAicCdIE5AAIAAk5Ik5AAg");
	this.shape_82.setTransform(23.025,23.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("Ai0C1IAAlpIFpAAIAAFpgAihChIFCAAIAAlCIlCAAg");
	this.shape_83.setTransform(23,23);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("Ai4C5IAAlxIFxAAIAAFxgAikClIFJAAIAAlJIlJAAg");
	this.shape_84.setTransform(23,23);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("Ai7C8IAAl3IF3AAIAAF3gAinCoIFPAAIAAlPIlPAAg");
	this.shape_85.setTransform(23,23);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("Ai8C9IAAl5IF5AAIAAF5gAioCpIFRAAIAAlRIlRAAg");
	this.shape_86.setTransform(23,23);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("Ai9C9IAAl6IF6AAIAAF6gAipCqIFTAAIAAlTIlTAAg");
	this.shape_87.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70,p:{x:19,y:26.95}}]}).to({state:[{t:this.instance_18}]},16).to({state:[{t:this.instance_18}]},5).to({state:[{t:this.instance_19}]},6).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_20}]},4).to({state:[{t:this.instance_21}]},7).to({state:[{t:this.instance_21}]},3).to({state:[{t:this.shape_70,p:{x:23,y:23}}]},11).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[]},1).to({state:[{t:this.shape_78}]},14).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_70,p:{x:23,y:23}}]},1).to({state:[{t:this.shape_70,p:{x:23,y:23}}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_18}]},6).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(16).to({_off:false},0).to({y:23},5).to({_off:true,y:19},6).wait(63).to({_off:false,y:26.95},6).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(21).to({_off:false},6).to({x:23},4).to({_off:true,x:27},4).wait(65));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(31).to({_off:false},4).to({_off:true,x:23,y:23},7,cjs.Ease.none).wait(58));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(35).to({_off:false},7,cjs.Ease.none).wait(3).to({startPosition:0},0).to({_off:true},11).wait(34).to({_off:false},0).to({_off:true,x:19,y:26.95},6).wait(4));

	// ck
	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FF0000").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_88.setTransform(15.05,33.95);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_89.setTransform(11.05,28.95);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_90.setTransform(9.05,26.95);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FF0000").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_91.setTransform(7.05,22.95);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FF0000").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_92.setTransform(5.05,18.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88}]}).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88}]},14).to({state:[]},1).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88}]},81).to({state:[]},2).wait(2));

	// cb
	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_93.setTransform(25,36.95);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_94.setTransform(27,34.95);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#02FFFF").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_95.setTransform(21,32.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_96.setTransform(25,28.95);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_97.setTransform(27,26.95);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#02FFFF").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_98.setTransform(29,22.95);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#02FFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_99.setTransform(31,18.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93}]}).to({state:[{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93}]},14).to({state:[]},2).to({state:[{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93}]},80).to({state:[]},2).wait(2));

	// cy
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFF05").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_100.setTransform(17.05,33.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_101.setTransform(13.05,28.95);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_102.setTransform(11.05,26.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFF05").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_103.setTransform(9.05,22.95);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFF05").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_104.setTransform(7.05,18.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100}]}).to({state:[{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100}]},14).to({state:[]},2).to({state:[{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100}]},80).to({state:[]},2).wait(2));

	// cdb
	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_105.setTransform(27,36.95);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_106.setTransform(29,34.95);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#0000FE").s().p("AgJAUIAAgnIATAAIAAAng");
	this.shape_107.setTransform(23,31.95);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_108.setTransform(27,28.95);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_109.setTransform(29,26.95);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#0000FE").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_110.setTransform(31,22.95);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#0000FE").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_111.setTransform(33,18.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105}]}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105}]},14).to({state:[]},1).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105}]},81).to({state:[]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(23,23,23,23.1);
// library properties:
lib.properties = {
	id: '08',
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
an.compositions['08'] = {
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