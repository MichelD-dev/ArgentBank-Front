import {Outlet} from 'react-router-dom'
import {Footer, Header} from '@/components'
import {useAppSelector} from '@/hooks/hooks'
import {persistor} from '@/store/store'
import {useEffect} from 'react'

/**
* Layout of the application.
@returns {JSX.Element} A React component for the layout of the application.
*/
const Layout = () => {
  /**
   * A state hook that retrieves the "persistIsChecked" property from the auth state.
   */
  const isUserPersisted = useAppSelector(state => state.auth.persistIsChecked)

  /**
   * A useEffect hook that purges the persisted data if the user is not persisted.
   */
  useEffect(() => {
    if (!isUserPersisted) persistor.purge()
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
