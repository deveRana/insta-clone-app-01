
let initialState = null;



const userToken = localStorage.getItem("jwt");

if(userToken){
    initialState = true;
}


setTimeout(() => {
    localStorage.clear();
}, 86400000 );


export const reducer = (state , action) =>{
    
if (action.type === "USER") {
        return action.payload;
}
    
return state;

}

export {initialState}; 
