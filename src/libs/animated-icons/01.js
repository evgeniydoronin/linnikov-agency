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
(lib._01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(83));

	// ug2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag7gxIBtAAIAABt");
	this.shape.setTransform(36.15,14.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag6gwIBrAAIAABr");
	this.shape_1.setTransform(36.3,13.9);
	this.shape_1._off = true;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag5gvIBpAAIAABp");
	this.shape_2.setTransform(36.525,13.675);
	this.shape_2._off = true;

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag3gtIBlAAIAABl");
	this.shape_3.setTransform(36.825,13.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag1grIBhAAIAABh");
	this.shape_4.setTransform(37.275,12.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgygoIBbAAIAABb");
	this.shape_5.setTransform(37.825,12.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgtgkIBSAAIAABT");
	this.shape_6.setTransform(38.55,11.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgpgfIBIAAIAABJ");
	this.shape_7.setTransform(39.45,10.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgigZIA8AAIAAA9");
	this.shape_8.setTransform(40.55,9.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgcgSIAvAAIAAAv");
	this.shape_9.setTransform(41.75,8.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgUgLIAfAAIAAAh");
	this.shape_10.setTransform(43,7.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgOgEIATAAIAAAT");
	this.shape_11.setTransform(44.225,5.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_12.setTransform(45.0988,4.9846,0.25,0.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_13.setTransform(45.9,4.2);
	this.shape_13._off = true;

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgNgDIARAAIAAAR");
	this.shape_14.setTransform(11.325,38.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgRgHIAZAAIAAAZ");
	this.shape_15.setTransform(13.35,36.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgYgOIAnAAIAAAn");
	this.shape_16.setTransform(17.25,32.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgbgRIAtAAIAAAu");
	this.shape_17.setTransform(19.05,31.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgegVIAzAAIAAA1");
	this.shape_18.setTransform(20.75,29.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AghgXIA5AAIAAA5");
	this.shape_19.setTransform(22.325,27.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgkgaIA/AAIAAA/");
	this.shape_20.setTransform(23.775,26.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgngcIBEAAIAABD");
	this.shape_21.setTransform(25.1,25.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgogfIBIAAIAABJ");
	this.shape_22.setTransform(26.3,23.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgrghIBNAAIAABN");
	this.shape_23.setTransform(27.375,22.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgtgjIBQAAIAABR");
	this.shape_24.setTransform(28.35,21.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgugkIBTAAIAABT");
	this.shape_25.setTransform(29.275,20.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgwgmIBXAAIAABX");
	this.shape_26.setTransform(30.075,20.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgxgnIBZAAIAABZ");
	this.shape_27.setTransform(30.8,19.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgygpIBbAAIAABc");
	this.shape_28.setTransform(31.425,18.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AgzgpIBdAAIAABe");
	this.shape_29.setTransform(32.025,18.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag0gqIBgAAIAABf");
	this.shape_30.setTransform(32.55,17.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag2gsIBjAAIAABj");
	this.shape_31.setTransform(33.45,16.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag4guIBnAAIAABn");
	this.shape_32.setTransform(34.475,15.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag6gxIBsAAIAABt");
	this.shape_33.setTransform(35.8,14.4);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("Ag6gxIBsAAIAABs");
	this.shape_34.setTransform(35.9,14.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3,p:{x:36.825,y:13.375}}]},1).to({state:[{t:this.shape_4,p:{x:37.275,y:12.925}}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10,p:{x:43,y:7.175}}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12,p:{x:45.0988,y:4.9846}}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_12,p:{x:48.9988,y:0.9846}}]},1).to({state:[]},1).to({state:[{t:this.shape_12,p:{x:5.0488,y:44.9846}}]},15).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_10,p:{x:15.325,y:34.775}}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_4,p:{x:33.025,y:17.175}}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_3,p:{x:33.825,y:16.375}}]},1).to({state:[{t:this.shape_3,p:{x:34.175,y:16.025}}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9).to({_off:true},1).wait(65).to({_off:false,x:35.975,y:14.225},0).wait(1).to({x:36.025,y:14.175},0).wait(1).to({x:36.1,y:14.1},0).wait(1).to({x:36.125,y:14.075},0).wait(1).to({x:36.15,y:14.05},0).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(10).to({_off:false},0).to({_off:true},1).wait(59).to({_off:false,x:35.375,y:14.8},0).wait(1).to({x:35.55,y:14.65},0).wait(1).to({x:35.675,y:14.525},0).to({_off:true},1).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(11).to({_off:false},0).to({_off:true},1).wait(55).to({_off:false,x:34.75,y:15.45},0).wait(1).to({x:34.975,y:15.225},0).wait(1).to({x:35.175,y:15},0).to({_off:true},1).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(22).to({_off:false},0).wait(1).to({x:47.15,y:2.9},0).to({_off:true},1).wait(17).to({_off:false,x:6.15,y:43.9},0).wait(1).to({x:7.35,y:42.7},0).wait(1).to({x:8.7,y:41.35},0).to({_off:true},1).wait(39));

	// kw
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_35.setTransform(19.05,31);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AghAiIAAhDIBDAAIAABDg");
	this.shape_36.setTransform(19.1,31);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgbAcIAAg3IA3AAIAAA3g");
	this.shape_37.setTransform(19.1,31);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgVAWIAAgrIArAAIAAArg");
	this.shape_38.setTransform(19.15,31);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgPAQIAAgfIAfAAIAAAfg");
	this.shape_39.setTransform(19.15,31);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_40.setTransform(18.9,31.25);
	this.shape_40._off = true;

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgKAKIAAgTIAUAAIAAATg");
	this.shape_41.setTransform(19.15,31);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgKALIAAgVIAWAAIAAAVg");
	this.shape_42.setTransform(19.15,31);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgMANIAAgaIAaAAIAAAag");
	this.shape_43.setTransform(19.15,31);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgSATIAAglIAlAAIAAAlg");
	this.shape_44.setTransform(19.125,31);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgWAYIAAgvIAtAAIAAAvg");
	this.shape_45.setTransform(19.125,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35}]}).to({state:[{t:this.shape_35}]},23).to({state:[{t:this.shape_36,p:{x:19.1}}]},1).to({state:[{t:this.shape_37,p:{x:19.1}}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_35}]},1).to({state:[]},1).to({state:[{t:this.shape_35}]},8).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_37,p:{x:19.125}}]},1).to({state:[{t:this.shape_36,p:{x:19.125}}]},1).to({state:[{t:this.shape_35}]},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.shape_35).wait(23).to({x:19.1},0).to({_off:true},1).wait(4).to({_off:false,scaleX:0.25,scaleY:0.25,x:19.1488,y:30.9846},0).to({_off:true},1).wait(10).to({_off:false,x:5.0488,y:44.9846},0).to({_off:true},1).wait(8).to({_off:false,x:19.1488,y:30.9846},0).wait(1).to({_off:true},1).wait(8).to({_off:false,scaleX:1,scaleY:1,x:19.1,y:31},0).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(29).to({_off:false},0).wait(1).to({x:18.55,y:31.6},0).wait(1).to({x:18,y:32.1},0).wait(1).to({x:17.3,y:32.85},0).wait(1).to({x:16.35,y:33.75},0).wait(1).to({x:15.1,y:35},0).wait(1).to({x:13.55,y:36.55},0).wait(1).to({x:11.7,y:38.35},0).wait(1).to({x:9.75,y:40.3},0).wait(1).to({x:7.75,y:42.25},0).to({_off:true},1).wait(44));

	// kw2
	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACMiBIAAENIkXAAIAAkXIENAA");
	this.shape_46.setTransform(19.05,30.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACMiAIAAEMIkXAAIAAkXIENAA");
	this.shape_47.setTransform(19.05,30.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACLh/IAAEKIkVAAIAAkVIELAA");
	this.shape_48.setTransform(19.05,30.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACKh/IAAEKIkUAAIAAkUIEKAA");
	this.shape_49.setTransform(19.05,30.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACKh+IAAEIIkSAAIAAkTIEIAA");
	this.shape_50.setTransform(19.05,30.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACIh8IAAEEIkPAAIAAkPIEFAA");
	this.shape_51.setTransform(19.05,30.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACGh6IAAEAIkLAAIAAkLIEBAA");
	this.shape_52.setTransform(19.025,30.925);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACDh4IAAD7IkFAAIAAkFID7AA");
	this.shape_53.setTransform(19.025,30.925);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACAh0IAAD0Ij/AAIAAj/ID1AA");
	this.shape_54.setTransform(19.025,30.925);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB8hwIAADsIj3AAIAAj3IDtAA");
	this.shape_55.setTransform(19.025,30.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB3hsIAADjIjtAAIAAjtIDjAA");
	this.shape_56.setTransform(19,30.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AByhmIAADXIjjAAIAAjhIDZAA");
	this.shape_57.setTransform(19,30.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABrhfIAADJIjVAAIAAjTIDLAA");
	this.shape_58.setTransform(18.975,30.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABjhXIAAC6IjFAAIAAjFIC7AA");
	this.shape_59.setTransform(19,31);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABahOIAACoIizAAIAAizICpAA");
	this.shape_60.setTransform(18.975,31.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABRhEIAACUIigAAIAAifICWAA");
	this.shape_61.setTransform(18.95,31.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABFg5IAAB+IiJAAIAAiJIB/AA");
	this.shape_62.setTransform(19.075,31);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AAxgnIAABYIhiAAIAAhhIBaAA");
	this.shape_63.setTransform(19.1,31.025);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AAxgnIAABYIhiAAIAAhhIBZAA");
	this.shape_64.setTransform(19.1,31.05);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABBg1IAAB1IiBAAIAAh/IB3AA");
	this.shape_65.setTransform(19.025,31.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABJg8IAACEIiRAAIAAiPICHAA");
	this.shape_66.setTransform(19,31);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABQhEIAACUIifAAIAAifICVAA");
	this.shape_67.setTransform(19.025,31);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABXhLIAAChIitAAIAAirICjAA");
	this.shape_68.setTransform(19.025,30.975);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABdhRIAACuIi5AAIAAi5ICvAA");
	this.shape_69.setTransform(19.025,30.975);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABjhYIAAC7IjFAAIAAjFIC7AA");
	this.shape_70.setTransform(19.025,30.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABphdIAADGIjRAAIAAjRIDHAA");
	this.shape_71.setTransform(19.025,30.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABuhjIAADRIjbAAIAAjbIDRAA");
	this.shape_72.setTransform(19.05,30.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ABzhnIAADaIjlAAIAAjlIDbAA");
	this.shape_73.setTransform(19.025,30.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB7hwIAADrIj1AAIAAj1IDrAA");
	this.shape_74.setTransform(19.05,30.925);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AB+hzIAADyIj8AAIAAj9IDyAA");
	this.shape_75.setTransform(19.05,30.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACCh2IAAD4IkDAAIAAkDID5AA");
	this.shape_76.setTransform(19.025,30.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACFh5IAAD+IkIAAIAAkJID+AA");
	this.shape_77.setTransform(19.05,30.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACHh7IAAECIkNAAIAAkNIEDAA");
	this.shape_78.setTransform(19.05,30.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACJh9IAAEGIkRAAIAAkRIEGAA");
	this.shape_79.setTransform(19.05,30.9);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("ACKh/IAAEJIkTAAIAAkTIEJAA");
	this.shape_80.setTransform(19.05,30.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46}]}).to({state:[{t:this.shape_47}]},6).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56,p:{x:19}}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[]},1).to({state:[{t:this.shape_64}]},36).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_56,p:{x:19.025}}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_46}]},1).wait(5));

	// ck
	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FF0000").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_81.setTransform(1.1,31);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FF0000").s().p("AgJB1IAAjpIATAAIAADpg");
	this.shape_82.setTransform(1.1,31.675);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FF0000").s().p("AgJBnIAAjNIATAAIAADNg");
	this.shape_83.setTransform(1.1,32.325);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FF0000").s().p("AgJBaIAAizIATAAIAACzg");
	this.shape_84.setTransform(1.1,33);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FF0000").s().p("AgJBNIAAiZIATAAIAACZg");
	this.shape_85.setTransform(1.1,33.675);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FF0000").s().p("AgJA/IAAh9IATAAIAAB9g");
	this.shape_86.setTransform(1.1,34.325);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FF0000").s().p("AgJAyIAAhjIATAAIAABjg");
	this.shape_87.setTransform(1.1,35);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FF0000").s().p("AgJAlIAAhJIATAAIAABJg");
	this.shape_88.setTransform(1.1,35.675);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FF0000").s().p("AgJAXIAAgtIATAAIAAAtg");
	this.shape_89.setTransform(1.1,36.325);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FF0000").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_90.setTransform(1.1,20.9612,1,0.0769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_81,p:{scaleY:1,y:31}}]}).to({state:[{t:this.shape_81,p:{scaleY:1,y:31}}]},8).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_81,p:{scaleY:0.0769,y:37.0112}}]},1).to({state:[]},1).to({state:[{t:this.shape_90},{t:this.shape_81,p:{scaleY:1,y:31}}]},61).to({state:[]},2).wait(2));

	// cb
	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#02FFFF").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_91.setTransform(35.1,31);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#02FFFF").s().p("AgJB2IAAjrIATAAIAADrg");
	this.shape_92.setTransform(35.1,31.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#02FFFF").s().p("AgJBqIAAjTIATAAIAADTg");
	this.shape_93.setTransform(35.1,31.8);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#02FFFF").s().p("AgJBeIAAi7IATAAIAAC7g");
	this.shape_94.setTransform(35.1,32.15);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#02FFFF").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_95.setTransform(35.1,32.55);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#02FFFF").s().p("AgJBGIAAiLIATAAIAACLg");
	this.shape_96.setTransform(35.1,32.95);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#02FFFF").s().p("AgJA6IAAhzIATAAIAABzg");
	this.shape_97.setTransform(35.1,33.35);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#02FFFF").s().p("AgJAuIAAhbIATAAIAABbg");
	this.shape_98.setTransform(35.1,33.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#02FFFF").s().p("AgJAiIAAhDIATAAIAABDg");
	this.shape_99.setTransform(35.1,34.1);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#02FFFF").s().p("AgJAWIAAgrIATAAIAAArg");
	this.shape_100.setTransform(35.1,34.5);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#02FFFF").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_101.setTransform(35.1,25.1612,1,0.0769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_91,p:{scaleY:1,y:31}}]}).to({state:[{t:this.shape_91,p:{scaleY:1,y:31}}]},9).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_91,p:{scaleY:0.0769,y:34.9112}}]},1).to({state:[]},1).to({state:[{t:this.shape_101},{t:this.shape_91,p:{scaleY:1,y:31}}]},59).to({state:[]},2).wait(2));

	// cy
	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFF05").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_102.setTransform(3.1,31);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFF05").s().p("AgJB2IAAjrIATAAIAADrg");
	this.shape_103.setTransform(3.1,30.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFF05").s().p("AgJBqIAAjTIATAAIAADTg");
	this.shape_104.setTransform(3.1,29.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFF05").s().p("AgJBeIAAi7IATAAIAAC7g");
	this.shape_105.setTransform(3.1,28.6);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFF05").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_106.setTransform(3.1,27.8);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFF05").s().p("AgJBGIAAiLIATAAIAACLg");
	this.shape_107.setTransform(3.1,27);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFF05").s().p("AgJA6IAAhzIATAAIAABzg");
	this.shape_108.setTransform(3.1,26.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFF05").s().p("AgJAuIAAhbIATAAIAABbg");
	this.shape_109.setTransform(3.1,25.4);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFF05").s().p("AgJAiIAAhDIATAAIAABDg");
	this.shape_110.setTransform(3.1,24.6);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFF05").s().p("AgJAWIAAgrIATAAIAAArg");
	this.shape_111.setTransform(3.1,23.8);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFF05").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_112.setTransform(3.1,31.0112,1,0.0769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102,p:{scaleY:1,y:31}}]}).to({state:[{t:this.shape_102,p:{scaleY:1,y:31}}]},8).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_102,p:{scaleY:0.0769,y:23.0112}}]},1).to({state:[]},1).to({state:[{t:this.shape_112},{t:this.shape_102,p:{scaleY:1,y:31}}]},60).to({state:[]},2).wait(2));

	// cdb
	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#0000FE").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_113.setTransform(37.1,31);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#0000FE").s().p("AgJBzIAAjlIATAAIAADlg");
	this.shape_114.setTransform(37.1,30);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#0000FE").s().p("AgJBkIAAjHIATAAIAADHg");
	this.shape_115.setTransform(37.1,29);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#0000FE").s().p("AgJBVIAAipIATAAIAACpg");
	this.shape_116.setTransform(37.1,28);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#0000FE").s().p("AgJBGIAAiLIATAAIAACLg");
	this.shape_117.setTransform(37.1,27);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#0000FE").s().p("AgJA3IAAhtIATAAIAABtg");
	this.shape_118.setTransform(37.1,26);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#0000FE").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_119.setTransform(37.1,25);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#0000FE").s().p("AgJAZIAAgxIATAAIAAAxg");
	this.shape_120.setTransform(37.1,24);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#0000FE").s().p("AgJCCIAAkDIATAAIAAEDg");
	this.shape_121.setTransform(37.1,36.6612,1,0.0769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_113,p:{scaleY:1,y:31}}]}).to({state:[{t:this.shape_113,p:{scaleY:1,y:31}}]},8).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_113,p:{scaleY:0.0769,y:23.0112}}]},1).to({state:[]},1).to({state:[{t:this.shape_121},{t:this.shape_113,p:{scaleY:1,y:31}}]},62).to({state:[]},2).wait(2));

	// KBK___копия
	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_122.setTransform(48.9988,0.9818,0.25,0.2499);
	this.shape_122._off = true;

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_123.setTransform(48.3,1);
	this.shape_123._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_122).wait(24).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false,scaleY:0.25,x:5.0976,y:0.9846},0).to({_off:true},1).wait(7).to({_off:false,x:5.0488,y:44.9846},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false,x:5.0976,y:0.9846},0).to({_off:true},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_123).wait(25).to({_off:false},0).wait(1).to({x:46.25},0).wait(1).to({x:42.85},0).wait(1).to({x:38.05},0).wait(1).to({x:31.85},0).wait(1).to({x:24.3},0).wait(1).to({x:15.4},0).to({_off:true},1).wait(1).to({_off:false,x:5.1,y:11.3},0).wait(1).to({y:20.25},0).wait(1).to({x:5.05,y:27.8},0).wait(1).to({y:34},0).wait(1).to({y:38.8},0).wait(1).to({y:42.25},0).wait(1).to({y:44.3},0).to({_off:true},1).wait(6).to({_off:false,y:38.7},0).wait(1).to({y:32.45},0).wait(1).to({y:26.15},0).wait(1).to({x:5.1,y:19.85},0).wait(1).to({y:13.55},0).wait(1).to({y:7.3},0).to({_off:true},1).wait(1).to({_off:false,x:10.6,y:1},0).wait(1).to({x:16.05},0).wait(1).to({x:21.55},0).wait(1).to({x:27.05},0).wait(1).to({x:32.55},0).wait(1).to({x:38},0).wait(1).to({x:43.5},0).to({_off:true},1).wait(23));

	// KBK
	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgnAoIAAhPIBPAAIAABPg");
	this.shape_124.setTransform(48.9988,0.9818,0.25,0.2499);
	this.shape_124._off = true;

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgJAKIAAgTIATAAIAAATg");
	this.shape_125.setTransform(49,1.7);
	this.shape_125._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_124).wait(24).to({_off:false},0).to({_off:true},1).wait(7).to({_off:false,y:44.9818},0).to({_off:true},1).wait(7).to({_off:false,scaleY:0.25,x:5.0488,y:44.9846},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false,scaleY:0.2499,x:48.9988,y:44.9818},0).to({_off:true},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.shape_125).wait(25).to({_off:false},0).wait(1).to({y:3.75},0).wait(1).to({y:7.2},0).wait(1).to({y:12},0).wait(1).to({y:18.2},0).wait(1).to({y:25.75},0).wait(1).to({y:34.7},0).to({_off:true},1).wait(1).to({_off:false,x:38.7,y:45},0).wait(1).to({x:29.75},0).wait(1).to({x:22.2},0).wait(1).to({x:16.05},0).wait(1).to({x:11.25},0).wait(1).to({x:7.8},0).wait(1).to({x:5.75},0).to({_off:true},1).wait(6).to({_off:false,x:11.35},0).wait(1).to({x:17.6},0).wait(1).to({x:23.9},0).wait(1).to({x:30.15},0).wait(1).to({x:36.45},0).wait(1).to({x:42.7},0).to({_off:true},1).wait(1).to({_off:false,x:49,y:39.5},0).wait(1).to({y:34},0).wait(1).to({y:28.5},0).wait(1).to({y:23},0).wait(1).to({y:17.5},0).wait(1).to({y:12},0).wait(1).to({y:6.5},0).to({_off:true},1).wait(23));

	// ramka
	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIAUAAIAAAegACADmIAAgUIAkAAIAAAUgAA3DmIAAgUIAlAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAkAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjkDmIAAgeIAUAAIAAAKIAKAAIAAAUgADSCkIAAgkIAUAAIAAAkgAjkCkIAAgkIAUAAIAAAkgADSBbIAAgkIAUAAIAAAkgAjkBbIAAgkIAUAAIAAAkgADSATIAAgkIAUAAIAAAkgAjkATIAAgkIAUAAIAAAkgADSg1IAAgkIAUAAIAAAkgAjkg1IAAgkIAUAAIAAAkgADSh+IAAgkIAUAAIAAAkgAjkh+IAAgkIAUAAIAAAkgADSjHIAAgKIgJAAIAAgUIAdAAIAAAegAjkjHIAAgeIAeAAIAAAUIgKAAIAAAKgACAjRIAAgUIAkAAIAAAUgAA3jRIAAgUIAlAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAkAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_126.setTransform(27.05,22.975);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIAUAAIAAAbgAB9DmIAAgUIAlAAIAAAUgAA1DmIAAgUIAkAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAlAAIAAAUgAikDmIAAgUIAkAAIAAAUgAjkDmIAAghIAUAAIAAANIAHAAIAAAUgADSCnIAAgkIAUAAIAAAkgAjkChIAAgkIAUAAIAAAkgADSBeIAAgkIAUAAIAAAkgAjkBYIAAgkIAUAAIAAAkgADSAWIAAgkIAUAAIAAAkgAjkAQIAAgkIAUAAIAAAkgADSgyIAAgkIAUAAIAAAkgAjkg4IAAgkIAUAAIAAAkgADSh7IAAgkIAUAAIAAAkgAjkiBIAAgkIAUAAIAAAkgADSjEIAAgNIgGAAIAAgUIAaAAIAAAhgAjkjKIAAgbIAhAAIAAAUIgNAAIAAAHgACEjRIAAgUIAkAAIAAAUgAA7jRIAAgUIAkAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAifjRIAAgUIAlAAIAAAUg");
	this.shape_127.setTransform(27.05,22.975);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("ADDDmIAAgUIAPAAIAAgEIAUAAIAAAYgAB7DmIAAgUIAkAAIAAAUgAAyDmIAAgUIAkAAIAAAUgAgWDmIAAgUIAjAAIAAAUgAhfDmIAAgUIAkAAIAAAUgAioDmIAAgUIAlAAIAAAUgAjkDmIAAgkIAUAAIAAAQIAEAAIAAAUgADSCqIAAgkIAUAAIAAAkgAjkCeIAAgkIAUAAIAAAkgADSBhIAAgkIAUAAIAAAkgAjkBVIAAgkIAUAAIAAAkgADSAZIAAgkIAUAAIAAAkgAjkANIAAgkIAUAAIAAAkgADSgvIAAgkIAUAAIAAAkgAjkg7IAAgkIAUAAIAAAkgADSh4IAAgkIAUAAIAAAkgAjkiEIAAgkIAUAAIAAAkgADSjBIAAgQIgDAAIAAgUIAXAAIAAAkgAjkjNIAAgYIAkAAIAAAUIgQAAIAAAEgACHjRIAAgUIAjAAIAAAUgAA+jRIAAgUIAkAAIAAAUgAgKjRIAAgUIAjAAIAAAUgAhTjRIAAgUIAlAAIAAAUgAibjRIAAgUIAkAAIAAAUg");
	this.shape_128.setTransform(27.05,22.975);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAgBIAUAAIAAAVgAB3DmIAAgUIAkAAIAAAUgAAuDmIAAgUIAlAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAkAAIAAAUgAirDmIAAgUIAlAAIAAAUgAjkDkIAAglIAUAAIAAAlgADSCtIAAgkIAUAAIAAAkgAjkCbIAAgkIAUAAIAAAkgADSBkIAAgkIAUAAIAAAkgAjkBSIAAgkIAUAAIAAAkgADSAcIAAgkIAUAAIAAAkgAjkAKIAAgkIAUAAIAAAkgADSgsIAAgkIAUAAIAAAkgAjkg+IAAgkIAUAAIAAAkgADSh1IAAgkIAUAAIAAAkgAjkiHIAAgkIAUAAIAAAkgADSi+IAAgkIAUAAIAAAkgACJjRIAAgUIAkAAIAAAUgABAjRIAAgUIAkAAIAAAUgAgIjRIAAgUIAjAAIAAAUgAhRjRIAAgUIAlAAIAAAUgAiZjRIAAgUIAlAAIAAAUgAjhjRIAAgUIAkAAIAAAUg");
	this.shape_129.setTransform(27.05,22.975);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAkAAIAAAUgAB1DmIAAgUIAjAAIAAAUgAAsDmIAAgUIAkAAIAAAUgAgcDmIAAgUIAjAAIAAAUgAhlDmIAAgUIAlAAIAAAUgAitDmIAAgUIAkAAIAAAUgAjkDhIAAglIAUAAIAAAlgADSCwIAAglIAUAAIAAAlgAjkCYIAAgkIAUAAIAAAkgADSBnIAAgkIAUAAIAAAkgAjkBPIAAgkIAUAAIAAAkgADSAeIAAgjIAUAAIAAAjgAjkAHIAAgkIAUAAIAAAkgADSgqIAAgkIAUAAIAAAkgAjkhBIAAgkIAUAAIAAAkgADShyIAAglIAUAAIAAAlgAjkiKIAAgkIAUAAIAAAkgADSi7IAAglIAUAAIAAAlgACMjRIAAgUIAkAAIAAAUgABDjRIAAgUIAlAAIAAAUgAgFjRIAAgUIAjAAIAAAUgAhOjRIAAgUIAlAAIAAAUgAiWjRIAAgUIAkAAIAAAUgAjfjRIAAgUIAkAAIAAAUg");
	this.shape_130.setTransform(27.05,22.975);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AC7DmIAAgUIAkAAIAAAUgAByDmIAAgUIAkAAIAAAUgAApDmIAAgUIAlAAIAAAUgAgeDmIAAgUIAjAAIAAAUgAhoDmIAAgUIAlAAIAAAUgAiwDmIAAgUIAkAAIAAAUgAjkDeIAAglIAUAAIAAAlgADSCzIAAglIAUAAIAAAlgAjkCVIAAgkIAUAAIAAAkgADSBqIAAgkIAUAAIAAAkgAjkBMIAAgkIAUAAIAAAkgADSAhIAAgjIAUAAIAAAjgAjkAEIAAgkIAUAAIAAAkgADSgnIAAgkIAUAAIAAAkgAjkhEIAAgkIAUAAIAAAkgADShvIAAglIAUAAIAAAlgAjkiNIAAgkIAUAAIAAAkgADSi4IAAglIAUAAIAAAlgACPjRIAAgUIAkAAIAAAUgABGjRIAAgUIAlAAIAAAUgAgBjRIAAgUIAjAAIAAAUgAhKjRIAAgUIAkAAIAAAUgAiTjRIAAgUIAlAAIAAAUgAjbjRIAAgUIAkAAIAAAUg");
	this.shape_131.setTransform(27.05,22.975);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAlAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAkAAIAAAUgAgiDmIAAgUIAjAAIAAAUgAhrDmIAAgUIAlAAIAAAUgAizDmIAAgUIAkAAIAAAUgAjkDbIAAglIAUAAIAAAlgADSC2IAAglIAUAAIAAAlgAjkCSIAAgkIAUAAIAAAkgADSBtIAAgkIAUAAIAAAkgAjkBJIAAgkIAUAAIAAAkgADSAkIAAgkIAUAAIAAAkIAAAAgAjkABIAAgkIAUAAIAAAkgADSgkIAAgkIAUAAIAAAkgAjkhHIAAgkIAUAAIAAAkgADShsIAAglIAUAAIAAAlgAjkiQIAAgkIAUAAIAAAkgADSi1IAAglIAUAAIAAAlgACSjRIAAgUIAkAAIAAAUgABJjRIAAgUIAkAAIAAAUgAAAjRIAAgUIAkAAIAAAUgAhIjRIAAgUIAlAAIAAAUgAiQjRIAAgUIAkAAIAAAUgAjYjRIAAgUIAkAAIAAAUg");
	this.shape_132.setTransform(27.05,22.975);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AC0DmIAAgUIAlAAIAAAUgABsDmIAAgUIAkAAIAAAUgAAjDmIAAgUIAlAAIAAAUgAgkDmIAAgUIAkAAIAAAUgAhtDmIAAgUIAkAAIAAAUgAi2DmIAAgUIAlAAIAAAUgAjkDYIAAgkIAUAAIAAAkgADSC5IAAglIAUAAIAAAlgAjkCQIAAglIAUAAIAAAlgADSBwIAAgkIAUAAIAAAkgAjkBHIAAgkIAUAAIAAAkgADSAnIAAgkIAUAAIAAAhIAAADgAjkgBIAAgkIAUAAIAAAkgADSghIAAgkIAUAAIAAAkgAjkhKIAAgkIAUAAIAAAkgADShpIAAglIAUAAIAAAlgAjkiSIAAglIAUAAIAAAlgADSiyIAAglIAUAAIAAAlgACVjRIAAgUIAkAAIAAAUgABMjRIAAgUIAlAAIAAAUgAADjRIAAgUIAkAAIAAAUgAhFjRIAAgUIAlAAIAAAUgAiNjRIAAgUIAkAAIAAAUgAjWjRIAAgUIAkAAIAAAUg");
	this.shape_133.setTransform(27.05,22.975);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("ACyDmIAAgUIAkAAIAAAUgABpDmIAAgUIAkAAIAAAUgAAgDmIAAgUIAlAAIAAAUgAgnDmIAAgUIAkAAIAAAUgAhxDmIAAgUIAlAAIAAAUgAi5DmIAAgUIAkAAIAAAUgAjkDVIAAgkIAUAAIAAAkgADSC8IAAglIAUAAIAAAlgAjkCNIAAglIAUAAIAAAlgADSBzIAAgkIAUAAIAAAkgAjkBEIAAgkIAUAAIAAAkgADSAqIAAgkIAUAAIAAAeIAAAGgAjkgEIAAgkIAUAAIAAAkgADSgeIAAgkIAUAAIAAAkgAjkhNIAAgkIAUAAIAAAkgADShmIAAglIAUAAIAAAlgAjkiVIAAglIAUAAIAAAlgADSivIAAglIAUAAIAAAlgACYjRIAAgUIAkAAIAAAUgABPjRIAAgUIAkAAIAAAUgAAGjRIAAgUIAkAAIAAAUgAhCjRIAAgUIAlAAIAAAUgAiKjRIAAgUIAkAAIAAAUgAjTjRIAAgUIAkAAIAAAUg");
	this.shape_134.setTransform(27.05,22.975);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("ACuDmIAAgUIAlAAIAAAUgABmDmIAAgUIAkAAIAAAUgAAdDmIAAgUIAkAAIAAAUgAgrDmIAAgUIAkAAIAAAUgAh0DmIAAgUIAlAAIAAAUgAi8DmIAAgUIAkAAIAAAUgAjkDSIAAgkIAUAAIAAAkgADSC/IAAglIAUAAIAAAlgAjkCKIAAglIAUAAIAAAlgADSB2IAAgkIAUAAIAAAkgAjkBBIAAgkIAUAAIAAAkgADSAtIAAgkIAUAAIAAAbIAAAJgAjkgHIAAgkIAUAAIAAAkgADSgbIAAgkIAUAAIAAAkgAjkhQIAAgkIAUAAIAAAkgADShjIAAglIAUAAIAAAlgAjkiYIAAglIAUAAIAAAlgADSisIAAglIAUAAIAAAlgACajRIAAgUIAkAAIAAAUgABRjRIAAgUIAlAAIAAAUgAAJjRIAAgUIAkAAIAAAUgAg/jRIAAgUIAkAAIAAAUgAiHjRIAAgUIAkAAIAAAUgAjQjRIAAgUIAkAAIAAAUg");
	this.shape_135.setTransform(27.05,22.975);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("ACrDmIAAgUIAlAAIAAAUgABjDmIAAgUIAkAAIAAAUgAAaDmIAAgUIAkAAIAAAUgAgtDmIAAgUIAkAAIAAAUgAh2DmIAAgUIAkAAIAAAUgAi/DmIAAgUIAlAAIAAAUgAjkDPIAAgkIAUAAIAAAkgADSDBIAAgkIAUAAIAAAkgAjkCHIAAglIAUAAIAAAlgADSB4IAAgkIAUAAIAAAkgAjkA+IAAgkIAUAAIAAAkgADSAwIAAglIAUAAIAAAZIAAAMgAjkgKIAAgkIAUAAIAAAkgADSgYIAAgkIAUAAIAAAkgAjkhTIAAgkIAUAAIAAAkgADShhIAAgkIAUAAIAAAkgAjkibIAAglIAUAAIAAAlgADSiqIAAgkIAUAAIAAAkgACejRIAAgUIAkAAIAAAUgABUjRIAAgUIAlAAIAAAUgAAMjRIAAgUIAkAAIAAAUgAg8jRIAAgUIAkAAIAAAUgAiFjRIAAgUIAlAAIAAAUgAjNjRIAAgUIAkAAIAAAUg");
	this.shape_136.setTransform(27.05,22.975);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("ACpDmIAAgUIAkAAIAAAUgABgDmIAAgUIAkAAIAAAUgAAXDmIAAgUIAlAAIAAAUgAgwDmIAAgUIAkAAIAAAUgAh6DmIAAgUIAlAAIAAAUgAjCDmIAAgUIAkAAIAAAUgAjkDMIAAgkIAUAAIAAAkgADSDEIAAgkIAUAAIAAAkgAjkCEIAAglIAUAAIAAAlgADSB7IAAgkIAUAAIAAAkgAjkA7IAAgkIAUAAIAAAkgADSAzIAAglIAUAAIAAAWIAAAPgAjkgNIAAgkIAUAAIAAAkgADSgVIAAgkIAUAAIAAAkgAjkhWIAAgkIAUAAIAAAkgADSheIAAgkIAUAAIAAAkgAjkieIAAglIAUAAIAAAlgADSinIAAgkIAUAAIAAAkgAChjRIAAgUIAkAAIAAAUgABYjRIAAgUIAkAAIAAAUgAAPjRIAAgUIAkAAIAAAUgAg5jRIAAgUIAlAAIAAAUgAiBjRIAAgUIAkAAIAAAUgAjKjRIAAgUIAkAAIAAAUg");
	this.shape_137.setTransform(27.05,22.975);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AClDmIAAgUIAlAAIAAAUgABdDmIAAgUIAkAAIAAAUgAAUDmIAAgUIAkAAIAAAUgAg0DmIAAgUIAkAAIAAAUgAh9DmIAAgUIAlAAIAAAUgAjFDmIAAgUIAkAAIAAAUgAjkDJIAAgkIAUAAIAAAkgADSDHIAAgkIAUAAIAAAkgAjkCBIAAglIAUAAIAAAlgADSB+IAAgkIAUAAIAAAkgAjkA4IAAgkIAUAAIAAAkgADSA2IAAglIAUAAIAAATIAAASgAjkgQIAAgkIAUAAIAAAkgADSgSIAAgkIAUAAIAAAkgAjkhZIAAgkIAUAAIAAAkgADShbIAAgkIAUAAIAAAkgAjkihIAAglIAUAAIAAAlgADSikIAAgkIAUAAIAAAkgACjjRIAAgUIAkAAIAAAUgABajRIAAgUIAlAAIAAAUgAASjRIAAgUIAkAAIAAAUgAg2jRIAAgUIAkAAIAAAUgAh+jRIAAgUIAkAAIAAAUgAjHjRIAAgUIAkAAIAAAUg");
	this.shape_138.setTransform(27.05,22.975);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("ACjDmIAAgUIAkAAIAAAUgABaDmIAAgUIAkAAIAAAUgAARDmIAAgUIAlAAIAAAUgAg2DmIAAgUIAkAAIAAAUgAh/DmIAAgUIAlAAIAAAUgAjHDmIAAgUIAkAAIAAAUgADSDKIAAgkIAUAAIAAAkgAjkDGIAAgkIAUAAIAAAkgADSCBIAAgkIAUAAIAAAkgAjkB+IAAglIAUAAIAAAlgADSA5IAAglIAUAAIAAAQIAAAVgAjkA1IAAgkIAUAAIAAAkgADSgPIAAgkIAUAAIAAAkgAjkgTIAAgkIAUAAIAAAkgADShYIAAgkIAUAAIAAAkgAjkhcIAAgkIAUAAIAAAkgADSihIAAgkIAUAAIAAAkgAjkikIAAglIAUAAIAAAlgACmjRIAAgUIAkAAIAAAUgABdjRIAAgUIAkAAIAAAUgAAUjRIAAgUIAkAAIAAAUgAg0jRIAAgUIAlAAIAAAUgAh8jRIAAgUIAkAAIAAAUgAjFjRIAAgUIAkAAIAAAUg");
	this.shape_139.setTransform(27.05,22.975);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("ACgDmIAAgUIAlAAIAAAUgABYDmIAAgUIAkAAIAAAUgAAPDmIAAgUIAkAAIAAAUgAg5DmIAAgUIAkAAIAAAUgAiCDmIAAgUIAlAAIAAAUgAjLDmIAAgUIAlAAIAAAUgADSDNIAAgkIAUAAIAAAkgAjkDDIAAgkIAUAAIAAAkgADSCEIAAgkIAUAAIAAAkgAjkB7IAAglIAUAAIAAAlgADSA8IAAglIAUAAIAAANIAAAYgAjkAyIAAgkIAUAAIAAAkgADSgMIAAgkIAUAAIAAAkgAjkgWIAAgkIAUAAIAAAkgADShVIAAgkIAUAAIAAAkgAjkhfIAAgkIAUAAIAAAkgADSieIAAgkIAUAAIAAAkgAjkinIAAglIAUAAIAAAlgACpjRIAAgUIAkAAIAAAUgABgjRIAAgUIAlAAIAAAUgAAYjRIAAgUIAkAAIAAAUgAgwjRIAAgUIAkAAIAAAUgAh5jRIAAgUIAlAAIAAAUgAjCjRIAAgUIAkAAIAAAUg");
	this.shape_140.setTransform(27.05,22.975);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("ACdDmIAAgUIAlAAIAAAUgABUDmIAAgUIAkAAIAAAUgAALDmIAAgUIAlAAIAAAUgAg8DmIAAgUIAkAAIAAAUgAiFDmIAAgUIAkAAIAAAUgAjODmIAAgUIAlAAIAAAUgADSDQIAAgkIAUAAIAAAkgAjkDAIAAgkIAUAAIAAAkgADSCHIAAgkIAUAAIAAAkgAjkB4IAAglIAUAAIAAAlgADSA/IAAglIAUAAIAAAKIAAAbgAjkAvIAAgkIAUAAIAAAkgADSgJIAAgkIAUAAIAAAkgAjkgZIAAgkIAUAAIAAAkgADShSIAAgkIAUAAIAAAkgAjkhiIAAgkIAUAAIAAAkgADSibIAAgkIAUAAIAAAkgAjkiqIAAglIAUAAIAAAlgACsjRIAAgUIAkAAIAAAUgABjjRIAAgUIAkAAIAAAUgAAajRIAAgUIAkAAIAAAUgAgtjRIAAgUIAkAAIAAAUgAh2jRIAAgUIAlAAIAAAUgAi+jRIAAgUIAkAAIAAAUg");
	this.shape_141.setTransform(27.05,22.975);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("ACaDmIAAgUIAkAAIAAAUgABRDmIAAgUIAkAAIAAAUgAAIDmIAAgUIAlAAIAAAUgAg/DmIAAgUIAkAAIAAAUgAiIDmIAAgUIAlAAIAAAUgAjQDmIAAgUIAkAAIAAAUgADSDTIAAglIAUAAIAAAlgAjkC9IAAgkIAUAAIAAAkgADSCKIAAgkIAUAAIAAAkgAjkB1IAAglIAUAAIAAAlgADSBBIAAgkIAUAAIAAAHIAAAdgAjkAsIAAgkIAUAAIAAAkgADSgHIAAgkIAUAAIAAAkgAjkgcIAAgkIAUAAIAAAkgADShPIAAglIAUAAIAAAlgAjkhlIAAgkIAUAAIAAAkgADSiYIAAglIAUAAIAAAlgAjkitIAAglIAUAAIAAAlgACvjRIAAgUIAkAAIAAAUgABmjRIAAgUIAkAAIAAAUgAAdjRIAAgUIAkAAIAAAUgAgrjRIAAgUIAlAAIAAAUgAhzjRIAAgUIAkAAIAAAUgAi8jRIAAgUIAkAAIAAAUg");
	this.shape_142.setTransform(27.05,22.975);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("ACXDmIAAgUIAlAAIAAAUgABPDmIAAgUIAkAAIAAAUgAAGDmIAAgUIAkAAIAAAUgAhCDmIAAgUIAkAAIAAAUgAiLDmIAAgUIAlAAIAAAUgAjUDmIAAgUIAlAAIAAAUgADSDWIAAglIAUAAIAAAlgAjkC6IAAgkIAUAAIAAAkgADSCNIAAgkIAUAAIAAAkgAjkByIAAglIAUAAIAAAlgADSBEIAAgkIAUAAIAAAEIAAAggAjkApIAAgkIAUAAIAAAkgADSgEIAAgkIAUAAIAAAkgAjkgfIAAgkIAUAAIAAAkgADShMIAAglIAUAAIAAAlgAjkhoIAAgkIAUAAIAAAkgADSiVIAAglIAUAAIAAAlgAjkiwIAAglIAUAAIAAAlgACyjRIAAgUIAkAAIAAAUgABpjRIAAgUIAlAAIAAAUgAAhjRIAAgUIAkAAIAAAUgAgnjRIAAgUIAkAAIAAAUgAhwjRIAAgUIAlAAIAAAUgAi5jRIAAgUIAkAAIAAAUg");
	this.shape_143.setTransform(27.05,22.975);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("ACUDmIAAgUIAlAAIAAAUgABLDmIAAgUIAkAAIAAAUgAACDmIAAgUIAlAAIAAAUgAhFDmIAAgUIAkAAIAAAUgAiODmIAAgUIAkAAIAAAUgAjXDmIAAgUIAlAAIAAAUgADSDZIAAglIAUAAIAAAlgAjkC3IAAgkIAUAAIAAAkgADSCQIAAgkIAUAAIAAAkgAjkBvIAAglIAUAAIAAAlgADSBHIAAgkIAUAAIAAABIAAAjgAjkAmIAAgkIAUAAIAAAkgADSgBIAAgkIAUAAIAAAkgAjkgiIAAgkIAUAAIAAAkgADShJIAAglIAUAAIAAAlgAjkhrIAAgkIAUAAIAAAkgADSiSIAAglIAUAAIAAAlgAjkizIAAglIAUAAIAAAlgAC0jRIAAgUIAkAAIAAAUgABrjRIAAgUIAlAAIAAAUgAAjjRIAAgUIAkAAIAAAUgAgljRIAAgUIAlAAIAAAUgAhtjRIAAgUIAkAAIAAAUgAi2jRIAAgUIAkAAIAAAUg");
	this.shape_144.setTransform(27.05,22.975);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("ACRDmIAAgUIAkAAIAAAUgABIDmIAAgUIAkAAIAAAUgAAADmIAAgUIAkAAIAAAUgAhIDmIAAgUIAkAAIAAAUgAiRDmIAAgUIAlAAIAAAUgAjZDmIAAgUIAkAAIAAAUgADSDcIAAglIAUAAIAAAlgAjkC1IAAglIAUAAIAAAlgADSCTIAAgkIAUAAIAAAkgAjkBsIAAgkIAUAAIAAAkgADSBKIAAgkIAUAAIAAAkgAjkAjIAAgjIAUAAIAAAjgADSABIAAgjIAUAAIAAAjgAjkgkIAAglIAUAAIAAAlgADShGIAAglIAUAAIAAAlgAjkhtIAAgkIAUAAIAAAkgADSiPIAAglIAUAAIAAAlgAjki2IAAgkIAUAAIAAAkgAC3jRIAAgUIAkAAIAAAUgABujRIAAgUIAlAAIAAAUgAAmjRIAAgUIAkAAIAAAUgAgijRIAAgUIAjAAIAAAUgAhrjRIAAgUIAlAAIAAAUgAizjRIAAgUIAkAAIAAAUg");
	this.shape_145.setTransform(27.05,22.975);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("ACODmIAAgUIAlAAIAAAUgABGDmIAAgUIAkAAIAAAUgAgCDmIAAgUIAjAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAlAAIAAAUgAjdDmIAAgUIAlAAIAAAUgADSDfIAAglIAUAAIAAAlgAjkCyIAAglIAUAAIAAAlgADSCWIAAgkIAUAAIAAAkgAjkBpIAAgkIAUAAIAAAkgADSBNIAAgkIAUAAIAAAkgAjkAgIAAgjIAUAAIAAAjgADSAEIAAgjIAUAAIAAAjgAjkgnIAAglIAUAAIAAAlgADShDIAAglIAUAAIAAAlgAjkhwIAAgkIAUAAIAAAkgADSiMIAAglIAUAAIAAAlgAjki5IAAgkIAUAAIAAAkgAC7jRIAAgUIAkAAIAAAUgAByjRIAAgUIAkAAIAAAUgAApjRIAAgUIAkAAIAAAUgAgfjRIAAgUIAkAAIAAAUgAhojRIAAgUIAlAAIAAAUgAiwjRIAAgUIAkAAIAAAUg");
	this.shape_146.setTransform(27.05,22.975);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("ACMDmIAAgUIAkAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAjAAIAAAUgAhODmIAAgUIAkAAIAAAUgAiXDmIAAgUIAlAAIAAAUgAjfDmIAAgUIAkAAIAAAUgADSDiIAAglIAUAAIAAAlgAjkCvIAAglIAUAAIAAAlgADSCZIAAgkIAUAAIAAAkgAjkBmIAAgkIAUAAIAAAkgADSBQIAAgkIAUAAIAAAkgAjkAdIAAgjIAUAAIAAAjgADSAHIAAgjIAUAAIAAAjgAjkgqIAAglIAUAAIAAAlgADShAIAAglIAUAAIAAAlgAjkhzIAAgkIAUAAIAAAkgADSiJIAAglIAUAAIAAAlgAjki8IAAgkIAUAAIAAAkgAC9jRIAAgUIAkAAIAAAUgAB1jRIAAgUIAkAAIAAAUgAAsjRIAAgUIAkAAIAAAUgAgcjRIAAgUIAkAAIAAAUgAhkjRIAAgUIAkAAIAAAUgAitjRIAAgUIAkAAIAAAUg");
	this.shape_147.setTransform(27.05,22.975);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("ACIDmIAAgUIAlAAIAAAUgABADmIAAgUIAkAAIAAAUgAgIDmIAAgUIAjAAIAAAUgAhRDmIAAgUIAkAAIAAAUgAiZDmIAAgUIAkAAIAAAUgAjiDmIAAgUIAlAAIAAAUgADSDkIAAgkIAUAAIAAAkgAjkCsIAAglIAUAAIAAAlgADSCbIAAgkIAUAAIAAAkgAjkBjIAAgkIAUAAIAAAkgADSBTIAAglIAUAAIAAAlgAjkAaIAAgjIAUAAIAAAjgADSAKIAAgjIAUAAIAAAjgAjkgtIAAglIAUAAIAAAlgADSg+IAAgkIAUAAIAAAkgAjkh2IAAgkIAUAAIAAAkgADSiHIAAgkIAUAAIAAAkgAjki/IAAgkIAUAAIAAAkgADAjRIAAgUIAkAAIAAAUgAB3jRIAAgUIAlAAIAAAUgAAvjRIAAgUIAkAAIAAAUgAgZjRIAAgUIAjAAIAAAUgAhijRIAAgUIAlAAIAAAUgAiqjRIAAgUIAkAAIAAAUg");
	this.shape_148.setTransform(27.05,22.975);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIAUAAIAAAjgACGDmIAAgUIAkAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAkAAIAAAUgAhTDmIAAgUIAkAAIAAAUgAicDmIAAgUIAkAAIAAAUgAjkDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjkCpIAAglIAUAAIAAAlgADSCeIAAgkIAUAAIAAAkgAjkBgIAAgkIAUAAIAAAkgADSBWIAAglIAUAAIAAAlgAjkAXIAAgjIAUAAIAAAjgADSANIAAgjIAUAAIAAAjgAjkgwIAAglIAUAAIAAAlgADSg7IAAgkIAUAAIAAAkgAjkh5IAAgkIAUAAIAAAkgADSiEIAAgkIAUAAIAAAkgAjkjCIAAgjIAYAAIAAAUIgEAAIAAAPgADSjNIAAgEIgPAAIAAgUIAjAAIAAAYgAB6jRIAAgUIAlAAIAAAUgAAyjRIAAgUIAkAAIAAAUgAgXjRIAAgUIAkAAIAAAUgAhfjRIAAgUIAkAAIAAAUgAiojRIAAgUIAkAAIAAAUg");
	this.shape_149.setTransform(27.05,22.975);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("ADMDmIAAgUIAGAAIAAgMIAUAAIAAAggACDDmIAAgUIAkAAIAAAUgAA6DmIAAgUIAkAAIAAAUgAgODmIAAgUIAjAAIAAAUgAhXDmIAAgUIAkAAIAAAUgAigDmIAAgUIAlAAIAAAUgAjkDmIAAgcIAUAAIAAAIIAMAAIAAAUgAjkCmIAAglIAUAAIAAAlgADSChIAAgkIAUAAIAAAkgAjkBdIAAgkIAUAAIAAAkgADSBZIAAglIAUAAIAAAlgAjkAUIAAgjIAUAAIAAAjgADSAQIAAgjIAUAAIAAAjgAjkgzIAAglIAUAAIAAAlgADSg4IAAgkIAUAAIAAAkgAjkh8IAAgkIAUAAIAAAkgADSiBIAAgkIAUAAIAAAkgAjkjFIAAggIAbAAIAAAUIgHAAIAAAMgADSjKIAAgHIgMAAIAAgUIAgAAIAAAbgAB9jRIAAgUIAlAAIAAAUgAA1jRIAAgUIAkAAIAAAUgAgTjRIAAgUIAjAAIAAAUgAhcjRIAAgUIAlAAIAAAUgAikjRIAAgUIAkAAIAAAUg");
	this.shape_150.setTransform(27.05,22.975);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIAUAAIAAAbgAB9DmIAAgUIAlAAIAAAUgAA1DmIAAgUIAkAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAlAAIAAAUgAikDmIAAgUIAkAAIAAAUgAjkDmIAAghIAUAAIAAANIAHAAIAAAUgADSCnIAAgkIAUAAIAAAkgAjkChIAAgkIAUAAIAAAkgADSBeIAAgkIAUAAIAAAkgAjkBYIAAgkIAUAAIAAAkgADSAWIAAgkIAUAAIAAAkgAjkAQIAAgkIAUAAIAAAkgADSgyIAAgkIAUAAIAAAkgAjkg4IAAgkIAUAAIAAAkgADSh7IAAgkIAUAAIAAAkgAjkiBIAAgkIAUAAIAAAkgAjkjKIAAgbIAhAAIAAAUIgNAAIAAAHgACEjRIAAgUIAkAAIAAAUgAA7jRIAAgUIAkAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAifjRIAAgUIAlAAIAAAUg");
	this.shape_151.setTransform(27.05,22.975);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("ADDDmIAAgUIAPAAIAAgEIAUAAIAAAYgAB7DmIAAgUIAkAAIAAAUgAAyDmIAAgUIAkAAIAAAUgAgWDmIAAgUIAjAAIAAAUgAhfDmIAAgUIAkAAIAAAUgAioDmIAAgUIAlAAIAAAUgAjkDmIAAgkIAUAAIAAAQIAEAAIAAAUgADSCqIAAgkIAUAAIAAAkgAjkCeIAAgkIAUAAIAAAkgADSBhIAAgkIAUAAIAAAkgAjkBVIAAgkIAUAAIAAAkgADSAZIAAgkIAUAAIAAAkgAjkANIAAgkIAUAAIAAAkgADSgvIAAgkIAUAAIAAAkgAjkg7IAAgkIAUAAIAAAkgADSh4IAAgeIAUAAIAAAegAjkiEIAAgkIAUAAIAAAkgAjkjNIAAgYIAkAAIAAAUIgQAAIAAAEgACHjRIAAgUIAQAAIAAAUgAA+jRIAAgUIAkAAIAAAUgAgKjRIAAgUIAjAAIAAAUgAhTjRIAAgUIAlAAIAAAUgAibjRIAAgUIAkAAIAAAUg");
	this.shape_152.setTransform(27.05,22.975);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("ADADmIAAgUIASAAIAAgBIAUAAIAAAVgAB3DmIAAgUIAkAAIAAAUgAAuDmIAAgUIAlAAIAAAUgAgZDmIAAgUIAjAAIAAAUgAhiDmIAAgUIAkAAIAAAUgAirDmIAAgUIAlAAIAAAUgAjkDkIAAglIAUAAIAAAlgADSCtIAAgkIAUAAIAAAkgAjkCbIAAgkIAUAAIAAAkgADSBkIAAgkIAUAAIAAAkgAjkBSIAAgkIAUAAIAAAkgADSAcIAAgkIAUAAIAAAkgAjkAKIAAgkIAUAAIAAAkgADSgsIAAgkIAUAAIAAAkgAjkg+IAAgkIAUAAIAAAkgAjkiHIAAgkIAUAAIAAAkgABAjRIAAgUIAkAAIAAAUgAgIjRIAAgUIAjAAIAAAUgAhRjRIAAgUIAlAAIAAAUgAiZjRIAAgUIAlAAIAAAUgAjhjRIAAgUIAkAAIAAAUg");
	this.shape_153.setTransform(27.05,22.975);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AC9DmIAAgUIAkAAIAAAUgAB1DmIAAgUIAjAAIAAAUgAAsDmIAAgUIAkAAIAAAUgAgcDmIAAgUIAjAAIAAAUgAhlDmIAAgUIAlAAIAAAUgAitDmIAAgUIAkAAIAAAUgAjkDhIAAglIAUAAIAAAlgADSCwIAAglIAUAAIAAAlgAjkCYIAAgkIAUAAIAAAkgADSBnIAAgkIAUAAIAAAkgAjkBPIAAgkIAUAAIAAAkgADSAeIAAgjIAUAAIAAAjgAjkAHIAAgkIAUAAIAAAkgAjkhBIAAgkIAUAAIAAAkgAjkiKIAAgkIAUAAIAAAkgAgFjRIAAgUIAjAAIAAAUgAhOjRIAAgUIAlAAIAAAUgAiWjRIAAgUIAkAAIAAAUgAjfjRIAAgUIAkAAIAAAUg");
	this.shape_154.setTransform(27.05,22.975);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AC7DmIAAgUIAkAAIAAAUgAByDmIAAgUIAkAAIAAAUgAApDmIAAgUIAlAAIAAAUgAgeDmIAAgUIAjAAIAAAUgAhoDmIAAgUIAlAAIAAAUgAiwDmIAAgUIAkAAIAAAUgAjkDeIAAglIAUAAIAAAlgADSCzIAAglIAUAAIAAAlgAjkCVIAAgkIAUAAIAAAkgADSBqIAAgkIAUAAIAAAkgAjkBMIAAgkIAUAAIAAAkgAjkAEIAAgkIAUAAIAAAkgAjkhEIAAgkIAUAAIAAAkgAjkiNIAAgkIAUAAIAAAkgAhKjRIAAgUIAkAAIAAAUgAiTjRIAAgUIAlAAIAAAUgAjbjRIAAgUIAkAAIAAAUg");
	this.shape_155.setTransform(27.05,22.975);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AC3DmIAAgUIAlAAIAAAUgABvDmIAAgUIAkAAIAAAUgAAmDmIAAgUIAkAAIAAAUgAgiDmIAAgUIAjAAIAAAUgAhrDmIAAgUIAlAAIAAAUgAizDmIAAgUIAkAAIAAAUgAjkDbIAAglIAUAAIAAAlgADSC2IAAglIAUAAIAAAlgAjkCSIAAgkIAUAAIAAAkgAjkBJIAAgkIAUAAIAAAkgAjkABIAAgkIAUAAIAAAkgAjkhHIAAgkIAUAAIAAAkgAjkiQIAAgkIAUAAIAAAkgAiQjRIAAgUIAiAAIAAAUgAjYjRIAAgUIAkAAIAAAUg");
	this.shape_156.setTransform(27.05,22.975);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AC+DPIAAgUIAdAAIAAAUgAB2DPIAAgUIAkAAIAAAUgAAtDPIAAgUIAlAAIAAAUgAgaDPIAAgUIAjAAIAAAUgAhjDPIAAgUIAkAAIAAAUgAisDPIAAgUIAlAAIAAAUgAjaDBIAAgkIAUAAIAAAkgAjaB5IAAglIAUAAIAAAlgAjaAwIAAgkIAUAAIAAAkgAjagYIAAgkIAUAAIAAAkgAjahhIAAgkIAUAAIAAAkgAjaipIAAglIAUAAIAAAlg");
	this.shape_157.setTransform(26.05,25.275);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("ABwCrIAAgVIAlAAIAAAVgAAoCrIAAgVIAkAAIAAAVgAggCrIAAgVIAkAAIAAAVgAhoCrIAAgVIAkAAIAAAVgAiUCaIAAgkIAUAAIAAAkgAiUBSIAAglIAUAAIAAAlgAiUAJIAAgjIAUAAIAAAjgAiUg/IAAglIAUAAIAAAlgAiUiIIAAghIAUAAIAAAhg");
	this.shape_158.setTransform(19,28.9);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("ABLCAIAAgUIAkAAIAAAUgAACCAIAAgUIAlAAIAAAUgAhFCAIAAgUIAkAAIAAAUgAhuBtIAAglIAUAAIAAAlgAhuAkIAAgkIAUAAIAAAkgAhugkIAAgkIAUAAIAAAkgAhuhsIAAgTIAUAAIAAATg");
	this.shape_159.setTransform(15.2,33.15);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AAlBcIAAgUIAkAAIAAAUgAgjBcIAAgUIAkAAIAAAUgAhIBGIAAglIAUAAIAAAlgAhIgCIAAglIAUAAIAAAlgAhIhLIAAgQIAUAAIAAAQg");
	this.shape_160.setTransform(11.425,36.75);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AAtA/IAAgVIARAAIAAAVgAgbA/IAAgVIAkAAIAAAVgAg9AlIAAgkIAUAAIAAAkgAg9giIAAgbIAUAAIAAAbg");
	this.shape_161.setTransform(10.325,39.7);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgBAhIAAgVIAjAAIAAAVgAghAEIAAgkIAUAAIAAAkg");
	this.shape_162.setTransform(7.5,42.7);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AAGAXIAAgUIARAAIAAAUgAgWgHIAAgPIAUAAIAAAPg");
	this.shape_163.setTransform(6.375,43.65);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgDAiIAAgUIAkAAIAAAUgAggADIAAgkIAUAAIAAAkg");
	this.shape_164.setTransform(7.375,42.55);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAfBGIAAgUIAlAAIAAAUgAgpBGIAAgUIAlAAIAAAUgAhCAjIAAgjIAUAAIAAAjgAhCgkIAAghIAUAAIAAAhg");
	this.shape_165.setTransform(10.85,38.95);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("ABFBkIAAgUIAfAAIAAAUgAgDBkIAAgUIAjAAIAAAUgAhMBkIAAgUIAlAAIAAAUgAhjA/IAAglIAUAAIAAAlgAhjgJIAAgkIAUAAIAAAkgAhjhSIAAgRIAUAAIAAARg");
	this.shape_166.setTransform(14.075,35.95);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("ABsBvIAAgUIAVAAIAAAUgAAkBvIAAgUIAkAAIAAAUgAgkBvIAAgUIAkAAIAAAUgAhsBvIAAgUIAkAAIAAAUgAiABHIAAglIAUAAIAAAlgAiAgBIAAglIAUAAIAAAlgAiAhKIAAgkIAUAAIAAAkg");
	this.shape_167.setTransform(17.05,34.85);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("ACVCVIAAgUIALAAIAAAUgABMCVIAAgUIAkAAIAAAUgAADCVIAAgUIAkAAIAAAUgAhFCVIAAgUIAlAAIAAAUgAiOCVIAAgUIAlAAIAAAUgAieBpIAAgkIAUAAIAAAkgAieAhIAAgkIAUAAIAAAkgAiegnIAAgkIAUAAIAAAkgAiehwIAAgkIAUAAIAAAkg");
	this.shape_168.setTransform(20.05,31.05);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("ACGC7IAAgUIAkAAIAAAUgAA9C7IAAgUIAlAAIAAAUgAgKC7IAAgUIAjAAIAAAUgAhTC7IAAgUIAkAAIAAAUgAicC7IAAgUIAlAAIAAAUgAipCMIAAgkIAUAAIAAAkgAipBEIAAglIAUAAIAAAlgAipgEIAAgkIAUAAIAAAkgAiphNIAAgkIAUAAIAAAkgAipiWIAAgkIAUAAIAAAkg");
	this.shape_169.setTransform(21.15,27.275);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("ACpDcIAAgUIAkAAIAAAUgABgDcIAAgUIAkAAIAAAUgAAXDcIAAgUIAlAAIAAAUgAgwDcIAAgUIAkAAIAAAUgAh5DcIAAgUIAlAAIAAAUgAjBDcIAAgUIAkAAIAAAUgAjMCrIAAglIAUAAIAAAlgAjMBiIAAgkIAUAAIAAAkgAjMAZIAAgjIAUAAIAAAjgAjMguIAAglIAUAAIAAAlgAjMh3IAAgkIAUAAIAAAkgAjMjAIAAgbIATAAIAAABIABAAIAAAag");
	this.shape_170.setTransform(24.65,23.975);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("ACODmIAAgUIAlAAIAAAUgABGDmIAAgUIAkAAIAAAUgAgCDmIAAgUIAjAAIAAAUgAhLDmIAAgUIAkAAIAAAUgAiUDmIAAgUIAlAAIAAAUgAjdDmIAAgUIAlAAIAAAUgADSDfIAAglIAUAAIAAAlgAjkCyIAAglIAUAAIAAAlgAjkBpIAAgkIAUAAIAAAkgAjkAgIAAgjIAUAAIAAAjgAjkgnIAAglIAUAAIAAAlgAjkhwIAAgkIAUAAIAAAkgAjki5IAAgkIAUAAIAAAkgAiwjRIAAgUIAUAAIAAAUg");
	this.shape_171.setTransform(27.05,22.975);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("ACMDmIAAgUIAkAAIAAAUgABDDmIAAgUIAkAAIAAAUgAgFDmIAAgUIAjAAIAAAUgAhODmIAAgUIAkAAIAAAUgAiXDmIAAgUIAlAAIAAAUgAjfDmIAAgUIAkAAIAAAUgADSDiIAAglIAUAAIAAAlgAjkCvIAAglIAUAAIAAAlgADSCZIAAgkIAUAAIAAAkgAjkBmIAAgkIAUAAIAAAkgAjkAdIAAgjIAUAAIAAAjgAjkgqIAAglIAUAAIAAAlgAjkhzIAAgkIAUAAIAAAkgAjki8IAAgkIAUAAIAAAkgAitjRIAAgUIAkAAIAAAUg");
	this.shape_172.setTransform(27.05,22.975);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("ACIDmIAAgUIAlAAIAAAUgABADmIAAgUIAkAAIAAAUgAgIDmIAAgUIAjAAIAAAUgAhRDmIAAgUIAkAAIAAAUgAiZDmIAAgUIAkAAIAAAUgAjiDmIAAgUIAlAAIAAAUgADSDkIAAgkIAUAAIAAAkgAjkCsIAAglIAUAAIAAAlgADSCbIAAgkIAUAAIAAAkgAjkBjIAAgkIAUAAIAAAkgADSBTIAAgfIAUAAIAAAfgAjkAaIAAgjIAUAAIAAAjgAjkgtIAAglIAUAAIAAAlgAjkh2IAAgkIAUAAIAAAkgAjki/IAAgkIAUAAIAAAkgAhijRIAAgUIAlAAIAAAUgAiqjRIAAgUIAkAAIAAAUg");
	this.shape_173.setTransform(27.05,22.975);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("ADPDmIAAgUIADAAIAAgPIAUAAIAAAjgACGDmIAAgUIAkAAIAAAUgAA9DmIAAgUIAkAAIAAAUgAgLDmIAAgUIAkAAIAAAUgAhTDmIAAgUIAkAAIAAAUgAicDmIAAgUIAkAAIAAAUgAjkDmIAAgZIAUAAIAAAFIAQAAIAAAUgAjkCpIAAglIAUAAIAAAlgADSCeIAAgkIAUAAIAAAkgAjkBgIAAgkIAUAAIAAAkgADSBWIAAglIAUAAIAAAlgAjkAXIAAgjIAUAAIAAAjgADSANIAAgNIAUAAIAAANgAjkgwIAAglIAUAAIAAAlgAjkh5IAAgkIAUAAIAAAkgAjkjCIAAgjIAYAAIAAAUIgEAAIAAAPgAgXjRIAAgUIAXAAIAAAUgAhfjRIAAgUIAkAAIAAAUgAiojRIAAgUIAkAAIAAAUg");
	this.shape_174.setTransform(27.05,22.975);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("ADMDmIAAgUIAGAAIAAgMIAUAAIAAAggACDDmIAAgUIAkAAIAAAUgAA6DmIAAgUIAkAAIAAAUgAgODmIAAgUIAjAAIAAAUgAhXDmIAAgUIAkAAIAAAUgAigDmIAAgUIAlAAIAAAUgAjkDmIAAgcIAUAAIAAAIIAMAAIAAAUgAjkCmIAAglIAUAAIAAAlgADSChIAAgkIAUAAIAAAkgAjkBdIAAgkIAUAAIAAAkgADSBZIAAglIAUAAIAAAlgAjkAUIAAgjIAUAAIAAAjgADSAQIAAgjIAUAAIAAAjgAjkgzIAAglIAUAAIAAAlgAjkh8IAAgkIAUAAIAAAkgAjkjFIAAggIAbAAIAAAUIgHAAIAAAMgAgTjRIAAgUIAjAAIAAAUgAhcjRIAAgUIAlAAIAAAUgAikjRIAAgUIAkAAIAAAUg");
	this.shape_175.setTransform(27.05,22.975);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("ADJDmIAAgUIAJAAIAAgKIAUAAIAAAegACADmIAAgUIAkAAIAAAUgAA3DmIAAgUIAlAAIAAAUgAgQDmIAAgUIAjAAIAAAUgAhZDmIAAgUIAkAAIAAAUgAihDmIAAgUIAkAAIAAAUgAjkDmIAAgeIAUAAIAAAKIAKAAIAAAUgADSCkIAAgkIAUAAIAAAkgAjkCkIAAgkIAUAAIAAAkgADSBbIAAgkIAUAAIAAAkgAjkBbIAAgkIAUAAIAAAkgADSATIAAgkIAUAAIAAAkgAjkATIAAgkIAUAAIAAAkgADSg1IAAgkIAUAAIAAAkgAjkg1IAAgkIAUAAIAAAkgAjkh+IAAgkIAUAAIAAAkgAjkjHIAAgeIAeAAIAAAUIgKAAIAAAKgAA3jRIAAgUIAlAAIAAAUgAgQjRIAAgUIAjAAIAAAUgAhZjRIAAgUIAkAAIAAAUgAihjRIAAgUIAkAAIAAAUg");
	this.shape_176.setTransform(27.05,22.975);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("ADGDmIAAgUIAMAAIAAgHIAUAAIAAAbgAB9DmIAAgUIAlAAIAAAUgAA1DmIAAgUIAkAAIAAAUgAgTDmIAAgUIAjAAIAAAUgAhcDmIAAgUIAlAAIAAAUgAikDmIAAgUIAkAAIAAAUgAjkDmIAAghIAUAAIAAANIAHAAIAAAUgADSCnIAAgkIAUAAIAAAkgAjkChIAAgkIAUAAIAAAkgADSBeIAAgkIAUAAIAAAkgAjkBYIAAgkIAUAAIAAAkgADSAWIAAgkIAUAAIAAAkgAjkAQIAAgkIAUAAIAAAkgADSgyIAAgkIAUAAIAAAkgAjkg4IAAgkIAUAAIAAAkgADSh7IAAghIAUAAIAAAhgAjkiBIAAgkIAUAAIAAAkgAjkjKIAAgbIAhAAIAAAUIgNAAIAAAHgACEjRIAAgUIAZAAIAAAUgAA7jRIAAgUIAkAAIAAAUgAgNjRIAAgUIAjAAIAAAUgAhWjRIAAgUIAkAAIAAAUgAifjRIAAgUIAlAAIAAAUg");
	this.shape_177.setTransform(27.05,22.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_126}]}).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[]},1).to({state:[{t:this.shape_164}]},7).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(25.1,23,24.9,23);
// library properties:
lib.properties = {
	id: '01',
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
an.compositions['01'] = {
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