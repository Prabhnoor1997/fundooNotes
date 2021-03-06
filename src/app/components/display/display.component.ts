import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import {NotesSerivesService} from '../../services/notes-serives.service';
import {Notes} from '../../models/notesModel'
import { DataService } from "../../services/data.service";
import {MatDialog} from '@angular/material/dialog';
import {DialogueComponent} from '../note-edit-box/note-edit-box.component';
import {Labels} from '../../models/labels'
//import { throwMatDuplicatedDrawerError } from '@angular/material';
import {Events} from '../../models/eventModel'
import { SnackbarService } from 'src/app/services/snack-bar.service';
import { HostListener } from "@angular/core";
import { SELECT_PANEL_VIEWPORT_PADDING } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import {Router} from '@angular/router'
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public show:boolean = false;
  //public notes:Notes[];
  @Output() eventCarrierDisplay = new EventEmitter<Events>();
  
  public buttonName:any = 'Show';
  public message:string;
  public noteSelected;
  public dispalyIconTray: string="hidden";
  public hoverDiv:any 
  public hoverLabel:any
  screenWidth:number=1300;
  screenHeight:number;
  event:Events;
  text : any = " "
  labels:Labels[];
  reminders:any;
  isPined:boolean;
  pinnedlogoPath:string="../assets/icon/Pinned.png"
  UnpinnedPath:string="../assets/icon/Unpinned.png"
  pinPath:string="../assets/icon/Unpinned.png";
  componentName:string="notes"
  displayValue:string="flex";
  widthCard:string="250px";
  questionsArray=[];
  @Input() pinnedNotes:Notes[];
  @Input() searchedNotes:Notes[];
  @Input() unPinned:Notes[];
  @Input() component:string;
  constructor(private noteService: NotesSerivesService,private dataService:DataService,
    private dialog:MatDialog,private snackbar:SnackbarService,private routing:Router) {
  
   }

  ngOnInit() {
    
    
    //this.displayNotes();
    this.dataService.currentMessage.subscribe(message => {
      if(message=='grid View')
      { 
        this.setView();
      
      }
      //this.checkNoteAdded();
      //if(message=="searchIn"){
       // console.log(this.searchedNotes);
        //this.componentName=this.component;
        //this.setPinUnpinNotes(this.searchedNotes);

      //}
      //if(message=="searchOut")
      {
        //console.log(this.searchedNotes)
        //this.setPinUnpinNotes(this.searchedNotes)
        //this.componentName="notes";
      }
     })
     
    

  }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {

     this.screenHeight = window.innerHeight;
     this.screenWidth = window.innerWidth;
     this.setView();
  }
  setView(){
    if(this.displayValue=="flex")
    {
      this.displayValue="table-cell";
      this.widthCard=this.screenWidth/2.4+"px";
  }
    else
    {
    this.displayValue="flex";
      this.widthCard="250px"
  }

  }
  getNotes(note) {
      this.noteSelected=note;
      //console.log(this.noteSelected);
        return note;
  }

 displayNotes(){
  this.event={
    "purpose":"refresh",
  }


  this.eventCarrierDisplay.emit(this.event)
 }

  recieveMessageFromIconTray($event,id){
    console.log($event,id+"------",this.pinnedNotes)

    if($event.purpose=="delete" ){
      let data={
        "noteIdList":[id],
        "isDeleted":true
      }

      let url="trashNotes"
      this.noteService.postJson(url,data).subscribe(
        (data:any)=>{
          console.log("deleted Note");
          this.displayNotes();
        }
      )
    }

    if($event.purpose=="color"){
      console.log("inside color change display")
      //if(this.noteSelected!=null)
      {
        console.log("asasdsd");
        let data={
          "color":$event.value,
          "noteIdList": [id]
        }
        
        let url="changesColorNotes"
        console.log(data);
        this.noteService.postJson(url,data).subscribe(
          (data:any)=>
        {
          console.log(data);
          this.displayNotes();
         
        })
      }
    }

    if($event.purpose=="archive"){
      let data={
        "noteIdList": [id],
        "isArchived":true
      }

      let url="archiveNotes"

      this.noteService.postJson(url,data).subscribe(
        (data:any)=>
      {
        console.log(data);
        this.displayNotes();
       
      })

    }

    if($event.purpose=="addLabel"){
      let data={
        "noteIdList": id,
        "labelId":$event.value.label.id
      }
      console.log(data);
      this.noteService.labelAttach(data).subscribe((data:any)=>{
        //console.log(data);
        this.displayNotes();
      });
    }
    if($event.purpose=="reminder"){
      let data={
        "noteIdList": [id],
        "reminder":[$event.value]
      }
      console.log("display insdie reminder",data);
      this.noteService.addUpdateReminder(data).subscribe((data:any)=>{
        //console.log(data);
        this.dataService.changeMessage("Note Edited")
      });
    }

  }

  passNote()
  {
    
  }
  
  hoverIn(note){
    this.hoverDiv={
      "noteid":note.id
    }
    //console.log("hovering on---",note);

  }
  hoverOut(note){ 
    //console.log("hovering out of " , note)
    this.hoverDiv={}

  }
  isFootVisible(note){
    //console.log(note,this.hoverDiv.noteid)
    if(note != undefined && this.hoverDiv != undefined)
    if(note.id==this.hoverDiv.noteid)
    return true;
    else
    return false;

  }
  openDialog(note)
  {
    console.log("the value of note is ", note.id);
    let dialogref = this.dialog.open(DialogueComponent,
      {
        data : {
          title : note.title ,
          note : note.description,
          id : note.id,
          color:note.color
          
        }
      });
    dialogref.afterClosed().subscribe(result=> {
      //console.log("dialog result ", result);
    })
  }
  getLabels(){
    //console.log("getting labels",this.labels)
    this.noteService.getLabel().subscribe((data:any)=>{
      //console.log(data);
      this.labels=data.data.details;
     //console.log(this.labels);
      
    })
  }

  removeLabel(label,value){
    let data={
      "noteIdList": value.id,
      "labelId":label.id
    }
    console.log(data);
    this.noteService.labelDettach(data).subscribe((data:any)=>{
      //console.log(data);
      this.displayNotes();
    });

  }
  hoverOnLabel(label){
    //console.log(label)
      this.hoverLabel=label.id;
  }
  hoverOutLabel(){
    this.hoverLabel="";
  }
  labelHoverCheck(label,value){
      if(this.hoverLabel==label.id && this.hoverDiv.noteid==value.id)
        return true;
        else
        return false;
  }

  pinAssign(value)
  {
    if(value.isPined)
      return this.pinnedlogoPath
      else
      return this.UnpinnedPath
  }
  togglePin(value){
    console.log("sdsds");
    if(this.pinnedlogoPath==this.pinPath){
      console.log("logo compared to pinned")
      this.pinPath=this.UnpinnedPath;
     
    }
    else{
      console.log("logo compared to Unpinned")
      this.pinPath==this.pinnedlogoPath;
      
    }
    this.isPined=!this.isPined
    this.pinNote(this.isPined,value.id)
}


