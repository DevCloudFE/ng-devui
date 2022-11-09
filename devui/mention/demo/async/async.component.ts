import { Component } from '@angular/core';

@Component({
  selector: 'd-mention-async',
  templateUrl: './async.component.html',
})
export class AsyncComponent {
  loading = true;
  suggestions = [];

  onSearchChange({ value }) {
    this.loading = true;
    this.fetchSuggestions(value, (suggestions) => {
      console.log(suggestions);
      this.suggestions = suggestions;
      this.loading = false;
    });
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#'];
    setTimeout(() => {
      return callback(users.filter((item) => item.indexOf(value) !== -1));
    }, 1000);
  }
}
