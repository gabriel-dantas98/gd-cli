const getUser = async function (){
    return new Promise((resolve, reject)=>{
      setTimeout(_=>{
        resolve({ name: "Gabriel" });
      }, 1);
    });
};

const getUserAddr = async function (){
    return new Promise((resolve, reject)=>{
        setTimeout(_=>{
        resolve({ name: "Mandic" });
        }, 1);
    });
};

async function getUserFullData(){
    var userData = await getUser();
    var userAddress = await getUserAddr(userData);
    
    console.log(userData, userAddress)
}

getUserFullData();