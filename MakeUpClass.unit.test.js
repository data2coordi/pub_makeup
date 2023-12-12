
const { 
	MakeUpManager,
	ScoreClass
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


class FakeMakeupManager{

	setItemMgr(grpMgr, colorMgr, mainMgr) { 
		
		return 'setItemMgr_called';
	}

	actionGrpButton(selectedGrp){
		window.onClickTestRet = "actionGrpButton_called"; 
	}

	actionColorButton(currentGrp, selectedColor){
		window.onClickTestRet = ["actionColorButton_called", currentGrp, selectedColor];
		
	}
}

// value object
class FakeItemMgr{
	
	Items = {};
	changeDisplayState(flag){
		this.changeDisplayStateRet = flag
	}

	changeDisplayImage(arg_grp, arg_color){
		this.changeDisplayImageRet = arg_grp 
	}

	get_dqn_ct(){
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

	}	
	getVals(arg_key){
		return this.vals.get(arg_key);
	}
}
class FakeItem {

	val = 'not setted of FakeItem'

	constructor(cssId){
		this.cssId = cssId;
	}	

	setDisplay(flag){
		this.test_displayStatus = flag	
	}

	setDisplayImage(){
		this.test_displayStatus = 'visible'
	}

	setImgVal(val){
		this.val = val
	}

	getGrp(){
		return 	this.cssId.substr(5);
	}

	setAction(){
	
	}

	getSeason(){
	}
}


function helper_createGrp() { 

	let grpVal = new ImgValGrp(ConGrpPath1, 'cheek')
	let grpItem = new GrpItem('grp_cheek');
	grpItem.setImgVal(grpVal);

	return grpItem
}

function helper_createColor() { 

	let colorVal =  new ImgValColor(ConColorPath1, 'cheek', 'red')
	let colorItem = new ColorItem('color_01');
	colorItem.setImgVal(colorVal);

	return colorItem
}



function helper_createMain() { 

	let mainVal =  new ImgValMain(ConMainPath1, 'cheek', 'red')
	let mainItem = new MainItem('main_cheek');
	mainItem.setImgVal(mainVal);

	return mainItem
}


function helper_createHtml() { 

	document.body.innerHTML =
	    '<img src="img/grp/grpxxxx.png" id="grp_cheek" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/grp/grpxxxx.png" id="grp_fundation" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/color/cheekxxxx/red.png" id="color_01" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/color/cheekxxxx/red.png" id="color_02" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/color/fundationxxxx/red.png" id="color_03" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/main/cheekxxx/red.png" id="main_cheek" alt="" />';

	document.body.innerHTML = document.body.innerHTML +
	    '<img src="img/main/fundationxxx/red.png" id="main_fundation" alt="" />';


}


///////////////////////////////////////////////////////////////
describe('color is displayied when grp clicked', () => {

	beforeEach(() => {
		helper_createHtml();

	});


	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' manager send massege to items  when grp is clicked ', function() {

		let fakeGrpItemMgr  = new FakeItemMgr();
		let fakeColorItemMgr  = new FakeItemMgr();
		let fakeMainMgr = new FakeItemMgr();

		let manager = new MakeUpManager();
		manager.setItemMgr(fakeGrpItemMgr, fakeColorItemMgr, fakeMainMgr);

		let grp_id = document.getElementById('grp_cheek');
		grp_id.addEventListener("click", function() { manager.actionGrpButton('cheek'); })
		document.getElementById('grp_cheek').click();

		expect(fakeColorItemMgr.changeDisplayImageRet).toBe('cheek');

	});

	test(' makeup manager display colors when getted selected grp from grpItem   ', function() {

		let grpMgr  = new FakeItemMgr();
		let colorMgr = new FakeItemMgr();
		let mainMgr = new FakeItemMgr();

		let manager = new MakeUpManager();

		manager.setItemMgr(grpMgr, colorMgr, mainMgr);

		let grp_id = document.getElementById('grp_cheek');
		grp_id.addEventListener("click", function() { manager.actionGrpButton('cheek'); })

		document.getElementById('grp_cheek').click();
		expect(colorMgr.changeDisplayImageRet).toBe('cheek');
		expect(grpMgr.changeDisplayStateRet).toBe('hidden');

	});


	test(' grpMgr change diplay sate when makeupMgr ask to display ', function() {

		let grpMgr = new GrpMgr([new FakeItem(), new FakeItem()], new FakeRep())
		grpMgr.changeDisplayState('hidden');
		expect(grpMgr.Items[0].test_displayStatus).toBe('hidden');
		expect(grpMgr.Items[1].test_displayStatus).toBe('hidden');
		
	});


	test(' colorMgr change diplay sate when grp is passed ', function() {

		let colorMgr = new ColorMgr([new FakeItem(), new FakeItem()], new FakeRep())
		colorMgr.changeDisplayImage('cheek');
		expect(colorMgr.Items[0].val).toBe('c1_val');
		expect(colorMgr.Items[1].val).toBe('c2_val');
		expect(colorMgr.Items[0].test_displayStatus).toBe('visible');
		expect(colorMgr.Items[1].test_displayStatus).toBe('visible');
		
	});


	test(' A Item binds path to web document  when val is passed ', function() {

		let grpItem_cheek = helper_createGrp();

		grpItem_cheek.setDisplayImage();

		var grpId_cheek = document.getElementById('grp_cheek');
		var src         = grpId_cheek.getAttribute('src');

		expect(src).toBe(ConGrpPath1);

	});

	test(' GrpItem call event handrer when grpItem clicked  ', function() {

		let grpItem = helper_createGrp();
		expect(grpItem.getSrc()).toBe(ConGrpPath1);

		window.onClickTestRet="ng";
		let dummyFunc = new FakeMakeupManager();
		grpItem.setAction(dummyFunc);
		document.getElementById("grp_cheek").click();
		expect(window.onClickTestRet).toBe('actionGrpButton_called');

	});

});

