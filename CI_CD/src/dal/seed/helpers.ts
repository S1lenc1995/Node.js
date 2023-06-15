export function createMany(transactionEntityManager, factory, count){
    const promise = [];
    for(let i=0; i<count; i++){
        const entity = factory.createEntity();
        promise.push(transactionEntityManager.save(entity))
    }
    return Promise.all(promise)
}