/**
 * メイクアップクラス
 */
import  {  
		GrpItemMgrFactory,
		ColorItemMgrFactory,
		MainItemMgrFactory
		} from './MakeUpFactoryClass.js';
class MakeUpClass {
  /**
   * コンストラクタ
   * @param {Array} arg_grps グループアイテムの配列
   * @param {Array} arg_colors カラーアイテムの配列
   * @param {Array} args_mains メインアイテムの配列
   */
  constructor(arg_grps, arg_colors, args_mains) {


    /**
     * メイクアップマネージャー
     * @type {MakeUpManager}
     */
    let MakeupManager = new MakeUpManager();

    /**
     * グループアイテムマネージャーファクトリー
     * @type {GrpItemMgrFactory}
     */
    let grpItemMgrFactory = new GrpItemMgrFactory();
    grpItemMgrFactory.setMakeupManager(MakeupManager);

    /**
     * グループマネージャー
     * @type {GrpItemMgr}
     */
    let grpMgr = grpItemMgrFactory.createMgr(arg_grps);

    /**
     * カラーアイテムマネージャーファクトリー
     * @type {ColorItemMgrFactory}
     */
    let colorItemMgrFactory = new ColorItemMgrFactory();
    colorItemMgrFactory.setMakeupManager(MakeupManager);

    /**
     * カラーマネージャー
     * @type {ColorItemMgr}
     */
    let colorMgr = colorItemMgrFactory.createMgr(arg_colors);

    /**
     * メインアイテムマネージャーファクトリー
     * @type {MainItemMgrFactory}
     */
    let mainItemMgrFactory = new MainItemMgrFactory();
    mainItemMgrFactory.setMakeupManager(MakeupManager);

    /**
     * メインマネージャー
     * @type {MainItemMgr}
     */
    let mainMgr = mainItemMgrFactory.createMgr(args_mains);

    /**
     * メイクアップマネージャーにアイテムマネージャーを設定
     * @param {GrpItemMgr} grpMgr グループマネージャー
     * @param {ColorItemMgr} colorMgr カラーマネージャー
     * @param {MainItemMgr} mainMgr メインマネージャー
     */
    MakeupManager.setItemMgr(grpMgr, colorMgr, mainMgr);

    /**
     * メイクアップを初期化
     */
    MakeupManager.initMakeup();

  }
}

/**
 * ユーティリティクラス
 */
class Utility {
  /**
   * 存在チェック
   * @param {string} existCheckFlag 存在チェックフラグ
   * @param {string} key キー
   * @param {object} object オブジェクト
   */
  static existCheck(existCheckFlag, key, object) {
    if (existCheckFlag == 'notExist') {
      throw new Error("生成したCSSIDが存在しません:key:" + key + " / object:" + JSON.stringify(object));
    }
  }

  /**
   * トレース
   * @param {string} s 文字列
   */
  static trace(s) {

    /**
     * デバッグモード
     * @type {boolean}
     */
    let DEBUG_MODE = false;

    //if (DEBUG_MODE && this.console && typeof console.log != "undefined") {
    if (DEBUG_MODE) {
      console.log(s);
      //console.trace();
    }
  }
}

/**
 * スコアクラス
 */
class ScoreClass{

	/**
	 * コンストラクタ
	 * @param {Array} items アイテムの配列
	 */
	constructor(items){
		/**
		 * アイテムの配列
		 * @type {Array}
		 */
		this.Items = items;
	}

	/**
	 * DQN画面を表示する
	 */
	static dqn(){

		/**
		 * ベースマネージャーのウィンドウイベントに追加
		 * @param {Function} func 関数
		 */
		BaseMgr.addWindowEvent(function() {
			/**
			 * ベースマネージャーの表示を変更
			 * @param {string} id 要素のID
			 * @param {string} display 表示状態
			 */
			BaseMgr.changeDisplay('base_dqn', 'hidden');
		});

		/**
		 * ベースマネージャーの表示を変更
		 * @param {string} id 要素のID
		 * @param {string} display 表示状態
		 */
		BaseMgr.changeDisplay('base_dqn', 'visible');
	}

	/**
	 * スコアを取得する
	 * @returns {number} スコア
	 */
	getScore(){
		/**
		 * 単位スコア
		 * @type {number}
		 */
		let unit_score = 11.1;
		/**
		 * スコア
		 * @type {number}
		 */
		let score = 0;
		for (let item of this.Items){
			if ((item.getSeason() === window.season) 
				&& (item.getDisplayStatus() === 'visible')){
				score = score + unit_score;
			}
		}

		return score;
	}


