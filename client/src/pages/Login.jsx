import pawdLogo from '/pawdcast_logo_large.png'
import useEmoji from '../components/useEmoji';
import { useFormik } from "formik";
import { useState } from 'react'
import * as yup from "yup";
import { UserContext } from "../UserContext";
import { useContext } from "react";




export default function Login() {
  useEmoji()

  const {user, logout, setUser} = useContext(UserContext);

  const [errors, setErrors] = useState('');

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter a email").email("Must be a valid email"),
    password: yup.string().required("Must enter a password").min(3, "At least 3 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(r => {
        if (r.status === 201) return r.json()
        setErrors('Invalid login')
        throw new Error('Login failed')
      })
        .then(d => setUser(d))
        .catch((error) => console.log(error));
    },
  });

  return (
    <>
      <img src={pawdLogo} className="logo" alt="Pawdcasts logo" />
      <h1>Pawd🐾casts</h1>
      { user ? (<button onClick={() => logout()}>Logout</button>) : 
      <form onSubmit={formik.handleSubmit}>
        
        <label>Email</label>        
        <div>
        <input name='email' placeholder='email' onChange={formik.handleChange} value={formik.values.email} />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        </div>
          
        <label>Password</label>
        <div>
        <input name='password' placeholder='Password' type='password' onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        </div>
        <button type='submit'>Login</button>
        <p style={{ color: 'red' }}>{errors}</p>
      </form>
    }
    </>
  )
}