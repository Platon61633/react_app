'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import style from '../style.module.css'




const Registration = () => {

    const [Repeat_password , SetRepeat_password] = useState('');
    
    const [ErrorEmail , SetErrorEmail] = useState(false);
    const [ErrorPassword , SetErrorPassword] = useState(false);
    

    type UserType = {
        email: string;
        password: string;
        nick: string;
        university: string;
        faculty: string;    
    }

    const [User , SetUser] = useState<UserType>({
        email: '',
        password: '',
        nick: '',
        university: '',
        faculty: ''
    });

    const router = useRouter()
    

    const Continue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        const EmailE = !User.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        const PasswordE = User.password !== Repeat_password
        
        if (EmailE || PasswordE) {
            if (EmailE) SetErrorEmail(true)
            else SetErrorEmail(false)
            if (PasswordE) SetErrorPassword(true)
            else SetErrorPassword(false)
        } else {
            router.push(`/auth/registration/user/${User.email}/${Repeat_password}`, { scroll: false })
        }
    }
    
    


    return(
        <main className={style.main}>
            <div className={style.container}>
                <Link className={style.arrow} href='/auth/SignIn'><img src='/arrow_left_alt.svg' width={50}/></Link>
                <h1 className={style.form__title}>Регистрация профиля</h1>
                <form className={style.form}>
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label htmlFor="email" className={style.form__label}>Электронная почта</label>
                        <input value={User.email} onChange={e=>{SetUser({...User, email: e.target.value})}} className={style.form__input}/>
                    </div>
                    {ErrorEmail
                    ?
                    <div className={style.wrong_text}>
                        Электронная почта некорректна
                    </div>
                    :
                    null
                    }
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label htmlFor="password" className={style.form__label}>Пароль</label>
                        <input id="password" onChange={e=>{SetUser({...User, password: e.target.value})}} type="password" className={style.form__input}/>
                    </div>
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label htmlFor="repeat_password" className={style.form__label}>Повторите пароль</label>
                        <input id="repeat_password" onChange={e=>{SetRepeat_password(e.target.value)}} type="password" className={style.form__input}/>
                    </div>
                    {ErrorPassword
                    ?
                    <div className={style.wrong_text}>
                        Пароли не сопвадают
                    </div>
                    :
                    null
                    }


                    {/* <!-- <a href="#" className={style.">}е помню пароль</a> --> */}
                    <button onClick={e=>Continue(e)} className={`${style.btn} ${style.form__btn} ${User.email && User.password && Repeat_password?style.btn_active:style.btn_disabled}`}>Продолжить</button>
                </form>
                {/* <Link href="/registration" className={style.btn}registration-btn">Создать профиль</Link> */}
            </div>
        </main>
    );
};

export default Registration