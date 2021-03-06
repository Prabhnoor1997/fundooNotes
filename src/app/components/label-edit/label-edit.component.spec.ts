import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelEditComponent } from './label-edit.component';
import { MyMaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesSerivesService } from 'src/app/services/notes-serives.service';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
describe('LabelEditComponent', () => {
  let component: LabelEditComponent;
  let fixture: ComponentFixture<LabelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelEditComponent ],
      imports:[MyMaterialModule, RouterTestingModule,HttpClientTestingModule, FormsModule,
        ReactiveFormsModule,MatCheckboxModule,BrowserAnimationsModule],
        providers: [ NotesSerivesService,
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: MatDialog, useValue: {} }
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
