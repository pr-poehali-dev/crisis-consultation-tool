import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, 'https://ruslan-consult.ru', {
        width: 600,
        margin: 3,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'ruslan-qr-vizitka.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">QR-код для визитки</h1>
      </div>

      <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />

      <div className="text-center text-gray-500 text-sm">
        Ведёт на: ruslan-consult.ru
      </div>

      <button
        onClick={handleDownload}
        className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Скачать PNG для дизайнера
      </button>

      <p className="text-gray-400 text-xs text-center max-w-xs">
        Скачайте файл и отправьте дизайнеру. Размер 600×600 пикселей, подходит для печати на визитке.
      </p>
    </div>
  );
}