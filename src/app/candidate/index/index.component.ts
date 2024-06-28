import { Component } from '@angular/core';
import { CommonService } from 'src/app/common.service';

interface Candidate {
  name: string;
  party: string;
  description: string;
  photo_url: string;
  symbol_url: string;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  candidates: Candidate[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates() {
    this.commonService.getCandidates().subscribe(
      (response: any[]) => {
        this.candidates = response;
      },
      (error) => {
        console.error('Failed to fetch candidates', error);
      }
    );
  }
}
