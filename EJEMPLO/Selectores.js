const {chromium} = require ('playwright');
(async() =>  {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');

// SLECIONAR CAMPO DE BUSQUEDA Y ENVIAR UN TEXTO
    await page.fill('#APjFqb','Documentacion de Playwright');// PO ID
    await page.press('#APjFqb','Enter');
    await page.waitForSelector('h3'); // Esperar a que aparezca el resultado de busqueda
    await page.locator('h3').first().click();
    await page.click('text=Instalación'); // Seleccionar un enlace por su texto
    

    //await browser.close();
   
  // console.log("Navegador cerrado");
})();

