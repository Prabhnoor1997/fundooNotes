import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {Notes} from '../../models/notesModel'
import {NotesSerivesService} from '../../services/notes-serives.service'
import {Router} from '@angular/router'
import { DataService } from "../../services/data.service";




@Component({
  selector: 'app-note-field',
  templateUrl: './note-field.component.html',
  styleUrls: ['./note-field.component.scss']
})
export class NoteFieldComponent implements OnInit {
  save: Boolean
  note:string = "";
  title:string="";
  notes: Notes;
  id:string;
  notesArr : Notes[];
  message:string;
  color:string ="#ffffff";
  isArchived:boolean=false;
  isPined:boolean=false;
  showTit:boolean=false
  description:string="Take a Note..."
  pinnedlogoPath:string="../assets/icon/Pinned.png"
  UnpinnedPath:string="../assets/icon/Unpinned.png"
  pinPath:string="../assets/icon/Unpinned.png";
  constructor(private noteService: NotesSerivesService,private routing:Router,private dataService:DataService ) { }
  
  ngOnInit(){
    this.dataService.currentMessage.subscribe(message => this.message = message)
  }
  showTitle(){
    console.log("fdfsdf")
    this.showTit=true;
    this.description="Description"
  }

  togglePin(){
    console.log("sdsds");
    if(this.pinnedlogoPath==this.pinPath){
      console.log("logo compared to pinned")
      this.pinPath=this.UnpinnedPath;
      this.isPined=!this.isPined
    }
    
    else{
      console.log("logo compared to Unpinned")
      this.pinPath=this.pinnedlogoPath;
      this.isPined=!this.isPined
    }
    
  }

  // saveButtonClick($event) {
  //   this.save = $event
  //   // console.log($event);
  //   // console.log(this.note);
  //       if(this.save)
  //   {
      
  //     this.notes.description=this.note;
  //     this.saveNote(this.notes);

  //   }
  // }
  newMessage() {
    this.dataService.changeMessage("Note Added")
  }
  pinNote(){
  
    this.isPined=true;
  }
  saveNote(){
    this.showTit=false;
      this.description="Take a Note..."
    this.notes = {
      title:this.title,
      description:this.note ,
      color:this.color,
      isArchived:this.isArchived,  
      isPined:this.isPined 
    }

    let url="addNotes"
    this.noteService.postRequest(url,this.notes).subscribe(
      (data:any)=>
    {
      console.log(data);
      this.newMessage();
    
      this.color="#ffffff"
      this.note="";
      this.title="";
      
    },
    (err) => {
   
      
    })
    
    }
   
    recieveMessageFromIconTray($event){
      if($event.purpose=="color"){
        {
      
          this.color=$event.value;
          
      
         
        }
      }

      if($event.purpose=="archive"){
        console.log("archiving");
        this.isArchived=true;
        this.saveNote();
        
  
      }
    }

   
  }
  

  

