
import  {  
		GrpMgr,ColorMgr,MainMgr,
		GrpItem, ColorItem, MainItem, 
		ImgValGrp, ImgValColor, ImgValMain
		} from './MakeUpItemClass.js';



class ItemMgrFactory{

	setMakeupManager(makeupManager){
		this.MakeupManager = makeupManager;
	};

	createMgr(paths){
		console.log('shoud be implimented')
	}

	createItems(paths ){
		console.log('shoud be implimented')
	}


	createItem(paths ){
		console.log('shoud be implimented')
	}

	checkPathAndCssid(cssId, path){
	
		const id = document.getElementById(cssId);
		if (id == null) throw new Error("cssid and path error  : cssid:" + cssId +  " :path:" + path);	

	}

	static analyzeImgFilePath(arg_imagePath){
		// [0][1] [2]  [3]        [4]  
		// ./img/grp  /faundetion.png
		// ./img/color/faundetion/red.png
		// ./img/main /faundetion/red.png
		// ./img/base /face.png

		let tmpSplitNodes = arg_imagePath.split('/');
		for (var i = 0; i <  tmpSplitNodes.length; i++ ) {
			tmpSplitNodes[i]= tmpSplitNodes[i].replace(/\..*/, '')
		}


		let valDic = {};

		if (i == 5) {
			valDic = {type:tmpSplitNodes[2], grp:tmpSplitNodes[3], color:tmpSplitNodes[4]}		
		}else if (i == 4) {
			valDic = {type:tmpSplitNodes[2], grp:tmpSplitNodes[3]}		
		}else{
			throw new Error("パスに異常があります:" + arg_imagePath);	
		}

		return valDic;
	}
}

class GrpItemMgrFactory extends ItemMgrFactory{

	createMgr(paths){
		return  new GrpMgr(this.createItems(paths));
	}

	createItems(paths ){

		let items = [];
		for (let path of paths) {
			items.push(this.createItem(path))
		}
		return  items;
	}


	createItem(arg_imagePath){

		let valueLists = ItemMgrFactory.analyzeImgFilePath(arg_imagePath)

		if (valueLists.type != 'grp'){
			throw new Error("GRPのパスではありません:" + arg_imagePath);	
		}


		let css_id = valueLists.type + '_' + valueLists.grp;
		this.checkPathAndCssid(css_id, arg_imagePath)
		let grpItem = new GrpItem(css_id);

		grpItem.setImgVal(new ImgValGrp(arg_imagePath, valueLists.grp));
		grpItem.setAction(this.MakeupManager);

		return grpItem;
	}
}


class ColorItemMgrFactory extends ItemMgrFactory{


	createMgr(paths){

		let rep = this.createRep(paths);

		return  new ColorMgr(this.createItems(rep), rep);
	}

	createRep(arg_imagePaths){

		let rep = new Repository();

		for (let path of arg_imagePaths) {

			let valueLists = ItemMgrFactory.analyzeImgFilePath(path)
			if (valueLists.type != 'color'){
				throw new Error("カラーのパスではありません:" + path);	
			}
			let imgVal = new ImgValColor(path, valueLists.grp, valueLists.color);
			
			rep.setVal(imgVal);
		}

		return rep;
	}

	createItems(rep){

		let maxCt_of_color_cssId = 0;
		for (const [key, vals] of rep.vals) { 
			if (maxCt_of_color_cssId <  vals.length){
				maxCt_of_color_cssId = vals.length;
			}
		}
		
		let items = [];

		for (let ct = 1; ct <=  maxCt_of_color_cssId ; ct++) {
			items.push(this.createItem(ct));
		}

		return  items;
	}

	createItem(ct){
		let cssId = 'color' + '_' + ('0'+ ct).substr(-2)
		this.checkPathAndCssid(cssId)
		return  new ColorItem( cssId );
	}

}

class MainItemMgrFactory extends ItemMgrFactory{

	mainRep = new Repository();

	createMgr(paths ){
		return  new MainMgr(this.createItems(paths), this.mainRep);
	}

	existItemCheck(arg_items, arg_item){
		for (let item of arg_items){
			if (arg_item.cssId === item.cssId) return false ;
		}
		return  true 
	}
	
	createItems(paths){

		let items = [];
		let item = {};

		for (let path of paths) {

			item = this.createItem(path);
			if (this.existItemCheck(items, item)) {
				items.push(item)
			}
		}
		return  items;
	}

	createItem(arg_imagePath){
		// [0][1] [2]  [3]        [4]  
		// ./img/grp  /faundetion.png
		// ./img/color/faundetion/red.png
		// ./img/main /faundetion/red.png
		// ./img/base /face.png
		let valueLists = ItemMgrFactory.analyzeImgFilePath(arg_imagePath)
		if (valueLists.type != 'main'){
			throw new Error("mainのパスではありません:" + arg_imagePath);	
		}
		const cssId = 'main_' + valueLists.grp;
		this.checkPathAndCssid(cssId, arg_imagePath)
		let mainItem = new MainItem(cssId);

		let imgVal = new ImgValMain(arg_imagePath, valueLists.grp, valueLists.color);

		this.mainRep.setVal(imgVal);
		mainItem.setImgVal(imgVal);
		
		return mainItem;

	}

}

class Repository{
	constructor(){
		this.vals = new Map();
	}	

	setVal(val){
		if (this.vals.has(val.grp))  {
			this.vals.get(val.grp).push(val);
		}else{
			this.vals.set(val.grp, [val]);
		}
	}

	getVals(arg_key){
		return this.vals.get(arg_key);
	}
}


export {  
		Repository,
		ItemMgrFactory,
		GrpItemMgrFactory,
		ColorItemMgrFactory,
		MainItemMgrFactory
	};


