
// This script manipulates a web page's DOM to show messages of critical importance.
// It is activated semi-annually during the campus emergency notification drills.
// Contact the Office of Web Communications (webmaster@cornell.edu) for further information.
// Production version: https://embanner.univcomm.cornell.edu/OWC-emergency-banner.js 
// Testing / Development version: https://embanner.univcomm.cornell.edu/OWC-emergency-banner-force-test.js 

CUEmBanner = {};
CUEmBanner.lastUpdated = 'Wednesday, April 19 at 1:07 PM';
CUEmBanner.OWC_message = 'No message';
// Cookies functions from http://www.w3schools.com/JS/js_cookies.asp
CUEmBanner.getCookie = function (c_name) {
	if (document.cookie.length > 0) {
		//alert(document.cookie);
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) { 
			c_start = c_start + c_name.length + 1; 
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) {c_end = document.cookie.length;}
			return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return '';
}

CUEmBanner.setCookie = function (c_name, value) {
	var expires = new Date();
	var expireminutes = 2;
	var expiremilliseconds = expireminutes * 60 * 1000;
	expires.setTime(expires.getTime() + expiremilliseconds);
	var cookieStr = c_name + '=' + escape(value) + ((expireminutes == null) ? '' : ';expires=' + expires.toGMTString()+'; path=/');
	document.cookie = cookieStr;
}

CUEmBanner.closeWarning = function () {
	document.getElementById('WarningBox').style.display='none';
	document.getElementById('ContentBox').style.display='none';
	CUEmBanner.setCookie('CU_emer_banner', 'Clicked');
}

