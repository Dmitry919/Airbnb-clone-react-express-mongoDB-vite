import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handlerChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/register", { ...values });
        } catch (e) {
            alert("Registration failed. Please try again leter");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>

                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="name"
                        placeholder="John Doe"
                        name="name"
                        autoComplete="off"
                        value={values.name}
                        onChange={handlerChange}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handlerChange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        autoComplete="off"
                        value={values.password}
                        onChange={handlerChange}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?{" "}
                        <Link className="underline text-black" to={"/login"}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default RegisterPage;
