var file_system = require('fs');
var archiver = require('archiver');

var output = file_system.createWriteStream('target.zip');
var archive = archiver('zip');

const file1 = 'arquivo 1';
const file2 = 'arquivo 2';

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

const buffer1 = Buffer.from(file1);
archive.append(buffer1, { name: 'file1.txt' });

const buffer2 = Buffer.from(file2);
archive.append(buffer2, { name: 'file2.txt' });

archive.finalize();