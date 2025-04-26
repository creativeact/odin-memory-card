function getRandomCharacters(sourceArray, count) {
    const copied = [...sourceArray];
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    console.log(copied.slice(0,count));
    return copied.slice(0, count);  
}

export { getRandomCharacters }