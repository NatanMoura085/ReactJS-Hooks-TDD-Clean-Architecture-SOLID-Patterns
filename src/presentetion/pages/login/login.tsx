import React, { useState } from "react";
import styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from "@/presentetion/components";
import Context from '@/presentetion/context/form/form-context'

type StateProps = {
    isLoading: boolean
    errorMessage:string
}
const Login: React.FC = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        errorMessage:''
    })
    return (
        <div className={styles.login}>
            <LoginHeader />
            <Context.Provider value={state}>
            <form className={styles.form}>
                <h2>Login</h2>
                <Input type="email" name="" id="Digite sua email" />
                <Input type="password" name="" id="Digite sua senha" />
                <button className={styles.submit} type="submit">Entrar</button>
                <span className={styles.link}>Criar conta</span>
                <FormStatus />
            </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login