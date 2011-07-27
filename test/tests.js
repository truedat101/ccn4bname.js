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
	var name1 = 'ccnx:/test/briggs/test.txt';
	var name2 = 'ccnx:/.../.%2e./...././.....///?...';
	var name3 = 'ccnx:/.../.../..../.....';
	var name4 = '/abc/def/q?foo=bar';
	var name5 = '/abc/def/ghi#rst';
	var name6 = '/abc/def/qr?st=bat#notch';
	var name7 = 'ccnx:/test/%C1.%77%00A%8C%B4B%8D%0A%AC%8E%14%8C%07%88%E4%E2%3Dn/%23%00%19/%C1.%76%00t%DF%F63/%FE%23/%C1.M.K%00%1E%90%EAh%E9%FB%AE%A3%9E%17F%20%CF%AB%A0%29%E9%DE%FAZ%DCA%FBZ%F5%DD%F5A%D2%D7%9F%D1/%FD%04%CB%F5qR%7B/%00';
	
  	ok(ccn4bname.protocolVersion, "did we find the protocolVersion attribute?");
  	ok(ccn4bname.protocolVersion === "0.4.1prealpha", "protocol version should be equals 0.4.1");
  	ok(ccn4bname.schemeIdentifier === "ccnx", "scheme identifier should be: ccnx");
	ok(ccn4bname.validate(name1), 'validate: ' + name1 );
})

test("ccn4bname.parse()",function(){
  ok(ccn4bname.parse, "did we find ccn4bname.parse() ?");
  ok(ccn4bname.parse(), "call parse() with 0 args");
})



