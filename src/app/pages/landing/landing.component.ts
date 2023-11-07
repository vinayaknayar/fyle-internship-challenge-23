import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  username: string = '';
  userdetails: object = {};
  isLoading: boolean = true;
  error: boolean = false;
  start: boolean = false;
  repos: { [key: string]: any } = {};
  repoKeys: string[] = [];
  totalrepoKeys: string[] = [];
  pageNumbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1); 
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Check if there's a username in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      // If a username is found, fetch user and repos data
      this.username = storedUsername;
      this.fetchUserData(this.username);
      this.fetchUserRepos(this.username);
    } else {
      this.isLoading = false;
      this.start = true;
    }
      
  }

  currentPage: number = 0;
  itemsPerPage: number = 10;


  goToPage(pageNumber: number) {
    this.currentPage = pageNumber - 1;
    this.repoKeys = this.getSliceRepoKeys();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.repoKeys = this.getSliceRepoKeys();
    }
  }

  nextPage() {
    const totalItems = Object.keys(this.repos).length;
    const maxPages = Math.ceil(totalItems / this.itemsPerPage);

    if (this.currentPage < maxPages - 1) {
      this.currentPage++;
      this.repoKeys = this.getSliceRepoKeys();
    }
  }

  updatePageNumbers() {
    const totalItems = Object.keys(this.repos).length;
    const maxPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: maxPages }, (_, i) => i + 1);
    this.currentPage = 0;
  }

  getSliceRepoKeys() {
    return this.totalrepoKeys.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
  }

  getReposLength() {
    return Object.keys(this.repos).length;
  }

  submit() {
    localStorage.setItem('username', this.username);

    this.start = false
    this.fetchUserData(this.username);
    this.fetchUserRepos(this.username);
  }

  private fetchUserData(username: string) {
    this.isLoading = true; // Set isLoading to true when data loading starts

    this.apiService.getUser(username).subscribe(
      (data: any) => {
        // Process the data
        this.userdetails = {
          name: data.name,
          username: data.login,
          bio: data.bio,
          avatar: data.avatar_url,
          location: data.location,
          twitter: data.twitter_username,
        };
        console.log(this.userdetails);
        this.error = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
        this.error = true;
      }
    );
  }

  private fetchUserRepos(username: string) {
    this.apiService.getRepos(username).subscribe(
      (data: any) => {
        // Process the data
        this.repos = data;
        this.updatePageNumbers(); // Update the page numbers when fetching new data
        this.totalrepoKeys = Object.keys(this.repos); // Populate totalrepoKeys
        console.log(this.repos);
        this.repoKeys = this.totalrepoKeys.slice(0, this.itemsPerPage); // Populate repoKeys
        this.isLoading = false; 
        this.error = false;
      },
      (error) => {
        console.error('Error fetching user repos:', error);
        this.isLoading = false;
        this.error = true;
      }
    );
  }
}  