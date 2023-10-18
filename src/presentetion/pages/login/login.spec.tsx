import React from "react";
import { RenderResult, render, fireEvent, cleanup } from "@testing-library/react"
import Login from "./login";
import { ValidationStub } from "@/presentetion/test/";

type SuTypes = {
    sut: RenderResult
    validationStub: ValidationStub
}

const makeSut = (): SuTypes => {
    const validationStub = new ValidationStub()
    const errorMessage = 'error aqui'
    validationStub.errorMessage = errorMessage
    const sut = render(<Login validation={validationStub} />)
    return {
        sut,
        validationStub
    }
}

describe('Login Component', () => {
    afterEach(cleanup)
    test('should start with initial state', () => {
        const { sut, validationStub } = makeSut()
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationStub.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationStub.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

 

    test('should show email errror if validation fails', () => {
        const { sut, validationStub } = makeSut()
       
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationStub.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
    
    })
    test('should show password errror if validation fails', () => {
        const { sut, validationStub } = makeSut()   
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationStub.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    
    })

    test('should show valid email if validation succeeds', () => {
        const { sut, validationStub } = makeSut()
        validationStub.errorMessage = null   
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_password' } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('Tudo certo!')
        expect(emailStatus.textContent).toBe('🟢')
    
    })

    test('should show valid password if validation succeeds', () => {
        const { sut, validationStub } = makeSut()
        validationStub.errorMessage = null   
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Tudo certo!')
        expect(passwordStatus.textContent).toBe('🟢')
    
    })


})