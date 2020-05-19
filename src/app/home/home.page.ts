import { Component, OnInit } from '@angular/core';
import { BagService } from '../bag.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  whiteToExtract=1;

  blackToExtract=1;

  confusion=false;

  adrenalin=false;

  constructor( 
    public bag : BagService,
    private router : Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        if(params.refresh){
          this.blackToExtract=1;
          this.whiteToExtract=1;
          this.confusion=false;
          this.adrenalin=false;
        }
        else if(params.share){
          this.router.navigate(['/share-result'],{queryParams:{
            tokens:params.tokens,
            extracted:params.extracted,
            risk:params.risk
          }})
        }
      });
  }

  ionViewWillEnter(){
    this.bag.cleanBag();
  }

  preparebag(){
    if(this.whiteToExtract>0&&this.blackToExtract>0){
      this.bag.insertTokens(this.whiteToExtract,this.blackToExtract,this.confusion);
      if(this.adrenalin){
        this.bag.extractTokens(4);
        this.router.navigate(["/result"]);
      } 
      else this.router.navigate(["/token-selection"])
    }
  }

  increment(white){
    if(white)this.whiteToExtract++;
    else this.blackToExtract++;
  }

  decrement(white){
    if(white&&this.whiteToExtract>0)this.whiteToExtract--;
    else if(!white&&this.blackToExtract>0)this.blackToExtract--;
  }

  doRefresh(event) {
    this.bag.cleanBag();
    this.blackToExtract=1;
    this.whiteToExtract=1;
    this.confusion=false;
    this.adrenalin=false;
    event.target.complete();
  }
}
