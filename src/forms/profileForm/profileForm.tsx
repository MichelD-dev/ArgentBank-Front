import {useUpdateProfileMutation} from '@/services/authApi'
import {useState, useEffect, useRef} from 'react'
import {editUserName} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import {Field, Form} from 'react-final-form'
import {useValidators} from '../validators/validators'
import styles from './profileForm.module.scss'

const ProfileForm = () => {
  const [isUserEditingShwon, setIsUserEditingShown] = useState(false)

  const dispatch = useAppDispatch()

  const [updateProfile] = useUpdateProfileMutation()

  const {
    userName: {firstName: test1, lastName: test2},
  } = useAppSelector(state => state.auth)

  const userRef = useRef<HTMLInputElement>(null)

  const {validInput} = useValidators()

  useEffect(() => userRef.current?.focus(), [isUserEditingShwon])

  const handleUserEditValidation = async (value: {
    firstName: string
    lastName: string
  }) => {
    await updateProfile(value)
    dispatch(
      editUserName({
        userName: value,
      }),
    )
    setIsUserEditingShown(false)
  }

  const handleUserEdit = () => setIsUserEditingShown(true)

  const handleEditCancel = () => setIsUserEditingShown(false)

  return (
    <>
      {!isUserEditingShwon && (
        <button className="edit-button" onClick={handleUserEdit}>
          Edit Name
        </button>
      )}
      {isUserEditingShwon && (
        <Form
          onSubmit={handleUserEditValidation}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <Field
                  name="firstName"
                  validate={validInput}
                  initialValue={test1 ?? ''}
                  render={({input, meta}) => (
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="firstName"
                        ref={userRef}
                        {...input}
                      />
                      {meta.error && meta.touched && (
                        <span style={{color: 'red'}}>{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="lastName"
                  validate={validInput}
                  initialValue={test2 ?? ''}
                  render={({input, meta}) => (
                    <div className="input-wrapper">
                      <input type="text" placeholder="lastName" {...input} />
                      {meta.error && meta.touched && (
                        <span style={{color: 'red'}}>{meta.error}</span>
                      )}
                    </div>
                  )}
                />
              </div>
              <button className="edit-button">Save</button>
              <button className="edit-button" onClick={handleEditCancel}>
                Cancel
              </button>
            </form>
          )}
        />
      )}
    </>
  )
}

export default ProfileForm
