
const { 
	ScoreClass,
	MakeUpManager
	} = require("./MakeUpClass.js")


const { 
	ImgValGrp, ImgValColor, ImgValMain,
	GrpItem, ColorItem, MainItem,
	GrpMgr,
	ColorMgr,
	MainMgr
	} = require("./MakeUpItemClass.js")



const ConGrpPath1   = './img/grp/cheek.png';
const ConGrpPath2   = './img/grp/fundation.png';

const ConColorPath1 = './img/color/cheek/red.png';
const ConColorPath2 = './img/color/cheek/blue.png';
const ConColorPath3 = './img/color/fundation/red.png';

const ConMainPath1  = './img/main/cheek/red.png';
const ConMainPath2  = './img/main/cheek/blue.png';
const ConMainPath3  = './img/main/fundation/red.png';

const Con_js_grp_array   = [ConGrpPath1, ConGrpPath2]; 
const Con_js_color_array = [ConColorPath1, ConColorPath2, ConColorPath3]; 
const Con_js_main_array  = [ConMainPath1, ConMainPath2, ConMainPath3]; 

class FakeItemMgr{

	changeDisplayState(flag){
		this.changeDisplayStateRet = flag
	}

	changeDisplayImage(arg_grp, arg_color){
		this.changeDisplayImageRet = arg_grp 
	}
}

class FakeRep{
	constructor(){
		this.vals = new Map();
		this.vals.set('cheek', ['c1_val','c2_val']);
	}	
	getVals(arg_key){
		return this.vals.get(arg_key);
	}
}

class FakeMainRep{
	constructor(){

		this.vals = new Map();

		let fake_val = {};
		fake_val = [{grp:'cheek', color:'red'},{grp:'cheek', color:'blue'}];
		this.vals.set('cheek', fake_val);

		fake_val = [{grp:'fundation', color:'red'},{grp:'fundation', color:'blue'}];
		this.vals.set('fundation', fake_val);

		fake_val = [{grp:'rip', color:'au_red'},{grp:'rip', color:'sp_red'}];
		this.vals.set('rip', fake_val);


	}	
	getVals(arg_key){
		return this.vals.get(arg_key);
	}
}





function helper_buildHtml(src, id) { 
	document.body.innerHTML = document.body.innerHTML +
	    '<img src= "' + src + '" id="' + id + '" alt="" />';

}


function helper_createHtml() { 
	
	helper_buildHtml("img/grp/grpxxxx.png", 		'grp_cheek');
	helper_buildHtml("img/grp/grpxxxx.png", 		'grp_fundation');
	helper_buildHtml("img/color/cheekxxxx/au_red.png", 	'color_01');
	helper_buildHtml("img/color/cheekxxxx/au_red.png", 	'color_02');
	helper_buildHtml("img/color/fundationxxxx/au_red.png", 	'color_03');
	helper_buildHtml("img/main/cheekxxxx/au_red.png", 		'main_cheek');
	helper_buildHtml("img/main/fundationxxx/au_red.png", 	'main_fundation');

	helper_buildHtml("img/grp/score.png", 			'grp_score');
	helper_buildHtml("img/main/cheekxxx/sp_red.png", 	'main_rip');
	helper_buildHtml("img/main/fundationxxx/sp_red.png", 	'main_hair');
	helper_buildHtml("img/base/basexxxx.png", 		'base_desk');
	helper_buildHtml("img/base/basexxxx.png", 		'base_desk');
	document.body.innerHTML = document.body.innerHTML +
		' <p id="base_score">100点</p>';

	document.body.innerHTML = document.body.innerHTML +
		' <p id="base_ng"></p> ';

}

///////////////////////////////////////////////////////////////

describe('socre is displaied ', () => {

	let manager = {};
	let mainMgr = {};
	let scoreMgr = {};

	beforeEach(() => {

		window.season = 'sp';

		helper_createHtml();

		manager = new MakeUpManager();

		let grpVal = new ImgValGrp('.img/grp/score.png', 'score')
		let grpItem = new GrpItem('grp_score');
		grpItem.setImgVal(grpVal);
		grpItem.setAction(manager);

		let grpMgr = new GrpMgr([grpItem], new FakeRep())
		let colorMgr = new FakeItemMgr();

		let mainVal1 =  new ImgValMain('./img/main/hair/sp_red.png', 'hair', 'sp_red')
		let mainItem1 = new MainItem('main_hair');
		mainItem1.setImgVal(mainVal1);

		let mainVal2 =  new ImgValMain('./img/main/rip/sp_red.png', 'rip', 'sp_red')
		let mainItem2 = new MainItem('main_rip');
		mainItem2.setImgVal(mainVal2);

		mainMgr = new MainMgr([mainItem1, mainItem2 ], new FakeMainRep())

		manager.setItemMgr(grpMgr, colorMgr, mainMgr);

		scoreMgr = new ScoreClass(mainMgr.Items);

	});


	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' score is corect   ',  function() {

		document.getElementById('main_hair').style.visibility = 'visible';
		document.getElementById('main_rip').style.visibility = 'visible';
		
		const score = scoreMgr.getScore('sp');

		expect(score).toBe(22.2);
		
	});


	test(' score is displayied on preview when socre-bottun is  clicked ',  function() {

		document.getElementById("grp_score").click();
		const base_score = document.getElementById("base_score");

		expect(base_score.style.visibility).toBe('visible');
		
	});

	test(' if mistake 3times , player is DQN  ', function() {
		window.season = "au"
		mainMgr.changeDisplayImage("rip", "sp_red");
		mainMgr.changeDisplayImage("rip", "sp_red");
		mainMgr.changeDisplayImage("rip", "sp_red");
		expect(mainMgr.get_dqn_ct()).toBe(3);

	});
	test(' what season user select is displayed when score-bottun is pushud', function() {
	});

});
///////////////////////////////////////////////////////////////
