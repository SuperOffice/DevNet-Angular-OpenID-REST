import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Person } from '../person/person.interface';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  private selectedPersonId;
  private selectedPerson: Person;

  constructor(private personSvc: PersonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.personSvc.getMyPerson().subscribe(person => {
      // first get the person id
      this.selectedPersonId = person[0].ColumnData.personId.DisplayValue;
      // then get the person entity
      this.personSvc.getPerson(this.selectedPersonId).subscribe( personResult => {
        this.selectedPerson = personResult;
      });
    });
  }
}