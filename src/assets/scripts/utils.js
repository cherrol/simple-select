
let utils = {
  hasClass($ele, className) {
    var classArr = $ele.className.split(' ');

    return classArr.includes(className);
  },
  addClass($ele, className) {
    var classArr = $ele.className.split(' ');
    if (!classArr.includes(className)) {
      classArr.push(className);

      $ele.className = classArr.join(' ');
    }
  },
  removeClass($ele, className) {
    var classArr = $ele.className.split(' ');

    let newClassArr = classArr.filter(item => item !== className);

    $ele.className = newClassArr.join(' ');
  }
}

export {
  utils
}