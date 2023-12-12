

const { 
	ImgVal, ImgValGrp, ImgValColor, ImgValMain,
	ColorItem 
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


// factory
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
describe('factory can create itemManager', () => {

	let fakeMakeupManger = {};

	beforeEach(() => {

		helper_createHtml();
		fakeMakeupManger = new FakeMakeupManager();
	});

	test(' itemGrpMgr is created by factory class ', function() {
		
		let grpItemMgrFactory = new GrpItemMgrFactory();
		grpItemMgrFactory.setMakeupManager(fakeMakeupManger);
		let grpMgr  =  grpItemMgrFactory.createMgr(Con_js_grp_array);

		expect(grpMgr.Items[0].cssId).toBe('grp_cheek');
		expect(grpMgr.Items[0].val.src).toBe(ConGrpPath1);
		expect(grpMgr.Items[0].val.grp).toBe('cheek');
		expect(grpMgr.Items[1].cssId).toBe('grp_fundation');
		expect(grpMgr.Items[1].val.src).toBe(ConGrpPath2);
		expect(grpMgr.Items[1].val.grp).toBe('fundation');

	});

	test(' color item counts  sould depend on  max group that have most a lot of colors ', function() {
		
		let colorItemMgrFactory = new ColorItemMgrFactory();
		colorItemMgrFactory.setMakeupManager(fakeMakeupManger);

		let colorMgr  =  colorItemMgrFactory.createMgr(Con_js_color_array);
		
		expect(colorMgr.Items[0].cssId).toBe('color_01');
		//expect(colorMgr.Items[0].val.src).toBe(ConColorPath1);
		//expect(colorMgr.Items[0].val.grp).toBe('cheek');
		expect(colorMgr.Items[1].cssId).toBe('color_02');
		expect(colorMgr.Items[2]).toBe(undefined);
	});

	test(' colorItem can be created  ', function() {

		let colorVal = new ImgValGrp(ConColorPath1, 'cheek')

		let colorItem = new ColorItem('color_01');
		colorItem.setImgVal(colorVal)
		expect(colorItem.getSrc()).toBe(ConColorPath1);

	});

	test('main-item is created  ', function() {

		let mainItemMgrFactory = new MainItemMgrFactory();
		mainItemMgrFactory.setMakeupManager(fakeMakeupManger);
		let mainMgr  = mainItemMgrFactory.createMgr(Con_js_main_array);
		//Item
		expect(mainMgr.Items[0].cssId).toBe('main_cheek');

		//val
		expect(mainMgr.Items[0].val.src).toBe(ConMainPath1);
		//if duplicate , not create item 
		expect(mainMgr.Items[2]).toBe(undefined);
		expect(mainMgr.Items[0].val.grp).toBe('cheek');

	});


	test(' val is created ', function() {

		let valueObj = new ImgValGrp(ConGrpPath1, 'cheek')
		expect(valueObj.grp).toBe("cheek");
		expect(valueObj.src).toBe(ConGrpPath1);
		expect(valueObj.constructor === ImgValGrp).toBe(true);

	});

	test(' FilePath is divided into lists ', function() {

		let valuelists =  ItemMgrFactory.analyzeImgFilePath(ConGrpPath1);
		expect(valuelists.grp).toBe("cheek");

	});

	test(' value object is created collectly ', function() {

		let path = '/test/test.jpg';
		const imgFileData = new ImgVal(path);
		expect(imgFileData.src).toBe(path);

		let grp = 'cheek';
		const imgFileGrp = new ImgValGrp(path, grp);
		expect(imgFileGrp.grp).toBe(grp);

		let color = 'red';
		const imgFileColor = new ImgValColor(path, grp, color);
		expect(imgFileColor.color).toBe(color);

		const imgFileMain = new ImgValMain(path, grp, color);
		expect(imgFileMain.color).toBe(color);
	});

	test('rep will return val object when passed grp-key ', function() {

		let colorRep = new Repository();

		let colorVal1 = new ImgValColor(ConColorPath1, 'cheek')
		colorRep.setVal(colorVal1)
		
		let colorVal2 = new ImgValColor(ConColorPath2, 'cheek')
		colorRep.setVal(colorVal2)
		
		let cheek_colorVals = colorRep.getVals('cheek')
		
		expect(cheek_colorVals).toEqual(expect.arrayContaining([colorVal1, colorVal2]));


	});

	test('CssId of Grp by file-path is same that is cssid of html', function() {

		document.body.innerHTML =
		    '<img src="img/grp/grpxxxx.png" id="grp_cheek" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/grp/grpxxxx.png" id="grp_fundation_err" alt="" />';

		let grpItemMgrFactory = new GrpItemMgrFactory();
		grpItemMgrFactory.setMakeupManager(fakeMakeupManger);

		const error_massage = 'cssid and path error  : cssid:grp_fundation :path:./img/grp/fundation.png'
		expect(() => grpItemMgrFactory.createMgr(Con_js_grp_array)).toThrow(error_massage);

	});

	test('CssId by of color file-path is same that is cssid of html', function() {

		document.body.innerHTML =
		    '<img src="img/color/colorxxx.png" id="color_01" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/color/colorxxxx.png" id="color_02_err" alt="" />';

		let colorItemMgrFactory = new ColorItemMgrFactory();
		colorItemMgrFactory.setMakeupManager(fakeMakeupManger);

		const error_massage = 'cssid and path error  : cssid:color_02 :path:'
		expect(() => colorItemMgrFactory.createMgr(Con_js_color_array)).toThrow(error_massage);

	});


	test('CssId of Main by file-path is same that is cssid of html', function() {

		document.body.innerHTML =
		    '<img src="img/main/mainxxxx.png" id="main_cheek" alt="" />';

		document.body.innerHTML = document.body.innerHTML +
		    '<img src="img/main/mainxxxx.png" id="main_fundation_err" alt="" />';

		let mainItemMgrFactory = new MainItemMgrFactory();
		mainItemMgrFactory.setMakeupManager(fakeMakeupManger);

		const error_massage = 'cssid and path error  : cssid:main_fundation :path:./img/main/fundation/red.png'
		//expect(() => mainItemMgrFactory.createMgr(Con_js_main_array)).toThrow(error_massage);

	});


});



