'use client'

import style from '../style.module.css'
import React, { useEffect, useState } from 'react';
import '../media.css'
import axios from 'axios';
import Link from 'next/link';

type paramsType = {
    user: string[];
}

const Account = ({params}:{params: paramsType}) => {

    const [InputName , SetInputName] = useState(decodeURI(params.user[1]));
    const [InputSurname , SetInputSurname] = useState(decodeURI(params.user[2]));
    const [InputUniversity , SetInputUniversity] = useState(decodeURI(params.user[4]));
    const [InputFaculty , SetInputFaculty] = useState(decodeURI(params.user[5]));

    const [Phone , SetPhone] = useState('');
    const [Subjects , SetSubjects] = useState('');
    
    const [Comment , SetComment] = useState('');
    

    const [Answer , SetAnswer] = useState('');

    const [AnswerAnketa , SetAnswerAnketa] = useState('');
    

    // const [KolVoInput , SetKolVoInput] = useState([0]);
    

    const [FlagAnketa , SetFlagAnketa] = useState(false);
    
    
    
    
    
    const SaveMe = async ()=>{
        if (InputName !== decodeURI(params.user[1]) || InputSurname !== decodeURI(params.user[2]) || InputUniversity !== decodeURI(params.user[3]) || InputFaculty !== decodeURI(params.user[4])){
            SetAnswer('Ожидайте...')
            await axios.post('https://evraz-back.vercel.app/api?need=patch', {id: params.user[0], email: params.user[6], InputName, InputSurname, InputUniversity, InputFaculty, password: params.user[3]})
            .then(e=>{
                if (e.data) {
                    SetAnswer('Успешно')
                } else {
                    SetAnswer('Ошибка')
                }}
            )
            
        }
    }

    const SaveAnket = async ()=>{
        SetAnswerAnketa('Ожидайте')
        await axios.post('https://evraz-back.vercel.app/api?need=create_post', {Comment, Phone, Subjects, user_id: params.user[0], password: params.user[3]} )
        .then(e=>console.log(e.data)
        )
        SetAnswerAnketa('Успешно')
        // console.log(Subjects, Comment, Phone);
        
    }


    const university = [
        'НИУ ВШЭ - Москва'
    ]

    return(
        <div>
            <header className={style.header}>
        <div className={`${style.container} ${style.header__container}`}>
            <select className={style.header__select} name="university">
                {university.map((e, id)=>
                    <option key={id} className={style.header__option}>{e}</option>
                )}
            </select>
            <select className={style.header__select} name="faculty">
                <option className={style.header__option}>Факультет компьютерных наук</option>
            </select>
            <a href="#" className={style.header__lk}><img src="/lk.svg" alt="личный кабинет"/></a>
        </div>
    </header>
    <main className={style.main}>
        <Link href={`/main/${params.user[0]}/${params.user[1]}/${params.user[2]}/${params.user[3]}/${params.user[4]}/${params.user[5]}/${params.user[6]}`}><img src="/arrow_left_alt.svg" alt="" width={50} style={{marginLeft: 50}}/></Link>
        <div className={`${style.container} ${style.main__container}`}>
            <h1 className={style.main__title}>Профиль</h1>
            <div className={style.main__content}>
                {/* <nav className={style.nav}>
                    <ul className={`${style.nav__list} ${style.listReset}`}>
                        <li className={`${style.nav__item} ${style.nav__item_selected}`}>
                            <a href="#personalData" className={style.nav__link}>
                                <svg className={style.nav__itemImg} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7d8089"><path d="M479.75-792q-34.75 0-59.25-24.75t-24.5-59.5q0-34.75 24.75-59.25t59.5-24.5q34.75 0 59.25 24.75t24.5 59.5q0 34.75-24.75 59.25t-59.5 24.5ZM360-204v-463q-55-5-108.5-15T144-709l18-67q78 22 157.5 33T480-732q81 0 160.5-11T798-776l18 67q-54 17-107.5 27T600-667.18V-204h-72v-240h-96v240h-72ZM324-12q-16 0-26-9.5T288-48q0-17 10-26.5t26-9.5q16 0 26 9.5T360-48q0 17-10 26.5T324-12Zm156 0q-16 0-26-9.5T444-48q0-17 10-26.5t26-9.5q16 0 26 9.5T516-48q0 17-10 26.5T480-12Zm156 0q-16 0-26-9.5T600-48q0-17 10-26.5t26-9.5q16 0 26 9.5T672-48q0 17-10 26.5T636-12Z"/></svg>
                                <span className={style.nav__itemText}>Личные данные</span>
                            </a>
                        </li>
                        <li className={style.nav__item}>
                            <a href="#resume" className={style.nav__link}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7d8089"><path d="M288-288h288v-72H288v72Zm0-156h384v-72H288v72Zm0-156h384v-72H288v72Zm-72 456q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"/></svg>
                                <span className={style.nav__itemText}>Анкета</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}
                <ul className={`${style.settings} ${style.listReset}`}>
                    <li id="personalData" className={style.settings__component}>
                        <h2 className={style.settings__title}>Личные данные</h2>
                        <ul className={`${style.settings__list} ${style.listReset}`}>
                            <li className={style.settings__item}>
                                <div className={style.settings__inputWrapper}>
                                    <label htmlFor="name" className={style.settings__label}>Имя</label>
                                    <input onChange={(e)=>SetInputName(e.target.value)} value={InputName} id="name" type="text" className={style.settings__input}/>
                                </div>
                                {/* <div className={style.buttonWrapper}> */}
                                    {/* <button className={`${style.settings__itemButton} ${style.btnSave}`}>Сохранить</button> */}
                                    {/* <button className={`${style.settings__itemButton} ${style.btnCancel}`}>Отменить</button> */}
                                {/* </div> */}

                            </li>
                            <li className={style.settings__item}>
                                <div className={style.settings__inputWrapper}>
                                    <label htmlFor="surname" className={style.settings__label}>Фамилия</label>
                                    <input onChange={(e)=>SetInputSurname(e.target.value)} value={InputSurname} id="surname" type="text" className={style.settings__input}/>
                                </div>
                            </li>
                            <li className={style.settings__item}>
                                <div className={style.settings__inputWrapper}>
                                    <label htmlFor="university" className={style.settings__label}>Учебное заведение</label>
                                    <input onChange={(e)=>SetInputUniversity(e.target.value)} value={InputUniversity} id="university" type="text" className={style.settings__input}/>
                                </div>
                            </li>
                            <li className={style.settings__item}>
                                <div className={style.settings__inputWrapper}>
                                    <label htmlFor="faculty" className={style.settings__label}>Факультет</label>
                                    <input onChange={(e)=>SetInputFaculty(e.target.value)} value={InputFaculty} id="faculty" type="text" className={style.settings__input}/>
                                </div>
                            </li>
                            <div className={style.buttonWrapper}>
                                    <button onClick={SaveMe} className={`${style.settings__itemButton} ${style.btnSave}`}>Сохранить</button>
                                    {Answer.length?
                                    <div style={{backgroundColor: Answer==='Успешно'?'green':'red'}} className={style.answer}>{Answer}</div>
                                    :
                                    null}
                                    {/* <button className={`${style.settings__itemButton} ${style.btnCancel}`}>Отменить</button> */}
                                </div>
                        </ul>
                    </li>
                    <li id="resume" className={style.settings__component}>
                        <h2 className={style.settings__title}>Анкета</h2>
                        <button onClick={()=>{SetFlagAnketa(true)
                        }} className={style.settings__createResumeBtn}>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/></svg>
                            Создать анкету
                        </button>
                        {FlagAnketa?<ul className={`${style.settings__list} ${style.listReset}`}>
                            <li className={style.settings__item}>
                                <div className={style.settings__subjects}>
                                    <input onChange={e=>SetSubjects(e.target.value)} value={Subjects} placeholder="Предметы в формате 'предмет,предмет,предмет...' без пробелов между предметами" className={style.settings__subjects_item}/>
                                    {/* <input placeholder="Предмет" className={style.settings__subjects_item}/>
                                    <input placeholder="Предмет" className={style.settings__subjects_item}/>
                                    <input placeholder="Предмет" className={style.settings__subjects_item}/>
                                    {KolVoInput.map(()=>
                                    <input placeholder="Предмет" className={style.settings__subjects_item}/>
                                    )}
                                    
                                    <svg onClick={()=>SetKolVoInput([...KolVoInput, 0])} className={style.add_subject} xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#3d3bff"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg> */}
                                
                                </div>
                            </li>
                            <li className={style.settings__item}>
                                <textarea onChange={e=>SetComment(e.target.value)} value={Comment} placeholder="Комментарий..." className={style.item__comment}></textarea>
                            </li>
                            <div className={style.settings__subjects}>
                                    <input placeholder="Номер телефона" onChange={e=>SetPhone(e.target.value)} value={Phone} className={style.settings__subjects_item}/>
                            </div>
                            <div className={style.buttonWrapper}>
                                    <button onClick={SaveAnket} className={`${style.settings__itemButton} ${style.btnSave}`}>Сохранить</button>
                                    {AnswerAnketa.length?
                                    <div style={{backgroundColor: AnswerAnketa==='Успешно'?'green':'red'}} className={style.answer}>{AnswerAnketa}</div>
                                    :
                                    null}
                                    {/* <button className={`${style.settings__itemButton} ${style.btnCancel}`}>Отменить</button> */}
                                </div>
                        </ul>: null}
                    </li>
                </ul>
    
            </div>
        </div>
    </main>
        </div>
    );
};

export default Account