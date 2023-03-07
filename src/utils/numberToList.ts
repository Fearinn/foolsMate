function numberToList(pages: number = 1) {
    const numberList: number[] = [];
    for (let i = 1; i <= (pages || 0); i++) {
      numberList.push(i);
    }
    return numberList;
  }

export default numberToList