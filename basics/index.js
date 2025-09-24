// let promise1 = new Promise((resolve, reject) => {
//   let success = false;
//   if (success) {
//     resolve("promise fulfilled");
//   } else {
//     reject("promise failed");
//   }
// });

// promise1.then((message)=>{
//     console.log("1st message:"+ message);
//     return("1st message")
// }).then((message)=>{
//     console.log("2nd message:"+ message);
//     return(30)
// }).catch((erroe)=>{
//     console.error("error");
    
// }).finally((message)=>{
//     console.log("this will run anyways")
// });
// promise1
//   .then(result => console.log(result))
//   .catch(error => console.log(error))
//   .finally((message)=>{
//     console.log("this will run regardless of any thing")
//   });


// async function getData() {
//     let respond= await fetch('https://placeholderjson.dev/');
//      let data = await (respond).json;
//     console.log(data);
    
// }
// getData()

// let num = true;
// let prom = new Promise(function(resolve,reject){
//     if(num){
//         resolve("resolved num");
//     }else{
//         reject("rejected num");
//     }
// })
// // console.log(prom);
// prom.then((val) => console.log(val));

function addnum(a,b){
    return new Promise((resolve, reject) => {
        let sum = a+b;
        if(sum ==5){
            resolve("corect");
        }else{
            reject("false");
        }
    });

}
addnum(1,2)
.then((val) => {console.log(val);})
.catch((val) =>{console.log(val);});

