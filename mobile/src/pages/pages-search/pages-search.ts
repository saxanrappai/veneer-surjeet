import {
  HttpService
} from './../../services/HttpService';
import {
  ToastService
} from './../../services/toast-service';
import {
  ListViewAppearanceAnimationService
} from './../../services/list-view-appearance-animation-service';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Content
} from 'ionic-angular';
import {
  GlobalProvider
} from '../../providers/global/global';
import {
  Observable
} from 'rxjs';

/**
 * Generated class for the PagesSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-search',
  templateUrl: 'pages-search.html',
})
export class PagesSearchPage {

  animateItems: any = [];
  animateClass: any;
  productsList: any;
  data: any = [];

  show: boolean = false;
  products: Observable < any > ;
  params: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastService,
    public httpService: HttpService, private platform: Platform,
    public global: GlobalProvider) {


    /*
        this.products = this.httpService.getallproducts();
        this.products
          .subscribe(data => {


            console.log('cat list:', data);
            // this.toastCtrl.dismissLoader();

            this.productsList = data;
            this.params.data = data.data;
            //this.params.events = this.getEventsForTheme();
            //   console.log('cat list:' + JSON.stringify(this.params.data));
            console.log(">>>>>>>>>> this.params", this.params);
     
             this.show = true; 
          });
    */


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(" testing... working.... ");

    this.toastCtrl.showLoader();
    this.products = this.httpService.getallproducts();
    this.products
      .subscribe(result => {
        this.toastCtrl.dismissLoader();
        this.animateItems = [];
        this.data = result.data;

        for (let i = 0; i < this.data.length; i++) {
          let that = this;
          setTimeout(function () {
            // that.animateItems[i] = that.data[i];
            that.animateItems.push(that.data[i]);
          }, 200 * i);
        }
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesSearchPage');
  }

  search(search ? : any) {
    console.log("searching...", search.target.value);
    let dataSearch = [];
    dataSearch.length=0;
    if (search.target.value == '') {
      this.animateItems = this.data;
    } else {





      /*
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];

         if (element.title.toLowerCase().includes(search.target.value.toLowerCase())) {
          dataSearch.push(element);
        }


        if (index == (this.data.length - 1)) {
          this.animateItems = dataSearch;
        }
      }
      */
    }

    // this.data.forEach(element => {
    //   if (element.title.toLowerCase().includes(search.target.value.toLowerCase())) {
    //     dataSearch.push(element);
    //   }
    // });
    // this.animateItems = dataSearch;
  }

  onCancelSearch() {
    this.animateItems = this.data;
  }

  
  onClickShowProductCart(paramsData){

    console.log("paramsData",paramsData);
  
    this.navCtrl.push("ProductDetailsPage", {
      'product': JSON.stringify(paramsData)
    });  
  }

}