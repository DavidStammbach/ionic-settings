import {Component} from '@angular/core'

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'settings'
        }
    ]

    constructor() {
    }

}
