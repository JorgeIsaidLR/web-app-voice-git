
document.addEventListener('DOMContentLoaded', () => {
    const startBtn     = document.getElementById('start-btn');
    const resultDiv    = document.getElementById('result');
    const controlTexto = document.getElementById('controlTexto');

    // Comprobar si el navegador admite el reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
  
      // Configurar el idioma
      recognition.lang = 'es-ES';
  
      // Definir lo que sucede cuando se reconoce un resultado
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        
        const acciones = {
        'abrir pestaña': () => {
            window.open('https://www.example.com', '_blank');
            document.getElementById('barraAbrirPestana').checked = true;
        },
        'ir a página': () => {
            window.location.href = 'https://www.example.com';
            document.getElementById('barraIrAPagina').checked = true;
        },
        'modificar tamaño ventana': () => {
            window.resizeTo(800, 600);
            document.getElementById('barraModificarTamanoVentana').checked = true;
        },
        'cerrar pestaña': () => {
            window.close();
            document.getElementById('barraCerrarPestana').checked = true;
        },
        'cerrar navegador': () => {
            window.open('', '_self', '');
            window.close();
            document.getElementById('barraCerrarNavegador').checked = true;
        }
      };

      resultDiv.innerText = `Orden reconocida: ${transcript}`;

      // Iterar sobre las palabras clave y verificar si se encuentran en el texto reconocido
      for (let palabraClave in acciones) {
          if (transcript.includes(palabraClave)) {
              // Si se encuentra la palabra clave, ejecutar la función asociada
              acciones[palabraClave]();
              guardarAccion(palabraClave);
              console.log(`Se ejecutó la función asociada a "${palabraClave}".`);
          }
      } 
   
        //console.log(event);

      };
  
      // Definir lo que sucede cuando se produce un error
      recognition.onerror = (event) => {
        resultDiv.innerText = 'Error de reconocimiento de voz. Inténtalo de nuevo.';
      };
  
      // Iniciar el reconocimiento de voz cuando se hace clic en el botón
      startBtn.addEventListener('click', () => {
        recognition.start();
        resultDiv.innerText = 'Escuchando... Di tu orden.';
      });
    } else {
      // Mostrar un mensaje de error si el navegador no admite el reconocimiento de voz
      resultDiv.innerText = 'Lo siento, tu navegador no admite el reconocimiento de voz.';
      startBtn.disabled = true;
    }
  });
  

  const guardarAccion = (accion) => {
    const fechaHoraLocal = new Date();

// Extraer la hora, minutos y segundos

const hora = fechaHoraLocal.getHours();
const minutos = fechaHoraLocal.getMinutes();
const segundos = fechaHoraLocal.getSeconds();

// Formatear la hora local como una cadena
const horaLocalString = `${hora}:${minutos}:${segundos}`;


    fetch('https://661801849a41b1b3dfbbf770.mockapi.io/historial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comando: accion, hora: horaLocalString
        })
    })
    .then(response => response.json())
    .then(data => console.log('Acción guardada en la API:', data))
    .catch(error => console.error('Error al guardar la acción en la API:', error));
};

  // set interval : para quitar el boton: parametro nombre de funcion, tiempo que se va a repretir, 
  //que pasaria si se ejecuta cada 2 segundo  y lo que hablo uspera los dos segundos, ya me pase de tiempo, 