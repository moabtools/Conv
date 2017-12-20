var moab_api_key = '';
var moab_site_id = 0;
var moab_default_city = '';
var moab_default_phone = '';

function MoabGeo(format) {

    var answer;

    function Replace(selector, value) {
        var elements = document.querySelectorAll(selector);
        if (elements.length != 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = value;
            };
        };
    };

	function Format(phone, format) {
		var rPhone = phone.replace("+", "").split("").reverse();
		var mask = format.split("").reverse();
		var n = 0;
		for(var i = 0; i < mask.length; i++) {
			if(mask[i] == "#") {
				if(rPhone[n]) {
					mask[i] = rPhone[n];
					n++;
				}
			}
		}
		return mask.reverse().join("");
	}

    MoabGeo.Do = function () {

		document.addEventListener("DOMContentLoaded", function(event){

	        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	        var xhr = new XHR();
	        xhr.open('GET', 'https://tools.moab.pro/api/Sites/GetGeoInfo?api_key=' + moab_api_key + '&site_id=' + moab_site_id, true);

	        xhr.onload = function () {
	            answer = JSON.parse(xhr.responseText);
	            if (answer) {
	            	Replace("[data-phone]", (format ? Format(answer.phone, format) : answer.phone));
	                Replace("[data-city]", answer.city);
	            };
	        };

	        xhr.onerror = function () {
	            console.log('Ошибка ' + this.status);
	            Replace("[data-phone]", moab_default_phone);
	            Replace("[data-city]", moab_default_city);
	        }

	        xhr.send();

		});

    };
    
};
