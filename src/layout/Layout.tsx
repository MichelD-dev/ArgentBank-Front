import {Outlet} from 'react-router-dom'
import {Footer, Header} from '@/components'
import {useAppSelector} from '@/hooks/hooks'
import {persistor} from '@/store/store'
import {useEffect} from 'react'

const Layout = () => {
  const isUserPersisted = useAppSelector(state => state.auth.persistIsChecked)

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
