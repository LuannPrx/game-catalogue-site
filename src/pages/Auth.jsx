import React, { useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import './Auth.css'

function Auth() {
    const [tab, setTab] = useState("register")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();

    function updateTab(id) {
        setTab(id)
        setEmail('')
        setPassword('')
        setErrorMsg('')
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate("/")
        })
        .catch((error) => {
            console.log(error.code)
            setErrorMsg(error.code)
        })
    }

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate("/")
        })
        .catch((error) => {
            console.log(error)
            setErrorMsg(error.code)
        })
    }

    const goBack = () => {
        navigate("/")
    }

    const errors = {
        'auth/email-already-in-use': 'já existe uma conta vinculada a este email',
        'auth/invalid-email':'email inválido',
        'auth/wrong-password':'senha incorreta',
        'auth/user-not-found':'este usuário não existe',
        'auth/weak-password':'a senha deve ter no mínimo 6 caracteres',
    }

    const errorMessage = errorMsg ? errors[errorMsg] || 'erro, tente novamente' : null

    return (
        <>
        <button className="return-button" onClick={goBack}>{"< Voltar"}</button>
        <div className="container">
            <div className="tab-container">
                <button className={tab==="register" ? "tab-active":"tab"} onClick={() => updateTab("register")}>
                    <h3>Criar conta</h3>
                </button>
                <button className={tab==="login" ? "tab-active":"tab"} onClick={() => updateTab("login")}>
                    <h3>Entrar</h3>
                </button>
            </div>
            <div className="form-container">
                <div className={tab==="register" ? "active":"content"}>
                    <form>
                        <div className="form-input">
                            <input 
                                type="email" 
                                placeholder="e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="text"
                                placeholder="senha" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />                        
                        </div>
                    </form>
                    <p className="error-message">{errorMessage}</p>
                    <button onClick={signUp}>
                        <h3>criar conta</h3>
                    </button>
                </div>
                <div className={tab==="login" ? "active":"content"}>
                    <form>
                        <div className="form-input">
                            <input 
                                type="email" 
                                placeholder="e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="senha" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />                        
                        </div>
                    </form>
                    <p className="error-message">{errorMessage}</p>
                    <button onClick={signIn}>
                        <h3>login</h3>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Auth;