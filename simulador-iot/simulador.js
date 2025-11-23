import fetch from "node-fetch";

const URL = "http://localhost:8080/api/leitura/enviar";

const DEVICE_TOKEN = "949c83d8-9e30-453d-bc2c-018f2dcb9d13";  


const SENSORES = [
  { id: 15, nome: "Sensor Temperatura" },
  { id: 16, nome: "Sensor Umidade" },
  { id: 17, nome: "Sensor Luminosidade" },
  { id: 18, nome: "Sensor Pressão" },
  { id: 19, nome: "Sensor Movimento" }
];


function valorAleatorio() {
  return Number((Math.random() * 50).toFixed(2));
}

async function enviarLeitura(sensor) {
  const body = {
    dispositivoSensorId: sensor.id,
    valor: valorAleatorio()
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-DEVICE-TOKEN": DEVICE_TOKEN  
      },
      body: JSON.stringify(body)
    });

    console.log(
      `[${sensor.nome}] Enviado ->`,
      body,
      "| Status:", response.status
    );
  } catch (error) {
    console.error("Erro ao enviar leitura:", error);
  }
}

function iniciar() {
  console.log("Iniciando simulação...");

  SENSORES.forEach((sensor) => {
    setInterval(() => enviarLeitura(sensor), 10_000);
  });
}

iniciar();
