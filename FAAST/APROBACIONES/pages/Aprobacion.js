class Aprobacion{
    constructor(page) {
        this.page = page;
    }

    async aprobar(datos, numOp, comentApr) {

     // Navegar al detalle operación
        await this.page.goto(
       `${datos.url}Factoring/Cursatura/Detalle/${numOp}#/`);
        console.log('Navegación a detalle operación realizada');
        // Esperar botón engranaje
        await this.page.locator('a.btn.btn-icon').first().waitFor();
        // Click engranaje
        await this.page.locator('a.btn.btn-icon').first().click();

        console.log('Clic en tuerca realizado');
        //Aprobar
        await this.page.getByRole('button', {    name: 'Aprobar'}).waitFor();
        await this.page.getByRole('button', {   name: 'Aprobar'}).click();
        console.log('Clic en aprobar realizado');

        // Click en cerrar
        await this.page.getByRole('button', { name: 'Cerrar' }).click();

        // Esperar popup OK
        await this.page.getByRole('button', {name: 'OK' }).waitFor();

        // Click OK
        await this.page.getByRole('button', {name: 'OK'}).click();
        console.log('Clic en primer OK realizado');
        // Esperar segundo popup OK
        await this.page.getByRole('button', { name: 'OK' }).waitFor();

     
        // Agregar comentario
        await this.page.fill( '#txtComentarioOperacion',comentApr);

        // Click Grabar
        await this.page.getByRole('button', {   name: 'Grabar' }).click();
         console.log('Comentario agregado');

        // Espera opcional
        await this.page.waitForTimeout(3000);

    } 
}

module.exports = Aprobacion;