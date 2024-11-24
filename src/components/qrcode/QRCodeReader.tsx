import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QRCodeReaderProps {
  operationType: "retirada" | "entrega";
  setOperationType: (value: "retirada" | "entrega") => void;
  onScan: (result: any) => void;
}

export function QRCodeReader({ operationType, setOperationType, onScan }: QRCodeReaderProps) {
  const [isReading, setIsReading] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    if (isReading) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      html5QrcodeScanner.render((decodedText) => {
        setIsReading(false);
        html5QrcodeScanner.clear();
        try {
          const result = { text: decodedText };
          onScan(result);
          setScannedResult(decodedText);
        } catch (err) {
          console.error("Error processing QR code:", err);
        }
      }, (error) => {
        // Ignore errors during scanning
      });

      return () => {
        html5QrcodeScanner.clear().catch(console.error);
      };
    }
  }, [isReading, onScan]);

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-4">
        <Label className="mb-2 block">Tipo de Operação</Label>
        <Select 
          onValueChange={(value: "retirada" | "entrega") => setOperationType(value)} 
          value={operationType}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Selecione a operação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retirada">Retirada de Chave</SelectItem>
            <SelectItem value="entrega">Entrega de Chave</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isReading ? (
        <div id="qr-reader" className="w-full" />
      ) : (
        <div className="text-center">
          <Button 
            onClick={() => setIsReading(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Ler Novo QR Code
          </Button>
        </div>
      )}
      
      {scannedResult && (
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <Label className="font-semibold">QR Code lido com sucesso!</Label>
        </div>
      )}
    </div>
  );
}