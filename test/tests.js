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
// Qunit tests for ccn4bname
// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("ccn4bname");

var ccnnames = ['ccnx:/test/stevens/test.txt', 
			'ccnx://test/stevens/test.txt', 
			'ccnx:/.../.../..../.....',
			'ccnx:/',
			'ccnx:/.',
			'/abc/def/q',
			'/abc/def/q?foo=bar',
			'/abc/def/ghi#rst',
			'ccnx://foo/tom/bar',
			'ccnx:/foo/tom/bar.mp3',
			'ccnx:/foo/tom/bar',
			'/abc/def/q?foo=bar',
			'/abc/def/qr?st=bat#notch',
			'ccnx:/.../.%2e',
			'ccnx:/.../.%2e./...././.....//',
			'ccnx:/.../.%2e./...././.....///?...', // XXX Is this really valid?
			'ccnx:/test/%C1.%77%00A%8C%B4B%8D%0A%AC%8E%14%8C%07%88%E4%E2%3Dn/%23%00%19/%C1.%76%00t%DF%F63/%FE%23/%C1.M.K%00%1E%90%EAh%E9%FB%AE%A3%9E%17F%20%CF%AB%A0%29%E9%DE%FAZ%DCA%FBZ%F5%DD%F5A%D2%D7%9F%D1/%FD%04%CB%F5qR%7B/%00'
			];
var notccnnames = ['http://www.news.com',
				'ccn:/a/b/c/d',
				'just a string',
				'ccnxf://foo/tom/bar',
				'/^()!;\'',
				''
			]
test("load ccn4bname",function(){
  ok(!!window.ccn4bname, "Check if ccn4bname namespace is bound");
})

/** 
 * Reference: ProjectCCNx.git/doc/technical/URI.html
**/
test("ccn4bname CCNx Protocol Check",function(){
			
  	ok(ccn4bname.protocolVersion, "did we find the protocolVersion attribute?");
  	ok(ccn4bname.protocolVersion === "4001", "protocol version should be equals 4001");
  	ok(ccn4bname.schemeIdentifier === "ccnx", "scheme identifier should be: ccnx");
	for (var i = 0 ; i < ccnnames.length; i++) {
		ok(ccn4bname.validate(ccnnames[i]) === true, 'validate: ' + ccnnames[i]);
	}
	for (var i = 0 ; i < notccnnames.length; i++) {
		ok(!ccn4bname.validate(notccnnames[i]), 'validate false: ' + notccnnames[i]);
	}
})

test("ccn4bname.parse()",function(){
	ok(ccn4bname.parse, "did we find ccn4bname.parse() ?");
	ok(!ccn4bname.parse(), "call parse() with 0 args, should be false");
	var ccn4bnameJSON;
	for (var i = 0 ; i < ccnnames.length; i++) {
		ccn4bnameJSON = ccn4bname.parse(ccnnames[i]);
		ok(ccn4bnameJSON, 'parse: ' + ccnnames[i] + ' should return an object');
		ok(ccn4bnameJSON.protocolVersion == ccn4bname.protocolVersion, 'parse: ' + ccnnames[i] + ' verify protocol version == ' + ccn4bname.protocolVersion);
		ok(ccn4bnameJSON.uristring === ccnnames[i], 'parse: ' + ccnnames[i] + ' verify uristring match');
		var componentIdx = 0;
		var componentVal;
		// XXX This is a goofy way to detect end of components, but do it this way to ensure we don't hit any odd conditions
		while ((componentVal = ccn4bnameJSON['c' + componentIdx]) != null) {
			console.log(componentVal);
			ok(componentVal, 'parse: ' + ccnnames[i] + ' verify component index ' + componentIdx);
			componentIdx = componentIdx + 1;
		}
		ok(ccn4bnameJSON.componentCount == (componentIdx), 'parse: ' + ccnnames[i] + ' verify componentCount');
	}
})
test("ccn4bname encode",function(){
	var ccn4bnameJSON;
	for (var i = 0 ; i < ccnnames.length; i++) {
		ccn4bnameJSON = ccn4bname.parse(ccnnames[i]);
		if (ccn4bnameJSON.encode) {
			ok(ccn4bnameJSON.encode(), 'encode: ' + ccnnames[i] + ' should return an encoded name');
		} else {
			ok(false, 'encode: ' + ccnnames[i] + ' encode method undefined - fix this');
		}
		// XXX We should do better verification.  Add the correctly encoded values in another array 
		// and double check the answers.  For now just log and verify
	}
})

test("ccn4bname decode",function(){
	var ccn4bnameJSON;
	for (var i = 0 ; i < ccnnames.length; i++) {
		ccn4bnameJSON = ccn4bname.parse(ccnnames[i]);
		if (ccn4bnameJSON.decode) {
			ok(ccn4bnameJSON.decode(), 'decode: ' + ccnnames[i] + ' should return a decoded name');
		} else {
			ok(false, 'decode: ' + ccnnames[i] + ' decode method undefined - fix this');
		}
		// XXX We should do better verification.  Add the correctly encoded values in another array 
		// and double check the answers.  For now just log and verify
	}
})
