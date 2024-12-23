import styles from './nav-bar.module.css'

function NavBar() {
  return (
    <nav className={styles['nav-bar']}>
      <h1 className={styles.title}>Currency exchange</h1>
    </nav>
  )
}

export default NavBar
