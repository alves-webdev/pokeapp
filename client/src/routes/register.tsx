import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const backendUrl = "http://localhost:3000";

  function changeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();
    authRegister(form);
    setForm({ username: "", password: "" });
  }

  async function authRegister(data: typeof form) {
    try {
      const response = await axios.post(`${backendUrl}/usuario/register`, {
        userName: data.username,
        password: data.password,
        team: []
      });

      if (response.status !== 200) {
        console.log("error: " + response);
      } else if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("Registered successfully");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500">
      <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Cadastro</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nome de treinador</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={changeForm}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              value={form.password}
              type="password"
              name="password"
              onChange={changeForm}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Faça login!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
