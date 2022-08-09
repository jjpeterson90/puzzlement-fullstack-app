
export function shuffleArray(array) {
  let newArray = JSON.parse(JSON.stringify(array))
  let currentIndex = newArray.length
  let randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export function rebuildNestedArrayFromString(str) {
  let index = 0
  let arr = []
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/\d/)) {
      if (arr[index]) arr[index][0] += str[i]
      else arr[index] = [str[i]]
    } else {
      arr[index][1] = str[i]
      index += 1
    }
  }
  return arr
}

export function makeNewLetterChoices(answer) {
  let list = answer.split('')
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  while (list.length < 14) {
    list.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)))
  }
  const listWithLetterIDs = list.map((letter, index) => {
    return [index.toString(), letter]
  })
  const newList = shuffleArray(listWithLetterIDs)
  return newList
}