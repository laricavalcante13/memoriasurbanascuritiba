const scanner = new Instascan.Scanner({
  video: document.getElementById('webcam'),
  scanPeriod: 5,
  mirror: false
});

scanner.addListener('scan', content => {
  console.log('QR LIDO:', content);
  alert('QR LIDO: ' + content);
});

Instascan.Camera.getCameras()
  .then(cameras => {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error('Nenhuma câmera encontrada.');
      alert('Nenhuma câmera encontrada.');
    }
  })
  .catch(e => {
    console.error(e);
    alert('Erro ao acessar câmera: ' + e);
  });
