/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useToast } from "./ToastContext";

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  // --- States ---
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionLang, setRecognitionLang] = useState("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const { addToast } = useToast();
  const router = useRouter();

  // --- Helpers (Declared first to avoid hoisting issues) ---

  const handleGlobalCommand = (command) => {
    if (!command.trim()) return;
    setIsProcessing(true);
    addToast(`Command received: "${command}"`, "info");

    setTimeout(() => {
      setIsProcessing(false);
      setTranscript("");
      router.push(`/agent?q=${encodeURIComponent(command)}`);
    }, 1500);
  };

  const findVoice = (voiceList, text = "") => {
    const isBangla = /[\u0980-\u09FF]/.test(text);
    const targetLang = isBangla ? "bn" : recognitionLang.split("-")[0];

    const priorities = isBangla
      ? ["Google বাংলা", "Microsoft Hemant", "bn-BD", "bn-IN"]
      : [
          "Google US English",
          "Microsoft Aria Online",
          "Microsoft Jenny Online",
          "Microsoft Guy Online",
          "Samantha",
          "Daniel",
          "English (United States)",
          "en-US",
        ];

    for (const name of priorities) {
      const found = voiceList.find(
        (v) => v.name.includes(name) || v.lang.includes(name),
      );
      if (found) return found;
    }

    const langMatch = voiceList.find((v) => v.lang.startsWith(targetLang));
    if (langMatch) return langMatch;

    return voiceList.find((v) => v.lang.startsWith("en")) || voiceList[0];
  };

  const handleSetSelectedVoice = (voiceName) => {
    setSelectedVoice(voiceName);
    localStorage.setItem("xiroo-selected-voice", voiceName);
  };

  const handleSetRecognitionLang = (lang) => {
    setRecognitionLang(lang);
    localStorage.setItem("xiroo-recognition-lang", lang);
  };

  // --- Effects ---

  // Load persisted settings
  useEffect(() => {
    const savedVoice = localStorage.getItem("xiroo-selected-voice");
    const savedLang = localStorage.getItem("xiroo-recognition-lang");
    if (savedVoice) setSelectedVoice(savedVoice);
    if (savedLang) setRecognitionLang(savedLang);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.webkitRecognition);
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = recognitionLang;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error !== "no-speech")
          addToast("Voice recognition error", "error");
      };
      recognition.onresult = (event) => {
        const current = event.results[0][0].transcript;
        setTranscript(current);
        if (event.results[0].isFinal) handleGlobalCommand(current);
      };

      recognitionRef.current = recognition;
    }
  }, [recognitionLang, addToast]);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);

        // Auto-select best voice if none selected
        if (!selectedVoice && availableVoices.length > 0) {
          const best = findVoice(availableVoices);
          setSelectedVoice(best.name);
        }
      };

      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, [selectedVoice]);

  // --- Methods ---

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      recognitionRef.current?.start();
    }
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    if (!text) return;

    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/#+\s/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice =
      voices.find((v) => v.name === selectedVoice) ||
      findVoice(voices, cleanText);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.pitch = 1.05;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        transcript,
        isProcessing,
        isSpeaking,
        voices,
        selectedVoice,
        recognitionLang,
        setSelectedVoice: handleSetSelectedVoice,
        setRecognitionLang: handleSetRecognitionLang,
        toggleListening,
        speak,
        stopSpeaking,
      }}
    >
      {children}

      {/* Global Voice Overlay */}
      {(isListening || isProcessing) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-base/80 backdrop-blur-md border border-line p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in duration-300 pointer-events-auto max-w-[90%] sm:max-w-[400px]">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 
              ${isProcessing ? "bg-success scale-90" : "bg-danger animate-pulse scale-110"}`}
            >
              {isProcessing ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-ghost uppercase tracking-[2px] mb-2">
                {isProcessing ? "Processing Command" : "Listening..."}
              </p>
              <p className="text-[20px] text-fg font-medium italic leading-relaxed">
                {transcript || "Speak now..."}
              </p>
            </div>
            {!isProcessing && (
              <button
                onClick={toggleListening}
                className="mt-4 px-6 py-2 bg-elevated border border-line rounded-full text-[12px] font-semibold text-fg hover:bg-base transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </VoiceContext.Provider>
  );
}

export const useVoice = () => useContext(VoiceContext);
