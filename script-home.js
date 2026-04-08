document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Criamos a instância, mas SEM o .render() automático ainda
    const html5QrCode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        html5QrCode.stop().then(() => {
            window.location.href = decodedText;
        });
    };

    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
    };

    // 2. O SEGREDO: Pedimos para o navegador listar as câmeras e escolhemos a traseira
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length > 0) {
            // No celular, a câmera traseira geralmente é a última da lista ou contém "back" no nome
            let backCamera = cameras.find(cam => cam.label.toLowerCase().includes('back'));
            
            // Se não achar pelo nome, pega a última da lista (estratégia comum para Android/iOS)
            const cameraId = backCamera ? backCamera.id : cameras[cameras.length - 1].id;

            // 3. Inicia com a câmera específica
            html5QrCode.start(
                cameraId, 
                config, 
                qrCodeSuccessCallback
            );
        } else {
            console.error("Nenhuma câmera encontrada.");
        }
    }).catch(err => {
        console.error("Erro ao acessar câmeras:", err);
    });
});