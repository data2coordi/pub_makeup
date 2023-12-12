//test
import  {  
//		MakeUpClass,
//		ItemMgrFactory,
//		GrpItemMgrFactory,
//		ColorItemMgrFactory,
//		MainItemMgrFactory,
//		MakeUpManager,
//		Repository
		BaseMgr,
//		ItemMgr,GrpMgr,ColorMgr,MainMgr,
//		GrpItem, ColorItem, MainItem, 
//		ImgVal, ImgValGrp, ImgValColor, ImgValMain
		} from './MakeUpItemClass.js';

import  {  
		GrpItemMgrFactory,
		ColorItemMgrFactory,
		MainItemMgrFactory
		} from './MakeUpFactoryClass.js';





class MakeUpClass {
	constructor(arg_grps, arg_colors, args_mains) { 

		let MakeupManager = new MakeUpManager();

		let grpItemMgrFactory = new GrpItemMgrFactory();
		grpItemMgrFactory.setMakeupManager(MakeupManager);
		let grpMgr    = grpItemMgrFactory.createMgr(arg_grps);

		let colorItemMgrFactory = new ColorItemMgrFactory();
		colorItemMgrFactory.setMakeupManager(MakeupManager);
		let colorMgr  = colorItemMgrFactory.createMgr(arg_colors);

		let mainItemMgrFactory = new MainItemMgrFactory();
		mainItemMgrFactory.setMakeupManager(MakeupManager);
		let mainMgr  = mainItemMgrFactory.createMgr(args_mains);

		MakeupManager.setItemMgr(grpMgr, colorMgr, mainMgr);

		MakeupManager.initMakeup();



	}


}




class Utility{
/*
	let PassSec;   // 秒数カウント用変数
	 
	// 繰り返し処理の中身
	function showPassage() {
	   PassSec++;   // カウントアップ
	   var msg = "ボタンを押してから " + PassSec + "秒が経過しました。";   // 表示文作成
	   document.getElementById("PassageArea").innerHTML = msg;   // 表示更新
	}
	 
	// 繰り返し処理の開始
	function startShowing() {
	   PassSec = 0;   // カウンタのリセット
	   PassageID = setInterval('showPassage()',1000);   // タイマーをセット(1000ms間隔)
	   document.getElementById("startcount").disabled = true;   // 開始ボタンの無効化
	}
	 
	// 繰り返し処理の中止
	function stopShowing() {
	   clearInterval( PassageID );   // タイマーのクリア
	   document.getElementById("startcount").disabled = false;   // 開始ボタンの有効化
	}

*/
	
	static existCheck(existCheckFlag, key, object){
			if (existCheckFlag == 'notExist'){
				throw new Error("生成したCSSIDが存在しません:key:" + key + " / object:" +  JSON.stringify(object));	
			}
	}

	static trace(s) {
	
	    let DEBUG_MODE = false;
	    //if (DEBUG_MODE && this.console && typeof console.log != "undefined") {
	    if (DEBUG_MODE) {
		console.log(s);
		//console.trace();
	    }
	}



}

class ScoreClass{

	

	constructor(items){
		this.Items = items;
	}

	static dqn(){	

		BaseMgr.addWindowEvent(function() {
			BaseMgr.changeDisplay('base_dqn', 'hidden');
		});

		BaseMgr.changeDisplay('base_dqn', 'visible');
	}

	getScore(){
		let unit_score = 11.1;
		let score = 0;	
		for (let item of this.Items){
			if ((item.getSeason() === window.season) 
				&& (item.getDisplayStatus() === 'visible')){
				score = score + unit_score;
			}
		}

		return score;
	}


	static _build_result_detail(ret_map){

		let ret_str = '※パーソナルカラー【' +  ScoreClass._get_season_str(window.season) +  'タイプ】のメイクの結果です。<br>'

		ret_str = ret_str + "次回はもっと高得点を目指して頑張りましょう！<br>"
		ret_str = ret_str + '--------------------------------<br>'

		for (const [cssid, val] of ret_map) { 

			let sel_season = '無'; 

			if (val[0] != 0){ sel_season = ScoreClass._get_season_str(val[1]) }

			ret_str = ret_str + "■" + ScoreClass._get_item_str(cssid) 
				+  ":" + ScoreClass._get_judge_str(val[0]) 
				//+ " (選択：" + ScoreClass._get_season_str(val[1]) + ") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"     
				+ " (選択：" + sel_season  + ") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"     
		}

		ret_str = ret_str + '<br>--------------------------------<br>'
		ret_str = ret_str + '50点以下の場合は、「本サイトのメニュー →  パーソナルカラーの基礎知識」で学習して50点を目指してください。<br>'

		return ret_str;
	}

