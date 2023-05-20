const utterance = new SpeechSynthesisUtterance();

export const playAudioText = (text, rate) => {
  if (text) {
    utterance.text = `${text}`; // Текст для синтеза речи
    utterance.lang = "de-DE"; // Язык голоса
    utterance.rate = rate;

    utterance.onload = () => {
      speechSynthesis.speak(utterance); // Воспроизведение речи после полной загрузки голоса
    };

    speechSynthesis.speak(utterance); // Запуск загрузки голоса
  }
};
