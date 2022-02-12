import { Link } from 'react-router-dom';
import LoginPanel from '../components/LoginPanel';

export default function Login() {
  return (
    <div className="container my-1">
    <Link to="/signup">← Go to Signup</Link>
    <h2>Login</h2>
    <LoginPanel key="loginPanel" />
    </div>
  );
}
