import { Link } from 'react-router-dom';
import LoginPanel from '../components/LoginPanel';

export default function Login() {

  const styles = {
    link: {
      textDecoration: 'none',
      color: '#F2A154',
      fontSize: '20px'
    }
  }

  return (
    <div className="container ms-auto d-flex align-items-center flex-column col-sm-12 form-group">
    <Link style={styles.link} to="/signup">Not Signed Up? <br></br>← Go to Signup</Link>
    <h2>Login</h2>
    <LoginPanel key="loginPanel" />
    </div>
  );
}
