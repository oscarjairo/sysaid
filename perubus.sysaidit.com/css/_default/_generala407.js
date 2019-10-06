//
//
/*
    * Browser name: BrowserDetect.browser
    * Browser version: BrowserDetect.version
    * OS name: BrowserDetect.OS
 */
document.BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
            var appName = data[i].appName;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					{return data[i].identity;}
			}
			else if (dataProp)
				{return data[i].identity;}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) {return;}
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb",
            appName: navigator.appName
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
            appName: navigator.appName
		},
		{
			prop: window.opera,
			identity: "Opera",
            appName: navigator.appName
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab",
            appName: navigator.appName
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror",
            appName: navigator.appName
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox",
            appName: navigator.appName
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino",
            appName: navigator.appName
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape",
            appName: navigator.appName
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE",
            appName: navigator.appName
		},
        {
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer",
			versionSearch: "rv",
            appName: navigator.appName
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv",
            appName: navigator.appName
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla",
            appName: navigator.appName
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
document.BrowserDetect.init();
/* window 'load' attachment */
function submitenter(myfield,e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   myfield.form.submit();
   return false;
   }
else
   return true;
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function addUnLoadEvent(func) {
	var oldunonload = window.onunload;
	if (typeof window.onunload != 'function') {
		window.onunload = func;
	}
	else {
		window.onunload = function() {
			oldunonload();
			func();
		}
	}
}

function doLogout(){
	window.open(".");
	this.close();
}
//
function openDialogWindow(strURL,intWIDTH,intHEIGHT,boolMODAL,vArguments){
	strWidth = "dialogWidth:"+intWIDTH+"px;";
	strHeight = "dialogHeight:"+intHEIGHT+"px;";
	strFeatures =	strWidth +
					strHeight +
					"center: yes;" +
					"status: no;" +
					"resizable: no;"

	switch( boolMODAL ){
		case true:
			var result = window.showModalDialog(strURL,vArguments,strFeatures);
			break
		case false:
			var result = window.showModelessDialog(strURL,vArguments,strFeatures);
			break
		default:
			alert("TBD: boolMODAL = null")
			break
	}
	return result
	// Note:
	// Modal dialog returns "returnValue" value from dialog
	// Modeless dialog returns reference to dialog window
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function inheritFrom(/* Object */ aThis, /* Object */ aParent)
{
	var excp;

	for (var property in aParent)
	{
		try
		{
			aThis[property] = aParent[property];
		}
		catch(excp)
		{
		}
	}
}
function inheritUnload(/* Object */ aThis, /* Object */ aParent)
{
	var excp;

	for (var property in aThis)
	{
		try
		{
      //alert(property+' : '+typeof aThis[property]);
      if (typeof aThis[property] == 'function' || typeof aThis[property] == 'object') {
        aThis[property] = null;
      }
    }
		catch(excp)
		{
		}
	}
}
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

/* GUI Element Handeling */
function guiObject()
{
	/* Generic Methods */
	this.getStyle = function (Obj,strCssRule)
	{
		var strValue = "";
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(Obj, "").getPropertyValue(strCssRule);
		}
		else if(Obj.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = Obj.currentStyle[strCssRule];
		}
		return strValue;
	}
	this.swapBGs = function( _oldState, _newState )
	{
		this.style.backgroundImage = getStyle(this,"background-image").replace(_oldState,_newState);
		if(this.style.backgroundImage != "none")
		{
			imgSrc = this.style.backgroundImage.match(/url\((.+)\)/)[1];
//			imgPreload(imgSrc);
		}

	}
	/* Event Handlers */
	this.onmouseover = function ()
	{
		this.swapBGs("_idle","_hover");
	}
	this.onmouseout = function ()
	{
		this.swapBGs("_hover","_idle");
	}
	this.onmousedown = function ()
	{
		this.swapBGs("_hover","_down");
	}
	this.onmouseup = function ()
	{
		this.swapBGs("_down","_hover");
	}

	/* Methods */
	this.disable = function()
	{
		this.disabled = true;

	}
	this.enable = function()
	{
		this.disabled = false;

	}
}

function loadScripts()
{
	this.loadScript = function(strPath)
	{
       try
       {
                oScript = document.createElement("SCRIPT");
                oScript.id = "Script_"+strPath.replace(/\/()/g,"_");
                oScript.type = "text/javascript";
                oScript.src = strPath;
                document.getElementsByTagName("HEAD")[0].appendChild(oScript);
       }
       catch(e) {}
    }
	var Scriptlist =
	{
		"ButtonSet_Button"		: "css/buttons/buttons.js?v16.3.30b01",
		"MenuButtonSet"			: "css/toolbar/toolbarMenu.js?v16.3.30b01",
		"Grid"					: "css/grid/grid.js?v16.3.30b01",
		"Tab"					: "css/tabCtrl/tabCtrl.js?v16.3.30b01",
		"SidePanel"				: "css/leftPane/leftPanel.js?v16.3.30b01",
        "ComboBox"              : "combobox/js/init.js?v16.3.30b01"
    }
  //preLoadImages();
  for(className in Scriptlist){
	  this.loadScript(Scriptlist[className]);
	}


}
//var preloadedImgs = {"length":0}
//function imgPreload(imgSrc)
//{
//	var added = false;
//	imgSrcSplit = imgSrc.split("/");
//	if(imgSrcSplit[0] == "http:")
//	{
//		imgSrcSplit = imgSrcSplit.slice(1);
//	}
//	if(imgSrcSplit[0] == "")
//	{
//		imgSrcSplit = imgSrcSplit.slice(1);
//	}
//	imgId = imgSrcSplit.join("_");
//	if(preloadedImgs[imgId]==null)
//	{
//		preloadedImgs[imgId] = {};
//		preloadedImgs[imgId] = new Image();
//		preloadedImgs[imgId].src = imgSrc;
//		preloadedImgs.length++;
//		added = true;
//	}
//	//if(added == false){debugger;}
//}
addLoadEvent(loadScripts);

function preLoadImages(){
  MM_preloadImages(imageArr);
}

var imageArr = [
 'css/pageLayout/login/loginCaption_en.gif',
'css/pageLayout/images/pane_top_left.gif',
'css/pageLayout/images/page_header_bgImage_rtl.gif',
'css/pageLayout/images/page_header_bg.gif',
'css/pageLayout/images/page_header_bgImage.gif',
'css/pageLayout/headerToolbar/logout_down.gif',
'css/pageLayout/headerToolbar/send_message_over.gif',
'css/pageLayout/headerToolbar/logout_idle.gif',
'css/pageLayout/headerToolbar/send_message_hover.gif',
'css/pageLayout/headerToolbar/end_user_portal_down.gif',
'css/pageLayout/headerToolbar/help_hover.gif',
'css/pageLayout/headerToolbar/send_message_down.gif',
'css/pageLayout/headerToolbar/manager_portal_down.gif',
'css/pageLayout/headerToolbar/home_hover.gif',
'css/pageLayout/headerToolbar/end_user_portal_hover.gif',
'css/pageLayout/headerToolbar/logout_hover.gif',
'css/pageLayout/headerToolbar/home_down.gif',
'css/pageLayout/headerToolbar/manager_portal_idle.gif',
'css/pageLayout/headerToolbar/home_idle.gif',
'css/pageLayout/headerToolbar/end_user_portal_idle.gif',
'css/pageLayout/headerToolbar/help_down.gif',
'css/pageLayout/headerToolbar/manager_portal_hover.gif',
'css/pageLayout/headerToolbar/send_message_idle.gif',
'css/pageLayout/headerToolbar/help_idle.gif',
'css/pageLayout/pageFrame/top_left.gif',
'css/pageLayout/pageFrame/body_right.gif',
'css/pageLayout/pageFrame/bottom_left.gif',
'css/pageLayout/pageFrame/top_center.gif',
'css/pageLayout/pageFrame/body_left.gif',
'css/pageLayout/pageFrame/header_left.gif',
'css/pageLayout/pageFrame/header_bg_dark.gif',
'css/pageLayout/pageFrame/header_right.gif',
'css/pageLayout/pageFrame/top_right.gif',
'css/pageLayout/pageFrame/bottom_center.gif',
'css/pageLayout/pageFrame/bottom_right.gif',
'css/moduleMenu/images/moduleMenu_bg.gif',
'css/toolbar/images/btn_down_right.gif',
'css/toolbar/images/btn_disabled_right.gif',
'css/toolbar/images/toolbarField_right_rtl.gif',
'css/toolbar/images/btn_hover_center.gif',
'css/toolbar/images/button_bg.gif',
'css/toolbar/images/toolbarField_left_rtl.gif',
'css/toolbar/images/btn_idle_left.gif',
'css/toolbar/images/btn_down_center.gif',
'css/toolbar/images/btn_down_left.gif',
'css/toolbar/images/btn_seperator.gif',
'css/toolbar/images/mainToolbar_bg.gif',
'css/toolbar/images/btn_idle_center.gif',
'css/toolbar/images/toolbarField_right.gif',
'css/toolbar/images/btn_hover_right.gif',
'css/toolbar/images/btn_disabled_left.gif',
'css/toolbar/images/btn_disabled_center.gif',
'css/toolbar/images/toolbarField_center.gif',
'css/toolbar/images/toolbarField_left.gif',
'css/toolbar/images/btn_hover_left.gif',
'css/toolbar/images/btn_idle_right.gif',
'css/toolbar/menu/item_idle_left.gif',
'css/toolbar/menu/lastItem_hover_left.gif',
'css/toolbar/menu/item_hover_left.gif',
'css/toolbar/menu/lastItem_hover_right.gif',
'css/toolbar/menu/lastItem_idle_center.gif',
'css/toolbar/menu/item_down_left.gif',
'css/toolbar/menu/lastItem_down_center.gif',
'css/toolbar/menu/lastItem_hover_center.gif',
'css/toolbar/menu/lastItem_down_left.gif',
'css/toolbar/menu/item_down_center.gif',
'css/toolbar/menu/lastItem_down_right.gif',
'css/toolbar/menu/item_down_right.gif',
'css/toolbar/menu/item_hover_right.gif',
'css/toolbar/menu/item_hover_center.gif',
'css/toolbar/menu/lastItem_idle_left.gif',
'css/toolbar/menu/item_idle_right.gif',
'css/toolbar/menu/lastItem_idle_right.gif',
'css/toolbar/purple/btn_down_right.gif',
'css/toolbar/purple/btn_hover_center.gif',
'css/toolbar/purple/btn_idle_left.gif',
'css/toolbar/purple/btn_down_center.gif',
'css/toolbar/purple/btn_down_left.gif',
'css/toolbar/purple/btn_idle_center.gif',
'css/toolbar/purple/btn_hover_right.gif',
'css/toolbar/purple/btn_hover_left.gif',
'css/toolbar/purple/btn_idle_right.gif',
'css/icons/icon_magnifier.png',
'css/icons/icon_calendar.gif',
'css/icons/icon_folder.gif',
'css/icons/icon_placeholder.gif',
'css/icons/icon_help.gif',
'css/icons/icon_circle.gif',
'css/icons/icon_message.gif',
'css/icons/icon_dropArrow.gif',
'css/icons/icon_triangle.gif',
'css/icons/icon_page.gif',
'css/icons/icon_arrow_red.gif',
'css/icons/icon_logout.gif',
'css/identity/sysaid_logo.png',
'css/newsWidget/images/body_right.gif',
'css/newsWidget/images/bottom_left.gif',
'css/newsWidget/images/body_left.gif',
'css/newsWidget/images/title_left.gif',
'css/newsWidget/images/title_right.gif',
'css/newsWidget/images/body_bg.gif',
'css/newsWidget/images/frame_bottom_left.gif',
'css/newsWidget/images/title_center.gif',
'css/newsWidget/images/frame_bottom_center.gif',
'css/newsWidget/images/frame_bottom_right.gif',
'css/newsWidget/images/bottom_center.gif',
'css/newsWidget/images/bottom_right.gif',
'css/buttons/button3Parts/default/btn_down_right.gif',
'css/buttons/button3Parts/default/btn_disabled_right.gif',
'css/buttons/button3Parts/default/btn_hover_center.gif',
'css/buttons/button3Parts/default/btn_idle_left.gif',
'css/buttons/button3Parts/default/btn_down_center.gif',
'css/buttons/button3Parts/default/btn_down_left.gif',
'css/buttons/button3Parts/default/btn_idle_center.gif',
'css/buttons/button3Parts/default/btn_hover_right.gif',
'css/buttons/button3Parts/default/btn_disabled_left.gif',
'css/buttons/button3Parts/default/btn_disabled_center.gif',
'css/buttons/button3Parts/default/btn_hover_left.gif',
'css/buttons/button3Parts/default/btn_idle_right.gif',
'css/buttons/button3Parts/black/btn_down_right.gif',
'css/buttons/button3Parts/black/btn_hover_center.gif',
'css/buttons/button3Parts/black/btn_idle_left.gif',
'css/buttons/button3Parts/black/btn_down_center.gif',
'css/buttons/button3Parts/black/btn_down_left.gif',
'css/buttons/button3Parts/black/btn_idle_center.gif',
'css/buttons/button3Parts/black/btn_hover_right.gif',
'css/buttons/button3Parts/black/btn_hover_left.gif',
'css/buttons/button3Parts/black/btn_idle_right.gif',
'css/buttons/button3Parts/purple/btn_down_right.gif',
'css/buttons/button3Parts/purple/btn_hover_center.gif',
'css/buttons/button3Parts/purple/btn_idle_left.gif',
'css/buttons/button3Parts/purple/btn_down_center.gif',
'css/buttons/button3Parts/purple/btn_down_left.gif',
'css/buttons/button3Parts/purple/btn_idle_center.gif',
'css/buttons/button3Parts/purple/btn_hover_right.gif',
'css/buttons/button3Parts/purple/btn_hover_left.gif',
'css/buttons/button3Parts/purple/btn_idle_right.gif',
'css/tabCtrl/default/tab_idle_leftmost_rtl.gif',
'css/tabCtrl/default/tab_hover_center.gif',
'css/tabCtrl/default/tab_idle_leftmost.gif',
'css/tabCtrl/default/tab_idle_rightmost.gif',
'css/tabCtrl/default/tab_selected_left.gif',
'css/tabCtrl/default/tab_idle_center.gif',
'css/tabCtrl/default/tab_selected_leftmost.gif',
'css/tabCtrl/default/tab_hover_leftmost.gif',
'css/tabCtrl/default/tab_hover_leftmost_rtl.gif',
'css/tabCtrl/default/tab_hover_rightmost_rtl.gif',
'css/tabCtrl/default/tab_selected_center.gif',
'css/tabCtrl/default/tab_hover_rightmost.gif',
'css/tabCtrl/default/tab_idle_rightmost_rtl.gif',
'css/tabCtrl/default/tab_onlyidle_rightmost.gif',
'css/tabCtrl/default/tab_selected_right.gif',
'css/tabCtrl/default/tab_onlyidle_leftmost.gif',
'css/leftPane/images/topItem_hover_left.gif',
'css/leftPane/images/frame_bottom_left_closed.gif',
'css/leftPane/images/item_idle_left.gif',
'css/leftPane/images/topItem_disabled_center.gif',
'css/leftPane/images/topItem_hover_center.gif',
'css/leftPane/images/topItem_idle_left.gif',
'css/leftPane/images/item_hover_left.gif',
'css/leftPane/images/topItem_selected_left.gif',
'css/leftPane/images/frame_top_center_closed.gif',
'css/leftPane/images/topItem_selected_right.gif',
'css/leftPane/images/leftPanel_bottomBg.gif',
'css/leftPane/images/item_selected_right.gif',
'css/leftPane/images/btn_collapse_pointLeft_idle.gif',
'css/leftPane/images/topItem_disabled_left.gif',
'css/leftPane/images/frame_top_center.gif',
'css/leftPane/images/item_selected_center.gif',
'css/leftPane/images/topItem_selected_center.gif',
'css/leftPane/images/btn_collapse_closed_idle.gif',
'css/leftPane/images/frame_top_right_closed.gif',
'css/leftPane/images/frame_bottom_center_closed.gif',
'css/leftPane/images/frame_top_right.gif',
'css/leftPane/images/item_idle_center.gif',
'css/leftPane/images/item_disabled_left.gif',
'css/leftPane/images/topItem_idle_center.gif',
'css/leftPane/images/item_hover_right.gif',
'css/leftPane/images/frame_bottom_left.gif',
'css/leftPane/images/frame_bottom_right_closed.gif',
'css/leftPane/images/btn_collapse_open_idle.gif',
'css/leftPane/images/topItem_hover_right.gif',
'css/leftPane/images/topItem_disabled_right.gif',
'css/leftPane/images/item_hover_center.gif',
'css/leftPane/images/frame_bottom_center.gif',
'css/leftPane/images/item_disabled_right.gif',
'css/leftPane/images/item_seperator.gif',
'css/leftPane/images/leftPane_bottomBg.gif',
'css/leftPane/images/item_idle_right.gif',
'css/leftPane/images/frame_bottom_right.gif',
'css/leftPane/images/item_disabled_center.gif',
'css/leftPane/images/frame_top_left_closed.gif',
'css/leftPane/images/topItem_idle_right.gif',
'css/leftPane/images/frame_top_left.gif',
'css/leftPane/images/item_selected_left.gif',
'css/leftPane/images/btn_collapse_pointRight_idle.gif',
'css/container/1/header_center.gif',
'css/container/1/bottom_left.gif',
'css/container/1/header_left.gif',
'css/container/1/header_right.gif',
'css/container/1/body_topSahdow.gif',
'css/container/1/bottom_right.gif',
'css/container/2/bottom_left.gif',
'css/container/2/header_left.gif',
'css/container/2/header_right.gif',
'css/container/2/bottom_right.gif',
'css/pager/images/pagerBtn_right_hover.gif',
'css/pager/images/pagerBtn_leftmost_idle.gif',
'css/pager/images/pagerBtn_left_disabled.gif',
'css/pager/images/pagerBtn_rightmost_idle.gif',
'css/pager/images/pagerBtn_left_down.gif',
'css/pager/images/pagerBtn_leftmost_disabled.gif',
'css/pager/images/pagerBtn_right_disabled.gif',
'css/pager/images/pagerBtn_rightmost_down.gif',
'css/pager/images/pagerBtn_left_hover.gif',
'css/pager/images/pagerBtn_leftmost_hover.gif',
'css/pager/images/pagerBtn_left_idle.gif',
'css/pager/images/pagerBtn_rightmost_hover.gif',
'css/pager/images/pagerBtn_rightmost_disabled.gif',
'css/pager/images/pagerBtn_leftmost_down.gif',
'css/pager/images/pagerBtn_right_down.gif',
'css/pager/images/pagerBtn_right_idle.gif',
'css/grid/icons/sort_ascending.gif',
'css/grid/icons/sort_descending.gif',
'css/grid/icons/filter.gif',
'css/grid/images/grid_header_bg_down.gif',
'css/grid/images/grid_header_left.gif',
'css/grid/images/grid_bottom_right.gif',
'css/grid/images/grid_checkbox_idle.gif',
'css/grid/images/grid_header_bg.gif',
'css/grid/images/grid_header_bg_hover.gif',
'css/grid/images/grid_header_bg_idle.gif',
'css/grid/images/grid_header_left_rtl.gif',
'css/grid/images/grid_header_right_rtl.gif',
'css/grid/images/grid_header_bg_scrollerPlaceholder.gif',
'css/grid/images/grid_row_bg_selected.gif',
'css/grid/images/grid_checkbox_selected.gif',
'css/grid/images/grid_header_right.gif',
'css/grid/images/grid_bottom_left.gif',
'css/grid/images/grid_top_right.gif',
'css/grid/images/grid_top_left.gif',
'css/grid/images/grid_header_bg_scrollerPlac.gif'
    ];

function MM_preloadImages(a) { //v3.0
  var d=document;
  if(d.images){
    if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length;
    for(i=0; i<a.length; i++) {
      //if (a[i].indexOf("#")!=0){
        d.MM_p[j]=new Image;
        d.MM_p[j++].src=a[i];
      //}
      }
  }
}

function resizePopup() {
    resizePopupAndAddWidth(0);
}

function resizePopupAndAddWidth(addToWidth) {
    try {
        // exit if window was resized before
	    if (document.body.offsetWidth === window.innerWidth) return;
        var pageContent = document.getElementById("Popup_Layout");
        var decorationHeight;
        var WindowHeight;
        var WindowWidth;
        var delta = 0;

        if(!document.all) {
            decorationHeight = window.outerHeight - window.innerHeight;
            WindowHeight = pageContent.offsetHeight + decorationHeight;
        } else {
            WindowHeight = pageContent.offsetHeight;
        }
        if (WindowHeight > 800)  WindowHeight = 800;
        WindowWidth = pageContent.offsetWidth + 50 + addToWidth;
        WindowHeight += 15;
        if (document.body.offsetHeight < document.body.scrollHeight) {
            delta = Math.abs(document.body.offsetHeight - document.body.scrollHeight) + 15;
        }
        WindowHeight +=delta;
        if(WindowWidth > window.screen.width) {
            WindowWidth = window.screen.width;
        }
        window.resizeTo(WindowWidth,WindowHeight);
    } catch(e)  {

    }
}



function doNothing(){
}


function changeRowBackground(elem,operation)
{
    try
    {
        if (operation == "over")
        {
            elem.style.backgroundColor = "#CAEAB9";
        }
        else if (operation == "out")
        {
            elem.style.backgroundColor = "";
        }
    }
    catch (e)
    {
        // do nothing
    }
}


/**
 * general function to display inline values within list
 * @param selectedId
 */
function displaySelectedValues(selectedId)
{
    try
    {
        var divElement = window.document.getElementById(selectedId + "div");
        try
        {
            var currentValue = window.document.getElementById("display" + selectedId).value;
            if (currentValue != null && currentValue.length > 0 && window[selectedId + "valuesArr"].length > 0) {
                var innerText = "<table style=\"border: 1px black solid;\">";
                var counter = 0;
                for (var index = 0; index < window[selectedId + "valuesArr"].length; index++)
                {
                    if (window[selectedId + "valuesArr"][index].toLowerCase().indexOf(currentValue.toLowerCase()) >= 0)
                    {
                        if (counter ==0) {
                            innerText += "<tr style=\"font-size:xx-small;cursor:pointer;\" height=\"8px\" onclick=\"displayDivElement('" + selectedId + "div',false)\"><td align=\"right\"><u>close</u></td></tr>";
                        }
                        counter++;
                        innerText += "<tr style=\"font-size:x-small;cursor:pointer;\" height=\"15px\" onMouseOver=\"changeRowBackground(this,'over')\" onMouseOut=\"changeRowBackground(this,'out')\">";
                        //innerText += "<td>" + window[selectedId + "keysArr"][index] + "</td>";
                        //innerText += "<td>-</td>";
                        var spaces = "";
                        for (var i = window[selectedId + "valuesArr"][index].length; i < 30; i++) {
                            spaces += "&nbsp;";
                        }
                        innerText += "<td onclick=setListDivContent('" + selectedId + "','" +  window[selectedId + "keysArr"][index]+ "'," + index + ");>" + window[selectedId + "valuesArr"][index] + spaces +  "</td>";
                        innerText += "</tr>";
                        if (counter > 11)  // display only 10 first found entries
                        {
                            break;
                        }
                    }
                }
                innerText += "</table>";
                divElement.innerHTML = innerText;
                displayDivElement(selectedId + "div",true);
                //setTimeout("displayDivElement('" + selectedId + "div',false)\",5000)");
            }

        }
        catch (e)
        {
        }
    }
    catch (ee)
    {
    }

}

function displayDivElement(divId,display)
{
    try
    {
        var divElement = window.document.getElementById(divId);
        if (display == true)
        {
            divElement.style.display = "inline";
        }
        else
        {
            divElement.style.display = "none";
        }
    }
    catch (e)
    {

    }
}

function setListDivContent(id,key,index)
{
    try
    {
        window.document.getElementById(id).value = key;
        window.document.getElementById("display" + id).value = window[id + "valuesArr"][index];
        displayDivElement(id + "div",false);
        setChange();
    }
    catch (e)
    {

    }
}

// Check whether string s is empty.

function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}


