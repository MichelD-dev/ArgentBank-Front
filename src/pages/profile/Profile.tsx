import {useProfileMutation, useUpdateProfileMutation} from '@/services/authApi'
import {useState, useEffect, useRef, FormEvent} from 'react'
import {editUserName, setUserName} from '@/features/authSlice'
import {useAppDispatch} from '@/hooks/hooks'
import styles from './profile.module.scss'

const Profile = () => {
  const [user, setUser] = useState({firstName: '', lastName: ''})
  const [userEditing, setUserEditing] = useState(false)

  const dispatch = useAppDispatch()

  // const {userName: {firstName, lastName}} = useAppSelector(state => state.auth)

  const [profile, {data, isSuccess, error}] = useProfileMutation()

  const [
    updateProfile,
    {data: updatedData, isSuccess: isUpdateSuccess, error: updateError},
  ] = useUpdateProfileMutation()

  const firstNameInputRef = useRef<HTMLInputElement>(null)
  const lastNameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => firstNameInputRef.current?.focus(), [userEditing])

  useEffect(() => {
    profile('')
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      const {firstName, lastName} = data.body
      setUser({firstName, lastName})
      dispatch(
        setUserName({
          userName: {firstName, lastName},
        }),
      )
    }
    if (error) {
      if ('status' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data)
        console.log(errMsg)
      } else {
        console.log(error.message)
      }
    }
  }, [isSuccess, error])

  useEffect(() => {
    if (isUpdateSuccess && updatedData) {
      console.log(updatedData)
      const {firstName, lastName} = updatedData.body
      dispatch(
        editUserName({
          userName: {firstName, lastName},
        }),
      )
    }
    if (updateError) {
      if ('status' in updateError) {
        const errMsg =
          'error' in updateError
            ? updateError.error
            : JSON.stringify(updateError.data)
        console.log(errMsg)
      } else {
        console.log(updateError.message)
      }
    }
  }, [isUpdateSuccess, updateError])

  const handleUserEdit = () => {
    setUserEditing(userEditing => !userEditing)
  }

  const handleUserEditValidation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const firstName = firstNameInputRef.current?.value
    const lastName = lastNameInputRef.current?.value

    if (firstName && lastName) {
      setUser({firstName, lastName})
      await updateProfile({firstName, lastName})
      dispatch(
        editUserName({
          userName: {firstName, lastName},
        }),
      )
      setUserEditing(false)
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${user.firstName} ${user.lastName}!`}
        </h1>
        <button className="edit-button" onClick={handleUserEdit}>
          Edit Name
        </button>
        {userEditing && (
          <form onSubmit={handleUserEditValidation}>
            <div className={styles.inputWrapper}>
              <div>
                <label htmlFor="firstName">firstName</label>
                <input
                  type="text "
                  id="firstName"
                  name="firstName"
                  ref={firstNameInputRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text "
                  id="lastName"
                  name="lastName"
                  ref={lastNameInputRef}
                  required
                />
              </div>
            </div>
            <button className="edit-button">Validate</button>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
