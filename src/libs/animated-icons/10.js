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


(lib.noga_pr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3.7,1,1).p("Ag+hnQB5CXAEAMQACAGgNAOQgQAQgCAI");
	this.shape.setTransform(33.3379,20);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3.7,1,1).p("AArBFQgGgQgOgaQgbgxgngt");
	this.shape_1.setTransform(-8.25,-9.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3.7,1,1).p("AhLA7QAJgZA2gnQAxgkAngR");
	this.shape_2.setTransform(43,20.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3.7,1,1).p("AhSA7QAygpBzhM");
	this.shape_3.setTransform(39.675,14.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(3.7,1,1).p("AhNA/QAygfAagTQAxgkAegn");
	this.shape_4.setTransform(35.775,8.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(3.7,1,1).p("AgyBIQgHgPgGgPQgKgfAKgFQAfgMAOghQAHgRADgPIBNAs");
	this.shape_5.setTransform(33.0936,7.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#61F1A2").s().p("Ag/AqQgKgfAKgFQAfgMAOghQAHgRADgPIBNAsIh3BjQgHgPgGgPg");
	this.shape_6.setTransform(33.0936,7.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3.7,1,1).p("ACUAdQggAGgvAcQgrAagMAQQgEAGgIgSQgRgsgEgIQgshchUg2");
	this.shape_7.setTransform(49.025,10.0408);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(3.7,1,1).p("AgIEbQAIA7hUgRQgSgHgNgJIgGgEQAgAvAmAIQAvAKA7gxQBEg4AUhFQAShCgWhZQgOg2gqhOQgwhTgQghQgkhJgmgpQg4g8gnAfIAiAgQApAoAiArQBJBbAtBeQAwBkgFBBQgIBrg/AeQgFADglALQgQAGABALg");
	this.shape_8.setTransform(54.0674,7.3741);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFEBF0").s().p("AgzFoQgmgIgggvIAGAEQANAJASAHQBUARgIg7QgBgLAQgGQAlgLAFgDQA/geAIhrQAFhBgwhkQgthehJhbQgigrgpgoIgiggQAngfA4A8QAmApAkBJQAQAhAwBTQAqBOAOA2QAWBZgSBCQgUBFhEA4QgyApgpAAQgIAAgHgCg");
	this.shape_9.setTransform(54.0674,7.3741);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(3.7,1,1).p("AnWgjIA/A9QBOBJBIA/QDnDHBVAIQAUABC5hlQBdgyBYgzQAZg0ABhBQABiCh4hAQiNAqhOAPQggAHh9iQIh4iRg");
	this.shape_10.setTransform(-22.6991,-5.9989);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3E3E54").s().p("AA7FxQhVgIjnjHQhIg/hOhJIg/g9IFGlNIB4CRQB9CQAggHQBOgPCNgqQB4BAgBCCQgBBBgZA0QhYAzhdAyQi2BkgWAAIgBAAg");
	this.shape_11.setTransform(-22.6991,-5.9989);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3.7,1,1).p("AhZCXIDmhaQAHgigDgpQgEhUgrgkQgOgNgVgCQgTgDgTAHIiqBB");
	this.shape_12.setTransform(21.3347,-2.145);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFEBF0").s().p("AiRhQICqhBQATgHATADQAVACAOANQArAkAEBUQADApgHAiIjmBag");
	this.shape_13.setTransform(21.3347,-2.145);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(3.7,1,1).p("AkCiEQgIg2AVgjQARgaArgcQBTg1A+gIQA9gJAWAoQAZAsBDBSQA7BIAhBHQA5B9glB2QgOAugaAhQgYAegYAGQg3APgBAAQgaAFgTgHQgsgPg/hqQgkg7gegwIgXgjQgPgGgWg+IgSg9");
	this.shape_14.setTransform(39.4909,6.0842);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#61F1A2").s().p("AA6FPQgsgPg/hqQgkg7gegwIgXgjQgPgGgWg+IgSg9IhBhLQgIg2AVgjQARgaArgcQBTg1A+gIQA9gJAWAoQAZAsBDBSQA7BIAhBHQA5B9glB2QgOAugaAhQgYAegYAGIg4APQgLACgLAAQgNAAgKgEg");
	this.shape_15.setTransform(39.4909,6.0842);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.noga_pr, new cjs.Rectangle(-71.6,-44.7,142.7,90.1), null);


(lib.noga_left = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3.7,1,1).p("AghAUIBDgn");
	this.shape.setTransform(-36.9,47.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(3.7,1,1).p("AA/hdIh9C7");
	this.shape_1.setTransform(0.775,-45.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3.7,1,1).p("AhqgfQAegRBBAQQBJAUAtA1");
	this.shape_2.setTransform(-27.725,41.8496);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3.7,1,1).p("AhrgbQAjgbBBAUQBDAVAwA5");
	this.shape_3.setTransform(-22.65,38.0995);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(3.7,1,1).p("AhngdQAGgVBLASQBSAUAsA1");
	this.shape_4.setTransform(-16.65,34.1292);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(3.7,1,1).p("AhIAIQAGgOAJgPQATgdAMgBQAUgBBQAdIgfBM");
	this.shape_5.setTransform(-14,27.9983);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#61F1A2").s().p("AhIAIQAGgOAJgPQASgdANgBQATgBBQAdIgeBMg");
	this.shape_6.setTransform(-14,27.9983);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3.7,1,1).p("AAoCTQgQghgsgsQgqgpgVgJQgPgGBbhRIBdhP");
	this.shape_7.setTransform(-14.7378,45.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(3.7,1,1).p("AlUhKQgWANgaAHQgNAKAKAsQAJAlA5AcQBIAjB4gCQBCgBBjgVQA2gLBegVQBcgRA6gcQBVgrgXg1QgkADgwAHQhgAQg6AZQiOBGg3AZQhbArg/gQQg5gOgnhOQgWgtgBgCQgMgSgMAHg");
	this.shape_8.setTransform(-15.1512,60.8583);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFEBF0").s().p("AlFBBQg5gcgJglQgKgsANgKQAagHAWgNQAMgHAMASIAXAvQAnBOA5AOQA/AQBbgrQA3gZCOhGQA6gZBggQQAwgHAkgDQAXA1hVArQg6AchcARQheAVg2ALQhjAVhCABIgQAAQhtAAhDghg");
	this.shape_9.setTransform(-15.1512,60.8583);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(3.7,1,1).p("AhnmpIh4CeQh3ChAAAUQAAAVgNDPQgHBogHBkIAmAYQAwAbAwAOQCZAuBghkQgDggAEg5QAIhxAjh3QAJggCYiDICXh9g");
	this.shape_10.setTransform(17.9,-28.0861);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3E3E54").s().p("AjrGbQgwgOgwgbIgmgYIAOjMQANjPAAgVQAAgUB3ihIB4ieIHZCtIiWB9QiZCDgJAgQgjB3gIBxQgEA5ADAgQhCBFhcAAQgrAAgwgPg");
	this.shape_11.setTransform(17.9,-28.0861);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3.7,1,1).p("AhriCIgZDaIAUALQAbAOAcAIQBYAZBJglIAdjl");
	this.shape_12.setTransform(-0.9,17.8952);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFEBF0").s().p("Ag6B5QgbgIgbgOIgUgLIAYjaIDxAKIgdDlQgsAWgwAAQghAAglgKg");
	this.shape_13.setTransform(-0.9,17.8952);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(3.7,1,1).p("ADijdQBDAJAeAXQAbAVAPAyQAgBsgIA0QgIA2g0AMQg3ANhxAxQhiAqhYAOQijAYhsgwQhfgpACg9QACg+BEgmQAsgWAZgNQAugZAigaQA/gxAtgsIAhgiQALgPBLgEQAmgCAkAB");
	this.shape_14.setTransform(-14.2202,45.3583);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#61F1A2").s().p("AkoDKQhfgpACg9QACg+BEgmIBFgjQAugZAigaQA/gxAtgsIAhgiQALgPBLgEQAmgCAkABIBfAMQBDAJAeAXQAbAVAPAyQAgBsgIA0QgIA2g0AMQg3ANhxAxQhiAqhYAOQg2AIgxAAQhgAAhIggg");
	this.shape_15.setTransform(-14.2202,45.3583);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.noga_left, new cjs.Rectangle(-56.7,-72.5,113.5,145), null);


