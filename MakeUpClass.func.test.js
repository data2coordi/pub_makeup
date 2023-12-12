
const { 
	MakeUpManager
	} = require("./MakeUpClass.js")


const { 
	ImgVal, ImgValGrp, ImgValColor, ImgValMain,
	GrpItem, ColorItem, MainItem,
	ItemMgr,
	GrpMgr,
	ColorMgr,
	MainMgr
	} = require("./MakeUpItemClass.js")

const { 
	Repository,
	ItemMgrFactory,
	GrpItemMgrFactory,
	ColorItemMgrFactory,
	MainItemMgrFactory
	} = require("./MakeUpFactoryClass.js")


const ConGrpPath1   = './img/grp/cheek.png';
const ConGrpPath2   = './img/grp/fundation.png';
const ConGrpPath3   = './img/grp/clear.png';
const ConGrpPath4   = './img/grp/back.png';
const ConGrpPath5   = './img/grp/preview.png';
const ConGrpPath6   = './img/grp/endPreview.png';

const ConColorPath1 = './img/color/cheek/red.png';
const ConColorPath2 = './img/color/cheek/blue.png';
const ConColorPath3 = './img/color/fundation/red.png';

const ConMainPath1  = './img/main/cheek/red.png';
const ConMainPath2  = './img/main/cheek/blue.png';
const ConMainPath3  = './img/main/fundation/red.png';

const Con_js_grp_array   = [ConGrpPath1, ConGrpPath2, ConGrpPath3, ConGrpPath4, ConGrpPath5, ConGrpPath6 ]; 
const Con_js_color_array = [ConColorPath1, ConColorPath2, ConColorPath3]; 
const Con_js_main_array  = [ConMainPath1, ConMainPath2, ConMainPath3]; 

function helper_buildHtml(src, id) { 
	document.body.innerHTML = document.body.innerHTML +
	    '<img src= "' + src + '" id="' + id + '" alt="" />';

}

describe('color is displayied when grp clicked', () => {

	let MakeupManager  = {}; 

	let grpItemMgrFactory  = {}; 
	let grpMgr = {}; 

	let colorItemMgrFactory = {}; 
	let colorMgr  = {}; 

	let mainItemMgrFactory = {}; 
	let mainMgr = {}; 


	beforeEach(() => {

		document.body.innerHTML =
		    '<img src="img/grp/grpxxxx.png" id="grp_cheek" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_fundation" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_clear" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_back" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_preview" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_endPreview" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_score" alt="" />';

		for (let ct = 1; ct  < 25; ct++) {
			let cssId = 'color' + '_' + ('0'+ ct).substr(-2)
			helper_buildHtml("img/color/colorxxx.png", cssId);
		}

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/color/fundationxxxx/red.png" id="color_03" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/main/cheekxxx/red.png" id="main_cheek" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/main/fundationxxx/red.png" id="main_fundation" alt="" />';


		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/main/fundationxxx/red.png" id="main_score" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/base/fundationxxx/red.png" id="base_desk" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/base/tahbanxxx/red.png" id="base_tahban" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/base/base_kanae.png" id="base_kanae" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/base/base_ng.png" id="base_ng" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/base/base_dqn.png" id="base_dqn" alt="" />';



		MakeupManager = new MakeUpManager();

		grpItemMgrFactory = new GrpItemMgrFactory();
		grpItemMgrFactory.setMakeupManager(MakeupManager);
		grpMgr    = grpItemMgrFactory.createMgr(Con_js_grp_array);

		colorItemMgrFactory = new ColorItemMgrFactory();
		colorItemMgrFactory.setMakeupManager(MakeupManager);
		colorMgr  = colorItemMgrFactory.createMgr(Con_js_color_array);

		mainItemMgrFactory = new MainItemMgrFactory();
		mainItemMgrFactory.setMakeupManager(MakeupManager);
		mainMgr  = mainItemMgrFactory.createMgr(Con_js_main_array);

		MakeupManager.setItemMgr(grpMgr, colorMgr, mainMgr);
	});


	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' When grp-image is clicked  , color-image is displayed ', function() {


		document.getElementById("grp_cheek").click();

		const color_01 = document.getElementById("color_01");
		var src = color_01.getAttribute('src');

		expect(src).toBe(ConColorPath1);

	});

	test(' When color-image is clicked  , main-image is displayed ', function() {


		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		const main_cheek = document.getElementById("main_cheek");
		var src = main_cheek.getAttribute('src');
		expect(src).toBe(ConMainPath1);

	});



	test(' When grp-clear is clicked  , main-image clear ', function() {

		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		const main_cheek = document.getElementById("main_cheek");
		var src = main_cheek.getAttribute('src');
		expect(src).toBe(ConMainPath1);
		expect(main_cheek.style.visibility).toBe('visible');

		document.getElementById("grp_clear").click();
		expect(main_cheek.style.visibility).toBe('hidden');

	});

	test(' When grp-return is clicked  , location is changed  ', function() {

		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		const main_cheek = document.getElementById("main_cheek");
		var src = main_cheek.getAttribute('src');
		expect(src).toBe(ConMainPath1);
		expect(main_cheek.style.visibility).toBe('visible');

		Object.defineProperty(window, "location", { value: {} });
		Object.defineProperty(window, "open", { value: jest.fn() }); 
		window.location.href = 'http://google.com';

		document.getElementById("grp_back").click();
		expect(window.location.href).toBe('../../spartncolorschool');

	});

	test(' When preview-botton is clicked  , preview is displaied ', function() {

		const base_desk = document.getElementById("base_desk");

		expect(base_desk.style.visibility).toBe('');
		
		//display preview
		document.getElementById("grp_preview").click();

		expect(base_desk.style.visibility).toBe('hidden');


		var event = new MouseEvent( "mousedown" ) ;
		//display desk and group
		window.document.dispatchEvent( event ) ;

		expect(base_desk.style.visibility).toBe('visible');

	});


	test(' if player mistake 3times , he is DQN  ', function() {

		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		document.getElementById("grp_cheek").click();
		document.getElementById("color_01").click();

		const base_dqn = document.getElementById("base_dqn");
		var src = base_dqn.getAttribute('src');
		expect(src).toBe('img/base/base_dqn.png');


	});
});