	static _get_season_str(season){

		let main_season_str_map = new Map([
			['sp', '春'],
			['sm', '夏'],
			['au', '秋'],
			['wi', '冬']
		]);

		return main_season_str_map.get(season);
	}

	static _get_judge_str(judge){

		let main_judge_str_map = new Map([
			[0, '無'],
			[1, '○'],
			[2, '×']
		]);

		return main_judge_str_map.get(judge);
	}

	static _get_item_str(cssid){
		let main_cssid_str_map = new Map([
			['main_hair','ヘアスタイル'],
			["main_rip","リップ"],
			["main_masukara","マスカラ"],
			["main_eyeshadow","アイシャドウ"],
			["main_eyeblow", "アイブロウ"],
			["main_eyeliner", "アイライン"],
			["main_option","クローゼット"],
			["main_faundetion", "ファンデーション"],
			["main_cheek", "チーク"]
		]);

		return main_cssid_str_map.get(cssid);
	}




	get_result_detail(){

		let result_map = new Map();

		for (let item of this.Items){
			let judge = 0;

			if (item.getDisplayStatus() === 'hidden'){
				judge = 0

			} else if (item.getSeason() === window.season){
				judge = 1

			} else{
				judge = 2
			}
				
			result_map.set(item.getCssId(), [judge, item.getSeason()])
		}
		
		return ScoreClass._build_result_detail(result_map);
	}

}

class MakeUpManager{

	setItemMgr(grpMgr, colorMgr, mainMgr) { 

		this.grpMgr = grpMgr;
		this.colorMgr = colorMgr;
		this.mainMgr = mainMgr;
		this.scoreMgr = new ScoreClass(this.mainMgr.Items);

	}

	preview(){

			//not display grp
			this.grpMgr.changeDisplayState('hidden');

			let tmpThis = this; 
			let func = function() {tmpThis.endPreview() };
			BaseMgr.preview(func);
	}

	endPreview(){

			BaseMgr.end_preview();

			//display grp
			this.grpMgr.changeDisplayState('visible');

	}

	
	displayScore(){

			//not display grp
			this.grpMgr.changeDisplayState('hidden');

			let tmpThis = this; 
			let func = function() {tmpThis.endDisplayScore() };

			BaseMgr.display_score(func, this.scoreMgr.getScore(), 
							this.scoreMgr.get_result_detail());
	
	}

	endDisplayScore(){

			BaseMgr.end_display_score();
			//display grp
			this.grpMgr.changeDisplayState('visible');

	}

	initMakeup(){
	
		BaseMgr.init();

		this.colorMgr.changeDisplayState('hidden');
		this.colorMgr.initColorCssId();

		this.mainMgr.changeDisplayState('hidden');
		this.mainMgr.changeDisplayState('hidden');
		this.mainMgr.clear_dqn_ct();
	}

	actionGrpButton(selectedGrp){

		Utility.trace(selectedGrp)
		if (selectedGrp == 'clear'){
			this.initMakeup();
		}else if (selectedGrp == 'back') {
			window.location.href = '../../spartncolorschool'

		}else if (selectedGrp == 'preview') {
			this.preview();

		}else if (selectedGrp == 'score') {
			this.displayScore();

		}else{
			this.grpMgr.changeDisplayState('hidden');
			this.colorMgr.changeDisplayImage(selectedGrp, this);

		}
	}

	actionColorButton(currentGrp, selectedColor){

		if (currentGrp== 'hair'){
			BaseMgr.changeDisplay('base_tahban', 'hidden');

		}else if (1 == 1) {
		}else{
		}

		Utility.trace(currentGrp + ":" + selectedColor)

		this.grpMgr.changeDisplayState('visible');
		this.colorMgr.changeDisplayState('hidden');
		this.mainMgr.changeDisplayImage(currentGrp, selectedColor);

		if (this.mainMgr.get_dqn_ct() >= 5) {

			this.initMakeup();
			ScoreClass.dqn();
		}

	}
}





export {  
		MakeUpClass,
		MakeUpManager,
		Utility,
		ScoreClass
//		Repository
//		ItemMgrFactory,
//		GrpItemMgrFactory,
//		ColorItemMgrFactory,
//		MainItemMgrFactory,
//		ImgVal, ImgValGrp, ImgValColor, ImgValMain,
//		GrpItem, ColorItem, MainItem, 
//		ItemMgr,
//		GrpMgr,
//		ColorMgr,
//		MainMgr,
		};


