import React, { useState } from "react";
import styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from "@/presentetion/components";
import Context from '@/presentetion/context/form/form-context'


const Login: React.FC = () => {
    const [state] = useState({
        isLoading: false,
       
     
    })
    const [errorState] = useState({
        email:'Campo obrigatório',
        password:"Campo obrigatório",
        main:'',
    })
    return (
        <div className={styles.login}>
            <LoginHeader />
            <Context.Provider value={{state,errorState}}>
            <form className={styles.form}>
                <h2>Login</h2>
                <Input  type="email" name="email" id="Digite sua email" />
                <Input type="password"name="password" id="Digite sua senha" />
                <button  data-testid="submit" disabled className={styles.submit} type="submit">Entrar</button>
                <span className={styles.link}>Criar conta</span>
                <FormStatus />
            </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login