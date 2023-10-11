import React from "react"
import styles from './form-status-styles.scss'
import Spinner from "../spinner/spinner"
const FormStatus:React.FC = ()=>{
    return(
        <div className={styles.errorWrap}>
        <Spinner className={styles.spinner} />
        <span className={styles.error}>Error</span>
    </div>
    )
}
export default FormStatus