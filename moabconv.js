// version: 2

function MoabConv() {

    var answer;

    function Replace(selector, value) {
        var elements = document.querySelectorAll(selector);
        if (elements.length != 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = value;
            };
        };
    };

    MoabConv.Do = function () {

		document.addEventListener("DOMContentLoaded", function(event){

	        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	        var xhr = new XHR();
	        xhr.open('GET', 'https://tools.moab.pro/api/Sites/Conv?api_key=' + moab_api_key + '&site_id=' + moab_site_id, true);
	        
	        xhr.onload = function () {
	            answer = JSON.parse(xhr.responseText);
	            if (answer) {
	            	
	            	if(answer.use_mobile_button) {
	            	
						var head = document.head || document.getElementsByTagName('head')[0],
						    style = document.createElement('style');

						style.type = 'text/css';
						if (style.styleSheet){
							style.styleSheet.cssText = answer.css;
						} else {
							style.appendChild(document.createTextNode(answer.css));
						}

						head.appendChild(style);
		                
		                var anchor = document.querySelectorAll("[data-mobile-button]")[0];
	        			if (anchor) {
	                		anchor.innerHTML = answer.html;
	                		anchor.setAttribute("href", "tel:" + answer.mobile_button.phone);
	        			};
	                
	            	}
	            	
	            	if(answer.use_geo) {
	            		
	            		var bundle = answer.bundles.filter(function(el) { return el.city_id == answer.geo_info.city.id && el.region_id == answer.geo_info.region.id && el.country_id == answer.geo_info.country.id });
	            		
	            		if(bundle[0]) {
		            		Replace("[data-phone]", bundle[0].phone_formatted);
		                	Replace("[data-city]", bundle[0].city);
	            		} else {
				            Replace("[data-city]", moab_default_city);
				            Replace("[data-phone]", moab_default_phone);
	            		}
	            	}
	            	
	            	if(answer.errors) {
				        console.error('Ошибка tools.moab.pro: ' + answer.errors[0] + '. Подставлены значения по умолчанию.');
			            Replace("[data-city]", moab_default_city);
			            Replace("[data-phone]", moab_default_phone);
	            	}
	            	
	            };
	        };

	        xhr.onerror = function () {
		        console.error('Ошибка соединения с tools.moab.pro. Подставлены значения по умолчанию.');
	            Replace("[data-city]", moab_default_city);
	            Replace("[data-phone]", moab_default_phone);
	    	};

	        xhr.send();

		});

    };
    
};

new MoabConv();
MoabConv.Do();
