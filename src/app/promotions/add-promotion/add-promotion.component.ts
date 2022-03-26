import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

  isLinear = true;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl:['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl:['',Validators.required]
    })
  }

}
