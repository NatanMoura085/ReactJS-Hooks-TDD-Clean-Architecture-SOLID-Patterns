import React, { useState, useEffect } from "react";
import styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from "@/presentetion/components";
import Context from '@/presentetion/context/form/form-context'
import { ValidationStub } from "@/presentetion/test";

type Props = {
    validation: ValidationStub
}
const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: '',

    })
    useEffect(() => {
       setState({
        ...state,
        emailError: validation?.validate( 'email', state.email ),
        passwordError: validation?.validate( 'password', state.password )
       })
    }, [state.email,state.password])
  
    return (
        <div className={styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form className={styles.form}>
                    <h2>Login</h2>
                    <Input type="email" name="email" id="Digite sua email" />
                    <Input type="password" name="password" id="Digite sua senha" />
                    <button data-testid="submit" disabled className={styles.submit} type="submit">Entrar</button>
                    <span className={styles.link}>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login