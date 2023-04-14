const records = ["vairavan", "logesh", "Saipriya"];
const { Worker, isMainThread, parentPort } = require('worker_threads');

console.log("calling somehow", isMainThread);

function sample() {
    if (isMainThread) {
        for (let i = 0; i < records.length; i++) {
            console.log("--------Parent", records[i]);
            const worker = new Worker(__filename);
            worker.postMessage(records[i]);
            onlyParentCanCall();
            worker.on('message', (result) => {
                console.log('---------------Im completed succesffuly', result);
            });
        }
    } else {
        parentPort.on('message', (msg) => {
            console.log(msg, "---Child-I have been triggered from parent i'm gonna take some time to return");
            setTimeout(() => parentPort.postMessage(msg), 2500);
            //Batch
        });
    }
}

function onlyParentCanCall() {
    console.log('Im more powerful');
}

sample();