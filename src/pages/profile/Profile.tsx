import {useProfileMutation} from '@/services/authApi'
import {useEffect} from 'react'
import {getMemoizedUser, setUserName} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import ProfileForm from '@/forms/profileForm/profileForm'
// import styles from './profile.module.scss'

const Profile = () => {
  const dispatch = useAppDispatch()

  const {firstName, lastName} = useAppSelector(getMemoizedUser)

  const [profile, {data, isSuccess, error}] = useProfileMutation()

  useEffect(() => {
    profile('')
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      const firstName = data.body.firstName
      const lastName = data.body.lastName
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

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${firstName} ${lastName}!`}
        </h1>
        <ProfileForm />
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
