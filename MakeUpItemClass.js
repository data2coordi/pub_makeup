
import  {  
	Utility
} from './MakeUpClass.js';



/**
 * ベースの管理クラス
 */
class BaseMgr{

	/**
	 * プレビューを表示する
	 *
	 * @param {function} func イベントハンドラ
	 */
	static preview(func){

		//not display desk
		BaseMgr.changeDisplay('base_desk', 'hidden');

		BaseMgr.addWindowEvent(func);
	}


	/**
	 * プレビューを終了する
	 */
	static end_preview(){
		//display desk
		BaseMgr.changeDisplay('base_desk', 'visible');
	}

	/**
	 * スコアを表示する
	 *
	 * @param {function} func イベントハンドラ
	 * @param {number} score スコア
	 * @param {object} result_map 結果マップ
	 */
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

	/**
	 * スコアの表示を終了する
	 */
	static end_display_score(){

		//display desk
		BaseMgr.changeDisplay('base_desk', 'visible');
		BaseMgr.changeDisplay('base_score', 'hidden');
		BaseMgr.changeDisplay('base_ng', 'hidden');
	}


	/**
	 * 初期化する
	 */
	static init() {
		let src ="./img/base/" + "base_" + window.season + "_kanae.png"
		BaseMgr.changeDisplayImage('base_kanae', src);
		BaseMgr.changeDisplay('base_tahban', 'visible');
		BaseMgr.changeDisplay('base_ng', 'hidden');
		BaseMgr.changeDisplay('base_dqn', 'hidden');
	}

	/**
	 * 要素の表示状態を変更する
	 *
	 * @param {string} cssId 要素のID
	 * @param {string} flag 表示状態
	 */
	static changeDisplay(cssId, flag){

		let htmlTag = document.getElementById(cssId);
		htmlTag.style.visibility = flag;
	}

	/**
	 * 要素の画像を変更する
	 *
	 * @param {string} cssId 要素のID
	 * @param {string} src 画像のパス
	 */
	static changeDisplayImage(cssId, src){
		let htmlTag = document.getElementById(cssId);
		htmlTag.setAttribute('src', src);
	}

	/**
	 * 要素のテキストを変更する
	 *
	 * @param {string} cssId 要素のID
	 * @param {string} text テキスト
	 */
	static changeDisplayText(cssId, text){
		console.log('cssid:' + cssId)
		console.log('test:' + text)
		document.getElementById(cssId).innerHTML = text;
	}


	/**
	 * ウィンドウイベントを追加する
	 *
	 * @param {function} func イベントハンドラ
	 */
	static addWindowEvent(func){
		window.document.addEventListener("mousedown", func, {once: true});
	}
}

/**
 * アイテムの管理クラス
 */
class ItemMgr{

	/**
	 * コンストラクタ
	 *
	 * @param {array} arg_items アイテムの配列
	 * @param {object} arg_valRep 値のマップ
	 */
	constructor(arg_items, arg_valRep) { 
		this.Items = arg_items;
		this.ValRep = arg_valRep;
	}


	/**
	 * 表示状態を変更する
	 *
	 * @param {string} flag 表示状態
	 */
	changeDisplayState(flag){
		for (let item of this.Items) {
			item.setDisplay(flag);
		}
	}

	/**
	 * キーで表示状態を変更する
	 *
	 * @param {string} key キー
	 * @param {string} flag 表示状態
	 */
	changeDisplayStateByKey(key, flag){
		for (let item of this.Items) {
			if (item.cssId == key) {
				item.setDisplay(flag);
				return;
			}
		}
	}
}

/**
 * グループマネージャー
 */
class GrpMgr extends ItemMgr {

}

/**
 * カラーマネージャー
 * @extends ItemMgr
 */
class ColorMgr extends ItemMgr {

	/**
	 * 表示画像を変更する
	 * @param {string} key キー
	 * @param {MakeupManager} makeupManager メイクアップマネージャー
	 */
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


	/**
	 * カラーCSS IDを初期化する
	 */
	initColorCssId(){
		for (let ct = 1; ct < 25; ct++) {
			let cssId = 'color' + '_' + ('0'+ ct).substr(-2)
			let htmlTag = document.getElementById(cssId);
			htmlTag.style.visibility = 'hidden';
		}
	}



}

/**
 * メインマネージャー
 */
class MainMgr extends ItemMgr {

	/**
	 * dqn_ctを取得する
	 * @returns {number} dqn_ct
	 */
	get_dqn_ct(){
		if (typeof this.dqn_ct === "undefined") {
			this.dqn_ct = 0
		}
		return this.dqn_ct;
	}

	/**
	 * dqn_ctをクリアする
	 */
	clear_dqn_ct(){
		this.dqn_ct = 0;
	}
	/**
	 * 表示画像を変更する
	 * @param {string} arg_grp グループ
	 * @param {string} arg_color カラー
	 */
	changeDisplayImage(arg_grp, arg_color){

		let i = 0;
		let imgVals = this.ValRep.getVals(arg_grp);
		let imgVal = {};
		if (typeof this.dqn_ct === "undefined") {
			this.dqn_ct = 0
		}


		let existCheckFlag = 'notExist';
		for (const val of imgVals) {
			if (val.color == arg_color){
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
					this.dqn_ct = this.dqn_ct + 1;
				}
				break;
			}
		}
		Utility.existCheck(existCheckFlag, arg_grp, this.Items);
	}
}
// item
/**
 * アイテム
 */
