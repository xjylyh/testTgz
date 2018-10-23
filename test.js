const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const scheduleJob = require('node-schedule').scheduleJob;

scheduleJob('2 * * * * *',async ()=>{
    try{
        let {stderr,stdout} = await exec('git status');
        console.log(stdout);
        if(stdout.toString().includes('nothing to commit, working tree clean')){
            console.log('already is uptodate');
        }else{
            await exec('git add .');
            let strs = await exec('git commit -m "'+new Date()+'"');
            console.log(strs);
            let {stderr,stdout} = await exec('git push origin master');
            console.log('stdout:'+stdout);
        }
    }catch(err){
        if(err){
            console.log('catch: '+err);
        }
    }
})