// color clicked 
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
describe('main is changed  when color is selected', () => {


	beforeEach(() => {
		helper_createHtml();
	});

	describe('MakeupManager control grp+color+main itemMger  ', () => {
		test('grp & color is passed to the color-clicked-handler of MakeUpManager ', function() {

			let dummyFunc = new FakeMakeupManager();

			let colorItem = helper_createColor();
			colorItem.setAction(dummyFunc);

			document.getElementById('color_01').click();
			expect(window.onClickTestRet).toEqual(expect.arrayContaining(['actionColorButton_called', 'cheek', 'red']))

		});

		test('MakeupManeger send message to ItemManger ', function() {


			let fakeGrpItemMgr  = new FakeItemMgr();
			let fakeColorItemMgr  = new FakeItemMgr();
			let fakeMainItemMgr  = new FakeItemMgr();

			let manager = new MakeUpManager();
			manager.setItemMgr(fakeGrpItemMgr, fakeColorItemMgr, fakeMainItemMgr);

			let color_css_id = document.getElementById('color_01');
			color_css_id.addEventListener("click", function() { manager.actionColorButton('cheek', 'red'); })
			document.getElementById('color_01').click();

			expect(fakeGrpItemMgr.changeDisplayStateRet).toBe('visible');
			expect(fakeColorItemMgr.changeDisplayStateRet).toBe('hidden');
			expect(fakeMainItemMgr.changeDisplayImageRet).toBe('cheek');

		});

		test('main-val-src is setted to html', function() {
		
			let mainItem_cheek = helper_createMain();

			mainItem_cheek.setDisplayImage();

			var grpId_cheek = document.getElementById('main_cheek');
			var src         = grpId_cheek.getAttribute('src');

			expect(src).toBe(ConMainPath1);
		});
	});


	describe('grp is displayed in dai', () => {
		
		test('grp is displayed in dai  ', function() {
			let grpMgr = new GrpMgr([new FakeItem('grp_cheek'), new FakeItem('grp_fundation')], new FakeMainRep())

			grpMgr.changeDisplayState('visible');
			expect(grpMgr.Items[0].test_displayStatus).toBe('visible');
			expect(grpMgr.Items[1].test_displayStatus).toBe('visible');
		});
	});

	describe('color  is displayed in dai', () => {

		test('color is not  displayed in dai  ', function() {
			let colorMgr = new ColorMgr([new FakeItem('color_cheek'), new FakeItem('color_fundation')], new FakeMainRep())

			colorMgr.Items[0].setImgVal(new ImgValColor(ConColorPath1, 'cheek', 'red'))
			colorMgr.Items[1].setImgVal(new ImgValColor(ConColorPath2, 'cheek', 'blue'))
			colorMgr.changeDisplayState('hidden');
			expect(colorMgr.Items[0].test_displayStatus).toBe('hidden');
			expect(colorMgr.Items[1].test_displayStatus).toBe('hidden');

			colorMgr.changeDisplayImage('cheek');
			expect(colorMgr.Items[0].test_displayStatus).toBe('visible');
			expect(colorMgr.Items[1].test_displayStatus).toBe('visible');
		});
		
	});

	describe('main-image is displayied when color selected  ', () => {

		test('main-item of cheek change  val to red  ', function() {

			let mainMgr = new MainMgr([new FakeItem('main_cheek'), new FakeItem('main_fundation')], new FakeMainRep())

			mainMgr.changeDisplayImage('cheek', 'red');
			expect(mainMgr.Items[0].val.grp).toBe('cheek');
			expect(mainMgr.Items[0].val.color).toBe('red');
			expect(mainMgr.Items[0].test_displayStatus).toBe('visible');

			mainMgr.changeDisplayImage('fundation', 'red');
			expect(mainMgr.Items[1].val.grp).toBe('fundation');
			expect(mainMgr.Items[1].val.color).toBe('red');

		});

		test('main-item of cheek change  val to blue if blue is selected', function() {

			let mainMgr = new MainMgr([new FakeItem('main_cheek'), new FakeItem('main_fundation')], new FakeMainRep())

			mainMgr.changeDisplayImage('cheek', 'blue');
			expect(mainMgr.Items[0].val.grp).toBe('cheek');
			expect(mainMgr.Items[0].val.color).toBe('blue');
		});

	});


	////////////////////////////////////////////////////////
});


	
/////////////////////////////////////////////////////////////////
