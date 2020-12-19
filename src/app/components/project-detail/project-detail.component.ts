import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'], 
  providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {
  public idProject: number;
  public project: Project;
  constructor(
    private route:ActivatedRoute, 
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.idProject = +params['id'];

      this.getDataProject();
   });
    
    
  }

  getDataProject(){

this.projectService.getProjectsExpandedById(this.idProject).subscribe(resp => {
this.project = resp;
console.log(this.project);
}, 
(err) => {
  console.log(err);
});
  }

}
