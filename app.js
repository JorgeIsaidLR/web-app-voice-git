document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const resultDiv = document.getElementById('result');
  
    // Comprobar si el navegador admite el reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
  
      // Configurar el idioma
      recognition.lang = 'es-ES';
  
      // Definir lo que sucede cuando se reconoce un resultado
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resultDiv.innerText = `Orden reconocida: ${transcript}`;
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
  