//compares two reservation_times
function compareRT(r1, r2) {
  //compare time values
  if (r1.reservation_time > r2.reservation_time) {
    //confirm time 1 is greater than time 2, return true
    return true;
  }
  //else return false
  return false;
}

module.exports = compareRT;
