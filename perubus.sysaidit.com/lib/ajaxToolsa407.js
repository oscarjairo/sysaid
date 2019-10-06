


var t;
var isSREdit = location.href.toLowerCase().search("sredit.jsp")>-1 || location.href.toLowerCase().search("submitsr.jsp")>-1 || location.href.search("SubmitSRSelfServicePortal.jsp")>-1;
function submitFormAsAjax(docObj,docForm,actionStr,elementIDs,refreshInterval,post) {
    var postContent="" ;
    var thirdLevelChageActive = thirdLevelChageActive || false;

    //new attachments (SSP) handling for page reload via ajax (template change, category change etc.)
    var $fileUpload = $('#fileupload');
    if ($fileUpload.data('blueimpFileupload')) {
        $fileUpload.fileupload('destroy');
    }

    if(thirdLevelChageActive) {
        var valuesNeeded = ['problem_type','subcategory', 'thirdLevelCategory', 'populateSR', 'quick_name', 'populateSR_id', 'type']

        $.each(valuesNeeded, function(i,val){
            var selector = '[name=' + val + ']',
                    $element = $(selector);

            if(valuesNeeded.length-1 === i) {
                postContent += encodeURIComponent(val) + '=' + encodeURIComponent($element.val());
            } else {
                postContent += encodeURIComponent(val) + '=' + encodeURIComponent($element.val()) + '&';
            }

        });

        thirdLevelChageActive = false;
    } else if (post==1)
        postContent= formData2QueryString(docForm);
    else if (post==2)
        postContent=templateData2QueryString(docForm);
    //alert("run submitFormAsAjax");


    //console.log(postContent);

    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {// code for Firefox, Opera, IE7, etc.
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null)
    {
        //window.status = "Reading data....";
        //xmlhttp.onreadystatechange = form_submit_state_change;
        if(refreshInterval>=60000 || isSREdit) // it's less than one minute --> don't show the loading indicator
        {
            displayLoadingIndicator(docObj,true);
        }
        xmlhttp.open("POST", actionStr, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xmlhttp.setRequestHeader("Content-length", postContent.length);
        //xmlhttp.setRequestHeader("Connection", "close");
        xmlhttp.setRequestHeader("Cache-Control", "no-cache");
//      xmlhttp.setRequestHeader("Pragma", "no-cache");
        xmlhttp.setRequestHeader("Expires", "Mon, 26 Jul 1997 05:00:00 GMT");
        xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // Get location of bottomPanel scroll bar
                var bottomPanelDivScrollLocation = 0;
                if ($('#bottomPanelDiv').length > 0)
                {
                    bottomPanelDivScrollLocation = $('#bottomPanelDiv').scrollTop();
                }

                displayLoadingIndicator(docObj,false);
                var responseTextStr =  xmlhttp.responseText;
                if (responseTextStr.indexOf("SYSAID_AJAX_SEPERATOR")<=0) {
                    window.location.reload();
                } else {

                    //alert("text.length="+texts.length);
                    //alert("elementIDs.length="+elementIDs.length);
                    var alertFromDatePreffix = "ALERT_FROM_DATE_WRONG";
                    if (responseTextStr.indexOf(alertFromDatePreffix)>=0)
                    {
                        var messagesResponse = responseTextStr.substring(responseTextStr.indexOf(alertFromDatePreffix) + alertFromDatePreffix.length);
                        responseTextStr = responseTextStr.substring(0,responseTextStr.indexOf(alertFromDatePreffix));
                        alert(document.getElementById('fromInvalid').value );
                    }

                    var alertToDatePreffix = "ALERT_TO_DATE_WRONG";
                    if (responseTextStr.indexOf(alertToDatePreffix)>=0)
                    {
                        var messagesResponse = responseTextStr.substring(responseTextStr.indexOf(alertToDatePreffix) + alertToDatePreffix.length);
                        responseTextStr = responseTextStr.substring(0,responseTextStr.indexOf(alertToDatePreffix));
                        alert(document.getElementById('toInvalid').value);
                    }

                    var newMessagesPrefix = "CHECK_NEW_MESSAGES_RESPONSE";
                    if (responseTextStr.indexOf(newMessagesPrefix)>=0)
                    {
                        var messagesResponse = responseTextStr.substring(responseTextStr.indexOf(newMessagesPrefix) + newMessagesPrefix.length);
                        responseTextStr = responseTextStr.substring(0,responseTextStr.indexOf(newMessagesPrefix));
                        if (messagesResponse > 0)
                        {
                            // play sound
                            if(refreshInterval<60000)// if it's less than 1 minute,play the sound ( we set the object in HelpDesk.jsp)
                            {
                                sonified_flash();
                            }
                        }
                    }
                    var texts = responseTextStr.split("!!!SYSAID_AJAX_SEPERATOR!!!");
                    for (ili = 0; ili < texts.length && ili < elementIDs.length; ili++) {
                        //alert("elementID="+texts[ili]);
                        //alert("element("+i+")");
                        if (typeof elementIDs[ili]=="string" && elementIDs[ili]=="SCRIPT") { //check if it javascript code or reference to html div
                            //alert("eval="+texts[i]);
                            try{
                                //         eval(texts[ili]);
                                var head= document.getElementsByTagName('head')[0];
                                var script= document.createElement('script');
                                script.type= 'text/javascript';
                                script.text= texts[ili];
                                head.appendChild(script);
                            }catch( e){
                                alert(e.description);
                            }
                            //alert("after eval");
                            //alert("element("+ili+")");
                            //return;
                        } else if (elementIDs[ili] != null) {
                            if (texts[ili]!=null){
                                //     elementIDs[ili].parentElement().replaceChild(newDiv,  elementIDs[ili]);
                                newDiv = document.createElement(elementIDs[ili].tagName+'1');

                                newDiv.id = elementIDs[ili].id+'1';
                                newDiv.className = elementIDs[ili].className;
                                //replace - workuround for buggy tabs display
                                newDiv.innerHTML = texts[ili];
                                //newDiv.innerHTML = newDiv.innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;','', 'gim');
                                newDiv.innerHTML = newDiv.innerHTML.replace(/(&nbsp;){2,}(?=<table id="buggy-table")/ig, "");

                                //paren=elementIDs[ili].parentNode;
                                // paren.removeChild(elementIDs[ili]);
                                // paren.appendChild(newDiv);
                                elementIDs[ili].innerHTML = newDiv.innerHTML;

                                //    while (  elementIDs[ili].childNodes[0]) {
                                //        elementIDs[ili].removeChild(  elementIDs[ili].childNodes[0]);
                                // }
                                //elementIDs[ili].innerHTML='';
                                //  elementIDs[ili].appendChild(newDiv);

                            }
                        }
                    }


                    // for SSP
                    if (typeof clickParentBtn === "function") {
                        var tabCount = $("#sspTabsWrapper .tab").length;
                        if(tabCount > 1 ) {
                            $('#sspTabsWrapper').show();
                        }

                        var formValidateErrors = window.formValidateErrors;
                        if (formValidateErrors && Object.keys(formValidateErrors).length > 0 && formValidateErrors.constructor === Object) {
                            validationFailed(formValidateErrors);
                        }

                        clickParentBtn(new parentAction('setIframeHeight')); // resets iframe height after ajax response
                    }

                    // for skype addon - recheck users after ajax response
                    if (typeof checkLogin === "function") {
                        checkLogin();
                    }


// check if jquery datapicker js file included before as load on page datapickers added from ajax
                    if (typeof window.calendarArray != 'undefined' || typeof window.calendar == 'function'){
                        initDatapickerAfterLoading();
                    }
                    if(refreshInterval > 0)
                    {
                        if (t!=null)
                            clearTimeout(t);
                        t=setTimeout("refreshPage()",refreshInterval);
                    }
                    else // no ajax or sredit file or submit-service-req
                    {
                        // this block is in try/catch since we are not sure that he is available on all pages
                        try
                        {
                            loadCustomFormCode();
                        }
                        catch (e)
                        {
                            // do nothing, probably method does not exist
                        }
                    }
                }

                // Set scrollbar of bottom panel after updating the form and scripts to the original location
                if ($('#bottomPanelDiv').length > 0)
                {
                    $('#bottomPanelDiv').scrollTop(bottomPanelDivScrollLocation);
                }



            } else if(xmlhttp.readyState == 4 && xmlhttp.status != 200) {
                displayLoadingIndicator(docObj,false);
                window.location.reload();
            }
        }



        xmlhttp.send(postContent);
    }

}

