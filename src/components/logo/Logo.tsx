import './Logo.css'

const Logo = () => {
  return (
    <a className="main-nav-logo" href="./index.html">
      <img
        className="main-nav-logo-image"
        src="./img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </a>
  )
}

export default Logo
