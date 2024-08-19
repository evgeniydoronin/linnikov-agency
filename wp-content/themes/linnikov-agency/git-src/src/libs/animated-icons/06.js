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



// stage content:
(lib._06 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(129));

	// k05
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape.setTransform(16,30);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgnA3IAAhtIBPAAIAABtg");
	this.shape_1.setTransform(16,28.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgnBGIAAiLIBPAAIAACLg");
	this.shape_2.setTransform(16,27.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},119).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).wait(8));

	// k04
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_3.setTransform(30,30);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag1AoIAAhPIBrAAIAABPg");
	this.shape_4.setTransform(28.6,30);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhDAoIAAhPICHAAIAABPg");
	this.shape_5.setTransform(27.2,30);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhRAoIAAhPICjAAIAABPg");
	this.shape_6.setTransform(25.8,30);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhfAoIAAhPIC/AAIAABPg");
	this.shape_7.setTransform(24.4,30);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhtAoIAAhPIDbAAIAABPg");
	this.shape_8.setTransform(23,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3}]},114).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).wait(10));

	// k03
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_9.setTransform(30,16);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgnA0IAAhnIBPAAIAABng");
	this.shape_10.setTransform(30,17.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgnA/IAAh9IBPAAIAAB9g");
	this.shape_11.setTransform(30,18.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgnBLIAAiVIBPAAIAACVg");
	this.shape_12.setTransform(30,19.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgnBXIAAitIBPAAIAACtg");
	this.shape_13.setTransform(30,20.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnBiIAAjDIBPAAIAADDg");
	this.shape_14.setTransform(30,21.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgnBuIAAjbIBPAAIAADbg");
	this.shape_15.setTransform(30,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9}]},108).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).wait(15));

	// k02
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_16.setTransform(16,16);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgxAoIAAhPIBjAAIAABPg");
	this.shape_17.setTransform(17,16);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag7AoIAAhPIB3AAIAABPg");
	this.shape_18.setTransform(18,16);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AhFAoIAAhPICLAAIAABPg");
	this.shape_19.setTransform(19,16);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AhPAoIAAhPICfAAIAABPg");
	this.shape_20.setTransform(20,16);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AhZAoIAAhPICzAAIAABPg");
	this.shape_21.setTransform(21,16);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AhjAoIAAhPIDHAAIAABPg");
	this.shape_22.setTransform(22,16);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AhtAoIAAhPIDbAAIAABPg");
	this.shape_23.setTransform(23,16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},101).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[]},14).wait(7));

	// k01
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgnAKIAAgTIBPAAIAAATg");
	this.shape_24.setTransform(16,19.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgnAZIAAgxIBPAAIAAAxg");
	this.shape_25.setTransform(16,17.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_26.setTransform(16,16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_24}]},99).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[]},20).wait(8));

	// k05___копия
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgnBGIAAiLIBPAAIAACLg");
	this.shape_27.setTransform(16,27.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgnA3IAAhtIBPAAIAABtg");
	this.shape_28.setTransform(16,25.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_29.setTransform(16,24.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgnAZIAAgxIBPAAIAAAxg");
	this.shape_30.setTransform(16,22.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgnAKIAAgTIBPAAIAAATg");
	this.shape_31.setTransform(16,21.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_32.setTransform(1,1);
	this.shape_32._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27}]},24).to({state:[{t:this.shape_27}]},15).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[]},1).to({state:[{t:this.shape_32}]},21).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},1).to({state:[]},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(65).to({_off:false},0).wait(1).to({x:1.3},0).wait(1).to({x:2.2},0).wait(1).to({x:3.75},0).wait(1).to({x:5.9},0).wait(1).to({x:8.65},0).wait(1).to({x:12},0).wait(1).to({x:15.95},0).wait(1).to({x:20.55},0).wait(1).to({x:25.75},0).wait(1).to({x:31.55},0).wait(1).to({x:37.95},0).wait(1).to({x:45},0).wait(2).to({x:44.95,y:1.05},0).wait(1).to({x:44.8,y:1.2},0).wait(1).to({x:44.5,y:1.5},0).wait(1).to({x:44,y:2},0).wait(1).to({x:43.25,y:2.75},0).wait(1).to({x:42.25,y:3.75},0).wait(1).to({x:40.9,y:5.1},0).wait(1).to({x:39.15,y:6.85},0).wait(1).to({x:37,y:9},0).wait(1).to({x:34.35,y:11.65},0).wait(1).to({x:31.15,y:14.85},0).wait(1).to({x:27.4,y:18.6},0).wait(1).to({x:23,y:23},0).wait(1).to({x:23.45,y:22.55},0).wait(1).to({x:24.2,y:21.8},0).wait(1).to({x:25.3,y:20.7},0).wait(1).to({x:26.85,y:19.15},0).wait(1).to({x:28.95,y:17.05},0).wait(1).to({x:31.65,y:14.35},0).wait(1).to({x:35,y:11},0).wait(1).to({x:38.35,y:7.65},0).wait(1).to({x:41.8,y:4.2},0).wait(1).to({x:45,y:1},0).wait(1).to({y:1.65},0).wait(1).to({y:2.55},0).wait(1).to({y:3.8},0).wait(1).to({y:5.45},0).wait(1).to({y:7.55},0).wait(1).to({y:10.3},0).wait(1).to({y:13.65},0).wait(1).to({y:17.75},0).wait(1).to({y:22.5},0).wait(1).to({y:27.75},0).wait(1).to({y:33.2},0).wait(1).to({y:38.5},0).to({_off:true},1).wait(15));

	// k04___копия
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AhtAoIAAhPIDbAAIAABPg");
	this.shape_33.setTransform(23,30);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AhfAoIAAhPIC/AAIAABPg");
	this.shape_34.setTransform(21.6,30);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AhRAoIAAhPICjAAIAABPg");
	this.shape_35.setTransform(20.2,30);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AhDAoIAAhPICHAAIAABPg");
	this.shape_36.setTransform(18.8,30);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("Ag1AoIAAhPIBrAAIAABPg");
	this.shape_37.setTransform(17.4,30);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_38.setTransform(16,30);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_39.setTransform(45,1);
	this.shape_39._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33}]},24).to({state:[{t:this.shape_33}]},10).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[]},1).to({state:[{t:this.shape_39}]},25).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[]},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(65).to({_off:false},0).wait(1).to({y:1.3},0).wait(1).to({y:2.2},0).wait(1).to({y:3.75},0).wait(1).to({y:5.9},0).wait(1).to({y:8.65},0).wait(1).to({y:12},0).wait(1).to({y:15.95},0).wait(1).to({y:20.55},0).wait(1).to({y:25.75},0).wait(1).to({y:31.55},0).wait(1).to({y:37.95},0).wait(1).to({y:45},0).wait(2).to({x:44.95,y:44.95},0).wait(1).to({x:44.8,y:44.8},0).wait(1).to({x:44.5,y:44.5},0).wait(1).to({x:44,y:44},0).wait(1).to({x:43.25,y:43.25},0).wait(1).to({x:42.25,y:42.25},0).wait(1).to({x:40.9,y:40.9},0).wait(1).to({x:39.15,y:39.15},0).wait(1).to({x:37,y:37},0).wait(1).to({x:34.35,y:34.35},0).wait(1).to({x:31.15,y:31.15},0).wait(1).to({x:27.4,y:27.4},0).wait(1).to({x:23,y:23},0).wait(1).to({x:23.45,y:23.45},0).wait(1).to({x:24.2,y:24.2},0).wait(1).to({x:25.3,y:25.3},0).wait(1).to({x:26.85,y:26.85},0).wait(1).to({x:28.95,y:28.95},0).wait(1).to({x:31.65,y:31.65},0).wait(1).to({x:35,y:35},0).wait(1).to({x:38.35,y:38.35},0).wait(1).to({x:41.8,y:41.8},0).wait(1).to({x:45,y:45},0).wait(1).to({x:44.35},0).wait(1).to({x:43.45},0).wait(1).to({x:42.2},0).wait(1).to({x:40.55},0).wait(1).to({x:38.45},0).wait(1).to({x:35.7},0).wait(1).to({x:32.35},0).wait(1).to({x:28.25},0).wait(1).to({x:23.5},0).wait(1).to({x:18.25},0).wait(1).to({x:12.8},0).wait(1).to({x:7.5},0).to({_off:true},1).wait(15));

	// k03___копия
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgnBuIAAjbIBPAAIAADbg");
	this.shape_40.setTransform(30,23);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgnBkIAAjHIBPAAIAADHg");
	this.shape_41.setTransform(30,24);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgnBaIAAizIBPAAIAACzg");
	this.shape_42.setTransform(30,25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgnBQIAAifIBPAAIAACfg");
	this.shape_43.setTransform(30,26);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgnBGIAAiLIBPAAIAACLg");
	this.shape_44.setTransform(30,27);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgnA8IAAh3IBPAAIAAB3g");
	this.shape_45.setTransform(30,28);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgnAyIAAhjIBPAAIAABjg");
	this.shape_46.setTransform(30,29);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_47.setTransform(30,30);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_48.setTransform(45,45);
	this.shape_48._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_40}]},24).to({state:[{t:this.shape_40}]},3).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[]},1).to({state:[{t:this.shape_48}]},30).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_48}]},1).to({state:[]},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.shape_48).wait(65).to({_off:false},0).wait(1).to({x:44.7},0).wait(1).to({x:43.8},0).wait(1).to({x:42.25},0).wait(1).to({x:40.1},0).wait(1).to({x:37.35},0).wait(1).to({x:34},0).wait(1).to({x:30.05},0).wait(1).to({x:25.45},0).wait(1).to({x:20.25},0).wait(1).to({x:14.45},0).wait(1).to({x:8.05},0).wait(1).to({x:1},0).wait(2).to({x:1.05,y:44.95},0).wait(1).to({x:1.2,y:44.8},0).wait(1).to({x:1.5,y:44.5},0).wait(1).to({x:2,y:44},0).wait(1).to({x:2.75,y:43.25},0).wait(1).to({x:3.75,y:42.25},0).wait(1).to({x:5.1,y:40.9},0).wait(1).to({x:6.85,y:39.15},0).wait(1).to({x:9,y:37},0).wait(1).to({x:11.65,y:34.35},0).wait(1).to({x:14.85,y:31.15},0).wait(1).to({x:18.6,y:27.4},0).wait(1).to({x:23,y:23},0).wait(1).to({x:22.55,y:23.45},0).wait(1).to({x:21.8,y:24.2},0).wait(1).to({x:20.7,y:25.3},0).wait(1).to({x:19.15,y:26.85},0).wait(1).to({x:17.05,y:28.95},0).wait(1).to({x:14.35,y:31.65},0).wait(1).to({x:11,y:35},0).wait(1).to({x:7.65,y:38.35},0).wait(1).to({x:4.2,y:41.8},0).wait(1).to({x:1,y:45},0).wait(1).to({y:44.35},0).wait(1).to({y:43.45},0).wait(1).to({y:42.2},0).wait(1).to({y:40.55},0).wait(1).to({y:38.45},0).wait(1).to({y:35.7},0).wait(1).to({y:32.35},0).wait(1).to({y:28.25},0).wait(1).to({y:23.5},0).wait(1).to({y:18.25},0).wait(1).to({y:12.8},0).wait(1).to({y:7.5},0).to({_off:true},1).wait(15));

	// k02___копия
	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AhFAoIAAhPICLAAIAABPg");
	this.shape_49.setTransform(27,16);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("Ag7AoIAAhPIB3AAIAABPg");
	this.shape_50.setTransform(28,16);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgxAoIAAhPIBjAAIAABPg");
	this.shape_51.setTransform(29,16);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_52.setTransform(30,16);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_53.setTransform(1,45);
	this.shape_53._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_49}]},24).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[]},1).to({state:[{t:this.shape_53}]},37).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[]},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.shape_53).wait(65).to({_off:false},0).wait(1).to({y:44.7},0).wait(1).to({y:43.8},0).wait(1).to({y:42.25},0).wait(1).to({y:40.1},0).wait(1).to({y:37.35},0).wait(1).to({y:34},0).wait(1).to({y:30.05},0).wait(1).to({y:25.45},0).wait(1).to({y:20.25},0).wait(1).to({y:14.45},0).wait(1).to({y:8.05},0).wait(1).to({y:1},0).wait(2).to({x:1.05,y:1.05},0).wait(1).to({x:1.2,y:1.2},0).wait(1).to({x:1.5,y:1.5},0).wait(1).to({x:2,y:2},0).wait(1).to({x:2.75,y:2.75},0).wait(1).to({x:3.75,y:3.75},0).wait(1).to({x:5.1,y:5.1},0).wait(1).to({x:6.85,y:6.85},0).wait(1).to({x:9,y:9},0).wait(1).to({x:11.65,y:11.65},0).wait(1).to({x:14.85,y:14.85},0).wait(1).to({x:18.6,y:18.6},0).wait(1).to({x:23,y:23},0).wait(1).to({x:22.55,y:22.55},0).wait(1).to({x:21.8,y:21.8},0).wait(1).to({x:20.7,y:20.7},0).wait(1).to({x:19.15,y:19.15},0).wait(1).to({x:17.05,y:17.05},0).wait(1).to({x:14.35,y:14.35},0).wait(1).to({x:11,y:11},0).wait(1).to({x:7.65,y:7.65},0).wait(1).to({x:4.2,y:4.2},0).wait(1).to({x:1,y:1},0).wait(1).to({x:1.65},0).wait(1).to({x:2.55},0).wait(1).to({x:3.8},0).wait(1).to({x:5.45},0).wait(1).to({x:7.55},0).wait(1).to({x:10.3},0).wait(1).to({x:13.65},0).wait(1).to({x:17.75},0).wait(1).to({x:22.5},0).wait(1).to({x:27.75},0).wait(1).to({x:33.2},0).wait(1).to({x:38.5},0).to({_off:true},1).wait(15));

	// neu3
	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AhtAKIAAgTIDbAAIAAATg");
	this.shape_54.setTransform(23,11);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AhsAKIAAgTIDZAAIAAATg");
	this.shape_55.setTransform(23,11.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AhpAKIAAgTIDTAAIAAATg");
	this.shape_56.setTransform(23,11.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AhkAKIAAgTIDJAAIAAATg");
	this.shape_57.setTransform(23,12.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AhdAKIAAgTIC7AAIAAATg");
	this.shape_58.setTransform(23,12.9);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AhUAKIAAgTICpAAIAAATg");
	this.shape_59.setTransform(23,14);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AhJAKIAAgTICTAAIAAATg");
	this.shape_60.setTransform(23,15.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("Ag8AKIAAgTIB5AAIAAATg");
	this.shape_61.setTransform(23,16.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgtAKIAAgTIBbAAIAAATg");
	this.shape_62.setTransform(23,18.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgcAKIAAgTIA5AAIAAATg");
	this.shape_63.setTransform(23,20.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_64.setTransform(23,23);
	this.shape_64._off = true;

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgLAKIAAgTIAXAAIAAATg");
	this.shape_65.setTransform(23,22.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgRAKIAAgTIAjAAIAAATg");
	this.shape_66.setTransform(23,22);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgbAKIAAgTIA3AAIAAATg");
	this.shape_67.setTransform(23,20.8);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgqAKIAAgTIBVAAIAAATg");
	this.shape_68.setTransform(23,19.1);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AhSAKIAAgTIClAAIAAATg");
	this.shape_69.setTransform(23,14.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_54}]},44).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[]},1).to({state:[{t:this.shape_64}]},26).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_54}]},1).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_64).wait(54).to({_off:false},0).wait(1).to({x:27.2,y:18.8},0).wait(1).to({x:30.9,y:15.1},0).wait(1).to({x:34.2,y:11.8},0).wait(1).to({x:37.1,y:8.9},0).wait(1).to({x:39.5,y:6.5},0).wait(1).to({x:41.5,y:4.5},0).wait(1).to({x:43,y:3},0).wait(1).to({x:44.1,y:1.9},0).wait(1).to({x:44.8,y:1.2},0).wait(1).to({x:45,y:1},0).to({_off:true},1).wait(26).to({_off:false,x:23,y:23},0).to({_off:true},1).wait(37));

	// neu2
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgJBuIAAjbIATAAIAADbg");
	this.shape_70.setTransform(35,23);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgJBtIAAjZIATAAIAADZg");
	this.shape_71.setTransform(34.9,23);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgJBqIAAjTIATAAIAADTg");
	this.shape_72.setTransform(34.5,23);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgJBlIAAjJIATAAIAADJg");
	this.shape_73.setTransform(33.9,23);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgJBeIAAi7IATAAIAAC7g");
	this.shape_74.setTransform(33.1,23);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgJBVIAAipIATAAIAACpg");
	this.shape_75.setTransform(32,23);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgJBKIAAiTIATAAIAACTg");
	this.shape_76.setTransform(30.7,23);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgJA9IAAh5IATAAIAAB5g");
	this.shape_77.setTransform(29.1,23);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgJAuIAAhbIATAAIAABbg");
	this.shape_78.setTransform(27.3,23);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgJAdIAAg5IATAAIAAA5g");
	this.shape_79.setTransform(25.3,23);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_80.setTransform(23,23);
	this.shape_80._off = true;

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgJAMIAAgXIATAAIAAAXg");
	this.shape_81.setTransform(23.25,23);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgJASIAAgjIATAAIAAAjg");
	this.shape_82.setTransform(24,23);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgJAcIAAg3IATAAIAAA3g");
	this.shape_83.setTransform(25.2,23);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgJArIAAhVIATAAIAABVg");
	this.shape_84.setTransform(26.9,23);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_85.setTransform(31.8,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_70}]},44).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_80}]},1).to({state:[]},1).to({state:[{t:this.shape_80}]},26).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_70}]},1).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_80).wait(54).to({_off:false},0).wait(1).to({x:27.2,y:27.2},0).wait(1).to({x:30.9,y:30.9},0).wait(1).to({x:34.2,y:34.2},0).wait(1).to({x:37.1,y:37.1},0).wait(1).to({x:39.5,y:39.5},0).wait(1).to({x:41.5,y:41.5},0).wait(1).to({x:43,y:43},0).wait(1).to({x:44.1,y:44.1},0).wait(1).to({x:44.8,y:44.8},0).wait(1).to({x:45,y:45},0).to({_off:true},1).wait(26).to({_off:false,x:23,y:23},0).to({_off:true},1).wait(37));

	// neu1
	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AhtAKIAAgTIDbAAIAAATg");
	this.shape_86.setTransform(23,35);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AhsAKIAAgTIDZAAIAAATg");
	this.shape_87.setTransform(23,34.9);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AhpAKIAAgTIDTAAIAAATg");
	this.shape_88.setTransform(23,34.5);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AhkAKIAAgTIDJAAIAAATg");
	this.shape_89.setTransform(23,33.9);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AhdAKIAAgTIC7AAIAAATg");
	this.shape_90.setTransform(23,33.1);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AhUAKIAAgTICpAAIAAATg");
	this.shape_91.setTransform(23,32);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AhJAKIAAgTICTAAIAAATg");
	this.shape_92.setTransform(23,30.7);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("Ag8AKIAAgTIB5AAIAAATg");
	this.shape_93.setTransform(23,29.1);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgtAKIAAgTIBbAAIAAATg");
	this.shape_94.setTransform(23,27.3);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgcAKIAAgTIA5AAIAAATg");
	this.shape_95.setTransform(23,25.3);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_96.setTransform(23,23);
	this.shape_96._off = true;

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgLAKIAAgTIAXAAIAAATg");
	this.shape_97.setTransform(23,23.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgRAKIAAgTIAjAAIAAATg");
	this.shape_98.setTransform(23,24);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgbAKIAAgTIA3AAIAAATg");
	this.shape_99.setTransform(23,25.2);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgqAKIAAgTIBVAAIAAATg");
	this.shape_100.setTransform(23,26.9);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AhSAKIAAgTIClAAIAAATg");
	this.shape_101.setTransform(23,31.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_86}]},44).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_96}]},1).to({state:[]},1).to({state:[{t:this.shape_96}]},26).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_86}]},1).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_96).wait(54).to({_off:false},0).wait(1).to({x:18.8,y:27.2},0).wait(1).to({x:15.1,y:30.9},0).wait(1).to({x:11.8,y:34.2},0).wait(1).to({x:8.9,y:37.1},0).wait(1).to({x:6.5,y:39.5},0).wait(1).to({x:4.5,y:41.5},0).wait(1).to({x:3,y:43},0).wait(1).to({x:1.9,y:44.1},0).wait(1).to({x:1.2,y:44.8},0).wait(1).to({x:1,y:45},0).to({_off:true},1).wait(26).to({_off:false,x:23,y:23},0).to({_off:true},1).wait(37));

	// kw
	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AiBCCIABjvIATAAIAABQIBQAAIAAA7IA7AAIAAg7Ig7AAIAAhQIhQAAIAAgUIDvAAIAAEDgAgdgdg");
	this.shape_102.setTransform(23,23);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AiBCCIABjvIATAAIAADbIDbAAIAAjbIjbAAIAAgUIDvAAIAAEDg");
	this.shape_103.setTransform(23,23);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AiBCCIABjvIATAAIAADbIDbAAIAAjbIjbAAIAAgUIDbAAIAAAUIAUAAIAADvg");
	this.shape_104.setTransform(23,23);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AiBCCIABjvIATAAIAADbIDbAAIAAAUgABuBuIAAjbIjbAAIAAgUIDbAAIAAAUIAUAAIAADbgAhthtg");
	this.shape_105.setTransform(23,23);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AhtCCIAAgUIDbAAIAAAUgABuBuIAAjbIjbAAIAAgUIDbAAIAAAUIAUAAIAADbgAiBBuIABjbIATAAIAADbgAhthtg");
	this.shape_106.setTransform(23,23);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgJBuIAAjbIATAAIAADbg");
	this.shape_107.setTransform(11,23);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgJBtIAAjZIATAAIAADZg");
	this.shape_108.setTransform(11.1,23);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgJBqIAAjTIATAAIAADTg");
	this.shape_109.setTransform(11.5,23);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgJBlIAAjJIATAAIAADJg");
	this.shape_110.setTransform(12.1,23);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgJBeIAAi7IATAAIAAC7g");
	this.shape_111.setTransform(12.9,23);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgJBVIAAipIATAAIAACpg");
	this.shape_112.setTransform(14,23);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgJBKIAAiTIATAAIAACTg");
	this.shape_113.setTransform(15.3,23);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgJA9IAAh5IATAAIAAB5g");
	this.shape_114.setTransform(16.9,23);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgJAuIAAhbIATAAIAABbg");
	this.shape_115.setTransform(18.7,23);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgJAdIAAg5IATAAIAAA5g");
	this.shape_116.setTransform(20.7,23);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_117.setTransform(23,23);
	this.shape_117._off = true;

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgJAMIAAgXIATAAIAAAXg");
	this.shape_118.setTransform(22.75,23);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgJASIAAgjIATAAIAAAjg");
	this.shape_119.setTransform(22,23);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgJAcIAAg3IATAAIAAA3g");
	this.shape_120.setTransform(20.8,23);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgJArIAAhVIATAAIAABVg");
	this.shape_121.setTransform(19.1,23);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_122.setTransform(14.2,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102}]}).to({state:[{t:this.shape_103}]},24).to({state:[{t:this.shape_104}]},4).to({state:[{t:this.shape_105}]},7).to({state:[{t:this.shape_106}]},5).to({state:[{t:this.shape_106}]},3).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_117}]},1).to({state:[]},1).to({state:[{t:this.shape_117}]},26).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_107}]},1).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_117).wait(54).to({_off:false},0).wait(1).to({x:18.8,y:18.8},0).wait(1).to({x:15.1,y:15.1},0).wait(1).to({x:11.8,y:11.8},0).wait(1).to({x:8.9,y:8.9},0).wait(1).to({x:6.5,y:6.5},0).wait(1).to({x:4.5,y:4.5},0).wait(1).to({x:3,y:3},0).wait(1).to({x:1.9,y:1.9},0).wait(1).to({x:1.2,y:1.2},0).wait(1).to({x:1,y:1},0).to({_off:true},1).wait(26).to({_off:false,x:23,y:23},0).to({_off:true},1).wait(37));

	// pluss
	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AhtCCIAAgUIgUAAIABjbIATAAIAADbIDbAAIAAAUgABuBuIAAjbIjbAAIAAgUIDbAAIAAAUIAUAAIAADbg");
	this.shape_123.setTransform(23,23);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AhtCCIAAgUIDbAAIAAAUgABuBuIAAjbIjbAAIAADbIgUAAIABjvIDuAAIAAAUIAUAAIAADbg");
	this.shape_124.setTransform(23,23);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AhtCCIAAgUIgUAAIABjvIECAAIAADvIgUAAIAAAUgAhtBuIDbAAIAAjbIjbAAg");
	this.shape_125.setTransform(23,23);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AhtCCIAAgUIDbAAIAAjbIjbAAIAADbIgUAAIABjvIECAAIAAEDg");
	this.shape_126.setTransform(23,23);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AiBCCIABkDIECAAIAAEDgAhtBuIDbAAIAAjbIjbAAg");
	this.shape_127.setTransform(23,23);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AiBCCIABkDIECAAIAAEDgAhtgdIBQAAIAAA7IA7AAIAAg7Ig7AAIAAgTIhQAAg");
	this.shape_128.setTransform(23,23);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AiBCCIABkDIECAAIAAEDgAhtgdIBQAAIAAA7IA7AAIAAg7Ig7AAIAAgoIhQAAg");
	this.shape_129.setTransform(23,23);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AiBCCIABkDIECAAIAAEDgAhtgdIBQAAIAAA7IA7AAIAAg7Ig7AAIAAg8IhQAAg");
	this.shape_130.setTransform(23,23);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AiBCCIABjvIATAAIAABQIBQAAIAAA7IA7AAIAAg7Ig7AAIAAhQIhQAAIAAgUIDvAAIAAEDg");
	this.shape_131.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_123}]},99).to({state:[{t:this.shape_124}]},2).to({state:[{t:this.shape_125}]},7).to({state:[{t:this.shape_126}]},6).to({state:[{t:this.shape_127}]},5).to({state:[{t:this.shape_128}]},3).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).wait(4));

	// ck
	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FF0000").s().p("AgJB4IAAjvIATAAIAADvg");
	this.shape_132.setTransform(7.05,24);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FF0000").s().p("AgJBoIAAjPIATAAIAADPg");
	this.shape_133.setTransform(7.05,25.275);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FF0000").s().p("AgJBZIAAixIATAAIAACxg");
	this.shape_134.setTransform(7.05,26.6);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FF0000").s().p("AgJBJIAAiRIATAAIAACRg");
	this.shape_135.setTransform(7.05,27.875);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FF0000").s().p("AgJA5IAAhxIATAAIAABxg");
	this.shape_136.setTransform(7.05,29.175);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FF0000").s().p("AgJApIAAhSIATAAIAABSg");
	this.shape_137.setTransform(7.05,30.45);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FF0000").s().p("AgJAaIAAgzIATAAIAAAzg");
	this.shape_138.setTransform(7.05,31.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_132,p:{scaleY:1,y:24}}]}).to({state:[{t:this.shape_132,p:{scaleY:1,y:24}}]},15).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_132,p:{scaleY:0.0835,y:33.0288}}]},1).to({state:[]},1).to({state:[{t:this.shape_132,p:{scaleY:1,y:24}}]},102).to({state:[]},2).wait(2));

	// cb
	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#02FFFF").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_139.setTransform(37,23);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#02FFFF").s().p("AgJBxIAAjhIATAAIAADhg");
	this.shape_140.setTransform(37,24.15);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#02FFFF").s().p("AgJBfIAAi+IATAAIAAC+g");
	this.shape_141.setTransform(37,25.3);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#02FFFF").s().p("AgJBOIAAibIATAAIAACbg");
	this.shape_142.setTransform(37,26.45);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#02FFFF").s().p("AgJA9IAAh6IATAAIAAB6g");
	this.shape_143.setTransform(37,27.6);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#02FFFF").s().p("AgJAtIAAhZIATAAIAABZg");
	this.shape_144.setTransform(37,28.75);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#02FFFF").s().p("AgJAbIAAg1IATAAIAAA1g");
	this.shape_145.setTransform(37,29.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_139}]}).to({state:[{t:this.shape_139}]},15).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_139}]},1).to({state:[]},1).to({state:[{t:this.shape_139}]},101).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_139).wait(16).to({_off:true},1).wait(6).to({_off:false,scaleY:0.0769,y:31.0624},0).to({_off:true},1).wait(101).to({_off:false,scaleY:1,y:23},0).to({_off:true},2).wait(2));

	// cy
	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFF05").s().p("AgJB4IAAjvIATAAIAADvg");
	this.shape_146.setTransform(9.05,24);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFF05").s().p("AgJBoIAAjPIATAAIAADPg");
	this.shape_147.setTransform(9.05,23.675);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFF05").s().p("AgJBZIAAixIATAAIAACxg");
	this.shape_148.setTransform(9.05,23.35);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFF05").s().p("AgJBJIAAiRIATAAIAACRg");
	this.shape_149.setTransform(9.05,23.025);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFF05").s().p("AgJA5IAAhxIATAAIAABxg");
	this.shape_150.setTransform(9.05,22.725);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFF05").s().p("AgJApIAAhRIATAAIAABRg");
	this.shape_151.setTransform(9.05,22.4);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFF05").s().p("AgJAaIAAgzIATAAIAAAzg");
	this.shape_152.setTransform(9.05,22.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_146}]}).to({state:[{t:this.shape_146}]},15).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_146}]},1).to({state:[]},1).to({state:[{t:this.shape_146}]},101).to({state:[]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_146).wait(16).to({_off:true},1).wait(6).to({_off:false,scaleY:0.0833,y:21.7448},0).to({_off:true},1).wait(101).to({_off:false,scaleY:1,y:24},0).to({_off:true},2).wait(2));

	// cdb
	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#0000FE").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_153.setTransform(39,23);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#0000FE").s().p("AgJBxIAAjhIATAAIAADhg");
	this.shape_154.setTransform(39,22.15);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#0000FE").s().p("AgJBgIAAi+IATAAIAAC+g");
	this.shape_155.setTransform(39,21.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#0000FE").s().p("AgJBOIAAicIATAAIAACcg");
	this.shape_156.setTransform(39,20.45);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#0000FE").s().p("AgJA9IAAh6IATAAIAAB6g");
	this.shape_157.setTransform(39,19.6);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#0000FE").s().p("AgJAtIAAhYIATAAIAABYg");
	this.shape_158.setTransform(39,18.75);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#0000FE").s().p("AgJAbIAAg1IATAAIAAA1g");
	this.shape_159.setTransform(39,17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_153,p:{scaleY:1,skewX:0,y:23}}]}).to({state:[{t:this.shape_153,p:{scaleY:1,skewX:0,y:23}}]},15).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_153,p:{scaleY:0.0769,skewX:180,y:17.0438}}]},1).to({state:[]},1).to({state:[{t:this.shape_153,p:{scaleY:1,skewX:0,y:23}}]},102).to({state:[]},2).wait(2));

	// ramka
	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIATAAIAAAegACBDmIAAgUIAkAAIAAAUgAA4DmIAAgUIAkAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAlAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjlDmIAAgeIAUAAIAAAKIALAAIAAAUgADSCkIAAgkIATAAIAAAkgAjlCkIAAgkIAUAAIAAAkgADSBbIAAgkIATAAIAAAkgAjlBbIAAgkIAUAAIAAAkgADSATIAAgkIATAAIAAAkgAjlATIAAgkIAUAAIAAAkgADSg1IAAgkIATAAIAAAkgAjlg1IAAgkIAUAAIAAAkgADSh+IAAgkIATAAIAAAkgAjlh+IAAgkIAUAAIAAAkgADSjHIAAgKIgJAAIAAgUIAcAAIAAAegAjljHIAAgeIAfAAIAAAUIgLAAIAAAKgACBjRIAAgUIAkAAIAAAUgAA4jRIAAgUIAkAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAlAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_160.setTransform(23.05,22.975);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIAUAAIAAAbgAB9DmIAAgUIAlAAIAAAUgAA1DmIAAgUIAkAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAlAAIAAAUgAikDmIAAgUIAkAAIAAAUgAjkDmIAAghIAUAAIAAANIAHAAIAAAUgADSCnIAAgkIAUAAIAAAkgAjkChIAAgkIAUAAIAAAkgADSBeIAAgkIAUAAIAAAkgAjkBYIAAgkIAUAAIAAAkgADSAWIAAgkIAUAAIAAAkgAjkAQIAAgkIAUAAIAAAkgADSgyIAAgkIAUAAIAAAkgAjkg4IAAgkIAUAAIAAAkgADSh7IAAgkIAUAAIAAAkgAjkiBIAAgkIAUAAIAAAkgADSjEIAAgNIgGAAIAAgUIAaAAIAAAhgAjkjKIAAgbIAhAAIAAAUIgNAAIAAAHgACEjRIAAgUIAkAAIAAAUgAA7jRIAAgUIAkAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAifjRIAAgUIAlAAIAAAUg");
	this.shape_161.setTransform(23.05,22.975);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("ADDDmIAAgUIAPAAIAAgEIAUAAIAAAYgAB7DmIAAgUIAkAAIAAAUgAAyDmIAAgUIAkAAIAAAUgAgWDmIAAgUIAjAAIAAAUgAhfDmIAAgUIAkAAIAAAUgAioDmIAAgUIAlAAIAAAUgAjkDmIAAgkIAUAAIAAAQIAEAAIAAAUgADSCqIAAgkIAUAAIAAAkgAjkCeIAAgkIAUAAIAAAkgADSBhIAAgkIAUAAIAAAkgAjkBVIAAgkIAUAAIAAAkgADSAZIAAgkIAUAAIAAAkgAjkANIAAgkIAUAAIAAAkgADSgvIAAgkIAUAAIAAAkgAjkg7IAAgkIAUAAIAAAkgADSh4IAAgkIAUAAIAAAkgAjkiEIAAgkIAUAAIAAAkgADSjBIAAgQIgDAAIAAgUIAXAAIAAAkgAjkjNIAAgYIAkAAIAAAUIgQAAIAAAEgACHjRIAAgUIAjAAIAAAUgAA+jRIAAgUIAkAAIAAAUgAgKjRIAAgUIAjAAIAAAUgAhTjRIAAgUIAlAAIAAAUgAibjRIAAgUIAkAAIAAAUg");
	this.shape_162.setTransform(23.05,22.975);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAgBIAUAAIAAAVgAB3DmIAAgUIAkAAIAAAUgAAuDmIAAgUIAlAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAkAAIAAAUgAirDmIAAgUIAlAAIAAAUgAjkDkIAAglIAUAAIAAAlgADSCtIAAgkIAUAAIAAAkgAjkCbIAAgkIAUAAIAAAkgADSBkIAAgkIAUAAIAAAkgAjkBSIAAgkIAUAAIAAAkgADSAcIAAgkIAUAAIAAAkgAjkAKIAAgkIAUAAIAAAkgADSgsIAAgkIAUAAIAAAkgAjkg+IAAgkIAUAAIAAAkgADSh1IAAgkIAUAAIAAAkgAjkiHIAAgkIAUAAIAAAkgADSi+IAAgkIAUAAIAAAkgACJjRIAAgUIAkAAIAAAUgABAjRIAAgUIAkAAIAAAUgAgIjRIAAgUIAjAAIAAAUgAhRjRIAAgUIAlAAIAAAUgAiZjRIAAgUIAlAAIAAAUgAjhjRIAAgUIAkAAIAAAUg");
	this.shape_163.setTransform(23.05,22.975);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAkAAIAAAUgAB1DmIAAgUIAjAAIAAAUgAAsDmIAAgUIAkAAIAAAUgAgcDmIAAgUIAjAAIAAAUgAhlDmIAAgUIAlAAIAAAUgAitDmIAAgUIAkAAIAAAUgAjkDhIAAglIAUAAIAAAlgADSCwIAAglIAUAAIAAAlgAjkCYIAAgkIAUAAIAAAkgADSBnIAAgkIAUAAIAAAkgAjkBPIAAgkIAUAAIAAAkgADSAeIAAgjIAUAAIAAAjgAjkAHIAAgkIAUAAIAAAkgADSgqIAAgkIAUAAIAAAkgAjkhBIAAgkIAUAAIAAAkgADShyIAAglIAUAAIAAAlgAjkiKIAAgkIAUAAIAAAkgADSi7IAAglIAUAAIAAAlgACMjRIAAgUIAkAAIAAAUgABDjRIAAgUIAlAAIAAAUgAgFjRIAAgUIAjAAIAAAUgAhOjRIAAgUIAlAAIAAAUgAiWjRIAAgUIAkAAIAAAUgAjfjRIAAgUIAkAAIAAAUg");
	this.shape_164.setTransform(23.05,22.975);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AC7DmIAAgUIAkAAIAAAUgAByDmIAAgUIAkAAIAAAUgAApDmIAAgUIAlAAIAAAUgAgeDmIAAgUIAjAAIAAAUgAhoDmIAAgUIAlAAIAAAUgAiwDmIAAgUIAkAAIAAAUgAjkDeIAAglIAUAAIAAAlgADSCzIAAglIAUAAIAAAlgAjkCVIAAgkIAUAAIAAAkgADSBqIAAgkIAUAAIAAAkgAjkBMIAAgkIAUAAIAAAkgADSAhIAAgjIAUAAIAAAjgAjkAEIAAgkIAUAAIAAAkgADSgnIAAgkIAUAAIAAAkgAjkhEIAAgkIAUAAIAAAkgADShvIAAglIAUAAIAAAlgAjkiNIAAgkIAUAAIAAAkgADSi4IAAglIAUAAIAAAlgACPjRIAAgUIAkAAIAAAUgABGjRIAAgUIAlAAIAAAUgAgBjRIAAgUIAjAAIAAAUgAhKjRIAAgUIAkAAIAAAUgAiTjRIAAgUIAlAAIAAAUgAjbjRIAAgUIAkAAIAAAUg");
	this.shape_165.setTransform(23.05,22.975);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAlAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAkAAIAAAUgAgiDmIAAgUIAjAAIAAAUgAhrDmIAAgUIAlAAIAAAUgAizDmIAAgUIAkAAIAAAUgAjkDbIAAglIAUAAIAAAlgADSC2IAAglIAUAAIAAAlgAjkCSIAAgkIAUAAIAAAkgADSBtIAAgkIAUAAIAAAkgAjkBJIAAgkIAUAAIAAAkgADSAkIAAgkIAUAAIAAAkIAAAAgAjkABIAAgkIAUAAIAAAkgADSgkIAAgkIAUAAIAAAkgAjkhHIAAgkIAUAAIAAAkgADShsIAAglIAUAAIAAAlgAjkiQIAAgkIAUAAIAAAkgADSi1IAAglIAUAAIAAAlgACSjRIAAgUIAkAAIAAAUgABJjRIAAgUIAkAAIAAAUgAAAjRIAAgUIAkAAIAAAUgAhIjRIAAgUIAlAAIAAAUgAiQjRIAAgUIAkAAIAAAUgAjYjRIAAgUIAkAAIAAAUg");
	this.shape_166.setTransform(23.05,22.975);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AC0DmIAAgUIAlAAIAAAUgABsDmIAAgUIAkAAIAAAUgAAjDmIAAgUIAlAAIAAAUgAgkDmIAAgUIAkAAIAAAUgAhtDmIAAgUIAkAAIAAAUgAi2DmIAAgUIAlAAIAAAUgAjkDYIAAgkIAUAAIAAAkgADSC5IAAglIAUAAIAAAlgAjkCQIAAglIAUAAIAAAlgADSBwIAAgkIAUAAIAAAkgAjkBHIAAgkIAUAAIAAAkgADSAnIAAgkIAUAAIAAAhIAAADgAjkgBIAAgkIAUAAIAAAkgADSghIAAgkIAUAAIAAAkgAjkhKIAAgkIAUAAIAAAkgADShpIAAglIAUAAIAAAlgAjkiSIAAglIAUAAIAAAlgADSiyIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUgABMjRIAAgUIAlAAIAAAUgAADjRIAAgUIAkAAIAAAUgAhFjRIAAgUIAlAAIAAAUgAiNjRIAAgUIAkAAIAAAUgAjWjRIAAgUIAkAAIAAAUg");
	this.shape_167.setTransform(23.05,22.975);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("ACyDmIAAgUIAkAAIAAAUgABpDmIAAgUIAkAAIAAAUgAAgDmIAAgUIAlAAIAAAUgAgnDmIAAgUIAkAAIAAAUgAhxDmIAAgUIAlAAIAAAUgAi5DmIAAgUIAkAAIAAAUgAjkDVIAAgkIAUAAIAAAkgADSC8IAAglIAUAAIAAAlgAjkCNIAAglIAUAAIAAAlgADSBzIAAgkIAUAAIAAAkgAjkBEIAAgkIAUAAIAAAkgADSAqIAAgkIAUAAIAAAeIAAAGgAjkgEIAAgkIAUAAIAAAkgADSgeIAAgkIAUAAIAAAkgAjkhNIAAgkIAUAAIAAAkgADShmIAAglIAUAAIAAAlgAjkiVIAAglIAUAAIAAAlgADSivIAAglIAUAAIAAAlgACYjRIAAgUIAkAAIAAAUgABPjRIAAgUIAkAAIAAAUgAAGjRIAAgUIAkAAIAAAUgAhCjRIAAgUIAlAAIAAAUgAiKjRIAAgUIAkAAIAAAUgAjTjRIAAgUIAkAAIAAAUg");
	this.shape_168.setTransform(23.05,22.975);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("ACuDmIAAgUIAlAAIAAAUgABmDmIAAgUIAkAAIAAAUgAAdDmIAAgUIAkAAIAAAUgAgrDmIAAgUIAkAAIAAAUgAh0DmIAAgUIAlAAIAAAUgAi8DmIAAgUIAkAAIAAAUgAjkDSIAAgkIAUAAIAAAkgADSC/IAAglIAUAAIAAAlgAjkCKIAAglIAUAAIAAAlgADSB2IAAgkIAUAAIAAAkgAjkBBIAAgkIAUAAIAAAkgADSAtIAAgkIAUAAIAAAbIAAAJgAjkgHIAAgkIAUAAIAAAkgADSgbIAAgkIAUAAIAAAkgAjkhQIAAgkIAUAAIAAAkgADShjIAAglIAUAAIAAAlgAjkiYIAAglIAUAAIAAAlgADSisIAAglIAUAAIAAAlgACajRIAAgUIAkAAIAAAUgABRjRIAAgUIAlAAIAAAUgAAJjRIAAgUIAkAAIAAAUgAg/jRIAAgUIAkAAIAAAUgAiHjRIAAgUIAkAAIAAAUgAjQjRIAAgUIAkAAIAAAUg");
	this.shape_169.setTransform(23.05,22.975);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("ACrDmIAAgUIAlAAIAAAUgABjDmIAAgUIAkAAIAAAUgAAaDmIAAgUIAkAAIAAAUgAgtDmIAAgUIAkAAIAAAUgAh2DmIAAgUIAkAAIAAAUgAi/DmIAAgUIAlAAIAAAUgAjkDPIAAgkIAUAAIAAAkgADSDBIAAgkIAUAAIAAAkgAjkCHIAAglIAUAAIAAAlgADSB4IAAgkIAUAAIAAAkgAjkA+IAAgkIAUAAIAAAkgADSAwIAAglIAUAAIAAAZIAAAMgAjkgKIAAgkIAUAAIAAAkgADSgYIAAgkIAUAAIAAAkgAjkhTIAAgkIAUAAIAAAkgADShhIAAgkIAUAAIAAAkgAjkibIAAglIAUAAIAAAlgADSiqIAAgkIAUAAIAAAkgACejRIAAgUIAkAAIAAAUgABUjRIAAgUIAlAAIAAAUgAAMjRIAAgUIAkAAIAAAUgAg8jRIAAgUIAkAAIAAAUgAiFjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAkAAIAAAUg");
	this.shape_170.setTransform(23.05,22.975);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("ACpDmIAAgUIAkAAIAAAUgABgDmIAAgUIAkAAIAAAUgAAXDmIAAgUIAlAAIAAAUgAgwDmIAAgUIAkAAIAAAUgAh6DmIAAgUIAlAAIAAAUgAjCDmIAAgUIAkAAIAAAUgAjkDMIAAgkIAUAAIAAAkgADSDEIAAgkIAUAAIAAAkgAjkCEIAAglIAUAAIAAAlgADSB7IAAgkIAUAAIAAAkgAjkA7IAAgkIAUAAIAAAkgADSAzIAAglIAUAAIAAAWIAAAPgAjkgNIAAgkIAUAAIAAAkgADSgVIAAgkIAUAAIAAAkgAjkhWIAAgkIAUAAIAAAkgADSheIAAgkIAUAAIAAAkgAjkieIAAglIAUAAIAAAlgADSinIAAgkIAUAAIAAAkgAChjRIAAgUIAkAAIAAAUgABYjRIAAgUIAkAAIAAAUgAAPjRIAAgUIAkAAIAAAUgAg5jRIAAgUIAlAAIAAAUgAiBjRIAAgUIAkAAIAAAUgAjKjRIAAgUIAkAAIAAAUg");
	this.shape_171.setTransform(23.05,22.975);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AClDmIAAgUIAlAAIAAAUgABdDmIAAgUIAkAAIAAAUgAAUDmIAAgUIAkAAIAAAUgAg0DmIAAgUIAkAAIAAAUgAh9DmIAAgUIAlAAIAAAUgAjFDmIAAgUIAkAAIAAAUgAjkDJIAAgkIAUAAIAAAkgADSDHIAAgkIAUAAIAAAkgAjkCBIAAglIAUAAIAAAlgADSB+IAAgkIAUAAIAAAkgAjkA4IAAgkIAUAAIAAAkgADSA2IAAglIAUAAIAAATIAAASgAjkgQIAAgkIAUAAIAAAkgADSgSIAAgkIAUAAIAAAkgAjkhZIAAgkIAUAAIAAAkgADShbIAAgkIAUAAIAAAkgAjkihIAAglIAUAAIAAAlgADSikIAAgkIAUAAIAAAkgACjjRIAAgUIAkAAIAAAUgABajRIAAgUIAlAAIAAAUgAASjRIAAgUIAkAAIAAAUgAg2jRIAAgUIAkAAIAAAUgAh+jRIAAgUIAkAAIAAAUgAjHjRIAAgUIAkAAIAAAUg");
	this.shape_172.setTransform(23.05,22.975);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("ACjDmIAAgUIAkAAIAAAUgABaDmIAAgUIAkAAIAAAUgAARDmIAAgUIAlAAIAAAUgAg2DmIAAgUIAkAAIAAAUgAh/DmIAAgUIAlAAIAAAUgAjHDmIAAgUIAkAAIAAAUgADSDKIAAgkIAUAAIAAAkgAjkDGIAAgkIAUAAIAAAkgADSCBIAAgkIAUAAIAAAkgAjkB+IAAglIAUAAIAAAlgADSA5IAAglIAUAAIAAAQIAAAVgAjkA1IAAgkIAUAAIAAAkgADSgPIAAgkIAUAAIAAAkgAjkgTIAAgkIAUAAIAAAkgADShYIAAgkIAUAAIAAAkgAjkhcIAAgkIAUAAIAAAkgADSihIAAgkIAUAAIAAAkgAjkikIAAglIAUAAIAAAlgACmjRIAAgUIAkAAIAAAUgABdjRIAAgUIAkAAIAAAUgAAUjRIAAgUIAkAAIAAAUgAg0jRIAAgUIAlAAIAAAUgAh8jRIAAgUIAkAAIAAAUgAjFjRIAAgUIAkAAIAAAUg");
	this.shape_173.setTransform(23.05,22.975);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("ACgDmIAAgUIAlAAIAAAUgABYDmIAAgUIAkAAIAAAUgAAPDmIAAgUIAkAAIAAAUgAg5DmIAAgUIAkAAIAAAUgAiCDmIAAgUIAlAAIAAAUgAjLDmIAAgUIAlAAIAAAUgADSDNIAAgkIAUAAIAAAkgAjkDDIAAgkIAUAAIAAAkgADSCEIAAgkIAUAAIAAAkgAjkB7IAAglIAUAAIAAAlgADSA8IAAglIAUAAIAAANIAAAYgAjkAyIAAgkIAUAAIAAAkgADSgMIAAgkIAUAAIAAAkgAjkgWIAAgkIAUAAIAAAkgADShVIAAgkIAUAAIAAAkgAjkhfIAAgkIAUAAIAAAkgADSieIAAgkIAUAAIAAAkgAjkinIAAglIAUAAIAAAlgACpjRIAAgUIAkAAIAAAUgABgjRIAAgUIAlAAIAAAUgAAYjRIAAgUIAkAAIAAAUgAgwjRIAAgUIAkAAIAAAUgAh5jRIAAgUIAlAAIAAAUgAjCjRIAAgUIAkAAIAAAUg");
	this.shape_174.setTransform(23.05,22.975);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("ACdDmIAAgUIAlAAIAAAUgABUDmIAAgUIAkAAIAAAUgAALDmIAAgUIAlAAIAAAUgAg8DmIAAgUIAkAAIAAAUgAiFDmIAAgUIAkAAIAAAUgAjODmIAAgUIAlAAIAAAUgADSDQIAAgkIAUAAIAAAkgAjkDAIAAgkIAUAAIAAAkgADSCHIAAgkIAUAAIAAAkgAjkB4IAAglIAUAAIAAAlgADSA/IAAglIAUAAIAAAKIAAAbgAjkAvIAAgkIAUAAIAAAkgADSgJIAAgkIAUAAIAAAkgAjkgZIAAgkIAUAAIAAAkgADShSIAAgkIAUAAIAAAkgAjkhiIAAgkIAUAAIAAAkgADSibIAAgkIAUAAIAAAkgAjkiqIAAglIAUAAIAAAlgACsjRIAAgUIAkAAIAAAUgABjjRIAAgUIAkAAIAAAUgAAajRIAAgUIAkAAIAAAUgAgtjRIAAgUIAkAAIAAAUgAh2jRIAAgUIAlAAIAAAUgAi+jRIAAgUIAkAAIAAAUg");
	this.shape_175.setTransform(23.05,22.975);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("ACaDmIAAgUIAkAAIAAAUgABRDmIAAgUIAkAAIAAAUgAAIDmIAAgUIAlAAIAAAUgAg/DmIAAgUIAkAAIAAAUgAiIDmIAAgUIAlAAIAAAUgAjQDmIAAgUIAkAAIAAAUgADSDTIAAglIAUAAIAAAlgAjkC9IAAgkIAUAAIAAAkgADSCKIAAgkIAUAAIAAAkgAjkB1IAAglIAUAAIAAAlgADSBBIAAgkIAUAAIAAAHIAAAdgAjkAsIAAgkIAUAAIAAAkgADSgHIAAgkIAUAAIAAAkgAjkgcIAAgkIAUAAIAAAkgADShPIAAglIAUAAIAAAlgAjkhlIAAgkIAUAAIAAAkgADSiYIAAglIAUAAIAAAlgAjkitIAAglIAUAAIAAAlgACvjRIAAgUIAkAAIAAAUgABmjRIAAgUIAkAAIAAAUgAAdjRIAAgUIAkAAIAAAUgAgrjRIAAgUIAlAAIAAAUgAhzjRIAAgUIAkAAIAAAUgAi8jRIAAgUIAkAAIAAAUg");
	this.shape_176.setTransform(23.05,22.975);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("ACXDmIAAgUIAlAAIAAAUgABPDmIAAgUIAkAAIAAAUgAAGDmIAAgUIAkAAIAAAUgAhCDmIAAgUIAkAAIAAAUgAiLDmIAAgUIAlAAIAAAUgAjUDmIAAgUIAlAAIAAAUgADSDWIAAglIAUAAIAAAlgAjkC6IAAgkIAUAAIAAAkgADSCNIAAgkIAUAAIAAAkgAjkByIAAglIAUAAIAAAlgADSBEIAAgkIAUAAIAAAEIAAAggAjkApIAAgkIAUAAIAAAkgADSgEIAAgkIAUAAIAAAkgAjkgfIAAgkIAUAAIAAAkgADShMIAAglIAUAAIAAAlgAjkhoIAAgkIAUAAIAAAkgADSiVIAAglIAUAAIAAAlgAjkiwIAAglIAUAAIAAAlgACyjRIAAgUIAkAAIAAAUgABpjRIAAgUIAlAAIAAAUgAAhjRIAAgUIAkAAIAAAUgAgnjRIAAgUIAkAAIAAAUgAhwjRIAAgUIAlAAIAAAUgAi5jRIAAgUIAkAAIAAAUg");
	this.shape_177.setTransform(23.05,22.975);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("ACUDmIAAgUIAlAAIAAAUgABLDmIAAgUIAkAAIAAAUgAACDmIAAgUIAlAAIAAAUgAhFDmIAAgUIAkAAIAAAUgAiODmIAAgUIAkAAIAAAUgAjXDmIAAgUIAlAAIAAAUgADSDZIAAglIAUAAIAAAlgAjkC3IAAgkIAUAAIAAAkgADSCQIAAgkIAUAAIAAAkgAjkBvIAAglIAUAAIAAAlgADSBHIAAgkIAUAAIAAABIAAAjgAjkAmIAAgkIAUAAIAAAkgADSgBIAAgkIAUAAIAAAkgAjkgiIAAgkIAUAAIAAAkgADShJIAAglIAUAAIAAAlgAjkhrIAAgkIAUAAIAAAkgADSiSIAAglIAUAAIAAAlgAjkizIAAglIAUAAIAAAlgAC0jRIAAgUIAkAAIAAAUgABrjRIAAgUIAlAAIAAAUgAAjjRIAAgUIAkAAIAAAUgAgljRIAAgUIAlAAIAAAUgAhtjRIAAgUIAkAAIAAAUgAi2jRIAAgUIAkAAIAAAUg");
	this.shape_178.setTransform(23.05,22.975);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIAkAAIAAAUgABIDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAlAAIAAAUgAjZDmIAAgUIAkAAIAAAUgADSDcIAAglIAUAAIAAAlgAjkC1IAAglIAUAAIAAAlgADSCTIAAgkIAUAAIAAAkgAjkBsIAAgkIAUAAIAAAkgADSBKIAAgkIAUAAIAAAkgAjkAjIAAgjIAUAAIAAAjgADSABIAAgjIAUAAIAAAjgAjkgkIAAglIAUAAIAAAlgADShGIAAglIAUAAIAAAlgAjkhtIAAgkIAUAAIAAAkgADSiPIAAglIAUAAIAAAlgAjki2IAAgkIAUAAIAAAkgAC3jRIAAgUIAkAAIAAAUgABujRIAAgUIAlAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAjAAIAAAUgAhrjRIAAgUIAlAAIAAAUgAizjRIAAgUIAkAAIAAAUg");
	this.shape_179.setTransform(23.05,22.975);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("ACODmIAAgUIAlAAIAAAUgABGDmIAAgUIAkAAIAAAUgAgCDmIAAgUIAjAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAlAAIAAAUgAjdDmIAAgUIAlAAIAAAUgADSDfIAAglIAUAAIAAAlgAjkCyIAAglIAUAAIAAAlgADSCWIAAgkIAUAAIAAAkgAjkBpIAAgkIAUAAIAAAkgADSBNIAAgkIAUAAIAAAkgAjkAgIAAgjIAUAAIAAAjgADSAEIAAgjIAUAAIAAAjgAjkgnIAAglIAUAAIAAAlgADShDIAAglIAUAAIAAAlgAjkhwIAAgkIAUAAIAAAkgADSiMIAAglIAUAAIAAAlgAjki5IAAgkIAUAAIAAAkgAC7jRIAAgUIAkAAIAAAUgAByjRIAAgUIAkAAIAAAUgAApjRIAAgUIAkAAIAAAUgAgfjRIAAgUIAkAAIAAAUgAhojRIAAgUIAlAAIAAAUgAiwjRIAAgUIAkAAIAAAUg");
	this.shape_180.setTransform(23.05,22.975);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("ACMDmIAAgUIAkAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAjAAIAAAUgAhODmIAAgUIAkAAIAAAUgAiXDmIAAgUIAlAAIAAAUgAjfDmIAAgUIAkAAIAAAUgADSDiIAAglIAUAAIAAAlgAjkCvIAAglIAUAAIAAAlgADSCZIAAgkIAUAAIAAAkgAjkBmIAAgkIAUAAIAAAkgADSBQIAAgkIAUAAIAAAkgAjkAdIAAgjIAUAAIAAAjgADSAHIAAgjIAUAAIAAAjgAjkgqIAAglIAUAAIAAAlgADShAIAAglIAUAAIAAAlgAjkhzIAAgkIAUAAIAAAkgADSiJIAAglIAUAAIAAAlgAjki8IAAgkIAUAAIAAAkgAC9jRIAAgUIAkAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAkAAIAAAUgAhkjRIAAgUIAkAAIAAAUgAitjRIAAgUIAkAAIAAAUg");
	this.shape_181.setTransform(23.05,22.975);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("ACIDmIAAgUIAlAAIAAAUgABADmIAAgUIAkAAIAAAUgAgIDmIAAgUIAjAAIAAAUgAhRDmIAAgUIAkAAIAAAUgAiZDmIAAgUIAkAAIAAAUgAjiDmIAAgUIAlAAIAAAUgADSDkIAAgkIAUAAIAAAkgAjkCsIAAglIAUAAIAAAlgADSCbIAAgkIAUAAIAAAkgAjkBjIAAgkIAUAAIAAAkgADSBTIAAglIAUAAIAAAlgAjkAaIAAgjIAUAAIAAAjgADSAKIAAgjIAUAAIAAAjgAjkgtIAAglIAUAAIAAAlgADSg+IAAgkIAUAAIAAAkgAjkh2IAAgkIAUAAIAAAkgADSiHIAAgkIAUAAIAAAkgAjki/IAAgkIAUAAIAAAkgADAjRIAAgUIAkAAIAAAUgAB3jRIAAgUIAlAAIAAAUgAAvjRIAAgUIAkAAIAAAUgAgZjRIAAgUIAjAAIAAAUgAhijRIAAgUIAlAAIAAAUgAiqjRIAAgUIAkAAIAAAUg");
	this.shape_182.setTransform(23.05,22.975);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIAUAAIAAAjgACGDmIAAgUIAkAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAkAAIAAAUgAhTDmIAAgUIAkAAIAAAUgAicDmIAAgUIAkAAIAAAUgAjkDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjkCpIAAglIAUAAIAAAlgADSCeIAAgkIAUAAIAAAkgAjkBgIAAgkIAUAAIAAAkgADSBWIAAglIAUAAIAAAlgAjkAXIAAgjIAUAAIAAAjgADSANIAAgjIAUAAIAAAjgAjkgwIAAglIAUAAIAAAlgADSg7IAAgkIAUAAIAAAkgAjkh5IAAgkIAUAAIAAAkgADSiEIAAgkIAUAAIAAAkgAjkjCIAAgjIAYAAIAAAUIgEAAIAAAPgADSjNIAAgEIgPAAIAAgUIAjAAIAAAYgAB6jRIAAgUIAlAAIAAAUgAAyjRIAAgUIAkAAIAAAUgAgXjRIAAgUIAkAAIAAAUgAhfjRIAAgUIAkAAIAAAUgAiojRIAAgUIAkAAIAAAUg");
	this.shape_183.setTransform(23.05,22.975);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("ADMDmIAAgUIAGAAIAAgMIAUAAIAAAggACDDmIAAgUIAkAAIAAAUgAA6DmIAAgUIAkAAIAAAUgAgODmIAAgUIAjAAIAAAUgAhXDmIAAgUIAkAAIAAAUgAigDmIAAgUIAlAAIAAAUgAjkDmIAAgcIAUAAIAAAIIAMAAIAAAUgAjkCmIAAglIAUAAIAAAlgADSChIAAgkIAUAAIAAAkgAjkBdIAAgkIAUAAIAAAkgADSBZIAAglIAUAAIAAAlgAjkAUIAAgjIAUAAIAAAjgADSAQIAAgjIAUAAIAAAjgAjkgzIAAglIAUAAIAAAlgADSg4IAAgkIAUAAIAAAkgAjkh8IAAgkIAUAAIAAAkgADSiBIAAgkIAUAAIAAAkgAjkjFIAAggIAbAAIAAAUIgHAAIAAAMgADSjKIAAgHIgMAAIAAgUIAgAAIAAAbgAB9jRIAAgUIAlAAIAAAUgAA1jRIAAgUIAkAAIAAAUgAgTjRIAAgUIAjAAIAAAUgAhcjRIAAgUIAlAAIAAAUgAikjRIAAgUIAkAAIAAAUg");
	this.shape_184.setTransform(23.05,22.975);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIAUAAIAAAegACADmIAAgUIAkAAIAAAUgAA3DmIAAgUIAlAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAkAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjkDmIAAgeIAUAAIAAAKIAKAAIAAAUgADSCkIAAgkIAUAAIAAAkgAjkCkIAAgkIAUAAIAAAkgADSBbIAAgkIAUAAIAAAkgAjkBbIAAgkIAUAAIAAAkgADSATIAAgkIAUAAIAAAkgAjkATIAAgkIAUAAIAAAkgADSg1IAAgkIAUAAIAAAkgAjkg1IAAgkIAUAAIAAAkgADSh+IAAgkIAUAAIAAAkgAjkh+IAAgkIAUAAIAAAkgADSjHIAAgKIgJAAIAAgUIAdAAIAAAegAjkjHIAAgeIAeAAIAAAUIgKAAIAAAKgACAjRIAAgUIAkAAIAAAUgAA3jRIAAgUIAlAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAkAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_185.setTransform(23.05,22.975);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("ACgDmIAAgUIAkAAIAAAUgABXDmIAAgUIAkAAIAAAUgAAODmIAAgUIAlAAIAAAUgAg5DmIAAgUIAkAAIAAAUgAiCDmIAAgUIAkAAIAAAUgAjKDmIAAgUIAkAAIAAAUgADSDNIAAgkIATAAIAAAkgAjlDDIAAgkIAUAAIAAAkgADSCEIAAgkIATAAIAAAkgAjlB7IAAglIAUAAIAAAlgADSA8IAAglIATAAIAAANIAAAYgAjlAyIAAgkIAUAAIAAAkgADSgMIAAgkIATAAIAAAkgAjlgWIAAgkIAUAAIAAAkgADShVIAAgkIATAAIAAAkgAjlhfIAAgkIAUAAIAAAkgADSieIAAgkIATAAIAAAkgAjlinIAAglIAUAAIAAAlgACpjRIAAgUIAkAAIAAAUgABgjRIAAgUIAkAAIAAAUgAAXjRIAAgUIAkAAIAAAUgAgxjRIAAgUIAlAAIAAAUgAh5jRIAAgUIAkAAIAAAUgAjCjRIAAgUIAkAAIAAAUg");
	this.shape_186.setTransform(23.05,22.975);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("ACdDmIAAgUIAkAAIAAAUgABVDmIAAgUIAjAAIAAAUgAAMDmIAAgUIAkAAIAAAUgAg8DmIAAgUIAkAAIAAAUgAiFDmIAAgUIAlAAIAAAUgAjNDmIAAgUIAkAAIAAAUgADSDQIAAgkIATAAIAAAkgAjlDAIAAgkIAUAAIAAAkgADSCHIAAgkIATAAIAAAkgAjlB4IAAglIAUAAIAAAlgADSA/IAAglIATAAIAAAKIAAAbgAjlAvIAAgkIAUAAIAAAkgADSgJIAAgkIATAAIAAAkgAjlgZIAAgkIAUAAIAAAkgADShSIAAgkIATAAIAAAkgAjlhiIAAgkIAUAAIAAAkgADSibIAAgkIATAAIAAAkgAjliqIAAglIAUAAIAAAlgACsjRIAAgUIAkAAIAAAUgABjjRIAAgUIAlAAIAAAUgAAbjRIAAgUIAkAAIAAAUgAgujRIAAgUIAlAAIAAAUgAh2jRIAAgUIAkAAIAAAUgAi/jRIAAgUIAkAAIAAAUg");
	this.shape_187.setTransform(23.05,22.975);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("ACaDmIAAgUIAlAAIAAAUgABSDmIAAgUIAkAAIAAAUgAAJDmIAAgUIAkAAIAAAUgAg/DmIAAgUIAkAAIAAAUgAiIDmIAAgUIAkAAIAAAUgAjRDmIAAgUIAlAAIAAAUgADSDSIAAgkIATAAIAAAkgAjlC9IAAgkIAUAAIAAAkgADSCKIAAgkIATAAIAAAkgAjlB1IAAglIAUAAIAAAlgADSBBIAAgkIATAAIAAAHIAAAdgAjlAsIAAgkIAUAAIAAAkgADSgHIAAgkIATAAIAAAkgAjlgcIAAgkIAUAAIAAAkgADShPIAAglIATAAIAAAlgAjlhlIAAgkIAUAAIAAAkgADSiYIAAglIATAAIAAAlgAjlitIAAgkIAUAAIAAAkgACvjRIAAgUIAjAAIAAAUgABmjRIAAgUIAkAAIAAAUgAAejRIAAgUIAkAAIAAAUgAgqjRIAAgUIAkAAIAAAUgAhzjRIAAgUIAlAAIAAAUgAi7jRIAAgUIAkAAIAAAUg");
	this.shape_188.setTransform(23.05,22.975);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("ACXDmIAAgUIAkAAIAAAUgABODmIAAgUIAkAAIAAAUgAAFDmIAAgUIAlAAIAAAUgAhCDmIAAgUIAkAAIAAAUgAiLDmIAAgUIAkAAIAAAUgAjSDmIAAgUIAjAAIAAAUgADSDSIAAghIATAAIAAAhgAjlC6IAAgkIAUAAIAAAkgADSCNIAAgkIATAAIAAAkgAjlByIAAglIAUAAIAAAlgADSBEIAAgkIATAAIAAAEIAAAggAjlApIAAgkIAUAAIAAAkgADSgEIAAgkIATAAIAAAkgAjlgfIAAgkIAUAAIAAAkgADShMIAAglIATAAIAAAlgAjlhoIAAgkIAUAAIAAAkgADSiVIAAglIATAAIAAAlgAjliwIAAghIAUAAIAAAhgACyjRIAAgUIAgAAIAAAUgABpjRIAAgUIAkAAIAAAUgAAgjRIAAgUIAkAAIAAAUgAgojRIAAgUIAlAAIAAAUgAhwjRIAAgUIAkAAIAAAUgAi5jRIAAgUIAkAAIAAAUg");
	this.shape_189.setTransform(23.05,22.975);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("ACUDmIAAgUIAkAAIAAAAIgBAAIAAAUgABMDmIAAgUIAkAAIAAAUgAADDmIAAgUIAkAAIAAAUgAhFDmIAAgUIAkAAIAAAUgAiODmIAAgUIAlAAIAAAUgAjRDmIAAgUIAfAAIAAAUgADSDSIAAgeIATAAIAAAegAjRC3IAAgBIgUAAIAAgjIAUAAIAAAkgADSCQIAAgkIATAAIAAAkgAjlBvIAAglIAUAAIAAAlgADSBHIAAgkIATAAIAAABIAAAjgAjlAmIAAgkIAUAAIAAAkgADSgBIAAgkIATAAIAAAkgAjlgiIAAgkIAUAAIAAAkgADShJIAAglIATAAIAAAlgAjlhrIAAgkIAUAAIAAAkgADSiSIAAgkIATAAIAAAkgAjlizIAAgeIAUAAIAAAegAC1jRIAAgUIAdAAIAAAUgABsjRIAAgUIAkAAIAAAUgAAjjRIAAgUIAkAAIAAAUgAgljRIAAgUIAkAAIAAAUgAhujRIAAgUIAlAAIAAAUgAizjRIAAgUIAhAAIAAAUg");
	this.shape_190.setTransform(23.05,22.975);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIASAAIAAAUgABJDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAkAAIAAAUgAjRDmIAAgUIAcAAIAAAUgADSDSIAAgbIATAAIAAAbgAjlCiIAAgSIAUAAIAAASgADSCTIAAgkIATAAIAAAkgAjlBsIAAgkIAUAAIAAAkgADSBKIAAgkIATAAIAAAkgAjlAjIAAgjIAUAAIAAAjgADSABIAAgjIATAAIAAAjgAjlgkIAAglIAUAAIAAAlgADShGIAAglIATAAIAAAlgAjlhtIAAgkIAUAAIAAAkgADSiPIAAgSIATAAIAAASgAjli2IAAgbIAUAAIAAAbgAC3jRIAAgUIAbAAIAAAUgABvjRIAAgUIAkAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAkAAIAAAUgAhqjRIAAgUIAkAAIAAAUgAiejRIAAgUIAPAAIAAAUg");
	this.shape_191.setTransform(23.05,22.975);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("ABFDmIAAgUIAkAAIAAAUgAgDDmIAAgUIAkAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAkAAIAAAUgAjRDmIAAgUIAZAAIAAAUgADSDSIAAgYIATAAIAAAYgADSCWIAAgkIATAAIAAAkgAjlBpIAAgkIAUAAIAAAkgADSBNIAAgkIATAAIAAAkgAjlAgIAAgjIAUAAIAAAjgADSAEIAAgjIATAAIAAAjgAjlgnIAAglIAUAAIAAAlgADShDIAAglIATAAIAAAlgAjlhwIAAgkIAUAAIAAAkgAjli5IAAgYIAUAAIAAAYgAC6jRIAAgUIAYAAIAAAUgABxjRIAAgUIAlAAIAAAUgAApjRIAAgUIAkAAIAAAUgAgfjRIAAgUIAjAAIAAAUgAhojRIAAgUIAlAAIAAAUg");
	this.shape_192.setTransform(23.05,22.975);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("ABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAkAAIAAAUgAhNDmIAAgUIAkAAIAAAUgAiWDmIAAgUIAkAAIAAAUgAjRDmIAAgUIAXAAIAAAUgADSDSIAAgVIATAAIAAAVgADSCZIAAgkIATAAIAAAkgAjlBmIAAgkIAUAAIAAAkgADSBQIAAgkIATAAIAAAkgAjlAdIAAgjIAUAAIAAAjgADSAHIAAgjIATAAIAAAjgAjlgqIAAglIAUAAIAAAlgADShAIAAglIATAAIAAAlgAjlhzIAAgkIAUAAIAAAkgAjli8IAAgUIAUAAIAAAUgAC+jRIAAgUIAUAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAjAAIAAAUgAhkjRIAAgUIAkAAIAAAUg");
	this.shape_193.setTransform(23.05,22.975);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgIDmIAAgUIAkAAIAAAUgAhQDmIAAgUIAkAAIAAAUgAiaDmIAAgUIAlAAIAAAUgAjQDmIAAgUIASAAIAAAUgADSDSIAAgSIATAAIAAASgADSCbIAAgkIATAAIAAAkgADSBTIAAglIATAAIAAAlgAjlAaIAAgjIAUAAIAAAjgADSAKIAAgjIATAAIAAAjgAjlgtIAAglIAUAAIAAAlgAjlh2IAAgkIAUAAIAAAkgAjli/IAAgRIAUAAIAAARgADAjRIAAgUIASAAIAAAUgAB4jRIAAgUIAkAAIAAAUgAAvjRIAAgUIAkAAIAAAUgAgZjRIAAgUIAkAAIAAAUg");
	this.shape_194.setTransform(23.05,22.975);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgLDmIAAgUIAiAAIAAAUgAhUDmIAAgUIAkAAIAAAUgAidDmIAAgUIAlAAIAAAUgAjQDmIAAgUIAPAAIAAAUgADSDSIAAgPIATAAIAAAPgADSCeIAAgkIATAAIAAAkgADSBWIAAglIATAAIAAAlgAjlAXIAAgjIAUAAIAAAjgADSANIAAgjIATAAIAAAjgAjlgwIAAglIAUAAIAAAlgAjlh5IAAgkIAUAAIAAAkgAjljCIAAgOIAUAAIAAAOgADDjRIAAgUIAPAAIAAAUgAB6jRIAAgUIAkAAIAAAUgAAxjRIAAgUIAkAAIAAAUgAgTjRIAAgUIAgAAIAAAUg");
	this.shape_195.setTransform(23.05,22.975);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AhWDmIAAgUIAkAAIAAAUgAifDmIAAgUIAkAAIAAAUgAjPDmIAAgUIAMAAIAAAUgADSDSIAAgMIATAAIAAAMgADSChIAAgkIATAAIAAAkgADSBZIAAglIATAAIAAAlgAjlgzIAAglIAUAAIAAAlgAjlh8IAAgkIAUAAIAAAkgAjljFIAAgLIAUAAIAAALgADGjRIAAgUIAMAAIAAAUgAB9jRIAAgUIAlAAIAAAUgAA0jRIAAgUIAkAAIAAAUg");
	this.shape_196.setTransform(23.05,22.975);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AhZDmIAAgUIAIAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjODmIAAgUIAIAAIAAAUgADSDSIAAgKIATAAIAAAKgADSCkIAAgkIATAAIAAAkgADSBbIAAgJIATAAIAAAJgAjlhRIAAgIIAUAAIAAAIgAjlh+IAAgkIAUAAIAAAkgAjljHIAAgJIAUAAIAAAJgADJjRIAAgUIAJAAIAAAUgACBjRIAAgUIAkAAIAAAUgABWjRIAAgUIAGAAIAAAUg");
	this.shape_197.setTransform(23.05,22.975);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AilDmIAAgUIAXAAIAAAUgAjODmIAAgUIAFAAIAAAUgADSDRIAAgGIATAAIAAAGgADSCnIAAgYIATAAIAAAYgAjliOIAAgXIAUAAIAAAXgAjljKIAAgGIAUAAIAAAGgADMjRIAAgUIAGAAIAAAUgACTjRIAAgUIAUAAIAAAUg");
	this.shape_198.setTransform(23.05,22.975);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("ADLDmIAAgUIAHAAIAAAUgAjlDRIAAgHIAUAAIAAAHgADSjKIAAgGIATAAIAAAGgAjNjRIAAgUIAEAAIAAAUg");
	this.shape_199.setTransform(23.05,22.975);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAAUgAjlDRIAAgJIAUAAIAAAJgADSjHIAAgJIATAAIAAAJgAjNjRIAAgUIAHAAIAAAUg");
	this.shape_200.setTransform(23.05,22.975);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAAUgAjlDRIAAgMIAUAAIAAAMgADSjEIAAgMIATAAIAAAMgAjNjRIAAgUIAKAAIAAAUg");
	this.shape_201.setTransform(23.05,22.975);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("ADDDmIAAgUIAPAAIAAAUgACTDmIAAgUIALAAIAAAUgAjlDRIAAgPIAUAAIAAAPgAjlCeIAAgKIAUAAIAAAKgADSiSIAAgKIATAAIAAAKgADSjBIAAgPIATAAIAAAPgAicjRIAAgUIAJAAIAAAUgAjNjRIAAgUIANAAIAAAUg");
	this.shape_202.setTransform(23.05,22.975);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAAUgAB4DmIAAgUIAkAAIAAAUgAjlDRIAAgSIAUAAIAAASgAjlCbIAAgjIAUAAIAAAjgADSh3IAAgiIATAAIAAAigADSi+IAAgSIATAAIAAASgAiZjRIAAgUIAhAAIAAAUgAjNjRIAAgUIAPAAIAAAUg");
	this.shape_203.setTransform(23.05,22.975);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAVAAIAAAUgAB1DmIAAgUIAkAAIAAAUgAjlDRIAAgVIAUAAIAAAVgAjlCYIAAgkIAUAAIAAAkgADShyIAAglIATAAIAAAlgADSi7IAAgVIATAAIAAAVgAiWjRIAAgUIAlAAIAAAUgAjNjRIAAgUIATAAIAAAUg");
	this.shape_204.setTransform(23.05,22.975);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AC6DmIAAgUIAYAAIAAAUgAByDmIAAgUIAkAAIAAAUgAAyDmIAAgUIAbAAIAAAUgAjlDRIAAgYIAUAAIAAAYgAjlCVIAAgkIAUAAIAAAkgAjlBMIAAgZIAUAAIAAAZgADSgxIAAgaIATAAIAAAagADShvIAAglIATAAIAAAlgADSi4IAAgYIATAAIAAAYgAhLjRIAAgUIAZAAIAAAUgAiTjRIAAgUIAkAAIAAAUgAjNjRIAAgUIAVAAIAAAUg");
	this.shape_205.setTransform(23.05,22.975);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAbAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAlAAIAAAUgAjlDRIAAgbIAUAAIAAAbgAjlCSIAAgkIAUAAIAAAkgAjlBJIAAgkIAUAAIAAAkgADSgkIAAgkIATAAIAAAkgADShsIAAglIATAAIAAAlgADSi1IAAgbIATAAIAAAbgAhHjRIAAgUIAkAAIAAAUgAiQjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAYAAIAAAUg");
	this.shape_206.setTransform(23.05,22.975);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AC1DmIAAgUIAdAAIAAAUgABsDmIAAgUIAkAAIAAAUgAAjDmIAAgUIAlAAIAAAUgAglDmIAAgUIAkAAIAAAUgAjlDRIAAgdIAUAAIAAAdgAjlCQIAAglIAUAAIAAAlgAjlBHIAAgkIAUAAIAAAkgADSAnIAAgkIATAAIAAAhIAAADgAjlgBIAAgkIAUAAIAAAkgADSghIAAgkIATAAIAAAkgADShpIAAglIATAAIAAAlgADSiyIAAgeIATAAIAAAegAADjRIAAgUIAjAAIAAAUgAhEjRIAAgUIAkAAIAAAUgAiNjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAcAAIAAAUg");
	this.shape_207.setTransform(23.05,22.975);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("ACxDmIAAgUIAhAAIAAAUgABpDmIAAgUIAkAAIAAAUgAAgDmIAAgUIAkAAIAAAUgAgoDmIAAgUIAkAAIAAAUgAhbDmIAAgUIAPAAIAAAUgAjlDRIAAggIAUAAIAAAggAjlCNIAAglIAUAAIAAAlgADSBbIAAgMIATAAIAAAMgAjlBEIAAgkIAUAAIAAAkgADSAqIAAgkIATAAIAAAeIAAAGgAjlgEIAAgkIAUAAIAAAkgADSgeIAAgkIATAAIAAAkgAjlhNIAAgNIAUAAIAAANgADShmIAAglIATAAIAAAlgADSivIAAghIATAAIAAAhgABOjRIAAgUIANAAIAAAUgAAGjRIAAgUIAkAAIAAAUgAhCjRIAAgUIAkAAIAAAUgAiLjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAeAAIAAAUg");
	this.shape_208.setTransform(23.05,22.975);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("ACvDmIAAgUIAjAAIAAAUgABmDmIAAgUIAkAAIAAAUgAAdDmIAAgUIAlAAIAAAUgAgqDmIAAgUIAkAAIAAAUgAhzDmIAAgUIAkAAIAAAUgAjlDQIAAgiIAUAAIAAAigAjlCKIAAglIAUAAIAAAlgADSB2IAAgkIATAAIAAAkgAjlBBIAAgkIAUAAIAAAkgADSAtIAAgkIATAAIAAAbIAAAJgAjlgHIAAgkIAUAAIAAAkgADSgbIAAgkIATAAIAAAkgAjlhQIAAgkIAUAAIAAAkgADShjIAAglIATAAIAAAlgADSisIAAgkIATAAIAAAkgABSjRIAAgUIAkAAIAAAUgAAJjRIAAgUIAkAAIAAAUgAg/jRIAAgUIAlAAIAAAUgAiIjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAhAAIAAAUg");
	this.shape_209.setTransform(23.05,22.975);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("ACsDmIAAgUIAkAAIAAAUgABjDmIAAgUIAkAAIAAAUgAAaDmIAAgUIAlAAIAAAUgAguDmIAAgUIAkAAIAAAUgAh3DmIAAgUIAlAAIAAAUgAi/DmIAAgUIAkAAIAAAUgAjlDPIAAgkIAUAAIAAAkgADSDBIAAgkIATAAIAAAkgAjlCHIAAglIAUAAIAAAlgADSB4IAAgkIATAAIAAAkgAjlA+IAAgkIAUAAIAAAkgADSAwIAAglIATAAIAAAZIAAAMgAjlgKIAAgkIAUAAIAAAkgADSgYIAAgkIATAAIAAAkgAjlhTIAAgkIAUAAIAAAkgADShhIAAgkIATAAIAAAkgAjlibIAAglIAUAAIAAAlgADSiqIAAgkIATAAIAAAkgACdjRIAAgUIAkAAIAAAUgABVjRIAAgUIAkAAIAAAUgAAMjRIAAgUIAkAAIAAAUgAg8jRIAAgUIAlAAIAAAUgAiEjRIAAgUIAkAAIAAAUgAjNjRIAAgUIAkAAIAAAUg");
	this.shape_210.setTransform(23.05,22.975);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIAlAAIAAAUgABJDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAkAAIAAAUgAjaDmIAAgUIAlAAIAAAUgADSDcIAAglIATAAIAAAlgAjlC1IAAglIAUAAIAAAlgADSCTIAAgkIATAAIAAAkgAjlBsIAAgkIAUAAIAAAkgADSBKIAAgkIATAAIAAAkgAjlAjIAAgjIAUAAIAAAjgADSABIAAgjIATAAIAAAjgAjlgkIAAglIAUAAIAAAlgADShGIAAglIATAAIAAAlgAjlhtIAAgkIAUAAIAAAkgADSiPIAAglIATAAIAAAlgAjli2IAAgkIAUAAIAAAkgAC3jRIAAgUIAlAAIAAAUgABvjRIAAgUIAkAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAkAAIAAAUgAhqjRIAAgUIAkAAIAAAUgAizjRIAAgUIAkAAIAAAUg");
	this.shape_211.setTransform(23.05,22.975);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("ACODmIAAgUIAkAAIAAAUgABFDmIAAgUIAkAAIAAAUgAgDDmIAAgUIAkAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAkAAIAAAUgAjdDmIAAgUIAlAAIAAAUgADSDfIAAglIATAAIAAAlgAjlCyIAAglIAUAAIAAAlgADSCWIAAgkIATAAIAAAkgAjlBpIAAgkIAUAAIAAAkgADSBNIAAgkIATAAIAAAkgAjlAgIAAgjIAUAAIAAAjgADSAEIAAgjIATAAIAAAjgAjlgnIAAglIAUAAIAAAlgADShDIAAglIATAAIAAAlgAjlhwIAAgkIAUAAIAAAkgADSiMIAAglIATAAIAAAlgAjli5IAAgkIAUAAIAAAkgAC6jRIAAgUIAkAAIAAAUgABxjRIAAgUIAlAAIAAAUgAApjRIAAgUIAkAAIAAAUgAgfjRIAAgUIAjAAIAAAUgAhojRIAAgUIAlAAIAAAUgAiwjRIAAgUIAkAAIAAAUg");
	this.shape_212.setTransform(23.05,22.975);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("ACLDmIAAgUIAlAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAkAAIAAAUgAhNDmIAAgUIAkAAIAAAUgAiWDmIAAgUIAkAAIAAAUgAjfDmIAAgUIAlAAIAAAUgADSDiIAAglIATAAIAAAlgAjlCvIAAglIAUAAIAAAlgADSCZIAAgkIATAAIAAAkgAjlBmIAAgkIAUAAIAAAkgADSBQIAAgkIATAAIAAAkgAjlAdIAAgjIAUAAIAAAjgADSAHIAAgjIATAAIAAAjgAjlgqIAAglIAUAAIAAAlgADShAIAAglIATAAIAAAlgAjlhzIAAgkIAUAAIAAAkgADSiJIAAglIATAAIAAAlgAjli8IAAgkIAUAAIAAAkgAC+jRIAAgUIAkAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAjAAIAAAUgAhljRIAAgUIAlAAIAAAUgAitjRIAAgUIAkAAIAAAUg");
	this.shape_213.setTransform(23.05,22.975);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIATAAIAAAjgACFDmIAAgUIAlAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAjAAIAAAUgAhUDmIAAgUIAkAAIAAAUgAidDmIAAgUIAlAAIAAAUgAjlDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjlCpIAAglIAUAAIAAAlgADSCeIAAgkIATAAIAAAkgAjlBgIAAgkIAUAAIAAAkgADSBWIAAglIATAAIAAAlgAjlAXIAAgjIAUAAIAAAjgADSANIAAgjIATAAIAAAjgAjlgwIAAglIAUAAIAAAlgADSg7IAAgkIATAAIAAAkgAjlh5IAAgkIAUAAIAAAkgADSiEIAAgkIATAAIAAAkgAjljCIAAgjIAZAAIAAAUIgFAAIAAAPgADSjNIAAgEIgPAAIAAgUIAiAAIAAAYgAB6jRIAAgUIAkAAIAAAUgAAxjRIAAgUIAkAAIAAAUgAgXjRIAAgUIAkAAIAAAUgAhfjRIAAgUIAlAAIAAAUgAinjRIAAgUIAkAAIAAAUg");
	this.shape_214.setTransform(23.05,22.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_160}]}).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[]},1).to({state:[{t:this.shape_199}]},26).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_184}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(23,23,23,23);
// library properties:
lib.properties = {
	id: '06',
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
an.compositions['06'] = {
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