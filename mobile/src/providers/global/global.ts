import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  AlertController,
  Events
} from 'ionic-angular';
import {
  Network
} from '@ionic-native/network';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  public selectedProducts: any = [];
  public category_title = '';
  public searchPage_title = 'Search';
  public data: any = [];
  public count: number = 0;
  previousStatus;

  constructor(public http: HttpClient,
    public network: Network,
    public eventCtrl: Events) {
    console.log('Hello GlobalProvider Provider');
    this.previousStatus = ConnectionStatusEnum.Online;
    if (localStorage.storeSelected == undefined) {
      localStorage.storeSelected = JSON.stringify([]);
    }else{
      this.selectedProducts = this.getSelected();
    }
  }

  public getSelected() { 
    this.selectedProducts = JSON.parse(localStorage.storeSelected); 
    console.log(" this.selectedProducts ",  this.selectedProducts );
  }

  public addSelected(data) { 
    var storeSelected = JSON.parse(localStorage.storeSelected);
    storeSelected.push(data);
    localStorage.storeSelected = JSON.stringify(storeSelected);
  }

  public replaceSelected(storeSelected) {  
    localStorage.storeSelected = JSON.stringify(storeSelected);
  }

  public clearSelected() {  
    localStorage.storeSelected = JSON.stringify([]);
  }


  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.eventCtrl.publish('network:offline');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        this.eventCtrl.publish('network:online');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }
}