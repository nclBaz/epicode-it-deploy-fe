import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Review } from 'src/app/models/review';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant!:Restaurant
  reviews:Review[] = []

  constructor(
    private router:Router,
    private restSrv:RestaurantsService
  ) { }

  ngOnInit(): void {
    this.reviews = this.restaurant.reviews
  }

  goToRestaurantPage(id:number){
    this.restSrv.restId = String(id)
    this.router.navigate(['/restaurants/details/'+id])
  }

  valutation():string{
    let arrayValutation:number[] = []

    for(let val of this.reviews){
      arrayValutation.push(val.stars)
    }

    if(arrayValutation.length >0){
      let sum = arrayValutation.reduce((a:number, b:number) => {
        return a + b;
      });
  
      return (sum/arrayValutation.length).toPrecision(2)
    }else{
      return 'n.d.'
    }

  }

}
