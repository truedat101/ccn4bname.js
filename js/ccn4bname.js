/**
#
#Copyright (c) 2011 Razortooth Communications, LLC. All rights reserved.
#
#Redistribution and use in source and binary forms, with or without modification,
#are permitted provided that the following conditions are met:
#
#    * Redistributions of source code must retain the above copyright notice,
#      this list of conditions and the following disclaimer.
#
#    * Redistributions in binary form must reproduce the above copyright notice,
#      this list of conditions and the following disclaimer in the documentation
#      and/or other materials provided with the distribution.
#
#    * Neither the name of Razortooth Communications, LLC, nor the names of its
#      contributors may be used to endorse or promote products derived from this
#      software without specific prior written permission.
#
#THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
#ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
#WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
#DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
#ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
#(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
#LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
#ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
#(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
#SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

/**
 	CCN URI utility class

	parse() - parse a CCN URI string into a CCN URI represented as a JSON object
	validate() - validate a CCN URI string
	toString() - convert a CCN URI JSON object into a CCN URI string
	
**/

/* This design pattern for JS library design is a best practice pushed by the experts:
	JResig - http://ejohn.org/blog/building-a-javascript-library/
	Joe Hewitt - https://raw.github.com/joehewitt/scrollability/master/scrollability.js
	
	Big ideas:
	* encapsulate your namespace in a clean manner
	* reserve the name given to your library AT LEAST in the local scope
	* bind namespace to document
	* init upon instantiation
**/

(function() {
	//
	// Put local scoped variables here
	//
	// var foo = 0;
	
	// 
	// Define as JSON object
	//
	var ccn4bname = {
		util : {
			urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
			ccnuriRE: /(ccnx:\/)?\/?([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g
		},
		protocolVersion : "0.4.1prealpha",
		schemeIdentifier : "ccnx",
		parse : function(uristring) {
			console.log('parse');
			return true;
		},
	
		validate : function(uristring) {
			console.log('validate');
			return ccn4bname.util.ccnuriRE.test(uristring);
		},
		 
		decode : function(ccn4bnameObj) {
			console.log('decode');
		},
		
		encode: function(ccn4bnameObj) {
			console.log('encode');
		}
	};
	
	
	function init() {
		window.ccn4bname = ccn4bname;
	}
	
	init();
})();