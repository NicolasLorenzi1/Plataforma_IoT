#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "Nicolas";
const char* password = "12345678";

// URL do túnel (HTTPS)
String serverName = "https://iot.tblo.com.br/api/leitura/enviar";

// Token do dispositivo
String deviceToken = "933b750d-c435-45f8-8c9d-e0f9ac6ca68c";

long dispositivoSensorId = 1;

WiFiClientSecure client;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Conectando ao Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Conectado ao Wi-Fi!");

  // ⚠️ Desativa verificação SSL (somente para testes)
  client.setInsecure();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient https;
    https.begin(client, serverName);
    https.addHeader("Content-Type", "application/json");
    https.addHeader("X-DEVICE-TOKEN", deviceToken);

    float valorSensor = random(200, 300) / 10.0;
    String jsonData = "{\"dispositivoSensorId\": " + String(dispositivoSensorId) +
                      ", \"valor\": " + String(valorSensor) + "}";

    Serial.println("📤 Enviando leitura via HTTPS: " + jsonData);

    int httpResponseCode = https.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.print("✅ Código de resposta: ");
      Serial.println(httpResponseCode);
      Serial.println("📥 Resposta: " + https.getString());
    } else {
      Serial.print("❌ Erro HTTPS: ");
      Serial.println(httpResponseCode);
    }

    https.end();
  }

  delay(5000);
}
