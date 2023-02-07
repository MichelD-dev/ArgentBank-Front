import {useGetProfileMutation} from '@/services/authApi'
import {useEffect} from 'react'
import {getMemoizedUser, setUserName} from '@/features/authSlice'
import {useAppDispatch, useAppSelector} from '@/hooks/hooks'
import ProfileForm from '@/forms/profileForm/profileForm'
import {UserSchema} from '@/types/user.model'
import styles from './profile.module.scss'

const Profile = () => {
  const dispatch = useAppDispatch()

  const {firstName, lastName} = useAppSelector(getMemoizedUser)

  const [getProfile, {data, isSuccess, error}] = useGetProfileMutation()

  useEffect(() => {
    getProfile('')
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      const parsedUser = UserSchema.safeParse(data.body)

      if (!parsedUser.success) {
        console.log(
          'Error: ' + parsedUser.error.issues[0].code + ':',
          parsedUser.error.issues[0].message,
        )
        return
      }

      dispatch(
        setUserName({
          userName: data.body,
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
    <main className={`${styles.main} ${styles.bgDark}`}>
      <div className={styles.header}>
        <h1>
          Welcome back
          <br />
          {`${firstName} ${lastName}!`}
        </h1>
        <ProfileForm />
      </div>
      <h2 className={styles.srOnly}>Accounts</h2>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>Argent Bank Checking (x8349)</h3>
          <p className={styles.accountAmount}>$2,082.79</p>
          <p className={styles.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${styles.accountAmountWrapper} ${styles.cta}`}>
          <button className={styles.transactionButton}>
            View transactions
          </button>
        </div>
      </section>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>Argent Bank Savings (x6712)</h3>
          <p className={styles.accountAmount}>$10,928.42</p>
          <p className={styles.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${styles.accountAmountWrapper} ${styles.cta}`}>
          <button className={styles.transactionButton}>
            View transactions
          </button>
        </div>
      </section>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accounTitle}>
            Argent Bank Credit Card (x8349)
          </h3>
          <p className={styles.accountAmount}>$184.30</p>
          <p className={styles.accountAmountDescription}>Current Balance</p>
        </div>
        <div className={`${styles.accountAmountWrapper} ${styles.cta}`}>
          <button className={styles.transactionButton}>
            View transactions
          </button>
        </div>
      </section>
    </main>
  )
}

export default Profile
