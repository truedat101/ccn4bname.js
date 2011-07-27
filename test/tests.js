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
  	ok(ccn4bname.protocolVersion, "did we find the protocolVersion attribute?");
  	ok(ccn4bname.protocolVersion === "0.4.1prealpha", "protocol version should be equals 0.4.1");
  	ok(ccn4bname.schemeIdentifier === "ccnx", "scheme identifier should be: ccnx");
	ok(ccn4bname.validate('ccnx:/test/briggs/test.txt'), "vaildate URI: ccnx:/test/goron/test.txt");
})

test("ccn4bname.parse()",function(){
  ok(ccn4bname.parse, "did we find ccn4bname.parse() ?");
  ok(ccn4bname.parse(), "call parse() with 0 args");
})



