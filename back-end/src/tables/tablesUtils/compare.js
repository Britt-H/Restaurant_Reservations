// compares two tables for the alphabetical order

function compare(t1, t2) {
  const name1 = t1.table_name;
  const name2 = t2.table_name;

  if (name1[0] === "#" && name2[0] !== "#") {
    return true;
  }

  return name1 > name2
}

module.exports = compare;
