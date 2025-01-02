"use client";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} name="email" placeholder="メールアドレス" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} name="password" placeholder="パスワード" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}

export default Login;