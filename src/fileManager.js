var fs = require('fs');

module.exports = {
  createNewFile : (file,fileContent) => {
    return(
      fs.appendFile(file,fileContent,err => {
        if (err) throw err;
        console.log('Saved!');
      })
    )
  },
  readFile : (file) => {
    return (
      fs.readFile(file,'utf-8',(err,data) => {
        if(err) throw err
        console.log(data)
      })
    )
  },
  updateFile : (file,newContent) => {
    return (
      fs.writeFile(file,newContent,err => {
        if (err) throw err
        console.log('replace content');
      })
    )
  },
  deleteFile : (file) => {
    return (
      fs.unlink(file,err => {
        if (err) throw err
        console.log('remove file success')
      })
    )
  }
}