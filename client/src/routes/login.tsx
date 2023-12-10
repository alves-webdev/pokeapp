import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

import { useDispatch } from "react-redux";
import { setTeam, setUser, setisLogged } from '../redux/store/user';



function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const backendUrl = "http://localhost:3000";
  const navigate = useNavigate();
  function changeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();
    authLogin(form);
    setForm({ username: "", password: "" });
  }

  const dispatch = useDispatch(); 

  async function authLogin(data: typeof form) {
    try {
      const response = await axios.post(`${backendUrl}/usuario/login`, {
        userName: data.username,
        password: data.password,
      });

      if (response.status !== 200) {
        console.log("error: " + response);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        dispatch(setisLogged(true)); 
        dispatch(setUser(response.data.userName))
        dispatch(setTeam(response.data.team))
        navigate("/user");
        console.log('logado');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nome do treinador</label>
            <input
              name="username"
              onChange={changeForm}
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Ash ketchun"
              value={form.username}
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              onChange={changeForm}
              name="password"
              type="password"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="********"
              value={form.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Não possui uma conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Cadastre-se!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
