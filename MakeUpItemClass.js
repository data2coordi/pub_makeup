
import  {  
		Utility
		} from './MakeUpClass.js';



class BaseMgr{

	static preview(func){
	
		//not display desk
		BaseMgr.changeDisplay('base_desk', 'hidden');

		BaseMgr.addWindowEvent(func);
	}


	static end_preview(){
		//display desk
		BaseMgr.changeDisplay('base_desk', 'visible');
	}

	static display_score(func, score, result_map) {

		BaseMgr.changeDisplayText('base_score', Math.ceil(score) + '点')

		BaseMgr.changeDisplayText('base_ng', result_map)

		//display score
		BaseMgr.changeDisplay('base_score', 'visible');

		//display illustration
		BaseMgr.changeDisplay('base_ng', 'visible');

		//not display desk
		BaseMgr.changeDisplay('base_desk', 'hidden');

		BaseMgr.addWindowEvent(func);


	}

	static end_display_score(){
		
		//display desk
		BaseMgr.changeDisplay('base_desk', 'visible');
		BaseMgr.changeDisplay('base_score', 'hidden');
		BaseMgr.changeDisplay('base_ng', 'hidden');
	}


	static init() {
		let src ="./img/base/" + "base_" + window.season + "_kanae.png"
		BaseMgr.changeDisplayImage('base_kanae', src);
		BaseMgr.changeDisplay('base_tahban', 'visible');
		BaseMgr.changeDisplay('base_ng', 'hidden');
		BaseMgr.changeDisplay('base_dqn', 'hidden');
	}

	static changeDisplay(cssId, flag){

		let htmlTag = document.getElementById(cssId);
		htmlTag.style.visibility = flag;
	}

	static changeDisplayImage(cssId, src){
		let htmlTag = document.getElementById(cssId);
		htmlTag.setAttribute('src', src);
	}

	static changeDisplayText(cssId, text){
		console.log('cssid:' + cssId)
		console.log('test:' + text)
		document.getElementById(cssId).innerHTML = text;
	}


	static addWindowEvent(func){
		window.document.addEventListener("mousedown", func, {once: true});
	}
}

class ItemMgr{

	constructor(arg_items, arg_valRep) { 
		this.Items = arg_items;
		this.ValRep = arg_valRep;
	}


	changeDisplayState(flag){
		for (let item of this.Items) {
			item.setDisplay(flag);
		}
	}

	changeDisplayStateByKey(key, flag){
		for (let item of this.Items) {
			if (item.cssId == key) {
				item.setDisplay(flag);
				return;
			}
		}
	}
}

class GrpMgr extends ItemMgr {

}

class ColorMgr extends ItemMgr {

	changeDisplayImage(key, makeupManager){
		this.changeDisplayState('hidden');

		// if key is 'hidden', imgVals is null. So setDisplay is not called 
		if (key == 'hidden') return;

		let imgVals = this.ValRep.getVals(key)
		let i = 0;
		for (const imgVal of imgVals) {
			this.Items[i].setImgVal(imgVal);
			this.Items[i].setAction(makeupManager);
			this.Items[i].setDisplayImage();
			this.Items[i].setDisplay('visible');
			i++ ;
		}
	}


	initColorCssId(){
		for (let ct = 1; ct  < 25; ct++) {
			let cssId = 'color' + '_' + ('0'+ ct).substr(-2)
			let htmlTag = document.getElementById(cssId);
			htmlTag.style.visibility = 'hidden';
		}
	}



}


class MainMgr extends ItemMgr {

	get_dqn_ct(){
		if (typeof this.dqn_ct === "undefined") {
			this.dqn_ct = 0
		}
		return this.dqn_ct;
	}

