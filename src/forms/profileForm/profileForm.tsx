import {useUpdateProfileMutation} from '@/services/authApi'
import {useState, useEffect, useRef} from 'react'
import {editUserName, getMemoizedUser} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import {Field, Form} from 'react-final-form'
import {useValidators} from '../validators/validators'
import type {UserType} from '@/types/user.model'
import styles from './profileForm.module.scss'

const ProfileForm = () => {
  const [isUserEditingShown, setIsUserEditingShown] = useState(false)

  const dispatch = useAppDispatch()

  const [updateProfile] = useUpdateProfileMutation()

  const {firstName, lastName} = useAppSelector(getMemoizedUser)

  const userRef = useRef<HTMLInputElement>(null)

  const {validInput} = useValidators()

  useEffect(() => userRef.current?.focus(), [isUserEditingShown])

  const handleUserEditValidation = async (editedUserName: UserType) => {
    await updateProfile(editedUserName)
    dispatch(
      editUserName({
        userName: editedUserName,
      }),
    )
    setIsUserEditingShown(false)
  }

  const handleUserEdit = () => setIsUserEditingShown(true)

  return (
    <>
      {!isUserEditingShown && (
        <button className={styles.editButton} onClick={handleUserEdit}>
          Edit Name
        </button>
      )}
      {isUserEditingShown && (
        <Form
          onSubmit={handleUserEditValidation}
          render={({handleSubmit, form, pristine}) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <Field
                  name="firstName"
                  validate={validInput}
                  initialValue={firstName ?? ''}
                  render={({input, meta}) => (
                    <div className={styles.inputWrapper}>
                      <input type="text" ref={userRef} {...input} />
                      {meta.error && meta.touched && (
                        <span style={{color: 'red'}}>{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="lastName"
                  validate={validInput}
                  initialValue={lastName ?? ''}
                  render={({input, meta}) => (
                    <div className={styles.inputWrapper}>
                      <input type="text" {...input} />
                      {meta.error && meta.touched && (
                        <span style={{color: 'red'}}>{meta.error}</span>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className={styles.inputWrapper}>
                <button className={styles.editButton} disabled={pristine}>
                  Save
                </button>
                <button className={styles.editButton} onClick={() => form.reset()}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        />
      )}
    </>
  )
}

export default ProfileForm