(lib.lentaa = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#A3E7FF").ss(3.7,1,1).p("AsFkhIYLJC");
	this.shape.setTransform(-45.425,15.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#A3E7FF").ss(3.7,1,1).p("AG8CdIt2k5");
	this.shape_1.setTransform(-58.9,-6.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#A3E7FF").ss(3.7,1,1).p("AoFjMIQLGZ");
	this.shape_2.setTransform(-77.175,49.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#A3E7FF").ss(3.7,1,1).p("An6jRIP1Gj");
	this.shape_3.setTransform(-91.725,57.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7BBBBF").s().p("AG7H0I7wp6QgLgDAAgMQgBgMALgEIMrlVQAFgCAGACIc1I0QALADABAMQABALgKAFIscGVQgcAOgcAAQgUAAgVgIgABwB9IHNC3IHOjmIndiig");
	this.shape_4.setTransform(-16.6249,5.474);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7BBBBF").s().p("AKzE2I6pn0QgMgEAAgLQgBgMALgFIDphcQAFgCAGABIb7HeQALADABALQABAMgKAFIjwBtQgZANgbAAQgRAAgSgGgAIPDHIDKA2ICshXIjEgzg");
	this.shape_5.setTransform(128.1752,-65.2987);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#7BBBBF").s().p("AJmGPI72oaQgLgDgCgMQAAgMALgEII4joQAEgCAHACIbhIUQAKAEABALQABALgKAFInUDmQgbANgbAAQgSAAgSgFgAHdD2IC7A8ICLhAIi6g5gAuii1IUJGLICShCI0HmDg");
	this.shape_6.setTransform(67.9001,-37.9561);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7BBBBF").s().p("AJQHeI8Gq0QgKgEAAgMQgBgLALgFIJCjuQAFgDAHADIceKGQAKAEABALQABALgKAFIoCEXQgYAMgaACIgIAAQgXAAgVgIgAvYj9IFaCKIF2iyIlph0g");
	this.shape_7.setTransform(-109.1749,48.3534);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lentaa, new cjs.Rectangle(-230.9,-96.9,461.8,193.9), null);


(lib.green_glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3.7,1,1).p("ARIF1Qg6CriJB/QiFB6i8BCQi9BBjXgBQjfgCjchKQhuglhmg2QhhgyhbhCQjlirh3jHQiNjsAej7QARhdAohXQAnhUA7hKQCdjIDsheQDahWECAPQD0APDsBmQDsBnCuCoQBdBWBCBZQBJBgAwBpQAkBWAQBZQAhC5g5Cpg");
	this.shape.setTransform(0.0304,0.0153);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#78EE9F").s().p("ACwObQjfgCjchKQhuglhmg2QhhgyhbhCQjlirh3jHQiNjsAej7QARhdAohXQAnhUA7hKQCdjIDsheQDahWECAPQD0APDsBmQDsBnCuCoQBdBWBCBZQBJBgAwBpQAkBWAQBZQAhC5g5CpQg6CriJB/QiFB6i8BCQi5BAjSAAIgJAAg");
	this.shape_1.setTransform(0.0304,0.0153);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.green_glaz, new cjs.Rectangle(-115,-94.1,230.1,188.3), null);


(lib.glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3.7,1,1).p("AsbO3QgLhSAEiDQAHkFBGjyQBilSDRj7QEFk5GkieQEPhmEOgX");
	this.shape.setTransform(-91.3052,-70.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(3.7,1,1).p("AnaqGQGVCuEBFjQD/FdAgGe");
	this.shape_1.setTransform(117.125,-88.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("AgqkUQgIARgbAjQgUAhAGAaQAOA0AmA+QAWAkAuBEQBRB+gVBi");
	this.shape_2.setTransform(-161.3788,-30.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("Ai5hgQgVA7ANAYQAKARAnAGQA+AJALAEQAsAOAXAmQATAhAVgQQAOgKAcgvQAgg4ATgVQAigoAkgE");
	this.shape_3.setTransform(130.9646,77.3362);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("Ak5iHQBkg0AzADQAqADAXAvQAEAJAfBmQAZBQAlAzQBPBsB9gsQA/gVAvgr");
	this.shape_4.setTransform(139.1,49.7636);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("Ak+EHQCQgFBWiaQAcgxAihZQAphtANgbQATglAkgSQAcgNAvgFQAcgCA3gCQAxgDAdgM");
	this.shape_5.setTransform(-93.775,-114.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("AB8oVQAtAqgNAyQgKAlgxA1Qg5A7gXAdQglAwAHAjQArCLgvCjQgfBohgC2QgNAagBAnQAAAVABAo");
	this.shape_6.setTransform(-65.5789,-114.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("AAdGXQBTg6AIhLQAGg7gqhUQg6higbgwQgyhZgGg8QgFgmA2g8QA2g8gGgmQgHgqg1gEQhEAEgfAB");
	this.shape_7.setTransform(92.5431,-75.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFD4DE").ss(3.7,1,1).p("AG2noQgVA4guAuQgmAng7AkQgoAYhJAkQhSAogdARQhHAogsBDQgjA0gWBSQgNDEg1BlQhMCRitAA");
	this.shape_8.setTransform(66.575,-92.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(3.7,1,1).p("AdGgNQAGB+gQB9QgPB5ghB5QhREkiqD9QioD4juC4QjwC5kdBkQknBmk8AAQjnAAjeg4QjZg2jFhoQhhgzhbg/QjziQi1jfQitjWhlkLQhjkFgSkbQgTkbBCkQQAWhsAeheQAehbAihOQAjhQAuhQQD3m/IGjrQHVjWInAPQBnAEBfANQBlAPBfAXQBSAYBZAmQBxAwBlA8QFYDODoF5QDNFNBnG0QAYCDAFB6g");
	this.shape_9.setTransform(0.0031,0.0008);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFF0F7").s().p("Am6b8QjZg2jFhoQhhgzhbg/QjziQi1jfQitjWhlkLQhjkFgSkbQgTkbBCkQQAWhsAeheQAehbAihOQAjhQAuhQQD3m/IGjrQHVjWInAPQBnAEBfANQBlAPBfAXQBSAYBZAmQBxAwBlA8QFYDODoF5QDNFNBnG0QAYCDAFB6QAGB+gQB9QgPB5ghB5QhREkiqD9QioD4juC4QjwC5kdBkQknBmk8AAQjnAAjeg4g");
	this.shape_10.setTransform(0.0031,0.0008);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.glaz, new cjs.Rectangle(-188.2,-186.3,376.5,372.6), null);


// stage content:
(lib._10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(75));

	// phone_front
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Av2oYQA0klDkjBQDljCEqgEISQgRQBKgCBDAbQBCAbA1A0QA0AzAcBCQAbBCABBIIAAKjIh8A8IAArfQAAgvgSgsQgTgrgighQgigigtgSQgsgRgwAAIyQARQj/AEjCClQjCCkgsD6IkqaYIiJBBg");
	this.shape.setTransform(529.35,587.1961);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Av2oYQA0klDkjBQDkjCErgEISQgRQBJgCBEAbQBDAbA0A0QA0AzAcBCQAbBCABBIIAAKjIh8A8IAArfQAAgvgSgsQgTgrgighQgigigsgSQgtgRgwAAIyPARQj/AEjDClQjCCkgtD6IkqaYIiIBBg");
	this.shape_1.setTransform(529.35,587.1961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},74).wait(1));

	// pott
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00CCFF").s().p("AgbBPQgWgQgIgdQgFgTACgwQADg1AKgDQAPgEAmAfQAqAhAKAgQAIAcgMAaQgLAZgYAHQgHACgHAAQgQAAgQgMg");
	this.shape_2.setTransform(509.2596,213.1261);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00CCFF").s().p("AgeBbQgZgTgJghQgGgWADg3QADg9ALgEQARgEArAkQAwAmALAkQAJAhgNAeQgNAcgcAIQgIACgHAAQgSAAgSgNg");
	this.shape_3.setTransform(511.3962,217.0129);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00CCFF").s().p("AgiBmQgcgUgKgnQgGgXADg/QADhFANgEQASgEAxAoQA1AqAMApQALAlgPAiQgPAggeAIQgJADgJAAQgUAAgUgPg");
	this.shape_4.setTransform(513.5412,220.9018);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00CCFF").s().p("AglByQgggXgLgrQgHgaAEhGQADhNAPgEQAUgFA2AtQA6AvANAuQAMApgRAlQgPAkgiAJQgJADgKAAQgWAAgWgQg");
	this.shape_5.setTransform(515.6649,224.8089);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00CCFF").s().p("AgpB+QgigagMgvQgIgdAEhMQAEhVAQgFQAWgFA7AxQBAA0AOAzQANAtgSApQgSAngkALQgLACgKAAQgZAAgYgRg");
	this.shape_6.setTransform(517.7895,228.6901);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00CCFF").s().p("AgsCJQgmgcgNgzQgIggAEhTQAEhdASgFQAXgGBBA2QBFA4AQA4QANAxgTAtQgTArgoALQgLAEgMAAQgaAAgagUg");
	this.shape_7.setTransform(519.9345,232.5846);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00CCFF").s().p("AgwCVQgogegOg4QgJgiAEhbQAFhkASgGQAagHBFA6QBLA+ARA8QAPA2gVAxQgVAugrAMQgMAEgMAAQgdAAgcgVg");
	this.shape_8.setTransform(522.0711,236.4761);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00CCFF").s().p("Ag0CgQgqgggPg8QgKglAFhiQAFhsATgHQAcgHBKA/QBRBDASBBQAQA5gXA1QgWAyguANQgNAEgNAAQgfAAgfgXg");
	this.shape_9.setTransform(524.1949,240.3505);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00CCFF").s().p("Ag3CsQgugjgQhAQgKgoAFhpQAFh0AVgGQAegIBPBDQBWBIATBFQARA+gYA5QgXA2gyANQgOAEgOAAQghAAgggYg");
	this.shape_10.setTransform(526.3399,244.245);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00CCFF").s().p("Ag7C3QgxglgRhEQgLgrAGhwQAFh7AXgHQAfgJBVBIQBbBMAVBLQASBCgaA8QgZA6g0AOQgPAEgPAAQgjAAgjgag");
	this.shape_11.setTransform(528.4765,248.1465);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00CCFF").s().p("Ag+DDQg0gogShIQgMguAGh3QAGiDAYgIQAhgJBaBNQBgBRAWBPQATBGgbBAQgaA9g4AQQgQAFgPAAQgmAAgkgcg");
	this.shape_12.setTransform(530.5882,252.0333);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00CCFF").s().p("AhCDOQg3gpgThOQgMgvAGh/QAGiLAagIQAjgJBfBRQBmBVAXBUQAUBLgdBDQgcBBg6ARQgRAFgRAAQgnAAgngeg");
	this.shape_13.setTransform(532.7332,255.9222);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00CCFF").s().p("AhGDaQg5gsgUhSQgNgyAGiGQAHiTAagIQAlgKBkBVQBsBbAYBZQAVBOgeBIQgdBEg+ASQgSAFgRAAQgqAAgpgfg");
	this.shape_14.setTransform(534.8698,259.8089);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00CCFF").s().p("Ag/DRQg3gogUhNQgOgxAGh9QAGiHAagPQAlgRBbBNQBjBSAaBYQAXBNgcBGQgaBCg7ATQgTAGgSAAQgmAAglgbg");
	this.shape_15.setTransform(537.8462,268.124);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00CCFF").s().p("Ag4DJQg1gkgVhJQgPgvAGh1QAFh8AbgVQAjgYBTBFQBbBJAbBWQAZBMgZBEQgXBBg3AUQgUAIgUAAQghAAgigXg");
	this.shape_16.setTransform(540.8163,276.4139);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00CCFF").s().p("AgyDBQgygggWhEQgQguAGhsQAFhwAbgcQAigfBLA8QBRBBAdBTQAcBMgXBDQgUA+g0AWQgVAJgWAAQgdAAgegTg");
	this.shape_17.setTransform(543.8109,284.6505);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00CCFF").s().p("AgrC6QgxgcgVg/QgRgtAFhkQAEhkAbgiQAigmBCA0QBJA3AfBSQAdBLgUBBQgSA8gwAYQgWAKgWAAQgZAAgbgPg");
	this.shape_18.setTransform(546.8102,292.8339);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00CCFF").s().p("AgkC0QgvgYgWg8QgSgrAFhbQAEhZAbgpQAhgsA5ArQBBAvAgBPQAfBLgQA/QgQA6gtAZQgXANgYAAQgVAAgWgLg");
	this.shape_19.setTransform(549.8386,300.9692);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00CCFF").s().p("AgeCuQgtgUgWg3QgTgrAEhSQAEhNAbgvQAgg0AxAjQA4AmAhBOQAiBKgOA9QgNA4gpAbQgYAPgZAAQgRAAgTgIg");
	this.shape_20.setTransform(552.862,309.0302);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00CCFF").s().p("AgYCoQgqgQgWgzQgVgpAEhJQAEhCAag1QAgg7ApAbQAvAdAjBLQAjBKgLA7QgKA3gmAcQgZASgaAAQgOAAgPgGg");
	this.shape_21.setTransform(555.8975,317.0555);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00CCFF").s().p("AgSCjQgogMgXguQgVgoADhBQADg2Abg8QAfhBAgASQAmAVAlBJQAmBJgJA6QgHA0gjAdQgZAVgbAAQgKAAgMgDg");
	this.shape_22.setTransform(558.9527,325.0448);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00CCFF").s().p("AgMCeQgmgIgXgpQgXgnAEg5QACgqAbhCQAehJAYAKQAeAMAmBHQAnBKgFA3QgFAygfAfQgaAZgdAAIgOgCg");
	this.shape_23.setTransform(562.0101,332.9638);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00CCFF").s().p("AgGCaQgkgEgXglQgYglADgxQACgeAbhIQAdhQAQACQAVADAnBFQAqBJgDA1QgCAwgcAhQgaAcgfAAIgGAAg");
	this.shape_24.setTransform(565.093,340.8409);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00CCFF").s().p("AgGCUQgigEgXgjQgWgkADgvQACgdAahFQAbhMAPABQAUADAmBCQAoBGgCAzQgCAugbAgQgZAbgeAAIgGAAg");
	this.shape_25.setTransform(565.0897,347.1416);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00CCFF").s().p("AgGCNQgggDgWgiQgVgiACgtQACgbAZhDQAbhJAOACQATACAkBAQAnBDgDAxQgCAsgaAdQgXAagdAAIgGAAg");
	this.shape_26.setTransform(565.0728,353.4421);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#00CCFF").s().p("AgFCHQgfgEgVggQgVghADgrQACgaAXg/QAahGANACQATACAiA9QAlBAgDAuQgBAqgZAdQgWAZgcAAIgFAAg");
	this.shape_27.setTransform(565.0889,359.7629);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#00CCFF").s().p("AgFCAQgegDgTgfQgUgfADgpQABgYAXg9QAYhCANABQARADAhA5QAjA9gCAsQgCAogXAbQgWAZgaAAIgFgBg");
	this.shape_28.setTransform(565.0941,366.0591);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00CCFF").s().p("AgFB6QgcgDgTgeQgSgdACgnQACgXAVg6QAXg/AMACQARACAfA3QAhA5gCArQgCAlgWAaQgUAXgZAAIgFAAg");
	this.shape_29.setTransform(565.0689,372.3596);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00CCFF").s().p("AgEBzQgbgDgSgbQgRgcACglQABgWAVg2QAVg8AMABQAQACAdA0QAfA3gCAoQgBAkgVAYQgTAWgYAAIgEgBg");
	this.shape_30.setTransform(565.0708,378.6602);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00CCFF").s().p("AgEBtQgZgDgRgaQgRgaACgjQACgVATgzQAVg5AKACQAPACAcAxQAeAzgCAmQgCAigUAXQgSAUgWAAIgEAAg");
	this.shape_31.setTransform(565.0705,384.9606);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#00CCFF").s().p("AgEBnQgYgDgPgZQgQgYACghQACgUARgwQAUg1AKABQAOACAaAuQAcAxgCAjQgBAggTAWQgRATgVAAIgEAAg");
	this.shape_32.setTransform(565.0702,391.2585);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00CCFF").s().p("AgEBgQgWgCgPgYQgOgWACgfQABgSARguQASgxAKAAQAMACAZArQAaAugCAhQgBAegRAUQgRATgTAAIgEgBg");
	this.shape_33.setTransform(565.0699,397.5588);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#00CCFF").s().p("AgDBaQgVgDgOgVQgNgWABgcQACgRAPgqQARgvAJABQAMACAXAoQAYArgBAeQgBAcgRATQgPARgSAAIgDAAg");
	this.shape_34.setTransform(565.0718,403.8595);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00CCFF").s().p("AgCBTQgUgCgNgUQgMgUABgaQACgQAOgnQAQgrAIAAQALACAVAlQAXAogCAdQAAAZgQASQgNAQgRAAIgDgBg");
	this.shape_35.setTransform(565.0467,410.1602);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00CCFF").s().p("AgDBNQgSgCgLgTQgMgSABgYQACgPANgkQAPgoAHABQAKABAUAjQAVAkgCAbQgBAXgOARQgMAOgQAAIgDAAg");
	this.shape_36.setTransform(565.051,416.4563);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#00CCFF").s().p("AgCBHQgRgCgLgRQgKgRABgXQABgNAMghQAOgkAHAAQAJACASAfQATAigBAYQgBAVgNAQQgMANgOAAIgCAAg");
	this.shape_37.setTransform(565.0681,422.778);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#00CCFF").s().p("AgCBAQgPgCgKgPQgJgPABgVQABgLALgeQAMgiAGABQAJABAQAdQARAegBAWQgBAUgLANQgLAMgNAAIgCAAg");
	this.shape_38.setTransform(565.0512,429.0782);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#00CCFF").s().p("AgBA6QgOgCgJgOQgIgNABgTQABgKAKgbQALgeAFAAQAIABAOAaQAQAcgBATQgBASgKAMQgKALgMAAIgBAAg");
	this.shape_39.setTransform(565.0478,435.3786);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},28).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[]},1).wait(9));

	// black_glaz
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgOGgQhNgJhQgZQhogihXg4QjyinAOi7QARhnA3hTQA7haBXgoQCphADBAbQC7AaCdBpQCaBmBTCbQAfBSgPBQQgYBahCBAQhYBWiWAhQhNAQhQAAQg6AAg6gIg");
	this.shape_40.setTransform(400.6726,418.6426);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgZGdQhMgKhPgcQhmglhWg6QjrisASi5QAUhmA5hSQA9hYBYglQCpg7C/AgQC6AfCZBtQCWBpBPCdQAdBSgSBPQgaBZhDA+QhaBTiWAdQhDAMhFAAQhEAAhEgMg");
	this.shape_41.setTransform(398.5655,407.9217);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgjGaQhMgMhOgeQhkgnhUg8QjliyAXi4QAXhlA6hPQBAhWBYgiQCqg3C9AlQC5AlCVBwQCSBsBKCeQAbBTgUBPQgdBXhEA8QhcBQiWAYQg5AKg7AAQhNAAhNgRg");
	this.shape_42.setTransform(396.446,407.2142);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AguGYQhLgOhNggQhjgqhRg+Qjgi3Adi3QAZhkA9hNQBBhUBZggQCrgxC7AqQC2ApCSB0QCPBwBFCfQAYBUgWBNQgfBWhFA6QheBOiWAUQgvAGgwAAQhXAAhXgVg");
	this.shape_43.setTransform(394.3399,406.4954);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Ag5GVQhKgQhMgiQhhgshPhAQjai9Ahi2QAchiA/hMQBEhRBYgeQCtgsC5AvQC0AuCOB4QCMB0BACgQAVBUgXBNQghBUhHA4QhgBLiWAPQglAEgmAAQhhAAhggag");
	this.shape_44.setTransform(392.2224,405.7698);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhEGTQhJgThLgkQhggvhNhCQjUjCAni0QAehiBBhJQBGhQBZgbQCtgnC3A0QCzAzCLB8QCHB3A8ChQATBVgaBMQgjBThJA2QhhBIiWALQgbACgbAAQhrAAhqgfg");
	this.shape_45.setTransform(390.1053,405.0531);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhPGQQhJgVhJglQhegyhLhEQjOjIArizQAhhgBDhIQBIhNBagYQCugjC1A5QCxA5CHB/QCEB6A3CjQAQBVgcBLQglBShKA0QhjBFiWAHIggABQh2AAh0gmg");
	this.shape_46.setTransform(388.0017,404.361);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhZGOQhIgXhIgoQhdg0hJhGQjIjOAwixQAkhfBEhGQBLhLBagWQCvgdCzA+QCwA9CCCDQCBB+AyCkQAOBWgeBKQgoBRhLAxQhlBCiWADIgOAAQh/AAh7gsg");
	this.shape_47.setTransform(385.8994,403.6334);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("ACjG/QiGgBiBgzQhHgZhHgpQhbg3hIhJQjCjSA2iwQAmhfBHhEQBMhIBbgUQCvgYCyBDQCtBCCACHQB8CCAuClQAMBWghBJQgqBQhMAvQhlA+iRAAIgHAAg");
	this.shape_48.setTransform(383.7751,402.9255);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("ACXHEQiGgFh/g2QhHgbhGgsQhag5hFhLQi9jYA7iuQApheBJhCQBOhGBcgRQCwgUCwBJQCrBHB8CKQB5CGApCmQAJBXgiBIQgtBPhNAsQhgA4iFAAIgagBg");
	this.shape_49.setTransform(381.6743,402.1963);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("ACLHJQiGgJh+g7QhHgchEguQhYg8hEhNQi2jdBAitQArhdBLhAQBQhEBdgOQCwgPCvBOQCpBMB4CNQB1CJAlCpQAHBWglBIQgvBNhPArQhbAxh6AAIgrgBg");
	this.shape_50.setTransform(379.5755,401.5093);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AB+HOQiEgNh+g+QhGgehDgwQhXg/hBhPQixjjBFirQAvhcBMg+QBShCBegMQCxgJCsBSQCoBRB0CSQByCMAfCqQAFBXgnBGQgxBNhQAoQhXAshwAAQgdAAgfgDg");
	this.shape_51.setTransform(377.4588,400.793);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AByHTQiFgRh8hCQhFgghCgyQhVhBg/hRQirjpBKiqQAxhaBOg8QBVhBBdgJQCzgECqBYQCmBVBwCVQBvCRAaCrQACBXgoBGQgzBLhSAmQhSAnhnAAQgkAAgogFg");
	this.shape_52.setTransform(375.3622,400.0568);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("ABmHYQiFgUh7hGQhEgihBg0QhUhEg9hTQiljuBPipQA0hZBQg6QBXg+BegHQCzAACpBdQCkBbBsCZQBrCTAWCtQAABYgrBEQg1BKhUAkQhNAihfAAQgrAAgvgHg");
	this.shape_53.setTransform(373.2711,399.3266);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("ABaHdQiFgYh5hKQhEgkg/g2QhThGg7hVQifj0BUioQA3hYBSg4QBZg8BegEQC0AGCnBiQCiBfBpCcQBnCXARCvQgCBYgtBEQg4BIhUAiQhJAehXAAQgyAAg3gKg");
	this.shape_54.setTransform(371.1482,398.6209);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("ABOHiQiFgch4hNQhDgng+g4QhRhJg5hXQiZj5BZimQA5hXBUg2QBbg6BfgCQC0ALCmBnQCgBkBlCgQBkCaAMCwQgFBZgvBDQg6BHhWAgQhEAahPAAQg4AAg/gNg");
	this.shape_55.setTransform(369.0384,397.92);
	this.shape_55._off = true;

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("ABaHdQiFgYh5hKQhEgkhAg2QhShGg7hVQifj0BUioQA2hYBSg4QBZg8BfgEQC0AGCnBiQCiBfBpCcQBnCXARCvQgCBYgtBEQg4BIhVAiQhIAehWAAQgzAAg3gKg");
	this.shape_56.setTransform(365.9345,406.7209);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AByHTQiEgRh9hCQhFgghCgyQhVhBg/hRQirjpBKiqQAxhaBOg8QBVhBBegJQCygECqBYQCmBVBwCVQBvCRAaCrQADBXgpBGQgzBLhSAmQhSAnhnAAQgkAAgogFg");
	this.shape_57.setTransform(370.8752,407.3568);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AB+HOQiFgNh9g+QhGgehDgwQhXg/hBhPQixjjBFirQAvhcBMg+QBShCBdgMQCygJCsBSQCoBRB0CSQByCMAfCqQAFBXgnBGQgxBNhQAoQhXAshwAAQgdAAgfgDg");
	this.shape_58.setTransform(373.3539,407.693);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("ACLHJQiGgJh+g7QhGgchFguQhYg8hDhNQi3jdBAitQAshdBKhAQBQhEBdgOQCxgPCuBOQCpBMB4CNQB2CJAkCpQAHBWglBIQguBNhQArQhbAxh6AAIgrgBg");
	this.shape_59.setTransform(375.8368,408.0093);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("ACXHEQiGgFiAg2QhHgbhFgsQhag5hFhLQi9jYA7iuQApheBJhCQBOhGBcgRQCwgUCwBJQCrBHB8CKQB5CGApCmQAJBXgiBIQgtBPhOAsQhfA4iFAAIgagBg");
	this.shape_60.setTransform(378.3243,408.2963);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("ACjG/QiGgBiBgzQhHgZhHgpQhbg3hIhJQjCjSA2iwQAmhfBHhEQBMhIBbgUQCvgYCyBDQCuBCB/CHQB8CCAuClQAMBWggBJQgrBQhMAvQhlA+iRAAIgHAAg");
	this.shape_61.setTransform(380.7988,408.6255);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhZGOQhIgXhIgoQhdg0hJhGQjJjOAxixQAkhfBEhGQBLhLBagWQCvgdCzA+QCvA9CDCDQCBB+AyCkQAOBWgeBKQgoBRhLAxQhlBCiWADIgOAAQh+AAh8gsg");
	this.shape_62.setTransform(383.2775,408.9334);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhOGQQhJgVhJglQhfgyhLhEQjOjIArizQAhhgBDhIQBIhNBagYQCugjC1A5QCxA5CHB/QCEB6A3CjQAQBVgcBLQglBShKA0QhjBFiWAHIggABQh2AAhzgmg");
	this.shape_63.setTransform(385.7517,409.261);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhDGTQhKgThKgkQhggvhOhCQjUjCAni0QAehiBBhJQBGhQBagbQCsgnC4A0QCzAzCKB8QCHB3A8ChQATBVgaBMQgjBThIA2QhiBIiWALQgbACgbAAQhrAAhpgfg");
	this.shape_64.setTransform(388.2481,409.5531);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("Ag5GVQhKgQhMgiQhhgshPhAQjai9Ahi2QAchiA/hMQBEhRBZgeQCsgsC5AvQC0AuCOB4QCMB0BACgQAWBUgYBNQghBUhHA4QhgBLiWAPQglAEgmAAQhgAAhhgag");
	this.shape_65.setTransform(390.7349,409.8698);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AguGYQhLgOhNggQhjgqhRg+Qjgi3Adi3QAZhkA8hNQBChUBYggQCsgxC7AqQC2ApCSB0QCPBwBFCfQAYBUgWBNQgfBWhFA6QheBOiWAUQgvAGgwAAQhXAAhXgVg");
	this.shape_66.setTransform(393.2224,410.1954);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgZGdQhMgKhPgcQhmglhVg6QjsisATi5QAThmA5hSQA+hYBXglQCqg7C+AgQC6AfCaBtQCWBpBOCdQAdBSgSBPQgaBZhDA+QhaBTiWAdQhDAMhFAAQhEAAhEgMg");
	this.shape_67.setTransform(398.1871,410.8218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40}]}).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42,p:{x:396.446,y:407.2142}}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53,p:{x:373.2711,y:399.3266}}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_53,p:{x:368.4211,y:407.0266}}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_42,p:{x:395.696,y:410.5142}}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1).to({y:417.8926},0).wait(1).to({y:417.0926},0).wait(1).to({y:416.3426},0).wait(1).to({y:415.5426},0).wait(1).to({y:414.7926},0).wait(1).to({y:414.0426},0).wait(1).to({y:413.2426},0).wait(1).to({y:412.4926},0).wait(1).to({y:411.7426},0).wait(1).to({y:410.9426},0).wait(1).to({y:410.1926},0).wait(1).to({y:409.3926},0).wait(1).to({y:408.6426},0).to({_off:true},1).wait(44).to({_off:false,y:411.1426},0).wait(1).to({y:411.5926},0).wait(1).to({y:412.0926},0).wait(1).to({y:412.5426},0).wait(1).to({y:413.0426},0).wait(1).to({y:413.4926},0).wait(1).to({y:413.9426},0).wait(1).to({y:414.4426},0).wait(1).to({y:414.8926},0).wait(1).to({y:415.3426},0).wait(1).to({y:415.8426},0).wait(1).to({y:416.2926},0).wait(1).to({y:416.7926},0).wait(1).to({y:417.2426},0).wait(1).to({y:417.6926},0).wait(1).to({y:418.1926},0).wait(1).to({y:418.6426},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_55).wait(28).to({_off:false},0).wait(1).to({x:368.6884,y:398.47},0).wait(1).to({x:368.2884,y:399.07},0).wait(1).to({x:367.9384,y:399.62},0).wait(1).to({x:367.5384,y:400.17},0).wait(1).to({x:367.1884,y:400.77},0).wait(1).to({x:366.7884,y:401.32},0).wait(1).to({x:366.4384,y:401.87},0).wait(1).to({x:366.0384,y:402.47},0).wait(1).to({x:365.6884,y:403.02},0).wait(1).to({x:365.2884,y:403.57},0).wait(1).to({x:364.9384,y:404.17},0).wait(1).to({x:364.5384,y:404.72},0).wait(1).to({x:364.1884,y:405.27},0).wait(1).to({x:363.7884,y:405.87},0).wait(1).to({x:363.4384,y:406.42},0).to({_off:true},1).wait(31));

	// green_glaz
	this.instance = new lib.green_glaz();
	this.instance.setTransform(410.55,385.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:375.05},13).to({regX:0.1,regY:0.1,rotation:21.4496,x:385.6,y:366.1},15).to({regX:0,regY:0,rotation:14.9992,x:386.05,y:378.3},15).to({rotation:0,x:410.55,y:377.55},15).to({y:385.05},16).wait(1));

	// glaz
	this.instance_1 = new lib.glaz();
	this.instance_1.setTransform(444.5,310.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:300.75},13).to({y:310.75},15).to({y:318.25},15).to({y:303.25},15).to({y:310.75},16).wait(1));

	// p_3
	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(3.7,1,1).p("AkbBiIDehVQDyhXBngX");
	this.shape_68.setTransform(561.8,88.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(3.7,1,1).p("AkABYIDJhMQDbhPBdgU");
	this.shape_69.setTransform(565.175,87.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").ss(3.7,1,1).p("AjlBPIC0hEQDDhHBUgS");
	this.shape_70.setTransform(568.525,86.175);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(3.7,1,1).p("AjKBGICfg8QCsg+BKgR");
	this.shape_71.setTransform(571.9,85.125);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(3.7,1,1).p("AiuA8ICJgzQCUg2BAgO");
	this.shape_72.setTransform(575.275,84.05);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").ss(3.7,1,1).p("AiTAzIB0gsQB+gtA1gM");
	this.shape_73.setTransform(578.6,83);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(3.7,1,1).p("Ah4AqIBfgkQBmglAsgK");
	this.shape_74.setTransform(581.975,81.925);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").ss(3.7,1,1).p("AhdAgIBKgbQBOgcAjgI");
	this.shape_75.setTransform(585.35,80.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(3.7,1,1).p("AhBAXIA0gTQA3gUAYgG");
	this.shape_76.setTransform(588.7,79.8);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(3.7,1,1).p("Ag2AXIArgTQAugUAVgG");
	this.shape_77.setTransform(512.55,108.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(3.7,1,1).p("AhOAeIA+gZQBBgbAegH");
	this.shape_78.setTransform(517.475,106.3);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#000000").ss(3.7,1,1).p("AhkAmIBPghQBVggAlgK");
	this.shape_79.setTransform(522.4,104.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(3.7,1,1).p("Ah7AtIBhgmQBpgpAtgK");
	this.shape_80.setTransform(527.325,102.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").ss(3.7,1,1).p("AiSA1IBzgtQB9gvA1gN");
	this.shape_81.setTransform(532.25,100.3);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").ss(3.7,1,1).p("AipA8ICFgzQCQg2A+gO");
	this.shape_82.setTransform(537.175,98.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#000000").ss(3.7,1,1).p("AjABEICXg6QCkg8BGgR");
	this.shape_83.setTransform(542.1,96.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(3.7,1,1).p("AjXBLICphBQC3hDBPgR");
	this.shape_84.setTransform(547.025,94.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(3.7,1,1).p("AjuBTIC7hHQDLhKBWgU");
	this.shape_85.setTransform(551.95,92.3);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#000000").ss(3.7,1,1).p("AkFBaIDNhNQDehRBggV");
	this.shape_86.setTransform(556.875,90.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68}]}).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_68}]},1).to({state:[]},1).to({state:[{t:this.shape_68}]},13).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_68}]},1).to({state:[]},1).to({state:[{t:this.shape_68}]},19).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_68}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_68).to({_off:true},1).wait(8).to({_off:false,scaleX:0.1364,scaleY:0.1364,x:592.0812,y:78.7492},0).to({_off:true},1).wait(13).to({_off:false,scaleX:0.1202,scaleY:0.1202,rotation:-6.1884,x:507.6021,y:110.2931},0).to({_off:true},1).wait(10).to({_off:false,scaleX:1,scaleY:1,rotation:0,x:561.8,y:88.3},0).to({_off:true},1).wait(8).to({_off:false,scaleX:0.1364,scaleY:0.1364,x:592.0812,y:78.7492},0).to({_off:true},1).wait(19).to({_off:false,scaleX:0.1202,scaleY:0.1202,rotation:-6.1884,x:507.6021,y:110.2931},0).to({_off:true},1).wait(10).to({_off:false,scaleX:1,scaleY:1,rotation:0,x:561.8,y:88.3},0).wait(1));

	// p_2
	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#000000").ss(3.7,1,1).p("AlmCdILNk5");
	this.shape_87.setTransform(690.6,354.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#000000").ss(3.7,1,1).p("AlYCXIKxkt");
	this.shape_88.setTransform(692.625,353.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#000000").ss(3.7,1,1).p("AlKCRIKVkh");
	this.shape_89.setTransform(694.625,352.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#000000").ss(3.7,1,1).p("Ak9CLIJ7kV");
	this.shape_90.setTransform(696.65,351.5);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(3.7,1,1).p("AkvCFIJfkJ");
	this.shape_91.setTransform(698.675,350.575);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(3.7,1,1).p("AkiB/IJEj9");
	this.shape_92.setTransform(700.7,349.65);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(3.7,1,1).p("AkUB5IIpjx");
	this.shape_93.setTransform(702.7,348.725);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(3.7,1,1).p("AkGBzIINjl");
	this.shape_94.setTransform(704.725,347.825);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(3.7,1,1).p("Aj5BuIHzja");
	this.shape_95.setTransform(706.725,346.9);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(3.7,1,1).p("AjrBnIHXjN");
	this.shape_96.setTransform(708.75,345.975);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(3.7,1,1).p("AjeBiIG9jD");
	this.shape_97.setTransform(710.775,345.05);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(3.7,1,1).p("AjQBcIGhi2");
	this.shape_98.setTransform(712.8,344.15);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(3.7,1,1).p("AjCBWIGGir");
	this.shape_99.setTransform(714.8,343.2);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(3.7,1,1).p("AiuBMIFdiX");
	this.shape_100.setTransform(719.525,341.175);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(3.7,1,1).p("AinBJIFPiR");
	this.shape_101.setTransform(722.2,340.075);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(3.7,1,1).p("AigBGIFAiL");
	this.shape_102.setTransform(724.9,338.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#000000").ss(3.7,1,1).p("AiYBDIExiF");
	this.shape_103.setTransform(727.625,337.85);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(3.7,1,1).p("AiRBAIEjh/");
	this.shape_104.setTransform(730.3,336.7);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#000000").ss(3.7,1,1).p("AiKA9IEVh5");
	this.shape_105.setTransform(733,335.6);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#000000").ss(3.7,1,1).p("AiDA6IEHhz");
	this.shape_106.setTransform(735.7,334.475);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#000000").ss(3.7,1,1).p("Ah8A3ID5ht");
	this.shape_107.setTransform(738.4,333.375);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(3.7,1,1).p("Ah1AzIDrhl");
	this.shape_108.setTransform(741.075,332.25);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#000000").ss(3.7,1,1).p("AhuAwIDdhf");
	this.shape_109.setTransform(743.775,331.125);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(3.7,1,1).p("AhnAtIDPhZ");
	this.shape_110.setTransform(746.475,330.025);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#000000").ss(3.7,1,1).p("AhfAqIC/hT");
	this.shape_111.setTransform(749.175,328.9);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(3.7,1,1).p("AhYAnICxhN");
	this.shape_112.setTransform(751.875,327.775);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#000000").ss(3.7,1,1).p("AhRAkICjhH");
	this.shape_113.setTransform(754.575,326.65);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(3.7,1,1).p("AhKAhICVhB");
	this.shape_114.setTransform(757.25,325.55);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#000000").ss(3.7,1,1).p("AihBlQBegzDliX");
	this.shape_115.setTransform(664.9239,404.0481,0.0833,0.0833);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(3.7,1,1).p("AgiAWQAUgMAxgf");
	this.shape_116.setTransform(668.2,402.35);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#000000").ss(3.7,1,1).p("Ag3AjQAhgRBOg0");
	this.shape_117.setTransform(671.425,400.65);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(3.7,1,1).p("AhNAwQAtgYBuhI");
	this.shape_118.setTransform(674.7,398.95);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#000000").ss(3.7,1,1).p("AhiA9QA6geCKhb");
	this.shape_119.setTransform(677.95,397.25);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(3.7,1,1).p("Ah3BLQBGgmCphv");
	this.shape_120.setTransform(681.225,395.55);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#000000").ss(3.7,1,1).p("AiMBYQBSgsDHiD");
	this.shape_121.setTransform(684.45,393.85);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(3.7,1,1).p("AiXBfQBZgwDViN");
	this.shape_122.setTransform(692.2,389.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#000000").ss(3.7,1,1).p("AiBBRQBMgpC3h5");
	this.shape_123.setTransform(701.175,384.7);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(3.7,1,1).p("Ah3BKQBGglCohu");
	this.shape_124.setTransform(705.65,382.2);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#000000").ss(3.7,1,1).p("AhsBEQBAgiCZhl");
	this.shape_125.setTransform(710.125,379.7);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(3.7,1,1).p("AhhA9QA5geCKhb");
	this.shape_126.setTransform(714.6,377.225);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#000000").ss(3.7,1,1).p("AhWA2QAygbB7hQ");
	this.shape_127.setTransform(719.125,374.75);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(3.7,1,1).p("AhLAwQArgYBshH");
	this.shape_128.setTransform(723.6,372.275);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#000000").ss(3.7,1,1).p("AhBApQAmgUBdg9");
	this.shape_129.setTransform(728.075,369.775);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(3.7,1,1).p("Ag2AiQAggRBNgy");
	this.shape_130.setTransform(732.55,367.275);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#000000").ss(3.7,1,1).p("AgrAcQAZgOA/gp");
	this.shape_131.setTransform(737.05,364.8);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(3.7,1,1).p("AghAVQATgKAwgf");
	this.shape_132.setTransform(741.525,362.3);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#000000").ss(3.7,1,1).p("AglAQIBLgf");
	this.shape_133.setTransform(623.575,384);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(3.7,1,1).p("Ag6AaIB1gz");
	this.shape_134.setTransform(628.025,382);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#000000").ss(3.7,1,1).p("AhPAjICfhF");
	this.shape_135.setTransform(632.5,380.025);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(3.7,1,1).p("AhlAsIDLhX");
	this.shape_136.setTransform(637,378.05);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#000000").ss(3.7,1,1).p("Ah7A2ID2hr");
	this.shape_137.setTransform(641.45,376.05);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(3.7,1,1).p("AiQA/IEhh9");
	this.shape_138.setTransform(645.925,374.075);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#000000").ss(3.7,1,1).p("AilBJIFLiR");
	this.shape_139.setTransform(650.375,372.075);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(3.7,1,1).p("Ai7BSIF3ij");
	this.shape_140.setTransform(654.85,370.125);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#000000").ss(3.7,1,1).p("AjlBlIHLjJ");
	this.shape_141.setTransform(663.775,366.15);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(3.7,1,1).p("Aj6BuIH1jb");
	this.shape_142.setTransform(668.25,364.175);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#000000").ss(3.7,1,1).p("AkQB3IIhjt");
	this.shape_143.setTransform(672.75,362.2);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(3.7,1,1).p("AkmCBIJMkB");
	this.shape_144.setTransform(677.2,360.2);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#000000").ss(3.7,1,1).p("Ak7CKIJ3kT");
	this.shape_145.setTransform(681.675,358.225);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(3.7,1,1).p("AlQCUIKhkn");
	this.shape_146.setTransform(686.125,356.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87}]}).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98,p:{x:712.8,y:344.15}}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_87}]},1).to({state:[]},1).to({state:[{t:this.shape_115,p:{scaleX:0.0833,scaleY:0.0833,x:664.9239,y:404.0481}}]},3).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121,p:{x:684.45,y:393.85}}]},1).to({state:[{t:this.shape_115,p:{scaleX:1,scaleY:1,x:687.725,y:392.15}}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_121,p:{x:696.675,y:387.175}}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_115,p:{scaleX:0.1417,scaleY:0.1417,x:745.9835,y:359.8335}}]},1).to({state:[]},1).to({state:[{t:this.shape_87}]},4).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_98,p:{x:659.325,y:368.15}}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_87}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_87).to({_off:true},1).wait(12).to({_off:false,scaleX:0.5066,scaleY:0.5066,x:716.829,y:342.3114},0).to({_off:true},1).wait(15).to({_off:false,scaleX:0.1895,scaleY:0.1895,x:759.9489,y:324.4071},0).to({_off:true},1).wait(28).to({_off:false,scaleX:0.0456,scaleY:0.0456,x:619.0959,y:385.9784},0).to({_off:true},1).wait(15).to({_off:false,scaleX:1,scaleY:1,x:690.6,y:354.25},0).wait(1));

	// p_1
	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000000").ss(3.7,1,1).p("AihBlQBegzDliX");
	this.shape_147.setTransform(687.725,392.15);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(3.7,1,1).p("AiXBfQBZgwDViN");
	this.shape_148.setTransform(692.2,389.675);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#000000").ss(3.7,1,1).p("AiMBYQBSgsDHiD");
	this.shape_149.setTransform(696.675,387.175);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(3.7,1,1).p("AiBBRQBMgpC3h5");
	this.shape_150.setTransform(701.175,384.7);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(3.7,1,1).p("Ah3BKQBGglCohu");
	this.shape_151.setTransform(705.65,382.2);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(3.7,1,1).p("AhsBEQBAgiCZhl");
	this.shape_152.setTransform(710.125,379.7);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(3.7,1,1).p("AhhA9QA5geCKhb");
	this.shape_153.setTransform(714.6,377.225);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(3.7,1,1).p("AhWA2QAygbB7hQ");
	this.shape_154.setTransform(719.125,374.75);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(3.7,1,1).p("AhLAwQArgYBshH");
	this.shape_155.setTransform(723.6,372.275);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(3.7,1,1).p("AhBApQAmgUBdg9");
	this.shape_156.setTransform(728.075,369.775);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#000000").ss(3.7,1,1).p("Ag2AiQAggRBNgy");
	this.shape_157.setTransform(732.55,367.275);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(3.7,1,1).p("AgrAcQAZgOA/gp");
	this.shape_158.setTransform(737.05,364.8);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(3.7,1,1).p("AghAVQATgKAwgf");
	this.shape_159.setTransform(741.525,362.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#000000").ss(3.7,1,1).p("AlmCdILNk5");
	this.shape_160.setTransform(619.0959,385.9784,0.0456,0.0456);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#000000").ss(3.7,1,1).p("AglAQIBLgf");
	this.shape_161.setTransform(623.575,384);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(3.7,1,1).p("Ag6AaIB1gz");
	this.shape_162.setTransform(628.025,382);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(3.7,1,1).p("AhPAjICfhF");
	this.shape_163.setTransform(632.5,380.025);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#000000").ss(3.7,1,1).p("AhlAsIDLhX");
	this.shape_164.setTransform(637,378.05);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#000000").ss(3.7,1,1).p("Ah7A2ID2hr");
	this.shape_165.setTransform(641.45,376.05);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(3.7,1,1).p("AiQA/IEhh9");
	this.shape_166.setTransform(645.925,374.075);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(3.7,1,1).p("AilBJIFLiR");
	this.shape_167.setTransform(650.375,372.075);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").ss(3.7,1,1).p("Ai7BSIF3ij");
	this.shape_168.setTransform(654.85,370.125);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(3.7,1,1).p("AjQBcIGhi2");
	this.shape_169.setTransform(659.325,368.15);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").ss(3.7,1,1).p("AjlBlIHLjJ");
	this.shape_170.setTransform(663.775,366.15);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").ss(3.7,1,1).p("Aj6BuIH1jb");
	this.shape_171.setTransform(668.25,364.175);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").ss(3.7,1,1).p("AkQB3IIhjt");
	this.shape_172.setTransform(672.75,362.2);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#000000").ss(3.7,1,1).p("AkmCBIJMkB");
	this.shape_173.setTransform(677.2,360.2);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#000000").ss(3.7,1,1).p("Ak7CKIJ3kT");
	this.shape_174.setTransform(681.675,358.225);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#000000").ss(3.7,1,1).p("AlQCUIKhkn");
	this.shape_175.setTransform(686.125,356.225);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#000000").ss(3.7,1,1).p("AlXCXIKvkt");
	this.shape_176.setTransform(694.05,352.75);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#000000").ss(3.7,1,1).p("AlICQIKSkf");
	this.shape_177.setTransform(697.55,351.275);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#000000").ss(3.7,1,1).p("Ak6CKIJ1kT");
	this.shape_178.setTransform(701,349.775);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#000000").ss(3.7,1,1).p("AkrCEIJXkG");
	this.shape_179.setTransform(704.475,348.3);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#000000").ss(3.7,1,1).p("AkdB9II7j5");
	this.shape_180.setTransform(707.95,346.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#000000").ss(3.7,1,1).p("AkOB3IIdjt");
	this.shape_181.setTransform(711.4,345.3);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#000000").ss(3.7,1,1).p("AkABxIIBjh");
	this.shape_182.setTransform(714.875,343.8);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").ss(3.7,1,1).p("AjxBqIHjjT");
	this.shape_183.setTransform(718.325,342.325);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#000000").ss(3.7,1,1).p("AjjBkIHHjH");
	this.shape_184.setTransform(721.825,340.825);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").ss(3.7,1,1).p("AjUBdIGpi6");
	this.shape_185.setTransform(725.275,339.35);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#000000").ss(3.7,1,1).p("AjGBXIGNit");
	this.shape_186.setTransform(728.725,337.85);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(3.7,1,1).p("Ai3BQIFvig");
	this.shape_187.setTransform(732.225,336.35);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#000000").ss(3.7,1,1).p("AipBKIFTiT");
	this.shape_188.setTransform(735.675,334.875);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(3.7,1,1).p("AiaBEIE1iH");
	this.shape_189.setTransform(739.15,333.375);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#000000").ss(3.7,1,1).p("AiMA+IEZh6");
	this.shape_190.setTransform(742.625,331.9);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(3.7,1,1).p("Ah9A3ID7ht");
	this.shape_191.setTransform(746.075,330.375);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#000000").ss(3.7,1,1).p("AhuAxIDehh");
	this.shape_192.setTransform(749.55,328.9);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(3.7,1,1).p("AhgArIDBhV");
	this.shape_193.setTransform(753,327.4);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#000000").ss(3.7,1,1).p("AhSAkIClhH");
	this.shape_194.setTransform(756.5,325.925);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#000000").ss(3.7,1,1).p("AgiAWQAUgMAxgf");
	this.shape_195.setTransform(668.2,402.35);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#000000").ss(3.7,1,1).p("Ag3AjQAhgRBOg0");
	this.shape_196.setTransform(671.425,400.65);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#000000").ss(3.7,1,1).p("AhNAwQAtgYBuhI");
	this.shape_197.setTransform(674.7,398.95);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#000000").ss(3.7,1,1).p("AhiA9QA6geCKhb");
	this.shape_198.setTransform(677.95,397.25);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#000000").ss(3.7,1,1).p("Ah3BLQBGgmCphv");
	this.shape_199.setTransform(681.225,395.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_147,p:{scaleX:1,scaleY:1,x:687.725,y:392.15}}]}).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149,p:{x:696.675,y:387.175}}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_147,p:{scaleX:0.1417,scaleY:0.1417,x:745.9835,y:359.8335}}]},1).to({state:[]},1).to({state:[{t:this.shape_160,p:{scaleX:0.0456,scaleY:0.0456,x:619.0959,y:385.9784}}]},10).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_160,p:{scaleX:1,scaleY:1,x:690.6,y:354.25}}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_160,p:{scaleX:0.1895,scaleY:0.1895,x:759.9489,y:324.4071}}]},1).to({state:[]},1).to({state:[{t:this.shape_147,p:{scaleX:0.0833,scaleY:0.0833,x:664.9239,y:404.0481}}]},6).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_149,p:{x:684.45,y:393.85}}]},1).to({state:[{t:this.shape_147,p:{scaleX:1,scaleY:1,x:687.725,y:392.15}}]},1).wait(1));

	// noga_pr
	this.instance_2 = new lib.noga_pr();
	this.instance_2.setTransform(499.75,460.15,1,1,0,0,0,-54.6,-25.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:-54.5,rotation:44.9994,x:489.85,y:457.7},13).to({regX:-54.3,regY:-25.9,scaleX:1.0907,scaleY:1.0006,rotation:0,skewX:82.0135,skewY:79.1045,x:481.25,y:473.5},15).to({regX:-54.2,scaleX:1.1507,scaleY:1.0199,skewX:93.4379,skewY:85.1066,x:467.15,y:472.4},7).to({regX:-53.5,regY:-26.9,scaleX:1.2301,scaleY:1.0288,skewX:80.6364,skewY:82.8338,x:452.1,y:483.95},8).to({regX:-53.4,regY:-27.1,scaleX:1.2158,scaleY:0.9942,skewX:80.8342,skewY:81.2245,x:471.5,y:475.2},7).to({regX:-54.2,regY:-25.9,scaleX:1.156,scaleY:1,skewX:74.9832,skewY:72.7779,x:479.35,y:466.95},8).to({regX:-54.4,regY:-25.8,scaleX:1.0568,skewX:37.4914,skewY:36.3887,x:484.9,y:458.5},8).to({regX:-54.6,regY:-25.6,scaleX:1,skewX:0,skewY:0,x:499.75,y:460.15},8).wait(1));

	// noga_left
	this.instance_3 = new lib.noga_left();
	this.instance_3.setTransform(423.7,472.85,1,1,0,0,0,54.9,-70.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:55.4,regY:-69.3,scaleX:0.921,scaleY:0.8511,skewX:-22.8302,skewY:-14.1322,x:436.05,y:456.9},13).to({regY:-69.2,scaleX:0.9352,scaleY:0.9103,skewX:-42.0961,skewY:-30.0449,x:420.15,y:440.2},6).to({regX:54.4,regY:-70,scaleX:0.8444,scaleY:0.9992,skewX:-70.995,skewY:-53.9154,x:402.55,y:432.2},9).to({regX:54.8,regY:-70.6,scaleX:0.9381,scaleY:0.9656,rotation:-105.0012,skewX:0,skewY:0,x:382.05,y:437.15},15).to({regY:-70.4,scaleX:0.8541,scaleY:0.9078,rotation:0,skewX:-73.9292,skewY:-69.0375,x:400.9,y:429},7).to({regX:55,regY:-69.5,scaleX:0.9374,scaleY:0.843,skewX:-36.912,skewY:-24.4349,x:419.5,y:437.55},8).to({regX:54.9,regY:-70.7,scaleX:1,scaleY:1,skewX:0,skewY:0,x:423.7,y:472.85},16).wait(1));

	// front_cam
	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#1A1A1A").s().p("ABXCVImEiaQg4gYgJgmQgJgmAsgeQAsgdBIgEQBIgEA4AYIGECaQA5AYAJAmQAJAngtAdQgsAdhIAEIgUABQg7AAgxgVg");
	this.shape_200.setTransform(257.3743,669.6808);

	this.timeline.addTween(cjs.Tween.get(this.shape_200).wait(75));

	// Слой_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_1 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_2 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_3 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_4 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_5 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_6 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_7 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_8 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_9 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_10 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_11 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_12 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_13 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_14 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_15 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_16 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_17 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_18 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_19 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_20 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_21 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_22 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_23 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_24 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_25 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_26 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_27 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_28 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_29 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_30 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_31 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_32 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_33 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_34 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_35 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_36 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_37 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_38 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_39 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_40 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_41 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_42 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_43 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_44 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_45 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_46 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_47 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_48 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_49 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_50 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_51 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_52 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_53 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_54 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_55 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_56 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_57 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_58 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_59 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_60 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_61 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_62 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_63 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_64 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_65 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_66 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_67 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_68 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_69 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_70 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_71 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_72 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_73 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");
	var mask_graphics_74 = new cjs.Graphics().p("ApOQfI/FsOQgigMgLgQQAIgKAWgLMAufgTmIADgBQBXgrBhAAQAuAAAnAJIeMIIQAWAEASALMgsWAYMQhxA5h7AAQhHAAhGgUg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_1,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_2,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_3,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_4,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_5,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_6,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_7,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_8,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_9,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_10,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_11,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_12,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_13,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_14,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_15,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_16,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_17,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_18,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_19,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_20,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_21,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_22,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_23,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_24,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_25,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_26,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_27,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_28,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_29,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_30,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_31,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_32,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_33,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_34,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_35,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_36,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_37,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_38,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_39,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_40,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_41,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_42,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_43,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_44,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_45,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_46,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_47,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_48,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_49,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_50,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_51,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_52,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_53,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_54,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_55,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_56,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_57,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_58,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_59,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_60,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_61,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_62,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_63,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_64,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_65,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_66,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_67,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_68,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_69,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_70,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_71,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_72,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_73,x:390.525,y:617.5}).wait(1).to({graphics:mask_graphics_74,x:390.525,y:617.5}).wait(1));

	// lentaaa___копия
	this.instance_4 = new lib.lentaa();
	this.instance_4.setTransform(401.4,609.55);
	this.instance_4.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regY:0.2,scaleX:0.9454,scaleY:0.8213,skewX:-18.2528,x:665.95,y:480.55},35).wait(1).to({regY:0,scaleX:1.1242,scaleY:1.2579,skewX:0,skewY:5.3566,x:63.3,y:773},0).to({scaleX:1,scaleY:1,skewY:0,x:401.4,y:609.55},38).wait(1));

	// lentaaa
	this.instance_5 = new lib.lentaa();
	this.instance_5.setTransform(63.3,773,1.1242,1.2579,0,0,5.3566);
	this.instance_5.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleX:1,scaleY:1,skewY:0,x:401.4,y:609.55},35).to({regY:0.2,scaleX:0.9454,scaleY:0.8213,skewX:-18.2528,x:665.95,y:480.55},39).wait(1));

	// phone_bkg
	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(3.7,1,1).p("AB1gRIjpB+QgTAKgOgHQgNgHAAgTQAAgSANgVQAOgUATgKIDph+QATgJAOAHQANAGAAATQAAATgNAUQgOAVgTAJg");
	this.shape_201.setTransform(520.275,664.8585);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#000000").ss(3.7,1,1).p("AB1gRIjpB+QgTAKgOgHQgNgHAAgTQAAgTANgUQAOgUATgKIDph+QATgJAOAHQANAGAAATQAAATgNAUQgOAUgTAKg");
	this.shape_202.setTransform(479.575,687.6585);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#000000").ss(3.7,1,1).p("AA6AiIh0A+QgZANgSgKQgSgJAAgbQAAgbASgcQASgcAZgNIB0g9QAZgOASAKQASAKAAAaQAAAbgSAcQgSAcgZANg");
	this.shape_203.setTransform(428.1,716.45);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AhlBjQgRgKgBgbQABgaARgdQASgbAagNIBzg9QAZgOATAKQASAKAAAaQAAAbgSAdQgTAbgZANIhzA9QgPAIgMAAQgJAAgIgEg");
	this.shape_204.setTransform(428.1,716.45);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#000000").ss(3.7,1,1).p("ApnRZI/HsOQhPgegHgxQgGgyBKgjMAuggTmQBIgjBPgKQBQgKBPARIeKIHQBAANAbAmQAcApgwAfMgslAYTQhmAzhtALQhrAKhrgfg");
	this.shape_205.setTransform(391.0762,617.5098);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#333333").s().p("ApnRZI/HsOQhPgdgHgyQgGgyBKgjMAuggTlQBjgyBwAAQAxAAAyALIeKIHQBAAOAbAmQAcApgwAfMgslAYTQiAA/iIABQhQAAhRgYgAF7wHIgDABMgufATmQgXALgIAKQAMAQAhAMIfFMOQBHAUBHAAQB6AABxg5MAsXgYMQgSgLgWgEI+NoIQgngJgtAAQhiAAhWArg");
	this.shape_206.setTransform(391.0762,617.5);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#A3E7FF").s().p("ApnRZI/HsOQhPgegHgxQgGgyBKgjMAuggTmQBIgjBPgKQBQgKBPARIeKIHQBAANAbAmQAcApgwAfMgslAYTQhmAzhtALQgaACgbAAQhRAAhQgXg");
	this.shape_207.setTransform(391.0762,617.5098);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f().s("#000000").ss(3.7,1,1).p("EAqGgQSIgFEvQAAAggHATQgJAagYAPMgsYAZaQhgAyhvALQhvALhrgfI+5tGQgzgSgZgqQgVgigBgsIgCkk");
	this.shape_208.setTransform(391.1,669.3708);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#666666").ss(3.7,1,1).p("AAAhxIAADj");
	this.shape_209.setTransform(352.55,742.95);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#4D4D4D").s().p("ApnP8I+6tGQgzgSgZgqQgUgigCgsIgCkkMBULgMaIgFEvQAAAggHATQgKAagXAPMgsYAZaQhgAyhvALQgdADgeAAQhQAAhOgXg");
	this.shape_210.setTransform(391.1,669.3708);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#000000").ss(3.7,1,1).p("AEWFFIrYkyQgYgKgRgaQgSgaAAgbIAAjXQAAgbASgMQARgMAYAKILYEyQAXAKASAZQARAbAAAaICuChIiQBZQgZAOgbAAQgTAAgRgHg");
	this.shape_211.setTransform(188.05,703.3924);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#333333").s().p("AEWFFIrYkyQgYgKgRgaQgRgaAAgbIAAjXQAAgbARgMQARgMAYAKILYEyQAYAKARAZQARAbAAAaICuChIiQBZQgYAOgcAAQgUAAgQgHg");
	this.shape_212.setTransform(188.05,703.3924);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("AxskwQAyjjC1iTQC1iTDqgHIYcgqQBBgCA6AXQA7AXAuAsQAtAsAYA5QAYA5AAA/IAAEQIh8A0IAAlEQABgmgOgiQgPgigbgaQgcgbgkgOQgjgOgnABI4cArQjAAFiVB4QiTB5gqC5Ij4RMIiLA0g");
	this.shape_213.setTransform(301.75,531.917);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#333333").s().p("ApnRaI/HsPQhPgegHgxQgGgyBKgiMAuggTnQBjgwBwAAQAxAAAyAKIeKIHQBAAOAbAlQAcApgwAfMgslAYTQiABAiIAAQhQAAhRgWgAF7wHIgDABMgufATmQgXAKgIALQAMAPAhANIfFMOQBHATBHAAQB6AABxg5MAsXgYLQgSgLgWgFI+NoHQgngJgtABQhiAAhWAqg");
	this.shape_214.setTransform(391.0762,617.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201}]}).to({state:[{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_214},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201}]},74).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(529.9,485.6,238.70000000000005,289.9);
// library properties:
lib.properties = {
	id: '10',
	width: 820,
	height: 820,
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
an.compositions['10'] = {
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