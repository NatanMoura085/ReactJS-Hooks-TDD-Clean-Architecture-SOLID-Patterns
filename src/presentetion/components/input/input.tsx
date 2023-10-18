import React, { useContext } from "react"
import styles from './input-styles.scss'
import Context from '@/presentetion/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


const Input: React.FC<Props> = (props: Props) => {

    const { state, setState } = useContext(Context)
    const error = state[`${props.name}Error`]
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false

    }
    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value

        })

    }
    const getStatus = (): string => {
        return error ? '🔴' : '🟢'
    }
    const getTitle = (): string => {
        return error || 'Tudo certo!'
    }
    return (
        <div className={styles.inputWrap}>
            <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
            <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>{getStatus()}</span>
        </div>
    )
}

export default Input 