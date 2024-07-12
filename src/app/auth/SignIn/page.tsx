'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import style from '../style.module.css'
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {

  const router = useRouter()

  const [isLoader , SetisLoader] = useState(false);
  

  const TrueParol = '123456'
  const TrueLogin = 'jora'

  const [Login , SetLogin] = useState<String>('');
  const [Password , SetPassword] = useState<String>('');

  const [isFalsePassword , SetisFalsePassword] = useState<Boolean>(false);

  const Auth = async ()=>{
    SetisLoader(true)
    console.log(Login, Password);

    await axios.post('https://evraz-back.vercel.app/api?need=signin', [Login.slice(0, Login.indexOf('@'))+'%40' + Login.slice(Login.indexOf('@')+1, Login.length), Password])
      .then(e=>
        {
          console.log(e.data);
          
          if (e.data[1]==1) {
            const info = e.data[0][0]
            console.log(`/main/${info[0]}/${info[1]}/${info[2]}/${info[4]}/${info[5]}/${info[6]}/${info[7]}/`);
            
            SetisLoader(false)
            console.log('good');
            router.push(`/main/${info[0]}/${info[1]}/${info[2]}/${info[3]}/${info[4]}/${info[5]}/${info[6]}/`, { scroll: false })

          
        }else{
          console.log('bad')
          SetisLoader(false)
        }}
      )
    // if (TrueLogin===Login && TrueParol===Password) {
      
    //   axios.post('https://evraz-back.vercel.app/api?need=signin', {login: Login, password: Password})
    //   .then(e=>console.log(e.data))
    //   // axios.post('http://')
    // }
    // else{
    //   SetisFalsePassword(true)
    // }
  }

  return (
    <main className={style.main}>
        <div className={style.container}>
            
            <h1 className={style.form__title}>Вход в профиль</h1>
            <form className={style.form}>
                <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                    <label htmlFor="email" className={style.form__label}>Электронная почта</label>
                    <input onChange={e=>SetLogin(e.target.value)} className={style.form__input}/>
                </div>
                <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                    <label htmlFor="password" className={style.form__label}>Пароль</label>
                    <input id="password" onChange={e=>SetPassword(e.target.value)} type="password" className={style.form__input}/>
                </div>
                {isFalsePassword
                ?
                <div className={`${style.wrong_text}`}>
                    Неверный email или пароль.
                    Проверьте корректность отправляемых данных.
                </div>
                :
                null}
                

                {/* <!-- <a href="#" className={style.">}е помню пароль</a> --> */}
                {isLoader?
                <div className={style.loader_btn}>
                  <div className={style.loader}></div>
                </div>
                :
                <button onClick={e=>{
                  Auth()
                  e.preventDefault()
                }} className={`${style.btn} ${style.form__btn} ${Login && Password?style.btn_active:style.btn_disabled}`}>Войти
                </button>
                }
                
            </form>
            <Link href="/auth/registration" className={`${style.btn} ${style.registration_btn}`}>Создать профиль</Link>
        </div>

        
    </main>
  );
}
