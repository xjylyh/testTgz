const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const scheduleJob = require('node-schedule').scheduleJob;
// async function scheduleCronstyle(){
//     try{
//         let targetPwd = path.resolve('/home/work/.config/verdaccio');
//         let {stderr,stdout} = await exec(`cd ${targetPwd}`);
//         console.log(stdout);
//         let nextMode = await scheduleJob('2 * * * * *');
//         nextMode.then(()=>{
//             console.log('scheduleCronstyle'+new Date());
//             let {stderr,stdout} = await exec('git status');
//             console.log(stdout);
//         })
//     }catch(e){

//     }
// }
// scheduleCronstyle();

async function a(){
    try{
        let {stderr,stdout} = await exec('git status');
        console.log(stdout);
        if(stdout.toString().includes('nothing to commit, working tree clean')){
            console.log('already is uptodate');
        }else{
            await exec('git add .');
            await exec('git commit -m "store changes" ');
            let {stderr,stdout} = await exec('git push origin master');
            console.log('stdout:'+stdout);
        }
    }catch(err){
        if(err){
            console.log('catch: '+err);
        }
    }
    
}
scheduleJob('2 * * * * *',()=>{
    a();
})