const { expect } = require('@playwright/test');

async function crear_CxP(page, data) {

    console.log('Valida creación de CxP');

    await page.locator(':nth-child(2) > #cxc_cxp_tabCXP').click();

    await page.locator('#btn_bo_subheader_agregar')
        .waitFor({ state: 'visible' });

    await page.locator('#btn_bo_subheader_agregar')
        .click();

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_rutClienteCuentaCobrarPagar')
        .fill(data.rut_cliente);

    await page.locator('.container').click();

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_rutDeudorCuentaCobrarPagar')
        .fill(data.rut_deudor);

    await page.locator('.container').click();

    await page.locator('#slc_bo_ModalAgregar_CXC_CXP_tipoCuentaCobrarPagar > .css-yk16xz-control > .css-1hwfws3')
        .fill(data.tipo_cuenta_cxp);

    await page.keyboard.press('Enter');

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_nOperacionCuentaCobrarPagar')
        .fill(data.nro_ope);

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_nDocumentoCuentaCobrarPagar')
        .fill(data.nro_doc);

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_glosaCuentaCobrarPagar')
        .fill(data.glosa);

    await page.locator('#itp_bo_ModalAgregar_CXC_CXP_montoCuentaCobrarPagar')
        .fill(data.monto);

    await page.locator('#slc_bo_ModalAgregar_CXC_CXP_tipoProductoCuentaCobrarPagar > .css-yk16xz-control > .css-1hwfws3 > .css-1uccc91-singleValue')
        .fill('FACTORING');

    await page.keyboard.press('Enter');

    await page.locator('#slc_bo_ModalAgregar_CXC_CXP_tipoDocumentoCuentaCobrarPagar > .css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer')
        .fill('FACTURA');

    await page.keyboard.press('Enter');

    if (data.moneda === 'USD' || data.moneda === 'PEN') {

        await page.locator('#slc_bo_ModalAgregar_CXC_CXP_tipoMoneda > .css-yk16xz-control > .css-1hwfws3')
            .fill(data.moneda);

        await page.keyboard.press('Enter');
    }

    // Crear CxP
    await page.locator('#kt_modal_agregarCuentaCobrarPagar > .modal-content > .modal-footer > .btn-primary')
        .click();

    // Validación
    await expect(page.locator('.swal-title'))
        .toContainText(
            'Se ha creado con éxito la Cuenta por Pagar',
            { timeout: 10000 }
        );
}

module.exports = { crear_CxP };