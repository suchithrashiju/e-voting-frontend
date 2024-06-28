import { CommonService } from 'src/app/common.service';
import { Component } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  selectedCandidate: number | null = null;
  candidates: any | null;
  hasVoted: boolean = false;
  errorMessage: string | null = null;
  aadharValid = false;

  constructor(
    private voterService: VoterService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.voterService.checkVotingStatus().subscribe(
      (response: any) => {
        this.hasVoted = response.status;
        if (!this.hasVoted) {
          this.fetchCandidates();
        }
      },
      (error) => {
        console.error('Error checking voting status', error);
        this.errorMessage = 'Error checking voting status. Please try again.';
      }
    );
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
  aadharValidated(isValid: boolean) {
    this.aadharValid = isValid;
    if (!isValid) {
      this.errorMessage = 'Aadhar number is not exists.';
    } else {
      this.errorMessage = '';
    }
  }
  submitVote(): void {
    if (!this.aadharValid) {
      this.errorMessage = 'Please validate your Aadhar number before voting.';
      return;
    }
    if (this.selectedCandidate) {
      const voterDet = JSON.parse(localStorage.getItem('user') || '{}');
      const voteData = {
        candidate_id: this.selectedCandidate,
        voter_id: voterDet.id,
      };

      this.voterService.submitVote(voteData).subscribe(
        (response: any) => {
          alert('Thank you for Voting!');
          this.router.navigate(['/voter/dashboard']);
        },
        (error: any) => {
          alert(error);
          this.router.navigate(['/voter/dashboard']);

          console.error('Error submitting vote', error);
        }
      );
    }
  }
}
