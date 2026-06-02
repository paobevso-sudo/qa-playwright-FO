class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async login(url, usuario, password) {

        // Abrir login
        await this.page.goto(url, {
            waitUntil: 'commit',
            timeout: 30000
        });

        // Usuario
        await this.page.fill('#usuario', usuario);

        // Contraseña
        await this.page.getByPlaceholder('Contraseña').fill(password);

        // Click ingresar
        await this.page.getByRole('button', {
            name: 'Ingresar'
        }).click();

        // Esperar solo un poco
        await this.page.waitForTimeout(2000);

        console.log('Login exitoso');

    }
}

module.exports = LoginPage;