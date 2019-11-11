import { Request, Response } from "express";
import colors from "colors";
import { KeysController } from "../../controllers/models/matilde/keys.controller";
import { IKeys } from "../../interfaces/Database/IKeys";
import { readFileSync, writeFile } from "fs";

export async function CodePDFGenerator(req: Request, res: Response) {
    const keyctl = new KeysController();
    const keys = <IKeys[]>await keyctl.GetKeys();
    const label64 = readFileSync('public/images/matilde/labelv2_base64.txt', 'utf-8');
    const image = '/images/matilde/label.png';
    const y = 49.13;  // 1.3cm
    const x = 170.07; // 4.5cm
    const spacebtw = 20;
    let html = `
    <html>
        <head></head>
        <body>
            <div style="width:100%;display: flex;flex-direction: row;flex-wrap: wrap;">
        `;
    // Aqui obtendremos el target a mostrar
    keys[1].llaves.map((key: string, i: number) => {
        let keyElement = `
        <div style="position:relative;width:25%;">
        <img style="width:${x}px;height:${y}px;margin-right:${spacebtw}px;margin-bottom:3.5px" src="${label64}" />
        <small style="color:white;font-size:1rem;position:absolute;left:70px;bottom:20px;">${key}</small>
        </div>`;
        html += keyElement;
    });
    html += `</div>
        </body>
    </html`;

    // console.log(html);


    res.pdfFromHTML({
        filename: `Test.pdf`,
        htmlContent: html,
        options: {
            "border": {
                "top": "0cm",            // default is 0, units: mm, cm, in, px
                "right": "0cm",
                "bottom": "0cm",
                "left": "0cm"
            },
            "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
            "orientation": "portrait",
        }
    	/* Más documentación en https://www.npmjs.com/package/html-pdf
        * y en https://www.npmjs.com/package/express-pdf
    	**/
    });
}