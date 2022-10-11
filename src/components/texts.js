const RandomWord = [
    "aiforesee",
    "indonesia",
    "jakarta",
    "credit",
    "scoring",
  ];
  
  function randomWord() {
    return RandomWord[Math.floor(Math.random() * RandomWord.length)];
  }
  
  export { randomWord };