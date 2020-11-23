import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd-mobile/lib/modal/index'
import {Action} from 'antd-mobile/lib/modal/PropsType'

const stopMove=(e:any)=>e.preventDefault();
export default function alert(
  title:React.ReactNode,
  message:React.ReactNode,
  actions=[{text:'知道了'}]
  ){

    const div=document.createElement('div');
    document.body.appendChild(div);

    const close=()=>{
      ReactDOM.unmountComponentAtNode(div);
      div.remove();
      document.body.removeEventListener('touchmove',stopMove)
    }

    const footer=actions.map((button:Action<React.CSSProperties>)=>{
      const oldOnPress=button.onPress || (()=>{});

      button.onPress=()=>{
       const res= oldOnPress();
       if(res && res.then){
         res.then(close).catch(()=>{})
       }else{
        close()
       }
        
      }
      return button
    });

    document.body.addEventListener('touchmove',stopMove,{passive:false}); //防止滚动穿刺
     ReactDOM.render(
       <Modal 
       visible={true} 
       transparent={true}
       title={title}
       closable={false}
       maskClosable={false}
       footer={footer}
       >
         <div>{message}</div>
       </Modal>,
       div
     )
}