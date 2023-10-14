import pawdLogo from '/pawdcast_logo_large.png'
import useEmoji from '../components/useEmoji';

export default function Login() {
  useEmoji()

  return (
    <>
      <img src={pawdLogo} className="logo" alt="Pawdcasts logo" />
      <h1>Pawd🐾casts</h1>
      <button>Login</button>
    </>
  )
}