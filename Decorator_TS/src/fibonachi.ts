function* fibonachi(count: number) {
    let a = 0;
    let b = 1;
    
    for (let i = 0; i < count; i++) {
      yield a;
     [a, b] = [b, a + b]; 
    }
  }

const [...arr1] = fibonachi(5)
console.log(arr1) 

const [...arr2] = fibonachi(10)
console.log(arr2)