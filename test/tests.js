// Qunit tests for ccn4b-uri
// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("ccn4buri");

test("load ccn4buri",function(){
  ok(!!window.ccn4buri, "Check if ccn4buri namespace is bound");
  ok(window.ccn4buri.protocolVersion, "did we find the protocolVersion attribute?");
  ok(window.ccn4buri.protocolVersion === "0.4.11", "protocol version should be equals 0.4.1");
})

test("ccn4buri.parse()",function(){
  ok(window.ccn4buri.parse, "did we find ccn4buri.parse() ?");
  ok(window.ccn4buri.parse(), "call parse() with 0 args");
})


// these test things from plugins.js
test("Environment is good",function(){
  expect(3);
  ok( !!window.log, "log function present");
  
  var history = log.history && log.history.length || 0;
  log("logging from the test suite.")
  equals( log.history.length - history, 1, "log history keeps track" )
  
  ok( !!window.Modernizr, "Modernizr global is present")
})



