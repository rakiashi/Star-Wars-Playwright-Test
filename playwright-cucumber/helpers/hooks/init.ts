import fs from 'fs-extra';

try{
    fs.ensureDir('test-results')
    fs.emptyDir('test-results')
    fs.emptyDir('playwright-report')

} catch (error){
    console.log('Folder not Created'+ error);
}