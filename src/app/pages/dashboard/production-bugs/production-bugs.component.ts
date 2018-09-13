import { Component, OnInit } from '@angular/core';
import { JIRABugsService } from '../../../services/jira/jira-bugs.service';

@Component({
  selector: 'ege-production-bugs',
  templateUrl: './production-bugs.component.html',
  styleUrls: ['./production-bugs.component.scss'],
})
export class ProductionBugsComponent implements OnInit {
  bugs: any = {
    issues: [],
  };
  loading: Boolean = true;

  constructor(private jiraBugs: JIRABugsService) {}

  ngOnInit() {
    this.jiraBugs.getProductionBugs().subscribe((bugs) => {
      this.loading = false;
      this.bugs = bugs[0];
    });
  }
}