pinNote(pinedValue,id){
  
  let data={
    "noteIdList": [id],
    "isPined":pinedValue
  }
  console.log(data)
  let url="pinUnpinNotes"

  this.noteService.postJson(url,data).subscribe(
    (data:any)=>
  {
    console.log(data);
    this.displayNotes();
   
  })

}
componentNotesOrlabels(){
  //console.log(this.component)
  if(this.component=="notes" || this.component=="label")
  {
    
      return true
    }
  
  else return false;
}
componentSearchOrReminder(){
  //console.log("inside search",this.component,this.searchedNotes)
  if(this.component=="search" || this.component=="reminder")
  {
     
      return true
    }
  
  else return false;
}
removeReminder(note) {
  console.log(note);
  this.noteService.deleteReminder(
    {
      "noteIdList": [note.id]
    })
    .subscribe(
      (data) => {
        this.snackbar.open('Reminder Deleted')
        this.displayNotes();
      },
      error => {
        this.snackbar.open('Error deleting reminder', 'Retry')
      })
}

openCollaborator(value){
  let dialogref = this.dialog.open(CollaboratorComponent,{
    data : {
      note:value     
    }
  });
  dialogref.afterClosed().subscribe(result=> {
    //console.log("dialog result ", result);
  })
}
navigateToReminders(){
  this.routing.navigate(['reminder'])
}
navigateToLabel(label){
  console.log("navigating to ",label)
  this.routing.navigateByUrl('labels/'+label.label)
}

}