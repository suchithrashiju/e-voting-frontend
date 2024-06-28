import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
interface Candidate {
  candidate_name: string;
  party: string;
  photo_url: string;
  symbol: string;
  election_year: string;
  total_votes: number;
}
@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss'],
})
export class ShowResultComponent {
  candidates: Candidate[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchVoteResult();
  }
  fetchVoteResult() {
    this.adminService.getVoteList().subscribe(
      (response: any) => {
        this.candidates = response.results;
        console.log(this.candidates);
      },
      (error: any) => {
        console.error('Failed to fetch candidates', error);
      }
    );
  }
}