var windowWidth,windowHeight;

// set Accessibility  to combobox (Stylish Select 0.3 - $ plugin) of type template.
// function setSelectTemplateAccessibility() {
//
//     //get category of hiLited listItem.
//     $('.newListOptionTitle').find('ul').find('li').each(function( index ) {
//         caption= $( this ).text();
//         categoryNode=$( this ).closest('.newListOptionTitle');
//         category = $( this ).parent().parent().contents().filter(function() {
//             //Node.TEXT_NODE === 3
//             return (this.nodeType === 3);
//         });
//
//         if(category[0]) {
//             caption = category[0].textContent + ' ' + caption;
//         }
//         //add class selected to category of hiLited listItem.
//         if($( this ).hasClass('hiLite')) {
//             categoryNode.addClass("selected");
//         }
//         //set aria-label to listItem.
//         $( this ).attr('aria-label',  caption);
//
//     });
//
// }

function getDimensions(docObj) {
    if (typeof(window.innerHeight) == 'number') {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }
    else {
        if (docObj.documentElement && docObj.documentElement.clientHeight) {
            windowWidth = docObj.documentElement.clientWidth;
            windowHeight = docObj.documentElement.clientHeight;
        }
        else {
            if (docObj.body && docObj.body.clientHeight) {
                windowWidth = docObj.body.clientWidth;
                windowHeight = docObj.body.clientHeight;
            }
        }
    }
    windowWidth = windowWidth * 1;
    windowHeight = windowHeight * 1;
}


