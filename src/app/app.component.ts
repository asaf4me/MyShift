import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shifts';
  public isAdd: boolean = false;
  public isMainWindow: boolean = true;
  public isEddit: boolean = false;
  public isGenerate: boolean = false;

  toggleComponent(e)
  {
    if(e === 0) // Home button clicked
    {
      this.isMainWindow = true;
      this.isAdd = false;
      this.isEddit = false;
      this.isGenerate = false;
    }
    else if(e === 1) // Add shift button clicked
    {
      this.isAdd = true;
      this.isMainWindow = false;
      this.isEddit = false;
      this.isGenerate = false;
    }
    else if(e === 2) // Edit shift button clicked
    {
      this.isAdd = false;
      this.isMainWindow = false;
      this.isEddit = true;
      this.isGenerate = false;
    }
    else if (e === 3) // Edit shift button clicked
    {
      this.isAdd = false;
      this.isMainWindow = false;
      this.isEddit = false;
      this.isGenerate = true;
    }
  }
  
}