class Item {

	/**
	 * コンストラクタ
	 * @param {string} cssId CSS ID
	 */
	constructor(cssId) { 
		this.cssId = cssId
	}


	/**
	 * 画像値を設定する
	 * @param {object} val 画像値
	 */
	setImgVal(val){
		this.val = val
	}

	/**
	 * CSS IDを取得する
	 * @returns {string} CSS ID
	 */
	getCssId(){
		return this.cssId;
	}


	/**
	 * ソースを取得する
	 * @returns {string} ソース
	 */
	getSrc(){
		if (typeof this.val === "undefined") {
			throw new Error("val is not exit in item, object:" + JSON.stringify(this));
		} else {
			return this.val.src
		}

	}

	/**
	 * 表示を設定する
	 * @param {string} flag フラグ
	 */
	setDisplay(flag){

		let htmlTag = document.getElementById(this.cssId);
		htmlTag.style.visibility = flag;
	}

	/**
	 * 表示ステータスを取得する
	 * @returns {string} 表示ステータス
	 */
	getDisplayStatus(){
		return document.getElementById(this.cssId).style.visibility;
	}

	/**
	 * 表示画像を設定する
	 */
	setDisplayImage(){

		let htmlTag = document.getElementById(this.cssId);
		htmlTag.setAttribute('src', this.getSrc());
	}

}


/**
 * グループアイテムクラス
 */
class GrpItem extends Item{

	/**
	 * CSS ID
	 * @type {string}
	 */
	//this.cssId

	/**
	 * 値
	 * @type {ImgValGrp}
	 */
	//this.val

	/**
	 * アクションを設定する
	 * @param {MakeupManager} makeupManager メイクアップマネージャー
	 */
	setAction(makeupManager){

		const id = document.getElementById(this.cssId);

		if (id == null) throw new Error("cssid is not exist at grp:cssId:" + this.cssId);


		let arg_val = this.val
		id.addEventListener("click", function() { makeupManager.actionGrpButton(arg_val.grp); });

	}
}

/**
 * カラーアイテムクラス
 */
class ColorItem extends Item{

	/**
	 * CSS ID
	 * @type {string}
	 */
	//this.cssId

	/**
	 * 値
	 * @type {ImgValColor}
	 */
	//this.val

	/**
	 * 関数
	 * @type {function}
	 */
	func;

	/**
	 * アクションを設定する
	 * @param {MakeupManager} makeupManager メイクアップマネージャー
	 */
	setAction(makeupManager){

		const id = document.getElementById(this.cssId);
		if (id == null) throw new Error("cssid is not exist at color:cssId:" + this.cssId);

		let arg_val = this.val
		id.removeEventListener("click", this.func );
		this.func = function() { makeupManager.actionColorButton(arg_val.grp, arg_val.color);}
		id.addEventListener("click", this.func);
		// id.removeEventListener("click", function() { makeupManager.actionColorButton(); });
		// id.addEventListener("click", function() { makeupManager.actionColorButton(arg_val.grp, arg_val.color); });

	}

}

/**
 * メインアイテムクラス
 */
class MainItem extends Item{

	/**
	 * CSS ID
	 * @type {string}
	 */
	//this.cssId

	/**
	 * 値
	 * @type {ImgValMain}
	 */
	//this.val

	/**
	 * グループを取得する
	 * @returns {string} グループ
	 */
	getGrp(){
		return this.cssId.substr(5);
	}

	/**
	 * シーズンを取得する
	 * @returns {string} シーズン
	 */
	getSeason(){
		return this.val.color.substr(0,2);
	}
}

/**
 * 値オブジェクト
 */
class ImgVal {

	/**
	 * ソース
	 * @type {string}
	 */
	src = ''

	/**
	 * コンストラクタ
	 * @param {string} src ソース
	 */
	constructor(src) { 
		this.src = src;
	}
}

/**
 * グループ値オブジェクト
 */
class ImgValGrp extends ImgVal {

	/**
	 * グループ
	 * @type {string}
	 */
	grp = ''

	/**
	 * コンストラクタ
	 * @param {string} src ソース
	 * @param {string} grp グループ
	 */
	constructor(src, grp) { 
		super(src);
		this.grp = grp;
	}
}

/**
 * カラー値オブジェクト
 */
class ImgValColor extends ImgValGrp {

	/**
	 * カラー
	 * @type {string}
	 */
	color = '';

	/**
	 * コンストラクタ
	 * @param {string} src ソース
	 * @param {string} grp グループ
	 * @param {string} color カラー
	 */
	constructor(src, grp, color) { 
		super(src, grp);
		this.color = color;
	}
}

/**
 * メイン値オブジェクト
 */
class ImgValMain extends ImgValGrp {

	/**
	 * カラー
	 * @type {string}
	 */
	color = '';

	/**
	 * コンストラクタ
	 * @param {string} src ソース
	 * @param {string} grp グループ
	 * @param {string} color カラー
	 */
	constructor(src, grp, color) { 
		super(src, grp);
		this.color = color;
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


