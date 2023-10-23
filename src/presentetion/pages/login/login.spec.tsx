import React from "react";
import { RenderResult, render, fireEvent, cleanup,waitFor } from "@testing-library/react"
import Login from "./login";
import { ValidationStub, AuthenticationSpy } from "@/presentetion/test/";
import { InvalidCredentialsError } from "@/domain/errors";


type SuTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy

}

type SuTParams = {
    validationError: string
}

const makeSut = (params?: SuTParams): SuTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
    return {
        sut,
        authenticationSpy

    }
}

const simulateValidSubmit = (sut: RenderResult, email = 'mouranatan933@gmail.com', password = '12345'): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}
const populateEmailField = (sut: RenderResult, email = 'mouranatan933@gmail.com'): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = '12345'): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
    expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}


describe('Login Component', () => {
    afterEach(cleanup)
    test('should start with initial state', () => {
        const validationError = 'error aqui'
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        simulateStatusForField(sut, 'email', validationError)
        simulateStatusForField(sut, 'password', validationError)

    })


    test('should show email errror if validation fails', () => {
        const validationError = 'error aqui'
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateStatusForField(sut, 'password', validationError)
    })
    test('should show password errror if validation fails', () => {
        const validationError = 'error aqui'
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        simulateStatusForField(sut, 'email', validationError)
    })

    test('should show valid email if validation succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        simulateStatusForField(sut, 'email')
    })

    test('should show valid password if validation succeeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        simulateStatusForField(sut, 'password')

    })

    test('should  enable submit button if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)

    })
    test('should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()

    })

    test('should call authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        const email = 'mouranatan933@gmail.com'
        const password = '12345'
        simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password

        })


    })

    test('should call authentication only once ', () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut)
        simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)


    })

    test('should not call authentication if form is invalid ', () => {
        const validationError = 'error aqui'
        const { sut, authenticationSpy } = makeSut({ validationError })
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)


    })

    test('should present error if authentication fails ', async () => {

        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError() 
        jest.spyOn(authenticationSpy,'auth').mockReturnValueOnce(Promise.reject(error))
        simulateValidSubmit(sut)
        const errorWrap = sut.getByTestId('error-wrap')
        await waitFor(()=>errorWrap)
        const mainError = sut.getByTestId('main-error')
        expect(mainError.textContent).toBe(error.message)
        expect(errorWrap.childElementCount).toBe(1)


    })
})