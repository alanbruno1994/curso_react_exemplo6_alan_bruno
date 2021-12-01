import { useEffect, useReducer } from 'react';
import './App.css';

type Action={
  type:string
  payload?:any  
}

const initialValues={
  email:'',
  password:'',
  logged:false
}
//Essa funcao e usada para evoluir o estado
//state e o estado atual
function reducer(state:any,action:Action)
{
    switch(action.type)//type indica o que sera evoluido
    {
      case 'email':
        return  {...state,email:action.payload}
      case 'password':
        return  {...state,password:action.payload}
      case 'logged':
          return  {...state,logged:action.payload}  
      default:
         return {...state}
    }
}



function App() {
  //o dispatch vai ser uma funcao que no fundo chamada reducer
  //no dispatch voce so passa o valor do action
  const [state,dispatch]= useReducer(reducer,initialValues)

  useEffect(()=>{//Aqui esta usando o localStorage
    const logged=localStorage.getItem('Logged');
    if(logged==='1'){
      dispatch({...state,type:'logged',payload:true})
    }
  },[])

  function onSubmit(event:any){
    event.preventDefault()
    if(state.email==='root' && state.password==='12345')
    {
      localStorage.setItem('Logged','1');
      dispatch({...state,type:'logged',payload:true})
    }
  }

  return (
    <div className="App">
        <form onSubmit={onSubmit}>
          <input value={state.email} onChange={event=>dispatch({type:'email',payload:event.target.value})} />
          <input type="password" value={state.password} onChange={event=>dispatch({type:'password',payload:event.target.value})} />
          <input type='submit' value='Click'></input>
          <div>{state.logged ? 'Entering System':'No Entering'}</div>
         </form>
    </div>
  );
}

export default App;
