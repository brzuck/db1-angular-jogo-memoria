import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/models/card';
import { Player } from 'src/models/player';
import { Rank } from 'src/models/rank';
import { DialogPlayerNameComponent } from './dialog-player-name/dialog-player-name.component';

const PAIRS_AMOUNT = 10;
const CARD_TURN_DELAY_IN_MS = 2000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  waitingForDelay: boolean = false;

  pairs: number[] = Array.from(Array(PAIRS_AMOUNT)).map((_, index) => index);
  cards: Card[] = [];

  player: Player;
  ranking: Rank[] = [];

  round: number;
  firstCardSelectedIndex: number | undefined;
  secondCardSelectedIndex: number | undefined;

  constructor(public dialog: MatDialog) {
    this.setInitialParams();
  }

  ngOnInit(): void {
    this.openDialog();
  }

  private setInitialParams() {
    this.round = 1;
    this.firstCardSelectedIndex = undefined;
    this.secondCardSelectedIndex = undefined;
  }

  private generateCardsList() {
    const possibleValues = [...this.pairs, ...this.pairs];

    this.cards = possibleValues.map((value) => {
      return {
        value: value.toString(),
        selected: false,
        visible: false,
      } as Card;
    });
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogPlayerNameComponent, {
      width: '350px',
      data: <Player>{},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Player) => {
      if (result) {
        this.player = result;

        this.newRound();
      }
    });
  }

  newRound() {
    this.setInitialParams();

    this.generateCardsList();
    this.shuffleArray(this.cards);
  }

  async onClickCard(_selectedCardValue: number, selectedCardIndex: number) {
    if (this.cards[selectedCardIndex].visible || this.waitingForDelay) {
      return;
    }

    this.tickSelectedCard(selectedCardIndex);

    if (this.firstCardSelectedIndex != undefined && this.secondCardSelectedIndex != undefined) {
      await this.turnCardsIfNoMatch();

      // Check if game is done
      if (this.cards.every((card) => card.visible)) {
        // Delay before finishing the game, so the last card will be visible
        await this.delay(100);

        this.ranking.push({ player: this.player, rounds: this.round } as Rank);
        this.ranking = [...this.ranking.sort((a, b) => a.rounds - b.rounds)];

        if (confirm(`Parabéns, você venceu em ${this.round} rodadas! Clique em OK para iniciar uma nova rodada.`)) {
          this.newRound();
        }

        return;
      }

      // Prepare for next round
      this.round++;
      this.firstCardSelectedIndex = undefined;
      this.secondCardSelectedIndex = undefined;
    }
  }

  private tickSelectedCard(selectedCardIndex: number) {
    if (this.firstCardSelectedIndex == undefined) {
      this.firstCardSelectedIndex = selectedCardIndex;

      this.cards[this.firstCardSelectedIndex].selected = true;
      this.cards[this.firstCardSelectedIndex].visible = true;
    } else {
      this.secondCardSelectedIndex = selectedCardIndex;

      this.cards[this.secondCardSelectedIndex].selected = true;
      this.cards[this.secondCardSelectedIndex].visible = true;
    }
  }

  private async turnCardsIfNoMatch() {
    if (this.cards[this.firstCardSelectedIndex].value !== this.cards[this.secondCardSelectedIndex].value) {
      this.cards[this.firstCardSelectedIndex].visible = false;
      this.cards[this.secondCardSelectedIndex].visible = false;

      // Delay before turning the cards around, so player can see what the card was
      this.waitingForDelay = true;
      await this.delay(CARD_TURN_DELAY_IN_MS).finally(() => (this.waitingForDelay = false));
    }

    // Always unselect both cards after second selection
    this.cards[this.firstCardSelectedIndex].selected = false;
    this.cards[this.secondCardSelectedIndex].selected = false;
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