function displayLoadingIndicator(docObj, display)
{
    try
    {
        if(isSREdit)
        {
            return displaySRFormLoadingIndicator(docObj,display);
        }
        if (display)
        {
            docObj.getElementById("listLoadingIndicator").style.display = "inline";
            getDimensions(docObj);
            var divWidth = docObj.getElementById("listLoadingIndicator").style.width;
            divWidth = divWidth.replace('px', '')*1;
            var divHeight = docObj.getElementById("listLoadingIndicator").style.height;
            divHeight = divHeight.replace('px', '')*1;
            docObj.getElementById("listLoadingIndicator").style.left = windowWidth / 2 - divWidth / 2+"px";
            docObj.getElementById("listLoadingIndicator").style.top = windowHeight / 2 - divHeight / 2+"px";
        }
        else
        {
            if ( docObj.getElementById("listLoadingIndicator")!=null)
                docObj.getElementById("listLoadingIndicator").style.display = "none";
        }
    }
    catch (e)
    {

    }
}


function validateFile(files, maxSize, msgFormat){
    var errorNamesArr=[];
    var length=files.length;
    for (i = length-1; i >= 0; --i) {
       if(files[i].size>maxSize){
           errorNamesArr.push(files[i].name);
           files.splice(i,1);
       }
    }
    var result=errorNamesArr.length>0?msgFormat.replace('{0}', errorNamesArr.join(', ')):false;
    return result;
}

function displaySRFormLoadingIndicator(docObj, display)
{
    try
    {
        if (display)
        {
            docObj.getElementById("formLoadingIndicator").style.display = "block";
            docObj.getElementById("formLoadingIndicator").style.position = "fixed";
            getDimensions(docObj);
            var divWidth = docObj.getElementById("formLoadingIndicator").style.width;
            divWidth = divWidth.replace('px', '')*1;
            var divHeight = docObj.getElementById("formLoadingIndicator").style.height;
            divHeight = divHeight.replace('px', '')*1;
            docObj.getElementById("formLoadingIndicator").style.left = windowWidth / 2 - divWidth / 2 + "px";

            docObj.getElementById("formLoadingIndicator").style.top = window.screen.height / 2 - divHeight / 2 + "px";
            if (document.getElementById('sspContent')) {
                docObj.getElementById('srFormOverlayDiv').style.zIndex='1600';
                parent.document.body.style.overflowY = 'hidden';
                var tmp = (parent.document.documentElement.scrollTop||parent.document.body.scrollTop + parent.window.screen.height / 2 - parent.document.getElementById('titleWrapperDiv').clientHeight - parent.document.getElementsByClassName('navbarWrapper')[0].clientHeight - divHeight / 2 ) + 'px';
                docObj.getElementById("formLoadingIndicator").style.top = tmp;
            }
            DisabledEffects("srForm");
        }
        else
        {

            if ( docObj.getElementById("formLoadingIndicator")!=null)
                docObj.getElementById("formLoadingIndicator").style.display = "none";
            if (document.getElementById('sspContent')) {
                parent.document.body.style.overflowY = 'auto';
            }
            EnabledEffects("srForm");


        }
    }
    catch (e)
    {

    }
}



