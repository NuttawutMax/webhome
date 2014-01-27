/**************************************************************************
*  This file is part of the WebHome.
*  Published under the MIT license.
*  Copyright (C) by SanPolo Co.Ltd.
*
*  See https://osc.spolo.org/ for more information.
*  SanPolo Co.Ltd
**************************************************************************/

/** Because we are multiple cooperate, this file can been divide to multi-file. 
* and merge through a js compiler to generate final file.
**/

/** we using underscore.js to enable sub-module.
 * @FIXME: Shall we using more heavy library : require.js?
 */
if(!_)
{
  throw 'underscore not found.';
}

/** @FIXME: this not tested, @Dariel, plese testing it next time.
 * This allow caller to include multiple module during the time of developing.
 * We will make a build.sh like simpoe 2 step:
 * 1. cat all module to one file.
 * 2. using google cloure to break the depence to Fabric.js and Underscore.js, emit redundant code about module.
 * 3. optional, we can provide version that depend underscore and fabric.
 */
var webhome = function(){
	
  return _.extend(this, {
	_scene: null,
	_currentState: "edit",
	_keyBinding: function(){
		var that = this;
		window.onkeyup = function(e){
			if(e.keyCode == 46){ // remove object from canvas
				if(that._scene){
					that._scene.remove(that._scene.getActiveObject());
				}
			}
		}
		return this;
	},
	_createContextMenu: function(){
		window.oncontextmenu = function(){
			return false;
		}
		var that = this;
		this._scene.upperCanvasEl.addEventListener("mousedown", function(e){
			if(e.which == 3){
			}
		}, false);
	},
	create: function(CanvasID){
		try{
			this._scene = new fabric.Canvas(CanvasID);
			this._keyBinding()._createContextMenu();
			return this;
		}catch(e){
			alert("you need fabric.js library to use webhome");
		}
	},
	setBackground: function(imgSrc){
		if(this._scene){
			var scene = this._scene;
			this._scene.setBackgroundImage(imgSrc, function(){
				scene.renderAll();
			});
		}
	},
	setState: function(state){
		this._currentState = state;
		if(state == "draw"){
			this._scene.isDrawingMode = true;
			this._scene.freeDrawingBrush.width = 10;
		}else{
			this._scene.isDrawingMode = false;
		}
	},
	getState: function(){
		return this._currentState;
	}
  });
}();

