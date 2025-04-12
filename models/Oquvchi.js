let oquvchilar = [];

function yarat(data) {
  const id = Date.now();
  const yangi = { id, ...data };
  oquvchilar.push(yangi);
  return yangi;
}

function yangilash(id, data) {
  const index = oquvchilar.findIndex(o => o.id === id);
  if (index === -1) return null;
  oquvchilar[index] = { ...oquvchilar[index], ...data };
  return oquvchilar[index];
}

function ochirish(id) {
  const oldLength = oquvchilar.length;
  oquvchilar = oquvchilar.filter(o => o.id !== id);
  return oquvchilar.length < oldLength;
}

function filterlangan(query) {
  let natija = [...oquvchilar];
  
  if (query.classname) {
    natija = natija.filter(o => o.classname === query.classname);
  }

  if (query.coursename) {
    natija = natija.filter(o => o.coursename === query.coursename);
  }

  if (query.yoshi) {
    natija = natija.filter(o => o.yoshi === parseInt(query.yoshi));
  }

  return natija.sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = {
  yarat,
  yangilash,
  ochirish,
  filterlangan,
};
