#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>

// Define the RX and TX pins for Serial 2
#define RXD2 16
#define TXD2 17

#define GPS_BAUD 9600

const char* ssid = "POCO F3";     // Wi-Fi SSID
const char* password = "password"; // Wi-Fi password

// Server URL
const char* serverUrl = "http://192.168.50.88:3000/";

// The TinyGPS++ object
TinyGPSPlus gps;

// Create an instance of the Hardwa reSerial class for Serial 2
HardwareSerial gpsSerial(2);

void setup() {
  // Serial Monitor
  Serial.begin(115200);

  // Start Serial 2 with the defined RX and TX pins and a baud rate of 9600
  gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
  Serial.println("Serial 2 started at 9600 baud rate");

  // Connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Read GPS data and send it to the server
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  if (gps.location.isUpdated()) {
    float latitude = gps.location.lat();
    float longitude = gps.location.lng();
    float speed = gps.speed.kmph();
    float altitude = gps.altitude.meters();

    // Print GPS data to Serial Monitor
    Serial.print("LAT: ");
    Serial.println(latitude, 6);
    Serial.print("LONG: "); 
    Serial.println(longitude, 6);
    Serial.print("SPEED (km/h) = "); 
    Serial.println(speed); 
    Serial.print("ALT (m) = "); 
    Serial.println(altitude);
    Serial.println("");

    // Send data to the server
    sendGpsData(latitude, longitude, speed, altitude);
  }

  delay(5000); // Send data every 5 seconds
}
void sendGpsData(float latitude, float longitude, float speed, float altitude) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String postData = "latitude=" + String(latitude, 6) + 
                      "&longitude=" + String(longitude, 6) +
                      "&speed=" + String(speed, 2) +
                      "&altitude=" + String(altitude, 2);

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpResponseCode = http.POST(postData);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error in sending POST: ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Wi-Fi not connected");
  }
}