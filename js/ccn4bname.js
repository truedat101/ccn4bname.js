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
		protocolVersion : "4001", // See ccnx project ccn.h CCN_API_VERSION
		schemeIdentifier : "ccnx", // Figure out how to apply this to ccnuriRE
		util : {
			urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
			urlRE3: /^(((ht|f)tp(s?)):\/\/)?(www\.|[a-zA-Z]\.)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$/g,
			ccnuriRE: /(ccnx:\/)?(\/)?([-\w\.]+)+(:\d+)?(\/([^\s]((#|\?)(\S|\.)+)?)?)?/g
		},
		
		parse : function(uristring) {
			console.log('parse');
			return true;
		},
	
		validate : function(uristring) {
			console.log('validate ' + uristring + ' = ' + (uristring.match(ccn4bname.util.ccnuriRE) == null) ? false : true);
			// return index < 0 ? "" : path.substring(index);
			return (uristring.match(ccn4bname.util.ccnuriRE) == null) ? false : true;
		},
		 
		decode : function(ccn4bnameObj) {
			console.log('decode');
		},
		
		encode: function(ccn4bnameObj) {
			console.log('encode');
		}
	};
	
	
	function init() { // Map your local name into the browser namespace
		window.ccn4bname = ccn4bname; // XXX Will need to catch this for non-browser implementations
	}
	
	init();
})();