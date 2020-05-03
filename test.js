const errorCategory = (array, tagName)=>{
        let k;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    if(tagName == element){k='right'; break;}
    else{k='';}
    
}
console.log(1, k);
if (k=''){console.log('wrong');}

}; 


const userAdmin = ['tutor', 'student'];
let hello = 'student';
errorCategory(userAdmin, hello);