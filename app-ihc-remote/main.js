
document.addEventListener('DOMContentLoaded', () => {
   // obtenerHistorial();
    obtenerHistorialarray();
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
  /*
  const obtenerHistorial = () => {
    fetch('https://661801849a41b1b3dfbbf770.mockapi.io/historial')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error al obtener el historial de acciones desde la API.');
        }
        return response.json();
    })
    .then(data => {
        // Aquí puedes hacer algo con los datos obtenidos, como mostrarlos en la página
        console.log('Historial de acciones obtenido:', data);
    })
    .catch(error => console.error('Error al obtener el historial de acciones:', error));
};
*/


const obtenerHistorialarray = () => {
    fetch('https://661801849a41b1b3dfbbf770.mockapi.io/historial')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error al obtener el historial de acciones desde la API.');
        }
        return response.json();
    })
    .then(data => {
        // Imprimir los datos en la consola para verificar su formato
        console.log('Historial de acciones obtenido:');
        
        // Aquí puedes hacer algo con los datos, como mostrarlos en la página
        // Por ejemplo, puedes iterar sobre el array de historial y mostrar cada elemento
        data.forEach(item => {
            console.log('Comando:', item.comando);
            console.log('Hora:', item.hora);
        });
    })
    .catch(error => console.error('Error al obtener el historial de acciones:', error));
};

//quitar el formato json, convertirlo a arreglo 