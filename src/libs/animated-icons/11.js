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


(lib.z_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.2,1,1).p("AAEgUQgSAAgHABQgMADADALQAEAOAPAIQAQAKARgMQAZgSgrgRg");
	this.shape.setTransform(-21.7478,33.6472);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgLARQgPgIgEgOQgDgLAMgDQAHgBASAAQArARgZASQgJAGgKAAQgGAAgIgEg");
	this.shape_1.setTransform(-21.7478,33.6472);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.2,1,1).p("AjIEhQgUgKAHgoQAMhGBiiQQB0irA9hIQBAhNAYAHQAYAHASAYQASAXgJALQg2A0g3A1QhsBrgnAyQhcB7goBTQgOAfgDAGQgEAJgEgCg");
	this.shape_2.setTransform(3.3593,-6.7823);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AjIEhQgUgKAHgoQAMhGBiiQQB0irA9hIQBAhNAYAHQAYAHASAYQASAXgJALIhtBpQhsBrgnAyQhcB7goBTIgRAlQgDAIgDAAIgCgBg");
	this.shape_3.setTransform(3.3593,-6.7823);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.z_2, new cjs.Rectangle(-25.9,-36.8,51.9,73.69999999999999), null);


(lib.z_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.2,1,1).p("AALgnQgUgKgVAXQgUAWANATQAPAXAOAEQAQAFAVgSQAVgRgLgWQgJgUgTgJg");
	this.shape.setTransform(-8.1902,36.3383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIAqQgOgEgPgXQgNgTAUgWQAVgXAUAKQATAJAJAUQALAWgVARQgQAOgNAAIgIgBg");
	this.shape_1.setTransform(-8.1902,36.3383);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.2,1,1).p("AhZEfQgdABArkUQAskUAggRQAsgXA2BTQAKAPgiBFQg2BsgdBfQgbBYgWBtQgDASgFADQgDACgVABg");
	this.shape_2.setTransform(2.3176,-11.8991);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhLAMQAskUAggRQAsgXA2BTQAKAPgiBFQg2BsgdBfQgbBYgWBtQgDASgFADQgDACgVABIAAAAQgdAAArkTg");
	this.shape_3.setTransform(2.3176,-11.8991);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.z_1, new cjs.Rectangle(-13.5,-41.6,27.1,83.30000000000001), null);


