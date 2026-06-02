const {chromium} = require ('playwright');

(async() =>  {
    const browser = await chromium.launch({headless:false});
    
    //contexto 1 google
    const googleContext = await browser.newContext();
    const googlePage = await googleContext.newPage();
    await googlePage.goto('https://www.google.com/');
    await googlePage.waitForTimeout(5000);
    console.log("Conetexto 1")

    //Contesxto 2 wikipedia
    const wikipediaContext = await browser.newContext();
    const wikipediaPage = await wikipediaContext.newPage();
    await wikipediaPage.goto('https://www.wikipedia.org/');
    await wikipediaPage.waitForTimeout(5000);
    console.log("Conetexto 2")
    await browser.close();
    console.log("Navegador cerrado");

})();
