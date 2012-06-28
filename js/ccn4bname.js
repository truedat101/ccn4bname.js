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
	encode
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
		protocolVersion : "4001", // See ccnx project ccn.h CCN_API_VERSION XXX Need to bump this to 6002
		schemeIdentifier : "ccnx", // Figure out how to apply this to ccnuriRE
		util : {
			// 
			// This is just a little mess of progressive attempts to get the basic set of names passing
			// I try to learn from perlmonks, but I am not a monk.
			//
			urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
			// borrowed from http://www.perlmonks.org/?node_id=533496
			urlRE2: /^(((ht|f)tp(s?)):\/\/)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$/g,
			// Dump this one, doesn't do it all
			ccnuriRE:  /^((ccnx:\/(\/?))|\/)([-\w\.]+)+(:\d+)?(\/([^\s]((#|\?)(\S|\.)+)?)?)?/g,
			// based on the perlmonks URL matcher
			ccnuriRE2: /^((ccnx:\/(\/?))|\/)([a-zA-Z].)[a-zA-Z0-9\-\.]+(:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$/g,
			ccnuriRE3: /^((ccnx:(\/?))?)(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))+$/g,
			ccnuriRE4: /^((ccnx:(\/?))?)(\/(\/)?($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))+$/g
		},
		
		parse : function(uristring) {
			console.log('parse ' + uristring);
			var parsedJSON = false; // Do we really want to return an empty object, or just return false?
			
			if (uristring && this.validate(uristring)) {
				parsedJSON = { // This is the template
					protocolVersion: this.protocolVersion,
					uristring: uristring, // XXX Consider refactor this name
					decode : function() {
						console.log('decode from ' + uristring + ' to ' + decodeURIComponent(uristring));
						return decodeURIComponent(uristring); // OK, this is kind of dumb, but I guess we don't really store the encoded value, but decode just in case we did
					},
					encode: function() {
						
						// 
						// Did you know JS has a function for this: http://www.w3schools.com/jsref/jsref_encodeURIComponent.asp
						// XXX This is a hack, we should just write our own special purpose encoder ... so for the record
						// That's what we should do.  But I don't have time right now.  Gotta get to the meat.  So do it very 
						// inefficiently.  The fact that CCN URI doesn't encode the component separator or the special characters
						// + . _ - (specifically +) means a general URI encoder will do more than we need.
						var startcomponents = 0;
						if (this.scheme) {
							startcomponents = (this.schemeIdentifier + ':/').length;
						}
						for (var i = startcomponents; i < uristring.length; i++) {
							// 
							// XXX Our stupid approach will be to drop out of the cases we match, and let the 
							// default case handle the encoding.  I should be able to do this with a regex matcher search/replace.
							// I promise to write my own smarter encoder later.
							var ch = uristring[i];
							switch(ch) {
								case '+': break;
								case '.': break;
								case '_': break;
								case '-': break;
								case '/': break;
								default:  uristring[i] = encodeURIComponent(ch);
										  break;
							}
						}
						console.log('encode to ' + uristring);
						return uristring; 
					}
				}
				// Break into path components, per spec we can dump ccnx://
				var startcomponents = 0;
				// Redesign this ... kind of poor
				if (uristring.indexOf(this.schemeIdentifier + ':/') == 0) {
					console.log('starts with ccnx:/')
					parsedJSON['scheme'] =  this.schemeIdentifier;  // Only set if we were given the scheme
					startcomponents = (this.schemeIdentifier + ':/').length;
				} 
				var components = uristring.substr(startcomponents).split('/'); // XXX shouldn't hardcode the component delimiter 
				parsedJSON['componentCount'] = components.length;
				console.log('componentCount = ' + components.length);
				// unless this is a zero length component (which should not happen) then this should have at least size of 1
				for (var i = 0; i < components.length; i ++) {
					if (components[i].length > 0) { // This should throw out empty string components
						parsedJSON['c' + i] = components[i];
					}
				}
				console.log(parsedJSON);
			}
			return parsedJSON;
		},
	
		validate : function(uristring) {
			var isValid = (uristring.match(ccn4bname.util.ccnuriRE4) == null) ? false : true;
			console.log('validate ' + uristring + ' = ' + isValid );
			return isValid;
		}
	};
	
	function init() { // Map your local name into the browser namespace
		window.ccn4bname = ccn4bname; // XXX Will need to catch this for non-browser implementations
	}
	
	init();
})();