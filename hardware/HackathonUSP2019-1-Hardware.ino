/////////////////////////////////////////////////////////////////////////////////////////
// INCLUDES /////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <MFRC522.h>
#include "src/PubSubClient/PubSubClient.h"

/////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES ////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// CONSTATNS ----------------------------------------------------------------------------
#define TIMEOUT 10000  

#define SS_PIN D4
#define RST_PIN D3

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key; 

// Init array that will store new NUID 
byte nuidPICC[4];

// WIFI ---------------------------------------------------------------------------------
unsigned long wifi_connection_timer;   
char* ssid = <WIFI SSID>;
char* password = <WIFI PASSWORD>;

// MQTT ---------------------------------------------------------------------------------
const char* mqttServer = <YOUR IP GOES HERE>;
const char* espName = "55BIB";

char payload[150];

WiFiClient espClient;
PubSubClient client(espClient);

char last_read[150];
unsigned long last_read_timer;

void setup() { 
    // SERIAL
    Serial.begin(115200); delay(10);

    // SPI
    SPI.begin(); delay(10); // Init SPI bus

    // RFID
    rfid.PCD_Init(); // Init MFRC522 

    for (byte i = 0; i < 6; i++) {
      key.keyByte[i] = 0xFF;
    }

    // WIFI
    connectWiFi();

    // MQTT SERVER
    client.setServer(mqttServer, 1883);
    client.setCallback(mqtt_callback);

}


void loop() {
    // WIFI
    connectWiFi();

    // MQTT
    mqttloop();

    // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
    if ( ! rfid.PICC_IsNewCardPresent())
      return;

    // Verify if the NUID has been readed
    if ( ! rfid.PICC_ReadCardSerial())
      return;

    MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);

    // Check is the PICC of Classic MIFARE type
    if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
        piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
        piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
        Serial.println(F("Your tag is not of type MIFARE Classic."));
        return;
    }

    printHex(rfid.uid.uidByte, rfid.uid.size);

    // Halt PICC
    rfid.PICC_HaltA();

    // Stop encryption on PCD
    rfid.PCD_StopCrypto1();

    if(millis() - last_read_timer < 5000) {
        int i = 0; bool different = false;
        for(; payload[i] != '\0' and last_read[i] != '\0'; i++) {
            if(last_read[i] != payload[i]) {
                Serial.println("OK, NEW READING");
                different = true;
            }
        }
        if(!different) {
            Serial.println("NOPE, SAME READING");
            return;
        }
    }


    send();
    last_read_timer = millis();
}

/////////////////////////////////////////////////////////////////////////////////////////
// GET ID ///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


void printHex(byte *buffer, byte bufferSize) {
    char buf[50];
    int len = (int) bufferSize;
    for (int i = 0; i < len; i++) {
        byte nib1 = (buffer[i] >> 4) & 0x0F;
        byte nib2 = (buffer[i] >> 0) & 0x0F;
        buf[i*2+0] = nib1 < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
        buf[i*2+1] = nib2 < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
    }
    buf[len*2] = '\0';

    snprintf(payload, 150,"%s,%s", espName, buf);
    Serial.println(payload);
}

/////////////////////////////////////////////////////////////////////////////////////////
// WIFI /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

void connectWiFi() {
    if(WiFi.status() != WL_CONNECTED) {
        Serial.print("[WiFi CONNECT] ");

        if(WiFi.getMode() != WIFI_STA) {
            WiFi.mode(WIFI_STA); delay(50);
        }

        WiFi.persistent(false);
        WiFi.begin(ssid, password);
        wifi_connection_timer = millis();
        while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
            ESP.wdtFeed();
            delay(10);
            if(millis() - wifi_connection_timer >= TIMEOUT) break;
        }
        if(WiFi.status() == WL_CONNECTED) {
            Serial.println(" Connected."); 
            return;
        }
        Serial.println(" NOT Connected.");
        return;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// MQTT /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

void mqttloop() {
    if (WiFi.status() == WL_CONNECTED) {
        if (!client.connected()) {
            reconnect();
        }
        client.loop();
    }
}

void reconnect() {
    // Loop until we're reconnected
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection: ");
        if (client.connect(espName, <MQTT USER>, <MQTT_PWD>)){
            Serial.println("MQTT Connected.");
            client.subscribe("hack/in");
        } else {
            Serial.print("Failed: ");
            Serial.print(client.state());
            Serial.println("Retry in .2 seconds");
            yield();
            delay(200);
        }
    }
}

void mqtt_callback(char* topic, byte* c_payload, unsigned int length) {
}

void send() {
    if(WiFi.status() == WL_CONNECTED) {
        Serial.println("\nSENT\n");
        snprintf(last_read, 150, "%s", payload);
        client.publish("hack/out",payload); delay(10);
    }
}