(lib.stopp = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AgYAMIAxgX");
	this.shape.setTransform(-28.4,45.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AjVhMICbAuQCtA4BiAz");
	this.shape_1.setTransform(10.85,75.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhcBxIAvjhQA5ABAmASQAvAXgEArQgEAthOAAIhMgK");
	this.shape_2.setTransform(20.9658,-55.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AAChyQgTgEgUAgQgSAfgIAsQgJAtAJAiQAKAnAeAHQAgAIAagfQAYgdAHgvQAIgugPgkQgRgogogHg");
	this.shape_3.setTransform(0.3375,-57.9612);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AgTBhIAnjB");
	this.shape_4.setTransform(-17.95,-61.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("Ag9gMIB7AZ");
	this.shape_5.setTransform(-15.55,-71.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("ABEhXQgqgNgZAJQgbAKgGAjQgCAMArAbQAtAbgBAaQgCAlgzAKQg0ALgPgl");
	this.shape_6.setTransform(-34.125,-64.8333);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("ADsn0IlngbIkRD2Ig8E5QgRBHA2BjQAPAbAhA2QAcAyAMAjIAZAzIFXBtIFYjoIArjjQABgdALgsQAHgZANgwQAShWgqgvg");
	this.shape_7.setTransform(-4.8571,-57.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2.2,1,1).p("AETouImigiIk7ESIgoDQQgYBagDAQQgLA8AMAuQAQBCAwBaQAcAzA3BlIAeA6IGQB8IEPivQBOg7AegpQAhguAKhDQABgCAFgqQADgaADgRQAIglAShJQAPhAADgqQAIh4hNhLg");
	this.shape_8.setTransform(-2.9154,-57.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF5C50").s().p("AlbHUIgeg6IhTiXQgwhbgQhCQgMguALg7QADgRAYhaIAojQIE7kSIGiAiIC7EIQBNBMgIB3QgDAqgPBAQgSBKgIAkQgDARgDAaIgGAsQgKBEghAtQgeAphOA7IkPCvg");
	this.shape_9.setTransform(-2.9154,-57.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(2.2,1,1).p("ABAj5Qg9D1hCD+");
	this.shape_10.setTransform(-33.05,18.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8glQg8D0AIAKQAWAaAigDQArgEARg9QAahVBUlK");
	this.shape_11.setTransform(-41.6971,78.5653);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0DVQA3jfAyjK");
	this.shape_12.setTransform(-21.125,18.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(2.2,1,1).p("AGZECQing2iqg4QlUhwgSgKQgUgMgIguQgEgXgIhjQgEgtgHgOQgQgbg3gR");
	this.shape_13.setTransform(16.275,58.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(2.2,1,1).p("AjVmGQhYAVgTAOQgsAggdAiQghAmANANQAbAbAjgDQAtgEAtg3QAEgEgjBBQgrBOgEAWQgMBEASAfQAEAFAZASQAXAPAxAIQA3AIAnAWQAwAaDdB2QDUB2BLBC");
	this.shape_14.setTransform(0.8433,77.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(2.2,1,1).p("Ag3haQgUAsATAtQAUAsA6ArQANAJARgKQAIgFAGgH");
	this.shape_15.setTransform(-52.3938,65.4506);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(2.2,1,1).p("AgyikQgqAfADBTQADBQArAyQA5BDAYANQApAVALhG");
	this.shape_16.setTransform(-48.982,56.7512);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(2.2,1,1).p("ABQi/QiAACgkAtQgaAhARBHQARBDA5BYQA9BgAbgYQAVgSAHgXQAIgcgKgo");
	this.shape_17.setTransform(-43.8317,48.716);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(2.2,1,1).p("AAOAZQgOgZgNgY");
	this.shape_18.setTransform(-39.4,44.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhEDBQgYgJgJgNQgEgHAah4IAbh3IAYgYQAfAUATgiQAKgQADgVQAPAJASgPQAIgHAGgKIAVgXIhEENQgdBdgUATQgPAMgRAAQgKAAgMgEg");
	this.shape_19.setTransform(-42.8582,82.6383);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgjgUIArgQIAdgQIg6Bpg");
	this.shape_20.setTransform(-31.15,58.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ah3DnICBnwIBuAdIhpGuIgtATIhHA1g");
	this.shape_21.setTransform(-27.625,20.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FC95A6").s().p("AFZF3QhlhIhug6IjVhxIhSgqQgcgEgfgHQg+gPgSgPQgWgSgHggQgHghAIgoQAIghAig9QARgeAPgYQgOALgRAMQgkAWgTACIAIAnQADAsgXAUQgXATgRgEIgMgIIABAZQgCAagQAKQgRAIgMgFIgIgJQgEAJgGAGQgNAOgOgKQgdgUgZgaQgmgngDgaQgDgaAIgVIAIgRQgEgfADgjQAGhGAhgYIgBgSQACgWAMgRQAmg4CAAGIgkCGIAUAmIBGg4IAugTIAPhHIAnAPQAnATABAaQADAxAGA7QAIBPAGAJQALAQAdAPQAzAcB6AmQC+A5E4BrIAUEkIipAhQgcgYgygkg");
	this.shape_22.setTransform(0.0341,73.296);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stopp, new cjs.Rectangle(-60,-117.8,119.3,235.3), null);


(lib.sch_up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.2,1,1).p("ABGAkQgUgQgbgRQg2ghgmgF");
	this.shape.setTransform(2.65,-1.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF0F7").s().p("AhEgjQAmAFA1AhQAbARATAQg");
	this.shape_1.setTransform(2.65,-1.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.2,1,1).p("AA2ARQgPgIgUgJQgpgQgfAA");
	this.shape_2.setTransform(-4.175,3.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFF0F7").s().p("Ag1gQQAfAAApAQQAUAJAPAIg");
	this.shape_3.setTransform(-4.175,3.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sch_up, new cjs.Rectangle(-10.6,-5.8,21.299999999999997,11.7), null);


(lib.sch_niz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.2,1,1).p("AA8g1QhCBBg1Aq");
	this.shape.setTransform(3.95,1.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF0F7").s().p("AA8g1QhCBBg1Aqg");
	this.shape_1.setTransform(3.95,1.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.2,1,1).p("AA2ghQguAbg9Ao");
	this.shape_2.setTransform(-4.5,-3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sch_niz, new cjs.Rectangle(-10.9,-7.5,21.9,15.1), null);


(lib.phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhfANQB8gUBDgF");
	this.shape.setTransform(39.1,-35.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AihAVIBwgRQB/gRBUgH");
	this.shape_1.setTransform(-46.125,-25.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgiApQgQgNgCgVQgEgUAOgTQANgRAWgDIAHgBQAUAAAPANQAQANADAVQADAUgOASQgNATgWADIgIAAQgTAAgPgNgAAAgJQgFAAgCAEQgDADABAEQACAIAHABIACAAQAEgBACgEQADgDgBgEQAAgDgDgDQgDgDgEAAg");
	this.shape_2.setTransform(-45.5588,17.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgiApQgQgOgCgTQgEgVAOgTQANgSAWgDIAHAAQAUAAAPANQAQANADAUQADAVgOATQgNARgWAEIgIAAQgTAAgPgNgAgHgGQgDAFABACQABAJAIAAIACAAQAEgBACgDQADgEgBgCQAAgEgDgDQgDgDgEABIAAAAQgFAAgCADg");
	this.shape_3.setTransform(-38.0588,27.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgiApQgQgNgDgUQgDgVAOgSQANgSAWgEIAHAAQAUAAAPANQAPANADAUQAEAVgOASQgOASgWAEIgHAAQgTAAgPgNgAgHgFQgDADABADQABAJAIAAIABAAQAEAAADgEQADgDgBgDQgBgJgJAAIgBAAQgEABgCADg");
	this.shape_4.setTransform(-49.8912,29.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2.2,1,1).p("AAWgCQABAIgFAHQgGAIgJABQgIABgHgFQgIgGgBgJQgBgIAFgHQAGgIAJgBQAIgBAHAFQAIAGABAJg");
	this.shape_5.setTransform(-55.125,18.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B3B3B3").s().p("AgMASQgIgGgBgJQgBgIAFgHQAGgIAJgBQAIgBAHAFQAIAGABAJQABAIgFAHQgGAIgJABIgDAAQgGAAgGgEg");
	this.shape_6.setTransform(-55.125,18.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(2.2,1,1).p("ABfCLIiSAVQgfAEgagTQgZgTgFgfIgViSQgEgfATgaQATgZAggFICRgVQAfgEAaATQAZATAFAgIAVCRQAEAfgTAaQgTAZgfAFg");
	this.shape_7.setTransform(-45.0241,23.3759);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2.2,1,1).p("AJ0EkIx9CkQgyAHgpgfQgogegHgyIhJn4QgHgyAfgpQAfgpAygHIR9ikQAygHApAfQAoAeAHAyIBJH4QAHAygfApQgfApgyAHg");
	this.shape_8.setTransform(0,0.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#4D4D4D").s().p("ApkGwQgogegHgyIhJn4QgHgyAfgpQAegpAzgHIR9ikQAygHAoAfQApAeAIAyIBIH4QAGAygeApQgfApgyAHIx9CkIgSABQgoAAghgZg");
	this.shape_9.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.phone, new cjs.Rectangle(-74.4,-46.7,148.9,93.5), null);


(lib.nogi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhSgGIA+gEQBFABAiAU");
	this.shape.setTransform(-69.125,6.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhmgZIAMgEQARgCAVACQBDAHBYA1");
	this.shape_1.setTransform(-12.225,22.9056);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AABheIgMBMQgIBRAgAg");
	this.shape_2.setTransform(33.4556,-20.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AALhdIgPBCQgNBLAOAu");
	this.shape_3.setTransform(-23.6689,-42.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(2.2,1,1).p("AjNAUQAcgiAeAPQAIAEANAJQAMAHAFgEQBKgnAjgGQBJgLAwBFIAbggQAggbAaAl");
	this.shape_4.setTransform(-56.7,69.1694);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2.2,1,1).p("AlLgyQAigrArA+QAVAfAPAnQBxhOBEAJQA0AHB9BYQANAKAYgTQANgKAhgfQBBg5AsAv");
	this.shape_5.setTransform(0.45,84.7686);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(2.2,1,1).p("AADA2QgFhNAAge");
	this.shape_6.setTransform(-50.575,26.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(2.2,1,1).p("AgPhdQAYAuAGAyQAGAzgRAo");
	this.shape_7.setTransform(-52.92,56.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2.2,1,1).p("AALg5QAQAngQAjQgHAOgWAb");
	this.shape_8.setTransform(-42.775,46.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(2.2,1,1).p("AAQgXQgKAXgVAY");
	this.shape_9.setTransform(-48.425,64.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(2.2,1,1).p("ABVFhQgwgYggg0QgZgrgDglQgIhRgRhdQgThfgHgqQgYiMAhhi");
	this.shape_10.setTransform(-75.6759,35.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(2.2,1,1).p("AgPFCQgrANgWgsQgeg8AkiLQAoiaBEiSIA9h0");
	this.shape_11.setTransform(-25.4143,-52.8429);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(2.2,1,1).p("AhCB6ICFjz");
	this.shape_12.setTransform(-41.475,-15.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(2.2,1,1).p("Ai5ENQBthmAogpQBRhRArg9QAigwAVgwQAdhDAOhZ");
	this.shape_13.setTransform(6.55,-38.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(2.2,1,1).p("AhkCnQASgfBEh9QBEh3Aug6");
	this.shape_14.setTransform(-38.05,48.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(2.2,1,1).p("AAPAoQgKg0gTgb");
	this.shape_15.setTransform(-13.35,-11.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8AOQgYhIAsg/QATgbAWgKQAZgKAVANQATAMADANQACAKgGAUQgSA7AGArQAFAegCAhQgBAagJBI");
	this.shape_16.setTransform(-53.7591,-0.2674);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8BHQAChWAbgiQAYgcAsAJQAKADAIAQQAEAJACAH");
	this.shape_17.setTransform(-62.425,-11.6437);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(2.2,1,1).p("AgwBNQgIhSAOgjQAPgoAvAEQASACAOAU");
	this.shape_18.setTransform(-70.7705,-11.3934);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(2.2,1,1).p("AgkBnQAJg0AehAQAehAAEgZ");
	this.shape_19.setTransform(-52.7,25.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(2.2,1,1).p("ABYAWQgighglgHQgigHhGAL");
	this.shape_20.setTransform(-68.675,-1.0861);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(2.2,1,1).p("AgYBQQgahSARgrQAOgmAnAEQAOACAFAIQACAEAAAE");
	this.shape_21.setTransform(-79.7661,-8.194);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(2.2,1,1).p("AAyiSQAPAngUAqQgJAUgZAcQgEAFgHAoQgDAVgDAUQgSAvggAf");
	this.shape_22.setTransform(13.1634,71.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(2.2,1,1).p("AAUCkQgSgZgPggQgNgbAPhxQAPhzgFgP");
	this.shape_23.setTransform(-13.9892,66.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(2.2,1,1).p("AAnEWQgnAlgfgGQhBgKAkjQQAZiTA5iOIA0hv");
	this.shape_24.setTransform(30.5949,-28.689);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9BcIB7i3");
	this.shape_25.setTransform(16.9,4.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(2.2,1,1).p("AjAFTQBvhoAngmQBQhSAsg+QAtg+AYhJQAihoAIiY");
	this.shape_26.setTransform(65.1,-22.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(2.2,1,1).p("AiuFuQAshQBPhsQBah7BHhDQBEhBgDiCQgChugjgw");
	this.shape_27.setTransform(29.2063,44.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(2.2,1,1).p("AgygOQgRg9AeglQAfglApAdQAUANABA4QABAnAACS");
	this.shape_28.setTransform(4.9259,18.6129);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8BDQAAhNAUggQAUghAqALQAlAJACAfQABAPgHAM");
	this.shape_29.setTransform(-2.7683,5.4125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2BOQAAhiAVgiQAUggAxAMQARAEACAdQABAPgCAO");
	this.shape_30.setTransform(-11.7107,0.8132);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(2.2,1,1).p("AATCJQgBgOACg3QABgrgFgaQgPhVgUgy");
	this.shape_31.setTransform(11.6333,43.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(2.2,1,1).p("ABwA+Qgigig2gdQg1gehSge");
	this.shape_32.setTransform(-7.725,14.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(2.2,1,1).p("AhThBIA3BAQA/A/AxAE");
	this.shape_33.setTransform(-10.425,51.225);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(2.2,1,1).p("AB2EgQgfAAgsgRQhKgegthEQgthDAEh+IANhyQgZg5AWgzQAVgxAnAEQAbADADADQAQAOAHA8");
	this.shape_34.setTransform(-17.3165,20.4599);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FC95A6").s().p("Ag+NLQgXACgVAHIgQAGQgtgzAFhQIAShjQAEgYABgrIABgmQhCg2grhFIgeg7Ih5DTIhkCPIgZgJQgpgQg6AbIgxAfQg6gWgkheQgchJADgdQACgMgQhrQgRhzgPg/QgNg6ANhIIAPg9QgOhDACggQACgcASgUQAPgRAZAHQAMADAKAHIAMgPQAPgQASgIQARgIAVAPQAKAHAHAJIALgHQAQgIAVgFQAVgFAOAXQAHALADANIAPgIQASgJAQgCQARgCAOAVQAMARAAALQAAAJgRBEICMjpQgTh3BjjwQAghKAmhOIAhg/IBvgnQB2glArAJQA4ALAwBNQAzBUgOBXQgQBegnBRQgnBRhDBMQg3BAhXBRIhNBFIAGAlIAEACQAIADAVAAQAVAAADAiQABARgCARIAJgGQAQgGAfAAQAfABAJAhQAEAQgCAQQAvgPATAtQAKAXAAAaIB6iyQAEh8AdhzQARhGAjhhQAVg5AXgvIATgjIAjkoIF2C3IA4BhIgHBsQgPCBgrBrQgrBriTCTIiJB+QAUBJgIBXQgGA9gOAlQgMAehVBRIioDXIhnCiQhBg0hJAEg");
	this.shape_35.setTransform(-0.0189,-2.5294);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nogi, new cjs.Rectangle(-85.2,-91.6,170.7,184.3), null);


(lib.mozg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AjBCMQACgRAIgbQARg1AhgrQBoiMDfAB");
	this.shape.setTransform(-130.775,-100.0003);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AgDiRIAMAeQAOAmAGAmQAQB2hMBE");
	this.shape_1.setTransform(170.6706,-15.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhCgjIAqAUQAxAYAqAb");
	this.shape_2.setTransform(141.525,-79.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("Agih/QgmARgPAkQgNAjAOAnQAkBfCRAh");
	this.shape_3.setTransform(121.6496,-39.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhahFIADAbQAIAgAOAXQAvBNBtgb");
	this.shape_4.setTransform(-44.2,-14.8745);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AA9hBQgiALgfAXQhAAsAKA1");
	this.shape_5.setTransform(20.4882,-61.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AgjiTQgFAAATAXQAbAiANAcQA0BshjBm");
	this.shape_6.setTransform(64.6636,-100.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhUAIIBAgLQBGgKAjAN");
	this.shape_7.setTransform(35.975,-134.0256);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AiYAWIAcgMQAkgNAlgIQB1gaBXAp");
	this.shape_8.setTransform(-31.875,-134.7721);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AiSAwIAXgYQAdgbAggSQBpg5BnBC");
	this.shape_9.setTransform(-24.15,-101.9261);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("ABLhJQgqANgmAZQhPAxAMA8");
	this.shape_10.setTransform(-89.4735,-29.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhiAvQAAgJAEgMQAHgYARgQQA0g2B2Al");
	this.shape_11.setTransform(-122.45,5.0607);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("Ah8AtIAVgXQAagZAegRQBbg1BRBA");
	this.shape_12.setTransform(-100.95,-67.3556);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AAdhNQgWAWgQAeQghA9AaAr");
	this.shape_13.setTransform(-171.3681,1.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AAjg2QgTAGgSARQglAhAGA1");
	this.shape_14.setTransform(-141.4669,-47.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AAnhNQgXALgUAYQgpAxAIBH");
	this.shape_15.setTransform(-173.2972,-49.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(2.2,1,1).p("AkIkLQgBB0BHBVQAeAjB5BeQBCA1gXA9QgMAegZAUICbApICTi+");
	this.shape_16.setTransform(45.7735,116.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(2.2,1,1).p("Akui6IgOAlQgPAtAAArQgBCJCPA9QCSA/BqgQQA7gIAkgeQAIgFBOhAQBOhGAKgw");
	this.shape_17.setTransform(77.1249,106.079);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(2.2,1,1).p("AjEi7IARAoQAZAyAlAxQB2CbDEBR");
	this.shape_18.setTransform(34.1,98.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(2.2,1,1).p("AgehXQAyA4AIAgQANAyg7Al");
	this.shape_19.setTransform(-69.535,-101.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(2.2,1,1).p("AhNgeIAFAOQAHAQAOALQArAkBWgd");
	this.shape_20.setTransform(-38.125,-120.383);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(2.2,1,1).p("AgSiuQA9A4gbCYQgOBMgZBB");
	this.shape_21.setTransform(-133.9775,-80.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(2.2,1,1).p("AB3lLQgCAygfAuQgVAfgvAuQg3A2gSAWQglAtgKAtQgfCGAgBdQArB3CLgb");
	this.shape_22.setTransform(-176.6567,-46.2928);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(2.2,1,1).p("AnhB8QBLiHDshDQC1g1CfAKQCqAJAzAWQBnArgOCI");
	this.shape_23.setTransform(-44.6968,-131.5228);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(2.2,1,1).p("ADvhBQBvgWAPhaQAHglgPglQgOgkgcgWQgggYhfANQhkAOhpAwQkYB/g9DmQgSBFAWBWQALAqAPAd");
	this.shape_24.setTransform(-128.4294,-93.3784);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(2.2,1,1).p("AFDBFQhwh6iFgNQh4gLkYBH");
	this.shape_25.setTransform(34.525,-133.8047);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(2.2,1,1).p("AjKBqQgdhrCnhCQBDgbBNgIQBMgIA0AN");
	this.shape_26.setTransform(-136.7077,-0.6274);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(2.2,1,1).p("AhmiDQgIBKBABRQA+BSBYAZ");
	this.shape_27.setTransform(74.3752,67.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(2.2,1,1).p("AhIghIAxAFQA4AOAoAw");
	this.shape_28.setTransform(117.725,-100.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(2.2,1,1).p("AhQAkQAfglBEgVQAigKAcgD");
	this.shape_29.setTransform(12.925,-109.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(2.2,1,1).p("AkCAtIAyARQBAARBAABQDMADCIii");
	this.shape_30.setTransform(-35.95,-83.2731);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(2.2,1,1).p("ACwCBQgMg/gygoQhjhNi9B6IBlhHQBihRgJgv");
	this.shape_31.setTransform(-43.2,-61.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(2.2,1,1).p("Akmh2IAigKQArgLAvgFQCUgPB8A3QC2BQAKBdQAFAwgfAf");
	this.shape_32.setTransform(-56.1903,11.6643);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(2.2,1,1).p("AgphAIAoArQAoAyADAk");
	this.shape_33.setTransform(-83.5,-9.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(2.2,1,1).p("AjjAqQEhitBdAnQAoARAPA3QAKAhAIBX");
	this.shape_34.setTransform(-58.55,-30.857);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(2.2,1,1).p("AjzBEQAthfCigfQCfgeB4A+");
	this.shape_35.setTransform(-14.9,-45.0918);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(2.2,1,1).p("AERkkQiBAjgtA2QgzA+BKBFQhhgNhhAnQjEBOgEEF");
	this.shape_36.setTransform(30.625,-79.7);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(2.2,1,1).p("AgRhPQgjBCAmA0QAMASARANQAPAKAFAA");
	this.shape_37.setTransform(28.3302,-48.225);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(2.2,1,1).p("AAThsQgwAmAOBdQAHAvAPAn");
	this.shape_38.setTransform(69.603,-23.275);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(2.2,1,1).p("Am9HjQAeAAAqgaQAqgbAigpQBVhmgehcQgQgvBAhJQBOhWCUgzQAVgHB2gkQBCgVAjgSQBVgtBRiLQASgggXg1Qgag7g7gK");
	this.shape_39.setTransform(48.5701,-43.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(2.2,1,1).p("AhGiAQgbA+BVBnQApA0AwAo");
	this.shape_40.setTransform(-14.2269,-9.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(2.2,1,1).p("AisAOQBbg5CIAdQBEAOAyAZ");
	this.shape_41.setTransform(-5.2,6.5417);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(2.2,1,1).p("AjrBRQA2hqCvgoQBFgRBFACQBDABAlAQ");
	this.shape_42.setTransform(73.675,-5.7812);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(2.2,1,1).p("Aj0BQQAMgfAlghQAqgjA7gYQCXg+C8Av");
	this.shape_43.setTransform(29.9,9.4867);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(2.2,1,1).p("AgUiQQAxBDADBSQAEBehEAu");
	this.shape_44.setTransform(97.6585,-23.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(2.2,1,1).p("ACbAiQgRgZgwgTQhegoiWAd");
	this.shape_45.setTransform(141,1.7778);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(2.2,1,1).p("AArjAQgrAygQArQgUA0ALA7QAKA6gIA8QgHAzgMAM");
	this.shape_46.setTransform(155.675,-18.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(2.2,1,1).p("AhohhIBjBGQBlBPAJAu");
	this.shape_47.setTransform(142.75,-37.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(2.2,1,1).p("AkpBIQBUh0CbgXQCqgYC6Br");
	this.shape_48.setTransform(120.875,-57.9265);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").ss(2.2,1,1).p("AnFDpIAfggQAjgqAZgrQBQiJg3hrIAhAYQArAaAwAJQCXAbCRicIAVAVQAcAWAmAIQB3AdClhz");
	this.shape_49.setTransform(25.55,47.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(2.2,1,1).p("AhfBRQAThLA/gpQAngbBGgS");
	this.shape_50.setTransform(-114.375,-19.975);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(2.2,1,1).p("ACVi6QhSAUhNA5QibBxATC3");
	this.shape_51.setTransform(-93.6086,-27.65);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(2.2,1,1).p("AA4iEQhVAjgVBhQgRBVAiAw");
	this.shape_52.setTransform(-103.1945,-42.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").ss(2.2,1,1).p("AC2jvQgdgQhIAjQhMAlhBBCQhNBNgcBVQgiBmAqBi");
	this.shape_53.setTransform(-143.2556,-40.376);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(2.2,1,1).p("AEskPQgXARhMASQh5AcgdAJQjPA+hSCJQhVCPAhBPQAQAoAhAL");
	this.shape_54.setTransform(-98.8864,-66.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(2.2,1,1).p("ANiALQglAAgfgcQgTgRgegvQgggxgTgTQggghgmgGQh3gVhaAOQiOAVidBpQgGAEgkgbQgygkgqgTQiihFjMBeQjRBhifB7QgxAmgnAlIgdAd");
	this.shape_55.setTransform(9.025,-106.555);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(2.2,1,1).p("ADoCJQgOiZh2hKQiBhRjKA8");
	this.shape_56.setTransform(102.55,-110.5349);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(2.2,1,1).p("AGED/QAoh+gnh4Qgqh8hogmQiPg0AAgBQhngihRgKQjpgdhHCpQgkBVAeAuQAfAwBsAR");
	this.shape_57.setTransform(133.3119,-71.5374);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(2.2,1,1).p("Am2HjQg1g4AYhVQAZhUBJgQQCBgaAsgBQBugCBHBAQBQBIBQgQQBNgQAohZQAOggAuhGQA5hYAVgmQBeingXhzQgXh2hvg0QgjgRgngIIghgF");
	this.shape_58.setTransform(140.9996,0.2);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(2.2,1,1).p("AhiCaQAeAAAngbQAlgcAfgrQBNhpgVho");
	this.shape_59.setTransform(149.2916,48.475);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(2.2,1,1).p("ApOgGIAjAcQAuAhAyAWQCgBECVhMQCShLB2BiQAfAaAzA8QAsA1AUAMQArAZA/gRQA+gQA3gyQA7g1AchHQAfhOgQhUQgQhVhrgtQhhgphGAX");
	this.shape_60.setTransform(81.4195,76.1164);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(2.2,1,1).p("AlUk8QhbBqgnBTQhOCoCFA8QAdANAUAaQADACAfAxQAuBHBbAkQByAsCog6QCRgzCShuQA8gtAlglQATgTAGgK");
	this.shape_61.setTransform(-11.5568,59.8863);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(2.2,1,1).p("AjojAQAABqABALQANBNA9AoQB9BUBSAkQCOA9Apg+");
	this.shape_62.setTransform(-79.425,52.0563);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(2.2,1,1).p("AjjkEQg2gUg+ADQh+AHgtByQg0CGBNBaQBIBWDYBQQCuBBBwgfQAfgJAvgYQAsgWAWgFQARgDA7gJQA1gHAggIQBkgbAuhG");
	this.shape_63.setTransform(-127.1392,12.4191);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FC95A6").s().p("AQsS6QgZgOgVgXIgQgTQiQjIiMA7QhiAphAANQhDAPg/gJQg1gHhSgyIhHgxQg6AdhEAhQiGBAgxAPQg4ARhKgCQhHgCgzgTQgqgQg1hBQgzhGgNgQQgRgTgagLIgWgHQgLAMgdAIQgbAHgTgCQhOgKiJhWQiDhTgVgrQgRgiABhEIADg+QgSAAhPAkQhSAkg5AFQhQAGiUg3Qiag5hThHQhKg/gFhPQgDgkAUhJQAIghAugpQAXgVAVgPQgHADgQAAQgfAAgqgMQgzgPgWgzQgWgzAChsQADhiAog/QAZgoBJg/QAxgqAXgyIAOgpQAHgrAPgyQAehlAlgpQBfhrCchFQCCg7CLgUQAzgHAmAhQATARAJASIAggqQAogwAqgYQBFgnBIgcQBngoBfgLQBogMBOAAQBGABBdAMQBKAJAtAmQAWAUAHARICegnQCvgkBYALQBZAMBPBEQAnAiAVAgQA0ADApAVQAVALAKAKQBggeBJACQBgACBQA3QBJAxAeBaQAPAtABAjIBJASQBbAYBYAfQBYAeAsAhQAWARAEAKQBNBXgCCIQgBBEgQAzQBXAVArBXQAtBbgaB2QgUBehPByIg5BQQgcApgIAXQgPAwgpAoIgmAfQAKClhjBbQgfAcgnASIggAMQAXA/gcBgQgkB5hpA/Qg4Ajg0AAQgmAAgjgTg");
	this.shape_64.setTransform(0.102,-20.9907);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FC95A6").s().p("AgLEVIhggrQgbgNgjgTQhGgmgnggQhchMhChjIgwhWIgHhoII9hVIBMAoQBaAzBGAzQDfCkhABoQhFBzhpA+QhVAyhKAAQgyAAhpgqg");
	this.shape_65.setTransform(62.4623,93.275);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FC95A6").s().p("AgtDxQAngcgJhIQgEgfhAgzQhqhUgJgJQg1gzgUg9QgUg/AMhNIIzFRIi2Dsg");
	this.shape_66.setTransform(47.3035,115.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mozg, new cjs.Rectangle(-189.5,-144.9,379.1,289.70000000000005), null);


(lib.hand_up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.5,1,1).p("AiQhDQBWAgBtA2QA4AcAmAV");
	this.shape.setTransform(13.625,8.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2.2,1,1).p("AHmC9QiThIiahNQk0iYgngWQglgbgagSQgxgigjgLQgmgMglgYQglgZgNgIQglgYgKAXQgKAVAPAmQANAhBLAcQAmAOAjAHQA5AhAIALQANARgEA1QgXAQg0gBQgwgEgEAAQgYAAgDAUQgEAUAbAPQAsAaAhgCQAQgBBcgVQAXgFB/BbQBKA2C1CJ");
	this.shape_1.setTransform(0.025,0.0312);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFF0F7").s().p("AglBzQh/hbgXAFQhcAVgQABQghACgsgaQgbgPAEgUQADgUAYAAIA0AEQA0ABAXgQQAEg1gNgRQgIgLg5ghQgjgHgmgOQhLgcgNghQgPgmAKgVQAKgXAlAYIAyAhQAlAYAmAMQAjALAxAiIA/AtQAnAWE0CYIEtCVIkMB1Qi1iJhKg2g");
	this.shape_2.setTransform(0.025,0.0312);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2.2,1,1).p("AgHhIQgYARgPALQgbAVgBAIQgBALAnAnQAnApAKgDQAMgDAYgWQAZgWABgJQABgMgXgIQgagKgVAS");
	this.shape_3.setTransform(-34.1242,-8.2897);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFF0F7").s().p("AhDA4IgagfQgagfgCgIQgCgIAkgbQASgOATgMIAIgWIBiAYIBCCGIiRAkg");
	this.shape_4.setTransform(-29.2303,-8.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand_up, new cjs.Rectangle(-49.6,-31.6,99.30000000000001,63.3), null);


(lib.hand_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AhjhQIDHCh");
	this.shape.setTransform(5.3,-25.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2.2,1,1).p("ADCHrIAIADQAKADAJgEQAegNAMhIQANhHgXg+Qgbg1gDgMQgFgQgiiqQgeiVgOgcQgMgZhyhfQhVhHh9hhQgzgngTgO");
	this.shape_1.setTransform(9.5482,-0.9019);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.2,1,1).p("AguAjIANAGQAPAFANgCQAqgHAKhR");
	this.shape_2.setTransform(26.075,45.5141);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2.2,1,1).p("AkxmGIB3BIQCUBQCWAtQAWAGAaBGQARAvA3CoQAFAPgaAfQgJAKgcAcQgPAOgBAiQAAAOAHA5QACASAJAGQAIAFAKgIQAYgUgDg1QgCghANAoQAMAmgFAdQgEAWgSAPQgOAMAEAGQAJAMAVABQAXAAARgSQAbgdAHgaIABgU");
	this.shape_3.setTransform(-5.675,11.3007);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFF0F7").s().p("ACpH3QgRgBgIgLQgEgGANgKQARgNAEgXQAFgcgLgnQgMgrACAhQADA1gYAUQgKAIgIgFQgJgFgCgSQgHg6AAgOQABgiAPgOQAcgbAJgLQAagegFgQQg3iogRgvQgahGgWgGQiWgsiUhRIh3hIIC/jiIBGA1QB8BhBWBHQByBfAMAZQAOAcAeCVQAiCqAFAQQADAMAbA1QAXA+gNBHQgMBIgeANQgJAEgKgDIgIgDQgQAMgYAEQgPADgNgFIgKgFQgWANgSAAIgCgBg");
	this.shape_4.setTransform(0.0232,-0.049);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand_phone, new cjs.Rectangle(-37.3,-51.4,74.69999999999999,102.9), null);


(lib.green_glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.2,1,1).p("AhAGPQgvgNgogdQgkgbgcgpQgshKgRhXQgQhUALhWQAJg7ATg0QAchvBfhUQBJhABkALQBnALA5BQQAkAyATA0QAxCCghCTQgfCNhcBqQgcAggmAXQhJAshMgQg");
	this.shape.setTransform(-0.0014,0.0041);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#78EE9F").s().p("AhAGPQgvgNgogdQgkgbgcgpQgshKgRhXQgQhUALhWQAJg7ATg0QAchvBfhUQBJhABkALQBnALA5BQQAkAyATA0QAxCCghCTQgfCNhcBqQgcAggmAXQg2Ahg3AAQgUAAgUgFg");
	this.shape_1.setTransform(-0.0014,0.0041);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.green_glaz, new cjs.Rectangle(-29.7,-41.4,59.5,82.8), null);


(lib.glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AgSAJIAlgR");
	this.shape.setTransform(-23.375,-52.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.2,1,1).p("AlkkdQBygfBvAQQCVAVB8BuQCzCfAeCtQAPBYgVA3");
	this.shape_1.setTransform(21.1291,-27.2945);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("AgzhQQAwALAXAbQAYAdgiAPQgbAPAfAhQAQARAWAO");
	this.shape_2.setTransform(-22.75,52.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("Ag6AiQALgyA2gNQAbgGAZAE");
	this.shape_3.setTransform(19.6,12.595);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("AC8CGQgqgegahPQgahKgWgMQgogWg4AvQgeAXgLAGQgXAJgTgNQgXgQgeg3Igbgz");
	this.shape_4.setTransform(36.35,10.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("ABLg6QgCAFAAAIQABAIAFAEQhdAVgBABQg0ATgLAz");
	this.shape_5.setTransform(-6.075,-55.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("AAPh2QAyAxgbAYQgwAdgXAdQgcAmAcAmQAPATASAM");
	this.shape_6.setTransform(-2.888,52.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("AiJhQQBVAEBNAmQAmAUAdAdQAeAeAQAn");
	this.shape_7.setTransform(29.05,-39.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFD4DE").ss(2.2,1,1).p("ADaAuQgUgKgfgWQgqgdgIgFQgcgSgVgFQgagGgXALQg1AYgTAEQgcAGgtgTQgygHgpAZ");
	this.shape_8.setTransform(35.825,-27.2809);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(2.2,1,1).p("ADHJ2QhgAehlAAQhgABhdgcQhAgTg1geQhmg3hThgQgogvggg0QgigygWg3Qg9ibAYinQAHg0ASg2QBHjqDliEQDliFDuA3QAyALAxAWQAyAUAxAeQAsAaAnAgQBjBSA+BvQA/ByAPB/QAHBAgGBBQgTDEh6CaQh+CejBA9g");
	this.shape_9.setTransform(0.0282,0.0313);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFF0F7").s().p("Ai7J5QhAgTg1geQhmg3hThgQgogvggg0QgigygWg3Qg9ibAYinQAHg0ASg2QBHjqDliEQDliFDuA3QAyALAxAWQAyAUAxAeQAsAaAnAgQBjBSA+BvQA/ByAPB/QAHBAgGBBQgTDEh6CaQh+CejBA9QhgAehlAAIgCAAQhfAAhcgbg");
	this.shape_10.setTransform(0.0282,0.0313);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.glaz, new cjs.Rectangle(-67.2,-67,134.5,134.1), null);


// stage content:
(lib._11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(75));

	// znak_2
	this.instance = new lib.z_2();
	this.instance.setTransform(225.8,240.35,1,1,0,0,0,-22.3,33.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({regX:-22.2,regY:33.1,scaleX:0.2085,scaleY:0.2067,rotation:-14.9987,x:225.75},10).to({_off:true},1).wait(41).to({_off:false,regX:25.2,regY:-35.6,scaleX:0.2417,scaleY:0.2417,rotation:14.996,x:276.2,y:169.65},0).to({regX:24.9,regY:-35.8,scaleX:1,scaleY:1,rotation:0,x:273,y:171.35},14).wait(1));

	// znak_1
	this.instance_1 = new lib.z_1();
	this.instance_1.setTransform(210.35,238.6,1,1,0,0,0,-8.2,36.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:36.8,scaleX:0.2241,scaleY:0.1625,rotation:-29.9997,x:210.3,y:238.65},14).to({_off:true},1).wait(38).to({_off:false,regX:12.6,regY:-40.2,scaleX:0.314,scaleY:0.2486,rotation:14.9982,x:234.1,y:161.7},0).to({regX:12.5,regY:-40.6,scaleX:1,scaleY:1,rotation:0,x:231.05},16).wait(6));

	// hand_phone
	this.instance_2 = new lib.hand_phone();
	this.instance_2.setTransform(222.45,364.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:218.45,y:358.25},17).to({rotation:-8.4533,x:221.5,y:360.5},19).to({rotation:0,x:222.45,y:368.15},20).to({y:364.4},18).wait(1));

	// phone
	this.instance_3 = new lib.phone();
	this.instance_3.setTransform(222.75,376.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:218.75,y:370.2},17).to({rotation:-8.4533,x:223.55,y:372.25},19).to({rotation:0,x:222.75,y:380.1},20).to({y:376.35},18).wait(1));

	// black_glaz
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgGDTQglgMgZgXQgbgZgKghQgPgvgFgzQgFg4ALgvQAMg2AdgfQAjgkA1gEQAegFAZANQAaAPAJAcQANArAHAkQAYCLg5BdQgTAdgYAOQgWAOgWAAIgGAAg");
	this.shape.setTransform(117.5104,304.5439);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIDVQglgMgagYQgbgZgJghQgQgwgEg0QgEg5ALgwQAMg2AfgfQAjglA2gDQAegFAZAOQAaAPAJAcQANAsAHAkQAYCOg7BeQgUAdgYAOQgWANgWAAIgHAAg");
	this.shape_1.setTransform(111.1067,298.6861);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgKDYQglgNgagYQgcgagJgiQgPgwgEg1QgEg6AMgwQANg3AfgfQAkglA3gDQAegFAaAPQAaAPAJAdQANAsAGAlQAXCQg9BeQgUAdgYAPQgWANgXAAIgHAAg");
	this.shape_2.setTransform(110.5534,298.6641);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgMDaQgmgNgagYQgbgbgJgiQgPgxgDg1QgEg8AMgwQAOg3AfghQAlgkA4gDQAegEAaAOQAbAQAIAdQANAtAGAmQAWCSg+BfQgUAdgaAPQgVANgWAAIgJgBg");
	this.shape_3.setTransform(110.0131,298.671);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgODdQgmgNgagZQgcgbgJgjQgOgygDg2QgEg8ANgxQAOg4AgggQAmglA4gCQAggFAaAPQAaAQAJAeQAMAuAHAmQAVCUhABgQgVAegaAOQgWANgWAAIgJgBg");
	this.shape_4.setTransform(109.4727,298.6474);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgQDgQgmgPgagZQgcgcgJgjQgPgzgCg2QgDg9ANgyQAPg4AhghQAmglA5gCQAggEAaAQQAbAQAJAeQAMAvAGAmQAUCWhBBhQgWAegaAOQgXANgWAAIgJAAg");
	this.shape_5.setTransform(108.9162,298.6583);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgSDiQgmgPgbgaQgcgcgIgkQgPgygCg4QgDg+AOgyQAQg5AhghQAnglA6gBQAggEAaAPQAcARAIAfQAMAvAGAoQATCXhCBiQgWAegbAPQgWAMgWAAIgLgBg");
	this.shape_6.setTransform(108.3515,298.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgUDlQgngPgagbQgdgcgIglQgOg0gCg4QgCg+AOgzQAQg5AigiQAoglA7gBQAggEAbAQQAbASAJAfQAMAvAFAoQATCbhEBiQgXAegbAOQgXANgWAAIgLgBg");
	this.shape_7.setTransform(107.8103,298.6258);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgWDoQgngQgbgbQgcgdgIglQgOg1gCg5QgCg/APgzQARg6AigiQApglA8gBQAhgDAaAQQAcASAIAfQAMAxAFAoQASCchGBkQgXAegbAOQgXANgWAAIgMgBg");
	this.shape_8.setTransform(107.2521,298.6179);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgXDqQgogQgbgbQgdgegIgmQgOg1gBg5QgBhBAPgzQASg7AjgiQAqglA7gBQAigDAbARQAcASAIAgQALAxAGApQAQCehHBkQgXAfgcAOQgXAMgWAAIgMgBg");
	this.shape_9.setTransform(106.724,298.6111);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgZDtQgogRgcgcQgdgegHgmQgOg2gBg6QgBhCAQg0QASg7AkgiQArgmA8AAQAigDAbASQAdASAHAhQAMAxAFAqQAQCghJBlQgYAegcAPQgXAMgWAAIgNgBg");
	this.shape_10.setTransform(106.1659,298.6037);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgbDwQgpgRgbgdQgdgegIgnQgNg3gBg7QAAhCAQg0QATg8AkgjQAsglA9AAQAigDAcASQAcASAIAiQALAyAFAqQAPCihKBmQgZAfgcAOQgXAMgXAAIgNgBg");
	this.shape_11.setTransform(105.625,298.5792);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgdDyQgpgRgcgdQgdgfgHgoQgNg3gBg8QAAhDARg1QAUg8AkgjQAtgmA+ABQAjgDAbASQAdATAHAiQAMAzAEArQAOCkhLBnQgZAfgdAOQgXAMgWAAIgPgCg");
	this.shape_12.setTransform(105.0595,298.5707);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgfD1QgpgSgcgeQgegfgGgoQgOg4AAg9QABhEARg1QAUg9AmgjQAtgmA/ABQAjgCAbASQAeAUAHAiQALAzAEArQAOCnhOBnQgZAfgdAPQgYALgWAAIgPgBg");
	this.shape_13.setTransform(104.5001,298.5762);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AghD4QgpgTgcgeQgegggHgpQgNg5AAg9QABhEASg2QAVg+AmgjQAugmA/ABQAkgCAcATQAdAUAIAiQALA0AEAsQAMCphPBoQgaAfgdAOQgYAMgXAAIgPgBg");
	this.shape_14.setTransform(103.9604,298.5515);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgjD6QgqgTgcgeQgeghgGgpQgNg6ABg9QABhGASg3QAVg+AngjQAvgnBAACQAkgCAcATQAeAVAHAjQALA0AEAtQAMCrhRBpQgaAfgfAOQgXAMgWAAIgRgCg");
	this.shape_15.setTransform(103.4243,298.5625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AglD9QgqgTgcgfQgfgigGgpQgMg7ABg+QABhGATg3QAWg/AngkQAwgmBBACQAlgCAcAUQAeAUAHAkQAKA1AEAtQALCthSBqQgbAfgfAOQgYAMgWAAIgRgCg");
	this.shape_16.setTransform(102.8809,298.5379);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgnEAQgqgUgdggQgegigGgqQgNg7ACg/QAChHATg4QAXg/AogkQAwgnBCADQAlgCAcAUQAeAVAHAkQALA2ADAuQAKCvhTBqQgcAggfAOQgXALgXAAQgJAAgJgBg");
	this.shape_17.setTransform(102.3204,298.5262);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgoD9QgqgUgcggQgegigGgpQgMg7ACg+QADhHATg3QAXg+AogjQAwgmBBADQAlgCAcAUQAdAVAHAkQAKA2ADAtQAJCthUBpQgbAfgfAOQgXAKgWAAQgJAAgJgBg");
	this.shape_18.setTransform(102.475,298.7247);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgqD6QgpgUgbgfQgegigFgpQgLg6ACg+QADhGAUg2QAWg+AogiQAwgmBAAEQAlgBAbAUQAdAVAHAjQAJA1ADAtQAHCrhTBnQgbAfgfAOQgWAKgWAAQgJAAgKgCg");
	this.shape_19.setTransform(102.6157,298.898);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgrD3QgpgUgbgfQgcgigGgpQgKg5ACg9QAEhGAUg1QAXg9AoghQAvglBAAEQAkgBAbAUQAdAVAFAjQAJA1ADAsQAGCphTBmQgcAegeANQgVAKgWAAQgKAAgJgCg");
	this.shape_20.setTransform(102.7712,299.0955);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgtD0QgogUgagfQgcgigFgoQgKg5ADg9QAEhEAUg1QAXg8AoghQAvgkA/AEQAkAAAaAUQAdAVAFAiQAJA1ACArQAECohSBkQgcAegeANQgVAJgWAAQgJAAgKgCg");
	this.shape_21.setTransform(102.927,299.2723);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AguDxQgogUgagfQgbgigFgoQgJg4ADg8QAFhEAUg0QAXg7AoggQAugjA/AEQAjAAAaAUQAcAVAFAiQAIA0ACArQAECmhTBjQgcAdgdAMQgVAJgUAAQgKAAgKgCg");
	this.shape_22.setTransform(103.11,299.4803);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgvDuQgngUgaggQgbghgEgoQgJg4AEg5QAFhEAUg0QAYg6AogfQAugjA+AFQAjAAAZAUQAcAVAEAiQAIAzABArQADCkhTBhQgcAdgdALQgUAJgUAAQgKAAgKgCg");
	this.shape_23.setTransform(103.2421,299.6572);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgxDrQgmgUgZgfQgbghgDgoQgJg3AFg5QAFhDAUgzQAYg6AogeQAugiA9AFQAjABAZATQAbAVAEAiQAHAzABAqQABCjhSBfQgcAcgdALQgUAJgTAAQgLAAgKgDg");
	this.shape_24.setTransform(103.3977,299.8342);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgzDoQgmgUgYgfQgaghgDgnQgIg3AFg5QAGhCAUgyQAYg5AogeQAtghA9AGQAiABAZATQAbAVADAhQAHAzABAqQgBChhSBdQgcAcgdALQgSAIgTAAQgLAAgLgDg");
	this.shape_25.setTransform(103.5538,300.0295);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag0DlQglgUgYgfQgZghgDgnQgHg2AFg4QAGhCAVgxQAYg4AngdQAughA7AHQAjABAYATQAaAVAEAhQAGAyAAAqQgCCfhSBbQgbAbgdALQgTAIgSAAQgLAAgLgDg");
	this.shape_26.setTransform(103.6958,300.2005);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag1DjQglgVgXgfQgZghgDgmQgGg2AFg3QAHhBAVgwQAYg3AogdQAtggA7AHQAiABAXAUQAaAVADAgQAGAyAAApQgDCdhSBaQgcAbgcAKQgSAHgTAAQgLAAgKgCg");
	this.shape_27.setTransform(103.849,300.3946);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgyDhQgkgUgYgeQgZgggDgmQgHg1AEg3QAGhAAUgxQAXg2AngdQAsggA7AGQAhAAAYATQAaAVADAgQAHAxAAApQgBCbhQBaQgaAbgcALQgTAHgTAAQgKAAgKgCg");
	this.shape_28.setTransform(104.512,301.2418);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AguDgQgkgTgYgeQgZgggEglQgIg1AEg2QAFg/ATgxQAWg2AmgdQArghA6AFQAhAAAYATQAaATAEAgQAHAxABAoQACCahOBbQgaAbgcALQgTAIgTAAQgJAAgKgCg");
	this.shape_29.setTransform(105.1597,302.0857);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgpDeQglgSgYgdQgZgfgFglQgIg0ADg3QAEg+ASgwQAVg3AlgdQArghA5AEQAhAAAYASQAaATAEAgQAIAwABAoQAECYhMBbQgZAbgbAMQgTAIgTAAQgJAAgJgCg");
	this.shape_30.setTransform(105.7959,302.9257);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AglDdQglgSgYgcQgZgegGglQgJgzACg3QADg9ARgwQAVg3AkgdQApgiA5AEQAhgBAYARQAaATAFAfQAIAwACAnQAGCXhJBbQgZAbgbAMQgUAJgTAAQgIAAgIgBg");
	this.shape_31.setTransform(106.4466,303.7652);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgiDbQgkgRgZgbQgZgegGgkQgKgzABg2QACg9AQgvQAUg3AjgeQApghA4ACQAggBAZARQAaASAFAfQAJAvADAnQAICVhIBcQgYAbgaAMQgUAKgTAAIgQgCg");
	this.shape_32.setTransform(107.1101,304.6108);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgeDaQgkgQgZgbQgagdgGgjQgLgzABg1QABg8APgwQASg2AjgeQAogiA4ABQAggCAYARQAaARAGAfQAJAuAEAnQAKCUhFBbQgYAcgaAMQgVAKgTAAIgOgBg");
	this.shape_33.setTransform(107.7678,305.4454);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgaDZQgkgQgZgaQgagcgGgjQgMgygBg1QAAg8APgwQARg2AigeQAngiA4AAQAfgCAYAQQAaARAHAeQAKAuAEAmQANCThEBbQgWAcgaANQgWALgUAAIgMgBg");
	this.shape_34.setTransform(108.38,306.2526);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgWDYQgkgPgZgaQgagbgHgjQgNgxgBg1QgBg7AOgvQAQg2AhgfQAmgiA3gBQAfgDAZAQQAaAQAHAeQAKAtAFAmQAPCRhCBcQgVAcgaANQgWALgUAAIgLAAg");
	this.shape_35.setTransform(109.0441,307.0857);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgSDWQglgOgZgZQgagagIgjQgNgwgCg1QgCg6ANgvQAPg2AggfQAmgjA2gBQAfgEAYAPQAaAQAIAdQALAtAFAlQASCQhABdQgVAcgZANQgVAMgVAAIgKgBg");
	this.shape_36.setTransform(109.7007,307.9259);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgODVQgkgNgZgZQgbgZgIgiQgOgwgDg0QgDg6AMgvQAOg2AfgfQAlgjA2gDQAegEAZAPQAaAQAIAcQAMAsAFAlQAUCPg9BcQgVAcgYAOQgWANgVAAIgJgBg");
	this.shape_37.setTransform(110.3404,308.7318);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgKDUQglgNgZgYQgbgZgJghQgPgwgDgzQgEg5ALgvQANg2AfgfQAjgkA2gDQAegFAZAOQAaAPAIAdQAMArAHAlQAWCNg7BdQgUAcgZAOQgVANgWAAIgHAAg");
	this.shape_38.setTransform(111.0071,309.5631);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({x:117.1604,y:304.1939},0).wait(1).to({x:116.8104,y:303.8439},0).wait(1).to({x:116.4604,y:303.4939},0).wait(1).to({x:116.1104,y:303.1439},0).wait(1).to({x:115.8104,y:302.8439},0).wait(1).to({x:115.4604,y:302.4939},0).wait(1).to({x:115.1104,y:302.1439},0).wait(1).to({x:114.7604,y:301.7939},0).wait(1).to({x:114.4104,y:301.4439},0).wait(1).to({x:114.0604,y:301.0939},0).wait(1).to({x:113.7104,y:300.7439},0).wait(1).to({x:113.3604,y:300.3939},0).wait(1).to({x:113.0604,y:300.0939},0).wait(1).to({x:112.7104,y:299.7439},0).wait(1).to({x:112.3604,y:299.3939},0).wait(1).to({x:112.0104,y:299.0439},0).wait(1).to({x:111.6604,y:298.6939},0).to({_off:true},1).wait(38).to({_off:false,y:310.3939},0).wait(1).to({x:112.0104,y:310.0439},0).wait(1).to({x:112.3104,y:309.7439},0).wait(1).to({x:112.6604,y:309.3939},0).wait(1).to({x:112.9604,y:309.0939},0).wait(1).to({x:113.2604,y:308.7939},0).wait(1).to({x:113.6104,y:308.4439},0).wait(1).to({x:113.9104,y:308.1439},0).wait(1).to({x:114.2604,y:307.7939},0).wait(1).to({x:114.6104,y:307.4939},0).wait(1).to({x:114.9104,y:307.1439},0).wait(1).to({x:115.2604,y:306.7939},0).wait(1).to({x:115.5604,y:306.4939},0).wait(1).to({x:115.9104,y:306.1439},0).wait(1).to({x:116.2104,y:305.8439},0).wait(1).to({x:116.5104,y:305.5439},0).wait(1).to({x:116.8604,y:305.1939},0).wait(1).to({x:117.1604,y:304.8939},0).wait(1).to({x:117.5104,y:304.5439},0).wait(1));

	// green_glaz
	this.instance_4 = new lib.green_glaz();
	this.instance_4.setTransform(129.1,306.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:123.25,y:300.4},17).to({rotation:6.4895,x:111.2,y:301.35},19).to({rotation:0,x:123.25,y:312.1},20).to({x:129.1,y:306.25},18).wait(1));

	// glaz
	this.instance_5 = new lib.glaz();
	this.instance_5.setTransform(161.7,309.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:155.85,y:303.8},17).to({x:144.15,y:309.65},19).to({x:155.85,y:315.5},20).to({x:161.7,y:309.65},18).wait(1));

	// hand_up
	this.instance_6 = new lib.hand_up();
	this.instance_6.setTransform(103.15,238.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({rotation:-7.9288,x:81.3,y:255.2},17).to({rotation:-3.212,x:74,y:261.75},19).to({rotation:-4.6957,x:83.3,y:254.9},20).to({rotation:0,x:103.15,y:238.3},18).wait(1));

	// sch_up
	this.instance_7 = new lib.sch_up();
	this.instance_7.setTransform(489.5,321);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({rotation:-7.0575,x:495.1,y:314.35},8).to({rotation:-14.9992,x:497.4,y:314.95},9).to({rotation:-7.1044,x:499.8,y:314.35},10).to({rotation:0,x:502,y:312.85},9).to({rotation:14.9992,x:502.1,y:311.55},10).to({rotation:29.9992,x:504.1,y:322.5},10).to({regX:0.1,rotation:14.9996,x:500.7,y:320.85},9).to({regX:0,rotation:0,x:487.6,y:321},9).wait(1));

	// sch_niz
	this.instance_8 = new lib.sch_niz();
	this.instance_8.setTransform(509.7,380.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({rotation:14.1168,x:499.35,y:373.35},8).to({rotation:29.9992,x:493.7,y:375.9},9).to({regX:0.1,rotation:14.2099,x:497.45,y:378.1},10).to({regX:0,rotation:0,x:502.5,y:372.55},9).to({rotation:-14.9992,x:504.6,y:369.65},10).to({rotation:-29.9992,x:502.9,y:381.85},10).to({regX:-0.1,regY:0.1,rotation:-14.9996,x:505.3,y:380.1},9).to({regX:0,regY:0,rotation:0,x:509.7,y:380.05},9).wait(1));

	// schnur
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gDLMAirAC3UAjEAC9AB9AAj");
	this.shape_39.setTransform(626.4,353.8,1,1,0,0,0,229.5,20.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDNMAirAC5UAjDAC/AB9AAj");
	this.shape_40.setTransform(396.825,332.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDOMAirAC6UAjDADAAB9AAj");
	this.shape_41.setTransform(396.775,332.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDQMAiqAC8UAjDADCAB+AAj");
	this.shape_42.setTransform(396.7,332);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDRMAiqAC9UAjDADCAB+AAk");
	this.shape_43.setTransform(396.675,331.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDSMAiqAC+UAjDADEAB+AAj");
	this.shape_44.setTransform(396.6,331.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDUMAiqADAUAjCADGAB9AAj");
	this.shape_45.setTransform(396.525,330.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDVMAipADBUAjDADHAB9AAj");
	this.shape_46.setTransform(396.475,330.125);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDWMAipADCUAjCADIAB+AAk");
	this.shape_47.setTransform(396.4,329.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDbMAipADHUAjCADMAB+AAk");
	this.shape_48.setTransform(396.35,330);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDfMAioADLUAjCADQAB9AAk");
	this.shape_49.setTransform(396.3,330.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDkMAipADQUAjAADVAB+AAk");
	this.shape_50.setTransform(396.275,330.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(2.2,1,1).p("EgjygDoMAioADTUAjAADaAB9AAk");
	this.shape_51.setTransform(396.225,331.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(2.2,1,1).p("EgjygDtMAioADZUAjAADdAB9AAl");
	this.shape_52.setTransform(396.175,331.325);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").ss(2.2,1,1).p("EgjxgDxMAinADcUAjAADiAB8AAl");
	this.shape_53.setTransform(396.125,331.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(2.2,1,1).p("EgjxgD2MAinADhUAi/ADnAB9AAl");
	this.shape_54.setTransform(396.1,332.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(2.2,1,1).p("EgjxgD6MAinADlUAi/ADrAB9AAl");
	this.shape_55.setTransform(396.05,332.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(2.2,1,1).p("EgjwgECMAimADtUAi+ADyAB9AAm");
	this.shape_56.setTransform(396.125,332.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(2.2,1,1).p("EgjvgEFMAilADwUAi+AD1AB8AAm");
	this.shape_57.setTransform(396.225,332.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(2.2,1,1).p("EgjvgEIMAilADyUAi+AD5AB8AAm");
	this.shape_58.setTransform(396.35,332.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(2.2,1,1).p("EgjvgEMMAilAD2UAi9AD8AB9AAm");
	this.shape_59.setTransform(396.45,332.85);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(2.2,1,1).p("EgjugEPMAikAD5UAi9AD/AB8AAn");
	this.shape_60.setTransform(396.6,332.875);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(2.2,1,1).p("EgjugESMAikAD8UAi8AEDAB9AAm");
	this.shape_61.setTransform(396.725,332.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(2.2,1,1).p("EgjtgEVMAijAD/UAi8AEGAB8AAm");
	this.shape_62.setTransform(396.825,332.925);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(2.2,1,1).p("EgjtgEYMAijAEBUAi8AEJAB8AAn");
	this.shape_63.setTransform(396.95,333);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(2.2,1,1).p("EgjtgEcMAijAEGUAi8AELAB7AAo");
	this.shape_64.setTransform(397.05,333.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").ss(2.2,1,1).p("EgjsgEfMAiiAEIUAi7AEPAB8AAo");
	this.shape_65.setTransform(397.175,333.05);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(2.2,1,1).p("EgjtgEgMAijAEJUAi8AERAB8AAn");
	this.shape_66.setTransform(397.075,332.925);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").ss(2.2,1,1).p("EgjugEiMAikAELUAi9AESAB8AAo");
	this.shape_67.setTransform(396.925,332.8);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(2.2,1,1).p("EgjvgEjMAilAEMUAi+AETAB8AAo");
	this.shape_68.setTransform(396.825,332.675);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(2.2,1,1).p("EgjxgEkMAinAENUAi+AEUAB9AAo");
	this.shape_69.setTransform(396.7,332.55);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").ss(2.2,1,1).p("EgjxgElMAinAEOUAjAAEVAB8AAo");
	this.shape_70.setTransform(396.575,332.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgEnMAipAEQUAjBAEWAB9AAp");
	this.shape_71.setTransform(396.45,332.325);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gEoMAipAERUAjCAEYAB+AAo");
	this.shape_72.setTransform(396.35,332.2);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gEpMAirAESUAjCAEZAB9AAo");
	this.shape_73.setTransform(396.2,332.075);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gEnMAirAEQUAjEAEWAB+AAp");
	this.shape_74.setTransform(396.025,332.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gEkMAirAENUAjEAETAB+AAp");
	this.shape_75.setTransform(395.925,332.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gEgMAisAEJUAjEAEQAB9AAo");
	this.shape_76.setTransform(395.825,332.375);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gEcMAisAEFUAjFAENAB9AAn");
	this.shape_77.setTransform(395.75,332.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gEZMAisAECUAjFAEJAB+AAo");
	this.shape_78.setTransform(395.675,332.675);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gEVMAisAD/UAjFAEFAB+AAo");
	this.shape_79.setTransform(395.575,332.8);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gESMAisAD8UAjFAECAB+AAn");
	this.shape_80.setTransform(395.5,332.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").ss(2.2,1,1).p("Egj4gEOMAiuAD4UAjFAD/AB+AAm");
	this.shape_81.setTransform(395.4,333.075);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").ss(2.2,1,1).p("Egj4gELMAitAD1UAjFAD7AB/AAn");
	this.shape_82.setTransform(395.3,333.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#000000").ss(2.2,1,1).p("Egj4gEHMAitADxUAjGAD4AB+AAm");
	this.shape_83.setTransform(395.225,333.375);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(2.2,1,1).p("Egj4gECMAitADsUAjFAD0AB/AAl");
	this.shape_84.setTransform(395.1,333.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gD+MAisADoUAjFADvAB+AAm");
	this.shape_85.setTransform(395,334.025);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#000000").ss(2.2,1,1).p("Egj3gD5MAitADjUAjEADqAB+AAm");
	this.shape_86.setTransform(394.875,334.375);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gD0MAisADeUAjEADmAB9AAl");
	this.shape_87.setTransform(394.775,334.7);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gDvMAirADaUAjEADgAB+AAl");
	this.shape_88.setTransform(394.7,335.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#000000").ss(2.2,1,1).p("Egj2gDrMAirADWUAjEADcAB+AAk");
	this.shape_89.setTransform(394.575,335.35);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDmMAiqADRUAjDADXAB+AAl");
	this.shape_90.setTransform(394.475,335.675);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDhMAiqADMUAjEADTAB9AAk");
	this.shape_91.setTransform(394.35,336.025);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDcMAiqADHUAjDADOAB9AAk");
	this.shape_92.setTransform(394.25,336.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDZMAiqADFUAjCADLAB9AAj");
	this.shape_93.setTransform(394.35,336.675);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDcMAiqADIUAjCADMAB9AAl");
	this.shape_94.setTransform(394.575,336.7);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDeMAiqADKUAjBADPAB+AAk");
	this.shape_95.setTransform(394.85,336.675);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDgMAipADMUAjBADRAB9AAk");
	this.shape_96.setTransform(395.075,336.675);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDiMAipADNUAjBADUAB9AAk");
	this.shape_97.setTransform(395.3,336.7);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDkMAipADPUAjBADVAB9AAl");
	this.shape_98.setTransform(395.525,336.7);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDmMAipADRUAjAADYAB+AAk");
	this.shape_99.setTransform(395.8,336.675);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(2.2,1,1).p("EgjygDpMAioADUUAjAADZAB9AAl");
	this.shape_100.setTransform(396.025,336.7);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(2.2,1,1).p("EgjygDrMAioADWUAjAADcAB9AAl");
	this.shape_101.setTransform(396.25,336.7);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(2.2,1,1).p("EgjygDnMAioADSUAjAADYAB9AAl");
	this.shape_102.setTransform(396.325,336.35);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#000000").ss(2.2,1,1).p("EgjzgDgMAipADLUAjBADSAB9AAk");
	this.shape_103.setTransform(396.475,335.6);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDcMAiqADIUAjBADOAB9AAj");
	this.shape_104.setTransform(396.55,335.25);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDZMAiqADFUAjCADKAB9AAk");
	this.shape_105.setTransform(396.6,334.875);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#000000").ss(2.2,1,1).p("Egj0gDWMAiqADCUAjCADHAB9AAk");
	this.shape_106.setTransform(396.675,334.525);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDSMAirAC+UAjCADEAB+AAj");
	this.shape_107.setTransform(396.775,334.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(2.2,1,1).p("Egj1gDPMAirAC7UAjDADBAB9AAj");
	this.shape_108.setTransform(396.825,333.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39}]}).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98,p:{x:395.525,y:336.7}}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_98,p:{x:396.375,y:335.975}}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_39}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_39).to({_off:true},1).wait(16).to({_off:false,regX:229.4,regY:20.6,rotation:1.2862,x:624.9,y:358.45},0).to({_off:true},1).wait(18).to({_off:false,regX:229.5,regY:20.5,scaleX:1.0009,rotation:0,skewY:2.3714,x:625.6,y:361.95},0).to({_off:true},1).wait(19).to({_off:false,regX:229.3,scaleX:1,rotation:0.2973,skewY:0,x:623.3,y:358.35},0).to({_off:true},1).wait(17).to({_off:false,regX:229.5,regY:20.4,rotation:0,x:626.4,y:353.8},0).wait(1));

	// mozg
	this.instance_9 = new lib.mozg();
	this.instance_9.setTransform(732.8,381.35,1,1,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({y:379.55},8).to({scaleY:1.0029,skewX:-4.3151,y:386.75},9).to({scaleY:1,skewX:0,y:390.35},19).to({scaleY:1.0029,skewX:-4.3151,y:386.75},17).to({scaleY:1,skewX:0,y:388.55},12).to({y:381.35},9).wait(1));

	// stopp
	this.instance_10 = new lib.stopp();
	this.instance_10.setTransform(517.05,199.6,1,1,0,0,0,-0.4,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({regX:-0.2,scaleY:1.0039,skewX:3.6742,skewY:8.7053,x:539.1,y:182.25},8).to({regX:-0.4,scaleY:1,rotation:-7.2151,skewX:0,skewY:0,x:514.15,y:206.25},9).to({scaleY:1.0039,rotation:0,skewX:-5.0307,x:517.05,y:199.6},19).to({scaleY:1,rotation:-7.2151,skewX:0,x:514.15,y:206.25},17).to({scaleY:1.0039,rotation:0,skewX:-5.0307,x:517.05,y:199.6},12).to({scaleY:1,skewX:0},9).wait(1));

	// left
	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#000000").ss(2.2,1,1).p("ABsBUQgCgrgSggQglg/hOA1QgEgTgMgUQgYgngpgE");
	this.shape_109.setTransform(538.2,488.025);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(2.2,1,1).p("AhyhTQAqADAbAoQANAUAEATQBPg4AoBAQAUAhAEAs");
	this.shape_110.setTransform(538.2,484.925);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#000000").ss(2.2,1,1).p("Ah5hTQAtACAcApQAOAUAFAUQBRg9ArBCQAWAiAFAt");
	this.shape_111.setTransform(538.225,481.825);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(2.2,1,1).p("Ah/hTQAuAAAeAqQAPAVAGAUQBShBAvBEQAXAiAGAv");
	this.shape_112.setTransform(538.225,478.725);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#000000").ss(2.2,1,1).p("AiGhUQAwAAAgArQAQAVAGAVQBVhFAxBFQAZAjAIAx");
	this.shape_113.setTransform(538.25,475.625);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(2.2,1,1).p("AiNhUQAygBAjArQARAWAGAVQBWhJA1BIQAbAiAJAz");
	this.shape_114.setTransform(538.225,472.5225);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#000000").ss(2.2,1,1).p("AiThUQAzgCAlAtQASAVAHAWQBYhNA4BJQAcAkAKAz");
	this.shape_115.setTransform(538.225,469.3934);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(2.2,1,1).p("AiahUQA2gEAmAuQATAWAIAXQBZhSA8BKQAdAlAMA1");
	this.shape_116.setTransform(538.25,466.3125);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#000000").ss(2.2,1,1).p("AChBWQgMg3ggglQg+hMhbBWQgJgYgUgWQgogvg3AF");
	this.shape_117.setTransform(538.25,463.1801);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(2.2,1,1).p("AiRhLQAxgFAlApQASAUAIAVQA9g5AuAXQARAIAPASQAdAhALAy");
	this.shape_118.setTransform(538.65,460.8978);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#000000").ss(2.2,1,1).p("AiDhCQAsgFAhAjQARARAHATQA2gyAqAUQAPAHAOAQQAZAeAMAs");
	this.shape_119.setTransform(539.075,458.6188);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(2.2,1,1).p("Ah0g4QAngGAdAeQAOAOAIAQQAvgsAlATQAOAGAMAOQAXAaAKAn");
	this.shape_120.setTransform(539.475,456.3318);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#000000").ss(2.2,1,1).p("AhlgvQAhgGAZAYQANAMAHANQAoglAhAQQAMAGAKAMQAUAWAKAi");
	this.shape_121.setTransform(539.9,454.04);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(2.2,1,1).p("AhWglQAcgGAVASQALAIAGALQAigeAdAOQAKAFAJAKQARATAIAc");
	this.shape_122.setTransform(540.275,451.7405);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#000000").ss(2.2,1,1).p("AhIgbQAXgHARANQAKAFAFAIQAcgYAYAMQAIAFAHAIQAOAPAJAX");
	this.shape_123.setTransform(540.7,449.4275);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(2.2,1,1).p("Ag5gRQARgIAOAIQAHACAGAFQAVgRATALQAHADAFAGQAMAMAHAR");
	this.shape_124.setTransform(541.1,447.0875);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#000000").ss(2.2,1,1).p("AgqgFQAMgIAKACQAFAAAFABQAOgJAPAIQAFACAEAFQAJAHAGAN");
	this.shape_125.setTransform(541.525,444.5171);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(2.2,1,1).p("AAcALQgHgLgKgGQgTgMgTAY");
	this.shape_126.setTransform(541.925,441.9194);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#000000").ss(2.2,1,1).p("AB+A2QgNgpgagZQg0g0g+BGQgIgQgRgQQghgggoAH");
	this.shape_127.setTransform(538.225,503.0944);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(2.2,1,1).p("Ah6g6QApgEAfAhQAQARAHAQQBBhCAxA3QAYAaAMAp");
	this.shape_128.setTransform(538.225,500.098);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2hAQAogCAeAiQAPASAGARQBEg/AuA5QAXAbAJAq");
	this.shape_129.setTransform(538.225,497.0945);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(2.2,1,1).p("AhzhGQApgBAcAkQANASAGASQBIg7ArA6QAVAeAGAp");
	this.shape_130.setTransform(538.2,494.0747);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#000000").ss(2.2,1,1).p("AhvhNQApACAZAmQANATAFASQBLg4AoA8QAUAgAEAq");
	this.shape_131.setTransform(538.2,491.05);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(2.2,1,1).p("AhxhTQAqADAaAoQANAUAEATQBPg3AnBAQAUAgAEAs");
	this.shape_132.setTransform(538.2,485.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2hTQAsADAbAoQANAUAFAUQBRg7ApBBQAVAhAFAt");
	this.shape_133.setTransform(538.2,483.05);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8hTQAuABAdApQAOAVAFAUQBSg+AsBCQAXAiAFAu");
	this.shape_134.setTransform(538.2,480.575);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#000000").ss(2.2,1,1).p("AiBhUQAvABAeAqQAQAVAFAUQBThCAvBFQAYAiAHAv");
	this.shape_135.setTransform(538.225,478.1);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(2.2,1,1).p("AiLhUQAxgBAiAsQARAVAHAVQBVhIA0BHQAbAjAIAy");
	this.shape_136.setTransform(538.225,473.1239);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#000000").ss(2.2,1,1).p("AiQhUQAygCAjAtQASAVAHAWQBYhMA2BJQAbAjAKAz");
	this.shape_137.setTransform(538.25,470.6457);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(2.2,1,1).p("AiWhUQA0gDAmAtQASAWAIAWQBYhPA5BKQAdAkALA0");
	this.shape_138.setTransform(538.25,468.1656);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#000000").ss(2.2,1,1).p("AibhUQA1gEAnAuQATAWAJAXQBZhTA8BLQAeAlAMA1");
	this.shape_139.setTransform(538.25,465.6625);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(2.2,1,1).p("AiVhNQAzgFAlAqQATAVAJAVQA9g6AwAXQASAIAPASQAdAjANAz");
	this.shape_140.setTransform(538.55,461.4737);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#000000").ss(2.2,1,1).p("AiKhGQAvgGAiAnQASASAIATQA5g1AsAWQAQAHAOARQAbAgAMAv");
	this.shape_141.setTransform(538.875,459.7656);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(2.2,1,1).p("Ah/g/QArgGAgAiQAQAQAHASQA0gwApATQAPAHANAQQAZAdALAr");
	this.shape_142.setTransform(539.175,458.0617);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#000000").ss(2.2,1,1).p("AhpgxQAjgGAaAZQANAMAHAOQAqgnAjARQAMAGAKANQAVAXAKAj");
	this.shape_143.setTransform(539.775,454.6179);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(2.2,1,1).p("AhdgqQAegGAXAVQAMAKAHALQAlghAfAPQALAFAJAMQATAUAJAf");
	this.shape_144.setTransform(540.1,452.9083);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#000000").ss(2.2,1,1).p("AhTgjQAbgGAUARQALAHAGAKQAhgcAbANQAJAFAJAKQAQARAJAb");
	this.shape_145.setTransform(540.4,451.1601);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8gUQASgHAPAJQAIADAFAFQAWgSAVALQAHADAGAHQAMAMAHAT");
	this.shape_146.setTransform(541.025,447.6795);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000000").ss(2.2,1,1).p("AgxgMQAOgHAMAEQAGACAFADQASgNARAJQAGADAFAFQAKAKAGAP");
	this.shape_147.setTransform(541.3,445.8159);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(2.2,1,1).p("AgmgCQAKgIAJAAQAFgBAFACQANgJANAIQAEADAEAEQAIAGAGAL");
	this.shape_148.setTransform(541.625,443.8561);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#000000").ss(2.2,1,1).p("Ah5g8QApgEAfAiQAPARAHARQBChCAwA3QAYAbALAp");
	this.shape_149.setTransform(538.225,499.3537);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(2.2,1,1).p("Ah0hDQAogBAdAjQAOASAGARQBGg9AsA6QAWAcAIAq");
	this.shape_150.setTransform(538.225,495.5986);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(2.2,1,1).p("AhwhLQApACAaAlQANASAFASQBKg4ApA8QAUAeAFAq");
	this.shape_151.setTransform(538.2,491.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_109}]}).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[]},1).to({state:[{t:this.shape_127}]},14).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_126}]},1).to({state:[]},1).to({state:[{t:this.shape_127}]},10).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_109}]},1).wait(1));

	// p_01
	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(2.2,1,1).p("AgZgdIAzA7");
	this.shape_152.setTransform(556.3,536.25);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(2.2,1,1).p("AgXgbIAvA3");
	this.shape_153.setTransform(555.475,535.05);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(2.2,1,1).p("AgUgYIApAx");
	this.shape_154.setTransform(554.65,533.875);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(2.2,1,1).p("AgSgVIAlAr");
	this.shape_155.setTransform(553.825,532.65);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(2.2,1,1).p("AgPgSIAfAl");
	this.shape_156.setTransform(553,531.45);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#000000").ss(2.2,1,1).p("AgNgPIAbAf");
	this.shape_157.setTransform(552.175,530.25);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(2.2,1,1).p("AgKgMIAVAZ");
	this.shape_158.setTransform(551.325,529.075);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(2.2,1,1).p("AgIgJIARAU");
	this.shape_159.setTransform(550.525,527.85);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#000000").ss(2.2,1,1).p("AgFgHIALAP");
	this.shape_160.setTransform(549.675,526.65);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#000000").ss(2.2,1,1).p("AgIgKIARAU");
	this.shape_161.setTransform(568.75,547.65);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(2.2,1,1).p("AgJgMIATAZ");
	this.shape_162.setTransform(567.5,546.5);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(2.2,1,1).p("AgMgNIAZAc");
	this.shape_163.setTransform(566.25,545.35);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#000000").ss(2.2,1,1).p("AgRgUIAjAo");
	this.shape_164.setTransform(562.55,541.95);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#000000").ss(2.2,1,1).p("AgSgWIAlAt");
	this.shape_165.setTransform(561.275,540.8);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(2.2,1,1).p("AgUgYIApAw");
	this.shape_166.setTransform(560.05,539.65);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(2.2,1,1).p("AgWgZIAtA0");
	this.shape_167.setTransform(558.8,538.55);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").ss(2.2,1,1).p("AgXgcIAwA5");
	this.shape_168.setTransform(557.55,537.4);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(2.2,1,1).p("AgVgZIArAz");
	this.shape_169.setTransform(554.975,534.325);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").ss(2.2,1,1).p("AgTgXIAnAv");
	this.shape_170.setTransform(554.3,533.375);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").ss(2.2,1,1).p("AgRgUIAjAp");
	this.shape_171.setTransform(553.65,532.425);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").ss(2.2,1,1).p("AgNgQIAbAh");
	this.shape_172.setTransform(552.325,530.475);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#000000").ss(2.2,1,1).p("AgLgNIAXAb");
	this.shape_173.setTransform(551.675,529.525);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#000000").ss(2.2,1,1).p("AgJgLIATAX");
	this.shape_174.setTransform(551,528.575);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#000000").ss(2.2,1,1).p("AgHgJIAPAT");
	this.shape_175.setTransform(550.325,527.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_152}]}).to({state:[{t:this.shape_153,p:{x:555.475,y:535.05}}]},1).to({state:[{t:this.shape_154,p:{x:554.65,y:533.875}}]},1).to({state:[{t:this.shape_155,p:{x:553.825,y:532.65}}]},1).to({state:[{t:this.shape_156,p:{x:553,y:531.45}}]},1).to({state:[{t:this.shape_157,p:{x:552.175,y:530.25}}]},1).to({state:[{t:this.shape_158,p:{x:551.325,y:529.075}}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[]},1).to({state:[{t:this.shape_161}]},18).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_157,p:{x:565,y:544.25}}]},1).to({state:[{t:this.shape_156,p:{x:563.775,y:543.1}}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153,p:{x:555.65,y:535.275}}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_156,p:{x:553,y:531.45}}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_160}]},1).to({state:[]},1).to({state:[{t:this.shape_161}]},19).to({state:[{t:this.shape_158,p:{x:566.975,y:546.025}}]},1).to({state:[{t:this.shape_157,p:{x:565.2,y:544.375}}]},1).to({state:[{t:this.shape_156,p:{x:563.425,y:542.75}}]},1).to({state:[{t:this.shape_155,p:{x:561.625,y:541.15}}]},1).to({state:[{t:this.shape_154,p:{x:559.85,y:539.525}}]},1).to({state:[{t:this.shape_153,p:{x:558.075,y:537.875}}]},1).to({state:[{t:this.shape_152}]},1).wait(1));

	// p_02
	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#000000").ss(2.2,1,1).p("AhMhGIAzA4QA7A7ArAa");
	this.shape_176.setTransform(551.95,540);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#000000").ss(2.2,1,1).p("AhGhBIAvA0QA3A3AnAY");
	this.shape_177.setTransform(550.9,539.075);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#000000").ss(2.2,1,1).p("AhBg8IAsAwQAyAzAlAW");
	this.shape_178.setTransform(549.85,538.125);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7g3IAoAsQAvAuAgAU");
	this.shape_179.setTransform(548.75,537.2);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2gyIAlAoQApAqAfAT");
	this.shape_180.setTransform(547.7,536.275);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#000000").ss(2.2,1,1).p("AgxgsIAhAjQAmAmAbAR");
	this.shape_181.setTransform(546.65,535.35);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#000000").ss(2.2,1,1).p("AgrgoIAdAgQAhAiAZAO");
	this.shape_182.setTransform(545.6,534.4);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").ss(2.2,1,1).p("AgmgiIAaAbQAeAdAVAN");
	this.shape_183.setTransform(544.5,533.475);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#000000").ss(2.2,1,1).p("AgggdIAWAXQAZAZASAL");
	this.shape_184.setTransform(543.45,532.525);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgYIATATQAVAVAPAJ");
	this.shape_185.setTransform(542.4,531.6);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#000000").ss(2.2,1,1).p("AgVgTIAPAPQAQARAMAH");
	this.shape_186.setTransform(541.35,530.675);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(2.2,1,1).p("AgPgOIALALQAMANAIAF");
	this.shape_187.setTransform(540.25,529.75);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#000000").ss(2.2,1,1).p("AgKgJIAHAHQAIAJAGAD");
	this.shape_188.setTransform(539.2,528.8);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(2.2,1,1).p("AgFgEIAEAEQADADADAC");
	this.shape_189.setTransform(538.15,527.875);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#000000").ss(2.2,1,1).p("AgVgTIAOAQQARAQAMAH");
	this.shape_190.setTransform(568.15,554.875);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(2.2,1,1).p("AgZgXIARATQATATAPAJ");
	this.shape_191.setTransform(567,553.825);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#000000").ss(2.2,1,1).p("AgdgbIAUAWQAXAXAQAK");
	this.shape_192.setTransform(565.825,552.75);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(2.2,1,1).p("AghgeIAXAYQAZAZATAM");
	this.shape_193.setTransform(564.675,551.7);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#000000").ss(2.2,1,1).p("AglgiIAZAcQAdAcAVAN");
	this.shape_194.setTransform(563.525,550.625);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#000000").ss(2.2,1,1).p("AgpglIAcAeQAgAgAXAO");
	this.shape_195.setTransform(562.375,549.55);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#000000").ss(2.2,1,1).p("AgtgpIAfAhQAiAiAZAQ");
	this.shape_196.setTransform(561.2,548.5);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#000000").ss(2.2,1,1).p("AgwgtIAhAkQAmAmAbAQ");
	this.shape_197.setTransform(560.05,547.45);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1gwIAkAmQApApAeAS");
	this.shape_198.setTransform(558.9,546.375);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4g0IAmApQAsAsAfAU");
	this.shape_199.setTransform(557.725,545.325);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8g3IApArQAvAwAhAU");
	this.shape_200.setTransform(556.575,544.25);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(2.2,1,1).p("AhAg7IArAvQAyAyAkAW");
	this.shape_201.setTransform(555.425,543.175);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#000000").ss(2.2,1,1).p("AhEg/IAuAyQA1A1AmAY");
	this.shape_202.setTransform(554.275,542.125);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#000000").ss(2.2,1,1).p("AhIhDIAxA2QA4A4AoAZ");
	this.shape_203.setTransform(553.1,541.05);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f().s("#000000").ss(2.2,1,1).p("AhIhCIAwA0QA5A5AoAY");
	this.shape_204.setTransform(551.2,539.325);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#000000").ss(2.2,1,1).p("AhEg/IAuAyQA1A2AmAX");
	this.shape_205.setTransform(550.4,538.65);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f().s("#000000").ss(2.2,1,1).p("AhAg7IAsAvQAxAyAkAW");
	this.shape_206.setTransform(549.65,537.975);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8g3IApArQAuAwAiAU");
	this.shape_207.setTransform(548.875,537.325);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4g0IAmAqQAsArAfAU");
	this.shape_208.setTransform(548.125,536.625);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0gwIAkAmQAoApAdAS");
	this.shape_209.setTransform(547.35,535.95);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f().s("#000000").ss(2.2,1,1).p("AgwgsIAhAjQAlAmAbAQ");
	this.shape_210.setTransform(546.575,535.275);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#000000").ss(2.2,1,1).p("AgsgoIAeAgQAiAiAZAP");
	this.shape_211.setTransform(545.825,534.6);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f().s("#000000").ss(2.2,1,1).p("AgoglIAbAdQAfAgAXAO");
	this.shape_212.setTransform(545.075,533.95);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#000000").ss(2.2,1,1).p("AgkghIAZAaQAcAdAUAM");
	this.shape_213.setTransform(544.275,533.275);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f().s("#000000").ss(2.2,1,1).p("AgggdIAWAXQAZAaASAL");
	this.shape_214.setTransform(543.525,532.6);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#000000").ss(2.2,1,1).p("AgdgaIAUAVQAWAWARAK");
	this.shape_215.setTransform(542.75,531.925);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f().s("#000000").ss(2.2,1,1).p("AgYgWIARASQASATAOAI");
	this.shape_216.setTransform(541.975,531.25);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().s("#000000").ss(2.2,1,1).p("AgUgSIAOAPQAQAQALAH");
	this.shape_217.setTransform(541.225,530.55);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f().s("#000000").ss(2.2,1,1).p("AgRgPIAMAMQANANAKAG");
	this.shape_218.setTransform(540.45,529.9);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().s("#000000").ss(2.2,1,1).p("AgNgLIAJAJQAKAKAHAE");
	this.shape_219.setTransform(539.7,529.225);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f().s("#000000").ss(2.2,1,1).p("AgJgHIAHAGQAGAHAFAD");
	this.shape_220.setTransform(538.9,528.55);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().s("#000000").ss(2.2,1,1).p("AgagYIARAUQAVAUAPAJ");
	this.shape_221.setTransform(566.7,553.525);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f().s("#000000").ss(2.2,1,1).p("AgfgdIAVAYQAYAYASAK");
	this.shape_222.setTransform(565.2,552.15);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().s("#000000").ss(2.2,1,1).p("AgkghIAYAbQAcAbAVAN");
	this.shape_223.setTransform(563.75,550.825);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f().s("#000000").ss(2.2,1,1).p("AgpgmIAcAfQAgAfAXAP");
	this.shape_224.setTransform(562.25,549.475);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().s("#000000").ss(2.2,1,1).p("AgugqIAfAiQAkAjAaAQ");
	this.shape_225.setTransform(560.8,548.125);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f().s("#000000").ss(2.2,1,1).p("AgzgvIAjAmQAoAnAcAS");
	this.shape_226.setTransform(559.3,546.75);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4g0IAmAqQAsAsAfAT");
	this.shape_227.setTransform(557.85,545.4);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9g4IAqAsQAvAxAiAU");
	this.shape_228.setTransform(556.35,544.05);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().s("#000000").ss(2.2,1,1).p("AhCg9IAsAwQA0A0AlAX");
	this.shape_229.setTransform(554.9,542.725);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f().s("#000000").ss(2.2,1,1).p("AhHhBIAwAzQA3A4AoAY");
	this.shape_230.setTransform(553.4,541.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_176}]}).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[]},1).to({state:[{t:this.shape_190}]},8).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_189}]},1).to({state:[]},1).to({state:[{t:this.shape_190}]},8).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_227}]},1).to({state:[{t:this.shape_228}]},1).to({state:[{t:this.shape_229}]},1).to({state:[{t:this.shape_230}]},1).to({state:[{t:this.shape_176}]},1).wait(1));

	// p_03
	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().s("#000000").ss(2.2,1,1).p("Ah4CtQgrgYghguQhDhcAuhnQAVgwAvgVQAsgTA0AMQA0AMAlAnQApAsALBBIAkgnQArghAhAaQAhAaADAvQACAYgFAS");
	this.shape_231.setTransform(529.956,514.6582);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f().s("#000000").ss(2.2,1,1).p("Ah+CiQgOgJgNgMQgWgUgTgcQgYgjgGglQgKg1Acg4QAjgyAfgNQAogPAtAJQADABADAAQAxAMAjAmQAYAaAOAiQAIATAEAVIAUgXQAHgHAHgHQAoggAgAYQAIAGAGAHQATAWADAhQACAWgFAS");
	this.shape_232.setTransform(529.4724,512.6945);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().s("#000000").ss(2.2,1,1).p("AiDCWQgNgJgMgMQgUgTgQgaQgUgigEgiQgHgxAcg0QAigsAegMQAlgOArAKQADABADAAQAtANAiAjQAXAZAMAhQAIAPAEASIAUgWQAGgHAGgGQAmgfAfAWQAHAFAHAHQASAVADAeQACAVgDAR");
	this.shape_233.setTransform(528.9529,510.7167);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f().s("#000000").ss(2.2,1,1).p("AiICKQgMgJgKgLQgRgTgOgZQgRgfgCghQgDgtAbguQAigoAcgKQAkgLAoAJQACABADABQAqAMAgAiQAVAYANAeQAHANAFAPIARgVQAGgGAGgHQAkgdAdAUQAHAFAGAGQASATAEAcQADAUgDAP");
	this.shape_234.setTransform(528.4427,508.7101);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f().s("#000000").ss(2.2,1,1).p("AiOB+QgKgIgJgLQgOgTgLgXQgOgeAAgeQAAgpAbgpQAhgjAbgIQAigKAlAKQACABADAAQAnANAeAgQAUAWAMAdQAHAKAEAMIARgUQAFgGAGgGQAhgcAbASQAHAEAGAGQASARAFAaQADASgCAP");
	this.shape_235.setTransform(527.9141,506.725);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f().s("#000000").ss(2.2,1,1).p("AiSBzQgJgJgHgKQgMgTgJgVQgLgcADgcQADgmAbgjQAhgfAZgGQAfgIAjAKQACABADABQAkAMAcAfQASAVALAbQAHAHAFAIIAPgSQAFgGAFgGQAfgaAaAQQAHADAFAGQARAPAGAYQADARgBAN");
	this.shape_236.setTransform(527.3304,504.7393);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f().s("#000000").ss(2.2,1,1).p("AiXBnQgHgJgGgKQgKgRgGgVQgHgaAFgYQAFgjAcgeQAggaAXgFQAegGAgALQADAAACABQAhANAaAdQARATAKAZQAHAFAEAEIAOgRQAFgFAFgGQAcgYAZANQAGAEAGAEQAQAOAGAWQAEAPAAAN");
	this.shape_237.setTransform(526.737,502.7409);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f().s("#000000").ss(2.2,1,1).p("AibBcQgGgJgEgKQgHgRgEgTQgEgZAHgVQAJgfAcgZQAfgVAWgEQAbgDAeAKQACABACABQAfANAXAaQAQATAJAXQAHABAEACIANgQQAEgFAFgFQAZgXAYALQAGADAFAEQAQANAHATQAEANABAN");
	this.shape_238.setTransform(526.0773,500.7313);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f().s("#000000").ss(2.2,1,1).p("AieBQQgEgJgDgJQgFgRgBgRQgBgXAKgTQALgcAcgTQAfgRAUgBQAagCAbALQACAAACABQAbANAWAZQAOARAJAVQAGgBAEgBIAMgPQAEgFAEgFQAXgVAWAJQAFACAGAEQAQALAHARQAFAMABAL");
	this.shape_239.setTransform(525.3452,498.7096);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f().s("#000000").ss(2.2,1,1).p("AigBFQgDgIgCgJQgCgRACgQQACgUAMgRQAOgYAcgPQAegLATAAQAYAAAYALQACABABABQAZANATAXQANAQAJASQAFgEAFgDIAKgOQAEgFADgEQAVgUAUAHQAGACAFADQAPAJAJAPQAFAKACAL");
	this.shape_240.setTransform(524.5179,496.625);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f().s("#000000").ss(2.2,1,1).p("AihA6QgBgIAAgJQAAgQAEgOQAGgTANgPQASgUAcgJQAegHAQACQAWACAWALQABABACABQAWANARAVQALAOAIASQAGgHAFgHIAIgNQADgEAEgEQASgTATAFQAFABAFADQAPAIAJANQAFAIAEAK");
	this.shape_241.setTransform(523.55,494.5609);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f().s("#000000").ss(2.2,1,1).p("AihAxQAAgJACgIQAGgkAcgWQAagUAkgCQAlgBAgATQAjAWAUApIARggQAWgeAbAMQAXAKAMAY");
	this.shape_242.setTransform(522.475,492.3696);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f().s("#000000").ss(2.2,1,1).p("AgrACQABgCACgCQADgJAJgEQAIgDAKACQAKACAGAIQAIAHACAMIAHgHQAHgGAHAEQAGAFABAJ");
	this.shape_243.setTransform(557.6,547.3479);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0ARQgBgDAAgEQAAgEAAgEQABgHAFgFQAFgHAJgEQAKgCAHABQAHABAGAEQACABABACQAIAGAFAIQACAEABAEQAEAAADgBIACgBQADgDADgCQAIgDAHAEIABAAQAFAFACAIQABAEAAAE");
	this.shape_244.setTransform(555.85,544.62);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8AhQgCgEgCgFQgCgGgBgFQgBgKADgIQAFgMAKgHQAMgHAJgBQAJAAAIAEQAEABADADQAKAGAIAMQADAFACAFQAFACAEADIABgDQAFgDAEgDQALgHAJAHQAAAAABAAQAHAHACALQABAGAAAF");
	this.shape_245.setTransform(553.8608,541.9);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f().s("#000000").ss(2.2,1,1).p("AhCAtQgEgFgEgGQgDgHgCgHQgEgNACgLQADgPAMgMQAOgLALgCQALgBALAEQAFABAEACQAOAHAKAOQAFAGADAHQAGAEADAGIADgCQAFgEAFgFQAOgJALAJQABAAABABQAJAIACANQABAHgBAH");
	this.shape_246.setTransform(551.7519,539.4545);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f().s("#000000").ss(2.2,1,1).p("AhHA6QgGgGgFgGQgFgIgEgJQgHgQACgOQACgTANgRQAQgPANgDQAOgDAOAEQAFABAEACQASAIAOARQAFAHAEAIQAIAIADAIIADgDQAGgFAHgGQAQgLANAKQACABAAABQAMAJABARQACAIgCAI");
	this.shape_247.setTransform(549.5993,536.9979);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f().s("#000000").ss(2.2,1,1).p("AhNBGQgHgGgHgIQgGgJgGgKQgJgTAAgSQABgWAPgVQASgUAPgEQAQgEAQADQAGACAGACQAVAIAQATQAIAJAEAKQAJAKAEALIADgDQAHgGAHgHQAUgOAPAMQACABABABQANAMACASQABALgCAI");
	this.shape_248.setTransform(547.4438,534.5183);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f().s("#000000").ss(2.2,1,1).p("AhTBTQgJgGgIgKQgIgKgHgMQgMgVAAgWQgBgZAQgaQAUgYASgGQASgFATADQAHACAGACQAZAIATAWQAJAKAFAMQAKAMAEAPIADgCQAJgJAIgIQAWgRASAOQACABABACQAPANACAWQABAMgCAJ");
	this.shape_249.setTransform(545.2692,532.0438);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f().s("#000000").ss(2.2,1,1).p("AhYBgQgLgIgJgKQgKgLgIgOQgPgYgBgZQgCgdARgfQAXgcAUgHQAUgGAVADQAHABAIADQAdAJAWAYQAJALAHANQAKAPAFASIAEgDQAJgJAJgKQAZgSAUAPQACABACACQAQAPACAZQACANgDAL");
	this.shape_250.setTransform(543.097,529.5888);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f().s("#000000").ss(2.2,1,1).p("AheBtQgMgJgLgLQgMgNgJgPQgRgbgDgcQgDghATgjQAYghAXgIQAWgHAXADQAJABAJACQAgAKAZAbQAKAMAIAOQALASAFAWIAEgEQALgLAKgKQAcgVAWARQACABACACQASARACAcQACAOgDAN");
	this.shape_251.setTransform(540.9072,527.1071);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f().s("#000000").ss(2.2,1,1).p("AhjB6QgOgJgNgNQgNgOgLgRQgTgdgEggQgEglAUgnQAaglAZgJQAYgJAaADQAKABAKACQAkAKAbAeQAMANAJAQQAMAVAFAZIAFgEQALgNALgLQAfgYAZATQACACACACQAUATACAeQABAQgCAO");
	this.shape_252.setTransform(538.723,524.6125);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f().s("#000000").ss(2.2,1,1).p("AhoCHQgQgKgOgOQgPgOgMgTQgXghgEgiQgFgpAVgsQAcgpAbgLQAbgKAdADQAKABAKADQApAKAdAgQAOAPAJARQAOAXAFAdIAFgFQAMgNAMgNQAigaAbAUQADACACADQAWAUACAhQABASgDAP");
	this.shape_253.setTransform(536.5278,522.125);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f().s("#000000").ss(2.2,1,1).p("AhtCUQgSgLgPgPQgRgPgOgVQgZgjgFgmQgHgsAXgxQAfgtAdgMQAcgMAgADQALABALADQAtALAgAiQAOAQALATQAOAaAGAfIAFgFQANgOANgOQAlgdAdAXQADACADACQAXAWACAlQACATgEAQ");
	this.shape_254.setTransform(534.3259,519.644);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f().s("#000000").ss(2.2,1,1).p("AhzCgQgTgLgRgQQgSgRgQgWQgbgmgHgpQgHgwAYg1QAggyAggNQAegNAiADQAMABANADQAwALAiAlQARARALAUQAPAdAGAjIAGgGQAOgPAOgQQAogfAfAYQADADADADQAZAXADAnQABAVgEAR");
	this.shape_255.setTransform(532.1562,517.1542);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8CkQgPgJgOgMQgWgUgTgcQgZgjgHgmQgKg2Abg5QAjgzAggNQAogQAuAJQADABADAAQAyAMAjAnQAZAaANAjQAJASAEAWIAVgXQAGgHAHgHQApghAgAZQAIAGAHAHQASAXADAhQACAXgFAS");
	this.shape_256.setTransform(529.5607,513.1014);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f().s("#000000").ss(2.2,1,1).p("AiBCbQgNgJgNgMQgUgUgRgaQgWgjgFgjQgIgzAbg2QAjguAegMQAngPArAKQADAAADABQAvAMAiAlQAYAZANAhQAIARAEAUIAUgXQAGgHAHgHQAmgfAgAXQAIAFAGAIQASAVADAfQACAWgDAR");
	this.shape_257.setTransform(529.1712,511.562);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f().s("#000000").ss(2.2,1,1).p("AiFCSQgNgJgLgLQgSgUgPgZQgUghgDgiQgGgwAcgxQAigrAdgLQAlgNAqAKQADAAACABQAsAMAhAkQAXAYAMAgQAIAOAEARIATgVQAGgHAHgHQAkgeAeAVQAIAGAGAGQASAUAEAeQACAUgDAR");
	this.shape_258.setTransform(528.761,509.9994);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f().s("#000000").ss(2.2,1,1).p("AiJCIQgMgIgKgLQgQgTgOgZQgQgfgCggQgDgtAcgtQAhgnAcgKQAjgMAoAKQADABACABQAqAMAgAiQAVAXAMAfQAIAMAEAOIASgUQAFgHAGgGQAjgdAdATQAHAFAHAGQARATAFAcQACATgCAQ");
	this.shape_259.setTransform(528.3681,508.4227);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f().s("#000000").ss(2.2,1,1).p("AiOB/QgKgJgJgKQgOgTgMgXQgOgeABgeQgBgqAbgpQAigkAagIQAigKAmAKQACABACAAQAoANAeAgQAUAWAMAdQAHAKAEANIARgUQAFgHAGgGQAhgbAcARQAHAFAGAGQARARAFAaQADASgCAP");
	this.shape_260.setTransform(527.9632,506.875);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f().s("#000000").ss(2.2,1,1).p("AiRB2QgJgJgIgKQgMgTgKgWQgLgdACgcQABgmAcgmQAhgfAZgHQAggJAkAKQACABADABQAlANAcAeQATAWALAbQAHAIAFAKIAPgTQAFgGAGgGQAfgbAbAQQAGAEAGAGQARAQAGAZQADAQgBAO");
	this.shape_261.setTransform(527.4977,505.3047);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f().s("#000000").ss(2.2,1,1).p("AiUBtQgIgJgHgKQgLgSgHgVQgJgcAEgZQAEglAbghQAhgcAYgFQAegHAiAKQACABACABQAjAMAbAeQASAUAKAaQAHAGAFAGIAOgRQAFgGAFgGQAdgZAaAPQAGADAGAFQARAPAGAXQADAPAAAO");
	this.shape_262.setTransform(527.0416,503.76);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f().s("#000000").ss(2.2,1,1).p("AiYBkQgHgJgFgKQgJgSgFgUQgHgZAGgXQAGgjAcgcQAggZAWgEQAegFAfAKQACABACABQAhAMAZAdQARATAKAYQAGAEAFAEIANgRQAFgGAFgFQAbgYAYANQAHADAFAFQARANAGAVQAEAPAAAN");
	this.shape_263.setTransform(526.549,502.1694);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f().s("#000000").ss(2.2,1,1).p("AibBbQgGgJgEgKQgHgRgDgTQgEgYAHgVQAJgfAcgZQAfgVAVgDQAcgDAdAKQADABACABQAeANAXAaQAQATAJAWQAHABAEACIANgQQAEgFAFgFQAZgXAXAMQAGACAGAEQAQANAHATQAEANABAM");
	this.shape_264.setTransform(526.0273,500.5813);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f().s("#000000").ss(2.2,1,1).p("AieBSQgEgJgDgJQgGgRgBgSQgBgXAJgTQALgcAcgVQAfgRAUgCQAagBAbAKQACABACABQAcANAWAZQAOARAJAVQAGgBAFAAIALgPQAFgFAEgFQAXgVAWAJQAGACAFAEQAQALAIASQAEAMACAL");
	this.shape_265.setTransform(525.4643,498.9906);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f().s("#000000").ss(2.2,1,1).p("AigBJQgDgIgCgKQgDgQAAgRQACgVALgSQANgZAcgQQAfgNASgBQAZgBAZALQACABACABQAaANAUAYQANAQAJATQAFgDAFgCIAKgPQAEgEAEgFQAWgUAVAIQAFABAFAEQAQAJAIARQAFAKACAL");
	this.shape_266.setTransform(524.8219,497.3739);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f().s("#000000").ss(2.2,1,1).p("AihBBQgCgJgBgJQgBgQACgPQAEgTANgRQAQgWAcgMQAegKARABQAXABAYALQABABACABQAYANASAWQAMAOAIATQAGgFAEgFIAKgOQADgEAEgEQAUgUATAHQAFABAGADQAPAIAJAPQAFAJACAK");
	this.shape_267.setTransform(524.1219,495.7488);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f().s("#000000").ss(2.2,1,1).p("AihA4QgBgIAAgJQABgQAEgOQAHgSAOgPQATgTAcgIQAdgGAQACQAWADAVALQABABABABQAWANARAVQALANAIARQAFgHAFgHIAIgNQADgEADgEQASgSATAEQAFABAFADQAPAHAJANQAFAIAEAJ");
	this.shape_268.setTransform(523.3167,494.1089);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4AZQgBgEgBgEQgBgFAAgFQAAgHAEgHQAFgJAJgFQALgFAIABQAIAAAHAEQADABACACQAIAGAHALQACADACAFQAFABACABIACgCQAEgDAEgDQAJgEAIAEIAAABQAHAGACAJQABAFgBAF");
	this.shape_269.setTransform(554.9833,543.3475);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f().s("#000000").ss(2.2,1,1).p("AhBAsQgEgFgDgGQgDgGgDgIQgDgMACgLQAEgOALgMQAOgLALgBQALgBALADQAEACADACQAOAGAKAPQAFAGADAGQAGAEADAGIACgCQAGgFAFgEQANgJALAIQABABABABQAJAHABAOQACAGgBAH");
	this.shape_270.setTransform(551.9929,539.7389);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f().s("#000000").ss(2.2,1,1).p("AhJA+QgHgGgFgHQgGgIgEgKQgIgRACgPQABgUAOgSQARgRAOgDQAOgDAOADQAGABAFACQATAIAOASQAGAIAFAJQAHAIAEAJIADgCQAGgGAHgGQARgNAPALQABABABABQALAKACARQABAKgBAI");
	this.shape_271.setTransform(548.8882,536.1808);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f().s("#000000").ss(2.2,1,1).p("AhSBQQgIgHgIgJQgIgJgGgMQgMgVAAgVQAAgYAPgZQAUgXASgGQARgEASADQAHABAGACQAYAJATAVQAIAKAFALQAJAMAFAOIADgCQAIgJAIgIQAWgQARAOQACABABABQAOANACAVQABAMgBAJ");
	this.shape_272.setTransform(545.7692,532.615);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f().s("#000000").ss(2.2,1,1).p("AhZBjQgLgIgKgKQgKgMgJgOQgPgZgCgaQgBgeARgfQAXgdAUgHQAVgHAWADQAHABAIADQAeAJAWAZQAKALAHANQALAQAEATIAEgDQAKgKAJgKQAagTAUAQQACABACACQARAQACAZQABANgCAM");
	this.shape_273.setTransform(542.5972,529.0167);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f().s("#000000").ss(2.2,1,1).p("AhhB2QgNgJgMgMQgNgOgLgQQgSgdgEgeQgDgkATgmQAagjAYgJQAXgJAaADQAJACAJACQAjAKAaAdQAMAMAIAQQAMAUAGAYIAEgFQALgLALgMQAegWAXASQADACACACQATASACAdQACAQgDAN");
	this.shape_274.setTransform(539.4484,525.4359);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f().s("#000000").ss(2.2,1,1).p("AhpCIQgQgKgOgNQgPgPgMgTQgXghgFgjQgFgpAVgsQAdgqAbgLQAbgKAdADQAKABALACQApALAeAgQANAPAKASQANAXAGAdIAFgFQAMgNAMgNQAigbAbAVQADACACACQAWAVADAhQABATgDAO");
	this.shape_275.setTransform(536.2815,521.8417);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f().s("#000000").ss(2.2,1,1).p("AhwCbQgTgLgQgQQgRgQgPgVQgbglgGgoQgHgvAYgzQAfgvAfgNQAdgMAhACQAMACAMACQAvAMAhAkQAPAQALAUQAPAbAGAhIAFgFQAOgPAOgPQAmgeAeAYQADACADADQAZAXACAlQABAVgDAQ");
	this.shape_276.setTransform(533.1172,518.2534);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_231}]}).to({state:[{t:this.shape_232}]},1).to({state:[{t:this.shape_233}]},1).to({state:[{t:this.shape_234}]},1).to({state:[{t:this.shape_235}]},1).to({state:[{t:this.shape_236}]},1).to({state:[{t:this.shape_237}]},1).to({state:[{t:this.shape_238}]},1).to({state:[{t:this.shape_239}]},1).to({state:[{t:this.shape_240}]},1).to({state:[{t:this.shape_241}]},1).to({state:[{t:this.shape_242}]},1).to({state:[]},1).to({state:[{t:this.shape_243}]},12).to({state:[{t:this.shape_244}]},1).to({state:[{t:this.shape_245}]},1).to({state:[{t:this.shape_246}]},1).to({state:[{t:this.shape_247}]},1).to({state:[{t:this.shape_248}]},1).to({state:[{t:this.shape_249}]},1).to({state:[{t:this.shape_250}]},1).to({state:[{t:this.shape_251}]},1).to({state:[{t:this.shape_252}]},1).to({state:[{t:this.shape_253}]},1).to({state:[{t:this.shape_254}]},1).to({state:[{t:this.shape_255}]},1).to({state:[{t:this.shape_231}]},1).to({state:[{t:this.shape_256}]},1).to({state:[{t:this.shape_257}]},1).to({state:[{t:this.shape_258}]},1).to({state:[{t:this.shape_259}]},1).to({state:[{t:this.shape_260}]},1).to({state:[{t:this.shape_261}]},1).to({state:[{t:this.shape_262}]},1).to({state:[{t:this.shape_263}]},1).to({state:[{t:this.shape_264}]},1).to({state:[{t:this.shape_265}]},1).to({state:[{t:this.shape_266}]},1).to({state:[{t:this.shape_267}]},1).to({state:[{t:this.shape_268}]},1).to({state:[{t:this.shape_242}]},1).to({state:[]},1).to({state:[{t:this.shape_243}]},13).to({state:[{t:this.shape_269}]},1).to({state:[{t:this.shape_270}]},1).to({state:[{t:this.shape_271}]},1).to({state:[{t:this.shape_272}]},1).to({state:[{t:this.shape_273}]},1).to({state:[{t:this.shape_274}]},1).to({state:[{t:this.shape_275}]},1).to({state:[{t:this.shape_276}]},1).to({state:[{t:this.shape_231}]},1).wait(1));

	// p_04
	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f().s("#000000").ss(2.2,1,1).p("ACvBZQhBAZhKAIQiSARguhQQgnhFAxhAQAZggAggS");
	this.shape_277.setTransform(522.9985,542.1911);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f().s("#000000").ss(2.2,1,1).p("AhVh2QgeARgYAfQguA9AlBBQAuBMCIgPQBGgIA+gX");
	this.shape_278.setTransform(520.8879,542.5486);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f().s("#000000").ss(2.2,1,1).p("AhRhwQgdARgVAcQgsA6AjA+QAsBICAgOQBDgHA6gW");
	this.shape_279.setTransform(518.7824,542.8816);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f().s("#000000").ss(2.2,1,1).p("AhNhqQgbAQgVAbQgoA3AhA6QApBEB5gMQA+gHA4gU");
	this.shape_280.setTransform(516.7092,543.2465);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f().s("#000000").ss(2.2,1,1).p("AhJhlQgaAPgSAaQgmA0AfA2QAmBBBygLQA6gGA1gT");
	this.shape_281.setTransform(514.6036,543.6114);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f().s("#000000").ss(2.2,1,1).p("AhFhfQgXAOgSAZQgjAwAdAzQAlA9BpgKQA3gFAxgS");
	this.shape_282.setTransform(512.493,543.9704);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f().s("#000000").ss(2.2,1,1).p("AhBhZQgVAOgRAWQggAuAbAvQAiA6BigJQAzgFAugR");
	this.shape_283.setTransform(510.3822,544.3109);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9hTQgUANgOAVQgeAqAZAsQAgA2BagIQAvgEArgP");
	this.shape_284.setTransform(508.2766,544.6766);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f().s("#000000").ss(2.2,1,1).p("Ag5hNQgSAMgNAUQgbAnAXAoQAdAyBTgGQArgEAogO");
	this.shape_285.setTransform(506.1657,545.0374);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1hIQgRAMgLASQgYAkAVAlQAaAvBLgGQAogDAlgM");
	this.shape_286.setTransform(504.1045,545.3791);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().s("#000000").ss(2.2,1,1).p("AgxhCQgOALgLARQgUAgATAiQAXArBEgEQAkgDAigL");
	this.shape_287.setTransform(501.993,545.7422);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f().s("#000000").ss(2.2,1,1).p("Agtg8QgNAKgIAPQgSAdARAfQAVAnA8gDQAggCAfgK");
	this.shape_288.setTransform(499.8871,546.1107);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().s("#000000").ss(2.2,1,1).p("Agpg3QgLAKgHAOQgPAaAPAbQASAjA1gCQAcgBAcgI");
	this.shape_289.setTransform(497.775,546.4553);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f().s("#000000").ss(2.2,1,1).p("AglgxQgJAJgGAMQgMAXANAYQAQAfAtAAQAYgBAZgH");
	this.shape_290.setTransform(495.662,546.8254);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().s("#000000").ss(2.2,1,1).p("AghgrQgHAIgFAKQgJAUALAUQAOAcAlABQAUAAAWgG");
	this.shape_291.setTransform(493.5549,547.2);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f().s("#000000").ss(2.2,1,1).p("AgdglQgFAHgEAJQgGARAJAQQALAZAeABQAQABATgF");
	this.shape_292.setTransform(491.4759,547.5833);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().s("#000000").ss(2.2,1,1).p("AgZggQgEAHgBAIQgEANAHANQAJAVAWADQANABAPgD");
	this.shape_293.setTransform(489.3638,547.9475);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f().s("#000000").ss(2.2,1,1).p("AAYAbQghAFgKgZQgHgRAGgQ");
	this.shape_294.setTransform(487.229,548.3417);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().s("#000000").ss(2.2,1,1).p("AAOACQgEADgGACQgJAEgFgFQgFgEADgFQABgDACgC");
	this.shape_295.setTransform(553.4804,562.7889);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f().s("#000000").ss(2.2,1,1).p("AgQgSQgEADgDAGQgHAKAIAJQAIAMAVgFQALgDAKgF");
	this.shape_296.setTransform(550.9491,561.0508);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().s("#000000").ss(2.2,1,1).p("AgXgbQgHAEgFAIQgKAPAKAPQAMARAggGQARgDAPgH");
	this.shape_297.setTransform(548.4125,559.3516);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f().s("#000000").ss(2.2,1,1).p("AgdglQgKAGgHAKQgOAVANATQAPAYAsgHQAXgEATgI");
	this.shape_298.setTransform(545.8746,557.629);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().s("#000000").ss(2.2,1,1).p("AgkguQgMAHgJANQgSAZAQAZQATAeA3gIQAcgFAZgK");
	this.shape_299.setTransform(543.3361,555.8938);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f().s("#000000").ss(2.2,1,1).p("Agqg4QgPAIgLAQQgWAeATAeQAWAlBCgKQAjgFAdgM");
	this.shape_300.setTransform(540.7973,554.1981);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().s("#000000").ss(2.2,1,1).p("AgxhCQgSAKgMASQgaAjAWAkQAZAqBOgKQAogGAigN");
	this.shape_301.setTransform(538.2708,552.479);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4hMQgTAMgPATQgeAoAZAqQAdAwBZgLQAtgGAogP");
	this.shape_302.setTransform(535.6942,550.7517);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().s("#000000").ss(2.2,1,1).p("Ag/hVQgWAMgRAWQghAtAbAvQAgA3BlgMQAzgHAtgR");
	this.shape_303.setTransform(533.1551,549.0575);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f().s("#000000").ss(2.2,1,1).p("AhFhfQgZAOgTAZQglAxAeA1QAkA9BwgNQA5gHAxgU");
	this.shape_304.setTransform(530.616,547.3392);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().s("#000000").ss(2.2,1,1).p("AhMhpQgbAQgVAbQgpA2AhA6QAnBDB8gOQA+gIA3gU");
	this.shape_305.setTransform(528.0768,545.6032);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f().s("#000000").ss(2.2,1,1).p("AhShyQgeAQgXAeQgtA7AkA/QAqBKCHgQQBFgIA7gW");
	this.shape_306.setTransform(525.5377,543.91);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().s("#000000").ss(2.2,1,1).p("AhWh3QgfARgYAfQgvA+AmBCQAuBMCKgPQBHgIA/gX");
	this.shape_307.setTransform(521.4556,542.448);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f().s("#000000").ss(2.2,1,1).p("AhThzQgeARgXAdQgtA8AlA/QAsBKCFgOQBEgIA8gW");
	this.shape_308.setTransform(519.9077,542.7181);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().s("#000000").ss(2.2,1,1).p("AhQhvQgcAQgWAdQgrA5AjA9QArBHB/gNQBBgHA6gW");
	this.shape_309.setTransform(518.3321,542.9572);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f().s("#000000").ss(2.2,1,1).p("AhNhrQgbAQgVAcQgpA2AiA7QApBEB5gMQA/gHA3gU");
	this.shape_310.setTransform(516.7718,543.2215);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().s("#000000").ss(2.2,1,1).p("AhKhmQgaAPgTAbQgnA0AgA4QAnBCB0gMQA8gGA1gU");
	this.shape_311.setTransform(515.2289,543.4923);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f().s("#000000").ss(2.2,1,1).p("AhHhiQgZAPgSAZQglAyAfA1QAlA/BugLQA5gFAzgT");
	this.shape_312.setTransform(513.6859,543.7562);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().s("#000000").ss(2.2,1,1).p("AhEheQgXAOgSAZQgiAvAdAzQAjA8BpgKQA2gFAwgS");
	this.shape_313.setTransform(512.1128,544.0209);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f().s("#000000").ss(2.2,1,1).p("AhBhZQgWANgQAXQghAuAcAwQAhA5BjgJQAzgEAvgR");
	this.shape_314.setTransform(510.5698,544.2859);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+hVQgVANgPAWQgeArAZAuQAhA3BdgJQAwgEAsgQ");
	this.shape_315.setTransform(509.0142,544.5319);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7hRQgUANgOAVQgcApAYAqQAfA1BXgIQAugDAqgP");
	this.shape_316.setTransform(507.4712,544.7969);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4hNQgSANgNATQgaAnAWAoQAdAxBSgGQAqgDAogO");
	this.shape_317.setTransform(505.9281,545.0627);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1hJQgRAMgMASQgYAkAWAmQAaAvBMgFQApgEAlgM");
	this.shape_318.setTransform(504.342,545.3538);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().s("#000000").ss(2.2,1,1).p("AgyhEQgPALgLARQgWAiAUAjQAYAsBHgEQAlgDAjgM");
	this.shape_319.setTransform(502.7988,545.6209);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f().s("#000000").ss(2.2,1,1).p("AgwhAQgOALgJAQQgUAfASAhQAXApBBgDQAigDAhgK");
	this.shape_320.setTransform(501.2555,545.8886);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().s("#000000").ss(2.2,1,1).p("Agsg8QgNALgJAPQgRAdAQAeQAWAnA7gDQAggCAegK");
	this.shape_321.setTransform(499.6996,546.1357);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f().s("#000000").ss(2.2,1,1).p("Agqg4QgLAKgIAOQgPAbAPAbQATAkA2gCQAdgBAcgJ");
	this.shape_322.setTransform(498.1561,546.4053);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().s("#000000").ss(2.2,1,1).p("AgmgzQgKAJgHANQgNAYANAZQASAhAwgBQAagBAagH");
	this.shape_323.setTransform(496.5811,546.6765);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f().s("#000000").ss(2.2,1,1).p("AgjgvQgJAIgGAMQgLAWAMAXQAQAeAqAAQAXAAAYgI");
	this.shape_324.setTransform(495.037,546.95);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().s("#000000").ss(2.2,1,1).p("AgggrQgIAIgEALQgJAUAKATQAOAcAlABQAUAAAWgG");
	this.shape_325.setTransform(493.4923,547.225);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f().s("#000000").ss(2.2,1,1).p("AgegnQgGAIgDAJQgHARAJASQAMAZAfABQASABATgF");
	this.shape_326.setTransform(491.9265,547.5023);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgjQgEAHgDAJQgFAPAIAPQAKAWAaACQAOABARgE");
	this.shape_327.setTransform(490.35,547.76);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f().s("#000000").ss(2.2,1,1).p("AgXgeQgEAGgBAHQgDANAGAMQAJAUAUADQAMACAOgD");
	this.shape_328.setTransform(488.7882,548.05);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f().s("#000000").ss(2.2,1,1).p("AgSgVQgGAEgDAGQgIALAIAMQAKAOAYgGQAOgDALgF");
	this.shape_329.setTransform(550.1061,560.4796);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgiQgJAFgGAKQgNATAMASQAOAVAogGQAVgEASgI");
	this.shape_330.setTransform(546.7186,558.2004);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().s("#000000").ss(2.2,1,1).p("Agtg7QgPAIgMAQQgXAgAUAhQAXAmBGgKQAkgFAggM");
	this.shape_331.setTransform(539.9474,553.62);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1hIQgTALgOATQgdAmAYAnQAbAvBWgLQAsgGAlgP");
	this.shape_332.setTransform(536.544,551.3293);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().s("#000000").ss(2.2,1,1).p("AhHhiQgaAOgTAaQgnAzAfA2QAlA/B0gOQA7gHAzgT");
	this.shape_333.setTransform(529.7713,546.7515);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f().s("#000000").ss(2.2,1,1).p("AhQhvQgdAQgWAdQgsA6AjA9QApBHCEgPQBCgHA6gX");
	this.shape_334.setTransform(526.3824,544.4801);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_277}]}).to({state:[{t:this.shape_278}]},1).to({state:[{t:this.shape_279}]},1).to({state:[{t:this.shape_280}]},1).to({state:[{t:this.shape_281}]},1).to({state:[{t:this.shape_282}]},1).to({state:[{t:this.shape_283}]},1).to({state:[{t:this.shape_284}]},1).to({state:[{t:this.shape_285}]},1).to({state:[{t:this.shape_286}]},1).to({state:[{t:this.shape_287}]},1).to({state:[{t:this.shape_288}]},1).to({state:[{t:this.shape_289}]},1).to({state:[{t:this.shape_290}]},1).to({state:[{t:this.shape_291}]},1).to({state:[{t:this.shape_292}]},1).to({state:[{t:this.shape_293}]},1).to({state:[{t:this.shape_294}]},1).to({state:[]},1).to({state:[{t:this.shape_295}]},6).to({state:[{t:this.shape_296}]},1).to({state:[{t:this.shape_297}]},1).to({state:[{t:this.shape_298}]},1).to({state:[{t:this.shape_299}]},1).to({state:[{t:this.shape_300}]},1).to({state:[{t:this.shape_301}]},1).to({state:[{t:this.shape_302}]},1).to({state:[{t:this.shape_303}]},1).to({state:[{t:this.shape_304}]},1).to({state:[{t:this.shape_305}]},1).to({state:[{t:this.shape_306}]},1).to({state:[{t:this.shape_277}]},1).to({state:[{t:this.shape_307}]},1).to({state:[{t:this.shape_308}]},1).to({state:[{t:this.shape_309}]},1).to({state:[{t:this.shape_310}]},1).to({state:[{t:this.shape_311}]},1).to({state:[{t:this.shape_312}]},1).to({state:[{t:this.shape_313}]},1).to({state:[{t:this.shape_314}]},1).to({state:[{t:this.shape_315}]},1).to({state:[{t:this.shape_316}]},1).to({state:[{t:this.shape_317}]},1).to({state:[{t:this.shape_318}]},1).to({state:[{t:this.shape_319}]},1).to({state:[{t:this.shape_320}]},1).to({state:[{t:this.shape_321}]},1).to({state:[{t:this.shape_322}]},1).to({state:[{t:this.shape_323}]},1).to({state:[{t:this.shape_324}]},1).to({state:[{t:this.shape_325}]},1).to({state:[{t:this.shape_326}]},1).to({state:[{t:this.shape_327}]},1).to({state:[{t:this.shape_328}]},1).to({state:[{t:this.shape_294}]},1).to({state:[]},1).to({state:[{t:this.shape_295}]},5).to({state:[{t:this.shape_329}]},1).to({state:[{t:this.shape_330}]},1).to({state:[{t:this.shape_299}]},1).to({state:[{t:this.shape_331}]},1).to({state:[{t:this.shape_332}]},1).to({state:[{t:this.shape_303}]},1).to({state:[{t:this.shape_333}]},1).to({state:[{t:this.shape_334}]},1).to({state:[{t:this.shape_277}]},1).wait(1));

	// puk_left
	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f().s("#000000").ss(2.2,1,1).p("ACPBkQgsglg6gsQhyhWhFgg");
	this.shape_335.setTransform(554.775,561.075);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f().s("#000000").ss(2.2,1,1).p("AiFhcQBAAdBsBRQA2AoApAj");
	this.shape_336.setTransform(550.775,560.45);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8hUQA8AbBkBJQAyAmAnAf");
	this.shape_337.setTransform(546.75,559.825);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f().s("#000000").ss(2.2,1,1).p("AhzhNQA4AYBdBDQAuAjAkAd");
	this.shape_338.setTransform(542.75,559.225);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f().s("#000000").ss(2.2,1,1).p("AhqhFQAzAVBVA9QAsAfAhAb");
	this.shape_339.setTransform(538.75,558.6);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f().s("#000000").ss(2.2,1,1).p("Ahhg+QAvATBOA3QAoAcAeAX");
	this.shape_340.setTransform(534.75,557.975);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f().s("#000000").ss(2.2,1,1).p("AhYg3QAqARBHAwQAkAZAcAV");
	this.shape_341.setTransform(530.75,557.35);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f().s("#000000").ss(2.2,1,1).p("AhPgwQAmAPBAAqQAgAVAZAT");
	this.shape_342.setTransform(526.7,556.725);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f().s("#000000").ss(2.2,1,1).p("AhGgoQAhAMA5AkQAdASAWAP");
	this.shape_343.setTransform(522.7,556.1);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9ghQAdAJAyAeQAZAPATAN");
	this.shape_344.setTransform(518.7,555.5);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0gaQAYAHArAYQAVALARAL");
	this.shape_345.setTransform(514.7,554.875);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f().s("#000000").ss(2.2,1,1).p("AgrgTQAUAFAjARQASAJAOAI");
	this.shape_346.setTransform(510.675,554.25);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f().s("#000000").ss(2.2,1,1).p("AAjAMQgLgFgOgFQgcgLgQgC");
	this.shape_347.setTransform(506.675,553.625);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f().s("#000000").ss(2.2,1,1).p("AAlAaQgLgKgPgLQgdgWgSgI");
	this.shape_348.setTransform(565.475,570.925);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f().s("#000000").ss(2.2,1,1).p("AgqgdQAVAJAhAaQASANANAL");
	this.shape_349.setTransform(564.875,570.375);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f().s("#000000").ss(2.2,1,1).p("AgwghQAYAKAmAdQAUAPAPAN");
	this.shape_350.setTransform(564.3,569.85);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2glQAaAMArAgQAXARARAO");
	this.shape_351.setTransform(563.7,569.275);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8gpQAeANAwAkQAYATATAP");
	this.shape_352.setTransform(563.1,568.725);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f().s("#000000").ss(2.2,1,1).p("AhBgtQAfAOA2AoQAaAUAUAR");
	this.shape_353.setTransform(562.5,568.175);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f().s("#000000").ss(2.2,1,1).p("AhIgyQAjAQA6ArQAeAWAWAT");
	this.shape_354.setTransform(561.9,567.65);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f().s("#000000").ss(2.2,1,1).p("AhNg1QAmARA+AuQAgAZAYAU");
	this.shape_355.setTransform(561.3,567.1);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f().s("#000000").ss(2.2,1,1).p("AhTg5QAoASBDAyQAiAaAaAW");
	this.shape_356.setTransform(560.725,566.55);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f().s("#000000").ss(2.2,1,1).p("AhZg+QArAUBIA2QAlAbAbAY");
	this.shape_357.setTransform(560.125,566.025);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f().s("#000000").ss(2.2,1,1).p("AhfhCQAuAVBNA6QAnAdAdAZ");
	this.shape_358.setTransform(559.525,565.45);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f().s("#000000").ss(2.2,1,1).p("AhlhGQAxAWBRA+QApAfAgAa");
	this.shape_359.setTransform(558.95,564.9);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f().s("#000000").ss(2.2,1,1).p("AhrhKQA0AYBWBAQAsAiAhAb");
	this.shape_360.setTransform(558.35,564.35);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f().s("#000000").ss(2.2,1,1).p("AhxhOQA3AZBbBEQAuAjAjAd");
	this.shape_361.setTransform(557.75,563.825);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f().s("#000000").ss(2.2,1,1).p("Ah3hSQA6AaBfBIQAxAkAkAf");
	this.shape_362.setTransform(557.15,563.275);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8hWQA8AbBlBLQAyAnAnAg");
	this.shape_363.setTransform(556.55,562.725);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f().s("#000000").ss(2.2,1,1).p("AiDhaQBAAcBpBQQA1AoAoAh");
	this.shape_364.setTransform(555.95,562.15);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f().s("#000000").ss(2.2,1,1).p("AiIhfQBCAfBuBSQA3AqAqAk");
	this.shape_365.setTransform(555.375,561.625);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f().s("#000000").ss(2.2,1,1).p("AiHhdQBCAdBtBSQA3ApApAj");
	this.shape_366.setTransform(551.75,560.625);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f().s("#000000").ss(2.2,1,1).p("AiBhYQA/AcBnBMQA1AoAoAh");
	this.shape_367.setTransform(548.775,560.15);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f().s("#000000").ss(2.2,1,1).p("Ah6hSQA7AaBiBIQAyAkAmAf");
	this.shape_368.setTransform(545.75,559.675);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f().s("#000000").ss(2.2,1,1).p("AhthIQA1AXBXA/QAsAfAjAc");
	this.shape_369.setTransform(539.75,558.75);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f().s("#000000").ss(2.2,1,1).p("AhmhCQAxAVBTA5QApAeAgAZ");
	this.shape_370.setTransform(536.75,558.3);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f().s("#000000").ss(2.2,1,1).p("Ahfg8QAuASBNA2QAmAbAeAX");
	this.shape_371.setTransform(533.725,557.8);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f().s("#000000").ss(2.2,1,1).p("AhRgyQAnAPBBAsQAiAWAZAT");
	this.shape_372.setTransform(527.725,556.9);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f().s("#000000").ss(2.2,1,1).p("AhLgsQAkANA8AnQAfAUAXAR");
	this.shape_373.setTransform(524.7,556.425);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f().s("#000000").ss(2.2,1,1).p("AhEgnQAgAMA3AiQAdARAUAP");
	this.shape_374.setTransform(521.7,555.95);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2gcQAZAIAsAZQAXANARAL");
	this.shape_375.setTransform(515.7,555.025);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f().s("#000000").ss(2.2,1,1).p("AgvgWQAWAGAnAUQATAKAPAJ");
	this.shape_376.setTransform(512.675,554.575);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f().s("#000000").ss(2.2,1,1).p("AgpgRQATAFAhAPQARAIANAH");
	this.shape_377.setTransform(509.7,554.075);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f().s("#000000").ss(2.2,1,1).p("AgtgeQAWAKAkAaQASAOAOAL");
	this.shape_378.setTransform(564.65,570.15);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1gkQAaALAqAgQAWAQARAO");
	this.shape_379.setTransform(563.825,569.4);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9gqQAeANAxAlQAZATATAQ");
	this.shape_380.setTransform(563.025,568.65);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f().s("#000000").ss(2.2,1,1).p("AhFgwQAiAPA3AqQAcAWAWAS");
	this.shape_381.setTransform(562.175,567.9);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f().s("#000000").ss(2.2,1,1).p("AhNg1QAmARA+AuQAfAYAYAU");
	this.shape_382.setTransform(561.35,567.125);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f().s("#000000").ss(2.2,1,1).p("AhVg7QApATBFAzQAjAbAaAW");
	this.shape_383.setTransform(560.525,566.375);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f().s("#000000").ss(2.2,1,1).p("AhdhBQAtAVBLA4QAmAdAdAZ");
	this.shape_384.setTransform(559.725,565.625);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f().s("#000000").ss(2.2,1,1).p("AhmhGQAyAWBSA9QApAgAgAa");
	this.shape_385.setTransform(558.9,564.875);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f().s("#000000").ss(2.2,1,1).p("AhuhMQA2AZBYBCQAtAiAiAc");
	this.shape_386.setTransform(558.075,564.1);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2hSQA6AbBeBGQAwAlAlAf");
	this.shape_387.setTransform(557.225,563.35);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f().s("#000000").ss(2.2,1,1).p("Ah+hYQA9AcBmBMQAzAnAnAi");
	this.shape_388.setTransform(556.425,562.6);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f().s("#000000").ss(2.2,1,1).p("AiGhdQBBAdBsBSQA3ApApAj");
	this.shape_389.setTransform(555.6,561.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_335}]}).to({state:[{t:this.shape_336}]},1).to({state:[{t:this.shape_337}]},1).to({state:[{t:this.shape_338}]},1).to({state:[{t:this.shape_339}]},1).to({state:[{t:this.shape_340}]},1).to({state:[{t:this.shape_341}]},1).to({state:[{t:this.shape_342}]},1).to({state:[{t:this.shape_343}]},1).to({state:[{t:this.shape_344}]},1).to({state:[{t:this.shape_345}]},1).to({state:[{t:this.shape_346}]},1).to({state:[{t:this.shape_347}]},1).to({state:[]},1).to({state:[{t:this.shape_348}]},6).to({state:[{t:this.shape_349}]},1).to({state:[{t:this.shape_350}]},1).to({state:[{t:this.shape_351}]},1).to({state:[{t:this.shape_352}]},1).to({state:[{t:this.shape_353}]},1).to({state:[{t:this.shape_354}]},1).to({state:[{t:this.shape_355}]},1).to({state:[{t:this.shape_356}]},1).to({state:[{t:this.shape_357}]},1).to({state:[{t:this.shape_358}]},1).to({state:[{t:this.shape_359}]},1).to({state:[{t:this.shape_360}]},1).to({state:[{t:this.shape_361}]},1).to({state:[{t:this.shape_362}]},1).to({state:[{t:this.shape_363}]},1).to({state:[{t:this.shape_364}]},1).to({state:[{t:this.shape_365}]},1).to({state:[{t:this.shape_335}]},1).to({state:[{t:this.shape_366}]},1).to({state:[{t:this.shape_367}]},1).to({state:[{t:this.shape_368}]},1).to({state:[{t:this.shape_338}]},1).to({state:[{t:this.shape_369}]},1).to({state:[{t:this.shape_370}]},1).to({state:[{t:this.shape_371}]},1).to({state:[{t:this.shape_341}]},1).to({state:[{t:this.shape_372}]},1).to({state:[{t:this.shape_373}]},1).to({state:[{t:this.shape_374}]},1).to({state:[{t:this.shape_344}]},1).to({state:[{t:this.shape_375}]},1).to({state:[{t:this.shape_376}]},1).to({state:[{t:this.shape_377}]},1).to({state:[{t:this.shape_347}]},1).to({state:[]},1).to({state:[{t:this.shape_348}]},7).to({state:[{t:this.shape_378}]},1).to({state:[{t:this.shape_379}]},1).to({state:[{t:this.shape_380}]},1).to({state:[{t:this.shape_381}]},1).to({state:[{t:this.shape_382}]},1).to({state:[{t:this.shape_383}]},1).to({state:[{t:this.shape_384}]},1).to({state:[{t:this.shape_385}]},1).to({state:[{t:this.shape_386}]},1).to({state:[{t:this.shape_387}]},1).to({state:[{t:this.shape_388}]},1).to({state:[{t:this.shape_389}]},1).to({state:[{t:this.shape_335}]},1).wait(1));

	// pr
	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f().s("#000000").ss(2.2,1,1).p("AhTihIADAjQABAogSAeIAeAGQAlAJAeATQBiA5AAB/");
	this.shape_390.setTransform(818.725,563.075);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f().s("#000000").ss(2.2,1,1).p("AhXioIAEAkQAAArgTAfIAgAFQAnAKAfAUQBnA7AACF");
	this.shape_391.setTransform(822.45,561);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f().s("#000000").ss(2.2,1,1).p("AhbivIAEAmQABAsgUAhIAhAGQAoAKAhAUQBqA+AACK");
	this.shape_392.setTransform(826.2,558.925);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f().s("#000000").ss(2.2,1,1).p("Ahei2IAEAoQAAAtgUAiIAiAGQAqALAiAVQBvBAAACQ");
	this.shape_393.setTransform(829.925,556.85);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f().s("#000000").ss(2.2,1,1).p("Ahii8IAFApQAAAvgVAjIAkAGQArAMAjAVQBzBDAACU");
	this.shape_394.setTransform(833.65,554.8);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f().s("#000000").ss(2.2,1,1).p("AhljDIAEAqQABAxgWAkIAlAHQAsAMAlAWQB3BGAACY");
	this.shape_395.setTransform(837.35,552.7);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f().s("#000000").ss(2.2,1,1).p("AhpjJIAFArQABAzgXAlIAmAHQAuAMAmAXQB7BIAACe");
	this.shape_396.setTransform(841.1,550.625);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f().s("#000000").ss(2.2,1,1).p("AhsjQIAEAtQABA1gXAmIAnAHQAwANAnAXQB/BLAACj");
	this.shape_397.setTransform(844.825,548.55);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f().s("#000000").ss(2.2,1,1).p("AhwjXIAFAvQAAA2gXAoIAoAHQAyANAoAYQCEBNAACp");
	this.shape_398.setTransform(848.55,546.475);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f().s("#000000").ss(2.2,1,1).p("AhnjDIAFApQAAAzgTAiQAOACANADQA2AOAkAWQB2BHAACZ");
	this.shape_399.setTransform(850.4001,545.5);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f().s("#000000").ss(2.2,1,1).p("AhdivIAFAlQABAtgQAeQAMACANADQAvANAgAVQBpA/gCCJ");
	this.shape_400.setTransform(852.2269,544.475);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f().s("#000000").ss(2.2,1,1).p("AhUibIAFAfQACAogNAaQAMADAKACQAqANAcASQBbA5gCB5");
	this.shape_401.setTransform(854.0783,543.5);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f().s("#000000").ss(2.2,1,1).p("AhLiIIAGAbQADAigKAXQAKACAJACQAkAMAXARQBOAygDBq");
	this.shape_402.setTransform(855.9306,542.5);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f().s("#000000").ss(2.2,1,1).p("AhAh0IAFAWQAFAcgHATQAIADAIACQAeAKAUAPQBAAtgEBZ");
	this.shape_403.setTransform(857.6147,541.5);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1hhIAGASQAGAWgEAQQAHACAGACQAYAKAQANQAzAmgFBK");
	this.shape_404.setTransform(859.2473,540.5);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f().s("#000000").ss(2.2,1,1).p("AgqhNIAHANQAGAQAAANQAFACAFACQASAJALAKQAmAggGA6");
	this.shape_405.setTransform(860.8852,539.525);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f().s("#000000").ss(2.2,1,1).p("Agfg5IAHAIQAHALADAJQAEABADADQALAHAIAJQAZAZgHAq");
	this.shape_406.setTransform(862.5528,538.5);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f().s("#000000").ss(2.2,1,1).p("AgUgmIAIAEQAKAGAHAHQAXAXgKAl");
	this.shape_407.setTransform(864.2493,537.575);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f().s("#000000").ss(2.2,1,1).p("AgvgiQgDANgPAJIAaAFQAhAHAZAKQAdAMASAN");
	this.shape_408.setTransform(798.3625,566.325);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f().s("#000000").ss(2.2,1,1).p("AgzgwQgCAJgDAGQgLANABABIAaAHQAPAFAOAFQATAHAPAIQAdAQAQAU");
	this.shape_409.setTransform(800.6989,565.9);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4g+QgBAJgDAIQgKAQAAABIAdALQAPAGAPAGQAVAIARAMQAeAVAOAb");
	this.shape_410.setTransform(803.025,565.6);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9hNQAAALgCAJQgDALgHAJIBAAdQAXALASAPQAfAZAMAj");
	this.shape_411.setTransform(805.35,565.25);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f().s("#000000").ss(2.2,1,1).p("AhDhiQABAMgCAMQgCASgKAPIA4AXQAbAKAUAQQAwAhAJA6");
	this.shape_412.setTransform(808.7,564.725);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f().s("#000000").ss(2.2,1,1).p("AhIh3QABAOgBANQgBAagMAUIAvARQAfAKAXARQBBApAGBR");
	this.shape_413.setTransform(812.05,564.175);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f().s("#000000").ss(2.2,1,1).p("AhOiMQACAQAAAPQAAAhgPAZIAnALQAiAKAaASQBRAxADBo");
	this.shape_414.setTransform(815.375,563.625);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f().s("#000000").ss(2.2,1,1).p("AhWinIADAlQABAqgTAeIAgAGQAmAKAfATQBlA7AACE");
	this.shape_415.setTransform(821.7,561.4);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f().s("#000000").ss(2.2,1,1).p("AhZisIADAmQABAqgTAhIAgAFQAoAKAgAUQBpA+AACH");
	this.shape_416.setTransform(824.7,559.75);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f().s("#000000").ss(2.2,1,1).p("AhcixIAEAmQABAtgUAhIAhAGQApAKAhAVQBsA/AACL");
	this.shape_417.setTransform(827.675,558.075);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f().s("#000000").ss(2.2,1,1).p("Ahei3IADAoQABAugUAiIAiAGQAqALAiAVQBvBBAACQ");
	this.shape_418.setTransform(830.65,556.425);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f().s("#000000").ss(2.2,1,1).p("AhljBIAFApQAAAxgVAkIAkAGQAtAMAkAWQB2BFAACY");
	this.shape_419.setTransform(836.625,553.125);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f().s("#000000").ss(2.2,1,1).p("AhojHIAFArQAAAygVAlIAlAHQAtAMAmAWQB5BHAACd");
	this.shape_420.setTransform(839.6,551.475);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f().s("#000000").ss(2.2,1,1).p("AhqjMIAEAsQABA0gXAmIAnAGQAvAMAmAYQB9BJAACg");
	this.shape_421.setTransform(842.575,549.8);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f().s("#000000").ss(2.2,1,1).p("AhtjSIAEAuQABA0gXAnIAnAHQAwANAoAYQCABKAACl");
	this.shape_422.setTransform(845.575,548.15);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f().s("#000000").ss(2.2,1,1).p("AhpjIIAFAqQAAA1gUAjQAOACAOADQA3AOAmAXQB5BIgBCd");
	this.shape_423.setTransform(849.9251,545.75);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f().s("#000000").ss(2.2,1,1).p("Ahii5IAFAnQABAwgSAgQANADANACQAzAOAiAVQBvBDgBCR");
	this.shape_424.setTransform(851.3254,544.975);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f().s("#000000").ss(2.2,1,1).p("AhbiqIAFAkQABArgPAdQAMADAMACQAuANAfAUQBmA+gCCF");
	this.shape_425.setTransform(852.7019,544.25);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f().s("#000000").ss(2.2,1,1).p("AhNiNIAFAdQADAjgLAYQALACAJACQAmAMAYARQBSA1gEBt");
	this.shape_426.setTransform(855.4572,542.725);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f().s("#000000").ss(2.2,1,1).p("AhGh+IAGAZQADAfgIAVQAJACAJADQAhAKAVAQQBHAwgDBh");
	this.shape_427.setTransform(856.8082,542);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+hvIAGAVQAFAagGATQAIACAHACQAdAKASAPQA9AqgEBW");
	this.shape_428.setTransform(858.0123,541.275);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f().s("#000000").ss(2.2,1,1).p("AgshSIAGAPQAGARgBANQAFACAGACQATAJAMAMQAqAhgGA+");
	this.shape_429.setTransform(860.4879,539.775);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f().s("#000000").ss(2.2,1,1).p("AgkhDIAGALQAHANABAKQAFACAEADQAOAIAKAKQAfAcgGAy");
	this.shape_430.setTransform(861.7063,539.025);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f().s("#000000").ss(2.2,1,1).p("Agcg0IAHAIQAHAIAEAIQADACADACQAKAHAHAJQAVAXgHAm");
	this.shape_431.setTransform(862.986,538.25);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2g3QgBAJgDAHQgKAOAAABIAbAKQAPAFAPAFQAUAIAQAKQAdASAPAY");
	this.shape_432.setTransform(801.875,565.775);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f().s("#000000").ss(2.2,1,1).p("AhEhpQABANgCAMQgBAVgMAQIA2AVQAcALAVAPQA2AkAIBC");
	this.shape_433.setTransform(809.8,564.525);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f().s("#000000").ss(2.2,1,1).p("AhMiFQABAPABAPQgBAfgOAXIApANQAhAKAaASQBLAuAEBg");
	this.shape_434.setTransform(814.275,563.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_390}]}).to({state:[{t:this.shape_391}]},1).to({state:[{t:this.shape_392}]},1).to({state:[{t:this.shape_393}]},1).to({state:[{t:this.shape_394}]},1).to({state:[{t:this.shape_395}]},1).to({state:[{t:this.shape_396}]},1).to({state:[{t:this.shape_397}]},1).to({state:[{t:this.shape_398}]},1).to({state:[{t:this.shape_399}]},1).to({state:[{t:this.shape_400}]},1).to({state:[{t:this.shape_401}]},1).to({state:[{t:this.shape_402}]},1).to({state:[{t:this.shape_403}]},1).to({state:[{t:this.shape_404}]},1).to({state:[{t:this.shape_405}]},1).to({state:[{t:this.shape_406}]},1).to({state:[{t:this.shape_407}]},1).to({state:[]},1).to({state:[{t:this.shape_408}]},12).to({state:[{t:this.shape_409}]},1).to({state:[{t:this.shape_410}]},1).to({state:[{t:this.shape_411}]},1).to({state:[{t:this.shape_412}]},1).to({state:[{t:this.shape_413}]},1).to({state:[{t:this.shape_414}]},1).to({state:[{t:this.shape_390}]},1).to({state:[{t:this.shape_415}]},1).to({state:[{t:this.shape_416}]},1).to({state:[{t:this.shape_417}]},1).to({state:[{t:this.shape_418}]},1).to({state:[{t:this.shape_394}]},1).to({state:[{t:this.shape_419}]},1).to({state:[{t:this.shape_420}]},1).to({state:[{t:this.shape_421}]},1).to({state:[{t:this.shape_422}]},1).to({state:[{t:this.shape_398}]},1).to({state:[{t:this.shape_423}]},1).to({state:[{t:this.shape_424}]},1).to({state:[{t:this.shape_425}]},1).to({state:[{t:this.shape_401}]},1).to({state:[{t:this.shape_426}]},1).to({state:[{t:this.shape_427}]},1).to({state:[{t:this.shape_428}]},1).to({state:[{t:this.shape_404}]},1).to({state:[{t:this.shape_429}]},1).to({state:[{t:this.shape_430}]},1).to({state:[{t:this.shape_431}]},1).to({state:[{t:this.shape_407}]},1).to({state:[]},1).to({state:[{t:this.shape_408}]},9).to({state:[{t:this.shape_432}]},1).to({state:[{t:this.shape_411}]},1).to({state:[{t:this.shape_433}]},1).to({state:[{t:this.shape_434}]},1).to({state:[{t:this.shape_390}]},1).wait(1));

	// p_1
	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f().s("#000000").ss(2.2,1,1).p("Ah/A+IBQgwQBfg0BQgX");
	this.shape_435.setTransform(728.725,588.225);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2A5IBKgsQBZgwBLgV");
	this.shape_436.setTransform(730.3,587.625);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f().s("#000000").ss(2.2,1,1).p("AhuA1IBGgpQBRgsBGgU");
	this.shape_437.setTransform(731.9,587.05);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f().s("#000000").ss(2.2,1,1).p("AhlAwIBAglQBLgoBAgS");
	this.shape_438.setTransform(733.475,586.475);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f().s("#000000").ss(2.2,1,1).p("AhdAsIA7giQBFglA7gQ");
	this.shape_439.setTransform(735.075,585.875);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f().s("#000000").ss(2.2,1,1).p("AhUAnIA2geQA+ghA1gO");
	this.shape_440.setTransform(736.65,585.3);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f().s("#000000").ss(2.2,1,1).p("AhLAjIAvgcQA5gcAvgN");
	this.shape_441.setTransform(738.275,584.725);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f().s("#000000").ss(2.2,1,1).p("AhDAeIAqgYQAygYArgL");
	this.shape_442.setTransform(739.85,584.125);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f().s("#000000").ss(2.2,1,1).p("Ag6AaIAlgVQArgUAlgJ");
	this.shape_443.setTransform(741.425,583.55);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f().s("#000000").ss(2.2,1,1).p("AgxAVIAfgRQAlgRAfgH");
	this.shape_444.setTransform(743.025,582.95);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f().s("#000000").ss(2.2,1,1).p("AgoARIAZgOQAfgNAZgG");
	this.shape_445.setTransform(744.6,582.375);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f().s("#000000").ss(2.2,1,1).p("AggAMIAVgKQAYgJAUgE");
	this.shape_446.setTransform(746.2,581.8);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f().s("#000000").ss(2.2,1,1).p("AgXAIIAPgHQASgGAOgC");
	this.shape_447.setTransform(747.775,581.2);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f().s("#000000").ss(2.2,1,1).p("AgNALIAJgIQAJgIAJgF");
	this.shape_448.setTransform(709.15,595.925);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f().s("#000000").ss(2.2,1,1).p("AgaAQIARgMQASgMASgH");
	this.shape_449.setTransform(711.325,595.075);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f().s("#000000").ss(2.2,1,1).p("AgnAWIAZgRQAcgRAagJ");
	this.shape_450.setTransform(713.5,594.2);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f().s("#000000").ss(2.2,1,1).p("AgzAcIAggVQAmgXAhgL");
	this.shape_451.setTransform(715.675,593.375);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f().s("#000000").ss(2.2,1,1).p("AhAAiIAogaQAwgbApgO");
	this.shape_452.setTransform(717.85,592.5);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f().s("#000000").ss(2.2,1,1).p("AhMAnIAwgeQA5ggAwgP");
	this.shape_453.setTransform(720.025,591.65);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f().s("#000000").ss(2.2,1,1).p("AhZAtIA4gjQBCglA5gR");
	this.shape_454.setTransform(722.2,590.775);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f().s("#000000").ss(2.2,1,1).p("AhmAyIBAgnQBMgqBBgT");
	this.shape_455.setTransform(724.375,589.95);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f().s("#000000").ss(2.2,1,1).p("AhyA4IBIgrQBVgvBJgV");
	this.shape_456.setTransform(726.55,589.075);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f().s("#000000").ss(2.2,1,1).p("Ah5A6IBMgtQBagxBNgV");
	this.shape_457.setTransform(729.925,587.775);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f().s("#000000").ss(2.2,1,1).p("AhyA3IBIgrQBVguBIgU");
	this.shape_458.setTransform(731.125,587.35);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f().s("#000000").ss(2.2,1,1).p("AhsAzIBEgoQBRgrBEgS");
	this.shape_459.setTransform(732.275,586.9);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f().s("#000000").ss(2.2,1,1).p("AhfAtIA8gjQBHglA8gR");
	this.shape_460.setTransform(734.675,586.025);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f().s("#000000").ss(2.2,1,1).p("AhYApIA4ggQBBgiA4gP");
	this.shape_461.setTransform(735.875,585.6);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f().s("#000000").ss(2.2,1,1).p("AhSAmIA0geQA9gfA0gO");
	this.shape_462.setTransform(737.075,585.15);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f().s("#000000").ss(2.2,1,1).p("AhFAfIAsgYQA0gaArgL");
	this.shape_463.setTransform(739.425,584.275);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+AcIAogWQAugXAngK");
	this.shape_464.setTransform(740.625,583.825);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4AYIAkgTQAqgUAjgJ");
	this.shape_465.setTransform(741.825,583.4);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f().s("#000000").ss(2.2,1,1).p("AgrASIAcgPQAggOAbgG");
	this.shape_466.setTransform(744.225,582.525);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f().s("#000000").ss(2.2,1,1).p("AgkAOIAYgLQAbgMAWgE");
	this.shape_467.setTransform(745.375,582.075);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f().s("#000000").ss(2.2,1,1).p("AgeALIAUgKQAWgIATgD");
	this.shape_468.setTransform(746.575,581.65);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f().s("#000000").ss(2.2,1,1).p("AgeASIATgNQAVgOAUgI");
	this.shape_469.setTransform(711.95,594.825);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f().s("#000000").ss(2.2,1,1).p("AgtAZIAcgTQAigUAdgK");
	this.shape_470.setTransform(714.75,593.725);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+AhIAngZQAugbAogN");
	this.shape_471.setTransform(717.55,592.625);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f().s("#000000").ss(2.2,1,1).p("AhOAoIAxgfQA6ghAygP");
	this.shape_472.setTransform(720.325,591.525);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f().s("#000000").ss(2.2,1,1).p("AhfAvIA8gkQBGgnA9gS");
	this.shape_473.setTransform(723.125,590.425);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f().s("#000000").ss(2.2,1,1).p("AhvA2IBGgqQBTgtBGgU");
	this.shape_474.setTransform(725.925,589.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_435}]}).to({state:[{t:this.shape_436}]},1).to({state:[{t:this.shape_437}]},1).to({state:[{t:this.shape_438}]},1).to({state:[{t:this.shape_439}]},1).to({state:[{t:this.shape_440}]},1).to({state:[{t:this.shape_441}]},1).to({state:[{t:this.shape_442}]},1).to({state:[{t:this.shape_443}]},1).to({state:[{t:this.shape_444}]},1).to({state:[{t:this.shape_445}]},1).to({state:[{t:this.shape_446}]},1).to({state:[{t:this.shape_447}]},1).to({state:[]},1).to({state:[{t:this.shape_448}]},15).to({state:[{t:this.shape_449}]},1).to({state:[{t:this.shape_450}]},1).to({state:[{t:this.shape_451}]},1).to({state:[{t:this.shape_452}]},1).to({state:[{t:this.shape_453}]},1).to({state:[{t:this.shape_454}]},1).to({state:[{t:this.shape_455}]},1).to({state:[{t:this.shape_456}]},1).to({state:[{t:this.shape_435}]},1).to({state:[{t:this.shape_457}]},1).to({state:[{t:this.shape_458}]},1).to({state:[{t:this.shape_459}]},1).to({state:[{t:this.shape_438}]},1).to({state:[{t:this.shape_460}]},1).to({state:[{t:this.shape_461}]},1).to({state:[{t:this.shape_462}]},1).to({state:[{t:this.shape_441}]},1).to({state:[{t:this.shape_463}]},1).to({state:[{t:this.shape_464}]},1).to({state:[{t:this.shape_465}]},1).to({state:[{t:this.shape_444}]},1).to({state:[{t:this.shape_466}]},1).to({state:[{t:this.shape_467}]},1).to({state:[{t:this.shape_468}]},1).to({state:[{t:this.shape_447}]},1).to({state:[]},1).to({state:[{t:this.shape_448}]},13).to({state:[{t:this.shape_469}]},1).to({state:[{t:this.shape_470}]},1).to({state:[{t:this.shape_471}]},1).to({state:[{t:this.shape_472}]},1).to({state:[{t:this.shape_473}]},1).to({state:[{t:this.shape_474}]},1).to({state:[{t:this.shape_435}]},1).wait(1));

	// p_2
	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9ALIArgMQAxgMAeAF");
	this.shape_475.setTransform(738.45,590.8367);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f().s("#000000").ss(2.2,1,1).p("Ag3AKIAngLQAsgKAcAE");
	this.shape_476.setTransform(740.275,590.8429);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f().s("#000000").ss(2.2,1,1).p("AgxAIIAjgJQAngJAZAD");
	this.shape_477.setTransform(742.125,590.851);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f().s("#000000").ss(2.2,1,1).p("AgsAHIAfgIQAkgHAVAD");
	this.shape_478.setTransform(743.95,590.8321);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f().s("#000000").ss(2.2,1,1).p("AgmAGIAbgGQAfgHATAD");
	this.shape_479.setTransform(745.775,590.8403);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f().s("#000000").ss(2.2,1,1).p("AggAFIAXgFQAZgGARAD");
	this.shape_480.setTransform(747.65,590.8471);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f().s("#000000").ss(2.2,1,1).p("AgaAEIATgEQAVgFANAD");
	this.shape_481.setTransform(749.475,590.8554);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f().s("#000000").ss(2.2,1,1).p("AgUADIAPgDQAQgDALAC");
	this.shape_482.setTransform(751.3,590.835);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f().s("#000000").ss(2.2,1,1).p("AgPACIALgCQAMgBAIAB");
	this.shape_483.setTransform(753.15,590.8429);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f().s("#000000").ss(2.2,1,1).p("AgJABIAHgBQAHAAAFAA");
	this.shape_484.setTransform(754.975,590.8417);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f().s("#000000").ss(2.2,1,1).p("AgKAEIAHgEQAIgDAGAB");
	this.shape_485.setTransform(722.5,595.8472);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f().s("#000000").ss(2.2,1,1).p("AgTAFIANgFQAQgFAKAB");
	this.shape_486.setTransform(725.175,595.0167);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f().s("#000000").ss(2.2,1,1).p("AgbAGIATgGQAWgGAOAC");
	this.shape_487.setTransform(727.825,594.1765);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f().s("#000000").ss(2.2,1,1).p("AgjAHIAZgHQAcgIASAD");
	this.shape_488.setTransform(730.5,593.3452);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f().s("#000000").ss(2.2,1,1).p("AgsAIIAfgJQAkgJAWAD");
	this.shape_489.setTransform(733.125,592.5125);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0AJIAlgKQAqgKAaAE");
	this.shape_490.setTransform(735.775,591.6698);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4AKIAogLQAtgLAcAF");
	this.shape_491.setTransform(739.825,590.8325);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f().s("#000000").ss(2.2,1,1).p("AgwAIIAigJQAngIAYAD");
	this.shape_492.setTransform(742.575,590.849);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f().s("#000000").ss(2.2,1,1).p("AgnAGIAcgHQAfgHAUAD");
	this.shape_493.setTransform(745.325,590.855);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f().s("#000000").ss(2.2,1,1).p("AgjAGIAZgGQAcgGASAD");
	this.shape_494.setTransform(746.725,590.85);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f().s("#000000").ss(2.2,1,1).p("AgeAFIAVgFQAZgFAPAC");
	this.shape_495.setTransform(748.1,590.8333);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f().s("#000000").ss(2.2,1,1).p("AgWADIAQgDQASgDALAB");
	this.shape_496.setTransform(750.85,590.85);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f().s("#000000").ss(2.2,1,1).p("AgSACIANgCQAOgCAKAC");
	this.shape_497.setTransform(752.225,590.8429);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f().s("#000000").ss(2.2,1,1).p("AgNABIAKgBQALgBAHAB");
	this.shape_498.setTransform(753.6,590.855);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f().s("#000000").ss(2.2,1,1).p("AgVAFIAPgFQAQgFALAB");
	this.shape_499.setTransform(725.7,594.8589);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f().s("#000000").ss(2.2,1,1).p("AgeAGIAVgGQAZgHAPAC");
	this.shape_500.setTransform(728.9,593.8528);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f().s("#000000").ss(2.2,1,1).p("AgoAIIAcgIQAhgJAVAD");
	this.shape_501.setTransform(732.05,592.8359);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f().s("#000000").ss(2.2,1,1).p("AgyAJIAkgKQAogKAZAE");
	this.shape_502.setTransform(735.25,591.8296);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_475}]}).to({state:[{t:this.shape_476}]},1).to({state:[{t:this.shape_477}]},1).to({state:[{t:this.shape_478}]},1).to({state:[{t:this.shape_479}]},1).to({state:[{t:this.shape_480}]},1).to({state:[{t:this.shape_481}]},1).to({state:[{t:this.shape_482}]},1).to({state:[{t:this.shape_483}]},1).to({state:[{t:this.shape_484}]},1).to({state:[]},1).to({state:[{t:this.shape_485}]},21).to({state:[{t:this.shape_486}]},1).to({state:[{t:this.shape_487}]},1).to({state:[{t:this.shape_488}]},1).to({state:[{t:this.shape_489}]},1).to({state:[{t:this.shape_490,p:{x:735.775,y:591.6698}}]},1).to({state:[{t:this.shape_475}]},1).to({state:[{t:this.shape_491}]},1).to({state:[{t:this.shape_490,p:{x:741.2,y:590.8429}}]},1).to({state:[{t:this.shape_492}]},1).to({state:[{t:this.shape_478}]},1).to({state:[{t:this.shape_493}]},1).to({state:[{t:this.shape_494}]},1).to({state:[{t:this.shape_495}]},1).to({state:[{t:this.shape_481}]},1).to({state:[{t:this.shape_496}]},1).to({state:[{t:this.shape_497}]},1).to({state:[{t:this.shape_498}]},1).to({state:[{t:this.shape_484}]},1).to({state:[]},1).to({state:[{t:this.shape_485}]},19).to({state:[{t:this.shape_499}]},1).to({state:[{t:this.shape_500}]},1).to({state:[{t:this.shape_501}]},1).to({state:[{t:this.shape_502}]},1).to({state:[{t:this.shape_475}]},1).wait(1));

	// p_3
	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f().s("#000000").ss(2.2,1,1).p("ACGB/QALgaACgnQAEhOguhBQgVgdgjgLQglgMgkAOQheAmgdC2");
	this.shape_503.setTransform(763.8658,556.7033);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f().s("#000000").ss(2.2,1,1).p("AiLBeQARhmAog1QAZgjAjgOQAhgNAjALQAhAKATAbQAsBHgCA9QgCAlgKAY");
	this.shape_504.setTransform(764.3817,555.0781);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f().s("#000000").ss(2.2,1,1).p("AiDBXQARheAlgxQAYggAhgNQAegMAhAKQAeAJATAZQApBCgBA4QgBAhgJAX");
	this.shape_505.setTransform(764.8526,553.4477);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f().s("#000000").ss(2.2,1,1).p("Ah7BQQAQhWAkguQAWgdAegMQAdgLAeAJQAcAJASAXQAnA7gBA0QAAAfgIAV");
	this.shape_506.setTransform(765.3753,551.8351);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f().s("#000000").ss(2.2,1,1).p("AhzBJQAPhPAigpQAVgbAcgLQAagKAdAJQAZAIAQAUQAlA2AAAvQAAAcgGAU");
	this.shape_507.setTransform(765.85,550.2047);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f().s("#000000").ss(2.2,1,1).p("AhsBCQAQhHAfglQAUgYAagKQAXgJAaAIQAYAHAPASQAiAxACAqQAAAZgFAS");
	this.shape_508.setTransform(766.3771,548.5795);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f().s("#000000").ss(2.2,1,1).p("AhkA6QAPg/AeghQASgVAXgIQAWgIAXAGQAVAGAOARQAgArADAlQABAWgEAQ");
	this.shape_509.setTransform(766.8938,546.9543);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f().s("#000000").ss(2.2,1,1).p("AhdAzQAPg3AcgdQAQgSAVgIQAUgHAUAGQAUAGANANQAdAmAEAhQABATgCAP");
	this.shape_510.setTransform(767.4031,545.329);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f().s("#000000").ss(2.2,1,1).p("AhVAsQAOgvAagZQAPgQASgGQASgGASAEQARAFAMAMQAbAgAEAcQADARgCAM");
	this.shape_511.setTransform(767.9531,543.7036);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f().s("#000000").ss(2.2,1,1).p("AhOAlQAOgnAYgVQANgNARgFQAOgFAQADQAPAEALAKQAZAaAFAXQADAOAAAL");
	this.shape_512.setTransform(768.5286,542.0779);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f().s("#000000").ss(2.2,1,1).p("AhHAeQAOggAVgQQAMgKAPgFQAMgDAOACQAMADAKAIQAWAVAHASQADALABAJ");
	this.shape_513.setTransform(769.1,540.4479);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f().s("#000000").ss(2.2,1,1).p("AhAAXQANgYATgNQALgHAMgDQAKgDAMACQAKACAIAFQAUAPAIAOQAEAJACAH");
	this.shape_514.setTransform(769.7,538.835);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f().s("#000000").ss(2.2,1,1).p("Ag5APQANgQARgIQAJgFAKgCQAIgCAJABQAIACAHADQASAJAIAJQAFAGADAG");
	this.shape_515.setTransform(770.275,537.205);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f().s("#000000").ss(2.2,1,1).p("AAzAJQgMgKgTgEQgVgFgVAGQgQAEgMAI");
	this.shape_516.setTransform(770.875,535.5864);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f().s("#000000").ss(2.2,1,1).p("AANgDQgDgCgDAAQgEgBgDABQgJACgDAK");
	this.shape_517.setTransform(723.75,581.125);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f().s("#000000").ss(2.2,1,1).p("AgWAPQAFgVAMgHQAFgBADAAQAGABADACQAEADADAEQACADACACQAAAEAAAD");
	this.shape_518.setTransform(727.025,579.0438);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f().s("#000000").ss(2.2,1,1).p("AghAYQAHgkAUgJQAGgDAIACQAIACAEAEQAHAGADAIQADAEABAGQAAAGAAAF");
	this.shape_519.setTransform(730.3625,576.8969);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f().s("#000000").ss(2.2,1,1).p("AgtAhQAJgzAcgMQAJgEALADQAMAEAFAFQAIAKAEALQAEAHAAAIQABAKgCAH");
	this.shape_520.setTransform(733.705,574.7519);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4AqQAMhBAjgPQAMgGANAEQAPAGAHAHQAKANAFAOQAEAKAAALQAAAMgDAK");
	this.shape_521.setTransform(737.05,572.6408);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f().s("#000000").ss(2.2,1,1).p("AhDAxQANhPArgSQAPgHAQAFQASAHAIAJQAMAQAGASQAEAMAAAOQAAAQgEAL");
	this.shape_522.setTransform(740.4,570.6163);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f().s("#000000").ss(2.2,1,1).p("AhPA5QAQheAygVQASgIAUAGQAVAJAJALQAPATAFAVQAFAPAAAQQgBATgEAN");
	this.shape_523.setTransform(743.75,568.6167);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f().s("#000000").ss(2.2,1,1).p("AhaBBQAShuA5gXQAVgJAXAHQAYALAKAMQARAXAGAYQAFASAAATQgBAVgGAQ");
	this.shape_524.setTransform(747.1,566.6092);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f().s("#000000").ss(2.2,1,1).p("AhlBJQAUh8BAgbQAYgJAaAHQAbANALAOQATAaAHAcQAFAUAAAVQgBAZgHAR");
	this.shape_525.setTransform(750.4523,564.5846);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f().s("#000000").ss(2.2,1,1).p("AhxBQQAXiKBIgdQAagLAdAIQAeAOAMARQAWAcAIAgQAFAWgBAZQgBAbgIAU");
	this.shape_526.setTransform(753.8077,562.5897);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8BYQAYiZBQggQAdgNAgAKQAiAQANASQAXAgAJAjQAGAZgBAbQgCAfgJAV");
	this.shape_527.setTransform(757.1571,560.5778);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f().s("#000000").ss(2.2,1,1).p("AiHBfQAainBXgjQAhgOAiALQAlASAOATQAaAkAJAnQAGAbgBAdQgCAigJAX");
	this.shape_528.setTransform(760.515,558.5531);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f().s("#000000").ss(2.2,1,1).p("AiNBgQARhoAog3QAagjAjgOQAigOAkALQAhALAUAcQAsBIgDA+QgBAlgLAZ");
	this.shape_529.setTransform(764.2567,555.4531);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f().s("#000000").ss(2.2,1,1).p("AiHBaQARhiAngzQAYghAigOQAggMAiAKQAfAKATAaQArBEgCA7QgCAjgJAX");
	this.shape_530.setTransform(764.6295,554.2103);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f().s("#000000").ss(2.2,1,1).p("AiBBVQARhcAlgwQAXgfAggNQAegMAgAKQAeAKASAYQApA/gCA3QAAAhgJAX");
	this.shape_531.setTransform(765.0027,552.9901);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f().s("#000000").ss(2.2,1,1).p("Ah7BQQARhWAjgtQAXgeAegLQAcgLAeAJQAcAJASAWQAmA7AAA0QAAAegIAW");
	this.shape_532.setTransform(765.3753,551.7475);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f().s("#000000").ss(2.2,1,1).p("Ah1BKQAQhQAigqQAVgbAdgLQAagKAdAIQAaAJAQAUQAlA4ABAvQAAAdgHAU");
	this.shape_533.setTransform(765.775,550.4849);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f().s("#000000").ss(2.2,1,1).p("AhvBFQAQhKAggnQAUgZAbgKQAZgKAaAIQAZAIAPATQAkAzABAsQAAAagGAT");
	this.shape_534.setTransform(766.1769,549.2421);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f().s("#000000").ss(2.2,1,1).p("AhpA/QAPhEAfgjQATgXAZgJQAXgJAZAHQAXAHAOARQAiAvACAoQABAZgFAR");
	this.shape_535.setTransform(766.5583,547.9969);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f().s("#000000").ss(2.2,1,1).p("AhjA5QAPg+AdggQASgVAXgIQAVgIAXAGQAVAGAOAQQAgArADAkQABAXgEAP");
	this.shape_536.setTransform(766.96,546.7543);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f().s("#000000").ss(2.2,1,1).p("AhdA0QAPg4AbgdQARgTAWgIQATgHAVAGQAUAGANAOQAeAmADAhQACAUgDAP");
	this.shape_537.setTransform(767.34,545.529);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f().s("#000000").ss(2.2,1,1).p("AhYAvQAPgyAagbQAPgQAUgHQASgGATAFQASAFAMAMQAdAiAEAeQACARgCAO");
	this.shape_538.setTransform(767.75,544.2864);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f().s("#000000").ss(2.2,1,1).p("AhSApQAOgsAZgXQAOgPASgFQAQgGASAEQAQAFALALQAaAdAFAaQADAQgBAM");
	this.shape_539.setTransform(768.1643,543.0408);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f().s("#000000").ss(2.2,1,1).p("AhNAkQAOgmAXgUQAOgNAQgFQAOgEAQADQAOAEALAJQAYAZAGAXQADANgBAL");
	this.shape_540.setTransform(768.6036,541.7984);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f().s("#000000").ss(2.2,1,1).p("AhHAeQANggAWgRQAMgKAOgEQANgEAOADQAMADAKAHQAXAWAGASQADAMABAJ");
	this.shape_541.setTransform(769.075,540.5357);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f().s("#000000").ss(2.2,1,1).p("AhCAZQANgaAUgOQALgIANgEQALgDAMADQALACAJAGQAVARAHAPQADAJACAI");
	this.shape_542.setTransform(769.5,539.2932);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9ATQANgUATgLQAKgGALgCQAJgDAKACQAJACAIAEQATAMAIAMQAEAHADAH");
	this.shape_543.setTransform(769.975,538.0719);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f().s("#000000").ss(2.2,1,1).p("Ag3AOQAMgOASgIQAIgEAJgCQAIgBAIABQAIABAHACQARAJAJAHQAEAFADAG");
	this.shape_544.setTransform(770.4,536.83);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f().s("#000000").ss(2.2,1,1).p("AgaASQAGgaAPgIQAFgCAFABQAHABADADQAFAEADAFQACAEACADQAAAFAAAD");
	this.shape_545.setTransform(728.1375,578.3333);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f().s("#000000").ss(2.2,1,1).p("AgpAeQAJguAZgLQAIgEAKADQALADAEAFQAIAIAEAKQADAGABAIQAAAJgBAG");
	this.shape_546.setTransform(732.5813,575.4729);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f().s("#000000").ss(2.2,1,1).p("AhHA0QAOhVAtgTQARgHARAGQATAHAIAKQAOARAFATQAEANAAAPQAAAQgEAM");
	this.shape_547.setTransform(741.5,569.954);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f().s("#000000").ss(2.2,1,1).p("AhWA+QARhoA3gXQATgIAWAGQAXALAKAMQAQAVAHAXQAEARAAASQgBAVgFAO");
	this.shape_548.setTransform(746,567.2714);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f().s("#000000").ss(2.2,1,1).p("Ah0BSQAXiPBKgeQAcgLAdAJQAgAOAMARQAXAeAIAhQAFAXgBAZQgBAdgIAU");
	this.shape_549.setTransform(754.9327,561.9274);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f().s("#000000").ss(2.2,1,1).p("AiDBdQAaijBUgiQAggNAhALQAkARAOATQAZAiAJAmQAGAagCAcQgBAhgJAX");
	this.shape_550.setTransform(759.39,559.2404);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_503}]}).to({state:[{t:this.shape_504}]},1).to({state:[{t:this.shape_505}]},1).to({state:[{t:this.shape_506}]},1).to({state:[{t:this.shape_507}]},1).to({state:[{t:this.shape_508}]},1).to({state:[{t:this.shape_509}]},1).to({state:[{t:this.shape_510}]},1).to({state:[{t:this.shape_511}]},1).to({state:[{t:this.shape_512}]},1).to({state:[{t:this.shape_513}]},1).to({state:[{t:this.shape_514}]},1).to({state:[{t:this.shape_515}]},1).to({state:[{t:this.shape_516}]},1).to({state:[]},1).to({state:[{t:this.shape_517}]},11).to({state:[{t:this.shape_518}]},1).to({state:[{t:this.shape_519}]},1).to({state:[{t:this.shape_520}]},1).to({state:[{t:this.shape_521}]},1).to({state:[{t:this.shape_522}]},1).to({state:[{t:this.shape_523}]},1).to({state:[{t:this.shape_524}]},1).to({state:[{t:this.shape_525}]},1).to({state:[{t:this.shape_526}]},1).to({state:[{t:this.shape_527}]},1).to({state:[{t:this.shape_528}]},1).to({state:[{t:this.shape_503}]},1).to({state:[{t:this.shape_529}]},1).to({state:[{t:this.shape_530}]},1).to({state:[{t:this.shape_531}]},1).to({state:[{t:this.shape_532}]},1).to({state:[{t:this.shape_533}]},1).to({state:[{t:this.shape_534}]},1).to({state:[{t:this.shape_535}]},1).to({state:[{t:this.shape_536}]},1).to({state:[{t:this.shape_537}]},1).to({state:[{t:this.shape_538}]},1).to({state:[{t:this.shape_539}]},1).to({state:[{t:this.shape_540}]},1).to({state:[{t:this.shape_541}]},1).to({state:[{t:this.shape_542}]},1).to({state:[{t:this.shape_543}]},1).to({state:[{t:this.shape_544}]},1).to({state:[{t:this.shape_516}]},1).to({state:[]},1).to({state:[{t:this.shape_517}]},10).to({state:[{t:this.shape_545}]},1).to({state:[{t:this.shape_546}]},1).to({state:[{t:this.shape_521}]},1).to({state:[{t:this.shape_547}]},1).to({state:[{t:this.shape_548}]},1).to({state:[{t:this.shape_525}]},1).to({state:[{t:this.shape_549}]},1).to({state:[{t:this.shape_550}]},1).to({state:[{t:this.shape_503}]},1).wait(1));

	// p_4
	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f().s("#000000").ss(2.2,1,1).p("AgfCNQAmAQAvgOQAvgOAcgkQAfgngGguQgHg1g4gzQg+g4hhAEQgfABgfAHIgYAH");
	this.shape_551.setTransform(792.7736,582.8844);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f().s("#000000").ss(2.2,1,1).p("AiSh/QAMgDALgDQAdgHAdgBQBJgDA0AhQAOAJANALQA1AxAGAxQAFAmgVAhQgiAsgsAOQgpANgigM");
	this.shape_552.setTransform(795.7231,582.7861);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f().s("#000000").ss(2.2,1,1).p("AiKh6QALgCALgDQAcgGAbgBQBEgDAyAgQANAIAMALQAyAtAHAvQAEAkgTAfQggAqgpANQgnANgggL");
	this.shape_553.setTransform(798.6922,582.7055);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f().s("#000000").ss(2.2,1,1).p("AiChzQAKgDALgDQAagFAagBQBAgCAuAdQANAIALAKQAvAsAHAsQAEAigSAdQgeAogmANQgkAMgfgK");
	this.shape_554.setTransform(801.644,582.6236);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f().s("#000000").ss(2.2,1,1).p("Ah6htQAKgCAJgDQAZgFAYgBQA8gBAsAbQAMAIAKAJQAtApAGAqQAEAfgRAcQgbAmgkAMQgiALgcgJ");
	this.shape_555.setTransform(804.5971,582.5437);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f().s("#000000").ss(2.2,1,1).p("AhzhoQAKgCAJgCQAXgFAXAAQA4gBAoAaQALAHAKAJQAqAmAGAnQAEAdgQAaQgZAkgiALQgfALgagH");
	this.shape_556.setTransform(807.566,582.4502);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f().s("#000000").ss(2.2,1,1).p("AhrhiQAJgBAJgCQAVgFAVAAQA0gBAmAZQAKAGAJAJQAnAjAGAkQAEAcgOAYQgYAhgeALQgdALgYgH");
	this.shape_557.setTransform(810.5194,582.3723);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f().s("#000000").ss(2.2,1,1).p("AhjhbQAIgCAIgCQAUgEAUAAQAwAAAjAXQAJAGAJAIQAjAhAGAhQAEAZgNAXQgVAfgcALQgbAJgWgF");
	this.shape_558.setTransform(813.4721,582.2758);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f().s("#000000").ss(2.2,1,1).p("AhbhVQAIgCAHgBQATgEASABQArAAAgAVQAJAFAIAIQAhAeAFAeQAEAYgMAVQgTAcgZALQgYAJgUgF");
	this.shape_559.setTransform(816.4408,582.1969);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f().s("#000000").ss(2.2,1,1).p("AhThQQAHgBAGgBQARgDARAAQAnABAeATQAIAFAHAHQAeAcAFAcQAEAVgLATQgQAbgXAJQgWAJgSgE");
	this.shape_560.setTransform(819.4052,582.1115);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f().s("#000000").ss(2.2,1,1).p("AhLhKQAGgBAGgBQAQgCAPABQAjAAAaASQAIAFAGAGQAbAZAFAZQAEAUgJARQgPAYgUAJQgTAJgRgD");
	this.shape_561.setTransform(822.374,582.0341);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f().s("#000000").ss(2.2,1,1).p("AhDhDQAFgBAGgBQAOgCANABQAfABAYAQQAHAEAFAGQAYAWAFAXQAEARgIAQQgMAWgSAJQgRAHgPgC");
	this.shape_562.setTransform(825.3283,581.9398);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7g+QAFAAAFgBQAMgBAMABQAbABAVAOQAGAEAEAFQAWAUAEAUQAEAPgHAOQgKAUgPAIQgOAHgOgB");
	this.shape_563.setTransform(828.2863,581.8563);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0g4QAFgBAEAAQALAAAKAAQAXADASAMQAFAEAEAEQATARAEARQADAOgFAMQgIARgMAIQgMAHgLAA");
	this.shape_564.setTransform(831.2563,581.8);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f().s("#000000").ss(2.2,1,1).p("AgsgyQAEAAAEAAQAJgBAJACQATACAPALQAEADADAEQAQAOAEAPQADALgDAKQgGAPgKAIQgKAGgJAB");
	this.shape_565.setTransform(834.2192,581.7188);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f().s("#000000").ss(2.2,1,1).p("AgkgsQADAAAEAAQAHAAAHACQAPADAMAIQAEADADADQAMANAEAMQADAIgCAJQgEANgHAHQgHAGgHAC");
	this.shape_566.setTransform(837.1818,581.625);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f().s("#000000").ss(2.2,1,1).p("AgcgmQACAAADABQAGAAAGADQALACAJAIQACACACADQAKAJAEAKQADAGgBAHQgCALgEAGQgFAFgFAE");
	this.shape_567.setTransform(840.1643,581.5);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f().s("#000000").ss(2.2,1,1).p("AAPAgQAIgKgBgNQgCgNgPgOQgKgKgQgD");
	this.shape_568.setTransform(843.1738,581.375);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f().s("#000000").ss(2.2,1,1).p("AAAAfQAKgDAFgHQAHgIgCgKQgBgLgMgLQgKgLgRAA");
	this.shape_569.setTransform(753.2641,594.3375);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f().s("#000000").ss(2.2,1,1).p("AgdgmQADAAACAAQAHAAAGACQAMACAJAHQAEAEAEAEQAKAKABAMQABAJgEAHQgCAFgEAEQgDACgDADQgHAFgIAB");
	this.shape_570.setTransform(755.91,593.6);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f().s("#000000").ss(2.2,1,1).p("AgmgsQAEgBADAAQAJAAAIABQAPACAMAJQAGAEAEAEQANAOACAOQACANgGAJQgDAFgFAFQgEADgFADQgKAFgKAA");
	this.shape_571.setTransform(758.5161,592.8417);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f().s("#000000").ss(2.2,1,1).p("AgvgzQAEgBAEAAQALgBAJABQAUABAPAKQAHAFAFAGQARAQACARQABAQgHALQgEAGgHAGQgFAEgFACQgNAHgMgC");
	this.shape_572.setTransform(761.1563,592.0641);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f().s("#000000").ss(2.2,1,1).p("Ag3g6QAFgBAEgBQAMgBAMABQAXABASALQAIAGAHAGQAUAUACAUQACASgJANQgFAIgIAFQgGAFgHADQgQAHgOgD");
	this.shape_573.setTransform(763.7857,591.3);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f().s("#000000").ss(2.2,1,1).p("AhAhBQAFgBAFgBQAOgCANABQAcABAVANQAJAGAIAHQAXAWADAXQACAVgLAQQgGAIgJAHQgHAFgIADQgTAIgQgE");
	this.shape_574.setTransform(766.4344,590.5367);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f().s("#000000").ss(2.2,1,1).p("AhJhIQAGgBAGgBQAQgDAOABQAgAAAYAPQALAGAJAIQAaAaADAZQACAZgMARQgIAKgKAHQgIAFgJAEQgWAIgSgF");
	this.shape_575.setTransform(769.0388,589.7634);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f().s("#000000").ss(2.2,1,1).p("AhShPQAHgBAGgCQASgDAQABQAkAAAbAQQAMAHAKAJQAdAcAEAdQACAbgOATQgIALgMAIQgJAGgKAEQgZAJgVgH");
	this.shape_576.setTransform(771.6871,589.0077);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f().s("#000000").ss(2.2,1,1).p("AhbhVQAHgCAIgBQASgEATAAQAoAAAeARQANAHALALQAhAfAEAfQACAegQAVQgJANgNAIQgKAHgMAEQgbAKgXgI");
	this.shape_577.setTransform(774.3114,588.2357);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f().s("#000000").ss(2.2,1,1).p("AhkhcQAIgCAIgCQAUgEAVAAQAsgBAhATQAOAIAMALQAkAiAFAjQACAggSAXQgKAOgOAJQgLAHgNAFQgeAKgZgJ");
	this.shape_578.setTransform(776.9603,587.482);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f().s("#000000").ss(2.2,1,1).p("AhthjQAJgCAJgCQAWgFAWAAQAwgBAkAUQAPAIANAMQAoAlAFAmQACAkgTAYQgLAPgQAKQgMAIgOAEQghALgbgK");
	this.shape_579.setTransform(779.5642,586.7107);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2hqQAJgCAKgCQAYgFAXgBQA1gBAnAVQAQAJAOANQArAoAGAoQACAngVAbQgMAQgRALQgNAIgPAEQgkAMgdgL");
	this.shape_580.setTransform(782.2133,585.9358);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f().s("#000000").ss(2.2,1,1).p("Ah/hxQALgCAKgDQAZgFAagBQA4gCAqAXQASAKAPAOQAuAqAGAsQADApgXAdQgNARgSALQgOAJgRAFQgmANgggN");
	this.shape_581.setTransform(784.8423,585.1829);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f().s("#000000").ss(2.2,1,1).p("AiIh4QALgCALgDQAbgGAbgBQA9gCAtAYQATAKAQAPQAyAtAGAvQACAsgYAfQgOASgUAMQgPAJgRAGQgpANgjgO");
	this.shape_582.setTransform(787.4866,584.4237);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f().s("#000000").ss(2.2,1,1).p("AiRh+QAMgDAMgDQAdgHAdgBQBAgCAwAZQAUALASAQQA0AwAHAyQADAvgaAhQgPATgVANQgQAJgTAGQgsAOgkgP");
	this.shape_583.setTransform(790.0905,583.6432);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f().s("#000000").ss(2.2,1,1).p("AiUiBQAMgDALgDQAegHAdgBQBKgDA1AiQAOAIAMAMQA2AxAHAyQAFAngWAhQgiAtgsANQgqANgigM");
	this.shape_584.setTransform(795.0639,582.8257);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f().s("#000000").ss(2.2,1,1).p("AiOh8QAMgDALgDQAcgGAdgBQBGgDAyAgQAOAJAMALQA0AvAGAwQAFAlgUAgQghArgrANQgnANghgL");
	this.shape_585.setTransform(797.349,582.7484);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f().s("#000000").ss(2.2,1,1).p("AiIh3QALgDALgDQAbgGAbgBQBDgCAxAfQANAIALAKQAxAtAHAuQAFAkgUAeQgfAqgoAMQgmANgfgL");
	this.shape_586.setTransform(799.6422,582.6835);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f().s("#000000").ss(2.2,1,1).p("AiChzQALgCAKgDQAagGAaAAQBAgCAuAdQAMAIALAKQAvArAHAsQAEAigSAdQgdAngnANQgkAMgegK");
	this.shape_587.setTransform(801.919,582.6284);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8huQAKgCAKgDQAZgFAYgBQA9gBAsAcQAMAHAKAKQAtApAHAqQAEAggRAcQgcAmgkAMQgiALgdgJ");
	this.shape_588.setTransform(804.2131,582.5437);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f().s("#000000").ss(2.2,1,1).p("Ah1hqQAJgCAKgCQAXgFAYAAQA5gCAqAbQALAHAKAJQArAnAGAoQAEAfgQAaQgaAkgjAMQggALgbgI");
	this.shape_589.setTransform(806.4982,582.4895);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f().s("#000000").ss(2.2,1,1).p("AhvhlQAJgCAJgCQAWgFAWAAQA2gBAoAZQALAHAJAJQApAlAFAmQAFAcgPAaQgZAiggAMQgfAKgZgH");
	this.shape_590.setTransform(808.7769,582.4145);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f().s("#000000").ss(2.2,1,1).p("AhphhQAIgBAJgCQAVgEAVgBQAzAAAlAYQALAGAIAIQAnAjAFAkQAEAbgOAYQgXAhgeALQgcAKgYgG");
	this.shape_591.setTransform(811.0694,582.3525);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f().s("#000000").ss(2.2,1,1).p("AhjhcQAIgBAIgCQAUgEAUAAQAwAAAjAWQAKAHAIAHQAkAhAFAiQAEAagNAWQgVAfgcALQgbAKgWgG");
	this.shape_592.setTransform(813.3471,582.297);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f().s("#000000").ss(2.2,1,1).p("AhdhXQAHgCAIgBQATgEASAAQAtAAAhAWQAJAGAIAHQAhAfAGAfQAEAYgMAWQgUAdgaAKQgZAKgVgF");
	this.shape_593.setTransform(815.65,582.2112);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f().s("#000000").ss(2.2,1,1).p("AhXhTQAHgBAHgBQASgDARAAQAqAAAfAUQAIAGAHAHQAgAdAFAdQAEAWgLAUQgSAcgYAKQgXAJgTgE");
	this.shape_594.setTransform(817.9422,582.1615);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f().s("#000000").ss(2.2,1,1).p("AhRhOQAHgBAHgBQAQgDAQABQAnAAAcATQAIAFAHAHQAdAbAFAbQAEAVgKASQgQAagWAKQgVAIgSgD");
	this.shape_595.setTransform(820.1954,582.0969);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f().s("#000000").ss(2.2,1,1).p("AhLhJQAHgBAGgBQAPgDAPABQAjABAbARQAHAFAGAGQAbAZAFAZQAEATgJASQgPAYgUAJQgTAIgQgD");
	this.shape_596.setTransform(822.499,582.0117);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f().s("#000000").ss(2.2,1,1).p("AhFhFQAGgBAGgBQAOgCAOABQAgABAYAQQAGAFAGAGQAZAXAFAWQADASgIAQQgMAXgTAIQgRAIgPgC");
	this.shape_597.setTransform(824.7783,581.9533);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f().s("#000000").ss(2.2,1,1).p("Ag/hAQAGgBAFAAQANgCAMABQAdABAWAPQAGAEAFAGQAXAVAFAUQADARgHAOQgLAVgQAIQgPAIgPgC");
	this.shape_598.setTransform(827.07,581.8925);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f().s("#000000").ss(2.2,1,1).p("Ag5g7QAFgBAFgBQAMgBALABQAaACATANQAGAEAEAFQAVATAEATQADAOgFAOQgKATgOAIQgNAHgNgB");
	this.shape_599.setTransform(829.3529,581.8267);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f().s("#000000").ss(2.2,1,1).p("Agyg3QAEAAAFgBQAKgBAKACQAWACASAMQAFADAEAFQASARAEAQQAEANgFAMQgIARgMAIQgMAHgLAA");
	this.shape_600.setTransform(831.6471,581.78);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f().s("#000000").ss(2.2,1,1).p("AgsgzQAEAAAEAAQAJAAAJABQATACAPALQAFADADAEQAQAPAEAPQADALgDALQgHAPgKAIQgJAGgKAB");
	this.shape_601.setTransform(833.9442,581.7167);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f().s("#000000").ss(2.2,1,1).p("AgmguQADAAAEAAQAIAAAHABQAQADANAJQAEADADAEQAOANAEANQADAJgDAJQgEAOgIAHQgIAGgIAC");
	this.shape_602.setTransform(836.2318,581.65);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f().s("#000000").ss(2.2,1,1).p("AgggpQADABADAAQAHAAAGACQANADALAIQADACACADQAMALAEALQACAIgBAIQgDAMgGAGQgGAGgGAC");
	this.shape_603.setTransform(838.5281,581.55);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgkQADAAACAAQAGABAFACQALADAHAHQADACACADQAJAJAEAJQADAFgBAHQgBAKgEAHQgEAFgFAD");
	this.shape_604.setTransform(840.8536,581.475);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f().s("#000000").ss(2.2,1,1).p("AgfgnQADgBADABQAHgBAHACQANACAJAIQAFADAEAEQAKAMACAMQABAKgEAIQgDAEgEAEQgDADgEACQgIAGgIAA");
	this.shape_605.setTransform(756.535,593.4125);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f().s("#000000").ss(2.2,1,1).p("AgqgwQAEAAAEAAQAJgBAJABQARACAOAJQAGAFAFAFQAPAPACAPQABAOgGALQgEAGgGAEQgEAEgFADQgMAGgLgB");
	this.shape_606.setTransform(759.8391,592.4488);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1g5QAFAAAEgBQAMgBALABQAWABASALQAHAFAHAHQATASACATQACASgJANQgFAHgHAGQgGAEgHADQgPAHgOgC");
	this.shape_607.setTransform(763.1363,591.5129);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f().s("#000000").ss(2.2,1,1).p("AhMhJQAHgCAGgBQAQgCAPAAQAhAAAZAPQAKAHAKAIQAbAaADAbQACAYgNASQgHAKgLAIQgIAFgKAEQgWAJgTgG");
	this.shape_608.setTransform(769.7133,589.583);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f().s("#000000").ss(2.2,1,1).p("AhXhSQAHgBAHgCQASgDASAAQAmAAAcAQQANAIAKAJQAfAeAEAeQACAdgPAUQgIALgNAJQgJAGgLAEQgaAJgWgH");
	this.shape_609.setTransform(773.0118,588.6235);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f().s("#000000").ss(2.2,1,1).p("AhihbQAIgBAIgCQAUgEAUAAQArgBAgATQAOAHAMALQAjAhAFAiQACAhgRAWQgKANgOAJQgLAHgMAEQgeALgYgJ");
	this.shape_610.setTransform(776.2855,587.6645);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f().s("#000000").ss(2.2,1,1).p("Ah4hsQAKgCAJgDQAZgFAYAAQA1gCAoAWQAQAJAPAOQAsAoAFApQADAogWAbQgMAQgRALQgOAIgPAFQglAMgegL");
	this.shape_611.setTransform(782.888,585.7766);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f().s("#000000").ss(2.2,1,1).p("AiEh0QALgCAKgDQAbgGAagBQA7gCArAYQASAKAQAOQAwAsAGAtQADArgYAeQgOARgSAMQgPAJgRAFQgoANghgN");
	this.shape_612.setTransform(786.162,584.7955);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f().s("#000000").ss(2.2,1,1).p("AiPh9QAMgCALgEQAdgGAcgBQA/gCAwAZQAUALARAPQA0AwAGAwQADAvgaAgQgPATgUANQgQAJgSAGQgsAOgjgP");
	this.shape_613.setTransform(789.4655,583.843);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_551}]}).to({state:[{t:this.shape_552}]},1).to({state:[{t:this.shape_553}]},1).to({state:[{t:this.shape_554}]},1).to({state:[{t:this.shape_555}]},1).to({state:[{t:this.shape_556}]},1).to({state:[{t:this.shape_557}]},1).to({state:[{t:this.shape_558}]},1).to({state:[{t:this.shape_559}]},1).to({state:[{t:this.shape_560}]},1).to({state:[{t:this.shape_561}]},1).to({state:[{t:this.shape_562}]},1).to({state:[{t:this.shape_563}]},1).to({state:[{t:this.shape_564}]},1).to({state:[{t:this.shape_565}]},1).to({state:[{t:this.shape_566}]},1).to({state:[{t:this.shape_567}]},1).to({state:[{t:this.shape_568}]},1).to({state:[]},1).to({state:[{t:this.shape_569}]},4).to({state:[{t:this.shape_570}]},1).to({state:[{t:this.shape_571}]},1).to({state:[{t:this.shape_572}]},1).to({state:[{t:this.shape_573}]},1).to({state:[{t:this.shape_574}]},1).to({state:[{t:this.shape_575}]},1).to({state:[{t:this.shape_576}]},1).to({state:[{t:this.shape_577}]},1).to({state:[{t:this.shape_578}]},1).to({state:[{t:this.shape_579}]},1).to({state:[{t:this.shape_580}]},1).to({state:[{t:this.shape_581}]},1).to({state:[{t:this.shape_582}]},1).to({state:[{t:this.shape_583}]},1).to({state:[{t:this.shape_551}]},1).to({state:[{t:this.shape_584}]},1).to({state:[{t:this.shape_585}]},1).to({state:[{t:this.shape_586}]},1).to({state:[{t:this.shape_587}]},1).to({state:[{t:this.shape_588}]},1).to({state:[{t:this.shape_589}]},1).to({state:[{t:this.shape_590}]},1).to({state:[{t:this.shape_591}]},1).to({state:[{t:this.shape_592}]},1).to({state:[{t:this.shape_593}]},1).to({state:[{t:this.shape_594}]},1).to({state:[{t:this.shape_595}]},1).to({state:[{t:this.shape_596}]},1).to({state:[{t:this.shape_597}]},1).to({state:[{t:this.shape_598}]},1).to({state:[{t:this.shape_599}]},1).to({state:[{t:this.shape_600}]},1).to({state:[{t:this.shape_601}]},1).to({state:[{t:this.shape_602}]},1).to({state:[{t:this.shape_603}]},1).to({state:[{t:this.shape_604}]},1).to({state:[{t:this.shape_568}]},1).to({state:[]},1).to({state:[{t:this.shape_569}]},2).to({state:[{t:this.shape_605}]},1).to({state:[{t:this.shape_606}]},1).to({state:[{t:this.shape_607}]},1).to({state:[{t:this.shape_574}]},1).to({state:[{t:this.shape_608}]},1).to({state:[{t:this.shape_609}]},1).to({state:[{t:this.shape_610}]},1).to({state:[{t:this.shape_579}]},1).to({state:[{t:this.shape_611}]},1).to({state:[{t:this.shape_612}]},1).to({state:[{t:this.shape_613}]},1).to({state:[{t:this.shape_551}]},1).wait(1));

	// p_5
	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f().s("#000000").ss(2.2,1,1).p("Aimg0QAdBNBJApQBAAlBEgHQBEgIAWgwQAag1gwhT");
	this.shape_614.setTransform(775.9787,606.6882);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f().s("#000000").ss(2.2,1,1).p("AiZgqQAXA2AtAiQANAKAPAIQA8AhA+gJQA/gMASgpQAWgxgrhK");
	this.shape_615.setTransform(778.7085,607.0976);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f().s("#000000").ss(2.2,1,1).p("AiLgfQAWAwAqAeQANAJANAHQA4AbA3gJQA4gMAQgmQATgtgohE");
	this.shape_616.setTransform(781.4445,607.422);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f().s("#000000").ss(2.2,1,1).p("Ah9gUQAUAqAnAaQAMAHAMAGQAzAXAxgLQAygLANgjQARgpglg+");
	this.shape_617.setTransform(784.2294,607.7754);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f().s("#000000").ss(2.2,1,1).p("AhwgJQAUAkAkAWQAKAGAMAEQAuATArgMQArgLALggQANgmghg3");
	this.shape_618.setTransform(786.9689,608.1323);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f().s("#000000").ss(2.2,1,1).p("AhiABQATAfAhARQAJAFAKADQAqAPAlgNQAkgMAIgdQALghgegx");
	this.shape_619.setTransform(789.7111,608.5073);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f().s("#000000").ss(2.2,1,1).p("AhVALQATAaAdAMQAJAEAIADQAmAJAegOQAegMAGgZQAHgegbgq");
	this.shape_620.setTransform(792.4565,608.892);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f().s("#000000").ss(2.2,1,1).p("AhHAVQASAUAaAIQAHACAIACQAhAFAYgPQAXgMADgWQAFgagYgk");
	this.shape_621.setTransform(795.2112,609.3375);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f().s("#000000").ss(2.2,1,1).p("Ag6AeQARAOAXAEQAGABAHAAQAcABASgQQARgMABgUQABgWgUgd");
	this.shape_622.setTransform(798.0301,609.8529);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f().s("#000000").ss(2.2,1,1).p("AgtAnQARAHATAAQAGAAAEgBQAZgEALgRQALgMgCgPQgCgTgRgX");
	this.shape_623.setTransform(800.841,610.475);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f().s("#000000").ss(2.2,1,1).p("AghAtQAQABAQgEQAbgIAHgWQAHgYgagg");
	this.shape_624.setTransform(803.7492,611.3188);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f().s("#000000").ss(2.2,1,1).p("AgUAHQAEADAFACQANAGAJgGQAKgHgBgT");
	this.shape_625.setTransform(729.6543,602.044);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f().s("#000000").ss(2.2,1,1).p("AgeADQAFAFAGAFQAHAEAGACQALADAKgEQALgEADgKQAEgJgEgO");
	this.shape_626.setTransform(732.9375,602.3317);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f().s("#000000").ss(2.2,1,1).p("AgogBQAFAHAIAGQAIAHAJADQAOAGAPgEQAPgFAFgMQAGgMgHgU");
	this.shape_627.setTransform(736.246,602.655);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f().s("#000000").ss(2.2,1,1).p("AgzgFQAGAKAJAIQAKAIALAFQASAJATgFQAUgFAHgPQAHgQgLgZ");
	this.shape_628.setTransform(739.565,602.9779);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f().s("#000000").ss(2.2,1,1).p("Ag9gJQAHALAKAKQALALAOAHQAWAKAWgEQAagFAIgSQAJgTgOgf");
	this.shape_629.setTransform(742.8761,603.3052);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f().s("#000000").ss(2.2,1,1).p("AhIgNQAIAOALAMQANANAQAIQAaANAbgEQAfgGAJgVQALgXgSgj");
	this.shape_630.setTransform(746.1873,603.6471);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f().s("#000000").ss(2.2,1,1).p("AhSgSQAIASANAMQAOAQATAJQAeAQAfgEQAjgGALgZQAMgZgUgp");
	this.shape_631.setTransform(749.4867,603.991);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f().s("#000000").ss(2.2,1,1).p("AhdgWQAJATAOAPQAQARAVALQAiASAjgEQAogGANgbQAOgegYgt");
	this.shape_632.setTransform(752.8329,604.3614);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f().s("#000000").ss(2.2,1,1).p("AhngaQAJAWAQAQQARATAYANQAlAVAngFQAugGAOgeQAPghgbgz");
	this.shape_633.setTransform(756.1294,604.6905);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f().s("#000000").ss(2.2,1,1).p("AhygfQALAZAQASQATAVAaAPQAqAXArgFQAygHAQghQARgkgfg4");
	this.shape_634.setTransform(759.4292,605.0368);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8gjQALAbASAUQAUAXAdAQQAuAaAvgFQA3gHARgkQATgogig9");
	this.shape_635.setTransform(762.7406,605.3838);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f().s("#000000").ss(2.2,1,1).p("AiHgoQAMAdATAWQAWAaAfASQAyAbAzgEQA8gHASgoQAVgqglhD");
	this.shape_636.setTransform(766.0519,605.7254);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f().s("#000000").ss(2.2,1,1).p("AiRgsQAMAfAVAYQAXAcAiATQA2AeA2gEQBCgIATgqQAXgugphI");
	this.shape_637.setTransform(769.3736,606.0543);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f().s("#000000").ss(2.2,1,1).p("AicgxQANAiAWAaQAZAeAkAVQA6AgA7gEQBGgIAVgtQAZgygthN");
	this.shape_638.setTransform(772.685,606.4024);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f().s("#000000").ss(2.2,1,1).p("AicgtQAXA4AuAjQAOAKAPAIQA9AiA+gJQBBgLATgqQAXgygshM");
	this.shape_639.setTransform(778.0811,607.036);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f().s("#000000").ss(2.2,1,1).p("AiRgkQAWAzAsAgQAMAJAPAHQA5AeA6gJQA8gMAQgnQAVgvgphH");
	this.shape_640.setTransform(780.1778,607.2892);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f().s("#000000").ss(2.2,1,1).p("AiHgbQAVAuAqAcQAMAJANAGQA2AbA1gKQA3gMAPglQASgsgnhC");
	this.shape_641.setTransform(782.32,607.537);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f().s("#000000").ss(2.2,1,1).p("Ah8gTQAVApAmAaQALAHANAGQAyAXAxgLQAxgMANgjQAQgpgkg9");
	this.shape_642.setTransform(784.4188,607.8029);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f().s("#000000").ss(2.2,1,1).p("AhygLQAVAlAkAWQAKAHAMAFQAvATAsgMQAsgLALghQAOgmgig4");
	this.shape_643.setTransform(786.5292,608.0786);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f().s("#000000").ss(2.2,1,1).p("AhngDQAUAhAhATQAKAFALAEQArAQAngNQAngLAJgeQAMgjgfgz");
	this.shape_644.setTransform(788.6405,608.3664);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f().s("#000000").ss(2.2,1,1).p("AhdAFQATAdAfAPQAJAFAKADQAoAMAigNQAjgMAHgbQAJgggdgv");
	this.shape_645.setTransform(790.7816,608.6314);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f().s("#000000").ss(2.2,1,1).p("AhSANQASAYAdAMQAIADAJADQAlAJAdgOQAdgMAFgZQAHgdgagq");
	this.shape_646.setTransform(792.8981,608.9511);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f().s("#000000").ss(2.2,1,1).p("AhIAVQASAUAaAIQAIADAHABQAiAGAYgPQAYgMADgXQAFgagYgk");
	this.shape_647.setTransform(795.0181,609.2988);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+AcQASAPAXAGQAHABAHABQAeACAUgQQATgMABgVQACgXgVgf");
	this.shape_648.setTransform(797.1383,609.6861);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f().s("#000000").ss(2.2,1,1).p("Ag0AjQARALAVACQAGAAAGAAQAagBAPgRQAOgMAAgSQAAgUgTgb");
	this.shape_649.setTransform(799.3259,610.1);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f().s("#000000").ss(2.2,1,1).p("AgqApQAQAGASgBQAGgBAEgBQAYgFAKgRQAJgMgDgPQgCgSgQgW");
	this.shape_650.setTransform(801.5034,610.6321);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f().s("#000000").ss(2.2,1,1).p("AghACQAFAGAHAEQAHAFAHADQALAEALgEQANgFAEgKQAEgKgFgQ");
	this.shape_651.setTransform(733.8639,602.425);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f().s("#000000").ss(2.2,1,1).p("AgugDQAGAIAIAIQAJAHAKAFQAQAHARgEQATgFAFgOQAHgOgJgX");
	this.shape_652.setTransform(738.0613,602.8227);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7gIQAGALAKAJQALALANAGQAWAKAWgEQAYgFAIgSQAJgSgOge");
	this.shape_653.setTransform(742.2892,603.2552);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f().s("#000000").ss(2.2,1,1).p("AhJgOQAIAPAMALQAMAOARAIQAaANAbgEQAfgGAKgVQALgXgSgk");
	this.shape_654.setTransform(746.4836,603.6957);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f().s("#000000").ss(2.2,1,1).p("AhWgTQAIASANANQAPAQAUAKQAfARAggEQAmgHALgZQANgbgWgq");
	this.shape_655.setTransform(750.7164,604.139);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f().s("#000000").ss(2.2,1,1).p("AhjgZQAJAWAPAPQARATAXAMQAkAUAmgFQArgGANgdQAPgggagx");
	this.shape_656.setTransform(754.8994,604.5422);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f().s("#000000").ss(2.2,1,1).p("AhxgeQALAYAQASQATAVAaAPQApAWArgEQAygHAPghQARgkgeg3");
	this.shape_657.setTransform(759.1324,604.9875);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f().s("#000000").ss(2.2,1,1).p("Ah+gkQALAbASAVQAVAYAdAQQAvAaAvgFQA5gHAQglQAUgogjg+");
	this.shape_658.setTransform(763.3271,605.4338);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f().s("#000000").ss(2.2,1,1).p("AiMgqQAMAfAUAWQAXAbAgASQA0AdA0gEQA/gIATgoQAVgtgnhE");
	this.shape_659.setTransform(767.557,605.8802);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f().s("#000000").ss(2.2,1,1).p("AiZgwQANAiAVAZQAZAeAjAUQA5AgA6gFQBFgIAUgsQAYgxgrhL");
	this.shape_660.setTransform(771.7549,606.3027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_614}]}).to({state:[{t:this.shape_615}]},1).to({state:[{t:this.shape_616}]},1).to({state:[{t:this.shape_617}]},1).to({state:[{t:this.shape_618}]},1).to({state:[{t:this.shape_619}]},1).to({state:[{t:this.shape_620}]},1).to({state:[{t:this.shape_621}]},1).to({state:[{t:this.shape_622}]},1).to({state:[{t:this.shape_623}]},1).to({state:[{t:this.shape_624}]},1).to({state:[]},1).to({state:[{t:this.shape_625}]},12).to({state:[{t:this.shape_626}]},1).to({state:[{t:this.shape_627}]},1).to({state:[{t:this.shape_628}]},1).to({state:[{t:this.shape_629}]},1).to({state:[{t:this.shape_630}]},1).to({state:[{t:this.shape_631}]},1).to({state:[{t:this.shape_632}]},1).to({state:[{t:this.shape_633}]},1).to({state:[{t:this.shape_634}]},1).to({state:[{t:this.shape_635}]},1).to({state:[{t:this.shape_636}]},1).to({state:[{t:this.shape_637}]},1).to({state:[{t:this.shape_638}]},1).to({state:[{t:this.shape_614}]},1).to({state:[{t:this.shape_639}]},1).to({state:[{t:this.shape_640}]},1).to({state:[{t:this.shape_641}]},1).to({state:[{t:this.shape_642}]},1).to({state:[{t:this.shape_643}]},1).to({state:[{t:this.shape_644}]},1).to({state:[{t:this.shape_645}]},1).to({state:[{t:this.shape_646}]},1).to({state:[{t:this.shape_647}]},1).to({state:[{t:this.shape_648}]},1).to({state:[{t:this.shape_649}]},1).to({state:[{t:this.shape_650}]},1).to({state:[{t:this.shape_624}]},1).to({state:[]},1).to({state:[{t:this.shape_625}]},12).to({state:[{t:this.shape_651}]},1).to({state:[{t:this.shape_652}]},1).to({state:[{t:this.shape_653}]},1).to({state:[{t:this.shape_654}]},1).to({state:[{t:this.shape_655}]},1).to({state:[{t:this.shape_656}]},1).to({state:[{t:this.shape_657}]},1).to({state:[{t:this.shape_658}]},1).to({state:[{t:this.shape_659}]},1).to({state:[{t:this.shape_660}]},1).to({state:[{t:this.shape_614}]},1).wait(1));

	// p_6
	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f().s("#000000").ss(2.2,1,1).p("Agog0QAzAUASAZQATAZgMAj");
	this.shape_661.setTransform(780.573,585.775);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f().s("#000000").ss(2.2,1,1).p("AglgxQAvATASAXQASAZgMAh");
	this.shape_662.setTransform(781.8492,584.8);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f().s("#000000").ss(2.2,1,1).p("AgjgvQAtASAQAWQARAXgLAg");
	this.shape_663.setTransform(783.132,583.85);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f().s("#000000").ss(2.2,1,1).p("AghgsQAqARAPAVQAQAVgKAe");
	this.shape_664.setTransform(784.408,582.875);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f().s("#000000").ss(2.2,1,1).p("AgfgpQAnAQAPAUQAPATgKAc");
	this.shape_665.setTransform(785.6592,581.875);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f().s("#000000").ss(2.2,1,1).p("AgdgmQAlAPAOASQANATgJAZ");
	this.shape_666.setTransform(786.93,580.9);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgjQAiANANARQANARgJAY");
	this.shape_667.setTransform(788.218,579.95);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f().s("#000000").ss(2.2,1,1).p("AgYggQAfAMAMAQQALAPgHAW");
	this.shape_668.setTransform(789.498,578.975);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f().s("#000000").ss(2.2,1,1).p("AgWgdQAcALALAOQAKAOgHAU");
	this.shape_669.setTransform(790.765,578);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f().s("#000000").ss(2.2,1,1).p("AgUgbQAZAKAKAOQAKAMgHAT");
	this.shape_670.setTransform(792.053,577.05);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f().s("#000000").ss(2.2,1,1).p("AgSgYQAXAJAJAMQAIALgGAR");
	this.shape_671.setTransform(793.3241,576.075);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f().s("#000000").ss(2.2,1,1).p("AgQgVQAVAJAHAKQAIAJgFAP");
	this.shape_672.setTransform(794.575,575.075);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f().s("#000000").ss(2.2,1,1).p("AgOgSQASAIAGAIQAHAIgEAN");
	this.shape_673.setTransform(795.8512,574.1);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f().s("#000000").ss(2.2,1,1).p("AgLgPQAPAGAFAHQAGAHgEAL");
	this.shape_674.setTransform(797.1342,573.15);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f().s("#000000").ss(2.2,1,1).p("AgJgMQAMAFAEAGQAFAFgDAJ");
	this.shape_675.setTransform(798.41,572.175);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f().s("#000000").ss(2.2,1,1).p("AgFgFQAIAFADAG");
	this.shape_676.setTransform(735.525,589.825);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f().s("#000000").ss(2.2,1,1).p("AgIgIQAIAEAEAEQAEAEABAF");
	this.shape_677.setTransform(738.725,589.525);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f().s("#000000").ss(2.2,1,1).p("AgKgMQAKAFAGAHQAFAFAAAI");
	this.shape_678.setTransform(741.9273,589.25);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f().s("#000000").ss(2.2,1,1).p("AgMgPQANAGAHAIQAHAHgCAK");
	this.shape_679.setTransform(745.1391,588.95);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f().s("#000000").ss(2.2,1,1).p("AgPgSQARAHAIAJQAHAJgCAM");
	this.shape_680.setTransform(748.3563,588.675);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f().s("#000000").ss(2.2,1,1).p("AgRgWQAUAJAJALQAJAKgEAP");
	this.shape_681.setTransform(751.574,588.375);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f().s("#000000").ss(2.2,1,1).p("AgTgZQAXAKAKAMQAKAMgFAR");
	this.shape_682.setTransform(754.7973,588.1);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f().s("#000000").ss(2.2,1,1).p("AgWgcQAbALALAOQALAOgGAT");
	this.shape_683.setTransform(758.0167,587.8);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f().s("#000000").ss(2.2,1,1).p("AgZggQAfANAMAPQAMAPgGAW");
	this.shape_684.setTransform(761.2362,587.5);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgjQAhANAOASQANARgIAX");
	this.shape_685.setTransform(764.4622,587.225);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f().s("#000000").ss(2.2,1,1).p("AgegnQAlAPAPATQAOATgIAa");
	this.shape_686.setTransform(767.6821,586.925);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f().s("#000000").ss(2.2,1,1).p("AgggqQAoAQAPAUQAQAVgKAc");
	this.shape_687.setTransform(770.9055,586.65);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f().s("#000000").ss(2.2,1,1).p("AgjgtQAsARAQAWQARAWgKAe");
	this.shape_688.setTransform(774.1255,586.35);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f().s("#000000").ss(2.2,1,1).p("AglgxQAvATARAXQASAYgMAh");
	this.shape_689.setTransform(777.353,586.075);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f().s("#000000").ss(2.2,1,1).p("AgmgyQAwAUASAXQASAZgMAh");
	this.shape_690.setTransform(781.5611,585);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f().s("#000000").ss(2.2,1,1).p("AglgwQAvASARAXQARAYgLAg");
	this.shape_691.setTransform(782.553,584.275);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f().s("#000000").ss(2.2,1,1).p("AgjgtQAsARAQAWQARAWgLAe");
	this.shape_692.setTransform(783.5542,583.5);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f().s("#000000").ss(2.2,1,1).p("AghgsQAqARAQAVQAPAVgKAe");
	this.shape_693.setTransform(784.537,582.75);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f().s("#000000").ss(2.2,1,1).p("AgfgpQAoAQAOAUQAPAUgKAb");
	this.shape_694.setTransform(785.525,582);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f().s("#000000").ss(2.2,1,1).p("AgegnQAmAPAOATQAOATgJAa");
	this.shape_695.setTransform(786.513,581.25);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f().s("#000000").ss(2.2,1,1).p("AgcglQAkAPANARQANASgJAZ");
	this.shape_696.setTransform(787.518,580.475);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f().s("#000000").ss(2.2,1,1).p("AgagiQAhAMAMARQANARgIAX");
	this.shape_697.setTransform(788.5061,579.75);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f().s("#000000").ss(2.2,1,1).p("AgXgeQAdAMALAOQALAOgHAV");
	this.shape_698.setTransform(790.477,578.2);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f().s("#000000").ss(2.2,1,1).p("AgVgcQAbALAKANQAKAOgHAT");
	this.shape_699.setTransform(791.465,577.475);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f().s("#000000").ss(2.2,1,1).p("AgTgaQAYAKAKANQAJAMgGAR");
	this.shape_700.setTransform(792.47,576.7);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f().s("#000000").ss(2.2,1,1).p("AgSgYQAXAKAIALQAJALgGAQ");
	this.shape_701.setTransform(793.458,575.95);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f().s("#000000").ss(2.2,1,1).p("AgQgVQAVAIAHAKQAIALgFAO");
	this.shape_702.setTransform(794.4462,575.2);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f().s("#000000").ss(2.2,1,1).p("AgOgTQASAHAHAJQAHAJgFAO");
	this.shape_703.setTransform(795.4292,574.45);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f().s("#000000").ss(2.2,1,1).p("AgMgRQAQAHAGAIQAGAIgEAM");
	this.shape_704.setTransform(796.43,573.675);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f().s("#000000").ss(2.2,1,1).p("AgLgPQAOAGAGAHQAFAHgEAK");
	this.shape_705.setTransform(797.4221,572.95);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f().s("#000000").ss(2.2,1,1).p("AgIgJQAIAEAEAFQAFAEAAAG");
	this.shape_706.setTransform(739.6,589.45);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f().s("#000000").ss(2.2,1,1).p("AgLgNQAMAFAGAHQAGAHgBAJ");
	this.shape_707.setTransform(743.6821,589.1);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f().s("#000000").ss(2.2,1,1).p("AgOgSQAQAIAIAJQAHAIgCAM");
	this.shape_708.setTransform(747.7722,588.725);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f().s("#000000").ss(2.2,1,1).p("AgRgWQAUAJAJALQAJALgEAO");
	this.shape_709.setTransform(751.876,588.35);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f().s("#000000").ss(2.2,1,1).p("AgVgaQAZAKALANQAKANgFAR");
	this.shape_710.setTransform(755.9583,587.975);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f().s("#000000").ss(2.2,1,1).p("AgYgfQAdAMAMAPQAMAPgGAV");
	this.shape_711.setTransform(760.075,587.625);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgjQAhANANASQAOARgIAX");
	this.shape_712.setTransform(764.1589,587.25);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f().s("#000000").ss(2.2,1,1).p("AgegnQAlAPAPATQAPATgJAa");
	this.shape_713.setTransform(768.2688,586.875);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f().s("#000000").ss(2.2,1,1).p("AghgsQAqARAPAWQAQAUgKAe");
	this.shape_714.setTransform(772.3673,586.5);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f().s("#000000").ss(2.2,1,1).p("AglgwQAvATARAWQARAYgLAg");
	this.shape_715.setTransform(776.4623,586.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_661}]}).to({state:[{t:this.shape_662}]},1).to({state:[{t:this.shape_663}]},1).to({state:[{t:this.shape_664}]},1).to({state:[{t:this.shape_665}]},1).to({state:[{t:this.shape_666}]},1).to({state:[{t:this.shape_667}]},1).to({state:[{t:this.shape_668}]},1).to({state:[{t:this.shape_669}]},1).to({state:[{t:this.shape_670}]},1).to({state:[{t:this.shape_671}]},1).to({state:[{t:this.shape_672}]},1).to({state:[{t:this.shape_673}]},1).to({state:[{t:this.shape_674}]},1).to({state:[{t:this.shape_675}]},1).to({state:[]},1).to({state:[{t:this.shape_676}]},8).to({state:[{t:this.shape_677}]},1).to({state:[{t:this.shape_678}]},1).to({state:[{t:this.shape_679}]},1).to({state:[{t:this.shape_680}]},1).to({state:[{t:this.shape_681}]},1).to({state:[{t:this.shape_682}]},1).to({state:[{t:this.shape_683}]},1).to({state:[{t:this.shape_684}]},1).to({state:[{t:this.shape_685}]},1).to({state:[{t:this.shape_686}]},1).to({state:[{t:this.shape_687}]},1).to({state:[{t:this.shape_688}]},1).to({state:[{t:this.shape_689}]},1).to({state:[{t:this.shape_661}]},1).to({state:[{t:this.shape_690}]},1).to({state:[{t:this.shape_691}]},1).to({state:[{t:this.shape_692}]},1).to({state:[{t:this.shape_693}]},1).to({state:[{t:this.shape_694}]},1).to({state:[{t:this.shape_695}]},1).to({state:[{t:this.shape_696}]},1).to({state:[{t:this.shape_697}]},1).to({state:[{t:this.shape_668}]},1).to({state:[{t:this.shape_698}]},1).to({state:[{t:this.shape_699}]},1).to({state:[{t:this.shape_700}]},1).to({state:[{t:this.shape_701}]},1).to({state:[{t:this.shape_702}]},1).to({state:[{t:this.shape_703}]},1).to({state:[{t:this.shape_704}]},1).to({state:[{t:this.shape_705}]},1).to({state:[{t:this.shape_675}]},1).to({state:[]},1).to({state:[{t:this.shape_676}]},7).to({state:[{t:this.shape_706}]},1).to({state:[{t:this.shape_707}]},1).to({state:[{t:this.shape_708}]},1).to({state:[{t:this.shape_709}]},1).to({state:[{t:this.shape_710}]},1).to({state:[{t:this.shape_711}]},1).to({state:[{t:this.shape_712}]},1).to({state:[{t:this.shape_713}]},1).to({state:[{t:this.shape_714}]},1).to({state:[{t:this.shape_715}]},1).to({state:[{t:this.shape_661}]},1).wait(1));

	// p_7
	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f().s("#000000").ss(2.2,1,1).p("ADih9QhAAehYAuQixBch6BT");
	this.shape_716.setTransform(726.475,579.45);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f().s("#000000").ss(2.2,1,1).p("AjSB2QByhNClhWQBSgsA8gc");
	this.shape_717.setTransform(729.325,576.3);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f().s("#000000").ss(2.2,1,1).p("AjCBuQBqhICYhQQBMgoA3gb");
	this.shape_718.setTransform(732.15,573.125);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f().s("#000000").ss(2.2,1,1).p("AizBlQBhhCCNhKQBGgmAzgX");
	this.shape_719.setTransform(735,570);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f().s("#000000").ss(2.2,1,1).p("AijBdQBZg9B/hEQBBgiAugW");
	this.shape_720.setTransform(737.825,566.825);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f().s("#000000").ss(2.2,1,1).p("AiTBVQBQg4Bzg+QA6gfAqgU");
	this.shape_721.setTransform(740.675,563.675);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f().s("#000000").ss(2.2,1,1).p("AiEBNQBIgzBng3QA0gdAmgS");
	this.shape_722.setTransform(743.525,560.5);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f().s("#000000").ss(2.2,1,1).p("Ah0BFQA/gtBbgyQAugaAhgQ");
	this.shape_723.setTransform(746.35,557.375);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f().s("#000000").ss(2.2,1,1).p("AhlA8QA3gnBPgsQAogXAcgO");
	this.shape_724.setTransform(749.2,554.2);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f().s("#000000").ss(2.2,1,1).p("AhVA1QAugjBDgmQAhgTAZgN");
	this.shape_725.setTransform(752.05,551.05);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f().s("#000000").ss(2.2,1,1).p("AhFAsQAlgdA2ggQAcgQAUgK");
	this.shape_726.setTransform(754.875,547.875);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f().s("#000000").ss(2.2,1,1).p("Ag2AkQAdgXAqgbQAWgNAQgI");
	this.shape_727.setTransform(757.725,544.75);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f().s("#000000").ss(2.2,1,1).p("AgmAcQAVgSAdgUQAQgKALgH");
	this.shape_728.setTransform(760.55,541.575);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f().s("#000000").ss(2.2,1,1).p("AAYgTQgIAFgJAHQgRAOgNAN");
	this.shape_729.setTransform(763.4,538.425);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f().s("#000000").ss(2.2,1,1).p("AAugeQgNAIgTALQgjAXgYAT");
	this.shape_730.setTransform(705.925,591.575);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f().s("#000000").ss(2.2,1,1).p("Ag4AlQAfgYArgaQAWgOARgJ");
	this.shape_731.setTransform(707.125,590.875);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f().s("#000000").ss(2.2,1,1).p("AhDArQAlgbAzgfQAbgQAUgL");
	this.shape_732.setTransform(708.35,590.15);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f().s("#000000").ss(2.2,1,1).p("AhNAwQAqgfA8gjQAfgRAWgM");
	this.shape_733.setTransform(709.55,589.45);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f().s("#000000").ss(2.2,1,1).p("AhYA2QAwgjBFgnQAjgTAZgO");
	this.shape_734.setTransform(710.75,588.725);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f().s("#000000").ss(2.2,1,1).p("AhiA7QA1gmBNgrQAngWAcgO");
	this.shape_735.setTransform(711.975,588);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f().s("#000000").ss(2.2,1,1).p("AhtBBQA7gqBVgvQArgYAggP");
	this.shape_736.setTransform(713.175,587.3);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f().s("#000000").ss(2.2,1,1).p("Ah3BGQBBgtBdgzQAvgaAigR");
	this.shape_737.setTransform(714.375,586.575);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f().s("#000000").ss(2.2,1,1).p("AiCBMQBGgxBmg4QA0gcAlgS");
	this.shape_738.setTransform(715.6,585.875);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f().s("#000000").ss(2.2,1,1).p("AiMBRQBMg0Bug7QA4geAogU");
	this.shape_739.setTransform(716.8,585.15);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f().s("#000000").ss(2.2,1,1).p("AiXBXQBSg5B2g/QA8ggArgV");
	this.shape_740.setTransform(718.025,584.45);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f().s("#000000").ss(2.2,1,1).p("AiiBdQBYg9B/hDQBAgiAugX");
	this.shape_741.setTransform(719.225,583.725);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f().s("#000000").ss(2.2,1,1).p("AisBiQBdhACHhHQBEglAxgX");
	this.shape_742.setTransform(720.425,583.025);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f().s("#000000").ss(2.2,1,1).p("Ai3BoQBkhECPhLQBHgnA1gY");
	this.shape_743.setTransform(721.65,582.3);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f().s("#000000").ss(2.2,1,1).p("AjBBtQBphHCXhQQBNgoA3ga");
	this.shape_744.setTransform(722.85,581.575);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f().s("#000000").ss(2.2,1,1).p("AjMBzQBvhLCghUQBQgqA6gc");
	this.shape_745.setTransform(724.05,580.875);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f().s("#000000").ss(2.2,1,1).p("AjXB4QB1hOCohYQBVgtA9gd");
	this.shape_746.setTransform(725.275,580.15);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f().s("#000000").ss(2.2,1,1).p("AjWB4QB0hPCohXQBTgsA9gd");
	this.shape_747.setTransform(728.65,577.025);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f().s("#000000").ss(2.2,1,1).p("AjJByQBthLCehTQBPgpA5gc");
	this.shape_748.setTransform(730.825,574.6);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f().s("#000000").ss(2.2,1,1).p("Ai9BrQBmhGCVhOQBKgoA2gZ");
	this.shape_749.setTransform(733,572.225);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f().s("#000000").ss(2.2,1,1).p("AiyBlQBhhCCLhKQBGglAzgY");
	this.shape_750.setTransform(735.15,569.8);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f().s("#000000").ss(2.2,1,1).p("AimBfQBag+CChFQBBgjAwgX");
	this.shape_751.setTransform(737.325,567.375);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f().s("#000000").ss(2.2,1,1).p("AiaBYQBUg6B4hAQA9ghAsgV");
	this.shape_752.setTransform(739.525,564.95);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f().s("#000000").ss(2.2,1,1).p("AiOBSQBNg2Bvg8QA4geApgT");
	this.shape_753.setTransform(741.675,562.575);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f().s("#000000").ss(2.2,1,1).p("AiCBMQBGgyBng3QAzgcAlgS");
	this.shape_754.setTransform(743.85,560.15);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f().s("#000000").ss(2.2,1,1).p("Ah2BGQBAguBcgzQAvgZAigR");
	this.shape_755.setTransform(746.025,557.725);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f().s("#000000").ss(2.2,1,1).p("AhqBAQA5gqBTguQAqgXAfgP");
	this.shape_756.setTransform(748.2,555.3);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f().s("#000000").ss(2.2,1,1).p("AheA5QAzglBJgqQAmgVAbgN");
	this.shape_757.setTransform(750.35,552.925);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f().s("#000000").ss(2.2,1,1).p("AhSAzQAtghBAglQAhgTAXgM");
	this.shape_758.setTransform(752.55,550.5);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f().s("#000000").ss(2.2,1,1).p("AhGAtQAmgeA3ggQAcgQAUgL");
	this.shape_759.setTransform(754.725,548.075);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f().s("#000000").ss(2.2,1,1).p("Ag6AnQAfgZAugcQAXgOARgK");
	this.shape_760.setTransform(756.875,545.65);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f().s("#000000").ss(2.2,1,1).p("AgvAgQAZgVAlgXQATgMAOgH");
	this.shape_761.setTransform(759.05,543.275);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f().s("#000000").ss(2.2,1,1).p("AgiAaQASgRAbgTQAOgJAKgG");
	this.shape_762.setTransform(761.225,540.85);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7AnQAggZAugbQAYgPARgK");
	this.shape_763.setTransform(707.5,590.65);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f().s("#000000").ss(2.2,1,1).p("AhJAuQAngeA6ghQAdgRAVgL");
	this.shape_764.setTransform(709.1,589.725);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f().s("#000000").ss(2.2,1,1).p("AhXA1QAvgiBEgmQAjgUAZgN");
	this.shape_765.setTransform(710.675,588.775);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f().s("#000000").ss(2.2,1,1).p("AhkA9QA2gnBPgsQAogWAcgP");
	this.shape_766.setTransform(712.25,587.85);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f().s("#000000").ss(2.2,1,1).p("AhyBEQA+gsBZgxQAugZAhgR");
	this.shape_767.setTransform(713.85,586.925);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f().s("#000000").ss(2.2,1,1).p("AiABLQBFgxBlg3QAygbAlgS");
	this.shape_768.setTransform(715.425,586);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f().s("#000000").ss(2.2,1,1).p("AiOBSQBNg1Bvg8QA5geAogU");
	this.shape_769.setTransform(716.975,585.025);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f().s("#000000").ss(2.2,1,1).p("AicBaQBVg6B6hCQA+ghAsgV");
	this.shape_770.setTransform(718.55,584.1);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f().s("#000000").ss(2.2,1,1).p("AiqBhQBcg/CGhHQBDgkAwgX");
	this.shape_771.setTransform(720.15,583.175);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f().s("#000000").ss(2.2,1,1).p("Ai4BoQBkhECQhMQBIgmA1gZ");
	this.shape_772.setTransform(721.725,582.25);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f().s("#000000").ss(2.2,1,1).p("AjFBwQBrhJCbhRQBOgpA4gb");
	this.shape_773.setTransform(723.3,581.3);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f().s("#000000").ss(2.2,1,1).p("AjUB3QBzhOCmhXQBTgrA9gd");
	this.shape_774.setTransform(724.9,580.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_716}]}).to({state:[{t:this.shape_717}]},1).to({state:[{t:this.shape_718}]},1).to({state:[{t:this.shape_719}]},1).to({state:[{t:this.shape_720}]},1).to({state:[{t:this.shape_721}]},1).to({state:[{t:this.shape_722}]},1).to({state:[{t:this.shape_723}]},1).to({state:[{t:this.shape_724}]},1).to({state:[{t:this.shape_725}]},1).to({state:[{t:this.shape_726}]},1).to({state:[{t:this.shape_727}]},1).to({state:[{t:this.shape_728}]},1).to({state:[{t:this.shape_729}]},1).to({state:[]},1).to({state:[{t:this.shape_730}]},6).to({state:[{t:this.shape_731}]},1).to({state:[{t:this.shape_732}]},1).to({state:[{t:this.shape_733}]},1).to({state:[{t:this.shape_734}]},1).to({state:[{t:this.shape_735}]},1).to({state:[{t:this.shape_736}]},1).to({state:[{t:this.shape_737}]},1).to({state:[{t:this.shape_738}]},1).to({state:[{t:this.shape_739}]},1).to({state:[{t:this.shape_740}]},1).to({state:[{t:this.shape_741}]},1).to({state:[{t:this.shape_742}]},1).to({state:[{t:this.shape_743}]},1).to({state:[{t:this.shape_744}]},1).to({state:[{t:this.shape_745}]},1).to({state:[{t:this.shape_746}]},1).to({state:[{t:this.shape_716}]},1).to({state:[{t:this.shape_747}]},1).to({state:[{t:this.shape_748}]},1).to({state:[{t:this.shape_749}]},1).to({state:[{t:this.shape_750}]},1).to({state:[{t:this.shape_751}]},1).to({state:[{t:this.shape_752}]},1).to({state:[{t:this.shape_753}]},1).to({state:[{t:this.shape_754}]},1).to({state:[{t:this.shape_755}]},1).to({state:[{t:this.shape_756}]},1).to({state:[{t:this.shape_757}]},1).to({state:[{t:this.shape_758}]},1).to({state:[{t:this.shape_759}]},1).to({state:[{t:this.shape_760}]},1).to({state:[{t:this.shape_761}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_729}]},1).to({state:[]},1).to({state:[{t:this.shape_730}]},6).to({state:[{t:this.shape_763}]},1).to({state:[{t:this.shape_764}]},1).to({state:[{t:this.shape_765}]},1).to({state:[{t:this.shape_766}]},1).to({state:[{t:this.shape_767}]},1).to({state:[{t:this.shape_768}]},1).to({state:[{t:this.shape_769}]},1).to({state:[{t:this.shape_770}]},1).to({state:[{t:this.shape_771}]},1).to({state:[{t:this.shape_772}]},1).to({state:[{t:this.shape_773}]},1).to({state:[{t:this.shape_774}]},1).to({state:[{t:this.shape_716}]},1).wait(1));

	// puk_pr
	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f().s("#000000").ss(2.2,1,1).p("AhxARIDkgh");
	this.shape_775.setTransform(747.8,603.075);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f().s("#000000").ss(2.2,1,1).p("AhpAPIDTgd");
	this.shape_776.setTransform(752.75,604.325);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f().s("#000000").ss(2.2,1,1).p("AhgANIDBgZ");
	this.shape_777.setTransform(757.7,605.575);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f().s("#000000").ss(2.2,1,1).p("AhYALICxgV");
	this.shape_778.setTransform(762.65,606.8);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f().s("#000000").ss(2.2,1,1).p("AhOAJICegR");
	this.shape_779.setTransform(767.6,608.05);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f().s("#000000").ss(2.2,1,1).p("AhGAHICNgN");
	this.shape_780.setTransform(772.55,609.3);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f().s("#000000").ss(2.2,1,1).p("Ag+AFIB9gJ");
	this.shape_781.setTransform(777.5,610.525);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1ADIBqgF");
	this.shape_782.setTransform(782.45,611.775);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f().s("#000000").ss(2.2,1,1).p("AgsABIBZgB");
	this.shape_783.setTransform(787.4,613);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f().s("#000000").ss(2.2,1,1).p("AgjAAIBHAB");
	this.shape_784.setTransform(792.35,614.25);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f().s("#000000").ss(2.2,1,1).p("AgbgCIA3AF");
	this.shape_785.setTransform(797.3,615.5);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f().s("#000000").ss(2.2,1,1).p("AgFAAIAKAA");
	this.shape_786.setTransform(716.2,603.1);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f().s("#000000").ss(2.2,1,1).p("AgLABIAWgB");
	this.shape_787.setTransform(717.95,603.1);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f().s("#000000").ss(2.2,1,1).p("AgRACIAjgD");
	this.shape_788.setTransform(719.7,603.1);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f().s("#000000").ss(2.2,1,1).p("AgXADIAvgF");
	this.shape_789.setTransform(721.475,603.1);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f().s("#000000").ss(2.2,1,1).p("AgdAEIA7gH");
	this.shape_790.setTransform(723.225,603.1);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f().s("#000000").ss(2.2,1,1).p("AgjAFIBHgJ");
	this.shape_791.setTransform(724.975,603.075);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f().s("#000000").ss(2.2,1,1).p("AgpAGIBTgL");
	this.shape_792.setTransform(726.725,603.075);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f().s("#000000").ss(2.2,1,1).p("AgvAHIBfgN");
	this.shape_793.setTransform(728.5,603.075);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1AIIBrgP");
	this.shape_794.setTransform(730.25,603.075);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f().s("#000000").ss(2.2,1,1).p("Ag7AJIB3gR");
	this.shape_795.setTransform(732,603.1);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f().s("#000000").ss(2.2,1,1).p("AhBAKICDgS");
	this.shape_796.setTransform(733.75,603.1);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f().s("#000000").ss(2.2,1,1).p("AhHALICPgU");
	this.shape_797.setTransform(735.5,603.1);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f().s("#000000").ss(2.2,1,1).p("AhNALICbgV");
	this.shape_798.setTransform(737.275,603.1);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f().s("#000000").ss(2.2,1,1).p("AhTANICngZ");
	this.shape_799.setTransform(739.025,603.1);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f().s("#000000").ss(2.2,1,1).p("AhZANICzgZ");
	this.shape_800.setTransform(740.775,603.075);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f().s("#000000").ss(2.2,1,1).p("AhfAOIC/gb");
	this.shape_801.setTransform(742.525,603.075);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f().s("#000000").ss(2.2,1,1).p("AhmAPIDNgd");
	this.shape_802.setTransform(744.3,603.075);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f().s("#000000").ss(2.2,1,1).p("AhrAQIDYgf");
	this.shape_803.setTransform(746.05,603.075);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f().s("#000000").ss(2.2,1,1).p("AhrAQIDXgf");
	this.shape_804.setTransform(751.625,604.025);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f().s("#000000").ss(2.2,1,1).p("AhkAOIDJgb");
	this.shape_805.setTransform(755.425,604.975);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f().s("#000000").ss(2.2,1,1).p("AhdANIC7gZ");
	this.shape_806.setTransform(759.225,605.95);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f().s("#000000").ss(2.2,1,1).p("AhXALICvgV");
	this.shape_807.setTransform(763.025,606.9);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f().s("#000000").ss(2.2,1,1).p("AhQAKIChgS");
	this.shape_808.setTransform(766.85,607.85);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f().s("#000000").ss(2.2,1,1).p("AhKAIICUgP");
	this.shape_809.setTransform(770.65,608.8);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f().s("#000000").ss(2.2,1,1).p("AhDAGICHgL");
	this.shape_810.setTransform(774.45,609.775);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f().s("#000000").ss(2.2,1,1).p("Ag8AFIB5gJ");
	this.shape_811.setTransform(778.25,610.725);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f().s("#000000").ss(2.2,1,1).p("Ag1ADIBrgF");
	this.shape_812.setTransform(782.075,611.675);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f().s("#000000").ss(2.2,1,1).p("AgvACIBfgD");
	this.shape_813.setTransform(785.875,612.625);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f().s("#000000").ss(2.2,1,1).p("AgoAAIBRAA");
	this.shape_814.setTransform(789.675,613.6);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f().s("#000000").ss(2.2,1,1).p("AghAAIBDAC");
	this.shape_815.setTransform(793.475,614.55);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f().s("#000000").ss(2.2,1,1).p("AgMABIAZgB");
	this.shape_816.setTransform(718.475,603.1);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f().s("#000000").ss(2.2,1,1).p("AgUADIApgF");
	this.shape_817.setTransform(720.7,603.1);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f().s("#000000").ss(2.2,1,1).p("AgcAEIA5gH");
	this.shape_818.setTransform(722.975,603.1);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f().s("#000000").ss(2.2,1,1).p("AgkAFIBJgJ");
	this.shape_819.setTransform(725.225,603.1);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f().s("#000000").ss(2.2,1,1).p("AgsAGIBZgL");
	this.shape_820.setTransform(727.5,603.075);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f().s("#000000").ss(2.2,1,1).p("AgzAIIBngP");
	this.shape_821.setTransform(729.725,603.1);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f().s("#000000").ss(2.2,1,1).p("AhDAKICHgT");
	this.shape_822.setTransform(734.275,603.075);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f().s("#000000").ss(2.2,1,1).p("AhKALICVgV");
	this.shape_823.setTransform(736.5,603.1);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f().s("#000000").ss(2.2,1,1).p("AhSAMIClgX");
	this.shape_824.setTransform(738.775,603.075);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f().s("#000000").ss(2.2,1,1).p("AhaAOIC1gb");
	this.shape_825.setTransform(741.025,603.075);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f().s("#000000").ss(2.2,1,1).p("AhiAPIDFgd");
	this.shape_826.setTransform(743.3,603.075);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f().s("#000000").ss(2.2,1,1).p("AhqAQIDVgf");
	this.shape_827.setTransform(745.525,603.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_775}]}).to({state:[{t:this.shape_776}]},1).to({state:[{t:this.shape_777}]},1).to({state:[{t:this.shape_778}]},1).to({state:[{t:this.shape_779}]},1).to({state:[{t:this.shape_780}]},1).to({state:[{t:this.shape_781}]},1).to({state:[{t:this.shape_782}]},1).to({state:[{t:this.shape_783}]},1).to({state:[{t:this.shape_784}]},1).to({state:[{t:this.shape_785}]},1).to({state:[]},1).to({state:[{t:this.shape_786}]},8).to({state:[{t:this.shape_787}]},1).to({state:[{t:this.shape_788}]},1).to({state:[{t:this.shape_789}]},1).to({state:[{t:this.shape_790}]},1).to({state:[{t:this.shape_791}]},1).to({state:[{t:this.shape_792}]},1).to({state:[{t:this.shape_793}]},1).to({state:[{t:this.shape_794}]},1).to({state:[{t:this.shape_795}]},1).to({state:[{t:this.shape_796}]},1).to({state:[{t:this.shape_797}]},1).to({state:[{t:this.shape_798}]},1).to({state:[{t:this.shape_799}]},1).to({state:[{t:this.shape_800}]},1).to({state:[{t:this.shape_801}]},1).to({state:[{t:this.shape_802}]},1).to({state:[{t:this.shape_803}]},1).to({state:[{t:this.shape_775}]},1).to({state:[{t:this.shape_804}]},1).to({state:[{t:this.shape_805}]},1).to({state:[{t:this.shape_806}]},1).to({state:[{t:this.shape_807}]},1).to({state:[{t:this.shape_808}]},1).to({state:[{t:this.shape_809}]},1).to({state:[{t:this.shape_810}]},1).to({state:[{t:this.shape_811}]},1).to({state:[{t:this.shape_812}]},1).to({state:[{t:this.shape_813}]},1).to({state:[{t:this.shape_814}]},1).to({state:[{t:this.shape_815}]},1).to({state:[{t:this.shape_785}]},1).to({state:[]},1).to({state:[{t:this.shape_786}]},9).to({state:[{t:this.shape_816}]},1).to({state:[{t:this.shape_817}]},1).to({state:[{t:this.shape_818}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_820}]},1).to({state:[{t:this.shape_821}]},1).to({state:[{t:this.shape_795}]},1).to({state:[{t:this.shape_822}]},1).to({state:[{t:this.shape_823}]},1).to({state:[{t:this.shape_824}]},1).to({state:[{t:this.shape_825}]},1).to({state:[{t:this.shape_826}]},1).to({state:[{t:this.shape_827}]},1).to({state:[{t:this.shape_775}]},1).wait(1));

	// nogi
	this.instance_11 = new lib.nogi();
	this.instance_11.setTransform(620.05,578.7,1,1,0,0,0,-41.9,63.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({regX:-43.6,regY:66.7,scaleY:1.0004,skewX:-1.6108,x:622.35,y:585.95},8).to({regX:-44.2,regY:68.2,scaleY:1,skewX:0,x:617.75,y:581.05},9).to({regX:-42.4,regY:67.5,x:619.55,y:586.6},11).to({regX:-42.6,regY:64.8,scaleY:1.0009,skewX:-2.4517,x:619.1,y:582.4},11).to({regX:-45.4,regY:64.7,scaleY:1,skewX:0,x:614.55,y:576.05},9).to({regX:-44.2,regY:68.2,x:619.65,y:582.2},13).to({regX:-45.4,regY:71.1,x:616.55,y:586.2},13).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(512.7,395.9,416.0999999999999,221.60000000000002);
// library properties:
lib.properties = {
	id: '11',
	width: 980,
	height: 680,
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
an.compositions['11'] = {
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