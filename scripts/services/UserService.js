'use strict';

angular.module('Control')
    .factory('UserResource',function($resource){
        return $resource("http://control.app/usersApi/:id",{id: "@id"},
                         {update:
                            {method: "PUT"}
                });
    })
    .factory('UserResourceSec',function($resource){
        return $resource("http://control.app/users/indexSec/:id",{id: "@id"});
    })

    .factory('Password', function() {

		function getStrength(pass) {
	    var score = 0;
	    if (!pass)
	        return score;

	    // award every unique letter until 5 repetitions
	    var letters = new Object();
	    for (var i=0; i<pass.length; i++) {
	        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
	        score += 5.0 / letters[pass[i]];
	    }

	    // bonus points for mixing it up
	    var variations = {
	        digits: /\d/.test(pass),
	        lower: /[a-z]/.test(pass),
	        upper: /[A-Z]/.test(pass),
	        nonWords: /\W/.test(pass),
	    }

	    var variationCount = 0;
	    for (var check in variations) {
	        variationCount += (variations[check] == true) ? 1 : 0;
	    }
	    score += (variationCount - 1) * 10;

	    if(score > 100) score = 100;

	    return parseInt(score);
		}


		return {
			getStrength: function(pass) {
				return getStrength(pass);
			}
		}

	});
