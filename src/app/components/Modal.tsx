import React from 'react';

const Modal = ({img, name, descr, funcFlag, subject}:{img: String, name: String, descr: String, funcFlag: Function, subject: string[]}) => {
    return(
        <div className="modal_wrapper" onClick={()=>funcFlag(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
                <div className="modal_top">
                    <div className="modal__imgWrapper">
                        <img className="modal__img" src={'https://imgs-for-hse.vercel.app/img'+img+'.jpg'} alt="пользователь"/>
                    </div>
                    <div className="modal__content">
                        <h3 className="modal__title">{name}</h3>
                        <ul className="modal__subjectList listReset">
                        {subject.map((elem, id)=>
                                    <li key={id} className="modal__subjectItem">{elem}</li>
                                )}
                        </ul>
                    </div>
                </div>
                <div className="modal_bottom">
                    <p className="modal__descrTitle">Описание</p>
                    <p className="modal__descr">
                        {descr}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Modal