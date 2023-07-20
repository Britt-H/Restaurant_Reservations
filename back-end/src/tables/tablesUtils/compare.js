// compares two tables for the alphabetical order

function compare(t1, t2) {
  //extract table names
  const name1 = t1.table_name;
  const name2 = t2.table_name;

  //if name 1 starts with # & name 2 does not start with #
  //conside first table as greater
  if (name1[0] === "#" && name2[0] !== "#") {
    return true;
  }

  return name1 > name2;
}

module.exports = compare;
