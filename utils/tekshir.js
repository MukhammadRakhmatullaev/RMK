const togrilar = {
    classname: ["N-19", "N-20", "N-21"],
    coursename: ["IT", "SMM", "QA"]
  };
  
  function tekshir(data) {
    return togrilar.classname.includes(data.classname) &&
           togrilar.coursename.includes(data.coursename);
  }
  
  module.exports = { tekshir };  