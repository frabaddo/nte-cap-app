import { Component } from '@angular/core';
import { BagService } from '../bag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-selection',
  templateUrl: './token-selection.page.html',
  styleUrls: ['./token-selection.page.scss'],
})
export class TokenSelectionPage {

  tokenToExtract=0;

  constructor( 
    public bag : BagService,
    private router : Router
  ) {}

  Extract(){
    if(this.tokenToExtract>0){
      this.bag.extractTokens(this.tokenToExtract);
      this.router.navigate(["/bag/result"]);
    }
  }

  goBack(){
    this.bag.cleanBag();
    this.router.navigate(["/bag/insert-token"]);
  }

  doRefresh(event) {
    this.router.navigate(['/bag/insert-token'],{ queryParams: { refresh: true } }).then(()=>{
      this.bag.cleanBag();
      event.target.complete();
    });
  }

}