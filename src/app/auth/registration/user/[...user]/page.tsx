'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import style from '../../../style.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type paramsType = {
    user: String[];
}

const User = ({params}:{params: paramsType}) => {

    const [isLoader , SetisLoader] = useState(false);
    

    const [User , SetUser] = useState({
        name: '',
        surname: '',
        university: '',
        faculty: ''
    });

    
    const router = useRouter()

    const PostReg = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        SetisLoader(true)
    // setTimeout(()=>SetisLoader(false), 2000)
        if (User.name && User.surname && User.university && User.faculty) {
            
            await axios.post('https://evraz-back.vercel.app/api?need=register', {...User, email: params.user[0], password: params.user[1]})
            .then(e=>console.log(e.data)
            )
            SetisLoader(false)
            router.push('/', { scroll: false })
            // console.log({...User, email: params.user[0], password: params.user[1]})
        }
        
    }

    return(
        <main className={style.main}>
            <div className={style.container}>
                
            <Link className={style.arrow} href='/auth/registration'><img src='/arrow_left_alt.svg' width={50}/></Link>
                <h1 className={style.form__title}>Информация о пользователе</h1>
                <form className={style.form}>
                    {/* <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label className={style.form__label}>Никнейм</label>
                        <input onChange={e=>SetUser({...User, nick: e.target.value})} className={style.form__input}/>
                    </div> */}
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label className={style.form__label}>Имя</label>
                        <input onChange={e=>SetUser({...User, name: e.target.value})} className={style.form__input}/>
                    </div>
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label className={style.form__label}>Фамилия</label>
                        <input onChange={e=>SetUser({...User, surname: e.target.value})} className={style.form__input}/>
                    </div>
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label htmlFor="email" className={style.form__label}>Университеты</label>
                        <input onChange={e=>SetUser({...User, university: e.target.value})} className={style.form__input}/>
                    </div>
                    <div className={`${style.form__input_wrapper} ${style.wrapper}`}>
                        <label htmlFor="email" className={style.form__label}>Факультеты</label>
                        <input onChange={e=>SetUser({...User, faculty: e.target.value})} className={style.form__input}/>
                    </div>
                   
                    {isLoader?
                <button className={style.loader_btn}>
                  <div className={style.loader}></div>
                </button>
                :
                <button onClick={e=>{
                    PostReg(e)
                }}
                className={`${style.btn} ${style.form__btn} ${User.name && User.surname && User.university && User.faculty?style.btn_active:style.btn_disabled}`}>
                    Продолжить
                </button>
                }

                    {/* <!-- <a href="#" className={style.">}е помню пароль</a> --> */}
                    
                </form>
                {/* <Link href="/registration" className={style.btn}registration-btn">Создать профиль</Link> */}
            </div>
        </main>
    );
};

export default User