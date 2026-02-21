import { useState } from "react";
import { saveSvgAsPng } from "save-svg-as-png";
import QRCode from "react-qr-code";

export function Qrgenerator() {
    const [input, setInput] = useState('')
    const [text, setText] = useState('https://reactjs.org')

    return (
        <div>
            <h1 className="text-6xl text-center m-3">Generador de códigos QR</h1>
            <div className="text-center m-5">
                <input className="rounded-md border-2 w-sm m-5" placeholder='Aquí pon la URL a al que quieres que te lleve el QR' type="text" value={input} onChange={
                    (e) => setInput(e.target.value)
                }/>
                <button onClick = {() => {
                    if (input.includes("http://") || input.includes("https://")) {
                        setText(input)
                    } if (input == "") {
                        alert("Por favor, introduce una URL válida")
                    } else {
                        setText("https://" + input)
                    }
                }} className="rounded-md border-2 p-2 m-5 hover:bg-gray-200">
                    Generarar QR
                </button>
            </div>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 400, width: "100%" }}>
            <QRCode
                id="codigoQR"
                size={400}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={text}
                viewBox={`0 0 400 400`} // importante que el viewBox coincida con size
            />
            </div>
            <div className="text-center m-5">
                <button
                    onClick={() => {
                        const svg = document.getElementById("codigoQR");
                        const serializer = new XMLSerializer();
                        const svgString = serializer.serializeToString(svg);
                        const blob = new Blob([svgString], { type: "image/svg+xml" });
                        const url = URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "qr_" + text + ".svg";
                        a.click();

                        URL.revokeObjectURL(url);
                }}
                className="rounded-md border-2 p-2 m-5 hover:bg-gray-200"
                >
                    Descargar en SVG ( no pierde calidad al redimensionar )
                </button>
                <button onClick={() => saveSvgAsPng(document.getElementById("codigoQR"), "qr_" + text + ".png", {
                    scale: 4,
                    backgroundColor: "white"
                })}
                className="rounded-md border-2 p-2 m-5 hover:bg-gray-200">
                    Descargar en PNG
                </button>
            </div>
            <div className="text-center m-2.5">
                <p>Si quieres saber más sobre el proyecto ve al <a href="">repositorio de github</a></p>
            </div>
        </div>
    )
}