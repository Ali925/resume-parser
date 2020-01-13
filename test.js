const ResumeParser = require('./src');

const fileDir = process.cwd() + '/files/';
ResumeParser
  .parseResumeFile(fileDir + 'resume.pdf', fileDir + 'compiled') //input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });

// ResumeParser.parseResumeUrl('https://github.com/likerRr/code4goal-resume-parser/blob/ce/public/ErnaniJoppert%20P%20Martins.pdf') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.log('parseResume failed');
//     console.error(error);
//   });
