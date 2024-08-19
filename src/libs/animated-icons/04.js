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
(lib._04 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(167));

	// k4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhPhPICfAAIAACfIifAAg");
	this.shape.setTransform(40.95,36.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhJhIICTAAIAACSIiTAAg");
	this.shape_1.setTransform(39.775,35.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhChCICFAAIAACFIiFAAg");
	this.shape_2.setTransform(38.6,34.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag8g8IB5AAIAAB4Ih5AAg");
	this.shape_3.setTransform(37.425,33.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag1g1IBsAAIAABrIhsAAg");
	this.shape_4.setTransform(36.25,32.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgvgvIBfAAIAABfIhfAAg");
	this.shape_5.setTransform(35.1,31.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogoIBRAAIAABRIhRAAg");
	this.shape_6.setTransform(33.9,29.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgigiIBFAAIAABFIhFAAg");
	this.shape_7.setTransform(32.75,28.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgcgbIA5AAIAAA4Ig5AAg");
	this.shape_8.setTransform(31.575,27.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgWgVIAtAAIAAArIgtAAg");
	this.shape_9.setTransform(30.4,26.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgPgPIAfAAIAAAfIgfAAg");
	this.shape_10.setTransform(29.225,25.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_11.setTransform(27,23.05);
	this.shape_11._off = true;

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgRgQIAjAAIAAAhIgjAAg");
	this.shape_12.setTransform(41,36.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgYgYIAxAAIAAAxIgxAAg");
	this.shape_13.setTransform(40.975,36.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AggggIBBAAIAABBIhBAAg");
	this.shape_14.setTransform(41,36.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgwgvIBhAAIAABfIhhAAg");
	this.shape_15.setTransform(40.975,36.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag4g3IBwAAIAABvIhwAAg");
	this.shape_16.setTransform(40.95,36.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag/g/IB/AAIAAB/Ih/AAg");
	this.shape_17.setTransform(40.975,36.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhHhHICPAAIAACPIiPAAg");
	this.shape_18.setTransform(40.95,36.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},26).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6,p:{x:33.9,y:29.925}}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape}]},1).to({state:[]},1).to({state:[{t:this.shape_11}]},5).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_6,p:{x:40.975,y:36.975}}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape}]},1).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(26).to({_off:true},1).wait(10).to({_off:false,scaleX:0.1167,scaleY:0.1167,x:28.0467,y:24.0406},0).to({_off:true},1).wait(50).to({_off:false,x:40.9967,y:36.9906},0).to({_off:true},1).wait(8).to({_off:false,scaleX:1,scaleY:1,x:40.95,y:36.975},0).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(43).to({_off:false},0).wait(1).to({x:27.1,y:22.95},0).wait(1).to({x:27.5,y:22.55},0).wait(1).to({x:28.1,y:21.95},0).wait(1).to({x:29,y:21.05},0).wait(1).to({x:30.1,y:19.95},0).wait(1).to({x:31.5,y:18.55},0).wait(1).to({x:33.1,y:16.95},0).wait(1).to({x:34.9,y:15.1},0).wait(1).to({x:36.5,y:13.5},0).wait(1).to({x:37.9,y:12.1},0).wait(1).to({x:39,y:11},0).wait(1).to({x:39.9,y:10.1},0).wait(1).to({x:40.5,y:9.5},0).wait(1).to({x:40.9,y:9.1},0).wait(1).to({x:41,y:9},0).wait(1).to({y:9.15},0).wait(1).to({y:9.65},0).wait(1).to({y:10.5},0).wait(1).to({y:11.65},0).wait(1).to({y:13.15},0).wait(1).to({y:14.95},0).wait(1).to({y:17.1},0).wait(1).to({y:19.6},0).wait(1).to({y:22.4},0).wait(1).to({y:25.55},0).wait(1).to({y:29.05},0).wait(1).to({y:32.85},0).wait(1).to({y:37},0).wait(1).to({y:38.9},0).wait(1).to({y:40.5},0).wait(1).to({y:41.9},0).wait(1).to({y:43},0).wait(1).to({y:43.9},0).wait(1).to({y:44.5},0).wait(1).to({y:44.9},0).wait(1).to({y:45},0).wait(2).to({y:44.9},0).wait(1).to({y:44.6},0).wait(1).to({y:44},0).wait(1).to({y:43.05},0).wait(1).to({y:41.65},0).wait(1).to({y:39.65},0).wait(1).to({y:37},0).to({_off:true},1).wait(79));

	// k3
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhPhPICfAAIAACfIifAAg");
	this.shape_19.setTransform(40.95,9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhIhJICSAAIAACTIiSAAg");
	this.shape_20.setTransform(39.8,10.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhChCICFAAIAACFIiFAAg");
	this.shape_21.setTransform(38.6,11.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag8g8IB4AAIAAB5Ih4AAg");
	this.shape_22.setTransform(37.45,12.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag1g1IBrAAIAABrIhrAAg");
	this.shape_23.setTransform(36.275,13.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgvgvIBfAAIAABfIhfAAg");
	this.shape_24.setTransform(35.125,14.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogoIBRAAIAABRIhRAAg");
	this.shape_25.setTransform(33.925,16.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgigiIBFAAIAABFIhFAAg");
	this.shape_26.setTransform(32.775,17.225);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgcgbIA5AAIAAA3Ig5AAg");
	this.shape_27.setTransform(31.6,18.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgVgVIArAAIAAArIgrAAg");
	this.shape_28.setTransform(30.45,19.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgPgOIAfAAIAAAdIgfAAg");
	this.shape_29.setTransform(29.25,20.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_30.setTransform(27,23.05);
	this.shape_30._off = true;

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgQgQIAhAAIAAAhIghAAg");
	this.shape_31.setTransform(40.95,9.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgYgYIAxAAIAAAxIgxAAg");
	this.shape_32.setTransform(40.95,9.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AggggIBBAAIAABBIhBAAg");
	this.shape_33.setTransform(40.95,9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogoIBQAAIAABRIhQAAg");
	this.shape_34.setTransform(40.95,9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgwgvIBgAAIAABfIhgAAg");
	this.shape_35.setTransform(40.95,9.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag4g3IBwAAIAABvIhwAAg");
	this.shape_36.setTransform(40.95,9.025);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag/g/IB/AAIAAB/Ih/AAg");
	this.shape_37.setTransform(40.95,9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhHhHICPAAIAACPIiPAAg");
	this.shape_38.setTransform(40.95,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19}]}).to({state:[{t:this.shape_19}]},26).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_19}]},1).to({state:[]},1).to({state:[{t:this.shape_30}]},5).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_19}]},1).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(26).to({_off:true},1).wait(10).to({_off:false,scaleX:0.1111,scaleY:0.1111,x:28.1071,y:21.928},0).to({_off:true},1).wait(50).to({_off:false,x:40.9571,y:9.028},0).to({_off:true},1).wait(8).to({_off:false,scaleX:1,scaleY:1,x:40.95,y:9},0).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_30).wait(43).to({_off:false},0).wait(1).to({x:26.9,y:22.95},0).wait(1).to({x:26.5,y:22.55},0).wait(1).to({x:25.9,y:21.95},0).wait(1).to({x:25,y:21.05},0).wait(1).to({x:23.9,y:19.95},0).wait(1).to({x:22.5,y:18.55},0).wait(1).to({x:20.9,y:16.95},0).wait(1).to({x:19.05,y:15.1},0).wait(1).to({x:17.45,y:13.5},0).wait(1).to({x:16.05,y:12.1},0).wait(1).to({x:14.95,y:11},0).wait(1).to({x:14.05,y:10.1},0).wait(1).to({x:13.45,y:9.5},0).wait(1).to({x:13.05,y:9.1},0).wait(1).to({x:12.95,y:9},0).wait(1).to({x:13.1},0).wait(1).to({x:13.6},0).wait(1).to({x:14.45},0).wait(1).to({x:15.6},0).wait(1).to({x:17.1},0).wait(1).to({x:18.95},0).wait(1).to({x:21.1},0).wait(1).to({x:23.55},0).wait(1).to({x:26.4},0).wait(1).to({x:29.55},0).wait(1).to({x:33.05},0).wait(1).to({x:36.85},0).wait(1).to({x:41},0).wait(1).to({x:42.9},0).wait(1).to({x:44.5},0).wait(1).to({x:45.9},0).wait(1).to({x:47},0).wait(1).to({x:47.9},0).wait(1).to({x:48.5},0).wait(1).to({x:48.9},0).wait(1).to({x:49},0).wait(2).to({x:48.9},0).wait(1).to({x:48.6},0).wait(1).to({x:48},0).wait(1).to({x:47.05},0).wait(1).to({x:45.65},0).wait(1).to({x:43.65},0).wait(1).to({x:41},0).to({_off:true},1).wait(79));

	// k2
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhPhPICfAAIAACfIifAAg");
	this.shape_39.setTransform(12.95,9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhJhJICTAAIAACTIiTAAg");
	this.shape_40.setTransform(14.15,10.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhChCICFAAIAACFIiFAAg");
	this.shape_41.setTransform(15.325,11.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag8g8IB5AAIAAB5Ih5AAg");
	this.shape_42.setTransform(16.5,12.525);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag1g1IBrAAIAABrIhrAAg");
	this.shape_43.setTransform(17.675,13.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgvgvIBfAAIAABfIhfAAg");
	this.shape_44.setTransform(18.875,14.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgpgoIBSAAIAABRIhSAAg");
	this.shape_45.setTransform(20.05,16.075);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgigiIBFAAIAABFIhFAAg");
	this.shape_46.setTransform(21.25,17.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgcgbIA5AAIAAA4Ig5AAg");
	this.shape_47.setTransform(22.425,18.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgVgVIArAAIAAArIgrAAg");
	this.shape_48.setTransform(23.6,19.625);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgPgPIAfAAIAAAfIgfAAg");
	this.shape_49.setTransform(24.775,20.8);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_50.setTransform(27,23.05);
	this.shape_50._off = true;

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgQgQIAhAAIAAAhIghAAg");
	this.shape_51.setTransform(12.975,9.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgYgYIAxAAIAAAxIgxAAg");
	this.shape_52.setTransform(12.95,9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AggggIBBAAIAABBIhBAAg");
	this.shape_53.setTransform(12.975,9.025);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogoIBRAAIAABRIhRAAg");
	this.shape_54.setTransform(12.975,9.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_55.setTransform(12.95,9);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag4g4IBxAAIAABxIhxAAg");
	this.shape_56.setTransform(12.95,9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag/g/IB/AAIAAB/Ih/AAg");
	this.shape_57.setTransform(12.975,9.025);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhHhHICPAAIAACPIiPAAg");
	this.shape_58.setTransform(12.95,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39}]}).to({state:[{t:this.shape_39}]},26).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_39}]},1).to({state:[]},1).to({state:[{t:this.shape_50}]},5).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_39}]},1).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(26).to({_off:true},1).wait(10).to({_off:false,scaleX:0.1167,scaleY:0.1167,x:25.98,y:21.9768},0).to({_off:true},1).wait(50).to({_off:false,x:12.98,y:9.0268},0).to({_off:true},1).wait(8).to({_off:false,scaleX:1,scaleY:1,x:12.95,y:9},0).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_50).wait(43).to({_off:false},0).wait(1).to({x:26.9,y:23.15},0).wait(1).to({x:26.5,y:23.55},0).wait(1).to({x:25.9,y:24.15},0).wait(1).to({x:25,y:25.05},0).wait(1).to({x:23.9,y:26.15},0).wait(1).to({x:22.5,y:27.5},0).wait(1).to({x:20.9,y:29.15},0).wait(1).to({x:19.1,y:30.9},0).wait(1).to({x:17.5,y:32.55},0).wait(1).to({x:16.1,y:33.9},0).wait(1).to({x:15,y:35},0).wait(1).to({x:14.1,y:35.9},0).wait(1).to({x:13.5,y:36.5},0).wait(1).to({x:13.1,y:36.9},0).wait(1).to({x:13,y:37},0).wait(1).to({y:36.85},0).wait(1).to({y:36.35},0).wait(1).to({y:35.5},0).wait(1).to({y:34.35},0).wait(1).to({y:32.85},0).wait(1).to({y:31.05},0).wait(1).to({y:28.9},0).wait(1).to({y:26.4},0).wait(1).to({y:23.6},0).wait(1).to({x:12.95,y:20.45},0).wait(1).to({y:16.95},0).wait(1).to({y:13.15},0).wait(1).to({y:9},0).wait(1).to({y:7.15},0).wait(1).to({y:5.5},0).wait(1).to({x:13,y:4.15},0).wait(1).to({y:3},0).wait(1).to({y:2.15},0).wait(1).to({y:1.5},0).wait(1).to({y:1.15},0).wait(1).to({y:1},0).wait(2).to({y:1.15},0).wait(1).to({y:1.4},0).wait(1).to({y:2},0).wait(1).to({y:2.95},0).wait(1).to({y:4.4},0).wait(1).to({x:12.95,y:6.35},0).wait(1).to({y:9},0).to({_off:true},1).wait(79));

	// k1
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhPhPICfAAIAACfIifAAg");
	this.shape_59.setTransform(12.95,36.975);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhJhIICTAAIAACRIiTAAg");
	this.shape_60.setTransform(14.15,35.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhChCICFAAIAACFIiFAAg");
	this.shape_61.setTransform(15.3,34.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag8g7IB5AAIAAB3Ih5AAg");
	this.shape_62.setTransform(16.5,33.475);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag1g1IBrAAIAABrIhrAAg");
	this.shape_63.setTransform(17.65,32.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgvguIBfAAIAABdIhfAAg");
	this.shape_64.setTransform(18.85,31.125);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogoIBRAAIAABRIhRAAg");
	this.shape_65.setTransform(20,29.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AghghIBDAAIAABDIhDAAg");
	this.shape_66.setTransform(21.2,28.775);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgbgbIA3AAIAAA3Ig3AAg");
	this.shape_67.setTransform(22.35,27.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgUgVIAqAAIAAAqIgqAAg");
	this.shape_68.setTransform(23.55,26.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgOgOIAdAAIAAAdIgdAAg");
	this.shape_69.setTransform(24.7,25.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_70.setTransform(27,23.05);
	this.shape_70._off = true;

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgPgPIAgAAIAAAfIggAAg");
	this.shape_71.setTransform(12.95,37);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgXgYIAwAAIAAAxIgwAAg");
	this.shape_72.setTransform(12.95,37);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgggfIBBAAIAAA/IhBAAg");
	this.shape_73.setTransform(12.95,36.975);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgngnIBQAAIAABPIhQAAg");
	this.shape_74.setTransform(12.95,36.975);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgvgvIBfAAIAABfIhfAAg");
	this.shape_75.setTransform(12.95,37);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag3g3IBvAAIAABvIhvAAg");
	this.shape_76.setTransform(12.95,37);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag/g/IB/AAIAAB/Ih/AAg");
	this.shape_77.setTransform(12.95,36.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AhHhHICPAAIAACPIiPAAg");
	this.shape_78.setTransform(12.95,36.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_59}]}).to({state:[{t:this.shape_59}]},26).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_59}]},1).to({state:[]},1).to({state:[{t:this.shape_70}]},5).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_59}]},1).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_59).wait(26).to({_off:true},1).wait(10).to({_off:false,scaleX:0.1061,scaleY:0.1061,x:25.9054,y:24.0901},0).to({_off:true},1).wait(50).to({_off:false,x:12.9554,y:36.9901},0).to({_off:true},1).wait(8).to({_off:false,scaleX:1,scaleY:1,x:12.95,y:36.975},0).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.shape_70).wait(43).to({_off:false},0).wait(1).to({x:27.1,y:23.15},0).wait(1).to({x:27.5,y:23.55},0).wait(1).to({x:28.1,y:24.15},0).wait(1).to({x:29,y:25.05},0).wait(1).to({x:30.1,y:26.15},0).wait(1).to({x:31.5,y:27.5},0).wait(1).to({x:33.1,y:29.15},0).wait(1).to({x:34.9,y:30.9},0).wait(1).to({x:36.5,y:32.55},0).wait(1).to({x:37.9,y:33.9},0).wait(1).to({x:39,y:35},0).wait(1).to({x:39.9,y:35.9},0).wait(1).to({x:40.5,y:36.5},0).wait(1).to({x:40.9,y:36.9},0).wait(1).to({x:41,y:37},0).wait(1).to({x:40.85},0).wait(1).to({x:40.35},0).wait(1).to({x:39.5},0).wait(1).to({x:38.35},0).wait(1).to({x:36.85},0).wait(1).to({x:35.05},0).wait(1).to({x:32.9},0).wait(1).to({x:30.4},0).wait(1).to({x:27.6},0).wait(1).to({x:24.45},0).wait(1).to({x:20.95},0).wait(1).to({x:17.15},0).wait(1).to({x:13},0).wait(1).to({x:11.15},0).wait(1).to({x:9.5},0).wait(1).to({x:8.15},0).wait(1).to({x:7},0).wait(1).to({x:6.15},0).wait(1).to({x:5.5},0).wait(1).to({x:5.15},0).wait(1).to({x:5},0).wait(2).to({x:5.15},0).wait(1).to({x:5.4},0).wait(1).to({x:6},0).wait(1).to({x:6.95},0).wait(1).to({x:8.4},0).wait(1).to({x:10.35},0).wait(1).to({x:13},0).to({_off:true},1).wait(79));

	// kw4
	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgdAeIAAg7IA7AAIAAA7g");
	this.shape_79.setTransform(27,23.05);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgXAYIAAgvIAvAAIAAAvg");
	this.shape_80.setTransform(27,23.05);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgSATIAAglIAlAAIAAAlg");
	this.shape_81.setTransform(27,23.05);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgOAPIAAgdIAdAAIAAAdg");
	this.shape_82.setTransform(27,23.05);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgLAMIAAgXIAXAAIAAAXg");
	this.shape_83.setTransform(27,23.05);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgKALIAAgVIAVAAIAAAVg");
	this.shape_84.setTransform(27,23.05);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_85.setTransform(27,23.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_79}]},37).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[]},1).wait(123));

	// kw1
	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_86.setTransform(12.95,37);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgiAjIAAhFIBFAAIAABFg");
	this.shape_87.setTransform(12.95,37);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgdAeIAAg7IA7AAIAAA7g");
	this.shape_88.setTransform(12.95,37);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgYAZIAAgxIAxAAIAAAxg");
	this.shape_89.setTransform(13,37);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgTAUIAAgnIAnAAIAAAng");
	this.shape_90.setTransform(13,37);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgOAPIAAgdIAdAAIAAAdg");
	this.shape_91.setTransform(13,37);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_86}]}).to({state:[{t:this.shape_86}]},20).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_86}]},1).to({state:[]},1).to({state:[{t:this.shape_86}]},71).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_86}]},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.shape_86).wait(20).to({_off:true},1).wait(5).to({_off:false,scaleX:0.25,scaleY:0.25,x:13},0).to({_off:true},1).wait(71).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false,scaleX:1,scaleY:1,x:12.95},0).wait(1).to({y:36.8},0).wait(1).to({y:36.25},0).wait(1).to({y:35.3},0).wait(1).to({x:13,y:33.95},0).wait(1).to({y:32.25},0).wait(1).to({x:13.05,y:30.15},0).wait(1).to({y:27.7},0).wait(1).to({x:13.1,y:24.85},0).wait(1).to({x:13.15,y:21.7},0).wait(1).to({x:13.2,y:18.85},0).wait(1).to({y:16.4},0).wait(1).to({x:13.25,y:14.3},0).wait(1).to({y:12.6},0).wait(1).to({x:13.3,y:11.25},0).wait(1).to({y:10.3},0).wait(1).to({y:9.75},0).wait(1).to({y:9.55},0).wait(1).to({x:13.5},0).wait(1).to({x:14.15},0).wait(1).to({x:15.25,y:9.5},0).wait(1).to({x:16.75},0).wait(1).to({x:18.7,y:9.45},0).wait(1).to({x:21.1,y:9.4},0).wait(1).to({x:23.9,y:9.35},0).wait(1).to({x:27.15,y:9.3},0).wait(1).to({x:30.4,y:9.2},0).wait(1).to({x:33.2,y:9.15},0).wait(1).to({x:35.6,y:9.1},0).wait(1).to({x:37.55,y:9.05},0).wait(1).to({x:39.05},0).wait(1).to({x:40.15,y:9},0).wait(1).to({x:40.8},0).wait(1).to({x:41},0).wait(1).to({y:9.3},0).wait(1).to({y:10.15},0).wait(1).to({y:11.55},0).wait(1).to({y:13.55},0).wait(1).to({y:16.15},0).wait(1).to({y:19.3},0).wait(1).to({y:23},0).wait(1).to({y:26.7},0).wait(1).to({y:29.85},0).wait(1).to({y:32.45},0).wait(1).to({y:34.45},0).wait(1).to({y:35.85},0).wait(1).to({y:36.7},0).wait(1).to({y:37},0).wait(1).to({x:40.6},0).wait(1).to({x:39.45},0).wait(1).to({x:37.5},0).wait(1).to({x:34.75},0).wait(1).to({x:31.25},0).wait(1).to({x:27},0).wait(1).to({x:22.7},0).wait(1).to({x:19.2},0).wait(1).to({x:16.45},0).wait(1).to({x:14.5},0).wait(1).to({x:13.35},0).wait(1).to({x:12.95},0).wait(4));

	// ck
	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FF0000").s().p("AgJBaIAAizIATAAIAACzg");
	this.shape_92.setTransform(0.95,36.95);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FF0000").s().p("AgJBQIAAifIATAAIAACfg");
	this.shape_93.setTransform(0.95,37.7);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FF0000").s().p("AgJBGIAAiLIATAAIAACLg");
	this.shape_94.setTransform(0.95,38.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FF0000").s().p("AgJA8IAAh3IATAAIAAB3g");
	this.shape_95.setTransform(0.95,39.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FF0000").s().p("AgJAyIAAhjIATAAIAABjg");
	this.shape_96.setTransform(0.95,39.85);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FF0000").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_97.setTransform(0.95,40.6);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FF0000").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_98.setTransform(0.95,41.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FF0000").s().p("AgJAUIAAgnIATAAIAAAng");
	this.shape_99.setTransform(0.95,42.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_92,p:{scaleY:1,skewX:0,y:36.95}}]}).to({state:[{t:this.shape_92,p:{scaleY:1,skewX:0,y:36.95}}]},8).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_92,p:{scaleY:0.1111,skewX:180,y:42.7694}}]},1).to({state:[]},1).to({state:[{t:this.shape_92,p:{scaleY:1,skewX:0,y:36.95}}]},146).to({state:[]},2).wait(2));

	// cb
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#02FFFF").s().p("AgJBaIAAizIATAAIAACzg");
	this.shape_100.setTransform(22.95,36.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#02FFFF").s().p("AgJBRIAAihIATAAIAAChg");
	this.shape_101.setTransform(22.95,36.275);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#02FFFF").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape_102.setTransform(22.95,35.625);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#02FFFF").s().p("AgJBAIAAh+IATAAIAAB+g");
	this.shape_103.setTransform(22.95,34.95);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#02FFFF").s().p("AgJA3IAAhsIATAAIAABsg");
	this.shape_104.setTransform(22.95,34.3);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#02FFFF").s().p("AgJAuIAAhaIATAAIAABag");
	this.shape_105.setTransform(22.95,33.6);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#02FFFF").s().p("AgJAlIAAhIIATAAIAABIg");
	this.shape_106.setTransform(22.95,32.95);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#02FFFF").s().p("AgJAcIAAg3IATAAIAAA3g");
	this.shape_107.setTransform(22.95,32.275);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#02FFFF").s().p("AgJATIAAglIATAAIAAAlg");
	this.shape_108.setTransform(22.95,31.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_100,p:{scaleY:1,y:36.95}}]}).to({state:[{t:this.shape_100,p:{scaleY:1,y:36.95}}]},9).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_100,p:{scaleY:0.1109,y:30.9624}}]},1).to({state:[]},1).to({state:[{t:this.shape_100,p:{scaleY:1,y:36.95}}]},144).to({state:[]},2).wait(2));

	// cy
	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFF05").s().p("AgJBaIAAizIATAAIAACzg");
	this.shape_109.setTransform(2.95,36.95);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFF05").s().p("AgJBRIAAihIATAAIAAChg");
	this.shape_110.setTransform(2.95,36.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFF05").s().p("AgJBIIAAiPIATAAIAACPg");
	this.shape_111.setTransform(2.95,36.475);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFF05").s().p("AgJA/IAAh9IATAAIAAB9g");
	this.shape_112.setTransform(2.95,36.225);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFF05").s().p("AgJA3IAAhtIATAAIAABtg");
	this.shape_113.setTransform(2.95,36);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFF05").s().p("AgJAuIAAhaIATAAIAABag");
	this.shape_114.setTransform(2.95,35.75);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFF05").s().p("AgJAlIAAhJIATAAIAABJg");
	this.shape_115.setTransform(2.95,35.525);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFF05").s().p("AgJAcIAAg3IATAAIAAA3g");
	this.shape_116.setTransform(2.95,35.275);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFF05").s().p("AgJATIAAglIATAAIAAAlg");
	this.shape_117.setTransform(2.95,35.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_109,p:{scaleY:1,y:36.95}}]}).to({state:[{t:this.shape_109,p:{scaleY:1,y:36.95}}]},8).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_109,p:{scaleY:0.1111,y:34.7837}}]},1).to({state:[]},1).to({state:[{t:this.shape_109,p:{scaleY:1,y:36.95}}]},145).to({state:[]},2).wait(2));

	// cdb
	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#0000FE").s().p("AgJBaIAAizIATAAIAACzg");
	this.shape_118.setTransform(24.95,36.95);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#0000FE").s().p("AgJBQIAAifIATAAIAACfg");
	this.shape_119.setTransform(24.95,37.2);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#0000FE").s().p("AgJBGIAAiLIATAAIAACLg");
	this.shape_120.setTransform(24.95,37.5);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#0000FE").s().p("AgJA8IAAh3IATAAIAAB3g");
	this.shape_121.setTransform(24.95,37.75);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#0000FE").s().p("AgJAyIAAhjIATAAIAABjg");
	this.shape_122.setTransform(24.95,38.05);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#0000FE").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_123.setTransform(24.95,38.3);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#0000FE").s().p("AgJAeIAAg7IATAAIAAA7g");
	this.shape_124.setTransform(24.95,38.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#0000FE").s().p("AgJAUIAAgnIATAAIAAAng");
	this.shape_125.setTransform(24.95,38.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_118,p:{scaleY:1,y:36.95}}]}).to({state:[{t:this.shape_118,p:{scaleY:1,y:36.95}}]},8).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_118,p:{scaleY:0.1104,y:39.1106}}]},1).to({state:[]},1).to({state:[{t:this.shape_118,p:{scaleY:1,y:36.95}}]},146).to({state:[]},2).wait(2));

	// ramka
	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AB4CWIAAgUIAKAAIAAgLIAUAAIAAAfgAAzCWIAAgUIAiAAIAAAUgAgQCWIAAgUIAhAAIAAAUgAhVCWIAAgUIAjAAIAAAUgAiVCWIAAgfIAUAAIAAALIAKAAIAAAUgACCBVIAAgiIAUAAIAAAigAiVBVIAAgiIAUAAIAAAigACCARIAAgiIAUAAIAAAigAiVARIAAgiIAUAAIAAAigACCgzIAAgjIAUAAIAAAjgAiVgzIAAgjIAUAAIAAAjgACCh3IAAgKIgKAAIAAgUIAeAAIAAAegAiVh3IAAgeIAeAAIAAAUIgKAAIAAAKgAAziBIAAgUIAiAAIAAAUgAgQiBIAAgUIAhAAIAAAUgAhViBIAAgUIAjAAIAAAUg");
	this.shape_126.setTransform(27,23);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AB1CWIAAgUIANAAIAAgIIAUAAIAAAcgAAxCWIAAgUIAiAAIAAAUgAgTCWIAAgUIAhAAIAAAUgAhXCWIAAgUIAiAAIAAAUgAiVCWIAAgiIAUAAIAAAOIAIAAIAAAUgACCBYIAAgjIAUAAIAAAjgAiVBSIAAgiIAUAAIAAAigACCATIAAgiIAUAAIAAAigAiVAOIAAghIAUAAIAAAhgACCgwIAAgjIAUAAIAAAjgAiVg2IAAgiIAUAAIAAAigACCh1IAAgMIgIAAIAAgUIAcAAIAAAggAiVh6IAAgbIAgAAIAAAUIgMAAIAAAHgAA1iBIAAgUIAjAAIAAAUgAgOiBIAAgUIAiAAIAAAUgAhTiBIAAgUIAjAAIAAAUg");
	this.shape_127.setTransform(27,23);
	this.shape_127._off = true;

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AByCWIAAgUIAQAAIAAgFIAUAAIAAAZgAAuCWIAAgUIAiAAIAAAUgAgWCWIAAgUIAiAAIAAAUgAhbCWIAAgUIAjAAIAAAUgAiVCWIAAgkIAUAAIAAAQIAFAAIAAAUgACCBaIAAgiIAUAAIAAAigAiVBQIAAgjIAUAAIAAAjgACCAWIAAghIAUAAIAAAhgAiVALIAAgiIAUAAIAAAigACCgtIAAgjIAUAAIAAAjgAiVg4IAAgjIAUAAIAAAjgACChyIAAgPIgFAAIAAgUIAZAAIAAAjgAiVh9IAAgYIAkAAIAAAUIgQAAIAAAEgAA5iBIAAgUIAiAAIAAAUgAgLiBIAAgUIAiAAIAAAUgAhPiBIAAgUIAiAAIAAAUg");
	this.shape_128.setTransform(27,23);
	this.shape_128._off = true;

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("ABwCWIAAgUIAiAAIAAAUgAArCWIAAgUIAiAAIAAAUgAgYCWIAAgUIAhAAIAAAUgAhdCWIAAgUIAjAAIAAAUgAiVCRIAAgiIAUAAIAAAigACCBdIAAgiIAUAAIAAAigAiVBNIAAgiIAUAAIAAAigACCAZIAAgiIAUAAIAAAigAiVAJIAAgiIAUAAIAAAigACCgrIAAgjIAUAAIAAAjgAiVg7IAAgiIAUAAIAAAigACChvIAAgjIAUAAIAAAjgAA7iBIAAgUIAjAAIAAAUgAgJiBIAAgUIAiAAIAAAUgAhNiBIAAgUIAjAAIAAAUgAiSiBIAAgUIAjAAIAAAUg");
	this.shape_129.setTransform(27,23);
	this.shape_129._off = true;

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAAoCWIAAgUIAjAAIAAAUgAgcCWIAAgUIAiAAIAAAUgAhgCWIAAgUIAjAAIAAAUgAiVCPIAAgjIAUAAIAAAjgACCBgIAAgiIAUAAIAAAigAiVBKIAAgjIAUAAIAAAjgACCAbIAAghIAUAAIAAAhgAiVAGIAAgiIAUAAIAAAigACCgoIAAgiIAUAAIAAAigAiVg+IAAgjIAUAAIAAAjgACChsIAAgjIAUAAIAAAjgAA+iBIAAgUIAiAAIAAAUgAgFiBIAAgUIAhAAIAAAUgAhKiBIAAgUIAiAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_130.setTransform(27,23);
	this.shape_130._off = true;

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("ABqCWIAAgUIAiAAIAAAUgAAmCWIAAgUIAiAAIAAAUgAgeCWIAAgUIAiAAIAAAUgAhjCWIAAgUIAjAAIAAAUgAiVCMIAAgiIAUAAIAAAigACCBiIAAgiIAUAAIAAAigAiVBHIAAgiIAUAAIAAAigACCAeIAAghIAUAAIAAAhgAiVADIAAghIAUAAIAAAhgACCglIAAgjIAUAAIAAAjgAiVhAIAAgjIAUAAIAAAjgACChqIAAgjIAUAAIAAAjgABBiBIAAgUIAiAAIAAAUgAgDiBIAAgUIAiAAIAAAUgAhIiBIAAgUIAjAAIAAAUgAiMiBIAAgUIAjAAIAAAUg");
	this.shape_131.setTransform(27,23);
	this.shape_131._off = true;

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("ABnCWIAAgUIAjAAIAAAUgAAiCWIAAgUIAjAAIAAAUgAghCWIAAgUIAiAAIAAAUgAhmCWIAAgUIAjAAIAAAUgAiVCJIAAgjIAUAAIAAAjgACCBlIAAgiIAUAAIAAAigAiVBFIAAgjIAUAAIAAAjgACCAhIAAghIAUAAIAAAhgAiVAAIAAgiIAUAAIAAAigACCgjIAAgiIAUAAIAAAigAiVhEIAAgiIAUAAIAAAigACChnIAAgiIAUAAIAAAigABEiBIAAgUIAiAAIAAAUgAAAiBIAAgUIAhAAIAAAUgAhEiBIAAgUIAiAAIAAAUgAiJiBIAAgUIAiAAIAAAUg");
	this.shape_132.setTransform(27,23);
	this.shape_132._off = true;

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("ABlCWIAAgUIAiAAIAAAUgAAgCWIAAgUIAjAAIAAAUgAgkCWIAAgUIAjAAIAAAUgAhoCWIAAgUIAjAAIAAAUgAiVCHIAAgjIAUAAIAAAjgACCBoIAAgiIAUAAIAAAigAiVBCIAAgiIAUAAIAAAigACCAjIAAgiIAUAAIAAAigAiVgBIAAgjIAUAAIAAAjgACCggIAAgiIAUAAIAAAigAiVhGIAAgjIAUAAIAAAjgACChkIAAgjIAUAAIAAAjgABGiBIAAgUIAiAAIAAAUgAACiBIAAgUIAiAAIAAAUgAhCiBIAAgUIAjAAIAAAUgAiHiBIAAgUIAjAAIAAAUg");
	this.shape_133.setTransform(27,23);
	this.shape_133._off = true;

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("ABhCWIAAgUIAjAAIAAAUgAAdCWIAAgUIAjAAIAAAUgAgnCWIAAgUIAjAAIAAAUgAhrCWIAAgUIAiAAIAAAUgAiVCEIAAgjIAUAAIAAAjgACCBrIAAgjIAUAAIAAAjgAiVA/IAAgjIAUAAIAAAjgACCAmIAAgiIAUAAIAAAigAiVgFIAAgiIAUAAIAAAigACCgdIAAgiIAUAAIAAAigAiVhJIAAgjIAUAAIAAAjgACChiIAAgiIAUAAIAAAigABJiBIAAgUIAiAAIAAAUgAAEiBIAAgUIAjAAIAAAUgAg/iBIAAgUIAiAAIAAAUgAiDiBIAAgUIAiAAIAAAUg");
	this.shape_134.setTransform(27,23);
	this.shape_134._off = true;

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("ABfCWIAAgUIAjAAIAAAUgAAaCWIAAgUIAjAAIAAAUgAgpCWIAAgUIAjAAIAAAUgAhuCWIAAgUIAjAAIAAAUgAiVCBIAAgiIAUAAIAAAigACCBtIAAgiIAUAAIAAAigAiVA9IAAgjIAUAAIAAAjgACCApIAAgiIAUAAIAAAigAiVgHIAAgjIAUAAIAAAjgACCgbIAAgiIAUAAIAAAigAiVhLIAAgjIAUAAIAAAjgACChfIAAgiIAUAAIAAAigABMiBIAAgUIAiAAIAAAUgAAHiBIAAgUIAiAAIAAAUgAg8iBIAAgUIAiAAIAAAUgAiBiBIAAgUIAjAAIAAAUg");
	this.shape_135.setTransform(27,23);
	this.shape_135._off = true;

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("ABcCWIAAgUIAjAAIAAAUgAAXCWIAAgUIAjAAIAAAUgAgsCWIAAgUIAiAAIAAAUgAhwCWIAAgUIAiAAIAAAUgAiVB+IAAgjIAUAAIAAAjgACCBxIAAgjIAUAAIAAAjgAiVA5IAAgiIAUAAIAAAigACCAsIAAgjIAUAAIAAAjgAiVgKIAAgjIAUAAIAAAjgACCgYIAAgiIAUAAIAAAigAiVhPIAAgiIAUAAIAAAigACChcIAAgiIAUAAIAAAigABOiBIAAgUIAjAAIAAAUgAAKiBIAAgUIAiAAIAAAUgAg6iBIAAgUIAjAAIAAAUgAh+iBIAAgUIAiAAIAAAUg");
	this.shape_136.setTransform(27,23);
	this.shape_136._off = true;

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("ABZCWIAAgUIAjAAIAAAUgAAVCWIAAgUIAjAAIAAAUgAgvCWIAAgUIAjAAIAAAUgAhzCWIAAgUIAiAAIAAAUgAiVB8IAAgjIAUAAIAAAjgACCBzIAAgjIAUAAIAAAjgAiVA3IAAgjIAUAAIAAAjgACCAuIAAgiIAUAAIAAAigAiVgMIAAgjIAUAAIAAAjgACCgVIAAgiIAUAAIAAAigAiVhRIAAgjIAUAAIAAAjgACChaIAAgiIAUAAIAAAigABRiBIAAgUIAiAAIAAAUgAANiBIAAgUIAiAAIAAAUgAg3iBIAAgUIAiAAIAAAUgAh7iBIAAgUIAiAAIAAAUg");
	this.shape_137.setTransform(27,23);
	this.shape_137._off = true;

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("ABWCWIAAgUIAjAAIAAAUgAASCWIAAgUIAiAAIAAAUgAgxCWIAAgUIAiAAIAAAUgAh2CWIAAgUIAiAAIAAAUgAiVB4IAAgiIAUAAIAAAigACCB2IAAgjIAUAAIAAAjgAiVA0IAAgiIAUAAIAAAigACCAyIAAgjIAUAAIAAAjgAiVgQIAAgiIAUAAIAAAigACCgSIAAgjIAUAAIAAAjgAiVhUIAAgiIAUAAIAAAigACChXIAAgiIAUAAIAAAigABUiBIAAgUIAjAAIAAAUgAAPiBIAAgUIAjAAIAAAUgAg0iBIAAgUIAiAAIAAAUgAh5iBIAAgUIAjAAIAAAUg");
	this.shape_138.setTransform(27,23);
	this.shape_138._off = true;

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("ABUCWIAAgUIAjAAIAAAUgAAPCWIAAgUIAjAAIAAAUgAg0CWIAAgUIAiAAIAAAUgAh5CWIAAgUIAjAAIAAAUgACCB4IAAgiIAUAAIAAAigAiVB2IAAgjIAUAAIAAAjgACCA0IAAgiIAUAAIAAAigAiVAyIAAgjIAUAAIAAAjgACCgQIAAgiIAUAAIAAAigAiVgSIAAgjIAUAAIAAAjgACChUIAAgiIAUAAIAAAigAiVhXIAAgiIAUAAIAAAigABWiBIAAgUIAjAAIAAAUgAASiBIAAgUIAiAAIAAAUgAgxiBIAAgUIAiAAIAAAUgAh2iBIAAgUIAiAAIAAAUg");
	this.shape_139.setTransform(27,23);
	this.shape_139._off = true;

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("ABRCWIAAgUIAiAAIAAAUgAANCWIAAgUIAiAAIAAAUgAg3CWIAAgUIAiAAIAAAUgAh7CWIAAgUIAiAAIAAAUgACCB8IAAgjIAUAAIAAAjgAiVBzIAAgjIAUAAIAAAjgACCA3IAAgjIAUAAIAAAjgAiVAuIAAgiIAUAAIAAAigACCgMIAAgjIAUAAIAAAjgAiVgVIAAgiIAUAAIAAAigACChRIAAgjIAUAAIAAAjgAiVhaIAAgiIAUAAIAAAigABZiBIAAgUIAjAAIAAAUgAAViBIAAgUIAjAAIAAAUgAgviBIAAgUIAjAAIAAAUgAhziBIAAgUIAiAAIAAAUg");
	this.shape_140.setTransform(27,23);
	this.shape_140._off = true;

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("ABOCWIAAgUIAjAAIAAAUgAAKCWIAAgUIAiAAIAAAUgAg6CWIAAgUIAjAAIAAAUgAh+CWIAAgUIAiAAIAAAUgACCB+IAAgjIAUAAIAAAjgAiVBxIAAgjIAUAAIAAAjgACCA5IAAgiIAUAAIAAAigAiVAsIAAgjIAUAAIAAAjgACCgKIAAgjIAUAAIAAAjgAiVgYIAAgiIAUAAIAAAigACChPIAAgiIAUAAIAAAigAiVhcIAAgiIAUAAIAAAigABciBIAAgUIAjAAIAAAUgAAXiBIAAgUIAjAAIAAAUgAgsiBIAAgUIAiAAIAAAUgAhwiBIAAgUIAiAAIAAAUg");
	this.shape_141.setTransform(27,23);
	this.shape_141._off = true;

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("ABMCWIAAgUIAiAAIAAAUgAAHCWIAAgUIAiAAIAAAUgAg8CWIAAgUIAiAAIAAAUgAiBCWIAAgUIAjAAIAAAUgACCCBIAAgiIAUAAIAAAigAiVBtIAAgiIAUAAIAAAigACCA9IAAgjIAUAAIAAAjgAiVApIAAgiIAUAAIAAAigACCgHIAAgjIAUAAIAAAjgAiVgbIAAgiIAUAAIAAAigACChLIAAgjIAUAAIAAAjgAiVhfIAAgiIAUAAIAAAigABfiBIAAgUIAjAAIAAAUgAAaiBIAAgUIAjAAIAAAUgAgpiBIAAgUIAjAAIAAAUgAhuiBIAAgUIAjAAIAAAUg");
	this.shape_142.setTransform(27,23);
	this.shape_142._off = true;

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("ABJCWIAAgUIAiAAIAAAUgAAECWIAAgUIAjAAIAAAUgAg/CWIAAgUIAiAAIAAAUgAiDCWIAAgUIAiAAIAAAUgACCCEIAAgjIAUAAIAAAjgAiVBrIAAgjIAUAAIAAAjgACCA/IAAgjIAUAAIAAAjgAiVAmIAAgiIAUAAIAAAigACCgFIAAgiIAUAAIAAAigAiVgdIAAgiIAUAAIAAAigACChJIAAgjIAUAAIAAAjgAiVhiIAAgiIAUAAIAAAigABhiBIAAgUIAjAAIAAAUgAAdiBIAAgUIAjAAIAAAUgAgniBIAAgUIAjAAIAAAUgAhriBIAAgUIAiAAIAAAUg");
	this.shape_143.setTransform(27,23);
	this.shape_143._off = true;

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("ABGCWIAAgUIAiAAIAAAUgAACCWIAAgUIAiAAIAAAUgAhCCWIAAgUIAjAAIAAAUgAiHCWIAAgUIAjAAIAAAUgACCCHIAAgjIAUAAIAAAjgAiVBoIAAgiIAUAAIAAAigACCBCIAAgiIAUAAIAAAigAiVAjIAAgiIAUAAIAAAigACCgBIAAgjIAUAAIAAAjgAiVggIAAgiIAUAAIAAAigACChGIAAgjIAUAAIAAAjgAiVhkIAAgjIAUAAIAAAjgABliBIAAgUIAiAAIAAAUgAAgiBIAAgUIAjAAIAAAUgAgkiBIAAgUIAjAAIAAAUgAhoiBIAAgUIAjAAIAAAUg");
	this.shape_144.setTransform(27,23);
	this.shape_144._off = true;

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("ABECWIAAgUIAiAAIAAAUgAAACWIAAgUIAhAAIAAAUgAhECWIAAgUIAiAAIAAAUgAiJCWIAAgUIAiAAIAAAUgACCCJIAAgjIAUAAIAAAjgAiVBlIAAgiIAUAAIAAAigACCBFIAAgjIAUAAIAAAjgAiVAhIAAghIAUAAIAAAhgACCAAIAAgiIAUAAIAAAigAiVgjIAAgiIAUAAIAAAigACChEIAAgiIAUAAIAAAigAiVhnIAAgiIAUAAIAAAigABniBIAAgUIAjAAIAAAUgAAiiBIAAgUIAjAAIAAAUgAghiBIAAgUIAiAAIAAAUgAhmiBIAAgUIAjAAIAAAUg");
	this.shape_145.setTransform(27,23);
	this.shape_145._off = true;

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("ABBCWIAAgUIAiAAIAAAUgAgDCWIAAgUIAiAAIAAAUgAhICWIAAgUIAjAAIAAAUgAiMCWIAAgUIAjAAIAAAUgACCCMIAAgiIAUAAIAAAigAiVBiIAAgiIAUAAIAAAigACCBHIAAgiIAUAAIAAAigAiVAeIAAghIAUAAIAAAhgACCADIAAghIAUAAIAAAhgAiVglIAAgjIAUAAIAAAjgACChAIAAgjIAUAAIAAAjgAiVhqIAAgjIAUAAIAAAjgABqiBIAAgUIAiAAIAAAUgAAmiBIAAgUIAiAAIAAAUgAgeiBIAAgUIAiAAIAAAUgAhjiBIAAgUIAjAAIAAAUg");
	this.shape_146.setTransform(27,23);
	this.shape_146._off = true;

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AA+CWIAAgUIAiAAIAAAUgAgFCWIAAgUIAhAAIAAAUgAhKCWIAAgUIAiAAIAAAUgAiOCWIAAgUIAiAAIAAAUgACCCPIAAgjIAUAAIAAAjgAiVBgIAAgiIAUAAIAAAigACCBKIAAgjIAUAAIAAAjgAiVAbIAAghIAUAAIAAAhgACCAGIAAgiIAUAAIAAAigAiVgoIAAgiIAUAAIAAAigACCg+IAAgjIAUAAIAAAjgAiVhsIAAgjIAUAAIAAAjgABtiBIAAgUIAiAAIAAAUgAAoiBIAAgUIAjAAIAAAUgAgciBIAAgUIAiAAIAAAUgAhgiBIAAgUIAjAAIAAAUg");
	this.shape_147.setTransform(27,23);
	this.shape_147._off = true;

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("ACACWIAAgUIACAAIAAgTIAUAAIAAAngAA7CWIAAgUIAjAAIAAAUgAgJCWIAAgUIAiAAIAAAUgAhNCWIAAgUIAjAAIAAAUgAiVCWIAAgXIAUAAIAAADIASAAIAAAUgAiVBdIAAgiIAUAAIAAAigACCBNIAAgiIAUAAIAAAigAiVAZIAAgiIAUAAIAAAigACCAJIAAgiIAUAAIAAAigAiVgrIAAgjIAUAAIAAAjgACCg7IAAgiIAUAAIAAAigAiVhvIAAgmIAWAAIAAAUIgCAAIAAASgACCh/IAAgCIgSAAIAAgUIAmAAIAAAWgAAriBIAAgUIAiAAIAAAUgAgYiBIAAgUIAhAAIAAAUgAhdiBIAAgUIAjAAIAAAUg");
	this.shape_148.setTransform(27,23);
	this.shape_148._off = true;

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AB9CWIAAgUIAFAAIAAgQIAUAAIAAAkgAA5CWIAAgUIAiAAIAAAUgAgLCWIAAgUIAiAAIAAAUgAhPCWIAAgUIAiAAIAAAUgAiVCWIAAgZIAUAAIAAAFIAQAAIAAAUgAiVBaIAAgiIAUAAIAAAigACCBQIAAgjIAUAAIAAAjgAiVAWIAAghIAUAAIAAAhgACCALIAAgiIAUAAIAAAigAiVgtIAAgjIAUAAIAAAjgACCg4IAAgjIAUAAIAAAjgAiVhyIAAgjIAZAAIAAAUIgFAAIAAAPgACCh9IAAgEIgQAAIAAgUIAkAAIAAAYgAAuiBIAAgUIAiAAIAAAUgAgWiBIAAgUIAiAAIAAAUgAhbiBIAAgUIAjAAIAAAUg");
	this.shape_149.setTransform(27,23);
	this.shape_149._off = true;

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AB6CWIAAgUIAIAAIAAgOIAUAAIAAAigAA1CWIAAgUIAjAAIAAAUgAgOCWIAAgUIAiAAIAAAUgAhTCWIAAgUIAjAAIAAAUgAiVCWIAAgcIAUAAIAAAIIAMAAIAAAUgAiVBYIAAgjIAUAAIAAAjgACCBSIAAgiIAUAAIAAAigAiVATIAAgiIAUAAIAAAigACCAOIAAghIAUAAIAAAhgAiVgwIAAgjIAUAAIAAAjgACCg2IAAgiIAUAAIAAAigAiVh1IAAggIAcAAIAAAUIgIAAIAAAMgACCh6IAAgHIgNAAIAAgUIAhAAIAAAbgAAxiBIAAgUIAiAAIAAAUgAgTiBIAAgUIAhAAIAAAUgAhXiBIAAgUIAiAAIAAAUg");
	this.shape_150.setTransform(27,23);
	this.shape_150._off = true;

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AB7CWIAAgUIAUAAIAAAUgAiVCPIAAgVIAUAAIAAAVgACCh8IAAgTIAUAAIAAATgAiOiBIAAgUIAVAAIAAAUg");
	this.shape_151.setTransform(27,23);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AByCWIAAgUIAdAAIAAAUgAiVCPIAAgfIAUAAIAAAfgACCh1IAAgaIAUAAIAAAagAiOiBIAAgUIAfAAIAAAUg");
	this.shape_152.setTransform(27,23);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAiVCPIAAgjIAUAAIAAAjgACChsIAAgjIAUAAIAAAjgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_153.setTransform(27,23);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAA6CWIAAgUIARAAIAAAUgAiVCPIAAgjIAUAAIAAAjgAiVBKIAAgSIAUAAIAAASgACCg8IAAgOIAUAAIAAAOgACChsIAAgjIAUAAIAAAjgAhKiBIAAgUIAUAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_154.setTransform(27,23);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAAoCWIAAgUIAjAAIAAAUgAiVCPIAAgjIAUAAIAAAjgAiVBKIAAgjIAUAAIAAAjgACCgoIAAgiIAUAAIAAAigACChsIAAgjIAUAAIAAAjgAhKiBIAAgUIAiAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_155.setTransform(27,23);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAAoCWIAAgUIAjAAIAAAUgAiVCPIAAgjIAUAAIAAAjgAiVBKIAAgjIAUAAIAAAjgAiVAGIAAgFIAUAAIAAAFgACCgCIAAgEIAUAAIAAAEgACCgoIAAgiIAUAAIAAAigACChsIAAgjIAUAAIAAAjgAgFiBIAAgUIABAAIAAAUgAhKiBIAAgUIAiAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_156.setTransform(27,23);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAAoCWIAAgUIAjAAIAAAUgAgcCWIAAgUIAiAAIAAAUgAiVCPIAAgjIAUAAIAAAjgAiVBKIAAgjIAUAAIAAAjgACCAZIAAgfIAUAAIAAAfgAiVAGIAAgcIAUAAIAAAcgACCgoIAAgiIAUAAIAAAigACChsIAAgjIAUAAIAAAjgAgFiBIAAgUIAhAAIAAAUgAhKiBIAAgUIAiAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_157.setTransform(27,23);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("ABtCWIAAgUIAiAAIAAAUgAAoCWIAAgUIAjAAIAAAUgAgcCWIAAgUIAiAAIAAAUgAiVCPIAAgjIAUAAIAAAjgAiVBKIAAgjIAUAAIAAAjgACCAbIAAghIAUAAIAAAhgAiVAGIAAgiIAUAAIAAAigACCgoIAAgiIAUAAIAAAigACChsIAAgjIAUAAIAAAjgAgFiBIAAgUIAhAAIAAAUgAhKiBIAAgUIAiAAIAAAUgAiOiBIAAgUIAiAAIAAAUg");
	this.shape_158.setTransform(27,23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_126}]}).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[]},3).to({state:[{t:this.shape_151}]},30).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_126).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.shape_127).wait(1).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(23));
	this.timeline.addTween(cjs.Tween.get(this.shape_128).wait(2).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(22));
	this.timeline.addTween(cjs.Tween.get(this.shape_129).wait(3).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},3).wait(64).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.shape_130).wait(4).to({_off:false},0).to({_off:true},1).wait(65).to({_off:false},0).wait(1).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.shape_131).wait(5).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.shape_132).wait(6).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(18));
	this.timeline.addTween(cjs.Tween.get(this.shape_133).wait(7).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.shape_134).wait(8).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.shape_135).wait(9).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.shape_136).wait(10).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.shape_137).wait(11).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.shape_138).wait(12).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.shape_139).wait(13).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(11));
	this.timeline.addTween(cjs.Tween.get(this.shape_140).wait(14).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.shape_141).wait(15).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.shape_142).wait(16).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(8));
	this.timeline.addTween(cjs.Tween.get(this.shape_143).wait(17).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.shape_144).wait(18).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.shape_145).wait(19).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.shape_146).wait(20).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.shape_147).wait(21).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.shape_148).wait(22).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.shape_149).wait(23).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_150).wait(24).to({_off:false},0).to({_off:true},1).wait(66).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(25,23,25,23);
// library properties:
lib.properties = {
	id: '04',
	width: 50,
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
an.compositions['04'] = {
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