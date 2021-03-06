import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashComponent } from './trash.component';
import { MyMaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotesSerivesService } from 'src/app/services/notes-serives.service';

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashComponent ],
      imports:[MyMaterialModule ,FormsModule, ReactiveFormsModule ,HttpClientTestingModule

      ],
      providers:[NotesSerivesService,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
