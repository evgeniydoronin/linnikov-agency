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


(lib.silhouette = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgHAA5jQh/AAslimIgPgEQjAkBmMpBQmUpOgqhXQgCgJAMgPQATgaAygnIABAAIABgBQAhgcDgiJQChhjAZgUQA9grAWgdQAQgVgCgSIgCgKIgGgHQgWgbhDgLQgxgIiHgHQhZgEgpgEQhGgFgugKQgtgJgYgNQgZgMAAgOIAAgBQgDjHB8lGQBHi8CnlgIBAiGQBOiqBkhWQBahNC/hOIBUgjIhWgdQg1gSgihaQgghUAKhAIAAgBQAOhqAHhnQAKiJgIhDQgGhNADg2QAEg2AQgwIAUg+IhGAVQAbhiAKhzQALh9gQhPQgOhJAPh1QAPh2ApiGQAniBA0hwQA0hvAzg/IABAAIAAgBQAkgwAohEQAYgnAuhTQBbilA3hJQBbh6Bog0QBUgpA1gSQBBgWA0AAQAfAAAfAHIAhAJIAIghQAmicBzhlQByhkCtgfQCqgcCnAAQDVAADQAsQDPAsC5BUQGSC2EAFWIABABIABABQBKBUA8BeIACABQB4CkBsBoQAaAbAOATQB0C4A4CpQA3CoALDJQADBAAbBYQAkB2ADARIAAAAIABABQAbB0g+BxQgrBOh0B0QgaAYgWASQggAcgNANQgVAWgTAeIAAAAIgBABQgYApgWBPQgnCNg/A3QgnAihjAcIgXAGIgCAXQgMCFgMBrQgMBlgFAQIgBABIAAACIgtC0IAHAIIAFBuQADBDgMAbQgOAegtAOIgRAFIgFARQhDDVg7CQQhRDJhSBvIgLAPIAeBZQC9IuBZD8QBaD/ARAXIABABQAAAJgNATQgWAhg1AxQhBA8iHBoIgrAiIgBAAQgqAkgNARIgVAbIAbAUQAiAbChBfQCmBhAPAcQgCAjhyEFQhCCTgzBvIjAA3Qq5DGgjANQgeAImuAOQkdAIjTAKIg2ADg");
	this.shape.setTransform(0.0138,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.silhouette, new cjs.Rectangle(-243,-368.2,486.1,736.5), null);


(lib.krwt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF7F69").s().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.krwt, new cjs.Rectangle(-51.6,-79.1,103.30000000000001,158.3), null);


(lib.j_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7BBBBF").s().p("Ao0KRQAStQgEn8QgFn9FWiSQBrgtCAgEQBBgCArAHIEqN4ICcGnQACATgOAbQgsBUi3CFIhTBAQhRBBALAKQAJAIC8BrQC6BtAHAZQAHAZh5EaQg8CNg+CIIuhEAQAKlCAJmpg");
	this.shape.setTransform(58.4325,140.4528);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.j_2, new cjs.Rectangle(0,0,116.9,280.9), null);


(lib.j_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7BBBBF").s().p("AAUcjQkMl0kIl9QoOr6AggpQAUgZEXisQEOilAbg2QATgjgQgSQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvicQAdiTBTjqQConUESmzQA4gwBTg1QCmhoCHgQIDXgbIA+IzIA0QcIF8TAIE7Smg");
	this.shape.setTransform(0.0053,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.j_1, new cjs.Rectangle(-101.8,-201,203.7,402.1), null);


(lib.face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FCE9D7").s().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	this.shape.setTransform(0.0238,0.0018);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.face, new cjs.Rectangle(-183.5,-265.1,367.1,530.2), null);


// stage content:
(lib._13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(115));

	// Слой_68
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-14.7,-10,1.6,-0.6).ss(5.7,1,1).p("AhBjpIBaANIATCpQAUC8ACBh");
	this.shape.setTransform(593.5,271.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-11.4,0.1,2.1,11.7).ss(5.7,1,1).p("AhBjpIBaANIATCpQAUC8ACBh");
	this.shape_1.setTransform(593.5,271.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-8.1,10.2,2.5,24).ss(5.7,1,1).p("AhBjpIBaANIATCpQAUC8ACBh");
	this.shape_2.setTransform(593.5,271.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-4.9,20.2,2.9,36.2).ss(5.7,1,1).p("AhBjpIBaANIATCpQAUC8ACBh");
	this.shape_3.setTransform(593.5,271.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-1.6,30.3,3.3,48.5).ss(5.7,1,1).p("AhBjpIBaANIATCpQAUC8ACBh");
	this.shape_4.setTransform(593.5,271.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},82).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).wait(29));

	// Слой_67
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-52.8,-11.9,51.4,-11.9).ss(5.7,1,1).p("AnsCtIG1isQG6irAZgBQApgDAoAE");
	this.shape_5.setTransform(307.675,216.8729);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-79,-6,25.2,-6).ss(5.7,1,1).p("AnsCtIG1isQG6irAZgBQApgDAoAE");
	this.shape_6.setTransform(307.675,216.8729);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-105.3,0,-1.1,0).ss(5.7,1,1).p("AnsCtIG1isQG6irAZgBQApgDAoAE");
	this.shape_7.setTransform(307.675,216.8729);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-131.6,5.8,-27.4,5.8).ss(5.7,1,1).p("AnsCtIG1isQG6irAZgBQApgDAoAE");
	this.shape_8.setTransform(307.675,216.8729);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-157.9,11.7,-53.7,11.7).ss(5.7,1,1).p("AnsCtIG1isQG6irAZgBQApgDAoAE");
	this.shape_9.setTransform(307.675,216.8729);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},82).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).wait(29));

	// Слой_66
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-24.7,0.8,29.6,0.8).ss(5.7,1,1).p("AjzgTIAaANQAdAIAXgNQAEgDAdgbQAagYAXgNQBIgoBWAtQAtAYAVAlQAMAUAKApQAIAhAMAJQARANArgM");
	this.shape_10.setTransform(475.6,220.9218);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-7.3,3.5,46.3,8.2).ss(5.7,1,1).p("AjzgTIAaANQAdAIAXgNQAEgDAdgbQAagYAXgNQBIgoBWAtQAtAYAVAlQAMAUAKApQAIAhAMAJQARANArgM");
	this.shape_11.setTransform(475.6,220.9218);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],10,6.2,63,15.6).ss(5.7,1,1).p("AjzgTIAaANQAdAIAXgNQAEgDAdgbQAagYAXgNQBIgoBWAtQAtAYAVAlQAMAUAKApQAIAhAMAJQARANArgM");
	this.shape_12.setTransform(475.6,220.9218);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],27.3,9,79.7,23.1).ss(5.7,1,1).p("AjzgTIAaANQAdAIAXgNQAEgDAdgbQAagYAXgNQBIgoBWAtQAtAYAVAlQAMAUAKApQAIAhAMAJQARANArgM");
	this.shape_13.setTransform(475.6,220.9218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},79).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).wait(33));

	// Слой_69
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],45.7,-31.4,54.2,30.8).ss(5.7,1,1).p("AGnEGQAAgDABgDQAtithdiRQhpinjtgcQjPgZiQCJQg+A6ggBLQgWAygFAy");
	this.shape_14.setTransform(544.6852,219.7636);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],16.6,-44,42.4,2.9).ss(5.7,1,1).p("Am1BYQAEgyAWgyQAghLA+g6QCQiJDPAZQDtAcBpCnQBdCRgtCtQAAADgBAD");
	this.shape_15.setTransform(544.6977,219.7636);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-12.7,-56.5,30.5,-24.9).ss(5.7,1,1).p("Am1BYQAEgyAWgyQAghLA+g6QCQiJDPAZQDtAcBpCnQBdCRgtCtQAAADgBAD");
	this.shape_16.setTransform(544.6977,219.7636);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-41.8,-69,18.8,-52.7).ss(5.7,1,1).p("AGnEGQAAgDABgDQAtithdiRQhpinjtgcQjPgZiQCJQg+A6ggBLQgWAygFAy");
	this.shape_17.setTransform(544.6852,219.7636);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-73.5,-42.8,-18.3,-46.7).ss(5.7,1,1).p("Am1BYQAEgyAWgyQAghLA+g6QCQiJDPAZQDtAcBpCnQBdCRgtCtQAAADgBAD");
	this.shape_18.setTransform(544.6977,219.7636);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-105.2,-16.6,-55.5,-40.6).ss(5.7,1,1).p("Am1BYQAEgyAWgyQAghLA+g6QCQiJDPAZQDtAcBpCnQBdCRgtCtQAAADgBAD");
	this.shape_19.setTransform(544.6977,219.7636);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-136.9,9.6,-92.6,-34.6).ss(5.7,1,1).p("AGnEGQAAgDABgDQAtithdiRQhpinjtgcQjPgZiQCJQg+A6ggBLQgWAygFAy");
	this.shape_20.setTransform(544.6852,219.7636);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14}]},73).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[]},1).wait(35));

	// Слой_65
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-45.5,-29.8,0,49).ss(5.7,1,1).p("AmqjqQAAAHAAAIQALCiBqCCQB6CWC5ALQC9AMBuheQBXhJAriM");
	this.shape_21.setTransform(543.4,255.138);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-35.6,-8,22.5,56.7).ss(5.7,1,1).p("AmqjqQAAAIAAAHQALCiBqCCQB6CWC5ALQC9AMBuheQBWhIAsiN");
	this.shape_22.setTransform(543.4,255.138);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-25.6,13.8,45,64.3).ss(5.7,1,1).p("AmqjqQAAAIAAAHQALCiBqCCQB6CWC5ALQC9AMBuheQBWhIAsiN");
	this.shape_23.setTransform(543.4,255.138);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-15.7,35.6,67.5,72).ss(5.7,1,1).p("AmqjqQAAAHAAAIQALCiBqCCQB6CWC5ALQC9AMBuheQBXhJAriM");
	this.shape_24.setTransform(543.4,255.138);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],24.1,36.9,98.9,38).ss(5.7,1,1).p("AmqjqQAAAIAAAHQALCiBqCCQB6CWC5ALQC9AMBuheQBWhIAsiN");
	this.shape_25.setTransform(543.4,255.138);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],63.9,38.2,130.4,4).ss(5.7,1,1).p("AmqjqQAAAIAAAHQALCiBqCCQB6CWC5ALQC9AMBuheQBWhIAsiN");
	this.shape_26.setTransform(543.4,255.138);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],103.7,39.5,161.8,-30).ss(5.7,1,1).p("AmqjqQAAAHAAAIQALCiBqCCQB6CWC5ALQC9AMBuheQBXhJAriM");
	this.shape_27.setTransform(543.4,255.138);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(5.7,1,1).p("AAimlQjOgYiQCIQg+A7ggBLQggBKAEBIQALChBqCDQB6CWC5ALQC9AMBuheQBhhRArioQAsithciSQhqimjtgdg");
	this.shape_28.setTransform(544.62,236.1266);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_21}]},67).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},6).wait(36));

	// Слой_70
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],29.1,-64.8,29.1,35.6).ss(5.7,1,1).p("AHNEMQANgyAAg3QAAhBgrhPQgphKhFhDQhHhEhOgmQhUgqhKADQjMAJiQBsQh9BdgOB5");
	this.shape_29.setTransform(404.7625,191.3149);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-9.2,-69.8,23.8,2.4).ss(5.7,1,1).p("AnZBAQAOh5B9hdQCQhsDMgJQBKgDBUAqQBOAmBHBEQBFBDApBKQArBPAABBQAAA2gNAz");
	this.shape_30.setTransform(404.775,191.3149);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-47.6,-74.8,18.5,-30.8).ss(5.7,1,1).p("AnZBAQAOh5B9hdQCQhsDMgJQBKgDBUAqQBOAmBHBEQBFBDApBKQArBPAABBQAAA2gNAz");
	this.shape_31.setTransform(404.775,191.3149);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-85.9,-79.7,13.2,-64).ss(5.7,1,1).p("AHNEMQANgyAAg3QAAhBgrhPQgphKhFhDQhHhEhOgmQhUgqhKADQjMAJiQBsQh9BdgOB5");
	this.shape_32.setTransform(404.7625,191.3149);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-114.8,-52.1,-19.8,-58.2).ss(5.7,1,1).p("AnZBAQAOh5B9hdQCQhsDMgJQBKgDBUAqQBOAmBHBEQBFBDApBKQArBPAABBQAAA2gNAz");
	this.shape_33.setTransform(404.775,191.3149);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-143.8,-24.6,-52.8,-52.5).ss(5.7,1,1).p("AnZBAQAOh5B9hdQCQhsDMgJQBKgDBUAqQBOAmBHBEQBFBDApBKQArBPAABBQAAA2gNAz");
	this.shape_34.setTransform(404.775,191.3149);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-172.7,3.1,-85.8,-46.7).ss(5.7,1,1).p("AHNEMQANgyAAg3QAAhBgrhPQgphKhFhDQhHhEhOgmQhUgqhKADQjMAJiQBsQh9BdgOB5");
	this.shape_35.setTransform(404.7625,191.3149);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(5.7,1,1).p("AAPm4QjMAJiQBsQiUBuAHCVQAJDMBSB/QByC0DzgFQD3gFCMidQBxiAABihQAAhCgrhOQgphLhFhDQhHhEhOgnQhUgphKADg");
	this.shape_36.setTransform(404.6613,208.6967);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_29}]},67).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},6).wait(36));

	// Слой_64
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-38.7,-33.2,-13.3,61.9).ss(5.7,1,1).p("AnQkDQAAAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBAhJAdhU");
	this.shape_37.setTransform(403.5871,226.8318);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-34.7,-7,10.6,72.7).ss(5.7,1,1).p("AnPkDQgBAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBBhJAchU");
	this.shape_38.setTransform(403.5875,226.8318);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-30.7,19.3,34.5,83.6).ss(5.7,1,1).p("AnPkDQgBAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBBhJAchU");
	this.shape_39.setTransform(403.5875,226.8318);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-26.7,45.5,58.4,94.5).ss(5.7,1,1).p("AnQkDQAAAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBAhJAdhU");
	this.shape_40.setTransform(403.5871,226.8318);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],20.5,50.1,100.4,59.6).ss(5.7,1,1).p("AnPkDQgBAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBBhJAchU");
	this.shape_41.setTransform(403.5875,226.8318);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],67.7,54.7,142.3,24.7).ss(5.7,1,1).p("AnPkDQgBAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBBhJAchU");
	this.shape_42.setTransform(403.5875,226.8318);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],115,59.2,184.3,-10.2).ss(5.7,1,1).p("AnQkDQAAAHABAHQAJDMBSB/QByCzDzgFQD3gECMidQBAhJAdhU");
	this.shape_43.setTransform(403.5871,226.8318);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_37}]},73).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).wait(36));

	// smkng
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18.2,-49.8,6.5,42.5).ss(3.4,1,1).p("AjInJQAOAMDCHEQBiDjBfDg");
	this.shape_44.setTransform(437.625,728.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.3,-16.4,18.4,75.9).ss(3.4,1,1).p("AjInJQAOAMDCHEQBiDjBfDg");
	this.shape_45.setTransform(437.625,728.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],5.6,17.1,30.3,109.3).ss(3.4,1,1).p("AjInJQAOAMDCHEQBiDjBfDg");
	this.shape_46.setTransform(437.625,728.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],17.5,50.5,42.2,142.8).ss(3.4,1,1).p("AjInJQAOAMDCHEQBiDjBfDg");
	this.shape_47.setTransform(437.625,728.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_44}]},84).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).wait(28));

	// Слой_121
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.9,-48.8,3.9,12.5).ss(3.4,1,1).p("AgxHMQAVjnAXjlQAtnNALAC");
	this.shape_48.setTransform(362.9,732.9746);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2,-16.1,2,45.2).ss(3.4,1,1).p("AgxHMQAVjnAXjlQAtnNALAC");
	this.shape_49.setTransform(362.9,732.9746);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.2,16.6,0.2,77.9).ss(3.4,1,1).p("AgxHMQAVjnAXjlQAtnNALAC");
	this.shape_50.setTransform(362.9,732.9746);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-1.6,49.3,-1.6,110.6).ss(3.4,1,1).p("AgxHMQAVjnAXjlQAtnNALAC");
	this.shape_51.setTransform(362.9,732.9746);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_48}]},82).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).wait(30));

	// Слой_120
	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-35.7,-11.1,12.4,37).ss(3.4,1,1).p("AE7jLIAHB1QAFCIgMBiQgEAbjkASQjJAQhFgGQglgDg1iMIgtiK");
	this.shape_52.setTransform(386.7864,666.6454);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-22.1,28.5,34.8,61.4).ss(3.4,1,1).p("AlChOIAtCKQA1CMAlADQBFAGDJgQQDkgSAEgbQAMhigFiIIgHh1");
	this.shape_53.setTransform(386.7864,666.6454);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-8.5,68,57.2,85.6).ss(3.4,1,1).p("AE7jLIAHB1QAFCIgMBiQgEAbjkASQjJAQhFgGQglgDg1iMIgtiK");
	this.shape_54.setTransform(386.7864,666.6454);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],46.7,55.3,103.5,40.1).ss(3.4,1,1).p("AlChOIAtCKQA1CMAlADQBFAGDJgQQDkgSAEgbQAMhigFiIIgHh1");
	this.shape_55.setTransform(386.7864,666.6454);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],101.7,42.5,149.8,-5.5).ss(3.4,1,1).p("AE7jLIAHB1QAFCIgMBiQgEAbjkASQjJAQhFgGQglgDg1iMIgtiK");
	this.shape_56.setTransform(386.7864,666.6454);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_52}]},79).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).wait(32));

	// Слой_119
	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-67.1,5.5,61.9,5.5).ss(3.4,1,1).p("ApzDzQCHiZCRiYQEhk0AxgDQAogCEIFfQCOC8A1BCQBkB7AmAV");
	this.shape_57.setTransform(396.15,657.7241);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-33.2,16.4,95.8,16.4).ss(3.4,1,1).p("ApzDzQCHiZCRiYQEhk0AxgDQAogCEIFfQCOC8A1BCQBkB7AmAV");
	this.shape_58.setTransform(396.15,657.7241);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.6,27.3,129.6,27.3).ss(3.4,1,1).p("ApzDzQCHiZCRiYQEhk0AxgDQAogCEIFfQCOC8A1BCQBkB7AmAV");
	this.shape_59.setTransform(396.15,657.7241);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],34.4,38.3,163.4,38.3).ss(3.4,1,1).p("ApzDzQCHiZCRiYQEhk0AxgDQAogCEIFfQCOC8A1BCQBkB7AmAV");
	this.shape_60.setTransform(396.15,657.7241);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],68.3,49.2,197.3,49.2).ss(3.4,1,1).p("ApzDzQCHiZCRiYQEhk0AxgDQAogCEIFfQCOC8A1BCQBkB7AmAV");
	this.shape_61.setTransform(396.15,657.7241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_57}]},76).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).wait(35));

	// Слой_118
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-82.7,-0.2,77.7,-0.2).ss(3.4,1,1).p("AsQl2IG2FwQG7FxAiAIQAqAKBlgMQBmgLAXgRQAggXFikQ");
	this.shape_62.setTransform(366.15,575.5826);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-37.9,10.5,121.1,0.1).ss(3.4,1,1).p("AsQl2IG1FwQG8FxAiAIQAqAKBlgMQBmgLAXgRQAggXFikQ");
	this.shape_63.setTransform(366.15,575.5826);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],6.8,21.3,164.5,0.5).ss(3.4,1,1).p("AsQl2IG1FwQG8FxAiAIQAqAKBlgMQBmgLAXgRQAggXFikQ");
	this.shape_64.setTransform(366.15,575.5826);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],51.6,32,207.9,0.9).ss(3.4,1,1).p("AsQl2IG1FwQG8FxAiAIQAqAKBlgMQBmgLAXgRQAggXFikQ");
	this.shape_65.setTransform(366.15,575.5826);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],96.4,42.8,251.3,1.3).ss(3.4,1,1).p("AsQl2IG2FwQG7FxAiAIQAqAKBlgMQBmgLAXgRQAggXFikQ");
	this.shape_66.setTransform(366.15,575.5826);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_62}]},73).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).wait(38));

	// Слой_117
	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2,-108.5,2,57.8).ss(3.4,1,1).p("AAOvkIgDLcQgHM0gRG5");
	this.shape_67.setTransform(459.625,673.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2.6,-65.8,2.6,100.5).ss(3.4,1,1).p("AgNPlQARm5AHs0IADrc");
	this.shape_68.setTransform(459.625,673.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.3,-23,3.3,143.3).ss(3.4,1,1).p("AgNPlQARm5AHs0IADrc");
	this.shape_69.setTransform(459.625,673.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.9,19.8,3.9,186.1).ss(3.4,1,1).p("AgNPlQARm5AHs0IADrc");
	this.shape_70.setTransform(459.625,673.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],4.5,62.6,4.5,228.9).ss(3.4,1,1).p("AgNPlQARm5AHs0IADrc");
	this.shape_71.setTransform(459.625,673.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],5.1,105.3,5.1,271.6).ss(3.4,1,1).p("AAOvkIgDLcQgHM0gRG5");
	this.shape_72.setTransform(459.625,673.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_67}]},70).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).wait(40));

	// Слой_116
	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-28.5,-198.4,4.9,24.1).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_73.setTransform(307.7519,590.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18,-142.7,15.4,79.8).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_74.setTransform(307.7519,590.925);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-7.6,-87,25.9,135.5).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_75.setTransform(307.7519,590.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2.9,-31.2,36.4,191.3).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_76.setTransform(307.7519,590.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],13.4,24.5,46.9,247).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_77.setTransform(307.7519,590.925);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],23.9,80.2,57.4,302.7).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_78.setTransform(307.7519,590.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],34.4,136,67.9,358.5).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_79.setTransform(307.7519,590.925);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],44.9,191.7,78.4,414.2).ss(3.4,1,1).p("Al59YQg3AzgUAeQgoA/gHBhQgSEEDXI8QDhJREgPhQEDN8AfDS");
	this.shape_80.setTransform(307.7519,590.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_73}]},65).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).wait(43));

	// Слой_115
	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5.5,-15.8,2.2,13).ss(3.4,1,1).p("AgRiEIANAWQAMAdAHAfQAVBig4BV");
	this.shape_81.setTransform(629.0095,298.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],0.7,1.7,0.7,30.6).ss(3.4,1,1).p("AgUCFQA4hVgVhiQgHgfgMgdIgNgW");
	this.shape_82.setTransform(629.0095,298.85);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.9,19.3,-0.7,48.1).ss(3.4,1,1).p("AgRiEIANAWQAMAdAHAfQAVBig4BV");
	this.shape_83.setTransform(629.0095,298.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_81}]},85).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).wait(28));

	// Слой_113
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-40,-42.5,14.9,25.7).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_84.setTransform(590.875,226.325);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-30.4,-29.3,21.7,40.6).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_85.setTransform(590.875,226.325);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-20.8,-16.2,28.4,55.4).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_86.setTransform(590.875,226.325);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-11.2,-3,35.1,70.4).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_87.setTransform(590.875,226.325);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-1.6,10.2,41.8,85.3).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_88.setTransform(590.875,226.325);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],7.9,23.4,48.5,100.2).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_89.setTransform(590.875,226.325);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],17.6,36.5,55.3,115).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_90.setTransform(590.875,226.325);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],27.1,49.7,62,129.9).ss(3.4,1,1).p("AkbnNIBWAiQBmAzBXBTQEVEKAPHp");
	this.shape_91.setTransform(590.875,226.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_84}]},84).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).wait(24));

	// Слой_114
	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-21.5,-40.3,13,19.5).ss(3.4,1,1).p("AjklOQBYEFBlCnQCFDiCHAQ");
	this.shape_92.setTransform(625.725,197.05);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-13.3,-23,26.2,31.8).ss(3.4,1,1).p("AjklPQBYEGBlCnQCFDhCHAQ");
	this.shape_93.setTransform(625.725,197.05);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5.1,-5.8,39.5,43.9).ss(3.4,1,1).p("AjklPQBYEGBlCnQCFDhCHAQ");
	this.shape_94.setTransform(625.725,197.05);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],3.1,11.5,52.7,56.2).ss(3.4,1,1).p("AjklPQBYEGBlCnQCFDhCHAQ");
	this.shape_95.setTransform(625.725,197.05);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],11.3,28.7,65.9,68.4).ss(3.4,1,1).p("AjklPQBYEGBlCnQCFDhCHAQ");
	this.shape_96.setTransform(625.725,197.05);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],19.5,46,79.2,80.6).ss(3.4,1,1).p("AjklOQBYEFBlCnQCFDiCHAQ");
	this.shape_97.setTransform(625.725,197.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_92}]},86).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).wait(24));

	// Слой_112
	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-17.9,-28.6,8.8,17.7).ss(3.4,1,1).p("AiqjtQDGDECPEX");
	this.shape_98.setTransform(557.475,160.525);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5.8,-10,20.9,36.3).ss(3.4,1,1).p("AiqjtQDGDECPEX");
	this.shape_99.setTransform(557.475,160.525);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.4,8.7,33.1,55).ss(3.4,1,1).p("AiqjtQDGDECPEX");
	this.shape_100.setTransform(557.475,160.525);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],18.5,27.3,45.2,73.6).ss(3.4,1,1).p("AiqjtQDGDECPEX");
	this.shape_101.setTransform(557.475,160.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_98}]},85).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).wait(27));

	// Слой_111
	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-34.4,-29.6,2.1,15.8).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxArAtAhQBFAxAlBbQArBmAVDA");
	this.shape_102.setTransform(559.5,108.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-20.9,-17.1,11.3,30.5).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxAsAtAgQBFAxAlBcQArBlAVDA");
	this.shape_103.setTransform(559.5,108.3);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-7.5,-4.6,20.5,45.1).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxAsAtAgQBFAxAlBcQArBlAVDA");
	this.shape_104.setTransform(559.5,108.3);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.1,7.8,29.7,59.7).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxAsAtAgQBFAxAlBcQArBlAVDA");
	this.shape_105.setTransform(559.5,108.3);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],19.5,20.3,38.9,74.3).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxAsAtAgQBFAxAlBcQArBlAVDA");
	this.shape_106.setTransform(559.5,108.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],33,32.7,48.1,88.9).ss(3.4,1,1).p("AkSkvQBSAsCLA1QBxArAtAhQBFAxAlBbQArBmAVDA");
	this.shape_107.setTransform(559.5,108.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_102}]},84).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).wait(26));

	// Слой_109
	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-32,13.9,23.5,-8.1).ss(3.4,1,1).p("AkZB1QBugLBYgvQAygcBLg+QBDg5AmgPQA8gZBLAX");
	this.shape_108.setTransform(440.075,44.6364);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-10.9,3.7,46,-10.9).ss(3.4,1,1).p("AkZB1QBugLBYgvQAygcBLg+QBDg5AmgPQA8gZBLAX");
	this.shape_109.setTransform(440.075,44.6364);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],10.3,-6.4,68.6,-13.7).ss(3.4,1,1).p("AkZB1QBugLBYgvQAygcBLg+QBDg5AmgPQA8gZBLAX");
	this.shape_110.setTransform(440.075,44.6364);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],31.5,-16.5,91.2,-16.5).ss(3.4,1,1).p("AkZB1QBugLBYgvQAygcBLg+QBDg5AmgPQA8gZBLAX");
	this.shape_111.setTransform(440.075,44.6364);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_108}]},85).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).wait(27));

	// Слой_108
	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-53,0,44.5,0).ss(3.4,1,1).p("AnVgiQFAgvDSANQEgARB6B7");
	this.shape_112.setTransform(493.4,87.4937);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-32.8,3.1,59.3,6.9).ss(3.4,1,1).p("AnWgiQFAgvDTANQEgARB5B7");
	this.shape_113.setTransform(493.4,87.4937);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-12.7,6.3,74,13.8).ss(3.4,1,1).p("AnWgiQFAgvDTANQEgARB5B7");
	this.shape_114.setTransform(493.4,87.4937);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],7.5,9.4,88.8,20.7).ss(3.4,1,1).p("AnWgiQFAgvDTANQEgARB5B7");
	this.shape_115.setTransform(493.4,87.4937);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],27.6,12.5,103.5,27.6).ss(3.4,1,1).p("AnWgiQFAgvDTANQEgARB5B7");
	this.shape_116.setTransform(493.4,87.4937);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],47.7,15.7,118.3,34.6).ss(3.4,1,1).p("AnVgiQFAgvDSANQEgARB6B7");
	this.shape_117.setTransform(493.4,87.4937);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_112}]},86).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).wait(24));

	// Слой_107
	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-45.8,-6.7,38,6.2).ss(3.4,1,1).p("AmWhgQHRAbFcCm");
	this.shape_118.setTransform(456.425,96.625);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-23.5,-1.9,60.3,11).ss(3.4,1,1).p("AmWhgQHRAbFcCm");
	this.shape_119.setTransform(456.425,96.625);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-1.2,3,82.6,15.9).ss(3.4,1,1).p("AmWhgQHRAbFcCm");
	this.shape_120.setTransform(456.425,96.625);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],21.1,7.8,104.9,20.7).ss(3.4,1,1).p("AmWhgQHRAbFcCm");
	this.shape_121.setTransform(456.425,96.625);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],43.5,12.7,127.3,25.6).ss(3.4,1,1).p("AmWhgQHRAbFcCm");
	this.shape_122.setTransform(456.425,96.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_118}]},84).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).wait(27));

	// Слой_106
	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-26.4,28.6,-13.2,-20.2).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_123.setTransform(371.4556,71.5409);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-16.3,16.6,4,-25.1).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_124.setTransform(371.4556,71.5409);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-6.2,4.5,21.2,-30).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_125.setTransform(371.4556,71.5409);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],3.9,-7.5,38.5,-34.9).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_126.setTransform(371.4556,71.5409);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],14,-19.6,55.7,-39.8).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_127.setTransform(371.4556,71.5409);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],24.2,-31.6,73,-44.7).ss(3.4,1,1).p("AjqELQgDhxAChFQAEh7AehLQBZjcFcBh");
	this.shape_128.setTransform(371.4556,71.5409);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_123}]},86).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).wait(24));

	// Слой_105
	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],33.7,0.9,-30.6,0.9).ss(3.4,1,1).p("AExAtQgogwhSgcQhNgaheABQhfABhSAcQhYAdgzA3");
	this.shape_129.setTransform(317.275,91.4745);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],17.1,0.2,-47.2,0.2).ss(3.4,1,1).p("AkwA5QAzg3BYgdQBSgcBfgBQBegBBNAaQBSAcAoAw");
	this.shape_130.setTransform(317.275,91.4745);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],0.5,-0.6,-63.8,-0.6).ss(3.4,1,1).p("AkwA5QAzg3BYgdQBSgcBfgBQBegBBNAaQBSAcAoAw");
	this.shape_131.setTransform(317.275,91.4745);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-16.2,-1.3,-80.5,-1.3).ss(3.4,1,1).p("AkwA5QAzg3BYgdQBSgcBfgBQBegBBNAaQBSAcAoAw");
	this.shape_132.setTransform(317.275,91.4745);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-32.8,-2.1,-97.1,-2.1).ss(3.4,1,1).p("AExAtQgogwhSgcQhNgaheABQhfABhSAcQhYAdgzA3");
	this.shape_133.setTransform(317.275,91.4745);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_129}]},87).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).wait(24));

	// Слой_104
	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-61.8,24.6,47.6,-15.2).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_134.setTransform(373.175,83.757);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-46.2,20.6,63.2,-19.2).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_135.setTransform(373.175,83.757);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-30.6,16.7,78.8,-23.1).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_136.setTransform(373.175,83.757);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-14.9,12.7,94.4,-27.1).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_137.setTransform(373.175,83.757);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],0.7,8.7,110,-31.1).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_138.setTransform(373.175,83.757);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],16.3,4.7,125.7,-35.1).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_139.setTransform(373.175,83.757);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],31.9,0.8,141.3,-39).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_140.setTransform(373.175,83.757);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],47.6,-3.2,156.9,-43).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_141.setTransform(373.175,83.757);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],63.2,-7.2,172.5,-47).ss(3.4,1,1).p("Ao0DdQBKhACAgLQBAgGAyAHQA7iFAwg+QBih+CTgoQA4gQCLAaQC0AhBWAC");
	this.shape_142.setTransform(373.175,83.757);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_134}]},84).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).wait(23));

	// Слой_103
	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-24.5,1.2,19.6,1.2).ss(3.4,1,1).p("AjLAUIArALQA0ALA0ABQCkAFBgha");
	this.shape_143.setTransform(366.5,107.488);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5.6,4.2,36.5,-3.2).ss(3.4,1,1).p("AjLAUIArALQA0ALA0ABQCkAFBgha");
	this.shape_144.setTransform(366.5,107.488);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],13.3,7.2,53.4,-7.5).ss(3.4,1,1).p("AjLAUIArALQA0ALA0ABQCkAFBgha");
	this.shape_145.setTransform(366.5,107.488);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],32.1,10.1,70.3,-11.9).ss(3.4,1,1).p("AjLAUIArALQA0ALA0ABQCkAFBgha");
	this.shape_146.setTransform(366.5,107.488);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_143}]},86).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).wait(26));

	// Слой_102
	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],22.1,-9.7,-14.1,11.2).ss(3.4,1,1).p("ADAhQQglAqhCAoQiEBSiUgD");
	this.shape_147.setTransform(286.6,119.8071);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-0.5,-0.4,-36.7,20.5).ss(3.4,1,1).p("Ai/BRQCUADCEhSQBCgoAlgq");
	this.shape_148.setTransform(286.6,119.8071);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-23.2,8.9,-59.4,29.8).ss(3.4,1,1).p("ADAhQQglAqhCAoQiEBSiUgD");
	this.shape_149.setTransform(286.6,119.8071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_147}]},84).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).wait(29));

	// Слой_100
	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],21,-8.7,-11.6,10).ss(3.4,1,1).p("AirBgIAjglQArgtArggQCJhrBUAp");
	this.shape_150.setTransform(331.55,128.7321);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],8.2,-0.9,-24.4,17.8).ss(3.4,1,1).p("AiqBgIAiglQAsgtArggQCIhrBVAp");
	this.shape_151.setTransform(331.55,128.7321);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-4.6,6.8,-37.2,25.5).ss(3.4,1,1).p("AiqBgIAiglQAsgtArggQCIhrBVAp");
	this.shape_152.setTransform(331.55,128.7321);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-17.4,14.6,-50,33.3).ss(3.4,1,1).p("AirBgIAjglQArgtArggQCJhrBUAp");
	this.shape_153.setTransform(331.55,128.7321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_150}]},85).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).wait(27));

	// Слой_101
	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],30.3,-19.3,-14.8,6.7).ss(3.4,1,1).p("ADzjYQhlAvhwBOQjfCbgxCZ");
	this.shape_154.setTransform(255.725,184.525);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],16.5,-12.1,-24.8,17.7).ss(3.4,1,1).p("AjyDZQAxiZDfibQBwhOBlgv");
	this.shape_155.setTransform(255.725,184.525);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],2.7,-4.8,-34.8,28.8).ss(3.4,1,1).p("AjyDZQAxiZDfibQBwhOBlgv");
	this.shape_156.setTransform(255.725,184.525);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-11.2,2.6,-44.9,40).ss(3.4,1,1).p("AjyDZQAxiZDfibQBwhOBlgv");
	this.shape_157.setTransform(255.725,184.525);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-25,9.9,-54.9,51.1).ss(3.4,1,1).p("AjyDZQAxiZDfibQBwhOBlgv");
	this.shape_158.setTransform(255.725,184.525);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-38.9,17.2,-65,62.1).ss(3.4,1,1).p("ADzjYQhlAvhwBOQjfCbgxCZ");
	this.shape_159.setTransform(255.725,184.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_154}]},86).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).wait(24));

	// Слой_99
	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],19.6,-29.8,-3.9,10.8).ss(3.4,1,1).p("ADajyIgSA5QgaBGgpBBQiBDRjdBU");
	this.shape_160.setTransform(244.675,215.3);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],13,-19.8,-12,19.6).ss(3.4,1,1).p("AjZDzQDdhVCBjQQAphBAahGIASg5");
	this.shape_161.setTransform(244.675,215.3);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.5,-9.8,-20.2,28.4).ss(3.4,1,1).p("AjZDzQDdhVCBjQQAphBAahGIASg5");
	this.shape_162.setTransform(244.675,215.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],0,0.3,-28.3,37.2).ss(3.4,1,1).p("AjZDzQDdhVCBjQQAphBAahGIASg5");
	this.shape_163.setTransform(244.675,215.3);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-6.7,10.4,-36.5,46.1).ss(3.4,1,1).p("AjZDzQDdhVCBjQQAphBAahGIASg5");
	this.shape_164.setTransform(244.675,215.3);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-13.2,20.4,-44.6,54.9).ss(3.4,1,1).p("AjZDzQDdhVCBjQQAphBAahGIASg5");
	this.shape_165.setTransform(244.675,215.3);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-19.8,30.5,-52.8,63.7).ss(3.4,1,1).p("ADajyIgSA5QgaBGgpBBQiBDRjdBU");
	this.shape_166.setTransform(244.675,215.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_160}]},84).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).wait(25));

	// Слой_98
	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5.7,-25,4.7,14.1).ss(3.4,1,1).p("AgrjwQgDAgAQA3QAKAhAaBNQAzCegSB9");
	this.shape_167.setTransform(290.4594,248.25);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-3,-12,7.4,27.1).ss(3.4,1,1).p("AgrjwQgDAhAQA3QAKAgAaBNQAzCfgSB9");
	this.shape_168.setTransform(290.4594,248.25);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-0.2,1,10.2,40.1).ss(3.4,1,1).p("AgrjwQgDAhAQA3QAKAgAaBNQAzCfgSB9");
	this.shape_169.setTransform(290.4594,248.25);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],2.5,14.1,13,53.2).ss(3.4,1,1).p("AgrjwQgDAhAQA3QAKAgAaBNQAzCfgSB9");
	this.shape_170.setTransform(290.4594,248.25);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],5.3,27.1,15.7,66.2).ss(3.4,1,1).p("AgrjwQgDAgAQA3QAKAhAaBNQAzCegSB9");
	this.shape_171.setTransform(290.4594,248.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_167}]},86).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).wait(25));

	// Слой_97
	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],16.3,-28.4,7.8,3.4).ss(3.4,1,1).p("ACUj8IgEAvQgIA8gXA+QhHDEi9CN");
	this.shape_172.setTransform(255.1,267.3);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],9.6,-14,1.1,17.8).ss(3.4,1,1).p("AiTD+QC9iNBHjEQAXg+AIg8IAEgv");
	this.shape_173.setTransform(255.1,267.3);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],3,0.4,-5.5,32.2).ss(3.4,1,1).p("AiTD+QC9iNBHjEQAXg+AIg8IAEgv");
	this.shape_174.setTransform(255.1,267.3);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-3.7,14.8,-12.2,46.6).ss(3.4,1,1).p("AiTD+QC9iNBHjEQAXg+AIg8IAEgv");
	this.shape_175.setTransform(255.1,267.3);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-10.4,29.2,-18.9,61).ss(3.4,1,1).p("ACUj8IgEAvQgIA8gXA+QhHDEi9CN");
	this.shape_176.setTransform(255.1,267.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_172}]},85).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).wait(26));

	// Слой_110
	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],1.9,-22.3,1.9,11.9).ss(3.4,1,1).p("AAZi3IgNAnQgNAxgKAvQgdCXAkBR");
	this.shape_177.setTransform(275.0407,276.425);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],2.8,0.6,2.8,34.8).ss(3.4,1,1).p("AgEC4QgkhRAdiXQAKgvANgxIANgn");
	this.shape_178.setTransform(275.0407,276.425);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],3.7,23.6,3.7,57.8).ss(3.4,1,1).p("AAZi3IgNAnQgNAxgKAvQgdCXAkBR");
	this.shape_179.setTransform(275.0407,276.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_177}]},84).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).wait(29));

	// Слой_96
	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-20.6,0.8,16.4,0.8).ss(3.4,1,1).p("AinAjIArgXQA1gZAvgNQCWgpAqBp");
	this.shape_180.setTransform(559.025,286.0282);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-7,2,28.4,8.2).ss(3.4,1,1).p("AinAjIArgXQA1gZAvgNQCWgpAqBp");
	this.shape_181.setTransform(559.025,286.0282);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.7,3.3,40.4,15.6).ss(3.4,1,1).p("AinAjIArgXQA1gZAvgNQCWgpAqBp");
	this.shape_182.setTransform(559.025,286.0282);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],20.5,4.5,52.5,23).ss(3.4,1,1).p("AinAjIArgXQA1gZAvgNQCWgpAqBp");
	this.shape_183.setTransform(559.025,286.0282);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_180}]},86).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).wait(26));

	// Слой_95
	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],11.1,8,-11.3,2).ss(3.4,1,1).p("ABFBDQhBAIgpg0QgjgsAFgu");
	this.shape_184.setTransform(516.0381,287.5347);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-3.7,2.5,-20.7,-10.5).ss(3.4,1,1).p("AhDhDQgFAuAjAsQApA0BBgI");
	this.shape_185.setTransform(516.0381,287.5347);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-18.5,-3.1,-30.1,-23.1).ss(3.4,1,1).p("ABFBDQhBAIgpg0QgjgsAFgu");
	this.shape_186.setTransform(516.0381,287.5347);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_184}]},85).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).wait(28));

	// Слой_94
	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(3.4,1,1).p("Ah2AAQA5AyA5gHQA8gIA+hN");
	this.shape_187.setTransform(424.1,273.3989);
	this.shape_187._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_187).wait(87).to({_off:false},0).wait(28));

	// Слой_93
	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],17.7,18.2,-18.6,8.5).ss(3.4,1,1).p("ACrA2Qggg3hqgiQh3gnhUAw");
	this.shape_188.setTransform(362.6,255.7932);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-0.3,11.4,-36.6,11.4).ss(3.4,1,1).p("AiqgaQBUgwB3AnQBqAiAgA3");
	this.shape_189.setTransform(362.6,255.7932);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-18.3,4.6,-54.5,14.2).ss(3.4,1,1).p("ACrA2Qggg3hqgiQh3gnhUAw");
	this.shape_190.setTransform(362.6,255.7932);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_188}]},86).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).wait(27));

	// Слой_92
	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-12.2,-13.2,-0.7,6.7).ss(3.4,1,1).p("AhhhnIA0BYQBCBdBNAa");
	this.shape_191.setTransform(496.25,447.9);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-2.7,4.1,12.9,19.8).ss(3.4,1,1).p("AhhhmIA0BYQBCBcBNAa");
	this.shape_192.setTransform(496.25,447.9);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.7,21.4,26.5,32.9).ss(3.4,1,1).p("AhhhnIA0BYQBCBdBNAa");
	this.shape_193.setTransform(496.25,447.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_191}]},87).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).wait(26));

	// Слой_91
	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-4.7,-20.2,3.2,9.4).ss(3.4,1,1).p("Ag6ioIABApQACAzAJAuQAbCSBOA0");
	this.shape_194.setTransform(477.925,463.2);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-1.6,-6.4,8.8,22.2).ss(3.4,1,1).p("Ag6ioIABApQACAzAJAuQAbCSBOA0");
	this.shape_195.setTransform(477.925,463.2);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],1.7,7.4,14.5,34.9).ss(3.4,1,1).p("Ag6ioIABApQACAzAJAuQAbCSBOA0");
	this.shape_196.setTransform(477.925,463.2);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],4.8,21.2,20.1,47.7).ss(3.4,1,1).p("Ag6ioIABApQACAzAJAuQAbCSBOA0");
	this.shape_197.setTransform(477.925,463.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_194}]},86).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).wait(26));

	// Слой_90
	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],8.6,-15.8,-7.3,11.6).ss(3.4,1,1).p("ABJh6IglBpQgwBug8Ae");
	this.shape_198.setTransform(440.55,456.5);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],1.8,-5.7,-14,21.7).ss(3.4,1,1).p("AhIB7QA8gdAwhvIAlhp");
	this.shape_199.setTransform(440.55,456.5);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-5,4.3,-20.8,31.7).ss(3.4,1,1).p("AhIB7QA8gdAwhvIAlhp");
	this.shape_200.setTransform(440.55,456.5);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-11.7,14.3,-27.6,41.7).ss(3.4,1,1).p("ABJh6IglBpQgwBug8Ae");
	this.shape_201.setTransform(440.55,456.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_198}]},86).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).wait(26));

	// Слой_89
	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],8.2,-11.9,-7.6,15.4).ss(3.4,1,1).p("ABchQIgLAYQgPAdgTAZQg9BOhNAF");
	this.shape_202.setTransform(419.425,438.175);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-1.7,-0.4,-20.7,24.4).ss(3.4,1,1).p("AhbBRQBNgFA9hOQATgZAPgdIALgY");
	this.shape_203.setTransform(419.425,438.175);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-11.6,11,-33.8,33.3).ss(3.4,1,1).p("ABchQIgLAYQgPAdgTAZQg9BOhNAF");
	this.shape_204.setTransform(419.425,438.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_202}]},87).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204}]},1).wait(26));

	// Слой_88
	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],4.2,-16,-2.2,8.1).ss(3.4,1,1).p("AANiEIgIAXQgIAdgFAfQgPBjAhBT");
	this.shape_205.setTransform(421.018,442.55);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-1.4,2,-1.4,26.1).ss(3.4,1,1).p("AAKCFQghhUAPhiQAFgfAIgdIAIgX");
	this.shape_206.setTransform(421.018,442.55);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-7.1,20.1,-0.7,44.2).ss(3.4,1,1).p("AANiEIgIAXQgIAdgFAfQgPBjAhBT");
	this.shape_207.setTransform(421.018,442.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_205}]},85).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).wait(28));

	// Слой_87
	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],21,-11,-20.7,13.1).ss(3.4,1,1).p("ACxhbIgcAZQgjAegoAaQh+BUh7AS");
	this.shape_208.setTransform(393.05,431.775);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],6.4,-4.5,-35.3,19.6).ss(3.4,1,1).p("AivBcQB7gSB+hUQAogaAjgeIAcgZ");
	this.shape_209.setTransform(393.05,431.775);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-8.1,1.9,-49.8,26).ss(3.4,1,1).p("AivBcQB7gSB+hUQAogaAjgeIAcgZ");
	this.shape_210.setTransform(393.05,431.775);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-22.7,8.4,-64.4,32.5).ss(3.4,1,1).p("ACxhbIgcAZQgjAegoAaQh+BUh7AS");
	this.shape_211.setTransform(393.05,431.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_208}]},86).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).wait(26));

	// Слой_86
	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],18.8,-0.6,-29,12.1).ss(3.4,1,1).p("AiKASIAUAJQAaAJAfACQBhAEBnhP");
	this.shape_212.setTransform(384.175,423.8346);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],0.1,2.6,-47.7,15.3).ss(3.4,1,1).p("AiKASIAUAJQAaAJAfACQBhAEBnhP");
	this.shape_213.setTransform(384.175,423.8346);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f().ls(["#999999","rgba(153,153,153,0)"],[0,0.027],-18.6,5.7,-66.4,18.5).ss(3.4,1,1).p("AiKASIAUAJQAaAJAfACQBhAEBnhP");
	this.shape_214.setTransform(384.175,423.8346);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_212}]},85).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).wait(28));

	// Слой_81
	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-35.9,1.5,38.5,1.5).ss(3.4,1,1).p("AlighQB5ABCKgbQCughAOgBQBWgJA3AkQBBArA4B3");
	this.shape_215.setTransform(504,66.1688);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-17.3,4.3,56.5,9.1).ss(3.4,1,1).p("AlighQB5ABCKgbQCughAOgBQBWgJA3AkQBBArA4B3");
	this.shape_216.setTransform(504,66.1688);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],1.4,7.2,74.5,16.8).ss(3.4,1,1).p("AlighQB5ABCKgbQCughAOgBQBWgJA3AkQBBArA4B3");
	this.shape_217.setTransform(504,66.1688);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],20,10,92.5,24.4).ss(3.4,1,1).p("AlighQB5ABCKgbQCughAOgBQBWgJA3AkQBBArA4B3");
	this.shape_218.setTransform(504,66.1688);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],38.7,12.8,110.6,32.1).ss(3.4,1,1).p("AlighQB5ABCKgbQCughAOgBQBWgJA3AkQBBArA4B3");
	this.shape_219.setTransform(504,66.1688);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_215}]},86).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).wait(25));

	// Слой_85
	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f().s("#000000").ss(3.4,1,1).p("AhAh1QAIA4AnBFQAmBHAsAn");
	this.shape_220.setTransform(645.675,255.125);
	this.shape_220._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_220).wait(87).to({_off:false},0).wait(28));

	// Слой_80
	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-67.7,-88.3,3.3,4).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_221.setTransform(594.325,198.625);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-52.3,-65.3,18.7,27).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_222.setTransform(594.325,198.625);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-37,-42.4,34,49.9).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_223.setTransform(594.325,198.625);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-21.6,-19.4,49.4,72.9).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_224.setTransform(594.325,198.625);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.3,3.6,64.7,95.9).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_225.setTransform(594.325,198.625);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],9.1,26.5,80.1,118.8).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_226.setTransform(594.325,198.625);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],24.5,49.5,95.5,141.8).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_227.setTransform(594.325,198.625);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],39.9,72.5,110.9,164.8).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_228.setTransform(594.325,198.625);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],55.2,95.5,126.2,187.8).ss(3.4,1,1).p("Ao1t3QCHBUBIA5QB1BcBeB2QDsEoCzI/QBSEKB1CqQA6BVApAg");
	this.shape_229.setTransform(594.325,198.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_221}]},83).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_227}]},1).to({state:[{t:this.shape_228}]},1).to({state:[{t:this.shape_229}]},1).wait(24));

	// Слой_84
	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.6,-83.7,13.3,-9.3).ss(3.4,1,1).p("AhosLQAWFTCHHFQBCDegSDIQgTDMhlCN");
	this.shape_230.setTransform(600.9179,276.25);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-3.6,-56.1,13,18.7).ss(3.4,1,1).p("AhosLQAWFTCHHGQBCDdgSDJQgTDLhlCN");
	this.shape_231.setTransform(600.9179,276.25);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-0.6,-28.5,12.7,46.8).ss(3.4,1,1).p("AhosLQAWFTCHHGQBCDdgSDJQgTDLhlCN");
	this.shape_232.setTransform(600.9179,276.25);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2.3,-0.8,12.4,74.9).ss(3.4,1,1).p("AhosLQAWFTCHHGQBCDdgSDJQgTDLhlCN");
	this.shape_233.setTransform(600.9179,276.25);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],5.4,26.8,12.1,102.9).ss(3.4,1,1).p("AhosLQAWFTCHHGQBCDdgSDJQgTDLhlCN");
	this.shape_234.setTransform(600.9179,276.25);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],8.3,54.5,11.8,131).ss(3.4,1,1).p("AhosLQAWFTCHHGQBCDdgSDJQgTDLhlCN");
	this.shape_235.setTransform(600.9179,276.25);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],11.3,82.1,11.5,159.1).ss(3.4,1,1).p("AhosLQAWFTCHHFQBCDegSDIQgTDMhlCN");
	this.shape_236.setTransform(600.9179,276.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_230}]},81).to({state:[{t:this.shape_231}]},1).to({state:[{t:this.shape_232}]},1).to({state:[{t:this.shape_233}]},1).to({state:[{t:this.shape_234}]},1).to({state:[{t:this.shape_235}]},1).to({state:[{t:this.shape_236}]},1).wait(28));

	// Слой_83
	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-34.8,-18.4,22.5,14.7).ss(3.4,1,1).p("Ak5icIAvArQA8A1BFAtQDdCSDmAa");
	this.shape_237.setTransform(562.325,165.225);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-17.1,-9.7,41.8,19.4).ss(3.4,1,1).p("Ak5icIAvArQA8A1BFAtQDdCSDmAa");
	this.shape_238.setTransform(562.325,165.225);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.7,-0.8,61.2,24.2).ss(3.4,1,1).p("Ak5icIAvArQA8A1BFAtQDdCSDmAa");
	this.shape_239.setTransform(562.325,165.225);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],18.3,7.9,80.5,29).ss(3.4,1,1).p("Ak5icIAvArQA8A1BFAtQDdCSDmAa");
	this.shape_240.setTransform(562.325,165.225);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],36.1,16.7,99.9,33.8).ss(3.4,1,1).p("Ak5icIAvArQA8A1BFAtQDdCSDmAa");
	this.shape_241.setTransform(562.325,165.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_237}]},80).to({state:[{t:this.shape_238}]},1).to({state:[{t:this.shape_239}]},1).to({state:[{t:this.shape_240}]},1).to({state:[{t:this.shape_241}]},1).wait(31));

	// Слой_82
	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-35.1,-78.6,15.8,-27.7).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_242.setTransform(577.472,166.175);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-23.3,-45.2,21.1,9.4).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_243.setTransform(577.472,166.175);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-11.5,-11.8,26.5,46.5).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_244.setTransform(577.472,166.175);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.4,21.6,31.9,83.6).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_245.setTransform(577.472,166.175);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],12.3,55.1,37.3,120.8).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_246.setTransform(577.472,166.175);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],24.1,88.5,42.7,158).ss(3.4,1,1).p("AlWsyQIZFqB2KhQAlDTgJDZQgFBsgMBC");
	this.shape_247.setTransform(577.472,166.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_242}]},87).to({state:[{t:this.shape_243}]},1).to({state:[{t:this.shape_244}]},1).to({state:[{t:this.shape_245}]},1).to({state:[{t:this.shape_246}]},1).to({state:[{t:this.shape_247}]},1).wait(23));

	// Слой_79
	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-114,23.3,4.2,-15.2).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIFFbIBTA9QBhBKA/BG");
	this.shape_248.setTransform(457.85,83.6331);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-85.3,23.1,33.7,-8.2).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_249.setTransform(457.85,83.6331);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-56.6,22.9,63.2,-1.1).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_250.setTransform(457.85,83.6331);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-27.9,22.6,92.6,5.9).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_251.setTransform(457.85,83.6331);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.7,22.4,122,13).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_252.setTransform(457.85,83.6331);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],29.4,22.2,151.4,20).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_253.setTransform(457.85,83.6331);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],58.1,22,180.9,27.1).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIGFbIBSA9QBhBKA/BG");
	this.shape_254.setTransform(457.85,83.6331);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],86.8,21.7,210.4,34.1).ss(3.4,1,1).p("AxHCUIAygdQBAgkBKgjQDshxDwhBQL/jTIFFbIBTA9QBhBKA/BG");
	this.shape_255.setTransform(457.85,83.6331);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_248}]},81).to({state:[{t:this.shape_249}]},1).to({state:[{t:this.shape_250}]},1).to({state:[{t:this.shape_251}]},1).to({state:[{t:this.shape_252}]},1).to({state:[{t:this.shape_253}]},1).to({state:[{t:this.shape_254}]},1).to({state:[{t:this.shape_255}]},1).wait(27));

	// Слой_78
	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-5.9,4.4,24,-25.5).ss(3.4,1,1).p("ADCjeQgbBPg+BfQh7C+ivBR");
	this.shape_256.setTransform(322.425,142.025);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-20.1,21.7,9.8,-8.2).ss(3.4,1,1).p("AjBDfQCvhRB7i+QA+hfAbhP");
	this.shape_257.setTransform(322.425,142.025);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-34.4,39.1,-4.5,9.2).ss(3.4,1,1).p("AjBDfQCvhRB7i+QA+hfAbhP");
	this.shape_258.setTransform(322.425,142.025);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-48.6,56.5,-18.7,26.6).ss(3.4,1,1).p("ADCjeQgbBPg+BfQh7C+ivBR");
	this.shape_259.setTransform(322.425,142.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_256}]},80).to({state:[{t:this.shape_257}]},1).to({state:[{t:this.shape_258}]},1).to({state:[{t:this.shape_259}]},1).wait(32));

	// Слой_77
	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-29.2,4.4,46.1,-15.8).ss(3.4,1,1).p("AF1jKQhpAghGAVQiCAphcAnQkXB1hFCb");
	this.shape_260.setTransform(271.525,165.425);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-57.9,17.5,17.4,-2.6).ss(3.4,1,1).p("Al0DLQBFibEXh1QBcgnCCgpQBGgVBpgg");
	this.shape_261.setTransform(271.525,165.425);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-86.7,30.8,-11.4,10.6).ss(3.4,1,1).p("Al0DLQBFibEXh1QBcgnCCgpQBGgVBpgg");
	this.shape_262.setTransform(271.525,165.425);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-115.4,44,-40.1,23.8).ss(3.4,1,1).p("AF1jKQhpAghGAVQiCAphcAnQkXB1hFCb");
	this.shape_263.setTransform(271.525,165.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_260}]},82).to({state:[{t:this.shape_261}]},1).to({state:[{t:this.shape_262}]},1).to({state:[{t:this.shape_263}]},1).wait(30));

	// Слой_76
	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-15.2,11.5,30.1,-14.6).ss(3.4,1,1).p("Aj0BUIApAaQA1AZA4AAQC1gDCekK");
	this.shape_264.setTransform(297.725,186.8005);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-36.9,17.1,10.7,-0.3).ss(3.4,1,1).p("Aj0BUIApAaQA1AZA4AAQC1gDCekK");
	this.shape_265.setTransform(297.725,186.8005);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-58.6,22.8,-8.7,14.1).ss(3.4,1,1).p("Aj0BUIApAaQA1AZA4AAQC1gDCekK");
	this.shape_266.setTransform(297.725,186.8005);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-80.4,28.4,-28.2,28.4).ss(3.4,1,1).p("Aj0BUIApAaQA1AZA4AAQC1gDCekK");
	this.shape_267.setTransform(297.725,186.8005);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_264}]},81).to({state:[{t:this.shape_265}]},1).to({state:[{t:this.shape_266}]},1).to({state:[{t:this.shape_267}]},1).wait(31));

	// line
	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-13.6,10.9,24.5,-11.1).ss(3.4,1,1).p("AjKBtIAzACQA/gCA5gPQC0guA2ie");
	this.shape_268.setTransform(245.375,243.2);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-30.4,17.2,7.7,-4.8).ss(3.4,1,1).p("AjKBtIAzACQA/gCA5gOQC0guA2ie");
	this.shape_269.setTransform(245.375,243.2);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-47.2,23.6,-9.1,1.6).ss(3.4,1,1).p("AjKBtIAzACQA/gCA5gOQC0guA2ie");
	this.shape_270.setTransform(245.375,243.2);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-64,29.9,-25.9,7.9).ss(3.4,1,1).p("AjKBtIAzACQA/gCA5gPQC0guA2ie");
	this.shape_271.setTransform(245.375,243.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_268}]},80).to({state:[{t:this.shape_269}]},1).to({state:[{t:this.shape_270}]},1).to({state:[{t:this.shape_271}]},1).wait(32));

	// Слой_74
	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-27.1,0.4,21.2,0.4).ss(3.4,1,1).p("AjfgzQAaAABZAMQBcANAbABQAoACBSAeQBKAdARAQ");
	this.shape_272.setTransform(436.8,515.3);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-9.3,1.4,38.4,5.6).ss(3.4,1,1).p("AjfgzQAaAABZAMQBcANAbABQAoACBSAeQBKAdARAQ");
	this.shape_273.setTransform(436.8,515.3);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],8.5,2.4,55.7,10.7).ss(3.4,1,1).p("AjfgzQAaAABZAMQBcANAbABQAoACBSAeQBKAdARAQ");
	this.shape_274.setTransform(436.8,515.3);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],26.3,3.4,72.9,15.9).ss(3.4,1,1).p("AjfgzQAaAABZAMQBcANAbABQAoACBSAeQBKAdARAQ");
	this.shape_275.setTransform(436.8,515.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_272}]},81).to({state:[{t:this.shape_273}]},1).to({state:[{t:this.shape_274}]},1).to({state:[{t:this.shape_275}]},1).wait(31));

	// Слой_73
	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-5.2,6.8,9.2,-18.2).ss(3.4,1,1).p("AA9iiQgPCngLAhQgRA2hOBH");
	this.shape_276.setTransform(306.65,292.375);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-11,19.2,3.4,-5.8).ss(3.4,1,1).p("Ag8CjQBOhHASg2QAKghAPin");
	this.shape_277.setTransform(306.65,292.375);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-16.9,31.6,-2.4,6.6).ss(3.4,1,1).p("Ag8CjQBOhHASg2QAKghAPin");
	this.shape_278.setTransform(306.65,292.375);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-22.7,44.1,-8.2,19.1).ss(3.4,1,1).p("AA9iiQgPCngLAhQgRA2hOBH");
	this.shape_279.setTransform(306.65,292.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_276}]},80).to({state:[{t:this.shape_277}]},1).to({state:[{t:this.shape_278}]},1).to({state:[{t:this.shape_279}]},1).wait(32));

	// Слой_72
	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-8.1,-21.5,0.5,10.4).ss(3.4,1,1).p("AhAi8QABATAbBQQAcBUATAjQAKASAFAsQAFAoAiA5");
	this.shape_280.setTransform(365.625,487.125);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-3,-6.9,5.5,25).ss(3.4,1,1).p("AhAi8QABATAbBQQAcBUATAjQAKASAFAsQAFAoAiA5");
	this.shape_281.setTransform(365.625,487.125);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2,7.9,10.6,39.8).ss(3.4,1,1).p("AhAi8QABATAbBQQAcBUATAjQAKASAFAsQAFAoAiA5");
	this.shape_282.setTransform(365.625,487.125);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],7.1,22.6,15.7,54.5).ss(3.4,1,1).p("AhAi8QABATAbBQQAcBUATAjQAKASAFAsQAFAoAiA5");
	this.shape_283.setTransform(365.625,487.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_280}]},79).to({state:[{t:this.shape_281}]},1).to({state:[{t:this.shape_282}]},1).to({state:[{t:this.shape_283}]},1).wait(33));

	// Слой_71
	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-4.7,-23,4.8,12.6).ss(3.4,1,1).p("AAyDKIhkmT");
	this.shape_284.setTransform(330.8,246.925);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-1,-7.6,8.5,28).ss(3.4,1,1).p("AgyjJIBlGT");
	this.shape_285.setTransform(330.8,246.925);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2.8,7.8,12.3,43.4).ss(3.4,1,1).p("AgyjJIBlGT");
	this.shape_286.setTransform(330.8,246.925);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],6.5,23.3,16,58.9).ss(3.4,1,1).p("AAyDKIhkmT");
	this.shape_287.setTransform(330.8,246.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_284}]},78).to({state:[{t:this.shape_285}]},1).to({state:[{t:this.shape_286}]},1).to({state:[{t:this.shape_287}]},1).wait(34));

	// Слой_63
	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f().s("#000000").ss(3.4,1,1).p("AAqAuQgUghgOgQQgVgbgcgP");
	this.shape_288.setTransform(569.975,243.65);
	this.shape_288._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_288).wait(83).to({_off:false},0).wait(32));

	// Слой_62
	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-33.7,0.1,24.4,0.1).ss(3.4,1,1).p("AESAoQhCg5hLgOQiRgdkFBO");
	this.shape_289.setTransform(544,219.9954);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-12.3,2.6,45.8,2.6).ss(3.4,1,1).p("AkRASQEFhOCRAdQBLAOBCA5");
	this.shape_290.setTransform(544,219.9954);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],9.1,5.1,67.2,5.1).ss(3.4,1,1).p("AkRASQEFhOCRAdQBLAOBCA5");
	this.shape_291.setTransform(544,219.9954);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],30.5,7.5,88.6,7.5).ss(3.4,1,1).p("AESAoQhCg5hLgOQiRgdkFBO");
	this.shape_292.setTransform(544,219.9954);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_289}]},80).to({state:[{t:this.shape_290}]},1).to({state:[{t:this.shape_291}]},1).to({state:[{t:this.shape_292}]},1).wait(32));

	// Слой_61
	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-32.9,2.1,26.9,2.1).ss(3.4,1,1).p("AEahPQh1ALjDBBQjEBEg3AP");
	this.shape_293.setTransform(520.525,244.525);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-11.7,0.8,48,0.8).ss(3.4,1,1).p("AkZBQQA3gPDEhEQDDhBB1gL");
	this.shape_294.setTransform(520.525,244.525);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],9.5,-0.6,69.3,-0.6).ss(3.4,1,1).p("AkZBQQA3gPDEhEQDDhBB1gL");
	this.shape_295.setTransform(520.525,244.525);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],30.7,-1.9,90.5,-1.9).ss(3.4,1,1).p("AEahPQh1ALjDBBQjEBEg3AP");
	this.shape_296.setTransform(520.525,244.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_293}]},78).to({state:[{t:this.shape_294}]},1).to({state:[{t:this.shape_295}]},1).to({state:[{t:this.shape_296}]},1).wait(34));

	// Слой_60
	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-46.6,5.6,61.5,5.6).ss(3.4,1,1).p("AIMEVQg5AAgugTQgzgUgtguQiminjpiNQkYiqipAL");
	this.shape_297.setTransform(426.575,227.0422);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-76.2,1.6,31.9,1.6).ss(3.4,1,1).p("AoLkTQCpgLEYCqQDpCNCmCnQAtAuAzAUQAuATA5AA");
	this.shape_298.setTransform(426.575,227.0422);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-105.8,-2.3,2.3,-2.3).ss(3.4,1,1).p("AoLkTQCpgLEYCqQDpCNCmCnQAtAuAzAUQAuATA5AA");
	this.shape_299.setTransform(426.575,227.0422);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-135.4,-6.3,-27.3,-6.3).ss(3.4,1,1).p("AoLkTQCpgLEYCqQDpCNCmCnQAtAuAzAUQAuATA5AA");
	this.shape_300.setTransform(426.575,227.0422);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-165,-10.2,-56.9,-10.2).ss(3.4,1,1).p("AIMEVQg5AAgugTQgzgUgtguQiminjpiNQkYiqipAL");
	this.shape_301.setTransform(426.575,227.0422);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_297}]},78).to({state:[{t:this.shape_298}]},1).to({state:[{t:this.shape_299}]},1).to({state:[{t:this.shape_300}]},1).to({state:[{t:this.shape_301}]},1).wait(33));

	// Слой_58
	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-45,1.8,33.1,1.8).ss(3.4,1,1).p("Al0BDQAwgDD1g5QEZhBAXgEQA9gMAyAjQAZARANAU");
	this.shape_302.setTransform(531.8,260.5468);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-23.8,2.5,54.3,2.5).ss(3.4,1,1).p("Al0BDQAwgDD1g5QEZhBAXgEQA9gMAyAjQAZARANAU");
	this.shape_303.setTransform(531.8,260.5468);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-2.5,3.3,75.6,3.3).ss(3.4,1,1).p("Al0BDQAwgDD1g5QEZhBAXgEQA9gMAyAjQAZARANAU");
	this.shape_304.setTransform(531.8,260.5468);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],18.7,4,96.8,4).ss(3.4,1,1).p("Al0BDQAwgDD1g5QEZhBAXgEQA9gMAyAjQAZARANAU");
	this.shape_305.setTransform(531.8,260.5468);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],40,4.7,118.1,4.7).ss(3.4,1,1).p("Al0BDQAwgDD1g5QEZhBAXgEQA9gMAyAjQAZARANAU");
	this.shape_306.setTransform(531.8,260.5468);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_302}]},77).to({state:[{t:this.shape_303}]},1).to({state:[{t:this.shape_304}]},1).to({state:[{t:this.shape_305}]},1).to({state:[{t:this.shape_306}]},1).wait(34));

	// Слой_59
	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-11.4,17.3,48,17.3).ss(3.4,1,1).p("AmhjjQBIAGDeBuQDtB2BTBWQBMBOBQAlQAoASAZAC");
	this.shape_307.setTransform(424.05,244.575);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-34.7,11.7,24.7,11.7).ss(3.4,1,1).p("AmhjjQBIAGDeBuQDtB2BTBWQBMBOBQAlQAoASAZAC");
	this.shape_308.setTransform(424.05,244.575);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-58.1,6.1,1.3,6.1).ss(3.4,1,1).p("AmhjjQBIAGDeBuQDtB2BTBWQBMBOBQAlQAoASAZAC");
	this.shape_309.setTransform(424.05,244.575);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-81.4,0.5,-22,0.5).ss(3.4,1,1).p("AmhjjQBIAGDeBuQDtB2BTBWQBMBOBQAlQAoASAZAC");
	this.shape_310.setTransform(424.05,244.575);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-104.8,-5,-45.4,-5).ss(3.4,1,1).p("AmhjjQBIAGDeBuQDtB2BTBWQBMBOBQAlQAoASAZAC");
	this.shape_311.setTransform(424.05,244.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_307}]},77).to({state:[{t:this.shape_308}]},1).to({state:[{t:this.shape_309}]},1).to({state:[{t:this.shape_310}]},1).to({state:[{t:this.shape_311}]},1).wait(34));

	// Слой_56
	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-10.5,-101.2,7.1,-35.6).ss(3.4,1,1).p("AABvdQCBDJA7DDQAuCbAJC4QADA+AbBVQAkB0AEAUQAQBNgOBCQgRBRhCBUQg8BNg5A3Qg5AygVASQgiAfgSAhQgXAogWBMQgpCThDA6QgsAmhuAe");
	this.shape_312.setTransform(612.4463,257.525);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-12.1,-58.6,-4.8,5.6).ss(3.4,1,1).p("AlBPeQBugeAsgmQBDg6ApiTQAWhMAXgoQASghAigfQAVgSA5gyQA5g3A8hNQBChUARhRQAOhCgQhNQgEgUgkh0QgbhVgDg+QgJi4guibQg7jDiBjJ");
	this.shape_313.setTransform(612.4463,257.525);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-13.7,-16,-16.7,46.8).ss(3.4,1,1).p("AlBPeQBugeAsgmQBDg6ApiTQAWhMAXgoQASghAigfQAVgSA5gyQA5g3A8hNQBChUARhRQAOhCgQhNQgEgUgkh0QgbhVgDg+QgJi4guibQg7jDiBjJ");
	this.shape_314.setTransform(612.4463,257.525);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-15.4,26.7,-28.6,88.1).ss(3.4,1,1).p("AlBPeQBugeAsgmQBDg6ApiTQAWhMAXgoQASghAigfQAVgSA5gyQA5g3A8hNQBChUARhRQAOhCgQhNQgEgUgkh0QgbhVgDg+QgJi4guibQg7jDiBjJ");
	this.shape_315.setTransform(612.4463,257.525);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-17,69.3,-40.5,129.4).ss(3.4,1,1).p("AlBPeQBugeAsgmQBDg6ApiTQAWhMAXgoQASghAigfQAVgSA5gyQA5g3A8hNQBChUARhRQAOhCgQhNQgEgUgkh0QgbhVgDg+QgJi4guibQg7jDiBjJ");
	this.shape_316.setTransform(612.4463,257.525);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18.6,111.9,-52.4,170.6).ss(3.4,1,1).p("AABvdQCBDJA7DDQAuCbAJC4QADA+AbBVQAkB0AEAUQAQBNgOBCQgRBRhCBUQg8BNg5A3Qg5AygVASQgiAfgSAhQgXAogWBMQgpCThDA6QgsAmhuAe");
	this.shape_317.setTransform(612.4463,257.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_312}]},71).to({state:[{t:this.shape_313}]},1).to({state:[{t:this.shape_314}]},1).to({state:[{t:this.shape_315}]},1).to({state:[{t:this.shape_316}]},1).to({state:[{t:this.shape_317}]},1).wait(39));

	// Слой_57
	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],90.5,-74.3,8.1,8.1).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_318.setTransform(287.35,184.4244);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],67.9,-30.9,-14.5,51.5).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_319.setTransform(287.35,184.4244);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],45.3,12.4,-37.1,94.8).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_320.setTransform(287.35,184.4244);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],22.7,55.8,-59.7,138.2).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_321.setTransform(287.35,184.4244);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0,99.2,-82.4,181.6).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_322.setTransform(287.35,184.4244);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-22.6,142.6,-105,225).ss(3.4,1,1).p("AnrPnQgKAHgOAGQgdAMgVgEQASg7AOhUQAcingVh4QgbiYBLkMQBOkZCBiqQA2hIA9hvQBCh8Ajg6QB5jRCbhRQCihVBrABQA2ABAVAR");
	this.shape_323.setTransform(287.35,184.4244);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_318}]},66).to({state:[{t:this.shape_319}]},1).to({state:[{t:this.shape_320}]},1).to({state:[{t:this.shape_321}]},1).to({state:[{t:this.shape_322}]},1).to({state:[{t:this.shape_323}]},1).wait(44));

	// Слой_55
	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-154.7,-4.7,14.1,-21.1).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_324.setTransform(491.025,119.0357);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-88.5,7.8,70.4,18.6).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_325.setTransform(491.025,119.0357);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-22.4,20.2,126.7,58.3).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_326.setTransform(491.025,119.0357);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],43.7,32.7,183,98.1).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_327.setTransform(491.025,119.0357);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],109.9,45.2,239.3,137.8).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_328.setTransform(491.025,119.0357);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],176,57.6,295.6,177.5).ss(3.4,1,1).p("A2+lcQACgVAKgiQAVhDAng8QB8jAEGgwQE9g7FKA3QFRA3FFCpQEECHDpEkQBABQB2CfQBrCMBVBTQCbCZA7BSQBLBsASB4");
	this.shape_329.setTransform(491.025,119.0357);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_324}]},66).to({state:[{t:this.shape_325}]},1).to({state:[{t:this.shape_326}]},1).to({state:[{t:this.shape_327}]},1).to({state:[{t:this.shape_328}]},1).to({state:[{t:this.shape_329}]},1).wait(44));

	// Слой_13
	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-44.5,-0.9,31.9,-0.9).ss(3.4,1,1).p("AFtoaQh7EahLEMQhpF6A7CWIiOidIhYBBQhlBFg/APQgLgrgQgtQgihbgegK");
	this.shape_330.setTransform(276.925,240.3);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-24.2,29.1,51.4,22.5).ss(3.4,1,1).p("AlsFXQAeAKAiBaQAQAtALAsQA/gQBlhEIBYhBICOCcQg7iWBpl5QBLkMB7kb");
	this.shape_331.setTransform(276.925,240.3);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-3.8,59,70.9,45.9).ss(3.4,1,1).p("AlsFXQAeAKAiBaQAQAtALAsQA/gQBlhEIBYhBICOCcQg7iWBpl5QBLkMB7kb");
	this.shape_332.setTransform(276.925,240.3);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],16.6,89,90.4,69.3).ss(3.4,1,1).p("AFtoaQh7EahLEMQhpF6A7CWIiOidIhYBBQhlBFg/APQgLgrgQgtQgihbgegK");
	this.shape_333.setTransform(276.925,240.3);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],51,56.2,112.9,21).ss(3.4,1,1).p("AlsFXQAeAKAiBaQAQAtALAsQA/gQBlhEIBYhBICOCcQg7iWBpl5QBLkMB7kb");
	this.shape_334.setTransform(276.925,240.3);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],85.3,23.4,135.3,-27.2).ss(3.4,1,1).p("AlsFXQAeAKAiBaQAQAtALAsQA/gQBlhEIBYhBICOCcQg7iWBpl5QBLkMB7kb");
	this.shape_335.setTransform(276.925,240.3);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],119.7,-9.4,157.7,-75.5).ss(3.4,1,1).p("AFtoaQh7EahLEMQhpF6A7CWIiOidIhYBBQhlBFg/APQgLgrgQgtQgihbgegK");
	this.shape_336.setTransform(276.925,240.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_330}]},71).to({state:[{t:this.shape_331}]},1).to({state:[{t:this.shape_332}]},1).to({state:[{t:this.shape_333}]},1).to({state:[{t:this.shape_334}]},1).to({state:[{t:this.shape_335}]},1).to({state:[{t:this.shape_336}]},1).wait(38));

	// Слой_45
	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f().s("#000000").ss(3.4,1,1).p("AgnBEQgFgqAYgiQASgaArgh");
	this.shape_337.setTransform(315.7819,416.35);
	this.shape_337._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_337).wait(52).to({_off:false},0).wait(63));

	// Слой_44
	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],6.1,27,3.5,17.1).ss(3.4,1,1).p("AgcjfQgOBkAZBoQAsDFAHAu");
	this.shape_338.setTransform(321.7852,445.075);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-0.7,1.1,-3.3,-8.8).ss(3.4,1,1).p("AgcjfQgOBkAZBoQAsDFAHAu");
	this.shape_339.setTransform(321.7852,445.075);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-7.6,-24.9,-10.2,-34.8).ss(3.4,1,1).p("AgcjfQgOBkAZBoQAsDFAHAu");
	this.shape_340.setTransform(321.7852,445.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_338}]},49).to({state:[{t:this.shape_339}]},1).to({state:[{t:this.shape_340}]},1).wait(64));

	// Слой_46
	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-8.6,10.2,9,40.6).ss(3.4,1,1).p("Aiek6IBKCWQBPCkAVBPQAXBRA3BOQAlA0AcAZ");
	this.shape_341.setTransform(352.4,514.7);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-20.9,-13,-3.3,17.4).ss(3.4,1,1).p("Aiek6IBKCVQBPClAVBOQAXBRA3BPQAlA0AcAZ");
	this.shape_342.setTransform(352.4,514.7);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-33.1,-36.3,-15.5,-5.9).ss(3.4,1,1).p("Aiek6IBKCVQBPClAVBOQAXBRA3BPQAlA0AcAZ");
	this.shape_343.setTransform(352.4,514.7);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-45.4,-59.6,-27.8,-29.2).ss(3.4,1,1).p("Aiek6IBKCWQBPCkAVBPQAXBRA3BOQAlA0AcAZ");
	this.shape_344.setTransform(352.4,514.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_341}]},45).to({state:[{t:this.shape_342}]},1).to({state:[{t:this.shape_343}]},1).to({state:[{t:this.shape_344}]},1).wait(67));

	// Слой_18
	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-48.5,1.2,63.7,1.2).ss(3.4,1,1).p("AofAaQBWAUB0gLQB3gMAiAIQBOARCnBBQCWAyBUgeQBeghBWhsQBMhggDgo");
	this.shape_345.setTransform(439.8057,557.4625);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-89.7,3.3,22.5,3.3).ss(3.4,1,1).p("AofAaQBWAUB0gLQB3gMAiAIQBOARCnBBQCWAyBUgeQBeghBWhsQBMhggDgo");
	this.shape_346.setTransform(439.8057,557.4625);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-131,5.4,-18.8,5.4).ss(3.4,1,1).p("AofAaQBWAUB0gLQB3gMAiAIQBOARCnBBQCWAyBUgeQBeghBWhsQBMhggDgo");
	this.shape_347.setTransform(439.8057,557.4625);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-172.3,7.5,-60.1,7.5).ss(3.4,1,1).p("AofAaQBWAUB0gLQB3gMAiAIQBOARCnBBQCWAyBUgeQBeghBWhsQBMhggDgo");
	this.shape_348.setTransform(439.8057,557.4625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_345}]},41).to({state:[{t:this.shape_346}]},1).to({state:[{t:this.shape_347}]},1).to({state:[{t:this.shape_348}]},1).wait(71));

	// Слой_54
	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.1,-46.9,3.1,-33.8).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBlBDFc");
	this.shape_349.setTransform(271.4409,349.65);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],4.3,-27.9,4.3,-14.8).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBmBDFb");
	this.shape_350.setTransform(271.4409,349.65);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],5.5,-8.8,5.5,4.3).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBmBDFb");
	this.shape_351.setTransform(271.4409,349.65);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],6.8,10.3,6.8,23.4).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBmBDFb");
	this.shape_352.setTransform(271.4409,349.65);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],8,29.3,8,42.4).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBmBDFb");
	this.shape_353.setTransform(271.4409,349.65);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],9.2,48.4,9.2,61.5).ss(3.4,1,1).p("AgKnKQgVA4gLCFQgOChAVB2QARBlBDFc");
	this.shape_354.setTransform(271.4409,349.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_349}]},72).to({state:[{t:this.shape_350}]},1).to({state:[{t:this.shape_351}]},1).to({state:[{t:this.shape_352}]},1).to({state:[{t:this.shape_353}]},1).to({state:[{t:this.shape_354}]},1).wait(38));

	// Слой_53
	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],0.1,29.2,0.1,7.1).ss(3.4,1,1).p("ABekFQhpAMgyAyQg+A+A6BiQAuBOgOB0QgIA8ABAJQAAAdATAJ");
	this.shape_355.setTransform(260.9666,329.975);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.5,10.4,7.2,-10.7).ss(3.4,1,1).p("AgVEGQgTgJAAgdQgBgJAIg8QAOh0guhOQg6hiA+g+QAygyBpgM");
	this.shape_356.setTransform(260.9666,329.975);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],7,-8.4,14.4,-28.6).ss(3.4,1,1).p("AgVEGQgTgJAAgdQgBgJAIg8QAOh0guhOQg6hiA+g+QAygyBpgM");
	this.shape_357.setTransform(260.9666,329.975);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],10.5,-27.3,21.6,-46.4).ss(3.4,1,1).p("ABekFQhpAMgyAyQg+A+A6BiQAuBOgOB0QgIA8ABAJQAAAdATAJ");
	this.shape_358.setTransform(260.9666,329.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_355}]},69).to({state:[{t:this.shape_356}]},1).to({state:[{t:this.shape_357}]},1).to({state:[{t:this.shape_358}]},1).wait(43));

	// Слой_12
	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],5.5,-6.8,8.8,-19.1).ss(3.4,1,1).p("AguCJQBNgSAMg9QAFgbgCg0QgDhGgCgt");
	this.shape_359.setTransform(567.8286,425.525);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-0.9,11.1,2.4,-1.2).ss(3.4,1,1).p("AguCJQBNgSAMg9QAFgbgCg0QgDhGgCgt");
	this.shape_360.setTransform(567.8286,425.525);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-7.3,28.9,-4,16.6).ss(3.4,1,1).p("AguCJQBNgSAMg9QAFgbgCg0QgDhGgCgt");
	this.shape_361.setTransform(567.8286,425.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_359}]},69).to({state:[{t:this.shape_360}]},1).to({state:[{t:this.shape_361}]},1).wait(44));

	// Слой_52
	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f().s("#000000").ss(3.4,1,1).p("AhigMIAQAMQAUALAXAGQBIASBDg3");
	this.shape_362.setTransform(513.4,521.9782);
	this.shape_362._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_362).wait(62).to({_off:false},0).wait(53));

	// Слой_51
	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-53.5,150,-17.2,46.2).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_363.setTransform(545.975,400.8557);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-41.8,111.8,-5.5,8).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_364.setTransform(545.975,400.8557);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-30.1,73.6,6.2,-30.2).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_365.setTransform(545.975,400.8557);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18.4,35.4,17.9,-68.3).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_366.setTransform(545.975,400.8557);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.7,-2.7,29.6,-106.5).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_367.setTransform(545.975,400.8557);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],5,-40.9,41.3,-144.7).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_368.setTransform(545.975,400.8557);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],16.7,-79.1,53,-182.9).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_369.setTransform(545.975,400.8557);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],28.4,-117.3,64.7,-221.1).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_370.setTransform(545.975,400.8557);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],40.1,-155.5,76.4,-259.3).ss(3.4,1,1).p("AoUW9QAnADBEg1QBOg8BIhnQAdgpAtgyQA1g8AUgZQBZhyBYjcQBcjjBNkVQAchjA0jUQAOg7AakTQAdk/AFgiQAFgqBJkXQBHkNAMh7");
	this.shape_371.setTransform(545.975,400.8557);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_363}]},60).to({state:[{t:this.shape_364}]},1).to({state:[{t:this.shape_365}]},1).to({state:[{t:this.shape_366}]},1).to({state:[{t:this.shape_367}]},1).to({state:[{t:this.shape_368}]},1).to({state:[{t:this.shape_369}]},1).to({state:[{t:this.shape_370}]},1).to({state:[{t:this.shape_371}]},1).wait(47));

	// Слой_50
	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-83.6,-56.6,-26.3,17.2).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_372.setTransform(378.475,524.3678);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-52,-22.5,12.2,39.9).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_373.setTransform(378.475,524.3678);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-20.5,11.5,50.6,62.6).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_374.setTransform(378.475,524.3678);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],11.1,45.6,89,85.4).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_375.setTransform(378.475,524.3678);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],42.7,79.7,127.5,108.1).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_376.setTransform(378.475,524.3678);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],74.3,113.7,165.9,130.8).ss(3.4,1,1).p("As4oyQAdAvAdA8QAkBIAKATQCGDtELETQD+EFBvAjQBFAXCGAFQB4AFAuAWQBtA2A9AHQB5AQB3hX");
	this.shape_377.setTransform(378.475,524.3678);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_372}]},67).to({state:[{t:this.shape_373}]},1).to({state:[{t:this.shape_374}]},1).to({state:[{t:this.shape_375}]},1).to({state:[{t:this.shape_376}]},1).to({state:[{t:this.shape_377}]},1).wait(43));

	// Слой_49
	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-5.5,-27.2,-2.2,-14.8).ss(3.4,1,1).p("Agvj7IAZC6QAfDPAnBu");
	this.shape_378.setTransform(287.45,432.825);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-1.1,-8.5,2.2,3.9).ss(3.4,1,1).p("Agvj7IAZC6QAfDPAnBu");
	this.shape_379.setTransform(287.45,432.825);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],3.4,10.1,6.7,22.6).ss(3.4,1,1).p("Agvj7IAZC6QAfDPAnBu");
	this.shape_380.setTransform(287.45,432.825);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],7.9,28.8,11.2,41.3).ss(3.4,1,1).p("Agvj7IAZC6QAfDPAnBu");
	this.shape_381.setTransform(287.45,432.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_378}]},63).to({state:[{t:this.shape_379}]},1).to({state:[{t:this.shape_380}]},1).to({state:[{t:this.shape_381}]},1).wait(49));

	// Слой_48
	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.1,-36.9,-6.1,-25).ss(3.4,1,1).p("AgqlQIAuCyQAtC/gJBBQgEAbABA9QAABEAGBT");
	this.shape_382.setTransform(282.3,366.825);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-4.4,-12.6,-4.4,-0.7).ss(3.4,1,1).p("AgqlQIAuCyQAtC/gJBBQgEAbABA9QAABEAGBT");
	this.shape_383.setTransform(282.3,366.825);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-2.7,11.7,-2.7,23.6).ss(3.4,1,1).p("AgqlQIAuCyQAtC/gJBBQgEAbABA9QAABEAGBT");
	this.shape_384.setTransform(282.3,366.825);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-1,36,-1,47.9).ss(3.4,1,1).p("AgqlQIAuCyQAtC/gJBBQgEAbABA9QAABEAGBT");
	this.shape_385.setTransform(282.3,366.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_382}]},59).to({state:[{t:this.shape_383}]},1).to({state:[{t:this.shape_384}]},1).to({state:[{t:this.shape_385}]},1).wait(53));

	// Слой_47
	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-9.2,-109.3,9.4,-39.6).ss(3.4,1,1).p("AFYPeQiFjNhTjpQgTg1hWkuQgpiSgbgSQgQgKgeADQgtAIghAFQhYAPgzhwQgrhfAKhWQANhkAHhjQAKiOgHhEQgMh9AVhXQAWhYA1gp");
	this.shape_386.setTransform(266.647,377.15);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],1.9,-75.2,20.5,-5.5).ss(3.4,1,1).p("AjqvdQg1ApgWBYQgVBYAMB9QAHBDgKCPQgHBigNBkQgKBWArBfQAzBwBYgOQAhgFAtgJQAegDAQAKQAbASApCSQBWEuATA1QBTDpCFDN");
	this.shape_387.setTransform(266.647,377.15);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],12.9,-41,31.6,28.7).ss(3.4,1,1).p("AjqvdQg1ApgWBYQgVBYAMB9QAHBDgKCPQgHBigNBkQgKBWArBfQAzBwBYgOQAhgFAtgJQAegDAQAKQAbASApCSQBWEuATA1QBTDpCFDN");
	this.shape_388.setTransform(266.647,377.15);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],24,-6.9,42.7,62.8).ss(3.4,1,1).p("AjqvdQg1ApgWBYQgVBYAMB9QAHBDgKCPQgHBigNBkQgKBWArBfQAzBwBYgOQAhgFAtgJQAegDAQAKQAbASApCSQBWEuATA1QBTDpCFDN");
	this.shape_389.setTransform(266.647,377.15);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],35.1,27.3,53.7,97).ss(3.4,1,1).p("AjqvdQg1ApgWBYQgVBYAMB9QAHBDgKCPQgHBigNBkQgKBWArBfQAzBwBYgOQAhgFAtgJQAegDAQAKQAbASApCSQBWEuATA1QBTDpCFDN");
	this.shape_390.setTransform(266.647,377.15);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],46.1,61.4,64.8,131.1).ss(3.4,1,1).p("AjqvdQg1ApgWBYQgVBYAMB9QAHBDgKCPQgHBigNBkQgKBWArBfQAzBwBYgOQAhgFAtgJQAegDAQAKQAbASApCSQBWEuATA1QBTDpCFDN");
	this.shape_391.setTransform(266.647,377.15);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],57.2,95.6,75.9,165.3).ss(3.4,1,1).p("AFYPeQiFjNhTjpQgTg1hWkuQgpiSgbgSQgQgKgeADQgtAIghAFQhYAPgzhwQgrhfAKhWQANhkAHhjQAKiOgHhEQgMh9AVhXQAWhYA1gp");
	this.shape_392.setTransform(266.647,377.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_386}]},53).to({state:[{t:this.shape_387}]},1).to({state:[{t:this.shape_388}]},1).to({state:[{t:this.shape_389}]},1).to({state:[{t:this.shape_390}]},1).to({state:[{t:this.shape_391}]},1).to({state:[{t:this.shape_392}]},1).wait(56));

	// Слой_5
	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-4.6,-27.2,0,-10.1).ss(3.4,1,1).p("ABIDuQgXgNgXgWQgugtgDguIAuAJQAEgmgKhBQgTh/hEiA");
	this.shape_393.setTransform(496.3,445.825);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],1.2,-9.3,5.8,7.8).ss(3.4,1,1).p("AhGjtQBECAATB/QAKBBgEAmIgugJQADAuAuAtQAXAWAXAN");
	this.shape_394.setTransform(496.3,445.825);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],7,8.4,11.6,25.5).ss(3.4,1,1).p("AhGjtQBECAATB/QAKBBgEAmIgugJQADAuAuAtQAXAWAXAN");
	this.shape_395.setTransform(496.3,445.825);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],12.7,26.3,17.3,43.4).ss(3.4,1,1).p("ABIDuQgXgNgXgWQgugtgDguIAuAJQAEgmgKhBQgTh/hEiA");
	this.shape_396.setTransform(496.3,445.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_393}]},51).to({state:[{t:this.shape_394}]},1).to({state:[{t:this.shape_395}]},1).to({state:[{t:this.shape_396}]},1).wait(61));

	// Слой_4
	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],23,-15.5,-15.5,6.7).ss(3.4,1,1).p("ADNiZQhhATiDCMQhKBPgUASQgxAtgmAG");
	this.shape_397.setTransform(387.2,420.05);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],7.8,-5,-30.7,17.2).ss(3.4,1,1).p("AjMCaQAmgGAxgtQAUgSBKhPQCDiMBhgT");
	this.shape_398.setTransform(387.2,420.05);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-7.5,5.5,-45.9,27.7).ss(3.4,1,1).p("AjMCaQAmgGAxgtQAUgSBKhPQCDiMBhgT");
	this.shape_399.setTransform(387.2,420.05);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-22.7,16,-61.1,38.2).ss(3.4,1,1).p("ADNiZQhhATiDCMQhKBPgUASQgxAtgmAG");
	this.shape_400.setTransform(387.2,420.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_397}]},51).to({state:[{t:this.shape_398}]},1).to({state:[{t:this.shape_399}]},1).to({state:[{t:this.shape_400}]},1).wait(61));

	// Слой_33
	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-20.2,0.7,24.8,0.7).ss(3.4,1,1).p("AjPgPQAWAGBJAKQBKALApALQBQAVAbgDQA4gIAqhJ");
	this.shape_401.setTransform(465.3,500.1938);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-36.5,1.4,8.5,1.4).ss(3.4,1,1).p("AjPgPQAWAGBJAKQBKALApALQBQAVAbgDQA4gIAqhJ");
	this.shape_402.setTransform(465.3,500.1938);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-52.8,2.1,-7.8,2.1).ss(3.4,1,1).p("AjPgPQAWAGBJAKQBKALApALQBQAVAbgDQA4gIAqhJ");
	this.shape_403.setTransform(465.3,500.1938);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-69,2.8,-24,2.8).ss(3.4,1,1).p("AjPgPQAWAGBJAKQBKALApALQBQAVAbgDQA4gIAqhJ");
	this.shape_404.setTransform(465.3,500.1938);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_401}]},52).to({state:[{t:this.shape_402}]},1).to({state:[{t:this.shape_403}]},1).to({state:[{t:this.shape_404}]},1).wait(60));

	// Слой_3
	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-24.8,-11.2,23.6,-11.2).ss(3.4,1,1).p("AjgjhQCIC5AUAbQBoCJAqAjQAZAVAyAWQArASAdAF");
	this.shape_405.setTransform(385.85,468.5);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-8.1,-2.1,40.3,-2.1).ss(3.4,1,1).p("AjgjhQCIC5AUAbQBoCJAqAjQAZAWAyAVQArATAdAF");
	this.shape_406.setTransform(385.85,468.5);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],8.7,6.9,57.1,6.9).ss(3.4,1,1).p("AjgjhQCIC5AUAbQBoCJAqAjQAZAWAyAVQArATAdAF");
	this.shape_407.setTransform(385.85,468.5);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],25.5,16,73.9,16).ss(3.4,1,1).p("AjgjhQCIC5AUAbQBoCJAqAjQAZAVAyAWQArASAdAF");
	this.shape_408.setTransform(385.85,468.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_405}]},52).to({state:[{t:this.shape_406}]},1).to({state:[{t:this.shape_407}]},1).to({state:[{t:this.shape_408}]},1).wait(60));

	// Слой_2
	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f().s("#000000").ss(3.4,1,1).p("Ah8glIAvAmQAyAnARgCQANAAAqgWQArgQAlAO");
	this.shape_409.setTransform(357.975,443.4778);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f().s("#000000").ss(3.4,1,1).p("AA9AKQgMgXghAEQhLAIgBAA");
	this.shape_410.setTransform(493.525,476.1027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_410},{t:this.shape_409}]},51).wait(64));

	// Слой_1
	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-81.2,-4.3,66,-4.3).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAKBWAVQBGATB8AkQB2AcCTAGQBfAFCVAFQBKACAJADQAMAEAVATQAXATABAKQAEAOAVAs");
	this.shape_411.setTransform(425.85,461.2);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-49.8,-1.2,97.4,-1.2).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAJBWAWQBGASB8AlQB2AcCTAGQBfAECVAFQBKADAJACQAMAFAVASQAXAUABAKQAEAOAVAs");
	this.shape_412.setTransform(425.85,461.2);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18.4,2,128.8,2).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAJBWAWQBGASB8AlQB2AcCTAGQBfAECVAFQBKADAJACQAMAFAVASQAXAUABAKQAEAOAVAs");
	this.shape_413.setTransform(425.85,461.2);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],12.9,5.2,160.1,5.2).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAJBWAWQBGASB8AlQB2AcCTAGQBfAECVAFQBKADAJACQAMAFAVASQAXAUABAKQAEAOAVAs");
	this.shape_414.setTransform(425.85,461.2);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],44.3,8.3,191.5,8.3).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAJBWAWQBGASB8AlQB2AcCTAGQBfAECVAFQBKADAJACQAMAFAVASQAXAUABAKQAEAOAVAs");
	this.shape_415.setTransform(425.85,461.2);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],75.7,11.5,222.9,11.5).ss(3.4,1,1).p("ArOkCIA9ARQBDAXAbAhQBgB4BgAsQAnASA9AQQAkAKBWAVQBGATB8AkQB2AcCTAGQBfAFCVAFQBKACAJADQAMAEAVATQAXATABAKQAEAOAVAs");
	this.shape_416.setTransform(425.85,461.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_411}]},45).to({state:[{t:this.shape_412}]},1).to({state:[{t:this.shape_413}]},1).to({state:[{t:this.shape_414}]},1).to({state:[{t:this.shape_415}]},1).to({state:[{t:this.shape_416}]},1).wait(65));

	// Слой_34
	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f().s("#000000").ss(3.4,1,1).p("AhbhgQAAApA/A8QA1A1BDAn");
	this.shape_417.setTransform(511.6,429.475);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f().s("#000000").ss(3.4,1,1).p("AiFCiQgEgrADgXQAFgnAmgpQAmgnBihJIBbhB");
	this.shape_418.setTransform(354.2107,420.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_418},{t:this.shape_417}]},54).wait(61));

	// Слой_42
	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-34.8,-12.9,46.6,-12.9).ss(3.4,1,1).p("AGGilQg0ARgnAHQglAGgMgEQgEgBgVASQgvAqgHAFQheBNhnAqQhRAiiWAkQhvAbgVAZ");
	this.shape_419.setTransform(367.35,400.35);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-53.3,-2,25.9,-10.1).ss(3.4,1,1).p("AmFClQAVgYBvgbQCWgkBRgiQBngrBehNQAHgFAvgqQAlgMAlgGQAngHA0gR");
	this.shape_420.setTransform(367.35,400.35);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-71.7,8.9,5.3,-7.4).ss(3.4,1,1).p("AmFClQAVgYBvgbQCWgkBRgiQBngrBehNQAHgFAvgqQAlgMAlgGQAngHA0gR");
	this.shape_421.setTransform(367.35,400.35);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-90.2,19.8,-15.4,-4.6).ss(3.4,1,1).p("AmFClQAVgYBvgbQCWgkBRgiQBngrBehNQAHgFAvgqQAlgMAlgGQAngHA0gR");
	this.shape_422.setTransform(367.35,400.35);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-108.7,30.7,-36.1,-1.8).ss(3.4,1,1).p("AmFClQAVgYBvgbQCWgkBRgiQBngrBehNQAHgFAvgqQAlgMAlgGQAngHA0gR");
	this.shape_423.setTransform(367.35,400.35);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-127.2,41.7,-56.7,1).ss(3.4,1,1).p("AGGilQg0ARgnAHQglAGgMgEQgEgBgVASQgvAqgHAFQheBNhnAqQhRAiiWAkQhvAbgVAZ");
	this.shape_424.setTransform(367.35,400.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_419}]},48).to({state:[{t:this.shape_420}]},1).to({state:[{t:this.shape_421}]},1).to({state:[{t:this.shape_422}]},1).to({state:[{t:this.shape_423}]},1).to({state:[{t:this.shape_424}]},1).wait(62));

	// Слой_41
	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-14.4,-43.3,-3.3,-24).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA3AOBJQAVBqgBDy");
	this.shape_425.setTransform(505.3523,438.6);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-8.3,-26.2,2.8,-6.9).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA4AOBIQAVBqgBDy");
	this.shape_426.setTransform(505.3523,438.6);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-2.2,-9,8.9,10.3).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA4AOBIQAVBqgBDy");
	this.shape_427.setTransform(505.3523,438.6);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],4,8.1,15.1,27.4).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA4AOBIQAVBqgBDy");
	this.shape_428.setTransform(505.3523,438.6);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],10.1,25.3,21.2,44.6).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA4AOBIQAVBqgBDy");
	this.shape_429.setTransform(505.3523,438.6);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],16.3,42.4,27.4,61.7).ss(3.4,1,1).p("AhemnIAUBeQAWBiAJARQACACASBBQARA5AZAlQApA3AOBJQAVBqgBDy");
	this.shape_430.setTransform(505.3523,438.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_425}]},48).to({state:[{t:this.shape_426}]},1).to({state:[{t:this.shape_427}]},1).to({state:[{t:this.shape_428}]},1).to({state:[{t:this.shape_429}]},1).to({state:[{t:this.shape_430}]},1).wait(62));

	// Слой_40
	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-6.3,-28.6,2.5,4.3).ss(3.4,1,1).p("AhWjzIgmB4QgjB+AIAkQAOA5BGBDQA8A5AcAIQAxANBTAD");
	this.shape_431.setTransform(454.3179,404.025);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.239,0.271],-4.4,-22.6,8.2,8.1).ss(3.4,1,1).p("AhWjzIgmB4QgjB+AIAkQAOA5BGBDQA8A5AcAIQAxANBTAD");
	this.shape_432.setTransform(454.3179,404.025);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-2.3,-16.6,14.1,11.9).ss(3.4,1,1).p("AhWjzIgmB4QgjB+AIAkQAOA5BGBDQA8A5AcAIQAxANBTAD");
	this.shape_433.setTransform(454.3179,404.025);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.718,0.757],-0.3,-10.7,19.9,15.6).ss(3.4,1,1).p("AhWjzIgmB4QgjB+AIAkQAOA5BGBDQA8A5AcAIQAxANBTAD");
	this.shape_434.setTransform(454.3179,404.025);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],1.7,-4.7,25.7,19.4).ss(3.4,1,1).p("AhWjzIgmB4QgjB+AIAkQAOA5BGBDQA8A5AcAIQAxANBTAD");
	this.shape_435.setTransform(454.3179,404.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_431}]},44).to({state:[{t:this.shape_432}]},1).to({state:[{t:this.shape_433}]},1).to({state:[{t:this.shape_434}]},1).to({state:[{t:this.shape_435}]},1).wait(67));

	// Слой_39
	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f().s("#000000").ss(3.4,1,1).p("AADhgIgFDB");
	this.shape_436.setTransform(478.175,395.225);
	this.shape_436._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_436).wait(45).to({_off:false},0).wait(70));

	// Слой_37
	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],2.4,-16.7,2.4,-2.8).ss(3.4,1,1).p("AgziRIAcAiQAhAsAfA4QAfA4gyA4QgXAcgfAR");
	this.shape_437.setTransform(434.1969,315.525);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.318,0.353],0.2,-5.2,0.2,8.7).ss(3.4,1,1).p("AgziRIAcAiQAhAsAfA4QAfA4gyA4QgXAcgfAR");
	this.shape_438.setTransform(434.1969,315.525);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-1.9,6.4,-1.9,20.3).ss(3.4,1,1).p("AgziRIAcAiQAhAsAfA4QAfA4gyA4QgXAcgfAR");
	this.shape_439.setTransform(434.1969,315.525);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-4.1,18,-4.1,31.9).ss(3.4,1,1).p("AgziRIAcAiQAhAsAfA4QAfA4gyA4QgXAcgfAR");
	this.shape_440.setTransform(434.1969,315.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_437}]},41).to({state:[{t:this.shape_438}]},1).to({state:[{t:this.shape_439}]},1).to({state:[{t:this.shape_440}]},1).wait(71));

	// Слой_38
	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],1.4,-26.7,1.4,-14.7).ss(3.4,1,1).p("AgqDRQAYgjAWgtQAthbgHgvQgZimglgh");
	this.shape_441.setTransform(447.5217,316.65);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],0.2,-1.1,0.2,10.9).ss(3.4,1,1).p("AgqDSQAYgkAWgtQAthbgHgvQgZimglgh");
	this.shape_442.setTransform(447.5217,316.65);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-0.9,24.5,-0.9,36.5).ss(3.4,1,1).p("AgqDRQAYgjAWgtQAthbgHgvQgZimglgh");
	this.shape_443.setTransform(447.5217,316.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_441}]},39).to({state:[{t:this.shape_442}]},1).to({state:[{t:this.shape_443}]},1).wait(74));

	// Слой_36
	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],11.9,-54.4,11.9,-42.4).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_444.setTransform(483.341,355.625);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.192,0.224],9.4,-33.5,9.4,-21.5).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_445.setTransform(483.341,355.625);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.384,0.416],7,-12.6,7,-0.6).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_446.setTransform(483.341,355.625);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.573,0.612],4.6,8.3,4.6,20.3).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_447.setTransform(483.341,355.625);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.765,0.804],2.1,29.2,2.1,41.2).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_448.setTransform(483.341,355.625);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-0.3,50.1,-0.3,62.1).ss(3.4,1,1).p("AAVHbQAPj0AGhJQAFg4gRhOQgRhRgjhTQghhNAWhmQAThTAvhI");
	this.shape_449.setTransform(483.341,355.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_444}]},39).to({state:[{t:this.shape_445}]},1).to({state:[{t:this.shape_446}]},1).to({state:[{t:this.shape_447}]},1).to({state:[{t:this.shape_448}]},1).to({state:[{t:this.shape_449}]},1).wait(71));

	// Слой_32
	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-55.7,-23.6,42.3,-23.6).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_450.setTransform(450.3592,406.4151);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.082,0.11],-17.6,-29.9,-17.6,64.5).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_451.setTransform(450.3592,406.4151);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.161,0.188],-35.2,-33.9,49.6,15.1).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_452.setTransform(450.3592,406.4151);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.322,0.353],-51.3,-15.6,46.7,-15.6).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_453.setTransform(450.3592,406.4151);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-49.1,-11.6,48.8,-11.6).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_454.setTransform(450.3592,406.4151);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-47,-7.6,51,-7.6).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_455.setTransform(450.3592,406.4151);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.796,0.839],-44.8,-3.6,53.1,-3.6).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_456.setTransform(450.3592,406.4151);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-42.6,0.4,55.3,0.4).ss(3.4,1,1).p("AjvjwQgNg2gzAAQg0AAhCA7Qg8A2ALBRQAEAfAOAYQANAYANAEQAGACAcAEQAcADAXAIQBMAZBVBhQBvB+BOAgQBeAlB5g5QAdgOBBgzQA0gqAwgKQAfgGAOgjQANgfgFgsQgFgqgVgjQgXgmgigN");
	this.shape_457.setTransform(450.3592,406.4151);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_450}]},32).to({state:[{t:this.shape_451}]},1).to({state:[{t:this.shape_452}]},1).to({state:[{t:this.shape_453}]},1).to({state:[{t:this.shape_454}]},1).to({state:[{t:this.shape_455}]},1).to({state:[{t:this.shape_456}]},1).to({state:[{t:this.shape_457}]},1).wait(76));

	// Слой_31
	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],1.5,7.1,6.6,-11.9).ss(3.4,1,1).p("ABRhTQgLAqgaApQgzBVhJgB");
	this.shape_458.setTransform(447.425,283.9752);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.475,0.537],-5.8,6.9,5.2,-7.5).ss(3.4,1,1).p("AhQBUQBJABAzhVQAagpALgq");
	this.shape_459.setTransform(447.425,283.9752);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-13.1,6.6,3.9,-3.2).ss(3.4,1,1).p("ABRhTQgLAqgaApQgzBVhJgB");
	this.shape_460.setTransform(447.425,283.9752);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_458}]},27).to({state:[{t:this.shape_459}]},1).to({state:[{t:this.shape_460}]},1).wait(86));

	// Слой_30
	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-12.6,3.1,10.3,3.1).ss(3.4,1,1).p("ABigJQgbAOglAHQhLAOg4gp");
	this.shape_461.setTransform(449.225,294.3657);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-10.5,2.3,12.4,2.3).ss(3.4,1,1).p("AhhgPQA4ApBLgOQAlgHAbgO");
	this.shape_462.setTransform(449.225,294.3657);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-8.4,1.5,14.5,1.5).ss(3.4,1,1).p("ABigJQgbAOglAHQhLAOg4gp");
	this.shape_463.setTransform(449.225,294.3657);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_461}]},29).to({state:[{t:this.shape_462}]},1).to({state:[{t:this.shape_463}]},1).wait(84));

	// Слой_29
	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-15.3,-0.5,10.4,-0.5).ss(3.4,1,1).p("AhvgvIAUAVQAYAXAaARQBTA2BGgh");
	this.shape_464.setTransform(484.025,303.6723);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.318,0.353],-13.6,0.4,12.1,0.4).ss(3.4,1,1).p("AhvgvIAUAVQAYAXAaARQBTA2BGgh");
	this.shape_465.setTransform(484.025,303.6723);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-11.9,1.3,13.8,1.3).ss(3.4,1,1).p("AhvgvIAUAVQAYAXAaARQBTA2BGgh");
	this.shape_466.setTransform(484.025,303.6723);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-10.2,2.2,15.5,2.2).ss(3.4,1,1).p("AhvgvIAUAVQAYAXAaARQBTA2BGgh");
	this.shape_467.setTransform(484.025,303.6723);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_464}]},29).to({state:[{t:this.shape_465}]},1).to({state:[{t:this.shape_466}]},1).to({state:[{t:this.shape_467}]},1).wait(83));

	// Слой_24___копия
	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-17.5,-0.3,14.8,-0.3).ss(3.4,1,1).p("ACRBHQg2AZhBguQhNhDgsgkQgygrABAdQAAADABADQADATAOAc");
	this.shape_468.setTransform(426.7228,271.0406);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.239,0.271],-16.4,0.7,15.9,0.7).ss(3.4,1,1).p("Ah+gPQgOgcgDgTQgCgjAyArQAsAkBNBDQBBAuA2gZ");
	this.shape_469.setTransform(426.7462,271.1309);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-15.5,1.8,16.8,1.8).ss(3.4,1,1).p("Ah+gPQgOgcgDgTQgCgjAyArQAsAkBNBDQBBAuA2gZ");
	this.shape_470.setTransform(426.7462,271.1309);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.718,0.757],-14.4,3,17.9,3).ss(3.4,1,1).p("Ah+gPQgOgcgDgTQgCgjAyArQAsAkBNBDQBBAuA2gZ");
	this.shape_471.setTransform(426.7462,271.1309);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-13.4,4.2,18.9,4.2).ss(3.4,1,1).p("ACRBHQg2AZhBguQhNhDgsgkQgygrABAdQAAADABADQADATAOAc");
	this.shape_472.setTransform(426.7228,271.0406);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_468}]},41).to({state:[{t:this.shape_469}]},1).to({state:[{t:this.shape_470}]},1).to({state:[{t:this.shape_471}]},1).to({state:[{t:this.shape_472}]},1).wait(70));

	// Слой_26
	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-31.7,-2.6,29.5,-2.6).ss(3.4,1,1).p("AEhCoQgDgZgPgbQgFgJgGgKQgzhMhpgaQhbgXg3ADQg6ADg3gMQhNgTgjg7QgLgSgGgUIgEgR");
	this.shape_473.setTransform(385.15,252.7);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.192,0.224],-31,-1.5,30.2,-1.5).ss(3.4,1,1).p("AkginIAEARQAGAUALASQAjA7BNATQA3AMA6gDQA3gDBbAXQBpAaAzBMQAaAuADAZ");
	this.shape_474.setTransform(385.15,252.7);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.384,0.416],-30.2,-0.4,31,-0.4).ss(3.4,1,1).p("AkginIAEARQAGAUALASQAjA7BNATQA3AMA6gDQA3gDBbAXQBpAaAzBMQAaAuADAZ");
	this.shape_475.setTransform(385.15,252.7);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.573,0.612],-29.5,0.7,31.7,0.7).ss(3.4,1,1).p("AkginIAEARQAGAUALASQAjA7BNATQA3AMA6gDQA3gDBbAXQBpAaAzBMQAaAuADAZ");
	this.shape_476.setTransform(385.15,252.7);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.765,0.804],-28.8,1.8,32.4,1.8).ss(3.4,1,1).p("AkginIAEARQAGAUALASQAjA7BNATQA3AMA6gDQA3gDBbAXQBpAaAzBMQAaAuADAZ");
	this.shape_477.setTransform(385.15,252.7);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-28.1,2.9,33.1,2.9).ss(3.4,1,1).p("AEhCoQgDgZgPgbQgFgJgGgKQgzhMhpgaQhbgXg3ADQg6ADg3gMQhNgTgjg7QgLgSgGgUIgEgR");
	this.shape_478.setTransform(385.15,252.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_473}]},36).to({state:[{t:this.shape_474}]},1).to({state:[{t:this.shape_475}]},1).to({state:[{t:this.shape_476}]},1).to({state:[{t:this.shape_477}]},1).to({state:[{t:this.shape_478}]},1).wait(74));

	// Слой_25
	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-10.5,2.2,17.1,2.2).ss(3.4,1,1).p("AhqicIgKAqQgIAzAKAtQAgCQDLAf");
	this.shape_479.setTransform(366.9472,251.575);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.71,0.769],-11.1,-3.3,13,2.7).ss(3.4,1,1).p("AhqicIgKAqQgIAzAKAtQAgCQDLAf");
	this.shape_480.setTransform(366.9472,251.575);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.475,0.537],-11.7,-8.8,9,3.1).ss(3.4,1,1).p("AhqicIgKAqQgIAzAKAtQAgCQDLAf");
	this.shape_481.setTransform(366.9472,251.575);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.235,0.306],-12.4,-14.4,4.8,3.5).ss(3.4,1,1).p("AhqicIgKAqQgIAzAKAtQAgCQDLAf");
	this.shape_482.setTransform(366.9472,251.575);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-13.1,-19.9,0.7,4).ss(3.4,1,1).p("AhqicIgKAqQgIAzAKAtQAgCQDLAf");
	this.shape_483.setTransform(366.9472,251.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_479}]},32).to({state:[{t:this.shape_480}]},1).to({state:[{t:this.shape_481}]},1).to({state:[{t:this.shape_482}]},1).to({state:[{t:this.shape_483}]},1).wait(79));

	// Слой_24
	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-30.5,1.5,37.9,1.5).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_484.setTransform(408.6682,278.05);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.757,0.816],-32.5,1.3,35.9,1.3).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_485.setTransform(408.6682,278.05);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.569,0.631],-34.5,1.1,33.9,1.1).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_486.setTransform(408.6682,278.05);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.376,0.443],-36.5,1,31.9,1).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_487.setTransform(408.6682,278.05);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.188,0.259],-38.5,0.8,29.9,0.8).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_488.setTransform(408.6682,278.05);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-40.5,0.6,27.9,0.6).ss(3.4,1,1).p("AlDhhQgLANBXAPQDDAiC3BzQBEAqBGg4QAjgcAVgl");
	this.shape_489.setTransform(408.6682,278.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_484}]},26).to({state:[{t:this.shape_485}]},1).to({state:[{t:this.shape_486}]},1).to({state:[{t:this.shape_487}]},1).to({state:[{t:this.shape_488}]},1).to({state:[{t:this.shape_489}]},1).wait(84));

	// Слой_27
	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-223.7,17.7,-219.4,56).ss(3.4,1,1).p("AFpBdQgOgoglghQhJhBhwAhQicA8hIANQh1AWiChNQgggSBEgqQAigVAogR");
	this.shape_490.setTransform(528.1604,296.6);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-234.9,157.2,-207.8,184.5).ss(3.4,1,1).p("AFpBdQgOgoglghQhJhBhwAhQicA8hIANQh1AWiChNQgggSBEgqQAigVAogR");
	this.shape_491.setTransform(528.1604,296.6);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-81.7,182.3,-42.7,182.3).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_492.setTransform(528.1604,296.6);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-36.4,122.2,8.9,110.1).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_493.setTransform(528.1604,296.6);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-46.2,59.3,8.1,48.8).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_494.setTransform(528.1604,296.6);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-43,56.9,16.6,49).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_495.setTransform(528.1604,296.6);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-39.8,54.4,25.1,49.2).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_496.setTransform(528.1604,296.6);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-36.7,52,33.6,49.4).ss(3.4,1,1).p("AjwhcQgoARgiAVQhEAqAgASQCCBNB1gWQBIgNCcg8QBwghBJBBQAlAhAOAo");
	this.shape_497.setTransform(528.1604,296.6);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-33.6,49.6,42,49.6).ss(3.4,1,1).p("AFpBdQgOgoglghQhJhBhwAhQicA8hIANQh1AWiChNQgggSBEgqQAigVAogR");
	this.shape_498.setTransform(528.1604,296.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_490}]},26).to({state:[{t:this.shape_491}]},1).to({state:[{t:this.shape_492}]},1).to({state:[{t:this.shape_493}]},1).to({state:[{t:this.shape_494}]},1).to({state:[{t:this.shape_495}]},1).to({state:[{t:this.shape_496}]},1).to({state:[{t:this.shape_497}]},1).to({state:[{t:this.shape_498}]},1).wait(81));

	// Слой_28
	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-0.6,-20.6,9.5,17.3).ss(3.4,1,1).p("AiGhkQgOAKgMALQgYAWAIAFQADACAogTQA1gYAjgMQCFgtA0A9QA1A9gSBSQgJAqgUAd");
	this.shape_499.setTransform(549.6892,293.3403);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.757,0.816],-5.1,-18.8,9.1,16.5).ss(3.4,1,1).p("AiNhkQgOAKgMALQgOAdAogTQA2gYAjgMQCEgtA0A9QA2A9gTBSQgJAqgUAd");
	this.shape_500.setTransform(550.4424,293.3403);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.569,0.631],-8.8,-17,9.4,15.7).ss(3.4,1,1).p("AiNhkQgOAKgMALQgOAdAogTQA2gYAjgMQCEgtA0A9QA2A9gTBSQgJAqgUAd");
	this.shape_501.setTransform(550.4424,293.3403);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.376,0.443],-12.4,-15.2,9.8,14.8).ss(3.4,1,1).p("AiNhkQgOAKgMALQgOAdAogTQA2gYAjgMQCEgtA0A9QA2A9gTBSQgJAqgUAd");
	this.shape_502.setTransform(550.4424,293.3403);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.188,0.259],-16.2,-13.5,10.1,14).ss(3.4,1,1).p("AiNhkQgOAKgMALQgOAdAogTQA2gYAjgMQCEgtA0A9QA2A9gTBSQgJAqgUAd");
	this.shape_503.setTransform(550.4424,293.3403);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-19.1,-11.7,11.2,13.1).ss(3.4,1,1).p("AiGhkQgOAKgMALQgYAWAIAFQADACAogTQA1gYAjgMQCFgtA0A9QA1A9gSBSQgJAqgUAd");
	this.shape_504.setTransform(549.6892,293.3403);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_499}]},34).to({state:[{t:this.shape_500}]},1).to({state:[{t:this.shape_501}]},1).to({state:[{t:this.shape_502}]},1).to({state:[{t:this.shape_503}]},1).to({state:[{t:this.shape_504}]},1).wait(76));

	// Слой_23
	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-17.4,1,18.1,1).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_505.setTransform(520.125,287.7661);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.757,0.816],-18.3,0,17,1.9).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_506.setTransform(520.125,287.7661);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.569,0.631],-19.2,-1,15.8,2.7).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_507.setTransform(520.125,287.7661);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.376,0.443],-20.2,-2,14.6,3.5).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_508.setTransform(520.125,287.7661);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.188,0.259],-21.1,-3,13.4,4.4).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_509.setTransform(520.125,287.7661);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-22.1,-4,12.2,5.2).ss(3.4,1,1).p("AiggDQAdAzgIANQgFAJBDgwQA+gqAigcQAZgUA9AKQAeAFAaAI");
	this.shape_510.setTransform(520.125,287.7661);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_505}]},40).to({state:[{t:this.shape_506}]},1).to({state:[{t:this.shape_507}]},1).to({state:[{t:this.shape_508}]},1).to({state:[{t:this.shape_509}]},1).to({state:[{t:this.shape_510}]},1).wait(70));

	// Слой_15
	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-28.3,5.7,39,5.7).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_511.setTransform(388.725,290.3466);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.788,0.847],-30.7,5.6,36.5,5.6).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_512.setTransform(388.725,290.3466);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.631,0.69],-33.2,5.6,34.1,5.6).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_513.setTransform(388.725,290.3466);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.475,0.537],-35.5,5.5,31.7,5.5).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_514.setTransform(388.725,290.3466);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.314,0.384],-38,5.4,29.3,5.4).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_515.setTransform(388.725,290.3466);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.157,0.227],-40.4,5.4,26.8,5.4).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_516.setTransform(388.725,290.3466);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-42.9,5.3,24.4,5.3).ss(3.4,1,1).p("Ak+hKIBPgfQBcgfA/gBQBCgCBIAgQA4AYAQATQAEAFA0BEQAxBAAIAGQABACAoAaQAgAVAHAL");
	this.shape_517.setTransform(388.725,290.3466);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_511}]},20).to({state:[{t:this.shape_512}]},1).to({state:[{t:this.shape_513}]},1).to({state:[{t:this.shape_514}]},1).to({state:[{t:this.shape_515}]},1).to({state:[{t:this.shape_516}]},1).to({state:[{t:this.shape_517}]},1).wait(89));

	// Слой_16
	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-37.8,4,31.9,4).ss(3.4,1,1).p("AFMBbIgShWQhZhchXgDQhMgDiFBGQhuA4g+AHQgZACg/gM");
	this.shape_518.setTransform(521.825,312.1207);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.161,0.188],-36.2,4,33.5,4).ss(3.4,1,1).p("AlLAeQA/AMAZgCQA+gHBug4QCFhGBMADQBXADBZBcIASBW");
	this.shape_519.setTransform(521.825,312.1207);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.318,0.353],-34.8,4,34.9,4).ss(3.4,1,1).p("AlLAeQA/AMAZgCQA+gHBug4QCFhGBMADQBXADBZBcIASBW");
	this.shape_520.setTransform(521.825,312.1207);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-33.2,4,36.5,4).ss(3.4,1,1).p("AlLAeQA/AMAZgCQA+gHBug4QCFhGBMADQBXADBZBcIASBW");
	this.shape_521.setTransform(521.825,312.1207);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-31.7,4,38,4).ss(3.4,1,1).p("AlLAeQA/AMAZgCQA+gHBug4QCFhGBMADQBXADBZBcIASBW");
	this.shape_522.setTransform(521.825,312.1207);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.796,0.839],-30.2,4,39.5,4).ss(3.4,1,1).p("AlLAeQA/AMAZgCQA+gHBug4QCFhGBMADQBXADBZBcIASBW");
	this.shape_523.setTransform(521.825,312.1207);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-28.6,4,41.1,4).ss(3.4,1,1).p("AFMBbIgShWQhZhchXgDQhMgDiFBGQhuA4g+AHQgZACg/gM");
	this.shape_524.setTransform(521.825,312.1207);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_518}]},20).to({state:[{t:this.shape_519}]},1).to({state:[{t:this.shape_520}]},1).to({state:[{t:this.shape_521}]},1).to({state:[{t:this.shape_522}]},1).to({state:[{t:this.shape_523}]},1).to({state:[{t:this.shape_524}]},1).wait(89));

	// Слой_17
	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-27.6,0.4,38.1,0.4).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_525.setTransform(379.15,312.5926);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.757,0.816],-29.9,0.1,35.8,0.1).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_526.setTransform(379.15,312.5926);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.569,0.631],-32.3,-0.1,33.4,-0.1).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_527.setTransform(379.15,312.5926);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.376,0.443],-34.6,-0.4,31.1,-0.4).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_528.setTransform(379.15,312.5926);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.188,0.259],-36.9,-0.7,28.8,-0.7).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_529.setTransform(379.15,312.5926);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-39.3,-1,26.4,-1).ss(3.4,1,1).p("Ak2h3IBCBMQBUBRBZAjQBjAnBWAHQBCAFBXgOQAWgDAXgC");
	this.shape_530.setTransform(379.15,312.5926);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_525}]},26).to({state:[{t:this.shape_526}]},1).to({state:[{t:this.shape_527}]},1).to({state:[{t:this.shape_528}]},1).to({state:[{t:this.shape_529}]},1).to({state:[{t:this.shape_530}]},1).wait(84));

	// Слой_19
	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-23.6,-0.7,17.5,-0.7).ss(3.4,1,1).p("Ai8gRIAmAKQAvALAvAHQCWAVBfgl");
	this.shape_531.setTransform(522.425,348.3769);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.239,0.271],-20.9,-0.3,20.2,-0.3).ss(3.4,1,1).p("Ai8gRIAmAKQAvALAvAHQCWAVBfgl");
	this.shape_532.setTransform(522.425,348.3769);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-18.2,0,22.9,0).ss(3.4,1,1).p("Ai8gRIAmAKQAvALAvAHQCWAVBfgl");
	this.shape_533.setTransform(522.425,348.3769);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.718,0.757],-15.5,0.4,25.6,0.4).ss(3.4,1,1).p("Ai8gRIAmAKQAvALAvAHQCWAVBfgl");
	this.shape_534.setTransform(522.425,348.3769);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-12.8,0.8,28.3,0.8).ss(3.4,1,1).p("Ai8gRIAmAKQAvALAvAHQCWAVBfgl");
	this.shape_535.setTransform(522.425,348.3769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_531}]},26).to({state:[{t:this.shape_532}]},1).to({state:[{t:this.shape_533}]},1).to({state:[{t:this.shape_534}]},1).to({state:[{t:this.shape_535}]},1).wait(85));

	// Слой_20
	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-16.7,7.6,18.5,7.6).ss(3.4,1,1).p("AiegwICNAkQCSAoAeAV");
	this.shape_536.setTransform(397.4,327.9);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.318,0.353],-15.7,7.6,19.5,7.6).ss(3.4,1,1).p("AiegwICNAkQCSAoAeAV");
	this.shape_537.setTransform(397.4,327.9);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-14.7,7.7,20.5,7.7).ss(3.4,1,1).p("AiegwICNAkQCSAoAeAV");
	this.shape_538.setTransform(397.4,327.9);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-13.7,7.8,21.5,7.8).ss(3.4,1,1).p("AiegwICNAkQCSAoAeAV");
	this.shape_539.setTransform(397.4,327.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_536}]},31).to({state:[{t:this.shape_537}]},1).to({state:[{t:this.shape_538}]},1).to({state:[{t:this.shape_539}]},1).wait(81));

	// Слой_21
	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-34.3,1.4,44.7,1.4).ss(3.4,1,1).p("AF6AUQgQgBibAMQiMALgugIQghgGhogjQhagfgdACQghACg6AHIgzAH");
	this.shape_540.setTransform(367.925,329.4374);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.757,0.816],-36.9,1.7,42.1,1.7).ss(3.4,1,1).p("Al5gUIAzgHQA6gHAhgCQAdgCBaAfQBoAjAhAGQAuAICMgLQCbgMAQAB");
	this.shape_541.setTransform(367.925,329.4374);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.569,0.631],-39.5,2.1,39.5,2.1).ss(3.4,1,1).p("Al5gUIAzgHQA6gHAhgCQAdgCBaAfQBoAjAhAGQAuAICMgLQCbgMAQAB");
	this.shape_542.setTransform(367.925,329.4374);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.376,0.443],-42,2.4,37,2.4).ss(3.4,1,1).p("Al5gUIAzgHQA6gHAhgCQAdgCBaAfQBoAjAhAGQAuAICMgLQCbgMAQAB");
	this.shape_543.setTransform(367.925,329.4374);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.188,0.259],-44.6,2.8,34.4,2.8).ss(3.4,1,1).p("Al5gUIAzgHQA6gHAhgCQAdgCBaAfQBoAjAhAGQAuAICMgLQCbgMAQAB");
	this.shape_544.setTransform(367.925,329.4374);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-47.2,3.1,31.8,3.1).ss(3.4,1,1).p("AF6AUQgQgBibAMQiMALgugIQghgGhogjQhagfgdACQghACg6AHIgzAH");
	this.shape_545.setTransform(367.925,329.4374);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_540}]},34).to({state:[{t:this.shape_541}]},1).to({state:[{t:this.shape_542}]},1).to({state:[{t:this.shape_543}]},1).to({state:[{t:this.shape_544}]},1).to({state:[{t:this.shape_545}]},1).wait(76));

	// Слой_22
	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-18,-1,11.8,-1).ss(3.4,1,1).p("AiDhDIBxBDQB3BEAfAA");
	this.shape_546.setTransform(512.35,343.025);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.239,0.271],-17,-0.3,12.8,-0.3).ss(3.4,1,1).p("AiDhDIBxBDQB3BEAfAA");
	this.shape_547.setTransform(512.35,343.025);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-15.9,0.3,13.9,0.3).ss(3.4,1,1).p("AiDhDIBxBDQB3BEAfAA");
	this.shape_548.setTransform(512.35,343.025);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.718,0.757],-14.9,1,14.9,1).ss(3.4,1,1).p("AiDhDIBxBDQB3BEAfAA");
	this.shape_549.setTransform(512.35,343.025);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-13.8,1.7,16,1.7).ss(3.4,1,1).p("AiDhDIBxBDQB3BEAfAA");
	this.shape_550.setTransform(512.35,343.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_546}]},30).to({state:[{t:this.shape_547}]},1).to({state:[{t:this.shape_548}]},1).to({state:[{t:this.shape_549}]},1).to({state:[{t:this.shape_550}]},1).wait(81));

	// Слой_14
	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-15.7,5.7,12.9,5.7).ss(3.4,1,1).p("AB+AyQgjgFgxgPQhigdhFgx");
	this.shape_551.setTransform(524.425,354.05);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.239,0.271],-14.7,7.2,13.9,7.2).ss(3.4,1,1).p("Ah9gwQBFAxBiAdQAxAPAjAE");
	this.shape_552.setTransform(524.425,354.05);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-13.8,8.7,14.8,8.7).ss(3.4,1,1).p("Ah9gwQBFAxBiAdQAxAPAjAE");
	this.shape_553.setTransform(524.425,354.05);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.718,0.757],-12.9,10.2,15.7,10.2).ss(3.4,1,1).p("Ah9gwQBFAxBiAdQAxAPAjAE");
	this.shape_554.setTransform(524.425,354.05);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-11.9,11.7,16.7,11.7).ss(3.4,1,1).p("AB+AyQgjgFgxgPQhigdhFgx");
	this.shape_555.setTransform(524.425,354.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_551}]},35).to({state:[{t:this.shape_552}]},1).to({state:[{t:this.shape_553}]},1).to({state:[{t:this.shape_554}]},1).to({state:[{t:this.shape_555}]},1).wait(76));

	// Слой_7
	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-25,6.1,34.2,6.1).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_556.setTransform(390.9839,299.5243);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.812,0.867],-26.8,3.8,32.4,3.8).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_557.setTransform(390.9839,299.5243);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.675,0.737],-28.6,1.5,30.6,1.5).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_558.setTransform(390.9839,299.5243);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.541,0.604],-30.3,-0.7,28.9,-0.7).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_559.setTransform(390.9839,299.5243);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.404,0.471],-32.1,-2.9,27.1,-2.9).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_560.setTransform(390.9839,299.5243);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.271,0.337],-33.9,-5.2,25.3,-5.2).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_561.setTransform(390.9839,299.5243);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.133,0.208],-35.7,-7.5,23.5,-7.5).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_562.setTransform(390.9839,299.5243);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-37.5,-9.7,21.7,-9.7).ss(3.4,1,1).p("AkSgeQgFgHABgJQAEgUAkgOQAwgSA3gNQA7gPAWADQApAFAkAOQA7AWAaAkQAXAeAWAsQARAhADAAQAIgBAlAVQAoAWAVAV");
	this.shape_563.setTransform(390.9839,299.5243);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_556}]},12).to({state:[{t:this.shape_557}]},1).to({state:[{t:this.shape_558}]},1).to({state:[{t:this.shape_559}]},1).to({state:[{t:this.shape_560}]},1).to({state:[{t:this.shape_561}]},1).to({state:[{t:this.shape_562}]},1).to({state:[{t:this.shape_563}]},1).wait(96));

	// zr
	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#000000").s().p("AhSBCQgvgtAKg1QAJg0A0gMQAkgIA0APQAsANAaATQAVAOABAXQABASgOAsQgOAshAALQgPACgOAAQgwAAgkghg");
	this.shape_564.setTransform(387.5556,292.145,0.3819,0.3819);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#000000").s().p("AgvAnQgcgaAFgfQAGgfAfgHQAVgEAeAIQAZAIAQALQAMAIABAOQAAALgIAZQgIAZgmAHIgQACQgcAAgVgUg");
	this.shape_565.setTransform(387.5313,294.0475);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#000000").s().p("AhBA0QglgjAHgqQAIgqApgJQAcgGApAMQAjAKAVAPQARALABASQAAAPgLAiQgLAjgzAJQgMACgLAAQgmAAgcgbg");
	this.shape_566.setTransform(387.5628,295.9146);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_564,p:{scaleX:0.3819,scaleY:0.3819,x:387.5556,y:292.145}}]},19).to({state:[{t:this.shape_565}]},1).to({state:[{t:this.shape_566}]},1).to({state:[{t:this.shape_564,p:{scaleX:1,scaleY:1,x:387.546,y:297.8168}}]},1).wait(93));

	// Слой_8
	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f().s("#000000").ss(3.4,1,1).p("AguAAIBdAA");
	this.shape_567.setTransform(407.125,308.075);
	this.shape_567._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_567).wait(22).to({_off:false},0).wait(93));

	// Слой_9
	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.945,1],-10.4,9.6,15.7,9.6).ss(3.4,1,1).p("AhxgjIAKAJQANALAUAKQBDAgB1AJ");
	this.shape_568.setTransform(384.5,305.075);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.631,0.69],-13.2,7.4,12.9,7.4).ss(3.4,1,1).p("AhxgjIAKAJQANALAUAKQBDAgB1AJ");
	this.shape_569.setTransform(384.5,305.075);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0.314,0.384],-15.9,5.2,10.2,5.2).ss(3.4,1,1).p("AhxgjIAKAJQANALAUAKQBDAgB1AJ");
	this.shape_570.setTransform(384.5,305.075);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f().ls(["rgba(0,0,0,0)","#000000"],[0,0.075],-18.7,3,7.4,3).ss(3.4,1,1).p("AhxgjIAKAJQANALAUAKQBDAgB1AJ");
	this.shape_571.setTransform(384.5,305.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_568}]},23).to({state:[{t:this.shape_569}]},1).to({state:[{t:this.shape_570}]},1).to({state:[{t:this.shape_571}]},1).wait(89));

	// Слой_6
	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-28.3,1.1,22.9,1.1).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_572.setTransform(521.75,319.2801);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.137,0.165],-26.8,1.3,24.4,1.3).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_573.setTransform(521.75,319.2801);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.275,0.306],-25.2,1.6,26,1.6).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_574.setTransform(521.75,319.2801);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.412,0.443],-23.6,1.8,27.6,1.8).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_575.setTransform(521.75,319.2801);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.545,0.584],-22.1,2,29.1,2).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_576.setTransform(521.75,319.2801);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.682,0.722],-20.5,2.2,30.7,2.2).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_577.setTransform(521.75,319.2801);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.82,0.863],-18.9,2.5,32.3,2.5).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_578.setTransform(521.75,319.2801);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-17.4,2.7,33.8,2.7).ss(3.4,1,1).p("AjuAhQAcgIAHgCQAZgGAIAEQAEACAwghQA4gnAmgJQBVgWAsANQAdAIAZAVQApAkAnBL");
	this.shape_579.setTransform(521.75,319.2801);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_572}]},12).to({state:[{t:this.shape_573}]},1).to({state:[{t:this.shape_574}]},1).to({state:[{t:this.shape_575}]},1).to({state:[{t:this.shape_576}]},1).to({state:[{t:this.shape_577}]},1).to({state:[{t:this.shape_578}]},1).to({state:[{t:this.shape_579}]},1).wait(96));

	// zr_2
	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#000000").s().p("AABBWQhHgFghg7QgNgWgCgTQgBgUAJgFQAvgZA9gMQBOgPAZAgQAhAogcA3QgbA4hDAAIgLgBg");
	this.shape_580.setTransform(524.9977,316.1658,0.4253,0.4253);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#000000").s().p("AABA1QgrgDgVglQgIgNgBgMQgBgMAFgDQAdgPAngIQAvgJAQAUQAUAYgRAiQgSAjgpAAIgGgBg");
	this.shape_581.setTransform(524.9883,317.769);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#000000").s().p("AABBGQg5gEgbgwQgLgSgBgPQgBgQAHgEQAmgVAygJQA+gMAVAZQAbAhgXAsQgWAtg2AAIgJAAg");
	this.shape_582.setTransform(524.9915,319.3345);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_580,p:{scaleX:0.4253,scaleY:0.4253,x:524.9977,y:316.1658}}]},19).to({state:[{t:this.shape_581}]},1).to({state:[{t:this.shape_582}]},1).to({state:[{t:this.shape_580,p:{scaleX:1,scaleY:1,x:524.9819,y:320.9272}}]},1).wait(93));

	// Слой_10
	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f().s("#000000").ss(3.4,1,1).p("AgegSIA9Al");
	this.shape_583.setTransform(505.125,324.225);
	this.shape_583._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_583).wait(22).to({_off:false},0).wait(93));

	// Слой_11
	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-13.5,-0.3,9.9,-0.3).ss(3.4,1,1).p("AhjgGIA9AKQBJAIBBgM");
	this.shape_584.setTransform(530.475,329.6274);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.318,0.353],-11.5,3.5,11.8,3.5).ss(3.4,1,1).p("AhjgGIA9AKQBJAIBBgM");
	this.shape_585.setTransform(530.475,329.6274);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.639,0.675],-9.5,7.3,13.9,7.3).ss(3.4,1,1).p("AhjgGIA9AKQBJAIBBgM");
	this.shape_586.setTransform(530.475,329.6274);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-7.5,11.1,15.9,11.1).ss(3.4,1,1).p("AhjgGIA9AKQBJAIBBgM");
	this.shape_587.setTransform(530.475,329.6274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_584}]},23).to({state:[{t:this.shape_585}]},1).to({state:[{t:this.shape_586}]},1).to({state:[{t:this.shape_587}]},1).wait(89));

	// l_jacke
	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0,0.027],-74.8,-238.1,91.5,48.2).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBRhqDlQilFXhED8QgvCwACB9QAAAqBdAVQBAAOCOAIQCrAKAoAFQBjANAKAcQAKAchjBGQg0AlirBnQieBghAAwQhhBKAMAjQAYBAH7LeQD+FvD5FiIG8BbQHNBZBWgIQA2gFHegPQG4gPAagJQAdgKHGiCQDjhADdg/QA8iCA8iIQB3kQgCggQgCgci7huQjChzgIgOQgHgLBCg2QBehKA1gqQDViqgcgwQgeg1i/oqIi4oh");
	this.shape_588.setTransform(365.0916,580.008);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.094,0.125],-71.4,-229.8,99.2,63.8).ss(3.4,1,1).p("Axs/FQizBHhbA2QhfA5g9BLQg0BBg/CBQgnBRhqDkQikFWhFD8QgvCwACB9QABArBaAVQBCAOCMAJQCqAKApAFQBjAMALAaQALAfhhBFQg2AmipBmQifBgg/AwQglAcgVAWQgjAkAFAVQAbBFH3LYQD/FxD3FfQACADABACIG2BZQADABADAAQHBBXBdgGQADAAADAAQA3gFHWgPQADAAAEAAQGcgNAwgJQADgBADgBQAfgLG8h+QAEgBAEgBQDfhADZg9QADgCAEgBQA6h+A6iEQACgEACgEQBtj5AHgvQABgFgBgDQgDgcixhpQgEgDgFgCQiqhlgagWQgFgEAAgCQgFgMA5gvQAEgDADgDQBZhFA0gpQADgDAEgDQDEicgJg1QgBgFgCgEQgRgeg8imQg2iWhakFIi4oh");
	this.shape_589.setTransform(365.0574,579.9944);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.192,0.224],-68.1,-221.5,106.8,79.4).ss(3.4,1,1).p("Axs/FQizBHhbA2QhfA5g9BLQg0BBg/CBQgnBRhqDkQikFXhFD7QgvCxACB8QABArBaAVQBCAOCMAJQCqAKApAFQBjAMALAbQALAehhBFQg2AmiqBmQieBgg/AwQgmAcgVAWQgjAkAGAWQAcBGH2LXQD/FwD3FgQACACACACIG2BZQADABADAAQHCBXBbgGQADAAADAAQA6gFHUgPQADAAAEAAQGegNAtgJQAEgBACgBQAkgMG3h+QAEgBAEgBQDfg/DZg+QAEgBAEgCQA6h+A6iDQACgEACgFQBtj6AGguQABgFgBgDQgGgdivhoQgEgCgEgDQishlgZgWQgEgDAAgDQgDgMA4gvQAEgDADgDQBYhFA1gpQADgDAEgDQDEidgKg0QgBgFgDgEQgQgfg8ilQg2iWhakEIi4oh");
	this.shape_590.setTransform(365.0577,579.9944);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.286,0.318],-64.7,-213.3,114.5,95).ss(3.4,1,1).p("Axs/FQizBHhbA2QhfA5g9BLQg0BBg/CBQgnBRhqDkQikFXhFD8QgvCwACB8QABAsBaAUQBCAOCMAJQCrAKAoAFQBjAMAMAbQAJAfhgBEQg3AmipBmQieBgg/AwQgmAcgVAWQgjAkAHAWQAcBHH1LWQD/FxD4FfQABACACACIG3BaQADAAADABQHCBXBbgHQADAAADAAQA8gFHRgPQAEAAADAAQGhgOArgJQADAAADgBQAngNG0h9QAEgBAEgBQDfg/DZg+QAEgCADgCQA6h+A6iDQACgEACgFQBuj8AFgsQABgEgBgEQgJgeithmQgEgDgEgCQiuhngWgUQgEgEAAgDQgBgNA3guQADgDAEgDQBYhEA0gqQAEgDADgDQDGidgNg0QgBgFgCgEQgRggg7ikQg2iVhakDIi4oi");
	this.shape_591.setTransform(365.0641,579.9976);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.384,0.416],-61.3,-205.1,122.2,110.6).ss(3.4,1,1).p("Axs/FQizBHhbA2QhfA5g9BLQg0BBg/CBQgnBRhqDkQikFXhFD8QgvCwACB9QABArBbAUQBBAOCNAJQCqAKApAFQBiAMAMAbQAJAfhhBEQg2AmipBmQieBghAAwQglAcgVAWQgjAlAHAVQAdBJH0LUQD/FxD4FgQACABACACIG2BaQADAAADABQHDBXBagHQAEAAADAAQA+gFHPgPQAEAAADAAQGjgOAogJQAEAAADgBQAqgPGxh7QAEgBAEgBQDfhADZg9QADgCADgCQA6h+A6iEQACgEACgEQBvj/AEgpQABgFgCgEQgKgeishmQgEgCgEgDQiwhogUgTQgDgDABgEQAAgNA2gtQADgDAEgDQBYhFA0gpQAEgDADgDQDHifgPgzQgBgEgDgFQgRghg7iiQg2iWhZkCIi4oi");
	this.shape_592.setTransform(365.0735,579.9976);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.478,0.514],-57.9,-196.8,129.9,126.2).ss(3.4,1,1).p("Axs/GQizBIhbA1QhfA5g9BMQg0BBg/CAQgnBShqDkQikFXhFD7QgvCxACB8QACArBaAVQBCAOCMAIQCrAKAoAFQBjANALAbQAJAfhhBEQg2AmipBmQieBghAAwQglAcgVAWQgjAkAHAWQAfBLHzLSQD/FxD3FgQACABACACIG3BZQADABADAAQHEBYBZgHQADAAAEgBQBBgFHMgOQADAAAEAAQGlgOAmgJQADgBAEgBQAtgPGuh7QAEgBAEgBQDfg/DZg+QADgCADgDQA6h+A6iDQACgEACgFQBvkAADgoQABgEgCgEQgNgfiphlQgEgCgFgDQixhpgSgSQgDgDABgEQABgOA1gsQAEgDADgDQBZhFA0gpQADgDAEgDQDIiggRgyQgBgEgDgFQgSgjg6igQg2iWhZkCIi4oh");
	this.shape_593.setTransform(365.0657,580.0009);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.573,0.612],-54.5,-188.6,137.5,141.8).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBShqDkQilFXhED7QgvCxACB8QACArBaAVQBCAOCMAIQCrAKAoAFQBjANALAbQAIAfhgBEQg3AmioBmQifBgg/AwQglAcgVAWQgjAkAHAWQAgBNHyLRQD/FwD4FgQACACACABIG2BZQADABADAAQHFBYBZgHQADgBAEAAQBCgFHKgOQAEAAADAAQGogOAkgJQACgBAFgCQAwgPGrh6QAEgBAEgBQDeg/Dag+QACgDADgDQA6h+A6iDQACgEACgFQBwkBACgnQABgEgDgEQgPgginhjQgEgDgFgCQizhqgQgSQgDgDACgEQADgPA0grQADgDAEgDQBZhFAzgpQAEgDADgDQDKihgUgxQgBgEgDgFQgSglg5ieQg2iVhZkCIi4oh");
	this.shape_594.setTransform(365.0527,580.0009);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.671,0.71],-51.1,-180.3,145.1,157.4).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBShqDkQilFXhED7QgvCxACB9QACAqBaAVQBCAOCMAIQCrAKAoAFQBjANALAbQAIAfhgBEQg3AmipBmQieBgg/AwQgmAcgUAWQgjAlAHAVQAhBPHxLPQD/FxD4FgQACABACABIG3BZQADABADAAQHGBYBXgHQADgBAFAAQBEgFHIgOQAEAAADAAQGqgOAhgJQADgBAFgCQA0gRGmh4QAEgBAEgBQDfhADZg9QADgDADgDQA6h+A6iEQACgEACgEQBwkEABgkQABgFgDgEQgRggimhjQgEgCgEgDQi1hrgPgQQgCgDACgFQAFgPAzgqQADgDAEgDQBYhFA0gpQAEgDADgDQDKiigVgxQgBgEgDgFQgTgmg4icQg2iWhZkBIi4oh");
	this.shape_595.setTransform(365.0655,580.0009);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.765,0.804],-47.7,-172.1,152.8,173).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBShqDkQilFXhED8QgvCwACB9QACArBaAUQBCAOCMAIQCsAKAnAFQBkANAKAbQAHAfhfBEQg3AmipBmQieBgg/AwQgmAcgUAWQgjAlAHAVQAjBQHwLOQD/FxD3FgQACABADABIG3BaQADAAADABQHGBXBXgHQADgBAFAAQBGgFHGgOQADAAAEAAQGsgPAfgJQACAAAGgCQA3gSGjh3QAEgBAEgBQDfhADZg9QADgEACgDQA6h+A6iEQACgEACgEQBykGAAgiQAAgEgDgFQgUghikhhQgEgDgEgCQi3htgMgPQgCgDACgFQAGgQAygpQAEgDADgDQBZhFA0gpQADgDAEgDQDLijgXgwQgCgEgDgFQgTgng3ibQg2iVhZkAIi4oi");
	this.shape_596.setTransform(365.0805,580.0046);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.863,0.902],-44.4,-163.9,160.4,188.6).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBShqDkQilFXhED8QgvCxACB8QACArBbAUQBBAOCNAIQCrAKAoAFQBjANAKAcQAHAehgBEQg2AnipBlQieBhhAAvQglAdgVAWQgjAkAIAWQAkBRHvLNQD/FxD3FgQADAAACABIG3BaQADAAADABQHHBXBWgHQAEgBAEAAQBJgFHEgOQADAAAEAAQGugPAcgJQADgBAFgBQA7gTGgh3QAEgBAEgBQDeg/Dag+QACgDACgEQA6h+A6iEQACgEACgEQBzkHgBghQAAgEgEgFQgWgiiihgQgEgCgEgDQi5htgKgOQgBgDADgGQAHgQAxgpQAEgDADgDQBZhFA0gpQADgDAEgDQDMijgZgwQgCgDgDgGQgTgog4iaQg2iVhYj/Ii4oi");
	this.shape_597.setTransform(365.087,580.0046);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f().ls(["#000000","rgba(0,0,0,0)"],[0.957,1],-41,-155.6,168.1,204.2).ss(3.4,1,1).p("Axs/GQi0BIhaA1QhfA5g9BMQg0BBg/CAQgnBRhqDlQilFXhED8QgvCwACB9QAAAqBdAVQBAAOCOAIQCrAKAoAFQBjANAKAcQAKAchjBGQg0AlirBnQieBghAAwQglAdgVAWQgjAlAIAVQAYBAH7LeQD+FvD5FiIG8BbQHNBZBWgIQA2gFHegPQG4gPAagJQAdgKHGiCQDjhADdg/QA8iCA8iIQB3kQgCggQgCgci7huQjChzgIgOQgHgLBCg2QBehKA1gqQDViqgcgwQgQgcg/iuQg2iVhYkAIi4oh");
	this.shape_598.setTransform(365.0915,580.008);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_588}]},80).to({state:[{t:this.shape_589}]},1).to({state:[{t:this.shape_590}]},1).to({state:[{t:this.shape_591}]},1).to({state:[{t:this.shape_592}]},1).to({state:[{t:this.shape_593}]},1).to({state:[{t:this.shape_594}]},1).to({state:[{t:this.shape_595}]},1).to({state:[{t:this.shape_596}]},1).to({state:[{t:this.shape_597}]},1).to({state:[{t:this.shape_598}]},1).wait(25));

	// white
	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AgCBRQhxgLg3gbIgpggIBihBIBGgUQBOgTApANQApANAzA8QAaAdASAcQgFAHgLAIQgXAQghADQgTACgZAAQgqAAg4gFg");
	this.shape_599.setTransform(524.925,321.6743);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AAZBkQhLgGhAgfQhFgggggeQgdgaAIgRIA6gdQBDggBMADQA9ACA+AZQAsASAnBBQATAhAKAeIAiAMQATAMhIACIhnACQgiAAgTgBg");
	this.shape_600.setTransform(387.6509,298.0564);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AlwB9QABgWAHggQANhBAdg2QBeitDaACQDoADBgCuQAmBCAHBOQAHBFgTAx");
	this.shape_601.setTransform(545.0845,222.9732);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AmDAhQA3iWCZhGQCMhAB1AoQCHAvBXBkQBuB+gbCm");
	this.shape_602.setTransform(405.1322,194.8402);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AgsibIgGAyQgGA7AEAxQALCdBfgF");
	this.shape_603.setTransform(246.7069,356.2077);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("ABXEaQgeAAhcglQh1guh9gZQiYgehRgzQg2ghgog8QgaglgrgeIgmgXIASADQAWACAZgCQBNgIA/gvQB6hdAZgQQBFgsA3gCQBRgDBEAyQAWARBuBuQBUBVBDgFQAzgECKhQQA2ggA0AjQAZASAPAYQBTCMAjA2IgpAEQAKA3AwAmQAYATAVAIIhjA+QnIgQhGAAg");
	this.shape_604.setTransform(433.2,445.8691);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AEpA9Qg/g5g1AJQgNADibAyQh9AphLgFQhOgFhAgiIgwghIAtgoQAxgqAWgEIAXBDQCgh3AKgCQAGgBA+AJIA9AKIgjAmIBVgkQBegiAvAIQA5AJAiAhQAjAiAAAxQAAArgOAlQgIATgHALQgVgegfgcg");
	this.shape_605.setTransform(530.25,292.7247);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("ADVDaQhZgvg7gcQhIgjhvgZIhfgSIAJgWQi1gogjiDQgLgpAFgtIAHglQAsBcB9AXQAsAIA/ABIBhABQBHACBCA+QAhAgATAeIAgANQAqAYAyA4QAzA5A8AIQAfAEAUgHQgUAYgaAZQgzAwgbAAQgbAAhBgig");
	this.shape_606.setTransform(397.6969,263.175);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AAMrSIAEJAQgDJwgcD1");
	this.shape_607.setTransform(471.975,676.3);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AgthQIABAYQACAdAHAZQAWBOA7AF");
	this.shape_608.setTransform(368.975,669.825);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AAXlPIguKf");
	this.shape_609.setTransform(371.1,729.925);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AmDo8QCxFXE8GzQCfDZB7CW");
	this.shape_610.setTransform(209.975,668.775);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("ADlp1Ig5BuQhHCJg/CKQjLG5g9EgQgJAoAXAiQAXAiAoAHIClAe");
	this.shape_611.setTransform(191.9085,478.625);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AgJhKQgMAYARBAQAIAgALAc");
	this.shape_612.setTransform(311.368,314.75);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AARkzQgtBvgRA2QgWBLACA9QAFB4B+DC");
	this.shape_613.setTransform(312.4417,366.65);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Ag5g5IAYAoQAiAsA5Af");
	this.shape_614.setTransform(359,300.3);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AhsADIAVAGQAaAHAbADQBVAGA6gr");
	this.shape_615.setTransform(536.575,335.6414);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Ag1FJQAKjBAQh9QAbjOA2iF");
	this.shape_616.setTransform(579.05,320.15);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AkXNCQBlAACok/QCekvBDkZQAlifAMhIQAThqgEhNQgJiiiCi9");
	this.shape_617.setTransform(538.4106,430.2);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Albg5IAPANQAWAPAhANQBsAoC8AFQCVAFBpAMQA1AGAWAG");
	this.shape_618.setTransform(435.9,476.5);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AmBh7QAtBUBNAjQBCAdBvAAQArAABHAZQArAOBXAhQCiA3BCg6");
	this.shape_619.setTransform(431.55,549.0135);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AgEiMQgkAiAdB+QAOBAAVA5");
	this.shape_620.setTransform(335.4531,439.25);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AgFkOQgEAQgLAkQgKAhgDAbQgJBNAlBTQAkBTAEBlQACAzgFAi");
	this.shape_621.setTransform(475.6155,348.725);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AATh7IgMAZQgMAggGAfQgVBkAzA7");
	this.shape_622.setTransform(445.848,401.975);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AhpDWQAehNAphdQBRi4A7hK");
	this.shape_623.setTransform(325.275,181.75);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("ACAitQg0Arg6BAQhzCBgeBv");
	this.shape_624.setTransform(279.6,185.8);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AmCjXIBEAHQBWAMBcAiQEkBqDrEQ");
	this.shape_625.setTransform(542.375,135.15);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Al+AtIA6gZQBMgbBWgRQERg1EQBV");
	this.shape_626.setTransform(407.325,99.1359);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("AlBAOQC/h1D0hCQB7ghBVgKQg7ARhSA+QikB8hyDe");
	this.shape_627.setTransform(318.575,159.85);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Ak8h7IJ5D3");
	this.shape_628.setTransform(560.2,182.375);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f().s("#FFFFFF").ss(3.4,1,1).p("Ar8mZISfEFQpLAfmyCIQiIAqhoAxIhNAnICqgXQDWgXDdAFQLFARINEd");
	this.shape_629.setTransform(471.325,112.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599}]},90).wait(25));

	// face_msk (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_90 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_91 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_92 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_93 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_94 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_95 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_96 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_97 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_98 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_99 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_100 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_101 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_102 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_103 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_104 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_105 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_106 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_107 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_108 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_109 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_110 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_111 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_112 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_113 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	var mask_graphics_114 = new cjs.Graphics().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(90).to({graphics:mask_graphics_90,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_91,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_92,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_93,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_94,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_95,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_96,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_97,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_98,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_99,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_100,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_101,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_102,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_103,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_104,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_105,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_106,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_107,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_108,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_109,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_110,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_111,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_112,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_113,x:416.1738,y:347.4018}).wait(1).to({graphics:mask_graphics_114,x:416.1738,y:347.4018}).wait(1));

	// face
	this.instance = new lib.face();
	this.instance.setTransform(436.8,347.25,0.3474,0.3702,0,-14.8817,-9.4102);
	this.instance.alpha = 0.5508;
	this.instance._off = true;
	this.instance.filters = [new cjs.BlurFilter(50, 50, 1)];
	this.instance.cache(-185,-267,371,534);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#FCE9D7").s().p("EgEuApYIhrgOIttrXQhIivhJjgQiTm/gIj0QgDhxBGhUQAVgaAbgUIAWgPQgNg9gphqQgbhFgygDQgMgBhGASQiEAhgfixQgWh+AciCQAOhBgBiuQAAh9gEhMQgCgfAMgvIANgqQAJhNAfh9QA9j6BojuQFPr5KDljQFrjJGGgSQFTgQFIB4QEdBoDeC3QDKCoBHCjQA/CTAUA7QAiBpAgCrQAwEGArEkIg/D+QhBEKgRA6QgtCbgZFvQgLCdgeCPQgPBIgNAoIAHBSQAHBaAAAnQAAAngtAWIguAPIhADYQh4E/iBC1QhBBagpAbQhMCMhvBHQg3AkgoAIQhRCeh9A/Qg/AggvAAQgJAVhbAjIhZAfIijCFQiuCKg6AZQgrAShKAAQgcAAgfgDg");
	this.shape_630.setTransform(416.1738,347.4018);

	var maskedShapeInstanceList = [this.instance,this.shape_630];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},90).to({state:[{t:this.instance}]},17).to({state:[{t:this.shape_630}]},1).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(90).to({_off:false},0).to({scaleX:1,scaleY:1,skewX:0,skewY:0,x:416.15,y:347.4,alpha:0.9883},17).to({_off:true},1).wait(7));

	// jacke_1_msk (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_92 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_93 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_94 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_95 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_96 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_97 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_98 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_99 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_100 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_101 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_102 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_103 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_104 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_105 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_106 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_107 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_108 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_109 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_110 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_111 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_112 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_113 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");
	var mask_1_graphics_114 = new cjs.Graphics().p("AAUcaQkMl1kIl8QoOr6AggpQAUgZEXisQEOilAbg2QATgkgQgRQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvidQAdiTBTjpQConVESmyQA4gwBTg1QCmhoCHgRIBBgIQABAIADAKQASA2APAYIAaAjQALASAKAhIAQA0QgWANgXAYQgOAPgaAhQgVAbgJAQQgQAZgEAXQgEARABAYIADArQACAXAAApIAAA/QADA6ANBEQAKAxATBMQBFD/BYDrIAqBsQAbBHARAlIAKAYIF7S7IE7Smg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(92).to({graphics:mask_1_graphics_92,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_93,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_94,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_95,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_96,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_97,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_98,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_99,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_100,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_101,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_102,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_103,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_104,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_105,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_106,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_107,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_108,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_109,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_110,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_111,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_112,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_113,x:256.7053,y:580.05}).wait(1).to({graphics:mask_1_graphics_114,x:256.7053,y:580.05}).wait(1));

	// jacke_1
	this.instance_1 = new lib.j_1();
	this.instance_1.setTransform(256.7,579.15,0.5658,0.5038,0,0,35.2648,0,0.1);
	this.instance_1.alpha = 0.6016;
	this.instance_1._off = true;
	this.instance_1.filters = [new cjs.BlurFilter(80, 80, 1)];
	this.instance_1.cache(-104,-203,208,406);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#7BBBBF").s().p("AAUcjQkMl0kIl9QoOr6AggpQAUgZEXisQEOilAbg2QATgjgQgSQgQgRg4gJQgpgGhygIQicgLhYgJQgxAIgogYQhQgwAvicQAdiTBTjqQConUESmzQA4gwBTg1QCmhoCHgQIDXgbIA+IzIA0QcIF8TAIE7Smg");
	this.shape_631.setTransform(256.7053,579.125);

	var maskedShapeInstanceList = [this.instance_1,this.shape_631];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},92).to({state:[{t:this.instance_1}]},16).to({state:[{t:this.shape_631}]},1).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(92).to({_off:false},0).to({regY:0,scaleX:1,scaleY:1,skewY:0,y:579.1,alpha:0.9883},16).to({_off:true},1).wait(6));

	// jacke_2_msk (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_97 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_98 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_99 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_100 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_101 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_102 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_103 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_104 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_105 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_106 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_107 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_108 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_109 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_110 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_111 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_112 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_113 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	var mask_2_graphics_114 = new cjs.Graphics().p("Ao5JZQATskgDnyIAOACQAYADAUgDQAWgEAXgMQAvgVAggcQAdgZAegqIAxhLQAMgTAKgGQAIgGAOgDIAWgGQAagHAcgUQAQgMAdgcQAdgbANgPIAmgvIASgVQALgNAGgJQAPgaAIgMQAMgSAZgXQAugtATgYQAXgcANgbID/LpICcGhQACATgOAbQgtBXi4CMIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(97).to({graphics:mask_2_graphics_97,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_98,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_99,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_100,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_101,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_102,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_103,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_104,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_105,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_106,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_107,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_108,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_109,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_110,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_111,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_112,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_113,x:515.8825,y:641.8375}).wait(1).to({graphics:mask_2_graphics_114,x:515.8825,y:641.8375}).wait(1));

	// jacke_2
	this.instance_2 = new lib.j_2();
	this.instance_2.setTransform(508.95,634.2,0.5116,0.382,0,0,-39.0009,57.9,139);
	this.instance_2.alpha = 0.6016;
	this.instance_2._off = true;
	this.instance_2.filters = [new cjs.BlurFilter(60, 60, 1)];
	this.instance_2.cache(-2,-2,121,285);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#7BBBBF").s().p("Ao5KdQAUtRgEn8QgFn9FZifQBsgxCBgJQBBgEArAFIEtNuICcGhQACATgOAbQgtBWi4CNIhUBCQhSBFALAJQAJAHC+BkQC8BnAGAYQAHAah6EeQg9CPg+CLIuoEiQAKlDAJmpg");
	this.shape_632.setTransform(515.8825,635.0408);

	var maskedShapeInstanceList = [this.instance_2,this.shape_632];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},97).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.shape_632}]},1).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(97).to({_off:false},0).to({scaleX:1.0084,scaleY:1.0005,skewX:0.0419,skewY:-2.089,x:515.4,y:632.65,alpha:0.9883},12).to({_off:true},1).wait(5));

	// krwt_msk (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_96 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_97 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_98 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_99 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_100 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_101 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_102 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_103 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_104 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_105 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_106 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_107 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_108 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_109 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_110 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_111 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_112 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_113 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	var mask_3_graphics_114 = new cjs.Graphics().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:null,x:0,y:0}).wait(96).to({graphics:mask_3_graphics_96,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_97,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_98,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_99,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_100,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_101,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_102,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_103,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_104,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_105,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_106,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_107,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_108,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_109,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_110,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_111,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_112,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_113,x:406.075,y:698.975}).wait(1).to({graphics:mask_3_graphics_114,x:406.075,y:698.975}).wait(1));

	// krwt
	this.instance_3 = new lib.krwt();
	this.instance_3.setTransform(398.25,699.05,0.3795,0.5627,0,-10.809,0,0.1,0.2);
	this.instance_3.alpha = 0.5508;
	this.instance_3._off = true;
	this.instance_3.filters = [new cjs.BlurFilter(35, 35, 1)];
	this.instance_3.cache(-54,-81,107,162);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#FF7F69").s().p("Al/h3QgNgJgRgSQghgkgPgsQgMgjgXhKIgThEQBahhBghhQDBjCAfAAQAfAABZByQAuA6AzBGQAaBtgFCRQgDBJgHAzIGJOXIvsAsg");
	this.shape_633.setTransform(406.075,698.975);

	var maskedShapeInstanceList = [this.instance_3,this.shape_633];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},96).to({state:[{t:this.instance_3}]},13).to({state:[{t:this.shape_633}]},1).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(96).to({_off:false},0).to({regX:0,regY:0,scaleX:1,scaleY:1,skewX:0,x:406.05,y:698.95,alpha:0.9883},13).to({_off:true},1).wait(5));

	// Слой_1
	this.instance_4 = new lib.silhouette();
	this.instance_4.setTransform(399.95,409.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(12).to({_off:false},0).wait(103));

	// Слой_1
	this.instance_5 = new lib.silhouette();
	this.instance_5.setTransform(399.95,409.1);
	this.instance_5.alpha = 0.9883;
	this.instance_5._off = true;
	this.instance_5.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_5.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(11).to({_off:false},0).to({_off:true},1).wait(103));

	// Слой_1
	this.instance_6 = new lib.silhouette();
	this.instance_6.setTransform(399.95,409.1,0.9999,0.9999,0,0,0,0.1,0);
	this.instance_6.alpha = 0.9883;
	this.instance_6._off = true;
	this.instance_6.filters = [new cjs.BlurFilter(2.03662109, 2.03662109, 1)];
	this.instance_6.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(10).to({_off:false},0).to({_off:true},1).wait(104));

	// Слой_1
	this.instance_7 = new lib.silhouette();
	this.instance_7.setTransform(399.9,409.1,0.9994,0.9994);
	this.instance_7.alpha = 0.9805;
	this.instance_7._off = true;
	this.instance_7.filters = [new cjs.BlurFilter(2.28857422, 2.28857422, 1)];
	this.instance_7.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(9).to({_off:false},0).to({_off:true},1).wait(105));

	// Слой_1
	this.instance_8 = new lib.silhouette();
	this.instance_8.setTransform(399.9,409.1,0.9979,0.9979);
	this.instance_8.alpha = 0.9688;
	this.instance_8._off = true;
	this.instance_8.filters = [new cjs.BlurFilter(2.97412109, 2.97412109, 1)];
	this.instance_8.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(8).to({_off:false},0).to({_off:true},1).wait(106));

	// Слой_1
	this.instance_9 = new lib.silhouette();
	this.instance_9.setTransform(400,409.2,0.9951,0.9951,0,0,0,0.1,0.1);
	this.instance_9.alpha = 0.9414;
	this.instance_9._off = true;
	this.instance_9.filters = [new cjs.BlurFilter(4.30859375, 4.30859375, 1)];
	this.instance_9.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(7).to({_off:false},0).to({_off:true},1).wait(107));

	// Слой_1
	this.instance_10 = new lib.silhouette();
	this.instance_10.setTransform(400,409.2,0.9905,0.9905,0,0,0,0.1,0.1);
	this.instance_10.alpha = 0.8984;
	this.instance_10._off = true;
	this.instance_10.filters = [new cjs.BlurFilter(6.50805664, 6.50805664, 1)];
	this.instance_10.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(6).to({_off:false},0).to({_off:true},1).wait(108));

	// Слой_1
	this.instance_11 = new lib.silhouette();
	this.instance_11.setTransform(399.9,409.1,0.9836,0.9836);
	this.instance_11.alpha = 0.8281;
	this.instance_11._off = true;
	this.instance_11.filters = [new cjs.BlurFilter(9.79003906, 9.79003906, 1)];
	this.instance_11.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(5).to({_off:false},0).to({_off:true},1).wait(109));

	// Слой_1
	this.instance_12 = new lib.silhouette();
	this.instance_12.setTransform(400,409.2,0.974,0.974,0,0,0,0.1,0.1);
	this.instance_12.alpha = 0.7383;
	this.instance_12._off = true;
	this.instance_12.filters = [new cjs.BlurFilter(14.36987305, 14.36987305, 1)];
	this.instance_12.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(4).to({_off:false},0).to({_off:true},1).wait(110));

	// Слой_1
	this.instance_13 = new lib.silhouette();
	this.instance_13.setTransform(399.95,409.1,0.9612,0.9612,0,0,0,0.1,0);
	this.instance_13.alpha = 0.6094;
	this.instance_13._off = true;
	this.instance_13.filters = [new cjs.BlurFilter(20.46435547, 20.46435547, 1)];
	this.instance_13.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(3).to({_off:false},0).to({_off:true},1).wait(111));

	// Слой_1
	this.instance_14 = new lib.silhouette();
	this.instance_14.setTransform(400.05,409.2,0.9448,0.9448,0,0,0,0.1,0.1);
	this.instance_14.alpha = 0.4492;
	this.instance_14._off = true;
	this.instance_14.filters = [new cjs.BlurFilter(28.2902832, 28.2902832, 1)];
	this.instance_14.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(2).to({_off:false},0).to({_off:true},1).wait(112));

	// Слой_1
	this.instance_15 = new lib.silhouette();
	this.instance_15.setTransform(400,409.2,0.9242,0.9242,0,0,0,0.1,0.1);
	this.instance_15.alpha = 0.25;
	this.instance_15._off = true;
	this.instance_15.filters = [new cjs.BlurFilter(38.0637207, 38.0637207, 1)];
	this.instance_15.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1).to({_off:false},0).to({_off:true},1).wait(113));

	// Слой_1
	this.instance_16 = new lib.silhouette();
	this.instance_16.setTransform(399.95,409.1,0.8992,0.8992);
	this.instance_16.alpha = 0.0117;
	this.instance_16.filters = [new cjs.BlurFilter(50, 50, 1)];
	this.instance_16.cache(-245,-370,490,741);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).to({_off:true},1).wait(114));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(563.5,441.2,90.39999999999998,341.7);
// library properties:
lib.properties = {
	id: '13',
	width: 820,
	height: 820,
	fps: 25,
	color: "#000000",
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
an.compositions['13'] = {
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