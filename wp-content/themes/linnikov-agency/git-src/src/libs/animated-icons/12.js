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


(lib.zv_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ACsiOIgdCLQglCLgqAFQgqAGhkgLIhdgM");
	this.shape.setTransform(-20.775,-27.0333);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2.4,1,1).p("AgZo2QAQAJBhCTQBiCUACAWQABAKBBACQAmABBnAAQDLADAAAoQAAAnh4CAQh3B+ABALQACAQBQCcQBICXggANQgpARiBg8QiGg+hBhJQgngsgeAmQgWAbgYBVQgiBvgJAUQgZA+gdgHQgygMgyjaQgXhtgLgqQgRhHgNgGQhcgrhuhQQikh6Ang/QATgeCwAMQDAAMASgHQARgHAQhBQAThXALguQApi1A4Adg");
	this.shape_1.setTransform(0.009,0.0348);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFB7D").s().p("AhjI6QgygMgyjaQgXhtgLgqQgRhHgNgGQhcgrhuhQQikh6Ang/QATgeCwAMQDAAMASgHQARgHAQhBIAeiFQApi1A4AdQAQAJBhCTQBiCUACAWQABAKBBACICNABQDLADAAAoQAAAnh4CAQh3B+ABALQACAQBQCcQBICXggANQgpARiBg8QiGg+hBhJQgngsgeAmQgWAbgYBVQgiBvgJAUQgXA4gZAAIgGgBg");
	this.shape_2.setTransform(0.009,0.0348);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.zv_4, new cjs.Rectangle(-61,-58.2,122.1,116.5), null);


(lib.ruka = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABIgyQgXALgeASQg7AkgfAk");
	this.shape.setTransform(72.6,25.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AFoEfQgqAJg2gGQhtgOg+hSQhah0h/iMQiTihhYhF");
	this.shape_1.setTransform(-27.025,12.057);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.4,1,1).p("ADGhIQgGAXgTAQQgYAWg2ARQgeAKgnAQQglAPgYAIQggAKhEAFIg+AD");
	this.shape_2.setTransform(108.65,38.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2.4,1,1).p("ATqCzQgDAJgJAKQgSAWgcALQg7AZg8ARQhGAUgqAAQgJAAh8gGQh1gGgaACQhGAFleBJQksA/gqgQQg6gVjkiRQj5idiih9QnIlWgjgc");
	this.shape_3.setTransform(-8.7,21.428);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(2.4,1,1).p("Avtl7ICpCzQDRDkDBDxQAbAgC9ADQCbACEbgTQAXgCA+g3QA/g5AZgFQA2gJB6goQBSgcALAQQAhAxgtAjQgiAch1AoQg3AUBVgEQAxgCBqgHQAwgBA3gQQAggJA2gUQAsgPAZABQAiADAXAdQAQASgUARQgUARhAATQhWAahAASIgvAMQgKAKhSAEIhRAB");
	this.shape_4.setTransform(33.8682,0.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FC95A6").s().p("AiQJxQg2gLjviYQjxiZiuiIQnJlVgjgcIG9mtIEkE5QFJFlC3DmQAZAfDPAAQBPAAFTgNQAegCA0gqQAmgeAcggQAFgGCMgoQCPgqAGAJQAkAygwAnQghAaiIA5QgKAEBfgFICagJQBAgCAzgRQATgHAvgXQAcgOASADQAXADAhAfQARAQgbASQgRALgrATQAHADgCANQgEAbg3AaIg2AUQABAKgaASQg0AjiJAkQglAKiDgDIi0gCQglAClTBFQkMA2hNAAQgNAAgIgBg");
	this.shape_5.setTransform(-0.0253,-0.0005);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ruka, new cjs.Rectangle(-135.7,-62.6,271.4,126.4), null);


(lib.mozg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AAiijIgUAiQgVAqgNAqQgoCFBKBM");
	this.shape.setTransform(-190.6987,-20.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABGggQgQAGgaAMQgzAWguAa");
	this.shape_1.setTransform(-145.625,-92.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABDiNQApATAJAoQAKAngXArQg4BqinAk");
	this.shape_2.setTransform(-131.9757,-47.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AhrBkQAFhEAcg3QA6hxB8A4");
	this.shape_3.setTransform(-78.65,-42.7278);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABvhNIgIAeQgMAjgUAaQhABWh1gf");
	this.shape_4.setTransform(49.125,-19.199);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("Ag6hJIAWAKQAaAMATAQQBAAxgTA7");
	this.shape_5.setTransform(-15.4325,-70.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABIhoIgaAHQgqALgbASQhfA8BfBx");
	this.shape_6.setTransform(-59.1188,-120.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABCAGQgRgGgZgDQgxgHgoAO");
	this.shape_7.setTransform(-18.925,-150.4389);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ACmAZQgrgXg+gOQh8gehmAt");
	this.shape_8.setTransform(52.75,-151.1052);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ACcA1Qgcgtg2gfQhqg/h8BH");
	this.shape_9.setTransform(39.45,-115.3865);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AgyhYIAUANQAXAQARAUQA5A9gWBD");
	this.shape_10.setTransform(101.1963,-31.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ABoA1QACgngZgdQgyg9iHAp");
	this.shape_11.setTransform(132.8074,3.426);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ACGAyQgcgrgvgdQhdg7hiBG");
	this.shape_12.setTransform(118.9,-77.0045);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AgPhMIAJANQAKARAFASQATA5ghAw");
	this.shape_13.setTransform(184.4656,0.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("Agth6IAUAYQAYAfAQAeQA1BhglA/");
	this.shape_14.setTransform(162.4443,-48.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AgZiEIAPAYQAPAeAKAfQAeBkgyBQ");
	this.shape_15.setTransform(198.184,-49.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("ADCCaQABhNgwhNQhgiZj0AA");
	this.shape_16.setTransform(156.226,-112.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(2.4,1,1).p("AFHkzQgRCFheBhQgmAoiZBtQhTA8ARBHQAIAjAaAXIi4AvIiHjb");
	this.shape_17.setTransform(-70.575,130.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(2.4,1,1).p("AFrjWIAKAqQAJA0gGAyQgWCdisBGQivBJh2gSQhAgKgmgjQgugmgngqQhMhQgEg4");
	this.shape_18.setTransform(-104.7387,117.429);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(2.4,1,1).p("AD9jXIgbAvQgjA5gyA4QieCxjrBd");
	this.shape_19.setTransform(-55.95,109.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(2.4,1,1).p("AAphfQg+A8gOAkQgVA3A8Ao");
	this.shape_20.setTransform(89.9311,-115);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(2.4,1,1).p("ABZggQgIAagaASQg1Anhagg");
	this.shape_21.setTransform(57.775,-135.4039);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(2.4,1,1).p("AAhi/QhJA9AJCnQAFBUAUBH");
	this.shape_22.setTransform(158.0963,-90.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(2.4,1,1).p("AhPluQgEA3AcAzQASAiAuAzQA2A8AQAYQAjAyAGAxQAQCWgvBmQg+CEiWgf");
	this.shape_23.setTransform(198.6877,-53.2802);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(2.4,1,1).p("AIMCJQg/iUj4hLQjAg6iuAJQhsAFgUACQhHAHguASQh3AvgGCU");
	this.shape_24.setTransform(64.975,-147.3604);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(2.4,1,1).p("Aj/hKQh2gZgEhiQgCgpAUgnQAUgnAjgYQAmgaBlAPQBsAQBsA1QB/A+BSBbQBhBrATCEQALBLgjBeQgSAvgUAf");
	this.shape_25.setTransform(153.0962,-105.2244);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(2.4,1,1).p("AloBKQCPiECUgNQCGgMEoBR");
	this.shape_26.setTransform(-20.45,-150.7528);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(2.4,1,1).p("ADRB3QAXg9gog2QgjgthOghQhHgehTgKQhTgKg7AP");
	this.shape_27.setTransform(149.6065,-2.913);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(2.4,1,1).p("ACKiVQgCBUhVBcQhUBdhoAe");
	this.shape_28.setTransform(-96.3,73.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(2.4,1,1).p("ABWgjQgWgDghAHQhBAPgzA1");
	this.shape_29.setTransform(-116.875,-114.7929);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(2.4,1,1).p("ABUAoQgcgohIgYIhDgP");
	this.shape_30.setTransform(0.175,-124.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(2.4,1,1).p("AEUAzQhYAlhxABQjhACh9iz");
	this.shape_31.setTransform(50.175,-94.9489);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(2.4,1,1).p("AjFCOQAWhGA9grQByhRCxB2QAKAGALAIACxBCQgpgegngkQhhhZAQg0");
	this.shape_32.setTransform(53.325,-71.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(2.4,1,1).p("AFXiDQg0gUhRgJQijgRiSA9QjVBZgaBoQgMA1AeAj");
	this.shape_33.setTransform(58.6412,10.4897);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(2.4,1,1).p("AA4hIQgYAUgbAdQgzA3gJAp");
	this.shape_34.setTransform(91.775,-12.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(2.4,1,1).p("AEAAxQkmjChtArQgtASgaA9QgQAlgVBh");
	this.shape_35.setTransform(66.225,-36.9811);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(2.4,1,1).p("AEGBNQgkhqitgjQirgiiPBD");
	this.shape_36.setTransform(20.825,-52.8695);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(2.4,1,1).p("AkBlDQCIAnApA8QAvBDhcBMIBDgBQBPAEBAAcQDMBWgkEg");
	this.shape_37.setTransform(-23.6119,-91.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(2.4,1,1).p("AAkhXQAdBJgyA5QgPAUgWAOQgSALgFAA");
	this.shape_38.setTransform(-26.6543,-56.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(2.4,1,1).p("AgDh4QAwAqgfBoQgOA0gZAr");
	this.shape_39.setTransform(-76.0112,-29.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(2.4,1,1).p("AGuIaQgiAAgrgeQgqgdgggvQhPhyAwhmQAag1g9hRQhJhficg6QgVgHh/gqQhFgXgkgUQhXgzhEiaQgPgjAig6QAnhCBDgK");
	this.shape_40.setTransform(-50.3046,-51.025);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(2.4,1,1).p("ABkiPQAVBFhuBzQg2A6g7At");
	this.shape_41.setTransform(14.7933,-13.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(2.4,1,1).p("ADBAQQhchAibAgQgxAKgyARIgnAR");
	this.shape_42.setTransform(2.25,4.5249);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(2.4,1,1).p("AD8BcQgrh3i8guQhMgThNABQhKABgtAS");
	this.shape_43.setTransform(-83.55,-9.5276);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(2.4,1,1).p("AEHBaQgJgjgkgkQgqgpg+gbQifhGjZA0");
	this.shape_44.setTransform(-37.15,7.7585);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(2.4,1,1).p("AAsihQhBBLgRBbQgUBpBDA0");
	this.shape_45.setTransform(-106.901,-29.725);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(2.4,1,1).p("AiyAmQAGgHANgKQAagUAkgMQBwgtCkAh");
	this.shape_46.setTransform(-160.075,-1.4109);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(2.4,1,1).p("AgbjXQAmA3AMAxQANA7gWBBQgUBBgBBCQgBA6ALAO");
	this.shape_47.setTransform(-171.6933,-23.8);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(2.4,1,1).p("ACGhsIh7BOQh+BXgSA0");
	this.shape_48.setTransform(-155.225,-45.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").ss(2.4,1,1).p("AFHBRQhKiCipgaQi5gcjhB2");
	this.shape_49.setTransform(-128.15,-67.8426);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(2.4,1,1).p("AHYEKQgyg3gihOQhDicBNh5Qg8AzhXAPQiuAfiJixQglAqhEAPQiLAgimiC");
	this.shape_50.setTransform(-38.1,50.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(2.4,1,1).p("AhdhaQBKAVAoAeQA/AuALBU");
	this.shape_51.setTransform(127.4,-24.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(2.4,1,1).p("AiNjPIA1ATQA/AbAwAoQCcB+gvDL");
	this.shape_52.setTransform(105.9954,-33.125);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").ss(2.4,1,1).p("AgxiTQBZAoAJBrQAIBegtA2");
	this.shape_53.setTransform(118.7854,-49.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(2.4,1,1).p("AiukJQAhgRBLAmQBNApBABJQBKBWAUBeQAYBxg8Bs");
	this.shape_54.setTransform(162.7449,-46.9354);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(2.4,1,1).p("AkrksQAYASBQAUQCBAhAeAJQDbBGBHCXQBKCeguBXQgYArgmAM");
	this.shape_55.setTransform(117.6185,-76.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(2.4,1,1).p("AupAEQAoAAAngeQAXgTAqgyQAqg1AYgVQAogkAsgHQCFgWBhAQQCZAZCdBzQAFAEAtgcQA7goAygTQC8hLDSBoQDWBrCcCHQBPBFAjAv");
	this.shape_56.setTransform(2.25,-120.5703);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(2.4,1,1).p("AkUCVQApioCPhPQCbhYDVBD");
	this.shape_57.setTransform(-98.7,-125.7731);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(2.4,1,1).p("AnQEYQgXiLBBiFQBEiJB6gpQCjg4AEgBQB4glBbgLQEHgeAzC7QAaBdgoAyQgrA2h7AT");
	this.shape_58.setTransform(-140.0423,-83.0579);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(2.4,1,1).p("AG+IgQBBg9g7hpQgZgsgnghQgogigngIQhggVhoARQiAAVhgBMQhoBShXgTQhUgTgehlQgpiNgNiJQgTjHAyiLQAviDCGg6QBCgeA5gD");
	this.shape_59.setTransform(-163.1273,-2.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(2.4,1,1).p("ABbCvQgjAAgmgfQgmgfgcgyQhDh3Aph2");
	this.shape_60.setTransform(-190.015,55.675);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(2.4,1,1).p("ALSgJQhAA3hgAnQi/BNibhXQiZhViWBwQgnAdhEBFQg7A8gZAOQg1AehXgNQhXgNhMgxQhTg1gjhKQgphVAhhfQAhhgC9hIQBMgeBIgMQBHgLAhAL");
	this.shape_61.setTransform(-111.1985,83.3776);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(2.4,1,1).p("AGslmQBWB4AfBdQA/C+idBEQgjAPgbAdQgDADgqA3Qg/BShrAoQiHAzizhDQibg6iUh+Qg8gzgkgrIgXgg");
	this.shape_62.setTransform(1.55,64.9225);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(2.4,1,1).p("AEdjWQgCARgEAqQgEApgIAdQgYBVhKAuQiXBehhApQioBFglhG");
	this.shape_63.setTransform(78.6,56.3251);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(2.4,1,1).p("AEhkjIAngLQAwgJArACQCKAIAjB/QAoCWhhBlQhbBfj6BaQjJBJh4gkQgigKgxgbQgtgZgZgGQhygOg8gRQhsgegphP");
	this.shape_64.setTransform(136.8215,11.7962);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FC95A6").s().p("A55UpQiChGghhzQgbhaAkhEQg4gPgxg0QhghoApi7QgPgNgSgXQgkgvgQgzQgYhMgLhYQgIhCgJiZQgIiGBMiAQBLh/BjgWQgJg5AKhLQAWiYBkheQAHgMAbgSQA2gkBnghQBnghBpgZQA0gNAggHQAHgmAYgxQAwhjBZg2QBhg7BqgCQBRgBBkAhIAmgWQAxgWA5gEQAcgiAxglQBghKBkgMQBjgMC6ApQBcAVBJAXIAngoQA3gpBSgKQBogMBMAAQBWAABvAOQCwAXCyBtQArAaAlA0QASAaAKAVIAkgmQAugkA2AIQCVAXCGBAQChBNBaB1QAiAtAUBvQAKA3ADAuIAKAuQASA2AwAuQBIBHAXArQAkBHgKBsQgLB3gfA6QgeA3g7AQQgwAOgigBIgZgDIAsAoQAtAvAGAkQAMBRgIAoQgQBZhaBGQhmBQixA/QitA+hXgIQg/gFhWgqQhSgogVAAIgEBGQgKBMgXAmQgdAyifBdQilBhhYALQgWADgdgJQgfgIgLgOQgLACgPAGQgeAMgWAWQgRARhDBQQhFBLgyARQg9AWhQACQhSACg9gTQg0gRiOhKIiEhHIhXA4QhkA5g+AIQhIAKhJgRQhGgPhngvQiVhEjEDlQggApg8AZQgvAUgzAAQhPAAhWgvg");
	this.shape_65.setTransform(-0.1046,-24.2907);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FC95A6").s().p("AmQE0QhthHg7iFQg1h4EXi6QBXg7Bug6IBdguIJ2BjIgZB3IhDBhQhaByh0BWQgxAlhWAsQgqAWghAOQg0AZg+AZQh/Axg6AAQhTAAhYg6g");
	this.shape_66.setTransform(-85.6554,102.775);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FC95A6").s().p("AlZA5IKzmCQABBYghBJQggBGhEA6QgJAIiHBiQhQA7gKAlQgWBTAoAfIiwA2g");
	this.shape_67.setTransform(-71.8985,128.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mozg, new cjs.Rectangle(-212.3,-162.2,424.6,324.2), null);


(lib.green_glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.4,1,1).p("AEhFeQAngoAUgyQAUgwADg1QABhgghhcQgghZg9hNQgogxgxgqQhahZiJgbQhqgThbBDQhcBFgJBtQgGBBALBAQAcCWBzB8QBuB1CSAxQAxAPAtAAQBfABBAg7g");
	this.shape.setTransform(0.0341,-0.0078);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#78EE9F").s().p("ACCGYQgtAAgxgPQiSgxhuh1Qhzh8gciWQgLhAAGhBQAJhtBchFQBbhDBqATQCJAbBaBZQAxAqAoAxQA9BNAgBZQAhBcgBBgQgDA1gUAwQgUAygnAoQg/A6hdAAIgDAAg");
	this.shape_1.setTransform(0.0341,-0.0078);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.green_glaz, new cjs.Rectangle(-38.3,-41.9,76.69999999999999,83.9), null);


(lib.glaz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AAYAAQgSgBgdAC");
	this.shape.setTransform(-2.875,-64.2893);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2.4,1,1).p("AD6nUQiBAbhmBGQiKBhhECpQhjD2A5C9QAdBeAwAt");
	this.shape_1.setTransform(-38.2913,-16.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("AANhaQgmAhACAXQADAYApARQAhAOgqAkIgvAi");
	this.shape_2.setTransform(38.301,47.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("ABnhRQgFBFgcAFQgMACgXgHQgdgKgQgFQgegIgiA5QgRAdgLAf");
	this.shape_3.setTransform(-28.95,41.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("AhnDkQAEgWAChlQADhBAVgUQAegbA8gMQAzgJATgmQAOgbADhGIAAhA");
	this.shape_4.setTransform(-29.3,28.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("AhogTQAEAEADAHQAEAIgCAHQBmgZABAAQA/gGAjAs");
	this.shape_5.setTransform(-21.35,-58.6353);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("Ag9h1QgZBKAhALQAFACAlAGQAeAFAWALQAvAXgWA2QgLAbgVAW");
	this.shape_6.setTransform(27.53,50.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("ABhiTQhTAug5BLQgcApgOApQgOAuADAv");
	this.shape_7.setTransform(-48.484,-25.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFD4DE").ss(2.4,1,1).p("AjLCHQAQgVAUglQAbg0AFgIQASgfATgPQAXgTAcAAQApgFAtgEQAegHAjgqQAvgfA1AE");
	this.shape_8.setTransform(-48.15,-7.6678);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(2.4,1,1).p("AB0LSQBvgSBjgxQBhgwBPhKQA1gyAng5QBKhsAiiGQARhCAGhEQAJhCgGhCQgQi5hsiaQghgwgsgtQi7jFklgSQiJgIiBAmQiGAohoBVQgrAlgmAtQgrAxgfAyQgeAvgXA1Qg6CCgGCNQgHCQAxCGQAZBFAnA9QB0C5DGBcQDLBfDegkg");
	this.shape_9.setTransform(0.0027,-0.0053);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFF0F7").s().p("Ak1KXQjGhch0i5Qgng9gZhFQgxiGAHiQQAGiNA6iCQAXg1AegvQAfgyArgxQAmgtArglQBohVCGgoQCBgmCJAIQElASC7DFQAsAtAhAwQBsCaAQC5QAGBCgJBCQgGBEgRBCQgiCGhKBsQgnA5g1AyQhPBKhhAwQhjAxhvASQg9AJg7AAQieAAiThEg");
	this.shape_10.setTransform(0.0027,-0.0053);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.glaz, new cjs.Rectangle(-74.3,-74.3,148.6,148.7), null);


// stage content:
(lib._12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(75));

	// zv_4
	this.ikNode_2 = new lib.zv_4();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(794,149);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_2).to({scaleX:1.1353,scaleY:1.1353,y:146.6},36,cjs.Ease.quadInOut).to({scaleX:1,scaleY:1,y:149},38,cjs.Ease.quadInOut).wait(1));

	// zv_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2.4,1,1).p("AgDh3IAAASAAABsQAAgSgFgTQgPgzg5gJIANgBQAOgCAMgJQAigbABhJQABAWAFATQASA8A5AMQgSABgTAOQgjAZgGA4QgBAGgBAG");
	this.shape.setTransform(754.35,81.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF3EA").s().p("AgFBEQgPgzg5gJIAMAAQAPgDAMgIQAigbABhKQABAWAFATQARA+A5ALQgRAAgUAOQgiAZgGA4QAAgSgFgTg");
	this.shape_1.setTransform(754.35,81.4875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2.4,1,1).p("AgDh3IAAASQABAWAFATQASA8A5AMQgSABgTAOQgjAZgGA4QAAgSgFgTQgPgzg5gJIANgBQAOgCAMgJQAigbABhJAAABsQgBAGgBAG");
	this.shape_2.setTransform(754.35,81.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhjIAAgTAgDhjQABAXAFAUQATA/A/AMQgUABgVAOQglAagHA7QAAgTgGgUQgQg1g+gJIANgBQAQgCANgKQAlgbAChNg");
	this.shape_3.setTransform(754.375,80.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFF3EA").s().p("AgGBHQgQg1g+gKIANAAQAQgDANgJQAlgcAChMQABAWAFAUQATBAA/AMQgUAAgVAPQglAagHA6QAAgTgGgTg");
	this.shape_4.setTransform(754.375,81.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhnIAAgTAgDhnQABAYAFAUQAVBCBEANQgWAAgWAQQgoAbgIA8QAAgTgGgVQgSg3hDgKIAOAAQARgDAPgKQAngcADhQg");
	this.shape_5.setTransform(754.375,80.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFF3EA").s().p("AgGBKQgSg4hDgJIAOgBQARgDAPgJQAngdADhQQABAYAFAVQAVBCBEAMQgWABgWAPQgoAbgIA9QAAgUgGgUg");
	this.shape_6.setTransform(754.375,81.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhrIAAgUAgEhrQACAZAGAVQAWBEBJANQgXABgYAQQgsAcgIA/QAAgUgHgVQgTg6hIgKIAPAAQATgEAPgKQArgdAChTg");
	this.shape_7.setTransform(754.375,80.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFF3EA").s().p("AgHBMQgTg5hIgKIAPAAQATgEAPgJQArgfAChSQACAZAGAVQAWBFBJANQgXAAgYAQQgsAcgIA/QAAgUgHgWg");
	this.shape_8.setTransform(754.375,81.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhvIAAgVAgEhvQACAaAGAWQAYBGBOAOQgYABgaAQQgvAdgJBCQAAgVgHgWQgVg8hNgKIAQgBQAUgDARgLQAtgeADhWg");
	this.shape_9.setTransform(754.375,80.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFF3EA").s().p("AgHBPQgVg7hNgLIAQAAQAUgDARgKQAtggADhVQACAZAGAWQAYBIBOANQgYAAgaARQgvAdgJBBQAAgVgHgWg");
	this.shape_10.setTransform(754.375,81.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhzIAAgVAgEhzQABAbAIAXQAZBJBUAOQgbABgbARQgyAegKBDQAAgWgIgWQgVg+hUgLIASAAQAWgDARgMQAxgfADhZg");
	this.shape_11.setTransform(754.4,80.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFF3EA").s().p("AgIBSQgVg+hUgLIASAAQAWgDARgKQAxghADhZQACAbAGAXQAaBKBTANQgaABgcARQgyAegJBDQAAgWgIgWg");
	this.shape_12.setTransform(754.4,81.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(2.4,1,1).p("AgFh3IAAgWAgFh3QACAcAHAYQAcBLBYAPQgcABgdARQg1AfgLBGQABgXgJgXQgXhAhYgLIATgBQAWgDATgLQA0ghADhcg");
	this.shape_13.setTransform(754.4,80.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFF3EA").s().p("AgIBVQgXhAhZgLIATgBQAXgDASgKQA0giADhcQACAcAHAYQAcBMBYAOQgcABgdARQg1AfgKBGQAAgXgIgXg");
	this.shape_14.setTransform(754.4,81.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(2.4,1,1).p("AgEh6IAAgXAgEh6QABAcAIAZQAdBOBeAPQgeABgfASQg4AggLBIQAAgXgJgZQgYhBhegMIAUgBQAYgDAUgMQA3ghAEhfg");
	this.shape_15.setTransform(754.4,80.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFF3EA").s().p("AgJBYQgZhChcgMIATgBQAYgDAUgKQA3gjADhfQACAdAIAYQAdBPBeAPQgeAAgfASQg4AggLBIQAAgXgJgYg");
	this.shape_16.setTransform(754.4,81.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(2.4,1,1).p("AgFh+IAAgYAgFh+QACAdAJAZQAeBRBjAQQgfAAghATQg8AhgLBKQAAgYgJgZQgahDhjgMIAVgBQAZgDAVgNQA7gjADhhg");
	this.shape_17.setTransform(754.4,80.425);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFF3EA").s().p("AgJBaQgahDhjgMIAVgBQAZgDAVgMQA6gkAEhhQACAdAIAZQAfBSBjAPQgfAAghATQg8AhgLBKQAAgYgJgZg");
	this.shape_18.setTransform(754.4,81.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(2.4,1,1).p("AgFiDIAAgYAgFiDQABAfAJAaQAhBTBoAQQghABgjATQg+AigNBNQABgZgKgaQgbhGhogMIAWgBQAagDAWgNQA+gkAEhlg");
	this.shape_19.setTransform(754.4,80.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFF3EA").s().p("AgKBdQgbhGhogMIAWgBQAagDAXgMQA9glAEhlQACAfAIAaQAhBUBoAPQggABgkATQg+AigMBNQAAgZgKgag");
	this.shape_20.setTransform(754.4,81.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(2.4,1,1).p("AgFh/IAAgXAgFh/QABAeAJAZQAgBRBnAQQggAAgiATQg+AhgNBKQABgYgKgZQgbhDhmgMIAVgBQAbgDAVgNQA9gjAEhig");
	this.shape_21.setTransform(754.425,80.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFF3EA").s().p("AgKBaQgbhDhmgMIAVgBQAbgDAVgLQA9glAEhhQABAdAJAaQAgBRBnAPQggAAgiAUQg+AggNBLQABgZgKgZg");
	this.shape_22.setTransform(754.425,81.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(2.4,1,1).p("AgFh3IAAgWAgFh3QACAbAIAZQAeBLBgAPQgeAAggASQg6AfgLBGQAAgWgJgYQgZhAhggLIAUgBQAZgDAUgMQA5ggADhcg");
	this.shape_23.setTransform(754.4,80.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFF3EA").s().p("AgJBVQgahAhggLIAVgBQAYgDAVgKQA4giAEhcQACAcAIAXQAeBNBgAOQgeABggARQg6AfgLBGQAAgWgJgYg");
	this.shape_24.setTransform(754.4,81.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhvIAAgVAgEhvQABAaAIAWQAcBHBaAOQgdAAgdARQg2AdgLBBQAAgVgIgWQgYg8hagKIATgBQAYgDATgLQA0geAEhWg");
	this.shape_25.setTransform(754.4,80.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFF3EA").s().p("AgIBPQgYg7hagKIATgBQAXgDAUgKQA0ggADhWQACAbAIAVQAcBJBZANQgcAAgdARQg3AcgKBBQAAgUgIgXg");
	this.shape_26.setTransform(754.4,81.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhnIAAgUAgEhnQABAXAIAVQAaBCBTANQgaAAgcAQQgyAbgKA9QAAgUgIgUQgVg4hUgJIASgBQAVgDARgKQAygcADhQg");
	this.shape_27.setTransform(754.4,80.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFF3EA").s().p("AgIBKQgVg3hUgKIASgBQAVgCARgKQAygdADhQQACAXAGAWQAaBCBTANQgaAAgcAPQgyAbgJA9QAAgUgIgUg");
	this.shape_28.setTransform(754.4,81.55);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhfIAAgSAgEhfQACAWAGATQAYA9BNAMQgYAAgaAPQguAZgJA4QAAgSgHgTQgUgzhNgJIARgBQATgDAQgJQAugbAChJg");
	this.shape_29.setTransform(754.375,80.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFF3EA").s().p("AgHBFQgUgzhNgKIARAAQATgDAQgIQAugbAChLQACAXAGATQAYA+BNALQgYAAgaAPQguAZgJA4QAAgTgHgSg");
	this.shape_30.setTransform(754.375,81.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhYIAAgQAgDhYQABAUAGASQAWA4BGALQgWAAgYANQgqAXgIA0QAAgRgGgRQgTgvhGgIIAPgBQASgCAPgJQApgYADhEg");
	this.shape_31.setTransform(754.375,80.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFF3EA").s().p("AgGA/QgTgvhGgIIAPgBQASgCAPgIQApgZADhEQABAUAGASQAWA5BGAKQgWAAgYANQgqAXgIA0QAAgRgGgRg");
	this.shape_32.setTransform(754.375,81.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhQIAAgPAgDhQQABATAFAQQAUAzBAAKQgUAAgVAMQgnAVgHAvQAAgPgGgQQgQgrhAgHIAOgBQAQgCANgIQAmgWACg+g");
	this.shape_33.setTransform(754.375,80.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFF3EA").s().p("AgGA6QgQgshAgHIAOgBQAQgBANgIQAmgXACg9QABASAFARQAUAzBAAJQgUAAgVANQgnAUgHAvQAAgPgGgPg");
	this.shape_34.setTransform(754.375,81.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhIIAAgOAgDhIQABAQAFAPQASAuA5AJQgSABgTAKQgiATgHArQAAgOgFgOQgPgng5gHIAMAAQAPgDAMgHQAhgTACg4g");
	this.shape_35.setTransform(754.375,80.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFF3EA").s().p("AgFA0QgPgng5gHIAMAAQAPgCAMgGQAhgVACg4QABARAFAOQASAvA5AIQgSABgTAKQgiATgHArQAAgOgFgOg");
	this.shape_36.setTransform(754.375,81.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(2.4,1,1).p("AgChAQABAPAEANQAPApAzAIQgQAAgRAKQgeARgGAmQAAgMgFgNQgNgjgygGIAKgBQANgBALgHQAegRACgyIAAgN");
	this.shape_37.setTransform(754.375,80.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFF3EA").s().p("AgFAuQgNgigygGIAKgBQANgBALgGQAegSACgzQABAPAEANQAPAqAzAIQgQAAgRAKQgeAQgGAnQAAgNgFgNg");
	this.shape_38.setTransform(754.375,81.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(2.4,1,1).p("AgCg5QABAOADALQAOAkAsAHQgOABgPAIQgaAPgFAiQAAgLgEgLQgLgfgsgGIAJAAQALgBAKgGQAZgPACgtIAAgK");
	this.shape_39.setTransform(754.375,80.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFF3EA").s().p("AgEApQgLgfgsgFIAJAAQALgCAKgFQAZgQACgsQABANADAMQAOAlAsAGQgOAAgPAIQgaAPgFAiQAAgLgEgLg");
	this.shape_40.setTransform(754.375,81.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(2.4,1,1).p("AgCgxIAAgJAgCgxQABAMADAKQAMAfAlAGQgMAAgMAHQgXANgEAdQAAgJgDgKQgKgaglgFIAHAAQAKgCAIgFQAWgNABgmg");
	this.shape_41.setTransform(754.35,80.875);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFF3EA").s().p("AgDAkQgKgbgmgFIAIAAQALgBAHgEQAWgOACgnQAAAMADAKQAMAgAmAFQgNABgMAHQgXANgEAdQAAgKgDgJg");
	this.shape_42.setTransform(754.35,81.325);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(2.4,1,1).p("AgBgpIAAgIAgBgpQABAJABAJQAKAaAgAFQgKAAgLAGQgSALgEAZQAAgIgDgIQgHgWgggEIAHgBQAIgBAHgEQASgLABggg");
	this.shape_43.setTransform(754.35,80.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFF3EA").s().p("AgCAeQgIgWgggEIAHgBQAIgBAHgDQASgMABggQAAAJACAJQALAbAfAEQgLAAgKAGQgTALgDAZQAAgIgCgIg");
	this.shape_44.setTransform(754.35,81.325);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(2.4,1,1).p("AAAghIAAgHAAAghQAAAIABAHQAIAVAZAEQgJAAgHAFQgPAJgDAUQAAgGgCgHQgGgSgZgDIAFgBQAHAAAFgEQAOgJACgag");
	this.shape_45.setTransform(754.35,80.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFF3EA").s().p("AgCAZQgGgSgZgEIAFAAQAHgBAFgCQAPgKABgbQgBAIACAHQAIAWAZAEQgJAAgIAFQgPAJgCAUQAAgHgCgGg");
	this.shape_46.setTransform(754.35,81.275);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(2.4,1,1).p("AAAgaIAAgFAAAgaQAAAGABAGQAGAQASADQgGAAgGAEQgLAHgCAQQAAgFgBgFQgFgPgSgCIAEAAQAFgBAEgDQAKgGABgVg");
	this.shape_47.setTransform(754.325,81.025);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFF3EA").s().p("AgBATQgFgOgSgDIAEAAQAFgBAEgBQAKgIABgUQAAAGABAFQAGARASADQgGAAgGADQgLAHgCAQQAAgFgBgFg");
	this.shape_48.setTransform(754.325,81.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").ss(2.4,1,1).p("AAAgaIAAgFAAAgaQAAAGABAGQAGAQASADQgGAAgGAEQgLAHgCAQQAAgFgBgFQgFgPgSgCIAEAAQAFgBAEgDQAKgHABgUg");
	this.shape_49.setTransform(754.325,81.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(2.4,1,1).p("AgCg5QABAOADALQAOAkAsAHQgOABgPAIQgaAPgFAiQAAgLgEgLQgLgfgsgGIAJAAQALgBAKgGQAZgQACgsIAAgK");
	this.shape_50.setTransform(754.375,80.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhIIAAgOAgDhIQABAQAFAPQASAuA5AJQgSABgTAKQgiATgHArQAAgOgFgOQgPgng5gHIAMAAQAPgDAMgHQAhgUACg3g");
	this.shape_51.setTransform(754.375,80.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(2.4,1,1).p("AgEhnIAAgUAgEhnQABAXAIAVQAaBCBTANQgaAAgcAQQgyAbgKA9QAAgUgIgUQgVg4hUgJIASgBQAVgDARgKQAygdADhPg");
	this.shape_52.setTransform(754.4,80.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFF3EA").s().p("AgIBKQgVg3hUgKIASgBQAVgCARgKQAygeADhPQACAXAGAWQAaBCBTANQgaAAgcAPQgyAbgJA9QAAgUgIgUg");
	this.shape_53.setTransform(754.4,81.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFF3EA").s().p("AgJBVQgahAhggLIAVgBQAYgDAVgKQA4gjAEhbQACAcAIAXQAeBNBgAOQgeABggARQg6AfgLBGQAAgWgJgYg");
	this.shape_54.setTransform(754.4,81.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(2.4,1,1).p("AgEh6IAAgXAgEh6QABAcAIAZQAdBOBeAPQgeABgfASQg4AggLBIQAAgXgJgZQgYhBhegMIAUgBQAYgDAUgMQA3giAEheg");
	this.shape_55.setTransform(754.4,80.45);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(2.4,1,1).p("AgDhnIAAgTAgDhnQABAYAFAUQAVBCBEANQgWAAgWAQQgoAbgIA8QAAgTgGgVQgSg3hDgKIAOAAQARgDAPgKQAngdADhPg");
	this.shape_56.setTransform(754.375,80.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:754.35,y:81.4875}},{t:this.shape,p:{scaleX:1,scaleY:1,x:754.35,y:81.225}}]}).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:754.35,y:81.4875}},{t:this.shape_2,p:{scaleX:1,scaleY:1,x:754.35,y:81.225}}]},3).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_10},{t:this.shape_9}]},1).to({state:[{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_1,p:{scaleX:1.9284,scaleY:1.4091,x:754.4279,y:81.648}},{t:this.shape,p:{scaleX:1.9284,scaleY:1.4091,x:754.4279,y:81.2781}}]},1).to({state:[{t:this.shape_22},{t:this.shape_21}]},1).to({state:[{t:this.shape_24},{t:this.shape_23}]},1).to({state:[{t:this.shape_26},{t:this.shape_25}]},1).to({state:[{t:this.shape_28},{t:this.shape_27}]},1).to({state:[{t:this.shape_30},{t:this.shape_29}]},1).to({state:[{t:this.shape_32},{t:this.shape_31}]},1).to({state:[{t:this.shape_34},{t:this.shape_33}]},1).to({state:[{t:this.shape_36},{t:this.shape_35}]},1).to({state:[{t:this.shape_38},{t:this.shape_37}]},1).to({state:[{t:this.shape_40},{t:this.shape_39}]},1).to({state:[{t:this.shape_42},{t:this.shape_41}]},1).to({state:[{t:this.shape_44},{t:this.shape_43}]},1).to({state:[{t:this.shape_46},{t:this.shape_45}]},1).to({state:[{t:this.shape_48},{t:this.shape_47}]},1).to({state:[{t:this.shape_1,p:{scaleX:0.2008,scaleY:0.1976,x:754.3327,y:81.2394}},{t:this.shape_2,p:{scaleX:0.2008,scaleY:0.1976,x:754.3327,y:81.1876}}]},1).to({state:[]},1).to({state:[{t:this.shape_1,p:{scaleX:0.2008,scaleY:0.1976,x:754.3327,y:81.2394}},{t:this.shape,p:{scaleX:0.2008,scaleY:0.1976,x:754.3327,y:81.1876}}]},17).to({state:[{t:this.shape_48},{t:this.shape_49}]},1).to({state:[{t:this.shape_46},{t:this.shape_45}]},1).to({state:[{t:this.shape_44},{t:this.shape_43}]},1).to({state:[{t:this.shape_42},{t:this.shape_41}]},1).to({state:[{t:this.shape_40},{t:this.shape_50}]},1).to({state:[{t:this.shape_38},{t:this.shape_37}]},1).to({state:[{t:this.shape_36},{t:this.shape_51}]},1).to({state:[{t:this.shape_34},{t:this.shape_33}]},1).to({state:[{t:this.shape_32},{t:this.shape_31}]},1).to({state:[{t:this.shape_30},{t:this.shape_29}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_26},{t:this.shape_25}]},1).to({state:[{t:this.shape_54},{t:this.shape_23}]},1).to({state:[{t:this.shape_22},{t:this.shape_21}]},1).to({state:[{t:this.shape_1,p:{scaleX:1.9284,scaleY:1.4091,x:754.4279,y:81.6448}},{t:this.shape_2,p:{scaleX:1.9284,scaleY:1.4091,x:754.4279,y:81.2749}}]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_16},{t:this.shape_55}]},1).to({state:[{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_10},{t:this.shape_9}]},1).to({state:[{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_6},{t:this.shape_56}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:754.35,y:81.4875}},{t:this.shape,p:{scaleX:1,scaleY:1,x:754.35,y:81.225}}]},1).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:754.35,y:81.4875}},{t:this.shape,p:{scaleX:1,scaleY:1,x:754.35,y:81.225}}]},3).wait(1));

	// zv_2
	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(2.4,1,1).p("AgEiXIABAUQACAYAJAVQAeBDBTAJQgbARgdAdQg6A6gIA6QgGgfgSgiQgjhFg8gOIARgBQAUgDASgLQA4glAFhng");
	this.shape_57.setTransform(878.825,114.8);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFF3EA").s().p("AgZBXQgjhFg8gOIARgBQAUgDASgLQA4glAFhnIABAUQACAYAJAUQAeBEBTAJQgbARgdAcQg6A6gIA7QgGgggSghg");
	this.shape_58.setTransform(878.825,114.8);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(2.4,1,1).p("AhuAEIAPgBQATgDAQgKQA0giAEheQADAoAIATQAcA9BMAJQgZAPgaAbQg1A1gIA2QgFgdgRgfQggg/g3gNg");
	this.shape_59.setTransform(878.825,114.8);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFF3EA").s().p("AgXBQQgghAg3gNIAPAAQATgDAQgKQA0giAEheQADAoAIATQAcA9BMAJQgZAPgaAbQg1A1gIA2QgFgegRgeg");
	this.shape_60.setTransform(878.825,114.8);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(2.4,1,1).p("AhkADIAPgBQARgCAOgKQAvgeAEhWQADAlAHARQAZA4BFAIQgWANgYAYQgxAxgGAwQgFgagPgcQgeg5gygMg");
	this.shape_61.setTransform(878.8,114.8);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFF3EA").s().p("AgUBIQgeg5gygMIAOgBQASgCAOgJQAvgfAEhVQACAkAIARQAYA4BGAIQgWAOgYAXQgxAxgGAwQgGgZgOgdg");
	this.shape_62.setTransform(878.8,114.8);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(2.4,1,1).p("AhaADIANgBQAPgCANgJQArgbADhNQADAhAGAPQAWAyA/AHQgUANgWAVQgsAsgGAsQgEgYgNgZQgbg0gtgKg");
	this.shape_63.setTransform(878.825,114.8);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFF3EA").s().p("AgSBBQgbgzgtgLIANgBQAPgCANgJQArgaADhOQADAhAGAQQAWAxA/AHQgUANgWAVQgsAsgGAsQgEgYgNgZg");
	this.shape_64.setTransform(878.825,114.8);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").ss(2.4,1,1).p("AhQACIALAAQAOgCAMgIQAlgYADhFQADAeAFAOQAUAsA4AGQgSALgUATQgmAngGAnQgDgVgMgXQgYgtgogKg");
	this.shape_65.setTransform(878.825,114.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFF3EA").s().p("AgQA5QgYgtgogKIALAAQAOgCAMgIQAlgYADhEQADAdAFAOQAUAsA4AGQgSALgUAUQgmAmgGAnQgDgUgMgYg");
	this.shape_66.setTransform(878.825,114.8);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").ss(2.4,1,1).p("AhGACIAKAAQAMgCAKgHQAhgVADg8QACAaAEAMQASAnAxAFQgQAKgRAQQgiAigFAiQgDgSgKgUQgVgogjgIg");
	this.shape_67.setTransform(878.825,114.8);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFF3EA").s().p("AgOAzQgVgogjgJIAKAAQAMgCAKgHQAhgUADg9QACAaAEAMQASAnAxAFQgQAKgRAQQgiAigFAjQgDgSgKgUg");
	this.shape_68.setTransform(878.825,114.8);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(2.4,1,1).p("Ag7ACIAIgBQAKgBAJgFQAcgTACgzQACAWAEAKQAPAiAqAEQgOAIgOAPQgdAdgEAdQgDgQgJgRQgRgigegHg");
	this.shape_69.setTransform(878.8,114.8);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFF3EA").s().p("AgMArQgSgigegHIAJgBQAKgBAJgFQAcgSADg0QABAWAEAKQAPAiAqAEQgOAIgOAPQgeAdgDAdQgDgQgJgRg");
	this.shape_70.setTransform(878.8,114.8);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(2.4,1,1).p("AgxACIAHAAQAIgCAHgEQAYgPACgrQABASADAJQANAcAjADQgMAHgMAMQgYAYgDAYQgCgNgIgOQgOgcgZgGg");
	this.shape_71.setTransform(878.8,114.8);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFF3EA").s().p("AgKAkQgPgdgZgFIAHgBQAJgBAIgEQAXgPACgrQABASADAJQANAbAjAFQgMAFgMANQgYAYgDAYQgCgNgIgOg");
	this.shape_72.setTransform(878.8,114.8);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").ss(2.4,1,1).p("AgnACIAFgBQAHgBAGgDQATgMACgiQAAAOADAHQAKAXAcADQgKAEgJAKQgTAUgDASQgCgKgGgLQgLgXgUgEg");
	this.shape_73.setTransform(878.8,114.8);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFF3EA").s().p("AgIAcQgLgWgVgFIAGAAQAHgBAGgDQASgMADgjQAAAPACAHQAKAWAcAEQgJAEgKAKQgSATgDAUQgCgLgGgMg");
	this.shape_74.setTransform(878.8,114.8);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").ss(2.4,1,1).p("AgdABIADAAQAGgBAEgCQAOgJABgaQABALACAGQAHAQAVACQgHAEgHAHQgOAPgCAOQgBgIgFgIQgJgRgOgEg");
	this.shape_75.setTransform(878.825,114.8);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFF3EA").s().p("AgGAVQgJgRgOgDIADAAQAGgBAEgCQAOgJABgaQABALACAGQAHAQAVACQgHAEgHAHQgOAPgCAOQgBgIgFgJg");
	this.shape_76.setTransform(878.825,114.8);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(2.4,1,1).p("AgTABIACgBQAEAAADgBQAJgGABgRQAAAHABADQAFAMAOABQgEACgFAFQgKAKgBAJQAAgFgDgGQgGgLgKgCg");
	this.shape_77.setTransform(878.8,114.8);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFF3EA").s().p("AgEAOQgFgLgKgCIACgBQAEAAADgBQAJgGABgRQAAAHABADQAFAMAOABIgKAHQgJAKgBAJQAAgFgEgGg");
	this.shape_78.setTransform(878.8,114.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#000000").ss(2.4,1,1).p("AgRAAIADAAQADAAADgBQAIgGAAgPQAAAHABACQAFALAMABQgEACgEAEQgJAIgBAKQAAgFgCgFQgFgKgKgDg");
	this.shape_79.setTransform(842.3,85.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFF3EA").s().p("AgCANQgFgKgKgDIADAAIAFgBQAJgGAAgOIABAJQAFAKAMABIgJAGQgIAIgBAKIgCgKg");
	this.shape_80.setTransform(842.3,85.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").ss(2.4,1,1).p("AgYABIADAAQAFgBADgCQAMgHABgWQAAAKABAEQAHAOARACQgGADgGAGQgMALgBANQgBgHgDgHQgIgOgMgDg");
	this.shape_81.setTransform(842.325,85.375);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFF3EA").s().p("AgEASQgIgOgMgDIADAAQAFgBADgCQAMgHABgWQAAAKABAEQAHAOARACQgGADgGAGQgMALgBANQgBgHgDgHg");
	this.shape_82.setTransform(842.325,85.375);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#000000").ss(2.4,1,1).p("AggABIAFgBQAGAAAEgDQAPgKABgbQABAMACAFQAIASAXADQgIADgIAIQgPAPgCARQgBgJgFgJQgJgSgRgEg");
	this.shape_83.setTransform(842.325,85.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFF3EA").s().p("AgGAXQgJgSgRgEIAFgBQAGAAAEgDQAPgKABgbQABAMACAFQAIASAXADQgIAEgIAHQgPAQgCAQQgBgJgFgJg");
	this.shape_84.setTransform(842.325,85.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(2.4,1,1).p("AgnABIAGAAQAGgBAHgDQASgMACgiQAAAOADAHQAKAWAbAEQgJAEgJAKQgTATgDATQgBgKgGgMQgMgWgUgFg");
	this.shape_85.setTransform(842.3,85.375);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFF3EA").s().p("AgHAcQgMgWgUgFIAGAAQAHgBAFgDQATgMABgiQABAOADAHQAKAWAbAEQgJAEgJAKQgTATgDATQgBgKgGgMg");
	this.shape_86.setTransform(842.3,85.375);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#000000").ss(2.4,1,1).p("AguABIAGAAQAIgBAHgEQAWgPACgoQABARADAIQAMAbAgADQgKAHgMALQgWAWgDAXQgCgMgHgOQgOgagXgGg");
	this.shape_87.setTransform(842.325,85.4);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFF3EA").s().p("AgJAhQgOgagXgFIAGgBQAIgBAHgEQAWgOACgoQABAQADAJQAMAaAgAEQgKAGgMALQgWAWgDAXQgCgMgHgOg");
	this.shape_88.setTransform(842.325,85.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#000000").ss(2.4,1,1).p("Ag2ACIAIgBQAJgBAIgFQAagQACgvQABAUADAJQAOAfAmAEQgMAHgOANQgaAagDAbQgCgPgIgPQgQgfgcgGg");
	this.shape_89.setTransform(842.325,85.375);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFF3EA").s().p("AgKAnQgQgfgcgGIAIgBQAJgBAIgFQAagQACgvQABAUADAJQAOAfAmAEQgMAHgOANQgaAagDAbQgCgPgIgPg");
	this.shape_90.setTransform(842.325,85.375);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(2.4,1,1).p("Ag9ACIAJgBQAKgBAJgGQAdgTACg0QACAWAEALQAQAiAqAFQgOAIgPAPQgdAegEAeQgDgRgJgRQgSgjgfgHg");
	this.shape_91.setTransform(842.325,85.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFF3EA").s().p("AgMAsQgSgjgfgHIAJAAQAKgCAJgFQAdgUACg0QACAXAEAKQAQAiAqAGQgOAHgPAPQgdAdgEAfQgDgRgJgRg");
	this.shape_92.setTransform(842.325,85.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(2.4,1,1).p("AhEACIAJAAQAMgCAKgGQAggVADg7QACAZAFAMQARAmAwAGQgQAJgQARQgiAhgEAhQgDgSgLgTQgUgngigJg");
	this.shape_93.setTransform(842.35,85.375);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFF3EA").s().p("AgOAyQgUgngjgJIAKAAQAMgCAKgGQAggVADg7QACAZAEAMQASAmAwAGQgQAJgRARQghAhgEAhQgDgSgLgTg");
	this.shape_94.setTransform(842.35,85.375);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(2.4,1,1).p("AhMADIALgBQANgCALgHQAkgXADhCQACAcAFANQATArA1AGQgRAKgSATQglAkgFAlQgEgUgLgWQgXgrgmgIg");
	this.shape_95.setTransform(842.35,85.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFF3EA").s().p("AgQA2QgWgrgmgIIALgBQANgCALgHQAjgXAEhBQACAbAFANQATArA1AGQgRAKgSATQgmAkgEAlQgEgTgMgXg");
	this.shape_96.setTransform(842.35,85.4);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(2.4,1,1).p("AhTADIAMgBQAOgCAMgIQAngZAEhIQACAfAGAOQAVAvA6AHQgTALgUAUQgpAogFApQgEgWgNgYQgYgvgqgKg");
	this.shape_97.setTransform(842.35,85.375);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFF3EA").s().p("AgRA8QgYgvgqgKIAMgBQAOgCAMgIQAngZAEhIQACAfAGAOQAUAvA6AHQgTALgUAUQgoAogFApQgFgWgMgYg");
	this.shape_98.setTransform(842.35,85.375);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(2.4,1,1).p("AhbADIANgBQAQgCANgJQAqgbAEhOQADAhAGAPQAWAzBAAHQgVANgWAWQgsArgGAtQgEgYgOgaQgag0gugKg");
	this.shape_99.setTransform(842.375,85.4);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFF3EA").s().p("AgTBCQgag0gugLIANgBQAQgCANgJQAqgbAEhOQADAiAGAOQAWA0BAAGQgVANgWAWQgsArgGAtQgEgYgOgZg");
	this.shape_100.setTransform(842.375,85.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(2.4,1,1).p("AhiADIAOAAQAQgDAPgJQAugeAEhUQADAkAGARQAZA2BEAIQgWAOgXAXQgwAwgGAvQgFgZgPgcQgdg4gxgMg");
	this.shape_101.setTransform(842.35,85.375);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFF3EA").s().p("AgUBHQgdg4gxgMIAOAAQAQgDAPgJQAugeAEhUQACAkAIARQAYA2BEAIQgWAOgXAXQgwAwgGAvQgFgZgPgcg");
	this.shape_102.setTransform(842.35,85.375);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#000000").ss(2.4,1,1).p("AhpADIAPAAQARgDAQgKQAxggAEhbQAEAnAHASQAbA7BIAIQgXAOgZAaQg0AzgHAzQgEgbgRgeQgfg8g0gNg");
	this.shape_103.setTransform(842.35,85.4);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFF3EA").s().p("AgWBMQgfg8g1gMIAQgBQARgDAQgKQAyggADhaQAEAmAHASQAaA7BKAIQgYAOgaAaQgyAzgIAzQgEgbgRgeg");
	this.shape_104.setTransform(842.35,85.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#000000").ss(2.4,1,1).p("AhxAEIAQgBQATgDARgLQA1giAEhhQADAqAIATQAcA/BPAJQgaAPgbAcQg2A2gIA3QgFgegRggQgihAg4gNg");
	this.shape_105.setTransform(842.375,85.375);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFF3EA").s().p("AgXBRQgihAg4gNIAQgBQATgDARgLQA1giAEhhQADAqAIATQAcA/BPAJQgaAPgbAcQg2A2gIA3QgFgegRggg");
	this.shape_106.setTransform(842.375,85.375);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#000000").ss(2.4,1,1).p("Ah4AEIARgBQAVgDARgMQA4gkAFhmQADArAJAVQAeBCBTAKQgbAQgdAdQg6A6gIA6QgGgfgSgiQgjhEg8gOg");
	this.shape_107.setTransform(842.375,85.4);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFF3EA").s().p("AgZBWQgjhEg8gOIARgBQAVgDARgLQA4glAFhmQADAsAJAUQAeBCBTAKQgbAQgdAdQg6A6gIA6QgGgfgSgig");
	this.shape_108.setTransform(842.375,85.4);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#000000").ss(2.4,1,1).p("Ah2AEIARgBQAUgDARgLQA3gkAFhlQADArAJAUQAdBCBSAJQgbAQgcAcQg5A5gIA5QgGgegRgiQgjhCg7gOg");
	this.shape_109.setTransform(842.375,85.4);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFF3EA").s().p("AgYBVQgjhEg7gNIARgBQAUgDARgLQA3gkAFhkQADAqAJAVQAdBBBSAJQgbAQgcAcQg5A5gIA6QgGgfgRghg");
	this.shape_110.setTransform(842.375,85.4);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#000000").ss(2.4,1,1).p("AhyAEIAQgBQATgDARgLQA2gjAEhiQADAqAIATQAdBABPAJQgZAQgcAcQg3A3gIA3QgFgegSgfQghhCg5gNg");
	this.shape_111.setTransform(842.375,85.4);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFF3EA").s().p("AgYBTQghhCg5gNIAQgBQATgDARgLQA2giAEhjQADAqAIATQAdBBBPAIQgZAQgcAcQg3A3gIA3QgFgegSgfg");
	this.shape_112.setTransform(842.375,85.4);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#000000").ss(2.4,1,1).p("AhuADIAQAAQASgDAQgLQA0ghAEheQADAoAIATQAbA9BNAJQgZAPgaAbQg1A0gIA2QgFgdgRgfQggg/g3gNg");
	this.shape_113.setTransform(842.375,85.4);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFF3EA").s().p("AgXBPQggg+g3gNIAQgBQASgDAQgLQA0ghAEheQADApAIASQAbA+BNAIQgZAPgaAbQg1A0gIA2QgFgdgRgfg");
	this.shape_114.setTransform(842.375,85.4);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#000000").ss(2.4,1,1).p("AhoADIAPAAQARgDAQgKQAwggAEhZQADAmAIASQAaA6BIAIQgYAOgZAZQgyAzgHAyQgFgbgPgeQgfg7g0gMg");
	this.shape_115.setTransform(842.375,85.4);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFF3EA").s().p("AgVBLQgfg8g0gLIAPgBQARgDAQgKQAwggAEhYQADAmAIARQAaA6BIAIQgYAOgZAaQgyAygHAyQgFgbgPgdg");
	this.shape_116.setTransform(842.375,85.4);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#000000").ss(2.4,1,1).p("AhhADIAOAAQAQgDAPgJQAtgeAEhTQADAkAGAQQAYA2BEAIQgWANgXAXQgvAvgGAwQgFgagPgcQgcg3gxgLg");
	this.shape_117.setTransform(842.35,85.4);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFF3EA").s().p("AgTBFQgdg3gxgLIAOAAQAQgDAPgJQAtgdAEhTQACAjAIARQAXA1BEAIQgWANgXAYQgvAugGAwQgFgagOgcg");
	this.shape_118.setTransform(842.35,85.4);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#000000").ss(2.4,1,1).p("AhYADIANgBQAPgCAMgIQAqgbADhMQADAhAFAPQAXAxA9AHQgUAMgVAVQgrArgFArQgFgXgNgZQgagzgsgKg");
	this.shape_119.setTransform(842.35,85.375);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFF3EA").s().p("AgSBAQgagzgsgKIAMgBQAQgCANgIQApgbADhMQADAhAGAPQAWAxA9AHQgUAMgVAVQgrArgFArQgFgXgNgZg");
	this.shape_120.setTransform(842.35,85.375);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#000000").ss(2.4,1,1).p("AhOADIALgBQAOgCALgIQAlgXADhEQACAdAFANQAUAsA3AHQgSAKgTATQgmAmgFAmQgEgVgMgWQgXgsgngJg");
	this.shape_121.setTransform(842.35,85.4);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFF3EA").s().p("AgQA5QgXgtgogJIAMgBQANgCALgIQAlgXAEhEQACAdAFAOQATAsA4AGQgTAKgSATQgnAmgEAmQgEgVgMgVg");
	this.shape_122.setTransform(842.35,85.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#000000").ss(2.4,1,1).p("AhDACIAKgBQALgBAKgGQAggVACg6QACAZAEALQARAmAvAGQgPAIgQARQghAhgEAgQgDgRgKgUQgUgmgigIg");
	this.shape_123.setTransform(842.325,85.4);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFF3EA").s().p("AgNAxQgUgngigIIAKAAQALgCAKgGQAggUACg6QACAYAEAMQARAmAvAFQgPAJgQAQQghAhgEAhQgDgSgKgTg");
	this.shape_124.setTransform(842.325,85.4);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#000000").ss(2.4,1,1).p("Ag3ABIAIAAQAKgBAIgFQAZgRADgvQABAUAEAJQAOAfAmAFQgNAHgNANQgbAbgDAbQgCgPgJgQQgQgfgcgHg");
	this.shape_125.setTransform(842.325,85.4);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFF3EA").s().p("AgLAoQgQgggcgGIAIgBQAKgBAIgFQAZgQADgwQABAVAEAJQAOAeAmAFQgNAHgNANQgbAbgDAbQgCgPgJgPg");
	this.shape_126.setTransform(842.325,85.4);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#000000").ss(2.4,1,1).p("AgpABIAGAAQAHgBAGgDQATgNACgkQABAQADAHQAKAXAdADQgKAFgKAKQgUAUgCAVQgCgLgGgMQgMgYgVgFg");
	this.shape_127.setTransform(842.325,85.375);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFF3EA").s().p("AgIAeQgMgYgVgFIAGAAQAHgBAGgDQATgNACgkQABAQADAHQAKAXAdADQgKAFgKAKQgUAUgCAVQgCgLgGgMg");
	this.shape_128.setTransform(842.325,85.375);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#000000").ss(2.4,1,1).p("AgaABIAEAAQAFgBAEgCQAMgIABgXQAAAKACAEQAHAQASACQgGADgGAGQgNAMgCAOQAAgHgEgIQgIgPgOgDg");
	this.shape_129.setTransform(842.3,85.375);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFF3EA").s().p("AgEATQgIgPgOgDIAEAAQAFgBAEgCQAMgIABgXQAAAKACAEQAGAQATACQgGADgGAGQgOAMgBAOQAAgHgEgIg");
	this.shape_130.setTransform(842.3,85.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}},{t:this.shape_57,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}}]}).to({state:[{t:this.shape_58,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}},{t:this.shape_57,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}}]},1).to({state:[{t:this.shape_60},{t:this.shape_59}]},1).to({state:[{t:this.shape_62},{t:this.shape_61}]},1).to({state:[{t:this.shape_64},{t:this.shape_63}]},1).to({state:[{t:this.shape_66},{t:this.shape_65}]},1).to({state:[{t:this.shape_68},{t:this.shape_67}]},1).to({state:[{t:this.shape_70},{t:this.shape_69}]},1).to({state:[{t:this.shape_72},{t:this.shape_71}]},1).to({state:[{t:this.shape_74},{t:this.shape_73}]},1).to({state:[{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_78},{t:this.shape_77}]},1).to({state:[{t:this.shape_58,p:{scaleX:0.0825,scaleY:0.0825,x:878.7771,y:114.8113}},{t:this.shape_57,p:{scaleX:0.0825,scaleY:0.0825,x:878.7771,y:114.8113}}]},1).to({state:[]},1).to({state:[{t:this.shape_58,p:{scaleX:0.0858,scaleY:0.0858,x:842.3071,y:85.3713}},{t:this.shape_57,p:{scaleX:0.0858,scaleY:0.0858,x:842.3071,y:85.3713}}]},6).to({state:[{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_82},{t:this.shape_81}]},1).to({state:[{t:this.shape_84},{t:this.shape_83}]},1).to({state:[{t:this.shape_86},{t:this.shape_85}]},1).to({state:[{t:this.shape_88},{t:this.shape_87}]},1).to({state:[{t:this.shape_90},{t:this.shape_89}]},1).to({state:[{t:this.shape_92},{t:this.shape_91}]},1).to({state:[{t:this.shape_94},{t:this.shape_93}]},1).to({state:[{t:this.shape_96},{t:this.shape_95}]},1).to({state:[{t:this.shape_98},{t:this.shape_97}]},1).to({state:[{t:this.shape_100},{t:this.shape_99}]},1).to({state:[{t:this.shape_102},{t:this.shape_101}]},1).to({state:[{t:this.shape_104},{t:this.shape_103}]},1).to({state:[{t:this.shape_106},{t:this.shape_105}]},1).to({state:[{t:this.shape_58,p:{scaleX:1,scaleY:1,x:842.375,y:85.4}},{t:this.shape_57,p:{scaleX:1,scaleY:1,x:842.375,y:85.4}}]},1).to({state:[{t:this.shape_108},{t:this.shape_107}]},1).to({state:[{t:this.shape_110},{t:this.shape_109}]},1).to({state:[{t:this.shape_112},{t:this.shape_111}]},1).to({state:[{t:this.shape_114},{t:this.shape_113}]},1).to({state:[{t:this.shape_116},{t:this.shape_115}]},1).to({state:[{t:this.shape_118},{t:this.shape_117}]},1).to({state:[{t:this.shape_120},{t:this.shape_119}]},1).to({state:[{t:this.shape_122},{t:this.shape_121}]},1).to({state:[{t:this.shape_124},{t:this.shape_123}]},1).to({state:[{t:this.shape_126},{t:this.shape_125}]},1).to({state:[{t:this.shape_128},{t:this.shape_127}]},1).to({state:[{t:this.shape_130},{t:this.shape_129}]},1).to({state:[{t:this.shape_58,p:{scaleX:0.0858,scaleY:0.0858,x:842.3071,y:85.3713}},{t:this.shape_57,p:{scaleX:0.0858,scaleY:0.0858,x:842.3071,y:85.3713}}]},1).to({state:[]},1).to({state:[{t:this.shape_58,p:{scaleX:0.0825,scaleY:0.0825,x:878.7771,y:114.8113}},{t:this.shape_57,p:{scaleX:0.0825,scaleY:0.0825,x:878.7771,y:114.8113}}]},15).to({state:[{t:this.shape_78},{t:this.shape_77}]},1).to({state:[{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_74},{t:this.shape_73}]},1).to({state:[{t:this.shape_72},{t:this.shape_71}]},1).to({state:[{t:this.shape_70},{t:this.shape_69}]},1).to({state:[{t:this.shape_68},{t:this.shape_67}]},1).to({state:[{t:this.shape_66},{t:this.shape_65}]},1).to({state:[{t:this.shape_64},{t:this.shape_63}]},1).to({state:[{t:this.shape_62},{t:this.shape_61}]},1).to({state:[{t:this.shape_60},{t:this.shape_59}]},1).to({state:[{t:this.shape_58,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}},{t:this.shape_57,p:{scaleX:1,scaleY:1,x:878.825,y:114.8}}]},1).wait(1));

	// zv_1_2
	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#000000").ss(2.4,1,1).p("AAAg3IAABv");
	this.shape_131.setTransform(870.1,158.1);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(2.4,1,1).p("AAAA1IAAhp");
	this.shape_132.setTransform(870.1,158.1);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAuIAAhb");
	this.shape_133.setTransform(870.1,158.1);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAiIAAhD");
	this.shape_134.setTransform(870.1,158.1);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#000000").ss(2.4,1,1).p("AAAARIAAgh");
	this.shape_135.setTransform(870.1,158.125);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAFIAAgJ");
	this.shape_136.setTransform(870.1,158.125);
	this.shape_136._off = true;

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAHIAAgN");
	this.shape_137.setTransform(741.65,182);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(2.4,1,1).p("AAAATIAAgl");
	this.shape_138.setTransform(741.65,182.025);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAgIAAg/");
	this.shape_139.setTransform(741.65,182);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAsIAAhX");
	this.shape_140.setTransform(741.65,182.025);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#000000").ss(2.4,1,1).p("AAAA3IAAht");
	this.shape_141.setTransform(741.65,182.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAzIAAhl");
	this.shape_142.setTransform(741.65,182);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAtIAAhZ");
	this.shape_143.setTransform(741.65,182.025);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAkIAAhH");
	this.shape_144.setTransform(741.65,182);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAZIAAgx");
	this.shape_145.setTransform(741.65,182.025);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(2.4,1,1).p("AAAALIAAgV");
	this.shape_146.setTransform(741.65,182);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAPIAAgd");
	this.shape_147.setTransform(870.1,158.125);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(2.4,1,1).p("AAAAjIAAhG");
	this.shape_148.setTransform(870.1,158.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_131,p:{x:870.1,y:158.1}}]}).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133,p:{y:158.1}}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[]},1).to({state:[{t:this.shape_136}]},23).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_131,p:{x:741.65,y:182}}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145,p:{x:741.65,y:182.025}}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_136}]},1).to({state:[]},1).to({state:[{t:this.shape_136}]},26).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_145,p:{x:870.1,y:158.125}}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_133,p:{y:158.125}}]},1).to({state:[{t:this.shape_131,p:{x:870.1,y:158.1}}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_136).wait(5).to({_off:false},0).to({_off:true},1).wait(23).to({_off:false,x:741.65,y:182.025},0).to({_off:true},1).wait(11).to({_off:false},0).to({_off:true},1).wait(26).to({_off:false,x:870.1,y:158.125},0).wait(1).to({y:158.1},0).to({_off:true},1).wait(5));

	// zv_1_1
	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#000000").ss(2.4,1,1).p("AAsAAIhXAA");
	this.shape_149.setTransform(869.5,158.1);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(2.4,1,1).p("AgqAAIBVAA");
	this.shape_150.setTransform(869.5,158.1);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(2.4,1,1).p("AglAAIBLAA");
	this.shape_151.setTransform(869.575,158.1);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(2.4,1,1).p("AgdAAIA7AA");
	this.shape_152.setTransform(869.675,158.1);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(2.4,1,1).p("AgSAAIAlAA");
	this.shape_153.setTransform(869.825,158.1);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(2.4,1,1).p("AAFAAIgJAA");
	this.shape_154.setTransform(870,158.1);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(2.4,1,1).p("AAGAAIgKAA");
	this.shape_155.setTransform(741.55,182);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(2.4,1,1).p("AgMAAIAZAA");
	this.shape_156.setTransform(741.45,182);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#000000").ss(2.4,1,1).p("AgUAAIApAA");
	this.shape_157.setTransform(741.35,182);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(2.4,1,1).p("AgcAAIA5AA");
	this.shape_158.setTransform(741.25,182);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(2.4,1,1).p("AgjAAIBHAA");
	this.shape_159.setTransform(741.15,182);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#000000").ss(2.4,1,1).p("AgoAAIBRAA");
	this.shape_160.setTransform(741.1,182);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#000000").ss(2.4,1,1).p("AgkAAIBJAA");
	this.shape_161.setTransform(741.15,182);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(2.4,1,1).p("AgfAAIA+AA");
	this.shape_162.setTransform(741.2,182);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(2.4,1,1).p("AgXAAIAwAA");
	this.shape_163.setTransform(741.3,182);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#000000").ss(2.4,1,1).p("AgPAAIAfAA");
	this.shape_164.setTransform(741.425,182);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#000000").ss(2.4,1,1).p("AgLAAIAXAA");
	this.shape_165.setTransform(869.9,158.1);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(2.4,1,1).p("AgRAAIAjAA");
	this.shape_166.setTransform(869.825,158.1);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(2.4,1,1).p("AgYAAIAxAA");
	this.shape_167.setTransform(869.775,158.1);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").ss(2.4,1,1).p("AgeAAIA9AA");
	this.shape_168.setTransform(869.675,158.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_149,p:{x:869.5,y:158.1}}]}).to({state:[{t:this.shape_150,p:{x:869.5,y:158.1}}]},1).to({state:[{t:this.shape_151,p:{x:869.575}}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[]},1).to({state:[{t:this.shape_155}]},23).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_149,p:{x:741.05,y:182}}]},1).to({state:[{t:this.shape_150,p:{x:741.075,y:182}}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_155}]},1).to({state:[]},1).to({state:[{t:this.shape_154}]},26).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_151,p:{x:869.6}}]},1).to({state:[{t:this.shape_149,p:{x:869.5,y:158.1}}]},1).wait(1));

	// s_4
	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(2.4,1,1).p("AgIhCQgPgegfgJQgegJgPAUQgrA0CKCXIBAg7QA+hCgOgkQgOgjgQgBQgMgBgTARQgWAUgHADQgQAFgKgWg");
	this.shape_169.setTransform(326.5286,114.1829);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FF7F69").s().p("AhjheQAPgUAeAJQAfAJAPAeQAKAWAQgFQAHgDAWgUQATgRAMABQAQABAOAjQAOAkg+BCIhAA7QiKiXArg0g");
	this.shape_170.setTransform(326.5286,114.1829);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").ss(2.4,1,1).p("AhhhcQAPgTAeAJQAeAJAOAcQAKAWAQgFQAHgDAVgTQASgRAMABQAQABANAiQANAjg8BAIg+A6QiGiTApgzg");
	this.shape_171.setTransform(326.5187,111.8186);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FF7F69").s().p("AhhhcQAPgTAeAJQAeAJAOAcQAKAWAQgFQAHgDAVgTQASgRAMABQAQABANAiQANAjg8BAIg+A6QiGiTApgzg");
	this.shape_172.setTransform(326.5187,111.8186);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#000000").ss(2.4,1,1).p("AhehZQAOgTAdAJQAeAIAOAcQAJAWAPgGQAHgCAVgTQASgQALABQAPABANAhQANAig6A+Ig8A4QiDiOAogyg");
	this.shape_173.setTransform(326.5234,109.4162);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FF7F69").s().p("AhehZQAOgTAdAJQAeAIAOAcQAJAWAPgGQAHgCAVgTQASgQALABQAPABANAhQANAig6A+Ig8A4QiDiOAogyg");
	this.shape_174.setTransform(326.5234,109.4162);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#000000").ss(2.4,1,1).p("AhbhXQAOgSAcAIQAcAJAOAbQAJAVAPgGQAGgCAUgSQASgQAKABQAQABAMAgQANAhg5A8Ig6A3Qh/iLAngwg");
	this.shape_175.setTransform(326.5293,107.0519);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FF7F69").s().p("AhbhXQAOgSAcAIQAcAJAOAbQAJAVAPgGQAGgCAUgSQASgQAKABQAQABAMAgQANAhg5A8Ig6A3Qh/iLAngwg");
	this.shape_176.setTransform(326.5293,107.0519);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#000000").ss(2.4,1,1).p("AhYhUQANgRAbAIQAcAIANAaQAJAUAOgFQAHgDATgRQARgQAKABQAPACAMAeQANAhg4A6Ig4A1Qh7iGAmgvg");
	this.shape_177.setTransform(326.5414,104.697);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FF7F69").s().p("AhYhUQANgRAbAIQAcAIANAaQAJAUAOgFQAHgDATgRQARgQAKABQAPACAMAeQANAhg4A6Ig4A1Qh7iGAmgvg");
	this.shape_178.setTransform(326.5414,104.697);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#000000").ss(2.4,1,1).p("AhWhRQANgRAbAIQAaAHANAaQAJATAOgEQAGgDATgRQAQgPAKABQAPABALAeQAMAgg1A4Ig3AzQh4iCAlgtg");
	this.shape_179.setTransform(326.5225,102.297);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FF7F69").s().p("AhWhRQANgRAbAIQAaAHANAaQAJATAOgEQAGgDATgRQAQgPAKABQAPABALAeQAMAgg1A4Ig3AzQh4iCAlgtg");
	this.shape_180.setTransform(326.5225,102.297);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#000000").ss(2.4,1,1).p("AhThPQAMgQAaAHQAaAIANAZQAIASANgEQAGgDATgQQAQgPAJABQAOABALAdQAMAfg0A3Ig1AxQh0h+Akgsg");
	this.shape_181.setTransform(326.5216,99.9328);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FF7F69").s().p("AhThPQAMgQAaAHQAaAIANAZQAIASANgEQAGgDATgQQAQgPAJABQAOABALAdQAMAfg0A3Ig1AxQh0h+Akgsg");
	this.shape_182.setTransform(326.5216,99.9328);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").ss(2.4,1,1).p("AhQhNQAMgPAZAHQAZAHAMAYQAIASANgEQAGgDARgPQAQgPAJABQAOACALAbQALAegzA1IgzAwQhwh6Ajgrg");
	this.shape_183.setTransform(326.5421,97.5661);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FF7F69").s().p("AhQhNQAMgPAZAHQAZAHAMAYQAIASANgEQAGgDARgPQAQgPAJABQAOACALAbQALAegzA1IgzAwQhwh6Ajgrg");
	this.shape_184.setTransform(326.5421,97.5661);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").ss(2.4,1,1).p("AhOhKQAMgPAYAHQAYAHAMAXQAIASAMgFQAGgCARgPQAPgOAJABQANABALAbQALAdgxAzIgyAuQhsh2Ahgpg");
	this.shape_185.setTransform(326.5307,95.1661);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FF7F69").s().p("AhOhKQAMgPAYAHQAYAHAMAXQAIASAMgFQAGgCARgPQAPgOAJABQANABALAbQALAdgxAzIgyAuQhsh2Ahgpg");
	this.shape_186.setTransform(326.5307,95.1661);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(2.4,1,1).p("AhLhHQALgPAYAHQAXAGALAXQAIARAMgEQAFgDARgOQAOgOAJABQANABAKAaQAKAcgvAyIgvAsQhphyAggng");
	this.shape_187.setTransform(326.5368,92.8136);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FF7F69").s().p("AhLhHQALgPAYAHQAXAGALAXQAIARAMgEQAFgDARgOQAOgOAJABQANABAKAaQAKAcgvAyIgvAsQhphyAggng");
	this.shape_188.setTransform(326.5368,92.8136);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(2.4,1,1).p("AhIhFQALgOAWAHQAXAGAKAWQAIAQALgEQAGgCAPgOQAOgNAJABQAMABAKAZQAKAbgtAvIguAsQhlhuAfgng");
	this.shape_189.setTransform(326.5269,90.447);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FF7F69").s().p("AhIhFQALgOAWAHQAXAGAKAWQAIAQALgEQAGgCAPgOQAOgNAJABQAMABAKAZQAKAbgtAvIguAsQhlhuAfgng");
	this.shape_190.setTransform(326.5269,90.447);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(2.4,1,1).p("AhGhCQALgOAVAHQAWAGALAVQAHAQALgEQAFgCAPgOQAOgMAIAAQALABAKAZQAKAZgsAuIgsAqQhihqAeglg");
	this.shape_191.setTransform(326.5155,88.047);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FF7F69").s().p("AhGhCQALgOAVAHQAWAGALAVQAHAQALgEQAFgCAPgOQAOgMAIAAQALABAKAZQAKAZgsAuIgsAqQhihqAeglg");
	this.shape_192.setTransform(326.5155,88.047);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(2.4,1,1).p("AhDhAQAKgNAVAGQAVAGAKAUQAHAQAKgEQAFgCAPgNQANgMAIAAQALACAJAXQAJAZgqAsIgqAoQhehmAdgkg");
	this.shape_193.setTransform(326.5361,85.6803);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FF7F69").s().p("AhDhAQAKgNAVAGQAVAGAKAUQAHAQAKgEQAFgCAPgNQANgMAIAAQALACAJAXQAJAZgqAsIgqAoQhehmAdgkg");
	this.shape_194.setTransform(326.5361,85.6803);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#000000").ss(2.4,1,1).p("AhAg9QAJgNAUAGQAVAGAJATQAHAPAKgEQAFgCAOgNQAMgLAIABQAKABAJAWQAJAYgoAqIgpAnQhahiAcgig");
	this.shape_195.setTransform(326.535,83.316);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FF7F69").s().p("AhAg9QAJgNAUAGQAVAGAJATQAHAPAKgEQAFgCAOgNQAMgLAIABQAKABAJAWQAJAYgoAqIgpAnQhahiAcgig");
	this.shape_196.setTransform(326.535,83.316);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#000000").ss(2.4,1,1).p("Ag+g6QAKgNATAGQATAFAJATQAGAOAKgEQAFgBANgNQAMgKAIAAQAKABAIAWQAJAWgnApIgnAlQhWheAaggg");
	this.shape_197.setTransform(326.5161,80.916);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FF7F69").s().p("Ag+g6QAKgNATAGQATAFAJATQAGAOAKgEQAFgBANgNQAMgKAIAAQAKABAIAWQAJAWgnApIgnAlQhWheAaggg");
	this.shape_198.setTransform(326.5161,80.916);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#000000").ss(2.4,1,1).p("Ag7g4QAJgMASAGQATAFAJASQAFANAKgDQAEgCANgMQAMgKAHAAQAJABAIAVQAJAWglAnIgmAjQhShaAZgfg");
	this.shape_199.setTransform(326.5284,78.561);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FF7F69").s().p("Ag7g4QAJgMASAGQATAFAJASQAFANAKgDQAEgCANgMQAMgKAHAAQAJABAIAVQAJAWglAnIgmAjQhShaAZgfg");
	this.shape_200.setTransform(326.5284,78.561);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(2.4,1,1).p("Ag4g1QAIgLASAFQARAFAJARQAFAMAJgDQAFgCAMgLQALgKAGABQAKABAIATQAHAVgjAlIgkAiQhOhWAYgdg");
	this.shape_201.setTransform(326.5344,76.1969);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FF7F69").s().p("Ag4g1QAIgLASAFQARAFAJARQAFAMAJgDQAFgCAMgLQALgKAGABQAKABAIATQAHAVgjAlIgkAiQhOhWAYgdg");
	this.shape_202.setTransform(326.5344,76.1969);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#000000").ss(2.4,1,1).p("Ag1gzQAHgKARAFQARAEAIARQAFAMAJgDQAEgCAMgKQAKgKAGABQAJABAIASQAHAUgiAjIghAgQhMhRAYgdg");
	this.shape_203.setTransform(326.5389,73.7944);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FF7F69").s().p("Ag1gzQAHgKARAFQARAEAIARQAFAMAJgDQAEgCAMgKQAKgKAGABQAJABAIASQAHAUgiAjIghAgQhMhRAYgdg");
	this.shape_204.setTransform(326.5389,73.7944);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#000000").ss(2.4,1,1).p("AgvgtQAHgJAPAEQAPAFAHAOQAEAKAIgCQADgCALgJQAJgJAFABQAIABAGAQQAHASgdAeIgfAdQhBhIAUgZg");
	this.shape_205.setTransform(326.5152,223.2527);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FF7F69").s().p("AgvgtQAHgJAPAEQAPAFAHAOQAEAKAIgCQADgCALgJQAJgJAFABQAIABAGAQQAHASgdAeIgfAdQhBhIAUgZg");
	this.shape_206.setTransform(326.5152,223.2527);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#000000").ss(2.4,1,1).p("Ag2g0QAIgKARAFQARAFAIAQQAFAMAJgDQAEgCAMgKQAKgKAGABQAKABAHASQAIAVgiAjIgjAhQhMhTAYgdg");
	this.shape_207.setTransform(326.5153,220.0694);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FF7F69").s().p("Ag2g0QAIgKARAFQARAFAIAQQAFAMAJgDIAQgMQAKgKAGABQAKABAHASQAIAVgiAjIgjAhQhMhTAYgdg");
	this.shape_208.setTransform(326.5153,220.0694);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#000000").ss(2.4,1,1).p("Ag9g7QAJgMATAGQATAGAJASQAGAOAKgEQAFgBANgMQAMgMAHABQALABAIAWQAIAWgmAoIgnAmQhWheAbghg");
	this.shape_209.setTransform(326.5142,216.9);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FF7F69").s().p("Ag9g6QAJgMATAFQATAGAJASQAGAOAKgEQAFgBANgMQAMgMAHABQALABAIAWQAIAWgmApIgnAkQhWhdAbggg");
	this.shape_210.setTransform(326.5142,216.9);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#000000").ss(2.4,1,1).p("AhEhBQAKgNAVAGQAWAGAKAVQAHAPALgDQAFgDAPgNQANgMAIAAQALABAKAYQAJAagrAtIgrAoQhghnAeglg");
	this.shape_211.setTransform(326.5379,213.6944);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FF7F69").s().p("AhEhBQAKgNAVAGQAWAGAKAVQAHAPALgDQAFgDAPgNQANgMAIAAQALABAKAYQAJAagrAtIgrAoQhghnAeglg");
	this.shape_212.setTransform(326.5379,213.6944);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#000000").ss(2.4,1,1).p("AhLhIQALgPAXAHQAYAHALAXQAIARAMgEQAFgDARgOQAPgOAIABQANABAKAaQALAcgvAyIgxAtQhphzAhgog");
	this.shape_213.setTransform(326.5368,210.5136);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FF7F69").s().p("AhLhIQALgPAXAHQAYAHALAXQAIARAMgEQAFgDARgOQAPgOAIABQANABAKAaQALAcgvAyIgxAtQhphzAhgog");
	this.shape_214.setTransform(326.5368,210.5136);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#000000").ss(2.4,1,1).p("AhThPQANgQAaAIQAZAHANAZQAIATANgFQAGgDATgPQAPgPAKABQAOABALAcQAMAfg0A3Ig1AxQhzh+Ajgsg");
	this.shape_215.setTransform(326.5363,207.3303);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FF7F69").s().p("AhThPQANgQAaAIQAZAHANAZQAIATANgFQAGgDATgPQAPgPAKABQAOABALAcQAMAfg0A3Ig1AxQhzh+Ajgsg");
	this.shape_216.setTransform(326.5363,207.3303);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().s("#000000").ss(2.4,1,1).p("AhahVQAOgSAcAIQAcAJANAaQAJAVAPgFQAGgDAUgRQARgRAKABQAQACAMAfQAMAhg4A7Ig5A2Qh9iJAmgvg");
	this.shape_217.setTransform(326.5358,204.1495);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FF7F69").s().p("AhahVQAOgSAcAIQAcAJANAaQAJAVAPgFQAGgDAUgRQARgRAKABQAQACAMAfQAMAhg4A7Ig5A2Qh9iJAmgvg");
	this.shape_218.setTransform(326.5358,204.1495);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().s("#000000").ss(2.4,1,1).p("AhhhcQAOgTAeAJQAeAIAPAdQAKAWAPgFQAHgDAWgTQASgRAMABQAQABANAiQAOAjg9BBIg+A5QiHiTAqgzg");
	this.shape_219.setTransform(326.5589,200.9804);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FF7F69").s().p("AhhhcQAOgTAeAJQAeAIAPAdQAKAWAPgFQAHgDAWgTQASgRAMABQAQABANAiQAOAjg9BBIg+A5QiHiTAqgzg");
	this.shape_220.setTransform(326.5589,200.9804);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().s("#000000").ss(2.4,1,1).p("AhohjQAPgUAgAJQAhAKAPAfQALAXARgGQAHgDAXgUQAUgTAMABQASACAOAkQAOAmhBBFIhCA+QiRieAtg3g");
	this.shape_221.setTransform(326.5584,197.7996);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FF7F69").s().p("AhohjQAPgUAgAJQAhAKAPAfQALAXARgGQAHgDAXgUQAUgTAMABQASACAOAkQAOAmhBBFIhCA+QiRieAtg3g");
	this.shape_222.setTransform(326.5584,197.7996);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().s("#000000").ss(2.4,1,1).p("AhwhqQARgWAjAKQAiAKARAhQALAZASgGQAIgDAZgWQAVgTANABQASABAQAnQAPAphFBKIhIBCQiaipAvg7g");
	this.shape_223.setTransform(326.5578,194.6163);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FF7F69").s().p("AhwhqQARgWAjAKQAiAKARAhQALAZASgGQAIgDAZgWQAVgTANABQASABAQAnQAPAphFBKIhIBCQiaipAvg7g");
	this.shape_224.setTransform(326.5578,194.6163);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().s("#000000").ss(2.4,1,1).p("Ah3hxQASgXAlALQAkALASAjQAMAaATgGQAJgEAagXQAXgVANACQAUABAQApQARAshKBOIhMBHQiki0Ayg/g");
	this.shape_225.setTransform(326.5568,191.4354);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FF7F69").s().p("Ah3hxQASgXAlALQAkALASAjQAMAaATgGQAJgEAagXQAXgVANACQAUABAQApQARAshKBOIhMBHQiki0Ayg/g");
	this.shape_226.setTransform(326.5568,191.4354);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().s("#000000").ss(2.4,1,1).p("Ah+h3QATgZAnALQAnAMATAlQANAcAUgGQAJgEAcgZQAXgWAPABQAVACARAsQASAuhPBTIhQBKQiui+A1hCg");
	this.shape_227.setTransform(326.5804,188.2296);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FF7F69").s().p("Ah+h3QATgZAnALQAnAMATAlQANAcAUgGQAJgEAcgZQAXgWAPABQAVACARAsQASAuhPBTIhQBKQiui+A1hCg");
	this.shape_228.setTransform(326.5804,188.2296);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().s("#000000").ss(2.4,1,1).p("AiFh+QAUgaApAMQApAMAUAnQAOAeAVgHQAKgEAdgaQAZgYAQACQAWABASAvQASAwhSBYIhWBPQi3jJA4hGg");
	this.shape_229.setTransform(326.5794,185.0605);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FF7F69").s().p("AiFh+QAUgaApAMQApAMAUAnQAOAeAVgHQAKgEAdgaQAZgYAQACQAWABASAvQASAwhSBYIhWBPQi3jJA4hGg");
	this.shape_230.setTransform(326.5794,185.0605);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().s("#000000").ss(2.4,1,1).p("AiMiFQAVgbArAMQArANAVApQAPAgAWgIQAKgEAfgbQAbgZAQABQAXACAUAxQATAzhXBdIhaBTQjCjUA8hKg");
	this.shape_231.setTransform(326.5794,181.8772);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FF7F69").s().p("AiMiFQAVgbArAMQArANAVApQAPAgAWgIQAKgEAfgbQAbgZAQABQAXACAUAxQATAzhXBdIhaBTQjCjUA8hKg");
	this.shape_232.setTransform(326.5794,181.8772);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().s("#000000").ss(2.4,1,1).p("AiNiGQAVgbAsAMQArANAVAqQAPAfAXgHQAKgFAfgbQAbgZAQACQAXACAUAwQATA0hXBeIhbBTQjDjWA8hKg");
	this.shape_233.setTransform(326.5732,170.3772);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FF7F69").s().p("AiNiGQAVgbAsAMQArANAVAqQAPAfAXgHQAKgFAfgbQAbgZAQACQAXACAUAwQATA0hXBeIhbBTQjDjWA8hKg");
	this.shape_234.setTransform(326.5732,170.3772);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f().s("#000000").ss(2.4,1,1).p("AiHiAQAUgbAqAMQApANAVAoQAOAeAWgHQAJgEAegbQAagYAPACQAXACASAvQATAxhUBaIhXBQQi7jNA6hHg");
	this.shape_235.setTransform(326.5741,162.638);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FF7F69").s().p("AiHiAQAUgbAqAMQApANAVAoQAOAeAWgHQAJgEAegbQAagYAPACQAXACASAvQATAxhUBaIhXBQQi7jNA6hHg");
	this.shape_236.setTransform(326.5741,162.638);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f().s("#000000").ss(2.4,1,1).p("AiCh8QATgZAoAMQApAMATAmQAOAdAVgHQAJgEAcgZQAZgXAPABQAWACASAtQASAwhRBWIhUBNQizjFA3hFg");
	this.shape_237.setTransform(326.5686,155.4688);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FF7F69").s().p("AiCh8QATgZAoAMQApAMATAmQAOAdAVgHQAJgEAcgZQAZgXAPABQAWACASAtQASAwhRBWIhUBNQizjFA3hFg");
	this.shape_238.setTransform(326.5686,155.4688);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f().s("#000000").ss(2.4,1,1).p("Ah9h3QASgYAnALQAnALATAlQANAdAUgHQAIgEAcgYQAYgXAOACQAVACARArQASAuhOBTIhQBKQiui+A2hCg");
	this.shape_239.setTransform(326.5549,148.8796);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FF7F69").s().p("Ah9h3QASgYAnALQAnALATAlQANAdAUgHQAIgEAcgYQAYgXAOACQAVACARArQASAuhOBTIhQBKQiui+A2hCg");
	this.shape_240.setTransform(326.5549,148.8796);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5hzQASgXAlAKQAmALASAkQAMAbAUgGQAIgEAbgXQAXgWAOACQAUABAQAqQARAshLBQIhNBIQini3AzhAg");
	this.shape_241.setTransform(326.5501,142.8629);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FF7F69").s().p("Ah5hzQATgXAkAKQAmALASAkQAMAbAUgGQAIgEAbgXQAXgWAOACQAUABAQAqQARAshLBQIhNBIQini3AzhAg");
	this.shape_242.setTransform(326.5501,142.8629);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f().s("#000000").ss(2.4,1,1).p("Ah0hvQARgXAkALQAkAKASAjQAMAaASgGQAJgEAagWQAWgVANABQAUACAPAoQARArhJBNIhKBFQiiiwAyg+g");
	this.shape_243.setTransform(326.5383,137.4104);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FF7F69").s().p("Ah0hvQARgXAkALQAkAKASAjQAMAaASgGQAJgEAagWQAWgVANABQAUACAPAoQARArhJBNIhKBFQiiiwAyg+g");
	this.shape_244.setTransform(326.5383,137.4104);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f().s("#000000").ss(2.4,1,1).p("AhxhrQARgWAiAKQAkAKARAiQALAZASgGQAIgEAZgWQAWgUANACQATABAPAnQAQAqhHBLIhIBDQicisAwg7g");
	this.shape_245.setTransform(326.5514,132.5438);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FF7F69").s().p("AhxhrQARgWAiAKQAkAKARAiQALAZASgGQAIgEAZgWQAWgUANACQATABAPAnQAQAqhHBLIhIBDQicisAwg7g");
	this.shape_246.setTransform(326.5514,132.5438);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f().s("#000000").ss(2.4,1,1).p("AhuhoQARgWAiAKQAiAKAQAhQAMAZARgHQAIgDAYgVQAVgUANABQASACAPAmQAPAohEBJIhGBBQiYimAug6g");
	this.shape_247.setTransform(326.5409,128.2413);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FF7F69").s().p("AhuhoQARgWAiAKQAiAKAQAhQAMAZARgHQAIgDAYgVQAVgUANABQASACAPAmQAPAohEBJIhGBBQiYimAug6g");
	this.shape_248.setTransform(326.5409,128.2413);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f().s("#000000").ss(2.4,1,1).p("AhrhmQAQgVAhAKQAhAKARAfQAKAZASgGQAHgEAYgVQAUgSANABQASABAOAlQAPAohDBGIhEBAQiViiAug5g");
	this.shape_249.setTransform(326.5432,124.502);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FF7F69").s().p("AhrhmQAQgVAhAKQAhAKARAfQAKAZASgGQAHgEAYgVQAUgSANABQASABAOAlQAPAohDBGIhEBAQiViiAug5g");
	this.shape_250.setTransform(326.5432,124.502);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f().s("#000000").ss(2.4,1,1).p("AhphjQAQgVAgAKQAhAJAQAfQAKAYARgGQAIgDAXgUQAUgTAMABQARACAPAkQAOAnhBBFIhDA+QiRifAsg3g");
	this.shape_251.setTransform(326.5353,121.3496);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FF7F69").s().p("AhphjQAQgVAgAKQAhAJAQAfQAKAYARgGQAIgDAXgUQAUgTAMABQARACAPAkQAOAnhBBFIhDA+QiRifAsg3g");
	this.shape_252.setTransform(326.5353,121.3496);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f().s("#000000").ss(2.4,1,1).p("AhnhiQAQgUAfAKQAgAJAQAeQAKAYARgGQAHgDAXgUQAUgSALABQARABAOAkQAPAmhABDIhCA9QiPibAsg3g");
	this.shape_253.setTransform(326.5163,118.772);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FF7F69").s().p("AhnhiQAQgUAfAKQAgAJAQAeQAKAYARgGQAHgDAXgUQAUgSALABQARABAOAkQAPAmhABDIhCA9QiPibAsg3g");
	this.shape_254.setTransform(326.5163,118.772);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f().s("#000000").ss(2.4,1,1).p("AhlhgQAPgUAfAJQAgAJAPAeQAKAXARgFQAHgDAWgUQAUgSALABQARABAOAkQAOAlg/BDIhBA8QiMiaArg1g");
	this.shape_255.setTransform(326.531,116.772);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FF7F69").s().p("AhlhgQAPgUAfAJQAgAJAPAeQAKAXARgFQAHgDAWgUQAUgSALABQARABAOAkQAOAlg/BDIhBA8QiMiaArg1g");
	this.shape_256.setTransform(326.531,116.772);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f().s("#000000").ss(2.4,1,1).p("AhkhfQAPgUAfAJQAfAJAPAeQAKAXAQgGQAHgDAXgTQATgSALABQARABAOAjQAOAlg/BCIhAA8QiLiYArg1g");
	this.shape_257.setTransform(326.5305,115.3329);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FF7F69").s().p("AhkhfQAPgUAfAJQAfAJAPAeQAKAXAQgGQAHgDAXgTQATgSALABQARABAOAjQAOAlg/BCIhAA8QiLiYArg1g");
	this.shape_258.setTransform(326.5305,115.3329);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f().s("#000000").ss(2.4,1,1).p("AhjhfQAPgTAeAJQAfAJAPAdQAKAXAQgFQAHgDAWgUQATgSAMABQAQACAOAjQAOAkg+BCIhAA7QiKiXArg1g");
	this.shape_259.setTransform(326.5272,114.4579);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FF7F69").s().p("AhjhfQAPgTAeAJQAfAJAPAdQAKAXAQgFQAHgDAWgUQATgSAMABQAQACAOAjQAOAkg+BCIhAA7QiKiXArg1g");
	this.shape_260.setTransform(326.5272,114.4579);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_170,p:{scaleX:1,scaleY:1,x:326.5286,y:114.1829}},{t:this.shape_169,p:{scaleX:1,scaleY:1,x:326.5286,y:114.1829}}]}).to({state:[{t:this.shape_172},{t:this.shape_171}]},1).to({state:[{t:this.shape_174},{t:this.shape_173}]},1).to({state:[{t:this.shape_176},{t:this.shape_175}]},1).to({state:[{t:this.shape_178},{t:this.shape_177}]},1).to({state:[{t:this.shape_180},{t:this.shape_179}]},1).to({state:[{t:this.shape_182},{t:this.shape_181}]},1).to({state:[{t:this.shape_184},{t:this.shape_183}]},1).to({state:[{t:this.shape_186},{t:this.shape_185}]},1).to({state:[{t:this.shape_188},{t:this.shape_187}]},1).to({state:[{t:this.shape_190},{t:this.shape_189}]},1).to({state:[{t:this.shape_192},{t:this.shape_191}]},1).to({state:[{t:this.shape_194},{t:this.shape_193}]},1).to({state:[{t:this.shape_196},{t:this.shape_195}]},1).to({state:[{t:this.shape_198},{t:this.shape_197}]},1).to({state:[{t:this.shape_200},{t:this.shape_199}]},1).to({state:[{t:this.shape_202},{t:this.shape_201}]},1).to({state:[{t:this.shape_204},{t:this.shape_203}]},1).to({state:[{t:this.shape_170,p:{scaleX:0.5165,scaleY:0.5165,x:326.5265,y:71.4124}},{t:this.shape_169,p:{scaleX:0.5165,scaleY:0.5165,x:326.5265,y:71.4124}}]},1).to({state:[]},1).to({state:[{t:this.shape_170,p:{scaleX:0.4066,scaleY:0.4066,x:326.5128,y:226.4445}},{t:this.shape_169,p:{scaleX:0.4066,scaleY:0.4066,x:326.5128,y:226.4445}}]},25).to({state:[{t:this.shape_206},{t:this.shape_205}]},1).to({state:[{t:this.shape_208},{t:this.shape_207}]},1).to({state:[{t:this.shape_210},{t:this.shape_209}]},1).to({state:[{t:this.shape_212},{t:this.shape_211}]},1).to({state:[{t:this.shape_214},{t:this.shape_213}]},1).to({state:[{t:this.shape_216},{t:this.shape_215}]},1).to({state:[{t:this.shape_218},{t:this.shape_217}]},1).to({state:[{t:this.shape_220},{t:this.shape_219}]},1).to({state:[{t:this.shape_222},{t:this.shape_221}]},1).to({state:[{t:this.shape_224},{t:this.shape_223}]},1).to({state:[{t:this.shape_226},{t:this.shape_225}]},1).to({state:[{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229}]},1).to({state:[{t:this.shape_232},{t:this.shape_231}]},1).to({state:[{t:this.shape_170,p:{scaleX:1.4769,scaleY:1.4769,x:326.5708,y:178.6919}},{t:this.shape_169,p:{scaleX:1.4769,scaleY:1.4769,x:326.5708,y:178.6919}}]},1).to({state:[{t:this.shape_234},{t:this.shape_233}]},1).to({state:[{t:this.shape_236},{t:this.shape_235}]},1).to({state:[{t:this.shape_238},{t:this.shape_237}]},1).to({state:[{t:this.shape_240},{t:this.shape_239}]},1).to({state:[{t:this.shape_242},{t:this.shape_241}]},1).to({state:[{t:this.shape_244},{t:this.shape_243}]},1).to({state:[{t:this.shape_246},{t:this.shape_245}]},1).to({state:[{t:this.shape_248},{t:this.shape_247}]},1).to({state:[{t:this.shape_250},{t:this.shape_249}]},1).to({state:[{t:this.shape_252},{t:this.shape_251}]},1).to({state:[{t:this.shape_254},{t:this.shape_253}]},1).to({state:[{t:this.shape_256},{t:this.shape_255}]},1).to({state:[{t:this.shape_258},{t:this.shape_257}]},1).to({state:[{t:this.shape_260},{t:this.shape_259}]},1).to({state:[{t:this.shape_170,p:{scaleX:1,scaleY:1,x:326.5286,y:114.1829}},{t:this.shape_169,p:{scaleX:1,scaleY:1,x:326.5286,y:114.1829}}]},1).wait(1));

	// s_dop
	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f().s("#000000").ss(2.4,1,1).p("AgIhCQgPgegfgJQgegJgPAUQgrA0CKCXIBAg7QA+hCgOgkQgOgjgQgBQgMgBgTARQgWAUgHADQgQAFgKgWg");
	this.shape_261.setTransform(301.5765,224.9124,0.5165,0.5165);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FF7F69").s().p("AhjheQAPgUAeAJQAfAJAPAeQAKAWAQgFQAHgDAWgUQATgRAMABQAQABAOAjQAOAkg+BCIhAA7QiKiXArg0g");
	this.shape_262.setTransform(301.5765,224.9124,0.5165,0.5165);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f().s("#000000").ss(2.4,1,1).p("Ag5g2QAIgMASAGQASAFAJARQAFANAKgDQAEgCAMgLQAMgKAGAAQAKABAIAUQAIAVgkAmIglAiQhQhXAZgeg");
	this.shape_263.setTransform(301.5855,220.386);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FF7F69").s().p("Ag5g2QAIgMASAGQASAFAJARQAFANAKgDQAEgCAMgLQAMgKAGAAQAKABAIAUQAIAVgkAmIglAiQhQhXAZgeg");
	this.shape_264.setTransform(301.5855,220.386);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f().s("#000000").ss(2.4,1,1).p("AhAg9QAKgMAUAFQAUAGAJATQAHAPAKgEQAFgCANgMQANgMAHABQALABAJAWQAJAYgoAqIgpAmQhZhhAbgig");
	this.shape_265.setTransform(301.5845,215.866);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FF7F69").s().p("AhAg9QAKgMAUAFQAUAGAJATQAHAPAKgEQAFgCANgMQANgMAHABQALABAJAWQAJAYgoAqIgpAmQhZhhAbgig");
	this.shape_266.setTransform(301.5845,215.866);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f().s("#000000").ss(2.4,1,1).p("AhGhDQAKgOAWAHQAWAGALAVQAHAQALgEQAFgCAQgOQANgMAIAAQAMACAKAYQAKAagtAuIgsAqQhihqAegmg");
	this.shape_267.setTransform(301.5902,211.322);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FF7F69").s().p("AhGhDQAKgOAWAHQAWAGALAVQAHAQALgEQAFgCAQgOQANgMAIAAQAMACAKAYQAKAagtAuIgsAqQhihqAegmg");
	this.shape_268.setTransform(301.5902,211.322);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f().s("#000000").ss(2.4,1,1).p("AhNhJQAMgPAYAHQAYAHALAXQAIARAMgEQAGgDARgPQAPgNAIAAQANACALAaQALAdgxAyIgwAuQhsh0Ahgpg");
	this.shape_269.setTransform(301.5891,206.8136);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FF7F69").s().p("AhNhJQAMgPAYAHQAYAHALAXQAIARAMgEQAGgDARgPQAPgNAIAAQANACALAaQALAdgxAyIgwAuQhsh0Ahgpg");
	this.shape_270.setTransform(301.5891,206.8136);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f().s("#000000").ss(2.4,1,1).p("AhThPQAMgQAaAHQAaAIAMAZQAJASANgEQAGgDASgQQARgPAJABQAOABALAdQAMAfg0A3Ig1AxQh0h+Akgsg");
	this.shape_271.setTransform(301.6103,202.2803);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FF7F69").s().p("AhThPQAMgQAaAHQAaAIAMAZQAJASANgEQAGgDASgQQARgPAJABQAOABALAdQAMAfg0A3Ig1AxQh0h+Akgsg");
	this.shape_272.setTransform(301.6103,202.2803);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f().s("#000000").ss(2.4,1,1).p("AhahVQAOgSAbAIQAcAIAOAbQAJAVAOgGQAHgCATgSQASgQAKABQAPACAMAfQANAhg4A7Ig6A1Qh8iIAmgvg");
	this.shape_273.setTransform(301.6094,197.7245);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FF7F69").s().p("AhahVQAOgSAbAIQAcAIAOAbQAJAVAOgGQAHgCATgSQASgQAKABQAPACAMAfQANAhg4A7Ig6A1Qh8iIAmgvg");
	this.shape_274.setTransform(301.6094,197.7245);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f().s("#000000").ss(2.4,1,1).p("AhghcQAOgSAeAIQAeAJAOAdQAKAVAPgFQAHgDAVgTQATgRALABQAQACANAhQAOAjg8BAIg+A5QiGiSAqgzg");
	this.shape_275.setTransform(301.6083,193.2162);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FF7F69").s().p("AhghcQAOgSAeAIQAeAJAOAdQAKAVAPgFQAHgDAVgTQATgRALABQAQACANAhQAOAjg8BAIg+A5QiGiSAqgzg");
	this.shape_276.setTransform(301.6083,193.2162);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f().s("#000000").ss(2.4,1,1).p("AhnhiQAQgUAfAKQAgAJAQAfQAKAXARgGQAHgDAXgUQAUgSALAAQARACAOAkQAPAmhBBDIhBA9QiPibAsg3g");
	this.shape_277.setTransform(301.614,188.672);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FF7F69").s().p("AhnhiQAQgUAfAKQAgAJAQAfQAKAXARgGQAHgDAXgUQAUgSALAAQARACAOAkQAPAmhBBDIhBA9QiPibAsg3g");
	this.shape_278.setTransform(301.614,188.672);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f().s("#000000").ss(2.4,1,1).p("AhthoQAQgVAiAJQAiAKAQAhQAMAYARgGQAIgDAYgVQAVgUAMABQATACAOAmQAQAohFBIIhFBBQiYilAvg6g");
	this.shape_279.setTransform(301.613,184.152);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FF7F69").s().p("AhthoQAQgVAiAJQAiAKAQAhQAMAYARgGQAIgDAYgVQAVgUAMABQATACAOAmQAQAohFBIIhFBBQiYilAvg6g");
	this.shape_280.setTransform(301.613,184.152);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f().s("#000000").ss(2.4,1,1).p("AhuhpQAQgVAiAKQAiAKARAgQAMAZARgGQAIgDAYgWQAWgTAMABQATACAOAmQAQAohFBJIhHBCQiZinAwg7g");
	this.shape_281.setTransform(301.6129,171.1413);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FF7F69").s().p("AhuhpQAQgVAiAKQAiAKARAgQAMAZARgGQAIgDAYgWQAWgTAMABQATACAOAmQAQAohFBJIhHBCQiZinAwg7g");
	this.shape_282.setTransform(301.6129,171.1413);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f().s("#000000").ss(2.4,1,1).p("AhphkQAQgUAgAJQAhAKAQAfQAKAYARgGQAHgDAYgVQAUgSAMABQARABAPAlQAOAmhBBGIhDA+QiSifAtg4g");
	this.shape_283.setTransform(301.6249,162.6246);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FF7F69").s().p("AhphkQAQgUAgAJQAhAKAQAfQAKAYARgGQAHgDAYgVQAUgSAMABQARABAPAlQAOAmhBBGIhDA+QiSifAtg4g");
	this.shape_284.setTransform(301.6249,162.6246);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f().s("#000000").ss(2.4,1,1).p("AhkhfQAPgTAfAJQAfAJAPAdQAKAXAQgGQAHgDAWgTQATgSAMABQAQACAOAiQAOAlg+BCIhAA7QiKiXAqg1g");
	this.shape_285.setTransform(301.605,154.1579);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FF7F69").s().p("AhkhfQAPgTAfAJQAfAJAPAdQAKAXAQgGQAHgDAWgTQATgSAMABQAQACAOAiQAOAlg+BCIhAA7QiKiXAqg1g");
	this.shape_286.setTransform(301.605,154.1579);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().s("#000000").ss(2.4,1,1).p("AhehZQAOgTAdAJQAeAIAOAdQAKAVAPgGQAGgCAVgTQASgQALAAQAQACAMAhQAOAig7A+Ig8A4QiDiOAogyg");
	this.shape_287.setTransform(301.5975,145.6412);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FF7F69").s().p("AhehZQAOgTAdAJQAeAIAOAdQAKAVAPgGQAGgCAVgTQASgQALAAQAQACAMAhQAOAig7A+Ig8A4QiDiOAogyg");
	this.shape_288.setTransform(301.5975,145.6412);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().s("#000000").ss(2.4,1,1).p("AhZhUQANgRAcAIQAcAIANAaQAJAUAOgFQAGgCAUgSQARgPAKAAQAPACAMAfQANAgg4A7Ig4A0Qh8iGAmgvg");
	this.shape_289.setTransform(301.617,137.147);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FF7F69").s().p("AhZhUQANgRAcAIQAcAIANAaQAJAUAOgFQAGgCAUgSQARgPAKAAQAPACAMAfQANAgg4A7Ig4A0Qh8iGAmgvg");
	this.shape_290.setTransform(301.617,137.147);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().s("#000000").ss(2.4,1,1).p("AhOhKQAMgPAYAHQAYAHAMAXQAIASAMgFQAGgCARgPQAPgOAJABQANABALAbQALAdgxAzIgyAvQhsh3Ahgpg");
	this.shape_291.setTransform(301.5815,120.1911);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FF7F69").s().p("AhOhKQAMgPAYAHQAYAHAMAXQAIASAMgFQAGgCARgPQAPgOAJABQANABALAbQALAdgxAzIgyAvQhsh3Ahgpg");
	this.shape_292.setTransform(301.5815,120.1911);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().s("#000000").ss(2.4,1,1).p("AhJhFQALgOAXAHQAWAGALAWQAHAQAMgEQAFgCAQgOQAOgNAJABQAMABAKAZQAKAbguAwIguArQhlhuAfgng");
	this.shape_293.setTransform(301.6011,111.697);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FF7F69").s().p("AhJhFQALgOAXAHQAWAGALAWQAHAQAMgEQAFgCAQgOQAOgNAJABQAMABAKAZQAKAbguAwIguArQhlhuAfgng");
	this.shape_294.setTransform(301.6011,111.697);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().s("#000000").ss(2.4,1,1).p("AhDhAQAKgNAVAGQAVAGAKAUQAHAPAKgEQAFgCAPgNQANgMAIABQALABAJAXQAKAZgqAtIgrAoQhehmAdgkg");
	this.shape_295.setTransform(301.5958,103.2077);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FF7F69").s().p("AhDhAQAKgNAVAGQAVAGAKAUQAHAPAKgEQAFgCAPgNQANgMAIABQALABAJAXQAKAZgqAtIgrAoQhehmAdgkg");
	this.shape_296.setTransform(301.5958,103.2077);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().s("#000000").ss(2.4,1,1).p("Ag+g7QAKgMATAGQATAFAJATQAHAOAJgEQAFgCANgMQANgLAHABQAKABAIAVQAJAXgnApIgnAlQhWheAaghg");
	this.shape_297.setTransform(301.5736,94.7136);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FF7F69").s().p("Ag+g7QAKgMATAGQATAFAJATQAHAOAJgEQAFgCANgMQANgLAHABQAKABAIAVQAJAXgnApIgnAlQhWheAaghg");
	this.shape_298.setTransform(301.5736,94.7136);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().s("#000000").ss(2.4,1,1).p("Ag4g1QAIgLASAFQASAFAIARQAFANAJgEQAFgBAMgLQALgKAGAAQAKABAIAUQAHAVgjAlIgjAhQhPhVAYgeg");
	this.shape_299.setTransform(301.5858,86.1969);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FF7F69").s().p("Ag4g1QAIgLASAFQASAFAIARQAFANAJgEQAFgBAMgLQALgKAGAAQAKABAIAUQAHAVgjAlIgjAhQhPhVAYgeg");
	this.shape_300.setTransform(301.5858,86.1969);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().s("#000000").ss(2.4,1,1).p("AAVgmQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUg");
	this.shape_301.setTransform(164.159,260.3362,0.2672,0.2672);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FF7F69").s().p("AhqAIQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSg");
	this.shape_302.setTransform(164.159,260.3362,0.2672,0.2672);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().s("#000000").ss(2.4,1,1).p("Agsg6QAWgEAKAfQAFAQADADQAEAGAHgHQANgNAPgCQAOgDAFAKQAGALgMASQgNAXgjAcQgUgcgRgdQghg4AagEg");
	this.shape_303.setTransform(164.1661,256.2025);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FF7F69").s().p("AglACQghg4AagEQAWgEAKAfQAFAQADADQAEAGAHgHQANgNAPgCQAOgDAFAKQAGALgMASQgNAXgjAcQgUgcgRgdg");
	this.shape_304.setTransform(164.1661,256.2025);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().s("#000000").ss(2.4,1,1).p("Ag3hIQAbgFANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAGANQAHANgOAWQgQAdgrAjQgagigVgkQgphHAggFg");
	this.shape_305.setTransform(164.1653,252.0267);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FF7F69").s().p("AguAEQgphHAggFQAbgFANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAGANQAHANgOAWQgQAdgrAjQgagigVgkg");
	this.shape_306.setTransform(164.1653,252.0267);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().s("#000000").ss(2.4,1,1).p("AhBhWQAggGAPAvQAIAXADAEQAHAKALgLQASgTAWgDQAWgEAHAOQAIAQgQAbQgUAigzAqQgfgpgZgrQgwhUAmgGg");
	this.shape_307.setTransform(164.1709,247.8962);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FF7F69").s().p("Ag3AEQgwhUAmgGQAggGAPAvQAIAXADAEQAHAKALgLQASgTAWgDQAWgEAHAOQAIAQgQAbQgUAigzAqQgfgpgZgrg");
	this.shape_308.setTransform(164.1709,247.8962);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().s("#000000").ss(2.4,1,1).p("AhMhlQAlgGASA2QAJAbAEAFQAIALANgNQAVgWAagEQAZgEAJARQAJASgTAgQgXAng8AxQgkgwgdgxQg4hjAsgHg");
	this.shape_309.setTransform(164.1815,243.7654);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FF7F69").s().p("AhAAFQg4hjAsgHQAlgGASA2QAJAbAEAFQAIALANgNQAVgWAagEQAZgEAJARQAJASgTAgQgXAng8AxQgkgwgdgxg");
	this.shape_310.setTransform(164.1815,243.7654);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().s("#000000").ss(2.4,1,1).p("AhXhzQArgHAUA+QAKAfAFAFQAJAMAOgNQAZgaAdgEQAcgFALATQAKAVgWAkQgaAthEA4Qgpg3ghg4QhAhwAygJg");
	this.shape_311.setTransform(164.1858,239.5895);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FF7F69").s().p("AhJAGQhAhwAygJQArgHAUA+QAKAfAFAFQAJAMAOgNQAZgaAdgEQAcgFALATQAKAVgWAkQgaAthEA4Qgpg3ghg4g");
	this.shape_312.setTransform(164.1858,239.5895);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().s("#000000").ss(2.4,1,1).p("AhiiBQAwgIAXBFQAMAiAEAHQALANAQgPQAbgdAhgFQAggFAMAWQAMAXgZApQgdAyhNA/Qgug9glhAQhIh+A4gJg");
	this.shape_313.setTransform(164.185,235.4587);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FF7F69").s().p("AhSAGQhIh+A4gJQAwgIAXBFQAMAiAEAHQALANAQgPQAbgdAhgFQAggFAMAWQAMAXgZApQgdAyhNA/Qgug9glhAg");
	this.shape_314.setTransform(164.185,235.4587);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().s("#000000").ss(2.4,1,1).p("AhsiPQA1gJAZBNQANAmAFAHQALAPATgRQAeggAlgGQAjgFANAXQANAagbAuQghA3hVBGQgzhEgphGQhQiMA/gKg");
	this.shape_315.setTransform(164.1893,231.3279);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FF7F69").s().p("AhbAHQhQiMA/gKQA1gJAZBNQANAmAFAHQALAPATgRQAeggAlgGQAjgFANAXQANAagbAuQghA3hVBGQgzhEgphGg");
	this.shape_316.setTransform(164.1893,231.3279);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().s("#000000").ss(2.4,1,1).p("Ah4idQA7gKAcBVQAOApAGAIQAMAQAUgTQAhgiApgGQAngGANAZQAPAdgeAyQgkA9hdBNQg5hLgshNQhYiaBEgLg");
	this.shape_317.setTransform(164.2057,227.1974);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FF7F69").s().p("AhkAIQhYiaBEgLQA7gKAcBVQAOApAGAIQAMAQAUgTQAhgiApgGQAngGANAZQAPAdgeAyQgkA9hdBNQg5hLgshNg");
	this.shape_318.setTransform(164.2057,227.1974);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().s("#000000").ss(2.4,1,1).p("AiCisQBAgLAeBdQAPAtAHAJQANASAXgVQAkgmArgGQArgHAPAcQAQAfghA3QgnBChlBUQg/hSgvhUQhhinBLgNg");
	this.shape_319.setTransform(164.199,223.0168);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FF7F69").s().p("AhsAIQhhinBLgNQBAgLAeBdQAPAtAHAJQANASAXgVQAkgmArgGQArgHAPAcQAQAfghA3QgnBChlBUQg/hSgvhUg");
	this.shape_320.setTransform(164.199,223.0168);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().s("#000000").ss(2.4,1,1).p("AiNi6QBGgMAgBlQAQAwAIAKQAOATAYgWQAngpAwgHQAugHAQAeQARAhgjA8QgqBHhuBbQhEhYgzhbQhpi1BRgOg");
	this.shape_321.setTransform(164.1955,218.886);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FF7F69").s().p("Ah1AJQhpi1BRgOQBGgMAgBlQAQAwAIAKQAOATAYgWQAngpAwgHQAugHAQAeQARAhgjA8QgqBHhuBbQhEhYgzhbg");
	this.shape_322.setTransform(164.1955,218.886);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().s("#000000").ss(2.4,1,1).p("AiYjIQBLgNAjBsQARA0AIAKQAPAVAbgYQAqgsAzgIQAxgHARAgQATAkgmBAQgtBNh3BiQhIhfg4hiQhwjDBXgOg");
	this.shape_323.setTransform(164.2026,214.7552);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FF7F69").s().p("Ah/AJQhwjDBXgOQBLgNAjBsQARA0AIAKQAPAVAbgYQAqgsAzgIQAxgHARAgQATAkgmBAQgtBNh3BiQhIhfg4hig");
	this.shape_324.setTransform(164.2026,214.7552);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().s("#000000").ss(2.4,1,1).p("AijjWQBQgOAmB0QASA4AJALQAQAWAdgaQAsgvA3gIQA1gIATAjQAUAmgpBFQgxBSh+BpQhOhmg8hpQh4jRBdgPg");
	this.shape_325.setTransform(164.2103,210.5794);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FF7F69").s().p("AiIAKQh4jRBdgPQBQgOAmB0QASA4AJALQAQAWAdgaQAsgvA3gIQA1gIATAjQAUAmgpBFQgxBSh+BpQhOhmg8hpg");
	this.shape_326.setTransform(164.2103,210.5794);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().s("#000000").ss(2.4,1,1).p("AitjkQBVgPAoB7QAUA8AIAMQASAXAegbQAwgyA6gJQA5gJAUAmQAVApgrBJQg0BYiHBvQhThshAhwQiAjfBkgQg");
	this.shape_327.setTransform(164.2174,206.4485);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FF7F69").s().p("AiRALQiAjfBkgQQBVgPAoB7QAUA8AIAMQASAXAegbQAwgyA6gJQA5gJAUAmQAVApgrBJQg0BYiHBvQhThshAhwg");
	this.shape_328.setTransform(164.2174,206.4485);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f().s("#000000").ss(2.4,1,1).p("Ai4jzQBagPArCDQAVA/AJAMQATAZAggdQAzg1A+gJQA8gJAVAnQAWArguBOQg3BdiPB3QhYhzhEh3QiIjsBqgSg");
	this.shape_329.setTransform(164.2151,202.318);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FF7F69").s().p("AiaALQiIjsBqgSQBagPArCDQAVA/AJAMQATAZAggdQAzg1A+gJQA8gJAVAnQAWArguBOQg3BdiPB3QhYhzhEh3g");
	this.shape_330.setTransform(164.2151,202.318);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().s("#000000").ss(2.4,1,1).p("AjDkBQBggQAtCLQAWBDAKANQAUAaAigeQA2g5BBgKQA/gJAXApQAYAugxBTQg6BiiYB+Qhdh6hIh9QiQj7BwgTg");
	this.shape_331.setTransform(164.2222,198.1422);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FF7F69").s().p("AijANQiQj7BwgTQBggQAtCLQAWBDAKANQAUAaAigeQA2g5BBgKQA/gJAXApQAYAugxBTQg6BiiYB+Qhdh6hIh9g");
	this.shape_332.setTransform(164.2222,198.1422);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().s("#000000").ss(2.4,1,1).p("AjBj+QBfgQAsCJQAWBCAKANQAUAaAigeQA0g4BBgKQA/gJAWApQAYAugxBRQg5BhiWB8Qhch4hHh8QiOj3BugTg");
	this.shape_333.setTransform(164.2214,188.5661);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FF7F69").s().p("AihAMQiOj3BugTQBfgQAsCJQAWBCAKANQAUAaAigeQA0g4BBgKQA/gJAWApQAYAugxBRQg5BhiWB8Qhch4hHh8g");
	this.shape_334.setTransform(164.2214,188.5661);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f().s("#000000").ss(2.4,1,1).p("AizjsQBYgPApB/QAVA+AJAMQASAYAfgcQAyg0A8gJQA6gJAVAnQAWAqgtBMQg2BaiLB0QhWhwhCh0QiEjmBngRg");
	this.shape_335.setTransform(164.2088,183.1211);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FF7F69").s().p("AiWALQiEjmBngRQBYgPApB/QAVA+AJAMQASAYAfgcQAyg0A8gJQA6gJAVAnQAWAqgtBMQg2BaiLB0QhWhwhCh0g");
	this.shape_336.setTransform(164.2088,183.1211);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f().s("#000000").ss(2.4,1,1).p("AimjbQBRgNAnB1QATA5AIAMQARAWAdgaQAugwA3gIQA3gJATAkQAUAngqBGQgxBUiBBrQhQhog9hrQh6jVBfgQg");
	this.shape_337.setTransform(164.2115,177.6804);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FF7F69").s().p("AiLAKQh6jVBfgQQBRgNAnB1QATA5AIAMQARAWAdgaQAugwA3gIQA3gJATAkQAUAngqBGQgxBUiBBrQhQhog9hrg");
	this.shape_338.setTransform(164.2115,177.6804);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f().s("#000000").ss(2.4,1,1).p("AiYjJQBLgNAjBtQASA0AHAKQAQAVAagYQAqgsA0gIQAxgHASAgQATAkgmBBQguBNh3BjQhJhgg4hiQhxjFBYgOg");
	this.shape_339.setTransform(164.1903,172.2354);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FF7F69").s().p("Ah/AKQhxjFBYgOQBLgNAjBtQASA0AHAKQAQAVAagYQAqgsA0gIQAxgHASAgQATAkgmBBQguBNh3BjQhJhgg4hig");
	this.shape_340.setTransform(164.1903,172.2354);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f().s("#000000").ss(2.4,1,1).p("AiLi4QBEgLAhBjQAQAwAHAJQAOATAYgWQAngoAugHQAugHAQAeQARAhgjA7QgqBGhsBaQhDhXgzhaQhnizBQgOg");
	this.shape_341.setTransform(164.193,166.7902);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FF7F69").s().p("Ah0AJQhnizBQgOQBEgLAhBjQAQAwAHAJQAOATAYgWQAngoAugHQAugHAQAeQARAhgjA7QgqBGhsBaQhDhXgzhag");
	this.shape_342.setTransform(164.193,166.7902);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f().s("#000000").ss(2.4,1,1).p("Ah+imQA+gLAdBaQAPAsAGAIQANARAWgUQAjgkAqgHQApgGAPAbQAPAegfA1QgmBAhiBSQg9hPguhSQhdiiBIgMg");
	this.shape_343.setTransform(164.1926,161.3451);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FF7F69").s().p("AhpAIQhdiiBIgMQA+gLAdBaQAPAsAGAIQANARAWgUQAjgkAqgHQApgGAPAbQAPAegfA1QgmBAhiBSQg9hPguhSg");
	this.shape_344.setTransform(164.1926,161.3451);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f().s("#000000").ss(2.4,1,1).p("AhxiUQA4gKAaBQQANAnAGAIQALAQAUgSQAfghAmgGQAlgGANAZQAOAagdAwQghA5hZBJQg1hHgqhJQhUiRBBgKg");
	this.shape_345.setTransform(164.1878,155.8996);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FF7F69").s().p("AheAHQhUiRBBgKQA4gKAaBQQANAnAGAIQALAQAUgSQAfghAmgGQAlgGANAZQAOAagdAwQghA5hZBJQg1hHgqhJg");
	this.shape_346.setTransform(164.1878,155.8996);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f().s("#000000").ss(2.4,1,1).p("AhjiDQAxgJAXBHQALAjAFAGQAKAOARgQQAcgdAigFQAggFAMAWQAMAXgZAqQgeAzhOBAQgvg+glhBQhKiAA6gJg");
	this.shape_347.setTransform(164.1875,150.4546);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FF7F69").s().p("AhTAGQhKiAA6gJQAxgJAXBHQALAjAFAGQAKAOARgQQAcgdAigFQAggFAMAWQAMAXgZAqQgeAzhOBAQgvg+glhBg");
	this.shape_348.setTransform(164.1875,150.4546);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f().s("#000000").ss(2.4,1,1).p("AhWhyQAqgHAUA9QAKAeAFAGQAJAMAOgOQAYgZAdgEQAdgFAKATQAKAVgWAkQgZAshEA3Qgpg2ggg4QhAhvAygIg");
	this.shape_349.setTransform(164.1902,145.0092);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FF7F69").s().p("AhIAFQhAhvAygIQAqgHAUA9QAKAeAFAGQAJAMAOgOQAYgZAdgEQAdgFAKATQAKAVgWAkQgZAshEA3Qgpg2ggg4g");
	this.shape_350.setTransform(164.1902,145.0092);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f().s("#000000").ss(2.4,1,1).p("AhJhgQAkgHARA1QAJAZADAFQAIAKAMgMQAUgVAZgEQAYgDAIAPQAJASgSAeQgWAmg5AvQgjgugbgvQg2hfAqgGg");
	this.shape_351.setTransform(164.1689,139.5642);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FF7F69").s().p("Ag9AFQg2hfAqgGQAkgHARA1QAJAZADAFQAIAKAMgMQAUgVAZgEQAYgDAIAPQAJASgSAeQgWAmg5AvQgjgugbgvg");
	this.shape_352.setTransform(164.1689,139.5642);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f().s("#000000").ss(2.4,1,1).p("Ag8hPQAegFAOArQAHAVADAEQAGAIAKgJQAQgSAVgDQATgDAHANQAIAOgPAZQgSAfgvAmQgdglgWgnQgshNAigGg");
	this.shape_353.setTransform(164.1717,134.1237);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FF7F69").s().p("AgyAEQgshNAigGQAegFAOArQAHAVADAEQAGAIAKgJQAQgSAVgDQATgDAHANQAIAOgPAZQgSAfgvAmQgdglgWgng");
	this.shape_354.setTransform(164.1717,134.1237);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f().s("#000000").ss(2.4,1,1).p("Agug9QAXgEALAhQAFARACACQAFAHAHgHQAOgOAQgCQAPgDAFAKQAGALgMAUQgOAYglAeQgVgdgSgfQgjg8AcgEg");
	this.shape_355.setTransform(164.159,128.6787);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FF7F69").s().p("AgnADQgjg8AcgEQAXgEALAhQAFARACACQAFAHAHgHQAOgOAQgCQAPgDAFAKQAGALgMAUQgOAYglAeQgVgdgSgfg");
	this.shape_356.setTransform(164.159,128.6787);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_262,p:{scaleX:0.5165,scaleY:0.5165,x:301.5765,y:224.9124}},{t:this.shape_261,p:{scaleX:0.5165,scaleY:0.5165,x:301.5765,y:224.9124}}]},17).to({state:[{t:this.shape_264},{t:this.shape_263}]},1).to({state:[{t:this.shape_266},{t:this.shape_265}]},1).to({state:[{t:this.shape_268},{t:this.shape_267}]},1).to({state:[{t:this.shape_270},{t:this.shape_269}]},1).to({state:[{t:this.shape_272,p:{y:202.2803}},{t:this.shape_271,p:{y:202.2803}}]},1).to({state:[{t:this.shape_274},{t:this.shape_273}]},1).to({state:[{t:this.shape_276},{t:this.shape_275}]},1).to({state:[{t:this.shape_278},{t:this.shape_277}]},1).to({state:[{t:this.shape_280},{t:this.shape_279}]},1).to({state:[{t:this.shape_262,p:{scaleX:1.1632,scaleY:1.1632,x:301.6239,y:179.6079}},{t:this.shape_261,p:{scaleX:1.1632,scaleY:1.1632,x:301.6239,y:179.6079}}]},1).to({state:[{t:this.shape_282},{t:this.shape_281}]},1).to({state:[{t:this.shape_284},{t:this.shape_283}]},1).to({state:[{t:this.shape_286},{t:this.shape_285}]},1).to({state:[{t:this.shape_288},{t:this.shape_287}]},1).to({state:[{t:this.shape_290},{t:this.shape_289}]},1).to({state:[{t:this.shape_272,p:{y:128.6803}},{t:this.shape_271,p:{y:128.6803}}]},1).to({state:[{t:this.shape_292},{t:this.shape_291}]},1).to({state:[{t:this.shape_294},{t:this.shape_293}]},1).to({state:[{t:this.shape_296},{t:this.shape_295}]},1).to({state:[{t:this.shape_298},{t:this.shape_297}]},1).to({state:[{t:this.shape_300},{t:this.shape_299}]},1).to({state:[{t:this.shape_262,p:{scaleX:0.5165,scaleY:0.5165,x:301.5765,y:77.7124}},{t:this.shape_261,p:{scaleX:0.5165,scaleY:0.5165,x:301.5765,y:77.7124}}]},1).to({state:[]},1).to({state:[{t:this.shape_302,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:260.3362}},{t:this.shape_301,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:260.3362}}]},2).to({state:[{t:this.shape_304},{t:this.shape_303}]},1).to({state:[{t:this.shape_306},{t:this.shape_305}]},1).to({state:[{t:this.shape_308},{t:this.shape_307}]},1).to({state:[{t:this.shape_310},{t:this.shape_309}]},1).to({state:[{t:this.shape_312},{t:this.shape_311}]},1).to({state:[{t:this.shape_314},{t:this.shape_313}]},1).to({state:[{t:this.shape_316},{t:this.shape_315}]},1).to({state:[{t:this.shape_318},{t:this.shape_317}]},1).to({state:[{t:this.shape_320},{t:this.shape_319}]},1).to({state:[{t:this.shape_322},{t:this.shape_321}]},1).to({state:[{t:this.shape_324},{t:this.shape_323}]},1).to({state:[{t:this.shape_326},{t:this.shape_325}]},1).to({state:[{t:this.shape_328},{t:this.shape_327}]},1).to({state:[{t:this.shape_330},{t:this.shape_329}]},1).to({state:[{t:this.shape_332},{t:this.shape_331}]},1).to({state:[{t:this.shape_302,p:{scaleX:1.6159,scaleY:1.6159,x:164.2126,y:194.0157}},{t:this.shape_301,p:{scaleX:1.6159,scaleY:1.6159,x:164.2126,y:194.0157}}]},1).to({state:[{t:this.shape_334},{t:this.shape_333}]},1).to({state:[{t:this.shape_336},{t:this.shape_335}]},1).to({state:[{t:this.shape_338},{t:this.shape_337}]},1).to({state:[{t:this.shape_340},{t:this.shape_339}]},1).to({state:[{t:this.shape_342},{t:this.shape_341}]},1).to({state:[{t:this.shape_344},{t:this.shape_343}]},1).to({state:[{t:this.shape_346},{t:this.shape_345}]},1).to({state:[{t:this.shape_348},{t:this.shape_347}]},1).to({state:[{t:this.shape_350},{t:this.shape_349}]},1).to({state:[{t:this.shape_352},{t:this.shape_351}]},1).to({state:[{t:this.shape_354},{t:this.shape_353}]},1).to({state:[{t:this.shape_356},{t:this.shape_355}]},1).to({state:[{t:this.shape_302,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:123.2362}},{t:this.shape_301,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:123.2362}}]},1).to({state:[]},1).to({state:[]},2).wait(1));

	// s_3
	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f().s("#000000").ss(2.4,1,1).p("ABGiCQAng5A6gIQA6gIAVAuQAYA0gtBbQg3BuiTCNQhthghRhqQiijUCPg1QAvgSAoAeQAXARAlAzQAhAuARAHQAcAMAfgtg");
	this.shape_357.setTransform(217.9426,202.0026);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FF7F69").s().p("AinAjQiijUCPg1QAvgSAoAeQAXARAlAzQAhAuARAHQAcAMAfgtQAng5A6gIQA6gIAVAuQAYA0gtBbQg3BuiTCNQhthghRhqg");
	this.shape_358.setTransform(217.9426,202.0026);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f().s("#000000").ss(2.4,1,1).p("Ai1jgQAugRAmAdQAXAQAkAzQAgAsARAHQAbALAegrQAmg3A5gIQA4gIAVAsQAXAzgsBZQg2BqiPCKQhphdhPhoQiejOCLg0g");
	this.shape_359.setTransform(217.9421,199.0359);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FF7F69").s().p("AiiAiQiejOCLg0QAugRAmAdQAXAQAkAzQAgAsARAHQAbALAegrQAmg3A5gIQA4gIAVAsQAXAzgsBZQg2BqiPCKQhphdhPhog");
	this.shape_360.setTransform(217.9421,199.0359);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f().s("#000000").ss(2.4,1,1).p("AiwjZQAsgRAmAdQAWAPAjAxQAgArAQAHQAaALAdgrQAlg1A3gIQA3gHAUArQAXAxgrBWQg0BoiLCGQhnhbhNhlQiZjICHgyg");
	this.shape_361.setTransform(217.9422,196.0475);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FF7F69").s().p("AieAhQiZjICHgyQAsgRAmAdQAWAPAjAxQAgArAQAHQAaALAdgrQAlg1A3gIQA3gHAUArQAXAxgrBWQg0BoiLCGQhnhbhNhlg");
	this.shape_362.setTransform(217.9422,196.0475);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f().s("#000000").ss(2.4,1,1).p("AirjTQArgQAlAbQAVAPAjAwQAeApAPAHQAaALAdgpQAjg0A2gIQA1gHATAqQAWAwgpBUQgzBkiHCCQhkhYhKhiQiVjDCDgwg");
	this.shape_363.setTransform(217.9487,193.0807);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FF7F69").s().p("AiZAgQiVjDCDgwQArgQAlAbQAVAPAjAwQAeApAPAHQAaALAdgpQAjg0A2gIQA1gHATAqQAWAwgpBUQgzBkiHCCQhkhYhKhig");
	this.shape_364.setTransform(217.9487,193.0807);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f().s("#000000").ss(2.4,1,1).p("AimjNQApgPAkAaQAVAPAhAuQAeAoAPAHQAZAKAbgoQAjgyA0gHQAzgHATAoQAWAvgpBRQgxBiiDB+QhhhWhIhfQiRi9CAgvg");
	this.shape_365.setTransform(217.9595,190.089);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FF7F69").s().p("AiVAfQiRi9CAgvQApgPAkAaQAVAPAhAuQAeAoAPAHQAZAKAbgoQAjgyA0gHQAzgHATAoQAWAvgpBRQgxBiiDB+QhhhWhIhfg");
	this.shape_366.setTransform(217.9595,190.089);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f().s("#000000").ss(2.4,1,1).p("AihjHQAogPAjAaQAUAOAgAtQAdAnAOAHQAZAKAagnQAigxAygHQAygHASAnQAVAtgnBPQgwBfh/B6QhdhThGhcQiNi3B8gug");
	this.shape_367.setTransform(217.9508,187.1105);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FF7F69").s().p("AiQAeQiNi3B8guQAogPAjAaQAUAOAgAtQAdAnAOAHQAZAKAagnQAigxAygHQAygHASAnQAVAtgnBPQgwBfh/B6QhdhThGhcg");
	this.shape_368.setTransform(217.9508,187.1105);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f().s("#000000").ss(2.4,1,1).p("AicjAQAngPAiAZQATAOAfArQAcAmAOAGQAYAKAZgmQAhgvAxgHQAwgGASAmQAUArgmBNQguBbh7B3QhbhQhEhaQiIixB4gsg");
	this.shape_369.setTransform(217.9616,184.1222);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FF7F69").s().p("AiMAdQiIixB4gsQAngPAiAZQATAOAfArQAcAmAOAGQAYAKAZgmQAhgvAxgHQAwgGASAmQAUArgmBNQguBbh7B3QhbhQhEhag");
	this.shape_370.setTransform(217.9616,184.1222);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f().s("#000000").ss(2.4,1,1).p("AiXi6QAmgPAhAZQATANAeAqQAbAlANAGQAXAJAZgkQAgguAvgHQAugGASAlQATAqglBKQgsBZh3ByQhYhOhChWQiEirB0grg");
	this.shape_371.setTransform(217.9486,181.1554);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FF7F69").s().p("AiHAcQiEirB0grQAmgPAhAZQATANAeAqQAbAlANAGQAXAJAZgkQAgguAvgHQAugGASAlQATAqglBKQgsBZh3ByQhYhOhChWg");
	this.shape_372.setTransform(217.9486,181.1554);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f().s("#000000").ss(2.4,1,1).p("AiSi0QAlgOAfAYQASANAeAoQAZAkANAGQAWAJAZgkQAegsAugGQAtgGARAjQASApgjBIQgrBVh0BvQhUhLhAhUQh/ilBwgqg");
	this.shape_373.setTransform(217.9552,178.1887);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FF7F69").s().p("AiDAbQh/ilBwgqQAlgOAfAYQASANAeAoQAZAkANAGQAWAJAZgkQAegsAugGQAtgGARAjQASApgjBIQgrBVh0BvQhUhLhAhUg");
	this.shape_374.setTransform(217.9552,178.1887);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f().s("#000000").ss(2.4,1,1).p("AiNitQAkgOAeAXQARAMAdAnQAZAjAMAGQAVAIAYgiQAdgrAsgGQAsgGAQAjQASAngiBFQgqBThvBrQhShJg9hQQh7igBsgog");
	this.shape_375.setTransform(217.9553,175.1969);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FF7F69").s().p("Ah+AbQh7igBsgoQAkgOAeAXQARAMAdAnQAZAjAMAGQAVAIAYgiQAdgrAsgGQAsgGAQAjQASAngiBFQgqBThvBrQhShJg9hQg");
	this.shape_376.setTransform(217.9553,175.1969);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f().s("#000000").ss(2.4,1,1).p("AiIinQAigNAeAWQAQAMAcAlQAYAhAMAGQAUAIAXghQAcgpArgGQAqgFAPAhQASAmghBCQgpBQhrBnQhPhGg7hOQh2iaBogmg");
	this.shape_377.setTransform(217.9547,172.2336);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FF7F69").s().p("Ah6AZQh2iaBogmQAigNAeAWQAQAMAcAlQAYAhAMAGQAUAIAXghQAcgpArgGQAqgFAPAhQASAmghBCQgpBQhrBnQhPhGg7hOg");
	this.shape_378.setTransform(217.9547,172.2336);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f().s("#000000").ss(2.4,1,1).p("AiDihQAhgMAcAVQARALAaAkQAXAgAMAGQATAIAWggQAbgoApgFQApgGAPAgQARAlggBAQgnBNhnBjQhMhEg5hKQhyiVBkglg");
	this.shape_379.setTransform(217.9655,169.2418);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FF7F69").s().p("Ah1AZQhyiVBkglQAhgMAcAVQARALAaAkQAXAgAMAGQATAIAWggQAbgoApgFQApgGAPAgQARAlggBAQgnBNhnBjQhMhEg5hKg");
	this.shape_380.setTransform(217.9655,169.2418);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f().s("#000000").ss(2.4,1,1).p("Ah+ibQAggMAbAUQAQAMAZAiQAWAfALAFQATAIAVgfQAagmAogFQAngFAOAeQAQAjgeA+QgmBKhjBfQhJhBg3hIQhtiOBggkg");
	this.shape_381.setTransform(217.9544,166.275);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FF7F69").s().p("AhxAXQhtiOBggkQAggMAbAUQAQAMAZAiQAWAfALAFQATAIAVgfQAagmAogFQAngFAOAeQAQAjgeA+QgmBKhjBfQhJhBg3hIg");
	this.shape_382.setTransform(217.9544,166.275);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f().s("#000000").ss(2.4,1,1).p("Ah4iVQAegLAaATQAPALAYAhQAWAeAKAFQASAHAUgdQAaglAlgFQAmgFANAdQAQAigdA7QgkBHhfBcQhGg/g1hFQhpiJBdgig");
	this.shape_383.setTransform(217.9777,163.3117);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FF7F69").s().p("AhsAWQhpiJBdgiQAegLAaATQAPALAYAhQAWAeAKAFQASAHAUgdQAaglAlgFQAmgFANAdQAQAigdA7QgkBHhfBcQhGg/g1hFg");
	this.shape_384.setTransform(217.9777,163.3117);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f().s("#000000").ss(2.4,1,1).p("AhziOQAdgLAYATQAPAKAXAgQAVAcAKAFQARAHATgcQAZgjAkgFQAjgFAOAcQAPAhgdA4QgiBEhbBYQhDg8gyhCQhliDBZghg");
	this.shape_385.setTransform(217.9741,160.2983);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FF7F69").s().p("AhnAWQhliDBZghQAdgLAYATQAPAKAXAgQAVAcAKAFQARAHATgcQAZgjAkgFQAjgFAOAcQAPAhgdA4QgiBEhbBYQhDg8gyhCg");
	this.shape_386.setTransform(217.9741,160.2983);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f().s("#000000").ss(2.4,1,1).p("AhuiIQAbgLAYASQAOAKAWAfQAUAbAJAEQARAHASgbQAYghAigFQAigFANAbQAOAfgbA2QggBBhYBUQhAg5gwg/Qhgh+BVgfg");
	this.shape_387.setTransform(217.963,157.3316);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FF7F69").s().p("AhjAVQhgh+BVgfQAbgLAYASQAOAKAWAfQAUAbAJAEQARAHASgbQAYghAigFQAigFANAbQAOAfgbA2QggBBhYBUQhAg5gwg/g");
	this.shape_388.setTransform(217.963,157.3316);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f().s("#000000").ss(2.4,1,1).p("AhpiCQAagKAXARQANAKAVAdQATAaAJAEQAQAHASgaQAWggAhgEQAggFAMAaQAOAdgaA0QgfA+hTBQQg9g3gug8Qhch4BRgeg");
	this.shape_389.setTransform(217.9738,154.3398);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FF7F69").s().p("AheAUQhch4BRgeQAagKAXARQANAKAVAdQATAaAJAEQAQAHASgaQAWggAhgEQAggFAMAaQAOAdgaA0QgfA+hTBQQg9g3gug8g");
	this.shape_390.setTransform(217.9738,154.3398);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f().s("#000000").ss(2.4,1,1).p("Ahkh8QAZgJAWAQQAMAJAUAcQASAYAJAEQAPAHARgZQAVgeAfgEQAfgFAMAZQANAcgZAxQgeA7hPBMQg6g0gsg5QhXhyBNgdg");
	this.shape_391.setTransform(217.9732,151.3764);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FF7F69").s().p("AhaATQhXhyBNgdQAZgJAWAQQAMAJAUAcQASAYAJAEQAPAHARgZQAVgeAfgEQAfgFAMAZQANAcgZAxQgeA7hPBMQg6g0gsg5g");
	this.shape_392.setTransform(217.9732,151.3764);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f().s("#000000").ss(2.4,1,1).p("Ahfh1QAYgJAUAPQAMAJATAaQASAXAIAEQAOAGAQgXQAUgdAegEQAdgEALAXQANAbgYAvQgcA3hLBJQg4gxgpg3QhThsBJgbg");
	this.shape_393.setTransform(217.9735,148.3847);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FF7F69").s().p("AhVASQhThsBJgbQAYgJAUAPQAMAJATAaQASAXAIAEQAOAGAQgXQAUgdAegEQAdgEALAXQANAbgYAvQgcA3hLBJQg4gxgpg3g");
	this.shape_394.setTransform(217.9735,148.3847);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f().s("#000000").ss(2.4,1,1).p("AhahvQAXgJATAPQALAIATAZQAQAWAHAEQAOAFAPgWQATgbAcgEQAcgEAKAWQAMAagWAsQgbA0hHBFQg0gugog0QhOhnBFgZg");
	this.shape_395.setTransform(217.9799,145.4179);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FF7F69").s().p("AhRARQhOhnBFgZQAXgJATAPQALAIATAZQAQAWAHAEQAOAFAPgWQATgbAcgEQAcgEAKAWQAMAagWAsQgbA0hHBFQg0gugog0g");
	this.shape_396.setTransform(217.9799,145.4179);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f().s("#000000").ss(2.4,1,1).p("AhVhpQAVgIATANQALAIARAYQAPAUAHAEQANAFAOgUQASgaAbgEQAagEAKAVQALAYgVAqQgZAyhEBBQgxgtglgwQhLhhBCgYg");
	this.shape_397.setTransform(217.9669,142.4512);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FF7F69").s().p("AhMAQQhLhhBCgYQAVgIATANQALAIARAYQAPAUAHAEQANAFAOgUQASgaAbgEQAagEAKAVQALAYgVAqQgZAyhEBBQgxgtglgwg");
	this.shape_398.setTransform(217.9669,142.4512);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f().s("#000000").ss(2.4,1,1).p("AhQhjQAUgHASANQAKAHAQAWQAOATAHAEQAMAFANgUQARgYAZgDQAZgEAJAUQALAWgUAoQgYAug/A9QgvgpgjguQhGhbA+gXg");
	this.shape_399.setTransform(217.9777,139.4628);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FF7F69").s().p("AhIAPQhGhbA+gXQAUgHASANQAKAHAQAWQAOATAHAEQAMAFANgUQARgYAZgDQAZgEAJAUQALAWgUAoQgYAug/A9Qgvgpgjgug");
	this.shape_400.setTransform(217.9777,139.4628);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f().s("#000000").ss(2.4,1,1).p("AhLhcQATgIAQANQAKAGAPAVQANATAGADQAMAFAMgTQAQgXAYgDQAXgDAIASQAKAVgSAlQgWAsg8A5QgrgnghgrQhChVA6gVg");
	this.shape_401.setTransform(217.969,136.4844);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FF7F69").s().p("AhDAOQhChVA6gVQATgIAQANQAKAGAPAVQANATAGADQAMAFAMgTQAQgXAYgDQAXgDAIASQAKAVgSAlQgWAsg8A5Qgrgnghgrg");
	this.shape_402.setTransform(217.969,136.4844);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f().s("#000000").ss(2.4,1,1).p("AhGhWQASgHAPAMQAJAGAOATQANASAFADQALAEALgRQAPgWAWgCQAWgDAIARQAJATgRAjQgVAog3A2QgpgkgegpQg+hPA2gUg");
	this.shape_403.setTransform(217.9798,133.4926);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FF7F69").s().p("Ag+ANQg+hPA2gUQASgHAPAMQAJAGAOATQANASAFADQALAEALgRQAPgWAWgCQAWgDAIARQAJATgRAjQgVAog3A2Qgpgkgegpg");
	this.shape_404.setTransform(217.9798,133.4926);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f().s("#000000").ss(2.4,1,1).p("AhAhQQAQgGAOAKQAIAGANASQAMAQAFADQAKAEALgQQANgUAVgCQAUgDAHAQQAJASgQAgQgUAmgzAxQglgigdglQg5hJAzgTg");
	this.shape_405.setTransform(217.9863,130.5257);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FF7F69").s().p("Ag6AMQg5hJAzgTQAQgGAOAKQAIAGANASQAMAQAFADQAKAEALgQQANgUAVgCQAUgDAHAQQAJASgQAgQgUAmgzAxQglgigdglg");
	this.shape_406.setTransform(217.9863,130.5257);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f().s("#000000").ss(2.4,1,1).p("Ag7hJQAOgGAOAKQAHAFAMAQQALAPAFADQAJAEAKgPQAMgTATgCQATgCAGAOQAJARgPAeQgSAigwAuQgigfgagjQg1hDAvgRg");
	this.shape_407.setTransform(217.9867,127.5375);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FF7F69").s().p("Ag1ALQg1hDAvgRQAOgGAOAKQAHAFAMAQQALAPAFADQAJAEAKgPQAMgTATgCQATgCAGAOQAJARgPAeQgSAigwAuQgigfgagjg");
	this.shape_408.setTransform(217.9867,127.5375);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f().s("#000000").ss(2.4,1,1).p("AhChRQARgHAOALQAIAGAOASQAMAQAFADQAKAFALgRQAOgUAVgDQAUgCAHAQQAJASgQAhQgUAmg0AzQgmgjgdgmQg6hKAzgTg");
	this.shape_409.setTransform(410.3189,215.9793);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FF7F69").s().p("Ag7AMQg6hKAzgTQARgHAOALQAIAGAOASQAMAQAFADQAKAFALgRQAOgUAVgDQAUgCAHAQQAJASgQAhQgUAmg0AzQgmgjgdgmg");
	this.shape_410.setTransform(410.3189,215.9793);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f().s("#000000").ss(2.4,1,1).p("AhNhfQATgIARANQAKAHAPAVQAOATAGAEQAMAEANgSQAQgYAYgDQAYgEAJATQAKAWgTAmQgXAtg9A7QgsgogigsQhEhYA8gWg");
	this.shape_411.setTransform(410.3036,205.8189);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FF7F69").s().p("AhFAPQhEhYA8gWQATgIARANQAKAHAPAVQAOATAGAEQAMAEANgSQAQgYAYgDQAYgEAJATQAKAWgTAmQgXAtg9A7Qgsgogigsg");
	this.shape_412.setTransform(410.3036,205.8189);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f().s("#000000").ss(2.4,1,1).p("AhYhtQAWgJATAPQALAIASAYQAQAWAHAEQAOAFAOgVQATgbAcgEQAbgEAKAWQAMAZgWArQgaA0hGBDQgzgugngyQhNhlBEgZg");
	this.shape_413.setTransform(410.2864,195.6777);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FF7F69").s().p("AhPARQhNhlBEgZQAWgJATAPQALAIASAYQAQAWAHAEQAOAFAOgVQATgbAcgEQAbgEAKAWQAMAZgWArQgaA0hGBDQgzgugngyg");
	this.shape_414.setTransform(410.2864,195.6777);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f().s("#000000").ss(2.4,1,1).p("Ahjh7QAZgJAVAQQANAJAUAbQARAZAJAEQAPAGARgYQAUgfAggEQAfgEALAYQANAcgYAxQgeA6hPBMQg6gzgrg5QhXhyBNgcg");
	this.shape_415.setTransform(410.2946,185.523);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FF7F69").s().p("AhZATQhXhyBNgcQAZgJAVAQQANAJAUAbQARAZAJAEQAPAGARgYQAUgfAggEQAfgEALAYQANAcgYAxQgeA6hPBMQg6gzgrg5g");
	this.shape_416.setTransform(410.2946,185.523);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f().s("#000000").ss(2.4,1,1).p("AhviJQAcgKAYASQAOAKAWAeQAUAbAKAFQAQAHATgbQAXgiAjgFQAigEAMAbQAPAfgbA2QghBBhYBVQhAg6gwg/Qhhh+BVggg");
	this.shape_417.setTransform(410.2775,175.3816);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FF7F69").s().p("AhjAVQhhh+BVggQAcgKAYASQAOAKAWAeQAUAbAKAFQAQAHATgbQAXgiAjgFQAigEAMAbQAPAfgbA2QghBBhYBVQhAg6gwg/g");
	this.shape_418.setTransform(410.2775,175.3816);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f().s("#000000").ss(2.4,1,1).p("Ah6iWQAfgMAaATQAPALAZAiQAVAeALAFQATAHAUgdQAZglAmgFQAmgGAOAeQAQAjgeA8QgkBHhgBdQhHg/g2hGQhqiLBegig");
	this.shape_419.setTransform(410.2622,165.2214);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FF7F69").s().p("AhuAXQhqiLBegiQAfgMAaATQAPALAZAiQAVAeALAFQATAHAUgdQAZglAmgFQAmgGAOAeQAQAjgeA8QgkBHhgBdQhHg/g2hGg");
	this.shape_420.setTransform(410.2622,165.2214);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f().s("#000000").ss(2.4,1,1).p("Ah7iXQAfgMAbAUQAPALAZAiQAVAeALAFQASAHAVgdQAZglAngGQAmgFAOAeQAQAjgeA8QglBHhhBeQhHhAg1hGQhriMBegig");
	this.shape_421.setTransform(410.2553,148.25);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FF7F69").s().p("AhuAXQhriMBegiQAfgMAbAUQAPALAZAiQAVAeALAFQASAIAVgeQAZgmAngFQAmgFAOAeQAQAigeA9QglBHhhBdQhHg/g1hGg");
	this.shape_422.setTransform(410.2553,148.25);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f().s("#000000").ss(2.4,1,1).p("AhviKQAcgKAYASQAOAKAWAfQAUAbAKAFQARAGASgbQAYgiAigFQAjgEANAbQAPAggcA2QghBChYBVQhBg6gxhAQhhh/BWggg");
	this.shape_423.setTransform(410.2494,141.4316);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FF7F69").s().p("AhkAVQhhh/BWggQAcgKAYASQAOAKAWAfQAUAbAKAFQARAGASgbQAYgiAigFQAjgEANAbQAPAggcA2QghBChYBVQhBg6gxhAg");
	this.shape_424.setTransform(410.2494,141.4316);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f().s("#000000").ss(2.4,1,1).p("Ahlh8QAagKAVAQQANAJAUAcQASAZAJAEQAPAGARgYQAVgfAfgEQAggFALAZQANAcgYAyQgeA7hQBNQg7g0grg6QhYhzBNgcg");
	this.shape_425.setTransform(410.2537,134.6113);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FF7F69").s().p("AhaATQhYhzBNgcQAagKAVAQQANAJAUAcQASAZAJAEQAPAGARgYQAVgfAfgEQAggFALAZQANAcgYAyQgeA7hQBNQg7g0grg6g");
	this.shape_426.setTransform(410.2537,134.6113);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f().s("#000000").ss(2.4,1,1).p("AhahvQAXgJAUAPQALAIASAZQAQAWAIAEQANAFAPgVQATgcAcgEQAcgEAKAXQAMAZgWAsQgbA1hHBEQg0gugng0QhPhmBFgag");
	this.shape_427.setTransform(410.2479,127.7813);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FF7F69").s().p("AhQARQhPhmBFgaQAXgJAUAPQALAIASAZQAQAWAIAEQANAFAPgVQATgcAcgEQAcgEAKAXQAMAZgWAsQgbA1hHBEQg0gugng0g");
	this.shape_428.setTransform(410.2479,127.7813);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f().s("#000000").ss(2.4,1,1).p("AhPhiQAUgHARAMQAKAHAQAXQAOATAGADQAMAFANgTQARgYAZgEQAZgDAJATQAKAXgTAnQgYAug/A8QgtgpgjgtQhFhaA9gXg");
	this.shape_429.setTransform(410.2581,120.9594);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FF7F69").s().p("AhHAPQhFhaA9gXQAUgHARAMQAKAHAQAXQAOATAGADQAMAFANgTQARgYAZgEQAZgDAJATQAKAXgTAnQgYAug/A8Qgtgpgjgtg");
	this.shape_430.setTransform(410.2581,120.9594);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f().s("#000000").ss(2.4,1,1).p("AhEhUQARgHAPALQAIAGAOAUQAMAQAGADQAKAEALgQQAPgVAVgDQAWgDAHARQAKATgRAiQgVAog2A0QgngkgegnQg8hOA1gTg");
	this.shape_431.setTransform(410.2524,114.1293);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FF7F69").s().p("Ag9ANQg8hOA1gTQARgHAPALQAIAGAOAUQAMAQAGADQAKAEALgQQAPgVAVgDQAWgDAHARQAKATgRAiQgVAog2A0Qgngkgegng");
	this.shape_432.setTransform(410.2524,114.1293);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f().s("#000000").ss(2.4,1,1).p("Ag6hHQAPgGANAKQAHAFALAQQAKAOAFACQAJAEAJgOQANgRASgDQASgCAGAOQAIAQgOAdQgSAhgtAsQghgegZghQgzhBAsgRg");
	this.shape_433.setTransform(410.2565,107.3089);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FF7F69").s().p("AgzALQgzhBAsgRQAPgGANAKQAHAFALAQQAKAOAFACQAJAEAJgOQANgRASgDQASgCAGAOQAIAQgOAdQgSAhgtAsQghgegZghg");
	this.shape_434.setTransform(410.2565,107.3089);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f().s("#000000").ss(2.4,1,1).p("Agvg5QAMgFAKAIQAGAEAJANQAJALADACQAIADAHgLQALgOAOgCQAPgCAFALQAGANgLAYQgOAbglAjQgbgYgVgbQgpg1AkgNg");
	this.shape_435.setTransform(410.2508,100.4906);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FF7F69").s().p("AgqAJQgpg1AkgNQAMgFAKAIQAGAEAJANQAJALADACQAIADAHgLQALgOAOgCQAPgCAFALQAGANgLAYQgOAbglAjQgbgYgVgbg");
	this.shape_436.setTransform(410.2508,100.4906);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f().s("#000000").ss(2.4,1,1).p("AhIhYQASgHAQAMQAJAGAOAUQANASAGACQALAFAMgSQAPgVAWgDQAWgEAJASQAJAUgSAkQgVApg5A3QgpglgfgpQg/hSA3gUg");
	this.shape_437.setTransform(218.0019,248.0326);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FF7F69").s().p("AhAAOQg/hSA3gUQASgHAQAMQAJAGAOAUQANASAGACQALAFAMgSQAPgVAWgDQAWgEAJASQAJAUgSAkQgVApg5A3Qgpglgfgpg");
	this.shape_438.setTransform(218.0019,248.0326);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f().s("#000000").ss(2.4,1,1).p("Ahgh2QAZgJAUAQQAMAIAUAbQARAXAIAEQAOAGAQgYQAUgdAegEQAegEALAYQAMAagXAwQgdA3hLBJQg4gxgpg3QhUhtBJgbg");
	this.shape_439.setTransform(217.977,238.373);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FF7F69").s().p("AhVASQhUhtBJgbQAZgJAUAQQAMAIAUAbQARAXAIAEQAOAGAQgYQAUgdAegEQAegEALAYQAMAagXAwQgdA3hLBJQg4gxgpg3g");
	this.shape_440.setTransform(217.977,238.373);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f().s("#000000").ss(2.4,1,1).p("Ah1iQQAegMAZATQAOALAYAgQAVAdAKAEQASAIATgdQAZgjAkgFQAkgFAOAcQAPAhgdA6QgiBEhdBZQhEg8gzhDQhmiFBaghg");
	this.shape_441.setTransform(217.9742,229.8582);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FF7F69").s().p("AhpAWQhmiFBaghQAegMAZATQAOALAYAgQAVAdAKAEQASAIATgdQAZgjAkgFQAkgFAOAcQAPAhgdA6QgiBEhdBZQhEg8gzhDg");
	this.shape_442.setTransform(217.9742,229.8582);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f().s("#000000").ss(2.4,1,1).p("AiHinQAigNAdAWQAQAMAcAlQAYAiAMAFQAUAIAXggQAcgpAqgGQAqgGAQAhQARAmghBCQgoBQhrBnQhOhGg7hOQh2iaBogmg");
	this.shape_443.setTransform(217.9672,222.4702);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FF7F69").s().p("Ah5AZQh2iaBogmQAigNAdAWQAQAMAcAlQAYAiAMAFQAUAIAXggQAcgpAqgGQAqgGAQAhQARAmghBCQgoBQhrBnQhOhGg7hOg");
	this.shape_444.setTransform(217.9672,222.4702);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f().s("#000000").ss(2.4,1,1).p("AiXi6QAmgPAgAZQATANAfAqQAaAlAOAGQAXAJAZgkQAfguAvgHQAvgGARAlQAUAqglBKQgtBZh3ByQhYhNhBhXQiEirB0grg");
	this.shape_445.setTransform(217.961,216.2054);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FF7F69").s().p("AiHAcQiEirB0grQAmgPAgAZQATANAfAqQAaAlAOAGQAXAJAZgkQAfguAvgHQAvgGARAlQAUAqglBKQgtBZh3ByQhYhNhBhXg");
	this.shape_446.setTransform(217.961,216.2054);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f().s("#000000").ss(2.4,1,1).p("AijjKQApgPAjAaQAUAPAhAtQAdAoAPAGQAZALAbgoQAigyAzgHQAzgHASAoQAWAugoBQQgxBhiBB8QhfhUhHheQiPi6B+gvg");
	this.shape_447.setTransform(217.9499,211.089);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FF7F69").s().p("AiSAfQiPi6B+gvQApgPAiAaQAVAPAhAtQAdAoAOAGQAaALAbgoQAigyAzgHQAzgHASAoQAVAugnBQQgxBhiBB8QhfhUhHheg");
	this.shape_448.setTransform(217.9499,211.089);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f().s("#000000").ss(2.4,1,1).p("AitjWQArgRAmAcQAVAQAjAwQAfAqAQAHQAaALAdgqQAkg1A2gHQA1gIAVArQAWAwgrBVQgzBmiJCEQhlhZhLhjQiYjGCGgxg");
	this.shape_449.setTransform(217.9485,207.1191);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#FF7F69").s().p("AibAhQiYjGCGgxQArgRAmAcQAVAQAjAwQAfAqAQAHQAaALAdgqQAkg1A2gHQA1gIAVArQAWAwgrBVQgzBmiJCEQhlhZhLhjg");
	this.shape_450.setTransform(217.9485,207.1191);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f().s("#000000").ss(2.4,1,1).p("Ai1jfQAugRAnAdQAWAQAkAyQAgAsARAHQAbAMAegsQAmg3A4gIQA4gHAVAsQAXAygsBZQg1BqiPCJQhphdhPhnQidjOCKgzg");
	this.shape_451.setTransform(217.9408,204.2758);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#FF7F69").s().p("AiiAiQidjOCKgzQAugRAnAdQAWAQAkAyQAgAsARAHQAbAMAegsQAmg3A4gIQA4gHAVAsQAXAygsBZQg1BqiPCJQhphdhPhng");
	this.shape_452.setTransform(217.9408,204.2758);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f().s("#000000").ss(2.4,1,1).p("Ai5jkQAvgSAoAeQAWAQAmA0QAgAtARAHQAcAMAfgtQAmg4A6gIQA5gIAVAtQAYA0gtBbQg3BsiRCNQhshghQhpQiijTCOg0g");
	this.shape_453.setTransform(217.9455,202.5776);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#FF7F69").s().p("AilAjQiijTCOg0QAvgSAoAeQAWAQAmA0QAgAtARAHQAcAMAfgtQAmg4A6gIQA5gIAVAtQAYA0gtBbQg3BsiRCNQhshghQhpg");
	this.shape_454.setTransform(217.9455,202.5776);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_358,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}},{t:this.shape_357,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}}]}).to({state:[{t:this.shape_358,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}},{t:this.shape_357,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}}]},5).to({state:[{t:this.shape_360},{t:this.shape_359}]},1).to({state:[{t:this.shape_362},{t:this.shape_361}]},1).to({state:[{t:this.shape_364},{t:this.shape_363}]},1).to({state:[{t:this.shape_366},{t:this.shape_365}]},1).to({state:[{t:this.shape_368},{t:this.shape_367}]},1).to({state:[{t:this.shape_370},{t:this.shape_369}]},1).to({state:[{t:this.shape_372},{t:this.shape_371}]},1).to({state:[{t:this.shape_374},{t:this.shape_373}]},1).to({state:[{t:this.shape_376},{t:this.shape_375}]},1).to({state:[{t:this.shape_378},{t:this.shape_377}]},1).to({state:[{t:this.shape_380},{t:this.shape_379}]},1).to({state:[{t:this.shape_382},{t:this.shape_381}]},1).to({state:[{t:this.shape_384},{t:this.shape_383}]},1).to({state:[{t:this.shape_386},{t:this.shape_385}]},1).to({state:[{t:this.shape_388},{t:this.shape_387}]},1).to({state:[{t:this.shape_390},{t:this.shape_389}]},1).to({state:[{t:this.shape_392},{t:this.shape_391}]},1).to({state:[{t:this.shape_394},{t:this.shape_393}]},1).to({state:[{t:this.shape_396},{t:this.shape_395}]},1).to({state:[{t:this.shape_398},{t:this.shape_397}]},1).to({state:[{t:this.shape_400},{t:this.shape_399}]},1).to({state:[{t:this.shape_402},{t:this.shape_401}]},1).to({state:[{t:this.shape_404},{t:this.shape_403}]},1).to({state:[{t:this.shape_406},{t:this.shape_405}]},1).to({state:[{t:this.shape_408},{t:this.shape_407}]},1).to({state:[{t:this.shape_358,p:{scaleX:0.2962,scaleY:0.2962,x:217.9811,y:124.5753}},{t:this.shape_357,p:{scaleX:0.2962,scaleY:0.2962,x:217.9811,y:124.5753}}]},1).to({state:[]},1).to({state:[{t:this.shape_358,p:{scaleX:0.2962,scaleY:0.2962,x:410.3311,y:226.1253}},{t:this.shape_357,p:{scaleX:0.2962,scaleY:0.2962,x:410.3311,y:226.1253}}]},7).to({state:[{t:this.shape_410},{t:this.shape_409}]},1).to({state:[{t:this.shape_412},{t:this.shape_411}]},1).to({state:[{t:this.shape_414},{t:this.shape_413}]},1).to({state:[{t:this.shape_416},{t:this.shape_415}]},1).to({state:[{t:this.shape_418},{t:this.shape_417}]},1).to({state:[{t:this.shape_420},{t:this.shape_419}]},1).to({state:[{t:this.shape_358,p:{scaleX:0.7163,scaleY:0.7163,x:410.2447,y:155.0749}},{t:this.shape_357,p:{scaleX:0.7163,scaleY:0.7163,x:410.2447,y:155.0749}}]},1).to({state:[{t:this.shape_422},{t:this.shape_421}]},1).to({state:[{t:this.shape_424},{t:this.shape_423}]},1).to({state:[{t:this.shape_426},{t:this.shape_425}]},1).to({state:[{t:this.shape_428},{t:this.shape_427}]},1).to({state:[{t:this.shape_430},{t:this.shape_429}]},1).to({state:[{t:this.shape_432},{t:this.shape_431}]},1).to({state:[{t:this.shape_434},{t:this.shape_433}]},1).to({state:[{t:this.shape_436},{t:this.shape_435}]},1).to({state:[{t:this.shape_358,p:{scaleX:0.1952,scaleY:0.1952,x:410.2535,y:93.6669}},{t:this.shape_357,p:{scaleX:0.1952,scaleY:0.1952,x:410.2535,y:93.6669}}]},1).to({state:[]},1).to({state:[{t:this.shape_358,p:{scaleX:0.2425,scaleY:0.2425,x:217.9981,y:258.8324}},{t:this.shape_357,p:{scaleX:0.2425,scaleY:0.2425,x:217.9981,y:258.8324}}]},8).to({state:[{t:this.shape_438},{t:this.shape_437}]},1).to({state:[{t:this.shape_440},{t:this.shape_439}]},1).to({state:[{t:this.shape_442},{t:this.shape_441}]},1).to({state:[{t:this.shape_444},{t:this.shape_443}]},1).to({state:[{t:this.shape_446},{t:this.shape_445}]},1).to({state:[{t:this.shape_448},{t:this.shape_447}]},1).to({state:[{t:this.shape_450},{t:this.shape_449}]},1).to({state:[{t:this.shape_452},{t:this.shape_451}]},1).to({state:[{t:this.shape_454},{t:this.shape_453}]},1).to({state:[{t:this.shape_358,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}},{t:this.shape_357,p:{scaleX:1,scaleY:1,x:217.9426,y:202.0026}}]},1).wait(1));

	// s_ddop
	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f().s("#000000").ss(2.4,1,1).p("ABGiCQAng5A6gIQA6gIAVAuQAYA0gtBbQg3BuiTCNQhthghRhqQiijUCPg1QAvgSAoAeQAXARAlAzQAhAuARAHQAcAMAfgtg");
	this.shape_455.setTransform(431.8811,233.8753,0.2962,0.2962);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#FF7F69").s().p("AinAjQiijUCPg1QAvgSAoAeQAXARAlAzQAhAuARAHQAcAMAfgtQAng5A6gIQA6gIAVAuQAYA0gtBbQg3BuiTCNQhthghRhqg");
	this.shape_456.setTransform(431.8811,233.8753,0.2962,0.2962);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f().s("#000000").ss(2.4,1,1).p("Ag/hOQAQgGAOAKQAIAGAMARQAMAQAFADQAJAEALgQQANgTAUgDQAUgCAHAPQAIASgPAfQgTAkgyAxQglghgbgkQg4hIAxgSg");
	this.shape_457.setTransform(431.8767,229.1625);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#FF7F69").s().p("Ag4AMQg4hIAxgSQAQgGAOAKQAIAGAMARQAMAQAFADQAJAEALgQQANgTAUgDQAUgCAHAPQAIASgPAfQgTAkgyAxQglghgbgkg");
	this.shape_458.setTransform(431.8767,229.1625);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f().s("#000000").ss(2.4,1,1).p("AhHhYQASgHAPAMQAJAGAPAUQAMASAGADQALAEAMgRQAPgWAWgDQAXgDAIARQAJAVgRAjQgWApg4A3QgqglgfgpQg+hRA3gVg");
	this.shape_459.setTransform(431.8799,224.4461);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#FF7F69").s().p("AhAAOQg+hRA3gVQASgHAPAMQAJAGAPAUQAMASAGADQALAEAMgRQAPgWAWgDQAXgDAIARQAJAVgRAjQgWApg4A3Qgqglgfgpg");
	this.shape_460.setTransform(431.8799,224.4461);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f().s("#000000").ss(2.4,1,1).p("AhPhiQATgIASANQAKAHAQAWQAOAUAHADQAMAFANgTQARgZAZgDQAYgDAJATQALAXgUAnQgXAug/A9QgugpgjguQhGhbA+gWg");
	this.shape_461.setTransform(431.8641,219.7128);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#FF7F69").s().p("AhHAPQhGhbA+gWQATgIASANQAKAHAQAWQAOAUAHADQAMAFANgTQARgZAZgDQAYgDAJATQALAXgUAnQgXAug/A9Qgugpgjgug");
	this.shape_462.setTransform(431.8641,219.7128);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f().s("#000000").ss(2.4,1,1).p("AhYhtQAWgIATAOQALAIASAYQAQAWAHAEQANAFAPgVQATgbAbgEQAbgEAKAWQAMAZgWArQgaAzhFBDQgzgtgngzQhNhkBEgZg");
	this.shape_463.setTransform(431.8673,215.0045);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#FF7F69").s().p("AhPAQQhNhkBEgZQAWgIATAOQALAIASAYQAQAWAHAEQANAFAPgVQATgbAbgEQAbgEAKAWQAMAZgWArQgaAzhFBDQgzgtgngzg");
	this.shape_464.setTransform(431.8673,215.0045);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f().s("#000000").ss(2.4,1,1).p("Ahgh3QAYgJAVAQQAMAJATAaQARAYAJAEQAOAGAQgYQAUgdAfgEQAdgEALAXQANAbgYAwQgcA4hMBJQg4gxgqg4QhVhtBLgcg");
	this.shape_465.setTransform(431.858,210.2847);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#FF7F69").s().p("AhWASQhVhtBLgcQAYgJAVAQQAMAJATAaQARAYAJAEQAOAGAQgYQAUgdAfgEQAdgEALAXQANAbgYAwQgcA4hMBJQg4gxgqg4g");
	this.shape_466.setTransform(431.858,210.2847);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f().s("#000000").ss(2.4,1,1).p("AhoiBQAagKAWARQANAJAWAdQASAaAJAEQAQAHASgaQAWggAggEQAhgFAMAaQANAegZAzQgfA9hTBQQg9g2gug8Qhbh3BRgeg");
	this.shape_467.setTransform(431.8444,205.5898);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#FF7F69").s().p("AheAUQhbh3BRgeQAagKAWARQANAJAWAdQASAaAJAEQAQAHASgaQAWggAggEQAhgFAMAaQANAegZAzQgfA9hTBQQg9g2gug8g");
	this.shape_468.setTransform(431.8444,205.5898);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f().s("#000000").ss(2.4,1,1).p("AhxiLQAdgLAYASQAOAKAXAgQAUAbAKAFQARAHATgcQAXgiAkgFQAjgFANAcQAOAggbA3QgiBChZBWQhCg6gxhBQhjiABXggg");
	this.shape_469.setTransform(431.8351,200.8699);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FF7F69").s().p("AhlAVQhjiABXggQAdgLAYASQAOAKAXAgQAUAbAKAFQARAHATgcQAXgiAkgFQAjgFANAcQAOAggbA3QgiBChZBWQhCg6gxhBg");
	this.shape_470.setTransform(431.8351,200.8699);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5iWQAegLAaATQAPALAZAiQAVAdALAFQATAIAUgeQAZglAmgFQAmgFAOAeQAPAigdA7QgkBHhgBdQhHg/g1hFQhpiKBdgjg");
	this.shape_471.setTransform(431.8384,196.1617);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FF7F69").s().p("AhtAXQhpiKBdgjQAegLAaATQAPALAZAiQAVAdALAFQATAIAUgeQAZglAmgFQAmgFAOAeQAPAigdA7QgkBHhgBdQhHg/g1hFg");
	this.shape_472.setTransform(431.8384,196.1617);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f().s("#000000").ss(2.4,1,1).p("AiBigQAggMAcAVQAQAMAaAjQAXAgAMAFQATAIAWgfQAbgoApgFQAngGAPAgQARAkggBAQgmBMhmBiQhLhCg5hLQhxiTBkglg");
	this.shape_473.setTransform(431.8225,191.4285);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FF7F69").s().p("Ah0AYQhxiTBkglQAggMAcAVQAQAMAaAjQAXAgAMAFQATAIAWgfQAbgoApgFQAngGAPAgQARAkggBAQgmBMhmBiQhLhCg5hLg");
	this.shape_474.setTransform(431.8225,191.4285);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f().s("#000000").ss(2.4,1,1).p("AiKiqQAjgNAdAWQARAMAcAnQAZAhAMAGQAVAIAXghQAdgqArgGQAqgGAQAiQASAngiBDQgoBRhtBpQhQhHg9hPQh4idBqgng");
	this.shape_475.setTransform(431.8257,186.712);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FF7F69").s().p("Ah8AaQh4idBqgnQAjgNAdAWQARAMAcAnQAZAhAMAGQAVAIAXghQAdgqArgGQAqgGAQAiQASAngiBDQgoBRhtBpQhQhHg9hPg");
	this.shape_476.setTransform(431.8257,186.712);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f().s("#000000").ss(2.4,1,1).p("AiKiqQAjgNAdAXQARAMAcAmQAZAhAMAGQAVAJAXgiQAdgqArgGQAqgGAQAiQASAngiBDQgoBRhtBpQhQhHg9hPQh4idBqgng");
	this.shape_477.setTransform(431.8257,178.637);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#FF7F69").s().p("Ah8AaQh4idBqgnQAjgNAdAXQARAMAcAmQAZAhAMAGQAVAJAXgiQAdgqArgGQAqgGAQAiQASAngiBDQgoBRhtBpQhQhHg9hPg");
	this.shape_478.setTransform(431.8257,178.637);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f().s("#000000").ss(2.4,1,1).p("AiBigQAggMAcAVQAQAMAaAkQAXAfAMAFQATAIAWgfQAbgnAogGQAogGAPAgQARAlggA/QgmBMhmBiQhLhCg5hLQhxiTBkglg");
	this.shape_479.setTransform(431.8236,175.2818);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FF7F69").s().p("Ah0AYQhxiTBkglQAggMAcAVQAQAMAaAkQAXAfAMAFQATAIAWgfQAbgnAogGQAogGAPAgQARAlggA/QgmBMhmBiQhLhCg5hLg");
	this.shape_480.setTransform(431.8236,175.2818);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5iVQAegLAaATQAPALAZAhQAVAeALAFQATAHATgdQAaglAmgFQAlgFAOAdQAQAigeA7QgkBHhfBcQhGg+g1hFQhqiKBdgig");
	this.shape_481.setTransform(431.8354,171.9266);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FF7F69").s().p("AhsAXQhqiKBdgiQAegLAaATQAPALAZAhQAVAeALAFQATAHATgdQAaglAmgFQAlgFAOAdQAQAigeA7QgkBHhfBcQhGg+g1hFg");
	this.shape_482.setTransform(431.8354,171.9266);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f().s("#000000").ss(2.4,1,1).p("AhwiLQAcgKAYASQAOAKAXAfQAUAbAKAFQARAHASgbQAYgjAjgEQAjgFANAbQAPAggcA3QghBChZBVQhCg5gxhBQhiiABXggg");
	this.shape_483.setTransform(431.8339,168.5566);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#FF7F69").s().p("AhlAVQhiiABXggQAcgKAYASQAOAKAXAfQAUAbAKAFQARAHASgbQAYgjAjgEQAjgFANAbQAPAggcA3QghBChZBVQhCg5gxhBg");
	this.shape_484.setTransform(431.8339,168.5566);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f().s("#000000").ss(2.4,1,1).p("AhoiBQAagJAXAQQAMAKAWAdQASAZAJAEQAQAHARgaQAWgfAhgFQAggEAMAZQANAegZAzQgfA9hSBPQg9g2gtg8Qhbh2BQgeg");
	this.shape_485.setTransform(431.8318,165.2014);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FF7F69").s().p("AhdATQhbh2BQgeQAagJAXAQQAMAKAWAdQASAZAJAEQAQAHARgaQAWgfAhgFQAggEAMAZQANAegZAzQgfA9hSBPQg9g2gtg8g");
	this.shape_486.setTransform(431.8318,165.2014);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f().s("#000000").ss(2.4,1,1).p("Ahfh2QAYgJAUAQQAMAIATAbQARAXAJAEQAOAGAQgXQAUgdAegEQAegFALAYQAMAbgXAvQgdA4hLBIQg4gxgqg3QhThtBKgbg");
	this.shape_487.setTransform(431.8411,161.8347);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FF7F69").s().p("AhWASQhThtBKgbQAYgJAUAQQAMAIATAbQARAXAJAEQAOAGAQgXQAUgdAegEQAegFALAYQAMAbgXAvQgdA4hLBIQg4gxgqg3g");
	this.shape_488.setTransform(431.8411,161.8347);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f().s("#000000").ss(2.4,1,1).p("AhXhsQAWgIASAOQALAIASAYQAPAVAIAEQANAFAPgVQASgaAbgEQAbgEAKAWQAMAYgWArQgaAzhFBCQgygtgmgyQhMhjBDgZg");
	this.shape_489.setTransform(431.8558,158.5045);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FF7F69").s().p("AhOAQQhMhjBDgZQAWgIASAOQALAIASAYQAPAVAIAEQANAFAPgVQASgaAbgEQAbgEAKAWQAMAYgWArQgaAzhFBCQgygtgmgyg");
	this.shape_490.setTransform(431.8558,158.5045);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f().s("#000000").ss(2.4,1,1).p("AhPhhQAUgHARAMQAKAHAQAWQAOATAHAEQAMAFANgUQARgYAYgDQAYgDAKATQAKAWgUAnQgXAug+A8QgugpgigtQhFhaA8gWg");
	this.shape_491.setTransform(431.8313,155.1244);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FF7F69").s().p("AhGAPQhFhaA8gWQAUgHARAMQAKAHAQAWQAOATAHAEQAMAFANgUQARgYAYgDQAYgDAKATQAKAWgUAnQgXAug+A8Qgugpgigtg");
	this.shape_492.setTransform(431.8313,155.1244);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f().s("#000000").ss(2.4,1,1).p("AhGhXQASgGAPALQAJAGAOAUQAMARAGADQALAEAMgRQAPgVAVgDQAWgDAJARQAJAUgSAiQgVApg3A2QgpgkgfgpQg9hQA2gUg");
	this.shape_493.setTransform(431.8405,151.7576);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FF7F69").s().p("Ag/ANQg9hQA2gUQASgGAPALQAJAGAOAUQAMARAGADQALAEAMgRQAPgVAVgDQAWgDAJARQAJAUgSAiQgVApg3A2Qgpgkgfgpg");
	this.shape_494.setTransform(431.8405,151.7576);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f().s("#000000").ss(2.4,1,1).p("Ag+hNQAQgFANAKQAIAFANASQALAPAFACQAJAEALgPQANgTATgDQATgCAIAPQAHASgPAeQgSAkgxAvQgkgggbgkQg2hGAvgSg");
	this.shape_495.setTransform(431.8385,148.4024);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FF7F69").s().p("Ag3ALQg2hGAvgSQAQgFANAKQAIAFANASQALAPAFACQAJAEALgPQANgTATgDQATgCAIAPQAHASgPAeQgSAkgxAvQgkgggbgkg");
	this.shape_496.setTransform(431.8385,148.4024);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f().s("#000000").ss(2.4,1,1).p("Ag1hCQAOgFALAJQAHAFALAPQAJANAEACQAIADAKgNQALgQAQgCQARgDAGAOQAHAPgNAaQgQAfgqApQgfgcgYgfQgug9ApgPg");
	this.shape_497.setTransform(431.8369,145.0324);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FF7F69").s().p("AgwAKQgug9ApgPQAOgFALAJQAHAFALAPQAJANAEACQAIADAKgNQALgQAQgCQARgDAGAOQAHAPgNAaQgQAfgqApQgfgcgYgfg");
	this.shape_498.setTransform(431.8369,145.0324);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f().s("#000000").ss(2.4,1,1).p("Agtg3QAMgEAKAHQAFAEAKAMQAIALADACQAHADAHgLQAKgOAOgCQAOgBAFALQAGAMgLAXQgNAagkAiQgagXgUgaQgng0AigMg");
	this.shape_499.setTransform(431.8486,141.6773);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FF7F69").s().p("AgoAJQgng0AigMQAMgEAKAHQAFAEAKAMQAIALADACQAHADAHgLQAKgOAOgCQAOgBAFALQAGAMgLAXQgNAagkAiQgagXgUgag");
	this.shape_500.setTransform(431.8486,141.6773);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f().s("#000000").ss(2.4,1,1).p("AgkgtQAJgDAIAFQAFAEAHAKQAHAJACABQAGADAGgJQAIgLALgCQAMgBAEAJQAFAKgJASQgLAVgdAcQgVgTgQgVQgggqAcgKg");
	this.shape_501.setTransform(431.8467,138.3221);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FF7F69").s().p("AggAHQgggqAcgKQAJgDAIAFQAFAEAHAKQAHAJACABQAGADAGgJQAIgLALgCQAMgBAEAJQAFAKgJASQgLAVgdAcQgVgTgQgVg");
	this.shape_502.setTransform(431.8467,138.3221);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_456,p:{scaleX:0.2962,scaleY:0.2962,x:431.8811,y:233.8753}},{t:this.shape_455,p:{scaleX:0.2962,scaleY:0.2962,x:431.8811,y:233.8753}}]},16).to({state:[{t:this.shape_458},{t:this.shape_457}]},1).to({state:[{t:this.shape_460},{t:this.shape_459}]},1).to({state:[{t:this.shape_462},{t:this.shape_461}]},1).to({state:[{t:this.shape_464},{t:this.shape_463}]},1).to({state:[{t:this.shape_466},{t:this.shape_465}]},1).to({state:[{t:this.shape_468},{t:this.shape_467}]},1).to({state:[{t:this.shape_470},{t:this.shape_469}]},1).to({state:[{t:this.shape_472},{t:this.shape_471}]},1).to({state:[{t:this.shape_474},{t:this.shape_473}]},1).to({state:[{t:this.shape_476},{t:this.shape_475}]},1).to({state:[{t:this.shape_456,p:{scaleX:0.7859,scaleY:0.7859,x:431.8097,y:182.0092}},{t:this.shape_455,p:{scaleX:0.7859,scaleY:0.7859,x:431.8097,y:182.0092}}]},1).to({state:[{t:this.shape_478},{t:this.shape_477}]},1).to({state:[{t:this.shape_480},{t:this.shape_479}]},1).to({state:[{t:this.shape_482},{t:this.shape_481}]},1).to({state:[{t:this.shape_484},{t:this.shape_483}]},1).to({state:[{t:this.shape_486},{t:this.shape_485}]},1).to({state:[{t:this.shape_488},{t:this.shape_487}]},1).to({state:[{t:this.shape_490},{t:this.shape_489}]},1).to({state:[{t:this.shape_492},{t:this.shape_491}]},1).to({state:[{t:this.shape_494},{t:this.shape_493}]},1).to({state:[{t:this.shape_496},{t:this.shape_495}]},1).to({state:[{t:this.shape_498},{t:this.shape_497}]},1).to({state:[{t:this.shape_500},{t:this.shape_499}]},1).to({state:[{t:this.shape_502},{t:this.shape_501}]},1).to({state:[{t:this.shape_456,p:{scaleX:0.1535,scaleY:0.1535,x:431.8511,y:134.9538}},{t:this.shape_455,p:{scaleX:0.1535,scaleY:0.1535,x:431.8511,y:134.9538}}]},1).to({state:[]},1).wait(33));

	// s_2
	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f().s("#000000").ss(2.4,1,1).p("AAVgmQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUg");
	this.shape_503.setTransform(380.9962,196.7454);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FF7F69").s().p("AhqAIQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSg");
	this.shape_504.setTransform(380.9962,196.7454);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5igQA8gKAcBXQAOApAGAIQAMARAVgTQAigjAogHQAogFAOAZQAPAdgeAzQglA+heBOQg6hMgthOQhaicBGgMg");
	this.shape_505.setTransform(380.997,193.3482);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FF7F69").s().p("AhlAIQhaicBGgMQA8gKAcBXQAOApAGAIQAMARAVgTQAigjAogHQAogFAOAZQAPAdgeAzQglA+heBOQg6hMgthOg");
	this.shape_506.setTransform(380.997,193.3482);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f().s("#000000").ss(2.4,1,1).p("AhziZQA5gJAaBSQAOAoAGAHQALAQAUgSQAggiAngFQAmgGANAZQAPAbgeAxQgiA6haBLQg3hIgrhLQhWiVBDgLg");
	this.shape_507.setTransform(380.9981,189.951);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FF7F69").s().p("AhgAHQhWiVBDgLQA5gJAaBSQAOAoAGAHQALAQAUgSQAggiAngFQAmgGANAZQAPAbgeAxQgiA6haBLQg3hIgrhLg");
	this.shape_508.setTransform(380.9981,189.951);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f().s("#000000").ss(2.4,1,1).p("AhuiRQA2gJAaBOQANAmAFAHQALAQATgSQAfggAlgFQAkgGAMAYQAOAagcAuQghA4hWBHQg0hFgohHQhSiNA/gLg");
	this.shape_509.setTransform(380.9989,186.5284);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FF7F69").s().p("AhbAHQhSiNA/gLQA2gJAaBOQANAmAFAHQALAQATgSQAfggAlgFQAkgGAMAYQAOAagcAuQghA4hWBHQg0hFgohHg");
	this.shape_510.setTransform(380.9989,186.5284);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f().s("#000000").ss(2.4,1,1).p("AhoiJQAzgJAYBKQAMAkAFAHQALAOASgQQAdgeAjgGQAigFAMAXQANAYgaAsQggA1hRBDQgyhBgmhDQhNiGA8gKg");
	this.shape_511.setTransform(381.0028,183.1312);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FF7F69").s().p("AhXAHQhNiGA8gKQAzgJAYBKQAMAkAFAHQALAOASgQQAdgeAjgGQAigFAMAXQANAYgaAsQggA1hRBDQgyhBgmhDg");
	this.shape_512.setTransform(381.0028,183.1312);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f().s("#000000").ss(2.4,1,1).p("AhjiCQAxgIAXBGQALAiAFAHQAKANARgPQAbgdAhgFQAhgFALAVQAMAXgZAqQgdAyhNBAQgvg+gkhAQhJh/A4gJg");
	this.shape_513.setTransform(381.0008,179.7293);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FF7F69").s().p("AhSAGQhJh/A4gJQAxgIAXBGQALAiAFAHQAKANARgPQAbgdAhgFQAhgFALAVQAMAXgZAqQgdAyhNBAQgvg+gkhAg");
	this.shape_514.setTransform(381.0008,179.7293);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f().s("#000000").ss(2.4,1,1).p("Ahdh6QAugIAWBCQAKAgAFAGQAKANAQgPQAZgbAfgEQAfgFAKAUQAMAWgXAnQgcAvhJA8Qgsg6gig8QhFh4A1gIg");
	this.shape_515.setTransform(380.9968,176.332);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FF7F69").s().p("AhNAGQhFh4A1gIQAugIAWBCQAKAgAFAGQAKANAQgPQAZgbAfgEQAfgFAKAUQAMAWgXAnQgcAvhJA8Qgsg6gig8g");
	this.shape_516.setTransform(380.9968,176.332);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f().s("#000000").ss(2.4,1,1).p("AhXhzQArgHAUA+QAKAeAFAGQAJAMAPgOQAYgZAdgFQAdgEAJATQALAUgWAlQgaAshEA4Qgpg2ggg5QhBhwAygIg");
	this.shape_517.setTransform(380.9916,172.9095);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FF7F69").s().p("AhIAFQhBhwAygIQArgHAUA+QAKAeAFAGQAJAMAPgOQAYgZAdgFQAdgEAJATQALAUgWAlQgaAshEA4Qgpg2ggg5g");
	this.shape_518.setTransform(380.9916,172.9095);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f().s("#000000").ss(2.4,1,1).p("AhRhrQAogHATA6QAJAcAFAFQAIAMAOgNQAWgYAcgEQAagEAKARQAKAUgVAiQgYAphAA1Qgmgzgfg1Qg8hpAvgHg");
	this.shape_519.setTransform(380.9988,169.5123);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FF7F69").s().p("AhEAFQg8hpAvgHQAogHATA6QAJAcAFAFQAIAMAOgNQAWgYAcgEQAagEAKARQAKAUgVAiQgYAphAA1Qgmgzgfg1g");
	this.shape_520.setTransform(380.9988,169.5123);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f().s("#000000").ss(2.4,1,1).p("AhMhkQAmgGASA2QAIAaAEAFQAIALANgMQAVgWAZgEQAZgEAJAQQAJASgTAgQgXAng7AxQgkgwgcgxQg4hhArgIg");
	this.shape_521.setTransform(380.9872,166.095);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FF7F69").s().p("Ag/AFQg4hhArgIQAmgGASA2QAIAaAEAFQAIALANgMQAVgWAZgEQAZgEAJAQQAJASgTAgQgXAng7AxQgkgwgcgxg");
	this.shape_522.setTransform(380.9872,166.095);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f().s("#000000").ss(2.4,1,1).p("AhGhcQAjgGAQAyQAIAYAEAFQAHAKAMgLQATgVAYgDQAXgEAIAPQAJARgSAdQgVAkg3AtQghgsgagtQg0haAogHg");
	this.shape_523.setTransform(380.9884,162.6977);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FF7F69").s().p("Ag6AFQg0haAogHQAjgGAQAyQAIAYAEAFQAHAKAMgLQATgVAYgDQAXgEAIAPQAJARgSAdQgVAkg3AtQghgsgagtg");
	this.shape_524.setTransform(380.9884,162.6977);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f().s("#000000").ss(2.4,1,1).p("AhAhVQAggFAPAuQAHAWADAEQAHAJALgKQASgSAVgEQAWgDAHAOQAIAPgQAbQgUAhgyApQgfgogXgqQgwhSAlgHg");
	this.shape_525.setTransform(380.978,159.2752);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FF7F69").s().p("Ag1AEQgwhSAlgHQAggFAPAuQAHAWADAEQAHAJALgKQASgSAVgEQAWgDAHAOQAIAPgQAbQgUAhgyApQgfgogXgqg");
	this.shape_526.setTransform(380.978,159.2752);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f().s("#000000").ss(2.4,1,1).p("Ag6hNQAdgFANAqQAHAUADAEQAGAIAKgJQAQgRAUgDQATgDAHANQAHANgOAZQgSAeguAmQgcglgWgmQgrhLAigGg");
	this.shape_527.setTransform(380.982,155.878);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FF7F69").s().p("AgxAEQgrhLAigGQAdgFANAqQAHAUADAEQAGAIAKgJQAQgRAUgDQATgDAHANQAHANgOAZQgSAeguAmQgcglgWgmg");
	this.shape_528.setTransform(380.982,155.878);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f().s("#000000").ss(2.4,1,1).p("Ag1hGQAbgEAMAmQAGASADAEQAFAHAJgIQAPgQARgDQASgCAGALQAHANgOAWQgQAbgpAiQgZghgUgjQgnhEAegFg");
	this.shape_529.setTransform(380.98,152.4762);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FF7F69").s().p("AgsADQgnhEAegFQAbgEAMAmQAGASADAEQAFAHAJgIQAPgQARgDQASgCAGALQAHANgOAWQgQAbgpAiQgZghgUgjg");
	this.shape_530.setTransform(380.98,152.4762);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f().s("#000000").ss(2.4,1,1).p("Agvg+QAXgEAMAiQAFAQACADQAFAHAIgIQANgNAQgDQAQgCAFAKQAGALgMATQgOAZgmAfQgWgegRgfQgjg9AbgEg");
	this.shape_531.setTransform(380.9871,149.0789);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FF7F69").s().p("AgnADQgjg9AbgEQAXgEAMAiQAFAQACADQAFAHAIgIQANgNAQgDQAQgCAFAKQAGALgMATQgOAZgmAfQgWgegRgfg");
	this.shape_532.setTransform(380.9871,149.0789);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f().s("#000000").ss(2.4,1,1).p("Agpg3QAUgDAKAdQAFAPACADQAEAFAHgGQAMgMAOgCQAOgDAEAKQAFAJgKARQgNAWghAbQgTgagPgbQgfg2AYgEg");
	this.shape_533.setTransform(380.982,145.6564);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FF7F69").s().p("AgiADQgfg2AYgEQAUgDAKAdQAFAPACADQAEAFAHgGQAMgMAOgCQAOgDAEAKQAFAJgKARQgNAWghAbQgTgagPgbg");
	this.shape_534.setTransform(380.982,145.6564);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f().s("#000000").ss(2.4,1,1).p("AgIhCQgPgegfgJQgegJgPAUQgrA0CKCXIBAg7QA+hCgOgkQgOgjgQgBQgMgBgTARQgWAUgHADQgQAFgKgWg");
	this.shape_535.setTransform(271.1392,229.0869,0.3817,0.3817);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FF7F69").s().p("AhjheQAPgUAeAJQAfAJAPAeQAKAWAQgFQAHgDAWgUQATgRAMABQAQABAOAjQAOAkg+BCIhAA7QiKiXArg0g");
	this.shape_536.setTransform(271.1392,229.0869,0.3817,0.3817);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f().s("#000000").ss(2.4,1,1).p("AgugsQAHgJAOAEQAPAEAHAOQAEALAIgDQADgBALgKQAIgIAGABQAIAAAGARQAHARgeAeIgdAcQhBhGAUgZg");
	this.shape_537.setTransform(271.1484,224.3635);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FF7F69").s().p("AgugsQAHgJAOAEQAPAEAHAOQAEALAIgDQADgBALgKQAIgIAGABQAIAAAGARQAHARgeAeIgdAcQhBhGAUgZg");
	this.shape_538.setTransform(271.1484,224.3635);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f().s("#000000").ss(2.4,1,1).p("Ag3g1QAIgLARAFQASAGAIAQQAFANAJgDQAEgCANgLQAKgKAHABQAJABAIATQAIAVgjAkIgkAhQhNhUAYgeg");
	this.shape_539.setTransform(271.1407,219.6219);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FF7F69").s().p("Ag3g1QAIgLARAFQASAGAIAQQAFANAJgDQAEgCANgLQAKgKAHABQAJABAIATQAIAVgjAkIgkAhQhNhUAYgeg");
	this.shape_540.setTransform(271.1407,219.6219);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f().s("#000000").ss(2.4,1,1).p("AhBg+QAKgMAUAGQAVAFAJAUQAGAPALgEQAFgCAOgNQAMgLAIAAQALABAJAXQAJAYgpAqIgpAnQhahiAbgjg");
	this.shape_541.setTransform(271.1342,214.9027);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FF7F69").s().p("AhBg+QAKgMAUAGQAVAFAJAUQAGAPALgEQAFgCAOgNQAMgLAIAAQALABAJAXQAJAYgpAqIgpAnQhahiAbgjg");
	this.shape_542.setTransform(271.1342,214.9027);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f().s("#000000").ss(2.4,1,1).p("AhKhGQAMgPAWAHQAXAHALAWQAIARAMgFQAFgCAQgOQAOgNAJAAQAMACAKAZQALAbgvAxIgvAsQhmhwAfgng");
	this.shape_543.setTransform(271.1265,210.161);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FF7F69").s().p("AhKhGQAMgPAWAHQAXAHALAWQAIARAMgFQAFgCAQgOQAOgNAJAAQAMACAKAZQALAbgvAxIgvAsQhmhwAfgng");
	this.shape_544.setTransform(271.1265,210.161);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f().s("#000000").ss(2.4,1,1).p("AhThOQANgRAZAIQAaAHANAZQAIATANgFQAGgCATgRQAPgOAKABQAOABALAdQAMAeg0A3Ig1AxQhzh+Ajgrg");
	this.shape_545.setTransform(271.1368,205.4328);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FF7F69").s().p("AhThOQANgRAZAIQAaAHANAZQAIATANgFQAGgCATgRQAPgOAKABQAOABALAdQAMAeg0A3Ig1AxQhzh+Ajgrg");
	this.shape_546.setTransform(271.1368,205.4328);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f().s("#000000").ss(2.4,1,1).p("AhchXQAOgSAcAIQAdAIAOAbQAJAVAPgFQAGgDAVgSQARgQALABQAPABANAgQANAig6A9Ig6A2QiAiLAngwg");
	this.shape_547.setTransform(271.1291,200.7019);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FF7F69").s().p("AhchXQAOgSAcAIQAdAIAOAbQAJAVAPgFQAGgDAVgSQARgQALABQAPABANAgQANAig6A9Ig6A2QiAiLAngwg");
	this.shape_548.setTransform(271.1291,200.7019);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f().s("#000000").ss(2.4,1,1).p("AhlhgQAPgUAfAJQAgAKAPAdQAKAXAQgFQAHgDAXgUQATgSAMABQARACANAjQAPAlg/BCIhBA8QiMiZArg1g");
	this.shape_549.setTransform(271.1214,195.9603);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FF7F69").s().p("AhlhgQAPgUAfAJQAgAKAPAdQAKAXAQgFQAHgDAXgUQATgSAMABQARACANAjQAPAlg/BCIhBA8QiMiZArg1g");
	this.shape_550.setTransform(271.1214,195.9603);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f().s("#000000").ss(2.4,1,1).p("AhuhoQAQgWAiAKQAjAKAQAhQALAZASgHQAIgDAYgVQAVgUANABQASACAPAmQAQAohFBJIhGBBQiZimAvg6g");
	this.shape_551.setTransform(271.1149,191.2413);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FF7F69").s().p("AhuhoQAQgWAiAKQAjAKAQAhQALAZASgHQAIgDAYgVQAVgUANABQASACAPAmQAQAohFBJIhGBBQiZimAvg6g");
	this.shape_552.setTransform(271.1149,191.2413);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f().s("#000000").ss(2.4,1,1).p("Ah3hxQASgXAkALQAlAKASAkQANAbATgHQAIgEAagXQAXgVAOABQAUACAQApQARAshLBPIhMBGQili0Azg/g");
	this.shape_553.setTransform(271.1072,186.4996);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FF7F69").s().p("Ah3hxQASgXAkALQAlAKASAkQANAbATgHQAIgEAagXQAXgVAOABQAUACAQApQARAshLBPIhMBGQili1Azg+g");
	this.shape_554.setTransform(271.1072,186.4996);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f().s("#000000").ss(2.4,1,1).p("Ah3hyQASgXAkALQAmAKARAkQANAbATgHQAJgDAagYQAXgVAOABQAUACAQAqQARAshLBOIhMBHQini1A0g/g");
	this.shape_555.setTransform(271.0996,175.8604);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FF7F69").s().p("Ah3hyQASgXAkALQAmAKARAkQANAbATgHQAJgDAagYQAXgVAOABQAUACAQAqQARAshLBOIhMBHQini1A0g/g");
	this.shape_556.setTransform(271.0996,175.8604);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f().s("#000000").ss(2.4,1,1).p("AhvhpQAQgWAjAKQAiAKARAhQALAZASgGQAIgDAYgWQAWgTAMAAQATACAPAnQAQAohGBKIhHBBQiaioAwg6g");
	this.shape_557.setTransform(271.1065,169.9413);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FF7F69").s().p("AhvhpQAQgWAjAKQAiAKARAhQALAZASgGQAIgDAYgWQAWgTAMAAQATACAPAnQAQAohGBKIhHBBQiaioAwg6g");
	this.shape_558.setTransform(271.1065,169.9413);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f().s("#000000").ss(2.4,1,1).p("AhmhhQAPgUAgAJQAgAJAPAeQAKAYARgGQAHgDAXgUQATgSAMABQARABAOAkQAPAlhABEIhCA9QiOibAsg2g");
	this.shape_559.setTransform(271.0899,164.0603);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FF7F69").s().p("AhmhhQAPgUAgAJQAgAJAPAeQAKAYARgGQAHgDAXgUQATgSAMABQARABAOAkQAPAlhABEIhCA9QiOibAsg2g");
	this.shape_560.setTransform(271.0899,164.0603);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f().s("#000000").ss(2.4,1,1).p("AhehZQAOgSAdAIQAeAJAOAbQAJAWAPgFQAHgDAVgTQASgQAKABQAQABANAhQANAig6A+Ig8A4QiDiOAogyg");
	this.shape_561.setTransform(271.0824,158.1412);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FF7F69").s().p("AhehZQAOgSAdAIQAeAJAOAbQAJAWAPgFQAHgDAVgTQASgQAKABQAQABANAhQANAig6A+Ig8A4QiDiOAogyg");
	this.shape_562.setTransform(271.0824,158.1412);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f().s("#000000").ss(2.4,1,1).p("AhVhRQANgQAaAHQAbAIAMAZQAJAUAOgFQAGgDATgQQAQgPAKAAQAOACAMAdQAMAgg2A4Ig2AyQh3iBAlgtg");
	this.shape_563.setTransform(271.0815,152.2328);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FF7F69").s().p("AhVhRQANgQAaAHQAbAIAMAZQAJAUAOgFQAGgDATgQQAQgPAKAAQAOACAMAdQAMAgg2A4Ig2AyQh3iBAlgtg");
	this.shape_564.setTransform(271.0815,152.2328);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f().s("#000000").ss(2.4,1,1).p("AhMhJQALgPAYAHQAYAHALAXQAIARAMgEQAFgCARgPQAPgOAJABQANABAKAbQALAcgwAyIgxAuQhqh0Ahgpg");
	this.shape_565.setTransform(271.0797,146.3136);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FF7F69").s().p("AhMhJQALgPAYAHQAYAHALAXQAIARAMgEQAFgCARgPQAPgOAJABQANABAKAbQALAcgwAyIgxAuQhqh0Ahgpg");
	this.shape_566.setTransform(271.0797,146.3136);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f().s("#000000").ss(2.4,1,1).p("AhEhBQAKgNAVAGQAWAGAKAVQAGAPALgEQAFgCAPgNQANgMAIAAQALABAKAYQAJAZgqAtIgrAoQhfhnAdgkg");
	this.shape_567.setTransform(271.0791,140.4053);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FF7F69").s().p("AhEhBQAKgNAVAGQAWAGAKAVQAGAPALgEQAFgCAPgNQANgMAIAAQALABAKAYQAJAZgqAtIgrAoQhfhnAdgkg");
	this.shape_568.setTransform(271.0791,140.4053);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f().s("#000000").ss(2.4,1,1).p("Ag7g4QAIgMATAGQATAFAJASQAFANAKgDQAEgCANgLQAMgLAGAAQAKABAJAVQAIAWglAnIgmAjQhThaAagfg");
	this.shape_569.setTransform(271.0715,134.486);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FF7F69").s().p("Ag7g4QAIgMATAGQATAFAJASQAFANAKgDQAEgCANgLQAMgLAGAAQAKABAJAVQAIAWglAnIgmAjQhThaAagfg");
	this.shape_570.setTransform(271.0715,134.486);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f().s("#000000").ss(2.4,1,1).p("AgzgwQAIgKAPAEQARAFAHAPQAFAMAIgDQAEgCALgKQAKgJAGABQAIAAAHASQAHATgfAhIggAfQhIhNAWgbg");
	this.shape_571.setTransform(271.0548,128.6052);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FF7F69").s().p("AgzgwQAIgKAPAEQARAFAHAPQAFAMAIgDQAEgCALgKQAKgJAGABQAIAAAHASQAHATgfAhIggAfQhIhNAWgbg");
	this.shape_572.setTransform(271.0548,128.6052);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f().s("#000000").ss(2.4,1,1).p("AgqgoQAGgIANAEQAOAEAGAMQAEAKAGgCQADgCAKgIQAIgHAFAAQAHAAAGAPQAGAQgbAcIgaAZQg7hAASgXg");
	this.shape_573.setTransform(271.0619,122.686);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FF7F69").s().p("AgqgoQAGgIANAEQAOAEAGAMQAEAKAGgCIANgKQAIgHAFAAQAHAAAGAPQAGAQgbAcIgaAZQg7hAASgXg");
	this.shape_574.setTransform(271.0619,122.686);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f().s("#000000").ss(2.4,1,1).p("Agsg7QAWgEALAgQAFAQACADQAEAHAIgIQAMgNAPgCQAPgDAFAKQAGALgLASQgOAYgjAcQgVgcgRgdQghg6AagEg");
	this.shape_575.setTransform(380.9986,229.7278);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FF7F69").s().p("AglADQghg6AagEQAWgEALAgQAFAQACADQAEAHAIgIQAMgNAPgCQAPgDAFAKQAGALgLASQgOAYgjAcQgVgcgRgdg");
	this.shape_576.setTransform(380.9986,229.7278);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f().s("#000000").ss(2.4,1,1).p("Ag3hJQAbgEANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAHAMQAHANgOAXQgRAdgsAjQgagigUgkQgphIAggFg");
	this.shape_577.setTransform(381.0153,225.477);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FF7F69").s().p("AguAEQgphIAggFQAbgEANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAHAMQAHANgOAXQgRAdgsAjQgagigUgkg");
	this.shape_578.setTransform(381.0153,225.477);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f().s("#000000").ss(2.4,1,1).p("AhBhWQAggFAPAuQAIAXADAEQAHAJALgKQASgTAWgDQAVgEAIAOQAIAQgRAbQgTAhgzAqQgfgogYgrQgxhUAmgGg");
	this.shape_579.setTransform(381.013,221.5209);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FF7F69").s().p("Ag2AEQgxhUAmgGQAggFAPAuQAIAXADAEQAHAJALgKQASgTAWgDQAVgEAIAOQAIAQgRAbQgTAhgzAqQgfgogYgrg");
	this.shape_580.setTransform(381.013,221.5209);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f().s("#000000").ss(2.4,1,1).p("AhKhiQAkgGASA1QAIAaAEAFQAIAKAMgLQAVgWAZgEQAYgEAJAQQAJASgTAfQgWAmg6AwQgjgvgcgwQg3hgArgHg");
	this.shape_581.setTransform(381.0039,217.8445);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FF7F69").s().p("Ag+AFQg3hgArgHQAkgGASA1QAIAaAEAFQAIAKAMgLQAVgWAZgEQAYgEAJAQQAJASgTAfQgWAmg6AwQgjgvgcgwg");
	this.shape_582.setTransform(381.0039,217.8445);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f().s("#000000").ss(2.4,1,1).p("AhShtQAogHAUA7QAJAdAEAFQAJAMAOgNQAXgZAcgEQAbgEAJASQALAUgVAiQgZAqhBA2Qgng0gfg2Qg9hqAwgIg");
	this.shape_583.setTransform(380.9979,214.4879);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FF7F69").s().p("AhFAFQg9hqAwgIQAogHAUA7QAJAdAEAFQAJAMAOgNQAXgZAcgEQAbgEAJASQALAUgVAiQgZAqhBA2Qgng0gfg2g");
	this.shape_584.setTransform(380.9979,214.4879);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f().s("#000000").ss(2.4,1,1).p("Ahah3QAtgIAVBBQAKAfAFAGQAJAMAPgOQAZgaAfgFQAdgEALATQALAVgXAmQgbAuhHA7Qgrg5ghg6QhDh1A0gIg");
	this.shape_585.setTransform(380.9945,211.4109);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FF7F69").s().p("AhLAGQhDh1A0gIQAtgIAVBBQAKAfAFAGQAJAMAPgOQAZgaAfgFQAdgEALATQALAVgXAmQgbAuhHA7Qgrg5ghg6g");
	this.shape_586.setTransform(380.9945,211.4109);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f().s("#000000").ss(2.4,1,1).p("AhhiAQAwgIAXBFQALAiAFAGQAKANAQgPQAbgcAhgFQAggFALAVQAMAXgYApQgeAxhMA/Qgug9gkg/QhIh9A4gJg");
	this.shape_587.setTransform(380.9909,208.6334);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FF7F69").s().p("AhRAGQhIh9A4gJQAwgIAXBFQALAiAFAGQAKANAQgPQAbgcAhgFQAggFALAVQAMAXgYApQgeAxhMA/Qgug9gkg/g");
	this.shape_588.setTransform(380.9909,208.6334);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f().s("#000000").ss(2.4,1,1).p("AhoiJQAzgJAYBKQAMAkAGAHQAKAOASgQQAdgeAigGQAigFAMAWQANAZgaArQgfA1hRBDQgxhBgnhDQhMiFA7gKg");
	this.shape_589.setTransform(381.0124,206.1512);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FF7F69").s().p("AhXAGQhMiFA7gKQAzgJAYBKQAMAkAGAHQAKAOASgQQAdgeAigGQAigFAMAWQANAZgaArQgfA1hRBDQgxhBgnhDg");
	this.shape_590.setTransform(381.0124,206.1512);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f().s("#000000").ss(2.4,1,1).p("AhtiQQA2gJAZBOQANAlAFAIQAMAPASgRQAeggAlgGQAkgFAMAXQAOAagcAuQggA3hVBHQg0hFgphGQhRiMA/gLg");
	this.shape_591.setTransform(380.9941,203.9282);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FF7F69").s().p("AhbAHQhRiMA/gLQA2gJAZBOQANAlAFAIQAMAPASgRQAeggAlgGQAkgFAMAXQAOAagcAuQggA3hVBHQg0hFgphGg");
	this.shape_592.setTransform(380.9941,203.9282);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f().s("#000000").ss(2.4,1,1).p("AhyiWQA5gKAaBSQANAnAGAHQALAQAUgSQAfghAngGQAlgFANAYQAOAbgdAwQgiA6hYBJQg3hHgqhKQhUiSBBgLg");
	this.shape_593.setTransform(380.9866,202.0254);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FF7F69").s().p("AhfAHQhUiSBBgLQA5gKAaBSQANAnAGAHQALAQAUgSQAfghAngGQAlgFANAYQAOAbgdAwQgiA6hYBJQg3hHgqhKg");
	this.shape_594.setTransform(380.9866,202.0254);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f().s("#000000").ss(2.4,1,1).p("Ah2icQA6gJAbBUQAOAoAGAIQAMAQAUgSQAhgjAngGQAngFANAZQAPAcgeAxQgjA8hcBMQg4hKgshMQhXiXBEgMg");
	this.shape_595.setTransform(381.0005,200.4017);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FF7F69").s().p("AhjAHQhXiXBEgMQA6gJAbBUQAOAoAGAIQAMAQAUgSQAhgjAngGQAngFANAZQAPAcgeAxQgjA8hcBMQg4hKgshMg");
	this.shape_596.setTransform(381.0005,200.4017);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5igQA8gKAcBXQAOApAGAIQAMARAVgTQAigjAogGQAogGAOAaQAPAcgfAzQgkA+heBOQg6hMgthOQhaicBGgMg");
	this.shape_597.setTransform(380.991,199.0732);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FF7F69").s().p("AhlAIQhaicBGgMQA8gKAcBXQAOApAGAIQAMARAVgTQAigjAogGQAogGAOAaQAPAcgfAzQgkA+heBOQg6hMgthOg");
	this.shape_598.setTransform(380.991,199.0732);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f().s("#000000").ss(2.4,1,1).p("Ah7ijQA8gKAdBYQAOAqAHAIQAMARAWgTQAigkApgGQApgGAOAaQAPAdgfA0QglA/hgBQQg7hNguhQQhcigBIgLg");
	this.shape_599.setTransform(380.995,198.074);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FF7F69").s().p("AhnAIQhcigBIgLQA8gKAdBYQAOAqAHAIQAMARAWgTQAigkApgGQApgGAOAaQAPAdgfA0QglA/hgBQQg7hNguhQg");
	this.shape_600.setTransform(380.995,198.074);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f().s("#000000").ss(2.4,1,1).p("Ah9ilQA+gLAdBaQAOArAGAIQANARAWgTQAjglAqgGQApgGAOAaQAQAeggA1QglBAhiBRQg8hPgvhRQhciiBIgLg");
	this.shape_601.setTransform(380.9938,197.3449);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FF7F69").s().p("AhpAIQhciiBIgLQA+gLAdBaQAOArAGAIQANARAWgTQAjglAqgGQApgGAOAaQAQAeggA1QglBAhiBRQg8hPgvhRg");
	this.shape_602.setTransform(380.9938,197.3449);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f().s("#000000").ss(2.4,1,1).p("Ah+inQA+gKAdBaQAPArAGAJQANARAWgUQAjglAqgGQAqgGAOAbQAQAeggA1QgmBAhiBSQg9hPguhSQheijBJgMg");
	this.shape_603.setTransform(380.9962,196.8951);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FF7F69").s().p("AhpAIQheijBJgMQA+gKAdBaQAPArAGAJQANARAWgUQAjglAqgGQAqgGAOAbQAQAeggA1QgmBAhiBSQg9hPguhSg");
	this.shape_604.setTransform(380.9962,196.8951);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_504,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}},{t:this.shape_503,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}}]}).to({state:[{t:this.shape_504,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}},{t:this.shape_503,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}}]},6).to({state:[{t:this.shape_506},{t:this.shape_505}]},1).to({state:[{t:this.shape_508},{t:this.shape_507}]},1).to({state:[{t:this.shape_510},{t:this.shape_509}]},1).to({state:[{t:this.shape_512},{t:this.shape_511}]},1).to({state:[{t:this.shape_514},{t:this.shape_513}]},1).to({state:[{t:this.shape_516},{t:this.shape_515}]},1).to({state:[{t:this.shape_518},{t:this.shape_517}]},1).to({state:[{t:this.shape_520},{t:this.shape_519}]},1).to({state:[{t:this.shape_522},{t:this.shape_521}]},1).to({state:[{t:this.shape_524},{t:this.shape_523}]},1).to({state:[{t:this.shape_526},{t:this.shape_525}]},1).to({state:[{t:this.shape_528},{t:this.shape_527}]},1).to({state:[{t:this.shape_530},{t:this.shape_529}]},1).to({state:[{t:this.shape_532},{t:this.shape_531}]},1).to({state:[{t:this.shape_534},{t:this.shape_533}]},1).to({state:[{t:this.shape_504,p:{scaleX:0.2863,scaleY:0.2863,x:380.9797,y:142.2541}},{t:this.shape_503,p:{scaleX:0.2863,scaleY:0.2863,x:380.9797,y:142.2541}}]},1).to({state:[]},1).to({state:[{t:this.shape_536,p:{scaleX:0.3817,scaleY:0.3817,x:271.1392,y:229.0869}},{t:this.shape_535,p:{scaleX:0.3817,scaleY:0.3817,x:271.1392,y:229.0869}}]},3).to({state:[{t:this.shape_538},{t:this.shape_537}]},1).to({state:[{t:this.shape_540},{t:this.shape_539}]},1).to({state:[{t:this.shape_542},{t:this.shape_541}]},1).to({state:[{t:this.shape_544},{t:this.shape_543}]},1).to({state:[{t:this.shape_546},{t:this.shape_545}]},1).to({state:[{t:this.shape_548},{t:this.shape_547}]},1).to({state:[{t:this.shape_550},{t:this.shape_549}]},1).to({state:[{t:this.shape_552},{t:this.shape_551}]},1).to({state:[{t:this.shape_554},{t:this.shape_553}]},1).to({state:[{t:this.shape_536,p:{scaleX:1.2882,scaleY:1.2882,x:271.1056,y:181.7702}},{t:this.shape_535,p:{scaleX:1.2882,scaleY:1.2882,x:271.1056,y:181.7702}}]},1).to({state:[{t:this.shape_556},{t:this.shape_555}]},1).to({state:[{t:this.shape_558},{t:this.shape_557}]},1).to({state:[{t:this.shape_560},{t:this.shape_559}]},1).to({state:[{t:this.shape_562},{t:this.shape_561}]},1).to({state:[{t:this.shape_564},{t:this.shape_563}]},1).to({state:[{t:this.shape_566},{t:this.shape_565}]},1).to({state:[{t:this.shape_568},{t:this.shape_567}]},1).to({state:[{t:this.shape_570},{t:this.shape_569}]},1).to({state:[{t:this.shape_572},{t:this.shape_571}]},1).to({state:[{t:this.shape_574},{t:this.shape_573}]},1).to({state:[{t:this.shape_536,p:{scaleX:0.3421,scaleY:0.3421,x:271.041,y:116.7771}},{t:this.shape_535,p:{scaleX:0.3421,scaleY:0.3421,x:271.041,y:116.7771}}]},1).to({state:[]},1).to({state:[{t:this.shape_504,p:{scaleX:0.2672,scaleY:0.2672,x:381.009,y:234.2862}},{t:this.shape_503,p:{scaleX:0.2672,scaleY:0.2672,x:381.009,y:234.2862}}]},10).to({state:[{t:this.shape_576},{t:this.shape_575}]},1).to({state:[{t:this.shape_578},{t:this.shape_577}]},1).to({state:[{t:this.shape_580},{t:this.shape_579}]},1).to({state:[{t:this.shape_582},{t:this.shape_581}]},1).to({state:[{t:this.shape_584},{t:this.shape_583}]},1).to({state:[{t:this.shape_586},{t:this.shape_585}]},1).to({state:[{t:this.shape_588},{t:this.shape_587}]},1).to({state:[{t:this.shape_590},{t:this.shape_589}]},1).to({state:[{t:this.shape_592},{t:this.shape_591}]},1).to({state:[{t:this.shape_594},{t:this.shape_593}]},1).to({state:[{t:this.shape_596},{t:this.shape_595}]},1).to({state:[{t:this.shape_598},{t:this.shape_597}]},1).to({state:[{t:this.shape_600},{t:this.shape_599}]},1).to({state:[{t:this.shape_602},{t:this.shape_601}]},1).to({state:[{t:this.shape_604},{t:this.shape_603}]},1).to({state:[{t:this.shape_504,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}},{t:this.shape_503,p:{scaleX:1,scaleY:1,x:380.9962,y:196.7454}}]},1).wait(1));

	// s_1
	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f().s("#000000").ss(2.4,1,1).p("AgLg5QAcglAwgQQAugPAVASQAZAVgeA1QgjA/hrBfQgtg1gkg5QhJhxAqgVQAqgUAZA6QAMAcAHAFQALAKATgTg");
	this.shape_605.setTransform(168.9355,251.3186);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FF7F69").s().p("AhgAPQhJhxAqgVQAqgUAZA6QAMAcAHAFQALAKATgTQAcglAwgQQAugPAVASQAZAVgeA1QgjA/hrBfQgtg1gkg5g");
	this.shape_606.setTransform(168.9355,251.3186);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f().s("#000000").ss(2.4,1,1).p("Ah3hwQAngTAYA3QALAaAGAFQA3gsAtgOQAsgPAUARQAXAUgcAyQghA7hlBaQgqgygjg2QhEhrAogTg");
	this.shape_607.setTransform(168.9313,247.6794);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FF7F69").s().p("AhbAOQhEhrAogTQAngTAYA3QALAaAGAFQA3gsAtgOQAsgPAUARQAXAUgcAyQghA7hlBaQgqgygjg2g");
	this.shape_608.setTransform(168.9313,247.6794);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f().s("#000000").ss(2.4,1,1).p("AhwhpQAlgSAWA0QALAYAGAFQAzgpAqgOQAqgOASARQAWASgaAvQggA4heBUQgogvgggzQhAhkAlgSg");
	this.shape_609.setTransform(168.9339,244.0419);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FF7F69").s().p("AhVANQhAhkAlgSQAlgSAWA0QALAYAGAFQAzgpAqgOQAqgOASARQAWASgaAvQggA4heBUQgogvgggzg");
	this.shape_610.setTransform(168.9339,244.0419);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f().s("#000000").ss(2.4,1,1).p("AhphiQAjgRAVAwQAKAXAFAEQAwgmAogNQAmgNASAPQAUASgZArQgdA1hYBOQglgsgfgvQg8heAjgQg");
	this.shape_611.setTransform(168.9421,240.4123);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FF7F69").s().p("AhQAMQg8heAjgQQAjgRAVAwQAKAXAFAEQAwgmAogNQAmgNASAPQAUASgZArQgdA1hYBOQglgsgfgvg");
	this.shape_612.setTransform(168.9421,240.4123);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f().s("#000000").ss(2.4,1,1).p("AhihbQAhgQATAtQAJAVAFAEQAtgkAlgMQAkgMAQAPQATAQgXAoQgbAxhSBJQgjgpgcgsQg4hXAggPg");
	this.shape_613.setTransform(168.933,236.7748);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#FF7F69").s().p("AhKALQg4hXAggPQAhgQATAtQAJAVAFAEQAtgkAlgMQAkgMAQAPQATAQgXAoQgbAxhSBJQgjgpgcgsg");
	this.shape_614.setTransform(168.933,236.7748);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f().s("#000000").ss(2.4,1,1).p("AhahUQAegPASAqQAIATAFAEQApghAigLQAigLAPANQARAPgVAmQgZAthMBDQggglgagpQg0hRAegOg");
	this.shape_615.setTransform(168.9489,233.1373);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#FF7F69").s().p("AhEALQg0hRAegOQAegPASAqQAIATAFAEQApghAigLQAigLAPANQARAPgVAmQgZAthMBDQggglgagpg");
	this.shape_616.setTransform(168.9489,233.1373);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f().s("#000000").ss(2.4,1,1).p("AhThOQAcgNAQAmQAIASAEAEQAmgeAggLQAegKAOAMQAQAOgTAjQgXAphGA+QgegigYgmQgwhKAcgOg");
	this.shape_617.setTransform(168.9347,229.4843);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#FF7F69").s().p("Ag/AKQgwhKAcgOQAcgNAQAmQAIASAEAEQAmgeAggLQAegKAOAMQAQAOgTAjQgXAphGA+QgegigYgmg");
	this.shape_618.setTransform(168.9347,229.4843);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f().s("#000000").ss(2.4,1,1).p("AhMhHQAagMAOAjQAIARAEADQAigcAdgJQAcgKANAMQAOAMgRAgQgWAlg/A5QgcgfgVgjQgshDAZgNg");
	this.shape_619.setTransform(168.9256,225.8468);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#FF7F69").s().p("Ag5AJQgshDAZgNQAagMAOAjQAIARAEADQAigcAdgJQAcgKANAMQAOAMgRAgQgWAlg/A5QgcgfgVgjg");
	this.shape_620.setTransform(168.9256,225.8468);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f().s("#000000").ss(2.4,1,1).p("AhFhAQAXgLAOAfQAHAPADADQAfgZAagJQAZgIAMAKQAOAMgRAcQgTAig6A0QgYgdgUgfQgog9AXgLg");
	this.shape_621.setTransform(168.9339,222.2172);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#FF7F69").s().p("Ag0AIQgog9AXgLQAXgLAOAfQAHAPADADQAfgZAagJQAZgIAMAKQAOAMgRAcQgTAig6A0QgYgdgUgfg");
	this.shape_622.setTransform(168.9339,222.2172);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f().s("#000000").ss(2.4,1,1).p("Ag+g5QAVgKAMAcQAGAOADACQAcgWAXgIQAXgIALAKQAMAKgPAZQgRAfg0AuQgWgagRgcQgkg2AUgKg");
	this.shape_623.setTransform(168.9363,218.5797);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#FF7F69").s().p("AguAHQgkg2AUgKQAVgKAMAcQAGAOADACQAcgWAXgIQAXgIALAKQAMAKgPAZQgRAfg0AuQgWgagRgcg");
	this.shape_624.setTransform(168.9363,218.5797);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f().s("#000000").ss(2.4,1,1).p("AAVgmQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUg");
	this.shape_625.setTransform(164.159,260.3362,0.2672,0.2672);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#FF7F69").s().p("AhqAIQheijBJgMQA/gLAdBbQAPArAGAJQANARAWgUQAjglArgGQApgGAPAbQAQAeggA1QgmBBhjBSQg9hQgvhSg");
	this.shape_626.setTransform(164.159,260.3362,0.2672,0.2672);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f().s("#000000").ss(2.4,1,1).p("Agsg6QAWgEAKAfQAFAQADADQAEAGAHgHQANgNAPgCQAOgDAFAKQAGALgMASQgNAXgjAcQgUgcgRgdQghg4AagEg");
	this.shape_627.setTransform(164.1661,256.2025);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FF7F69").s().p("AglACQghg4AagEQAWgEAKAfQAFAQADADQAEAGAHgHQANgNAPgCQAOgDAFAKQAGALgMASQgNAXgjAcQgUgcgRgdg");
	this.shape_628.setTransform(164.1661,256.2025);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f().s("#000000").ss(2.4,1,1).p("Ag3hIQAbgFANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAGANQAHANgOAWQgQAdgrAjQgagigVgkQgphHAggFg");
	this.shape_629.setTransform(164.1653,252.0267);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#FF7F69").s().p("AguAEQgphHAggFQAbgFANAnQAHAUACADQAGAIAJgJQAPgQATgDQASgDAGANQAHANgOAWQgQAdgrAjQgagigVgkg");
	this.shape_630.setTransform(164.1653,252.0267);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f().s("#000000").ss(2.4,1,1).p("AhBhWQAggGAPAvQAIAXADAEQAHAKALgLQASgTAWgDQAWgEAHAOQAIAQgQAbQgUAigzAqQgfgpgZgrQgwhUAmgGg");
	this.shape_631.setTransform(164.1709,247.8962);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#FF7F69").s().p("Ag3AEQgwhUAmgGQAggGAPAvQAIAXADAEQAHAKALgLQASgTAWgDQAWgEAHAOQAIAQgQAbQgUAigzAqQgfgpgZgrg");
	this.shape_632.setTransform(164.1709,247.8962);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f().s("#000000").ss(2.4,1,1).p("AhMhlQAlgGASA2QAJAbAEAFQAIALANgNQAVgWAagEQAZgEAJARQAJASgTAgQgXAng8AxQgkgwgdgxQg4hjAsgHg");
	this.shape_633.setTransform(164.1815,243.7654);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#FF7F69").s().p("AhAAFQg4hjAsgHQAlgGASA2QAJAbAEAFQAIALANgNQAVgWAagEQAZgEAJARQAJASgTAgQgXAng8AxQgkgwgdgxg");
	this.shape_634.setTransform(164.1815,243.7654);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f().s("#000000").ss(2.4,1,1).p("AhXhzQArgHAUA+QAKAfAFAFQAJAMAOgNQAZgaAdgEQAcgFALATQAKAVgWAkQgaAthEA4Qgpg3ghg4QhAhwAygJg");
	this.shape_635.setTransform(164.1858,239.5895);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#FF7F69").s().p("AhJAGQhAhwAygJQArgHAUA+QAKAfAFAFQAJAMAOgNQAZgaAdgEQAcgFALATQAKAVgWAkQgaAthEA4Qgpg3ghg4g");
	this.shape_636.setTransform(164.1858,239.5895);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f().s("#000000").ss(2.4,1,1).p("AhiiBQAwgIAXBFQAMAiAEAHQALANAQgPQAbgdAhgFQAggFAMAWQAMAXgZApQgdAyhNA/Qgug9glhAQhIh+A4gJg");
	this.shape_637.setTransform(164.185,235.4587);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#FF7F69").s().p("AhSAGQhIh+A4gJQAwgIAXBFQAMAiAEAHQALANAQgPQAbgdAhgFQAggFAMAWQAMAXgZApQgdAyhNA/Qgug9glhAg");
	this.shape_638.setTransform(164.185,235.4587);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f().s("#000000").ss(2.4,1,1).p("AhsiPQA1gJAZBNQANAmAFAHQALAPATgRQAeggAlgGQAjgFANAXQANAagbAuQghA3hVBGQgzhEgphGQhQiMA/gKg");
	this.shape_639.setTransform(164.1893,231.3279);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#FF7F69").s().p("AhbAHQhQiMA/gKQA1gJAZBNQANAmAFAHQALAPATgRQAeggAlgGQAjgFANAXQANAagbAuQghA3hVBGQgzhEgphGg");
	this.shape_640.setTransform(164.1893,231.3279);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f().s("#000000").ss(2.4,1,1).p("Ah4idQA7gKAcBVQAOApAGAIQAMAQAUgTQAhgiApgGQAngGANAZQAPAdgeAyQgkA9hdBNQg5hLgshNQhYiaBEgLg");
	this.shape_641.setTransform(164.2057,227.1974);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#FF7F69").s().p("AhkAIQhYiaBEgLQA7gKAcBVQAOApAGAIQAMAQAUgTQAhgiApgGQAngGANAZQAPAdgeAyQgkA9hdBNQg5hLgshNg");
	this.shape_642.setTransform(164.2057,227.1974);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f().s("#000000").ss(2.4,1,1).p("AiCisQBAgLAeBdQAPAtAHAJQANASAXgVQAkgmArgGQArgHAPAcQAQAfghA3QgnBChlBUQg/hSgvhUQhhinBLgNg");
	this.shape_643.setTransform(164.199,223.0168);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#FF7F69").s().p("AhsAIQhhinBLgNQBAgLAeBdQAPAtAHAJQANASAXgVQAkgmArgGQArgHAPAcQAQAfghA3QgnBChlBUQg/hSgvhUg");
	this.shape_644.setTransform(164.199,223.0168);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f().s("#000000").ss(2.4,1,1).p("AiNi6QBGgMAgBlQAQAwAIAKQAOATAYgWQAngpAwgHQAugHAQAeQARAhgjA8QgqBHhuBbQhEhYgzhbQhpi1BRgOg");
	this.shape_645.setTransform(164.1955,218.886);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#FF7F69").s().p("Ah1AJQhpi1BRgOQBGgMAgBlQAQAwAIAKQAOATAYgWQAngpAwgHQAugHAQAeQARAhgjA8QgqBHhuBbQhEhYgzhbg");
	this.shape_646.setTransform(164.1955,218.886);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f().s("#000000").ss(2.4,1,1).p("AiYjIQBLgNAjBsQARA0AIAKQAPAVAbgYQAqgsAzgIQAxgHARAgQATAkgmBAQgtBNh3BiQhIhfg4hiQhwjDBXgOg");
	this.shape_647.setTransform(164.2026,214.7552);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#FF7F69").s().p("Ah/AJQhwjDBXgOQBLgNAjBsQARA0AIAKQAPAVAbgYQAqgsAzgIQAxgHARAgQATAkgmBAQgtBNh3BiQhIhfg4hig");
	this.shape_648.setTransform(164.2026,214.7552);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f().s("#000000").ss(2.4,1,1).p("AijjWQBQgOAmB0QASA4AJALQAQAWAdgaQAsgvA3gIQA1gIATAjQAUAmgpBFQgxBSh+BpQhOhmg8hpQh4jRBdgPg");
	this.shape_649.setTransform(164.2103,210.5794);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#FF7F69").s().p("AiIAKQh4jRBdgPQBQgOAmB0QASA4AJALQAQAWAdgaQAsgvA3gIQA1gIATAjQAUAmgpBFQgxBSh+BpQhOhmg8hpg");
	this.shape_650.setTransform(164.2103,210.5794);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f().s("#000000").ss(2.4,1,1).p("AitjkQBVgPAoB7QAUA8AIAMQASAXAegbQAwgyA6gJQA5gJAUAmQAVApgrBJQg0BYiHBvQhThshAhwQiAjfBkgQg");
	this.shape_651.setTransform(164.2174,206.4485);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#FF7F69").s().p("AiRALQiAjfBkgQQBVgPAoB7QAUA8AIAMQASAXAegbQAwgyA6gJQA5gJAUAmQAVApgrBJQg0BYiHBvQhThshAhwg");
	this.shape_652.setTransform(164.2174,206.4485);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f().s("#000000").ss(2.4,1,1).p("Ai4jzQBagPArCDQAVA/AJAMQATAZAggdQAzg1A+gJQA8gJAVAnQAWArguBOQg3BdiPB3QhYhzhEh3QiIjsBqgSg");
	this.shape_653.setTransform(164.2151,202.318);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#FF7F69").s().p("AiaALQiIjsBqgSQBagPArCDQAVA/AJAMQATAZAggdQAzg1A+gJQA8gJAVAnQAWArguBOQg3BdiPB3QhYhzhEh3g");
	this.shape_654.setTransform(164.2151,202.318);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f().s("#000000").ss(2.4,1,1).p("AjDkBQBggQAtCLQAWBDAKANQAUAaAigeQA2g5BBgKQA/gJAXApQAYAugxBTQg6BiiYB+Qhdh6hIh9QiQj7BwgTg");
	this.shape_655.setTransform(164.2222,198.1422);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#FF7F69").s().p("AijANQiQj7BwgTQBggQAtCLQAWBDAKANQAUAaAigeQA2g5BBgKQA/gJAXApQAYAugxBTQg6BiiYB+Qhdh6hIh9g");
	this.shape_656.setTransform(164.2222,198.1422);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f().s("#000000").ss(2.4,1,1).p("AjBj+QBfgQAsCJQAWBCAKANQAUAaAigeQA0g4BBgKQA/gJAWApQAYAugxBRQg5BhiWB8Qhch4hHh8QiOj3BugTg");
	this.shape_657.setTransform(164.2214,188.5661);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#FF7F69").s().p("AihAMQiOj3BugTQBfgQAsCJQAWBCAKANQAUAaAigeQA0g4BBgKQA/gJAWApQAYAugxBRQg5BhiWB8Qhch4hHh8g");
	this.shape_658.setTransform(164.2214,188.5661);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f().s("#000000").ss(2.4,1,1).p("AizjsQBYgPApB/QAVA+AJAMQASAYAfgcQAyg0A8gJQA6gJAVAnQAWAqgtBMQg2BaiLB0QhWhwhCh0QiEjmBngRg");
	this.shape_659.setTransform(164.2088,183.1211);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#FF7F69").s().p("AiWALQiEjmBngRQBYgPApB/QAVA+AJAMQASAYAfgcQAyg0A8gJQA6gJAVAnQAWAqgtBMQg2BaiLB0QhWhwhCh0g");
	this.shape_660.setTransform(164.2088,183.1211);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f().s("#000000").ss(2.4,1,1).p("AimjbQBRgNAnB1QATA5AIAMQARAWAdgaQAugwA3gIQA3gJATAkQAUAngqBGQgxBUiBBrQhQhog9hrQh6jVBfgQg");
	this.shape_661.setTransform(164.2115,177.6804);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#FF7F69").s().p("AiLAKQh6jVBfgQQBRgNAnB1QATA5AIAMQARAWAdgaQAugwA3gIQA3gJATAkQAUAngqBGQgxBUiBBrQhQhog9hrg");
	this.shape_662.setTransform(164.2115,177.6804);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f().s("#000000").ss(2.4,1,1).p("AiYjJQBLgNAjBtQASA0AHAKQAQAVAagYQAqgsA0gIQAxgHASAgQATAkgmBBQguBNh3BjQhJhgg4hiQhxjFBYgOg");
	this.shape_663.setTransform(164.1903,172.2354);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#FF7F69").s().p("Ah/AKQhxjFBYgOQBLgNAjBtQASA0AHAKQAQAVAagYQAqgsA0gIQAxgHASAgQATAkgmBBQguBNh3BjQhJhgg4hig");
	this.shape_664.setTransform(164.1903,172.2354);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f().s("#000000").ss(2.4,1,1).p("AiLi4QBEgLAhBjQAQAwAHAJQAOATAYgWQAngoAugHQAugHAQAeQARAhgjA7QgqBGhsBaQhDhXgzhaQhnizBQgOg");
	this.shape_665.setTransform(164.193,166.7902);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#FF7F69").s().p("Ah0AJQhnizBQgOQBEgLAhBjQAQAwAHAJQAOATAYgWQAngoAugHQAugHAQAeQARAhgjA7QgqBGhsBaQhDhXgzhag");
	this.shape_666.setTransform(164.193,166.7902);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f().s("#000000").ss(2.4,1,1).p("Ah+imQA+gLAdBaQAPAsAGAIQANARAWgUQAjgkAqgHQApgGAPAbQAPAegfA1QgmBAhiBSQg9hPguhSQhdiiBIgMg");
	this.shape_667.setTransform(164.1926,161.3451);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#FF7F69").s().p("AhpAIQhdiiBIgMQA+gLAdBaQAPAsAGAIQANARAWgUQAjgkAqgHQApgGAPAbQAPAegfA1QgmBAhiBSQg9hPguhSg");
	this.shape_668.setTransform(164.1926,161.3451);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f().s("#000000").ss(2.4,1,1).p("AhxiUQA4gKAaBQQANAnAGAIQALAQAUgSQAfghAmgGQAlgGANAZQAOAagdAwQghA5hZBJQg1hHgqhJQhUiRBBgKg");
	this.shape_669.setTransform(164.1878,155.8996);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#FF7F69").s().p("AheAHQhUiRBBgKQA4gKAaBQQANAnAGAIQALAQAUgSQAfghAmgGQAlgGANAZQAOAagdAwQghA5hZBJQg1hHgqhJg");
	this.shape_670.setTransform(164.1878,155.8996);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f().s("#000000").ss(2.4,1,1).p("AhjiDQAxgJAXBHQALAjAFAGQAKAOARgQQAcgdAigFQAggFAMAWQAMAXgZAqQgeAzhOBAQgvg+glhBQhKiAA6gJg");
	this.shape_671.setTransform(164.1875,150.4546);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#FF7F69").s().p("AhTAGQhKiAA6gJQAxgJAXBHQALAjAFAGQAKAOARgQQAcgdAigFQAggFAMAWQAMAXgZAqQgeAzhOBAQgvg+glhBg");
	this.shape_672.setTransform(164.1875,150.4546);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f().s("#000000").ss(2.4,1,1).p("AhWhyQAqgHAUA9QAKAeAFAGQAJAMAOgOQAYgZAdgEQAdgFAKATQAKAVgWAkQgZAshEA3Qgpg2ggg4QhAhvAygIg");
	this.shape_673.setTransform(164.1902,145.0092);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#FF7F69").s().p("AhIAFQhAhvAygIQAqgHAUA9QAKAeAFAGQAJAMAOgOQAYgZAdgEQAdgFAKATQAKAVgWAkQgZAshEA3Qgpg2ggg4g");
	this.shape_674.setTransform(164.1902,145.0092);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f().s("#000000").ss(2.4,1,1).p("AhJhgQAkgHARA1QAJAZADAFQAIAKAMgMQAUgVAZgEQAYgDAIAPQAJASgSAeQgWAmg5AvQgjgugbgvQg2hfAqgGg");
	this.shape_675.setTransform(164.1689,139.5642);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#FF7F69").s().p("Ag9AFQg2hfAqgGQAkgHARA1QAJAZADAFQAIAKAMgMQAUgVAZgEQAYgDAIAPQAJASgSAeQgWAmg5AvQgjgugbgvg");
	this.shape_676.setTransform(164.1689,139.5642);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f().s("#000000").ss(2.4,1,1).p("Ag8hPQAegFAOArQAHAVADAEQAGAIAKgJQAQgSAVgDQATgDAHANQAIAOgPAZQgSAfgvAmQgdglgWgnQgshNAigGg");
	this.shape_677.setTransform(164.1717,134.1237);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#FF7F69").s().p("AgyAEQgshNAigGQAegFAOArQAHAVADAEQAGAIAKgJQAQgSAVgDQATgDAHANQAIAOgPAZQgSAfgvAmQgdglgWgng");
	this.shape_678.setTransform(164.1717,134.1237);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f().s("#000000").ss(2.4,1,1).p("Agug9QAXgEALAhQAFARACACQAFAHAHgHQAOgOAQgCQAPgDAFAKQAGALgMAUQgOAYglAeQgVgdgSgfQgjg8AcgEg");
	this.shape_679.setTransform(164.159,128.6787);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#FF7F69").s().p("AgnADQgjg8AcgEQAXgEALAhQAFARACACQAFAHAHgHQAOgOAQgCQAPgDAFAKQAGALgMAUQgOAYglAeQgVgdgSgfg");
	this.shape_680.setTransform(164.159,128.6787);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f().s("#000000").ss(2.4,1,1).p("AhNhIQAZgMAQAjQAHARAEADQAkgcAcgJQAdgKANAMQAPAMgTAgQgVAmhBA6QgbgggXgjQgshEAagNg");
	this.shape_681.setTransform(168.928,267.5872);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#FF7F69").s().p("Ag7AJQgshEAagNQAZgMAQAjQAHARAEADQAkgcAcgJQAdgKANAMQAPAMgTAgQgVAmhBA6QgbgggXgjg");
	this.shape_682.setTransform(168.928,267.5872);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f().s("#000000").ss(2.4,1,1).p("AhphiQAjgRAVAwQAKAXAFAFQAwgnAogNQAmgNARAQQAVARgZAsQgdAzhYBPQglgsgegvQg8hdAigRg");
	this.shape_683.setTransform(168.9372,258.564);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#FF7F69").s().p("AhPAMQg8hdAigRQAjgRAVAwQAKAXAFAFQAwgnAogNQAmgNARAQQAVARgZAsQgdAzhYBPQglgsgegvg");
	this.shape_684.setTransform(168.9372,258.564);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f().s("#000000").ss(2.4,1,1).p("Ah5hxQAogUAYA4QALAaAHAFQA4gsAtgPQAsgPAVASQAXAUgcAyQgiA9hmBaQgrgygjg3QhFhsAogTg");
	this.shape_685.setTransform(168.9347,253.1215);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#FF7F69").s().p("AhcAOQhFhsAogTQAogUAYA4QALAaAHAFQA4gsAtgPQAsgPAVASQAXAUgcAyQgiA9hmBaQgrgygjg3g");
	this.shape_686.setTransform(168.9347,253.1215);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_606,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}},{t:this.shape_605,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}}]}).to({state:[{t:this.shape_606,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}},{t:this.shape_605,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}}]},9).to({state:[{t:this.shape_608},{t:this.shape_607}]},1).to({state:[{t:this.shape_610},{t:this.shape_609}]},1).to({state:[{t:this.shape_612},{t:this.shape_611}]},1).to({state:[{t:this.shape_614},{t:this.shape_613}]},1).to({state:[{t:this.shape_616},{t:this.shape_615}]},1).to({state:[{t:this.shape_618},{t:this.shape_617}]},1).to({state:[{t:this.shape_620},{t:this.shape_619}]},1).to({state:[{t:this.shape_622},{t:this.shape_621}]},1).to({state:[{t:this.shape_624},{t:this.shape_623}]},1).to({state:[{t:this.shape_606,p:{scaleX:0.4308,scaleY:0.4308,x:168.9323,y:214.9434}},{t:this.shape_605,p:{scaleX:0.4308,scaleY:0.4308,x:168.9323,y:214.9434}}]},1).to({state:[]},1).to({state:[{t:this.shape_626,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:260.3362}},{t:this.shape_625,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:260.3362}}]},2).to({state:[{t:this.shape_628},{t:this.shape_627}]},1).to({state:[{t:this.shape_630},{t:this.shape_629}]},1).to({state:[{t:this.shape_632},{t:this.shape_631}]},1).to({state:[{t:this.shape_634},{t:this.shape_633}]},1).to({state:[{t:this.shape_636},{t:this.shape_635}]},1).to({state:[{t:this.shape_638},{t:this.shape_637}]},1).to({state:[{t:this.shape_640},{t:this.shape_639}]},1).to({state:[{t:this.shape_642},{t:this.shape_641}]},1).to({state:[{t:this.shape_644},{t:this.shape_643}]},1).to({state:[{t:this.shape_646},{t:this.shape_645}]},1).to({state:[{t:this.shape_648},{t:this.shape_647}]},1).to({state:[{t:this.shape_650},{t:this.shape_649}]},1).to({state:[{t:this.shape_652},{t:this.shape_651}]},1).to({state:[{t:this.shape_654},{t:this.shape_653}]},1).to({state:[{t:this.shape_656},{t:this.shape_655}]},1).to({state:[{t:this.shape_626,p:{scaleX:1.6159,scaleY:1.6159,x:164.2126,y:194.0157}},{t:this.shape_625,p:{scaleX:1.6159,scaleY:1.6159,x:164.2126,y:194.0157}}]},1).to({state:[{t:this.shape_658},{t:this.shape_657}]},1).to({state:[{t:this.shape_660},{t:this.shape_659}]},1).to({state:[{t:this.shape_662},{t:this.shape_661}]},1).to({state:[{t:this.shape_664},{t:this.shape_663}]},1).to({state:[{t:this.shape_666},{t:this.shape_665}]},1).to({state:[{t:this.shape_668},{t:this.shape_667}]},1).to({state:[{t:this.shape_670},{t:this.shape_669}]},1).to({state:[{t:this.shape_672},{t:this.shape_671}]},1).to({state:[{t:this.shape_674},{t:this.shape_673}]},1).to({state:[{t:this.shape_676},{t:this.shape_675}]},1).to({state:[{t:this.shape_678},{t:this.shape_677}]},1).to({state:[{t:this.shape_680},{t:this.shape_679}]},1).to({state:[{t:this.shape_626,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:123.2362}},{t:this.shape_625,p:{scaleX:0.2672,scaleY:0.2672,x:164.159,y:123.2362}}]},1).to({state:[]},1).to({state:[{t:this.shape_606,p:{scaleX:0.3077,scaleY:0.3077,x:168.9127,y:280.2403}},{t:this.shape_605,p:{scaleX:0.3077,scaleY:0.3077,x:168.9127,y:280.2403}}]},18).to({state:[{t:this.shape_682},{t:this.shape_681}]},1).to({state:[{t:this.shape_684},{t:this.shape_683}]},1).to({state:[{t:this.shape_686},{t:this.shape_685}]},1).to({state:[{t:this.shape_606,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}},{t:this.shape_605,p:{scaleX:1,scaleY:1,x:168.9355,y:251.3186}}]},1).wait(1));

	// schnur_pered
	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("ADgNVQgPnIgBhTQgFkegNiiQgRjsgniWQhglzkFAs");
	this.shape_687.setTransform(469.35,459.6717);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjftOQEFgsBgFzQAnCWARDsQANCiAFEeQABBTAPHG");
	this.shape_688.setTransform(469.35,459.3967);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjftNQEFgsBgFzQAnCWASDsQAMCiAFEeQACBTAOHE");
	this.shape_689.setTransform(469.325,459.1467);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjftNQEFgrBgFzQAnCWASDsQAMCiAFEdQACBTAOHD");
	this.shape_690.setTransform(469.325,458.8717);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjftMQEFgrBgFzQAnCWASDsQAMCiAFEdQACBTAOHC");
	this.shape_691.setTransform(469.325,458.5967);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjftLQEFgsBgFzQAnCWASDsQAMCiAFEeQACBTAOHA");
	this.shape_692.setTransform(469.325,458.3217);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetKQEEgsBhFzQAnCWARDsQAMCiAGEeQABBTAOG+");
	this.shape_693.setTransform(469.3,458.0717);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetJQEEgsBhFzQAnCWARDsQAMCiAGEeQABBTAOG8");
	this.shape_694.setTransform(469.3,457.7967);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetIQEEgsBhFzQAnCWARDsQAMCiAGEeQABBTAOG6");
	this.shape_695.setTransform(469.3,457.4967);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetIQEEgrBhFzQAnCWARDsQAMCiAGEdQABBTAOG5");
	this.shape_696.setTransform(469.3,457.2217);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetHQEEgrBhFzQAnCWARDsQAMCiAGEdQABBTANG3");
	this.shape_697.setTransform(469.275,456.9717);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetGQEEgrBhFzQAnCWARDsQAMCiAGEdQABBTANG2");
	this.shape_698.setTransform(469.275,456.6967);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetFQEEgsBhFzQAnCWARDsQAMCiAGEeQABBTANG0");
	this.shape_699.setTransform(469.275,456.4217);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetEQEEgsBhFzQAnCWARDsQAMCiAGEeQABBTANGy");
	this.shape_700.setTransform(469.275,456.1467);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetDQEFgsBgFzQAnCWARDsQANCiAFEeQACBTAMGw");
	this.shape_701.setTransform(469.25,455.8967);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("ADfNIQgMmvgChTQgFkdgNiiQgRjsgniWQhglzkFAr");
	this.shape_702.setTransform(469.25,455.6217);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetAQEEgrBhFxQAnCWARDqQAMCiAGEcQACBSAMGv");
	this.shape_703.setTransform(469.3,455.4006);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes8QEEgrBhFvQAnCVARDpQAMChAGEaQABBTANGt");
	this.shape_704.setTransform(469.325,455.1745);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes4QEEgrBhFtQAnCUARDpQAMCfAGEZQABBSANGt");
	this.shape_705.setTransform(469.375,454.9487);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes1QEEgrBhFsQAnCTARDnQAMCfAGEYQABBRAOGs");
	this.shape_706.setTransform(469.4,454.7026);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsyQEFgqBgFqQAnCSASDmQAMCeAFEWQACBRANGs");
	this.shape_707.setTransform(469.45,454.5017);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsuQEFgqBgFoQAnCRASDlQAMCdAFEVQACBQAOGr");
	this.shape_708.setTransform(469.475,454.2556);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsrQEFgpBgFmQAnCQASDkQAMCcAFEUQACBQAOGq");
	this.shape_709.setTransform(469.525,454.0344);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsnQEFgqBgFkQAnCQASDjQAMCbAFESQACBQAOGp");
	this.shape_710.setTransform(469.55,453.8037);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfskQEFgpBgFiQAnCPARDiQANCaAFERQABBPAPGp");
	this.shape_711.setTransform(469.6,453.5825);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsgQEEgqBhFhQAnCOARDgQAMCaAGEPQABBPAPGp");
	this.shape_712.setTransform(469.675,453.3814);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsdQEEgpBhFfQAnCOARDeQAMCZAGEOQABBPAPGn");
	this.shape_713.setTransform(469.7,453.1353);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsaQEEgoBhFcQAnCNARDeQAMCYAGEMQABBPAPGn");
	this.shape_714.setTransform(469.75,452.9142);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsWQEFgpBgFbQAnCNASDcQAMCXAFELQACBOAQGm");
	this.shape_715.setTransform(469.775,452.6834);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsTQEFgoBgFZQAnCLASDcQAMCWAFEKQACBNAQGm");
	this.shape_716.setTransform(469.825,452.4623);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsPQEEgoBhFXQAnCLARDaQAMCVAGEJQABBNARGk");
	this.shape_717.setTransform(469.85,452.2164);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsMQEFgoBgFWQAnCKASDYQAMCVAFEHQACBMAQGl");
	this.shape_718.setTransform(469.9,452.0153);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsIQEEgoBhFUQAnCJARDXQAMCUAGEGQABBMARGj");
	this.shape_719.setTransform(469.925,451.7692);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsFQEEgnBhFSQAnCIARDXQAMCTAGEEQABBLARGj");
	this.shape_720.setTransform(469.975,451.5433);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjhsBQEFgoBhFQQAmCIASDVQAMCSAFEDQACBLASGi");
	this.shape_721.setTransform(470,451.3172);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("ADiMDQgSmhgChLQgFkBgMiSQgSjUgmiHQhhlOkFAn");
	this.shape_722.setTransform(470.05,451.0961);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajhr/QEFgnBhFOQAmCIASDUQAMCSAFEBQACBLASGi");
	this.shape_723.setTransform(470,451.3211);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajgr/QEEgnBhFPQAnCHARDUQAMCSAGECQABBLARGi");
	this.shape_724.setTransform(469.975,451.4967);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjhsAQEFgnBhFPQAnCHARDVQAMCSAGECQABBLASGi");
	this.shape_725.setTransform(469.95,451.7217);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsBQEEgnBhFPQAnCIARDVQAMCSAGECQABBMARGi");
	this.shape_726.setTransform(469.925,451.942);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsBQEEgoBhFQQAnCIARDVQAMCTAGECQABBLARGj");
	this.shape_727.setTransform(469.875,452.1422);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsCQEEgnBhFQQAnCIARDVQAMCTAGEDQABBLARGj");
	this.shape_728.setTransform(469.85,452.3472);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsDQEEgoBhFRQAnCIARDWQAMCTAGEDQABBLARGj");
	this.shape_729.setTransform(469.825,452.5675);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsEQEEgnBhFRQAnCIARDWQAMCTAGEDQABBMARGj");
	this.shape_730.setTransform(469.8,452.7678);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsFQEEgnBhFRQAnCJARDWQAMCTAGEEQACBLAQGk");
	this.shape_731.setTransform(469.75,452.9681);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsFQEEgoBhFSQAnCJARDWQAMCUAGEDQACBMAQGk");
	this.shape_732.setTransform(469.75,453.1933);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsGQEFgnBgFSQAnCIARDXQANCUAFEEQACBMAQGj");
	this.shape_733.setTransform(469.7,453.3933);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsHQEFgnBgFSQAnCJASDXQAMCUAFEEQACBMAQGk");
	this.shape_734.setTransform(469.65,453.5936);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsHQEFgoBgFTQAnCJASDYQAMCTAFEFQACBMAQGk");
	this.shape_735.setTransform(469.625,453.7939);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsIQEEgoBhFTQAnCJARDYQAMCUAGEFQABBMARGk");
	this.shape_736.setTransform(469.6,454.0142);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsJQEFgoBgFUQAnCJASDYQAMCUAFEGQACBMAQGk");
	this.shape_737.setTransform(469.575,454.2392);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsKQEFgnBgFUQAnCJASDYQAMCVAFEFQACBMAQGl");
	this.shape_738.setTransform(469.525,454.4194);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsKQEEgoBhFUQAnCKARDYQAMCVAGEGQABBMAPGl");
	this.shape_739.setTransform(469.5,454.6398);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjgsLQEFgoBgFUQAnCKASDZQAMCVAFEGQACBMAQGl");
	this.shape_740.setTransform(469.475,454.8648);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsMQEEgoBhFWQAnCJARDaQAMCUAGEHQABBMAPGl");
	this.shape_741.setTransform(469.45,455.0403);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("ADhMSQgQmmgBhMQgGkHgMiVQgRjZgniKQhhlWkEAo");
	this.shape_742.setTransform(469.4,455.2653);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsPQEEgpBhFXQAnCLARDbQAMCVAGEIQABBNAQGm");
	this.shape_743.setTransform(469.4,455.4361);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsSQEEgoBhFYQAnCLARDcQAMCWAGEJQABBNAPGn");
	this.shape_744.setTransform(469.375,455.5919);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsVQEEgpBhFaQAnCMARDdQAMCXAGEKQABBNAPGn");
	this.shape_745.setTransform(469.375,455.7628);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsYQEEgpBhFcQAnCNARDdQAMCYAGELQABBOAPGn");
	this.shape_746.setTransform(469.375,455.9337);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsbQEFgpBgFeQAnCNARDeQANCZAFEMQABBOAPGo");
	this.shape_747.setTransform(469.35,456.0848);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfseQEFgpBgFfQAnCOARDfQANCZAFEOQABBOAPGp");
	this.shape_748.setTransform(469.35,456.2603);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfshQEFgpBgFhQAnCOARDgQANCaAFEPQABBPAPGp");
	this.shape_749.setTransform(469.35,456.4114);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsjQEFgqBgFiQAnCPASDiQAMCaAFEQQACBPAOGq");
	this.shape_750.setTransform(469.325,456.5823);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfsmQEFgqBgFjQAnCQASDiQAMCcAFERQACBPAOGq");
	this.shape_751.setTransform(469.325,456.7531);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfspQEFgqBgFlQAnCQASDkQAMCbAFETQACBQAOGr");
	this.shape_752.setTransform(469.325,456.9339);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjfssQEFgqBgFmQAnCRASDkQAMCdAFEUQACBQAOGr");
	this.shape_753.setTransform(469.325,457.1048);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjesvQEEgqBhFoQAnCSARDlQAMCdAGEVQABBRAOGr");
	this.shape_754.setTransform(469.3,457.2756);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjesyQEEgqBhFqQAnCSARDmQAMCeAGEWQABBRAOGs");
	this.shape_755.setTransform(469.3,457.4267);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes1QEEgqBhFrQAnCTARDnQAMCeAGEYQABBRAOGt");
	this.shape_756.setTransform(469.3,457.6023);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes4QEEgqBhFtQAnCTARDoQAMCfAGEZQABBSANGt");
	this.shape_757.setTransform(469.275,457.7534);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes6QEEgrBhFuQAnCUARDpQAMCgAGEaQABBSANGu");
	this.shape_758.setTransform(469.275,457.9242);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ajes9QEEgrBhFwQAnCVARDqQAMCgAGEbQABBTANGu");
	this.shape_759.setTransform(469.275,458.0951);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AjetAQEFgrBgFxQAnCVARDrQANCiAFEcQACBTAMGu");
	this.shape_760.setTransform(469.25,458.2509);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_687}]}).to({state:[{t:this.shape_688}]},1).to({state:[{t:this.shape_689}]},1).to({state:[{t:this.shape_690}]},1).to({state:[{t:this.shape_691}]},1).to({state:[{t:this.shape_692}]},1).to({state:[{t:this.shape_693}]},1).to({state:[{t:this.shape_694}]},1).to({state:[{t:this.shape_695}]},1).to({state:[{t:this.shape_696}]},1).to({state:[{t:this.shape_697}]},1).to({state:[{t:this.shape_698}]},1).to({state:[{t:this.shape_699}]},1).to({state:[{t:this.shape_700}]},1).to({state:[{t:this.shape_701}]},1).to({state:[{t:this.shape_702,p:{y:455.6217}}]},1).to({state:[{t:this.shape_703}]},1).to({state:[{t:this.shape_704}]},1).to({state:[{t:this.shape_705}]},1).to({state:[{t:this.shape_706}]},1).to({state:[{t:this.shape_707}]},1).to({state:[{t:this.shape_708}]},1).to({state:[{t:this.shape_709}]},1).to({state:[{t:this.shape_710}]},1).to({state:[{t:this.shape_711}]},1).to({state:[{t:this.shape_712}]},1).to({state:[{t:this.shape_713}]},1).to({state:[{t:this.shape_714}]},1).to({state:[{t:this.shape_715}]},1).to({state:[{t:this.shape_716}]},1).to({state:[{t:this.shape_717}]},1).to({state:[{t:this.shape_718}]},1).to({state:[{t:this.shape_719}]},1).to({state:[{t:this.shape_720}]},1).to({state:[{t:this.shape_721}]},1).to({state:[{t:this.shape_722}]},1).to({state:[{t:this.shape_723}]},1).to({state:[{t:this.shape_724}]},1).to({state:[{t:this.shape_725}]},1).to({state:[{t:this.shape_726}]},1).to({state:[{t:this.shape_727}]},1).to({state:[{t:this.shape_728}]},1).to({state:[{t:this.shape_729}]},1).to({state:[{t:this.shape_730}]},1).to({state:[{t:this.shape_731}]},1).to({state:[{t:this.shape_732}]},1).to({state:[{t:this.shape_733}]},1).to({state:[{t:this.shape_734}]},1).to({state:[{t:this.shape_735}]},1).to({state:[{t:this.shape_736}]},1).to({state:[{t:this.shape_737}]},1).to({state:[{t:this.shape_738}]},1).to({state:[{t:this.shape_739}]},1).to({state:[{t:this.shape_740}]},1).to({state:[{t:this.shape_741}]},1).to({state:[{t:this.shape_742}]},1).to({state:[{t:this.shape_743}]},1).to({state:[{t:this.shape_744}]},1).to({state:[{t:this.shape_745}]},1).to({state:[{t:this.shape_746}]},1).to({state:[{t:this.shape_747}]},1).to({state:[{t:this.shape_748}]},1).to({state:[{t:this.shape_749}]},1).to({state:[{t:this.shape_750}]},1).to({state:[{t:this.shape_751}]},1).to({state:[{t:this.shape_752}]},1).to({state:[{t:this.shape_753}]},1).to({state:[{t:this.shape_754}]},1).to({state:[{t:this.shape_755}]},1).to({state:[{t:this.shape_756}]},1).to({state:[{t:this.shape_757}]},1).to({state:[{t:this.shape_758}]},1).to({state:[{t:this.shape_759}]},1).to({state:[{t:this.shape_760}]},1).to({state:[{t:this.shape_702,p:{y:458.4217}}]},1).wait(1));

	// schnur_pered_1
	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f().s("#000000").ss(2.4,1,1).p("ADfNIQgMmvgChTQgGkdgMiiQgRjsgniWQhhlzkEAr");
	this.shape_761.setTransform(470.0914,458.1615,1.0731,1.024);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f().s("#000000").ss(2.4,1,1).p("AjutXQEXgsBoF7QAqCaATDyQAMCmAGEkQACBVANG5");
	this.shape_762.setTransform(470.075,457.9665);
	this.shape_762._off = true;

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f().s("#000000").ss(2.4,1,1).p("AjutSQEXgsBoF5QAqCZATDxQAMClAGEiQACBVANG3");
	this.shape_763.setTransform(470.125,454.9453);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f().s("#000000").ss(2.4,1,1).p("AjutOQEXgsBoF4QAqCYATDvQAMClAGEhQACBUANG1");
	this.shape_764.setTransform(470.125,454.6442);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f().s("#000000").ss(2.4,1,1).p("AjutKQEXgrBoF1QAqCYATDuQAMCjAGEgQACBUANGz");
	this.shape_765.setTransform(470.175,454.3481);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f().s("#000000").ss(2.4,1,1).p("AjutFQEXgsBoF0QAqCXATDsQAMCjAGEeQACBUANGw");
	this.shape_766.setTransform(470.175,454.0423);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f().s("#000000").ss(2.4,1,1).p("AjutBQEXgsBoFyQAqCXATDrQAMCiAGEdQACBSANGv");
	this.shape_767.setTransform(470.225,453.7212);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus9QEXgrBoFwQAqCVATDqQAMChAGEcQACBSANGs");
	this.shape_768.setTransform(470.275,453.4001);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus4QEXgrBoFuQAqCUATDpQAMChAGEZQACBTANGp");
	this.shape_769.setTransform(470.275,453.099);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus1QEXgqBoFsQAqCUATDnQAMCgAGEYQACBSANGo");
	this.shape_770.setTransform(470.325,452.8028);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f().s("#000000").ss(2.4,1,1).p("AjuswQEXgrBoFqQAqCUATDmQAMCfAGEXQACBRANGl");
	this.shape_771.setTransform(470.325,452.5017);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f().s("#000000").ss(2.4,1,1).p("AjussQEXgqBoFpQAqCSATDlQAMCeAGEVQACBRANGj");
	this.shape_772.setTransform(470.375,452.1809);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f().s("#000000").ss(2.4,1,1).p("AjusoQEXgqBoFnQAqCRATDlQAMCcAGEUQACBRANGh");
	this.shape_773.setTransform(470.425,451.855);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f().s("#000000").ss(2.4,1,1).p("AjusjQEXgqBoFlQAqCQATDjQAMCcAGETQACBQANGe");
	this.shape_774.setTransform(470.425,451.5539);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f().s("#000000").ss(2.4,1,1).p("AjusfQEXgqBoFjQAqCQATDiQAMCbAGERQACBPANGd");
	this.shape_775.setTransform(470.475,451.2578);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f().s("#000000").ss(2.4,1,1).p("AjusbQEXgpBoFhQAqCPATDgQAMCbAGEPQACBPANGb");
	this.shape_776.setTransform(470.475,450.9567);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f().s("#000000").ss(2.4,1,1).p("AjusWQEXgpBoFfQAqCOATDfQAMCaAGEOQACBPANGY");
	this.shape_777.setTransform(470.525,450.6356);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f().s("#000000").ss(2.4,1,1).p("AjusSQEXgpBoFdQAqCOATDeQAMCYAGENQACBOANGW");
	this.shape_778.setTransform(470.575,450.3144);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f().s("#000000").ss(2.4,1,1).p("AjusOQEXgpBoFcQAqCMATDdQAMCYAGELQACBOANGU");
	this.shape_779.setTransform(470.575,450.0087);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f().s("#000000").ss(2.4,1,1).p("AjusKQEXgoBoFZQAqCMATDcQAMCXAGEKQACBNANGS");
	this.shape_780.setTransform(470.625,449.7125);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f().s("#000000").ss(2.4,1,1).p("AjusFQEXgpBoFYQAqCLATDaQAMCXAGEIQACBNANGP");
	this.shape_781.setTransform(470.625,449.4114);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f().s("#000000").ss(2.4,1,1).p("AjusCQEXgoBoFWQAqCLATDZQAMCWAGEHQACBMANGO");
	this.shape_782.setTransform(470.625,449.3156);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f().s("#000000").ss(2.4,1,1).p("AjusDQEXgoBoFWQAqCLATDaQAMCVAGEIQACBNANGO");
	this.shape_783.setTransform(470.625,449.5609);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f().s("#000000").ss(2.4,1,1).p("AjusEQEXgoBoFXQAqCLATDaQAMCWAGEIQACBMANGP");
	this.shape_784.setTransform(470.575,449.7658);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f().s("#000000").ss(2.4,1,1).p("AjusEQEXgoBoFXQAqCLATDaQAMCWAGEIQACBNANGP");
	this.shape_785.setTransform(470.575,449.9911);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f().s("#000000").ss(2.4,1,1).p("AjusFQEXgpBoFYQAqCLATDbQAMCWAGEIQACBNANGQ");
	this.shape_786.setTransform(470.525,450.2367);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f().s("#000000").ss(2.4,1,1).p("AjusGQEXgpBoFYQAqCMATDaQAMCXAGEJQACBNANGP");
	this.shape_787.setTransform(470.475,450.4617);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f().s("#000000").ss(2.4,1,1).p("AjusHQEXgoBoFYQAqCMATDaQAMCXAGEJQACBNANGQ");
	this.shape_788.setTransform(470.475,450.6669);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f().s("#000000").ss(2.4,1,1).p("AjusIQEXgpBoFZQAqCMATDbQAMCXAGEJQACBOANGQ");
	this.shape_789.setTransform(470.425,450.9123);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f().s("#000000").ss(2.4,1,1).p("AjusJQEXgoBoFZQAqCMATDbQAMCXAGEKQACBNANGR");
	this.shape_790.setTransform(470.425,451.1373);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f().s("#000000").ss(2.4,1,1).p("AjusKQEXgoBoFZQAqCMATDcQAMCXAGEKQACBOANGR");
	this.shape_791.setTransform(470.375,451.3875);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f().s("#000000").ss(2.4,1,1).p("AjusLQEXgoBoFaQAqCMATDcQAMCXAGELQACBNANGS");
	this.shape_792.setTransform(470.325,451.5881);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f().s("#000000").ss(2.4,1,1).p("AjusMQEXgoBoFaQAqCNATDcQAMCXAGELQACBNANGT");
	this.shape_793.setTransform(470.325,451.8131);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f().s("#000000").ss(2.4,1,1).p("AjusNQEXgpBoFbQAqCNATDdQAMCXAGELQACBOANGT");
	this.shape_794.setTransform(470.275,452.0584);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f().s("#000000").ss(2.4,1,1).p("AjusOQEXgoBoFbQAqCNATDdQAMCXAGELQACBOANGU");
	this.shape_795.setTransform(470.275,452.2636);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f().s("#000000").ss(2.4,1,1).p("AjusOQEXgpBoFcQAqCNATDdQAMCYAGELQACBOANGU");
	this.shape_796.setTransform(470.225,452.4889);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f().s("#000000").ss(2.4,1,1).p("AjusPQEXgpBoFcQAqCNATDeQAMCXAGEMQACBOANGV");
	this.shape_797.setTransform(470.175,452.7342);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f().s("#000000").ss(2.4,1,1).p("AjusQQEXgpBoFdQAqCNATDdQAMCYAGEMQACBPANGU");
	this.shape_798.setTransform(470.175,452.9595);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f().s("#000000").ss(2.4,1,1).p("AjusRQEXgpBoFdQAqCNATDeQAMCZAGEMQACBOANGV");
	this.shape_799.setTransform(470.125,453.1644);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f().s("#000000").ss(2.4,1,1).p("AjusSQEXgpBoFdQAqCOATDeQAMCYAGENQACBPANGV");
	this.shape_800.setTransform(470.125,453.4098);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f().s("#000000").ss(2.4,1,1).p("AjusWQEXgqBoFgQAqCOATDgQAMCZAGEOQACBPANGY");
	this.shape_801.setTransform(470.075,453.8809);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f().s("#000000").ss(2.4,1,1).p("AjusaQEXgpBoFhQAqCOATDhQAMCaAGEPQACBPANGa");
	this.shape_802.setTransform(470.075,454.1117);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f().s("#000000").ss(2.4,1,1).p("AjuseQEXgpBoFiQAqCQATDhQAMCbAGERQACBPANGc");
	this.shape_803.setTransform(470.075,454.3575);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f().s("#000000").ss(2.4,1,1).p("AjushQEXgqBoFkQAqCQATDjQAMCbAGESQACBQANGd");
	this.shape_804.setTransform(470.075,454.6034);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f().s("#000000").ss(2.4,1,1).p("AjuslQEXgqBoFmQAqCRATDjQAMCdAGETQACBQANGf");
	this.shape_805.setTransform(470.075,454.8295);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f().s("#000000").ss(2.4,1,1).p("AjusoQEXgqBoFnQAqCRATDlQAMCdAGEUQACBQANGi");
	this.shape_806.setTransform(470.075,455.08);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f().s("#000000").ss(2.4,1,1).p("AjuswQEXgqBoFqQAqCTATDmQAMCfAGEWQACBSANGl");
	this.shape_807.setTransform(470.075,455.552);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f().s("#000000").ss(2.4,1,1).p("AjuszQEXgrBoFsQAqCUATDnQAMCfAGEYQACBSANGn");
	this.shape_808.setTransform(470.075,455.7979);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus3QEXgqBoFtQAqCUATDpQAMCfAGEZQACBSANGp");
	this.shape_809.setTransform(470.075,456.0036);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus6QEXgrBoFvQAqCVATDqQAMCgAGEaQACBSANGr");
	this.shape_810.setTransform(470.075,456.2495);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f().s("#000000").ss(2.4,1,1).p("Ajus9QEXgsBoFxQAqCVATDrQAMChAGEbQACBTANGs");
	this.shape_811.setTransform(470.075,456.4954);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f().s("#000000").ss(2.4,1,1).p("AjutBQEXgsBoFzQAqCWATDrQAMCiAGEdQACBTANGu");
	this.shape_812.setTransform(470.075,456.7215);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f().s("#000000").ss(2.4,1,1).p("AjutFQEXgrBoFzQAqCXATDtQAMCiAGEeQACBTANGw");
	this.shape_813.setTransform(470.075,456.972);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f().s("#000000").ss(2.4,1,1).p("AjutIQEXgsBoF2QAqCXATDtQAMCkAGEfQACBTANGy");
	this.shape_814.setTransform(470.075,457.1981);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f().s("#000000").ss(2.4,1,1).p("AjutMQEXgsBoF3QAqCYATDvQAMCkAGEgQACBUANG0");
	this.shape_815.setTransform(470.075,457.444);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f().s("#000000").ss(2.4,1,1).p("AjutPQEXgtBoF5QAqCZATDvQAMClAGEhQACBVANG1");
	this.shape_816.setTransform(470.075,457.6898);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f().s("#000000").ss(2.4,1,1).p("AjutTQEXgsBoF6QAqCZATDwQAMCmAGEiQACBVANG4");
	this.shape_817.setTransform(470.075,457.9206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_761}]}).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_761}]},1).to({state:[{t:this.shape_763}]},1).to({state:[{t:this.shape_764}]},1).to({state:[{t:this.shape_765}]},1).to({state:[{t:this.shape_766}]},1).to({state:[{t:this.shape_767}]},1).to({state:[{t:this.shape_768}]},1).to({state:[{t:this.shape_769}]},1).to({state:[{t:this.shape_770}]},1).to({state:[{t:this.shape_771}]},1).to({state:[{t:this.shape_772,p:{x:470.375,y:452.1809}}]},1).to({state:[{t:this.shape_773}]},1).to({state:[{t:this.shape_774}]},1).to({state:[{t:this.shape_775}]},1).to({state:[{t:this.shape_776}]},1).to({state:[{t:this.shape_777}]},1).to({state:[{t:this.shape_778}]},1).to({state:[{t:this.shape_779}]},1).to({state:[{t:this.shape_780}]},1).to({state:[{t:this.shape_781}]},1).to({state:[{t:this.shape_761}]},1).to({state:[{t:this.shape_782}]},1).to({state:[{t:this.shape_783}]},1).to({state:[{t:this.shape_784}]},1).to({state:[{t:this.shape_785}]},1).to({state:[{t:this.shape_786}]},1).to({state:[{t:this.shape_787}]},1).to({state:[{t:this.shape_788}]},1).to({state:[{t:this.shape_789}]},1).to({state:[{t:this.shape_790}]},1).to({state:[{t:this.shape_791}]},1).to({state:[{t:this.shape_792}]},1).to({state:[{t:this.shape_793}]},1).to({state:[{t:this.shape_794}]},1).to({state:[{t:this.shape_795}]},1).to({state:[{t:this.shape_796}]},1).to({state:[{t:this.shape_797}]},1).to({state:[{t:this.shape_798}]},1).to({state:[{t:this.shape_799}]},1).to({state:[{t:this.shape_800}]},1).to({state:[{t:this.shape_761}]},1).to({state:[{t:this.shape_801}]},1).to({state:[{t:this.shape_802}]},1).to({state:[{t:this.shape_803}]},1).to({state:[{t:this.shape_804}]},1).to({state:[{t:this.shape_805}]},1).to({state:[{t:this.shape_806}]},1).to({state:[{t:this.shape_772,p:{x:470.075,y:455.3061}}]},1).to({state:[{t:this.shape_807}]},1).to({state:[{t:this.shape_808}]},1).to({state:[{t:this.shape_809}]},1).to({state:[{t:this.shape_810}]},1).to({state:[{t:this.shape_811}]},1).to({state:[{t:this.shape_812}]},1).to({state:[{t:this.shape_813}]},1).to({state:[{t:this.shape_814}]},1).to({state:[{t:this.shape_815}]},1).to({state:[{t:this.shape_816}]},1).to({state:[{t:this.shape_817}]},1).to({state:[{t:this.shape_761}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_761).to({_off:true},1).wait(14).to({_off:false,y:455.2615},0).to({_off:true},1).wait(19).to({_off:false,scaleY:0.9213,x:470.6914,y:449.079},0).to({_off:true},1).wait(19).to({_off:false,scaleY:0.9427,x:470.0914,y:453.6523},0).to({_off:true},1).wait(18).to({_off:false,scaleY:1.024,y:458.1615},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_762).wait(1).to({_off:false},0).wait(1).to({y:457.7665},0).wait(1).to({y:457.5665},0).wait(1).to({y:457.4165},0).wait(1).to({y:457.2165},0).wait(1).to({y:457.0165},0).wait(1).to({y:456.8165},0).wait(1).to({y:456.6165},0).wait(1).to({y:456.4165},0).wait(1).to({y:456.2165},0).wait(1).to({y:456.0165},0).wait(1).to({y:455.8665},0).wait(1).to({y:455.6665},0).wait(1).to({y:455.4665},0).to({_off:true},1).wait(60));

	// schnur_pered_2
	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f().s("#000000").ss(2.4,1,1).p("ADfNIQgMmvgChTQgGkdgMiiQgRjsgniWQhhlzkEAr");
	this.shape_818.setTransform(468.4681,460.4217,0.9425,1);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f().s("#000000").ss(2.4,1,1).p("AjRtDQD1grBbFzQAlCWAQDsQAMCiAFEdQABBTAMGv");
	this.shape_819.setTransform(468.475,460.2217);
	this.shape_819._off = true;

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs/QD1grBbFxQAlCWAQDqQAMCiAFEcQABBSAMGt");
	this.shape_820.setTransform(468.525,457.3256);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs6QD1grBbFvQAlCUAQDqQAMCgAFEbQABBSAMGr");
	this.shape_821.setTransform(468.525,457.0245);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs2QD1grBbFtQAlCUAQDpQAMCfAFEZQABBSAMGp");
	this.shape_822.setTransform(468.525,456.7237);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsyQD1grBbFsQAlCTAQDnQAMCfAFEYQABBRAMGm");
	this.shape_823.setTransform(468.575,456.4026);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsuQD1gqBbFqQAlCSAQDmQAMCeAFEWQABBRAMGk");
	this.shape_824.setTransform(468.625,456.1267);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsqQD1gqBbFoQAlCSAQDkQAMCdAFEVQABBRAMGi");
	this.shape_825.setTransform(468.625,455.8056);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsmQD1gpBbFmQAlCQAQDkQAMCcAFEUQABBQAMGg");
	this.shape_826.setTransform(468.675,455.5094);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f().s("#000000").ss(2.4,1,1).p("AjRshQD1gqBbFkQAlCQAQDjQAMCbAFESQABBQAMGd");
	this.shape_827.setTransform(468.675,455.2037);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsdQD1gqBbFjQAlCPAQDhQAMCbAFEQQABBQAMGb");
	this.shape_828.setTransform(468.675,454.9075);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsZQD1gpBbFgQAlCPAQDgQAMCaAFEPQABBPAMGZ");
	this.shape_829.setTransform(468.725,454.6314);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsVQD1gpBbFfQAlCOAQDeQAMCZAFEOQABBPAMGX");
	this.shape_830.setTransform(468.775,454.3103);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsRQD1goBbFcQAlCNAQDeQAMCYAFEMQABBPAMGV");
	this.shape_831.setTransform(468.775,454.0142);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsMQD1gpBbFbQAlCMAQDdQAMCXAFELQABBOAMGS");
	this.shape_832.setTransform(468.775,453.7084);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsIQD1gpBbFZQAlCMAQDbQAMCXAFEJQABBOAMGQ");
	this.shape_833.setTransform(468.825,453.4123);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsEQD1goBbFYQAlCKAQDaQAMCWAFEIQABBNAMGO");
	this.shape_834.setTransform(468.875,453.0914);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsAQD1goBbFWQAlCKAQDYQAMCVAFEHQABBMAMGN");
	this.shape_835.setTransform(468.875,452.8153);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr7QD1goBbFUQAlCJAQDXQAMCUAFEGQABBMAMGK");
	this.shape_836.setTransform(468.925,452.4942);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr3QD1goBbFSQAlCJAQDWQAMCTAFEEQABBMAMGI");
	this.shape_837.setTransform(468.925,452.1933);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f().s("#000000").ss(2.4,1,1).p("AjRrzQD1gnBbFQQAlCHAQDWQAMCSAFECQABBMAMGF");
	this.shape_838.setTransform(468.925,451.8922);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f().s("#000000").ss(2.4,1,1).p("AjRrwQD1gnBbFOQAlCIAQDUQAMCSAFEBQABBLAMGE");
	this.shape_839.setTransform(468.925,451.8211);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f().s("#000000").ss(2.4,1,1).p("AjRrxQD1gnBbFPQAlCHAQDVQAMCSAFEBQABBMAMGE");
	this.shape_840.setTransform(468.925,452.0217);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f().s("#000000").ss(2.4,1,1).p("AjRryQD1gnBbFPQAlCIAQDVQAMCSAFEBQABBMAMGF");
	this.shape_841.setTransform(468.925,452.2717);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f().s("#000000").ss(2.4,1,1).p("AjRryQD1goBbFQQAlCIAQDVQAMCSAFECQABBLAMGG");
	this.shape_842.setTransform(468.875,452.492);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f().s("#000000").ss(2.4,1,1).p("AjRrzQD1goBbFQQAlCIAQDVQAMCTAFECQABBLAMGG");
	this.shape_843.setTransform(468.875,452.7172);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr0QD1gnBbFQQAlCIAQDVQAMCTAFEDQABBLAMGG");
	this.shape_844.setTransform(468.825,452.9222);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr1QD1gnBbFQQAlCJAQDVQAMCTAFEDQABBMAMGG");
	this.shape_845.setTransform(468.775,453.1425);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr2QD1gnBbFRQAlCIAQDWQAMCTAFEDQABBMAMGH");
	this.shape_846.setTransform(468.775,453.3928);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr3QD1gnBbFRQAlCJAQDWQAMCTAFEEQABBLAMGI");
	this.shape_847.setTransform(468.775,453.5931);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr4QD1gnBbFSQAlCIAQDXQAMCTAFEEQABBMAMGI");
	this.shape_848.setTransform(468.725,453.8183);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr4QD1goBbFSQAlCJAQDXQAMCTAFEEQABBMAMGJ");
	this.shape_849.setTransform(468.675,454.0433);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr5QD1goBbFTQAlCJAQDXQAMCUAFEEQABBMAMGJ");
	this.shape_850.setTransform(468.675,454.2436);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr6QD1goBbFTQAlCJAQDYQAMCTAFEFQABBMAMGK");
	this.shape_851.setTransform(468.675,454.4939);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr7QD1goBbFTQAlCJAQDYQAMCUAFEFQABBMAMGK");
	this.shape_852.setTransform(468.625,454.7142);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr8QD1goBbFUQAlCJAQDYQAMCUAFEGQABBMAMGK");
	this.shape_853.setTransform(468.625,454.9392);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr9QD1gnBbFUQAlCJAQDYQAMCVAFEFQABBMAMGL");
	this.shape_854.setTransform(468.575,455.1444);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr+QD1goBbFVQAlCJAQDZQAMCUAFEGQABBMAMGM");
	this.shape_855.setTransform(468.525,455.3648);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f().s("#000000").ss(2.4,1,1).p("AjRr/QD1goBbFVQAlCKAQDZQAMCUAFEGQABBMAMGN");
	this.shape_856.setTransform(468.525,455.6148);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsAQD1goBbFWQAlCJAQDaQAMCUAFEHQABBMAMGN");
	this.shape_857.setTransform(468.525,455.8153);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsEQD1goBbFXQAlCLAQDaQAMCWAFEHQABBNAMGP");
	this.shape_858.setTransform(468.475,456.2861);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsHQD1goBbFYQAlCLAQDcQAMCWAFEJQABBNAMGR");
	this.shape_859.setTransform(468.475,456.4919);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsLQD1goBbFaQAlCMAQDcQAMCXAFEKQABBOAMGS");
	this.shape_860.setTransform(468.475,456.7378);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsOQD1gpBbFbQAlCNAQDdQAMCYAFELQABBOAMGV");
	this.shape_861.setTransform(468.475,456.9837);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsSQD1gpBbFeQAlCNAQDeQAMCZAFEMQABBOAMGW");
	this.shape_862.setTransform(468.475,457.1848);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsVQD1gpBbFeQAlCOAQDfQAMCaAFENQABBPAMGY");
	this.shape_863.setTransform(468.475,457.4353);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsZQD1gpBbFhQAlCOAQDgQAMCaAFEPQABBPAMGZ");
	this.shape_864.setTransform(468.475,457.6364);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f().s("#000000").ss(2.4,1,1).p("AjRscQD1gqBbFiQAlCPAQDiQAMCaAFEQQABBPAMGc");
	this.shape_865.setTransform(468.475,457.8823);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsgQD1gqBbFkQAlCQAQDiQAMCbAFERQABBQAMGd");
	this.shape_866.setTransform(468.475,458.1281);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsjQD1gqBbFlQAlCQAQDkQAMCbAFETQABBQAMGf");
	this.shape_867.setTransform(468.475,458.3339);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsnQD1gqBbFnQAlCRAQDkQAMCcAFEUQABBRAMGg");
	this.shape_868.setTransform(468.475,458.5798);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsqQD1grBbFoQAlCSAQDlQAMCdAFEVQABBRAMGj");
	this.shape_869.setTransform(468.475,458.8256);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f().s("#000000").ss(2.4,1,1).p("AjRsxQD1grBbFrQAlCTAQDnQAMCfAFEXQABBSAMGm");
	this.shape_870.setTransform(468.475,459.2773);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs1QD1gqBbFtQAlCTAQDoQAMCfAFEZQABBSAMGn");
	this.shape_871.setTransform(468.475,459.4784);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs4QD1grBbFuQAlCUAQDpQAMCgAFEaQABBSAMGq");
	this.shape_872.setTransform(468.475,459.7242);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs8QD1grBbFwQAlCVAQDqQAMCgAFEbQABBTAMGr");
	this.shape_873.setTransform(468.475,459.9701);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f().s("#000000").ss(2.4,1,1).p("AjRs/QD1grBbFxQAlCVAQDrQAMCiAFEcQABBTAMGt");
	this.shape_874.setTransform(468.475,460.1759);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_818}]}).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_819}]},1).to({state:[{t:this.shape_818}]},1).to({state:[{t:this.shape_820}]},1).to({state:[{t:this.shape_821}]},1).to({state:[{t:this.shape_822}]},1).to({state:[{t:this.shape_823}]},1).to({state:[{t:this.shape_824,p:{x:468.625,y:456.1267}}]},1).to({state:[{t:this.shape_825}]},1).to({state:[{t:this.shape_826}]},1).to({state:[{t:this.shape_827}]},1).to({state:[{t:this.shape_828}]},1).to({state:[{t:this.shape_829}]},1).to({state:[{t:this.shape_830}]},1).to({state:[{t:this.shape_831}]},1).to({state:[{t:this.shape_832}]},1).to({state:[{t:this.shape_833}]},1).to({state:[{t:this.shape_834}]},1).to({state:[{t:this.shape_835}]},1).to({state:[{t:this.shape_836}]},1).to({state:[{t:this.shape_837}]},1).to({state:[{t:this.shape_838}]},1).to({state:[{t:this.shape_818}]},1).to({state:[{t:this.shape_839}]},1).to({state:[{t:this.shape_840}]},1).to({state:[{t:this.shape_841}]},1).to({state:[{t:this.shape_842}]},1).to({state:[{t:this.shape_843}]},1).to({state:[{t:this.shape_844}]},1).to({state:[{t:this.shape_845}]},1).to({state:[{t:this.shape_846}]},1).to({state:[{t:this.shape_847}]},1).to({state:[{t:this.shape_848}]},1).to({state:[{t:this.shape_849}]},1).to({state:[{t:this.shape_850}]},1).to({state:[{t:this.shape_851}]},1).to({state:[{t:this.shape_852}]},1).to({state:[{t:this.shape_853}]},1).to({state:[{t:this.shape_854}]},1).to({state:[{t:this.shape_855}]},1).to({state:[{t:this.shape_856}]},1).to({state:[{t:this.shape_857}]},1).to({state:[{t:this.shape_818}]},1).to({state:[{t:this.shape_858}]},1).to({state:[{t:this.shape_859}]},1).to({state:[{t:this.shape_860}]},1).to({state:[{t:this.shape_861}]},1).to({state:[{t:this.shape_862}]},1).to({state:[{t:this.shape_863}]},1).to({state:[{t:this.shape_864}]},1).to({state:[{t:this.shape_865}]},1).to({state:[{t:this.shape_866}]},1).to({state:[{t:this.shape_867}]},1).to({state:[{t:this.shape_868}]},1).to({state:[{t:this.shape_869}]},1).to({state:[{t:this.shape_824,p:{x:468.475,y:459.0267}}]},1).to({state:[{t:this.shape_870}]},1).to({state:[{t:this.shape_871}]},1).to({state:[{t:this.shape_872}]},1).to({state:[{t:this.shape_873}]},1).to({state:[{t:this.shape_874}]},1).to({state:[{t:this.shape_818}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_818).to({_off:true},1).wait(14).to({_off:false,y:457.6217},0).to({_off:true},1).wait(19).to({_off:false,scaleY:0.8997,x:468.9681,y:451.6042},0).to({_off:true},1).wait(19).to({_off:false,scaleY:0.9207,x:468.4681,y:456.0341},0).to({_off:true},1).wait(18).to({_off:false,scaleY:1,y:460.4217},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_819).wait(1).to({_off:false},0).wait(1).to({y:460.0717},0).wait(1).to({y:459.8717},0).wait(1).to({y:459.6717},0).wait(1).to({y:459.4717},0).wait(1).to({y:459.3217},0).wait(1).to({y:459.1217},0).wait(1).to({y:458.9217},0).wait(1).to({y:458.7217},0).wait(1).to({y:458.5717},0).wait(1).to({y:458.3717},0).wait(1).to({y:458.1717},0).wait(1).to({y:457.9717},0).wait(1).to({y:457.8217},0).to({_off:true},1).wait(60));

	// mozg
	this.instance = new lib.mozg();
	this.instance.setTransform(327.2,407.9,1,1,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:404.7},15).to({y:407.9},20).to({y:411.1},20).to({y:407.9},19).wait(1));

	// ruka
	this.instance_1 = new lib.ruka();
	this.instance_1.setTransform(422.55,449.6,1,1,0,0,0,-94.3,-35);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:-94.2,scaleY:1.0066,skewX:-10.8068,skewY:-4.2353,y:447.6},35).wait(7).to({regX:-94.3,scaleY:1,skewX:0,skewY:0,y:449.6},32).wait(1));

	// bel_1_
	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#FFFFFF").s().p("AgUASQgJgHAAgLQAAgKAJgHQAIgIAMAAQAMAAAJAIQAJAHAAAKQAAALgJAHQgJAIgMAAQgMAAgIgIg");
	this.shape_875.setTransform(669.65,411.375);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#FFFFFF").s().p("AAAAgQgPgCgKgKQgKgKABgMQAAgNALgJQALgIAOABQAOABAKAKQAKAKAAANQgBANgMAIQgJAIgMAAIgCAAg");
	this.shape_876.setTransform(669.8999,411.319);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#FFFFFF").s().p("AgCAmQgRgCgLgNQgLgMABgPQACgQAMgJQANgKAQACQARADALAMQALANgBAPQgBAPgNAKQgKAHgNAAIgGAAg");
	this.shape_877.setTransform(670.1293,411.2337);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#FFFFFF").s().p("AgDAsQgUgEgMgPQgMgPACgRQACgSAPgLQAOgKATADQATAEAMAPQAMAPgCARQgCASgPALQgLAIgNAAIgIgBg");
	this.shape_878.setTransform(670.3995,411.175);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#FFFFFF").s().p("AgFAyQgVgEgOgSQgNgSADgTQACgVARgLQARgMAUAEQAWAFANASQANASgCATQgDAVgRALQgMAIgOAAIgLgBg");
	this.shape_879.setTransform(670.6494,411.0991);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#FFFFFF").s().p("AgGA4QgYgGgPgUQgOgUADgWQADgXATgNQATgMAXAFQAXAGAOAUQAPAVgDAWQgDAXgTAMQgNAJgPAAQgHAAgGgCg");
	this.shape_880.setTransform(670.8816,411.0383);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#FFFFFF").s().p("AgIA+QgagHgQgXQgPgWAEgZQAEgaAUgNQAVgNAZAGQAaAHAPAXQAQAXgEAYQgEAagVANQgNAJgQAAQgIAAgIgCg");
	this.shape_881.setTransform(671.1319,410.9862);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#FFFFFF").s().p("AgKBEQgcgIgQgZQgRgZAFgbQAEgdAXgOQAXgOAbAHQAcAIAQAaQARAZgEAbQgFAdgXAOQgOAIgRAAQgJAAgKgCg");
	this.shape_882.setTransform(671.3822,410.8926);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#FFFFFF").s().p("AgLBKQgegJgSgcQgSgcAFgdQAFgfAZgPQAZgPAdAIQAeAJASAcQASAcgFAdQgFAggZAPQgQAJgSAAQgJAAgLgDg");
	this.shape_883.setTransform(671.6317,410.84);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#FFFFFF").s().p("AgNBQQgggKgTgfQgTgeAGggQAFghAbgRQAbgQAgAKQAgAKATAfQATAegGAgQgGAigbAQQgQAKgTAAQgKAAgNgEg");
	this.shape_884.setTransform(671.8647,410.775);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#FFFFFF").s().p("AgOBVQgjgKgUghQgUghAGgjQAHgkAcgRQAdgRAiALQAjALAUAhQAUAigGAhQgHAlgdARQgRAKgTAAQgMAAgOgFg");
	this.shape_885.setTransform(672.1145,410.7066);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#FFFFFF").s().p("AgQBcQglgMgVgkQgVgjAHglQAHgnAfgSQAfgSAkAMQAkAMAWAkQAVAkgHAkQgHAngfASQgTALgUAAQgNAAgPgFg");
	this.shape_886.setTransform(672.3798,410.6411);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#FFFFFF").s().p("AgRBhQgngMgXgmQgWgmAIgoQAHgpAhgTQAhgTAmANQAnANAWAnQAXAmgIAnQgHApghATQgTALgVAAQgPAAgQgGg");
	this.shape_887.setTransform(672.6138,410.574);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#FFFFFF").s().p("AgTBnQgpgOgYgoQgXgpAIgqQAIgrAjgUQAjgUApAOQApAOAXApQAYApgIApQgJAsgjAUQgUAMgWAAQgPAAgSgHg");
	this.shape_888.setTransform(672.8637,410.5082);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#FFFFFF").s().p("AgMBnQgqgJgZglQgaglAGgrQAFgrAigXQAhgXAoAJQApAKAaAlQAZAmgFApQgGAsghAXQgXARgbAAQgLAAgMgEg");
	this.shape_889.setTransform(672.5595,410.6519);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#FFFFFF").s().p("AgFBoQgqgFgbgiQgbghADgrQACgrAfgbQAggbAoAFQApAFAbAiQAcAigDApQgDAsgfAbQgbAXghAAIgLgBg");
	this.shape_890.setTransform(672.2498,410.825);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#FFFFFF").s().p("AAABoQgpAAgcgeQgdgfAAgrQgBgqAegeQAdgfAoAAQApAAAdAfQAeAeAAAqQAAArgdAfQgdAegpAAIgBAAg");
	this.shape_891.setTransform(671.95,410.9754);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#FFFFFF").s().p("AhBBSQgfgbgDgsQgDgqAcghQAbgiApgFQApgEAfAbQAfAbADArQACAqgaAiQgcAhgqAFIgLAAQgiAAgagWg");
	this.shape_892.setTransform(671.6213,411.1325);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#FFFFFF").s().p("Ag8BaQghgYgGgrQgFgqAZglQAagmApgJQApgKAgAYQAiAXAEAsQAGApgZAmQgZAlgqAKQgMADgKAAQgcAAgXgRg");
	this.shape_893.setTransform(671.3093,411.3125);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#FFFFFF").s().p("Ag4BiQgigUgJgsQgIgqAYgoQAXgpApgOQApgOAjAUQAjAUAHArQAJAqgXApQgYAogqAPQgRAGgPAAQgWAAgVgMg");
	this.shape_894.setTransform(671.0054,411.475);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#FFFFFF").s().p("Ag1BdQghgTgIgqQgIgnAXgmQAXgnAmgOQAogNAhATQAhATAHAqQAIAngWAnQgXAmgoAOQgQAFgOAAQgWAAgTgLg");
	this.shape_895.setTransform(671.1302,412.5872);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#FFFFFF").s().p("AgzBYQgfgTgIgnQgHgmAWgkQAVgkAlgNQAmgNAfATQAfASAHAnQAIAmgVAlQgWAkgmANQgPAFgOAAQgUAAgTgLg");
	this.shape_896.setTransform(671.2533,413.725);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#FFFFFF").s().p("AgwBTQgegRgHgmQgHgjAVgiQAVgjAigMQAkgLAeARQAeARAGAmQAHAjgUAjQgVAigkAMQgOAFgNAAQgUAAgRgLg");
	this.shape_897.setTransform(671.38,414.8371);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#FFFFFF").s().p("AguBOQgcgRgGgjQgHgiAUgfQATghAhgLQAigLAcARQAcAQAGAjQAGAigSAgQgUAhgiALQgNAEgMAAQgTAAgRgKg");
	this.shape_898.setTransform(671.5033,415.975);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#FFFFFF").s().p("AgsBJQgagQgGghQgGgfATgeQATgfAfgKQAfgKAbAQQAaAQAFAhQAGAfgRAeQgTAfggAKQgNAEgKAAQgSAAgRgKg");
	this.shape_899.setTransform(671.6046,417.0869);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#FFFFFF").s().p("AgpBEQgZgPgFgfQgGgdASgcQARgdAegJQAdgJAZAPQAZAPAFAfQAFAdgRAcQgRAcgfAKQgLADgKAAQgRAAgPgJg");
	this.shape_900.setTransform(671.7515,418.225);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#FFFFFF").s().p("AgnA/QgWgOgFgdQgFgbAQgaQARgaAbgJQAcgIAXAOQAXAOAEAdQAFAbgQAaQgQAagdAJQgKADgJAAQgQAAgPgJg");
	this.shape_901.setTransform(671.8764,419.325);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#FFFFFF").s().p("AgkA6QgVgNgFgbQgEgZAPgYQAQgYAagIQAZgIAVAOQAWANAEAbQAEAZgPAYQgPAYgbAIQgJADgIAAQgPAAgOgJg");
	this.shape_902.setTransform(671.9763,420.4634);

	this.shape_903 = new cjs.Shape();
	this.shape_903.graphics.f("#FFFFFF").s().p("AgiA1QgTgMgEgZQgEgXAOgWQAPgWAXgHQAYgGAUAMQAUAMADAZQAEAXgOAWQgOAWgZAHQgJACgHAAQgOAAgNgIg");
	this.shape_903.setTransform(672.1262,421.5865);

	this.shape_904 = new cjs.Shape();
	this.shape_904.graphics.f("#FFFFFF").s().p("AgfAwQgSgMgEgWQgDgVANgUQAOgUAWgGQAWgGARAMQATALADAXQADAVgNAUQgNAUgXAGQgHACgHAAQgNAAgMgIg");
	this.shape_904.setTransform(672.2261,422.725);

	this.shape_905 = new cjs.Shape();
	this.shape_905.graphics.f("#FFFFFF").s().p("AgdArQgQgKgDgVQgDgTAMgSQANgSAUgFQAUgFAQALQAQAKADAVQADATgMASQgNASgUAFQgHABgFAAQgNAAgLgHg");
	this.shape_905.setTransform(672.351,423.825);

	this.shape_906 = new cjs.Shape();
	this.shape_906.graphics.f("#FFFFFF").s().p("AgaAmQgPgKgCgSQgDgRALgQQAMgQASgEQASgEAOAKQAPAJADATQACARgLAQQgLAPgTAFIgKABQgMAAgKgHg");
	this.shape_906.setTransform(672.4992,424.9644);

	this.shape_907 = new cjs.Shape();
	this.shape_907.graphics.f("#FFFFFF").s().p("AgYAhQgNgJgCgQQgCgPAKgOQALgNAQgEQAQgDANAJQANAJACAQQACAPgLAOQgJANgSAEIgHABQgMAAgJgHg");
	this.shape_907.setTransform(672.6,426.075);

	this.shape_908 = new cjs.Shape();
	this.shape_908.graphics.f("#FFFFFF").s().p("AgWAcQgLgIgBgOQgCgNAJgMQAKgLAPgDQANgDALAJQAMAIABAOQACANgKALQgJAMgPADIgFAAQgLAAgJgGg");
	this.shape_908.setTransform(672.7245,427.2156);

	this.shape_909 = new cjs.Shape();
	this.shape_909.graphics.f("#FFFFFF").s().p("AgUAXQgIgHgCgMQgBgLAJgJQAIgKAMgCQANgBAJAHQAKAHAAAMQACALgJAJQgIAKgMACIgEAAQgKAAgJgGg");
	this.shape_909.setTransform(672.85,428.325);

	this.shape_910 = new cjs.Shape();
	this.shape_910.graphics.f("#FFFFFF").s().p("AgRASQgIgGAAgKQgBgJAHgIQAIgHALgBQAKgBAHAHQAJAGAAAKQABAJgIAHQgHAIgLABIgBAAQgJAAgIgGg");
	this.shape_910.setTransform(672.9749,429.4703);

	this.shape_911 = new cjs.Shape();
	this.shape_911.graphics.f("#FFFFFF").s().p("AgOANQgHgFABgIQgBgHAHgFQAGgGAIAAQAJAAAGAGQAGAFABAHQgBAIgGAFQgGAGgJAAQgIAAgGgGg");
	this.shape_911.setTransform(673.1,430.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_875}]},24).to({state:[{t:this.shape_876}]},1).to({state:[{t:this.shape_877}]},1).to({state:[{t:this.shape_878}]},1).to({state:[{t:this.shape_879}]},1).to({state:[{t:this.shape_880}]},1).to({state:[{t:this.shape_881}]},1).to({state:[{t:this.shape_882}]},1).to({state:[{t:this.shape_883}]},1).to({state:[{t:this.shape_884}]},1).to({state:[{t:this.shape_885}]},1).to({state:[{t:this.shape_886}]},1).to({state:[{t:this.shape_887}]},1).to({state:[{t:this.shape_888}]},1).to({state:[{t:this.shape_889}]},1).to({state:[{t:this.shape_890}]},1).to({state:[{t:this.shape_891}]},1).to({state:[{t:this.shape_892}]},1).to({state:[{t:this.shape_893}]},1).to({state:[{t:this.shape_894}]},1).to({state:[{t:this.shape_895}]},1).to({state:[{t:this.shape_896}]},1).to({state:[{t:this.shape_897}]},1).to({state:[{t:this.shape_898}]},1).to({state:[{t:this.shape_899}]},1).to({state:[{t:this.shape_900}]},1).to({state:[{t:this.shape_901}]},1).to({state:[{t:this.shape_902}]},1).to({state:[{t:this.shape_903}]},1).to({state:[{t:this.shape_904}]},1).to({state:[{t:this.shape_905}]},1).to({state:[{t:this.shape_906}]},1).to({state:[{t:this.shape_907}]},1).to({state:[{t:this.shape_908}]},1).to({state:[{t:this.shape_909}]},1).to({state:[{t:this.shape_910}]},1).to({state:[{t:this.shape_911}]},1).to({state:[]},1).wait(14));

	// bel_1
	this.shape_912 = new cjs.Shape();
	this.shape_912.graphics.f("#FFFFFF").s().p("AgVASQgIgHAAgLQAAgKAIgHQAJgIAMAAQAMAAAJAIQAJAHAAAKQAAALgJAHQgJAIgMAAQgMAAgJgIg");
	this.shape_912.setTransform(646.85,386.175);

	this.shape_913 = new cjs.Shape();
	this.shape_913.graphics.f("#FFFFFF").s().p("AgDAnQgTgCgNgNQgMgNACgPQABgQAPgKQAPgKASACQATACANANQAMANgBAQQgCAPgPAKQgNAIgPAAIgFAAg");
	this.shape_913.setTransform(646.3942,386.5);

	this.shape_914 = new cjs.Shape();
	this.shape_914.graphics.f("#FFFFFF").s().p("AgHA0QgagEgQgSQgQgSADgVQAEgWAUgMQAVgMAZAEQAbAEAPASQARASgEAVQgDAWgVAMQgQAJgTAAIgLgBg");
	this.shape_914.setTransform(645.8992,386.8235);

	this.shape_915 = new cjs.Shape();
	this.shape_915.graphics.f("#FFFFFF").s().p("AgLBBQghgGgUgYQgTgXAFgaQAFgcAagOQAbgPAgAHQAhAGAUAXQAUAYgFAaQgFAbgcAOQgTALgWAAQgIAAgJgCg");
	this.shape_915.setTransform(645.449,387.1601);

	this.shape_916 = new cjs.Shape();
	this.shape_916.graphics.f("#FFFFFF").s().p("AgPBPQgogJgYgdQgXgdAHgfQAHghAggRQAhgRAnAJQAoAIAXAdQAYAdgHAfQgHAhghARQgWALgZAAQgLAAgNgCg");
	this.shape_916.setTransform(644.9574,387.4863);

	this.shape_917 = new cjs.Shape();
	this.shape_917.graphics.f("#FFFFFF").s().p("AgTBcQgvgLgbgiQgbgiAJglQAIgnAngTQAngTAtAKQAvALAbAiQAbAigIAlQgJAmgnATQgZANgeAAQgOAAgPgDg");
	this.shape_917.setTransform(644.4986,387.8076);

	this.shape_918 = new cjs.Shape();
	this.shape_918.graphics.f("#FFFFFF").s().p("AgXBpQg2gNgfgnQgegoAKgqQAKgsAtgWQAtgVA0AMQA2ANAeAnQAfAogKArQgKArgtAVQgdAOghAAQgQAAgTgEg");
	this.shape_918.setTransform(644.0375,388.132);

	this.shape_919 = new cjs.Shape();
	this.shape_919.graphics.f("#FFFFFF").s().p("AgcB2Qg8gPgigtQgigtALgvQAMgyAzgYQAzgYA7APQA9APAhAsQAjAtgMAwQgLAxg0AYQgfAPgkAAQgUAAgXgFg");
	this.shape_919.setTransform(643.5579,388.4678);

	this.shape_920 = new cjs.Shape();
	this.shape_920.graphics.f("#FFFFFF").s().p("AgfCDQhEgQgmgzQglgyANg1QAOg3A4gaQA5gbBDARQBDARAlAxQAnAzgOA2QgNA2g6AaQgjARgnAAQgXAAgZgHg");
	this.shape_920.setTransform(643.0966,388.7925);

	this.shape_921 = new cjs.Shape();
	this.shape_921.graphics.f("#FFFFFF").s().p("AgkCQQhKgTgpg3Qgqg4AQg7QAPg8A+gdQA/gcBJATQBKASAqA3QAqA4gPA8QgQA7g/AcQgnATgqAAQgaAAgdgIg");
	this.shape_921.setTransform(642.6366,389.1134);

	this.shape_922 = new cjs.Shape();
	this.shape_922.graphics.f("#FFFFFF").s().p("AgnCeQhRgVgug9Qgtg9ARhAQARhCBFgfQBFgfBQAVQBRAVAsA8QAuA9gRBBQgRBBhFAfQgpATguAAQgdAAgggIg");
	this.shape_922.setTransform(642.1463,389.442);

	this.shape_923 = new cjs.Shape();
	this.shape_923.graphics.f("#FFFFFF").s().p("AgsCrQhYgXgwhDQgxhCAThGQAShHBLghQBLgiBXAYQBXAWAxBCQAxBDgSBGQgTBGhLAhQgtAVgyAAQggAAgjgJg");
	this.shape_923.setTransform(641.6962,389.7756);

	this.shape_924 = new cjs.Shape();
	this.shape_924.graphics.f("#FFFFFF").s().p("AgwC4QhfgZg0hIQg0hHAUhLQAUhNBRgkQBRgkBdAaQBfAZA0BGQA1BIgUBMQgUBMhSAjQgwAWg1AAQgiAAgngKg");
	this.shape_924.setTransform(641.2062,390.096);

	this.shape_925 = new cjs.Shape();
	this.shape_925.graphics.f("#FFFFFF").s().p("Ag0DFQhlgbg4hNQg4hNAWhRQAWhSBWgmQBXgmBlAbQBlAbA4BMQA5BOgWBRQgWBRhYAmQgzAXg5AAQgmAAgpgLg");
	this.shape_925.setTransform(640.7461,390.4208);

	this.shape_926 = new cjs.Shape();
	this.shape_926.graphics.f("#FFFFFF").s().p("Ag1DJQhogcg5hPQg6hOAXhSQAWhUBZgnQBZgmBnAcQBoAbA4BOQA7BPgWBSQgXBThZAmQg1AYg5AAQgnAAgrgLg");
	this.shape_926.setTransform(639.0342,389.4328);

	this.shape_927 = new cjs.Shape();
	this.shape_927.graphics.f("#FFFFFF").s().p("Ag2DNQhqgdg7hQQg7hQAXhUQAXhVBagnQBbgoBqAdQBqAcA6BQQA8BQgXBUQgWBUhcAnQg1AYg7AAQgoAAgsgLg");
	this.shape_927.setTransform(637.3331,388.4334);

	this.shape_928 = new cjs.Shape();
	this.shape_928.graphics.f("#FFFFFF").s().p("Ag3DQQhsgdg9hSQg8hRAXhVQAXhWBdgpQBdgoBrAeQBtAdA8BQQA9BSgXBWQgXBVheAoQg2AYg8AAQgpAAgtgMg");
	this.shape_928.setTransform(635.6343,387.4454);

	this.shape_929 = new cjs.Shape();
	this.shape_929.graphics.f("#FFFFFF").s().p("Ag4DUQhvgeg9hTQg+hTAXhWQAYhYBegpQBggpBtAeQBvAeA+BSQA/BTgYBXQgYBYhfAoQg4AYg9AAQgqAAgugMg");
	this.shape_929.setTransform(633.9331,386.4459);

	this.shape_930 = new cjs.Shape();
	this.shape_930.graphics.f("#FFFFFF").s().p("Ag5DXQhxgeg/hVQhAhUAYhYQAYhaBhgpQBhgqBwAfQByAeA+BUQBBBVgYBYQgYBZhiApQg4AZg/AAQgrAAgvgNg");
	this.shape_930.setTransform(632.2213,385.4579);

	this.shape_931 = new cjs.Shape();
	this.shape_931.graphics.f("#FFFFFF").s().p("Ag1DMQhsgdg8hQQg8hQAXhTQAWhVBcgoQBcgnBqAdQBsAcA7BQQA+BQgXBUQgXBVhcAmQg2AYg7AAQgpAAgsgMg");
	this.shape_931.setTransform(631.0463,385.558);

	this.shape_932 = new cjs.Shape();
	this.shape_932.graphics.f("#FFFFFF").s().p("AgyDCQhmgbg5hNQg5hLAVhPQAWhQBWgmQBXglBlAbQBmAbA4BLQA6BMgVBPQgWBQhXAlQgzAXg4AAQgmAAgqgLg");
	this.shape_932.setTransform(629.8732,385.6376);

	this.shape_933 = new cjs.Shape();
	this.shape_933.graphics.f("#FFFFFF").s().p("AgvC3Qhggag1hHQg2hHAUhLQAUhMBRgjQBSgkBfAaQBgAZA1BHQA3BHgUBLQgUBMhSAiQgxAWg1AAQgkAAgngKg");
	this.shape_933.setTransform(628.6982,385.7335);

	this.shape_934 = new cjs.Shape();
	this.shape_934.graphics.f("#FFFFFF").s().p("AgsCsQhagYgzhDQgyhDAShGQAThHBMgiQBOghBZAYQBaAXAyBDQAzBDgSBGQgTBHhNAhQguAUgyAAQghAAglgJg");
	this.shape_934.setTransform(627.5215,385.8252);

	this.shape_935 = new cjs.Shape();
	this.shape_935.graphics.f("#FFFFFF").s().p("AgpChQhUgWgwg/Qgvg+ARhCQARhDBIgfQBIggBTAXQBVAVAuA/QAxA+gRBCQgSBChIAfQgrAUgvAAQgfAAgigJg");
	this.shape_935.setTransform(626.36,385.9133);

	this.shape_936 = new cjs.Shape();
	this.shape_936.graphics.f("#FFFFFF").s().p("AglCWQhPgVgsg6Qgtg6AQg9QAQg+BDgeQBDgdBNAVQBPAUAsA5QAtA7gQA9QgQA+hDAdQgoASgsAAQgdAAgfgIg");
	this.shape_936.setTransform(625.1733,386.0134);

	this.shape_937 = new cjs.Shape();
	this.shape_937.graphics.f("#FFFFFF").s().p("AgiCLQhJgTgpg2Qgpg1AOg5QAPg6A9gbQA+gcBIATQBJATAoA1QAqA2gOA5QgPA5g+AbQgmARgpAAQgaAAgcgHg");
	this.shape_937.setTransform(624.0216,386.1009);

	this.shape_938 = new cjs.Shape();
	this.shape_938.graphics.f("#FFFFFF").s().p("AgfCAQhDgRgmgxQgmgxANg0QAOg2A4gZQA5gaBCASQBDAQAlAxQAnAygNA0QgOA1g5AZQgiAQgmAAQgYAAgagHg");
	this.shape_938.setTransform(622.8329,386.1892);

	this.shape_939 = new cjs.Shape();
	this.shape_939.graphics.f("#FFFFFF").s().p("AgcB1Qg9gPgjguQgjgsAMgwQAMgwA0gYQA0gXA8APQA9APAiAtQAkAtgMAwQgMAwg0AXQggAPgjAAQgVAAgYgGg");
	this.shape_939.setTransform(621.6734,386.3054);

	this.shape_940 = new cjs.Shape();
	this.shape_940.graphics.f("#FFFFFF").s().p("AgZBqQg3gNgggpQgfgpALgqQAKgsAugWQAvgVA3ANQA3AOAfAoQAgApgKArQgLAsgvAVQgdANggAAQgTAAgVgFg");
	this.shape_940.setTransform(620.4874,386.3963);

	this.shape_941 = new cjs.Shape();
	this.shape_941.graphics.f("#FFFFFF").s().p("AgVBfQgygMgcgkQgdgkAKgmQAJgoApgTQAqgUAxAMQAxAMAcAkQAdAkgJAnQgJAngqATQgaAMgeAAQgQAAgSgEg");
	this.shape_941.setTransform(619.2985,386.4847);

	this.shape_942 = new cjs.Shape();
	this.shape_942.graphics.f("#FFFFFF").s().p("AgSBUQgsgKgZggQgZggAIghQAIgjAkgSQAlgRAqAKQAsAKAZAgQAaAfgIAjQgIAiglARQgYAMgaAAQgOAAgPgEg");
	this.shape_942.setTransform(618.1471,386.5718);

	this.shape_943 = new cjs.Shape();
	this.shape_943.graphics.f("#FFFFFF").s().p("AgPBJQgmgIgWgcQgWgbAGgdQAHgfAfgPQAggQAlAJQAmAIAWAbQAWAcgHAdQgGAfggAPQgUAKgYAAQgLAAgNgDg");
	this.shape_943.setTransform(616.9589,386.6719);

	this.shape_944 = new cjs.Shape();
	this.shape_944.graphics.f("#FFFFFF").s().p("AgMA+QgggHgTgXQgTgXAGgYQAFgaAagOQAbgNAfAHQAgAGATAXQATAXgFAZQgGAagaANQgSAKgVAAQgIAAgLgDg");
	this.shape_944.setTransform(615.7988,386.7611);

	this.shape_945 = new cjs.Shape();
	this.shape_945.graphics.f("#FFFFFF").s().p("AgJA0QgagGgQgSQgQgTAEgUQAEgWAWgLQAVgMAaAFQAaAFAPATQARATgEAUQgEAVgWAMQgPAIgRAAIgPgBg");
	this.shape_945.setTransform(614.623,386.85);

	this.shape_946 = new cjs.Shape();
	this.shape_946.graphics.f("#FFFFFF").s().p("AgFApQgVgEgNgOQgMgOADgQQACgRAQgJQARgKAUAEQAUADAMAOQANAOgCARQgDAQgRAJQgMAHgOAAIgJAAg");
	this.shape_946.setTransform(613.4486,386.9483);

	this.shape_947 = new cjs.Shape();
	this.shape_947.graphics.f("#FFFFFF").s().p("AgCAeQgPgCgKgKQgJgKABgLQACgMALgIQALgHAOABQAPACAJAKQAKAKgBALQgCAMgLAIQgJAGgMAAIgEAAg");
	this.shape_947.setTransform(612.2748,387.025);

	this.shape_948 = new cjs.Shape();
	this.shape_948.graphics.f("#FFFFFF").s().p("AgOANQgHgFAAgIQAAgHAHgFQAGgGAIAAQAJAAAGAGQAGAFABAHQgBAIgGAFQgGAGgJAAQgIAAgGgGg");
	this.shape_948.setTransform(611.1,387.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_912}]},24).to({state:[{t:this.shape_913}]},1).to({state:[{t:this.shape_914}]},1).to({state:[{t:this.shape_915}]},1).to({state:[{t:this.shape_916}]},1).to({state:[{t:this.shape_917}]},1).to({state:[{t:this.shape_918}]},1).to({state:[{t:this.shape_919}]},1).to({state:[{t:this.shape_920}]},1).to({state:[{t:this.shape_921}]},1).to({state:[{t:this.shape_922}]},1).to({state:[{t:this.shape_923}]},1).to({state:[{t:this.shape_924}]},1).to({state:[{t:this.shape_925}]},1).to({state:[{t:this.shape_926}]},1).to({state:[{t:this.shape_927}]},1).to({state:[{t:this.shape_928}]},1).to({state:[{t:this.shape_929}]},1).to({state:[{t:this.shape_930}]},1).to({state:[{t:this.shape_931}]},1).to({state:[{t:this.shape_932}]},1).to({state:[{t:this.shape_933}]},1).to({state:[{t:this.shape_934}]},1).to({state:[{t:this.shape_935}]},1).to({state:[{t:this.shape_936}]},1).to({state:[{t:this.shape_937}]},1).to({state:[{t:this.shape_938}]},1).to({state:[{t:this.shape_939}]},1).to({state:[{t:this.shape_940}]},1).to({state:[{t:this.shape_941}]},1).to({state:[{t:this.shape_942}]},1).to({state:[{t:this.shape_943}]},1).to({state:[{t:this.shape_944}]},1).to({state:[{t:this.shape_945}]},1).to({state:[{t:this.shape_946}]},1).to({state:[{t:this.shape_947}]},1).to({state:[{t:this.shape_948}]},1).to({state:[]},1).wait(14));

	// black_glaz
	this.shape_949 = new cjs.Shape();
	this.shape_949.graphics.f("#000000").s().p("AA/EyQg/gBgqgOQhNgZhAhEQgrgsg+hbQgqg3gKhBQgKhEAZhKQAcgyAzgbQAxgbBAgDQDBgDCmC1QAsAwAsA+QAeAtgBAzQAAA2gjAtQgeAxgjAcQghAZgqAPQgkANg4AAIgNgBg");
	this.shape_949.setTransform(638.7567,409.0048);

	this.shape_950 = new cjs.Shape();
	this.shape_950.graphics.f("#000000").s().p("AA/EzQg/gCgqgOQhNgZhAhEQgrgsg+hbQgqg3gKhBQgKhEAZhKQAcgyAzgbQAygbA/gDQDCgCClC1QAsAwAsA+QAeAtgBAzQAAA1gjAuQgeAwgjAdQghAZgqAOQgkANg4AAIgNAAg");
	this.shape_950.setTransform(638.9567,408.4806);

	this.shape_951 = new cjs.Shape();
	this.shape_951.graphics.f("#000000").s().p("AA/EzQg/gCgqgOQhNgZhBhEQgqgsg+hbQgqg3gKhBQgJhEAYhKQAcgyA0gbQAxgbA/gDQDCgCCmC1QArAwAsA+QAeAtgBAzQAAA2gjAtQgeAxgkAcQggAZgrAOQgkANg4AAIgMAAg");
	this.shape_951.setTransform(639.1689,407.9306);

	this.shape_952 = new cjs.Shape();
	this.shape_952.graphics.f("#000000").s().p("AA/EzQg/gCgqgOQhNgZhBhEQgrgsg9hcQgqg3gJhAQgKhEAYhLQAcgxA0gbQAxgbBAgDQDBgCCmC1QAsAwArA+QAeAtgBAzQAAA2gjAtQgeAxgkAcQggAZgrAOQgkANg4AAIgMAAg");
	this.shape_952.setTransform(639.3817,407.4306);

	this.shape_953 = new cjs.Shape();
	this.shape_953.graphics.f("#000000").s().p("AA+EzQg+gCgrgOQhMgZhBhEQgrgsg9hcQgqg3gJhAQgKhEAYhLQAdgxAzgbQAxgbBAgDQDBgCCmC1QAsAxArA+QAeAtgBAzQgBA1giAuQgeAwgkAcQggAZgrAPQgjAMg2AAIgQAAg");
	this.shape_953.setTransform(639.5817,406.8858);

	this.shape_954 = new cjs.Shape();
	this.shape_954.graphics.f("#000000").s().p("AA+EzQg+gCgrgOQhNgahAhDQgrgsg9hcQgqg3gJhBQgKhEAZhKQAcgyAzgbQAygaA/gDQDCgCClC1QAsAwArA/QAeAtgBAzQgBA1giAuQgeAwgkAcQghAZgqAPQgkAMg4AAIgNAAg");
	this.shape_954.setTransform(639.7837,406.3564);

	this.shape_955 = new cjs.Shape();
	this.shape_955.graphics.f("#000000").s().p("AA+EzQg+gCgrgOQhNgZhAhEQgrgsg9hcQgqg3gJhBQgKhEAZhKQAcgyA0gbQAxgaA/gDQDCgCClC2QAsAwArA+QAeAtgBAzQgBA2giAtQgfAwgjAdQghAZgqAOQgjAMg3AAIgPAAg");
	this.shape_955.setTransform(639.9939,405.8114);

	this.shape_956 = new cjs.Shape();
	this.shape_956.graphics.f("#000000").s().p("AA+EzQg+gCgrgOQhNgahAhEQgrgsg9hcQgqg3gJhAQgKhFAZhKQAcgxA0gbQAxgbBAgCQDBgCClC2QAsAwArA+QAeAtgBAzQgBA2giAtQgfAwgjAdQghAZgrAOQgjAMg2AAIgPAAg");
	this.shape_956.setTransform(640.1958,405.3114);

	this.shape_957 = new cjs.Shape();
	this.shape_957.graphics.f("#000000").s().p("AA+EzQg+gCgrgOQhNgahAhEQgrgsg9hcQgqg3gJhAQgKhFAZhKQAdgxAzgbQAxgbBAgCQDBgCClC2QAsAwArA/QAeAtgBAzQgBA1gjAuQgeAwgkAcQggAZgrAOQgkAMg4AAIgMAAg");
	this.shape_957.setTransform(640.3958,404.7814);

	this.shape_958 = new cjs.Shape();
	this.shape_958.graphics.f("#000000").s().p("AA9EzQg+gCgrgOQhMgahAhDQgrgtg9hcQgpg3gKhBQgKhEAZhKQAdgxAzgbQAygbA/gCQDCgCCkC2QAsAxArA+QAeAtgBAzQgBA2gjAtQgeAwgkAcQggAZgrAOQgjAMg2AAIgQAAg");
	this.shape_958.setTransform(640.5857,404.2369);

	this.shape_959 = new cjs.Shape();
	this.shape_959.graphics.f("#000000").s().p("AA9EzQg+gCgrgOQhMgahBhEQgqgsg9hcQgpg3gKhBQgJhEAZhKQAcgyA0gaQAxgbBAgDQDBgBClC2QArAxArA+QAeAtgBAzQgBA2gjAtQgeAwgkAcQggAZgrAOQgjANg2AAIgQgBg");
	this.shape_959.setTransform(640.7978,403.7119);

	this.shape_960 = new cjs.Shape();
	this.shape_960.graphics.f("#000000").s().p("AA9EzQg+gCgrgOQhNgahAhEQgqgsg9hcQgpg3gKhBQgJhEAZhKQAcgyA0gaQAxgbBAgCQDBgCClC3QArAwArA+QAeAugBAzQgBA1gjAtQgeAwgkAdQghAZgqAOQgjALg2AAIgQAAg");
	this.shape_960.setTransform(640.9978,403.1873);

	this.shape_961 = new cjs.Shape();
	this.shape_961.graphics.f("#000000").s().p("AA9EzQg+gCgrgOQhNgahAhEQgqgtg9hcQgpg3gKhBQgJhEAZhKQAdgxAzgbQAygaA/gDQDBgBClC3QArAwArA+QAeAugBAzQgBA1gjAtQgeAwgkAdQghAZgrAOQgjAMg1AAIgQgBg");
	this.shape_961.setTransform(641.1978,402.6626);

	this.shape_962 = new cjs.Shape();
	this.shape_962.graphics.f("#000000").s().p("AA8EzQg+gCgqgOQhNgahAhEQgrgtg8hcQgpg3gKhBQgJhEAZhKQAdgxAzgbQAxgaBAgDQDBgBCkC3QAsAxArA+QAeAtgBAzQgBA2gjAtQgfAwgjAcQghAZgrAOQgiAMg0AAIgTgBg");
	this.shape_962.setTransform(641.3996,402.1187);

	this.shape_963 = new cjs.Shape();
	this.shape_963.graphics.f("#000000").s().p("AA8E0Qg+gDgrgOQhNgahAhEQgqgsg9hdQgpg3gJhBQgJhEAZhKQAdgxAzgbQAygaA/gDQDBAAClC2QArAxArA+QAeAugCAzQgBA1gjAtQgeAwgkAdQghAYgrAOQgiAMg2AAIgQAAg");
	this.shape_963.setTransform(641.6095,401.5878);

	this.shape_964 = new cjs.Shape();
	this.shape_964.graphics.f("#000000").s().p("AA8E0Qg+gDgrgOQhNgahAhEQgqgtg9hcQgpg3gJhBQgJhEAZhKQAdgyAzgaQAygbBAgCQDBgBCkC3QArAxArA+QAeAugCAzQgBA1gjAtQgeAwgkAcQghAZgrAOQgjAMg1AAIgQAAg");
	this.shape_964.setTransform(641.8246,401.0628);

	this.shape_965 = new cjs.Shape();
	this.shape_965.graphics.f("#000000").s().p("AA7E0Qg+gDgqgOQhNgahAhEQgqgtg9hcQgpg3gJhBQgJhEAZhKQAdgyA0gaQAxgbBAgCQDBAACkC3QArAwArA/QAeAtgCAzQgBA2gjAtQgfAwgjAcQghAZgrANQgiAMg0AAIgTAAg");
	this.shape_965.setTransform(642.0246,400.5439);

	this.shape_966 = new cjs.Shape();
	this.shape_966.graphics.f("#000000").s().p("AA7E0Qg+gDgrgOQhMgbhAhEQgqgsg9hdQgpg3gJhBQgJhEAZhKQAdgxA0gbQAxgaBAgCQDBgBCkC4QArAwArA/QAeAtgCAzQgBA2gjAtQgfAwgkAcQggAZgrANQgjAMg2AAIgQAAg");
	this.shape_966.setTransform(642.2246,400.0128);

	this.shape_967 = new cjs.Shape();
	this.shape_967.graphics.f("#000000").s().p("AA7E0Qg+gDgrgOQhMgahAhFQgrgsg8hdQgpg3gJhBQgJhEAahKQAdgxAzgbQAygaA/gCQDBAACkC3QArAxArA+QAeAtgCA0QgBA1gjAtQgfAwgkAcQggAZgrAOQgiALg0AAIgTAAg");
	this.shape_967.setTransform(642.4362,399.4695);

	this.shape_968 = new cjs.Shape();
	this.shape_968.graphics.f("#000000").s().p("AA7E0Qg+gCgrgPQhNgag/hFQgrgsg8hdQgpg3gJhBQgJhEAahKQAdgxAzgbQAygaBAgCQDBAACjC3QArAxArA/QAeAtgCAzQgBA1gjAuQgfAvgkAdQghAYgrAOQgjALg1AAIgQAAg");
	this.shape_968.setTransform(642.6362,398.9383);

	this.shape_969 = new cjs.Shape();
	this.shape_969.graphics.f("#000000").s().p("AA6E0Qg+gDgqgOQhNgbg/hEQgrgtg8hcQgpg4gJhAQgJhFAahKQAdgxA0gaQAxgaBAgCQDBAACjC3QArAxArA/QAeAtgCAzQgBA1gjAuQgfAvgkAdQghAYgrAOQgiALgzAAIgUAAg");
	this.shape_969.setTransform(642.8362,398.4195);

	this.shape_970 = new cjs.Shape();
	this.shape_970.graphics.f("#000000").s().p("AA6E0Qg+gCgrgPQhMgbhAhEQgqgtg9hcQgog4gJhAQgJhFAahKQAdgxAzgaQAygaBAgCQDBAACjC4QArAxAqA+QAeAtgBA0QgCA1gjAtQgfAwgkAcQggAZgrANQgiALgzAAIgUAAg");
	this.shape_970.setTransform(643.0515,397.8945);

	this.shape_971 = new cjs.Shape();
	this.shape_971.graphics.f("#000000").s().p("AA6E0Qg+gDgrgOQhNgbg/hEQgqgtg9hdQgog3gJhBQgJhEAahKQAdgxA0gbQAxgaBAgCQDBABCjC4QArAwAqA/QAeAtgBA0QgCA1gjAtQgfAwgkAcQghAZgrANQgiAMg1AAIgRgBg");
	this.shape_971.setTransform(643.2612,397.3633);

	this.shape_972 = new cjs.Shape();
	this.shape_972.graphics.f("#000000").s().p("AA5E0Qg+gCgqgPQhNgbg/hEQgrgtg8hdQgog3gJhBQgJhEAahKQAdgxA0gbQAxgaBAgCQDBABCjC4QArAxAqA/QAeAtgBAzQgCA1gjAuQgfAvgkAcQghAZgrANQghAMg0AAIgUgBg");
	this.shape_972.setTransform(643.4629,396.8195);

	this.shape_973 = new cjs.Shape();
	this.shape_973.graphics.f("#000000").s().p("AA5E1Qg+gDgrgPQhMgbg/hEQgrgtg8hdQgog3gJhBQgJhEAahKQAegxAzgbQAygaBAgCQDAABCjC4QArAxAqA/QAeAtgBA0QgCA1gjAtQgfAwgkAcQghAYgrAOQgiALgzAAIgUAAg");
	this.shape_973.setTransform(643.6629,396.2945);

	this.shape_974 = new cjs.Shape();
	this.shape_974.graphics.f("#000000").s().p("AA5E0Qg+gDgrgOQhMgbg/hFQgrgsg8hdQgog4gJhAQgJhFAahKQAegxAzgaQAygaBAgCQDBABCiC4QArAxAqA/QAeAtgBA0QgCA1gjAtQgfAvglAdQggAYgrAOQgiALgzAAIgUgBg");
	this.shape_974.setTransform(643.8629,395.7702);

	this.shape_975 = new cjs.Shape();
	this.shape_975.graphics.f("#000000").s().p("AA5E1Qg+gDgrgPQhMgbhAhFQgqgsg8hdQgog4gJhAQgIhFAahKQAdgxA0gaQAxgaBAgCQDBABCjC5QAqAxAqA/QAeAtgBAzQgCA1gjAuQgfAvglAcQggAZgrANQgiALgzAAIgUAAg");
	this.shape_975.setTransform(644.0739,395.2452);

	this.shape_976 = new cjs.Shape();
	this.shape_976.graphics.f("#000000").s().p("AA4E0Qg+gDgqgOQhMgbhAhFQgqgtg8hdQgog3gIhBQgJhEAahKQAdgxA0gaQAygaA/gCQDBABCjC5QArAxAqA+QAdAugCAzQgBA1gjAtQggAwgkAcQggAZgsANQggALgyAAIgXgBg");
	this.shape_976.setTransform(644.2656,394.7023);

	this.shape_977 = new cjs.Shape();
	this.shape_977.graphics.f("#000000").s().p("AA4E1Qg+gDgqgPQhNgbg/hFQgqgtg8hdQgog3gIhBQgJhEAahKQAegxAzgaQAygaBAgCQDAABCjC5QArAxAqA/QAdAtgCA0QgBA1gkAtQgfAvgkAcQghAZgrANQghALgzAAIgVAAg");
	this.shape_977.setTransform(644.4656,394.1702);

	this.shape_978 = new cjs.Shape();
	this.shape_978.graphics.f("#000000").s().p("AA4E1Qg+gEgrgOQhMgcg/hEQgqgtg8hdQgog4gIhBQgJhEAahKQAegxAzgaQAygaBAgBQDBABCiC5QArAxAqA/QAdAtgCA0QgBA1gkAtQgfAvgkAcQghAZgrANQgiALgyAAIgVAAg");
	this.shape_978.setTransform(644.6673,393.6702);

	this.shape_979 = new cjs.Shape();
	this.shape_979.graphics.f("#000000").s().p("AA4E1Qg+gDgrgPQhMgbg/hFQgqgtg8hdQgog4gIhBQgJhEAahKQAegxA0gaQAxgaBAgBQDBABCiC5QArAyAqA+QAdAugCAzQgBA1gkAtQgfAwgkAcQghAYgrANQghALgxAAIgXAAg");
	this.shape_979.setTransform(644.8766,393.1273);

	this.shape_980 = new cjs.Shape();
	this.shape_980.graphics.f("#000000").s().p("AA4E1Qg+gDgrgPQhMgbg/hFQgqgtg8hdQgog4gIhBQgJhEAbhKQAdgxA0gaQAygaBAgBQDAACCiC5QArAxAqA/QAdAtgCA0QgBA1gkAtQgfAvglAcQggAZgrANQgiAKgzAAIgUAAg");
	this.shape_980.setTransform(645.0781,392.5952);

	this.shape_981 = new cjs.Shape();
	this.shape_981.graphics.f("#000000").s().p("AA3E1Qg+gDgqgPQhMgcg/hFQgqgsg8heQgog3gIhBQgJhFAbhJQAegxAzgaQAygaBAgCQDAACCiC6QArAxAqA/QAdAtgCA0QgCA1gjAtQgfAvglAcQggAZgsANQggALgxAAIgYgBg");
	this.shape_981.setTransform(645.2781,392.0531);

	this.shape_982 = new cjs.Shape();
	this.shape_982.graphics.f("#000000").s().p("AA3E1Qg+gEgqgPQhMgbg/hFQgrgtg7hdQgog4gIhBQgJhEAbhKQAegxAzgaQAygZBAgCQDBACChC5QArAyAqA/QAdAtgCA0QgCA1gjAtQgfAvglAcQggAYgsAOQggALgxAAIgYgBg");
	this.shape_982.setTransform(645.4923,391.5531);

	this.shape_983 = new cjs.Shape();
	this.shape_983.graphics.f("#000000").s().p("AA2E1Qg+gDgqgPQhMgcg/hFQgqgtg7hdQgog4gIhBQgJhEAbhKQAegxAzgaQAygZBAgCQDAACCiC6QArAxApA/QAeAugCAzQgCA1gkAtQgfAvglAcQggAZgsANQggALgxAAIgYgBg");
	this.shape_983.setTransform(645.7031,391.0031);

	this.shape_984 = new cjs.Shape();
	this.shape_984.graphics.f("#000000").s().p("AA2E1Qg+gDgqgPQhMgcg/hFQgqgtg7hdQgog4gIhBQgJhEAbhKQAegxAzgaQAygZBAgCQDBADChC5QArAyApA/QAeAtgCA0QgCA1gkAtQgfAvglAcQggAYgsANQggALgxAAIgYgBg");
	this.shape_984.setTransform(645.9031,390.4781);

	this.shape_985 = new cjs.Shape();
	this.shape_985.graphics.f("#000000").s().p("AA9E8IgSgBQgxgFgogOIgGgCQhMgdg+hBIgDgDQgXgYgXggQgbgjgdguIgBgBQgpg4gIhCIAAgBQgJhGAahLIACgDQAegwAygbIAFgCQAxgZA/gCQBjABBbAvQBbAwBTBdIABABQAWAaAUAcQAVAdAUAgIADAFQAQAbAGAZQAFAVgBAVIgBANQgCAegMAaQgHARgMAPIgMASQgQAWgRARQgLAMgMAJIgRAMQgbAQgiALIgPAEQgTAFgZABIgXABIgZgBg");
	this.shape_985.setTransform(645.6132,390.925);

	this.shape_986 = new cjs.Shape();
	this.shape_986.graphics.f("#000000").s().p("ABEFDIgTgCQgxgFgqgPIgGgCQhQgeg/hAIgDgDQgZgagYgeQgcgjgdguIgBgBQgqg6gJhEIAAAAQgJhIAZhNIACgEQAegxAzgcIAFgCQAygaBAgCQBmAABdAuQBfAwBUBfIABABQAXAbAUAcQAVAeAUAhIADAFQAQAeAGAYQAGAVAAAVIgBAOQgCAggKAZQgHASgLAQIgMASQgQAYgSARQgLALgMAKIgRAMQgbARgjALIgQAFQgTAEgaACIgTAAIgdAAg");
	this.shape_986.setTransform(645.3326,391.395);

	this.shape_987 = new cjs.Shape();
	this.shape_987.graphics.f("#000000").s().p("ABLFKIgTgCQgwgGgugQIgGgCQhUgehAg/IgDgEQgcgbgXgdQgegkgdguIgBgBQgrg7gKhFIAAgBQgKhKAahPIABgDQAegzA0gdIAFgCQAzgbBCgDQBogBBfAvQBjAwBVBgIABABQAYAcAUAcQAWAfATAjIADAFQARAgAGAWQAGAXAAAVIAAANQgCAigJAZQgGATgKAQIgMATQgQAZgSASQgLALgMAKIgSANQgbAQglAMIgPAFQgTAFgcACIgTAAIgdAAg");
	this.shape_987.setTransform(645.0461,391.8447);

	this.shape_988 = new cjs.Shape();
	this.shape_988.graphics.f("#000000").s().p("ABRFRIgTgCQgvgHgxgQIgHgCQhXgfhBg/IgEgDQgegdgWgbQggglgegvIgBgBQgsg8gKhHIAAgBQgLhLAahRIABgEQAeg0A0geIAFgDQA0gbBDgEQBrgCBiAvQBmAxBXBiIABABQAZAcAUAcQAWAfATAlIACAFQASAjAFAVQAHAXABAVQABAHgBAHQgBAkgIAZQgFATgJAQQgFALgHAKQgRAZgRATQgLALgNAKIgSANQgcARglANIgQAFQgTAFgdACIgYABIgZgBg");
	this.shape_988.setTransform(644.7802,392.2977);

	this.shape_989 = new cjs.Shape();
	this.shape_989.graphics.f("#000000").s().p("ABYFYIgUgDQgtgHg1gRIgHgCQhagghDg9IgEgEQgggegWgaQgiglgegvIgBgBQgtg+gLhJIAAgBQgLhMAZhUIABgDQAfg1A0ggIAFgDQA1gdBFgEQBtgCBkAvQBqAxBYBjIABABQAbAdATAcQAWAgATAnIACAEQASAmAGATQAHAYABAVQABAHAAAHQgBAngGAYQgEAUgJARQgFALgHAKQgRAagRATQgLAMgNAKIgTANQgcASgnANIgPAFQgTAGgeACIgaABIgYgBg");
	this.shape_989.setTransform(644.4926,392.7459);

	this.shape_990 = new cjs.Shape();
	this.shape_990.graphics.f("#000000").s().p("ABeFeIgUgDQgsgHg4gSIgHgCQhfghhDg8IgEgEQgjgggWgYQgjgmgfgvIgBgBQgug/gMhLIAAgBQgLhOAZhVIABgEQAeg3A1ggIAFgDQA2geBHgFQBwgDBmAuQBtAyBaBkIABABQAbAfAUAcQAWAhATAnIACAFQASAoAGASQAIAZABAVIABAOQAAApgFAYQgEAVgHARQgFALgHAKQgRAcgSAUQgLALgNAKIgUAOQgcASgnAOIgQAFQgTAGggACIgXABIgbgBg");
	this.shape_990.setTransform(644.2296,393.2104);

	this.shape_991 = new cjs.Shape();
	this.shape_991.graphics.f("#000000").s().p("ABQFiQgtgIhAgVQhlgihGg+QgmgigVgXQglgngggvQgwhBgMhOQgMhRAahZQAgg7A5giQA3gfBIgGQBzgDBoAuQBxAyBcBnQAdAgATAcQAYAjATAsQATArAFAQQAMAjAAAaQAAArgDAXQgGAlgQAZQgRAdgSAUQgTATgaARQghAWg0AQQgTAGggADIgXAAQgaAAgXgEg");
	this.shape_991.setTransform(643.9387,393.6495);

	this.shape_992 = new cjs.Shape();
	this.shape_992.graphics.f("#000000").s().p("ABjFjIgUgCQgrgIg6gSIgIgDQhggghEg8IgGgFQglghgWgXQgkgngggvQgvhBgMhNQgMhQAZhYIABgCQAfg4A3giIACgCQA3gfBIgFIADAAQBwgDBnAuQBwAxBcBnQAcAfATAcQAYAjASAqIABACQATAqAGARQAJAbACAVIAAANQABAqgEAXQgEAYgIASQgFALgGAJQgQAcgSAUQgMANgQAMIgRAMQgcASgoAOIgQAFQgTAGghADIgXABIgcgCg");
	this.shape_992.setTransform(643.7832,394.1353);

	this.shape_993 = new cjs.Shape();
	this.shape_993.graphics.f("#000000").s().p("ABiFiIgUgDQgrgHg5gSIgJgDQhfgghEg8IgGgFQgkghgWgXQgkgngfgvQgwhAgMhNQgMhQAZhXIABgCQAfg4A3ghIADgCQA2ggBIgFIACAAQBwgDBmAuQBwAyBbBlIABAAQAcAgATAcQAXAiATAqIABACQATAqAFARQAJAaACAWIAAAMQABAqgEAYQgEAXgIASQgFAKgGAJQgRAdgSAUQgMANgPALIgRAMQgcASgoAOIgQAGQgTAGggACIgXABIgcgBg");
	this.shape_993.setTransform(643.6082,394.6353);

	this.shape_994 = new cjs.Shape();
	this.shape_994.graphics.f("#000000").s().p("ABhFgIgUgCQgrgHg5gSIgIgDQhfgghDg8IgGgFQgkgggWgYQgkgmgfgvQgvhBgMhMQgMhPAZhXIABgCQAfg4A3ghIACgCQA2gfBIgFIACAAQBvgDBmAuQBvAxBbBmIABAAQAcAfATAcQAXAiATAqIABACQATAoAFASQAJAaACAWIAAAMQABApgFAYQgEAXgIASQgFALgGAJQgQAcgSAUQgMANgPALIgRAMQgcASgoAOIgQAFQgTAGggADIgXABIgcgCg");
	this.shape_994.setTransform(643.4463,395.0879);

	this.shape_995 = new cjs.Shape();
	this.shape_995.graphics.f("#000000").s().p("ABgFfIgUgDQgsgHg3gSIgJgDQhegfhDg8IgGgFQgjgggWgYQgjgmgggvQgvhAgMhMQgLhPAZhWIABgCQAfg4A2ghIACgCQA2geBHgGIADAAQBvgCBlAtQBuAyBbBkIAAABQAcAfATAcQAYAiATApIABACQASAoAGASQAJAaABAWIABAMQAAApgFAXQgEAXgIASQgFALgGAJQgRAcgSATQgLANgPALIgRAMQgcASgoAOIgQAGQgTAFgfADIgaABIgZgBg");
	this.shape_995.setTransform(643.2938,395.5685);

	this.shape_996 = new cjs.Shape();
	this.shape_996.graphics.f("#000000").s().p("ABfFdIgUgDQgsgHg3gRIgIgDQhegfhDg8IgFgFQgjgggWgYQgjgmgggvQgvhAgLhLQgMhPAZhWIABgCQAfg3A2ghIADgBQA1gfBHgFIADAAQBugDBlAuQBtAxBbBkIAAABQAbAeAUAcQAXAiATApIABACQATAnAFASQAJAaACAWIAAAMQAAApgFAYQgEAWgJASQgEAKgGAJQgRAcgSAUQgMANgPALIgQALQgcASgoAPIgQAFQgTAGgfACIgXABIgbgBg");
	this.shape_996.setTransform(643.1186,396.0629);

	this.shape_997 = new cjs.Shape();
	this.shape_997.graphics.f("#000000").s().p("ABeFcIgUgDQgtgHg2gRIgIgDQhdgfhCg8IgGgFQgigfgWgZQgjgmgfgvQgvg/gMhLQgMhOAZhVIABgCQAfg4A2ggIADgCQA1geBHgFIACAAQBugDBkAuQBtAwBaBlIABAAQAbAeATAcQAYAiATAoIABACQASAnAGATQAIAaACAVIAAAMQAAAogFAYQgEAXgJASQgFAKgGAJQgQAbgSAUQgMANgPALIgQALQgcASgoAOIgPAGQgTAFgfADIgaABIgYgBg");
	this.shape_997.setTransform(642.9554,396.5408);

	this.shape_998 = new cjs.Shape();
	this.shape_998.graphics.f("#000000").s().p("ABdFaIgUgDQgtgGg1gRIgIgDQhcgfhDg8IgFgFQgigfgWgZQgjgmgfgvQgug+gMhLQgMhOAZhVIABgCQAfg3A2ggIACgCQA2geBGgFIACAAQBtgDBkAuQBsAxBaBjIABABQAbAeATAcQAYAhATAoIABACQASAnAGASQAIAaACAWIAAAMQAAAngFAYQgFAXgJASQgEAKgGAIQgRAcgSATQgMANgOALIgQAMQgcASgoAOIgQAFQgTAFgeADIgaABIgYgBg");
	this.shape_998.setTransform(642.7938,397.0157);

	this.shape_999 = new cjs.Shape();
	this.shape_999.graphics.f("#000000").s().p("ABcFYIgUgCQgtgHg1gRIgIgCQhbgfhCg9IgGgEQghgfgWgZQgjgmgfguQgug/gMhKQgLhOAZhUIABgCQAeg3A2ggIADgBQA1gfBGgEIACAAQBsgDBkAtQBrAxBaBjIAAABQAbAeAUAbQAXAiATAnIABACQATAmAGATQAIAaABAVIAAANQAAAmgFAZQgFAWgJASQgFAKgGAIQgQAcgSATQgMANgOALIgQALQgcASgnAOIgQAFQgTAGgfACIgZABIgYgBg");
	this.shape_999.setTransform(642.6313,397.5157);

	this.shape_1000 = new cjs.Shape();
	this.shape_1000.graphics.f("#000000").s().p("ABaFXQgKgBgJgCQgtgGg1gQIgIgDQhagfhCg8IgGgFQgggegXgaQgiglgfgvQgug+gLhKQgMhNAZhUIABgCQAfg3A1gfIADgCQA1geBFgFIACAAQBsgCBjAtQBrAwBZBjIABABQAbAeATAbQAXAhAUAoIABABQASAmAGATQAIAaABAVIABANQAAAmgGAYQgFAWgJASIgLATQgQAbgSATQgMAMgOALIgQAMQgcASgnAOIgQAFQgTAFgeADIgZABIgZgBg");
	this.shape_1000.setTransform(642.4688,397.9685);

	this.shape_1001 = new cjs.Shape();
	this.shape_1001.graphics.f("#000000").s().p("ABZFVIgUgCQgtgGgzgQIgIgDQhagehCg9IgFgFQgggegXgaQghglgfguQgug+gMhKQgLhMAZhUIABgCQAeg2A2gfIACgCQA1geBFgFIACAAQBrgCBjAtQBqAwBZBjIABAAQAaAeAUAbQAXAhAUAnIABACQASAlAGAUQAIAZABAWIAAAMQAAAmgGAYQgFAVgKASQgEAKgGAJQgRAbgRATQgMAMgOALIgQAMQgcASgnANIgQAFQgTAGgdACIgZABIgZgBg");
	this.shape_1001.setTransform(642.3188,398.4435);

	this.shape_1002 = new cjs.Shape();
	this.shape_1002.graphics.f("#000000").s().p("ABYFUIgUgCQgtgGgzgRIgIgCQhZgfhCg9IgFgEQgggegWgaQghglgfguQgug+gLhJQgMhMAZhTIABgCQAeg2A2gfIACgCQA1geBEgEIACAAQBrgDBjAtQBpAwBZBjIAAAAQAaAdAUAcQAXAhAUAmIABACQASAkAGAUQAIAZABAWIAAAMQAAAmgGAYQgFAVgKASQgFAKgGAJQgQAagSATQgLANgOALIgQALQgcASgnAOIgPAFQgTAFgeACIgcABIgVAAg");
	this.shape_1002.setTransform(642.1563,398.9256);

	this.shape_1003 = new cjs.Shape();
	this.shape_1003.graphics.f("#000000").s().p("ABXFSIgTgCQgugGgygQIgIgDQhYgehCg9IgFgFQgfgdgXgaQghglgfguQgtg9gMhJQgLhMAZhTIABgCQAeg1A2gfIACgCQA0gdBFgFIACAAQBqgCBiAtQBoAwBZBhIAAABQAaAdAUAcQAXAgAUAmIABACQASAkAGAUQAIAZABAWIAAAMQAAAlgHAYQgFAVgKASQgEAKgGAJQgRAagRATQgMAMgOALIgQALQgcASgmAOIgPAFQgTAFgeADIgZABIgYgBg");
	this.shape_1003.setTransform(641.9819,399.4184);

	this.shape_1004 = new cjs.Shape();
	this.shape_1004.graphics.f("#000000").s().p("ABWFQIgUgCQgugGgxgPIgIgDQhXgehCg9IgFgFQgegdgXgaQghglgfguQgtg9gLhIQgLhMAYhSIABgCQAfg1A1gfIACgCQA0gdBEgEIACAAQBqgDBhAtQBoAwBYBhIABABQAaAcAUAcQAXAgAUAmIABACQASAjAGAVQAHAYABAWIABAMQgBAlgHAYQgFAVgKASQgFAKgGAIQgQAbgSASQgLANgOALIgQALQgcASgmANIgPAFQgTAFgdADIgcABIgVgBg");
	this.shape_1004.setTransform(641.8296,399.9006);

	this.shape_1005 = new cjs.Shape();
	this.shape_1005.graphics.f("#000000").s().p("ABUFPIgTgCQgugGgxgPIgIgDQhWgdhBg+IgGgFQgegcgXgbQgggkgeguQgug9gLhIQgLhLAZhSIABgCQAeg1A1geIACgCQA0gdBEgFIACAAQBpgCBhAtQBnAvBYBhIABABQAZAdAUAbQAXAgAUAmIABABQASAjAGAVQAIAYABAWIAAAMQgBAkgHAZQgFAVgKARIgLATQgQAagSASQgLANgOAKQgHAGgJAFQgcATglANIgQAFQgTAFgdACIgcACIgVgBg");
	this.shape_1005.setTransform(641.6671,400.3529);

	this.shape_1006 = new cjs.Shape();
	this.shape_1006.graphics.f("#000000").s().p("ABTFNIgTgCQgvgFgwgQIgIgCQhVgehBg9IgFgFQgegcgXgbQgggkgeguQgtg9gLhHQgLhLAYhRIABgCQAeg1A1geIACgCQA0gdBEgEIABAAQBpgCBgAsQBnAwBXBgIABABQAaAcAUAcQAXAfAUAmIABABQASAiAGAWQAHAYABAWIAAAMQAAAjgIAZQgGAVgKARQgEAKgGAIQgQAagSATQgMAMgNALIgQALQgcASglANIgQAFQgTAFgcADIgcABIgVgBg");
	this.shape_1006.setTransform(641.5046,400.8528);

	this.shape_1007 = new cjs.Shape();
	this.shape_1007.graphics.f("#000000").s().p("ABSFMIgTgCQgvgFgvgPIgIgDQhVgdhBg+IgFgFQgdgbgXgcQgfgkgfguQgtg8gLhHQgLhKAZhRIABgCQAeg1A0geIADgBQAzgdBDgEIACAAQBogCBgAsQBmAvBXBhIABABQAZAbAUAcQAXAfAVAlIABACQARAhAHAWQAHAYABAWIAAAMQgBAjgIAZQgGAUgKASIgKASQgRAagRASQgMAMgNALIgPALQgcASgmANIgPAFQgTAFgcACIgcABIgVAAg");
	this.shape_1007.setTransform(641.3546,401.3278);

	this.shape_1008 = new cjs.Shape();
	this.shape_1008.graphics.f("#000000").s().p("ABRFKQgKAAgJgCQgvgFgvgPIgHgCQhVgdhAg+IgFgFQgdgbgXgcQgfgkgfguQgsg7gLhHQgLhKAZhRIABgCQAdg0A1geIACgBQAzgdBDgEIACAAQBogCBfAtQBlAuBXBgIABABQAZAcAUAbQAXAgAVAkIABACQARAhAHAWQAHAYAAAWIAAALQAAAjgJAZQgFAUgLASIgKASQgQAZgSATQgLAMgOAKIgPALQgcASglANIgPAFQgTAFgcACIgcACIgVgBg");
	this.shape_1008.setTransform(641.1694,401.8006);

	this.shape_1009 = new cjs.Shape();
	this.shape_1009.graphics.f("#000000").s().p("ABQFIIgTgBQgwgFgugPIgHgDQhUgchAg/IgFgEQgcgbgXgcQgfgkgeguQgtg7gLhGQgLhKAZhQIABgCQAeg0A0gdIACgCQAzgcBDgEIABAAQBogDBfAtQBkAvBXBfIABABQAYAbAVAcQAXAfAUAkIABACQASAgAGAWQAHAYABAWIAAAMQgBAigJAZQgGAUgKASQgFAJgGAIQgQAagRASQgMAMgNALIgPAKQgcASglANIgPAFQgTAFgcADIgbABIgVgBg");
	this.shape_1009.setTransform(641.0069,402.3006);

	this.shape_1010 = new cjs.Shape();
	this.shape_1010.graphics.f("#000000").s().p("ABOFHQgJAAgJgCQgwgEgtgPIgIgCQhTgdhAg+IgFgFQgbgagYgdQgegkgegtQgtg7gKhGQgLhJAZhQIABgCQAdg0A0gdIADgBQAygdBDgEIABAAQBngCBeAtQBkAuBWBfIABACQAZAbAUAbQAXAfAVAkIABABQARAgAHAXQAHAXAAAWIAAAMQgBAigJAZQgGAUgKARIgLASQgQAZgRASQgMAMgNAKIgPALQgcASgkANIgQAFQgTAFgbACIgbACIgWgBg");
	this.shape_1010.setTransform(640.8569,402.7528);

	this.shape_1011 = new cjs.Shape();
	this.shape_1011.graphics.f("#000000").s().p("ABOFGIgTgCQgwgEgtgPIgHgCQhSgdhAg+IgFgFQgbgagXgdQgegjgfgtQgsg7gKhFQgLhJAZhQIABgCQAdgzA0gdIACgCQAzgcBCgEIABAAQBngCBdAtQBjAuBWBfIACABQAYAbAUAbQAXAfAVAjIABACQARAfAHAXQAHAXAAAWIAAAMQgBAhgJAZQgGAUgLARQgFAKgGAIQgQAZgRASQgLAMgNAKIgPALQgcASglANIgPAFQgTAFgbACIggABIgQAAg");
	this.shape_1011.setTransform(640.6944,403.2374);

	this.shape_1012 = new cjs.Shape();
	this.shape_1012.graphics.f("#000000").s().p("ABMFEQgJAAgJgCQgxgEgrgOIgIgDQhRgchAg+IgFgFQgagagYgdQgdgjgfgtQgrg7gLhFQgLhIAZhPIABgCQAdgzA0gdIACgBQAzgcBCgEIABAAQBmgCBdAsQBiAuBWBeIABACQAYAaAVAcQAXAeAUAjIABACQASAeAGAYQAHAXAAAWIAAALQgBAhgJAaQgHATgKARIgLASQgQAZgRASQgMAMgNAKIgOAKQgcASgkANIgQAFQgTAFgbACIgbABIgVAAg");
	this.shape_1012.setTransform(640.5175,403.7278);

	this.shape_1013 = new cjs.Shape();
	this.shape_1013.graphics.f("#000000").s().p("ABLFCIgSgBQgxgFgrgOIgIgCQhQgchAg/IgEgEQgagagYgdQgdgjgegtQgsg6gLhFQgKhIAYhOIABgCQAdgzA0gdIADgBQAygcBBgEIABAAQBmgCBcAtQBiAtBVBeIACACQAYAaAUAbQAXAeAVAjIABACQARAeAHAXQAGAXABAWIgBAMQgBAggJAaQgHATgLARIgKASQgQAYgSASQgLAMgNAKIgOAKQgcATgkAMIgPAFQgTAFgbACIggACIgQgBg");
	this.shape_1013.setTransform(640.3675,404.2124);

	this.shape_1014 = new cjs.Shape();
	this.shape_1014.graphics.f("#000000").s().p("ABKFBIgTgBQgxgFgqgOIgHgCQhQgcg/g/IgFgEQgZgZgYgeQgdgjgegtQgsg5gKhFQgLhHAZhOIABgCQAdgzA0gcIACgCQAygbBBgEIABAAQBlgCBcAsQBhAuBVBeIABABQAYAaAVAbQAXAeAVAjIABABQARAeAGAYQAHAWAAAXIAAALQgBAggKAZQgHAUgLARQgFAJgGAIQgPAYgSASQgLAMgNAKIgOAKQgcATgkAMIgPAFQgTAFgaACIggABIgQAAg");
	this.shape_1014.setTransform(640.2175,404.6873);

	this.shape_1015 = new cjs.Shape();
	this.shape_1015.graphics.f("#000000").s().p("ABJE/IgTgBQgxgEgqgOIgHgCQhPgcg/g/IgFgEQgYgZgYgeQgdgjgegsQgrg6gLhEQgKhHAYhOIABgCQAdgyA0gcIACgBQAygcBBgDIAAAAQBlgCBcAsQBfAtBWBdIABACQAXAaAVAbQAXAeAVAiIABABQARAdAHAYQAGAXAAAWIAAAMQgBAfgKAaQgHATgLARIgLARQgQAYgRASQgLAMgNAKIgOAKQgcASgjAMIgQAFQgTAFgaACIgfABIgQAAg");
	this.shape_1015.setTransform(640.055,405.1873);

	this.shape_1016 = new cjs.Shape();
	this.shape_1016.graphics.f("#000000").s().p("ABIE+IgSgBQgygEgpgOIgHgCQhOgbg/hAIgFgEQgYgYgYgfQgcgigfgtQgrg5gKhDQgKhHAYhOIABgCQAdgyAzgcIADgBQAxgbBBgEIAAAAQBkgBBcAsQBfAtBVBdIABABQAXAaAVAbQAXAdAVAiIABABQARAdAHAZQAGAWAAAWIAAAMQgBAfgLAZQgHATgLARIgLARQgPAYgSASQgLALgMAKIgPAKQgcATgjAMIgPAFQgTAFgaACIgfABIgQAAg");
	this.shape_1016.setTransform(639.8925,405.6392);

	this.shape_1017 = new cjs.Shape();
	this.shape_1017.graphics.f("#000000").s().p("ABGE8IgSgBQgxgEgpgNIgHgCQhNgbg/hAIgFgFQgXgXgZgfQgbgigegtQgrg5gLhDQgKhGAZhNIABgCQAcgyA0gbIACgCQAxgbBAgDIABAAQBjgCBbAsQBfAtBUBcIACACQAXAZAVAbQAWAeAWAhIABABQARAcAGAZQAHAWAAAXIgBALQgBAfgLAZQgHATgLARIgLARQgQAYgRARIgXAWIgPAKQgcASgiAMIgQAFQgTAFgZACIgfABIgRAAg");
	this.shape_1017.setTransform(639.7301,406.1142);

	this.shape_1018 = new cjs.Shape();
	this.shape_1018.graphics.f("#000000").s().p("ABFE6IgSgBQgygDgngNIgIgDQhMgbg/g/IgEgFQgXgXgZgfQgbgigegtQgrg4gKhDQgLhGAZhMIABgCQAdgyAzgbIACgCQAxgaBAgEIAAAAQBjgCBbAsQBdAtBVBcIACACQAWAZAVAbQAXAdAVAhIABABQARAcAHAZQAGAWAAAWIAAAMQgCAegLAZQgHATgMARIgKARQgQAXgRASQgLALgMAKIgOAKQgcATgjAMIgPAEQgTAFgaACQgRACgUAAIgKgBg");
	this.shape_1018.setTransform(639.5572,406.6007);

	this.shape_1019 = new cjs.Shape();
	this.shape_1019.graphics.f("#000000").s().p("ABEE5IgRgBQgzgDgngNIgHgCQhMgbg+hAIgEgFQgXgXgZgfQgbgigegsQgqg4gKhCQgLhGAZhMIABgCQAcgxA0gcIACgBQAxgbA/gDIABAAQBigCBaAsQBdAtBUBcIACABQAWAZAVAbQAXAdAVAhIABABQARAbAHAZQAGAWAAAWIgBAMQgBAdgLAaQgIASgMARIgKARQgQAXgRASQgLALgMAKIgOAKQgcASgiAMIgPAFQgTAFgaACIgfABIgQAAg");
	this.shape_1019.setTransform(639.3966,407.0873);

	this.shape_1020 = new cjs.Shape();
	this.shape_1020.graphics.f("#000000").s().p("ABDE3IgSgBQgxgDgngNIgIgCQhLgag+hAIgEgFQgWgXgZgfQgagigfgsQgqg4gKhCQgKhFAYhMIABgCQAdgwAzgcIACgBQAxgaA/gDIAAAAQBigCBaAsQBcAsBUBbIABACQAWAYAWAcQAWAcAWAhIABABQARAaAHAaQAFAWAAAWIAAALQgCAegLAZQgIASgMARIgKARQgQAXgRARQgLAMgMAKIgOAJQgcATgiAMIgPAEQgTAFgZACQgSABgTAAIgKAAg");
	this.shape_1020.setTransform(639.2425,407.5757);

	this.shape_1021 = new cjs.Shape();
	this.shape_1021.graphics.f("#000000").s().p("ABCE2IgSgBQgygDgmgNIgHgCQhLgag+hAIgEgFQgVgWgZggQgaghgegsQgqg4gLhBQgKhFAZhLIABgCQAcgxAzgbIACgBQAxgaA+gEIABAAQBhgBBZAsQBcAsBTBbIACACQAWAYAVAbQAXAcAWAgIABABQAQAaAHAaQAGAWAAAWIgBALQgCAdgLAaQgIASgMAQIgLARQgPAXgRARQgLAMgMAJIgOAKQgcATgiALIgPAFQgTAEgYACQgSACgTAAIgKAAg");
	this.shape_1021.setTransform(639.0801,408.0275);

	this.shape_1022 = new cjs.Shape();
	this.shape_1022.graphics.f("#000000").s().p("ABBE0IgSgBQgygDgmgMIgHgCQhKgag9hAIgFgFQgVgWgYggQgaghgegsQgqg4gKhBQgKhEAYhLIABgCQAcgwAzgbIACgBQAxgaA+gDQBhgCBZAsQBaAsBUBaIACACQAVAYAWAbQAWAcAWAgIABABQARAZAHAbQAFAVAAAXIgBALQgBAcgMAaQgIASgMAQIgLARQgPAXgSARQgLALgLAKIgOAJQgcATgiAMIgPAEQgTAFgYACQgRABgTAAIgKAAg");
	this.shape_1022.setTransform(638.9072,408.5275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_949}]}).to({state:[{t:this.shape_950}]},1).to({state:[{t:this.shape_951}]},1).to({state:[{t:this.shape_952}]},1).to({state:[{t:this.shape_953}]},1).to({state:[{t:this.shape_954}]},1).to({state:[{t:this.shape_955}]},1).to({state:[{t:this.shape_956}]},1).to({state:[{t:this.shape_957}]},1).to({state:[{t:this.shape_958}]},1).to({state:[{t:this.shape_959}]},1).to({state:[{t:this.shape_960}]},1).to({state:[{t:this.shape_961}]},1).to({state:[{t:this.shape_962}]},1).to({state:[{t:this.shape_963}]},1).to({state:[{t:this.shape_964}]},1).to({state:[{t:this.shape_965}]},1).to({state:[{t:this.shape_966}]},1).to({state:[{t:this.shape_967}]},1).to({state:[{t:this.shape_968}]},1).to({state:[{t:this.shape_969}]},1).to({state:[{t:this.shape_970}]},1).to({state:[{t:this.shape_971}]},1).to({state:[{t:this.shape_972}]},1).to({state:[{t:this.shape_973}]},1).to({state:[{t:this.shape_974}]},1).to({state:[{t:this.shape_975}]},1).to({state:[{t:this.shape_976}]},1).to({state:[{t:this.shape_977}]},1).to({state:[{t:this.shape_978}]},1).to({state:[{t:this.shape_979}]},1).to({state:[{t:this.shape_980}]},1).to({state:[{t:this.shape_981}]},1).to({state:[{t:this.shape_982}]},1).to({state:[{t:this.shape_983}]},1).to({state:[{t:this.shape_984}]},1).to({state:[{t:this.shape_985}]},1).to({state:[{t:this.shape_986}]},1).to({state:[{t:this.shape_987}]},1).to({state:[{t:this.shape_988}]},1).to({state:[{t:this.shape_989}]},1).to({state:[{t:this.shape_990}]},1).to({state:[{t:this.shape_991}]},1).to({state:[{t:this.shape_992}]},1).to({state:[{t:this.shape_993}]},1).to({state:[{t:this.shape_994}]},1).to({state:[{t:this.shape_995}]},1).to({state:[{t:this.shape_996}]},1).to({state:[{t:this.shape_997}]},1).to({state:[{t:this.shape_998}]},1).to({state:[{t:this.shape_999}]},1).to({state:[{t:this.shape_1000}]},1).to({state:[{t:this.shape_1001}]},1).to({state:[{t:this.shape_1002}]},1).to({state:[{t:this.shape_1003}]},1).to({state:[{t:this.shape_1004}]},1).to({state:[{t:this.shape_1005}]},1).to({state:[{t:this.shape_1006}]},1).to({state:[{t:this.shape_1007}]},1).to({state:[{t:this.shape_1008}]},1).to({state:[{t:this.shape_1009}]},1).to({state:[{t:this.shape_1010}]},1).to({state:[{t:this.shape_1011}]},1).to({state:[{t:this.shape_1012}]},1).to({state:[{t:this.shape_1013}]},1).to({state:[{t:this.shape_1014}]},1).to({state:[{t:this.shape_1015}]},1).to({state:[{t:this.shape_1016}]},1).to({state:[{t:this.shape_1017}]},1).to({state:[{t:this.shape_1018}]},1).to({state:[{t:this.shape_1019}]},1).to({state:[{t:this.shape_1020}]},1).to({state:[{t:this.shape_1021}]},1).to({state:[{t:this.shape_1022}]},1).to({state:[{t:this.shape_949}]},1).wait(1));

	// green_glaz
	this.instance_2 = new lib.green_glaz();
	this.instance_2.setTransform(634.2,413.75,1,1,-14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:642.2,y:394.75},35).wait(7).to({x:634.2,y:413.75},32).wait(1));

	// glaz
	this.instance_3 = new lib.glaz();
	this.instance_3.setTransform(610.65,447.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regY:0.1,rotation:-7.3051,x:620.25,y:429.55},35).wait(7).to({regY:0,rotation:0,x:610.65,y:447.05},32).wait(1));

	// schnur_za
	this.shape_1023 = new cjs.Shape();
	this.shape_1023.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AEbpSQguAwgjDsQgUCKgnE7QgnENg2BnQhGCIhxhgQhFg7gligQgfiGgNjk");
	this.shape_1023.setTransform(548.2,485.6,1,1,0,0,0,28.3,-59.5);

	this.shape_1024 = new cjs.Shape();
	this.shape_1024.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkdgaQANDlAfCGQAlChBGA7QByBhBGiJQA2hnAokOQAok9AUiKQAjjtAugw");
	this.shape_1024.setTransform(520.1,544.4733);

	this.shape_1025 = new cjs.Shape();
	this.shape_1025.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkegaQAMDmAgCGQAlCiBHA8QByBgBHiJQA3hnAokPQAnk+AUiLQAkjtAvgx");
	this.shape_1025.setTransform(520.3,543.8441);

	this.shape_1026 = new cjs.Shape();
	this.shape_1026.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkggaQAMDmAgCHQAmCjBHA7QBzBhBHiJQA3hoApkQQAnk/AViLQAkjvAugx");
	this.shape_1026.setTransform(520.475,543.2062);

	this.shape_1027 = new cjs.Shape();
	this.shape_1027.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkigaQANDnAfCIQAnCjBHA7QB0BiBHiKQA4hpAokRQAplAAUiLQAkjvAvgy");
	this.shape_1027.setTransform(520.675,542.5683);

	this.shape_1028 = new cjs.Shape();
	this.shape_1028.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkkgaQANDoAgCIQAmCkBIA8QB1BhBIiKQA4hpAokSQAplBAViMQAkjwAvgy");
	this.shape_1028.setTransform(520.875,541.939);

	this.shape_1029 = new cjs.Shape();
	this.shape_1029.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkmgaQANDpAgCIQAnCkBIA8QB2BiBIiLQA4hpApkTQAplCAViNQAkjxAwgx");
	this.shape_1029.setTransform(521.075,541.3012);

	this.shape_1030 = new cjs.Shape();
	this.shape_1030.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkogaQANDqAgCIQAnClBJA8QB2BjBJiMQA5hpApkUQAplEAViNQAljxAwgy");
	this.shape_1030.setTransform(521.275,540.6633);

	this.shape_1031 = new cjs.Shape();
	this.shape_1031.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkqgbQANDrAhCJQAnClBJA9QB3BjBKiMQA5hqApkVQAqlEAViOQAljzAwgx");
	this.shape_1031.setTransform(521.45,540.0633);

	this.shape_1032 = new cjs.Shape();
	this.shape_1032.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AksgbQANDsAhCKQAnClBKA9QB4BjBKiMQA5hqAqkWQAqlGAViOQAljzAxgy");
	this.shape_1032.setTransform(521.65,539.4254);

	this.shape_1033 = new cjs.Shape();
	this.shape_1033.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkugbQANDtAhCKQAoCmBKA9QB5BkBLiNQA5hrArkXQAplGAViPQAmj0Axgy");
	this.shape_1033.setTransform(521.85,538.7876);

	this.shape_1034 = new cjs.Shape();
	this.shape_1034.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkwgbQANDtAiCLQAoCnBLA9QB5BkBLiNQA6hrArkYQAplIAWiPQAmj2Axgy");
	this.shape_1034.setTransform(522.05,538.1583);

	this.shape_1035 = new cjs.Shape();
	this.shape_1035.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkygbQANDuAiCLQApCoBLA9QB5BkBMiNQA7hsAqkZQArlJAWiPQAlj2Aygz");
	this.shape_1035.setTransform(522.25,537.5204);

	this.shape_1036 = new cjs.Shape();
	this.shape_1036.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ak0gbQAODvAiCMQAoCoBMA9QB7BlBMiOQA6hsArkaQArlKAWiQQAmj3Aygz");
	this.shape_1036.setTransform(522.425,536.8825);

	this.shape_1037 = new cjs.Shape();
	this.shape_1037.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ak2gbQAODvAiCMQApCpBMA+QB7BlBNiPQA7hsArkbQArlLAWiRQAnj3Aygz");
	this.shape_1037.setTransform(522.625,536.2532);

	this.shape_1038 = new cjs.Shape();
	this.shape_1038.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AE5pyQgzAzgmD4QgXCRgrFNQgrEcg8BsQhNCPh8hlQhNg+gpipQgiiNgOjw");
	this.shape_1038.setTransform(554,472.8,1,1,0,0,0,31.2,-62.8);

	this.shape_1039 = new cjs.Shape();
	this.shape_1039.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ak8gbQANDwAjCMQAqCpBNA+QB+BkBPiOQA8hsAskcQAslLAWiRQAnj4A0gz");
	this.shape_1039.setTransform(523.3,534.9532);

	this.shape_1040 = new cjs.Shape();
	this.shape_1040.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlAgbQAODvAjCMQAqCoBPA+QCABkBPiOQA9hsAtkaQAslLAXiQQAnj3A0gz");
	this.shape_1040.setTransform(523.725,534.3075);

	this.shape_1041 = new cjs.Shape();
	this.shape_1041.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlEgbQAODuAkCMQAqCoBQA9QCBBlBQiOQA+hsAukZQAslKAYiQQAoj2A0gz");
	this.shape_1041.setTransform(524.175,533.6825);

	this.shape_1042 = new cjs.Shape();
	this.shape_1042.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlJgbQAPDuAkCLQArCnBRA+QCDBkBRiOQA/hrAukZQAtlJAYiPQAoj2A2gy");
	this.shape_1042.setTransform(524.625,533.0204);

	this.shape_1043 = new cjs.Shape();
	this.shape_1043.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlNgbQAODtAlCLQAsCnBRA9QCFBkBTiNQBAhrAukYQAulIAYiPQApj1A2gy");
	this.shape_1043.setTransform(525.1,532.3833);

	this.shape_1044 = new cjs.Shape();
	this.shape_1044.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlRgbQAPDtAlCKQAsCnBTA8QCGBkBUiNQBAhrAvkXQAvlHAYiOQAqj1A2gy");
	this.shape_1044.setTransform(525.525,531.7126);

	this.shape_1045 = new cjs.Shape();
	this.shape_1045.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlWgbQAPDsAmCKQAsCmBVA9QCIBjBUiMQBBhrAwkWQAvlGAZiOQAqj0A4gy");
	this.shape_1045.setTransform(526,531.0504);

	this.shape_1046 = new cjs.Shape();
	this.shape_1046.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlagaQAQDqAmCKQAtCmBVA8QCKBjBViMQBChqAwkVQAwlGAZiNQArjzA4gy");
	this.shape_1046.setTransform(526.425,530.4254);

	this.shape_1047 = new cjs.Shape();
	this.shape_1047.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlegaQAQDqAmCJQAuClBWA9QCMBiBWiLQBDhqAxkVQAwlEAZiNQArjzA5gx");
	this.shape_1047.setTransform(526.875,529.7883);

	this.shape_1048 = new cjs.Shape();
	this.shape_1048.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AligaQAPDpAnCJQAuClBXA8QCOBiBYiLQBDhpAxkUQAylDAZiNQAsjyA5gy");
	this.shape_1048.setTransform(527.35,529.1262);

	this.shape_1049 = new cjs.Shape();
	this.shape_1049.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlngaQAQDpAnCIQAvCkBYA8QCPBiBZiLQBEhpAykTQAylCAaiNQAsjwA6gy");
	this.shape_1049.setTransform(527.8,528.4512);

	this.shape_1050 = new cjs.Shape();
	this.shape_1050.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlrgaQAQDoAoCIQAvCkBaA8QCRBhBZiKQBFhpAzkSQAylBAaiNQAtjwA7gx");
	this.shape_1050.setTransform(528.25,527.814);

	this.shape_1051 = new cjs.Shape();
	this.shape_1051.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlvgaQAQDnApCIQAwCjBaA8QCSBiBbiLQBGhoAzkRQAzlBAaiMQAtjvA8gx");
	this.shape_1051.setTransform(528.675,527.189);

	this.shape_1052 = new cjs.Shape();
	this.shape_1052.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlzgaQAQDnApCHQAwCjBbA8QCVBhBbiKQBHhoA0kRQAzk/AbiMQAtjuA9gy");
	this.shape_1052.setTransform(529.15,526.5269);

	this.shape_1053 = new cjs.Shape();
	this.shape_1053.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Al4gaQARDmApCHQAxCjBcA7QCWBhBdiKQBIhoA0kPQA1k/AaiLQAujuA9gx");
	this.shape_1053.setTransform(529.6,525.8812);

	this.shape_1054 = new cjs.Shape();
	this.shape_1054.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Al8gaQARDmAqCGQAxCiBdA7QCYBhBeiJQBIhoA1kPQA1k9AbiLQAvjtA9gx");
	this.shape_1054.setTransform(530.05,525.2191);

	this.shape_1055 = new cjs.Shape();
	this.shape_1055.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AmAgaQARDlAqCGQAyCiBfA7QCZBgBfiJQBJhnA2kOQA1k9AbiKQAwjtA+gx");
	this.shape_1055.setTransform(530.5,524.5569);

	this.shape_1056 = new cjs.Shape();
	this.shape_1056.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AmEgZQARDjAqCGQAzChBfA7QCbBgBgiIQBLhnA1kNQA2k8AciKQAwjsA/gx");
	this.shape_1056.setTransform(530.95,523.9319);

	this.shape_1057 = new cjs.Shape();
	this.shape_1057.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AmIgZQARDjArCFQAzChBhA6QCdBgBgiIQBLhnA3kMQA2k7AciJQAxjrA/gx");
	this.shape_1057.setTransform(531.375,523.2862);

	this.shape_1058 = new cjs.Shape();
	this.shape_1058.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AGOpPQhBAwgxDrQgcCJg3E6Qg4ELhLBnQhiCHifhfQhhg7g0igQgriFgSji");
	this.shape_1058.setTransform(571.35,463,1,1,0,0,0,39.5,-59.6);

	this.shape_1059 = new cjs.Shape();
	this.shape_1059.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AmHgZQASDkArCFQAyCiBgA6QCcBhBhiJQBLhnA2kNQA3k8AbiKQAwjsBAgx");
	this.shape_1059.setTransform(531.25,523.0983);

	this.shape_1060 = new cjs.Shape();
	this.shape_1060.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AmBgZQARDlAqCHQAyCiBfA7QCaBhBfiJQBJhoA2kPQA1k+AciLQAvjuA/gx");
	this.shape_1060.setTransform(530.65,523.5441);

	this.shape_1061 = new cjs.Shape();
	this.shape_1061.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Al8gaQARDnAqCHQAxCjBdA8QCYBhBeiKQBIhoA1kRQA1lAAbiLQAvjvA9gy");
	this.shape_1061.setTransform(530.05,524.0019);

	this.shape_1062 = new cjs.Shape();
	this.shape_1062.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Al2gaQARDoApCJQAwCkBcA8QCWBiBciLQBHhpA0kTQA0lCAbiMQAujxA9gy");
	this.shape_1062.setTransform(529.475,524.4512);

	this.shape_1063 = new cjs.Shape();
	this.shape_1063.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlwgaQAQDqApCJQAvClBbA8QCUBjBaiMQBGhqA0kUQAzlEAaiNQAtjyA8gy");
	this.shape_1063.setTransform(528.85,524.9254);

	this.shape_1064 = new cjs.Shape();
	this.shape_1064.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlqgaQAQDrAnCKQAvCmBaA9QCQBjBaiMQBFhrAzkWQAylGAZiOQAtj0A7gy");
	this.shape_1064.setTransform(528.275,525.3961);

	this.shape_1065 = new cjs.Shape();
	this.shape_1065.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AllgaQAQDtAnCKQAvCoBXA9QCPBkBYiOQBEhrAykYQAxlIAZiPQAsj1A7gz");
	this.shape_1065.setTransform(527.675,525.8411);

	this.shape_1066 = new cjs.Shape();
	this.shape_1066.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlfgbQAQDuAmCMQAuCoBWA+QCMBkBXiOQBDhsAxkZQAxlKAYiQQAsj3A5gz");
	this.shape_1066.setTransform(527.075,526.3032);

	this.shape_1067 = new cjs.Shape();
	this.shape_1067.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlZgbQAPDwAmCNQAtCpBVA+QCKBlBViPQBChtAwkbQAwlMAYiRQArj4A4gz");
	this.shape_1067.setTransform(526.475,526.7404);

	this.shape_1068 = new cjs.Shape();
	this.shape_1068.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlUgbQAPDxAlCOQAtCqBTA+QCIBmBUiQQBAhtAwkdQAvlOAYiSQAqj6A3gz");
	this.shape_1068.setTransform(525.9,527.2232);

	this.shape_1069 = new cjs.Shape();
	this.shape_1069.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlOgbQAPDzAlCOQArCrBSA/QCGBmBSiRQBAhuAukeQAvlRAXiSQApj7A3g0");
	this.shape_1069.setTransform(525.275,527.6932);

	this.shape_1070 = new cjs.Shape();
	this.shape_1070.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlIgbQAOD0AkCPQArCsBRA/QCDBnBRiSQA/huAukgQAtlTAXiTQApj9A1g0");
	this.shape_1070.setTransform(524.675,528.1303);

	this.shape_1071 = new cjs.Shape();
	this.shape_1071.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AlCgcQAOD2AjCQQAqCtBQBAQCBBnBPiSQA+hvAtkiQAslVAXiUQAoj+A0g0");
	this.shape_1071.setTransform(524.075,528.5925);

	this.shape_1072 = new cjs.Shape();
	this.shape_1072.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ak9gcQAOD4AjCQQAqCvBNA/QB/BpBOiUQA9hwAskjQAslXAWiVQAnj/A0g1");
	this.shape_1072.setTransform(523.475,529.0374);

	this.shape_1073 = new cjs.Shape();
	this.shape_1073.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("Ak3gcQAND5AjCRQAoCwBNBAQB8BpBNiVQA7hwAskmQArlYAWiWQAmkBAzg1");
	this.shape_1073.setTransform(522.9,529.5203);

	this.shape_1074 = new cjs.Shape();
	this.shape_1074.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkxgcQAND6AiCSQAoCxBLBAQB6BqBLiWQA6hxArknQAqlaAWiXQAmkDAxg1");
	this.shape_1074.setTransform(522.275,529.9824);

	this.shape_1075 = new cjs.Shape();
	this.shape_1075.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AksgcQAND8AhCTQAnCxBKBBQB4BqBKiWQA5hyAqkpQAplcAViYQAlkEAxg2");
	this.shape_1075.setTransform(521.7,530.4317);

	this.shape_1076 = new cjs.Shape();
	this.shape_1076.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkmgdQAND+AgCUQAnCyBIBBQB2BrBIiXQA4hyApkrQApleAUiZQAlkFAwg2");
	this.shape_1076.setTransform(521.1,530.8895);

	this.shape_1077 = new cjs.Shape();
	this.shape_1077.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkggdQAND/AfCVQAmCzBHBCQBzBrBHiYQA3hyAoktQAolgAUiZQAlkIAug2");
	this.shape_1077.setTransform(520.5,531.3352);

	this.shape_1078 = new cjs.Shape();
	this.shape_1078.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AEbqbQguA2gjEJQgUCagnFjQgnEug2BzQhGCZhxhsQhFhCgli0QgfiWgNkA");
	this.shape_1078.setTransform(548.2,464.9,1,1,0,0,0,28.3,-66.9);

	this.shape_1079 = new cjs.Shape();
	this.shape_1079.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgdQAND/AfCVQAlCzBFBCQBxBrBGiYQA2hzAnksQAnlhAUiZQAjkHAug2");
	this.shape_1079.setTransform(519.9,532.5224);

	this.shape_1080 = new cjs.Shape();
	this.shape_1080.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgdQAND+AfCTQAlCzBFBBQBxBrBGiXQA2hzAnkqQAnleAUiZQAjkGAug2");
	this.shape_1080.setTransform(519.9,533.2024);

	this.shape_1081 = new cjs.Shape();
	this.shape_1081.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgdQAND8AfCTQAlCyBFBBQBxBqBGiXQA2hxAnkpQAnlcAUiYQAjkEAug2");
	this.shape_1081.setTransform(519.9,533.9153);

	this.shape_1082 = new cjs.Shape();
	this.shape_1082.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgdQAND7AfCSQAlCwBFBBQBxBpBGiVQA2hxAnknQAnlaAUiXQAjkDAug1");
	this.shape_1082.setTransform(519.9,534.6074);

	this.shape_1083 = new cjs.Shape();
	this.shape_1083.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgcQAND5AfCRQAlCwBFBAQBxBpBGiVQA2hwAnklQAnlZAUiVQAjkCAug1");
	this.shape_1083.setTransform(519.9,535.2996);

	this.shape_1084 = new cjs.Shape();
	this.shape_1084.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgcQAND3AfCRQAlCuBFBAQBxBoBGiUQA2hvAnkkQAnlWAUiVQAjkAAug0");
	this.shape_1084.setTransform(519.9,536.0003);

	this.shape_1085 = new cjs.Shape();
	this.shape_1085.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgcQAND2AfCQQAlCtBFA/QBxBoBGiTQA2hvAnkiQAnlUAUiUQAjj+Aug0");
	this.shape_1085.setTransform(519.9,536.7175);

	this.shape_1086 = new cjs.Shape();
	this.shape_1086.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgcQAND1AfCOQAlCtBFA/QBxBnBGiSQA2hvAnkgQAnlSAUiTQAjj9Aug0");
	this.shape_1086.setTransform(519.9,537.4053);

	this.shape_1087 = new cjs.Shape();
	this.shape_1087.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgcQANDzAfCOQAlCrBFA/QBxBmBGiRQA2htAnkfQAnlQAUiSQAjj7Aug0");
	this.shape_1087.setTransform(519.9,538.1061);

	this.shape_1088 = new cjs.Shape();
	this.shape_1088.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgbQANDxAfCNQAlCqBFA+QBxBmBGiQQA2htAnkcQAnlOAUiSQAjj5Aug0");
	this.shape_1088.setTransform(519.9,538.8146);

	this.shape_1089 = new cjs.Shape();
	this.shape_1089.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgbQANDwAfCMQAlCpBFA+QBxBlBGiPQA2hsAnkbQAnlMAUiRQAjj4Augz");
	this.shape_1089.setTransform(519.9,539.5154);

	this.shape_1090 = new cjs.Shape();
	this.shape_1090.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgbQANDuAfCMQAlCoBFA9QBxBlBGiPQA2hrAnkZQAnlKAUiQQAjj2Augz");
	this.shape_1090.setTransform(519.9,540.2032);

	this.shape_1091 = new cjs.Shape();
	this.shape_1091.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgbQANDtAfCLQAlCnBFA9QBxBkBGiOQA2hrAnkXQAnlIAUiPQAjj1Augy");
	this.shape_1091.setTransform(519.9,540.9204);

	this.shape_1092 = new cjs.Shape();
	this.shape_1092.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgbQANDsAfCKQAlClBFA9QBxBjBGiMQA2hqAnkWQAnlGAUiOQAjjzAugy");
	this.shape_1092.setTransform(519.9,541.6211);

	this.shape_1093 = new cjs.Shape();
	this.shape_1093.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgaQANDqAfCIQAlClBFA9QBxBiBGiLQA2hqAnkUQAnlEAUiNQAjjyAugy");
	this.shape_1093.setTransform(519.9,542.3133);

	this.shape_1094 = new cjs.Shape();
	this.shape_1094.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgaQANDoAfCIQAlCkBFA8QBxBiBGiLQA2hpAnkSQAnlCAUiMQAjjwAugy");
	this.shape_1094.setTransform(519.9,543.0054);

	this.shape_1095 = new cjs.Shape();
	this.shape_1095.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgaQANDnAfCHQAlCjBFA7QBxBiBGiKQA2hoAnkRQAnlAAUiLQAjjvAugx");
	this.shape_1095.setTransform(519.9,543.7183);

	this.shape_1096 = new cjs.Shape();
	this.shape_1096.graphics.f().s("#A6A6A6").ss(2.4,1,1).p("AkbgZQANDlAfCGQAlCiBFA7QBxBhBGiJQA2hoAnkOQAnk+AUiKQAjjuAugx");
	this.shape_1096.setTransform(519.9,544.3983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1023}]}).to({state:[{t:this.shape_1024}]},1).to({state:[{t:this.shape_1025}]},1).to({state:[{t:this.shape_1026}]},1).to({state:[{t:this.shape_1027}]},1).to({state:[{t:this.shape_1028}]},1).to({state:[{t:this.shape_1029}]},1).to({state:[{t:this.shape_1030}]},1).to({state:[{t:this.shape_1031}]},1).to({state:[{t:this.shape_1032}]},1).to({state:[{t:this.shape_1033}]},1).to({state:[{t:this.shape_1034}]},1).to({state:[{t:this.shape_1035}]},1).to({state:[{t:this.shape_1036}]},1).to({state:[{t:this.shape_1037}]},1).to({state:[{t:this.shape_1038}]},1).to({state:[{t:this.shape_1039}]},1).to({state:[{t:this.shape_1040}]},1).to({state:[{t:this.shape_1041}]},1).to({state:[{t:this.shape_1042}]},1).to({state:[{t:this.shape_1043}]},1).to({state:[{t:this.shape_1044}]},1).to({state:[{t:this.shape_1045}]},1).to({state:[{t:this.shape_1046}]},1).to({state:[{t:this.shape_1047}]},1).to({state:[{t:this.shape_1048}]},1).to({state:[{t:this.shape_1049}]},1).to({state:[{t:this.shape_1050}]},1).to({state:[{t:this.shape_1051}]},1).to({state:[{t:this.shape_1052}]},1).to({state:[{t:this.shape_1053}]},1).to({state:[{t:this.shape_1054}]},1).to({state:[{t:this.shape_1055}]},1).to({state:[{t:this.shape_1056}]},1).to({state:[{t:this.shape_1057}]},1).to({state:[{t:this.shape_1058}]},1).to({state:[{t:this.shape_1059}]},1).to({state:[{t:this.shape_1060}]},1).to({state:[{t:this.shape_1061}]},1).to({state:[{t:this.shape_1062}]},1).to({state:[{t:this.shape_1063}]},1).to({state:[{t:this.shape_1064}]},1).to({state:[{t:this.shape_1065}]},1).to({state:[{t:this.shape_1066}]},1).to({state:[{t:this.shape_1067}]},1).to({state:[{t:this.shape_1068}]},1).to({state:[{t:this.shape_1069}]},1).to({state:[{t:this.shape_1070}]},1).to({state:[{t:this.shape_1071}]},1).to({state:[{t:this.shape_1072}]},1).to({state:[{t:this.shape_1073}]},1).to({state:[{t:this.shape_1074}]},1).to({state:[{t:this.shape_1075}]},1).to({state:[{t:this.shape_1076}]},1).to({state:[{t:this.shape_1077}]},1).to({state:[{t:this.shape_1078}]},1).to({state:[{t:this.shape_1079}]},1).to({state:[{t:this.shape_1080}]},1).to({state:[{t:this.shape_1081}]},1).to({state:[{t:this.shape_1082}]},1).to({state:[{t:this.shape_1083}]},1).to({state:[{t:this.shape_1084}]},1).to({state:[{t:this.shape_1085}]},1).to({state:[{t:this.shape_1086}]},1).to({state:[{t:this.shape_1087}]},1).to({state:[{t:this.shape_1088}]},1).to({state:[{t:this.shape_1089}]},1).to({state:[{t:this.shape_1090}]},1).to({state:[{t:this.shape_1091}]},1).to({state:[{t:this.shape_1092}]},1).to({state:[{t:this.shape_1093}]},1).to({state:[{t:this.shape_1094}]},1).to({state:[{t:this.shape_1095}]},1).to({state:[{t:this.shape_1096}]},1).to({state:[{t:this.shape_1023}]},1).wait(1));

	// schnur_za_1
	this.shape_1097 = new cjs.Shape();
	this.shape_1097.graphics.f().s("#000000").ss(2.4,1,1).p("AEbpSQgtAwgjDsQgUCKgoE7QgnENg2BnQhGCIhxhgQhFg7gligQgfiGgNjk");
	this.shape_1097.setTransform(546.85,484.2,0.9295,0.99,0,0,0,29.1,-59.8);

	this.shape_1098 = new cjs.Shape();
	this.shape_1098.graphics.f().s("#000000").ss(2.4,1,1).p("AkJgaQAMDjAdCFQAjCfBBA7QBqBfBBiHQAyhmAmkMQAkk6ATiIQAhjrArgw");
	this.shape_1098.setTransform(519.975,542.7534);

	this.shape_1099 = new cjs.Shape();
	this.shape_1099.graphics.f().s("#000000").ss(2.4,1,1).p("AkLgaQAMDkAdCFQAjChBCA7QBrBfBBiHQAzhnAmkNQAkk7ATiJQAhjsAsgw");
	this.shape_1099.setTransform(520.175,542.0741);

	this.shape_1100 = new cjs.Shape();
	this.shape_1100.graphics.f().s("#000000").ss(2.4,1,1).p("AkNgaQAMDlAdCGQAkChBCA7QBrBgBDiIQAzhnAlkOQAmk9ATiKQAhjsAsgx");
	this.shape_1100.setTransform(520.35,541.4233);

	this.shape_1101 = new cjs.Shape();
	this.shape_1101.graphics.f().s("#000000").ss(2.4,1,1).p("AkPgaQAMDmAeCGQAjCiBDA8QBsBgBDiJQAzhnAmkQQAmk9ATiLQAijtAsgx");
	this.shape_1101.setTransform(520.55,540.7441);

	this.shape_1102 = new cjs.Shape();
	this.shape_1102.graphics.f().s("#000000").ss(2.4,1,1).p("AkRgaQAMDnAeCHQAkCiBDA8QBtBhBDiKQA0hoAnkQQAlk/AUiLQAijvAsgx");
	this.shape_1102.setTransform(520.725,540.0812);

	this.shape_1103 = new cjs.Shape();
	this.shape_1103.graphics.f().s("#000000").ss(2.4,1,1).p("AkTgaQAMDnAeCIQAkCjBEA8QBuBhBEiKQA0hoAnkSQAmlAATiMQAijvAtgx");
	this.shape_1103.setTransform(520.925,539.4183);

	this.shape_1104 = new cjs.Shape();
	this.shape_1104.graphics.f().s("#000000").ss(2.4,1,1).p("AkWgaQANDpAeCIQAlCkBEA8QBvBhBEiKQA1hpAnkTQAmlCAUiMQAijwAugy");
	this.shape_1104.setTransform(521.1,538.739);

	this.shape_1105 = new cjs.Shape();
	this.shape_1105.graphics.f().s("#000000").ss(2.4,1,1).p("AkXgaQAMDpAfCJQAkCkBFA9QBwBiBFiLQA1hpAnkUQAnlDATiNQAjjyAtgx");
	this.shape_1105.setTransform(521.275,538.0926);

	this.shape_1106 = new cjs.Shape();
	this.shape_1106.graphics.f().s("#000000").ss(2.4,1,1).p("AkagbQANDrAfCJQAlClBFA9QBxBjBFiMQA1hqAokVQAnlEAUiOQAjjyAugy");
	this.shape_1106.setTransform(521.45,537.4133);

	this.shape_1107 = new cjs.Shape();
	this.shape_1107.graphics.f().s("#000000").ss(2.4,1,1).p("AkcgbQANDsAfCJQAlCmBGA9QBxBjBGiMQA2hqAokWQAnlGAUiOQAjj0Augy");
	this.shape_1107.setTransform(521.65,536.7504);

	this.shape_1108 = new cjs.Shape();
	this.shape_1108.graphics.f().s("#000000").ss(2.4,1,1).p("AkegbQANDtAfCKQAmCnBGA9QByBjBHiMQA2hrAokXQAolIAUiOQAjj1Avgy");
	this.shape_1108.setTransform(521.825,536.0876);

	this.shape_1109 = new cjs.Shape();
	this.shape_1109.graphics.f().s("#000000").ss(2.4,1,1).p("AkggbQANDuAgCKQAlCoBHA9QBzBkBHiNQA3hsAokYQAolJAUiPQAkj1Avgz");
	this.shape_1109.setTransform(522.025,535.4083);

	this.shape_1110 = new cjs.Shape();
	this.shape_1110.graphics.f().s("#000000").ss(2.4,1,1).p("AkigbQANDuAgCMQAmCoBHA9QB0BlBHiOQA3hsApkaQAplJAUiQQAkj3Avgy");
	this.shape_1110.setTransform(522.2,534.7575);

	this.shape_1111 = new cjs.Shape();
	this.shape_1111.graphics.f().s("#000000").ss(2.4,1,1).p("AkkgbQAMDwAhCLQAmCpBIA+QB1BlBIiPQA3hsApkbQAplLAUiQQAkj4Awgz");
	this.shape_1111.setTransform(522.4,534.0782);

	this.shape_1112 = new cjs.Shape();
	this.shape_1112.graphics.f().s("#000000").ss(2.4,1,1).p("AkqgbQANDwAhCMQAnCpBJA+QB3BkBKiOQA5hsApkcQAqlLAUiRQAlj4Axgz");
	this.shape_1112.setTransform(523.025,532.7532);

	this.shape_1113 = new cjs.Shape();
	this.shape_1113.graphics.f().s("#000000").ss(2.4,1,1).p("AkugbQANDvAiCMQAnCoBLA+QB4BkBLiOQA5hsAqkaQArlLAViQQAlj3Axgz");
	this.shape_1113.setTransform(523.425,532.1075);

	this.shape_1114 = new cjs.Shape();
	this.shape_1114.graphics.f().s("#000000").ss(2.4,1,1).p("AkygbQANDuAiCMQAoCoBMA9QB6BlBLiOQA7hsAqkZQArlKAViQQAmj2Aygz");
	this.shape_1114.setTransform(523.875,531.4825);

	this.shape_1115 = new cjs.Shape();
	this.shape_1115.graphics.f().s("#000000").ss(2.4,1,1).p("Ak2gbQANDuAjCLQAoCnBNA+QB7BkBNiOQA7hrArkZQArlJAWiPQAmj2Azgy");
	this.shape_1115.setTransform(524.325,530.8204);

	this.shape_1116 = new cjs.Shape();
	this.shape_1116.graphics.f().s("#000000").ss(2.4,1,1).p("Ak6gbQAODtAjCLQAoCnBOA9QB9BkBNiNQA8hrAtkYQArlIAWiPQAnj1Azgy");
	this.shape_1116.setTransform(524.75,530.1833);

	this.shape_1117 = new cjs.Shape();
	this.shape_1117.graphics.f().s("#000000").ss(2.4,1,1).p("Ak+gbQAODtAjCKQAqCnBOA8QB/BkBOiNQA9hrAskXQAtlHAWiOQAnj1A0gy");
	this.shape_1117.setTransform(525.175,529.5126);

	this.shape_1118 = new cjs.Shape();
	this.shape_1118.graphics.f().s("#000000").ss(2.4,1,1).p("AlCgbQAODsAjCKQArCmBPA9QCBBjBPiMQA9hrAtkWQAtlGAXiOQAnj0A1gy");
	this.shape_1118.setTransform(525.625,528.8504);

	this.shape_1119 = new cjs.Shape();
	this.shape_1119.graphics.f().s("#000000").ss(2.4,1,1).p("AlGgaQAODqAkCKQArCmBQA8QCCBjBQiMQA/hqAtkVQAtlGAXiNQApjzA1gy");
	this.shape_1119.setTransform(526.05,528.2254);

	this.shape_1120 = new cjs.Shape();
	this.shape_1120.graphics.f().s("#000000").ss(2.4,1,1).p("AlKgaQAODqAlCJQArClBRA9QCEBiBRiLQA/hqAukVQAulEAYiNQAojzA2gx");
	this.shape_1120.setTransform(526.475,527.5883);

	this.shape_1121 = new cjs.Shape();
	this.shape_1121.graphics.f().s("#000000").ss(2.4,1,1).p("AlOgaQAPDpAkCJQAsClBSA8QCGBiBSiLQBAhpAukUQAvlDAXiNQAqjyA2gy");
	this.shape_1121.setTransform(526.925,526.9262);

	this.shape_1122 = new cjs.Shape();
	this.shape_1122.graphics.f().s("#000000").ss(2.4,1,1).p("AlSgaQAPDpAlCIQAsCkBTA8QCHBiBUiLQBAhpAvkTQAwlCAXiNQAqjwA3gy");
	this.shape_1122.setTransform(527.35,526.2512);

	this.shape_1123 = new cjs.Shape();
	this.shape_1123.graphics.f().s("#000000").ss(2.4,1,1).p("AlWgaQAPDoAmCIQAsCkBVA8QCIBhBViKQBBhpAvkSQAwlBAYiNQAqjwA4gx");
	this.shape_1123.setTransform(527.775,525.614);

	this.shape_1124 = new cjs.Shape();
	this.shape_1124.graphics.f().s("#000000").ss(2.4,1,1).p("AlagaQAPDnAmCIQAtCjBWA8QCKBiBViLQBDhoAvkRQAwlBAZiMQArjvA4gx");
	this.shape_1124.setTransform(528.2,524.989);

	this.shape_1125 = new cjs.Shape();
	this.shape_1125.graphics.f().s("#000000").ss(2.4,1,1).p("AlegaQAPDnAnCHQAtCjBXA8QCLBhBXiKQBChoAxkRQAxk/AZiMQArjuA5gy");
	this.shape_1125.setTransform(528.65,524.3269);

	this.shape_1126 = new cjs.Shape();
	this.shape_1126.graphics.f().s("#000000").ss(2.4,1,1).p("AligaQAPDmAnCHQAuCjBYA7QCNBhBYiKQBDhoAxkPQAyk/AZiLQArjuA6gx");
	this.shape_1126.setTransform(529.1,523.6812);

	this.shape_1127 = new cjs.Shape();
	this.shape_1127.graphics.f().s("#000000").ss(2.4,1,1).p("AlmgaQAQDmAnCGQAvCiBYA7QCQBhBYiJQBEhoAxkPQAyk9AZiLQAtjtA6gx");
	this.shape_1127.setTransform(529.5,523.0191);

	this.shape_1128 = new cjs.Shape();
	this.shape_1128.graphics.f().s("#000000").ss(2.4,1,1).p("AlqgaQAQDlAnCGQAwCiBZA7QCRBgBZiJQBFhnAykOQAzk9AZiKQAtjtA7gx");
	this.shape_1128.setTransform(529.95,522.3569);

	this.shape_1129 = new cjs.Shape();
	this.shape_1129.graphics.f().s("#000000").ss(2.4,1,1).p("AlugZQAQDjAoCGQAwChBaA7QCSBgBaiIQBGhnAzkNQAzk8AaiKQAtjsA8gx");
	this.shape_1129.setTransform(530.4,521.7319);

	this.shape_1130 = new cjs.Shape();
	this.shape_1130.graphics.f().s("#000000").ss(2.4,1,1).p("AlygZQARDjAoCFQAxChBbA6QCUBgBbiIQBGhnA0kMQAzk7AbiJQAtjrA8gx");
	this.shape_1130.setTransform(530.8,521.0862);

	this.shape_1131 = new cjs.Shape();
	this.shape_1131.graphics.f().s("#000000").ss(2.4,1,1).p("AlxgZQARDkAoCFQAwCiBbA6QCTBhBbiJQBHhnAzkNQAzk8AaiKQAujsA8gx");
	this.shape_1131.setTransform(530.675,520.8983);

	this.shape_1132 = new cjs.Shape();
	this.shape_1132.graphics.f().s("#000000").ss(2.4,1,1).p("AlrgZQAQDlAnCHQAwCiBaA7QCRBhBZiJQBGhoAykPQAyk+AaiLQAtjuA7gx");
	this.shape_1132.setTransform(530.1,521.3441);

	this.shape_1133 = new cjs.Shape();
	this.shape_1133.graphics.f().s("#000000").ss(2.4,1,1).p("AlmgaQAQDnAnCHQAvCjBYA8QCPBhBYiKQBFhoAxkRQAylAAaiLQAsjvA6gy");
	this.shape_1133.setTransform(529.525,521.8019);

	this.shape_1134 = new cjs.Shape();
	this.shape_1134.graphics.f().s("#000000").ss(2.4,1,1).p("AlhgaQAQDoAnCJQAuCkBWA8QCNBiBYiLQBChpAxkTQAylCAZiMQArjxA5gy");
	this.shape_1134.setTransform(528.95,522.2512);

	this.shape_1135 = new cjs.Shape();
	this.shape_1135.graphics.f().s("#000000").ss(2.4,1,1).p("AlbgaQAPDqAmCJQAtClBWA8QCLBjBViMQBChqAxkUQAwlEAYiNQArjyA5gy");
	this.shape_1135.setTransform(528.4,522.7254);

	this.shape_1136 = new cjs.Shape();
	this.shape_1136.graphics.f().s("#000000").ss(2.4,1,1).p("AlVgaQAPDrAlCKQAtCmBUA9QCJBjBUiMQBBhrAwkWQAvlGAYiOQAqj0A4gy");
	this.shape_1136.setTransform(527.8,523.1961);

	this.shape_1137 = new cjs.Shape();
	this.shape_1137.graphics.f().s("#000000").ss(2.4,1,1).p("AlQgaQAPDtAlCKQAsCoBSA9QCHBkBTiOQBAhrAvkYQAulIAYiPQAqj1A2gz");
	this.shape_1137.setTransform(527.225,523.6411);

	this.shape_1138 = new cjs.Shape();
	this.shape_1138.graphics.f().s("#000000").ss(2.4,1,1).p("AlLgbQAODuAlCMQArCoBSA+QCEBkBRiOQBAhsAukZQAulKAXiQQApj3A2gz");
	this.shape_1138.setTransform(526.65,524.1032);

	this.shape_1139 = new cjs.Shape();
	this.shape_1139.graphics.f().s("#000000").ss(2.4,1,1).p("AlGgbQAODwAkCNQArCpBQA+QCCBlBRiPQA9htAukbQAtlMAYiRQAoj4A0gz");
	this.shape_1139.setTransform(526.1,524.5404);

	this.shape_1140 = new cjs.Shape();
	this.shape_1140.graphics.f().s("#000000").ss(2.4,1,1).p("AlAgbQAODxAjCOQAqCqBPA+QCABmBPiQQA9htAskdQAtlOAXiSQAnj6A0gz");
	this.shape_1140.setTransform(525.525,525.0232);

	this.shape_1141 = new cjs.Shape();
	this.shape_1141.graphics.f().s("#000000").ss(2.4,1,1).p("Ak7gbQAODzAjCOQApCrBOA/QB9BmBOiRQA8huAskeQAslRAWiSQAnj7Azg0");
	this.shape_1141.setTransform(524.925,525.4932);

	this.shape_1142 = new cjs.Shape();
	this.shape_1142.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gbQAND0AiCPQApCsBMA/QB8BnBMiSQA7huArkgQArlTAWiTQAmj9Ayg0");
	this.shape_1142.setTransform(524.375,525.9303);

	this.shape_1143 = new cjs.Shape();
	this.shape_1143.graphics.f().s("#000000").ss(2.4,1,1).p("AkwgcQAND2AiCQQAoCtBLBAQB5BnBLiSQA6hvAqkiQArlVAViUQAmj+Axg0");
	this.shape_1143.setTransform(523.8,526.3925);

	this.shape_1144 = new cjs.Shape();
	this.shape_1144.graphics.f().s("#000000").ss(2.4,1,1).p("AkrgcQAND4AhCQQAoCvBJA/QB3BpBKiUQA5hwApkjQAqlXAViVQAlj/Axg1");
	this.shape_1144.setTransform(523.225,526.8374);

	this.shape_1145 = new cjs.Shape();
	this.shape_1145.graphics.f().s("#000000").ss(2.4,1,1).p("AklgcQAND5AgCRQAnCwBIBAQB1BpBIiVQA4hwApkmQAplYAViWQAjkBAwg1");
	this.shape_1145.setTransform(522.65,527.3203);

	this.shape_1146 = new cjs.Shape();
	this.shape_1146.graphics.f().s("#000000").ss(2.4,1,1).p("AkggcQAND6AfCSQAmCxBHBAQBzBqBHiWQA3hxAoknQAolaAViXQAjkDAvg1");
	this.shape_1146.setTransform(522.075,527.7824);

	this.shape_1147 = new cjs.Shape();
	this.shape_1147.graphics.f().s("#000000").ss(2.4,1,1).p("AkbgcQAND8AfCTQAlCxBFBBQByBqBFiWQA2hyAokpQAnlcAUiYQAjkEAug2");
	this.shape_1147.setTransform(521.5,528.2317);

	this.shape_1148 = new cjs.Shape();
	this.shape_1148.graphics.f().s("#000000").ss(2.4,1,1).p("AkVgdQAMD+AfCUQAkCyBEBBQBvBrBEiXQA1hyAnkrQAmleAUiZQAikFAtg2");
	this.shape_1148.setTransform(520.925,528.6895);

	this.shape_1149 = new cjs.Shape();
	this.shape_1149.graphics.f().s("#000000").ss(2.4,1,1).p("AkQgdQAMD/AeCVQAkCzBCBCQBtBrBDiYQA0hyAmktQAllgAUiZQAikIAsg2");
	this.shape_1149.setTransform(520.35,529.1352);

	this.shape_1150 = new cjs.Shape();
	this.shape_1150.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgdQALD/AeCVQAjCzBBBCQBrBrBBiYQAzhzAlksQAllhATiZQAhkHArg2");
	this.shape_1150.setTransform(519.775,530.3224);

	this.shape_1151 = new cjs.Shape();
	this.shape_1151.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgdQALD+AeCTQAjCzBBBBQBrBrBBiXQAzhzAlkqQAlleATiZQAhkGArg2");
	this.shape_1151.setTransform(519.775,531.0024);

	this.shape_1152 = new cjs.Shape();
	this.shape_1152.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgdQALD8AeCTQAjCyBBBBQBrBqBBiXQAzhxAlkpQAllcATiYQAhkEArg2");
	this.shape_1152.setTransform(519.775,531.7153);

	this.shape_1153 = new cjs.Shape();
	this.shape_1153.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgdQALD7AeCSQAjCwBBBBQBrBpBBiVQAzhxAlknQAllaATiXQAhkDArg1");
	this.shape_1153.setTransform(519.775,532.4074);

	this.shape_1154 = new cjs.Shape();
	this.shape_1154.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgcQALD5AeCRQAjCwBBBAQBrBpBBiVQAzhwAlklQAllZATiVQAhkCArg1");
	this.shape_1154.setTransform(519.775,533.0996);

	this.shape_1155 = new cjs.Shape();
	this.shape_1155.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgcQALD3AeCRQAjCuBBBAQBrBoBBiUQAzhvAlkkQAllWATiVQAhkAArg0");
	this.shape_1155.setTransform(519.775,533.8003);

	this.shape_1156 = new cjs.Shape();
	this.shape_1156.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgcQALD2AeCQQAjCtBBA/QBrBoBBiTQAzhvAlkiQAllUATiUQAhj+Arg0");
	this.shape_1156.setTransform(519.775,534.5175);

	this.shape_1157 = new cjs.Shape();
	this.shape_1157.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgcQALD1AeCOQAjCtBBA/QBrBnBBiSQAzhvAlkgQAllSATiTQAhj9Arg0");
	this.shape_1157.setTransform(519.775,535.2053);

	this.shape_1158 = new cjs.Shape();
	this.shape_1158.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgcQALDzAeCOQAjCrBBA/QBrBmBBiRQAzhtAlkfQAllQATiSQAhj7Arg0");
	this.shape_1158.setTransform(519.775,535.9061);

	this.shape_1159 = new cjs.Shape();
	this.shape_1159.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgbQALDxAeCNQAjCqBBA+QBrBmBBiQQAzhtAlkcQAllOATiSQAhj5Arg0");
	this.shape_1159.setTransform(519.775,536.6146);

	this.shape_1160 = new cjs.Shape();
	this.shape_1160.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgbQALDwAeCMQAjCpBBA+QBrBlBBiPQAzhsAlkbQAllMATiRQAhj4Argz");
	this.shape_1160.setTransform(519.775,537.3154);

	this.shape_1161 = new cjs.Shape();
	this.shape_1161.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgbQALDuAeCMQAjCoBBA9QBrBlBBiPQAzhrAlkZQAllKATiQQAhj2Argz");
	this.shape_1161.setTransform(519.775,538.0032);

	this.shape_1162 = new cjs.Shape();
	this.shape_1162.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgbQALDtAeCLQAjCnBBA9QBrBkBBiOQAzhrAlkXQAllIATiPQAhj1Argy");
	this.shape_1162.setTransform(519.775,538.7204);

	this.shape_1163 = new cjs.Shape();
	this.shape_1163.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgbQALDsAeCKQAjClBBA9QBrBjBBiMQAzhqAlkWQAllGATiOQAhjzArgy");
	this.shape_1163.setTransform(519.775,539.4211);

	this.shape_1164 = new cjs.Shape();
	this.shape_1164.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgaQALDqAeCIQAjClBBA9QBrBiBBiLQAzhqAlkUQAllEATiNQAhjyArgy");
	this.shape_1164.setTransform(519.775,540.1133);

	this.shape_1165 = new cjs.Shape();
	this.shape_1165.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgaQALDoAeCIQAjCkBBA8QBrBiBBiLQAzhpAlkSQAllCATiMQAhjwArgy");
	this.shape_1165.setTransform(519.775,540.8054);

	this.shape_1166 = new cjs.Shape();
	this.shape_1166.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgaQALDnAeCHQAjCjBBA7QBrBiBBiKQAzhoAlkRQAllAATiLQAhjvArgx");
	this.shape_1166.setTransform(519.775,541.5183);

	this.shape_1167 = new cjs.Shape();
	this.shape_1167.graphics.f().s("#000000").ss(2.4,1,1).p("AkKgZQALDlAeCGQAjCiBBA7QBrBhBBiJQAzhoAlkOQAlk+ATiKQAhjuArgx");
	this.shape_1167.setTransform(519.775,542.1983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1097}]}).to({state:[{t:this.shape_1098}]},1).to({state:[{t:this.shape_1099}]},1).to({state:[{t:this.shape_1100}]},1).to({state:[{t:this.shape_1101}]},1).to({state:[{t:this.shape_1102}]},1).to({state:[{t:this.shape_1103}]},1).to({state:[{t:this.shape_1104}]},1).to({state:[{t:this.shape_1105}]},1).to({state:[{t:this.shape_1106}]},1).to({state:[{t:this.shape_1107}]},1).to({state:[{t:this.shape_1108}]},1).to({state:[{t:this.shape_1109}]},1).to({state:[{t:this.shape_1110}]},1).to({state:[{t:this.shape_1111}]},1).to({state:[{t:this.shape_1097}]},1).to({state:[{t:this.shape_1112}]},1).to({state:[{t:this.shape_1113}]},1).to({state:[{t:this.shape_1114}]},1).to({state:[{t:this.shape_1115}]},1).to({state:[{t:this.shape_1116}]},1).to({state:[{t:this.shape_1117}]},1).to({state:[{t:this.shape_1118}]},1).to({state:[{t:this.shape_1119}]},1).to({state:[{t:this.shape_1120}]},1).to({state:[{t:this.shape_1121}]},1).to({state:[{t:this.shape_1122}]},1).to({state:[{t:this.shape_1123}]},1).to({state:[{t:this.shape_1124}]},1).to({state:[{t:this.shape_1125}]},1).to({state:[{t:this.shape_1126}]},1).to({state:[{t:this.shape_1127}]},1).to({state:[{t:this.shape_1128}]},1).to({state:[{t:this.shape_1129}]},1).to({state:[{t:this.shape_1130}]},1).to({state:[{t:this.shape_1097}]},1).to({state:[{t:this.shape_1131}]},1).to({state:[{t:this.shape_1132}]},1).to({state:[{t:this.shape_1133}]},1).to({state:[{t:this.shape_1134}]},1).to({state:[{t:this.shape_1135}]},1).to({state:[{t:this.shape_1136}]},1).to({state:[{t:this.shape_1137}]},1).to({state:[{t:this.shape_1138}]},1).to({state:[{t:this.shape_1139}]},1).to({state:[{t:this.shape_1140}]},1).to({state:[{t:this.shape_1141}]},1).to({state:[{t:this.shape_1142}]},1).to({state:[{t:this.shape_1143}]},1).to({state:[{t:this.shape_1144}]},1).to({state:[{t:this.shape_1145}]},1).to({state:[{t:this.shape_1146}]},1).to({state:[{t:this.shape_1147}]},1).to({state:[{t:this.shape_1148}]},1).to({state:[{t:this.shape_1149}]},1).to({state:[{t:this.shape_1097}]},1).to({state:[{t:this.shape_1150}]},1).to({state:[{t:this.shape_1151}]},1).to({state:[{t:this.shape_1152}]},1).to({state:[{t:this.shape_1153}]},1).to({state:[{t:this.shape_1154}]},1).to({state:[{t:this.shape_1155}]},1).to({state:[{t:this.shape_1156}]},1).to({state:[{t:this.shape_1157}]},1).to({state:[{t:this.shape_1158}]},1).to({state:[{t:this.shape_1159}]},1).to({state:[{t:this.shape_1160}]},1).to({state:[{t:this.shape_1161}]},1).to({state:[{t:this.shape_1162}]},1).to({state:[{t:this.shape_1163}]},1).to({state:[{t:this.shape_1164}]},1).to({state:[{t:this.shape_1165}]},1).to({state:[{t:this.shape_1166}]},1).to({state:[{t:this.shape_1167}]},1).to({state:[{t:this.shape_1097}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_1097).to({_off:true},1).wait(14).to({_off:false,regX:28.3,regY:-59.6,scaleX:1.0411,scaleY:1.054,x:552,y:470.6},0).to({_off:true},1).wait(19).to({_off:false,regX:28.1,regY:-59.9,scaleX:1.3227,scaleY:0.9951,x:568.35,y:460.8},0).to({_off:true},1).wait(19).to({_off:false,regX:28.4,regY:-59.6,scaleX:0.9433,scaleY:1.1227,x:546.55,y:462.7},0).to({_off:true},1).wait(18).to({_off:false,regY:-59.5,scaleY:1,y:483.4},0).wait(1));

	// schnur_za_2
	this.shape_1168 = new cjs.Shape();
	this.shape_1168.graphics.f().s("#000000").ss(2.4,1,1).p("AEbpSQgtAwgjDsQgUCKgoE7QgnENg2BnQhGCIhxhgQhFg7gligQgfiGgNjk");
	this.shape_1168.setTransform(551.15,483.7,1.0928,1.0284,0,0,0,28.2,-59.7);

	this.shape_1169 = new cjs.Shape();
	this.shape_1169.graphics.f().s("#000000").ss(2.4,1,1).p("Ak3gbQAODrAiCKQApClBMA9QB8BjBNiMQA7hqArkVQAslGAViNQAnjzAygy");
	this.shape_1169.setTransform(520.55,544.6211);

	this.shape_1170 = new cjs.Shape();
	this.shape_1170.graphics.f().s("#000000").ss(2.4,1,1).p("Ak4gaQAODrAiCKQApCmBNA9QB9BjBMiNQA8hqArkWQAslFAWiPQAmjzAzgy");
	this.shape_1170.setTransform(520.725,544.0961);

	this.shape_1171 = new cjs.Shape();
	this.shape_1171.graphics.f().s("#000000").ss(2.4,1,1).p("Ak6gbQAODsAiCKQAqCmBNA9QB9BkBNiNQA8hrAskWQAslGAViPQAoj0Aygy");
	this.shape_1171.setTransform(520.9,543.6083);

	this.shape_1172 = new cjs.Shape();
	this.shape_1172.graphics.f().s("#000000").ss(2.4,1,1).p("Ak7gbQAODtAiCKQAqCnBNA9QB+BjBOiNQA8hrAskWQAslHAWiPQAnj0Azgz");
	this.shape_1172.setTransform(521.075,543.0919);

	this.shape_1173 = new cjs.Shape();
	this.shape_1173.graphics.f().s("#000000").ss(2.4,1,1).p("Ak9gbQAODtAjCKQApCnBOA+QB/BjBOiNQA8hrAtkXQAslIAWiPQAnj1A0gy");
	this.shape_1173.setTransform(521.275,542.604);

	this.shape_1174 = new cjs.Shape();
	this.shape_1174.graphics.f().s("#000000").ss(2.4,1,1).p("Ak+gbQAODuAjCLQApCnBPA9QB/BkBOiOQA9hrAtkYQAslIAWiPQAoj2Azgy");
	this.shape_1174.setTransform(521.425,542.079);

	this.shape_1175 = new cjs.Shape();
	this.shape_1175.graphics.f().s("#000000").ss(2.4,1,1).p("AlAgbQAODuAjCLQAqCoBPA9QCABkBOiOQA+hrAtkYQAslJAWiQQAoj2A0gy");
	this.shape_1175.setTransform(521.6,541.5911);

	this.shape_1176 = new cjs.Shape();
	this.shape_1176.graphics.f().s("#000000").ss(2.4,1,1).p("AlBgbQAODuAjCMQAqCnBPA+QCBBkBPiOQA9hrAtkZQAtlKAWiPQApj3A0gz");
	this.shape_1176.setTransform(521.8,541.0661);

	this.shape_1177 = new cjs.Shape();
	this.shape_1177.graphics.f().s("#000000").ss(2.4,1,1).p("AlDgbQAODvAjCLQArCoBPA+QCBBlBQiPQA+hsAtkZQAtlKAWiQQApj3A0gz");
	this.shape_1177.setTransform(521.975,540.5782);

	this.shape_1178 = new cjs.Shape();
	this.shape_1178.graphics.f().s("#000000").ss(2.4,1,1).p("AlFgbQAPDvAjCMQArCoBQA+QCCBlBQiPQA+hsAtkaQAtlKAXiRQAoj3A1gz");
	this.shape_1178.setTransform(522.125,540.0532);

	this.shape_1179 = new cjs.Shape();
	this.shape_1179.graphics.f().s("#000000").ss(2.4,1,1).p("AlGgbQAODwAkCMQAqCoBRA+QCCBlBRiPQA+hsAtkaQAulMAXiQQAoj4A1gz");
	this.shape_1179.setTransform(522.325,539.5654);

	this.shape_1180 = new cjs.Shape();
	this.shape_1180.graphics.f().s("#000000").ss(2.4,1,1).p("AlIgbQAPDxAjCMQArCpBRA+QCDBlBRiPQA+htAukbQAtlMAYiQQAoj5A2gz");
	this.shape_1180.setTransform(522.5,539.049);

	this.shape_1181 = new cjs.Shape();
	this.shape_1181.graphics.f().s("#000000").ss(2.4,1,1).p("AlKgbQAPDwAkCNQArCpBRA/QCEBlBRiQQA/hsAukcQAulNAXiQQApj5A2g0");
	this.shape_1181.setTransform(522.675,538.5611);

	this.shape_1182 = new cjs.Shape();
	this.shape_1182.graphics.f().s("#000000").ss(2.4,1,1).p("AlLgbQAODxAkCNQAsCqBRA+QCFBlBSiPQA+htAvkcQAulNAXiSQAqj5A1g0");
	this.shape_1182.setTransform(522.85,538.0361);

	this.shape_1183 = new cjs.Shape();
	this.shape_1183.graphics.f().s("#000000").ss(2.4,1,1).p("AlRgbQAODxAmCNQArCpBUA/QCGBlBUiQQBAhsAvkcQAvlNAXiRQArj6A2gz");
	this.shape_1183.setTransform(523.5,536.8861);

	this.shape_1184 = new cjs.Shape();
	this.shape_1184.graphics.f().s("#000000").ss(2.4,1,1).p("AlWgbQAPDwAmCNQAsCpBVA+QCIBlBUiPQBBhtAwkbQAvlMAYiQQArj5A4gz");
	this.shape_1184.setTransform(523.95,536.2404);

	this.shape_1185 = new cjs.Shape();
	this.shape_1185.graphics.f().s("#000000").ss(2.4,1,1).p("AlagbQAPDvAmCMQAuCpBVA+QCKBkBViOQBChsAxkbQAvlLAZiQQArj4A4gz");
	this.shape_1185.setTransform(524.425,535.6032);

	this.shape_1186 = new cjs.Shape();
	this.shape_1186.graphics.f().s("#000000").ss(2.4,1,1).p("AlegbQAPDvAmCMQAuCoBWA+QCMBkBXiOQBChsAxkaQAxlKAZiQQArj3A5gz");
	this.shape_1186.setTransform(524.9,534.9411);

	this.shape_1187 = new cjs.Shape();
	this.shape_1187.graphics.f().s("#000000").ss(2.4,1,1).p("AljgbQAQDuAmCLQAvCoBXA+QCOBkBXiOQBEhsAxkYQAxlKAZiPQAtj3A5gy");
	this.shape_1187.setTransform(525.4,534.3161);

	this.shape_1188 = new cjs.Shape();
	this.shape_1188.graphics.f().s("#000000").ss(2.4,1,1).p("AlngaQAQDtAnCLQAvCnBYA9QCQBkBZiNQBEhsAykXQAxlJAaiPQAsj2A7gy");
	this.shape_1188.setTransform(525.85,533.6454);

	this.shape_1189 = new cjs.Shape();
	this.shape_1189.graphics.f().s("#000000").ss(2.4,1,1).p("AlrgaQAQDsAnCLQAwCmBZA+QCSBjBZiNQBFhrAzkXQAylHAaiPQAtj1A7gz");
	this.shape_1189.setTransform(526.325,532.9833);

	this.shape_1190 = new cjs.Shape();
	this.shape_1190.graphics.f().s("#000000").ss(2.4,1,1).p("AlvgaQAQDsAoCKQAwCmBaA9QCTBjBbiMQBGhrA0kWQAylHAaiOQAuj0A8gz");
	this.shape_1190.setTransform(526.8,532.3461);

	this.shape_1191 = new cjs.Shape();
	this.shape_1191.graphics.f().s("#000000").ss(2.4,1,1).p("Al0gbQARDsAoCJQAxCmBbA9QCVBjBciMQBGhrA1kVQAzlGAaiOQAvjzA8gy");
	this.shape_1191.setTransform(527.25,531.7004);

	this.shape_1192 = new cjs.Shape();
	this.shape_1192.graphics.f().s("#000000").ss(2.4,1,1).p("Al4gaQAQDrAqCJQAxClBcA9QCXBiBdiLQBHhqA1kVQA0lFAbiNQAujzA9gy");
	this.shape_1192.setTransform(527.725,531.0383);

	this.shape_1193 = new cjs.Shape();
	this.shape_1193.graphics.f().s("#000000").ss(2.4,1,1).p("Al9gaQARDqAqCJQAxClBeA8QCYBiBeiLQBJhqA1kUQA0lDAciNQAvjzA9gy");
	this.shape_1193.setTransform(528.2,530.3719);

	this.shape_1194 = new cjs.Shape();
	this.shape_1194.graphics.f().s("#000000").ss(2.4,1,1).p("AmBgaQARDpAqCJQAyCkBfA8QCaBiBfiLQBJhpA2kTQA1lDAciMQAvjyA/gy");
	this.shape_1194.setTransform(528.65,529.7262);

	this.shape_1195 = new cjs.Shape();
	this.shape_1195.graphics.f().s("#000000").ss(2.4,1,1).p("AmFgaQARDpArCIQAzCkBfA8QCcBhBgiKQBKhpA3kTQA1lBAciNQAwjwA/gy");
	this.shape_1195.setTransform(529.125,529.089);

	this.shape_1196 = new cjs.Shape();
	this.shape_1196.graphics.f().s("#000000").ss(2.4,1,1).p("AmKgaQARDoAsCIQAzCjBhA8QCdBhBhiKQBLhoA4kSQA2lBAciMQAxjwA/gx");
	this.shape_1196.setTransform(529.6,528.4269);

	this.shape_1197 = new cjs.Shape();
	this.shape_1197.graphics.f().s("#000000").ss(2.4,1,1).p("AmOgaQARDnAsCHQA0CjBiA8QCfBhBiiKQBMhoA4kRQA2lAAdiLQAxjwBBgx");
	this.shape_1197.setTransform(530.1,527.8019);

	this.shape_1198 = new cjs.Shape();
	this.shape_1198.graphics.f().s("#000000").ss(2.4,1,1).p("AmSgaQASDnAsCHQA0CiBjA8QChBhBjiKQBNhoA5kQQA3k/AciLQAyjvBCgx");
	this.shape_1198.setTransform(530.55,527.1312);

	this.shape_1199 = new cjs.Shape();
	this.shape_1199.graphics.f().s("#000000").ss(2.4,1,1).p("AmXgaQASDmAtCHQA1CiBkA7QCjBhBkiJQBNhoA5kPQA4k+AdiLQAzjuBCgx");
	this.shape_1199.setTransform(531.025,526.4691);

	this.shape_1200 = new cjs.Shape();
	this.shape_1200.graphics.f().s("#000000").ss(2.4,1,1).p("AmbgaQASDmAtCGQA2ChBkA8QClBgBmiJQBOhnA6kPQA4k9AeiKQAyjtBDgx");
	this.shape_1200.setTransform(531.5,525.8319);

	this.shape_1201 = new cjs.Shape();
	this.shape_1201.graphics.f().s("#000000").ss(2.4,1,1).p("AmggaQATDlAtCGQA3ChBmA7QCmBgBmiIQBQhoA6kNQA5k8AeiKQAzjtBDgw");
	this.shape_1201.setTransform(531.95,525.1862);

	this.shape_1202 = new cjs.Shape();
	this.shape_1202.graphics.f().s("#000000").ss(2.4,1,1).p("AmegaQATDmAtCGQA2ChBmA8QCmBgBmiIQBPhoA6kPQA5k9AdiKQAzjuBDgx");
	this.shape_1202.setTransform(531.8,524.9612);

	this.shape_1203 = new cjs.Shape();
	this.shape_1203.graphics.f().s("#000000").ss(2.4,1,1).p("AmYgaQASDnAsCHQA2CjBkA7QCjBhBliJQBOhoA5kRQA4k/AdiLQAzjvBCgx");
	this.shape_1203.setTransform(531.225,525.4312);

	this.shape_1204 = new cjs.Shape();
	this.shape_1204.graphics.f().s("#000000").ss(2.4,1,1).p("AmTgaQASDoAsCIQA1CkBjA8QChBhBjiKQBNhpA4kSQA4lBAdiMQAyjxBBgx");
	this.shape_1204.setTransform(530.6,525.8769);

	this.shape_1205 = new cjs.Shape();
	this.shape_1205.graphics.f().s("#000000").ss(2.4,1,1).p("AmNgbQARDqAsCJQA0ClBhA8QCfBiBiiLQBMhqA3kTQA3lEAdiNQAxjyBAgx");
	this.shape_1205.setTransform(530,526.3512);

	this.shape_1206 = new cjs.Shape();
	this.shape_1206.graphics.f().s("#000000").ss(2.4,1,1).p("AmHgaQARDrArCKQAzClBgA9QCdBjBgiMQBLhqA2kWQA2lFAciOQAxjzA/gz");
	this.shape_1206.setTransform(529.4,526.784);

	this.shape_1207 = new cjs.Shape();
	this.shape_1207.graphics.f().s("#000000").ss(2.4,1,1).p("AmCgbQARDtAqCKQAzCnBeA9QCbBkBfiNQBJhrA2kXQA1lIAciOQAwj1A+gz");
	this.shape_1207.setTransform(528.8,527.2583);

	this.shape_1208 = new cjs.Shape();
	this.shape_1208.graphics.f().s("#000000").ss(2.4,1,1).p("Al8gbQARDvAqCLQAxCoBeA9QCYBkBdiNQBJhsA1kZQA0lJAbiQQAvj2A+gz");
	this.shape_1208.setTransform(528.175,527.6954);

	this.shape_1209 = new cjs.Shape();
	this.shape_1209.graphics.f().s("#000000").ss(2.4,1,1).p("Al2gbQAQDwApCMQAxCpBcA+QCWBkBciPQBIhsA0kaQAzlMAbiQQAuj4A9gz");
	this.shape_1209.setTransform(527.575,528.174);

	this.shape_1210 = new cjs.Shape();
	this.shape_1210.graphics.f().s("#000000").ss(2.4,1,1).p("AlwgbQAQDxAoCNQAwCqBbA+QCTBlBbiPQBGhtA0kcQAzlOAaiRQAuj6A7gz");
	this.shape_1210.setTransform(526.975,528.6111);

	this.shape_1211 = new cjs.Shape();
	this.shape_1211.graphics.f().s("#000000").ss(2.4,1,1).p("AlrgbQAQDyAoCOQAwCrBZA/QCRBmBZiRQBFhtAzkeQAylQAaiSQAtj7A7g0");
	this.shape_1211.setTransform(526.375,529.0853);

	this.shape_1212 = new cjs.Shape();
	this.shape_1212.graphics.f().s("#000000").ss(2.4,1,1).p("AllgcQAQD1AnCOQAvCsBXA/QCQBnBXiSQBEhuAykgQAxlRAaiTQAsj9A6g0");
	this.shape_1212.setTransform(525.75,529.5182);

	this.shape_1213 = new cjs.Shape();
	this.shape_1213.graphics.f().s("#000000").ss(2.4,1,1).p("AlfgcQAPD2AnCQQAuCsBWBAQCMBnBXiSQBDhvAxkiQAxlTAYiUQAsj+A5g1");
	this.shape_1213.setTransform(525.15,529.9553);

	this.shape_1214 = new cjs.Shape();
	this.shape_1214.graphics.f().s("#000000").ss(2.4,1,1).p("AlagcQAPD3AmCRQAuCuBUBAQCLBnBViTQBChvAwkkQAwlVAYiVQArkAA4g0");
	this.shape_1214.setTransform(524.55,530.4339);

	this.shape_1215 = new cjs.Shape();
	this.shape_1215.graphics.f().s("#000000").ss(2.4,1,1).p("AlUgcQAPD5AmCRQAsCvBUBAQCIBoBTiUQBBhwAwklQAvlXAYiWQAqkBA3g1");
	this.shape_1215.setTransform(523.925,530.871);

	this.shape_1216 = new cjs.Shape();
	this.shape_1216.graphics.f().s("#000000").ss(2.4,1,1).p("AlOgcQAOD6AlCSQAsCwBSBBQCGBpBSiVQBAhxAuknQAulZAYiXQAqkCA2g2");
	this.shape_1216.setTransform(523.35,531.3453);

	this.shape_1217 = new cjs.Shape();
	this.shape_1217.graphics.f().s("#000000").ss(2.4,1,1).p("AlIgcQAOD7AkCTQArCxBRBBQCDBqBRiWQA/hxAukpQAtlbAXiYQApkEA1g2");
	this.shape_1217.setTransform(522.725,531.7781);

	this.shape_1218 = new cjs.Shape();
	this.shape_1218.graphics.f().s("#000000").ss(2.4,1,1).p("AlDgdQAPD9AjCUQAqCyBPBBQCCBrBPiXQA+hyAtkqQAsleAXiYQAokGA1g2");
	this.shape_1218.setTransform(522.125,532.2524);

	this.shape_1219 = new cjs.Shape();
	this.shape_1219.graphics.f().s("#000000").ss(2.4,1,1).p("Ak9gdQAOD/AjCVQApCzBPBCQB+BqBOiXQA9hzAsksQAslgAXiZQAmkHA0g2");
	this.shape_1219.setTransform(521.5,532.6981);

	this.shape_1220 = new cjs.Shape();
	this.shape_1220.graphics.f().s("#000000").ss(2.4,1,1).p("Ak3gdQANEAAiCWQApC0BNBCQB8BrBNiZQA7hzAsktQArliAWiaQAnkJAyg2");
	this.shape_1220.setTransform(520.925,533.1681);

	this.shape_1221 = new cjs.Shape();
	this.shape_1221.graphics.f().s("#000000").ss(2.4,1,1).p("AkygdQAOEBAhCVQAoC1BLBCQB7BrBLiYQA6h0ArkuQAqliAWiaQAmkJAyg3");
	this.shape_1221.setTransform(520.325,534.2474);

	this.shape_1222 = new cjs.Shape();
	this.shape_1222.graphics.f().s("#000000").ss(2.4,1,1).p("AkygdQAND/AiCVQAoCzBLBCQB7BrBLiYQA7hzAqksQArlgAViaQAmkIAyg2");
	this.shape_1222.setTransform(520.3,534.9102);

	this.shape_1223 = new cjs.Shape();
	this.shape_1223.graphics.f().s("#000000").ss(2.4,1,1).p("AkygdQAND+AiCUQAoCzBLBBQB7BrBLiXQA7hzAqkrQArlfAViYQAnkHAxg2");
	this.shape_1223.setTransform(520.325,535.5524);

	this.shape_1224 = new cjs.Shape();
	this.shape_1224.graphics.f().s("#000000").ss(2.4,1,1).p("AkzgcQAOD8AhCUQAoCyBMBBQB6BqBMiXQA7hxAqkqQArldAViYQAnkFAyg2");
	this.shape_1224.setTransform(520.35,536.1903);

	this.shape_1225 = new cjs.Shape();
	this.shape_1225.graphics.f().s("#000000").ss(2.4,1,1).p("AkzgdQAOD8AiCTQAoCwBLBBQB7BqBLiWQA7hxArkoQAqlcAWiXQAmkEAyg1");
	this.shape_1225.setTransform(520.325,536.8695);

	this.shape_1226 = new cjs.Shape();
	this.shape_1226.graphics.f().s("#000000").ss(2.4,1,1).p("AkzgcQAND6AiCSQAoCwBMBAQB7BqBLiWQA7hwArknQArlaAViWQAmkDAyg1");
	this.shape_1226.setTransform(520.35,537.5074);

	this.shape_1227 = new cjs.Shape();
	this.shape_1227.graphics.f().s("#000000").ss(2.4,1,1).p("AkzgcQAND5AiCSQAoCvBMBAQB7BpBLiVQA7hwArklQArlYAViWQAnkCAxg1");
	this.shape_1227.setTransform(520.35,538.1496);

	this.shape_1228 = new cjs.Shape();
	this.shape_1228.graphics.f().s("#000000").ss(2.4,1,1).p("Ak0gcQAOD3AiCRQAoCuBMBAQB7BpBLiUQA8hwAqkkQArlWAViVQAnkAAyg1");
	this.shape_1228.setTransform(520.35,538.8124);

	this.shape_1229 = new cjs.Shape();
	this.shape_1229.graphics.f().s("#000000").ss(2.4,1,1).p("Ak0gcQAOD2AiCRQAoCtBMA/QB7BoBLiTQA7hvArkiQArlVAViVQAnj+Ayg1");
	this.shape_1229.setTransform(520.375,539.4546);

	this.shape_1230 = new cjs.Shape();
	this.shape_1230.graphics.f().s("#000000").ss(2.4,1,1).p("Ak0gcQAOD1AiCQQAoCsBLBAQB8BnBLiTQA7huArkhQArlTAWiUQAmj+Ayg0");
	this.shape_1230.setTransform(520.375,540.1011);

	this.shape_1231 = new cjs.Shape();
	this.shape_1231.graphics.f().s("#000000").ss(2.4,1,1).p("Ak0gbQAOD0AiCPQAoCrBLA/QB7BnBMiSQA7huArkfQArlSAWiTQAmj8Ayg0");
	this.shape_1231.setTransform(520.4,540.7432);

	this.shape_1232 = new cjs.Shape();
	this.shape_1232.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gcQAODzAiCOQAoCrBMA/QB7BmBMiRQA7htArkfQArlQAWiSQAmj7Aygz");
	this.shape_1232.setTransform(520.4,541.4061);

	this.shape_1233 = new cjs.Shape();
	this.shape_1233.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gbQAODxAiCOQAoCqBMA+QB7BmBMiQQA7htArkdQArlOAWiSQAmj5Ayg0");
	this.shape_1233.setTransform(520.4,542.0482);

	this.shape_1234 = new cjs.Shape();
	this.shape_1234.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gbQAODwAiCNQAoCpBMA+QB7BlBMiPQA7hsAskcQAqlMAWiRQAmj5Azgz");
	this.shape_1234.setTransform(520.425,542.6861);

	this.shape_1235 = new cjs.Shape();
	this.shape_1235.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gbQAODvAiCMQApCoBLA+QB8BlBMiPQA7hsArkaQArlLAViQQAnj3Aygz");
	this.shape_1235.setTransform(520.4,543.3654);

	this.shape_1236 = new cjs.Shape();
	this.shape_1236.graphics.f().s("#000000").ss(2.4,1,1).p("Ak1gbQAODuAiCLQAoCnBMA+QB8BkBLiOQA8hrArkZQArlJAWiPQAmj2Aygz");
	this.shape_1236.setTransform(520.425,544.0032);

	this.shape_1237 = new cjs.Shape();
	this.shape_1237.graphics.f().s("#000000").ss(2.4,1,1).p("Ak2gbQAODtAiCLQAoCmBMA9QB8BkBMiNQA7hrAskXQAqlIAWiOQAnj1Aygy");
	this.shape_1237.setTransform(520.45,544.6454);

	this.shape_1238 = new cjs.Shape();
	this.shape_1238.graphics.f().s("#000000").ss(2.4,1,1).p("Ak2gbQAODrAiCLQApClBMA9QB8BjBMiNQA7hqAskVQAqlGAWiOQAmj0Azgx");
	this.shape_1238.setTransform(520.425,545.3083);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1168}]}).to({state:[{t:this.shape_1169}]},1).to({state:[{t:this.shape_1170}]},1).to({state:[{t:this.shape_1171}]},1).to({state:[{t:this.shape_1172}]},1).to({state:[{t:this.shape_1173}]},1).to({state:[{t:this.shape_1174}]},1).to({state:[{t:this.shape_1175}]},1).to({state:[{t:this.shape_1176}]},1).to({state:[{t:this.shape_1177}]},1).to({state:[{t:this.shape_1178}]},1).to({state:[{t:this.shape_1179}]},1).to({state:[{t:this.shape_1180}]},1).to({state:[{t:this.shape_1181}]},1).to({state:[{t:this.shape_1182}]},1).to({state:[{t:this.shape_1168}]},1).to({state:[{t:this.shape_1183}]},1).to({state:[{t:this.shape_1184}]},1).to({state:[{t:this.shape_1185}]},1).to({state:[{t:this.shape_1186}]},1).to({state:[{t:this.shape_1187}]},1).to({state:[{t:this.shape_1188}]},1).to({state:[{t:this.shape_1189}]},1).to({state:[{t:this.shape_1190}]},1).to({state:[{t:this.shape_1191}]},1).to({state:[{t:this.shape_1192}]},1).to({state:[{t:this.shape_1193}]},1).to({state:[{t:this.shape_1194}]},1).to({state:[{t:this.shape_1195}]},1).to({state:[{t:this.shape_1196}]},1).to({state:[{t:this.shape_1197}]},1).to({state:[{t:this.shape_1198}]},1).to({state:[{t:this.shape_1199}]},1).to({state:[{t:this.shape_1200}]},1).to({state:[{t:this.shape_1201}]},1).to({state:[{t:this.shape_1168}]},1).to({state:[{t:this.shape_1202}]},1).to({state:[{t:this.shape_1203}]},1).to({state:[{t:this.shape_1204}]},1).to({state:[{t:this.shape_1205}]},1).to({state:[{t:this.shape_1206}]},1).to({state:[{t:this.shape_1207}]},1).to({state:[{t:this.shape_1208}]},1).to({state:[{t:this.shape_1209}]},1).to({state:[{t:this.shape_1210}]},1).to({state:[{t:this.shape_1211}]},1).to({state:[{t:this.shape_1212}]},1).to({state:[{t:this.shape_1213}]},1).to({state:[{t:this.shape_1214}]},1).to({state:[{t:this.shape_1215}]},1).to({state:[{t:this.shape_1216}]},1).to({state:[{t:this.shape_1217}]},1).to({state:[{t:this.shape_1218}]},1).to({state:[{t:this.shape_1219}]},1).to({state:[{t:this.shape_1220}]},1).to({state:[{t:this.shape_1168}]},1).to({state:[{t:this.shape_1221}]},1).to({state:[{t:this.shape_1222}]},1).to({state:[{t:this.shape_1223}]},1).to({state:[{t:this.shape_1224}]},1).to({state:[{t:this.shape_1225}]},1).to({state:[{t:this.shape_1226}]},1).to({state:[{t:this.shape_1227}]},1).to({state:[{t:this.shape_1228}]},1).to({state:[{t:this.shape_1229}]},1).to({state:[{t:this.shape_1230}]},1).to({state:[{t:this.shape_1231}]},1).to({state:[{t:this.shape_1232}]},1).to({state:[{t:this.shape_1233}]},1).to({state:[{t:this.shape_1234}]},1).to({state:[{t:this.shape_1235}]},1).to({state:[{t:this.shape_1236}]},1).to({state:[{t:this.shape_1237}]},1).to({state:[{t:this.shape_1238}]},1).to({state:[{t:this.shape_1168}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_1168).to({_off:true},1).wait(14).to({_off:false,regX:28.1,scaleX:1.1775,scaleY:1.0585,x:556.1,y:474.35},0).to({_off:true},1).wait(19).to({_off:false,regX:28.2,regY:-59.9,scaleX:1.4843,scaleY:0.9993,x:574.25,y:464.65},0).to({_off:true},1).wait(19).to({_off:false,regX:28.1,regY:-59.7,scaleX:1.0816,scaleY:1.1274,x:550.7,y:466.3},0).to({_off:true},1).wait(18).to({_off:false,regX:28,regY:-59.9,scaleX:1.0965,scaleY:1.0269,x:551.1,y:484.4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(604.9,403.2,287.30000000000007,205.09999999999997);
// library properties:
lib.properties = {
	id: '12',
	width: 980,
	height: 680,
	fps: 25,
	color: "#FFFFFF",
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
an.compositions['12'] = {
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


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
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