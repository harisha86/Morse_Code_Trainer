import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MorseCode {
  [key: string]: string;
}

@Component({
  selector: 'morse-trainer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Morse Code Trainer</h2>
      
      <div>
        <button (click)="toggleMode()">
          {{ isLearningMode ? 'Switch to Practice' : 'Switch to Learning' }}
        </button>
      </div>

      <div *ngIf="isLearningMode">
        <h3>Learning Mode</h3>
        <div class="morse-table">
          <div *ngFor="let item of morseEntries">
            <span class="morse-char">{{ item[0] }}</span>: {{ item[1] }}
          </div>
        </div>
      </div>

      <div *ngIf="!isLearningMode" class="practice-area">
        <h3>Practice Mode</h3>
        <p>Current character: <span class="morse-char">{{ currentChar }}</span></p>
        <input
          type="text"
          [ngModel]="userInput"
          (ngModelChange)="checkAnswer($event)"
          placeholder="Enter morse code (use . and -)"
        >
        <p *ngIf="showResult" [class]="isCorrect ? 'success' : 'error'">
          {{ isCorrect ? 'Correct!' : 'Try again!' }}
        </p>
        <p>Score: {{ score }}</p>
        <button (click)="nextCharacter()">Next Character</button>
      </div>
    </div>
  `
})
export class App {
  morseCode: MorseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '0': '-----'
  };

  morseEntries = Object.entries(this.morseCode);
  isLearningMode = true;
  currentChar = 'A';
  userInput = '';
  showResult = false;
  isCorrect = false;
  score = 0;

  toggleMode() {
    this.isLearningMode = !this.isLearningMode;
    if (!this.isLearningMode) {
      this.nextCharacter();
    }
  }

  nextCharacter() {
    const characters = Object.keys(this.morseCode);
    this.currentChar = characters[Math.floor(Math.random() * characters.length)];
    this.userInput = '';
    this.showResult = false;
  }

  checkAnswer(input: string) {
    this.userInput = input;
    this.showResult = true;
    this.isCorrect = this.morseCode[this.currentChar] === input;
    if (this.isCorrect) {
      this.score += 1;
      setTimeout(() => this.nextCharacter(), 1000);
    }
  }
}

bootstrapApplication(App);