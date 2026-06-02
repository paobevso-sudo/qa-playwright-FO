class AproComit {
    constructor(page) {
        this.page = page;
    }

    async aprobar(datos, numOp, comentApr) {

        // Navegación al detalle de la operación
        await this.page.goto(
            `${datos.url}Factoring/Cursatura/Detalle/${numOp}#/`,
            {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }
        );

        // Esperar que aparezca toolbar
        await this.page.waitForSelector('#stickyToolbar');

        // Click en doble check
        await this.page.click(
            '#stickyToolbar > li:nth-child(5) > a > img'
        );
        console.log('Doble check realizado');

        // Esperar que aparezca modal y cerrar
        await this.page.getByRole('button', { name: 'Cerrar' }).waitFor();
        await this.page.getByRole('button', { name: 'Cerrar' }).click();

        // Agregar comentario
        await this.page.waitForSelector('textarea.mentions__input', { state: 'visible' });
        await this.page.locator('textarea.mentions__input').click();
        await this.page.keyboard.type(comentApr);
        console.log('Comentario agregado');

        // Click en botón Grabar
        await this.page.getByRole('button', { name: 'Grabar' }).click();
        console.log('Comentario agregado');

        // Click en OK
        await this.page.getByRole('button', { name: 'OK' }).click();
        console.log('Aprobación en comité realizada');
    }
}

module.exports = AproComit;