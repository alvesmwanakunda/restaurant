import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';
import { PromotionsService } from '../shared/services/promotions.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { PromotionInterface } from '../shared/interfaces/promotion.interface';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { TypesList } from '../shared/class/typesList';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Criteres } from '../shared/class/critere';
import { MatRadioChange } from '@angular/material/radio'; 




@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nom', 'programation', 'envoi', 'cible', 'type','montant', 'activation','payement','statut'];
  dataSource = new MatTableDataSource<PromotionInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('select') select: MatSelect;

  entreprise:any;
  promotions:any=[];
  filterFormGroup=new FormGroup({
    fromDate: new FormControl(),
  });
  get fromDate() {return this.filterFormGroup.get('fromDate').value;}
  pipe:DatePipe;
  listType=[];
  listCritere=[];
  isType:boolean=false;
  master_checked:boolean=false;
  master_indeterminate:boolean=false;
  globalFilter = '';
  listFilterType:any=[];
  filterTypes='';
  filteredValues = {
    nom: '', programmation: '', envoi: '',
    cible: '', type:'',montant:'', activation:'', payement:'',statut:''
  };
  critereFilter = new FormControl();



  constructor(
    public dialog:MatDialog,
    private promotionService: PromotionsService,
    private entrepriseService: EntrepriseService,
    public types: TypesList,
    public criteres: Criteres
    ) {
      this.pipe = new DatePipe('fr');
      this.listType = this.types.listTypes;
      this.listCritere = this.criteres.listCriteres;

     }

  ngOnInit(): void {

    /*this.critereFilter.valueChanges.subscribe((critereFilterValue)=>{
      console.log("ici", critereFilterValue);
      this.filteredValues['activation'] = critereFilterValue;
      console.log("ici 1", this.filteredValues);
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      console.log('DataSource', this.dataSource.filter);
    });*/

    //this.dataSource.filterPredicate = this.filterDateEnvoi();
    //this.dataSource.filterPredicate = this.filterByType();
  }

  openDialog(id){
    const dialogRef = this.dialog.open(DetailPromotionComponent,{width:'70%',height:'80',data:{idPromotion:id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  ngAfterViewInit() {
    this.getEntreprise();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Promotion par page";
  }

  getEntreprise(){

     this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
       try {
            this.entreprise = res.body;
            if(this.entreprise){
              this.getAllPromotion(this.entreprise._id);
            }
       } catch (error) {
         console.log("Erreur", error);
       }
     })
  }

  getAllPromotion(idEntreprise){
    this.promotionService.listPromotions(idEntreprise).subscribe((res:any)=>{
      try {
            this.promotions = res.message;
            this.dataSource.data = this.promotions.map((data)=>({

              id:data._id,
              nom:data.nom,
              jours:data.jours,
              heure:data.heure,
              cible:data.cible,
              type:data.types,
              critere:data.critere,
              dateEnvoie:data.dateEnvoie,
            })) as PromotionInterface[]
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  applyFilterCritere(filtervalue: string) {
     console.log("Event", filtervalue);
     const filterValue = filtervalue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  applyFilterCible(filtervalue: string) {
    console.log("Cible", filtervalue);
    const filterValue = filtervalue.trim().toLowerCase();
     this.dataSource.filter = filterValue;
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
 }

  changeRadioAction(event: MatRadioChange){
    this.applyFilterCritere(event.value);
  }

  changeRadioActionCible(event: MatRadioChange){
    this.applyFilterCible(event.value);
  }

  applyFilterDate(event:Event){
    console.log("Event", event);
    this.dataSource.filterPredicate = (data, filter):boolean =>{
      if(this.fromDate){
        let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
        let dateenvoi = new Date(data.dateEnvoie);
        console.log("Suis ici", dateenvoi);
        return dateenvoi >= fromdate;
      }
      return true;
    }
    this.dataSource.filter = ''+Math.random();  
  }
  

  /*applyFilter(filter) {
      console.log("Date", this.globalFilter);
      this.globalFilter = filter;
      //this.dataSource.filter = ''+Math.random();
      this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  filterDateEnvoi(){

   let filterDate=(data, filter):boolean =>{

      this.globalFilter = this.fromDate;
      
      if(this.globalFilter){
        let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
        let dateenvoi = new Date(data.dateEnvoie);
        console.log("Suis ici", dateenvoi);
        return dateenvoi >= fromdate;
      }
      return true;
   }
   return filterDate;
  }*/

  /*filterByType(){
    let filterType = (data, filter):boolean =>{

      this.dateFilter = this.listFilterType;
      
      if(this.listFilterType.length>=1){
        console.log("Suis ici",  this.listFilterType);
       this.listFilterType.forEach(element => {
         console.log("element", data.type);
         console.log("element 1", [element.nom]);
        return data.type==[element.nom];  
        });
      }
      return true;
    }

    return filterType;
  }*/

  master_change(){
    for(let value of Object.values(this.listType)){
      value.checked = this.master_checked;
      console.log("Valeur", value);
      if(value.checked){
        this.listFilterType.push(value);
        console.log("List all selected", this.listFilterType);
      }
      else{
        this.listFilterType = this.listFilterType.filter((item)=> item.checked!=false); 
        console.log("List all deselected", this.listFilterType);
      }
      
      
    }
  }

  list_change(){
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.listType)) {
      if(value.checked){
          this.listFilterType.push(value);
          this.listFilterType = this.listFilterType.filter((item,index)=> this.listFilterType.indexOf(item)===index);
          //console.log("Change list 1", this.listFilterType);
          checked_count++;
      }else if(!value.checked){
        this.listFilterType = this.listFilterType.filter((item)=> item.checked!=false); 
        //console.log("Change list 2", this.listFilterType);
      }
     
    }
    if(checked_count>0 && checked_count<this.listType.length){
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
      //console.log("ICI 1");
    }else if(checked_count == this.listType.length){
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
      //console.log("ICI 2");
    }else{
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
      this.listFilterType = this.listFilterType.filter((item)=> item.checked!=false);      
      //console.log("ICI 3", this.listFilterType);
    }
  }



  
}



