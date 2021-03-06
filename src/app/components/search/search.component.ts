import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service'
import { NotesSerivesService } from '../../services/notes-serives.service';
import { SearchPipe } from '../../search.pipe';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search:string
  result1:any;
  notes:any;
  searchText:any;
  message:any;
  searchNote:any;
  filterPipe: SearchPipe = new SearchPipe();
  filteredRecords:any;
  component='search';

  constructor(private dataService: DataService,private noteService:NotesSerivesService) { }

  ngOnInit() {
    this.dataService.eventObservable.subscribe(message => this.search = message)
    this.getNotes();
  }

  getNotes(){
    this.dataService.eventObservable.subscribe((searchText) => {
      this.searchText = searchText
    
    console.log('inside search bar c........',this.searchText);

    return this.noteService.allNotesList().subscribe((response: any) => {
      this.result1 = this.getFilter(response.data.data);
          this.notes = this.result1.reverse();
          this.filteredRecords=this.filterPipe.transform(this.notes,this.searchText);
          this.searchNote=this.filteredRecords;
          console.log("Serached notesssssssss==--", this.filteredRecords);
        }, (error) => {
          //console.log(error.statusText);
        });
      });
  }
  getFilter(result) {
    const pass = result.filter(function(result) {
      return (result.isDeleted == false && result.isArchived == false);
    });
    return pass;
  }
}
