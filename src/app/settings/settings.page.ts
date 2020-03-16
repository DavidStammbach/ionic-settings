import {Component} from '@angular/core'
import {Platform} from '@ionic/angular'
import {NativeStorage} from '@ionic-native/native-storage/ngx'

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

    defaultSettings = [{'Benachrichtigungen erhalten': true}, {'Hintergrundfarbe blau': false}]
    settings = []

    constructor(
        private platform: Platform,
        private nativeStorage: NativeStorage
    ) {
        this.loadSettings()
    }

    loadSettings() {
        for (const setting of this.defaultSettings) {
            this.getNativeStorageSettingValue(Object.keys(setting)[0], Object.values(setting)[0]).then((data) => {
                const settingItem = {[Object.keys(setting)[0]]: data}
                this.settings.push(settingItem)
                this.handleSetting(Object.keys(setting)[0], data)
            })
        }
    }

    getNativeStorageSettingValue(settingName: string, checked: boolean) {
        return new Promise<any>((resolve, reject) => {
            this.nativeStorage.getItem(settingName).then((data) => {
                    if (data !== null) {
                        resolve(data)
                    }
                }
            ).catch(() => {
                this.setDefaultSetting(settingName, checked)
            })
        })
    }

    setDefaultSetting(settingName: string, checked: boolean) {
        const settingItem = {[settingName]: checked}
        this.settings.push(settingItem)
        if (this.platform.is('cordova')) {
            this.nativeStorage.setItem(settingName, checked).then(
                () => console.log('Set item (default): ' + settingName + ' - ' + checked),
                error => console.error('Error setting default item', error)
            )
        }
        this.handleSetting(settingName, checked)
    }

    updateSetting(setting) {
        if (this.platform.is('cordova')) {
            this.nativeStorage.setItem(setting['key'], setting['value']).then(
                () => console.log('Set item: ' + setting['key'] + ' with Value: ' + setting['value']),
                error => console.error('Error setting item', error)
            )
        }
        this.handleSetting(setting['key'], setting['value'])
    }

    handleSetting(settingName: string, settingValue: boolean) {
        switch (settingName) {
            case 'Benachrichtigungen erhalten':
                if (settingValue === true) {
                    console.log('Subscribing to topic')
                    // subscribe to topic
                } else {
                    console.log('Unsubscribing from topic')
                    // unsubscribe from topic
                }
                break
            case 'Hintergrundfarbe blau':
                if (settingValue === true) {
                    console.log('Change color to blue')
                    // change background color
                } else {
                    console.log('Change color to white')
                    // change background color
                }
                break
        }
    }

    ionViewWillLeave() {
        this.updateSettingValues()
    }

    updateSettingValues() {
        for (const setting of this.settings) {
            this.nativeStorage.getItem(Object.keys(setting)[0]).then((data) => {
                if (data !== undefined || data !== null) {
                    console.log('updating ' + Object.keys(setting)[0] + ' with value ' + data)
                    setting[Object.keys(setting)[0]] = data
                }
            })
        }
    }

}
