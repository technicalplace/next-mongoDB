"use client";

import { useState } from "react";
import "./index.module.css";

const Register = () => {
  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-6">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newUser.name} name="name" placeholder="名前" required onChange={handleChange} />
        <input type="email" value={newUser.email} name="email" placeholder="メールアドレス" required onChange={handleChange} />
        <input type="password" value={newUser.password} name="password" placeholder="パスワード" required onChange={handleChange} />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Register;