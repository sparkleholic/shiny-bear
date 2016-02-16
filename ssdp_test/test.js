var Browser = require("ssdp-js");
var browser = new Browser();
browser.start(); // by default, ssdp-js would poll ssdp every 5 seconds 
var discovered = {};

function putDiscovered (usn, device) {
    var usnTokens = usn.split(':');
    if (2 > usnTokens.length || -1 === usnTokens.indexOf('uuid')) {
       return; 
    }
    if ((uuid = usnTokens[usnTokens.indexOf('uuid') + 1])) {
        discovered[uuid] = device;
    }
}
 
browser.onDevice(function(device) {
          //device.onError(function(err) { console.error("DNLA device error", err) });
           
            //console.log("DLNA device ", device.headers.USN);
            putDiscovered(device.headers.USN, device);
            //console.log("DLNA device ", device.headers.USN);
              //var MediaRendererClient = require("upnp-mediarenderer-client"); 
              //var client = new MediaRendererClient(device.xml); 
            });


process.on('SIGINT', function() {
        console.log("Caught interrupt signal");
        console.log("Found " + Object.keys(discovered).length);
        for(idx in discovered) {
        console.log("idx:", idx);
            console.log(discovered[idx]);
        }

        process.exit();
});
