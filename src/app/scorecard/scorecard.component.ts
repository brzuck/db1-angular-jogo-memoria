import { Component, Input, OnInit } from '@angular/core';
import { Rank } from 'src/models/rank';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css'],
})
export class ScorecardComponent implements OnInit {
  @Input() rankList: Rank[] = [];

  displayedColumns: string[] = ['position', 'name', 'rounds'];

  constructor() {}

  ngOnInit(): void {}
}
