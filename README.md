# whatwg-url

whatwg-url is a full implementation of the [WHATWG URL](https://url.spec.whatwg.org/) specification.

## Current State

whatwg-url is currently up to date with the URL spec up to commit [e67f9dd](https://github.com/whatwg/url/tree/e67f9dd7a1106d867862d3b5d9f044388f84909e).

## Usage

	url = new URL("hyperty-runtime-esn://domain.com/12345?a=1&b=2&c=3", "");
	console.log(url.protocol) //"hyperty-runtime-esn:",
	console.log(url.origin) // "hyperty-runtime-esn://domain.com",
	console.log(url.hostname) // "domain.com",
	console.log(url.host) //"domain.com",
	console.log(url.port) // "",
	console.log(url.path) // undefined,
	console.log(url.search) // "?a=1&b=2&c=3", 
	console.log(url.hash) //"", 
	console.log(url.href) // "hyperty-runtime-esn://domain.com/12345?a=1&b=2&c=3"
