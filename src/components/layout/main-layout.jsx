import { Outlet } from 'react-router-dom'

import styles from './main-layout.module.css'
import NavBar from './nav-bar/nav-bar'

function MainLayout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles['main-layout']}>
        <Outlet />
        {children}
      </main>
    </>
  )
}

export default MainLayout