	clear_dqn_ct(){
		this.dqn_ct = 0;
	}
	changeDisplayImage(arg_grp, arg_color){

		let i = 0;
		let imgVals = this.ValRep.getVals(arg_grp);
		let imgVal = {};
		if (typeof this.dqn_ct === "undefined") {
			this.dqn_ct = 0
		}


		let existCheckFlag = 'notExist';
		for (const val of imgVals) {
			if (val.color  == arg_color){
				imgVal = val;
				existCheckFlag = 'Exist'
				break;
			}
		}

		Utility.existCheck(existCheckFlag, arg_color, imgVals);


		existCheckFlag = 'notExist';
		for (let item of this.Items){

			if (item.getGrp() === arg_grp){

				item.setImgVal(imgVal);
				item.setDisplayImage();
				item.setDisplay('visible');
				existCheckFlag = 'Exist'
				if (item.getSeason() != window.season) {
					this.dqn_ct = this.dqn_ct  + 1;
				}
				break;
			}
		}
		Utility.existCheck(existCheckFlag, arg_grp, this.Items);
	}
}
// item
class Item {

	//this.cssId	
	//this.val
	constructor(cssId) { 
		this.cssId = cssId
	}


	setImgVal(val){
		this.val = val
	}

	getCssId(){
		return 	this.cssId;
	}


	getSrc(){
		if (typeof this.val === "undefined") {
			throw new Error("val is not exit in item, object:" +  JSON.stringify(this));	
		} else {
			return this.val.src
		}

	}

	setDisplay(flag){

		let htmlTag = document.getElementById(this.cssId);
		htmlTag.style.visibility = flag;
	}

	getDisplayStatus(){
		return 	document.getElementById(this.cssId).style.visibility;
	}

	setDisplayImage(){

		let htmlTag = document.getElementById(this.cssId);
		htmlTag.setAttribute('src', this.getSrc());
	}

}

class GrpItem extends Item{

	//this.cssId	
	//this.val
	setAction(makeupManager){

		const id = document.getElementById(this.cssId);

		if (id == null) throw new Error("cssid is not exist at grp:cssId:" + this.cssId);	


		let arg_val = this.val
		id.addEventListener("click", function() { makeupManager.actionGrpButton(arg_val.grp); });

	}
}

class ColorItem extends Item{
	//this.cssId	
	//this.val
	func;
	setAction(makeupManager){

		const id = document.getElementById(this.cssId);
		if (id == null) throw new Error("cssid is not exist at color:cssId:" + this.cssId);	

		let arg_val = this.val
		id.removeEventListener("click", this.func );
		this.func = function() { makeupManager.actionColorButton(arg_val.grp, arg_val.color);}
		id.addEventListener("click", this.func);
//		id.removeEventListener("click", function() { makeupManager.actionColorButton(); });
//		id.addEventListener("click", function() { makeupManager.actionColorButton(arg_val.grp, arg_val.color); });

	}

}

class MainItem extends Item{
	//this.cssId	
	//this.val
	getGrp(){
		return 	this.cssId.substr(5);
	}

	getSeason(){
		return 	this.val.color.substr(0,2);
	}
}

// value object
class ImgVal {
	//this.src
	src = ''
	constructor(src) { 
		this.src = src;
	}
}

class ImgValGrp extends ImgVal {
	//this.src
	//this.grp
	grp = ''
	constructor(src, grp) { 
		super(src);	
		this.grp = grp;
	}
}

class ImgValColor extends ImgValGrp {
	//this.src
	//this.grp
	//this.color
	color = '';
	constructor(src, grp, color) { 
		super(src, grp);	
		this.color  = color;
	}
}
class ImgValMain extends ImgValGrp {
	//this.src
	//this.grp
	//this.color
	color = '';
	constructor(src, grp, color) { 
		super(src, grp);	
		this.color  = color;
	}
}



export {  
		ImgVal, ImgValGrp, ImgValColor, ImgValMain,
		GrpItem, ColorItem, MainItem, 
		ItemMgr,
		GrpMgr,
		ColorMgr,
		MainMgr,
		BaseMgr
	};


