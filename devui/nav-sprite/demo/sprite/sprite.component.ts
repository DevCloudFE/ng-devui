import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'd-demo-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss'],
})
export class SpriteComponent {
  content = '' +
  `  # Getting Started
  Guides: How to use DevUI in your project
  ## 1. Create a project
  It is recommended to use @angular/cli to create your project.
  $ ng new New-Project
  ## 2. Installation
  Go to your project folder and use npm to install DevUI.
  ## 3. Import Modules
  BrowserModule BrowserAnimationsModule NgModule DevUIModule AppComponent.
  ## 4. Import Styles
  Add the devui style to the angular.json file.
  ## 5. Start Development and Debugging
  $ ng serve --open
  # DevUI Design
  ## Introduction
  DevUI Design allows developers to focus exclusively on thinking about.
  ## Purpose & Rules
  ### Design Resource
  DevUI Design provides comprehensive design principles, best practices, design resource documents.
  ### Who's using DevUI Design
DevUI Design provides comprehensive design principles, best practices, design resource documents.
  `;

  @ViewChild('navItemTemp') navItemTemp: TemplateRef<any>;

  mdInit = false;

  isNavMin = true;

  targetContainer = null;

  spriteOption = {
    top: '40%',
    left: '85%',
    zIndex: 10,
  };

  private navSpriteInstance;

  constructor(private ele: ElementRef) {}

  contentChange() {
    setTimeout(() => {
      if (this.navSpriteInstance) {
        this.navSpriteInstance.getNavData();
      }
    }, 500);
  }

  edit(item) {
    console.log(item);
  }

  afterNavInit(e) {
    this.navSpriteInstance = e;
  }

  afterEditorInit() {
    setTimeout(() => {
      this.mdInit = true;
    });
    this.targetContainer = this.ele.nativeElement.querySelector('.devui-md-view-container');
  }
}
