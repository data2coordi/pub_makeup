
import  {  
	GrpMgr,ColorMgr,MainMgr,
	GrpItem, ColorItem, MainItem, 
	ImgValGrp, ImgValColor, ImgValMain
} from './MakeUpItemClass.js';



/**
 * アイテムマネージャーファクトリー
 */
class ItemMgrFactory{

	/**
	 * メイクアップマネージャーを設定する
	 * @param {MakeupManager} makeupManager メイクアップマネージャー
	 */
	setMakeupManager(makeupManager){
		this.MakeupManager = makeupManager;
	};

	/**
	 * マネージャーを作成する
	 * @param {string[]} paths パス
	 * @returns {GrpMgr|ColorMgr|MainMgr} マネージャー
	 */
	createMgr(paths){
		console.log('shoud be implimented')
	}

	/**
	 * アイテムを作成する
	 * @param {string[]} paths パス
	 * @returns {GrpItem[]|ColorItem[]|MainItem[]} アイテム
	 */
	createItems(paths ){
		console.log('shoud be implimented')
	}


	/**
	 * アイテムを作成する
	 * @param {string} path パス
	 * @returns {GrpItem|ColorItem|MainItem} アイテム
	 */
	createItem(paths ){
		console.log('shoud be implimented')
	}

	/**
	 * パスとCSSIDをチェックする
	 * @param {string} cssId CSSID
	 * @param {string} path パス
	 */
	checkPathAndCssid(cssId, path){

		const id = document.getElementById(cssId);
		if (id == null) throw new Error("cssid and path error : cssid:" + cssId + " :path:" + path);

	}

	/**
	 * 画像ファイルパスを分析する
	 * @param {string} arg_imagePath 画像ファイルパス
	 * @returns {{type: string, grp: string, color: string}} 値の辞書
	 */
	static analyzeImgFilePath(arg_imagePath){
		// [0][1] [2] [3]    [4]  
		// ./img/grp /faundetion.png
		// ./img/color/faundetion/red.png
		// ./img/main /faundetion/red.png
		// ./img/base /face.png

		let tmpSplitNodes = arg_imagePath.split('/');
		for (var i = 0; i < tmpSplitNodes.length; i++ ) {
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

/**
 * グループアイテムマネージャーファクトリー
 */
class GrpItemMgrFactory extends ItemMgrFactory{

	/**
	 * マネージャーを作成する
	 * @param {string[]} paths パス
	 * @returns {GrpMgr} マネージャー
	 */
	createMgr(paths){
		return new GrpMgr(this.createItems(paths));
	}

	/**
	 * アイテムを作成する
	 * @param {string[]} paths パス
	 * @returns {GrpItem[]} アイテム
	 */
	createItems(paths ){

		let items = [];
		for (let path of paths) {
			items.push(this.createItem(path))
		}
		return items;
	}


	/**
	 * アイテムを作成する
	 * @param {string} arg_imagePath パス
	 * @returns {GrpItem} アイテム
	 */
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


/**
 * カラーアイテムマネージャーファクトリー
 */
class ColorItemMgrFactory extends ItemMgrFactory{


	/**
	 * マネージャーを作成する
	 * @param {string[]} paths パス
	 * @returns {ColorMgr} マネージャー
	 */
	createMgr(paths){

		let rep = this.createRep(paths);

		return new ColorMgr(this.createItems(rep), rep);
	}

	/**
	 * リポジトリを作成する
	 * @param {string[]} arg_imagePaths パス
	 * @returns {Repository} リポジトリ
	 */
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

	/**
	 * アイテムを作成する
	 * @param {Repository} rep リポジトリ
	 * @returns {ColorItem[]} アイテム
	 */
	createItems(rep){

		let maxCt_of_color_cssId = 0;
		for (const [key, vals] of rep.vals) { 
			if (maxCt_of_color_cssId < vals.length){
				maxCt_of_color_cssId = vals.length;
			}
		}

		let items = [];

		for (let ct = 1; ct <= maxCt_of_color_cssId ; ct++) {
			items.push(this.createItem(ct));
		}

		return items;
	}

	/**
	 * アイテムを作成する
	 * @param {number} ct カウント
	 * @returns {ColorItem} アイテム
	 */
	createItem(ct){
		let cssId = 'color' + '_' + ('0'+ ct).substr(-2)
		this.checkPathAndCssid(cssId)
		return new ColorItem( cssId );
	}

}

/**
 * メインアイテムマネージャファクトリクラス
 */
class MainItemMgrFactory extends ItemMgrFactory{

	/**
	 * メインリポジトリ
	 * @type {Repository}
	 */
	mainRep = new Repository();

	/**
	 * マネージャの作成
	 * @param {string[]} paths パスリスト
	 * @returns {MainMgr} メインマネージャ
	 */
	createMgr(paths ){
		return new MainMgr(this.createItems(paths), this.mainRep);
	}

	/**
	 * アイテムの存在チェック
	 * @param {MainItem[]} arg_items アイテムリスト
	 * @param {MainItem} arg_item アイテム
	 * @returns {boolean} 存在する場合true
	 */
	existItemCheck(arg_items, arg_item){
		for (let item of arg_items){
			if (arg_item.cssId === item.cssId) return false ;
		}
		return true 
	}

	/**
	 * アイテムの作成
	 * @param {string[]} paths パスリスト
	 * @returns {MainItem[]} アイテムリスト
	 */
	createItems(paths){

		let items = [];
		let item = {};

		for (let path of paths) {

			item = this.createItem(path);
			if (this.existItemCheck(items, item)) {
				items.push(item)
			}
		}
		return items;
	}

	/**
	 * アイテムの作成
	 * @param {string} arg_imagePath 画像パス
	 * @returns {MainItem} メインアイテム
	 */
	createItem(arg_imagePath){
		// [0][1] [2] [3]    [4]  
		// ./img/grp /faundetion.png
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

/**
 * リポジトリクラス
 */
class Repository{
	/**
	 * コンストラクタ
	 */
	constructor(){
		this.vals = new Map();
	}

	/**
	 * 値の設定
	 * @param {ImgVal} val 値
	 */
	setVal(val){
		if (this.vals.has(val.grp)) {
			this.vals.get(val.grp).push(val);
		}else{
			this.vals.set(val.grp, [val]);
		}
	}

	/**
	 * 値の取得
	 * @param {string} arg_key キー
	 * @returns {ImgVal[]} 値リスト
	 */
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
