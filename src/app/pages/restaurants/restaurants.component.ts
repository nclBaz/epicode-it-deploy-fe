import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  constructor(
    private restSrv: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  restaurants: Restaurant[] = []
  restaurant!: Restaurant
  city!: string
  isLoading: boolean = false
  noCity: boolean = false
  resultNum!:number

  currentPage: number = 1
  restaurantsForPage: number = 10
  pages: number[] = []

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.city = res.city
    })

    this.getRestaurants()
  }

  getRestaurants() {
    this.isLoading = true

    this.restSrv.getRestaurants().subscribe((res: any) => {

      if (this.city) {
        this.noCity = true

        this.restaurants = res.filter((r: Restaurant) => r.city.toLowerCase() == this.city.toLowerCase())
        this.resultNum = this.restaurants.length

      } else {
        this.restaurants = res
      }
      
      this.paginate(this.restaurants, this.restaurantsForPage)
      this.isLoading = false
    })

  }

  searchRestaurantByCity() {
    this.router.navigate(['restaurants/' + this.city])
    this.pages = []
    this.getRestaurants()
  }

  paginate(restaurants: Restaurant[], restaurantsForPage: number) {
    for (let page = 0; page < Math.ceil(restaurants.length / restaurantsForPage); page++) {
      this.pages.push(page + 1)
    }

    let s = (this.currentPage - 1) * this.restaurantsForPage
    let e = this.restaurantsForPage * (this.currentPage)

    this.restaurants = this.restaurants.slice(s, e)
  }

  changePagination() {
    this.currentPage = 1
    this.pages = []
    this.getRestaurants()

  }

  setCurrentPage(i: number) {
    this.currentPage = this.pages[i]
    this.pages = []
    this.getRestaurants()
  }


}
