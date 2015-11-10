"use strict";
/*global describe */
/*global it */

const assert = require("assert");
const fs = require("fs");
const URL = require("../lib/url").createURLConstructor();
//const urlTestParser = require("./web-platform-tests/urltestparser");

const testCases = fs.readFileSync(__dirname + "/additional-tests.txt", { encoding: "utf-8" });
//const urlTests = urlTestParser(testCases);

function testOrigin(expected) {
    return function () {
	let url;

	try {
	    url = new URL(expected.input, expected.base);
	    assert.equal(url.origin, expected.origin, "\n\tGiven: " + url.origin  +   " \n\tExpected: "+expected.origin);
	} catch (e) {
	    if (e instanceof TypeError && expected.error === TypeError) {
	    } else {
		throw e;
	    }
	}

    };
}


function testURL(expected) {
  return function () {
      let url;
      try {
	  url = new URL(expected.input, expected.base);
	  console.warn("Protocol: " + url.protocol)
	  console.warn("Origin: " + url.origin)
	  console.warn("Hostname: " + url.hostname)
	  console.warn("Host: " + url.host)
	  console.warn("Port: " + url.port)
	  console.warn("Path: " + url.path)
	  console.warn("Search: " + url.search)
	  console.warn("Hash: " + url.hash)
	  console.warn("Href: " + url.href)	  

      } catch (e) {
	  if (e instanceof TypeError && expected.protocol === ":") {
	      console.error("TypeError...");
              return;
	  }
	  throw e;
      }

      console.warn("parsing...");
      if (expected.protocol === ":" && url.protocol !== ":") {
	  assert.fail(url.href, "", "Expected URL to fail parsing, got " + url.href);
      }
  };
}

describe("Tests to check 'origin':", function () {
    let urls = []
    urls.push({input:"blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f", origin:"https://whatwg.org:443"})
    
    // special scheme without port
    urls.push({input:"wss://rethink.org/", origin:"wss://rethink.org"})

    // special scheme with default port
    urls.push({input:"wss://rethink.org:443/", origin:"wss://rethink.org"})

    // special scheme without port
    urls.push({input:"ws://rethink.org/", origin:"ws://rethink.org"})

    // special scheme with different port
    urls.push({input:"wss://rethink.org:2345", origin:"wss://rethink.org:2345"})

    // special scheme with different port
    urls.push({input:"ws://rethink.org:1000", origin:"ws://rethink.org:1000"})

    // special scheme with same port as default one
    urls.push({input:"wss://rethink.org:443", origin:"wss://rethink.org"})

    urls.push({input:"newschema://rethink.org", origin:"newschema://rethink.org"})

    urls.push({input:"wss://rethink.org#section", origin:"wss://rethink.org"})

    urls.push({input:"wss://rethink.org/section1/section2", origin:"wss://rethink.org"})

    urls.push({input:"wss://something", origin:"wss://something"})
    urls.push({input:"wss://a.b.c.d.e", origin:"wss://a.b.c.d.e"})

    // Invalid URLs
    urls.push({input:"wss://", error:TypeError})
    urls.push({input:"://rethink.org", error:TypeError})
    urls.push({input:"<some garbage>", error:TypeError})

    // Valid URLs with IPv4
    urls.push({input:"wss://127.0.0.1", origin:"wss://127.0.0.1"})

    // Invalid URLs with IPs v4
    urls.push({input:"wss://127.0.0.300", error:TypeError})
    urls.push({input:"wss://127.0.0", error:TypeError})
    urls.push({input:"wss://127.0.0.1.2", error:TypeError})
    urls.push({input:"wss://ABCD:EF01:2345:6789:ABCD:EF01:2345:6789", error:TypeError})


    for (let i=0; i<urls.length; i++) {
	it(urls[i].input+": ", testOrigin(urls[i]))
    }
    
}
)

// describe("Hosts", function () {
//     let url = {}
//     url.input="newprotocol://www.google.es";
//     url.expected={}
//     url.expected.protocol="newprotocol:"
//     it("Testing: ", testURL(url))

//     url.input="newprotocol://www.google.es#section";
//     url.expected={}
//     url.expected.protocol="newprotocol:"
//     it("Testing: ", testURL(url))

//     url.input="newprotocol://google.es#section";
//     url.expected={}
//     url.expected.protocol="newprotocol:"
//     it("Testing: ", testURL(url))

//     url.input="newprotocol://google#section";
//     url.expected={}
//     url.expected.protocol="newprotocol:"
//     it("Testing: ", testURL(url))
    
// });
