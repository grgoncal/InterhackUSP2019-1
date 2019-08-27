function mqttConnect() {
    cordova.plugins.CordovaMqTTPlugin.connect({
        url:"tcp://YOUR IP", //a public broker used for testing purposes only. Try using a self hosted broker for production.
        port:MQTT PORT,
        clientId:"APP_SCANNER",
        connectionTimeout:3000,
        username: MQTT USERNAME,
        password: MQTT PWD,
        keepAlive:500,
        isBinaryPayload: false, //setting this 'true' will make plugin treat all data as binary and emit ArrayBuffer instead of string on events
        success:function(s){
            console.log("connect success");
            alert('ok');
        },
        error:function(e){
            console.log("connect error");
        },
        onConnectionLost:function (){
            console.log("disconnect");
        }
    })
}

function mqttPublish(id) {
    cordova.plugins.CordovaMqTTPlugin.publish({
        topic:"app/out",
        payload:id.toString(),
        qos:0,
        retain:false,
        success:function(s){
     
        },
        error:function(e){
            
        }
     })
}

function barcodescanner() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            mqttPublish(result.text.substring(0,9));
            // alert("We got a barcode\n" +
            //       "Result: " + result.text + "\n" +
            //       "Format: " + result.format + "\n" +
            //       "Cancelled: " + result.cancelled);
            alert("Item atualizado!");
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if$
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Aproxime o código de barras.", // Android
            resultDisplayDuration: 500, // Android, display scanned text for$
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS$
            orientation : "landscape", // Android only (portrait|landscape),$
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
     );
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        mqttConnect();
        // mqttPublish("XXX");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
