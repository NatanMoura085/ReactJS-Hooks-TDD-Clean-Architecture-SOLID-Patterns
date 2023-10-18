import React from "react";
import { RenderResult, render, fireEvent, cleanup } from "@testing-library/react"
import Login from "./login";
import { ValidationStub } from "@/presentetion/test/";

type SuTypes = {
    sut: RenderResult

}

type SuTParams = {
    validationError: string
}

const makeSut = (params?: SuTParams): SuTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} />)
    return {
        sut,

    }
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
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')
    })


    test('should show email errror if validation fails', () => {
        const validationError = 'error aqui'
        const { sut } = makeSut({ validationError })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')

    })
    test('should show password errror if validation fails', () => {
        const validationError = 'error aqui'
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')

    })

    test('should show valid email if validation succeeds', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_password' } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('Tudo certo!')
        expect(emailStatus.textContent).toBe('🟢')

    })

    test('should show valid password if validation succeeds', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Tudo certo!')
        expect(passwordStatus.textContent).toBe('🟢')

    })

    test('should  enable submit button if form is valid', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)

    })


})