function formData2QueryString(docForm) {

    var strSubmitContent = '';
    var formElem;
    var strLastElemName = '';
    var options = null;

    for (i = 0; i < docForm.elements.length; i++) {

        formElem = docForm.elements[i];

        if (formElem == null || formElem.value == null || formElem.name == null || formElem.name.length == 0)
            continue;

        switch (formElem.type) {
            // Text fields, hidden form elements
            case 'text':
            case 'hidden':
            case 'password':
            case 'textarea':
            case 'select-one':
                strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
                break;
            case 'select-multiple':
                options = formElem.options;
                if( options!= null && typeof(options) != 'undefined')
                {
                    for(var iCounter = 0; iCounter < options.length; iCounter++)
                    {
                        if(options[iCounter].selected)
                        {
                            strSubmitContent += formElem.name + '=' + encodeURIComponent(options[iCounter].value) + '&'
                        }
                    }
                }
                break;

            // Radio buttons
            case 'radio':
                if (formElem.checked) {
                    strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
                }
                break;

            // Checkboxes
            case 'checkbox':
                if (formElem.checked) {
                    // Continuing multiple, same-name checkboxes
                    if (formElem.name == strLastElemName) {
                        // Strip of end ampersand if there is one
                        if (strSubmitContent.lastIndexOf('&') == strSubmitContent.length-1) {
                            strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
                        }
                        // Append value as comma-delimited string
                        strSubmitContent += ',' + encodeURIComponent(formElem.value);
                    }
                    else {
                        strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value);
                    }
                    strSubmitContent += '&';
                    strLastElemName = formElem.name;
                }
                break;

        }
    }

    // Remove trailing separator
    strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
    return strSubmitContent;
}


function templateData2QueryString(docForm) {

    var strSubmitContent = '';
    var formElem;
    var strLastElemName = '';
    var options = null;
    var fieldsArray=document.getElementById('changedFields').value.split("^");

    for (i = 0; i < fieldsArray.length; i++) {

        formElem = document.getElementById(fieldsArray[i]);

        if (formElem == null || formElem.value == null || formElem.name == null || formElem.name.length == 0)
            continue;

        switch (formElem.type) {
            // Text fields, hidden form elements
            case 'text':
            case 'hidden':
            case 'password':
            case 'textarea':
            case 'select-one':
                strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
                break;
            case 'select-multiple':
                options = formElem.options;
                if( options!= null && typeof(options) != 'undefined')
                {
                    for(var iCounter = 0; iCounter < options.length; iCounter++)
                    {
                        if(options[iCounter].selected)
                        {
                            strSubmitContent += formElem.name + '=' + encodeURIComponent(options[iCounter].value) + '&'
                        }
                    }
                }
                break;

            // Radio buttons
            case 'radio':
                if (formElem.checked) {
                    strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
                }
                break;

            // Checkboxes
            case 'checkbox':
                if (formElem.checked) {
                    // Continuing multiple, same-name checkboxes
                    if (formElem.name == strLastElemName) {
                        // Strip of end ampersand if there is one
                        if (strSubmitContent.lastIndexOf('&') == strSubmitContent.length-1) {
                            strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
                        }
                        // Append value as comma-delimited string
                        strSubmitContent += ',' + encodeURIComponent(formElem.value);
                    }
                    else {
                        strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value);
                    }
                    strSubmitContent += '&';
                    strLastElemName = formElem.name;
                }
                break;

        }
    }

    // Remove trailing separator
    strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
    return strSubmitContent;
}
