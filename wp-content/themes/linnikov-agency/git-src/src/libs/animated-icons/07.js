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


(lib.tel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(0.05,-5.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag7hjIB3AAIAADHIh3AAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tel, new cjs.Rectangle(-7,-11,14,22), null);


(lib.mon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(-5.95,-11);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_1.setTransform(-9.95,-11);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_2.setTransform(-13.95,-11);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_3.setTransform(6.05,16.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_4.setTransform(-5.95,16.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,2,0,4).p("AAoAAIhPAA");
	this.shape_5.setTransform(0,14.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ADICCImPAAIAAkDIGPAAg");
	this.shape_6.setTransform(0,-4.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mon, new cjs.Rectangle(-21,-18.5,42,36), null);


// stage content:
(lib._07 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(126));

	// t_t
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape.setTransform(43.05,23.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAFIAAgJIAJAAIAAAJg");
	this.shape_1.setTransform(43.1,23.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_2.setTransform(43.1,23.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgGAHIAAgNIANAAIAAANg");
	this.shape_3.setTransform(43.1,23.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHAIIAAgPIAPAAIAAAPg");
	this.shape_4.setTransform(43.05,23.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgIAJIAAgRIARAAIAAARg");
	this.shape_5.setTransform(43.05,23.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},18).to({state:[]},1).to({state:[{t:this.shape_1}]},96).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape}]},1).wait(6));

	// m_t3
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_6.setTransform(19.05,11.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgEAFIAAgJIAJAAIAAAJg");
	this.shape_7.setTransform(19.1,11.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_8.setTransform(19.1,11.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGAHIAAgNIANAAIAAANg");
	this.shape_9.setTransform(19.1,11.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHAIIAAgPIAPAAIAAAPg");
	this.shape_10.setTransform(19.05,11.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgIAJIAAgRIARAAIAAARg");
	this.shape_11.setTransform(19.05,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6}]}).to({state:[{t:this.shape_6}]},18).to({state:[]},1).to({state:[{t:this.shape_7}]},98).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_6}]},1).wait(4));

	// m_t2
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_12.setTransform(15.05,11.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgEAFIAAgJIAJAAIAAAJg");
	this.shape_13.setTransform(15.1,11.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_14.setTransform(15.1,11.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgGAHIAAgNIANAAIAAANg");
	this.shape_15.setTransform(15.1,11.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHAIIAAgPIAPAAIAAAPg");
	this.shape_16.setTransform(15.05,11.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgIAJIAAgRIARAAIAAARg");
	this.shape_17.setTransform(15.05,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12}]}).to({state:[{t:this.shape_12}]},18).to({state:[]},1).to({state:[{t:this.shape_13}]},97).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_12}]},1).wait(5));

	// m_t1
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_18.setTransform(11.05,11.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgEAFIAAgJIAJAAIAAAJg");
	this.shape_19.setTransform(11.1,11.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_20.setTransform(11.1,11.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgGAHIAAgNIANAAIAAANg");
	this.shape_21.setTransform(11.1,11.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAIIAAgPIAPAAIAAAPg");
	this.shape_22.setTransform(11.05,11.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgIAJIAAgRIARAAIAAARg");
	this.shape_23.setTransform(11.05,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18}]}).to({state:[{t:this.shape_18}]},18).to({state:[]},1).to({state:[{t:this.shape_19}]},96).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_18}]},1).wait(6));

	// m_p
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_24.setTransform(31.05,39);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_25.setTransform(19.05,39);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FFFFFF").ss(2,2,0,4).p("AAoAAIhPAA");
	this.shape_26.setTransform(25,36.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},18).to({state:[]},1).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},91).wait(16));

	// m2
	this.instance = new lib.mon();
	this.instance.setTransform(32.95,22,1,1,0,0,0,0,-0.5);
	this.instance._off = true;

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ai3h3IFvAAIAADvIlvAAg");
	this.shape_27.setTransform(27.825,21.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiohuIFRAAIAADdIlRAAg");
	this.shape_28.setTransform(27.75,21.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiZhlIEzAAIAADLIkzAAg");
	this.shape_29.setTransform(27.675,21.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiKhcIEVAAIAAC5IkVAAg");
	this.shape_30.setTransform(27.6,21.925);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ah7hTID3AAIAACnIj3AAg");
	this.shape_31.setTransform(27.525,21.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhthKIDbAAIAACVIjbAAg");
	this.shape_32.setTransform(27.45,21.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhdhAIC7AAIAACBIi7AAg");
	this.shape_33.setTransform(27.375,21.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhPg3ICfAAIAABvIifAAg");
	this.shape_34.setTransform(27.3,21.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhAguICBAAIAABdIiBAAg");
	this.shape_35.setTransform(27.225,22);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgxglIBjAAIAABLIhjAAg");
	this.shape_36.setTransform(27.15,22);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgigcIBFAAIAAA5IhFAAg");
	this.shape_37.setTransform(27.075,22.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AAUAUIgnAAIAAgnIAnAAg");
	this.shape_38.setTransform(27,22.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_39.setTransform(27,22);
	this.shape_39._off = true;

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgOAOIAAgbIAdAAIAAAbg");
	this.shape_40.setTransform(3.5,3.45);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgTASIAAgjIAnAAIAAAjg");
	this.shape_41.setTransform(4,3.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},44).to({state:[{t:this.instance}]},12).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[]},1).to({state:[]},1).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(44).to({_off:false},0).to({x:27.9,y:25.9},12,cjs.Ease.quadIn).to({_off:true},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(69).to({_off:false},0).wait(1).to({x:26.95,y:21.95},0).wait(1).to({x:26.75,y:21.8},0).wait(1).to({x:26.4,y:21.55},0).wait(1).to({x:25.95,y:21.15},0).wait(1).to({x:25.35,y:20.7},0).wait(1).to({x:24.6,y:20.1},0).wait(1).to({x:23.75,y:19.45},0).wait(1).to({x:22.75,y:18.65},0).wait(1).to({x:21.6,y:17.75},0).wait(1).to({x:20.35,y:16.75},0).wait(1).to({x:18.95,y:15.65},0).wait(1).to({x:17.45,y:14.45},0).wait(1).to({x:15.75,y:13.15},0).wait(1).to({x:13.95,y:11.7},0).wait(1).to({x:12.05,y:10.2},0).wait(1).to({x:10,y:8.55},0).wait(1).to({x:7.8,y:6.85},0).wait(1).to({x:5.45,y:5},0).wait(1).to({x:3,y:3.05},0).to({_off:true},1).wait(37));

	// mask_m (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_44 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiIAoIABAAIAAAxIApAAIAAgJIFYAAIAAjvIk7AAIAAgIIhHAAg");
	var mask_graphics_45 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiCBRIF7AAIAAjwIl7AAg");
	var mask_graphics_46 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiCBRIF7AAIAAjvIl7AAg");
	var mask_graphics_47 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiEBSIF8AAIAAjvIl8AAg");
	var mask_graphics_48 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiIBUIF+AAIAAjuIl+AAg");
	var mask_graphics_49 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiLBXIF+AAIAAjvIl+AAg");
	var mask_graphics_50 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiQBaIGAAAIAAjvImAAAg");
	var mask_graphics_51 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiVBdIGCAAIAAjuImCAAg");
	var mask_graphics_52 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAicBiIGEAAIAAjvImEAAg");
	var mask_graphics_53 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAijBmIGHAAIAAjuImHAAg");
	var mask_graphics_54 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAirBsIGJAAIAAjvImJAAg");
	var mask_graphics_55 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAi0ByIGNAAIAAjvImNAAg");
	var mask_graphics_56 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAi9B4IGPAAIAAjvImPAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(44).to({graphics:mask_graphics_44,x:27,y:22}).wait(1).to({graphics:mask_graphics_45,x:27,y:22}).wait(1).to({graphics:mask_graphics_46,x:27,y:22}).wait(1).to({graphics:mask_graphics_47,x:27,y:22}).wait(1).to({graphics:mask_graphics_48,x:27,y:22}).wait(1).to({graphics:mask_graphics_49,x:27,y:22}).wait(1).to({graphics:mask_graphics_50,x:27,y:22}).wait(1).to({graphics:mask_graphics_51,x:27,y:22}).wait(1).to({graphics:mask_graphics_52,x:27,y:22}).wait(1).to({graphics:mask_graphics_53,x:27,y:22}).wait(1).to({graphics:mask_graphics_54,x:27,y:22}).wait(1).to({graphics:mask_graphics_55,x:27,y:22}).wait(1).to({graphics:mask_graphics_56,x:27,y:22}).wait(1).to({graphics:null,x:0,y:0}).wait(69));

	// t2
	this.instance_1 = new lib.tel();
	this.instance_1.setTransform(7.05,29);
	this.instance_1._off = true;

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_42.setTransform(27,22);
	this.shape_42._off = true;

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgNAOIAAgbIAbAAIAAAbg");
	this.shape_43.setTransform(50.6,40.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_44.setTransform(50.2,40.1);

	var maskedShapeInstanceList = [this.instance_1,this.shape_42,this.shape_43,this.shape_44];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},44).to({state:[{t:this.instance_1}]},12).to({state:[]},1).to({state:[{t:this.shape_42}]},12).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[]},1).to({state:[]},1).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(44).to({_off:false},0).to({x:28.45,y:20.95},12,cjs.Ease.quadIn).to({_off:true},1).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.shape_42).wait(69).to({_off:false},0).wait(1).to({x:27.05,y:22.05},0).wait(1).to({x:27.25,y:22.2},0).wait(1).to({x:27.6,y:22.45},0).wait(1).to({x:28.05,y:22.85},0).wait(1).to({x:28.65,y:23.3},0).wait(1).to({x:29.4,y:23.9},0).wait(1).to({x:30.25,y:24.55},0).wait(1).to({x:31.25,y:25.35},0).wait(1).to({x:32.4,y:26.25},0).wait(1).to({x:33.65,y:27.25},0).wait(1).to({x:35.05,y:28.35},0).wait(1).to({x:36.55,y:29.55},0).wait(1).to({x:38.25,y:30.85},0).wait(1).to({x:40.05,y:32.25},0).wait(1).to({x:41.95,y:33.8},0).wait(1).to({x:44,y:35.4},0).wait(1).to({x:46.2,y:37.15},0).wait(1).to({x:48.55,y:38.95},0).wait(1).to({x:51,y:40.9},0).to({_off:true},1).wait(37));

	// t
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag7hjIB3AAIAADHIh3AAg");
	this.shape_45.setTransform(43,29);

	this.instance_2 = new lib.tel();
	this.instance_2.setTransform(43,29);
	this.instance_2._off = true;

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgHgHIAPAAIAAAPIgPAAg");
	this.shape_46.setTransform(50.175,40.075);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgNgRIAaAAIAAAjIgaAAg");
	this.shape_47.setTransform(49.45,38.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgSgZIAlAAIAAAzIglAAg");
	this.shape_48.setTransform(48.75,37.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgWgiIAtAAIAABFIgtAAg");
	this.shape_49.setTransform(48.075,36.85);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgbgqIA3AAIAABVIg3AAg");
	this.shape_50.setTransform(47.475,35.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgfgxIA/AAIAABjIg/AAg");
	this.shape_51.setTransform(46.9,35.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Agjg4IBHAAIAABxIhHAAg");
	this.shape_52.setTransform(46.375,34.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Agmg+IBNAAIAAB9IhNAAg");
	this.shape_53.setTransform(45.875,33.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgqhEIBVAAIAACJIhVAAg");
	this.shape_54.setTransform(45.4,32.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgthKIBbAAIAACVIhbAAg");
	this.shape_55.setTransform(44.975,32.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgwhPIBhAAIAACfIhhAAg");
	this.shape_56.setTransform(44.6,31.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgyhTIBlAAIAACnIhlAAg");
	this.shape_57.setTransform(44.275,30.975);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag0hXIBpAAIAACvIhpAAg");
	this.shape_58.setTransform(43.975,30.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag2haIBtAAIAAC1IhtAAg");
	this.shape_59.setTransform(43.725,30.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag3hdIBvAAIAAC7IhvAAg");
	this.shape_60.setTransform(43.5,29.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag5hfIBzAAIAAC/IhzAAg");
	this.shape_61.setTransform(43.325,29.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag6hhIB1AAIAADDIh1AAg");
	this.shape_62.setTransform(43.175,29.275);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag6hiIB1AAIAADFIh1AAg");
	this.shape_63.setTransform(43.075,29.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_45,p:{x:43,y:29}}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[]},1).to({state:[{t:this.shape_46}]},46).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_45,p:{x:43.025,y:29.025}}]},1).to({state:[{t:this.shape_45,p:{x:43,y:29}}]},1).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).wait(1).to({scaleX:1.0013,scaleY:1.0013,x:42.8288,y:29.0006},0).wait(1).to({scaleX:1.0039,scaleY:1.0039,x:42.484,y:29.0018},0).wait(1).to({scaleX:1.0079,scaleY:1.0079,x:41.9493,y:29.0037},0).wait(1).to({scaleX:1.0134,scaleY:1.0134,x:41.2076,y:29.0063},0).wait(1).to({scaleX:1.0207,scaleY:1.0207,x:40.2424,y:29.0097},0).wait(1).to({scaleX:1.0297,scaleY:1.0297,x:39.0387,y:29.0139},0).wait(1).to({scaleX:1.0406,scaleY:1.0406,x:37.5858,y:29.0189},0).wait(1).to({scaleX:1.0534,scaleY:1.0534,x:35.8812,y:29.0249},0).wait(1).to({scaleX:1.068,scaleY:1.068,x:33.9342,y:29.0317},0).wait(1).to({scaleX:1.0842,scaleY:1.0842,x:31.7712,y:29.0393},0).wait(1).to({scaleX:1.1017,scaleY:1.1017,x:29.4382,y:29.0475},0).wait(1).to({scaleX:1.12,scaleY:1.12,x:27,y:29},0).wait(1).to({scaleX:1.1035,scaleY:1.1035,x:24.2654,y:28.9931},0).wait(1).to({scaleX:1.0875,scaleY:1.0875,x:21.5942,y:28.9865},0).wait(1).to({scaleX:1.0723,scaleY:1.0723,x:19.0701,y:28.9801},0).wait(1).to({scaleX:1.0584,scaleY:1.0584,x:16.7557,y:28.9743},0).wait(1).to({scaleX:1.046,scaleY:1.046,x:14.69,y:28.9691},0).wait(1).to({scaleX:1.0351,scaleY:1.0351,x:12.8905,y:28.9646},0).wait(1).to({scaleX:1.0259,scaleY:1.0259,x:11.359,y:28.9608},0).wait(1).to({scaleX:1.0183,scaleY:1.0183,x:10.087,y:28.9576},0).wait(1).to({scaleX:1.0121,scaleY:1.0121,x:9.0598,y:28.955},0).wait(1).to({scaleX:1.0073,scaleY:1.0073,x:8.2603,y:28.953},0).wait(1).to({scaleX:1.0037,scaleY:1.0037,x:7.6704,y:28.9516},0).wait(1).to({scaleX:1.0013,scaleY:1.0013,x:7.2725,y:28.9506},0).wait(1).to({scaleX:1,scaleY:1,x:7.05,y:29},0).to({_off:true},1).wait(81));

	// mask_t (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_19 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABuCgIBkAAIAAizIhkAAg");
	var mask_1_graphics_20 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABnCjIBkAAIAAgDIAGAAIAAizIgIAAIAAgEIhgAAIAAAKIgCAAg");
	var mask_1_graphics_21 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABjCmIBlAAIAAgDIAJAAIAAiwIAAAAIAAgLIhkAAIAAABIgIAAIAAAKIgCAAg");
	var mask_1_graphics_22 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABkChIBlAAIAAi0IhlAAg");
	var mask_1_graphics_23 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABcCiIBlAAIAAi2IhlAAg");
	var mask_1_graphics_24 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABRCiIBnAAIAAi3IhnAAg");
	var mask_1_graphics_25 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gABECjIBoAAIAAi5IhoAAg");
	var mask_1_graphics_26 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAA1CkIBpAAIAAi7IhpAAg");
	var mask_1_graphics_27 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAAkClIBqAAIAAi+IhqAAg");
	var mask_1_graphics_28 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAAQCnIBsAAIAAjAIhsAAg");
	var mask_1_graphics_29 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAgMCgIABAAIAAANIB1AAIAAjLIgLAAIAAgEIhrAAg");
	var mask_1_graphics_30 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAgeCqIBwAAIAAjHIhwAAg");
	var mask_1_graphics_31 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAg4CsIByAAIAAjLIhyAAg");
	var mask_1_graphics_32 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAhYCvIB6AAIAAjCIgCAAIAAgOIgLAAIAAgBIgIAAIAAgCIhjAAIAAATIgCAAg");
	var mask_1_graphics_33 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAhyCvIAOAAIAAADIBtAAIAAjGIgCAAIAAgPIhsAAIAAACIgLAAIAAAQIgCAAg");
	var mask_1_graphics_34 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAiKCuIB5AAIAAi/IgBAAIAAgRIhnAAIAAAEIgQAAIAAAOIgBAAg");
	var mask_1_graphics_35 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAijCgIACAAIAAAKIANAAIAAAEIBqAAIAAgRIABAAIAAi/IhnAAIAAADIgTAAg");
	var mask_1_graphics_36 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAi1CcIABAAIAAAMIAPAAIAAADIBoAAIAAjMIhnAAIAAADIgRAAg");
	var mask_1_graphics_37 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAjICoIARAAIAAADIBmAAIAAjJIhhAAIAAACIgUAAIAAASIgCAAg");
	var mask_1_graphics_38 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAjZCZIAEAAIAAAPIAOAAIAAADIBpAAIAAi4IgBAAIAAgVIhoAAIAAAEIgSAAg");
	var mask_1_graphics_39 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAjlCrIBnAAIAAgBIARAAIAAgQIABAAIAAi4IhnAAIAAAEIgQAAIAAAQIgCAAg");
	var mask_1_graphics_40 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAjuCcIABAAIAAAMIAPAAIAAADIBpAAIAAi2IgCAAIAAgRIhlAAIAAABIgSAAg");
	var mask_1_graphics_41 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAj3CnIAYAAIAAADIBfAAIAAgbIABAAIAAiqIgPAAIAAgDIhoAAIAAAWIgBAAg");
	var mask_1_graphics_42 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAj9CWIADAAIAAARIB1AAIAAgQIADAAIAAiyIh7AAg");
	var mask_1_graphics_43 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAkBCOIACAAIAAAXIB0AAIAAgWIABAAIAAiqIgTAAIAAgBIhkAAg");
	var mask_1_graphics_44 = new cjs.Graphics().p("AkNDcIAAm3IIbAAIAAG3gAj4CgIBkAAIAAizIhkAAg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(19).to({graphics:mask_1_graphics_19,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_20,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_21,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_22,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_23,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_24,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_25,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_26,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_27,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_28,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_29,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_30,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_31,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_32,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_33,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_34,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_35,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_36,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_37,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_38,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_39,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_40,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_41,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_42,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_43,x:27,y:22}).wait(1).to({graphics:mask_1_graphics_44,x:27,y:22}).wait(1).to({graphics:null,x:0,y:0}).wait(81));

	// m
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB4CCIk/AAIAAkDIGPAAIAACP");
	this.shape_64.setTransform(25,18);

	this.instance_3 = new lib.mon();
	this.instance_3.setTransform(25,22,1,1,0,0,0,0,-0.5);
	this.instance_3._off = true;

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AALAKIgWAAIAAgTIAWAAg");
	this.shape_65.setTransform(4.15,4.05);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgagTIA1AAIAAAnIg1AAg");
	this.shape_66.setTransform(5.825,5.175);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgpgdIBTAAIAAA7IhTAAg");
	this.shape_67.setTransform(7.55,6.325);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag5gnIBzAAIAABPIhzAAg");
	this.shape_68.setTransform(9.25,7.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhHgwICQAAIAABhIiQAAg");
	this.shape_69.setTransform(10.9,8.575);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhWg5ICtAAIAABzIitAAg");
	this.shape_70.setTransform(12.475,9.65);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhjhCIDHAAIAACFIjHAAg");
	this.shape_71.setTransform(13.975,10.625);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhwhKIDhAAIAACVIjhAAg");
	this.shape_72.setTransform(15.375,11.55);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ah7hRID3AAIAACjIj3AAg");
	this.shape_73.setTransform(16.625,12.4);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiGhYIENAAIAACxIkNAAg");
	this.shape_74.setTransform(17.775,13.175);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiPheIEfAAIAAC9IkfAAg");
	this.shape_75.setTransform(18.825,13.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AiYhjIExAAIAADHIkxAAg");
	this.shape_76.setTransform(19.75,14.5);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AifhoIE/AAIAADRIk/AAg");
	this.shape_77.setTransform(20.6,15.075);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AimhsIFNAAIAADZIlNAAg");
	this.shape_78.setTransform(21.325,15.55);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACiBzIlRAAIAAjlIFfAAIAACk");
	this.shape_79.setTransform(22.35,16.225);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACRB4IlIAAIAAjvIFvAAIAACd");
	this.shape_80.setTransform(23.225,16.825);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACLB8IlIAAIAAj3IF7AAIAACY");
	this.shape_81.setTransform(23.9,17.275);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACDB+IlFAAIAAj8IGFAAIAACV");
	this.shape_82.setTransform(24.4,17.6);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB/CAIlEAAIAAkAIGLAAIAACO");
	this.shape_83.setTransform(24.775,17.85);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB4CCIk/AAIAAkDIGPAAIAACL");
	this.shape_84.setTransform(25,18);

	var maskedShapeInstanceList = [this.shape_64,this.instance_3,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_64}]}).to({state:[{t:this.instance_3}]},19).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[]},1).to({state:[{t:this.shape_65}]},46).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).wait(1).to({scaleX:0.9992,scaleY:0.9992,y:21.95},0).wait(1).to({scaleX:0.9976,scaleY:0.9976,x:25.05},0).wait(1).to({scaleX:0.9951,scaleY:0.9951,x:25.1},0).wait(1).to({scaleX:0.9916,scaleY:0.9916,x:25.2},0).wait(1).to({scaleX:0.9871,scaleY:0.9871,x:25.35},0).wait(1).to({scaleX:0.9814,scaleY:0.9814,x:25.5},0).wait(1).to({scaleX:0.9746,scaleY:0.9746,x:25.65},0).wait(1).to({scaleX:0.9666,scaleY:0.9666,x:25.9},0).wait(1).to({scaleX:0.9575,scaleY:0.9575,x:26.15},0).wait(1).to({scaleX:0.9474,scaleY:0.9474,x:26.4,y:22},0).wait(1).to({scaleX:0.9364,scaleY:0.9364,x:26.7},0).wait(1).to({regX:0.1,scaleX:0.925,scaleY:0.925,x:27.1},0).wait(1).to({regX:0,scaleX:0.9353,scaleY:0.9353,x:27.8},0).wait(1).to({scaleX:0.9453,scaleY:0.9453,x:28.55},0).wait(1).to({scaleX:0.9548,scaleY:0.9548,x:29.3,y:21.95},0).wait(1).to({scaleX:0.9635,scaleY:0.9635,x:30},0).wait(1).to({scaleX:0.9713,scaleY:0.9713,x:30.6},0).wait(1).to({scaleX:0.978,scaleY:0.978,x:31.15},0).wait(1).to({scaleX:0.9838,scaleY:0.9838,x:31.6},0).wait(1).to({scaleX:0.9886,scaleY:0.9886,x:32},0).wait(1).to({scaleX:0.9924,scaleY:0.9924,x:32.3},0).wait(1).to({scaleX:0.9955,scaleY:0.9955,x:32.5},0).wait(1).to({scaleX:0.9977,scaleY:0.9977,x:32.7},0).wait(1).to({scaleX:0.9992,scaleY:0.9992,x:32.8},0).wait(1).to({scaleX:1,scaleY:1,x:32.95,y:22},0).to({_off:true},1).wait(81));

	// ck
	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FF0000").s().p("AgJCMIAAkXIATAAIAAEXg");
	this.shape_85.setTransform(1,18);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FF0000").s().p("AgJB8IAAj3IATAAIAAD3g");
	this.shape_86.setTransform(1,16.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FF0000").s().p("AgJBsIAAjWIATAAIAADWg");
	this.shape_87.setTransform(1,15.85);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FF0000").s().p("AgJBbIAAi1IATAAIAAC1g");
	this.shape_88.setTransform(1,14.775);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FF0000").s().p("AgJBLIAAiVIATAAIAACVg");
	this.shape_89.setTransform(1,13.7);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FF0000").s().p("AgJA7IAAh1IATAAIAAB1g");
	this.shape_90.setTransform(1,12.625);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FF0000").s().p("AgJArIAAhVIATAAIAABVg");
	this.shape_91.setTransform(1,11.55);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FF0000").s().p("AgJAaIAAgzIATAAIAAAzg");
	this.shape_92.setTransform(1,10.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85,p:{scaleY:1,y:18}}]}).to({state:[{t:this.shape_85,p:{scaleY:1,y:18}}]},8).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_85,p:{scaleY:0.0714,y:9.4031}}]},1).to({state:[]},1).to({state:[{t:this.shape_85,p:{scaleY:1,y:18}}]},105).to({state:[]},2).wait(2));

	// cb
	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#02FFFF").s().p("AgJBuIAAjbIATAAIAADbg");
	this.shape_93.setTransform(51,29);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#02FFFF").s().p("AgJBhIAAjCIATAAIAADCg");
	this.shape_94.setTransform(51,28.05);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#02FFFF").s().p("AgJBVIAAipIATAAIAACpg");
	this.shape_95.setTransform(51,27.05);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#02FFFF").s().p("AgJBJIAAiRIATAAIAACRg");
	this.shape_96.setTransform(51,26.1);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#02FFFF").s().p("AgJA8IAAh3IATAAIAAB3g");
	this.shape_97.setTransform(51,25.15);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#02FFFF").s().p("AgJAvIAAhdIATAAIAABdg");
	this.shape_98.setTransform(51,24.15);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#02FFFF").s().p("AgJAjIAAhFIATAAIAABFg");
	this.shape_99.setTransform(51,23.2);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#02FFFF").s().p("AgJAXIAAgsIATAAIAAAsg");
	this.shape_100.setTransform(51,22.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_93,p:{scaleY:1,y:29}}]}).to({state:[{t:this.shape_93,p:{scaleY:1,y:29}}]},9).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_93,p:{scaleY:0.0909,y:21.2369}}]},1).to({state:[]},1).to({state:[{t:this.shape_93,p:{scaleY:1,y:29}}]},104).to({state:[]},2).wait(2));

	// cy
	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFF05").s().p("AgJCMIAAkXIATAAIAAEXg");
	this.shape_101.setTransform(3,18);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFF05").s().p("AgJB6IAAjyIATAAIAADyg");
	this.shape_102.setTransform(3,19.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFF05").s().p("AgJBnIAAjNIATAAIAADNg");
	this.shape_103.setTransform(3,20.525);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFF05").s().p("AgJBUIAAinIATAAIAACng");
	this.shape_104.setTransform(3,21.775);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFF05").s().p("AgJBCIAAiDIATAAIAACDg");
	this.shape_105.setTransform(3,23.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFF05").s().p("AgJAvIAAhdIATAAIAABdg");
	this.shape_106.setTransform(3,24.275);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFF05").s().p("AgJAdIAAg5IATAAIAAA5g");
	this.shape_107.setTransform(3,25.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_101,p:{scaleY:1,y:18}}]}).to({state:[{t:this.shape_101,p:{scaleY:1,y:18}}]},9).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_101,p:{scaleY:0.0714,y:26.7941}}]},1).to({state:[]},1).to({state:[{t:this.shape_101,p:{scaleY:1,y:18}}]},105).to({state:[]},2).wait(2));

	// cdb
	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#0000FE").s().p("AgJBuIAAjbIATAAIAADbg");
	this.shape_108.setTransform(53,29);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#0000FE").s().p("AgJBiIAAjDIATAAIAADDg");
	this.shape_109.setTransform(53,29.75);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#0000FE").s().p("AgJBVIAAipIATAAIAACpg");
	this.shape_110.setTransform(53,30.5);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#0000FE").s().p("AgJBJIAAiQIATAAIAACQg");
	this.shape_111.setTransform(53,31.25);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#0000FE").s().p("AgJA8IAAh3IATAAIAAB3g");
	this.shape_112.setTransform(53,32.05);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#0000FE").s().p("AgJAvIAAhdIATAAIAABdg");
	this.shape_113.setTransform(53,32.8);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#0000FE").s().p("AgJAjIAAhFIATAAIAABFg");
	this.shape_114.setTransform(53,33.55);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#0000FE").s().p("AgJAWIAAgsIATAAIAAAsg");
	this.shape_115.setTransform(53,34.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_108,p:{scaleY:1,y:29}}]}).to({state:[{t:this.shape_108,p:{scaleY:1,y:29}}]},8).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_108,p:{scaleY:0.09,y:35.0436}}]},1).to({state:[]},1).to({state:[{t:this.shape_108,p:{scaleY:1,y:29}}]},105).to({state:[]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(27,24.1,27,19.799999999999997);
// library properties:
lib.properties = {
	id: '07',
	width: 54,
	height: 44,
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
an.compositions['07'] = {
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