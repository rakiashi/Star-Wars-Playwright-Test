import fs from 'fs-extra';

try{
    fs.ensureDir('playwright-report')
    fs.emptyDir('playwright-report')

} catch (error){
    console.log('Folder not Created'+ error);
}