	/**
	 * 結果の詳細を構築する
	 * @param {Map} ret_map 結果のマップ
	 * @returns {string} 結果の詳細
	 */
	static _build_result_detail(ret_map){

		/**
		 * 結果の文字列
		 * @type {string}
		 */
		let ret_str = '※パーソナルカラー【' + ScoreClass._get_season_str(window.season) + 'タイプ】のメイクの結果です。<br>'

		ret_str = ret_str + "次回はもっと高得点を目指して頑張りましょう！<br>"
		ret_str = ret_str + '--------------------------------<br>'

		for (const [cssid, val] of ret_map) { 

			/**
			 * 選択した季節
			 * @type {string}
			 */
			let sel_season = '無'; 

			if (val[0] != 0){ sel_season = ScoreClass._get_season_str(val[1]) }

			ret_str = ret_str + "■" + ScoreClass._get_item_str(cssid) 
				+ ":" + ScoreClass._get_judge_str(val[0]) 
			//+ " (選択：" + ScoreClass._get_season_str(val[1]) + ") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"   
				+ " (選択：" + sel_season + ") &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"   
		}

		ret_str = ret_str + '<br>--------------------------------<br>'
		ret_str = ret_str + '50点以下の場合は、「本サイトのメニュー → パーソナルカラーの基礎知識」で学習して50点を目指してください。<br>'

		return ret_str;
	}

	/**
	 * 季節の文字列を取得する
	 * @param {string} season 季節
	 * @returns {string} 季節の文字列
	 */
	static _get_season_str(season){

		/**
		 * 季節の文字列のマップ
		 * @type {Map}
		 */
		let main_season_str_map = new Map([
			['sp', '春'],
			['sm', '夏'],
			['au', '秋'],
			['wi', '冬']
		]);

		return main_season_str_map.get(season);
	}

	/**
	 * 判定の文字列を取得する
	 * @param {number} judge 判定
	 * @returns {string} 判定の文字列
	 */
	static _get_judge_str(judge){

		/**
		 * 判定の文字列のマップ
		 * @type {Map}
		 */
		let main_judge_str_map = new Map([
			[0, '無'],
			[1, '○'],
			[2, '×']
		]);

		return main_judge_str_map.get(judge);
	}

	/**
	 * アイテムの文字列を取得する
	 * @param {string} cssid アイテムのCSS ID
	 * @returns {string} アイテムの文字列
	 */
	static _get_item_str(cssid){
		/**
		 * アイテムの文字列のマップ
		 * @type {Map}
		 */
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




	/**
	 * 結果の詳細を取得する
	 * @returns {string} 結果の詳細
	 */
	get_result_detail(){

		/**
		 * 結果のマップ
		 * @type {Map}
		 */
		let result_map = new Map();

		for (let item of this.Items){
			/**
			 * 判定
			 * @type {number}
			 */
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

/**
 * メイクアップマネージャー
 */
class MakeUpManager{

	/**
	 * グループマネージャー、カラーマネージャー、メインマネージャーを設定します。
	 *
	 * @param {GroupManager} grpMgr グループマネージャー
	 * @param {ColorManager} colorMgr カラーマネージャー
	 * @param {MainManager} mainMgr メインマネージャー
	 */
	setItemMgr(grpMgr, colorMgr, mainMgr) { 

		this.grpMgr = grpMgr;
		this.colorMgr = colorMgr;
		this.mainMgr = mainMgr;
		this.scoreMgr = new ScoreClass(this.mainMgr.Items);

	}

	/**
	 * プレビューを表示します。
	 */
	preview(){

		//グループを表示しない
		this.grpMgr.changeDisplayState('hidden');

		let tmpThis = this; 
		let func = function() {tmpThis.endPreview() };
		BaseMgr.preview(func);
	}

	/**
	 * プレビューを終了します。
	 */
	endPreview(){

		BaseMgr.end_preview();

		//グループを表示する
		this.grpMgr.changeDisplayState('visible');

	}


	/**
	 * スコアを表示します。
	 */
	displayScore(){

		//グループを表示しない
		this.grpMgr.changeDisplayState('hidden');

		let tmpThis = this; 
		let func = function() {tmpThis.endDisplayScore() };

		BaseMgr.display_score(func, this.scoreMgr.getScore(), 
			this.scoreMgr.get_result_detail());

	}

	/**
	 * スコアの表示を終了します。
	 */
	endDisplayScore(){

		BaseMgr.end_display_score();
		//グループを表示する
		this.grpMgr.changeDisplayState('visible');

	}

	/**
	 * メイクアップを初期化します。
	 */
	initMakeup(){

		BaseMgr.init();

		this.colorMgr.changeDisplayState('hidden');
		this.colorMgr.initColorCssId();

		this.mainMgr.changeDisplayState('hidden');
		this.mainMgr.changeDisplayState('hidden');
		this.mainMgr.clear_dqn_ct();
	}

	/**
	 * グループボタンのアクションを実行します。
	 *
	 * @param {string} selectedGrp 選択されたグループ
	 */
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

	/**
	 * カラーボタンのアクションを実行します。
	 *
	 * @param {string} currentGrp 現在のグループ
	 * @param {string} selectedColor 選択されたカラー
	 */
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
		};


