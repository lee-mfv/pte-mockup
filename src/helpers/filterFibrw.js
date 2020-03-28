import trim from "lodash/trim";

const filterFibrw = (item) => {
  let result = [];
  if(item && item.length > 0) {
    result = item.split(/,/);
    result = result.map(item => {
      let tmp = trim(item, '\r\n');
      tmp = trim(tmp, ',');
      tmp = trim(tmp, '\t');
      tmp = trim(tmp, ' ');
      tmp = trim(tmp, '"');
      tmp = trim(tmp, '\'');
      return tmp;
    })
    result = result.filter(item => {
      return item.length > 0;
    });
  }

  return result;
}

export default filterFibrw;