function hasBadCharacters(stringToCheck,badChars)
{
   if (badChars == null)
    badChars = "&()[]\\\';,/{}|\":<>?~";
   for (var i = 0; i < stringToCheck.length; i++)
   {
  	    if (badChars.indexOf(stringToCheck.charAt(i)) != -1)
  	        return true;
   }
   return false;
}

function addJS(url)
{
    var oScript = document.createElement("SCRIPT");
    oScript.type = "text/javascript";
    oScript.src = url;
    document.getElementsByTagName("HEAD")[0].appendChild(oScript);
}

// Dynamically Insert CSS
function addCSS(url){
	var headID = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = url;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

// Add css with fixes for every browser
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
	addCSS('css/firefox.css?v16.3.30b01');
}
else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
	addCSS('css/chrome.css?v16.3.30b01');
}

//all ie versions < 10
else if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent) && navigator.userAgent.match(/MSIE\s([\d]+)/)[1] < 10){
	addCSS('css/ie.css?v16.3.30b01');
}
else{}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

window.open_ = window.open;
window.open = function(url, name, props) {
    if(url != null && url.trim().length > 0 && name != 'FAQfromSSP'){
        var ques = (url.indexOf("?")!=-1) ? "&":"?";
        url +=  ques + "notAddingIndexJSP=true";
    }

    return window.open_(url, name, props);
}


//document.getElementsByClassName shiv for ie<10
function getElementsByClassName(node, classname) {
	node = node || document;
	classname = classname || '*';
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

//addEventListener shiv for ie<9
function addEvent(evnt, elem, func) {
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem[evnt] = func;
   }
}

//$(document).ready equivalent without jQuery
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function () {
	try {top.Backbone && top.Backbone.View.prototype.eventAggregator.trigger('frameLoaded', window.location.href);} catch (e) {}
});