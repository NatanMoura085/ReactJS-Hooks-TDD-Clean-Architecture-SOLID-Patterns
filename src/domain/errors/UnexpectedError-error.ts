export class UnexpecError extends Error {

    constructor() {
        super('Credenciais inválidas');
        this.name = 'InvalidCredentialsError';
    }

}
