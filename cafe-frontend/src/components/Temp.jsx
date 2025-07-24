import React from 'react'


// export default function Temp(flag) {
//     if(flag) return  <h1>Temp is true</h1>
//     else return <h1>Flag is false</h1>
  
// }


// export default function Temp({flag}) {

//     return flag ? <h1>Temp is true</h1> :<h1>Flag is false</h1>
    
  
// }


// export default function Temp({flag}) {

//     return flag &&  <h1>Temp is true</h1>   //jb true hoga tbhi display hoga wrna nothing to disply
    
  
// }

//EVENT HANDLING


// export default function Temp() {

//     const handleClick = () =>{
//         alert("Hello World")
//     };
//     const handleSubmit = (name)=>{
//         alert(`Hello ${name}`);
//     };
//     return (
//         <>
//         <button onClick={handleClick}>Click</button>
//         {/* //if i m passing a value then event should be called like this */}
//         <button onClick={()=>handleSubmit("John")}>Submit</button>   
//         </>
//     )
  
// }



//HOOK

import { useState } from 'react'

export default function Temp(){
    const [score, setScore] = useState(0);

    const updateScore = ()=>{
        setScore(score+1);
    }

    const reduceScore = ()=>{
        setScore(score - 1);
    }

    return (
        <>
        <h1>{score}</h1>
        <p>
            <button onClick={updateScore}>Update Score</button>
            <button onClick={reduceScore}>Reduce Score</button>
        </p>
        </>
    )
}