CUEmBanner.show_OWC_emergency_banner = function () {
	// Check for cookies to see if banner has already appeared and/or is expired.
	var showBanner = true;
	if (CUEmBanner.getCookie('CU_emer_banner') == 'Clicked') {
		showBanner = false;
		//alert(CUEmBanner.getCookie('CU_emer_banner'));
	}




	icon_src = '//embanner.univcomm.cornell.edu/';
	cornell_red = '#b31b1b';
	tan = '#F0EEE4';
	
	if ((CUEmBanner.OWC_message.indexOf('No message') == -1) && (showBanner)) {
		warning_text = 'Emergency Alert Notification';
					
		<!-- // Enclosing div -->
		var grayDiv = document.createElement('div'); 
		grayDiv.style.position = 'fixed';
		grayDiv.style.backgroundColor = 'black';
		grayDiv.style.opacity = '0.4';
		grayDiv.style.zIndex = '1001';
		grayDiv.style.width = '100%'
		grayDiv.style.height = '110%';
		grayDiv.id = 'WarningBox';
		
		<!-- // Enclosing div -->
		var newDiv = document.createElement('div'); 
		newDiv.style.clear = 'both';
		newDiv.style.display = 'block';
		newDiv.style.visibility = 'visible';
		newDiv.style.backgroundColor = cornell_red;
		newDiv.style.padding = '0';
		newDiv.style.textAlign = 'center';
		newDiv.style.marginBottom = '.8em';
		newDiv.style.marginLeft = '-20%';
		newDiv.style.position = 'fixed';
		newDiv.style.top = '0';
		newDiv.style.zIndex = '1001';
		newDiv.style.marginTop = '240px';
		newDiv.style.left = '50%'
		newDiv.style.right = 'auto';
		newDiv.style.width = '50%'
		newDiv.style.maxWidth = '640px';
		newDiv.id = 'ContentBox';

		<!-- // Message-area div -->
		var newDiv2 = document.createElement('div'); 
		newDiv2.style.borderTop = '0';
		newDiv2.style.backgroundColor = 'white';
		newDiv2.style.height = '100%';
		
		<!-- // Message-area div -->
		var newDiv1 = document.createElement('div');
		newDiv1.style.backgroundColor = cornell_red;
		newDiv1.style.padding = '25px 0';
		
		<!-- // Set header -->
		var header = document.createElement('span');
		//header.style.fontFamily = 'serif';
		header.style.fontWeight = '400';
		header.style.fontSize = '28px';
		header.style.color = 'white';
		header.style.verticalAlign = 'top';
		header.appendChild(document.createTextNode(warning_text));
		
		<!-- // Set icon -->
		var caution = document.createElement('img');
		caution.style.width = '46px'
		caution.style.marginTop = '-5px'
		caution.setAttribute('src', icon_src + 'caution.svg');
		caution.id = 'nIcon';

		<!-- // Set the Insignia -->
		var logo = document.createElement('img');
		logo.style.textAlign = 'center';
		logo.style.margin = '10px 0';
		logo.style.color = cornell_red;
		logo.setAttribute('src', icon_src + 'logoRed.svg');		

		<!-- // Set the datetime paragraph -->
		var lastUpdatedPara = document.createElement('p');
		lastUpdatedPara.style.fontFamily = 'serif';
		lastUpdatedPara.style.color = 'black';
		lastUpdatedPara.style.fontSize = '18px';
		lastUpdatedPara.style.fontWeight = 'normal';
		lastUpdatedPara.id = 'Date';
		lastUpdatedPara.style.textAlign = 'center';
		lastUpdatedPara.appendChild(document.createTextNode(CUEmBanner.lastUpdated)); 

		<!-- // Set the message body -->
		var newMessage = document.createElement('p');
		newMessage.appendChild(document.createTextNode(CUEmBanner.OWC_message));
		newMessage.style.fontFamily = 'serif';
		newMessage.style.fontSize = '24px';
		newMessage.style.lineHeight = '1.2em';
		newMessage.style.clear = 'both';
		newMessage.style.textAlign = 'left';
		newMessage.style.paddingLeft = '5%';
		newMessage.style.paddingRight = '5%';

		<!-- // Set the more-info link paragraph -->
		var newLinkPara = document.createElement('p');
		newLinkPara.style.marginBottom = '14px';
		var newLink = document.createElement('a');
		newLink.style.fontSize = '18px';
		newLink.style.color = '#b31b1b';
		newLink.appendChild(document.createTextNode('More Information Here')); 
		newLink.setAttribute('href', 'http://emergency.cornell.edu/');
		newLinkPara.appendChild(newLink);


		
		<!-- // Set the close link paragraph -->
		var newClosePara = document.createElement('p');
		var newCloseLink = document.createElement('a');
		newCloseLink.setAttribute('href', 'JavaScript:CUEmBanner.closeWarning()');
		newCloseLink.style.color = cornell_red;
		newCloseLink.style.fontSize = '15px';
		newCloseLink.appendChild(document.createTextNode('Close')); 
		newClosePara.appendChild(newCloseLink);		
		
		<!-- // Fill the div with the paragraphs -->
		newDiv2.appendChild(newDiv1);
		newDiv1.appendChild(caution);
		newDiv1.appendChild(header);
		
		newDiv2.appendChild(logo);
		newDiv2.appendChild(lastUpdatedPara);
		newDiv2.appendChild(newMessage);
		newDiv2.appendChild(newLinkPara);
		newDiv2.appendChild(newClosePara);

		newDiv.appendChild(newDiv2);
		
		<!-- // Insert the div into the page -->
		document.body.insertBefore(newDiv, document.body.firstChild);
		document.body.insertBefore(grayDiv, document.body.firstChild);
		
		document.querySelector('style').textContent += "#ContentBox p {margin:0 !important; padding-bottom:1em !important}";

		document.querySelector('style').textContent += "@media screen and (max-width:640px) { #ContentBox {left:20% !important; width:100% !important; } #nIcon {display:none}} @media screen and (max-width:780px) {#nIcon {display:none}}";

		document.querySelector('style').textContent += "@media screen and (max-width:1024px) { #ContentBox {position:absolute !important; margin-top:100px !important;}  #ContentBox span {font-size:24px !important} #Date{float:none !important; text-align:center !important; text-align:center !important }}";
		
	}
	
}

window.onload = CUEmBanner.show_OWC_emergency_banner;


