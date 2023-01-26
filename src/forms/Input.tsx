import {FieldRenderProps} from 'react-final-form'

type Props = FieldRenderProps<string, HTMLInputElement, string>

const Input = ({input, type = 'text', placeholder = ''}: Props) => {
  return <input type={type} placeholder={placeholder} {...input} />
}

export default Input
