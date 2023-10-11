import React from "react";
import styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus} from "@/presentetion/components";

const Login: React.FC = () => {
    return (
        <div className={styles.login}>
            <LoginHeader />
            <form className={styles.form}>
                <h2>Login</h2>
                <Input type="password" name="" id="Digite sua senha" />
                <Input type="password" name="" id="Digite sua senha" />
                <button className={styles.submit} type="submit">Entrar</button>
                <span className={styles.link}>Criar conta</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    )
}

export default Login