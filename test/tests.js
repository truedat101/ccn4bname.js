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

test("load ccn4bname",function(){
  ok(!!window.ccn4bname, "Check if ccn4bname namespace is bound");
})

/** 
 * Reference: ProjectCCNx.git/doc/technical/URI.html
**/
test("ccn4bname CCNx Protocol Check",function(){
	// XXX Just put these into an array and loop over them all to test
	var ccnnames = ['ccnx:/test/stevens/test.txt', 
				'ccnx://test/stevens/test.txt', 
				'ccnx:/.../.%2e./...././.....///?...',
				'ccnx:/.../.../..../.....',
				'/abc/def/q?foo=bar',
				'/abc/def/ghi#rst',
				'/abc/def/qr?st=bat#notch',
				'ccnx:/test/%C1.%77%00A%8C%B4B%8D%0A%AC%8E%14%8C%07%88%E4%E2%3Dn/%23%00%19/%C1.%76%00t%DF%F63/%FE%23/%C1.M.K%00%1E%90%EAh%E9%FB%AE%A3%9E%17F%20%CF%AB%A0%29%E9%DE%FAZ%DCA%FBZ%F5%DD%F5A%D2%D7%9F%D1/%FD%04%CB%F5qR%7B/%00'
				];
  	ok(ccn4bname.protocolVersion, "did we find the protocolVersion attribute?");
  	ok(ccn4bname.protocolVersion === "0.4.1prealpha", "protocol version should be equals 0.4.1");
  	ok(ccn4bname.schemeIdentifier === "ccnx", "scheme identifier should be: ccnx");
	for (var i = 0 ; i < ccnnames.length; i++) {
		ok(ccn4bname.validate(ccnnames[i]), 'validate: ' + ccnnames[i]);
	}
})

test("ccn4bname.parse()",function(){
  ok(ccn4bname.parse, "did we find ccn4bname.parse() ?");
  ok(ccn4bname.parse(), "call parse() with 0 args");
})



