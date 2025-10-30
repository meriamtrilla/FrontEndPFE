// src/app/services/voice-recognition.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition: any; // Holds the speech recognition instance
  isListening = false; // Tracks the listening state
  transcript = ''; // Holds the final transcript
  interimTranscript = ''; // Holds the interim transcript
  currentLang = 'fr-FR'; // Langue actuelle de reconnaissance

  constructor() {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'fr-FR';
      this.recognition.continuous = true; // Keep listening continuously
      this.recognition.interimResults = true; // Get interim results
      this.initializeListeners();
    } else {
      console.error('Speech recognition is not supported in this browser.');
    }
  }

  // Initializes recognition listeners
  private initializeListeners(): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event: any) => {
      let interim = '';
      this.transcript = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          this.transcript += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      this.interimTranscript = interim.trim();
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended.');
      this.isListening = false;
    };
  }

  // Détecte la langue du texte et ajuste `recognition.lang` si nécessaire
  private detectLanguage(text: string): void {
    // Simple logique pour détecter la langue (anglais ou français)
    const isEnglish = /[a-zA-Z]/.test(text);
    const detectedLang = isEnglish ? 'en-US' : 'fr-FR';

    if (detectedLang !== this.currentLang) {
      console.log(`Langue détectée : ${detectedLang}`);
      this.currentLang = detectedLang;
      this.recognition.lang = detectedLang;

      // Redémarre la reconnaissance pour appliquer la nouvelle langue
      if (this.isListening) {
        this.stopListening();
        this.startListening();
      }
    }
  }
  // Starts listening
  startListening(): void {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      console.log('Listening started...');
    }
  }

  // Stops listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      console.log('Listening stopped...');
    }
  }

  // Getters for transcript and interim results
  getFinalTranscript(): string {
    return this.transcript;
  }

  getInterimTranscript(): string {
    return this.interimTranscript;
  }
}
