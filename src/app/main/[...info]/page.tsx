'use client'

import { useEffect, useMemo, useState } from 'react';
import style from '../style.module.css'
import axios from 'axios';
import { log } from 'console';
import Modal from '@/app/components/Modal';
import Link from 'next/link';
import Loader from '@/app/components/Loader';

type paramsType = {
    info: String[];
}



const MainPage = ({params}:{params: paramsType}) => {
    

    
    // const [LikedStart , SetLikedStart] = useState<String[]>(['']);
    const [Liked , SetLiked] = useState<String[]>(['']);
    const [SearchValue , SetSearchValue] = useState('');
    const [Search , SetSearch] = useState('');
    const [Posts , SetPosts] = useState([['']]);
    const [FlafModal , SetFlafModal] = useState(false);
    const [DataModal , SetDataModal] = useState({name: '',
        img: '',
        descr: '', 
        subjects: [''],
    });
    
    const [isLoader , SetisLoader] = useState(false);
    
    
    const Effect = async()=>{
        SetisLoader(true)
        await axios.get('https://evraz-back.vercel.app/api?need=posts')
        .then(e=>
            SetPosts(e.data))
        // console.log(params);

        await axios.get('https://evraz-back.vercel.app/api?need=was_liked&id='+params.info[0])
        .then(e=> {
            console.log(e.data);
            
            let liked: String[] = []
            let string_liked: String = ''
            e.data?string_liked = e.data:null
            let lastSep = -1
            for (let i = 0; i < string_liked.length; i++) {
                if (string_liked[i]==',') {
                    liked.push(string_liked.slice(lastSep+1, i))
                    lastSep = i
                } 
            }
            console.log(liked);
            
            // liked.push(string_liked.slice(lastSep+1, string_liked.length))
            SetLiked(liked)
        })
        SetisLoader(false)
    }

    useEffect(()=>{
        Effect()
        
        
    }, [])
    
    
    
    useMemo(
        ()=>{
            if (Liked[0]!=='') {
                if (Liked.length) {
            axios.post('https://evraz-back.vercel.app/api?need=like', {Liked: Liked, id_user: params.info[0]})
            
        }else{
            axios.post('https://evraz-back.vercel.app/api?need=like', {Liked: ['0'], id_user: params.info[0]})
        }
            }
            }, [Liked]
    )
    const TakeLike = async (id_post: String, type: String)=>{
        console.log(id_post, type);
        if (type=='dislike') {
            console.log(Liked.slice(0, Number(Liked.indexOf(id_post))));
            
            SetLiked([...Liked.slice(0, Number(Liked.indexOf(id_post))), ...Liked.slice(Number(Liked.indexOf(id_post))+1, Liked.length)])
        }else{
            SetLiked([...Liked, id_post])
        }
        
        
        
        
    }

    // const SaveLike = ()=>{
    //     if (Liked.length) {
    //         axios.post('https://evraz-back.vercel.app/api?need=like', {Liked: Liked, id_user: params.info[0]})
            
    //     }else{
    //         axios.post('https://evraz-back.vercel.app/api?need=like', {Liked: ['0'], id_user: params.info[0]})
    //     }
        
    // }

    

    return(
        
        <div className={style.jkj}>
            {isLoader?<Loader/>:null}
        {FlafModal?<Modal img={DataModal.img} name={DataModal.name} descr={DataModal.descr} funcFlag={SetFlafModal} subject={DataModal.subjects}/>
        :null}
        <header className={style.header}>
        <div className={`${style.container} ${style.header__container}`}>
            <select className={style.header__select} name="university">
                <option className={style.header__option}>НИУ ВШЭ - Москва</option>
            </select>
            <select className={style.header__select} name="faculty">
                <option className={style.header__option} >Факультет компьютерных наук</option>
            </select>
            <Link href={`/personal_account/${params.info[0]}/${params.info[1]}/${params.info[2]}/${params.info[3]}/${params.info[4]}/${params.info[5]}/${params.info[6]}`} className={style.header__lk}><img src="/lk.svg" alt="личный кабинет"/></Link>
        </div>
    </header>
    <main className={style.main}>
        <div className={`${style.container} ${style.main__container}`}>
            <div className={style.find}>
                <input onChange={e=>SetSearchValue(e.target.value)} value={SearchValue} placeholder="Предмет" type="text" className={style.findInput}/>
                <button onClick={()=>SetSearch(SearchValue)} className={style.findButton}>Найти</button>
            </div>
            {/* <div className={style.linkOptionsWrapper}>
                <a className={style.linkOption}>Специалисты</a>
                <a className={style.linkOption}>Заказы</a>
            </div> */}
            <div className={style.content}>
                <ul className={`${style.content__list} ${style.list_reset}`}>
                    {Posts.filter((info)=>
                        info[0].length?info[1].includes(Search) || 
                        info[2].includes(Search) || 
                        (info[1]+' '+info[2]).includes(Search) ||
                        info[3].includes(Search) ||
                        info[4].includes(Search) ||
                        info[5].includes(Search)
            :false).map(e=>
                        {
                            
                            let subject: string[] = []
                            let string_subject: String = ''
                            e[4]?string_subject = e[4]:null
                            let lastSep = -1
                            for (let i = 0; i < string_subject.length; i++) {
                                if (string_subject[i]==',') {
                                    subject.push(string_subject.slice(lastSep+1, i))
                                    lastSep = i
                                }
                            }
                            subject.push(string_subject.slice(lastSep+1, string_subject.length))

                            // --------------------------


                            
                             

                            return(
                            <li key={e[0]} className={style.content__item} onClick={()=>{SetFlafModal(true)
                                SetDataModal({name: e[1]+' '+e[2],
                                    img: e[0],
                                    descr: e[3],
                                    subjects: subject
                                })
                            }}>
                                {Liked.includes(e[0])?
                                <div onClick={(element)=>{
                                    element.stopPropagation()
                                    TakeLike(e[0], 'dislike')}} className={style.item__like}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#0602ed"><path d="m480-108-66-61q-109-99-177.5-167t-107-119q-38.5-51-52-93.5T64-637q0-100 70-169.5T305-876q45 0 92 18.5t83 51.5q36-33 83-51.5t92-18.5q101 0 171 69.5T896-637q0 46-13 87.5t-51.5 92Q793-407 724-338T544-167l-64 59Z"/></svg>
                                </div>
                                :
                                <div onClick={(element)=>{
                                    element.stopPropagation()
                                    TakeLike(e[0], 'like')}} className={style.item__dislike}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#0602ed"><path d="m480-144-50-45q-100-89-165-152.5t-102.5-113Q125-504 110.5-545T96-629q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51.5 89q-37.5 49-103 113.5T528-187l-48 43Zm0-97q93-83 153-141.5t95.5-102Q764-528 778-562t14-67q0-59-40-99t-99-40q-35 0-65.5 14.5T535-713l-35 41h-40l-35-41q-22-26-53.5-40.5T307-768q-59 0-99 40t-40 99q0 33 13 65.5t47.5 75.5q34.5 43 95 102T480-241Zm0-264Z"/></svg>
                                </div>
                                }
                        
                            
                        <div className={style.item__imgWrapper}>
                            <img className={style.item__img} src={'https://imgs-for-hse.vercel.app/img'+e[0]+'.jpg'} alt="пользователь"/>
                        </div>
                        <div className={style.item__content}>
                            <h3 className={style.item__title}>{e[1]} {e[2]}</h3>
                            <ul className={`${style.item__subjectList} ${style.listReset}`}>
                                {subject.map((elem, id)=>
                                    <li key={id} className={style.item__subjectItem}>{elem}</li>
                                )}
                                
                                
                            </ul>
                            <p className={style.item__descr}>
                                {e[3]}
                            </p>
                        </div>
                    </li>)}
                    )}
                    {/* <div className={style.submitLikes} onClick={SaveLike
                                }><span>Сохранить Лайки</span></div> */}
                </ul>
            </div>
        </div>
    </main>
    </div>
    );
};

export default MainPage