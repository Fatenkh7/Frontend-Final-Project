function cancelSpeechSynthesis() {
    window.speechSynthesis.cancel();
  }
  
  function doSpeechSynthesis(longText) {
    // The maximum number of characters in each part
    const maxLength = 100;
  
    // Divide the text into smaller parts
    const textParts = [];
    let startIndex = 0;
    while (startIndex < longText.length) {
      let endIndex = Math.min(startIndex + maxLength, longText.length);
      if (endIndex < longText.length) {
        endIndex = longText.lastIndexOf(" ", endIndex);
      }
      textParts.push(longText.substring(startIndex, endIndex));
      startIndex = endIndex + 1;
    }
  
    // Create SpeechSynthesisUtterance instances for each piece of text
    const utterances = textParts.map((textPart) => {
      const utterance = new SpeechSynthesisUtterance(textPart);
      utterance.lang = "en-US";
      return utterance;
    });
  
    // Read each piece of text sequentially
    function speakTextParts(index = 0) {
      if (index < utterances.length) {
        speechSynthesis.speak(utterances[index]);
        utterances[index].addEventListener("end", () =>
          speakTextParts(index + 1)
        );
      }
    }
  
    //Begin speak
    speakTextParts();
  }
  export {cancelSpeechSynthesis,doSpeechSynthesis}